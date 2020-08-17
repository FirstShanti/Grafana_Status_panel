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
	isAutoScrollOnOverflow: false
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
		_this.displayAliasTypes = ['Warning / Critical / Error', 'Always'];
		_this.displayValueTypes = ['Never', 'When Alias Displayed', 'Warning / Critical / Error', 'Critical Only', 'Error only'];
		_this.displayTags = ['+/-', 'UP/DOWN', 'TRENDING/FALLING'];
		_this.displayTagsType = ['Line', 'Metric'];
		_this.colorModes = ['Panel', 'Metric', 'Disabled'];
		_this.fontFormats = ['Regular', 'Bold', 'Italic'];
		_this.statusMetrics = [];
		_this.panelShapes = ['Rectangle', 'Ellipse', 'Circle'];

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

		_this.statusError = [];
		_this.statusCrit = [];
		_this.statusWarn = [];
		_this.statusMetric = null;

		_this.addFilters();
		return _this;
	}

	_createClass(StatusPluginCtrl, [{
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
		key: "onRender",
		value: function onRender() {
			var _this5 = this;

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

			if (this.panel.statusGroups) {
				var statusGroupExists = false;
				this.panel.statusGroups.forEach(function (element) {
					_this5.groupError[element.name] = [];
					_this5.groupCrit[element.name] = [];
					_this5.groupWarn[element.name] = [];
					if (element.name === 'Status Checks') {
						statusGroupExists = true;
					}
				});
				if (!statusGroupExists) {
					this.panel.statusGroups.unshift({ name: 'Status Checks', alias: '', url: '' });
				}
			}

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
				if (_this5.panel.statusGroups) {
					_this5.panel.statusGroups.forEach(function (element) {
						if (target.hasOwnProperty('group') && element.name === target.group.name) {
							s.group = element;
						}
					});
				}
				// s.group = target.group;

				if (_this5.validateRegex(target.valueDisplayRegex)) {
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
					_this5.handleThresholdStatus(s, target);
				} else if (target.valueHandler == "Disable Criteria") {
					_this5.handleDisabledStatus(s, target);
				} else if (target.valueHandler == "Text Only") {
					_this5.handleTextOnly(s, target);
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
	}, {
		key: "upgradeOldVersion",
		value: function upgradeOldVersion() {
			var _this6 = this;

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
						target.valueHandler = _this6.valueHandlers[0];
					}
					target.displayType = _this6.displayTypes[0];
				}

				if (target.display != null) {
					target.displayAliasType = target.display ? "Always" : _this6.displayAliasTypes[0];
					target.displayValueWithAlias = target.display ? 'When Alias Displayed' : _this6.displayValueTypes[0];
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
		key: "handleThresholdStatus",
		value: function handleThresholdStatus(series, target) {
			series.thresholds = StatusPluginCtrl.parseThresholds(target);
			series.inverted = series.thresholds.error < series.thresholds.crit && series.thresholds.crit < series.thresholds.warn;

			var isError = false;
			var isCritical = false;
			var isWarning = false;
			var isStatus = false;
			var isCheckRanges = series.thresholds.errorIsNumber && series.thresholds.warnIsNumber && series.thresholds.critIsNumber;

			alert(series.alias);

			if (series.hasOwnProperty('group') && series.group === this.panel.statusGroups[0]) {
				isStatus = true;
				// this.statusMetrics.push(series);
			}

			if (isCheckRanges) {
				if (!series.inverted) {
					if (series.display_value >= series.thresholds.error) {
						isError = true;
					} else if (series.display_value >= series.thresholds.crit && series.alias) {
						isCritical = true;
					} else if (series.display_value >= series.thresholds.warn) {
						isWarning = true;
					}
				} else {
					if (series.display_value <= series.thresholds.error) {
						isError = true;
					} else if (series.display_value <= series.thresholds.crit && series.alias) {
						isCritical = true;
					} else if (series.display_value <= series.thresholds.warn) {
						isWarning = true;
					}
				}
			} else {
				if (series.display_value == series.thresholds.error) {
					isError = true;
				} else if (series.display_value == series.thresholds.crit && series.alias) {
					isCritical = true;
				} else if (series.display_value == series.thresholds.warn) {
					isWarning = true;
				}
			}

			// Add units-of-measure and decimal formatting or date formatting as needed
			series.display_value = this.formatDisplayValue(series.display_value, target);
			series.display_icon = this.getThresholdIcon(target)[(series.error_tag, series.error_tags, series.error_tags_type)] = this.getTag(series.display_value, target.error_tags, target.error_tags_type);

			var _getTag = this.getTag(series.display_value, target.crit_tags, target.crit_tags_type);

			var _getTag2 = _slicedToArray(_getTag, 3);

			series.crit_tag = _getTag2[0];
			series.crit_tags = _getTag2[1];
			series.crit_tags_type = _getTag2[2];

			var _getTag3 = this.getTag(series.display_value, target.warn_tags, target.warn_tags_type);

			var _getTag4 = _slicedToArray(_getTag3, 3);

			series.warn_tag = _getTag4[0];
			series.warn_tags = _getTag4[1];
			series.warn_tags_type = _getTag4[2];


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
			} else if (isCritical) {
				//In critical state we don't show the error as annotation
				series.displayType = this.displayTypes[0];
				series.isDisplayValue = displayValueWhenAliasDisplayed || displayValueFromWarning || displayValueFromCritical;
				if (isStatus) {
					this.statusCrit.push(series);
				} else {
					this.crit.push(series);
					if (series.hasOwnProperty('group')) {
						this.groupCrit[series.group.name].push(series);
					}
				}
			} else if (isWarning) {
				//In warning state we don't show the warning as annotation
				series.displayType = this.displayTypes[0];
				series.isDisplayValue = displayValueWhenAliasDisplayed || displayValueFromWarning;
				if (isStatus) {
					this.statusWarn.push(series);
				} else {
					this.warn.push(series);
					if (series.hasOwnProperty('group')) {
						this.groupWarn[series.group.name].push(series);
					}
				}
			} else if ("Always" == target.displayAliasType) {
				series.isDisplayValue = displayValueWhenAliasDisplayed;
				if (series.displayType == "Annotation") {
					this.annotation.push(series);
				} else {
					this.display.push(series);
				}
			} else if (isStatus) {
				this.statusMetrics.push(series);
			}
		}
	}, {
		key: "getTag",
		value: function getTag(value, displayTags, displayTagsType) {
			if (displayTags === '+/-') {
				return [value > 0 ? '+' : '-', displayTags, displayTagsType];
			} else if (displayTags === 'UP/DOWN') {
				return [value > 0 ? 'UP' : 'DOWN', displayTags, displayTagsType];
			} else if (displayTags === 'TRENDING/FALLING') {
				return [value > 0 ? 'TRENDING' : 'FALLING', displayTags, displayTagsType];
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
		key: "updatePanelState",
		value: function updatePanelState() {
			if (this.duplicates) {
				this.panelState = 'error-state';
			} else if (this.disabled.length > 0) {
				this.panelState = 'disabled-state';
			} else if (this.statusCrit.length > 0 || this.statusError.length > 0) {
				this.panelState = 'error-state';
			} else if (this.statusWarn.length > 0) {
				this.panelState = 'warn-state';
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
				switch (this.panelState) {
					case 'disabled-state':
						this.$panelContainer.css('background-color', this.panel.colors.disable);break;
					case 'error-state':
						this.$panelContainer.css('background-color', this.panel.colors.crit);break;
					case 'warn-state':
						this.$panelContainer.css('background-color', this.panel.colors.warn);break;
					case 'no-data-state':
						this.$panelContainer.css('background-color', this.panel.colors.disable);break;
					default:
						this.$panelContainer.css('background-color', okColor);break;
				}
			} else {
				this.$panelContainer.css('background-color', '');
			}
		}
	}, {
		key: "handleMaxAlertsToShow",
		value: function handleMaxAlertsToShow() {
			var _this7 = this;

			if (this.panel.maxAlertNumber != null && this.panel.maxAlertNumber >= 0) {
				var currentMaxAllowedAlerts = this.panel.maxAlertNumber;
				var filteredOutAlerts = 0;
				var arrayNamesToSlice = ["disabled",, "error", "crit", "warn", "display"];
				arrayNamesToSlice.forEach(function (arrayName) {
					var originAlertCount = _this7[arrayName].length;
					_this7[arrayName] = _this7[arrayName].slice(0, currentMaxAllowedAlerts);
					currentMaxAllowedAlerts = Math.max(currentMaxAllowedAlerts - _this7[arrayName].length, 0);
					filteredOutAlerts += originAlertCount - _this7[arrayName].length;
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
			this.groupError = {};
			this.groupCrit = {};
			this.groupWarn = {};
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
			var _this8 = this;

			if (this.timeoutId) {
				clearInterval(this.timeoutId);
			}
			if (this.panel.flipCard && (this.error.length > 0 || this.crit.length > 0 || this.warn.length > 0 || this.disabled.length > 0)) {
				this.timeoutId = setInterval(function () {
					_this8.$panelContainer.toggleClass("flipped");
				}, this.panel.flipTime * 1000);
			}
		}
	}, {
		key: "getThresholdIcon",
		value: function getThresholdIcon() {
			if (target.warn_icon) {
				return target.warn_icon;
			} else if (target.crit_icon) {
				return target.crit_icon;
			} else if (target.error_icon) {
				return target.error_icon;
			} else {
				return null;
			}
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
			var _this9 = this;

			if (this.panel.groupname) {
				var duplicate = false;
				this.panel.statusGroups.forEach(function (element) {
					if (element.name === _this9.panel.groupname) {
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
			return text.replace('{c}', count).replace('{s}', status);
		}
	}], [{
		key: "parseThresholds",
		value: function parseThresholds(metricOptions) {
			var res = {};

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
	}, {
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

exports = module.exports = __webpack_require__(9)(false);
// Module
exports.push([module.i, ".status-panel {\n  overflow: hidden;\n  position: relative;\n  width: 100%;\n  height: 100%;\n  width: -moz-fit-content;\n  text-align: left;\n  margin-left: auto;\n  margin-right: auto; }\n  .status-panel h1 {\n    font-size: 1.5rem; }\n  .status-panel .st-card-front {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-content: center; }\n  .status-panel .st-card-back {\n    position: relative;\n    display: flex;\n    justify-content: space-between;\n    flex-direction: column; }\n    .status-panel .st-card-back .top_section .status-panel-annotation_row {\n      text-align: left;\n      font-size: 0.85rem; }\n      .status-panel .st-card-back .top_section .status-panel-annotation_row .row-overflow {\n        max-width: 150px;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap; }\n    .status-panel .st-card-back .bottom_section {\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      align-content: center; }\n      .status-panel .st-card-back .bottom_section .status_alerts_row {\n        min-height: 1px; }\n        .status-panel .st-card-back .bottom_section .status_alerts_row .status_extra_alerts {\n          padding-top: 2px;\n          font-size: 0.85rem; }\n    .status-panel .st-card-back .center_content_hidden_section {\n      min-height: 1px; }\n  .status-panel .st-card-front,\n  .status-panel .st-card-back {\n    backface-visibility: hidden;\n    transition: transform 0.5s; }\n\n.marquee_container {\n  overflow: hidden; }\n  .marquee_container .marquee_element {\n    backface-visibility: hidden;\n    transition: transform 0.5s;\n    display: inline-block;\n    animation: marquee_container 15s linear infinite; }\n  .marquee_container .marquee_element:hover {\n    animation-play-state: paused; }\n\n/* Make it move */\n@keyframes marquee_container {\n  0% {\n    transform: translate(0, 100%); }\n  100% {\n    transform: translate(0, -100%); } }\n\n.st-card-front .ok-text, .st-card-front .warning-text, .st-card-front .fail-text, .st-card-front .no-data-text, .st-card-front .disabled-text {\n  display: none;\n  font-size: 2.0rem; }\n\n.ok-state .ok-text {\n  display: block; }\n\n.warn-state .warning-text {\n  display: block; }\n\n.error-state .fail-text {\n  display: block; }\n\n.no-data-state .no-data-text {\n  display: block; }\n\n.disabled-state .disabled-text {\n  display: block; }\n\n.st-card.effect-hover .st-card-back {\n  -webkit-transform: rotateY(-180deg);\n  transform: rotateY(-180deg); }\n\n.st-card.effect-hover:hover .st-card-front, .st-card.effect-hover.flipped .st-card-front {\n  -webkit-transform: rotateY(-180deg);\n  transform: rotateY(-180deg); }\n\n.st-card.effect-hover:hover .st-card-back, .st-card.effect-hover.flipped .st-card-back {\n  -webkit-transform: rotateY(0);\n  transform: rotateY(0); }\n\n.st-card:not(.effect-hover) .st-card-front {\n  display: none; }\n\n.boldAlertMetric {\n  font-weight: bold; }\n\n.italicAlertMetric {\n  font-style: italic; }\n\n.icons {\n  width: 21px;\n  height: 21px;\n  display: none; }\n\n.icons-on {\n  display: initial; }\n", ""]);


/***/ }),
/* 9 */
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

/***/ })
/******/ ])});;