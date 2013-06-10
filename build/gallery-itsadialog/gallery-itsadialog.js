YUI.add('gallery-itsadialog', function (Y, NAME) {

'use strict';

/**
 * The Itsa Selectlist module.
 *
 * @module gallery-itsaselectlist
 */


/**
 *
 * @class ITSASelectlist
 * @extends Widget
 * @constructor
 *
 * <i>Copyright (c) 2012 Marco Asbreuk - http://theinternetwizard.net</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

var LOADDELAY = 5000, // lazy load 'gallery-itsadialogbox' after 5 seconds
      GALLERY_ITSADIALOGBOX = 'gallery-itsadialogbox',
      ACTION_HIDE = '_actionHide',
      ABORT = 'abort',
      IGNORE = 'ignore',
      YES = 'yes',
      NO = 'no',
      CANCEL = 'cancel',
      ERROR = 'error',
      YESNO = 'yesno',
      RETRY = 'retry',
      INPUT = 'input',
      NUMBER = 'number',
      LOGIN = 'login',
      WARNING = 'warning',
      OBJECT = 'object',
      CONFIRMATION_BUTTONS = {
          footer: [
              {name: NO, label: 'No', action: ACTION_HIDE, isDefault: true},
              {name: YES, label: 'Yes', action: ACTION_HIDE}
          ]
      },
      CONFIRMATION_RETRY_BUTTONS = {
          footer: [
              {name: ABORT, label:'Abort', action: ACTION_HIDE},
              {name: IGNORE, label:'Ignore', action: ACTION_HIDE},
              {name: RETRY, label:'Retry', action: ACTION_HIDE, isDefault: true}
          ]
      },
      ITSADialogInstance;

function ITSADialog() {}

if (!Y.Global.ITSADialog) {
    Y.mix(ITSADialog.prototype, {
        _getFunction : function(options) {
            // Caution: Y.Global.ItsaDialog is NOT the same as Y.Global.ITSADialog:
            // Y.Global.ItsaDialog is the dialog-widget that comes from gallery-itsadialogbox and uses callback-funcs.
            var useFunction,
                  type = options && options.type,
                  ItsaDialog = Y.Global.ItsaDialog;
            if (type===WARNING) {
                useFunction = Y.bind(ItsaDialog.showWarning, ItsaDialog);
            }
            else if (type===ERROR) {
                useFunction = Y.bind(ItsaDialog.showErrorMessage, ItsaDialog);
            }
            else if (type===YESNO) {
                useFunction = Y.bind(ItsaDialog.getConfirmation, ItsaDialog);
            }
            else if (type===RETRY) {
                useFunction = Y.bind(ItsaDialog.getRetryConfirmation, ItsaDialog);
            }
            else if (type===INPUT) {
                useFunction = Y.bind(ItsaDialog.getInput, ItsaDialog);
            }
            else if (type===NUMBER) {
                useFunction = Y.bind(ItsaDialog.getNumber, ItsaDialog);
            }
            else if (type===LOGIN) {
                useFunction = Y.bind(ItsaDialog.getLogin, ItsaDialog);
            }
            else {
                // default
                useFunction = Y.bind(ItsaDialog.showMessage, ItsaDialog);
            }
            return useFunction;
        },
        // options.type: {String} null|'message'|'warning'|'error' (default='message')
        alert : function(title, message, options) {
            var instance = this;
            // make it possible to pass 'options' as second argument:
            if (typeof message === OBJECT) {
                options = message;
                message = title;
                title = '';
            }
            options = options || {};
            return Y.usePromise(GALLERY_ITSADIALOGBOX).then(
                function() {
                    return new Y.Promise(function (resolve) {
                        // We cannot use Y.Global.ItsaDialog here, because at render-time, it does not exist
                        // therefore we call an internal function that does exist, which can call Y.Global.ItsaDialog itself.
                        instance._getFunction(options)(
                            title,
                            message,
                            function() {
                                resolve();
                            }
                        );
                    });
                }
            );
        },
        // options.type: {String} 'input'|'number'|'login' (default==='input')
        // options.value: {String|number} (in case of options.type==='number' or 'input')

        // options.min: {String|Number} (in case of options.type==='number')
        // options.max: {Number} (in case of options.type==='number')

        // options.labelUsername: {String} (in case of options.type==='login')
        // options.labelPassword: {String} (in case of options.type==='login')
        // options.defaultUsername: {String} (in case of options.type==='login')
        // options.defaultPassword: {String} (in case of options.type==='login')


        // resolve(response) --> response.value || response.username+response.password
        prompt : function(title, message, options) {
            var instance = this;
            // make it possible to pass 'options' as second argument:
            if (typeof message === OBJECT) {
                options = message;
                message = title;
                title = '';
            }
            options = options || {};
            options.type = options.type || INPUT;
            return Y.usePromise(GALLERY_ITSADIALOGBOX).then(
                function() {
                    return new Y.Promise(function (resolve, reject) {
                        // We cannot use Y.Global.ItsaDialog here, because at render-time, it does not exist
                        // therefore we call an internal function that does exist, which can call Y.Global.ItsaDialog itself.
                        if (options.type===NUMBER) {
                            instance._getFunction(options)(
                                title,
                                message,
                                options.value || '',
                                options.min,
                                options.max,
                                function(e) {
                                    // callback function
                                    var promiseReject = (e.buttonName === CANCEL);
                                    if (promiseReject) {
                                        reject(new Error('input cancelled'));
                                    }
                                    else {
                                        resolve(e);
                                    }
                                }
                            );
                        }
                        else {
                            instance._getFunction(options)(
                                title,
                                message,
                                (options.type===INPUT) ? (options.value || '') : options,
                                function(e) {
                                    // callback function.
                                    // In case of 'input' --> only e.value is present
                                    // In case of 'login' --> e.username, e.password and e.savechecked are present
                                    var promiseReject = (e.buttonName === CANCEL);
                                    if (promiseReject) {
                                        reject(new Error('input cancelled'));
                                    }
                                    else {
                                        resolve(e);
                                    }
                                }
                            );
                        }
                    });
                }
            );
        },
        // options.type: {String} null|'yesno'|'retry'  (default='yesno')
        // options.defaultBtn: {String} 'yes'|'no'|'abort'|'ignore'|'retry'  (default='no'|'retry')
        // resolve(button) --> button === 'buttonname'
        confirm : function(title, question, options) {
            var instance = this,
                  buttons, rejectmessage;
            // make it possible to pass 'options' as second argument:
            if (typeof message === OBJECT) {
                options = question;
                question = title;
                title = '';
            }
            options = options || {};
            options.type = options.type || YESNO;
            if (options.type===RETRY) {
                buttons = CONFIRMATION_RETRY_BUTTONS;
                rejectmessage = 'aborted';
                if (options.defaultBtn===ABORT) {
                    buttons.footer[0].isDefault = true;
                    buttons.footer[2].isDefault = false;
                }
                else if (options.defaultBtn==='ignore') {
                    buttons.footer[1].isDefault = true;
                    buttons.footer[2].isDefault = false;
                }
            }
            else {
                // 'yesno'
                buttons =  CONFIRMATION_BUTTONS;
                rejectmessage = 'not confirmed';
                if (options.defaultBtn===YES) {
                    buttons.footer[0].isDefault = false;
                    buttons.footer[1].isDefault = true;
                }
            }
            return Y.usePromise(GALLERY_ITSADIALOGBOX).then(
                function() {
                    return new Y.Promise(function (resolve, reject) {
                        // We cannot use Y.Global.ItsaDialog here, because at render-time, it does not exist
                        // therefore we call an internal function that does exist, which can call Y.Global.ItsaDialog itself.
                        instance._getFunction(options)(
                            title,
                            question,
                            function(e) {
                                // callback function
                                var button = e.buttonName,
                                      promiseReject = ((button === NO) || (button === ABORT));
                                if (promiseReject) {
                                    reject(new Error(rejectmessage));
                                }
                                else {
                                    resolve(button);
                                }
                            },
                            null,
                            null,
                            buttons
                        );
                    });
                }
            );
        }
    });

    ITSADialogInstance = Y.Global.ITSADialog = new ITSADialog();
    // now lazyload 'gallery-itsadialogbox'
    Y.later(
        LOADDELAY,
        Y,
        Y.use,
        GALLERY_ITSADIALOGBOX
    );
}

Y.alert = Y.rbind(ITSADialogInstance.alert, ITSADialogInstance);
Y.prompt = Y.rbind(ITSADialogInstance.prompt, ITSADialogInstance);
Y.confirm = Y.rbind(ITSADialogInstance.confirm, ITSADialogInstance);

}, '@VERSION@', {
    "requires": [
        "yui-base",
        "promise",
        "event-custom-base",
        "yui-later",
        "oop",
        "gallery-itsamodulesloadedpromise"
    ]
});
