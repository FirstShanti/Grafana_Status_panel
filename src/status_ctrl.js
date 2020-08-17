import {MetricsPanelCtrl} from "grafana/app/plugins/sdk";
import _ from "lodash";
import TimeSeries from "grafana/app/core/time_series2";
import coreModule from "grafana/app/core/core_module";
import kbn from "grafana/app/core/utils/kbn";
import moment from "moment";
// import 'jquery.flot';
// import 'jquery.flot.pie';

import './css/status_panel.scss';

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
	isAutoScrollOnOverflow: false
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
		this.displayAliasTypes = ['Warning / Critical / Error', 'Always'];
		this.displayValueTypes = ['Never', 'When Alias Displayed', 'Warning / Critical / Error', 'Critical Only', 'Error only'];
		this.displayTags = ['+/-', 'UP/DOWN', 'TRENDING/FALLING'];
		this.displayTagsType = ['Line', 'Metric'];
		this.colorModes = ['Panel', 'Metric', 'Disabled'];
		this.fontFormats = ['Regular', 'Bold', 'Italic'];
		this.statusMetrics = [];
		this.panelShapes = ['Rectangle', 'Ellipse', 'Circle'];

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

		this.statusError = [];
		this.statusCrit = [];
		this.statusWarn = [];
		this.statusMetric = null;

		this.addFilters()
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
		this.statusError = [];
		this.statusCrit = [];
		this.statusWarn = [];
		this.disabled = [];
		this.display = [];
		this.annotation = [];
		this.extraMoreAlerts = null;

		this.statusMetrics = [];
		this.groupError = {};
		this.groupCrit = {};
		this.groupWarn = {};

		if(this.panel.statusGroups){
			var statusGroupExists = false;
			this.panel.statusGroups.forEach(element => {
				this.groupError[element.name] = [];
				this.groupCrit[element.name] = [];
				this.groupWarn[element.name] = [];
				if(element.name === 'Status Checks'){
					statusGroupExists = true;
				}
			});
			if(!statusGroupExists){
				this.panel.statusGroups.unshift({name: 'Status Checks', alias: '', url: ''})
			}
		}

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

			// this.statusMetrics.push(s.alias)
		});

		if (this.panel.isHideAlertsOnDisable && this.disabled.length > 0) {
			this.error = [];
			this.crit = [];
			this.warn = [];
			this.groupError = {};
			this.groupCrit = {};
			this.groupWarn = {};
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
				target.displayValueWithAlias = target.display ? 'When Alias Displayed' : this.displayValueTypes[0];
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

	handleThresholdStatus(series, target) {
		series.thresholds = StatusPluginCtrl.parseThresholds(target);
		series.inverted = (series.thresholds.error < series.thresholds.crit) && (series.thresholds.crit < series.thresholds.warn);

		let isError = false;
		let isCritical = false;
		let isWarning = false;
		let isStatus = false;
		let isCheckRanges = series.thresholds.errorIsNumber && series.thresholds.warnIsNumber && series.thresholds.critIsNumber;

		alert(series.alias);

		if (series.hasOwnProperty('group') && series.group === this.panel.statusGroups[0]){
			isStatus = true;
			// this.statusMetrics.push(series);
		}

		if (isCheckRanges) {
			if (!series.inverted) {
				if (series.display_value >= series.thresholds.error) {
					isError = true
				} else if (series.display_value >= series.thresholds.crit  && series.alias) {
					isCritical = true
				} else if (series.display_value >= series.thresholds.warn) {
					isWarning = true
				}
			} else {
				if (series.display_value <= series.thresholds.error) {
					isError = true
				} else if (series.display_value <= series.thresholds.crit && series.alias) {
					isCritical = true
				} else if (series.display_value <= series.thresholds.warn) {
					isWarning = true
				}
			}
		} else {
			if (series.display_value == series.thresholds.error) {
				isError = true
			} else if (series.display_value == series.thresholds.crit && series.alias) {
				isCritical = true
			} else if (series.display_value == series.thresholds.warn) {
				isWarning = true
			}
		}

		// Add units-of-measure and decimal formatting or date formatting as needed
		series.display_value = this.formatDisplayValue(series.display_value, target);
		series.display_icon = this.getThresholdIcon(target)

		[series.error_tag, series.error_tags, series.error_tags_type] = this.getTag(series.display_value, target.error_tags, target.error_tags_type);
		[series.crit_tag, series.crit_tags, series.crit_tags_type] = this.getTag(series.display_value, target.crit_tags, target.crit_tags_type);
		[series.warn_tag, series.warn_tags, series.warn_tags_type] = this.getTag(series.display_value, target.warn_tags, target.warn_tags_type);


		var displayValueWhenAliasDisplayed = 'When Alias Displayed' === target.displayValueWithAlias;
		var displayValueFromWarning = 'Warning / Critical / Error' === target.displayValueWithAlias;
		var displayValueFromCritical = 'Critical Only' === target.displayValueWithAlias;
		var displayValueFromError = 'Error Only' === target.displayValueWithAlias;

		if (isError) {
			series.displayType = this.displayTypes[0];
			series.isDisplayValue = displayValueWhenAliasDisplayed || displayValueFromError || displayValueFromWarning;
			if (isStatus) {
				this.statusError.push(series);
			} else {
				this.error.push(series);
				if (series.hasOwnProperty('group')) {
					this.groupError[series.group.name].push(series);
				}
			}
		} else if(isCritical) {
			//In critical state we don't show the error as annotation
			series.displayType = this.displayTypes[0];
			series.isDisplayValue = displayValueWhenAliasDisplayed || displayValueFromWarning || displayValueFromCritical;
			if(isStatus) {
				this.statusCrit.push(series);
			}
			else {
				this.crit.push(series);
				if(series.hasOwnProperty('group')) {
					this.groupCrit[series.group.name].push(series);
				}
			}
		} else if(isWarning) {
			//In warning state we don't show the warning as annotation
			series.displayType = this.displayTypes[0];
			series.isDisplayValue = displayValueWhenAliasDisplayed || displayValueFromWarning;
			if(isStatus){
				this.statusWarn.push(series);
			}
			else{
				this.warn.push(series);
				if(series.hasOwnProperty('group')) {
					this.groupWarn[series.group.name].push(series);
				}
			}
		} else if ("Always" == target.displayAliasType) {
			series.isDisplayValue = displayValueWhenAliasDisplayed;
			if(series.displayType == "Annotation") {
				this.annotation.push(series);
			} 
			else {
				this.display.push(series);
			}
		} else if(isStatus){
			this.statusMetrics.push(series);
		}
	}

	getTag(value, displayTags, displayTagsType) {
		if (displayTags === '+/-') {
			return [value > 0 ? '+':'-', displayTags, displayTagsType]
		} else if (displayTags === 'UP/DOWN') {
			return [value > 0 ? 'UP':'DOWN' , displayTags, displayTagsType]
		} else if (displayTags === 'TRENDING/FALLING') {
			return [value > 0 ? 'TRENDING':'FALLING', displayTags, displayTagsType]
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

	updatePanelState() {
		if(this.duplicates) {
			this.panelState = 'error-state';
		} else if (this.disabled.length > 0) {
			this.panelState = 'disabled-state';
		} else if (this.statusCrit.length > 0 || this.statusError.length > 0) {
			this.panelState = 'error-state';
		} else if (this.statusWarn.length > 0) {
			this.panelState = 'warn-state';
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
		this.$panelContainer.removeClass('error-state warn-state disabled-state ok-state no-data-state');
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
			switch(this.panelState) {
				case 'disabled-state': this.$panelContainer.css('background-color', this.panel.colors.disable); break;
				case 'error-state': this.$panelContainer.css('background-color', this.panel.colors.crit); break;
				case 'warn-state': this.$panelContainer.css('background-color', this.panel.colors.warn); break;
				case 'no-data-state': this.$panelContainer.css('background-color', this.panel.colors.disable); break;
				default: this.$panelContainer.css('background-color', okColor); break;
			}
		} else {
			this.$panelContainer.css('background-color', '');
		}
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

	static parseThresholds(metricOptions) {
		let res = {};

		if (StatusPluginCtrl.isFloat(metricOptions.warn)) {
			res.warn = parseFloat(metricOptions.warn);
			res.warnIsNumber = true;
		} else if (metricOptions.warn instanceof Date) {
			// Convert Dates to Numbers and leverage existing threshold logic
			res.warn = metricOptions.warn.valueOf();
			res.warnIsNumber = true;
		} else {
			res.warn = metricOptions.warn;
			res.warnIsNumber = false;
		}
		// console.log('metric option: ', metricOptions)
		if (StatusPluginCtrl.isFloat(metricOptions.crit)) {
			res.crit = parseFloat(metricOptions.crit);
			res.critIsNumber = true;
		} else if (metricOptions.crit instanceof Date) {
			res.crit = metricOptions.crit.valueOf();
			res.critIsNumber = true;
		} else {
			res.crit = metricOptions.crit;
			res.critIsNumber = false;
		}
		if (StatusPluginCtrl.isFloat(metricOptions.error)) {
			res.error = parseFloat(metricOptions.error);
			res.errorIsNumber = true;
		} else if (metricOptions.error instanceof Date) {
			res.error = metricOptions.error.valueOf();
			res.errorIsNumber = true;
		} else {
			res.error = metricOptions.error;
			res.errorIsNumber = false;
		}
		// console.log('parseThresholds res: ', res)
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
		this.groupError = {};
		this.groupCrit = {};
		this.groupWarn = {};
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

	getThresholdIcon() {
		if (target.warn_icon) {
			return target.warn_icon
		} else if (target.crit_icon) {
			return target.crit_icon
		} else if (target.error_icon){
			return target.error_icon
		} else {
			return null
		}
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
		return text.replace('{c}', count).replace('{s}', status);
	}
}

StatusPluginCtrl.templateUrl = 'module.html';
