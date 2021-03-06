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
_yuitest_coverage["build/gallery-itsadialog/gallery-itsadialog.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-itsadialog/gallery-itsadialog.js",
    code: []
};
_yuitest_coverage["build/gallery-itsadialog/gallery-itsadialog.js"].code=["YUI.add('gallery-itsadialog', function (Y, NAME) {","","'use strict';","","/**"," * This module adds three dialog-promises to YUI:"," *"," * Y.alert()"," * Y.prompt()"," * Y.confirm()"," *"," *"," * @module gallery-itsadialog"," * @class Y"," * @since 0.1"," *"," * <i>Copyright (c) 2013 Marco Asbreuk - http://theinternetwizard.net</i>"," * YUI BSD License - http://developer.yahoo.com/yui/license.html"," *","*/","","var LOADDELAY = 5000, // lazy load 'gallery-itsadialogbox' after 5 seconds","      GALLERY_ITSADIALOGBOX = 'gallery-itsadialogbox',","      ACTION_HIDE = '_actionHide',","      ABORT = 'abort',","      IGNORE = 'ignore',","      YES = 'yes',","      NO = 'no',","      CANCEL = 'cancel',","      ERROR = 'error',","      YESNO = 'yesno',","      RETRY = 'retry',","      INPUT = 'input',","      NUMBER = 'number',","      LOGIN = 'login',","      WARN = 'warn',","      OBJECT = 'object',","      CONFIRMATION_BUTTONS = {","          footer: [","              {name: NO, label: 'No', action: ACTION_HIDE, isDefault: true},","              {name: YES, label: 'Yes', action: ACTION_HIDE}","          ]","      },","      CONFIRMATION_RETRY_BUTTONS = {","          footer: [","              {name: ABORT, label:'Abort', action: ACTION_HIDE},","              {name: IGNORE, label:'Ignore', action: ACTION_HIDE},","              {name: RETRY, label:'Retry', action: ACTION_HIDE, isDefault: true}","          ]","      },","      ITSADialogInstance;","","function ITSADialog() {}","","if (!Y.Global.ITSADialog) {","    Y.mix(ITSADialog.prototype, {","        /**","         * Returns the proper function of ItsaDialog (gallery-itsadialogbox) to be used.","         *","         * @method _getFunction","         * @param [options] {object}","         * @param [options.type] {String}  Passed by to determine which method of ItsaDialog to be called. Default === 'showMessage'","         * @private","         * @since 0.1","        */","        _getFunction : function(options) {","            // Caution: Y.Global.ItsaDialog is NOT the same as Y.Global.ITSADialog:","            // Y.Global.ItsaDialog is the dialog-widget that comes from gallery-itsadialogbox and uses callback-funcs.","            var useFunction,","                  type = options && options.type,","                  ItsaDialog = Y.Global.ItsaDialog;","","            if (type===WARN) {","                useFunction = Y.bind(ItsaDialog.showWARN, ItsaDialog);","            }","            else if (type===ERROR) {","                useFunction = Y.bind(ItsaDialog.showErrorMessage, ItsaDialog);","            }","            else if (type===YESNO) {","                useFunction = Y.bind(ItsaDialog.getConfirmation, ItsaDialog);","            }","            else if (type===RETRY) {","                useFunction = Y.bind(ItsaDialog.getRetryConfirmation, ItsaDialog);","            }","            else if (type===INPUT) {","                useFunction = Y.bind(ItsaDialog.getInput, ItsaDialog);","            }","            else if (type===NUMBER) {","                useFunction = Y.bind(ItsaDialog.getNumber, ItsaDialog);","            }","            else if (type===LOGIN) {","                useFunction = Y.bind(ItsaDialog.getLogin, ItsaDialog);","            }","            else {","                // default","                useFunction = Y.bind(ItsaDialog.showMessage, ItsaDialog);","            }","            return useFunction;","        },","","        /**","         * Pops-up an alert-dialog --> dialog with no input-field and only an 'OK'-button.","         *","         * @method _alert","         * @param [title] {String} Title on the dialogbox (header).","         * @param message {String} Message to display. (may be the first argument)","         * @param [options] {object}","         * @param [options.type] {String} Determines which dialogbox to pop-up --> null|'message'|'warn'|'error' (null == 'message')","         * @private","         * @return {Y.Promise}","         * <br />resolve() --> without parameters, no reject.","         * @since 0.1","        */","        _alert : function(title, message, options) {","            var instance = this;","","            // make it possible to pass 'options' as second argument:","            if (typeof message === OBJECT) {","                options = message;","                message = title;","                title = '';","            }","            options = options || {};","            return Y.usePromise(GALLERY_ITSADIALOGBOX).then(","                function() {","                    return new Y.Promise(function (resolve) {","                        // We cannot use Y.Global.ItsaDialog here, because at render-time, it does not exist","                        // therefore we call an internal function that does exist, which can call Y.Global.ItsaDialog itself.","                        instance._getFunction(options)(","                            title,","                            message,","                            function() {","                                resolve();","                            }","                        );","                    });","                }","            );","        },","","        /**","         * Pops-up an prompt-dialog --> dialog with input-fields and an 'CANCEL' + 'OK' buttons, or In case of 'login', only an 'OK'-button.","         * <br />There are three possible dialog-types:","         * <br /><b>'input'</b> --> one string-field","         * <br /><b>'number'</b> --> one integer-field","         * <br /><b>'login'</b> --> two string-fields - used for username and password (the second field is marked)","         * <br /> which dialogtype to use can be set with 'options.type'.","         *","         * @method _prompt","         * @param [title] {String} Title on the dialogbox (header).","         * @param message {String} Message to display. (may be the first argument)","         * @param [options] {object}","         * @param [options.type] {String} Determines which dialogbox to pop-up --> null|'input'|'number'|'login' (null == 'input')","         * @param [options.value] {String|number} --> only in case of options.type==='number' or 'input'","         * @param [options.min] {Number} --> only in case of options.type==='number'","         * @param [options.max] {Number} --> only in case of options.type==='number'","         * @param [options.labelUsername] {String} --> only in case of options.type==='login'","         * @param [options.labelPassword] {String} --> only in case of options.type==='login'","         * @param [options.defaultUsername] {String} --> only in case of options.type==='login'","         * @param [options.defaultPassword] {String} --> only in case of options.type==='login'","         * @private","         * @return {Y.Promise}","         * <br />resolve(response) --> response.value || response.username+response.password.","         * <br />reject(reason) --> reason which is always the button 'cancel' being pressed.","         * @since 0.1","        */","        _prompt : function(title, message, options) {","            var instance = this;","","            // make it possible to pass 'options' as second argument:","            if (typeof message === OBJECT) {","                options = message;","                message = title;","                title = '';","            }","            options = options || {};","            options.type = options.type || INPUT;","            return Y.usePromise(GALLERY_ITSADIALOGBOX).then(","                function() {","                    return new Y.Promise(function (resolve, reject) {","                        // We cannot use Y.Global.ItsaDialog here, because at render-time, it does not exist","                        // therefore we call an internal function that does exist, which can call Y.Global.ItsaDialog itself.","                        if (options.type===NUMBER) {","                            instance._getFunction(options)(","                                title,","                                message,","                                options.value || '',","                                options.min,","                                options.max,","                                function(e) {","                                    // callback function","                                    var promiseReject = (e.buttonName === CANCEL);","                                    if (promiseReject) {","                                        reject(new Error('input cancelled'));","                                    }","                                    else {","                                        resolve(e);","                                    }","                                }","                            );","                        }","                        else {","                            instance._getFunction(options)(","                                title,","                                message,","                                (options.type===INPUT) ? (options.value || '') : options,","                                function(e) {","                                    // callback function.","                                    // In case of 'input' --> only e.value is present","                                    // In case of 'login' --> e.username, e.password and e.savechecked are present","                                    var promiseReject = (e.buttonName === CANCEL);","                                    if (promiseReject) {","                                        reject(new Error('input cancelled'));","                                    }","                                    else {","                                        resolve(e);","                                    }","                                }","                            );","                        }","                    });","                }","            );","        },","","        /**","         * Pops-up a confirm-dialog --> dialog with no input-field confirm-buttons.","         * <br />There are two possible dialog-types:","         * <br /><b>'yesno'</b> --> comes with yes-no buttons","         * <br /><b>'retry'</b> --> comes with abort-ignore-retry buttons","         * <br /> which dialogtype to use can be set with 'options.type'.","         *","         * @method _confirm","         * @param [title] {String} Title on the dialogbox (header).","         * @param message {String} Message to display. (may be the first argument)","         * @param [options] {object}","         * @param [options.type] {String} Determines which dialogbox to pop-up --> null|'yesno'|'retry' (null == 'yesno')","         * @param [options.defaultBtn] {String} 'yes'|'no'|'abort'|'ignore'|'retry'  (null == 'no'|'retry')","         * @private","         * @return {Y.Promise}","         * <br />resolve(button) --> button === 'buttonname'.","         * <br />reject(reason) --> which is 'not confirmed' (when 'no' pressed using yesno-buttons) OR 'aborted'  (with abort|ignore|retry-buttons).","         * @since 0.1","        */","        _confirm : function(title, question, options) {","            var instance = this,","                  buttons, rejectmessage;","","            // make it possible to pass 'options' as second argument:","            if (typeof message === OBJECT) {","                options = question;","                question = title;","                title = '';","            }","            options = options || {};","            options.type = options.type || YESNO;","            if (options.type===RETRY) {","                buttons = CONFIRMATION_RETRY_BUTTONS;","                rejectmessage = 'aborted';","                if (options.defaultBtn===ABORT) {","                    buttons.footer[0].isDefault = true;","                    buttons.footer[2].isDefault = false;","                }","                else if (options.defaultBtn==='ignore') {","                    buttons.footer[1].isDefault = true;","                    buttons.footer[2].isDefault = false;","                }","            }","            else {","                // 'yesno'","                buttons =  CONFIRMATION_BUTTONS;","                rejectmessage = 'not confirmed';","                if (options.defaultBtn===YES) {","                    buttons.footer[0].isDefault = false;","                    buttons.footer[1].isDefault = true;","                }","            }","            return Y.usePromise(GALLERY_ITSADIALOGBOX).then(","                function() {","                    return new Y.Promise(function (resolve, reject) {","                        // We cannot use Y.Global.ItsaDialog here, because at render-time, it does not exist","                        // therefore we call an internal function that does exist, which can call Y.Global.ItsaDialog itself.","                        instance._getFunction(options)(","                            title,","                            question,","                            function(e) {","                                // callback function","                                var button = e.buttonName,","                                      promiseReject = ((button === NO) || (button === ABORT));","                                if (promiseReject) {","                                    reject(new Error(rejectmessage));","                                }","                                else {","                                    resolve(button);","                                }","                            },","                            null,","                            null,","                            buttons","                        );","                    });","                }","            );","        }","    });","","    Y.Global.ITSADialog = new ITSADialog();","    // now lazyload 'gallery-itsadialogbox'","    Y.later(","        LOADDELAY,","        Y,","        Y.use,","        GALLERY_ITSADIALOGBOX","    );","}","","ITSADialogInstance = Y.Global.ITSADialog;","","/**"," * Pops-up an alert-dialog --> dialog with no input-field and only an 'OK'-button."," *"," * @method Y.alert"," * @param [title] {String} Title on the dialogbox (header)."," * @param message {String} Message to display. (may be the first argument)"," * @param [options] {object}"," * @param [options.type] {String} Determines which dialogbox to pop-up --> null|'message'|'warn'|'error' (null == 'message')"," * @return {Y.Promise}"," * <br />resolve() --> without parameters, no reject."," * @since 0.1","*/","Y.alert = Y.rbind(ITSADialogInstance._alert, ITSADialogInstance);","","/**"," * Pops-up an prompt-dialog --> dialog with input-fields and an 'CANCEL' + 'OK' buttons, or In case of 'login', only an 'OK'-button."," * <br />There are three possible dialog-types:"," * <br /><b>'input'</b> --> one string-field"," * <br /><b>'number'</b> --> one integer-field"," * <br /><b>'login'</b> --> two string-fields - used for username and password (the second field is marked)"," * <br /> which dialogtype to use can be set with 'options.type'."," *"," * @method Y.prompt"," * @param [title] {String} Title on the dialogbox (header)."," * @param message {String} Message to display. (may be the first argument)"," * @param [options] {object}"," * @param [options.type] {String} Determines which dialogbox to pop-up --> null|'input'|'number'|'login' (null == 'input')"," * @param [options.value] {String|number} --> only in case of options.type==='number' or 'input'"," * @param [options.min] {Number} --> only in case of options.type==='number'"," * @param [options.max] {Number} --> only in case of options.type==='number'"," * @param [options.labelUsername] {String} --> only in case of options.type==='login'"," * @param [options.labelPassword] {String} --> only in case of options.type==='login'"," * @param [options.defaultUsername] {String} --> only in case of options.type==='login'"," * @param [options.defaultPassword] {String} --> only in case of options.type==='login'"," * @return {Y.Promise}"," * <br />resolve(response) --> response.value || response.username+response.password."," * <br />reject(reason) --> reason which is always the button 'cancel' being pressed."," * @since 0.1","*/","Y.prompt = Y.rbind(ITSADialogInstance._prompt, ITSADialogInstance);","","/**"," * Pops-up a confirm-dialog --> dialog with no input-field confirm-buttons."," * <br />There are two possible dialog-types:"," * <br /><b>'yesno'</b> --> comes with yes-no buttons"," * <br /><b>'retry'</b> --> comes with abort-ignore-retry buttons"," * <br /> which dialogtype to use can be set with 'options.type'."," *"," * @method Y.confirm"," * @param [title] {String} Title on the dialogbox (header)."," * @param message {String} Message to display. (may be the first argument)"," * @param [options] {object}"," * @param [options.type] {String} Determines which dialogbox to pop-up --> null|'yesno'|'retry' (null == 'yesno')"," * @param [options.defaultBtn] {String} 'yes'|'no'|'abort'|'ignore'|'retry'  (null == 'no'|'retry')"," * @return {Y.Promise}"," * <br />resolve(button) --> button === 'buttonname'."," * <br />reject(reason) --> which is 'not confirmed' (when 'no' pressed using yesno-buttons) OR 'aborted'  (with abort|ignore|retry-buttons)."," * @since 0.1","*/","Y.confirm = Y.rbind(ITSADialogInstance._confirm, ITSADialogInstance);","","}, '@VERSION@', {","    \"requires\": [","        \"yui-base\",","        \"promise\",","        \"event-custom-base\",","        \"yui-later\",","        \"oop\",","        \"gallery-itsamodulesloadedpromise\"","    ]","});"];
_yuitest_coverage["build/gallery-itsadialog/gallery-itsadialog.js"].lines = {"1":0,"3":0,"22":0,"53":0,"55":0,"56":0,"69":0,"73":0,"74":0,"76":0,"77":0,"79":0,"80":0,"82":0,"83":0,"85":0,"86":0,"88":0,"89":0,"91":0,"92":0,"96":0,"98":0,"115":0,"118":0,"119":0,"120":0,"121":0,"123":0,"124":0,"126":0,"129":0,"133":0,"168":0,"171":0,"172":0,"173":0,"174":0,"176":0,"177":0,"178":0,"180":0,"183":0,"184":0,"192":0,"193":0,"194":0,"197":0,"203":0,"211":0,"212":0,"213":0,"216":0,"246":0,"250":0,"251":0,"252":0,"253":0,"255":0,"256":0,"257":0,"258":0,"259":0,"260":0,"261":0,"262":0,"264":0,"265":0,"266":0,"271":0,"272":0,"273":0,"274":0,"275":0,"278":0,"280":0,"283":0,"288":0,"290":0,"291":0,"294":0,"307":0,"309":0,"317":0,"331":0,"358":0,"378":0};
_yuitest_coverage["build/gallery-itsadialog/gallery-itsadialog.js"].functions = {"ITSADialog:53":0,"_getFunction:66":0,"(anonymous 4):132":0,"(anonymous 3):126":0,"(anonymous 2):125":0,"_alert:114":0,"(anonymous 7):190":0,"(anonymous 8):207":0,"(anonymous 6):180":0,"(anonymous 5):179":0,"_prompt:167":0,"(anonymous 11):286":0,"(anonymous 10):280":0,"(anonymous 9):279":0,"_confirm:245":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-itsadialog/gallery-itsadialog.js"].coveredLines = 87;
_yuitest_coverage["build/gallery-itsadialog/gallery-itsadialog.js"].coveredFunctions = 16;
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 1);
YUI.add('gallery-itsadialog', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 3);
'use strict';

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

_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 22);
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
      WARN = 'warn',
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

_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 53);
function ITSADialog() {}

_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 55);
if (!Y.Global.ITSADialog) {
    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 56);
Y.mix(ITSADialog.prototype, {
        /**
         * Returns the proper function of ItsaDialog (gallery-itsadialogbox) to be used.
         *
         * @method _getFunction
         * @param [options] {object}
         * @param [options.type] {String}  Passed by to determine which method of ItsaDialog to be called. Default === 'showMessage'
         * @private
         * @since 0.1
        */
        _getFunction : function(options) {
            // Caution: Y.Global.ItsaDialog is NOT the same as Y.Global.ITSADialog:
            // Y.Global.ItsaDialog is the dialog-widget that comes from gallery-itsadialogbox and uses callback-funcs.
            _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "_getFunction", 66);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 69);
var useFunction,
                  type = options && options.type,
                  ItsaDialog = Y.Global.ItsaDialog;

            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 73);
if (type===WARN) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 74);
useFunction = Y.bind(ItsaDialog.showWARN, ItsaDialog);
            }
            else {_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 76);
if (type===ERROR) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 77);
useFunction = Y.bind(ItsaDialog.showErrorMessage, ItsaDialog);
            }
            else {_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 79);
if (type===YESNO) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 80);
useFunction = Y.bind(ItsaDialog.getConfirmation, ItsaDialog);
            }
            else {_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 82);
if (type===RETRY) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 83);
useFunction = Y.bind(ItsaDialog.getRetryConfirmation, ItsaDialog);
            }
            else {_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 85);
if (type===INPUT) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 86);
useFunction = Y.bind(ItsaDialog.getInput, ItsaDialog);
            }
            else {_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 88);
if (type===NUMBER) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 89);
useFunction = Y.bind(ItsaDialog.getNumber, ItsaDialog);
            }
            else {_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 91);
if (type===LOGIN) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 92);
useFunction = Y.bind(ItsaDialog.getLogin, ItsaDialog);
            }
            else {
                // default
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 96);
useFunction = Y.bind(ItsaDialog.showMessage, ItsaDialog);
            }}}}}}}
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 98);
return useFunction;
        },

        /**
         * Pops-up an alert-dialog --> dialog with no input-field and only an 'OK'-button.
         *
         * @method _alert
         * @param [title] {String} Title on the dialogbox (header).
         * @param message {String} Message to display. (may be the first argument)
         * @param [options] {object}
         * @param [options.type] {String} Determines which dialogbox to pop-up --> null|'message'|'warn'|'error' (null == 'message')
         * @private
         * @return {Y.Promise}
         * <br />resolve() --> without parameters, no reject.
         * @since 0.1
        */
        _alert : function(title, message, options) {
            _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "_alert", 114);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 115);
var instance = this;

            // make it possible to pass 'options' as second argument:
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 118);
if (typeof message === OBJECT) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 119);
options = message;
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 120);
message = title;
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 121);
title = '';
            }
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 123);
options = options || {};
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 124);
return Y.usePromise(GALLERY_ITSADIALOGBOX).then(
                function() {
                    _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 2)", 125);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 126);
return new Y.Promise(function (resolve) {
                        // We cannot use Y.Global.ItsaDialog here, because at render-time, it does not exist
                        // therefore we call an internal function that does exist, which can call Y.Global.ItsaDialog itself.
                        _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 3)", 126);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 129);
instance._getFunction(options)(
                            title,
                            message,
                            function() {
                                _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 4)", 132);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 133);
resolve();
                            }
                        );
                    });
                }
            );
        },

        /**
         * Pops-up an prompt-dialog --> dialog with input-fields and an 'CANCEL' + 'OK' buttons, or In case of 'login', only an 'OK'-button.
         * <br />There are three possible dialog-types:
         * <br /><b>'input'</b> --> one string-field
         * <br /><b>'number'</b> --> one integer-field
         * <br /><b>'login'</b> --> two string-fields - used for username and password (the second field is marked)
         * <br /> which dialogtype to use can be set with 'options.type'.
         *
         * @method _prompt
         * @param [title] {String} Title on the dialogbox (header).
         * @param message {String} Message to display. (may be the first argument)
         * @param [options] {object}
         * @param [options.type] {String} Determines which dialogbox to pop-up --> null|'input'|'number'|'login' (null == 'input')
         * @param [options.value] {String|number} --> only in case of options.type==='number' or 'input'
         * @param [options.min] {Number} --> only in case of options.type==='number'
         * @param [options.max] {Number} --> only in case of options.type==='number'
         * @param [options.labelUsername] {String} --> only in case of options.type==='login'
         * @param [options.labelPassword] {String} --> only in case of options.type==='login'
         * @param [options.defaultUsername] {String} --> only in case of options.type==='login'
         * @param [options.defaultPassword] {String} --> only in case of options.type==='login'
         * @private
         * @return {Y.Promise}
         * <br />resolve(response) --> response.value || response.username+response.password.
         * <br />reject(reason) --> reason which is always the button 'cancel' being pressed.
         * @since 0.1
        */
        _prompt : function(title, message, options) {
            _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "_prompt", 167);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 168);
var instance = this;

            // make it possible to pass 'options' as second argument:
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 171);
if (typeof message === OBJECT) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 172);
options = message;
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 173);
message = title;
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 174);
title = '';
            }
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 176);
options = options || {};
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 177);
options.type = options.type || INPUT;
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 178);
return Y.usePromise(GALLERY_ITSADIALOGBOX).then(
                function() {
                    _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 5)", 179);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 180);
return new Y.Promise(function (resolve, reject) {
                        // We cannot use Y.Global.ItsaDialog here, because at render-time, it does not exist
                        // therefore we call an internal function that does exist, which can call Y.Global.ItsaDialog itself.
                        _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 6)", 180);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 183);
if (options.type===NUMBER) {
                            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 184);
instance._getFunction(options)(
                                title,
                                message,
                                options.value || '',
                                options.min,
                                options.max,
                                function(e) {
                                    // callback function
                                    _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 7)", 190);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 192);
var promiseReject = (e.buttonName === CANCEL);
                                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 193);
if (promiseReject) {
                                        _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 194);
reject(new Error('input cancelled'));
                                    }
                                    else {
                                        _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 197);
resolve(e);
                                    }
                                }
                            );
                        }
                        else {
                            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 203);
instance._getFunction(options)(
                                title,
                                message,
                                (options.type===INPUT) ? (options.value || '') : options,
                                function(e) {
                                    // callback function.
                                    // In case of 'input' --> only e.value is present
                                    // In case of 'login' --> e.username, e.password and e.savechecked are present
                                    _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 8)", 207);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 211);
var promiseReject = (e.buttonName === CANCEL);
                                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 212);
if (promiseReject) {
                                        _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 213);
reject(new Error('input cancelled'));
                                    }
                                    else {
                                        _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 216);
resolve(e);
                                    }
                                }
                            );
                        }
                    });
                }
            );
        },

        /**
         * Pops-up a confirm-dialog --> dialog with no input-field confirm-buttons.
         * <br />There are two possible dialog-types:
         * <br /><b>'yesno'</b> --> comes with yes-no buttons
         * <br /><b>'retry'</b> --> comes with abort-ignore-retry buttons
         * <br /> which dialogtype to use can be set with 'options.type'.
         *
         * @method _confirm
         * @param [title] {String} Title on the dialogbox (header).
         * @param message {String} Message to display. (may be the first argument)
         * @param [options] {object}
         * @param [options.type] {String} Determines which dialogbox to pop-up --> null|'yesno'|'retry' (null == 'yesno')
         * @param [options.defaultBtn] {String} 'yes'|'no'|'abort'|'ignore'|'retry'  (null == 'no'|'retry')
         * @private
         * @return {Y.Promise}
         * <br />resolve(button) --> button === 'buttonname'.
         * <br />reject(reason) --> which is 'not confirmed' (when 'no' pressed using yesno-buttons) OR 'aborted'  (with abort|ignore|retry-buttons).
         * @since 0.1
        */
        _confirm : function(title, question, options) {
            _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "_confirm", 245);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 246);
var instance = this,
                  buttons, rejectmessage;

            // make it possible to pass 'options' as second argument:
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 250);
if (typeof message === OBJECT) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 251);
options = question;
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 252);
question = title;
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 253);
title = '';
            }
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 255);
options = options || {};
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 256);
options.type = options.type || YESNO;
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 257);
if (options.type===RETRY) {
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 258);
buttons = CONFIRMATION_RETRY_BUTTONS;
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 259);
rejectmessage = 'aborted';
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 260);
if (options.defaultBtn===ABORT) {
                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 261);
buttons.footer[0].isDefault = true;
                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 262);
buttons.footer[2].isDefault = false;
                }
                else {_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 264);
if (options.defaultBtn==='ignore') {
                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 265);
buttons.footer[1].isDefault = true;
                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 266);
buttons.footer[2].isDefault = false;
                }}
            }
            else {
                // 'yesno'
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 271);
buttons =  CONFIRMATION_BUTTONS;
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 272);
rejectmessage = 'not confirmed';
                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 273);
if (options.defaultBtn===YES) {
                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 274);
buttons.footer[0].isDefault = false;
                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 275);
buttons.footer[1].isDefault = true;
                }
            }
            _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 278);
return Y.usePromise(GALLERY_ITSADIALOGBOX).then(
                function() {
                    _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 9)", 279);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 280);
return new Y.Promise(function (resolve, reject) {
                        // We cannot use Y.Global.ItsaDialog here, because at render-time, it does not exist
                        // therefore we call an internal function that does exist, which can call Y.Global.ItsaDialog itself.
                        _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 10)", 280);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 283);
instance._getFunction(options)(
                            title,
                            question,
                            function(e) {
                                // callback function
                                _yuitest_coverfunc("build/gallery-itsadialog/gallery-itsadialog.js", "(anonymous 11)", 286);
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 288);
var button = e.buttonName,
                                      promiseReject = ((button === NO) || (button === ABORT));
                                _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 290);
if (promiseReject) {
                                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 291);
reject(new Error(rejectmessage));
                                }
                                else {
                                    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 294);
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

    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 307);
Y.Global.ITSADialog = new ITSADialog();
    // now lazyload 'gallery-itsadialogbox'
    _yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 309);
Y.later(
        LOADDELAY,
        Y,
        Y.use,
        GALLERY_ITSADIALOGBOX
    );
}

_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 317);
ITSADialogInstance = Y.Global.ITSADialog;

/**
 * Pops-up an alert-dialog --> dialog with no input-field and only an 'OK'-button.
 *
 * @method Y.alert
 * @param [title] {String} Title on the dialogbox (header).
 * @param message {String} Message to display. (may be the first argument)
 * @param [options] {object}
 * @param [options.type] {String} Determines which dialogbox to pop-up --> null|'message'|'warn'|'error' (null == 'message')
 * @return {Y.Promise}
 * <br />resolve() --> without parameters, no reject.
 * @since 0.1
*/
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 331);
Y.alert = Y.rbind(ITSADialogInstance._alert, ITSADialogInstance);

/**
 * Pops-up an prompt-dialog --> dialog with input-fields and an 'CANCEL' + 'OK' buttons, or In case of 'login', only an 'OK'-button.
 * <br />There are three possible dialog-types:
 * <br /><b>'input'</b> --> one string-field
 * <br /><b>'number'</b> --> one integer-field
 * <br /><b>'login'</b> --> two string-fields - used for username and password (the second field is marked)
 * <br /> which dialogtype to use can be set with 'options.type'.
 *
 * @method Y.prompt
 * @param [title] {String} Title on the dialogbox (header).
 * @param message {String} Message to display. (may be the first argument)
 * @param [options] {object}
 * @param [options.type] {String} Determines which dialogbox to pop-up --> null|'input'|'number'|'login' (null == 'input')
 * @param [options.value] {String|number} --> only in case of options.type==='number' or 'input'
 * @param [options.min] {Number} --> only in case of options.type==='number'
 * @param [options.max] {Number} --> only in case of options.type==='number'
 * @param [options.labelUsername] {String} --> only in case of options.type==='login'
 * @param [options.labelPassword] {String} --> only in case of options.type==='login'
 * @param [options.defaultUsername] {String} --> only in case of options.type==='login'
 * @param [options.defaultPassword] {String} --> only in case of options.type==='login'
 * @return {Y.Promise}
 * <br />resolve(response) --> response.value || response.username+response.password.
 * <br />reject(reason) --> reason which is always the button 'cancel' being pressed.
 * @since 0.1
*/
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 358);
Y.prompt = Y.rbind(ITSADialogInstance._prompt, ITSADialogInstance);

/**
 * Pops-up a confirm-dialog --> dialog with no input-field confirm-buttons.
 * <br />There are two possible dialog-types:
 * <br /><b>'yesno'</b> --> comes with yes-no buttons
 * <br /><b>'retry'</b> --> comes with abort-ignore-retry buttons
 * <br /> which dialogtype to use can be set with 'options.type'.
 *
 * @method Y.confirm
 * @param [title] {String} Title on the dialogbox (header).
 * @param message {String} Message to display. (may be the first argument)
 * @param [options] {object}
 * @param [options.type] {String} Determines which dialogbox to pop-up --> null|'yesno'|'retry' (null == 'yesno')
 * @param [options.defaultBtn] {String} 'yes'|'no'|'abort'|'ignore'|'retry'  (null == 'no'|'retry')
 * @return {Y.Promise}
 * <br />resolve(button) --> button === 'buttonname'.
 * <br />reject(reason) --> which is 'not confirmed' (when 'no' pressed using yesno-buttons) OR 'aborted'  (with abort|ignore|retry-buttons).
 * @since 0.1
*/
_yuitest_coverline("build/gallery-itsadialog/gallery-itsadialog.js", 378);
Y.confirm = Y.rbind(ITSADialogInstance._confirm, ITSADialogInstance);

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
