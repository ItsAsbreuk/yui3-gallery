if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js",
    code: []
};
_yuitest_coverage["build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js"].code=["YUI.add('gallery-itsadatetimepicker', function (Y, NAME) {","","'use strict';","","/**"," *"," * Class ITSADateTimePicker"," *"," *"," * Class that pickes dates and times using Promises. It can be used as a date-picker, time-picker or both.<br />"," * The Class also can render 3 button-Nodes with calendar-icon, time-icon or both."," *"," * @module gallery-itsadatetimepicker"," * @extends Base"," * @class ITSADateTimePicker"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var Lang = Y.Lang,","    YNode = Y.Node,","    YArray = Y.Array,","    WIDGET_CLASS = 'itsa-datetimepicker',","    LOADING_CLASS = WIDGET_CLASS + '-loading',","    PANEL_CLASS = WIDGET_CLASS + '-panel',","    TIME_CHANGED_CLASS = WIDGET_CLASS + '-timechanged',","    RENDERDELAY = 1000, //Time in ms to wait for the datetimepicker to render. Because you probably won't need it right away,","                        // We don't need to slower things down during startup.","    CALENDAR_ID = WIDGET_CLASS + '-datepicker',","    TIMEDIAL_ID = WIDGET_CLASS + '-timepicker',","    TIMEDIAL_HIDDEN = TIMEDIAL_ID + '-hidden',","    HEADERCONTENT_DATE = 'Select date',","    HEADERCONTENT_DATETIME = 'Select date and time',","    HEADERCONTENT_TIME = 'Select time',","","    YUI3BUTTON_CLASS = 'yui3-button',","    ITSA_BUTTON_DATETIME_CLASS = 'itsa-button-datetime',","    BUTTON_DATE_CLASS = WIDGET_CLASS + '-icondate',","    BUTTON_TIME_CLASS = WIDGET_CLASS + '-icontime',","    BUTTON_DATETIME_CLASS = WIDGET_CLASS + '-icondatetime',","","    BUTTON_DATE = '<button class=\"'+YUI3BUTTON_CLASS+' '+ITSA_BUTTON_DATETIME_CLASS+'\"><span class=\"'+BUTTON_DATE_CLASS+'\"></span></button>',","    BUTTON_DATETIME = '<button class=\"'+YUI3BUTTON_CLASS+' '+ITSA_BUTTON_DATETIME_CLASS+'\"><span class=\"'+BUTTON_DATETIME_CLASS+'\"></span></button>',","    BUTTON_TIME = '<button class=\"'+YUI3BUTTON_CLASS+' '+ITSA_BUTTON_DATETIME_CLASS+'\"><span class=\"'+BUTTON_TIME_CLASS+'\"></span></button>',","","    EVENT_DATEPICKER = '_datetimepicker:',","    EVENT_SELECTDATE = EVENT_DATEPICKER + 'selectdate',","    EVENT_SELECTBUTTON = EVENT_DATEPICKER + 'selected',","    EVENT_CANCEL = EVENT_DATEPICKER + 'cancel',","","    PARSTEINT = function(value) {","        return parseInt(value, 10);","    };","","//===============================================================================================","","Y.ITSADateTimePicker = Y.Base.create('itsadatetimepicker', Y.Base, [], {","","        /**","         * Reference to the Y.Panel-instance","         * @property panel","         * @default null","         * @type Y.Panel","         * @since 0.1","        */","        panel : null,","","        /**","         * Reference to the Y.Calendar-instance","         * @property calendar","         * @default null","         * @type Y.Calendar","         * @since 0.1","        */","        calendar : null,","","        /**","         * Reference to the Y.Dial-instance","         * @property timedial","         * @default null","         * @type Y.Dial","         * @since 0.1","        */","        timedial : null,","","        /**","         * Internal list of all eventhandlers bound by this widget.","         * @property _eventhandlers","         * @private","         * @default []","         * @type Array","         * @since 0.1","        */","        _eventhandlers : [],","","        /**","         * Internal reference to the timerobject that is used to delay the rendering.","         * @property _panelRendererDelay","         * @private","         * @default null","         * @type Object","         * @since 0.1","        */","        _panelRendererDelay : null,","","        /**","         * Reference to Y.one('window')","         * @property _window","         * @private","         * @default null","         * @type Y.Node","         * @since 0.1","        */","        _window : null,","","        /**","         * Reference to the Node inside Y.Dial-instance that draws the selected time.","         * @property _timeNode","         * @private","         * @default null","         * @type Y.Node","         * @since 0.1","        */","        _timeNode : null,","","        /**","         * Internal property that holds the format of how the Dial-time should be rendered in the Dial-instance.","         * @property _timeFormat","         * @private","         * @default null","         * @type String","         * @since 0.1","        */","        _timeFormat : null,","","        /**","         * @method initializer","         * @protected","         * @since 0.1","        */","        initializer : function() {","            var instance = this;","","            instance._window = Y.one('window');","            instance._renderUI();","            instance._bindUI();","            Y.one('body').removeClass(LOADING_CLASS);","         },","","        /**","         * Generates an Y.Node of the type 'button'. Is NOT part of the DOM yet --> you need to place it inside the DOM yourself.","         * This method is available in order you create a nice button which can be used to call for a datetime-Promise.","         *","         * @method createDateNode","         * @return {Y.Node} Node of the type 'button' with a calendaricon inside.","         * @since 0.1","        */","        dateNode : function() {","            return YNode.create(BUTTON_DATE);","        },","","        /**","         * Generates an Y.Node of the type 'button'. Is NOT part of the DOM yet --> you need to place it inside the DOM yourself.","         * This method is available in order you create a nice button which can be used to call for a datetime-Promise.","         *","         * @method datetimeNode","         * @return {Y.Node} Node of the type 'button' with a calendaricon and timeicon inside.","         * @since 0.1","        */","        datetimeNode : function() {","            return YNode.create(BUTTON_DATETIME);","        },","","        /**","         * Picks a date using a pop-up Calendar.","         *","         * @method getDate","         * @param {Date} [initialDate] date-object that holds the initial date-time for the panel. If not set, then the current date-time is used.","         * @param {Y.Node} [activationNode] the node that causes the panel to appear. When set, the selector-panel is aligned to this Node.","         * @param {Object} [config] object to adjust the behaviour of the panel.","         * @param {String} [config.title] Title on the Panel-instance","         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal","         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable","         * @param {String} [config.timeformat] Format of the rendered timestring (default = '%H:%M')","         * @param {Object} [config.customRenderer] customRenderer that is passed to the Calendar-instance","         * @param {Boolean} [config.showPrevMonth] showPrevMonth that is passed to the Calendar-instance","         * @param {Boolean} [config.showNextMonth] showNextMonth that is passed to the Calendar-instance","         * @param {String} [config.headerRenderer] headerRenderer that is passed to the Calendar-instance (default = '%B %Y')","         * @param {Date} [config.minimumDate] minimumDate that is passed to the Calendar-instance","         * @param {Date} [config.maximumDate] maximumDate that is passed to the Calendar-instance","         * @param {String} [config.enabledDatesRule] enabledDatesRule that is passed to the Calendar-instance","         * @param {String} [config.disabledDatesRule] disabledDatesRule that is passed to the Calendar-instance","         * @return {Y.Promise} the promised selected Date-object. The Fulfilled-function has 1 parameter: newDate.","         * If the Date-picker was closed, the promise is Rejected.","         * @since 0.1","        */","        getDate : function(initialDate, activationNode, config) {","            var instance = this,","                testPromise;","","            instance._saveShow(1, initialDate, activationNode, config);","            testPromise = new Y.Promise(","                function(resolve, reject) {","                    var resolvehandler, rejecthandler;","                    // use Y.once --> it will automaticly detach the subscription!","                    resolvehandler = Y.once(","                        EVENT_SELECTDATE,","                        function(e) {","                            rejecthandler.detach();","                            var selectedDate = e.newDate;","                            selectedDate.setMilliseconds(0);","                            selectedDate.setSeconds(0);","                            selectedDate.setMinutes(0);","                            selectedDate.setHours(0);","                            instance._hide();","                            resolve(selectedDate);","                            // we don't want closures: 'null' the promise","                            testPromise = null;","                        }","                    );","                    rejecthandler = Y.once(","                        EVENT_CANCEL,","                        function() {","                            resolvehandler.detach();","                            // panel will automaticly be hidden.","                            // just for sure, also hide the calendarinstance","                            instance.calendar.hide();","                            reject(new Error('canceled'));","                            // we don't want closures: 'null' the promise","                            testPromise = null;","                        }","                    );","                }","            );","            return testPromise;","         },","","        /**","         * Picks a date+time using a pop-up Calendar+Dial.","         *","         * @method getDateTime","         * @param {Date} [initialDateTime] date-object that holds the initial date-time for the panel. If not set then the current date-time is used.","         * @param {Y.Node} [activationNode] the node that causes the panel to appear. When set, the selector-panel is aligned to this Node.","         * @param {Object} [config] object to adjust the behaviour of the panel.","         * @param {String} [config.title] Title on the Panel-instance","         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal","         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable","         * @param {String} [config.timeformat] Format of the rendered timestring (default = '%H:%M')","         * @param {Object} [config.customRenderer] customRenderer that is passed to the Calendar-instance","         * @param {Boolean} [config.showPrevMonth] showPrevMonth that is passed to the Calendar-instance","         * @param {Boolean} [config.showNextMonth] showNextMonth that is passed to the Calendar-instance","         * @param {String} [config.headerRenderer] headerRenderer that is passed to the Calendar-instance (default = '%B %Y')","         * @param {Date} [config.minimumDate] minimumDate that is passed to the Calendar-instance","         * @param {Date} [config.maximumDate] maximumDate that is passed to the Calendar-instance","         * @param {String} [config.enabledDatesRule] enabledDatesRule that is passed to the Calendar-instance","         * @param {String} [config.disabledDatesRule] disabledDatesRule that is passed to the Calendar-instance","         * @return {Y.Promise} the promised selected Date-object. The Fulfilled-function has 1 parameter: newDate.","         * If the DateTime-picker was closed, the promise is Rejected.","         * @since 0.1","        */","        getDateTime : function(initialDateTime, activationNode, config) {","            var instance = this,","                testPromise;","","            instance._saveShow(2, initialDateTime, activationNode, config);","            testPromise = new Y.Promise(","                function(resolve, reject) {","                    var resolvehandler, rejecthandler;","                    // use Y.once --> it will automaticly detach the subscription!","                    resolvehandler = Y.once(","                        EVENT_SELECTBUTTON,","                        function() {","                            rejecthandler.detach();","                            var selectedDateTime = instance.calendar.get('selectedDates')[0],","                                timedialValue = PARSTEINT(instance.timedial.get('value')),","                                newHours = Math.floor(timedialValue/60),","                                newMinutes = timedialValue - (60*newHours);","                            selectedDateTime.setMilliseconds(0);","                            selectedDateTime.setSeconds(0);","                            selectedDateTime.setMinutes(newMinutes);","                            selectedDateTime.setHours(newHours);","                            instance._hide();","                            resolve(selectedDateTime);","                            // we don't want closures: 'null' the promise","                            testPromise = null;","                        }","                    );","                    rejecthandler = Y.once(","                        EVENT_CANCEL,","                        function() {","                            resolvehandler.detach();","                            // panel will automaticly be hidden.","                            // just for sure, also hide the calendarinstance","                            instance.calendar.hide();","                            instance._toggleTimePicker(false);","                            reject(new Error('canceled'));","                            // we don't want closures: 'null' the promise","                            testPromise = null;","                        }","                    );","                }","            );","            return testPromise;","         },","","        /**","         * Picks a time using a pop-up Dial.","         *","         * @method getTime","         * @param {Date} [initialTime] date-object that holds the initial date-time for the panel. If not set, then the current date-time is used.","         * @param {Y.Node} [activationNode] the node that causes the panel to appear. When set, the selector-panel is aligned to this Node.","         * @param {Object} [config] object to adjust the behaviour of the panel.","         * @param {String} [config.title] Title on the Panel-instance","         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal","         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable","         * @param {String} [config.timeformat] Format of the rendered timestring (default = '%H:%M')","         * @param {Object} [config.customRenderer] customRenderer that is passed to the Calendar-instance","         * @param {Boolean} [config.showPrevMonth] showPrevMonth that is passed to the Calendar-instance","         * @param {Boolean} [config.showNextMonth] showNextMonth that is passed to the Calendar-instance","         * @param {String} [config.headerRenderer] headerRenderer that is passed to the Calendar-instance (default = '%B %Y')","         * @param {Date} [config.minimumDate] minimumDate that is passed to the Calendar-instance","         * @param {Date} [config.maximumDate] maximumDate that is passed to the Calendar-instance","         * @param {String} [config.enabledDatesRule] enabledDatesRule that is passed to the Calendar-instance","         * @param {String} [config.disabledDatesRule] disabledDatesRule that is passed to the Calendar-instance","         * @return {Y.Promise} the promised selected Date-object. The Fulfilled-function has 1 parameter: newDate.","         * If the Time-picker was closed, the promise is Rejected.","         * @since 0.1","        */","        getTime : function(initialTime, activationNode, config) {","            var instance = this,","                testPromise;","","            instance._saveShow(3, initialTime, activationNode, config);","            testPromise = new Y.Promise(","                function(resolve, reject) {","                    var resolvehandler, rejecthandler;","                    // use Y.once --> it will automaticly detach the subscription!","                    resolvehandler = Y.once(","                        EVENT_SELECTBUTTON,","                        function() {","                            rejecthandler.detach();","                            var timedialValue = PARSTEINT(instance.timedial.get('value')),","                                newHours = Math.floor(timedialValue/60),","                                newMinutes = timedialValue - (60*newHours),","                                selectedTime = new Date(1900, 0, 1, newHours, newMinutes, 0, 0);","                            instance._hide();","                            resolve(selectedTime);","                            // we don't want closures: 'null' the promise","                            testPromise = null;","                        }","                    );","                    rejecthandler = Y.once(","                        EVENT_CANCEL,","                        function() {","                            resolvehandler.detach();","                            // panel will automaticly be hidden.","                            // just for sure, also hide the calendarinstance","                            instance._toggleTimePicker(false);","                            reject(new Error('canceled'));","                            // we don't want closures: 'null' the promise","                            testPromise = null;","                        }","                    );","                }","            );","            return testPromise;","         },","","        /**","         * Generates an Y.Node of the type 'button'. Is NOT part of the DOM yet --> you need to place it inside the DOM yourself.","         * This method is available in order you create a nice button which can be used to call for a datetime-Promise.","         *","         * @method timeNode","         * @return {Y.Node} Node of the type 'button' with a timeicon inside.","         * @since 0.1","        */","        timeNode : function() {","            return YNode.create(BUTTON_TIME);","        },","","        /**","         * Cleans up bindings","         *","         * @method destructor","         * @protected","         * @since 0.1","        */","        destructor: function() {","            var instance = this;","","            instance._clearEventhandlers();","            if (instance._panelRendererDelay) {","                instance._panelRendererDelay.cancel();","            }","            instance.timedial.destroy();","            instance.calendar.destroy();","        },","","        //===============================================================================================","        // private methods","        //===============================================================================================","","        /**","         * Sets up DOM and CustomEvent listeners for the widget.","         *","         * @method _bindUI","         * @private","         * @protected","         * @since 0.1","         */","        _bindUI: function() {","            var instance = this,","                eventhandlers = instance._eventhandlers,","                panel = instance.panel;","","            panel.onceAfter(","                'render',","                function() {","                    eventhandlers.push(","                        panel.get('boundingBox').one('.yui3-button-close').on(","                            'click',","                            function() {","                                /**","                                * Fired when the Panel is closed without saving the values.","                                * No need to listen to --> the promises are using this event internally.","                                *","                                * @event _datetimepicker:cancel","                                * @private","                                * @since 0.1","                                */","                                Y.fire(EVENT_CANCEL);","                            }","                        )","                    );","                    instance._fillPanel();","                }","            );","            instance._panelRendererDelay = Y.later(","                RENDERDELAY,","                instance,","                function() {","                    instance._panelRendererDelay = null;","                    panel.render();","                }","            );","            eventhandlers.push(","                Y.one('body').delegate(","                    'click',","                    function(){},","                    '.'+ITSA_BUTTON_DATETIME_CLASS","                )","            );","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","        */","        _clearEventhandlers : function() {","            YArray.each(","                this._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        },","","        /**","         * Creates (renderes) the Y.Dial-instance that is used for selecting times.","         *","         * @method _createTimeDial","         * @private","         * @since 0.1","        */","        _createTimeDial : function() {","            var instance = this,","                contentBox = instance.panel.get('contentBox'),","                timedial;","","            instance.timedial = timedial = new Y.Dial({","                min:0,","                max:1440,","                stepsPerRevolution: 720,","                strings: {","                    label: '0:00',","                    resetStr: 'Reset',","                    tooltipHandle: 'Drag to set time'","                },","                value: 0","            });","            timedial.onceAfter(","                'render',","                function() {","                    instance._timeNode = contentBox.one('.yui3-dial-label-string');","                }","            );","            timedial.render(contentBox.one('#'+TIMEDIAL_ID));","            instance._eventhandlers.push(","                timedial.on(","                    'valueChange',","                    function(e) {","                        var newVal = parseInt(e.newVal, 10),","                            newHours = Math.floor(newVal/60),","                            newMinutes = newVal - (60*newHours),","                            timeNode = instance._timeNode;","                        timeNode.setHTML(instance._renderDialTime(newHours, newMinutes));","                        timeNode.addClass(TIME_CHANGED_CLASS);","                    }","                )","            );","        },","","        /**","         * Creates (renderes) the Y.Calendar-instance that is used for selecting dates.","         *","         * @method _createCalendar","         * @private","         * @since 0.1","        */","        _createCalendar : function() {","            var instance = this;","","            instance.calendar = new Y.Calendar({","                height:'250px',","                width:'250px',","                showPrevMonth: true,","                showNextMonth: true,","                visible: false,","                date: new Date()","            });","            instance._eventhandlers.push(","                instance.calendar.on(","                    'selectionChange',","                    Y.rbind(instance._calendarNewDate, instance)","                )","            );","            instance.calendar.render(instance.panel.get('contentBox').one('#'+CALENDAR_ID));","        },","","        /**","         * Fires an event with the new selected Date.","         *","         * @method _calendarNewDate","         * @param {EventFacade} e","         * @private","         * @since 0.1","        */","        _calendarNewDate : function(e) {","            var instance = this,","                newdate;","","            // only if the calendar is visible --> there is also a new date set before showing up!","            if (instance.calendar.get('visible')) {","                newdate = e.newSelection[0];","                /**","                * Fired when a new Date is selected from the Panel's Calendar-instance.","                * No need to listen to --> the promises are using this event internally.","                *","                * @event _datetimepicker:selectdate","                * @param {Date} newDate the selected date","                * @since 0.1","                */","                Y.fire(EVENT_SELECTDATE, {newDate: newdate});","            }","        },","","        /**","         * Fills the Panel-instance. Meaning: renderes the innerContent by creating the Calendar-instance, the Dial-instance and a Select-button.","         *","         * @method _createCalendar","         * @private","         * @since 0.1","        */","        _fillPanel : function() {","            var instance = this,","                panel = instance.panel,","                boundingBox = panel.get('boundingBox'),","                selectButton;","","            boundingBox.addClass(PANEL_CLASS);","            instance._createCalendar();","            instance._createTimeDial();","            selectButton = {","                value : 'Select',","                action: function(e) {","                    e.preventDefault();","                    /**","                    * Fired when new values are selected by the Panel by pressing the 'Select'-button","                    * Only will appear when the time can be selected (otherwise there won't be a select-button in the first place)","                    * No need to listen to --> the promises are using this event internally.","                    *","                    * @event _datetimepicker:selected","                    * @since 0.1","                    */","                    Y.fire(EVENT_SELECTBUTTON);","                },","                section: Y.WidgetStdMod.FOOTER","            };","            panel.addButton(selectButton);","        },","","        /**","         * Hides the panel-instance.","         *","         * @method _hide","         * @private","         * @since 0.1","        */","        _hide : function() {","            var instance = this;","","            // ALSO hide calendar --> its inline style might be set to 'visible' resulting it to be kept on the screen","            instance.calendar.hide();","            instance._toggleTimePicker(false);","            instance.panel.hide();","         },","","        /**","         * Renderes the time in the right format (stored inside the property '_timeFormat')","         * One can change the format by calling the Promises with config = {timeformat: 'someformat'}","         *","         * @method _calendarNewDate","         * @param {Int} hours","         * @param {Int} minutes","         * @private","         * @since 0.1","        */","        _renderDialTime : function(hours, minutes) {","            var instance = this,","                time = new Date(1900, 0, 1, hours, minutes, 0, 0);","","            return Y.Date.format(time, {format: instance._timeFormat || '%H:%M'});","        },","","        /**","         * Renderes the Panel. The innerContent of the panel -however- will be rendered with a delay by the method: '_fillPanel'.","         *","         * @method _renderUI","         * @private","         * @protected","         * @since 0.1","         */","        _renderUI: function() {","            var instance = this;","","            instance.panel = new Y.Panel({","                zIndex: 15000,","                modal   : false,","                visible: false,","                render  : false, // we will render after some delaytime, specified with RENDERDELAY","                fillHeight: null,","                bodyContent : '<div id=\"'+CALENDAR_ID+'\"></div><div id=\"'+TIMEDIAL_ID+'\"></div>'","            });","        },","","        /**","         * Will call _show() but only if the panel is rendered. If not, than it will wait for the rendering to be finished.","         *","         * @method _saveShow","         * @param {Int} modus internal type to tell whether a date, datetime or time needs to be picked (1,2 or 3)","         * @param {Date} [initialDateTime] date-object that holds the initial date-time for the panel. If not set then the current date-time is used.","         * @param {Y.Node} [activationNode] the node that causes the panel to appear. When set, the selector-panel is aligned to this Node.","         * @param {Object} [config] object to adjust the behaviour of the panel.","         * @param {String} [config.title] Title on the Panel-instance","         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal","         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable","         * @param {String} [config.timeformat] Format of the rendered timestring (default = '%H:%M')","         * @param {Object} [config.customRenderer] customRenderer that is passed to the Calendar-instance","         * @param {Boolean} [config.showPrevMonth] showPrevMonth that is passed to the Calendar-instance","         * @param {Boolean} [config.showNextMonth] showNextMonth that is passed to the Calendar-instance","         * @param {String} [config.headerRenderer] headerRenderer that is passed to the Calendar-instance (default = '%B %Y')","         * @param {Date} [config.minimumDate] minimumDate that is passed to the Calendar-instance","         * @param {Date} [config.maximumDate] maximumDate that is passed to the Calendar-instance","         * @param {String} [config.enabledDatesRule] enabledDatesRule that is passed to the Calendar-instance","         * @param {String} [config.disabledDatesRule] disabledDatesRule that is passed to the Calendar-instance","         * @private","         * @since 0.1","        */","        _saveShow : function(modus, initialDateTime, activationNode, config) {","            var instance = this,","                panel = instance.panel;","","            if (panel.get('rendered')) {","                instance._show(modus, initialDateTime, activationNode, config);","            }","            else {","                panel.onceAfter(","                    'render',","                    function() {","                        instance._show(modus, initialDateTime, activationNode, config);","                    }","                );","            }","            if (instance._panelRendererDelay) {","                instance._panelRendererDelay.cancel();","                panel.render();","            }","        },","","        /**","         * Shows the panel-instance, ready to select a date and/or time.","         *","         * @method _show","         * @param {Int} modus internal type to tell whether a date, datetime or time needs to be picked (1,2 or 3)","         * @param {Date} [initialDateTime] date-object that holds the initial date-time for the panel. If not set then the current date-time is used.","         * @param {Y.Node} [activationNode] the node that causes the panel to appear. When set, the selector-panel is aligned to this Node.","         * @param {Object} [config] object to adjust the behaviour of the panel.","         * @param {String} [config.title] Title on the Panel-instance","         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal","         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable","         * @param {String} [config.timeformat] Format of the rendered timestring (default = '%H:%M')","         * @param {Object} [config.customRenderer] customRenderer that is passed to the Calendar-instance","         * @param {Boolean} [config.showPrevMonth] showPrevMonth that is passed to the Calendar-instance","         * @param {Boolean} [config.showNextMonth] showNextMonth that is passed to the Calendar-instance","         * @param {String} [config.headerRenderer] headerRenderer that is passed to the Calendar-instance (default = '%B %Y')","         * @param {Date} [config.minimumDate] minimumDate that is passed to the Calendar-instance","         * @param {Date} [config.maximumDate] maximumDate that is passed to the Calendar-instance","         * @param {String} [config.enabledDatesRule] enabledDatesRule that is passed to the Calendar-instance","         * @param {String} [config.disabledDatesRule] disabledDatesRule that is passed to the Calendar-instance","         * @private","         * @since 0.1","        */","        _show : function(modus, initialDateTime, activationNode, config) {","            var instance = this,","                panel = instance.panel,","                presentedDate = initialDateTime || new Date(),","                timeNode = instance._timeNode,","                modal = config && config.modal,","                rightAlign, window, winWidth, currentScroll, panelWidth, nodeX, nodeWidth, calAttrs, minutes, hours, dialvalue, minPanelWidth;","","            if (panel.get('visible')) {","                // previous panel is up --> we need to reject the promise by firing an EVENT_CANCEL-event:","                Y.fire(EVENT_CANCEL);","                // also hide the panel ourselves --> the cancel-event does not do this","                // we need this, because the panel wmigt be redrawed with other settings (like model-change)","                instance.panel.hide();","            }","            if (modus<3) {","                instance.calendar.deselectDates();","                instance.calendar.selectDates(presentedDate);","                if (Lang.isObject(config)) {","                    // Only accept limited properties. Also reset to default on new requests","                    calAttrs = {","                        customRenderer: config.customRenderer || {},","                        showPrevMonth: config.showPrevMonth || false,","                        showNextMonth: config.showNextMonth || false,","                        headerRenderer: config.headerRenderer || '%B %Y',","                        minimumDate: config.minimumDate || null,","                        maximumDate: config.maximumDate || null,","                        enabledDatesRule: config.enabledDatesRule || null,","                        disabledDatesRule: config.disabledDatesRule || null","                    };","                    instance.calendar.setAttrs(calAttrs);","                }","                instance.calendar.show();","            }","            else {","                instance.calendar.hide();","            }","            if (modus>1) {","                if (Lang.isObject(config) && Lang.isString(config.timeformat)) {","                    instance._timeFormat = config.timeformat;","                }","                else {","                    instance._timeFormat = null;","                }","                hours = presentedDate.getHours();","                minutes = presentedDate.getMinutes();","                dialvalue = minutes+60*hours;","                instance.timedial.set('value', dialvalue);","                instance.timedial._originalValue = dialvalue;","                timeNode.setHTML(instance._renderDialTime(hours, minutes));","                timeNode.removeClass(TIME_CHANGED_CLASS);","                instance._toggleTimePicker(true);","","            }","            else {","                instance._toggleTimePicker(false);","            }","            if (activationNode) {","                window = instance._window;","                if (window) {","                    winWidth = PARSTEINT(window.get('winWidth'));","                    currentScroll = PARSTEINT(window.get('docScrollX'));","                    // check minwidth when no other fontsize is set:","                    // values are just read before after rendering...","                    switch (modus) {","                        case 1: minPanelWidth = 285;","                        break;","                        case 2: minPanelWidth = 155;","                        break;","                        case 3: minPanelWidth = 415;","                        break;","                    }","                    panelWidth = Math.max(panel.get('boundingBox').get('offsetWidth'), minPanelWidth);","                    nodeX = activationNode.getX();","                    nodeWidth = activationNode.get('offsetWidth');","                    rightAlign = ((nodeX+nodeWidth+panelWidth)<(currentScroll+winWidth)) || ((nodeX+nodeWidth)<panelWidth);","                }","                panel.align(","                    activationNode,","                    (rightAlign ? [Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.TR] : [Y.WidgetPositionAlign.TR, Y.WidgetPositionAlign.BR])","                );","            }","            else {","                panel.centered();","            }","            if (Lang.isBoolean(modal)) {","                panel.set('modal', modal);","            }","            else {","                panel.set('modal', false);","            }","            switch (modus) {","                case 1: panel.set('headerContent', (config && config.title) || HEADERCONTENT_DATE);","                    break;","                case 2: panel.set('headerContent', (config && config.title) || HEADERCONTENT_DATETIME);","                    break;","                case 3: panel.set('headerContent', (config && config.title) || HEADERCONTENT_TIME);","            }","            if (config && Lang.isBoolean(config.dragable)) {","                if (config.dragable && !panel.hasPlugin('dd')) {","                    panel.plug(Y.Plugin.Drag);","                    panel.dd.addHandle('.yui3-widget-hd');","                }","                else if (panel.hasPlugin('dd')) {","                    panel.unplug('dd');","                }","            }","            else if (panel.hasPlugin('dd')) {","                panel.unplug('dd');","            }","            panel.show();","         },","","        /**","         * Toggles the visibility of the timepicker (Y.Dial-instance) together with the Select-button.","         *","         * @method _toggleTimePicker","         * @param {Boolean} visible whether the time-selector will be visible or not","         * @private","         * @since 0.1","        */","        _toggleTimePicker : function(visible) {","            var instance = this;","","            instance.timedial.get('boundingBox').toggleClass(TIMEDIAL_HIDDEN, !visible);","            instance.panel.get('contentBox').one('.yui3-widget-ft').toggleClass(TIMEDIAL_HIDDEN, !visible);","        }","","    }, {","        ATTRS : {","        }","    }",");","","if (!Y.Global.ItsaDateTimePicker) {","    Y.Global.ItsaDateTimePicker = new Y.ITSADateTimePicker();","}","","Y.ItsaDateTimePicker = Y.Global.ItsaDateTimePicker;","","}, '@VERSION@', {","    \"requires\": [","        \"base\",","        \"node-base\",","        \"node-screen\",","        \"panel\",","        \"calendar\",","        \"dial\",","        \"promise\",","        \"cssbutton\",","        \"datatype-date-format\",","        \"dd-plugin\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js"].lines = {"1":0,"3":0,"24":0,"56":0,"61":0,"146":0,"148":0,"149":0,"150":0,"151":0,"163":0,"175":0,"202":0,"205":0,"206":0,"208":0,"210":0,"213":0,"214":0,"215":0,"216":0,"217":0,"218":0,"219":0,"220":0,"222":0,"225":0,"228":0,"231":0,"232":0,"234":0,"239":0,"266":0,"269":0,"270":0,"272":0,"274":0,"277":0,"278":0,"282":0,"283":0,"284":0,"285":0,"286":0,"287":0,"289":0,"292":0,"295":0,"298":0,"299":0,"300":0,"302":0,"307":0,"334":0,"337":0,"338":0,"340":0,"342":0,"345":0,"346":0,"350":0,"351":0,"353":0,"356":0,"359":0,"362":0,"363":0,"365":0,"370":0,"382":0,"393":0,"395":0,"396":0,"397":0,"399":0,"400":0,"416":0,"420":0,"423":0,"435":0,"439":0,"442":0,"446":0,"447":0,"450":0,"467":0,"470":0,"483":0,"487":0,"498":0,"501":0,"504":0,"505":0,"509":0,"513":0,"514":0,"528":0,"530":0,"538":0,"544":0,"556":0,"560":0,"561":0,"570":0,"582":0,"587":0,"588":0,"589":0,"590":0,"593":0,"602":0,"606":0,"617":0,"620":0,"621":0,"622":0,"636":0,"639":0,"651":0,"653":0,"687":0,"690":0,"691":0,"694":0,"697":0,"701":0,"702":0,"703":0,"731":0,"738":0,"740":0,"743":0,"745":0,"746":0,"747":0,"748":0,"750":0,"760":0,"762":0,"765":0,"767":0,"768":0,"769":0,"772":0,"774":0,"775":0,"776":0,"777":0,"778":0,"779":0,"780":0,"781":0,"785":0,"787":0,"788":0,"789":0,"790":0,"791":0,"794":0,"795":0,"796":0,"797":0,"798":0,"799":0,"800":0,"802":0,"803":0,"804":0,"805":0,"807":0,"813":0,"815":0,"816":0,"819":0,"821":0,"822":0,"823":0,"824":0,"825":0,"826":0,"828":0,"829":0,"830":0,"831":0,"833":0,"834":0,"837":0,"838":0,"840":0,"852":0,"854":0,"855":0,"864":0,"865":0,"868":0};
_yuitest_coverage["build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js"].functions = {"PARSTEINT:55":0,"initializer:145":0,"dateNode:162":0,"datetimeNode:174":0,"(anonymous 3):212":0,"(anonymous 4):227":0,"(anonymous 2):207":0,"getDate:201":0,"(anonymous 6):276":0,"(anonymous 7):294":0,"(anonymous 5):271":0,"getDateTime:265":0,"(anonymous 9):344":0,"(anonymous 10):358":0,"(anonymous 8):339":0,"getTime:333":0,"timeNode:381":0,"destructor:392":0,"(anonymous 12):426":0,"(anonymous 11):422":0,"(anonymous 13):445":0,"_bindUI:415":0,"(anonymous 15):469":0,"_clearEventhandlers:466":0,"(anonymous 16):500":0,"(anonymous 17):508":0,"_createTimeDial:482":0,"_createCalendar:527":0,"_calendarNewDate:555":0,"action:592":0,"_fillPanel:581":0,"_hide:616":0,"_renderDialTime:635":0,"_renderUI:650":0,"(anonymous 18):696":0,"_saveShow:686":0,"_show:730":0,"_toggleTimePicker:851":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js"].coveredLines = 195;
_yuitest_coverage["build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js"].coveredFunctions = 39;
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 1);
YUI.add('gallery-itsadatetimepicker', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 3);
'use strict';

/**
 *
 * Class ITSADateTimePicker
 *
 *
 * Class that pickes dates and times using Promises. It can be used as a date-picker, time-picker or both.<br />
 * The Class also can render 3 button-Nodes with calendar-icon, time-icon or both.
 *
 * @module gallery-itsadatetimepicker
 * @extends Base
 * @class ITSADateTimePicker
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 24);
var Lang = Y.Lang,
    YNode = Y.Node,
    YArray = Y.Array,
    WIDGET_CLASS = 'itsa-datetimepicker',
    LOADING_CLASS = WIDGET_CLASS + '-loading',
    PANEL_CLASS = WIDGET_CLASS + '-panel',
    TIME_CHANGED_CLASS = WIDGET_CLASS + '-timechanged',
    RENDERDELAY = 1000, //Time in ms to wait for the datetimepicker to render. Because you probably won't need it right away,
                        // We don't need to slower things down during startup.
    CALENDAR_ID = WIDGET_CLASS + '-datepicker',
    TIMEDIAL_ID = WIDGET_CLASS + '-timepicker',
    TIMEDIAL_HIDDEN = TIMEDIAL_ID + '-hidden',
    HEADERCONTENT_DATE = 'Select date',
    HEADERCONTENT_DATETIME = 'Select date and time',
    HEADERCONTENT_TIME = 'Select time',

    YUI3BUTTON_CLASS = 'yui3-button',
    ITSA_BUTTON_DATETIME_CLASS = 'itsa-button-datetime',
    BUTTON_DATE_CLASS = WIDGET_CLASS + '-icondate',
    BUTTON_TIME_CLASS = WIDGET_CLASS + '-icontime',
    BUTTON_DATETIME_CLASS = WIDGET_CLASS + '-icondatetime',

    BUTTON_DATE = '<button class="'+YUI3BUTTON_CLASS+' '+ITSA_BUTTON_DATETIME_CLASS+'"><span class="'+BUTTON_DATE_CLASS+'"></span></button>',
    BUTTON_DATETIME = '<button class="'+YUI3BUTTON_CLASS+' '+ITSA_BUTTON_DATETIME_CLASS+'"><span class="'+BUTTON_DATETIME_CLASS+'"></span></button>',
    BUTTON_TIME = '<button class="'+YUI3BUTTON_CLASS+' '+ITSA_BUTTON_DATETIME_CLASS+'"><span class="'+BUTTON_TIME_CLASS+'"></span></button>',

    EVENT_DATEPICKER = '_datetimepicker:',
    EVENT_SELECTDATE = EVENT_DATEPICKER + 'selectdate',
    EVENT_SELECTBUTTON = EVENT_DATEPICKER + 'selected',
    EVENT_CANCEL = EVENT_DATEPICKER + 'cancel',

    PARSTEINT = function(value) {
        _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "PARSTEINT", 55);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 56);
return parseInt(value, 10);
    };

//===============================================================================================

_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 61);
Y.ITSADateTimePicker = Y.Base.create('itsadatetimepicker', Y.Base, [], {

        /**
         * Reference to the Y.Panel-instance
         * @property panel
         * @default null
         * @type Y.Panel
         * @since 0.1
        */
        panel : null,

        /**
         * Reference to the Y.Calendar-instance
         * @property calendar
         * @default null
         * @type Y.Calendar
         * @since 0.1
        */
        calendar : null,

        /**
         * Reference to the Y.Dial-instance
         * @property timedial
         * @default null
         * @type Y.Dial
         * @since 0.1
        */
        timedial : null,

        /**
         * Internal list of all eventhandlers bound by this widget.
         * @property _eventhandlers
         * @private
         * @default []
         * @type Array
         * @since 0.1
        */
        _eventhandlers : [],

        /**
         * Internal reference to the timerobject that is used to delay the rendering.
         * @property _panelRendererDelay
         * @private
         * @default null
         * @type Object
         * @since 0.1
        */
        _panelRendererDelay : null,

        /**
         * Reference to Y.one('window')
         * @property _window
         * @private
         * @default null
         * @type Y.Node
         * @since 0.1
        */
        _window : null,

        /**
         * Reference to the Node inside Y.Dial-instance that draws the selected time.
         * @property _timeNode
         * @private
         * @default null
         * @type Y.Node
         * @since 0.1
        */
        _timeNode : null,

        /**
         * Internal property that holds the format of how the Dial-time should be rendered in the Dial-instance.
         * @property _timeFormat
         * @private
         * @default null
         * @type String
         * @since 0.1
        */
        _timeFormat : null,

        /**
         * @method initializer
         * @protected
         * @since 0.1
        */
        initializer : function() {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "initializer", 145);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 146);
var instance = this;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 148);
instance._window = Y.one('window');
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 149);
instance._renderUI();
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 150);
instance._bindUI();
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 151);
Y.one('body').removeClass(LOADING_CLASS);
         },

        /**
         * Generates an Y.Node of the type 'button'. Is NOT part of the DOM yet --> you need to place it inside the DOM yourself.
         * This method is available in order you create a nice button which can be used to call for a datetime-Promise.
         *
         * @method createDateNode
         * @return {Y.Node} Node of the type 'button' with a calendaricon inside.
         * @since 0.1
        */
        dateNode : function() {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "dateNode", 162);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 163);
return YNode.create(BUTTON_DATE);
        },

        /**
         * Generates an Y.Node of the type 'button'. Is NOT part of the DOM yet --> you need to place it inside the DOM yourself.
         * This method is available in order you create a nice button which can be used to call for a datetime-Promise.
         *
         * @method datetimeNode
         * @return {Y.Node} Node of the type 'button' with a calendaricon and timeicon inside.
         * @since 0.1
        */
        datetimeNode : function() {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "datetimeNode", 174);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 175);
return YNode.create(BUTTON_DATETIME);
        },

        /**
         * Picks a date using a pop-up Calendar.
         *
         * @method getDate
         * @param {Date} [initialDate] date-object that holds the initial date-time for the panel. If not set, then the current date-time is used.
         * @param {Y.Node} [activationNode] the node that causes the panel to appear. When set, the selector-panel is aligned to this Node.
         * @param {Object} [config] object to adjust the behaviour of the panel.
         * @param {String} [config.title] Title on the Panel-instance
         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal
         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable
         * @param {String} [config.timeformat] Format of the rendered timestring (default = '%H:%M')
         * @param {Object} [config.customRenderer] customRenderer that is passed to the Calendar-instance
         * @param {Boolean} [config.showPrevMonth] showPrevMonth that is passed to the Calendar-instance
         * @param {Boolean} [config.showNextMonth] showNextMonth that is passed to the Calendar-instance
         * @param {String} [config.headerRenderer] headerRenderer that is passed to the Calendar-instance (default = '%B %Y')
         * @param {Date} [config.minimumDate] minimumDate that is passed to the Calendar-instance
         * @param {Date} [config.maximumDate] maximumDate that is passed to the Calendar-instance
         * @param {String} [config.enabledDatesRule] enabledDatesRule that is passed to the Calendar-instance
         * @param {String} [config.disabledDatesRule] disabledDatesRule that is passed to the Calendar-instance
         * @return {Y.Promise} the promised selected Date-object. The Fulfilled-function has 1 parameter: newDate.
         * If the Date-picker was closed, the promise is Rejected.
         * @since 0.1
        */
        getDate : function(initialDate, activationNode, config) {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "getDate", 201);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 202);
var instance = this,
                testPromise;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 205);
instance._saveShow(1, initialDate, activationNode, config);
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 206);
testPromise = new Y.Promise(
                function(resolve, reject) {
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 2)", 207);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 208);
var resolvehandler, rejecthandler;
                    // use Y.once --> it will automaticly detach the subscription!
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 210);
resolvehandler = Y.once(
                        EVENT_SELECTDATE,
                        function(e) {
                            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 3)", 212);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 213);
rejecthandler.detach();
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 214);
var selectedDate = e.newDate;
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 215);
selectedDate.setMilliseconds(0);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 216);
selectedDate.setSeconds(0);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 217);
selectedDate.setMinutes(0);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 218);
selectedDate.setHours(0);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 219);
instance._hide();
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 220);
resolve(selectedDate);
                            // we don't want closures: 'null' the promise
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 222);
testPromise = null;
                        }
                    );
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 225);
rejecthandler = Y.once(
                        EVENT_CANCEL,
                        function() {
                            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 4)", 227);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 228);
resolvehandler.detach();
                            // panel will automaticly be hidden.
                            // just for sure, also hide the calendarinstance
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 231);
instance.calendar.hide();
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 232);
reject(new Error('canceled'));
                            // we don't want closures: 'null' the promise
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 234);
testPromise = null;
                        }
                    );
                }
            );
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 239);
return testPromise;
         },

        /**
         * Picks a date+time using a pop-up Calendar+Dial.
         *
         * @method getDateTime
         * @param {Date} [initialDateTime] date-object that holds the initial date-time for the panel. If not set then the current date-time is used.
         * @param {Y.Node} [activationNode] the node that causes the panel to appear. When set, the selector-panel is aligned to this Node.
         * @param {Object} [config] object to adjust the behaviour of the panel.
         * @param {String} [config.title] Title on the Panel-instance
         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal
         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable
         * @param {String} [config.timeformat] Format of the rendered timestring (default = '%H:%M')
         * @param {Object} [config.customRenderer] customRenderer that is passed to the Calendar-instance
         * @param {Boolean} [config.showPrevMonth] showPrevMonth that is passed to the Calendar-instance
         * @param {Boolean} [config.showNextMonth] showNextMonth that is passed to the Calendar-instance
         * @param {String} [config.headerRenderer] headerRenderer that is passed to the Calendar-instance (default = '%B %Y')
         * @param {Date} [config.minimumDate] minimumDate that is passed to the Calendar-instance
         * @param {Date} [config.maximumDate] maximumDate that is passed to the Calendar-instance
         * @param {String} [config.enabledDatesRule] enabledDatesRule that is passed to the Calendar-instance
         * @param {String} [config.disabledDatesRule] disabledDatesRule that is passed to the Calendar-instance
         * @return {Y.Promise} the promised selected Date-object. The Fulfilled-function has 1 parameter: newDate.
         * If the DateTime-picker was closed, the promise is Rejected.
         * @since 0.1
        */
        getDateTime : function(initialDateTime, activationNode, config) {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "getDateTime", 265);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 266);
var instance = this,
                testPromise;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 269);
instance._saveShow(2, initialDateTime, activationNode, config);
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 270);
testPromise = new Y.Promise(
                function(resolve, reject) {
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 5)", 271);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 272);
var resolvehandler, rejecthandler;
                    // use Y.once --> it will automaticly detach the subscription!
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 274);
resolvehandler = Y.once(
                        EVENT_SELECTBUTTON,
                        function() {
                            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 6)", 276);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 277);
rejecthandler.detach();
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 278);
var selectedDateTime = instance.calendar.get('selectedDates')[0],
                                timedialValue = PARSTEINT(instance.timedial.get('value')),
                                newHours = Math.floor(timedialValue/60),
                                newMinutes = timedialValue - (60*newHours);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 282);
selectedDateTime.setMilliseconds(0);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 283);
selectedDateTime.setSeconds(0);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 284);
selectedDateTime.setMinutes(newMinutes);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 285);
selectedDateTime.setHours(newHours);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 286);
instance._hide();
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 287);
resolve(selectedDateTime);
                            // we don't want closures: 'null' the promise
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 289);
testPromise = null;
                        }
                    );
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 292);
rejecthandler = Y.once(
                        EVENT_CANCEL,
                        function() {
                            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 7)", 294);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 295);
resolvehandler.detach();
                            // panel will automaticly be hidden.
                            // just for sure, also hide the calendarinstance
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 298);
instance.calendar.hide();
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 299);
instance._toggleTimePicker(false);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 300);
reject(new Error('canceled'));
                            // we don't want closures: 'null' the promise
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 302);
testPromise = null;
                        }
                    );
                }
            );
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 307);
return testPromise;
         },

        /**
         * Picks a time using a pop-up Dial.
         *
         * @method getTime
         * @param {Date} [initialTime] date-object that holds the initial date-time for the panel. If not set, then the current date-time is used.
         * @param {Y.Node} [activationNode] the node that causes the panel to appear. When set, the selector-panel is aligned to this Node.
         * @param {Object} [config] object to adjust the behaviour of the panel.
         * @param {String} [config.title] Title on the Panel-instance
         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal
         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable
         * @param {String} [config.timeformat] Format of the rendered timestring (default = '%H:%M')
         * @param {Object} [config.customRenderer] customRenderer that is passed to the Calendar-instance
         * @param {Boolean} [config.showPrevMonth] showPrevMonth that is passed to the Calendar-instance
         * @param {Boolean} [config.showNextMonth] showNextMonth that is passed to the Calendar-instance
         * @param {String} [config.headerRenderer] headerRenderer that is passed to the Calendar-instance (default = '%B %Y')
         * @param {Date} [config.minimumDate] minimumDate that is passed to the Calendar-instance
         * @param {Date} [config.maximumDate] maximumDate that is passed to the Calendar-instance
         * @param {String} [config.enabledDatesRule] enabledDatesRule that is passed to the Calendar-instance
         * @param {String} [config.disabledDatesRule] disabledDatesRule that is passed to the Calendar-instance
         * @return {Y.Promise} the promised selected Date-object. The Fulfilled-function has 1 parameter: newDate.
         * If the Time-picker was closed, the promise is Rejected.
         * @since 0.1
        */
        getTime : function(initialTime, activationNode, config) {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "getTime", 333);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 334);
var instance = this,
                testPromise;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 337);
instance._saveShow(3, initialTime, activationNode, config);
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 338);
testPromise = new Y.Promise(
                function(resolve, reject) {
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 8)", 339);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 340);
var resolvehandler, rejecthandler;
                    // use Y.once --> it will automaticly detach the subscription!
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 342);
resolvehandler = Y.once(
                        EVENT_SELECTBUTTON,
                        function() {
                            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 9)", 344);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 345);
rejecthandler.detach();
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 346);
var timedialValue = PARSTEINT(instance.timedial.get('value')),
                                newHours = Math.floor(timedialValue/60),
                                newMinutes = timedialValue - (60*newHours),
                                selectedTime = new Date(1900, 0, 1, newHours, newMinutes, 0, 0);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 350);
instance._hide();
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 351);
resolve(selectedTime);
                            // we don't want closures: 'null' the promise
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 353);
testPromise = null;
                        }
                    );
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 356);
rejecthandler = Y.once(
                        EVENT_CANCEL,
                        function() {
                            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 10)", 358);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 359);
resolvehandler.detach();
                            // panel will automaticly be hidden.
                            // just for sure, also hide the calendarinstance
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 362);
instance._toggleTimePicker(false);
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 363);
reject(new Error('canceled'));
                            // we don't want closures: 'null' the promise
                            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 365);
testPromise = null;
                        }
                    );
                }
            );
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 370);
return testPromise;
         },

        /**
         * Generates an Y.Node of the type 'button'. Is NOT part of the DOM yet --> you need to place it inside the DOM yourself.
         * This method is available in order you create a nice button which can be used to call for a datetime-Promise.
         *
         * @method timeNode
         * @return {Y.Node} Node of the type 'button' with a timeicon inside.
         * @since 0.1
        */
        timeNode : function() {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "timeNode", 381);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 382);
return YNode.create(BUTTON_TIME);
        },

        /**
         * Cleans up bindings
         *
         * @method destructor
         * @protected
         * @since 0.1
        */
        destructor: function() {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "destructor", 392);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 393);
var instance = this;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 395);
instance._clearEventhandlers();
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 396);
if (instance._panelRendererDelay) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 397);
instance._panelRendererDelay.cancel();
            }
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 399);
instance.timedial.destroy();
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 400);
instance.calendar.destroy();
        },

        //===============================================================================================
        // private methods
        //===============================================================================================

        /**
         * Sets up DOM and CustomEvent listeners for the widget.
         *
         * @method _bindUI
         * @private
         * @protected
         * @since 0.1
         */
        _bindUI: function() {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_bindUI", 415);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 416);
var instance = this,
                eventhandlers = instance._eventhandlers,
                panel = instance.panel;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 420);
panel.onceAfter(
                'render',
                function() {
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 11)", 422);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 423);
eventhandlers.push(
                        panel.get('boundingBox').one('.yui3-button-close').on(
                            'click',
                            function() {
                                /**
                                * Fired when the Panel is closed without saving the values.
                                * No need to listen to --> the promises are using this event internally.
                                *
                                * @event _datetimepicker:cancel
                                * @private
                                * @since 0.1
                                */
                                _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 12)", 426);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 435);
Y.fire(EVENT_CANCEL);
                            }
                        )
                    );
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 439);
instance._fillPanel();
                }
            );
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 442);
instance._panelRendererDelay = Y.later(
                RENDERDELAY,
                instance,
                function() {
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 13)", 445);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 446);
instance._panelRendererDelay = null;
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 447);
panel.render();
                }
            );
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 450);
eventhandlers.push(
                Y.one('body').delegate(
                    'click',
                    function(){},
                    '.'+ITSA_BUTTON_DATETIME_CLASS
                )
            );
        },

        /**
         * Cleaning up all eventlisteners
         *
         * @method _clearEventhandlers
         * @private
         * @since 0.1
        */
        _clearEventhandlers : function() {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_clearEventhandlers", 466);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 467);
YArray.each(
                this._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 15)", 469);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 470);
item.detach();
                }
            );
        },

        /**
         * Creates (renderes) the Y.Dial-instance that is used for selecting times.
         *
         * @method _createTimeDial
         * @private
         * @since 0.1
        */
        _createTimeDial : function() {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_createTimeDial", 482);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 483);
var instance = this,
                contentBox = instance.panel.get('contentBox'),
                timedial;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 487);
instance.timedial = timedial = new Y.Dial({
                min:0,
                max:1440,
                stepsPerRevolution: 720,
                strings: {
                    label: '0:00',
                    resetStr: 'Reset',
                    tooltipHandle: 'Drag to set time'
                },
                value: 0
            });
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 498);
timedial.onceAfter(
                'render',
                function() {
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 16)", 500);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 501);
instance._timeNode = contentBox.one('.yui3-dial-label-string');
                }
            );
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 504);
timedial.render(contentBox.one('#'+TIMEDIAL_ID));
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 505);
instance._eventhandlers.push(
                timedial.on(
                    'valueChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 17)", 508);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 509);
var newVal = parseInt(e.newVal, 10),
                            newHours = Math.floor(newVal/60),
                            newMinutes = newVal - (60*newHours),
                            timeNode = instance._timeNode;
                        _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 513);
timeNode.setHTML(instance._renderDialTime(newHours, newMinutes));
                        _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 514);
timeNode.addClass(TIME_CHANGED_CLASS);
                    }
                )
            );
        },

        /**
         * Creates (renderes) the Y.Calendar-instance that is used for selecting dates.
         *
         * @method _createCalendar
         * @private
         * @since 0.1
        */
        _createCalendar : function() {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_createCalendar", 527);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 528);
var instance = this;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 530);
instance.calendar = new Y.Calendar({
                height:'250px',
                width:'250px',
                showPrevMonth: true,
                showNextMonth: true,
                visible: false,
                date: new Date()
            });
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 538);
instance._eventhandlers.push(
                instance.calendar.on(
                    'selectionChange',
                    Y.rbind(instance._calendarNewDate, instance)
                )
            );
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 544);
instance.calendar.render(instance.panel.get('contentBox').one('#'+CALENDAR_ID));
        },

        /**
         * Fires an event with the new selected Date.
         *
         * @method _calendarNewDate
         * @param {EventFacade} e
         * @private
         * @since 0.1
        */
        _calendarNewDate : function(e) {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_calendarNewDate", 555);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 556);
var instance = this,
                newdate;

            // only if the calendar is visible --> there is also a new date set before showing up!
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 560);
if (instance.calendar.get('visible')) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 561);
newdate = e.newSelection[0];
                /**
                * Fired when a new Date is selected from the Panel's Calendar-instance.
                * No need to listen to --> the promises are using this event internally.
                *
                * @event _datetimepicker:selectdate
                * @param {Date} newDate the selected date
                * @since 0.1
                */
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 570);
Y.fire(EVENT_SELECTDATE, {newDate: newdate});
            }
        },

        /**
         * Fills the Panel-instance. Meaning: renderes the innerContent by creating the Calendar-instance, the Dial-instance and a Select-button.
         *
         * @method _createCalendar
         * @private
         * @since 0.1
        */
        _fillPanel : function() {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_fillPanel", 581);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 582);
var instance = this,
                panel = instance.panel,
                boundingBox = panel.get('boundingBox'),
                selectButton;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 587);
boundingBox.addClass(PANEL_CLASS);
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 588);
instance._createCalendar();
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 589);
instance._createTimeDial();
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 590);
selectButton = {
                value : 'Select',
                action: function(e) {
                    _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "action", 592);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 593);
e.preventDefault();
                    /**
                    * Fired when new values are selected by the Panel by pressing the 'Select'-button
                    * Only will appear when the time can be selected (otherwise there won't be a select-button in the first place)
                    * No need to listen to --> the promises are using this event internally.
                    *
                    * @event _datetimepicker:selected
                    * @since 0.1
                    */
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 602);
Y.fire(EVENT_SELECTBUTTON);
                },
                section: Y.WidgetStdMod.FOOTER
            };
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 606);
panel.addButton(selectButton);
        },

        /**
         * Hides the panel-instance.
         *
         * @method _hide
         * @private
         * @since 0.1
        */
        _hide : function() {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_hide", 616);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 617);
var instance = this;

            // ALSO hide calendar --> its inline style might be set to 'visible' resulting it to be kept on the screen
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 620);
instance.calendar.hide();
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 621);
instance._toggleTimePicker(false);
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 622);
instance.panel.hide();
         },

        /**
         * Renderes the time in the right format (stored inside the property '_timeFormat')
         * One can change the format by calling the Promises with config = {timeformat: 'someformat'}
         *
         * @method _calendarNewDate
         * @param {Int} hours
         * @param {Int} minutes
         * @private
         * @since 0.1
        */
        _renderDialTime : function(hours, minutes) {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_renderDialTime", 635);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 636);
var instance = this,
                time = new Date(1900, 0, 1, hours, minutes, 0, 0);

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 639);
return Y.Date.format(time, {format: instance._timeFormat || '%H:%M'});
        },

        /**
         * Renderes the Panel. The innerContent of the panel -however- will be rendered with a delay by the method: '_fillPanel'.
         *
         * @method _renderUI
         * @private
         * @protected
         * @since 0.1
         */
        _renderUI: function() {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_renderUI", 650);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 651);
var instance = this;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 653);
instance.panel = new Y.Panel({
                zIndex: 15000,
                modal   : false,
                visible: false,
                render  : false, // we will render after some delaytime, specified with RENDERDELAY
                fillHeight: null,
                bodyContent : '<div id="'+CALENDAR_ID+'"></div><div id="'+TIMEDIAL_ID+'"></div>'
            });
        },

        /**
         * Will call _show() but only if the panel is rendered. If not, than it will wait for the rendering to be finished.
         *
         * @method _saveShow
         * @param {Int} modus internal type to tell whether a date, datetime or time needs to be picked (1,2 or 3)
         * @param {Date} [initialDateTime] date-object that holds the initial date-time for the panel. If not set then the current date-time is used.
         * @param {Y.Node} [activationNode] the node that causes the panel to appear. When set, the selector-panel is aligned to this Node.
         * @param {Object} [config] object to adjust the behaviour of the panel.
         * @param {String} [config.title] Title on the Panel-instance
         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal
         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable
         * @param {String} [config.timeformat] Format of the rendered timestring (default = '%H:%M')
         * @param {Object} [config.customRenderer] customRenderer that is passed to the Calendar-instance
         * @param {Boolean} [config.showPrevMonth] showPrevMonth that is passed to the Calendar-instance
         * @param {Boolean} [config.showNextMonth] showNextMonth that is passed to the Calendar-instance
         * @param {String} [config.headerRenderer] headerRenderer that is passed to the Calendar-instance (default = '%B %Y')
         * @param {Date} [config.minimumDate] minimumDate that is passed to the Calendar-instance
         * @param {Date} [config.maximumDate] maximumDate that is passed to the Calendar-instance
         * @param {String} [config.enabledDatesRule] enabledDatesRule that is passed to the Calendar-instance
         * @param {String} [config.disabledDatesRule] disabledDatesRule that is passed to the Calendar-instance
         * @private
         * @since 0.1
        */
        _saveShow : function(modus, initialDateTime, activationNode, config) {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_saveShow", 686);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 687);
var instance = this,
                panel = instance.panel;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 690);
if (panel.get('rendered')) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 691);
instance._show(modus, initialDateTime, activationNode, config);
            }
            else {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 694);
panel.onceAfter(
                    'render',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "(anonymous 18)", 696);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 697);
instance._show(modus, initialDateTime, activationNode, config);
                    }
                );
            }
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 701);
if (instance._panelRendererDelay) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 702);
instance._panelRendererDelay.cancel();
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 703);
panel.render();
            }
        },

        /**
         * Shows the panel-instance, ready to select a date and/or time.
         *
         * @method _show
         * @param {Int} modus internal type to tell whether a date, datetime or time needs to be picked (1,2 or 3)
         * @param {Date} [initialDateTime] date-object that holds the initial date-time for the panel. If not set then the current date-time is used.
         * @param {Y.Node} [activationNode] the node that causes the panel to appear. When set, the selector-panel is aligned to this Node.
         * @param {Object} [config] object to adjust the behaviour of the panel.
         * @param {String} [config.title] Title on the Panel-instance
         * @param {Boolean} [config.modal] Whether the Panel-instance should appear modal
         * @param {Boolean} [config.dragable] Whether the Panel-instance is dragable
         * @param {String} [config.timeformat] Format of the rendered timestring (default = '%H:%M')
         * @param {Object} [config.customRenderer] customRenderer that is passed to the Calendar-instance
         * @param {Boolean} [config.showPrevMonth] showPrevMonth that is passed to the Calendar-instance
         * @param {Boolean} [config.showNextMonth] showNextMonth that is passed to the Calendar-instance
         * @param {String} [config.headerRenderer] headerRenderer that is passed to the Calendar-instance (default = '%B %Y')
         * @param {Date} [config.minimumDate] minimumDate that is passed to the Calendar-instance
         * @param {Date} [config.maximumDate] maximumDate that is passed to the Calendar-instance
         * @param {String} [config.enabledDatesRule] enabledDatesRule that is passed to the Calendar-instance
         * @param {String} [config.disabledDatesRule] disabledDatesRule that is passed to the Calendar-instance
         * @private
         * @since 0.1
        */
        _show : function(modus, initialDateTime, activationNode, config) {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_show", 730);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 731);
var instance = this,
                panel = instance.panel,
                presentedDate = initialDateTime || new Date(),
                timeNode = instance._timeNode,
                modal = config && config.modal,
                rightAlign, window, winWidth, currentScroll, panelWidth, nodeX, nodeWidth, calAttrs, minutes, hours, dialvalue, minPanelWidth;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 738);
if (panel.get('visible')) {
                // previous panel is up --> we need to reject the promise by firing an EVENT_CANCEL-event:
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 740);
Y.fire(EVENT_CANCEL);
                // also hide the panel ourselves --> the cancel-event does not do this
                // we need this, because the panel wmigt be redrawed with other settings (like model-change)
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 743);
instance.panel.hide();
            }
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 745);
if (modus<3) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 746);
instance.calendar.deselectDates();
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 747);
instance.calendar.selectDates(presentedDate);
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 748);
if (Lang.isObject(config)) {
                    // Only accept limited properties. Also reset to default on new requests
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 750);
calAttrs = {
                        customRenderer: config.customRenderer || {},
                        showPrevMonth: config.showPrevMonth || false,
                        showNextMonth: config.showNextMonth || false,
                        headerRenderer: config.headerRenderer || '%B %Y',
                        minimumDate: config.minimumDate || null,
                        maximumDate: config.maximumDate || null,
                        enabledDatesRule: config.enabledDatesRule || null,
                        disabledDatesRule: config.disabledDatesRule || null
                    };
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 760);
instance.calendar.setAttrs(calAttrs);
                }
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 762);
instance.calendar.show();
            }
            else {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 765);
instance.calendar.hide();
            }
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 767);
if (modus>1) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 768);
if (Lang.isObject(config) && Lang.isString(config.timeformat)) {
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 769);
instance._timeFormat = config.timeformat;
                }
                else {
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 772);
instance._timeFormat = null;
                }
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 774);
hours = presentedDate.getHours();
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 775);
minutes = presentedDate.getMinutes();
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 776);
dialvalue = minutes+60*hours;
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 777);
instance.timedial.set('value', dialvalue);
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 778);
instance.timedial._originalValue = dialvalue;
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 779);
timeNode.setHTML(instance._renderDialTime(hours, minutes));
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 780);
timeNode.removeClass(TIME_CHANGED_CLASS);
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 781);
instance._toggleTimePicker(true);

            }
            else {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 785);
instance._toggleTimePicker(false);
            }
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 787);
if (activationNode) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 788);
window = instance._window;
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 789);
if (window) {
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 790);
winWidth = PARSTEINT(window.get('winWidth'));
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 791);
currentScroll = PARSTEINT(window.get('docScrollX'));
                    // check minwidth when no other fontsize is set:
                    // values are just read before after rendering...
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 794);
switch (modus) {
                        case 1: _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 795);
minPanelWidth = 285;
                        _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 796);
break;
                        case 2: _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 797);
minPanelWidth = 155;
                        _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 798);
break;
                        case 3: _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 799);
minPanelWidth = 415;
                        _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 800);
break;
                    }
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 802);
panelWidth = Math.max(panel.get('boundingBox').get('offsetWidth'), minPanelWidth);
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 803);
nodeX = activationNode.getX();
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 804);
nodeWidth = activationNode.get('offsetWidth');
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 805);
rightAlign = ((nodeX+nodeWidth+panelWidth)<(currentScroll+winWidth)) || ((nodeX+nodeWidth)<panelWidth);
                }
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 807);
panel.align(
                    activationNode,
                    (rightAlign ? [Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.TR] : [Y.WidgetPositionAlign.TR, Y.WidgetPositionAlign.BR])
                );
            }
            else {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 813);
panel.centered();
            }
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 815);
if (Lang.isBoolean(modal)) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 816);
panel.set('modal', modal);
            }
            else {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 819);
panel.set('modal', false);
            }
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 821);
switch (modus) {
                case 1: _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 822);
panel.set('headerContent', (config && config.title) || HEADERCONTENT_DATE);
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 823);
break;
                case 2: _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 824);
panel.set('headerContent', (config && config.title) || HEADERCONTENT_DATETIME);
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 825);
break;
                case 3: _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 826);
panel.set('headerContent', (config && config.title) || HEADERCONTENT_TIME);
            }
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 828);
if (config && Lang.isBoolean(config.dragable)) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 829);
if (config.dragable && !panel.hasPlugin('dd')) {
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 830);
panel.plug(Y.Plugin.Drag);
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 831);
panel.dd.addHandle('.yui3-widget-hd');
                }
                else {_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 833);
if (panel.hasPlugin('dd')) {
                    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 834);
panel.unplug('dd');
                }}
            }
            else {_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 837);
if (panel.hasPlugin('dd')) {
                _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 838);
panel.unplug('dd');
            }}
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 840);
panel.show();
         },

        /**
         * Toggles the visibility of the timepicker (Y.Dial-instance) together with the Select-button.
         *
         * @method _toggleTimePicker
         * @param {Boolean} visible whether the time-selector will be visible or not
         * @private
         * @since 0.1
        */
        _toggleTimePicker : function(visible) {
            _yuitest_coverfunc("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", "_toggleTimePicker", 851);
_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 852);
var instance = this;

            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 854);
instance.timedial.get('boundingBox').toggleClass(TIMEDIAL_HIDDEN, !visible);
            _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 855);
instance.panel.get('contentBox').one('.yui3-widget-ft').toggleClass(TIMEDIAL_HIDDEN, !visible);
        }

    }, {
        ATTRS : {
        }
    }
);

_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 864);
if (!Y.Global.ItsaDateTimePicker) {
    _yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 865);
Y.Global.ItsaDateTimePicker = new Y.ITSADateTimePicker();
}

_yuitest_coverline("build/gallery-itsadatetimepicker/gallery-itsadatetimepicker.js", 868);
Y.ItsaDateTimePicker = Y.Global.ItsaDateTimePicker;

}, '@VERSION@', {
    "requires": [
        "base",
        "node-base",
        "node-screen",
        "panel",
        "calendar",
        "dial",
        "promise",
        "cssbutton",
        "datatype-date-format",
        "dd-plugin"
    ],
    "skinnable": true
});
