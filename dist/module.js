define(["app/plugins/sdk","lodash","app/core/time_series2","app/core/core_module","app/core/utils/kbn","moment"], function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelCtrl = undefined;

var _status_ctrl = __webpack_require__(1);

exports.PanelCtrl = _status_ctrl.StatusPluginCtrl;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.StatusPluginCtrl = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sdk = __webpack_require__(2);

var _lodash = __webpack_require__(3);

var _lodash2 = _interopRequireDefault(_lodash);

var _time_series = __webpack_require__(4);

var _time_series2 = _interopRequireDefault(_time_series);

var _core_module = __webpack_require__(5);

var _core_module2 = _interopRequireDefault(_core_module);

var _kbn = __webpack_require__(6);

var _kbn2 = _interopRequireDefault(_kbn);

var _moment = __webpack_require__(7);

var _moment2 = _interopRequireDefault(_moment);

__webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import 'jquery.flot';
// import 'jquery.flot.pie';

// Set and populate panel defaults
var panelDefaults = {
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
	thresholds: [{
		name: "Warning",
		order: 0,
		color: "rgba(250, 255, 0, 0.9)"
	}, {
		name: "Critical",
		order: 1,
		color: "rgba(255, 125, 0, 0.9)"
	}, {
		name: "Error",
		order: 2,
		color: "rgba(255, 0, 0, 0.9)"
	}]
};

var StatusPluginCtrl = exports.StatusPluginCtrl = function (_MetricsPanelCtrl) {
	_inherits(StatusPluginCtrl, _MetricsPanelCtrl);

	/** @ngInject */
	function StatusPluginCtrl($scope, $injector, $log, $filter, annotationsSrv, uiSegmentSrv) {
		_classCallCheck(this, StatusPluginCtrl);

		var _this = _possibleConstructorReturn(this, (StatusPluginCtrl.__proto__ || Object.getPrototypeOf(StatusPluginCtrl)).call(this, $scope, $injector));

		_lodash2.default.defaultsDeep(_this.panel, panelDefaults);

		//this.log = $log.debug;
		_this.filter = $filter;

		_this.valueHandlers = ['Number Threshold', 'String Threshold', 'Date Threshold', 'Disable Criteria', 'Text Only'];
		_this.aggregations = ['Last', 'First', 'Max', 'Min', 'Sum', 'Avg', 'Delta'];
		_this.displayTypes = ['Regular', 'Annotation'];
		_this.displayAliasTypes = ['If not OK', 'Always'];
		_this.displayValueTypes = _this.getDisplayValueOptions();
		_this.displayTags = ['+/-', 'UP/DOWN', 'TRENDING/FALLING'];
		_this.displayTagsType = ['Line', 'Metric'];
		_this.colorModes = ['Panel', 'Metric', 'Disabled'];
		_this.fontFormats = ['Regular', 'Bold', 'Italic'];
		_this.statusMetrics = [];
		_this.panelShapes = ['Rectangle', 'Ellipse', 'Circle'];
		_this.panelFormat = ['Default', 'Tabular'];

		_this.ASCENDING_ORDER = "ASC";
		_this.DESCENDING_ORDER = "DESC";

		_this.DEFAULT_ERROR_STATUS_ICON = 'https://hds.static.autodesk.com/admin/img/icon_error.gif';
		_this.DEFAULT_OR_STATUS_ICON = 'https://hds.static.autodesk.com/images/table-status-good.svg';

		_this.newThresholdName = null;

		//Push the default status check group
		if (!_this.panel.statusGroups) {
			_this.panel.statusGroups = [];
			_this.panel.statusGroups.unshift({ name: 'Status Checks', alias: '', url: '' });
		}

		// Dates get stored as strings and will need to be converted back to a Date objects
		_lodash2.default.each(_this.panel.targets, function (t) {
			if (t.valueHandler === "Date Threshold") {
				if (typeof t.error != "undefined") t.error = new Date(t.error);
				if (typeof t.crit != "undefined") t.crit = new Date(t.crit);
				if (typeof t.warn != "undefined") t.warn = new Date(t.warn);
			}
		});

		_this.panel.flipTime = _this.panel.flipTime || 5;
		_this.panel.iconSwitch = _this.panel.iconSwitch || false;

		/** Bind events to functions **/
		_this.events.on('render', _this.onRender.bind(_this));
		_this.events.on('refresh', _this.postRefresh.bind(_this));
		_this.events.on('data-error', _this.onDataError.bind(_this));
		_this.events.on('data-received', _this.onDataReceived.bind(_this));
		_this.events.on('data-snapshot-load', _this.onDataReceived.bind(_this));
		_this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));

		_this.onColorChange = _this.onColorChange.bind(_this);

		_this.triggeredStatuses = [];
		_this.maxGroupTriggeredThresholds = {};
		_this.statusMetric = null;

		_this.addFilters();
		_this.updateMeasurementsThresholds();

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = _this.panel.targets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var measurement = _step.value;

				_this.validateThresholdValues(measurement);
				if (measurement.thresholdsOrder == null) {
					measurement.thresholdsOrder = _this.ASCENDING_ORDER;
				}
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		return _this;
	}

	_createClass(StatusPluginCtrl, [{
		key: "getDisplayValueOptions",
		value: function getDisplayValueOptions() {
			return [{ label: 'Never', name: "__never__" }, { label: 'When Alias Displayed', name: "__When_Alias_Displayed__" }].concat(_toConsumableArray(this.panel.thresholds.map(function (el, i) {
				return {
					label: el.name + " and higher",
					name: el.name
				};
			})));
		}
	}, {
		key: "addFilters",
		value: function addFilters() {
			var _this2 = this;

			_core_module2.default.filter('numberOrText', function () {
				var numberOrTextFilter = function numberOrTextFilter(input) {
					if (angular.isNumber(input)) {
						return _this2.filter('number')(input);
					} else {
						return input;
					}
				};

				numberOrTextFilter.$stateful = true;
				return numberOrTextFilter;
			});

			_core_module2.default.filter('numberOrTextWithRegex', function () {
				var numberOrTextFilter = function numberOrTextFilter(input, textRegex) {
					if (angular.isNumber(input)) {
						return _this2.filter('number')(input);
					} else {
						if (textRegex == null || textRegex.length == 0) {
							return input;
						} else {
							var regex = void 0;

							try {
								regex = new RegExp(textRegex);
							} catch (e) {
								return input;
							}

							if (!input) {
								return input;
							}

							var matchResults = input.match(regex);
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
	}, {
		key: "postRefresh",
		value: function postRefresh() {
			var _this3 = this;

			if (this.panel.fixedSpan) {
				this.panel.span = this.panel.fixedSpan;
			}

			this.measurements = this.panel.targets;
			console.log("measurements", [].concat(_toConsumableArray(this.measurements)));
			this.updateMeasurementsThresholds();

			/** Duplicate alias validation **/
			this.duplicates = false;

			this.measurements = _lodash2.default.filter(this.measurements, function (measurement) {
				return !measurement.hide;
			});

			_lodash2.default.each(this.measurements, function (m) {
				var res = _lodash2.default.filter(_this3.measurements, function (measurement) {
					return (m.alias == measurement.alias || m.target == measurement.target && m.target) && !m.hide;
				});

				if (res.length > 1) {
					_this3.duplicates = true;
				}
			});
		}
	}, {
		key: "onInitEditMode",
		value: function onInitEditMode() {
			this.addEditorTab('Options', 'public/plugins/blackmirror1-statusbygroup-panel/editor.html', 2);
			// Load in the supported units-of-measure formats so they can be displayed in the editor
			this.unitFormats = _kbn2.default.getUnitFormats();
		}
	}, {
		key: "setUnitFormat",
		value: function setUnitFormat(measurement, subItem) {
			measurement.units = subItem.value;
			this.render();
		}
	}, {
		key: "fixPanelHeader",
		value: function fixPanelHeader() {
			// Handle the panel top menu height, since it's display doesn't look good with the panel
			var panelHeaderHeight = '';
			if (this.panel.title.length === 0) {
				panelHeaderHeight = '10px';
			}
			console.log("his.$panelContainer", this.$panelContainer);
			this.$panelContainer.find('.panel-header').css('height', panelHeaderHeight);
			this.$panelContainer.find('.panel-menu-container').css('height', panelHeaderHeight);
			this.$panelContainer.find('.fa-caret-down').css('display', 'none');
		}
	}, {
		key: "setElementHeight",
		value: function setElementHeight() {
			// Handle the panel height
			this.$panelContainer.find('.status-panel').css('min-height', this.$panelContoller.height + 'px');
			this.minHeight = this.$panelContoller.height - 10;
		}
	}, {
		key: "setTextMaxWidth",
		value: function setTextMaxWidth() {
			var tail = ' …';
			var panelWidth = this.$panelContainer.innerWidth();
			if (isNaN(panelWidth)) {
				panelWidth = parseInt(panelWidth.slice(0, -2), 10) / 12;
			}
			panelWidth = panelWidth - 20;
			this.maxWidth = panelWidth;
		}
	}, {
		key: "isAutoScrollAlerts",
		value: function isAutoScrollAlerts() {
			if (!this.panel.isAutoScrollOnOverflow) {
				return false;
			}

			var element = this.$panelContainer.find('.status-panel')[0];
			var overflowY = element.offsetHeight < element.scrollHeight;
			return overflowY;
		}
	}, {
		key: "onHandlerChange",
		value: function onHandlerChange(measurement) {
			// If the Threshold type changes between Number/String/Date then try and recast the thresholds to keep consistent
			if (measurement.valueHandler === "Number Threshold") {
				measurement.error = isNaN(Number(measurement.error)) ? undefined : Number(measurement.error);
				measurement.crit = isNaN(Number(measurement.crit)) ? undefined : Number(measurement.crit);
				measurement.warn = isNaN(Number(measurement.warn)) ? undefined : Number(measurement.warn);
			} else if (measurement.valueHandler === "String Threshold") {
				if (typeof measurement.error != "undefined") {
					measurement.error = String(measurement.error);
				}
				if (typeof measurement.crit != "undefined") {
					measurement.crit = String(measurement.crit);
				}
				if (typeof measurement.warn != "undefined") {
					measurement.warn = String(measurement.warn);
				}
			} else if (measurement.valueHandler === "Date Threshold") {
				var c = new Date(measurement.crit),
				    w = new Date(measurement.warn),
				    e = new Date(measurement.error);
				measurement.error = isNaN(e.getTime()) ? undefined : e;
				measurement.crit = isNaN(c.getTime()) ? undefined : c;
				measurement.warn = isNaN(w.getTime()) ? undefined : w;
			}
			this.onRender();
		}
	}, {
		key: "onColorChange",
		value: function onColorChange(item) {
			var _this4 = this;

			return function (color) {
				_this4.panel.colors[item] = color;
				_this4.render();
			};
		}
	}, {
		key: "onAddThreshold",
		value: function onAddThreshold() {

			if (!this.newThresholdName) {
				return;
			}

			// Validate name are unique.
			for (var threshold in this.panel.thresholds) {
				if (threshold.name == this.newThresholdName) {
					alert("This name already exists.");
					return;
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
	}, {
		key: "updateMeasurementsThresholds",
		value: function updateMeasurementsThresholds() {

			console.log("updateMeasurementsThresholds");

			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = this.panel.targets[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var measurement = _step2.value;

					if (!measurement.thresholds) {
						measurement.thresholds = [];
					}

					var measurementsThresholdsMapping = measurement.thresholds.reduce(function (a, x) {
						a[x.name] = x;
						return a;
					}, {});

					var newMeasurementThresholds = [];

					var _iteratorNormalCompletion3 = true;
					var _didIteratorError3 = false;
					var _iteratorError3 = undefined;

					try {
						for (var _iterator3 = this.panel.thresholds[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
							var threshold = _step3.value;


							var previousThresholdValues = measurementsThresholdsMapping[threshold.name] || {};

							newMeasurementThresholds.push({
								name: threshold.name,
								order: threshold.order,
								value: previousThresholdValues.value || null,
								tags: previousThresholdValues.tags || null,
								tags_type: previousThresholdValues.tags_type || null,
								icon: previousThresholdValues.icon || null
							});
						}
					} catch (err) {
						_didIteratorError3 = true;
						_iteratorError3 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion3 && _iterator3.return) {
								_iterator3.return();
							}
						} finally {
							if (_didIteratorError3) {
								throw _iteratorError3;
							}
						}
					}

					measurement.thresholds = newMeasurementThresholds;
					this.validateThresholdValues(measurement);
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
		}
	}, {
		key: "onRemoveThreshold",
		value: function onRemoveThreshold(thresholdToDelete) {
			this.panel.thresholds = this.panel.thresholds.filter(function (a) {
				return a !== thresholdToDelete;
			});
			this.panel.thresholds.forEach(function (el, index) {
				return el.order = index;
			});
			this.updateMeasurementsThresholds();
			var _iteratorNormalCompletion4 = true;
			var _didIteratorError4 = false;
			var _iteratorError4 = undefined;

			try {
				for (var _iterator4 = this.panel.targets[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
					var measurement = _step4.value;

					if (measurement.displayValueWithAlias == thresholdToDelete.name) {
						var index = Math.min(thresholdToDelete.order, this.panel.thresholds.length - 1);
						measurement.displayValueWithAlias = (this.panel.thresholds[index] || this.displayValueTypes[1]).name;
					}
				}
			} catch (err) {
				_didIteratorError4 = true;
				_iteratorError4 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion4 && _iterator4.return) {
						_iterator4.return();
					}
				} finally {
					if (_didIteratorError4) {
						throw _iteratorError4;
					}
				}
			}

			this.displayValueTypes = this.getDisplayValueOptions();
		}
	}, {
		key: "shiftThresholdOrder",
		value: function shiftThresholdOrder(currentOrder, shift) {
			var newOrder = currentOrder + shift;
			if (newOrder < 0 || newOrder >= this.panel.thresholds.length) {
				return;
			}

			this.panel.thresholds[newOrder].order = currentOrder;
			this.panel.thresholds[currentOrder].order = newOrder;

			this.panel.thresholds = this.panel.thresholds.sort(function (a, b) {
				return a.order - b.order;
			});
			this.updateMeasurementsThresholds();
			this.displayValueTypes = this.getDisplayValueOptions();
		}
	}, {
		key: "onSetThresholdColor",
		value: function onSetThresholdColor(threshold) {
			var _this5 = this;

			return function (color) {
				threshold.color = color;
				_this5.render();
			};
		}
	}, {
		key: "onRender",
		value: function onRender() {
			var _this6 = this;

			this.fixPanelHeader();
			this.setElementHeight();
			this.setTextMaxWidth();
			this.upgradeOldVersion();

			if (this.panel.clusterName) {
				this.panel.displayName = this.filter('interpolateTemplateVars')(this.panel.clusterName, this.$scope).replace(new RegExp(this.panel.namePrefix, 'i'), '');
			} else {
				this.panel.displayName = "";
			}

			if (this.panel.flipCard) {
				this.$panelContainer.addClass("effect-hover");
			} else {
				this.$panelContainer.removeClass("effect-hover");
			}

			var targets = this.panel.targets;

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

			if (this.panel.statusGroups) {
				var statusGroupExists = false;
				this.panel.statusGroups.forEach(function (element) {

					_this6.groupTriggeredThresholds[element.name] = [];

					if (element.name === 'Status Checks') {
						statusGroupExists = true;
					}
				});
				if (!statusGroupExists) {
					this.panel.statusGroups.unshift({ name: 'Status Checks', alias: '', url: '' });
				}
			}

			console.log("Series", this.series);

			_lodash2.default.each(this.series, function (s) {
				var target = _lodash2.default.find(targets, function (target) {
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
				if (_this6.panel.statusGroups) {
					_this6.panel.statusGroups.forEach(function (element) {
						if (target.hasOwnProperty('group') && element.name === target.group.name) {
							s.group = element;
						}
					});
				}
				// s.group = target.group;

				if (_this6.validateRegex(target.valueDisplayRegex)) {
					s.valueDisplayRegex = target.valueDisplayRegex;
				}

				var value = void 0;
				switch (target.aggregation) {
					case 'Max':
						value = _lodash2.default.max(s.datapoints, function (point) {
							return point[0];
						})[0];
						value = s.stats.max;
						break;
					case 'Min':
						value = _lodash2.default.min(s.datapoints, function (point) {
							return point[0];
						})[0];
						value = s.stats.min;
						break;
					case 'Delta':
						value = s.datapoints[s.datapoints.length - 1][0] - s.datapoints[0][0];
						value = s.stats.diff;
						break;
					case 'Sum':
						value = 0;
						_lodash2.default.each(s.datapoints, function (point) {
							value += point[0];
						});
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

				if (target.valueHandler == "Number Threshold" || target.valueHandler == "String Threshold" || target.valueHandler == "Date Threshold") {
					_this6.handleThresholdStatus(s, target);
				} else if (target.valueHandler == "Disable Criteria") {
					_this6.handleDisabledStatus(s, target);
				} else if (target.valueHandler == "Text Only") {
					_this6.handleTextOnly(s, target);
				}

				console.log("diplay", _this6.display);
				console.log("annotation", _this6.annotation);
				console.log("groupTriggeredThresholds", _this6.groupTriggeredThresholds);

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
	}, {
		key: "upgradeOldVersion",
		value: function upgradeOldVersion() {
			var _this7 = this;

			var targets = this.panel.targets;

			//Handle legacy code
			_lodash2.default.each(targets, function (target) {
				if (target.valueHandler == null) {
					if (target.displayType != null) {
						target.valueHandler = target.displayType;
						if (target.valueHandler == "Annotation") {
							target.valueHandler = "Text Only";
						}
					} else {
						target.valueHandler = _this7.valueHandlers[0];
					}
					target.displayType = _this7.displayTypes[0];
				}

				if (target.display != null) {
					target.displayAliasType = target.display ? "Always" : _this7.displayAliasTypes[0];
					target.displayValueWithAlias = target.display ? -1 : _this7.displayValueTypes[0].index;
					delete target.display;
				}
			});

			// Depreciate Threshold in favour of Type specific versions
			_lodash2.default.each(targets, function (target) {
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
	}, {
		key: "validateThresholdValues",
		value: function validateThresholdValues(measurement) {
			// !All thresholds should be sorted in ascending order by threshold.order field.
			console.log("validateThresholdValues");

			measurement.isThresholdValuesValid = true;

			if (measurement.thresholds.length < 3) {
				return; // There is no sense to validate if values situated in the right order if there is 0, 1 or 2 elements. Order can be Asc and Desc
			}

			var activeThresholds = measurement.thresholds.filter(function (el) {
				return el.value != null;
			}); // check that value is passed

			if (activeThresholds.length < 2) {
				return;
			}

			for (var i = 0; i < activeThresholds.length - 1; i++) {

				if (measurement.thresholdsOrder === this.ASCENDING_ORDER && activeThresholds[i].value >= activeThresholds[i + 1].value) {
					measurement.isThresholdValuesValid = false;
					return;
				}

				if (measurement.thresholdsOrder === this.DESCENDING_ORDER && activeThresholds[i].value <= activeThresholds[i + 1].value) {
					measurement.isThresholdValuesValid = false;
					return;
				}
			}

			if (this.$panelContainer) {
				this.onRender(); // render if inited
			}
		}
	}, {
		key: "getColor",
		value: function getColor(threshold) {
			if (!threshold) {
				return '#000';
			}

			return this.getColorByThresholdName(threshold.name);
		}
	}, {
		key: "handleThresholdStatus",
		value: function handleThresholdStatus(series, target) {
			series.thresholds = this.parseThresholds(target);
			series.thresholdsOrder = target.thresholdsOrder;

			if (!target.isThresholdValuesValid) {
				console.error("Thresholds are invalid. Ignoring them.");
				return;
			}

			var triggeredThreshold = null;

			var isStatus = false;
			var isCheckRanges = series.thresholds.map(function (el) {
				return el.isNumber;
			}).every(function (el) {
				return el === true;
			});

			if (series.hasOwnProperty('group') && series.group === this.panel.statusGroups[0]) {
				isStatus = true;
			}

			if (isCheckRanges) {
				console.log("isCheckRanges");
				if (series.thresholdsOrder === this.ASCENDING_ORDER) {
					var _iteratorNormalCompletion5 = true;
					var _didIteratorError5 = false;
					var _iteratorError5 = undefined;

					try {

						for (var _iterator5 = series.thresholds[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
							var threshold = _step5.value;

							console.log("series.display_value >= threshold.parsedValue", series.display_value, threshold.parsedValue);
							if (series.display_value >= threshold.parsedValue) {
								triggeredThreshold = threshold;
								// break;
							}
						}
					} catch (err) {
						_didIteratorError5 = true;
						_iteratorError5 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion5 && _iterator5.return) {
								_iterator5.return();
							}
						} finally {
							if (_didIteratorError5) {
								throw _iteratorError5;
							}
						}
					}
				} else if (series.thresholdsOrder === this.DESCENDING_ORDER) {
					var _iteratorNormalCompletion6 = true;
					var _didIteratorError6 = false;
					var _iteratorError6 = undefined;

					try {

						for (var _iterator6 = series.thresholds[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
							var _threshold = _step6.value;

							if (series.display_value <= _threshold.parsedValue) {
								console.log("series.display_value <= threshold.parsedValue", series.display_value, _threshold.parsedValue);
								triggeredThreshold = _threshold;
								// break;
							}
						}
					} catch (err) {
						_didIteratorError6 = true;
						_iteratorError6 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion6 && _iterator6.return) {
								_iterator6.return();
							}
						} finally {
							if (_didIteratorError6) {
								throw _iteratorError6;
							}
						}
					}
				}
			} else {
				console.log("is NOT CheckRanges");
				var _iteratorNormalCompletion7 = true;
				var _didIteratorError7 = false;
				var _iteratorError7 = undefined;

				try {
					for (var _iterator7 = series.thresholds[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
						var _threshold2 = _step7.value;

						if (series.display_value == _threshold2.parsedValue) {
							triggeredThreshold = _threshold2;
							break;
						}
					}
				} catch (err) {
					_didIteratorError7 = true;
					_iteratorError7 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion7 && _iterator7.return) {
							_iterator7.return();
						}
					} finally {
						if (_didIteratorError7) {
							throw _iteratorError7;
						}
					}
				}
			}

			// Add units-of-measure and decimal formatting or date formatting as needed
			series.display_value = this.formatDisplayValue(series.display_value, target);
			series.display_icon = this.getThresholdIcon(triggeredThreshold);
			series.color = this.getColor(triggeredThreshold);

			var _getTag = this.getTag(series.display_value, triggeredThreshold);

			var _getTag2 = _slicedToArray(_getTag, 3);

			series.tag = _getTag2[0];
			series.tags = _getTag2[1];
			series.tags_type = _getTag2[2];

			series.triggeredThreshold = triggeredThreshold;
			var displayAlias = false;

			if (target.displayAliasType === "Always") {
				displayAlias = true;
			} else if (target.displayAliasType === "If not OK" && triggeredThreshold) {
				displayAlias = true;
			}

			var displayValue = false;

			if (target.displayValueWithAlias === '__When_Alias_Displayed__' && displayAlias) {
				displayValue = true;
			} else if (target.displayValueWithAlias === '__never__') {
				displayValue = false;
			} else if (triggeredThreshold) {
				var thresholdToDisplayValue = this.panel.thresholds.find(function (el) {
					return el.name == target.displayValueWithAlias;
				});
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

			if (displayAlias && !triggeredThreshold) {
				// If OK state
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
			} else if (isStatus) {
				// FOR OK status
				this.statusMetrics.push(series);
			}

			this.groupedTriggeredStatuses = this.groupTriggeredStatusesByThresholds(this.triggeredStatuses);

			for (var group in this.groupTriggeredThresholds) {
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
	}, {
		key: "getTag",
		value: function getTag(value, triggeredThreshold) {

			if (!triggeredThreshold) {
				return [null, null, null];
			}

			if (triggeredThreshold.tags === '+/-') {
				return [value > 0 ? '+' : '-', triggeredThreshold.tags, triggeredThreshold.tags_type];
			} else if (triggeredThreshold.tags === 'UP/DOWN') {
				return [value > 0 ? 'UP' : 'DOWN', triggeredThreshold.tags, triggeredThreshold.tags_type];
			} else if (triggeredThreshold.tags === 'TRENDING/FALLING') {
				return [value > 0 ? 'TRENDING' : 'FALLING', triggeredThreshold.tags, triggeredThreshold.tags_type];
			} else {
				return [null, null, null];
			}
		}
	}, {
		key: "formatDisplayValue",
		value: function formatDisplayValue(value, target) {
			// Format the display value. Set to "Invalid" if value is out-of-bounds or a type mismatch with the handler
			if (target.valueHandler === "Number Threshold") {
				if (_lodash2.default.isFinite(value)) {
					var units = typeof target.units === "string" ? target.units : 'none';
					var decimals = this.decimalPlaces(value);
					// We define the decimal percision by the minimal decimal needed
					decimals = typeof target.decimals === "number" ? Math.min(target.decimals, decimals) : decimals;
					value = _kbn2.default.valueFormats[units](value, decimals, null);
				} else {
					value = "Invalid Number";
				}
			} else if (target.valueHandler === "String Threshold") {
				if (value === undefined || value === null || value !== value) {
					value = "Invalid String";
				}
			} else if (target.valueHandler === "Date Threshold") {
				if (_lodash2.default.isFinite(value)) {
					var date = (0, _moment2.default)(new Date(value));
					if (this.dashboard.isTimezoneUtc()) date = date.utc();
					value = date.format(target.dateFormat);
				} else {
					value = "Invalid Date";
				}
			}
			return value;
		}
	}, {
		key: "decimalPlaces",
		value: function decimalPlaces(num) {
			var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
			if (!match) {
				return 0;
			}
			return Math.max(0,
			// Number of digits right of decimal point.
			(match[1] ? match[1].length : 0) - (
			// Adjust for scientific notation.
			match[2] ? +match[2] : 0));
		}
	}, {
		key: "handleDisabledStatus",
		value: function handleDisabledStatus(series, target) {
			series.displayType = this.displayTypes[0];
			series.disabledValue = target.disabledValue;

			if (series.display_value == series.disabledValue) {
				this.disabled.push(series);
			}
		}
	}, {
		key: "handleTextOnly",
		value: function handleTextOnly(series, target) {
			if (series.displayType == "Annotation") {
				this.annotation.push(series);
			} else {
				this.display.push(series);
			}
		}
	}, {
		key: "getStatusWithGreatedOrder",
		value: function getStatusWithGreatedOrder(triggeredThresholds) {
			var maxOrder = -1;
			var greatestThreshold = null;

			var _iteratorNormalCompletion8 = true;
			var _didIteratorError8 = false;
			var _iteratorError8 = undefined;

			try {
				for (var _iterator8 = triggeredThresholds[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
					var series = _step8.value;

					if (series.triggeredThreshold.order > maxOrder) {
						maxOrder = series.triggeredThreshold.order;
						greatestThreshold = series.triggeredThreshold;
					}
				}
			} catch (err) {
				_didIteratorError8 = true;
				_iteratorError8 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion8 && _iterator8.return) {
						_iterator8.return();
					}
				} finally {
					if (_didIteratorError8) {
						throw _iteratorError8;
					}
				}
			}

			return greatestThreshold;
		}
	}, {
		key: "getMetricWithGreatedOrder",
		value: function getMetricWithGreatedOrder(triggeredThresholds) {
			var maxOrder = -1;
			var greatestMetric = null;

			var _iteratorNormalCompletion9 = true;
			var _didIteratorError9 = false;
			var _iteratorError9 = undefined;

			try {
				for (var _iterator9 = triggeredThresholds[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
					var series = _step9.value;

					if (series.triggeredThreshold.order > maxOrder) {
						maxOrder = series.triggeredThreshold.order;
						greatestMetric = series;
					}
				}
			} catch (err) {
				_didIteratorError9 = true;
				_iteratorError9 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion9 && _iterator9.return) {
						_iterator9.return();
					}
				} finally {
					if (_didIteratorError9) {
						throw _iteratorError9;
					}
				}
			}

			return greatestMetric;
		}
	}, {
		key: "updatePanelState",
		value: function updatePanelState() {
			if (this.duplicates) {
				this.panelState = 'error-state';
			} else if (this.disabled.length > 0) {
				this.panelState = 'disabled-state';
			} else if (this.triggeredStatuses.length > 0) {
				this.panelState = this.getStatusWithGreatedOrder(this.triggeredStatuses).name;
			} else if ((this.series == undefined || this.series.length == 0) && this.panel.isGrayOnNoData) {
				this.panelState = 'no-data-state';
			} else {
				this.panelState = 'ok-state';
			}
		}
	}, {
		key: "hideAllWarnings",
		value: function hideAllWarnings() {
			for (var i = span.length; i--;) {
				span[i].className = 'NameHighlights';
			}
		}
	}, {
		key: "handleCssDisplay",
		value: function handleCssDisplay() {
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
			} else if (this.panel.panelShape === 'Ellipse') {
				this.$panelContainer.css('border-radius', 50 + '%');
				this.$panelContainer.css('width', '');
				this.$panelContainer.css('max-width', '');
				this.$panelContainer.css('height', '');
				this.$panelContainer.css('margin', '');
				this.$panelContainer.css('max-height', '');
				this.$panelContainer.css('padding-bottom', '');
				this.$panelContainer.find('.bottom-section').css('height', '');
			} else if (this.panel.panelShape === 'Circle') {
				this.$panelContainer.css('border-radius', 50 + '%');
				this.$panelContainer.css('height', height + 'px');
				this.$panelContainer.css('width', height + 'px');
				this.$panelContainer.css('margin', 'auto');
			}

			var okColor = this.panel.isIgnoreOKColors ? '' : this.panel.colors.ok;

			if (this.panel.colorMode === "Panel") {

				if (this.panelState === 'disabled-state' || this.panelState == 'no-data-state') {
					this.$panelContainer.css('background-color', this.panel.colors.disable);
				} else if (this.panelState === 'ok-state') {
					this.$panelContainer.css('background-color', okColor);
				} else if (this.panelState === 'error-state') {
					this.$panelContainer.css('background-color', this.panel.colors.error);
				} else {
					this.$panelContainer.css('background-color', this.getColorByThresholdName(this.panelState));
				}
			} else {
				this.$panelContainer.css('background-color', '');
			}
		}
	}, {
		key: "getColorByThresholdName",
		value: function getColorByThresholdName(thresholdName) {
			var _iteratorNormalCompletion10 = true;
			var _didIteratorError10 = false;
			var _iteratorError10 = undefined;

			try {
				for (var _iterator10 = this.panel.thresholds[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
					var threshold = _step10.value;

					if (thresholdName === threshold.name) {
						return threshold.color;
					}
				}
			} catch (err) {
				_didIteratorError10 = true;
				_iteratorError10 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion10 && _iterator10.return) {
						_iterator10.return();
					}
				} finally {
					if (_didIteratorError10) {
						throw _iteratorError10;
					}
				}
			}

			return '';
		}
	}, {
		key: "handleMaxAlertsToShow",
		value: function handleMaxAlertsToShow() {
			var _this8 = this;

			if (this.panel.maxAlertNumber != null && this.panel.maxAlertNumber >= 0) {
				var currentMaxAllowedAlerts = this.panel.maxAlertNumber;
				var filteredOutAlerts = 0;
				var arrayNamesToSlice = ["disabled",, "error", "crit", "warn", "display"];
				arrayNamesToSlice.forEach(function (arrayName) {
					var originAlertCount = _this8[arrayName].length;
					_this8[arrayName] = _this8[arrayName].slice(0, currentMaxAllowedAlerts);
					currentMaxAllowedAlerts = Math.max(currentMaxAllowedAlerts - _this8[arrayName].length, 0);
					filteredOutAlerts += originAlertCount - _this8[arrayName].length;
				});

				if (filteredOutAlerts > 0) {
					this.extraMoreAlerts = "+ " + filteredOutAlerts + " more";
				}
			}
		}
	}, {
		key: "parseUri",
		value: function parseUri() {
			if (this.panel.links && this.panel.links.length > 0) {
				var link = this.panel.links[0];

				if (link.type == "absolute") {
					this.uri = link.url;
				} else {
					this.uri = 'dashboard/' + link.dashUri;
				}

				if (link.params) {
					this.uri += "?" + link.params;
				}

				this.targetBlank = link.targetBlank;
			} else {
				this.uri = undefined;
			}
		}
	}, {
		key: "validateRegex",
		value: function validateRegex(textRegex) {
			if (textRegex == null || textRegex.length == 0) {
				return true;
			}
			try {
				var regex = new RegExp(textRegex);
				return true;
			} catch (e) {
				return false;
			}
		}
	}, {
		key: "parseThresholds",
		value: function parseThresholds(metricOptions) {
			var res = [];

			var _iteratorNormalCompletion11 = true;
			var _didIteratorError11 = false;
			var _iteratorError11 = undefined;

			try {
				for (var _iterator11 = metricOptions.thresholds[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
					var threshold = _step11.value;


					// Skip inactive thresholds
					if (threshold.value == null) {
						continue;
					}

					var parsedThreshold = {};

					for (var key in threshold) {
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
			} catch (err) {
				_didIteratorError11 = true;
				_iteratorError11 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion11 && _iterator11.return) {
						_iterator11.return();
					}
				} finally {
					if (_didIteratorError11) {
						throw _iteratorError11;
					}
				}
			}

			return res;
		}
	}, {
		key: "onDataReceived",
		value: function onDataReceived(dataList) {
			this.series = dataList.map(StatusPluginCtrl.seriesHandler.bind(this));
			this.render();
		}
	}, {
		key: "onDataError",
		value: function onDataError() {
			this.error = [];
			this.crit = [];
			this.warn = [];
			this.groupTriggeredThresholds = {};
			this.maxGroupTriggeredThresholds = {};
		}
	}, {
		key: "$onDestroy",
		value: function $onDestroy() {
			if (this.timeoutId) {
				clearInterval(this.timeoutId);
			}
		}
	}, {
		key: "autoFlip",
		value: function autoFlip() {
			var _this9 = this;

			if (this.timeoutId) {
				clearInterval(this.timeoutId);
			}
			if (this.panel.flipCard && (this.error.length > 0 || this.crit.length > 0 || this.warn.length > 0 || this.disabled.length > 0)) {
				this.timeoutId = setInterval(function () {
					_this9.$panelContainer.toggleClass("flipped");
				}, this.panel.flipTime * 1000);
			}
		}
	}, {
		key: "getThresholdIcon",
		value: function getThresholdIcon(triggeredThreshold) {
			if (triggeredThreshold) {
				return triggeredThreshold.icon || "";
			}
			return "";
		}
	}, {
		key: "link",
		value: function link(scope, elem, attrs, ctrl) {
			this.$panelContainer = elem;
			this.$panelContainer.addClass("st-card");
			this.$panelContoller = ctrl;
		}
	}, {
		key: "addGroup",
		value: function addGroup() {
			var _this10 = this;

			if (this.panel.groupname) {
				var duplicate = false;
				this.panel.statusGroups.forEach(function (element) {
					if (element.name === _this10.panel.groupname) {
						duplicate = true;
					}
				});
				if (!duplicate) {
					this.panel.statusGroups.push({ name: this.panel.groupname, alias: '', url: '' });
					this.panel.groupname = '';
				}
			}
			this.render();
		}
	}, {
		key: "removeGroup",
		value: function removeGroup(group) {
			this.panel.statusGroups = _lodash2.default.without(this.panel.statusGroups, group);
			this.render();
		}
	}, {
		key: "formatAlias",
		value: function formatAlias(text, count, status) {
			console.error("formatAlias", text, count, status);
			return text.replace('{c}', count).replace('{s}', status);
		}
	}, {
		key: "groupTriggeredStatusesByThresholds",
		value: function groupTriggeredStatusesByThresholds(triggeredStatuses) {
			var grouped = {};
			var _iteratorNormalCompletion12 = true;
			var _didIteratorError12 = false;
			var _iteratorError12 = undefined;

			try {
				for (var _iterator12 = triggeredStatuses[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
					var status = _step12.value;

					if (grouped.hasOwnProperty(status.triggeredThreshold.name)) {
						grouped[status.triggeredThreshold.name].push(status);
					} else {
						grouped[status.triggeredThreshold.name] = [status];
					}
				}
			} catch (err) {
				_didIteratorError12 = true;
				_iteratorError12 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion12 && _iterator12.return) {
						_iterator12.return();
					}
				} finally {
					if (_didIteratorError12) {
						throw _iteratorError12;
					}
				}
			}

			return grouped;
		}
	}, {
		key: "getFirstNotNullIcon",
		value: function getFirstNotNullIcon(series, defaultValue) {
			var _iteratorNormalCompletion13 = true;
			var _didIteratorError13 = false;
			var _iteratorError13 = undefined;

			try {
				for (var _iterator13 = series[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
					var el = _step13.value;

					var icon = this.getThresholdIcon(el.triggeredThreshold);
					if (icon != '' & icon != null) {
						return icon;
					}
				}
			} catch (err) {
				_didIteratorError13 = true;
				_iteratorError13 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion13 && _iterator13.return) {
						_iterator13.return();
					}
				} finally {
					if (_didIteratorError13) {
						throw _iteratorError13;
					}
				}
			}

			return defaultValue;
		}
	}], [{
		key: "isFloat",
		value: function isFloat(val) {
			if (!isNaN(val) && val.toString().toLowerCase().indexOf('e') == -1) {
				return true;
			}
			return false;
		}
	}, {
		key: "seriesHandler",
		value: function seriesHandler(seriesData) {
			var series = new _time_series2.default({
				datapoints: seriesData.datapoints,
				alias: seriesData.target
			});

			series.flotpairs = series.getFlotPairs("connected");

			return series;
		}
	}]);

	return StatusPluginCtrl;
}(_sdk.MetricsPanelCtrl);

StatusPluginCtrl.templateUrl = 'module.html';

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(9);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(11)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/dist/cjs.js!./status_panel.css", function() {
		var newContent = require("!!../../node_modules/css-loader/dist/cjs.js!./status_panel.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)(false);
// Module
exports.push([module.i, ".status-panel {\n\toverflow: hidden;\n\tposition: relative;\n\twidth: 100%;\n\theight: 100%;\n\t/*text-align: center;*/\n\twidth: -moz-fit-content;\n\ttext-align: left;\n\tmargin-left: auto;\n\tmargin-right: auto;\n  }\n  .status-panel h1 {\n\tfont-size: 1.5rem;\n  }\n  .status-panel .st-card-front {\n\tposition: absolute;\n\twidth: 100%;\n\theight: 100%;\n\tdisplay: flex;\n\tflex-direction: column;\n\tjustify-content: center;\n\talign-content: center;\n  }\n  .status-panel .st-card-back {\n\tposition: relative;\n\tdisplay: flex;\n\tjustify-content: space-between;\n\tflex-direction: column;\n  }\n  .status-panel .st-card-back .top_section .status-panel-annotation_row {\n\ttext-align: left;\n\tfont-size: 0.85rem;\n  }\n  .status-panel .st-card-back .top_section .status-panel-annotation_row .row-overflow {\n\tmax-width: 150px;\n\toverflow: hidden;\n\ttext-overflow: ellipsis;\n\twhite-space: nowrap;\n  }\n  .status-panel .st-card-back .bottom_section {\n\tdisplay: flex;\n\tflex-direction: column;\n\tjustify-content: center;\n\talign-content: center;\n  }\n  .status-panel .st-card-back .bottom_section .status_alerts_row {\n\tmin-height: 1px;\n  }\n  .status-panel .st-card-back .bottom_section .status_alerts_row .status_extra_alerts {\n\tpadding-top: 2px;\n\tfont-size: 0.85rem;\n  }\n  .status-panel .st-card-back .center_content_hidden_section {\n\tmin-height: 1px;\n  }\n  .status-panel .st-card-front,\n  .status-panel .st-card-back {\n\tbackface-visibility: hidden;\n\ttransition: transform 0.5s;\n  }\n  \n  .marquee_container {\n\toverflow: hidden;\n  }\n  .marquee_container .marquee_element {\n\tbackface-visibility: hidden;\n\ttransition: transform 0.5s;\n\tdisplay: inline-block;\n\tanimation: marquee_container 15s linear infinite;\n  }\n  .marquee_container .marquee_element:hover {\n\tanimation-play-state: paused;\n  }\n  \n  /* Make it move */\n  @keyframes marquee_container {\n\t0% {\n\t  transform: translate(0, 100%);\n\t}\n\t100% {\n\t  transform: translate(0, -100%);\n\t}\n  }\n  .st-card-front .ok-text, .st-card-front .warning-text, .st-card-front .fail-text, .st-card-front .no-data-text, .st-card-front .disabled-text {\n\tdisplay: none;\n\tfont-size: 2rem;\n  }\n  \n  .ok-state .ok-text {\n\tdisplay: block;\n  }\n  \n  .warn-state .warning-text {\n\tdisplay: block;\n  }\n  \n  .error-state .fail-text {\n\tdisplay: block;\n  }\n  \n  .no-data-state .no-data-text {\n\tdisplay: block;\n  }\n  \n  .disabled-state .disabled-text {\n\tdisplay: block;\n  }\n  \n  .st-card.effect-hover .st-card-back {\n\t-webkit-transform: rotateY(-180deg);\n\ttransform: rotateY(-180deg);\n  }\n  \n  .st-card.effect-hover:hover .st-card-front, .st-card.effect-hover.flipped .st-card-front {\n\t-webkit-transform: rotateY(-180deg);\n\ttransform: rotateY(-180deg);\n  }\n  \n  .st-card.effect-hover:hover .st-card-back, .st-card.effect-hover.flipped .st-card-back {\n\t-webkit-transform: rotateY(0);\n\ttransform: rotateY(0);\n  }\n  \n  .st-card:not(.effect-hover) .st-card-front {\n\tdisplay: none;\n  }\n  \n  .boldAlertMetric {\n\tfont-weight: bold;\n  }\n  \n  .italicAlertMetric {\n\tfont-style: italic;\n  }\n  \n  .example-container {\n\theight: auto;\n\twidth: auto;\n\toverflow: auto;\n  }\n  \n  table {\n\twidth: auto;\n\tborder: 1px solid #080808;\n\tborder-collapse: collapse !important;\n  }\n  \n  td.icon {\n  /*  width: 21px;\n\twidth: fit-content;*/\n\twidth: auto;\n\tborder-right: 1px solid #080808;\n\tpadding: 5px;\n  }\n  \n  td.name {\n\twidth: 200px !important;\n\t/*width: fit-content;*/\n\tborder-right: 1px solid #080808;\n\tpadding: 5px;\n  }\n  \n  td.value {\n\twidth: 150px;\n\tpadding: 5px;\n  }\n  \n  td.mat-column-star {\n\twidth: 20px;\n\tpadding-right: 8px;\n  }\n  \n  th.mat-column-position, td.mat-column-position {\n\tpadding-left: 8px;\n  }\n  \n  img.icon {\n\twidth: 21px;\n\theight: 21px;\n  }\n\n\n  .shift-threshold-button {\n\tmargin-left: 10px;\n\tfont-weight: 600;\n\tfont-size: 16px;\n\tcursor: pointer;\n  }\n\n  .error-message {\n\t  color: red;\n\t  padding: 5px;\n  }", ""]);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names

module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(12);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ })
/******/ ])});;
//# sourceMappingURL=module.js.map