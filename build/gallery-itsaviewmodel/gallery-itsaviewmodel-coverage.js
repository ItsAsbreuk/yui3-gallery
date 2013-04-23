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
_yuitest_coverage["build/gallery-itsaviewmodel/gallery-itsaviewmodel.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsaviewmodel/gallery-itsaviewmodel.js",
    code: []
};
_yuitest_coverage["build/gallery-itsaviewmodel/gallery-itsaviewmodel.js"].code=["YUI.add('gallery-itsaviewmodel', function (Y, NAME) {","","'use strict';","","/**"," *"," * Widget ITSAViewModel"," *"," *"," * This widget renderes Y.Model-instances -or just plain objects- inside the widgets contentBox."," * It uses Y.View under the hood, where Y.View.container is bound to the 'contentBox'. The render-method must be defined"," * by the widget's attribute 'template'. The Model (or object) must be set through the attribute 'model'."," *"," * Events can be set through the attribute 'events' and follow the same pattern as Y.View does. As a matter of fact, all attributes"," * (template, model, events) are passed through to the widgets Y.View instance (which has the property 'view')."," *"," *"," * Using this widget is great to render Model on the page, where the widget keeps synced with the model. Whenever a new Model-instance"," * is attached to the widget, or another template is used, the wodget will be re-rendered automaticly."," *"," * Attaching Y.Model-instances or objects?"," * Both can be attached. Whenever widgetattribute change, the widget will be re-rendered is needed (template- or model-attribute). This also"," * counts for attached objects. However, changes inside an object itself (updated property-value) cannot be caught by the widget, so you need"," * to call syncUI() yourself after an object-change. Y.Model-instances -on the other hand- do fire a *:change-event which is caught by the widget."," * This makes the widget re-render after a Model-instance changes some of its attributes."," *"," *"," * By default, the widget comes with its own style. You can disable this by setting the attribute 'styled' to false."," *"," * @module gallery-itsaviewmodel"," * @extends Widget"," * @class ITSAViewModel"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var Lang = Y.Lang,","    YArray = Y.Array,","    YTemplateMicro = Y.Template.Micro,","    MODELVIEW_STYLED = 'itsa-modelview-styled',","    MODELVIEW_STYLED_FORM = 'yui3-form',","    FORMELEMENT_CLASS = 'yui3-itsaformelement',","    ITSAFORMELEMENT_CHANGED_CLASS = FORMELEMENT_CLASS + '-changed';","","","//===============================================================================================","//","// First: extend Y.Node with the method cleanup()","//","//===============================================================================================","","function ITSANodeCleanup() {}","","Y.mix(ITSANodeCleanup.prototype, {","","    //","    // Destroys all widgets inside the node by calling widget.destroy(true);","    //","    // @method cleanup","    // @param destroyAllNodes {Boolean} If true, all nodes contained within the Widget are removed and destroyed.","    //                        Defaults to false due to potentially high run-time cost.","    // @since 0.1","    //","    //","    cleanupWidgets: function(destroyAllNodes) {","        var node = this,","            YWidget = Y.Widget;","","        if (YWidget) {","            node.all('.yui3-widget').each(","                function(widgetNode) {","                    if (node.one('#'+widgetNode.get('id'))) {","                        var widgetInstance = YWidget.getByNode(widgetNode);","                        if (widgetInstance) {","                            widgetInstance.destroy(destroyAllNodes);","                        }","                    }","                }","            );","        }","    },","","    //","    // Cleansup the node by calling node.empty(), as well as destroying all widgets that lie","    // within the node by calling widget.destroy(true);","    //","    // @method cleanup","    // @since 0.1","    //","    //","    cleanup: function() {","        var node = this;","","        node.cleanupWidgets(true);","        node.empty();","    }","","}, true);","","Y.Node.ITSANodeCleanup = ITSANodeCleanup;","","Y.Base.mix(Y.Node, [ITSANodeCleanup]);","","//===============================================================================================","//","// Next we create the widget","//","//===============================================================================================","","Y.ITSAViewModel = Y.Base.create('itsaviewmodel', Y.Widget, [], {","","        /**","         * Internally generated Y.View-instance that has its 'container' bound to the 'contentBox'","         * @property view","         * @type Y.View","        */","        view : null,","","        /**","         * Internal flag that tells wheter a Template.Micro is being used.","         * @property _isMicroTemplate","         * @private","         * @default null","         * @type Boolean","        */","        _isMicroTemplate : null,","","        /**","         * Internal Function that is generated to automaticly make use of the template.","         * The function has the structure of: _modelRenderer = function(model) {return {String}};","         * @property _modelRenderer","         * @private","         * @default function(model) {return ''};","         * @type Function","        */","        _modelRenderer : null,","","        /**","         * Internal list of all eventhandlers bound by this widget.","         * @property _eventhandlers","         * @private","         * @default []","         * @type Array","        */","        _eventhandlers : [],","","        _initialEditAttrs : null,","","        /**","         * @method initializer","         * @protected","        */","        initializer : function() {","            var instance = this,","                boundingBox = instance.get('boundingBox'),","                model = instance.get('model'),","                modelEditable = instance.get('modelEditable'),","                itsaeditmodel = (modelEditable && model.itsaeditmodel);","","            if (itsaeditmodel && !boundingBox.itsatabkeymanager) {","                Y.use('gallery-itsatabkeymanager', function(Y) {","                    boundingBox.plug(Y.Plugin.ITSATabKeyManager);","                    instance.initializeFurther(boundingBox, model, itsaeditmodel);","                });","            }","            else {","                instance.initializeFurther(boundingBox, model, itsaeditmodel);","            }","        },","","        /**","         * @method initializer","         * @protected","        */","        initializeFurther : function(boundingBox, model, itsaeditmodel) {","            var instance = this,","                contentBox = instance.get('contentBox'),","                events = instance.get('events'),","                template = itsaeditmodel ? model.itsaeditmodel.get('template') : instance.get('template'),","                styled = instance.get('styled'),","                view;","","            if (styled) {","                boundingBox.addClass(MODELVIEW_STYLED).addClass(MODELVIEW_STYLED_FORM);","            }","            view = instance.view = new Y.View({","                container: contentBox,","                model: model","            });","            view.events = events;","            view.template = template;","            instance._setTemplateRenderer(template, itsaeditmodel);","            view.render = Y.rbind(instance._viewRenderer, instance);","            if (model && model.addTarget) {","                model.addTarget(view);","            }","         },","","        /**","         * Sets up DOM and CustomEvent listeners for the widget.","         *","         * @method bindUI","         * @protected","         */","        bindUI: function() {","            var instance = this,","                boundingBox = instance.get('boundingBox'),","                model = instance.get('model'),","                eventhandlers = instance._eventhandlers,","                view = instance.view;","","            eventhandlers.push(","                instance.after(","                    'modelChange',","                    function(e) {","                        var prevVal = e.prevVal,","                            newVal = e.newVal;","                        if (prevVal && prevVal.removeTarget) {","                            prevVal.removeTarget(view);","                        }","                        if (newVal && newVal.addTarget) {","                            newVal.addTarget(view);","                        }","                        view.set('model', newVal);","                        model = instance.get('model');","                        view.render();","                    }","                )","            );","            eventhandlers.push(","                view.after(","                    'model:templateChange',","                    function(e) {","                        var newTemplate = e.newVal,","                            modelEditable = instance.get('modelEditable');","                        if (!modelEditable || !model.itsaeditmodel) {","                            view.template = newTemplate;","                            instance._setTemplateRenderer(newTemplate, false);","                            view.render();","                        }","                    }","                )","            );","            eventhandlers.push(","                view.after(","                    'itsaeditmodel:templateChange',","                    function(e) {","                        var newTemplate = e.newVal,","                            modelEditable = instance.get('modelEditable');","                        if (modelEditable && model.itsaeditmodel) {","                            view.template = newTemplate;","                            instance._setTemplateRenderer(newTemplate, true);","                            view.render();","                        }","                    }","                )","            );","            eventhandlers.push(","                view.after(","                    'model:resetclick',","                    function(e) {","                        var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)","                            container = view.get('container'),","                            options = {fromEditModel: true}, // set Attribute with option: '{fromEditModel: true}'","                                                             // --> now the view knows it must not re-render.","                            buttonNode;","                        model.setAttrs(instance._initialEditAttrs, options);","                        view.render();","                        buttonNode = container.one('#'+e.elementId);","                        if (buttonNode) {","                            buttonNode.focus();","                        }","                    }","                )","            );","            eventhandlers.push(","                instance.after(","                    'modelEditableChange',","                    function(e) {","                        var newEditable = e.newVal,","                            template;","                        // if model.itsaeditmodel exists, then we need to rerender","                        if (model.itsaeditmodel) {","                            template = newEditable ? model.itsaeditmodel.get('template') : instance.get('template');","                            view.template = template;","                            instance._setTemplateRenderer(template, newEditable);","                            view.render();","                        }","                    }","                )","            );","            eventhandlers.push(","                instance.after(","                    'itsaeditmodel:editmodelConfigAttrsChange',","                    function() {","                        if (model.itsaeditmodel && instance.get('modelEditable')) {","                            view.render();","                        }","                    }","                )","            );","            eventhandlers.push(","                view.after(","                    'itsaeditmodel:destroy',","                    function() {","                        if (instance.get('modelEditable')) {","                            var template = instance.get('template');","                            view.template = template;","                            instance._setTemplateRenderer(template, false);","                            view.render();","                        }","                    }","                )","            );","            eventhandlers.push(","                view.after(","                    'itsaeditmodel:pluggedin',","                    function() {","                        Y.use('gallery-itsatabkeymanager', function(Y) {","                            if (!boundingBox.itsatabkeymanager) {","                                boundingBox.plug(Y.Plugin.ITSATabKeyManager);","                            }","                            if (instance.get('modelEditable')) {","                                var template = model.itsaeditmodel.get('template');","                                view.template = template;","                                instance._setTemplateRenderer(template, true);","                                view.render();","                            }","                        });","                    }","                )","            );","            eventhandlers.push(","                view.after(","                    'itsaeditmodel:focusnext',","                    function() {","                        var itsatabkeymanager = boundingBox.itsatabkeymanager;","                        if (itsatabkeymanager && instance.get('focused')) {","                            itsatabkeymanager.next();","                        }","                        else {","                        }","                    }","                )","            );","            eventhandlers.push(","                instance.after(","                    'eventsChange',","                    function(e) {","                        view.events = e.newVal;","                    }","                )","            );","            eventhandlers.push(","                instance.after(","                    'styledChange',","                    function(e) {","                        boundingBox.toggleClass(MODELVIEW_STYLED, e.newVal).toggleClass(MODELVIEW_STYLED_FORM, e.newVal);","                    }","                )","            );","            eventhandlers.push(","                view.after(","                    'model:change',","                    function() {","                        if (!instance.get('modelEditable') || !model.itsaeditmodel) {","                            view.render(false);","                        }","                        else {","                            view.get('container').all('.'+ITSAFORMELEMENT_CHANGED_CLASS).removeClass(ITSAFORMELEMENT_CHANGED_CLASS);","                        }","                    }","                )","            );","            eventhandlers.push(","                view.after(","                    'model:destroy',","                    function() {","                        view.render(true);","                    }","                )","            );","        },","","        /**","         * Returns the Model as an object. Regardless whether it is a Model-instance, or an item of a LazyModelList","         * which might be an Object or a Model. Caution: If it is a Model-instance, than you get a Clone. If not","         * -in case of an object from a LazyModelList- than you get the reference to the original object.","         *","         * @method getModelToJSON","         * @param {Y.Model} model Model or Object","         * @return {Object} Object or model.toJSON()","         * @since 0.1","         *","        */","        getModelToJSON : function(model) {","            return (model.get && (Lang.type(model.get) === 'function')) ? model.toJSON() : model;","        },","","        /**","         * Updates the widget-content by calling view.render();","         *","         * @method syncUI","         * @protected","         */","        syncUI: function() {","            this.view.render();","        },","","        /**","         * Cleans up bindings","         * @method destructor","         * @protected","        */","        destructor: function() {","            var instance = this,","                boundingBox = instance.get('boundingBox');","","            instance._clearEventhandlers();","            instance.view.destroy();","            if (boundingBox.hasPlugin('itsatabkeymanager')) {","                boundingBox.unplug('itsatabkeymanager');","            }","        },","","        //===============================================================================================","        // private methods","        //===============================================================================================","","        /**","         * Function-factory that binds a function to the property '_modelRenderer'. '_modelRenderer' will be defined like","         * _modelRenderer = function(model) {return {String}};","         * which means: it will return a rendered String that is modified by the attribute 'template'. The rendering","         * is done either by Y.Lang.sub or by Y.Template.Micro, depending on the value of 'template'.","         *","         * @method _viewRenderer","         * @param template {String} template to be rendered","         * @param editTemplate {Boolean} whether or not the template is an 'editTemplate' from Y.Plugin.ITSAEditModel","         * @private","         * @chainable","         * @since 0.1","         *","        */","        _setTemplateRenderer : function(template, editTemplate) {","            var instance = this,","                isMicroTemplate, ismicrotemplate, compiledModelEngine;","","            isMicroTemplate = function() {","                var microTemplateRegExp = /<%(.+)%>/;","                return microTemplateRegExp.test(template);","            };","            ismicrotemplate = instance._isMicroTemplate = isMicroTemplate();","            if (ismicrotemplate) {","                compiledModelEngine = YTemplateMicro.compile(template);","                instance._modelRenderer = function(model) {","                    var jsondata = editTemplate ? model.itsaeditmodel.toJSON(model.itsaeditmodel.get('editmodelConfigAttrs'))","                                   : instance.getModelToJSON(model);","                    return compiledModelEngine(jsondata);","                };","            }","            else {","                instance._modelRenderer = function(model) {","                    var jsondata = editTemplate ? model.itsaeditmodel.toJSON(model.itsaeditmodel.get('editmodelConfigAttrs'))","                                   : instance.getModelToJSON(model);","                    return Lang.sub(template, jsondata);","                };","            }","        },","","        /**","         * Method that is responsible for rendering the Model into the view.","         *","         * @method _viewRenderer","         * @param {Boolean} [clear] whether to clear the view. normally you don't want this: leaving empty means the Model is drawn.","         * @private","         * @chainable","         * @since 0.1","         *","        */","        _viewRenderer : function (clear) {","            var instance = this,","                boundingBox = instance.get('boundingBox'),","                itsatabkeymanager = boundingBox.itsatabkeymanager,","                view = instance.view,","                container = view.get('container'),","                model = view.get('model'),","                editMode = model.itsaeditmodel && instance.get('modelEditable'),","                itsaDateTimePicker = Y.Global.ItsaDateTimePicker,","                html = clear ? '' : instance._modelRenderer(model);","","            // Render this view's HTML into the container element.","            // Because Y.Node.setHTML DOES NOT destroy its nodes (!) but only remove(), we destroy them ourselves first","            if (editMode || instance._isMicroTemplate) {","                if (editMode) {","                    instance._initialEditAttrs = model.getAttrs();","                }","                container.cleanupWidgets(true);","            }","","            container.setHTML(html);","            // If Y.Plugin.ITSATabKeyManager is plugged in, then refocus to the first item","            if (itsatabkeymanager) {","                itsatabkeymanager.refresh(boundingBox);","                if (instance.get('focused')) {","                    itsatabkeymanager.focusInitialItem();","                }","            }","            if (itsaDateTimePicker && itsaDateTimePicker.panel.get('visible')) {","                itsaDateTimePicker.hide(true);","            }","            return instance;","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearEventhandlers : function() {","            YArray.each(","                this._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        }","","    }, {","        ATTRS : {","            /**","             * Hash of CSS selectors mapped to events to delegate to elements matching","             * those selectors.","             *","             * CSS selectors are relative to the `contentBox` element, which is in fact","             * the view-container. Events are attached to this container (contentBox), and","             * delegation is used so that subscribers are only notified of events that occur on","             * elements inside the container that match the specified selectors. This allows the","             * contentBox to be re-rendered as needed without losing event subscriptions.","             *","             * Event handlers can be specified either as functions or as strings that map","             * to function names. IN the latter case, you must declare the functions as part","             * of the 'view'-property (which is a Y.View instance).","             *","             * The `this` object in event handlers will refer to the 'view'-property (which is a","             * Y.View instance, created during initialisation of this widget. If you'd prefer `this`","             * to be something else, use `Y.bind()` to bind a custom `this` object.","             *","             * @example","             *     var viewModel = new Y.ViewITSAViewModel({","             *         events: {","             *             // Call `this.toggle()` whenever the element with the id","             *             // \"toggle-button\" is clicked.","             *             '#toggle-button': {click: 'toggle'},","             *","             *             // Call `this.hoverOn()` when the mouse moves over any element","             *             // with the \"hoverable\" class, and `this.hoverOff()` when the","             *             // mouse moves out of any element with the \"hoverable\" class.","             *             '.hoverable': {","             *                 mouseover: 'hoverOn',","             *                 mouseout : 'hoverOff'","             *             }","             *         }","             *     });","             *","             * @attribute events","             * @type {object}","             * @default {}","             * @since 0.1","             */","            events: {","                value: {},","                validator: function(v){ return Lang.isObject(v);}","            },","","            /**","             * Makes the View to render the editable-version of the Model. Only when the Model has <b>Y.Plugin.ITSAEditModel</b> plugged in.","             *","             * @attribute modelEditable","             * @type {Boolean}","             * @default false","             * @since 0.1","             */","            modelEditable: {","                value: false,","                lazyAdd: false,","                validator: function(v){","                    return Lang.isBoolean(v);","                }","            },","","            /**","             * The Y.Model that will be rendered in the view. May also be an Object, which is handy in case the source is an","             * item of a Y.LazyModelList","             *","             * @attribute model","             * @type {Y.Model|Object}","             * @default {}","             * @since 0.1","             */","            model: {","                value: null,","                validator: function(v){ return ((v instanceof Y.Model) || Lang.isObject(v) || (v===null)); }","            },","","           /**","            * Whether the View is styled using the css of this module.","            * In fact, just the classname 'itsa-modelview-styled' is added to the boundingBox","            * and the css-rules do all the rest. The developer may override these rules, or set this value to false","            * while creatiung their own css. In the latter case it is advisable to take a look at all the css-rules","            * that are supplied by this module.","            *","            * @default true","            * @attribute styled","            * @type {Boolean}","            * @since 0.1","            */","            styled: {","                value: true,","                validator:  function(v) {","                    return Lang.isBoolean(v);","                }","            },","","        /**","         * Template to render the Model. The attribute MUST be a template that can be processed by either <i>Y.Lang.sub or Y.Template.Micro</i>,","         * where Y.Lang.sub is more lightweight.","         *","         * <b>Example with Y.Lang.sub:</b> '{slices} slice(s) of {type} pie remaining. <button class=\"eat\">Eat a Slice!</button>'","         * <b>Example with Y.Template.Micro:</b>","         * '<%= data.slices %> slice(s) of <%= data.type %> pie remaining <button class=\"eat\">Eat a Slice!</button>'","         * <b>Example 2 with Y.Template.Micro:</b>","         * '<%= data.slices %> slice(s) of <%= data.type %> pie remaining<% if (data.slices>0) {%> <button class=\"eat\">Eat a Slice!</button><% } %>'","         *","         * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>","         *","         * @attribute template","         * @type {String}","         * @default '{clientId}'","         * @since 0.1","         */","            template: {","                value: '{clientId}',","                validator: function(v){ return Lang.isString(v); }","            }","","        }","    }",");","","}, '@VERSION@', {","    \"requires\": [","        \"base-build\",","        \"widget\",","        \"view\",","        \"template-micro\",","        \"model\",","        \"pluginhost-base\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/gallery-itsaviewmodel/gallery-itsaviewmodel.js"].lines = {"1":0,"3":0,"41":0,"56":0,"58":0,"70":0,"73":0,"74":0,"76":0,"77":0,"78":0,"79":0,"96":0,"98":0,"99":0,"104":0,"106":0,"114":0,"158":0,"164":0,"165":0,"166":0,"167":0,"171":0,"180":0,"187":0,"188":0,"190":0,"194":0,"195":0,"196":0,"197":0,"198":0,"199":0,"210":0,"216":0,"220":0,"222":0,"223":0,"225":0,"226":0,"228":0,"229":0,"230":0,"234":0,"238":0,"240":0,"241":0,"242":0,"243":0,"248":0,"252":0,"254":0,"255":0,"256":0,"257":0,"262":0,"266":0,"271":0,"272":0,"273":0,"274":0,"275":0,"280":0,"284":0,"287":0,"288":0,"289":0,"290":0,"291":0,"296":0,"300":0,"301":0,"306":0,"310":0,"311":0,"312":0,"313":0,"314":0,"319":0,"323":0,"324":0,"325":0,"327":0,"328":0,"329":0,"330":0,"331":0,"337":0,"341":0,"342":0,"343":0,"350":0,"354":0,"358":0,"362":0,"366":0,"370":0,"371":0,"374":0,"379":0,"383":0,"401":0,"411":0,"420":0,"423":0,"424":0,"425":0,"426":0,"449":0,"452":0,"453":0,"454":0,"456":0,"457":0,"458":0,"459":0,"460":0,"462":0,"466":0,"467":0,"469":0,"485":0,"497":0,"498":0,"499":0,"501":0,"504":0,"506":0,"507":0,"508":0,"509":0,"512":0,"513":0,"515":0,"527":0,"530":0,"579":0,"594":0,"609":0,"627":0,"650":0};
_yuitest_coverage["build/gallery-itsaviewmodel/gallery-itsaviewmodel.js"].functions = {"ITSANodeCleanup:56":0,"(anonymous 2):75":0,"cleanupWidgets:69":0,"cleanup:95":0,"(anonymous 3):165":0,"initializer:157":0,"initializeFurther:179":0,"(anonymous 4):219":0,"(anonymous 5):237":0,"(anonymous 6):251":0,"(anonymous 7):265":0,"(anonymous 8):283":0,"(anonymous 9):299":0,"(anonymous 10):309":0,"(anonymous 12):323":0,"(anonymous 11):322":0,"(anonymous 13):340":0,"(anonymous 14):353":0,"(anonymous 15):361":0,"(anonymous 16):369":0,"(anonymous 17):382":0,"bindUI:209":0,"getModelToJSON:400":0,"syncUI:410":0,"destructor:419":0,"isMicroTemplate:452":0,"_modelRenderer:459":0,"_modelRenderer:466":0,"_setTemplateRenderer:448":0,"_viewRenderer:484":0,"(anonymous 18):529":0,"_clearEventhandlers:526":0,"validator:579":0,"validator:593":0,"validator:609":0,"validator:626":0,"validator:650":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsaviewmodel/gallery-itsaviewmodel.js"].coveredLines = 142;
_yuitest_coverage["build/gallery-itsaviewmodel/gallery-itsaviewmodel.js"].coveredFunctions = 38;
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 1);
YUI.add('gallery-itsaviewmodel', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 3);
'use strict';

/**
 *
 * Widget ITSAViewModel
 *
 *
 * This widget renderes Y.Model-instances -or just plain objects- inside the widgets contentBox.
 * It uses Y.View under the hood, where Y.View.container is bound to the 'contentBox'. The render-method must be defined
 * by the widget's attribute 'template'. The Model (or object) must be set through the attribute 'model'.
 *
 * Events can be set through the attribute 'events' and follow the same pattern as Y.View does. As a matter of fact, all attributes
 * (template, model, events) are passed through to the widgets Y.View instance (which has the property 'view').
 *
 *
 * Using this widget is great to render Model on the page, where the widget keeps synced with the model. Whenever a new Model-instance
 * is attached to the widget, or another template is used, the wodget will be re-rendered automaticly.
 *
 * Attaching Y.Model-instances or objects?
 * Both can be attached. Whenever widgetattribute change, the widget will be re-rendered is needed (template- or model-attribute). This also
 * counts for attached objects. However, changes inside an object itself (updated property-value) cannot be caught by the widget, so you need
 * to call syncUI() yourself after an object-change. Y.Model-instances -on the other hand- do fire a *:change-event which is caught by the widget.
 * This makes the widget re-render after a Model-instance changes some of its attributes.
 *
 *
 * By default, the widget comes with its own style. You can disable this by setting the attribute 'styled' to false.
 *
 * @module gallery-itsaviewmodel
 * @extends Widget
 * @class ITSAViewModel
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 41);
var Lang = Y.Lang,
    YArray = Y.Array,
    YTemplateMicro = Y.Template.Micro,
    MODELVIEW_STYLED = 'itsa-modelview-styled',
    MODELVIEW_STYLED_FORM = 'yui3-form',
    FORMELEMENT_CLASS = 'yui3-itsaformelement',
    ITSAFORMELEMENT_CHANGED_CLASS = FORMELEMENT_CLASS + '-changed';


//===============================================================================================
//
// First: extend Y.Node with the method cleanup()
//
//===============================================================================================

_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 56);
function ITSANodeCleanup() {}

_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 58);
Y.mix(ITSANodeCleanup.prototype, {

    //
    // Destroys all widgets inside the node by calling widget.destroy(true);
    //
    // @method cleanup
    // @param destroyAllNodes {Boolean} If true, all nodes contained within the Widget are removed and destroyed.
    //                        Defaults to false due to potentially high run-time cost.
    // @since 0.1
    //
    //
    cleanupWidgets: function(destroyAllNodes) {
        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "cleanupWidgets", 69);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 70);
var node = this,
            YWidget = Y.Widget;

        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 73);
if (YWidget) {
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 74);
node.all('.yui3-widget').each(
                function(widgetNode) {
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 2)", 75);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 76);
if (node.one('#'+widgetNode.get('id'))) {
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 77);
var widgetInstance = YWidget.getByNode(widgetNode);
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 78);
if (widgetInstance) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 79);
widgetInstance.destroy(destroyAllNodes);
                        }
                    }
                }
            );
        }
    },

    //
    // Cleansup the node by calling node.empty(), as well as destroying all widgets that lie
    // within the node by calling widget.destroy(true);
    //
    // @method cleanup
    // @since 0.1
    //
    //
    cleanup: function() {
        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "cleanup", 95);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 96);
var node = this;

        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 98);
node.cleanupWidgets(true);
        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 99);
node.empty();
    }

}, true);

_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 104);
Y.Node.ITSANodeCleanup = ITSANodeCleanup;

_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 106);
Y.Base.mix(Y.Node, [ITSANodeCleanup]);

//===============================================================================================
//
// Next we create the widget
//
//===============================================================================================

_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 114);
Y.ITSAViewModel = Y.Base.create('itsaviewmodel', Y.Widget, [], {

        /**
         * Internally generated Y.View-instance that has its 'container' bound to the 'contentBox'
         * @property view
         * @type Y.View
        */
        view : null,

        /**
         * Internal flag that tells wheter a Template.Micro is being used.
         * @property _isMicroTemplate
         * @private
         * @default null
         * @type Boolean
        */
        _isMicroTemplate : null,

        /**
         * Internal Function that is generated to automaticly make use of the template.
         * The function has the structure of: _modelRenderer = function(model) {return {String}};
         * @property _modelRenderer
         * @private
         * @default function(model) {return ''};
         * @type Function
        */
        _modelRenderer : null,

        /**
         * Internal list of all eventhandlers bound by this widget.
         * @property _eventhandlers
         * @private
         * @default []
         * @type Array
        */
        _eventhandlers : [],

        _initialEditAttrs : null,

        /**
         * @method initializer
         * @protected
        */
        initializer : function() {
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "initializer", 157);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 158);
var instance = this,
                boundingBox = instance.get('boundingBox'),
                model = instance.get('model'),
                modelEditable = instance.get('modelEditable'),
                itsaeditmodel = (modelEditable && model.itsaeditmodel);

            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 164);
if (itsaeditmodel && !boundingBox.itsatabkeymanager) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 165);
Y.use('gallery-itsatabkeymanager', function(Y) {
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 3)", 165);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 166);
boundingBox.plug(Y.Plugin.ITSATabKeyManager);
                    _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 167);
instance.initializeFurther(boundingBox, model, itsaeditmodel);
                });
            }
            else {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 171);
instance.initializeFurther(boundingBox, model, itsaeditmodel);
            }
        },

        /**
         * @method initializer
         * @protected
        */
        initializeFurther : function(boundingBox, model, itsaeditmodel) {
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "initializeFurther", 179);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 180);
var instance = this,
                contentBox = instance.get('contentBox'),
                events = instance.get('events'),
                template = itsaeditmodel ? model.itsaeditmodel.get('template') : instance.get('template'),
                styled = instance.get('styled'),
                view;

            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 187);
if (styled) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 188);
boundingBox.addClass(MODELVIEW_STYLED).addClass(MODELVIEW_STYLED_FORM);
            }
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 190);
view = instance.view = new Y.View({
                container: contentBox,
                model: model
            });
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 194);
view.events = events;
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 195);
view.template = template;
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 196);
instance._setTemplateRenderer(template, itsaeditmodel);
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 197);
view.render = Y.rbind(instance._viewRenderer, instance);
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 198);
if (model && model.addTarget) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 199);
model.addTarget(view);
            }
         },

        /**
         * Sets up DOM and CustomEvent listeners for the widget.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "bindUI", 209);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 210);
var instance = this,
                boundingBox = instance.get('boundingBox'),
                model = instance.get('model'),
                eventhandlers = instance._eventhandlers,
                view = instance.view;

            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 216);
eventhandlers.push(
                instance.after(
                    'modelChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 4)", 219);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 220);
var prevVal = e.prevVal,
                            newVal = e.newVal;
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 222);
if (prevVal && prevVal.removeTarget) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 223);
prevVal.removeTarget(view);
                        }
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 225);
if (newVal && newVal.addTarget) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 226);
newVal.addTarget(view);
                        }
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 228);
view.set('model', newVal);
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 229);
model = instance.get('model');
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 230);
view.render();
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 234);
eventhandlers.push(
                view.after(
                    'model:templateChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 5)", 237);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 238);
var newTemplate = e.newVal,
                            modelEditable = instance.get('modelEditable');
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 240);
if (!modelEditable || !model.itsaeditmodel) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 241);
view.template = newTemplate;
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 242);
instance._setTemplateRenderer(newTemplate, false);
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 243);
view.render();
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 248);
eventhandlers.push(
                view.after(
                    'itsaeditmodel:templateChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 6)", 251);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 252);
var newTemplate = e.newVal,
                            modelEditable = instance.get('modelEditable');
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 254);
if (modelEditable && model.itsaeditmodel) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 255);
view.template = newTemplate;
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 256);
instance._setTemplateRenderer(newTemplate, true);
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 257);
view.render();
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 262);
eventhandlers.push(
                view.after(
                    'model:resetclick',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 7)", 265);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 266);
var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)
                            container = view.get('container'),
                            options = {fromEditModel: true}, // set Attribute with option: '{fromEditModel: true}'
                                                             // --> now the view knows it must not re-render.
                            buttonNode;
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 271);
model.setAttrs(instance._initialEditAttrs, options);
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 272);
view.render();
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 273);
buttonNode = container.one('#'+e.elementId);
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 274);
if (buttonNode) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 275);
buttonNode.focus();
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 280);
eventhandlers.push(
                instance.after(
                    'modelEditableChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 8)", 283);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 284);
var newEditable = e.newVal,
                            template;
                        // if model.itsaeditmodel exists, then we need to rerender
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 287);
if (model.itsaeditmodel) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 288);
template = newEditable ? model.itsaeditmodel.get('template') : instance.get('template');
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 289);
view.template = template;
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 290);
instance._setTemplateRenderer(template, newEditable);
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 291);
view.render();
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 296);
eventhandlers.push(
                instance.after(
                    'itsaeditmodel:editmodelConfigAttrsChange',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 9)", 299);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 300);
if (model.itsaeditmodel && instance.get('modelEditable')) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 301);
view.render();
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 306);
eventhandlers.push(
                view.after(
                    'itsaeditmodel:destroy',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 10)", 309);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 310);
if (instance.get('modelEditable')) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 311);
var template = instance.get('template');
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 312);
view.template = template;
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 313);
instance._setTemplateRenderer(template, false);
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 314);
view.render();
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 319);
eventhandlers.push(
                view.after(
                    'itsaeditmodel:pluggedin',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 11)", 322);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 323);
Y.use('gallery-itsatabkeymanager', function(Y) {
                            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 12)", 323);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 324);
if (!boundingBox.itsatabkeymanager) {
                                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 325);
boundingBox.plug(Y.Plugin.ITSATabKeyManager);
                            }
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 327);
if (instance.get('modelEditable')) {
                                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 328);
var template = model.itsaeditmodel.get('template');
                                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 329);
view.template = template;
                                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 330);
instance._setTemplateRenderer(template, true);
                                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 331);
view.render();
                            }
                        });
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 337);
eventhandlers.push(
                view.after(
                    'itsaeditmodel:focusnext',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 13)", 340);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 341);
var itsatabkeymanager = boundingBox.itsatabkeymanager;
                        _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 342);
if (itsatabkeymanager && instance.get('focused')) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 343);
itsatabkeymanager.next();
                        }
                        else {
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 350);
eventhandlers.push(
                instance.after(
                    'eventsChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 14)", 353);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 354);
view.events = e.newVal;
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 358);
eventhandlers.push(
                instance.after(
                    'styledChange',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 15)", 361);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 362);
boundingBox.toggleClass(MODELVIEW_STYLED, e.newVal).toggleClass(MODELVIEW_STYLED_FORM, e.newVal);
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 366);
eventhandlers.push(
                view.after(
                    'model:change',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 16)", 369);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 370);
if (!instance.get('modelEditable') || !model.itsaeditmodel) {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 371);
view.render(false);
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 374);
view.get('container').all('.'+ITSAFORMELEMENT_CHANGED_CLASS).removeClass(ITSAFORMELEMENT_CHANGED_CLASS);
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 379);
eventhandlers.push(
                view.after(
                    'model:destroy',
                    function() {
                        _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 17)", 382);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 383);
view.render(true);
                    }
                )
            );
        },

        /**
         * Returns the Model as an object. Regardless whether it is a Model-instance, or an item of a LazyModelList
         * which might be an Object or a Model. Caution: If it is a Model-instance, than you get a Clone. If not
         * -in case of an object from a LazyModelList- than you get the reference to the original object.
         *
         * @method getModelToJSON
         * @param {Y.Model} model Model or Object
         * @return {Object} Object or model.toJSON()
         * @since 0.1
         *
        */
        getModelToJSON : function(model) {
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "getModelToJSON", 400);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 401);
return (model.get && (Lang.type(model.get) === 'function')) ? model.toJSON() : model;
        },

        /**
         * Updates the widget-content by calling view.render();
         *
         * @method syncUI
         * @protected
         */
        syncUI: function() {
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "syncUI", 410);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 411);
this.view.render();
        },

        /**
         * Cleans up bindings
         * @method destructor
         * @protected
        */
        destructor: function() {
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "destructor", 419);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 420);
var instance = this,
                boundingBox = instance.get('boundingBox');

            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 423);
instance._clearEventhandlers();
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 424);
instance.view.destroy();
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 425);
if (boundingBox.hasPlugin('itsatabkeymanager')) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 426);
boundingBox.unplug('itsatabkeymanager');
            }
        },

        //===============================================================================================
        // private methods
        //===============================================================================================

        /**
         * Function-factory that binds a function to the property '_modelRenderer'. '_modelRenderer' will be defined like
         * _modelRenderer = function(model) {return {String}};
         * which means: it will return a rendered String that is modified by the attribute 'template'. The rendering
         * is done either by Y.Lang.sub or by Y.Template.Micro, depending on the value of 'template'.
         *
         * @method _viewRenderer
         * @param template {String} template to be rendered
         * @param editTemplate {Boolean} whether or not the template is an 'editTemplate' from Y.Plugin.ITSAEditModel
         * @private
         * @chainable
         * @since 0.1
         *
        */
        _setTemplateRenderer : function(template, editTemplate) {
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_setTemplateRenderer", 448);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 449);
var instance = this,
                isMicroTemplate, ismicrotemplate, compiledModelEngine;

            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 452);
isMicroTemplate = function() {
                _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "isMicroTemplate", 452);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 453);
var microTemplateRegExp = /<%(.+)%>/;
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 454);
return microTemplateRegExp.test(template);
            };
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 456);
ismicrotemplate = instance._isMicroTemplate = isMicroTemplate();
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 457);
if (ismicrotemplate) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 458);
compiledModelEngine = YTemplateMicro.compile(template);
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 459);
instance._modelRenderer = function(model) {
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_modelRenderer", 459);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 460);
var jsondata = editTemplate ? model.itsaeditmodel.toJSON(model.itsaeditmodel.get('editmodelConfigAttrs'))
                                   : instance.getModelToJSON(model);
                    _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 462);
return compiledModelEngine(jsondata);
                };
            }
            else {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 466);
instance._modelRenderer = function(model) {
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_modelRenderer", 466);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 467);
var jsondata = editTemplate ? model.itsaeditmodel.toJSON(model.itsaeditmodel.get('editmodelConfigAttrs'))
                                   : instance.getModelToJSON(model);
                    _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 469);
return Lang.sub(template, jsondata);
                };
            }
        },

        /**
         * Method that is responsible for rendering the Model into the view.
         *
         * @method _viewRenderer
         * @param {Boolean} [clear] whether to clear the view. normally you don't want this: leaving empty means the Model is drawn.
         * @private
         * @chainable
         * @since 0.1
         *
        */
        _viewRenderer : function (clear) {
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_viewRenderer", 484);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 485);
var instance = this,
                boundingBox = instance.get('boundingBox'),
                itsatabkeymanager = boundingBox.itsatabkeymanager,
                view = instance.view,
                container = view.get('container'),
                model = view.get('model'),
                editMode = model.itsaeditmodel && instance.get('modelEditable'),
                itsaDateTimePicker = Y.Global.ItsaDateTimePicker,
                html = clear ? '' : instance._modelRenderer(model);

            // Render this view's HTML into the container element.
            // Because Y.Node.setHTML DOES NOT destroy its nodes (!) but only remove(), we destroy them ourselves first
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 497);
if (editMode || instance._isMicroTemplate) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 498);
if (editMode) {
                    _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 499);
instance._initialEditAttrs = model.getAttrs();
                }
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 501);
container.cleanupWidgets(true);
            }

            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 504);
container.setHTML(html);
            // If Y.Plugin.ITSATabKeyManager is plugged in, then refocus to the first item
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 506);
if (itsatabkeymanager) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 507);
itsatabkeymanager.refresh(boundingBox);
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 508);
if (instance.get('focused')) {
                    _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 509);
itsatabkeymanager.focusInitialItem();
                }
            }
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 512);
if (itsaDateTimePicker && itsaDateTimePicker.panel.get('visible')) {
                _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 513);
itsaDateTimePicker.hide(true);
            }
            _yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 515);
return instance;
        },

        /**
         * Cleaning up all eventlisteners
         *
         * @method _clearEventhandlers
         * @private
         * @since 0.1
         *
        */
        _clearEventhandlers : function() {
            _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "_clearEventhandlers", 526);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 527);
YArray.each(
                this._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "(anonymous 18)", 529);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 530);
item.detach();
                }
            );
        }

    }, {
        ATTRS : {
            /**
             * Hash of CSS selectors mapped to events to delegate to elements matching
             * those selectors.
             *
             * CSS selectors are relative to the `contentBox` element, which is in fact
             * the view-container. Events are attached to this container (contentBox), and
             * delegation is used so that subscribers are only notified of events that occur on
             * elements inside the container that match the specified selectors. This allows the
             * contentBox to be re-rendered as needed without losing event subscriptions.
             *
             * Event handlers can be specified either as functions or as strings that map
             * to function names. IN the latter case, you must declare the functions as part
             * of the 'view'-property (which is a Y.View instance).
             *
             * The `this` object in event handlers will refer to the 'view'-property (which is a
             * Y.View instance, created during initialisation of this widget. If you'd prefer `this`
             * to be something else, use `Y.bind()` to bind a custom `this` object.
             *
             * @example
             *     var viewModel = new Y.ViewITSAViewModel({
             *         events: {
             *             // Call `this.toggle()` whenever the element with the id
             *             // "toggle-button" is clicked.
             *             '#toggle-button': {click: 'toggle'},
             *
             *             // Call `this.hoverOn()` when the mouse moves over any element
             *             // with the "hoverable" class, and `this.hoverOff()` when the
             *             // mouse moves out of any element with the "hoverable" class.
             *             '.hoverable': {
             *                 mouseover: 'hoverOn',
             *                 mouseout : 'hoverOff'
             *             }
             *         }
             *     });
             *
             * @attribute events
             * @type {object}
             * @default {}
             * @since 0.1
             */
            events: {
                value: {},
                validator: function(v){ _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "validator", 579);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 579);
return Lang.isObject(v);}
            },

            /**
             * Makes the View to render the editable-version of the Model. Only when the Model has <b>Y.Plugin.ITSAEditModel</b> plugged in.
             *
             * @attribute modelEditable
             * @type {Boolean}
             * @default false
             * @since 0.1
             */
            modelEditable: {
                value: false,
                lazyAdd: false,
                validator: function(v){
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "validator", 593);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 594);
return Lang.isBoolean(v);
                }
            },

            /**
             * The Y.Model that will be rendered in the view. May also be an Object, which is handy in case the source is an
             * item of a Y.LazyModelList
             *
             * @attribute model
             * @type {Y.Model|Object}
             * @default {}
             * @since 0.1
             */
            model: {
                value: null,
                validator: function(v){ _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "validator", 609);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 609);
return ((v instanceof Y.Model) || Lang.isObject(v) || (v===null)); }
            },

           /**
            * Whether the View is styled using the css of this module.
            * In fact, just the classname 'itsa-modelview-styled' is added to the boundingBox
            * and the css-rules do all the rest. The developer may override these rules, or set this value to false
            * while creatiung their own css. In the latter case it is advisable to take a look at all the css-rules
            * that are supplied by this module.
            *
            * @default true
            * @attribute styled
            * @type {Boolean}
            * @since 0.1
            */
            styled: {
                value: true,
                validator:  function(v) {
                    _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "validator", 626);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 627);
return Lang.isBoolean(v);
                }
            },

        /**
         * Template to render the Model. The attribute MUST be a template that can be processed by either <i>Y.Lang.sub or Y.Template.Micro</i>,
         * where Y.Lang.sub is more lightweight.
         *
         * <b>Example with Y.Lang.sub:</b> '{slices} slice(s) of {type} pie remaining. <button class="eat">Eat a Slice!</button>'
         * <b>Example with Y.Template.Micro:</b>
         * '<%= data.slices %> slice(s) of <%= data.type %> pie remaining <button class="eat">Eat a Slice!</button>'
         * <b>Example 2 with Y.Template.Micro:</b>
         * '<%= data.slices %> slice(s) of <%= data.type %> pie remaining<% if (data.slices>0) {%> <button class="eat">Eat a Slice!</button><% } %>'
         *
         * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>
         *
         * @attribute template
         * @type {String}
         * @default '{clientId}'
         * @since 0.1
         */
            template: {
                value: '{clientId}',
                validator: function(v){ _yuitest_coverfunc("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", "validator", 650);
_yuitest_coverline("build/gallery-itsaviewmodel/gallery-itsaviewmodel.js", 650);
return Lang.isString(v); }
            }

        }
    }
);

}, '@VERSION@', {
    "requires": [
        "base-build",
        "widget",
        "view",
        "template-micro",
        "model",
        "pluginhost-base"
    ],
    "skinnable": true
});
