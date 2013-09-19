'use strict';

/*jshint maxlen:235 */

/**
 *
 * Widget ITSAViewModelPanel
 *
 *
 * Has the same functionalities as ITSAViewModel, but will come inside a Panel (which floats by default).
 * Also has standard a 'close'-button. Using WidgetButtons functionalyties, more buttons can be added.
 *
 * These buttons are available by the module and will call Model's corresponding methods:
 *
 * close (visible by default)
 * add
 * destroy
 * reset
 * save
 * submit
 *
 *
 * @class ITSAViewModelPanel
 * @constructor
 * @extends ITSAPanel
 * @since 0.2
 */

var ITSAViewModelPanel,
    Lang = Y.Lang,
    DESTROYED = 'destroyed',
    CONTENTBOX = 'contentBox',
    GALLERY = 'gallery-',
    VIEW = 'View',
    BODYVIEW = 'body'+VIEW,
    FOOTER = 'footer',
    FOOTERVIEW = FOOTER+VIEW,
    TEMPLATE = 'template',
    FOOTERTEMPLATE = FOOTER+'Template',
    FOCUSED_CLASS = 'itsa-focused',
    EDITABLE = 'editable',
    MODEL = 'model',
    FOCUSED = 'focused',
    VISIBLE = 'visible',
    CHANGE = 'Change',
    CLOSE = 'close',
    CLICK = 'click',
    CLOSE_CLICK = CLOSE+CLICK,
    BUTTON = 'button',
    BUTTON_HIDE_EVENT = BUTTON+':hide',
    BOOLEAN = 'boolean',
    STRING = 'string',
    LOAD = 'load',
    VALUE = 'value',
    RESET = 'reset',
    FOCUSMANAGED = 'focusManaged',
    ITSATABKEYMANAGER = 'itsatabkeymanager',
    NO_HIDE_ON_LOAD = 'noHideOnLoad',
    NO_HIDE_ON_RESET = 'noHideOnReset',
    /**
      * Fired when a UI-elemnt needs to focus to the next element (in case of editable view).
      * The defaultFunc will refocus to the next field (when the Panel has focus).
      * Convenience-event which takes place together with the underlying models-event.
      *
      * @event focusnext
      * @param e {EventFacade} Event Facade including:
      * @param e.target {Y.Node} The node that fired the event.
      * @param e.model {Y.Model} modelinstance bound to the view
      * @param e.modelEventFacade {EventFacade} eventfacade that was passed through by the model that activated this event
      * @since 0.1
    **/
    FOCUS_NEXT = 'focusnext',
    VALIDATED_BTN_TYPES = {
        ok: true,
        retry: true,
        save: true,
        submit: true
    };

ITSAViewModelPanel = Y.ITSAViewModelPanel = Y.Base.create('itsaviewmodelpanel', Y.ITSAPanel, [], null, {
    ATTRS: {
        /**
         * Overruled from Y.ITSAPanel by making writeOnce=true.<br />
         * Template of the bodysection. Can be either a Y.Lang.sub-template or a Y.View.<br />
         * When a String-template is set, the template can make use of {body}, which will automaticly be replaced by the body-attribute under the hood.<br />
         * When an Y.View instance is set, the View's 'container' will be bound to the bodysection-div automaticly and the View's render() method
         * will be executed to fill the section with content. If the View is designed well, the panel-content will automaticly be updated when needed.
         *
         * @attribute bodyView
         * @type {String|Y.View}
         * @default null
         * @since 0.1
        */
        bodyView : {
            value: null,
            writeOnce: true
        },
        /**
         * Makes the View to render the editable-version of the Model. Only when the Model has <b>Y.Plugin.ITSAEditModel</b> plugged in.
         *
         * @attribute editable
         * @type {Boolean}
         * @default false
         * @since 0.3
         */
        editable: {
            value: false,
            validator: function(v){
                return (typeof v === BOOLEAN);
            }
        },
        /**
         * Determines whether tabbing through the elements is managed by gallery-itsatabkeymanager.
         *
         * @attribute focusManaged
         * @type {Boolean}
         * @default true
         * @since 0.3
         */
        focusManaged: {
            value: true,
            validator: function(v){
                return (typeof v === BOOLEAN);
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
         * @default null
         * @since 0.3
         */
        footerTemplate: {
            value: null,
            validator: function(v) {
                return (typeof v === STRING);
            }
        },

        /**
         * Overruled from Y.ITSAPanel by making writeOnce=true.<br />
         * Template of the footersection. Can be either a Y.Lang.sub-template or a Y.View.<br />
         * When a String-template is set, the template can make use of {footer} and {footerRight}, which will automaticly be replaced by the footer and footerRight-attributes under the hood.<br />
         * When an Y.View instance is set, the View's 'container' will be bound to the footersection-div automaticly and the View's render() method
         * will be executed to fill the section with content. If the View is designed well, the panel-content will automaticly be updated when needed.
         *
         * @attribute footerView
         * @type {String|Y.View}
         * @default null
         * @since 0.1
        */
        footerView : {
            value: null,
            writeOnce: true
        },

        /**
         * Overruled from Y.ITSAPanel by making readOnly=true.<br />
         * Template of the headersection. Can be either a Y.Lang.sub-template or a Y.View.<br />
         * When a String-template is set, the template can make use of {title} and {titleRight}, which will automaticly be replaced by the title and titleRight-attributes
         * under the hood. You need {titleRight} if you want the 'close-button' to render when the attribute 'titleRight' keeps undefined.<br />
         * When an Y.View instance is set, the View's 'container' will be bound to the headersection-div automaticly and the View's render() method
         * will be executed to fill the section with content. If the View is designed well, the panel-content will automaticly be updated when needed.
         *
         * @attribute headerView
         * @type {String|Y.View}
         * @default null
         * @since 0.1
        */
        headerView : {
            value: null,
            readOnly: true
        },

        hideOnBtnFooter: {
            value: true,
            validator: function(v) {
                return (typeof v === BOOLEAN);
            }
        },

        hideOnBtnHeader: {
            value: false,
            validator: function(v) {
                return (typeof v === BOOLEAN);
            }
        },
        noHideOnLoad: {
            value: true,
            validator: function(v) {
                return (typeof v === BOOLEAN);
            }
        },
        noHideOnReset: {
            value: true,
            validator: function(v) {
                return (typeof v === BOOLEAN);
            }
        },
        /**
         * The Y.Model that will be rendered in the view. May also be an Object, which is handy in case the source is an
         * item of a Y.LazyModelList. If you pass a String-value, then the text is rendered as it is, assuming no model-instance.
         *
         * @attribute model
         * @type {Y.Model|Object|String}
         * @default {}
         * @since 0.3
         */
        model: {
            value: {},
            validator: function(v){ return ((v===null) || Lang.isObject(v) || (typeof v === STRING) || (v instanceof Y.Model)); }
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
         * @default null
         * @since 0.3
         */
        template: {
            value: null,
            validator: function(v) {
                return (typeof v === STRING);
            }
        }
    }
});

ITSAViewModelPanel.prototype.initializer = function() {
    var instance = this,
        model = instance.get(MODEL),
        footertemplate = instance.get(FOOTERTEMPLATE);

    /**
     * Internal list of all eventhandlers bound by this widget.
     * @property _eventhandlers
     * @private
     * @default []
     * @type Array
    */
    instance._eventhandlers = [];

    instance._set(BODYVIEW, new Y.ITSAViewModel({
        model: model,
        template: instance.get(TEMPLATE),
        editable: instance.get(EDITABLE),
        styled: false,
        focusManaged: false // will be done at the Panel-level
    }));
/*jshint expr:true */
    footertemplate && instance._set(FOOTERVIEW, new Y.ITSAViewModel({
        model: model,
        template: footertemplate,
        editable: false,
        styled: false,
        focusManaged: false // will be done at the Panel-level
    }));
/*jshint expr:false */

    // publishing event 'focusnext'
    instance.publish(
        FOCUS_NEXT,
        {
            defaultFn: Y.bind(instance._defFn_focusnext, instance),
            emitFacade: true
        }
    );
/*jshint expr:true */
    instance.get(VISIBLE) && instance.get(CONTENTBOX).addClass(FOCUSED_CLASS);
/*jshint expr:false */
};

ITSAViewModelPanel.prototype.bindUI = function() {
    var instance = this,
        contentBox = instance.get(CONTENTBOX),
        eventhandlers, bodyView, footerView;

    instance.constructor.superclass.bindUI.apply(instance);

    eventhandlers = instance._eventhandlers;
    bodyView = instance.get(BODYVIEW);
    footerView = instance.get(FOOTERVIEW);

    instance._setFocusManager(instance.get(FOCUSMANAGED));

    eventhandlers.push(
        instance.after(EDITABLE+CHANGE, function(e) {
            bodyView.set(EDITABLE, e.newVal);
        })
    );

    eventhandlers.push(
        instance.after(FOOTERTEMPLATE+CHANGE, function(e) {
            footerView.set(TEMPLATE, e.newVal);
        })
    );

    eventhandlers.push(
        instance.after(MODEL+CHANGE, function(e) {
            bodyView.set(MODEL, e.newVal);
            footerView.set(MODEL, e.newVal);
        })
    );

    eventhandlers.push(
        instance.after(TEMPLATE+CHANGE, function(e) {
            bodyView.set(TEMPLATE, e.newVal);
        })
    );

    eventhandlers.push(
        instance.after(
            FOCUSMANAGED+CHANGE,
            function(e) {
                instance._setFocusManager(e.newVal);
            }
        )
    );

    eventhandlers.push(
        bodyView.on(
            FOCUS_NEXT,
            function(e) {
                if (e.target!==instance) {
                    var newevent = FOCUS_NEXT,
                        payload = {
                            type: newevent,
                            model: instance.get(MODEL),
                            modelEventFacade: e,
                            target: instance
                        };
                    instance.fire(newevent, payload);
                }
            }
        )
    );

    eventhandlers.push(
        instance.after('*:'+CLOSE_CLICK, function(e) {
            instance.fire(BUTTON_HIDE_EVENT, {buttonNode: e.target});
        })
    );

    eventhandlers.push(
        instance.after(FOCUSED+CHANGE, function(e) {
            var itsatabkeymanager = contentBox.itsatabkeymanager;
        /*jshint expr:true */
            e.newVal && itsatabkeymanager && itsatabkeymanager._retreiveFocus();
        /*jshint expr:false */
        })
    );

    eventhandlers.push(
        instance.after(FOCUSED+CHANGE, function(e) {
            var itsatabkeymanager = contentBox.itsatabkeymanager;
        /*jshint expr:true */
            e.newVal && itsatabkeymanager && itsatabkeymanager._retreiveFocus();
        /*jshint expr:false */
        })
    );

    eventhandlers.push(
        instance.after(FOOTERTEMPLATE+CHANGE, function(e) {
        /*jshint expr:true */
            var newTemplate = e.newVal,
                prevTemplate = e.prevVal;
            newTemplate && !prevTemplate && instance._set(FOOTERVIEW, new Y.ITSAViewModel({
                model: instance.get(MODEL),
                template: newTemplate,
                editable: false,
                styled: false,
                focusManaged: false // will be done at the Panel-level
            }));
            prevTemplate && !newTemplate && prevTemplate.destroy() && instance._set(FOOTERVIEW, null);
        /*jshint expr:false */
        })
    );

    eventhandlers.push(
        instance._footer.delegate(
            CLICK,
            function(e) {
                var node = e.target,
                    value = node.get(VALUE);
/*jshint expr:true */
                // value===CLOSE will be handled by the '*:'+CLOSE_CLICK eventlistener
                instance.get('hideOnBtnFooter') && (value!==CLOSE) && (!instance.get(NO_HIDE_ON_RESET) || (value!==RESET)) && (!instance.get(NO_HIDE_ON_LOAD) || (value!==LOAD)) && instance.fire(BUTTON_HIDE_EVENT, {buttonNode: node});
/*jshint expr:false */
            },
            BUTTON
        )
    );

    eventhandlers.push(
        instance._header.delegate(
            CLICK,
            function(e) {
                var node = e.target,
                    value = node.get(VALUE);
/*jshint expr:true */
                // value===CLOSE will be handled by the '*:'+CLOSE_CLICK eventlistener
                instance.get('hideOnBtnHeader') && (value!==CLOSE) && (!instance.get(NO_HIDE_ON_RESET) || (value!==RESET)) && (!instance.get(NO_HIDE_ON_LOAD) || (value!==LOAD)) && instance.fire(BUTTON_HIDE_EVENT, {buttonNode: node});
/*jshint expr:false */
            },
            BUTTON
        )
    );

    eventhandlers.push(
        instance.on(BUTTON_HIDE_EVENT, function(e) {
            // in case of an ITSAFormElement that has editable fields --> you might need to preventDefault (=hide) hen not validated
            var model = instance.get(MODEL),
                editable = instance.get(EDITABLE),
                btnNode = e.buttonNode,
                buttonValue = btnNode.get(VALUE);
/*jshint expr:true */
            VALIDATED_BTN_TYPES[buttonValue] && editable && model && model.toJSONUI && !model.validated() && e.preventDefault();
/*jshint expr:false */
        })
    );

};

/**
 * Cleans up bindings
 * @method destructor
 * @protected
*/
ITSAViewModelPanel.prototype.destructor = function() {
    var instance = this,
        contentBox = instance.get(CONTENTBOX),
        bodyview = instance.get(BODYVIEW),
        footerview = instance.get(FOOTERVIEW);

    Y.log('destructor', 'info', 'ITSA-ViewModel');
    instance._clearEventhandlers();
/*jshint expr:true */
    contentBox.hasPlugin(ITSATABKEYMANAGER) && contentBox.unplug(ITSATABKEYMANAGER);
    bodyview && bodyview.destroy();
    footerview && footerview.destroy();
/*jshint expr:false */
};

/**
 * default function of focusnext-event.
 * Will refocus to the next focusable UI-element.
 *
 * @method _defFn_focusnext
 * @private
*/
ITSAViewModelPanel.prototype._defFn_focusnext = function() {
    var instance = this,
        itsatabkeymanager = instance.get(CONTENTBOX).itsatabkeymanager;

    Y.log('defaultFn of focusnext', 'info', 'ITSA-ViewModel');
    if (itsatabkeymanager) {
        Y.log('focus to next field', 'info', 'ITSA-ViewModel');
        itsatabkeymanager.next();
    }
    else {
        Y.log('No focus to next field: Y.Plugin.ITSATabKeyManager not plugged in', 'info', 'ITSA-ViewModel');
    }
};

/**
 * Sets or unsets the focusManager (provided by gallery-itsatabkeymanager)
 *
 * @method _setFocusManager
 * @private
 * @param activate {Boolean}
 * @since 0.3
 *
*/
ITSAViewModelPanel.prototype._setFocusManager = function(activate) {
    var instance = this,
        contentBox = instance.get(CONTENTBOX),
        itsatabkeymanager = contentBox.itsatabkeymanager;

    Y.log('_setFocusManager to '+activate, 'info', 'ITSA-ViewModel');
    if (activate) {
        // If Y.Plugin.ITSATabKeyManager is plugged in, then refocus to the first item
        Y.use(GALLERY+ITSATABKEYMANAGER, function() {
            if (!instance.get(DESTROYED)) {
                if (itsatabkeymanager) {
                    itsatabkeymanager.refresh(contentBox);
                }
                else {
                    contentBox.plug(Y.Plugin.ITSATabKeyManager);
                    itsatabkeymanager = contentBox.itsatabkeymanager;
                }
                if (contentBox.hasClass(FOCUSED_CLASS)) {
                    itsatabkeymanager.focusInitialItem();
                }
            }
        });
    }
    else {
/*jshint expr:true */
        itsatabkeymanager && contentBox.unplug(ITSATABKEYMANAGER);
/*jshint expr:false */
    }
};