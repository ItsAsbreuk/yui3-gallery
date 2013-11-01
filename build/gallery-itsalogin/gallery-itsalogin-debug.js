YUI.add('gallery-itsalogin', function (Y, NAME) {

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

var ITSAMessageControllerClass = Y.ITSAMessageControllerClass,
    ITSAMessageControllerInstance,
    Lang = Y.Lang,
    YIntl = Y.Intl,
    BOOLEAN = 'boolean',
    INFO = 'info',
    UNDERSCORE = '_',
    OGIN = 'ogin',
    LOGIN = 'l'+OGIN,
    GET_LOGIN = 'getL'+OGIN,
    APP = 'application',
    ICONDIALOG = 'itsaicon-dialog-',
    ICON_INFO = ICONDIALOG+INFO,
    ICON_QUESTION = ICONDIALOG+'question',
    USERNAME = 'username',
    PASSWORD = 'password',
    FORGOT = 'forgot',
    STAYLOGGEDIN = 'stayloggedin',
    GALLERYITSALOGIN = 'gallery-itsalogin';

/**
  * Translates the given 'text; through Y.Int of this module. Possible text's that can be translated are:
  * <ul>
  *   <li>login</li>
  *   <li>enterlogin</li>
  *   <li>forgot</li>
  *   <li>stayloggedin</li>
  *   <li>remember</li>
  *   <li>rememberme</li>
  *   <li>username</li>
  *   <li>password</li>
  *   <li>forgotlogin</li>
  *   <li>forgotusernameorpassword</li>
  *   <li>forgotusername</li>
  *   <li>forgotpassword</li>
  *   <li>resetpassword</li>
  *   <li>forgotwhat</li>
  *   <li>entersignupaddress</li>
  *   <li>retrievepasswordinstructions</li>
  * </ul>
  *
  * @method translate
  * @param text {String} the text to be translated
  * @return {String} --> Translated text or the original text (if no translattion was possible)
  * @since 0.1
**/
ITSAMessageControllerClass.prototype.translate = function(text) {
    Y.log('translate', 'info', 'ITSA-Login');
    return this._intl[text] || text;
};

/**
  * Translates the given 'text; through Y.Int of this module. Possible text's that can be translated are:
  * <ul>
  *   <li>login</li>
  *   <li>enterlogin</li>
  *   <li>forgot</li>
  *   <li>stayloggedin</li>
  *   <li>remember</li>
  *   <li>rememberme</li>
  *   <li>username</li>
  *   <li>password</li>
  *   <li>forgotlogin</li>
  *   <li>forgotusernameorpassword</li>
  *   <li>forgotusername</li>
  *   <li>forgotpassword</li>
  *   <li>resetpassword</li>
  *   <li>forgotwhat</li>
  *   <li>entersignupaddress</li>
  *   <li>retrievepasswordinstructions</li>
  * </ul>
  *
  * @method translatePromise
  * @static
  * @param text {String} the text to be translated
  * @return {Y.Promise} resolve(translated) --> Translated text or the original text (if no translattion was possible)
  * @since 0.1
**/
ITSAMessageControllerClass.translatePromise = function(text) {
    Y.log('translatePromise', 'info', 'ITSA-Login');
    return Y.usePromise('intl').then(
        function() {
            var intl = YIntl.get(GALLERYITSALOGIN);
            return intl[text] || text;
        },
        function() {
            return text;
        }
    );
};
ITSAMessageControllerClass.prototype.translatePromise = ITSAMessageControllerClass.translatePromise;

ITSAMessageControllerClass.prototype[UNDERSCORE+GET_LOGIN] = function(title, message, config, sync) {
    var instance = this,
        intl = instance._intl,
        params = instance._retrieveLoginParams(title, message, config, sync),
        MyITSAMessage, MyForgotMessage, formconfigUsername, formconfigPassword, formconfigRemember, syncPromise, regain,
        imageButtons, footer, primaryButton, forgotButton, formconfigForgotEmail, regainUsernameOrPassword, regainPassword;
    title = params.title;
    message = params.message;
    config = params.config;
    syncPromise = params.syncPromise;

    primaryButton = 'btn_submit';
    imageButtons = (typeof config.imageButtons === BOOLEAN) && config.imageButtons;
    regain = config.regain;
    forgotButton = ((typeof config.forgotButton === BOOLEAN) && config.forgotButton) || regain;
    footer = (forgotButton ? '{btn_forgot}' : '') + '{btn_submit}';
/*jshint expr:true */
    if (imageButtons) {
        footer = footer.replace(/\{btn_/g,'{imgbtn_');
        primaryButton = primaryButton.replace(/btn_/g,'imgbtn_');
    }
/*jshint expr:false */

    // setting config for username:
    formconfigUsername = config.formconfigUsername || {};
/*jshint expr:true */
    formconfigUsername.label || formconfigUsername.placeholder || (formconfigUsername.label=intl[USERNAME]);
/*jshint expr:false */
    formconfigUsername.fullselect = true;
    formconfigUsername.primarybtnonenter = false;
    formconfigUsername.classname = 'itsa-login' + (formconfigUsername.classname ? ' '+formconfigUsername.classname : '');
    formconfigUsername.required = true;

    // setting config for password:
    formconfigPassword = config.formconfigPassword || {};
/*jshint expr:true */
    formconfigPassword.label || formconfigPassword.placeholder || (formconfigPassword.label=intl[PASSWORD]);
/*jshint expr:false */
    formconfigPassword.fullselect = true;
    formconfigPassword.primarybtnonenter = true;
    formconfigPassword.classname = 'itsa-login' + (formconfigPassword.classname ? ' '+formconfigPassword.classname : '');
    formconfigPassword.required = true;

    // setting config for remember:
    formconfigRemember = config.formconfigRemember || {};
/*jshint expr:true */
    formconfigUsername.label && !formconfigPassword.label && (formconfigPassword.label = ' ');
    formconfigPassword.label && !formconfigUsername.label && (formconfigUsername.label = ' ');
    formconfigRemember.label || (formconfigRemember.label=intl[STAYLOGGEDIN]);
/*jshint expr:false */
    formconfigRemember.switchlabel = true;


    return instance.readyPromise().then(
        function() {
            var itsamessage, forgotMessage;
            MyITSAMessage = Y.Base.create('itsamessageinput', Y.ITSAMessage, [], null, {
                                  ATTRS: {
                                      username: {
                                          value: formconfigUsername.value || '',
                                          formtype: 'text',
                                          formconfig: formconfigUsername,
                                          validator: config.validatorUsername,
                                          validationerror: config.validationerrorUsername
                                      },
                                      password: {
                                          value: formconfigPassword.value || '',
                                          formtype: PASSWORD,
                                          formconfig: formconfigPassword,
                                          validator: config.validatorPassword,
                                          validationerror: config.validationerrorPassword
                                      },
                                      remember: {
                                          value: formconfigRemember.value || false,
                                          formtype: Y.ITSACheckbox,
                                          formconfig: formconfigRemember
                                      }
                                  }
                              });
            message = '<span id="itsa-messagewrapper">' + message + '</span>'+
                      '<fieldset class="'+'itsa-login'+'">'+
                           '<div class="pure-control-group">{'+USERNAME+'}</div>'+
                           '<div class="pure-control-group">{'+PASSWORD+'}</div>'+
                           '<div class="itsa-login-checkbox">{remember}</div>'+
                      '</fieldset>';
            itsamessage = new MyITSAMessage();
            itsamessage.syncPromise = syncPromise;
            itsamessage.icon = config.icon || ICON_INFO;
            itsamessage.target = 'itsadialog'; // widgetname that should handle this message
            itsamessage.title = title;
            itsamessage.message = message;
            itsamessage.footer = footer;
            itsamessage.imageButtons = imageButtons;
            itsamessage.closeButton = true;
            itsamessage.primaryButton = config.primaryButton || primaryButton; // config.primaryButton should overrule primaryButton
            itsamessage.timeoutReject = config.timeoutReject;
            itsamessage.level = config.level || INFO; // config.level should overrule the param level; config.type is for backwards compatibility
            itsamessage.source = config.source || APP;
            itsamessage.messageType = GET_LOGIN;
            itsamessage.buttonLabels = [
                {buttonType: 'btn_submit', labelHTML: intl[LOGIN]},
                {buttonType: 'imgbtn_submit', labelHTML: '<i class="itsaicon-dialog-login"></i>'+intl[LOGIN]}
            ];
            // Next: if the user want a 'forgot-button' then set it up
            if (forgotButton) {
                // first an extra button for itsamessage on the first dialog:
                formconfigForgotEmail = config.formconfigForgotEmail || {};
                itsamessage.customBtns=[
                    {
                        buttonId: 'btn_forgot',
                        labelHTML: intl[FORGOT],
                        config: {
                            value: 'forgot',
                            data: 'data-itsalogin="forgotbutton"'
                        }
                    },
                    {
                        buttonId: 'imgbtn_forgot',
                        labelHTML: '<i class="itsaicon-dialog-question"></i>'+intl[FORGOT],
                        config: {
                            value: 'forgot',
                            data: 'data-itsalogin="forgotbutton"',
                            classname: 'itsabutton-iconleft'
                        }
                    }
                ];
                regainUsernameOrPassword = (regain===USERNAME+'or'+PASSWORD);
                regainPassword = (regain===PASSWORD);
                // now create a second messageobject that holds the 'forgot-config', as strored inside itsamessage.forgotMessage
                if (regainUsernameOrPassword) {
                    MyForgotMessage = Y.Base.create('itsamessageforgot', Y.ITSAMessage, [], null, {
                                          ATTRS: {
                                              emailaddress: {
                                                  formtype: 'email',
                                                  formconfig: Y.merge(formconfigForgotEmail, {required: true})
                                              },
                                              username: {
                                                  formtype: 'text',
                                                  formconfig: Y.merge(formconfigUsername, {required: true}),
                                                  validator: config.validatorUsername,
                                                  validationerror: config.validationerrorUsername
                                              }
                                          }
                                      });
                    message = '<form>'+
                              (config.forgotMessage || intl[FORGOT+'what']) +
                              '<div class="itsa-dialog-forgotbutton itsadialog-firstbutton">{btn_'+FORGOT+USERNAME+'}</div>'+
                              '<div class="itsa-dialog-forgotbutton">{btn_'+FORGOT+PASSWORD+'}</div>'+
                              '</form>';
                    forgotMessage = new MyForgotMessage();
                    forgotMessage.icon = config.iconquestion || ICON_QUESTION;
                    forgotMessage.title = config.titleForgotUsernameOrPassword || intl[FORGOT+USERNAME+'or'+PASSWORD];
                    forgotMessage.message = message;
                    forgotMessage.closeButton = true;
        /*jshint expr:true */
                    forgotMessage.customBtns=[
                        {
                            buttonId: 'btn_'+FORGOT+USERNAME,
                            labelHTML: intl[FORGOT+USERNAME],
                            config: {
                                value: FORGOT+USERNAME
                            }
                        },
                        {
                            buttonId: 'btn_'+FORGOT+PASSWORD,
                            labelHTML: intl[FORGOT+PASSWORD],
                            config: {
                                value: FORGOT+PASSWORD
                            }
                        }
                    ];
        /*jshint expr:false */
                }
                itsamessage.forgotMessage = forgotMessage;
            }
            return instance.queueMessage(itsamessage);
        }
    );
};

ITSAMessageControllerClass.prototype._retrieveLoginParams = function(title, message, config, syncPromise) {
    var withTitle = (typeof message === 'string'),
        withMessage, withConfig;
    if (!withTitle) {
        syncPromise = config;
        config = message;
        message = title;
        title = null;
    }
    withMessage = (typeof message === 'string');
    if (!withMessage) {
        syncPromise = config;
        config = message;
        message = '';
        title = null;
    }
    withConfig = (Lang.isObject(config));
    if (!withConfig) {
        syncPromise = config;
        config = {};
        message = '';
        title = null;
    }
    // when no syncPromise is defined, we need to reject the syncpromise.
/*jshint expr:true */
    (typeof syncPromise === 'function') || (syncPromise=function() {
        return new Y.Promise(function (resolve, reject) {
            reject(new Error('no syncPromise defined'));
        });
    });
/*jshint expr:false */
    return {
        title: title,
        message: message,
        config: config,
        syncPromise: syncPromise
    };
};

ITSAMessageControllerInstance = Y.ITSAMessageController;
/**
 * Internal objects with internationalized buttonlabels
 *
 * @property _intl
 * @private
 * @type Object
*/
ITSAMessageControllerInstance._intl = YIntl.get(GALLERYITSALOGIN);
Y[LOGIN] = Y.bind(ITSAMessageControllerInstance[UNDERSCORE+GET_LOGIN], ITSAMessageControllerInstance);

}, '@VERSION@', {
    "requires": [
        "yui-base",
        "intl",
        "gallery-itsamessagecontroller",
        "gallery-itsacheckbox",
        "gallery-itsadialog",
        "gallery-itsamessage",
        "gallery-itsaviewmodelpanel",
        "gallerycss-itsa-base",
        "gallerycss-itsa-animatespin",
        "gallerycss-itsa-dialog"
    ],
    "lang": [
        "ar",
        "bg",
        "bs",
        "cs",
        "da",
        "de",
        "en",
        "es",
        "fa",
        "fi",
        "fr",
        "he",
        "hi",
        "hr",
        "hu",
        "it",
        "ja",
        "nb",
        "nl",
        "pl",
        "pt",
        "ru",
        "sk",
        "sr",
        "sv",
        "uk",
        "zh"
    ],
    "skinnable": true
});
