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
_yuitest_coverage["build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js",
    code: []
};
_yuitest_coverage["build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js"].code=["YUI.add('gallery-itsachangemodeltemplate', function (Y, NAME) {","","'use strict';","","/**"," * Plugin Y.Plugin.ChangeModelTemplate"," *"," * Plugin for ITSAViewModellist and ITSAScrollViewModellist that makes it possible to toggle templates per model."," * This might be useful if your (scroll)viewModellist has many rendered models, where you need to toggle"," * some of them. There are three different states:"," *"," * 1) Original Template (standard defined by the host)"," * 2) 'secondTemplate' (can be set up within this plugin: for example to define an 'extended' view for the Models)"," * 3) 'editTemplate' (can be set up within this plugin: to edit the Models)"," *"," * Be aware that 'secondTemplate' and 'editTemplate' are used for rendering all Models."," *"," * To make the models editable, this plugin uses gallery-itsaeditmodel under the hood. The attribute 'configForEditModel' is passed"," * through to Y.Plugin.ITSAEditModel."," *"," * @module gallery-itsachangemodeltemplate"," * @class ITSAChangeModelTemplate"," * @constructor"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var Lang = Y.Lang,","    YArray = Y.Array,","    FORMELEMENT_CLASS = 'yui3-itsaformelement',","    ITSAFORMELEMENT_CHANGED_CLASS = FORMELEMENT_CLASS + '-changed',","    ERROR_MESSAGE_NOTEMPLATE = 'Attribute editTemplate is undefined',","    ISMICROTEMPLATE = function(template) {","        var microTemplateRegExp = /<%(.+)%>/;","        return microTemplateRegExp.test(template);","    };","","Y.namespace('Plugin').ITSAChangeModelTemplate = Y.Base.create('itsachangemodeltemplate', Y.Plugin.Base, [], {","","        host : null,","","        /**","         * Internal reference to the compiled alternate template.","         * @property _secondTempl","         * @private","         * @default null","         * @type Function","        */","        _secondTempl : null,","","        /**","         * Internal flag to state whether the alternate template is of the type Y.Template.Micro","         * @property _secondTemplIsMicro","         * @private","         * @default null","         * @type Boolean","        */","        _secondTemplIsMicro : null,","","","        /**","         * Internal reference to the compiled edit template.","         * @property _editTempl","         * @private","         * @default null","         * @type Function","        */","        _editTempl : null,","","        /**","         * Internal flag to state is the edittemplate is a microtemplate","         * @property _editTemplIsMicro","         * @private","         * @default null","         * @type Boolean","        */","        _editTemplIsMicro : null,","","        /**","         * Internal backuplist of the Models attributes, used when the editdata needs to be reset.","         * @property _initialEditAttrs","         * @private","         * @default {}","         * @type Object","        */","        _initialEditAttrs : {},","","        /**","         * Internal backuplist to keep track of which models live in the state of the secondTemplate","         * @property _secondModels","         * @private","         * @default {}","         * @type Object","        */","        _secondModels : {},","","        /**","         * Internal backuplist to keep track of which models live in the state of the editTemplate","         * @property _editModels","         * @private","         * @default {}","         * @type Object","        */","        _editModels : {},","","        /**","         * Internal backuplist to keep track of the previous Mode of the Models, to enable restore the template to previous state.","         * @property _prevMode","         * @private","         * @default {}","         * @type Object","        */","        _prevMode : {},","","        /**","         * Internal list of all eventhandlers bound by this widget.","         * @property _eventhandlers","         * @private","         * @default []","         * @type Array","        */","        _eventhandlers : [],","","        /**","         * Internal flag that tells whether -in editMode- the user has changed the content of a Model. This way the module knows it","         * doesn't need to do a thorough re-render of the list.","         * @property _currentModelHasChanged","         * @private","         * @default false","         * @type Boolean","        */","        _currentModelHasChanged : false,","","        /**","         * Internal backuplist of the Models previous 'comparator-result', used determine if the comparators-value has changed after","         * the models has been edited.  This way the module knows it doesn't need to do a thorough re-render of the list.","         * @property _prevComparator","         * @private","         * @default {}","         * @type Object","        */","        _prevComparator : {},","","","        /**","         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready","         *","         * @method initializer","         * @protected","         * @since 0.1","         */","        initializer : function() {","            var instance = this,","                host;","","            instance.host = host = instance.get('host');","            instance._bindUI();","        },","","        /**","         * Re-renderes the Model -inside the ViewList- with its original template (defined by the host).","         * @method setModelToOriginalTemplate","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @since 0.1","        */","        setModelToOriginalTemplate: function(model) {","            var instance = this,","                host = instance.host,","                clientId = host.getModelAttr(model, 'clientId'),","                modellist = host.get('modelList'),","                comparator = modellist && Y.bind(modellist.comparator, modellist),","                currentMode;","","            currentMode = instance._getMode(model);","            if (currentMode !== 1) {","                instance._prevMode[clientId] = instance._getMode(model);","                delete instance._secondModels[clientId];","                delete instance._initialEditAttrs[clientId];","                if (instance._editModels[clientId]) {","                    instance._unplugITSAEditModel(model, clientId);","                }","                if (instance._currentModelHasChanged && comparator && (instance._prevComparator[clientId]!==comparator(model))) {","                    modellist.sort();","                    //====================================================","                    //","                    // Next is a bugfix for LazyModelList --> see issue https://github.com/yui/yui3/issues/634","                    // As soon as issue is resolved, remove modellist.free() command","                    //","                    if (host._listLazy) {","                        modellist.free();","                    }","                    //======================================================","                    host._repositionModel(model);","                }","                else {","                    instance._renderOriginalTemplate(model);","                }","                delete instance._prevComparator[clientId];","                instance._currentModelHasChanged = false;","            }","            else {","            }","        },","","        /**","         * Re-renderes the Model -inside the ViewList- with its second template (defined by 'secondTemplate').","         * @method setModelToSecondTemplate","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @since 0.1","        */","        setModelToSecondTemplate: function(model) {","            var instance = this,","                host = instance.host,","                clientId = host.getModelAttr(model, 'clientId'),","                modellist = host.get('modelList'),","                comparator = modellist && Y.bind(modellist.comparator, modellist),","                currentMode;","","            currentMode = instance._getMode(model);","            if (currentMode !== 2) {","                delete instance._initialEditAttrs[clientId];","                instance._prevMode[clientId] = instance._getMode(model);","                instance._secondModels[clientId] = true;","                if (instance._editModels[clientId]) {","                    instance._unplugITSAEditModel(model, clientId);","                }","                if (instance._currentModelHasChanged && comparator && (instance._prevComparator[clientId]!==comparator(model))) {","                    modellist.sort();","                    //====================================================","                    //","                    // Next is a bugfix for LazyModelList --> see issue https://github.com/yui/yui3/issues/634","                    // As soon as issue is resolved, remove modellist.free() command","                    //","                    if (host._listLazy) {","                        modellist.free();","                    }","                    //======================================================","                    host._renderView();","                }","                else {","                    instance._renderSecondTemplate(model);","                }","                delete instance._prevComparator[clientId];","                instance._currentModelHasChanged = false;","            }","            else {","            }","        },","","        /**","         * Re-renderes the Model -inside the ViewList- with its editable template (defined by 'editTemplate').","         * @method setModelToEditTemplate","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @since 0.1","        */","        setModelToEditTemplate: function(model) {","            var instance = this,","                host = instance.host,","                modellist = host.get('modelList'),","                comparator = modellist && Y.bind(modellist.comparator, modellist),","                clientId = host.getModelAttr(model, 'clientId'),","                currentMode;","","            currentMode = instance._getMode(model);","            if (currentMode !== 3) {","                instance._currentModelHasChanged = false;","                instance._prevComparator[clientId] = comparator && comparator(model);","                instance._prevMode[clientId] = currentMode;","                instance._editModels[clientId] = true;","                delete instance._secondModels[clientId];","                instance._renderEditTemplate(model);","            }","            else {","            }","        },","","        /**","         * Re-renderes the Model -inside the ViewList- with its previous template, performing a reverse-rendering. Only the template is","         * restored, thus, if the Model's content is changed, you will see the new Model's content.","         * @method restoreTemplate","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @since 0.1","        */","        restoreTemplate : function(model) {","            var instance = this,","                clientId = instance.host.getModelAttr(model, 'clientId'),","                mode = instance._prevMode[clientId] || 1;","","            switch (mode) {","                case 1: instance.setModelToOriginalTemplate(model);","                break;","                case 2: instance.setModelToSecondTemplate(model);","                break;","                case 3: instance.setModelToEditTemplate(model);","                break;","            }","        },","","        /**","         * Cleans up bindings and removes plugin","         * @method destructor","         * @protected","         * @since 0.1","        */","        destructor : function() {","            var instance = this;","","            instance._clearEventhandlers();","            instance._initialEditAttrs = {};","            instance._secondModels = {};","            instance._editModels = {};","            instance._prevMode = {};","            instance._prevComparator = {};","        },","","        //===============================================================================================","        // private methods","        //===============================================================================================","","        /**","         * Binding events","         *","         * @method _bindUI","         * @private","         * @since 0.1","        */","        _bindUI : function() {","            var instance = this,","                host = instance.host,","                eventhandlers = instance._eventhandlers;","","            eventhandlers.push(","                host.after(","                    'itsaeditmodel:focusnext',","                    function(e) {","                        var inputnode = e.inputNode,","                            modelnode = inputnode.get('parentNode'),","                            itsatabkeymanager;","                        while (modelnode && !modelnode.hasClass('itsa-model')) {","                            modelnode = modelnode.get('parentNode');","                        }","                        if (modelnode) {","                            itsatabkeymanager = modelnode.itsatabkeymanager;","                            if (itsatabkeymanager && modelnode.hasClass('itsa-model-focus')) {","                                itsatabkeymanager.next();","                            }","                            else {","                            }","                        }","                        else {","                        }","                    }","                )","            );","            eventhandlers.push(","                host.after(","                    'model:resetclick',","                    function(e) {","                        var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)","                            options = {fromEditModel: true}, // set Attribute with option: '{fromEditModel: true}'","                                                             // --> now the view knows it must not re-render.","                            initialEditAttrs = instance._initialEditAttrs[model.get('clientId')],","                            buttonNode;","                        if (initialEditAttrs) {","                            model.setAttrs(initialEditAttrs, options);","                            if (instance._getMode(model)===3) {","                                instance.setModelToEditTemplate(model);","                                buttonNode = Y.one('#'+e.elementId);","                                if (buttonNode) {","                                    buttonNode.focus();","                                }","                            }","                            if (host.modelIsSelected(model)) {","                                host._fireSelectedModels();","                            }","                        }","                    }","                )","            );","            eventhandlers.push(","                host.after(","                    ['itsaeditmodel:editmodelConfigAttrsChange', 'itsaeditmodel:templateChange'],","                    function() {","                        if (instance.get('modelsEditable')) {","                            host._renderView(null, null);","                        }","                    }","                )","            );","            eventhandlers.push(","                instance.after(","                    'modelsEditableChange',","                    Y.bind(host._renderView, host, null, null)","                )","            );","            eventhandlers.push(","                instance.after(","                    'editmodelConfigAttrsChange',","                    function() {","                        // force recompiling of the editrenderer on next rendercall:","                        instance._editTempl = null;","                    }","                )","            );","            eventhandlers.push(","                host.after(","                    'model:change',","                    function(e) {","                        var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)","                            modelNode;","                        if (instance._getMode(model)===3) {","                            instance._currentModelHasChanged = true;","                            modelNode = host.getNodeFromModel(model, 0);","                            modelNode.all('.'+ITSAFORMELEMENT_CHANGED_CLASS).removeClass(ITSAFORMELEMENT_CHANGED_CLASS);","","                        }","                    }","                )","            );","            eventhandlers.push(","                host.on(","                    'model:destroy',","                    function(e) {","                        var model = e.target; // NOT e.currentTarget: that is the (scroll)View-instance (?)","                        delete instance._editModels[model.get('clientId')];","                        if (host.modelIsSelected(model)) {","                            host.unselectModels(model, false, true); // will fire an event itself","                        }","                    }","                )","            );","        },","","        /**","         * Cleaning up all eventlisteners","         *","         * @method _clearEventhandlers","         * @private","         * @since 0.1","         *","        */","        _clearEventhandlers : function() {","            YArray.each(","                this._eventhandlers,","                function(item){","                    item.detach();","                }","            );","        },","","        /**","         * Returns the current 'Mode' of the Models rendering. Meaning: what Template is currently being used. This might be:<br />","         * 1: original template<br />","         * 2: secondTemplate<br />","         * 3: editTemplate<br />","         *","         * @method _getMode","         * @private","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @since 0.1","         *","        */","        _getMode : function(model) {","            var instance = this,","                modelsEditable = instance.get('modelsEditable'),","                clientId = instance.host.getModelAttr(model, 'clientId'),","                mode = 1;","","            if (instance._secondModels[clientId]) {","                mode = 2;","            }","            if (modelsEditable && instance._editModels[clientId]) {","                mode = 3;","            }","            return mode;","        },","","        /**","         * Returns the active modelengine that is used by the specified Model.<br />","         * <i>This method is not used internally, but is called by ITSAScrollViewModellist and ITSAViewModellist</i>","         * @method _getModelEngine","         * @param model {Y.Model|Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @param modelTemplate {String} The 'modelTemplate' used by the host","         * @param compiledModelEngine {Function} Host's compiled 'modelTemplate', compiled using Y.Template.Micro","         * @private","         * @protected","         * @since 0.1","         *","        */","        _getModelEngine : function(model, modelTemplate, compiledModelEngine) {","            var instance = this,","                host = instance.host,","                modus = instance._getMode(model),","                modelJSON, engine;","","            switch (modus) {","                case 1: // default: the standard modelTemplate","                    modelJSON = host.getModelToJSON(model);","                    engine = compiledModelEngine ? compiledModelEngine(modelJSON) : Lang.sub(modelTemplate, modelJSON);","                break;","                case 2: // secondTemplate","                    engine = instance._altTempl(model);","                break;","                case 3: // editTemplate","                    engine = instance._editTempl(model);","                break;","            }","            return engine;","        },","","        /**","         * Re-renderes the Model with the editTemplate inside the ViewList.","         *","         * @method _renderEditTemplate","         * @private","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @since 0.1","         *","        */","        _renderEditTemplate: function(model) {","            var instance = this,","                host = instance.host,","                modelNode, modelInstance, revivedModel, usemodel;","","            modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));","            if (modelNode) {","                if (ISMICROTEMPLATE(instance.get('template')) || (instance._secondTempl && instance._secondTemplIsMicro)) {","                    modelNode.cleanup();","                }","                Y.use('gallery-itsatabkeymanager', function(Y) {","                    modelNode.plug(Y.Plugin.ITSATabKeyManager);","                });","                // IMPORTANT: model could be an object in case of LazyModelList","                // we need to revive it first","                modelInstance = model.get && (typeof model.get === 'function');","                if (!modelInstance && host._listLazy) {","                    revivedModel = host.get('modelList').revive(model);","                }","                usemodel = revivedModel || model;","                instance._initialEditAttrs[usemodel.get('clientId')] = usemodel.getAttrs();","                if (!usemodel.itsaeditmodel) {","                    Y.use('gallery-itsaeditmodel', function(Y) {","                        usemodel.plug(Y.Plugin.ITSAEditModel, instance.get('configForEditModel'));","                        if (!instance._editTempl) {","                            instance._setEditTemplate(instance.get('editTemplate') || usemodel.itsaeditmodel.get('template')","                                                                                   || ERROR_MESSAGE_NOTEMPLATE);","                        }","                        modelNode.setHTML(instance._editTempl(usemodel));","                    });","                }","                else {","                    if (!instance._editTempl) {","                        instance._setEditTemplate(instance.get('editTemplate') || usemodel.itsaeditmodel.get('template')","                                                                               || ERROR_MESSAGE_NOTEMPLATE);","                    }","                    modelNode.setHTML(instance._editTempl(usemodel));","                }","            }","            else {","            }","        },","","        /**","         * Re-renderes the Model with the secondTemplate inside the ViewList.","         *","         * @method _renderSecondTemplate","         * @private","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @since 0.1","         *","        */","        _renderSecondTemplate: function(model) {","            var instance = this,","                host = instance.host,","                alternateTemplate = instance._secondTempl || host._templFns.template,","                modelNode;","","            modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));","            if (modelNode && alternateTemplate) {","                if (ISMICROTEMPLATE(instance.get('template')) || model.itsaeditmodel) {","                    modelNode.cleanup();","                }","                modelNode.setHTML(alternateTemplate(model));","            }","            else {","            }","        },","","        /**","         * Re-renderes the Model with the original template inside the ViewList.","         *","         * @method _renderOriginalTemplate","         * @private","         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList","         * @since 0.1","         *","        */","        _renderOriginalTemplate: function(model) {","            var instance = this,","                host = instance.host,","                modelNode;","","            modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));","            if (modelNode) {","                if ((instance._secondTempl && instance._secondTemplIsMicro) || model.itsaeditmodel) {","                    modelNode.cleanup();","                }","                // delete objectproperty from instance._secondModelsBEFORE calling host._templFns.template,","                // for the latter depends on whether the definition is there.","                modelNode.setHTML(host._templFns.template(model));","            }","            else {","            }","        },","","        /**","         * compiled the editTemplate into private variable _editTempl()","         *","         * @method _setEditTemplate","         * @param template {String} The new secondTemplate to be used. Must be of type Y.Lang.sub() or Y.Template.Micro()","         * @private","         * @since 0.1","         *","        */","        _setEditTemplate: function(template) {","            var instance = this,","                host = instance.host,","                compiledModelEngine, editTemplateIsMicro;","","            if (!template || (template==='')) {","                instance._editTempl = host._templFns.template;","            }","            else {","                editTemplateIsMicro = instance._editTemplIsMicro = ISMICROTEMPLATE(template);","                if (editTemplateIsMicro) {","                    compiledModelEngine = Y.TemplateMicro.compile(template);","                    instance._editTempl = function(model) {","                        var modelInstance = model.get && (model.get === 'function');","                        if (!modelInstance && host._listLazy) {","                            model = host.get('modelList').revive(model);","                            if (!model.itsaeditmodel) {","                                model.plug(Y.Plugin.ITSAEditModel, instance.get('configForEditModel'));","                            }","                        }","                        return compiledModelEngine(model.itsaeditmodel.toJSON(instance.get('editmodelConfigAttrs')","                               || model.itsaeditmodel.get('editmodelConfigAttrs')));","                    };","                }","                else {","                    instance._editTempl = function(model) {","                        var modelInstance = model.get && (model.get === 'function');","                        if (!modelInstance && host._listLazy) {","                            model = host.get('modelList').revive(model);","                            if (!modelInstance && host._listLazy) {","                                model.plug(Y.Plugin.ITSAEditModel, instance.get('configForEditModel'));","                            }","                        }","                        return Lang.sub(template, model.itsaeditmodel.toJSON(instance.get('editmodelConfigAttrs')","                               || model.itsaeditmodel.get('editmodelConfigAttrs')));","                    };","                }","            }","        },","","        /**","         * compiled the secondTemplate into private variable _secondTempl()","         *","         * @method _setSecondTemplate","         * @param template {String} The new secondTemplate to be used. Must be of type Y.Lang.sub() or Y.Template.Micro()","         * @private","         * @since 0.1","         *","        */","        _setSecondTemplate: function(val) {","            var instance = this,","                host = instance.host,","                compiledModelEngine, alternateTemplateIsMicro;","","            if (!val || (val==='')) {","                instance._secondTempl = null;","            }","            else {","                alternateTemplateIsMicro = instance._secondTemplIsMicro = ISMICROTEMPLATE(val);","                if (alternateTemplateIsMicro) {","                    compiledModelEngine = Y.TemplateMicro.compile(val);","                    instance._secondTempl = function(model) {","                        return compiledModelEngine(host.getModelToJSON(model));","                    };","                }","                else {","                    instance._secondTempl = function(model) {","                        return Lang.sub(val, host.getModelToJSON(model));","                    };","                }","            }","        },","","        /**","         * Unplugs both Y.Plugin.ITSAEditModel as well as Y.Plugin.ITSATabKeyManager from the model.","         *","         * @method _unplugITSAEditModel","         * @param template {String} The new secondTemplate to be used. Must be of type Y.Lang.sub() or Y.Template.Micro()","         * @param model {Y.Model || Object} The model (or revived model) from the modellist/lazymodellist.","         * @param cliendId {Int} Model's clientId","         * @private","         * @since 0.1","         *","        */","        _unplugITSAEditModel : function(model, clientId) {","            var instance = this,","                host = instance.host,","                modelInstance, modelNode;","","            // IMPORTANT: model could be an object in case of LazyModelList","            // we need to revive it first","            modelInstance = model.get && (typeof model.get === 'function');","            if (!modelInstance && host._listLazy) {","                model = host.get('modelList').revive(model);","            }","            if (model.unplug) {","                model.unplug('itsaeditmodel');","            }","            delete instance._editModels[clientId];","            modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));","            if (modelNode) {","                modelNode.unplug('itsatabkeymanager');","            }","        }","","    }, {","        NS : 'itsacmtemplate',","        ATTRS : {","","            /**","             * The editmodelConfigAttrs to be used in the editable mode. See Y.Plugin.ITSAEditModel (gallery-itsaeditmodel)","             * for further specifications. If this attribute is empty, the plugin will search for 'configForEditModel.editmodelConfigAttrs',","             * which might as well define the config. However, it is preferable to define the configAttrs directly within 'editmodelConfigAttrs',","             * because through this attribute are able to change the configAttrs later on. (The one within 'configForEditModel.editmodelConfigAttrs'","             * is only read during initialisation).","             *","             * @attribute editmodelConfigAttrs","             * @type {Object}","             * @default false","             * @since 0.1","             */","            editmodelConfigAttrs: {","                value: {},","                validator: function(v){","                    return Lang.isObject(v);","                }","            },","","            /**","             * The <b>config</b> that is passed through directly into Y.Plugin.ITSAEditModel. Event though you can define","             * 'configForEditModel.template' and 'configForEditModel.editmodelConfigAttrs', the referred way for those to properties","             * is to set them directly within this wplugin-level (see 'editTemplate' and 'editmodelConfigAttrs' for the why).","             *","             * @attribute configForEditModel","             * @type {Boolean}","             * @default false","             * @since 0.1","             */","            configForEditModel: {","                value: null,","                validator: function(v){","                    return Lang.isObject(v);","                }","            },","","            /**","             * The template to be used in the editable mode. Use either Y.Lang.sub or Y.Template.Micor syntax. If this attribute is empty,","             * the plugin will search for 'configForEditModel.template', which might as well define the editTemplate. However, it is preferable","             * to define the editable template directly within 'editTemplate', because through this attribute are able to change the","             * editable-template later on. (The one within 'configForEditModel.editTemplate' is only read during initialisation).","             *","             * @attribute editTemplate","             * @type {Boolean}","             * @default false","             * @since 0.1","             */","            editTemplate: {","                value: null,","                validator: function(v){","                    return (typeof v === 'string');","                },","                setter: '_setEditTemplate'","            },","","            /**","             * Makes the View to render the editable-version of the Model. Only when the Model has <b>Y.Plugin.ITSAEditModel</b> plugged in.","             *","             * @attribute modelsEditable","             * @type {Boolean}","             * @default false","             * @since 0.1","             */","            modelsEditable: {","                value: false,","                lazyAdd: false,","                validator: function(v){","                    return Lang.isBoolean(v);","                }","            },","","            /**","             * Defines the template to be used as 'secondTemplate'. Will be used for all Models that are rendered by setModelToSecondTemplate()","             *","             * @attribute secondTemplate","             * @type {Boolean}","             * @default false","             * @since 0.1","             */","            secondTemplate: {","                value: null,","                validator: function(v){","                    return (typeof v === 'string');","                },","                setter: '_setSecondTemplate'","            }","","        }","    }",");","","}, '@VERSION@', {","    \"requires\": [","        \"yui-base\",","        \"node-core\",","        \"base-base\",","        \"base-build\",","        \"plugin-base\",","        \"pluginhost-base\",","        \"oop\",","        \"template-micro\"","    ]","});"];
_yuitest_coverage["build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js"].lines = {"1":0,"3":0,"31":0,"37":0,"38":0,"41":0,"156":0,"159":0,"160":0,"170":0,"177":0,"178":0,"179":0,"180":0,"181":0,"182":0,"183":0,"185":0,"186":0,"192":0,"193":0,"196":0,"199":0,"201":0,"202":0,"215":0,"222":0,"223":0,"224":0,"225":0,"226":0,"227":0,"228":0,"230":0,"231":0,"237":0,"238":0,"241":0,"244":0,"246":0,"247":0,"260":0,"267":0,"268":0,"269":0,"270":0,"271":0,"272":0,"273":0,"274":0,"288":0,"292":0,"293":0,"294":0,"295":0,"296":0,"297":0,"298":0,"309":0,"311":0,"312":0,"313":0,"314":0,"315":0,"316":0,"331":0,"335":0,"339":0,"342":0,"343":0,"345":0,"346":0,"347":0,"348":0,"358":0,"362":0,"367":0,"368":0,"369":0,"370":0,"371":0,"372":0,"373":0,"376":0,"377":0,"383":0,"387":0,"388":0,"393":0,"399":0,"404":0,"408":0,"412":0,"414":0,"415":0,"416":0,"417":0,"423":0,"427":0,"428":0,"429":0,"430":0,"446":0,"449":0,"467":0,"472":0,"473":0,"475":0,"476":0,"478":0,"494":0,"499":0,"501":0,"502":0,"503":0,"505":0,"506":0,"508":0,"509":0,"511":0,"524":0,"528":0,"529":0,"530":0,"531":0,"533":0,"534":0,"538":0,"539":0,"540":0,"542":0,"543":0,"544":0,"545":0,"546":0,"547":0,"548":0,"551":0,"555":0,"556":0,"559":0,"576":0,"581":0,"582":0,"583":0,"584":0,"586":0,"602":0,"606":0,"607":0,"608":0,"609":0,"613":0,"629":0,"633":0,"634":0,"637":0,"638":0,"639":0,"640":0,"641":0,"642":0,"643":0,"644":0,"645":0,"648":0,"653":0,"654":0,"655":0,"656":0,"657":0,"658":0,"661":0,"678":0,"682":0,"683":0,"686":0,"687":0,"688":0,"689":0,"690":0,"694":0,"695":0,"713":0,"719":0,"720":0,"721":0,"723":0,"724":0,"726":0,"727":0,"728":0,"729":0,"752":0,"769":0,"787":0,"804":0,"819":0};
_yuitest_coverage["build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js"].functions = {"ISMICROTEMPLATE:36":0,"initializer:155":0,"setModelToOriginalTemplate:169":0,"setModelToSecondTemplate:214":0,"setModelToEditTemplate:259":0,"restoreTemplate:287":0,"destructor:308":0,"(anonymous 2):338":0,"(anonymous 3):361":0,"(anonymous 4):386":0,"(anonymous 5):402":0,"(anonymous 6):411":0,"(anonymous 7):426":0,"_bindUI:330":0,"(anonymous 8):448":0,"_clearEventhandlers:445":0,"_getMode:466":0,"_getModelEngine:493":0,"(anonymous 9):533":0,"(anonymous 10):545":0,"_renderEditTemplate:523":0,"_renderSecondTemplate:575":0,"_renderOriginalTemplate:601":0,"_editTempl:640":0,"_editTempl:653":0,"_setEditTemplate:628":0,"_secondTempl:689":0,"_secondTempl:694":0,"_setSecondTemplate:677":0,"_unplugITSAEditModel:712":0,"validator:751":0,"validator:768":0,"validator:786":0,"validator:803":0,"validator:818":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js"].coveredLines = 198;
_yuitest_coverage["build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js"].coveredFunctions = 36;
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 1);
YUI.add('gallery-itsachangemodeltemplate', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 3);
'use strict';

/**
 * Plugin Y.Plugin.ChangeModelTemplate
 *
 * Plugin for ITSAViewModellist and ITSAScrollViewModellist that makes it possible to toggle templates per model.
 * This might be useful if your (scroll)viewModellist has many rendered models, where you need to toggle
 * some of them. There are three different states:
 *
 * 1) Original Template (standard defined by the host)
 * 2) 'secondTemplate' (can be set up within this plugin: for example to define an 'extended' view for the Models)
 * 3) 'editTemplate' (can be set up within this plugin: to edit the Models)
 *
 * Be aware that 'secondTemplate' and 'editTemplate' are used for rendering all Models.
 *
 * To make the models editable, this plugin uses gallery-itsaeditmodel under the hood. The attribute 'configForEditModel' is passed
 * through to Y.Plugin.ITSAEditModel.
 *
 * @module gallery-itsachangemodeltemplate
 * @class ITSAChangeModelTemplate
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 31);
var Lang = Y.Lang,
    YArray = Y.Array,
    FORMELEMENT_CLASS = 'yui3-itsaformelement',
    ITSAFORMELEMENT_CHANGED_CLASS = FORMELEMENT_CLASS + '-changed',
    ERROR_MESSAGE_NOTEMPLATE = 'Attribute editTemplate is undefined',
    ISMICROTEMPLATE = function(template) {
        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "ISMICROTEMPLATE", 36);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 37);
var microTemplateRegExp = /<%(.+)%>/;
        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 38);
return microTemplateRegExp.test(template);
    };

_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 41);
Y.namespace('Plugin').ITSAChangeModelTemplate = Y.Base.create('itsachangemodeltemplate', Y.Plugin.Base, [], {

        host : null,

        /**
         * Internal reference to the compiled alternate template.
         * @property _secondTempl
         * @private
         * @default null
         * @type Function
        */
        _secondTempl : null,

        /**
         * Internal flag to state whether the alternate template is of the type Y.Template.Micro
         * @property _secondTemplIsMicro
         * @private
         * @default null
         * @type Boolean
        */
        _secondTemplIsMicro : null,


        /**
         * Internal reference to the compiled edit template.
         * @property _editTempl
         * @private
         * @default null
         * @type Function
        */
        _editTempl : null,

        /**
         * Internal flag to state is the edittemplate is a microtemplate
         * @property _editTemplIsMicro
         * @private
         * @default null
         * @type Boolean
        */
        _editTemplIsMicro : null,

        /**
         * Internal backuplist of the Models attributes, used when the editdata needs to be reset.
         * @property _initialEditAttrs
         * @private
         * @default {}
         * @type Object
        */
        _initialEditAttrs : {},

        /**
         * Internal backuplist to keep track of which models live in the state of the secondTemplate
         * @property _secondModels
         * @private
         * @default {}
         * @type Object
        */
        _secondModels : {},

        /**
         * Internal backuplist to keep track of which models live in the state of the editTemplate
         * @property _editModels
         * @private
         * @default {}
         * @type Object
        */
        _editModels : {},

        /**
         * Internal backuplist to keep track of the previous Mode of the Models, to enable restore the template to previous state.
         * @property _prevMode
         * @private
         * @default {}
         * @type Object
        */
        _prevMode : {},

        /**
         * Internal list of all eventhandlers bound by this widget.
         * @property _eventhandlers
         * @private
         * @default []
         * @type Array
        */
        _eventhandlers : [],

        /**
         * Internal flag that tells whether -in editMode- the user has changed the content of a Model. This way the module knows it
         * doesn't need to do a thorough re-render of the list.
         * @property _currentModelHasChanged
         * @private
         * @default false
         * @type Boolean
        */
        _currentModelHasChanged : false,

        /**
         * Internal backuplist of the Models previous 'comparator-result', used determine if the comparators-value has changed after
         * the models has been edited.  This way the module knows it doesn't need to do a thorough re-render of the list.
         * @property _prevComparator
         * @private
         * @default {}
         * @type Object
        */
        _prevComparator : {},


        /**
         * Sets up the toolbar during initialisation. Calls render() as soon as the hosts-editorframe is ready
         *
         * @method initializer
         * @protected
         * @since 0.1
         */
        initializer : function() {
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "initializer", 155);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 156);
var instance = this,
                host;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 159);
instance.host = host = instance.get('host');
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 160);
instance._bindUI();
        },

        /**
         * Re-renderes the Model -inside the ViewList- with its original template (defined by the host).
         * @method setModelToOriginalTemplate
         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList
         * @since 0.1
        */
        setModelToOriginalTemplate: function(model) {
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "setModelToOriginalTemplate", 169);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 170);
var instance = this,
                host = instance.host,
                clientId = host.getModelAttr(model, 'clientId'),
                modellist = host.get('modelList'),
                comparator = modellist && Y.bind(modellist.comparator, modellist),
                currentMode;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 177);
currentMode = instance._getMode(model);
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 178);
if (currentMode !== 1) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 179);
instance._prevMode[clientId] = instance._getMode(model);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 180);
delete instance._secondModels[clientId];
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 181);
delete instance._initialEditAttrs[clientId];
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 182);
if (instance._editModels[clientId]) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 183);
instance._unplugITSAEditModel(model, clientId);
                }
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 185);
if (instance._currentModelHasChanged && comparator && (instance._prevComparator[clientId]!==comparator(model))) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 186);
modellist.sort();
                    //====================================================
                    //
                    // Next is a bugfix for LazyModelList --> see issue https://github.com/yui/yui3/issues/634
                    // As soon as issue is resolved, remove modellist.free() command
                    //
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 192);
if (host._listLazy) {
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 193);
modellist.free();
                    }
                    //======================================================
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 196);
host._repositionModel(model);
                }
                else {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 199);
instance._renderOriginalTemplate(model);
                }
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 201);
delete instance._prevComparator[clientId];
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 202);
instance._currentModelHasChanged = false;
            }
            else {
            }
        },

        /**
         * Re-renderes the Model -inside the ViewList- with its second template (defined by 'secondTemplate').
         * @method setModelToSecondTemplate
         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList
         * @since 0.1
        */
        setModelToSecondTemplate: function(model) {
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "setModelToSecondTemplate", 214);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 215);
var instance = this,
                host = instance.host,
                clientId = host.getModelAttr(model, 'clientId'),
                modellist = host.get('modelList'),
                comparator = modellist && Y.bind(modellist.comparator, modellist),
                currentMode;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 222);
currentMode = instance._getMode(model);
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 223);
if (currentMode !== 2) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 224);
delete instance._initialEditAttrs[clientId];
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 225);
instance._prevMode[clientId] = instance._getMode(model);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 226);
instance._secondModels[clientId] = true;
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 227);
if (instance._editModels[clientId]) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 228);
instance._unplugITSAEditModel(model, clientId);
                }
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 230);
if (instance._currentModelHasChanged && comparator && (instance._prevComparator[clientId]!==comparator(model))) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 231);
modellist.sort();
                    //====================================================
                    //
                    // Next is a bugfix for LazyModelList --> see issue https://github.com/yui/yui3/issues/634
                    // As soon as issue is resolved, remove modellist.free() command
                    //
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 237);
if (host._listLazy) {
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 238);
modellist.free();
                    }
                    //======================================================
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 241);
host._renderView();
                }
                else {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 244);
instance._renderSecondTemplate(model);
                }
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 246);
delete instance._prevComparator[clientId];
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 247);
instance._currentModelHasChanged = false;
            }
            else {
            }
        },

        /**
         * Re-renderes the Model -inside the ViewList- with its editable template (defined by 'editTemplate').
         * @method setModelToEditTemplate
         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList
         * @since 0.1
        */
        setModelToEditTemplate: function(model) {
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "setModelToEditTemplate", 259);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 260);
var instance = this,
                host = instance.host,
                modellist = host.get('modelList'),
                comparator = modellist && Y.bind(modellist.comparator, modellist),
                clientId = host.getModelAttr(model, 'clientId'),
                currentMode;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 267);
currentMode = instance._getMode(model);
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 268);
if (currentMode !== 3) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 269);
instance._currentModelHasChanged = false;
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 270);
instance._prevComparator[clientId] = comparator && comparator(model);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 271);
instance._prevMode[clientId] = currentMode;
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 272);
instance._editModels[clientId] = true;
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 273);
delete instance._secondModels[clientId];
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 274);
instance._renderEditTemplate(model);
            }
            else {
            }
        },

        /**
         * Re-renderes the Model -inside the ViewList- with its previous template, performing a reverse-rendering. Only the template is
         * restored, thus, if the Model's content is changed, you will see the new Model's content.
         * @method restoreTemplate
         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList
         * @since 0.1
        */
        restoreTemplate : function(model) {
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "restoreTemplate", 287);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 288);
var instance = this,
                clientId = instance.host.getModelAttr(model, 'clientId'),
                mode = instance._prevMode[clientId] || 1;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 292);
switch (mode) {
                case 1: _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 293);
instance.setModelToOriginalTemplate(model);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 294);
break;
                case 2: _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 295);
instance.setModelToSecondTemplate(model);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 296);
break;
                case 3: _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 297);
instance.setModelToEditTemplate(model);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 298);
break;
            }
        },

        /**
         * Cleans up bindings and removes plugin
         * @method destructor
         * @protected
         * @since 0.1
        */
        destructor : function() {
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "destructor", 308);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 309);
var instance = this;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 311);
instance._clearEventhandlers();
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 312);
instance._initialEditAttrs = {};
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 313);
instance._secondModels = {};
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 314);
instance._editModels = {};
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 315);
instance._prevMode = {};
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 316);
instance._prevComparator = {};
        },

        //===============================================================================================
        // private methods
        //===============================================================================================

        /**
         * Binding events
         *
         * @method _bindUI
         * @private
         * @since 0.1
        */
        _bindUI : function() {
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_bindUI", 330);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 331);
var instance = this,
                host = instance.host,
                eventhandlers = instance._eventhandlers;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 335);
eventhandlers.push(
                host.after(
                    'itsaeditmodel:focusnext',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 2)", 338);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 339);
var inputnode = e.inputNode,
                            modelnode = inputnode.get('parentNode'),
                            itsatabkeymanager;
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 342);
while (modelnode && !modelnode.hasClass('itsa-model')) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 343);
modelnode = modelnode.get('parentNode');
                        }
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 345);
if (modelnode) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 346);
itsatabkeymanager = modelnode.itsatabkeymanager;
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 347);
if (itsatabkeymanager && modelnode.hasClass('itsa-model-focus')) {
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 348);
itsatabkeymanager.next();
                            }
                            else {
                            }
                        }
                        else {
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 358);
eventhandlers.push(
                host.after(
                    'model:resetclick',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 3)", 361);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 362);
var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)
                            options = {fromEditModel: true}, // set Attribute with option: '{fromEditModel: true}'
                                                             // --> now the view knows it must not re-render.
                            initialEditAttrs = instance._initialEditAttrs[model.get('clientId')],
                            buttonNode;
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 367);
if (initialEditAttrs) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 368);
model.setAttrs(initialEditAttrs, options);
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 369);
if (instance._getMode(model)===3) {
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 370);
instance.setModelToEditTemplate(model);
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 371);
buttonNode = Y.one('#'+e.elementId);
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 372);
if (buttonNode) {
                                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 373);
buttonNode.focus();
                                }
                            }
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 376);
if (host.modelIsSelected(model)) {
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 377);
host._fireSelectedModels();
                            }
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 383);
eventhandlers.push(
                host.after(
                    ['itsaeditmodel:editmodelConfigAttrsChange', 'itsaeditmodel:templateChange'],
                    function() {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 4)", 386);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 387);
if (instance.get('modelsEditable')) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 388);
host._renderView(null, null);
                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 393);
eventhandlers.push(
                instance.after(
                    'modelsEditableChange',
                    Y.bind(host._renderView, host, null, null)
                )
            );
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 399);
eventhandlers.push(
                instance.after(
                    'editmodelConfigAttrsChange',
                    function() {
                        // force recompiling of the editrenderer on next rendercall:
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 5)", 402);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 404);
instance._editTempl = null;
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 408);
eventhandlers.push(
                host.after(
                    'model:change',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 6)", 411);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 412);
var model = e.target, // NOT e.currentTarget: that is the (scroll)View-instance (?)
                            modelNode;
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 414);
if (instance._getMode(model)===3) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 415);
instance._currentModelHasChanged = true;
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 416);
modelNode = host.getNodeFromModel(model, 0);
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 417);
modelNode.all('.'+ITSAFORMELEMENT_CHANGED_CLASS).removeClass(ITSAFORMELEMENT_CHANGED_CLASS);

                        }
                    }
                )
            );
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 423);
eventhandlers.push(
                host.on(
                    'model:destroy',
                    function(e) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 7)", 426);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 427);
var model = e.target; // NOT e.currentTarget: that is the (scroll)View-instance (?)
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 428);
delete instance._editModels[model.get('clientId')];
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 429);
if (host.modelIsSelected(model)) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 430);
host.unselectModels(model, false, true); // will fire an event itself
                        }
                    }
                )
            );
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
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_clearEventhandlers", 445);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 446);
YArray.each(
                this._eventhandlers,
                function(item){
                    _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 8)", 448);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 449);
item.detach();
                }
            );
        },

        /**
         * Returns the current 'Mode' of the Models rendering. Meaning: what Template is currently being used. This might be:<br />
         * 1: original template<br />
         * 2: secondTemplate<br />
         * 3: editTemplate<br />
         *
         * @method _getMode
         * @private
         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList
         * @since 0.1
         *
        */
        _getMode : function(model) {
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_getMode", 466);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 467);
var instance = this,
                modelsEditable = instance.get('modelsEditable'),
                clientId = instance.host.getModelAttr(model, 'clientId'),
                mode = 1;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 472);
if (instance._secondModels[clientId]) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 473);
mode = 2;
            }
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 475);
if (modelsEditable && instance._editModels[clientId]) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 476);
mode = 3;
            }
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 478);
return mode;
        },

        /**
         * Returns the active modelengine that is used by the specified Model.<br />
         * <i>This method is not used internally, but is called by ITSAScrollViewModellist and ITSAViewModellist</i>
         * @method _getModelEngine
         * @param model {Y.Model|Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList
         * @param modelTemplate {String} The 'modelTemplate' used by the host
         * @param compiledModelEngine {Function} Host's compiled 'modelTemplate', compiled using Y.Template.Micro
         * @private
         * @protected
         * @since 0.1
         *
        */
        _getModelEngine : function(model, modelTemplate, compiledModelEngine) {
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_getModelEngine", 493);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 494);
var instance = this,
                host = instance.host,
                modus = instance._getMode(model),
                modelJSON, engine;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 499);
switch (modus) {
                case 1: // default: the standard modelTemplate
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 501);
modelJSON = host.getModelToJSON(model);
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 502);
engine = compiledModelEngine ? compiledModelEngine(modelJSON) : Lang.sub(modelTemplate, modelJSON);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 503);
break;
                case 2: // secondTemplate
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 505);
engine = instance._altTempl(model);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 506);
break;
                case 3: // editTemplate
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 508);
engine = instance._editTempl(model);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 509);
break;
            }
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 511);
return engine;
        },

        /**
         * Re-renderes the Model with the editTemplate inside the ViewList.
         *
         * @method _renderEditTemplate
         * @private
         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList
         * @since 0.1
         *
        */
        _renderEditTemplate: function(model) {
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_renderEditTemplate", 523);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 524);
var instance = this,
                host = instance.host,
                modelNode, modelInstance, revivedModel, usemodel;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 528);
modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 529);
if (modelNode) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 530);
if (ISMICROTEMPLATE(instance.get('template')) || (instance._secondTempl && instance._secondTemplIsMicro)) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 531);
modelNode.cleanup();
                }
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 533);
Y.use('gallery-itsatabkeymanager', function(Y) {
                    _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 9)", 533);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 534);
modelNode.plug(Y.Plugin.ITSATabKeyManager);
                });
                // IMPORTANT: model could be an object in case of LazyModelList
                // we need to revive it first
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 538);
modelInstance = model.get && (typeof model.get === 'function');
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 539);
if (!modelInstance && host._listLazy) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 540);
revivedModel = host.get('modelList').revive(model);
                }
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 542);
usemodel = revivedModel || model;
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 543);
instance._initialEditAttrs[usemodel.get('clientId')] = usemodel.getAttrs();
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 544);
if (!usemodel.itsaeditmodel) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 545);
Y.use('gallery-itsaeditmodel', function(Y) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "(anonymous 10)", 545);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 546);
usemodel.plug(Y.Plugin.ITSAEditModel, instance.get('configForEditModel'));
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 547);
if (!instance._editTempl) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 548);
instance._setEditTemplate(instance.get('editTemplate') || usemodel.itsaeditmodel.get('template')
                                                                                   || ERROR_MESSAGE_NOTEMPLATE);
                        }
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 551);
modelNode.setHTML(instance._editTempl(usemodel));
                    });
                }
                else {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 555);
if (!instance._editTempl) {
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 556);
instance._setEditTemplate(instance.get('editTemplate') || usemodel.itsaeditmodel.get('template')
                                                                               || ERROR_MESSAGE_NOTEMPLATE);
                    }
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 559);
modelNode.setHTML(instance._editTempl(usemodel));
                }
            }
            else {
            }
        },

        /**
         * Re-renderes the Model with the secondTemplate inside the ViewList.
         *
         * @method _renderSecondTemplate
         * @private
         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList
         * @since 0.1
         *
        */
        _renderSecondTemplate: function(model) {
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_renderSecondTemplate", 575);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 576);
var instance = this,
                host = instance.host,
                alternateTemplate = instance._secondTempl || host._templFns.template,
                modelNode;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 581);
modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 582);
if (modelNode && alternateTemplate) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 583);
if (ISMICROTEMPLATE(instance.get('template')) || model.itsaeditmodel) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 584);
modelNode.cleanup();
                }
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 586);
modelNode.setHTML(alternateTemplate(model));
            }
            else {
            }
        },

        /**
         * Re-renderes the Model with the original template inside the ViewList.
         *
         * @method _renderOriginalTemplate
         * @private
         * @param model {Y.Model | Object} The item from the modellist. May be a Model, or an Object - in case of LazyModelList
         * @since 0.1
         *
        */
        _renderOriginalTemplate: function(model) {
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_renderOriginalTemplate", 601);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 602);
var instance = this,
                host = instance.host,
                modelNode;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 606);
modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 607);
if (modelNode) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 608);
if ((instance._secondTempl && instance._secondTemplIsMicro) || model.itsaeditmodel) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 609);
modelNode.cleanup();
                }
                // delete objectproperty from instance._secondModelsBEFORE calling host._templFns.template,
                // for the latter depends on whether the definition is there.
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 613);
modelNode.setHTML(host._templFns.template(model));
            }
            else {
            }
        },

        /**
         * compiled the editTemplate into private variable _editTempl()
         *
         * @method _setEditTemplate
         * @param template {String} The new secondTemplate to be used. Must be of type Y.Lang.sub() or Y.Template.Micro()
         * @private
         * @since 0.1
         *
        */
        _setEditTemplate: function(template) {
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_setEditTemplate", 628);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 629);
var instance = this,
                host = instance.host,
                compiledModelEngine, editTemplateIsMicro;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 633);
if (!template || (template==='')) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 634);
instance._editTempl = host._templFns.template;
            }
            else {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 637);
editTemplateIsMicro = instance._editTemplIsMicro = ISMICROTEMPLATE(template);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 638);
if (editTemplateIsMicro) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 639);
compiledModelEngine = Y.TemplateMicro.compile(template);
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 640);
instance._editTempl = function(model) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_editTempl", 640);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 641);
var modelInstance = model.get && (model.get === 'function');
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 642);
if (!modelInstance && host._listLazy) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 643);
model = host.get('modelList').revive(model);
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 644);
if (!model.itsaeditmodel) {
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 645);
model.plug(Y.Plugin.ITSAEditModel, instance.get('configForEditModel'));
                            }
                        }
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 648);
return compiledModelEngine(model.itsaeditmodel.toJSON(instance.get('editmodelConfigAttrs')
                               || model.itsaeditmodel.get('editmodelConfigAttrs')));
                    };
                }
                else {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 653);
instance._editTempl = function(model) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_editTempl", 653);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 654);
var modelInstance = model.get && (model.get === 'function');
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 655);
if (!modelInstance && host._listLazy) {
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 656);
model = host.get('modelList').revive(model);
                            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 657);
if (!modelInstance && host._listLazy) {
                                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 658);
model.plug(Y.Plugin.ITSAEditModel, instance.get('configForEditModel'));
                            }
                        }
                        _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 661);
return Lang.sub(template, model.itsaeditmodel.toJSON(instance.get('editmodelConfigAttrs')
                               || model.itsaeditmodel.get('editmodelConfigAttrs')));
                    };
                }
            }
        },

        /**
         * compiled the secondTemplate into private variable _secondTempl()
         *
         * @method _setSecondTemplate
         * @param template {String} The new secondTemplate to be used. Must be of type Y.Lang.sub() or Y.Template.Micro()
         * @private
         * @since 0.1
         *
        */
        _setSecondTemplate: function(val) {
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_setSecondTemplate", 677);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 678);
var instance = this,
                host = instance.host,
                compiledModelEngine, alternateTemplateIsMicro;

            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 682);
if (!val || (val==='')) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 683);
instance._secondTempl = null;
            }
            else {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 686);
alternateTemplateIsMicro = instance._secondTemplIsMicro = ISMICROTEMPLATE(val);
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 687);
if (alternateTemplateIsMicro) {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 688);
compiledModelEngine = Y.TemplateMicro.compile(val);
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 689);
instance._secondTempl = function(model) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_secondTempl", 689);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 690);
return compiledModelEngine(host.getModelToJSON(model));
                    };
                }
                else {
                    _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 694);
instance._secondTempl = function(model) {
                        _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_secondTempl", 694);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 695);
return Lang.sub(val, host.getModelToJSON(model));
                    };
                }
            }
        },

        /**
         * Unplugs both Y.Plugin.ITSAEditModel as well as Y.Plugin.ITSATabKeyManager from the model.
         *
         * @method _unplugITSAEditModel
         * @param template {String} The new secondTemplate to be used. Must be of type Y.Lang.sub() or Y.Template.Micro()
         * @param model {Y.Model || Object} The model (or revived model) from the modellist/lazymodellist.
         * @param cliendId {Int} Model's clientId
         * @private
         * @since 0.1
         *
        */
        _unplugITSAEditModel : function(model, clientId) {
            _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "_unplugITSAEditModel", 712);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 713);
var instance = this,
                host = instance.host,
                modelInstance, modelNode;

            // IMPORTANT: model could be an object in case of LazyModelList
            // we need to revive it first
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 719);
modelInstance = model.get && (typeof model.get === 'function');
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 720);
if (!modelInstance && host._listLazy) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 721);
model = host.get('modelList').revive(model);
            }
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 723);
if (model.unplug) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 724);
model.unplug('itsaeditmodel');
            }
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 726);
delete instance._editModels[clientId];
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 727);
modelNode = (Lang.isNumber(model) ? host.getNodeFromIndex(model, 0) : host.getNodeFromModel(model, 0));
            _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 728);
if (modelNode) {
                _yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 729);
modelNode.unplug('itsatabkeymanager');
            }
        }

    }, {
        NS : 'itsacmtemplate',
        ATTRS : {

            /**
             * The editmodelConfigAttrs to be used in the editable mode. See Y.Plugin.ITSAEditModel (gallery-itsaeditmodel)
             * for further specifications. If this attribute is empty, the plugin will search for 'configForEditModel.editmodelConfigAttrs',
             * which might as well define the config. However, it is preferable to define the configAttrs directly within 'editmodelConfigAttrs',
             * because through this attribute are able to change the configAttrs later on. (The one within 'configForEditModel.editmodelConfigAttrs'
             * is only read during initialisation).
             *
             * @attribute editmodelConfigAttrs
             * @type {Object}
             * @default false
             * @since 0.1
             */
            editmodelConfigAttrs: {
                value: {},
                validator: function(v){
                    _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "validator", 751);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 752);
return Lang.isObject(v);
                }
            },

            /**
             * The <b>config</b> that is passed through directly into Y.Plugin.ITSAEditModel. Event though you can define
             * 'configForEditModel.template' and 'configForEditModel.editmodelConfigAttrs', the referred way for those to properties
             * is to set them directly within this wplugin-level (see 'editTemplate' and 'editmodelConfigAttrs' for the why).
             *
             * @attribute configForEditModel
             * @type {Boolean}
             * @default false
             * @since 0.1
             */
            configForEditModel: {
                value: null,
                validator: function(v){
                    _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "validator", 768);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 769);
return Lang.isObject(v);
                }
            },

            /**
             * The template to be used in the editable mode. Use either Y.Lang.sub or Y.Template.Micor syntax. If this attribute is empty,
             * the plugin will search for 'configForEditModel.template', which might as well define the editTemplate. However, it is preferable
             * to define the editable template directly within 'editTemplate', because through this attribute are able to change the
             * editable-template later on. (The one within 'configForEditModel.editTemplate' is only read during initialisation).
             *
             * @attribute editTemplate
             * @type {Boolean}
             * @default false
             * @since 0.1
             */
            editTemplate: {
                value: null,
                validator: function(v){
                    _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "validator", 786);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 787);
return (typeof v === 'string');
                },
                setter: '_setEditTemplate'
            },

            /**
             * Makes the View to render the editable-version of the Model. Only when the Model has <b>Y.Plugin.ITSAEditModel</b> plugged in.
             *
             * @attribute modelsEditable
             * @type {Boolean}
             * @default false
             * @since 0.1
             */
            modelsEditable: {
                value: false,
                lazyAdd: false,
                validator: function(v){
                    _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "validator", 803);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 804);
return Lang.isBoolean(v);
                }
            },

            /**
             * Defines the template to be used as 'secondTemplate'. Will be used for all Models that are rendered by setModelToSecondTemplate()
             *
             * @attribute secondTemplate
             * @type {Boolean}
             * @default false
             * @since 0.1
             */
            secondTemplate: {
                value: null,
                validator: function(v){
                    _yuitest_coverfunc("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", "validator", 818);
_yuitest_coverline("build/gallery-itsachangemodeltemplate/gallery-itsachangemodeltemplate.js", 819);
return (typeof v === 'string');
                },
                setter: '_setSecondTemplate'
            }

        }
    }
);

}, '@VERSION@', {
    "requires": [
        "yui-base",
        "node-core",
        "base-base",
        "base-build",
        "plugin-base",
        "pluginhost-base",
        "oop",
        "template-micro"
    ]
});