YUI.add('gallery-itsadialog', function (Y, NAME) {

'use strict';

/*jshint maxlen:200 */

/**
 * This module adds three dialog-promises to YUI:
 *
 * Y.alert()
 * Y.prompt()
 * Y.confirm()
 *
 *
 * @module gallery-itsadialog
 * @class Y
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

var YArray = Y.Array,
    Lang = Y.Lang,
    RENDERDELAY = 5000,
    ICON_TEMPLATE = '<i class="itsa-dialogicon {icon}"></i>',
    SUSPENDED = 'suspended',
    BOOLEAN = 'boolean',
    MODEL = 'model',
    TITLE = 'title',
    FOOTER = 'footer',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
    VALUE = 'value',
    UPPERCASE = 'uppercase',
    LOWERCASE = 'lowercase',
    CAPITALIZE = 'capitalize',
    ITSADIALOG = 'itsa-dialog',
    ESCAPE_HIDE_EVENT = 'escape:hide',
    VISIBLE = 'visible',
    TRANSFORM = 'Transform',
    BUTTONTRANSFORM = 'button'+TRANSFORM,
    LABELTRANSFORM = 'label'+TRANSFORM,
    UP = 'up',
    ITSADIALOG_INFO_UP = ITSADIALOG+INFO+UP,
    ITSADIALOG_WARN_UP = ITSADIALOG+WARN+UP,
    ITSADIALOG_ERROR_UP = ITSADIALOG+ERROR+UP;

function ITSADialog() {
    ITSADialog.superclass.constructor.apply(this, arguments);
}

ITSADialog.NAME = 'itsadialog';

Y.extend(ITSADialog, Y.ITSAMessageViewer, {}, {
    ATTRS: {
        /**
         * CSS text-transform of all buttons. Should be:
         * <ul>
         *   <li>null --> leave as it is</li>
         *   <li>uppercase</li>
         *   <li>lowercase</li>
         *   <li>capitalize --> First character uppercase, the rest lowercase</li>
         * </ul>
         *
         * @attribute buttonTransform
         * @default null
         * @type {String}
         */
        buttonTransform: {
            value: null,
            validator: function(val) {
                return (val===null) || (val===UPPERCASE) || (val===LOWERCASE) || (val===CAPITALIZE);
            }
        },
        /**
         * CSS text-transform of all label-elements. Should be:
         * <ul>
         *   <li>null --> leave as it is</li>
         *   <li>uppercase</li>
         *   <li>lowercase</li>
         *   <li>capitalize --> First character uppercase, the rest lowercase</li>
         * </ul>
         *
         * @attribute labelTransform
         * @default null
         * @type {String}
         */
        labelTransform: {
            value: null,
            validator: function(val) {
                return (val===null) || (val===UPPERCASE) || (val===LOWERCASE) || (val===CAPITALIZE);
            }
        },
        /**
         * Whether to show large icons on the panels (before the message).<br>
         * Can be overruled per message.
         *
         * @attribute showIcon
         * @type {Boolean}
         * @default true
         */
        showIcon : {
            value: true,
            validator: function(val) {
                return (typeof val===BOOLEAN);
            }
        }
    }
});

ITSADialog.prototype.initializer = function() {
    var instance = this;
    instance._eventhandlers = [];
    instance._body = Y.one('body');
    Y.later(RENDERDELAY, instance, instance.renderPromise);
};

ITSADialog.prototype.renderPromise = function() {
    var instance = this;
    return instance._renderPromise || (instance._renderPromise = Y.usePromise('gallery-itsaviewmodelpanel', 'gallerycss-itsa-dialog').then(
                                                                    Y.bind(instance._renderPanels, instance)
                                                                 ));
};

ITSADialog.prototype._renderPanels = function() {
    var instance = this,
        config = {
            visible:  false,
            centered: true,
            modal:    true,
            editable: true,
            minWidth: 200,
            dragable: true,
            maxWidth: 550,
            buttonTransform: instance.get(BUTTONTRANSFORM),
            labelTransform: instance.get(LABELTRANSFORM),
            className: ITSADIALOG
        },
        eventhandlers = instance._eventhandlers,
        panels, panelinfo, panelwarn, panelerror;
    panels = instance.panels = {};
    panelinfo = panels[INFO] = new Y.ITSAViewModelPanel(config);
    panelwarn = panels[WARN] = new Y.ITSAViewModelPanel(config);
    panelerror = panels[ERROR] = new Y.ITSAViewModelPanel(config);

    eventhandlers.push(
        panelinfo.after('*:hide', function(e) {
            var panel = e.target,
                itsamessage = panel.get(MODEL),
                buttonNode = e.buttonNode,
                buttonValue = buttonNode && buttonNode.get(VALUE),
                rejectButton = itsamessage.rejectButton,
                closedByClosebutton = buttonNode && buttonNode.hasClass('itsa-panelclosebtn'),
                rejected = (e.type===ESCAPE_HIDE_EVENT) || closedByClosebutton || (rejectButton && (new RegExp('btn_'+buttonValue+'$')).test(rejectButton));
/*jshint expr:true */
            rejected ? itsamessage.reject(buttonValue) : (itsamessage.UIToModel() && itsamessage._set('button', buttonValue) && itsamessage.resolve(itsamessage.toJSON()));
/*jshint expr:false */
        })
    );

    eventhandlers.push(
        panelwarn.after('*:hide', function(e) {
            var panel = e.target,
                itsamessage = panel.get(MODEL),
                buttonNode = e.buttonNode,
                buttonValue = buttonNode && buttonNode.get(VALUE),
                rejectButton = itsamessage.rejectButton,
                closedByClosebutton = buttonNode.hasClass('itsa-panelclosebtn'),
                rejected = (e.type===ESCAPE_HIDE_EVENT) || closedByClosebutton || (rejectButton && (new RegExp('btn_'+buttonValue+'$')).test(rejectButton));
/*jshint expr:true */
            rejected ? itsamessage.reject(buttonValue) : (itsamessage.UIToModel() && itsamessage._set('button', buttonValue) && itsamessage.resolve(itsamessage.toJSON()));
/*jshint expr:false */
        })
    );
    eventhandlers.push(
        panelerror.after('*:hide', function(e) {
            var panel = e.target,
                itsamessage = panel.get(MODEL),
                buttonNode = e.buttonNode,
                buttonValue = buttonNode && buttonNode.get(VALUE),
                rejectButton = itsamessage.rejectButton,
                closedByClosebutton = buttonNode.hasClass('itsa-panelclosebtn'),
                rejected = (e.type===ESCAPE_HIDE_EVENT) || closedByClosebutton || (rejectButton && (new RegExp('btn_'+buttonValue+'$')).test(rejectButton));
/*jshint expr:true */
            rejected ? itsamessage.reject(buttonValue) : (itsamessage.UIToModel() && itsamessage._set('button', buttonValue) && itsamessage.resolve(itsamessage.toJSON()));
/*jshint expr:false */
        })
    );
    eventhandlers.push(
        instance.on(LABELTRANSFORM+'Change', function(e) {
            var value = e.newVal;
            panelinfo.set(LABELTRANSFORM, value);
            panelwarn.set(LABELTRANSFORM, value);
            panelerror.set(LABELTRANSFORM, value);
        })
    );
    eventhandlers.push(
        instance.on(BUTTONTRANSFORM+'Change', function(e) {
            var value = e.newVal;
            panelinfo.set(BUTTONTRANSFORM, value);
            panelwarn.set(BUTTONTRANSFORM, value);
            panelerror.set(BUTTONTRANSFORM, value);
        })
    );
    eventhandlers.push(
        panelinfo.on(VISIBLE+'Change', function(e) {
            instance._body.toggleClass(ITSADIALOG_INFO_UP, e.newValue);
        })
    );
    eventhandlers.push(
        panelwarn.on(VISIBLE+'Change', function(e) {
            instance._body.toggleClass(ITSADIALOG_WARN_UP, e.newValue);
        })
    );
    eventhandlers.push(
        panelerror.on(VISIBLE+'Change', function(e) {
            instance._body.toggleClass(ITSADIALOG_ERROR_UP, e.newValue);
        })
    );
    panelinfo.render();
    panelwarn.render();
    panelerror.render();
};

ITSADialog.prototype.viewMessage = function(itsamessage) {
    var instance = this;
    return instance.renderPromise().then(
        function() {
            return new Y.Promise(function (resolve) {
                var panels = instance.panels,
                    panel = panels[itsamessage.level];
                instance._showPanel(panel, itsamessage);
                itsamessage.promise.then(
                    function() {
                        return panel.set(VISIBLE, false, {silent: true});
                    },
                    function() {
                        return panel.set(VISIBLE, false, {silent: true});
                    }
                ).then(
                    resolve
                ).then(
                    null,
                    function(err) {
                        Y.soon(function () {
                            throw err;
                        });
                    }
                );
            });
        }
    );
};

ITSADialog.prototype._showPanel = function(panel, itsamessage) {
    var instance = this,
        primarybutton = itsamessage.primaryButton,
        rejectbutton = itsamessage.rejectButton,
        buttonLabels = itsamessage.buttonLabels,
        hotKeys = itsamessage.hotKeys,
        customBtns = itsamessage.customBtns,
        noButtons = itsamessage.noButtons,
        noHideOnSubmit = (typeof itsamessage.noHideOnSubmit === BOOLEAN) ? itsamessage.noHideOnSubmit : false,
        footer = itsamessage[FOOTER],
        footerHasButtons = /btn_/.test(footer),
        messageIcon = itsamessage.icon,
        showIcon = messageIcon && instance.get('showIcon'),
        footerview, removePrimaryButton;
    panel.set('noHideOnSubmit', noHideOnSubmit);
    panel.removeButtonLabel();
    panel.removeCustomBtn();
    panel.removeHotKey();
    panel.set('closeButton', itsamessage.closeButton || (!footerHasButtons && !noButtons));
    panel.set('closableByEscape', (typeof rejectbutton === 'string'));
    panel.set(FOOTER+'Template', (noButtons ? null : footer));
    // next statemenst AFTER defining the footerview!
/*jshint expr:true */
    buttonLabels && panel.setButtonLabels(buttonLabels);
    hotKeys && panel.setHotKeys(hotKeys);
    customBtns && panel.addCustomBtns(customBtns);
/*jshint expr:false */
    if (!noButtons && footer && Lang.isValue(primarybutton)) {
        footerview = panel.get('footerView');
        removePrimaryButton = (typeof primarybutton === 'boolean') && !primarybutton;
/*jshint expr:true */
        removePrimaryButton ? footerview.removePrimaryButton() : footerview.setPrimaryButton(primarybutton);
/*jshint expr:false */
    }
    panel.set(TITLE, itsamessage[TITLE]);
    // set the model BEFORE setting the template --> Y.Slider would go wrong otherwise
    panel.set(MODEL, itsamessage);
    panel._body.toggleClass('itsa-hasicon', showIcon);
    panel.set('template', (showIcon ? Lang.sub(ICON_TEMPLATE, {icon: messageIcon}) : '')+itsamessage.message);
    // resolve viewMessagePromise when itsamessage.promise gets fulfilled --> so the next message from the queue will rise up
    // also: hide the panel --> this might have been done by the *:hide - event, but one might also have fulfilled the promise directly
    // in which case the panel needs to be hidden manually
/*jshint expr:true */
    itsamessage[SUSPENDED] || panel.show();
/*jshint expr:false */
};

ITSADialog.prototype.resurrect = function(itsamessage) {
    var instance = this;
    instance.renderPromise().then(
        function() {
            var panel = instance.panels[itsamessage.level];
        /*jshint expr:true */
            panel && panel.set(VISIBLE, true, {silent: true});
        /*jshint expr:false */
        }
    );
};

ITSADialog.prototype.suspend = function(itsamessage) {
    var instance = this;
    instance.renderPromise().then(
        function() {
            var panel = instance.panels[itsamessage.level];
        /*jshint expr:true */
            panel && panel.set(VISIBLE, false, {silent: true});
        /*jshint expr:false */
        }
    );
};

ITSADialog.prototype.destructor = function() {
    var panels = this.panels;
    this._clearEventhandlers();
    panels[INFO].destroy();
    panels[WARN].destroy();
    panels[ERROR].destroy();
};

/**
 * Cleaning up all eventlisteners
 *
 * @method _clearEventhandlers
 * @private
 * @since 0.3
 *
*/
ITSADialog.prototype._clearEventhandlers = function() {

    var instance = this;
    YArray.each(
        instance._eventhandlers,
        function(item){
            item.detach();
        }
    );
};

// define 1 global itsadialog
/*jshint expr:true */
Y.Global.ITSADialog || (Y.Global.ITSADialog=new ITSADialog());
/*jshint expr:false */
Y.ITSADialog = Y.Global.ITSADialog;

}, '@VERSION@', {
    "requires": [
        "yui-base",
        "promise",
        "event-custom-base",
        "yui-later",
        "oop",
        "gallery-itsaviewmodelpanel",
        "gallery-itsamodulesloadedpromise",
        "gallery-itsamessageviewer"
    ],
    "skinnable": true
});
