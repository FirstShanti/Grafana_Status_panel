import {MetricsPanelCtrl} from "grafana/app/plugins/sdk";
import _ from "lodash";
import TimeSeries from "grafana/app/core/time_series2";
import coreModule from "grafana/app/core/core_module";
import kbn from "grafana/app/core/utils/kbn";
import moment from "moment";
// import 'jquery.flot';
// import 'jquery.flot.pie';

import './css/status_panel.css';

// Set and populate panel defaults
const panelDefaults = {
	flipCard: false,
	flipTime: 5,
	panelShape: 'Rectangle',
	colorMode: 'Panel',
	iconSwitch: false,
	// Changed colors to match Table Panel so colorised text is easier to read
	colors: {
		error: 'rgba(255, 0, 0, 0.9)',
		crit: 'rgba(255, 125, 0, 0.9)',
		warn: 'rgba(250, 255, 0, 0.9)',
		ok: 'rgba(50, 128, 45, 0.9)',
		disable: 'rgba(128, 128, 128, 0.9)'
	},
	isGrayOnNoData: false,
	isIgnoreOKColors: false,
	isHideAlertsOnDisable: false,
	cornerRadius: 0,
	isAutoScrollOnOverflow: false,
	thresholds: [
		{
			name: "Warning",
			order: 0,
			color: "rgba(250, 255, 0, 0.9)"
		},
		{
			name: "Critical",
			order: 1,
			color: "rgba(255, 125, 0, 0.9)"
		},
		{
			name: "Error",
			order: 2,
			color: "rgba(255, 0, 0, 0.9)"
		},
	]
};

export class StatusPluginCtrl extends MetricsPanelCtrl {
	/** @ngInject */
	constructor($scope, $injector, $log, $filter, annotationsSrv, uiSegmentSrv) {
		super($scope, $injector);
		_.defaultsDeep(this.panel, panelDefaults);

		//this.log = $log.debug;
		this.filter = $filter;

		this.valueHandlers = ['Number Threshold', 'String Threshold', 'Date Threshold', 'Disable Criteria', 'Text Only'];
		this.aggregations = ['Last', 'First', 'Max', 'Min', 'Sum', 'Avg', 'Delta'];
		this.displayTypes = ['Regular', 'Annotation'];
		this.displayAliasTypes = ['If not OK', 'Always'];
		this.displayValueTypes = this.getDisplayValueOptions();
		this.displayTags = ['+/-', 'UP/DOWN', 'TRENDING/FALLING'];
		this.displayTagsType = ['Line', 'Metric'];
		this.colorModes = ['Panel', 'Metric', 'Disabled'];
		this.fontFormats = ['Regular', 'Bold', 'Italic'];
		this.statusMetrics = [];
		this.panelShapes = ['Rectangle', 'Ellipse', 'Circle'];
		this.panelFormat = ['Default', 'Tabular'];

		this.ASCENDING_ORDER = "ASC"
		this.DESCENDING_ORDER = "DESC"

		this.DEFAULT_ERROR_STATUS_ICON = 'https://hds.static.autodesk.com/admin/img/icon_error.gif';
		this.DEFAULT_OR_STATUS_ICON = 'https://hds.static.autodesk.com/images/table-status-good.svg';

		this.newThresholdName = null;

		//Push the default status check group
		if(!this.panel.statusGroups) {
			this.panel.statusGroups = [];
			this.panel.statusGroups.unshift({name: 'Status Checks', alias: '', url: ''});
		}

		// Dates get stored as strings and will need to be converted back to a Date objects
		_.each(this.panel.targets, (t) => {
			if (t.valueHandler === "Date Threshold") {
				if (typeof t.error != "undefined") t.error = new Date(t.error);
				if (typeof t.crit != "undefined") t.crit = new Date(t.crit);
				if (typeof t.warn != "undefined") t.warn = new Date(t.warn);
			}
		});

		this.panel.flipTime = this.panel.flipTime || 5;
		this.panel.iconSwitch = this.panel.iconSwitch || false;

		/** Bind events to functions **/
		this.events.on('render', this.onRender.bind(this));
		this.events.on('refresh', this.postRefresh.bind(this));
		this.events.on('data-error', this.onDataError.bind(this));
		this.events.on('data-received', this.onDataReceived.bind(this));
		this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
		this.events.on('init-edit-mode', this.onInitEditMode.bind(this));

		this.onColorChange = this.onColorChange.bind(this);

		this.triggeredStatuses = [];
		this.maxGroupTriggeredThresholds = {}
		this.statusMetric = null;

		this.addFilters();
		this.updateMeasurementsThresholds();

		for (let measurement of this.panel.targets) {
			this.validateThresholdValues(measurement);
			if (measurement.thresholdsOrder == null) {
				measurement.thresholdsOrder = this.ASCENDING_ORDER;
			}
		}
	}

	getDisplayValueOptions() {
		return [
			{label: 'Never', name: "__never__"},
			{label: 'When Alias Displayed', name: "__When_Alias_Displayed__"}, 
			...this.panel.thresholds.map((el, i) => ({
			label: el.name + " and higher",
			name: el.name
		}))];
	}

	addFilters() {
		coreModule.filter('numberOrText', () => {
			let numberOrTextFilter = (input) => {
				if(angular.isNumber(input)) {
					return this.filter('number')(input);
				} else {
					return input;
				}
			};

			numberOrTextFilter.$stateful = true;
			return numberOrTextFilter;
		});

		coreModule.filter('numberOrTextWithRegex', () => {
			let numberOrTextFilter = (input, textRegex) => {
				if(angular.isNumber(input)) {
					return this.filter('number')(input);
				} else {
					if(textRegex == null || textRegex.length == 0) {
						return input;
					} else {
						let regex;

						try {
							regex = new RegExp(textRegex);
						} catch (e) {
							return input;
						}

						if (!input) {
							return input;
						}

						let matchResults = input.match(regex);
						if (matchResults == null) {
							return input;
						} else {
							return matchResults[0];
						}
					}
				}
			};

			numberOrTextFilter.$stateful = true;
			return numberOrTextFilter;
		});
	}

	postRefresh() {
		if (this.panel.fixedSpan) {
			this.panel.span = this.panel.fixedSpan;
		}

		this.measurements = this.panel.targets;
		console.log("measurements", [...this.measurements]);
		this.updateMeasurementsThresholds();

		/** Duplicate alias validation **/
		this.duplicates = false;

		this.measurements = _.filter(this.measurements, (measurement) => {
			return !measurement.hide;
		});

		_.each(this.measurements, (m) => {
			let res = _.filter(this.measurements, (measurement) => {
				return (m.alias == measurement.alias || (m.target == measurement.target && m.target)) && !m.hide;
			});

			if (res.length > 1) {
				this.duplicates = true;
			}
		});
	}

	onInitEditMode() {
		this.addEditorTab('Options', 'public/plugins/blackmirror1-statusbygroup-panel/editor.html', 2);
		// Load in the supported units-of-measure formats so they can be displayed in the editor
		this.unitFormats = kbn.getUnitFormats();
	}

	setUnitFormat(measurement, subItem) {
		measurement.units = subItem.value;
		this.render();
	}

	fixPanelHeader() {
		// Handle the panel top menu height, since it's display doesn't look good with the panel
		let panelHeaderHeight = '';
		if(this.panel.title.length === 0) {
			panelHeaderHeight = '10px';
		}
		console.log("his.$panelContainer", this.$panelContainer);
		this.$panelContainer.find('.panel-header').css('height', panelHeaderHeight);
		this.$panelContainer.find('.panel-menu-container').css('height', panelHeaderHeight);
		this.$panelContainer.find('.fa-caret-down').css('display', 'none');
	}

	setElementHeight() {
		// Handle the panel height
		this.$panelContainer.find('.status-panel').css('min-height', this.$panelContoller.height + 'px');
		this.minHeight = this.$panelContoller.height-10;
	}

	setTextMaxWidth() {
		let tail = ' …';
		let panelWidth = this.$panelContainer.innerWidth();
		if (isNaN(panelWidth)) {
			panelWidth = parseInt(panelWidth.slice(0, -2), 10) / 12;
		}
		panelWidth = panelWidth - 20;
		this.maxWidth = panelWidth;
	}

	isAutoScrollAlerts() {
		if(!this.panel.isAutoScrollOnOverflow) {
			return false;
		}

		let element = this.$panelContainer.find('.status-panel')[0];
		let overflowY = element.offsetHeight < element.scrollHeight;
		return overflowY;
	}

	onHandlerChange(measurement) {
		// If the Threshold type changes between Number/String/Date then try and recast the thresholds to keep consistent
		if (measurement.valueHandler === "Number Threshold") {
			measurement.error = (isNaN(Number(measurement.error))) ? undefined : Number(measurement.error);
			measurement.crit = (isNaN(Number(measurement.crit))) ? undefined : Number(measurement.crit);
			measurement.warn = (isNaN(Number(measurement.warn))) ? undefined : Number(measurement.warn);
		} else if (measurement.valueHandler === "String Threshold") {
			if (typeof measurement.error != "undefined") {measurement.error = String(measurement.error)}
			if (typeof measurement.crit != "undefined") {measurement.crit = String(measurement.crit)}
			if (typeof measurement.warn != "undefined") {measurement.warn = String(measurement.warn)}
		} else if (measurement.valueHandler === "Date Threshold") {
			let c = new Date(measurement.crit), w = new Date(measurement.warn), e = new Date(measurement.error);
			measurement.error = (isNaN(e.getTime())) ? undefined : e;
			measurement.crit = (isNaN(c.getTime())) ? undefined : c;
			measurement.warn = (isNaN(w.getTime())) ? undefined : w;
		}
		this.onRender();
	}

	onColorChange(item) {
		return (color) => {
			this.panel.colors[item] = color;
			this.render();
		};
	}

	onAddThreshold() {

		if (!this.newThresholdName) {
			return;
		}

		// Validate name are unique.
		for (let threshold in this.panel.thresholds){
			if (threshold.name == this.newThresholdName) {
				alert("This name already exists.");
				return
			}
		}

		this.panel.thresholds.push({
			name: this.newThresholdName,
			order: this.panel.thresholds.length,
			color: 'rgb(200, 200, 200)'
		});

		this.newThresholdName = null;
		this.updateMeasurementsThresholds();
		this.displayValueTypes = this.getDisplayValueOptions();
	}

	updateMeasurementsThresholds() {

		console.log("updateMeasurementsThresholds");

		for (let measurement of this.panel.targets) {
			if (!measurement.thresholds) {
				measurement.thresholds = [];
			}

			let measurementsThresholdsMapping = measurement.thresholds.reduce((a,x) => {
				a[x.name] = x;
				return a;
			}, {});

			let newMeasurementThresholds = [];

			for (let threshold of this.panel.thresholds) {

				let previousThresholdValues = measurementsThresholdsMapping[threshold.name] || {};

				newMeasurementThresholds.push({
					name: threshold.name,
					order: threshold.order,
					value: previousThresholdValues.value || null,
					tags: previousThresholdValues.tags || null,
					tags_type: previousThresholdValues.tags_type || null,
					icon: previousThresholdValues.icon || null,
				});
			}

			measurement.thresholds = newMeasurementThresholds;
			this.validateThresholdValues(measurement);
		}
	}

	onRemoveThreshold(thresholdToDelete) {
		this.panel.thresholds = this.panel.thresholds.filter(a => a !== thresholdToDelete);
		this.panel.thresholds.forEach((el, index) => el.order = index);
		this.updateMeasurementsThresholds();
		for (let measurement of this.panel.targets){
			if (measurement.displayValueWithAlias == thresholdToDelete.name) {
				let index = Math.min(thresholdToDelete.order, this.panel.thresholds.length - 1);
				measurement.displayValueWithAlias = (this.panel.thresholds[index] || this.displayValueTypes[1]).name;
			}
		}
		this.displayValueTypes = this.getDisplayValueOptions();
	}

	shiftThresholdOrder(currentOrder, shift) {
		let newOrder = currentOrder + shift;
		if (newOrder < 0 || newOrder >= this.panel.thresholds.length) {
			return;
		}

		this.panel.thresholds[newOrder].order = currentOrder;
		this.panel.thresholds[currentOrder].order = newOrder;

		this.panel.thresholds = this.panel.thresholds.sort((a, b) => a.order - b.order);
		this.updateMeasurementsThresholds();
		this.displayValueTypes = this.getDisplayValueOptions();
	}

	onSetThresholdColor(threshold) {
		return (color) => {
			threshold.color = color;
			this.render();
		};
	}


	onRender() {
		this.fixPanelHeader();
		this.setElementHeight();
		this.setTextMaxWidth();
		this.upgradeOldVersion();

		if (this.panel.clusterName) {
			this.panel.displayName =

				this.filter('interpolateTemplateVars')(this.panel.clusterName, this.$scope)
					.replace(new RegExp(this.panel.namePrefix, 'i'), '');
		} else {
			this.panel.displayName = "";
		}

		if(this.panel.flipCard){
			this.$panelContainer.addClass("effect-hover");
		} else {
			this.$panelContainer.removeClass("effect-hover");
		}

		let targets = this.panel.targets;

		this.error = [];
		this.crit = [];
		this.warn = [];
		this.triggeredStatuses = [];
		this.groupedTriggeredStatuses = {};
		this.disabled = [];
		this.display = [];
		this.annotation = [];
		this.extraMoreAlerts = null;

		this.statusMetrics = [];

		this.maxGroupTriggeredThresholds = {};
		this.groupTriggeredThresholds = {};

		if(this.panel.statusGroups){
			var statusGroupExists = false;
			this.panel.statusGroups.forEach(element => {

				this.groupTriggeredThresholds[element.name] = [];

				if(element.name === 'Status Checks'){
					statusGroupExists = true;
				}
			});
			if(!statusGroupExists){
				this.panel.statusGroups.unshift({name: 'Status Checks', alias: '', url: ''})
			}
		}

		console.log("Series", this.series);

		_.each(this.series, (s) => {
			let target = _.find(targets, (target) => {
				return target.alias == s.alias || target.target == s.alias;
			});

			if (!target) {
				return;
			}

			s.alias = target.alias;
			s.url = target.url;
			s.isDisplayValue = true;
			s.displayType = target.displayType;
			s.valueDisplayRegex = "";
			if(this.panel.statusGroups){
				this.panel.statusGroups.forEach(element => {
					if(target.hasOwnProperty('group') && element.name === target.group.name){
						s.group = element;
					}
				});
			}
			// s.group = target.group;

			if(this.validateRegex(target.valueDisplayRegex)) {
				s.valueDisplayRegex = target.valueDisplayRegex;
			}

			let value;
			switch (target.aggregation) {
				case 'Max':
					value = _.max(s.datapoints, (point) => { return point[0]; })[0];
					value = s.stats.max;
					break;
				case 'Min':
					value = _.min(s.datapoints, (point) => { return point[0]; })[0];
					value = s.stats.min;
					break;
				case 'Delta':
					value = s.datapoints[s.datapoints.length - 1][0] - s.datapoints[0][0];
					value = s.stats.diff;
					break;
				case 'Sum':
					value = 0;
					_.each(s.datapoints, (point) => { value += point[0] });
					value = s.stats.total;
					break;
				case 'Avg':
					value = s.stats.avg;
					break;
				case 'First':
					value = s.datapoints[0][0];
					break;
				default:
					value = s.datapoints[s.datapoints.length - 1][0];
			}

			s.display_value = value;

			if (target.valueHandler == "Number Threshold" ||
				target.valueHandler == "String Threshold" ||
				target.valueHandler == "Date Threshold") {
				this.handleThresholdStatus(s, target);
			}
			else if (target.valueHandler == "Disable Criteria") {
				this.handleDisabledStatus(s,target);
			}
			else if (target.valueHandler == "Text Only") {
				this.handleTextOnly(s, target);
			}

			console.log("diplay", this.display);
			console.log("annotation", this.annotation);
			console.log("groupTriggeredThresholds", this.groupTriggeredThresholds);

			// this.statusMetrics.push(s.alias)
		});

		if (this.panel.isHideAlertsOnDisable && this.disabled.length > 0) {
			this.error = [];
			this.crit = [];
			this.warn = [];
			this.groupTriggeredThresholds = {};
			this.maxGroupTriggeredThresholds = {};
			this.display = [];
		}

		this.autoFlip();
		this.updatePanelState();
		this.handleCssDisplay();
		this.parseUri();

		//This must appear after handling the css style of the panel
		this.handleMaxAlertsToShow();
	}

	upgradeOldVersion() {
		let targets = this.panel.targets;

		//Handle legacy code
		_.each(targets, (target) => {
			if(target.valueHandler == null) {
				if (target.displayType != null) {
					target.valueHandler = target.displayType;
					if (target.valueHandler == "Annotation") {
						target.valueHandler = "Text Only"
					}
				} else {
					target.valueHandler = this.valueHandlers[0];
				}
				target.displayType = this.displayTypes[0];
			}

			if (target.display != null) {
				target.displayAliasType = target.display ? "Always" : this.displayAliasTypes[0];
				target.displayValueWithAlias = target.display ? -1 : this.displayValueTypes[0].index;
				delete target.display;
			}
		});

		// Depreciate Threshold in favour of Type specific versions
		_.each(targets, (target) => {
			if (target.valueHandler === "Threshold") {
				// Use the same logic as Threshold Parsing to ensure we retain same behaviour
				// i.e. map to Number Threshold if two floats (i.e. range check) otherwise map to String Threshold (i.e. exact match)
				if (StatusPluginCtrl.isFloat(target.error) && StatusPluginCtrl.isFloat(target.crit) && StatusPluginCtrl.isFloat(target.warn)) {
					target.valueHandler = "Number Threshold";
					target.error = Number(target.error);
					target.crit = Number(target.crit);
					target.warn = Number(target.warn);
				} else {
					target.valueHandler = "String Threshold";
					if (typeof target.error != "undefined") {
						target.error = String(target.error);
					}
					if (typeof target.crit != "undefined") {
						target.crit = String(target.crit);
					}
					if (typeof target.warn != "undefined") {
						target.warn = String(target.warn);
					}
				}
			}
		});
	}

	validateThresholdValues(measurement) {
		// !All thresholds should be sorted in ascending order by threshold.order field.
		console.log("validateThresholdValues");

		measurement.isThresholdValuesValid = true;

		if (measurement.thresholds.length < 3) {
			return // There is no sense to validate if values situated in the right order if there is 0, 1 or 2 elements. Order can be Asc and Desc
		}

		const activeThresholds = measurement.thresholds.filter(el => el.value != null); // check that value is passed

		if (activeThresholds.length < 2) {
			return
		} 

		for (let i = 0; i < activeThresholds.length - 1; i++) {

			if (measurement.thresholdsOrder === this.ASCENDING_ORDER && activeThresholds[i].value >= activeThresholds[i+1].value) {
				measurement.isThresholdValuesValid = false;
				return
			}

			if (measurement.thresholdsOrder === this.DESCENDING_ORDER && activeThresholds[i].value <= activeThresholds[i+1].value) {
				measurement.isThresholdValuesValid = false;
				return
			}
		}

		if (this.$panelContainer) {
			this.onRender();  // render if inited
		}
	}


	getColor(threshold) {
		if (!threshold) {
			return '#000';
		}

		return this.getColorByThresholdName(threshold.name);
	}

	handleThresholdStatus(series, target) {
		series.thresholds = this.parseThresholds(target);
		series.thresholdsOrder = target.thresholdsOrder

		if (!target.isThresholdValuesValid) {
			console.error("Thresholds are invalid. Ignoring them.");
			return
		}

		let triggeredThreshold = null;
		
		let isStatus = false;
		let isCheckRanges = series.thresholds.map(el => el.isNumber).every(el => el === true);

		if (series.hasOwnProperty('group') && series.group === this.panel.statusGroups[0]){
			isStatus = true;
		}

		if (isCheckRanges) {
			console.log("isCheckRanges");
			if (series.thresholdsOrder === this.ASCENDING_ORDER) { 

				for (const threshold of series.thresholds) {
					console.log("series.display_value >= threshold.parsedValue", series.display_value, threshold.parsedValue);
					if (series.display_value >= threshold.parsedValue) {
						triggeredThreshold = threshold;
						// break;
					}
				}

			} else if (series.thresholdsOrder === this.DESCENDING_ORDER) {

				for (const threshold of series.thresholds) {
					if (series.display_value <= threshold.parsedValue) {
						console.log("series.display_value <= threshold.parsedValue", series.display_value, threshold.parsedValue);
						triggeredThreshold = threshold;
						// break;
					}
				}

			}

		} else {
			console.log("is NOT CheckRanges");
			for (const threshold of series.thresholds) {
				if (series.display_value == threshold.parsedValue) {
					triggeredThreshold = threshold;
					break;
				}
			}

		}

		// Add units-of-measure and decimal formatting or date formatting as needed
		series.display_value = this.formatDisplayValue(series.display_value, target);
		series.display_icon = this.getThresholdIcon(triggeredThreshold);
		series.color = this.getColor(triggeredThreshold);

		[series.tag, series.tags, series.tags_type] = this.getTag(series.display_value, triggeredThreshold);
		series.triggeredThreshold = triggeredThreshold;
		let displayAlias = false;

		if (target.displayAliasType === "Always") {
			displayAlias = true;
		} else if (target.displayAliasType === "If not OK" && triggeredThreshold) {
			displayAlias = true;
		}

		let displayValue = false;
		
		if (target.displayValueWithAlias === '__When_Alias_Displayed__' && displayAlias) {
			displayValue = true;
		} else if (target.displayValueWithAlias === '__never__') {
			displayValue = false;
		} else if (triggeredThreshold) {
			let thresholdToDisplayValue = this.panel.thresholds.find(el => el.name == target.displayValueWithAlias);
			if (!thresholdToDisplayValue) {
				displayValue = false;
				console.error("thresholdToDisplayValue is empty! Error with thresholds.");
			}
			if (triggeredThreshold.order >= thresholdToDisplayValue.order) {
				displayValue = true;
			}	
		}

		series.isDisplayValue = displayValue;

		console.log("displayAlias", displayAlias);
		console.log("triggeredThreshold", triggeredThreshold);

		if (displayAlias && !triggeredThreshold) {  // If OK state
			if (series.displayType === "Annotation") {
				this.annotation.push(series);
			} else {
				this.display.push(series);
			}
		} else if (triggeredThreshold) {
			//In not OK state we don't show the error as annotation
			series.displayType = this.displayTypes[0];

			if (isStatus) {
				this.triggeredStatuses.push(series);
			} else {
				// this.error.push(series);
				if (series.hasOwnProperty('group')) {
					this.groupTriggeredThresholds[series.group.name].push(series);
				}
			}
		} else if(isStatus){  // FOR OK status
			this.statusMetrics.push(series);
		}


		this.groupedTriggeredStatuses = this.groupTriggeredStatusesByThresholds(this.triggeredStatuses);
		
		for (let group in this.groupTriggeredThresholds) {
			if (this.groupTriggeredThresholds[group].length > 0) {
				this.maxGroupTriggeredThresholds[group] = this.getMetricWithGreatedOrder(this.groupTriggeredThresholds[group]);
			}
		}

		console.log("============this.maxGroupTriggeredThresholds", this.maxGroupTriggeredThresholds);

		console.log(series, target);

		// if (isError) {
		// 	series.displayType = this.displayTypes[0];
		// 	series.isDisplayValue = displayValueWhenAliasDisplayed || displayValueFromError || displayValueFromWarning;
		// 	if (isStatus) {
		// 		this.statusError.push(series);
		// 	} else {
		// 		this.error.push(series);
		// 		if (series.hasOwnProperty('group')) {
		// 			this.groupError[series.group.name].push(series);
		// 		}
		// 	}
		// } else if(isCritical) {
		// 	//In critical state we don't show the error as annotation
		// 	series.displayType = this.displayTypes[0];
		// 	series.isDisplayValue = displayValueWhenAliasDisplayed || displayValueFromWarning || displayValueFromCritical;
		// 	if(isStatus) {
		// 		this.statusCrit.push(series);
		// 	}
		// 	else {
		// 		this.crit.push(series);
		// 		if(series.hasOwnProperty('group')) {
		// 			this.groupCrit[series.group.name].push(series);
		// 		}
		// 	}
		// } else if(isWarning) {
		// 	//In warning state we don't show the warning as annotation
		// 	series.displayType = this.displayTypes[0];
		// 	series.isDisplayValue = displayValueWhenAliasDisplayed || displayValueFromWarning;
		// 	if(isStatus){
		// 		this.statusWarn.push(series);
		// 	}
		// 	else{
		// 		this.warn.push(series);
		// 		if(series.hasOwnProperty('group')) {
		// 			this.groupWarn[series.group.name].push(series);
		// 		}
		// 	}
		// } else if ("Always" == target.displayAliasType) {
		// 	series.isDisplayValue = displayValueWhenAliasDisplayed;
		// 	if(series.displayType == "Annotation") {
		// 		this.annotation.push(series);
		// 	} 
		// 	else {
		// 		this.display.push(series);
		// 	}
		// } else if(isStatus){
		// 	this.statusMetrics.push(series);
		// }
	}

	getTag(value, triggeredThreshold) {

		if (!triggeredThreshold) {
			return [null, null, null];
		}

		if (triggeredThreshold.tags === '+/-') {
			return [value > 0 ? '+':'-', triggeredThreshold.tags, triggeredThreshold.tags_type]
		} else if (triggeredThreshold.tags === 'UP/DOWN') {
			return [value > 0 ? 'UP':'DOWN' , triggeredThreshold.tags, triggeredThreshold.tags_type]
		} else if (triggeredThreshold.tags === 'TRENDING/FALLING') {
			return [value > 0 ? 'TRENDING':'FALLING', triggeredThreshold.tags, triggeredThreshold.tags_type]
		} else {
			return [null, null, null]
		}
	}
	
	formatDisplayValue(value, target) {
		// Format the display value. Set to "Invalid" if value is out-of-bounds or a type mismatch with the handler
		if (target.valueHandler === "Number Threshold") {
			if (_.isFinite(value)) {
				let units = (typeof target.units === "string") ? target.units : 'none';
				let decimals = this.decimalPlaces(value);
				// We define the decimal percision by the minimal decimal needed
				decimals = (typeof target.decimals === "number") ? Math.min(target.decimals, decimals) : decimals;
				value = kbn.valueFormats[units](value, decimals, null);
			} else {
				value = "Invalid Number";
			}
		} else if (target.valueHandler === "String Threshold") {
			if (value === undefined || value === null || value !== value) {
				value = "Invalid String";
			}
		} else if (target.valueHandler === "Date Threshold") {
			if (_.isFinite(value)) {
				let date = moment(new Date(value));
				if (this.dashboard.isTimezoneUtc()) date = date.utc();
				value = date.format(target.dateFormat);
			} else {
				value = "Invalid Date";
			}
		}
		return value;
	}

	decimalPlaces(num) {
		var match = (''+num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
		if (!match) { return 0; }
		return Math.max(
			0,
			// Number of digits right of decimal point.
			(match[1] ? match[1].length : 0)
			// Adjust for scientific notation.
			- (match[2] ? +match[2] : 0));
	}

	handleDisabledStatus(series, target) {
		series.displayType = this.displayTypes[0];
		series.disabledValue = target.disabledValue;

		if (series.display_value == series.disabledValue) {
			this.disabled.push(series);
		}
	}

	handleTextOnly(series, target) {
		if(series.displayType == "Annotation") {
			this.annotation.push(series);
		} else {
			this.display.push(series);
		}
	}

	getStatusWithGreatedOrder(triggeredThresholds) {
		let maxOrder = -1;
		let greatestThreshold = null;

		for (const series of triggeredThresholds) {
			if (series.triggeredThreshold.order > maxOrder) {
				maxOrder = series.triggeredThreshold.order;
				greatestThreshold = series.triggeredThreshold;
			}
		}

		return greatestThreshold;
	}

	getMetricWithGreatedOrder(triggeredThresholds) {
		let maxOrder = -1;
		let greatestMetric = null;

		for (const series of triggeredThresholds) {
			if (series.triggeredThreshold.order > maxOrder) {
				maxOrder = series.triggeredThreshold.order;
				greatestMetric = series;
			}
		}

		return greatestMetric;
	}

	updatePanelState() {
		if(this.duplicates) {
			this.panelState = 'error-state';
		} else if (this.disabled.length > 0) {
			this.panelState = 'disabled-state';
		} else if (this.triggeredStatuses.length > 0) {
			this.panelState = this.getStatusWithGreatedOrder(this.triggeredStatuses).name;
		} else if((this.series == undefined || this.series.length == 0) && this.panel.isGrayOnNoData) {
			this.panelState = 'no-data-state';
		} else {
			this.panelState = 'ok-state';
		}
	}

	hideAllWarnings() {
		for (var i = span.length; i--;) {
			span[i].className = 'NameHighlights'; 
		}
	};

	handleCssDisplay() {
		// console.log("REMOVE", 'error-state disabled-state ok-state no-data-state ' + this.panel.thresholds.map(el => el.name).join(''))
		// this.$panelContainer.removeClass('error-state disabled-state ok-state no-data-state ' + this.panel.thresholds.map(el => el.name).join(' '));
		this.$panelContainer.addClass(this.panelState);

		var height = this.$panelContainer.find('.status-panel').height();

		if (this.panel.panelShape === 'Rectangle') {
			this.$panelContainer.css('border-radius', 0 + '%');
			this.$panelContainer.css('width', '');
			this.$panelContainer.css('max-width', '');
			this.$panelContainer.css('height', '');
			this.$panelContainer.css('margin', '');
			this.$panelContainer.css('max-height', '');
			this.$panelContainer.css('padding-bottom', '');
			this.$panelContainer.find('.bottom-section').css('height', '');
		} else if(this.panel.panelShape === 'Ellipse') {
			this.$panelContainer.css('border-radius', 50 + '%');
			this.$panelContainer.css('width', '');
			this.$panelContainer.css('max-width', '');
			this.$panelContainer.css('height', '');
			this.$panelContainer.css('margin', '');
			this.$panelContainer.css('max-height', '');
			this.$panelContainer.css('padding-bottom', '');
			this.$panelContainer.find('.bottom-section').css('height', '');
		} else if(this.panel.panelShape === 'Circle') {
			this.$panelContainer.css('border-radius', 50 + '%');
			this.$panelContainer.css('height', height + 'px');
			this.$panelContainer.css('width', height + 'px');
			this.$panelContainer.css('margin', 'auto');
		}

		let okColor = (this.panel.isIgnoreOKColors) ? '' : this.panel.colors.ok;

		if (this.panel.colorMode === "Panel") {

			if (this.panelState === 'disabled-state' || this.panelState == 'no-data-state') {
				this.$panelContainer.css('background-color', this.panel.colors.disable);
			} else if (this.panelState === 'ok-state'){
				this.$panelContainer.css('background-color', okColor);
			} else if (this.panelState === 'error-state'){
				this.$panelContainer.css('background-color', this.panel.colors.error);
			} else {
				this.$panelContainer.css('background-color', this.getColorByThresholdName(this.panelState));
			}

		} else {
			this.$panelContainer.css('background-color', '');
		}
	}

	getColorByThresholdName(thresholdName) {
		for (const threshold of this.panel.thresholds) {
			if (thresholdName === threshold.name) {
				return threshold.color;
			}
		}
		return '';
	}


	handleMaxAlertsToShow() {
		if(this.panel.maxAlertNumber != null && this.panel.maxAlertNumber >= 0) {
			let currentMaxAllowedAlerts = this.panel.maxAlertNumber;
			let filteredOutAlerts = 0;
			let arrayNamesToSlice = ["disabled", , "error", "crit", "warn", "display"];
			arrayNamesToSlice.forEach( arrayName => {
				let originAlertCount = this[arrayName].length;
				this[arrayName] = this[arrayName].slice(0,currentMaxAllowedAlerts);
				currentMaxAllowedAlerts = Math.max(currentMaxAllowedAlerts - this[arrayName].length, 0);
				filteredOutAlerts += (originAlertCount - this[arrayName].length);
			});

			if(filteredOutAlerts > 0) {
				this.extraMoreAlerts = "+ " + filteredOutAlerts + " more"
			}
		}
	}

	parseUri() {
		if (this.panel.links && this.panel.links.length > 0) {
			let link = this.panel.links[0];

			if (link.type == "absolute") {
				this.uri = link.url;
			} else {
				this.uri = 'dashboard/' + link.dashUri;
			}

			if (link.params) {
				this.uri +=  "?" + link.params;
			}

			this.targetBlank = link.targetBlank;
		} else {
			this.uri = undefined;
		}
	}

	validateRegex(textRegex) {
		if(textRegex == null || textRegex.length == 0) {
			return true
		}
		try {
			let regex = new RegExp(textRegex);
			return true
		} catch(e) {
			return false
		}
	}

	parseThresholds(metricOptions) {
		let res = [];

		for (let threshold of metricOptions.thresholds) {

			// Skip inactive thresholds
			if (threshold.value == null) {
				continue;
			}

			let parsedThreshold = {}

			for (let key in threshold) {
				parsedThreshold[key] = threshold[key];
			}

			if (StatusPluginCtrl.isFloat(parsedThreshold.value)) {
				parsedThreshold.parsedValue = parseFloat(parsedThreshold.value);
				parsedThreshold.isNumber = true;
			} else if (parsedThreshold.value instanceof Date) {
				// Convert Dates to Numbers and leverage existing threshold logic
				parsedThreshold.parsedValue = parsedThreshold.value.valueOf();
				parsedThreshold.isNumber = true;
			} else {
				parsedThreshold.parsedValue = parsedThreshold.value;
				parsedThreshold.isNumber = false;
			}

			res.push(parsedThreshold);
		}

		return res;
	}

	static isFloat(val) {
		if (!isNaN(val) && val.toString().toLowerCase().indexOf('e') == -1) {
			return true;
		}
		return false;
	}

	onDataReceived(dataList) {
		this.series = dataList.map(StatusPluginCtrl.seriesHandler.bind(this));
		this.render();
	}

	onDataError() {
		this.error = [];
		this.crit = [];
		this.warn = [];
		this.groupTriggeredThresholds = {};
		this.maxGroupTriggeredThresholds = {};
	}

	static seriesHandler(seriesData) {
		var series = new TimeSeries({
			datapoints: seriesData.datapoints,
			alias: seriesData.target
		});

		series.flotpairs = series.getFlotPairs("connected");

		return series;
	}

	$onDestroy() {
		if (this.timeoutId) {
			clearInterval(this.timeoutId);
		}
	}

	autoFlip() {
		if (this.timeoutId) {
			clearInterval(this.timeoutId);
		}
		if (this.panel.flipCard && (this.error.length > 0 || this.crit.length > 0 || this.warn.length > 0 || this.disabled.length > 0)) {
			this.timeoutId = setInterval(() => {
				this.$panelContainer.toggleClass("flipped");
			}, this.panel.flipTime * 1000);
		}
	}

	getThresholdIcon(triggeredThreshold) {
		if (triggeredThreshold) {
			return triggeredThreshold.icon || ""
		}
		return "";
	}

	link(scope, elem, attrs, ctrl) {
		this.$panelContainer = elem;
		this.$panelContainer.addClass("st-card");
		this.$panelContoller = ctrl;
	}

	addGroup(){
		if (this.panel.groupname) {
			var duplicate = false;
			this.panel.statusGroups.forEach(element => {
				if(element.name === this.panel.groupname){
					duplicate = true;
				}
			});
			if (!duplicate) {
				this.panel.statusGroups.push({name: this.panel.groupname, alias: '', url: ''});
				this.panel.groupname = '';
			}
		}
		this.render();
	}

	removeGroup(group){
		this.panel.statusGroups = _.without(this.panel.statusGroups, group);
		this.render();
	}

	formatAlias(text, count, status){
		console.error("formatAlias", text, count, status);
		return text.replace('{c}', count).replace('{s}', status);
	}

	groupTriggeredStatusesByThresholds(triggeredStatuses) {
		let grouped = {};
		for (let status of triggeredStatuses) {
			if (grouped.hasOwnProperty(status.triggeredThreshold.name)) {
				grouped[status.triggeredThreshold.name].push(status);
			} else {
				grouped[status.triggeredThreshold.name] = [status];
			}
		}

		return grouped;
	}

	getFirstNotNullIcon(series, defaultValue) {
		for (let el of series) {
			const icon = this.getThresholdIcon(el.triggeredThreshold);
			if (icon != '' & icon != null) {
				return icon;
			}
		}

		return defaultValue;
	}
}

StatusPluginCtrl.templateUrl = 'module.html';
