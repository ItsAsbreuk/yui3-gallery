'use strict';

/*jshint maxlen:200 */

/**
 *
 * View ITSAViewLogin
 *
 *
 * @module gallery-itsaviewlogin
 * @extends ITSAViewModel
 * @class ITSAViewLogin
 * @constructor
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://itsasbreuk.nl</i>
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/


//===============================================================================================
//
// Next we create the view
//
//===============================================================================================
var Lang = Y.Lang,
    LOADTIMEOUT = 500, // for loading gallery-itsalogin (in case compressed===true)
    ICON = 'icon',
    MESSAGE = 'message',
    MODEL = 'model',
    FORMCONFIG = 'formconfig',
    VALIDATOR = 'validator',
    VALIDATIONERROR = 'validationerror',
    MAIL = 'mail',
    EMAIL = 'e'+MAIL,
    ADDRESS = 'address',
    EMAILADDRESS = EMAIL+ADDRESS,
    BUTTON = 'button',
    PRIMARYBTNONENTER = 'primarybtnonenter',
    FULLSELECT = 'fullselect',
    REQUIRED = 'required',
    LOGGED = 'logged',
    LOGGEDIN = LOGGED+'in',
    LOGGEDOUT = LOGGED+'out',
    COMPRESSED = 'compressed',
    STAYLOGGEDIN = 'stay'+LOGGEDIN,
    SERNAME = 'sername',
    ASSWORD = 'assword',
    EMEMBER = 'emember',
    USERNAME = 'u'+SERNAME,
    PASSWORD = 'p'+ASSWORD,
    REMEMBER = 'r'+EMEMBER,
    CAP_USERNAME = 'U'+SERNAME,
    CAP_PASSWORD = 'P'+ASSWORD,
    CAP_REMEMBER = 'R'+EMEMBER,
    USERNAMEISEMAIL = USERNAME+'IsEmail',
    SYNC = 'sync',
    ITSA = 'itsa',
    OGIN = 'ogin',
    OGOUT = 'ogout',
    GET = 'get',
    MESSAGELOGGEDIN = 'messageLoggedin',
    CAP_GETLOGIN = GET+'L'+OGIN,
    LOGIN = 'l'+OGIN,
    LOGOUT = 'l'+OGOUT,
    ICONLOGIN = ICON+'L'+OGIN,
    ICONLOGOUT = ICON+'L'+OGOUT,
    GETLOGIN = GET+LOGIN,
    ITSA_LOGIN = ITSA+'-'+LOGIN,
    TEMPLATE = 'Template',
    LOGINTEMPLATE = LOGIN+TEMPLATE,
    LOGOUTTEMPLATE = LOGOUT+TEMPLATE,
    LABEL = 'label',
    PLACEHOLDER = 'placeholder',
    CLASSNAME = 'classname',
    SPANWRAPPER = '<span class="itsa-messagewrapper">',
    SPANBUTTONWRAPPER = '<span class="itsa-buttonwrapper itsa-buttonwrappersize-{size}">',
    FIELDSET_START = '<fieldset class="'+ITSA_LOGIN+'">',
    ENDSPAN = '</span>',
    DIVCLASS_PURECONTROLGROUP = '<div class="pure-control-group">',
    DIVCLASS_PURECONTROLS = '<div class="pure-controls">',
    DIVCLASS_ITSA = '<div class="itsa-',
    ENDFIELDSET = '</fieldset>',
    ENDDIV = '</div>',
    ERROR = 'error',
    CHANGE = 'Change',
    OBJECT = 'object',
    STRING = 'string',
    BOOLEAN = 'boolean',
    FUNCTION = 'function',
    CREATE = 'create',
    CCOUNT = 'ccount',
    IMG = 'img',
    SUBMIT = 'submit',
    FORGOT = 'forgot',
    BTN_ = 'btn_',
    BTNSUBMIT = BTN_+SUBMIT,
    IMGBTN_ = IMG+BTN_,
    CREATEACCOUNT = CREATE+'a'+CCOUNT,
    BTN_CREATEACCOUNT = 'btn_'+CREATEACCOUNT,
    CAP_CREATEACCOUNT = CREATE+'A'+CCOUNT,
    REGAIN = 'regain',
    USERNAMEORPASSWORD = USERNAME+'or'+PASSWORD,
    FORGOT_USERNAME = FORGOT+USERNAME,
    FORGOT_PASSWORD = FORGOT+PASSWORD,
    DIALOG = 'dialog',
    DESTROYED = 'destroyed',
    IMAGEBUTTONS = 'imageButtons',
    ICONTEMPLATE = '<i class="itsa-mainicon {icon} itsa-iconsize-{size}"></i>',
    ITSABUTTON_ICONLEFT = ITSA+'button-iconleft',
    TEXTBOTTOM_CLASS = ITSA+'button-textbottom',
    I_CLASS_ITSADIALOG = '<i class="itsaicon-'+DIALOG,
    CONTAINER = 'container',
    SMALL = 'small',
    LARGE = 'large',
    GALLERY = 'gallery',
    GALLERYCSS = GALLERY+'css-itsa-',
    GALLERYCSS_DIALOG = GALLERYCSS+DIALOG,
    GALLERYCSS_FORM = GALLERYCSS+'form',
    GALLERYCSS_ANIMATESPIN = GALLERYCSS+'animatespin',
    GALLERYITSAI18NLOGIN = GALLERY+'-'+ITSA+'-i18n-login',
    GALLERYITSADIALOG = GALLERY+'-'+ITSA+DIALOG,
    GALLERYITSALOGIN = GALLERY+'-'+ITSA+LOGIN,
    ITSAVIEWLOGIN = ITSA+'view'+LOGIN,
    ITSAVIEWLOGIN_LOGGEDIN = ITSAVIEWLOGIN+'-'+LOGGED+'in',
    ITSAVIEWLOGIN_LOGGEDOUT = ITSAVIEWLOGIN+'-'+LOGGED+'out',
    PARSED = function (response) {
        if (typeof response === 'string') {
            try {
                return Y.JSON.parse(response);
            } catch (ex) {
                this.fire(ERROR, {
                    error   : ex,
                    response: response,
                    src     : 'parse'
                });
                return {};
            }
        }
        return response || {};
    };


function ITSAViewLogin() {
    ITSAViewLogin.superclass.constructor.apply(this, arguments);
}

ITSAViewLogin.NAME = 'itsaviewlogin';

Y.ITSAViewLogin = Y.extend(ITSAViewLogin, Y.ITSAViewModel, {}, {
    ATTRS: {
        /**
         * Whether to use the compressed templates
         *
         * @attribute compressed
         * @type {Boolean}
         * @default true
         * @since 0.1
         */
        compressed: {
            value: true,
            validator: function(v) {
                return (typeof v === BOOLEAN);
            },
            initOnly: true
        },
        /**
         * Need to be a function that returns a new Promise. Should internally generate a Y.ITSAMessageController.queueMessage with level==='warn'.
         * See the examples how this works.
         *
         * @attribute createAccount
         * @type {function}
         * @default null
         * @since 0.1
         */
        createAccount: {
            value: null,
            validator: function(v) {
                return (typeof v === FUNCTION);
            }
        },
        /**
         * Makes the View to render the editable-version of the Model. Only when the Model has <b>Y.Plugin.ITSAEditModel</b> plugged in.
         *
         * @attribute editable
         * @type {Boolean}
         * @default false
         * @since 0.1
         */
        editable: {
            value: true,
            readOnly: true
        },
        /**
         * The configobject that passes through to model.password during initialization.
         *
         * @attribute formconfigPassword
         * @type {Object}
         * @default {}
         * @since 0.1
         */
        formconfigPassword: {
            value: {},
            validator: function(v) {
                return (typeof v === OBJECT);
            },
            initOnly: true
        },
        /**
         * The configobject that passes through to model.remember during initialization.
         *
         * @attribute formconfigRemember
         * @type {Object}
         * @default {}
         * @since 0.1
         */
        formconfigRemember: {
            value: {},
            validator: function(v) {
                return (typeof v === OBJECT);
            },
            initOnly: true
        },
        /**
         * The configobject that passes through to model.username during initialization.
         *
         * @attribute formconfigUsername
         * @type {Object}
         * @default {}
         * @since 0.1
         */
        formconfigUsername: {
            value: {},
            validator: function(v) {
                return (typeof v === OBJECT);
            },
            initOnly: true
        },
        /**
         * Main icon created inside the loginview - above the fromfields, next to 'message'
         *
         * @attribute iconLogin
         * @type {String}
         * @default null
         * @since 0.1
         */
        iconLogin: {
            value: null,
            validator: function(v) {
                return (v===null) || (typeof v === STRING);
            }
        },
        /**
         * Main icon created inside the logoutview - above the fromfields, next to 'message'
         *
         * @attribute iconLogout
         * @type {String}
         * @default null
         * @since 0.1
         */
        iconLogout: {
            value: null,
            validator: function(v) {
                return (v===null) || (typeof v === STRING);
            }
        },
        /**
         * Whether to have imagebuttons
         *
         * @attribute imageButtons
         * @type {Boolean}
         * @default false
         * @since 0.1
         */
        imageButtons: {
            value: false,
            validator: function(v) {
                return (typeof v === BOOLEAN);
            },
            initOnly: true
        },
        /**
         * Set this for a custom logintemplate. Make sure it has {username}, {password}, {btn_submit}.<br>
         * Optional you could may use {btn_createaccount} and {btn_forgot}.<br>
         * By setting this attribute, you overrule the default logintemplate.
         *
         * @attribute loginTemplate
         * @type {String}
         * @default null
         * @since 0.1
         */
        loginTemplate: {
            value: null,
            validator: function(v) {
                return (v===null) || (typeof v === STRING);
            }
        },
        /**
         * Set this for a custom logouttemplate. Make sure it has {btn_submit}.<br>
         * By setting this attribute, you overrule the default logouttemplate.
         *
         * @attribute logoutTemplate
         * @type {String}
         * @default null
         * @since 0.1
         */
        logoutTemplate: {
            value: null,
            validator: function(v) {
                return (v===null) || (typeof v === STRING);
            }
        },
        /**
         * Message that appears above the formfields.
         *
         * @attribute message
         * @type {String}
         * @default null
         * @since 0.1
         */
        message: {
            value: null,
            validator: function(v) {
                return (typeof v === STRING);
            }
        },
        /**
         * Message that appears in the view when logged in. Can be set by the server when the server responses with {status: 'OK', messageLoggedin: 'your message'}
         *
         * @attribute messageLoggedin
         * @type {String}
         * @default null
         * @since 0.1
         */
        messageLoggedin: {
            value: null,
            validator: function(v) {
                return (typeof v === STRING);
            }
        },
        /**
         * The Y.Model that will be rendered in the view. May also be an Object, which is handy in case the source is an
         * item of a Y.LazyModelList. If you pass a String-value, then the text is rendered as it is, assuming no model-instance.
         *
         * @attribute model
         * @type {Y.Model|Object|String}
         * @default {}
         * @since 0.1
         */
        model: {
            readOnly: true
        },
        /**
         * Flag that indicates whether this instance is part of multiple views. Should normally left true.
         * ITSAViewModelPanel sets this to 'false' because it has instances inside the body and footer.
         * When set false, the functionality of locking the view (when needed) is set of and should be done by the parentwidget.
         *
         * @attribute partOfMultiView
         * @type {Boolean}
         * @default true
         * @since 0.1
         */
        partOfMultiView: {
            value: false,
            readOnly: true
        },
        /**
         * Password that passes through to the underlying model.
         *
         * @attribute password
         * @type {String}
         * @default ''
         * @since 0.1
         */
        password: {
            value: ''
        },
        /**
         * Set this attribute to make it possible to regain username or password. Should be either 'usernameorpassword' || 'username' || 'password'.
         *
         * @attribute regain
         * @type {String}
         * @default null
         * @since 0.1
         */
        regain: {
            value: null,
            validator: function(v) {
                return (v===null) || (v===USERNAMEORPASSWORD) || (v===USERNAME) || (v===PASSWORD);
            },
            initOnly: true
        },
        /**
         * Value of 'remember' that passes through to the underlying model.
         *
         * @attribute remember
         * @type {Boolean}
         * @default false
         * @since 0.1
         */
        remember: {
            value: false
        },
        /**
         * Whether to show the 'stay logged in' checkbox.
         *
         * @attribute showStayLoggedin
         * @type {Boolean}
         * @default false
         * @since 0.1
         */
        showStayLoggedin: {
            value: false,
            initOnly: true
        },
        /**
         * Reference to the synclayer. Should be a function that returns a Y.Promise. Best way is to set up the synclayer using gallery-io-utils.
         *
         * @attribute sync
         * @type {Function}
         * @default null
         * @since 0.1
         */
        sync: {
            value: null,
            validator: function(v) {
                return (typeof v === FUNCTION);
            }
        },
       /**
        * Template for the bodysection to render the Model. The attribute MUST be a template that can be processed by either <i>Y.Lang.sub or Y.Template.Micro</i>,
        * where Y.Lang.sub is more lightweight. If you use Y.ITSAFormModel as 'model' and 'editable' is set true, be aware that all property-values are <u>html-strings</u>.
        * Should you templating with micro-templates <b>you need to look for the docs</b> what is the right way to do.
        *
        * <u>If you set this attribute after the view is rendered, the view will be re-rendered.</u>
        *
        * @attribute template
        * @type {String}
        * @default null
        * @since 0.1
        */
        template: {
            readOnly: true,
            getter: '_getterTempl'
        },
        /**
         * Username that passes through to the underlying model.
         *
         * @attribute username
         * @type {String}
         * @default ''
         * @since 0.1
         */
        username: {
            value: ''
        },
        /**
         * Whether an emailaddress is used as username. This will activate the email-pattern validation.
         *
         * @attribute usernameIsEmail
         * @type {Boolean}
         * @default false
         * @since 0.1
         */
        usernameIsEmail: {
            value: false,
            initOnly: true
        },
        /**
         * The validationerror that passes through to model.password during initialization.
         *
         * @attribute validationerrorPassword
         * @type {String}
         * @default null
         * @since 0.1
         */
        validationerrorPassword: {
            value: null,
            validator: function(v) {
                return (v===null) || (typeof v === STRING);
            },
            initOnly: true
        },
        /**
         * The validationerror that passes through to model.username during initialization.
         *
         * @attribute validationerrorUsername
         * @type {String}
         * @default null
         * @since 0.1
         */
        validationerrorUsername: {
            value: null,
            validator: function(v) {
                return (v===null) || (typeof v === STRING);
            },
            initOnly: true
        },
        /**
         * The validator that passes through to model.password during initialization.
         *
         * @attribute validatorPassword
         * @type {String}
         * @default null
         * @since 0.1
         */
        validatorPassword: {
            value: null,
            validator: function(v) {
                return (v===null) || (typeof v === FUNCTION);
            },
            initOnly: true
        },
        /**
         * The validator that passes through to model.username during initialization.
         *
         * @attribute validatorUsername
         * @type {String}
         * @default null
         * @since 0.1
         */
        validatorUsername: {
            value: null,
            validator: function(v) {
                return (v===null) || (typeof v === FUNCTION);
            },
            initOnly: true
        }
    }
});

/**
 * @method initializer
 * @protected
 * @since 0.1
*/
ITSAViewLogin.prototype.setSubmitButtons = function(login) {
    Y.log('initializer', 'info', 'ITSAViewLogin');
    var instance = this,
        logging = login ? LOGIN : LOGOUT,
        loginintl = instance._loginintl;

    if (instance.get(IMAGEBUTTONS)) {
    /*jshint expr:true */
        instance._loggedin ? instance.removePrimaryButton() : instance.setPrimaryButton(IMGBTN_+SUBMIT);
    /*jshint expr:false */
        instance.setButtonLabel(IMGBTN_+SUBMIT, I_CLASS_ITSADIALOG+'-'+logging+'"></i>'+loginintl[logging]);
    }
    else {
    /*jshint expr:true */
        instance._loggedin ? instance.removePrimaryButton() : instance.setPrimaryButton(BTNSUBMIT);
    /*jshint expr:false */
        instance.setButtonLabel(BTNSUBMIT, loginintl[logging]);
    }
};

/**
 * @method initializer
 * @protected
 * @since 0.1
*/
ITSAViewLogin.prototype.initializer = function() {
    Y.log('initializer', 'info', 'ITSAViewLogin');
    var instance = this,
        eventhandlers = instance._eventhandlers,
        loginintl;

    instance.get(CONTAINER).addClass(ITSAVIEWLOGIN);
    loginintl = instance._loginintl;
    instance.setSubmitButtons(true);
    /*jshint expr:true */
    (instance.get(IMAGEBUTTONS)) && Y.usePromise('gallerycss-itsa-dialog', 'gallerycss-itsa-form', 'gallerycss-itsa-animatespin');
    /*jshint expr:false */
    instance._defineModel();
    if (instance.get(COMPRESSED)) {
        Y.later(LOADTIMEOUT, null, function() {
            Y.use(GALLERYITSALOGIN);
        });
    }
    eventhandlers.push(
        instance.after(
            USERNAME+CHANGE,
            function(e) {
                instance.get(MODEL).set(USERNAME, e.newVal);
            }
        )
    );
    eventhandlers.push(
        instance.after(
            PASSWORD+CHANGE,
            function(e) {
                instance.get(MODEL).set(PASSWORD, e.newVal);
            }
        )
    );
    eventhandlers.push(
        instance.after(
            REMEMBER+CHANGE,
            function(e) {
                instance.get(MODEL).set(REMEMBER, e.newVal);
            }
        )
    );
    eventhandlers.push(
        instance.after(
            SYNC+CHANGE,
            function(e) {
                instance.get(MODEL)[SYNC+'Promise']=e.newVal;
            }
        )
    );
    eventhandlers.push(
        instance.on(
            'buttonclick',
            function(e) {
                var value = e.value;
                if (value===FORGOT) {
                    Y.usePromise(GALLERYITSALOGIN).then(
                        function() {
                            var ITSADialogInstance = Y.ITSADialog,
                                regain = instance.get(REGAIN),
                                config = {

                                },
                                syncPromise = instance.get(SYNC);
                            instance.focusInitialItem()
                            .then(
                                null,
                                function() {
                                    return true; // fulfill the chain
                                }
                            )
                            .then(
                                function() {
                                    return (regain===USERNAMEORPASSWORD) ?
                                           ITSADialogInstance._regainFn_UnPw(config) :
                                           true;
                                }
                            )
                            .then(
                                function(result) {
                                    if ((result.button===FORGOT_USERNAME) || (regain===USERNAME)) {
                                        return ITSADialogInstance._regainFn_Un(config, syncPromise);
                                    }
                                    else if ((result.button===FORGOT_PASSWORD) || (regain===PASSWORD)) {
                                        return ITSADialogInstance._regainFn_Pw(config, syncPromise);
                                    }
                                },
                                function(reason) {
    /*jshint expr:true */
                                    (reason instanceof Error) && Y.showError(reason.message);
    /*jshint expr:false */
                                }
                            );
                        }
                    );
                }
                else if (value===CREATEACCOUNT) {
                    instance.get(CAP_CREATEACCOUNT)(instance.get(SYNC)).then(
                        function(response) {
                            var responseObj = PARSED(response),
                                facade, message;
                            if (responseObj.status==='LOGIN') {
                                facade = responseObj;
                                // fire the login-event in case messageType===CAP_GETLOGIN
                                // lazy publish the event
                                /**
                                * Event fired when a a user successfully logs in.<br>
                                * Not preventable.
                                *
                                * @event loggedin
                                * @param e {EventFacade} Event Facade including 'username', 'password', 'remember' and all properties that were responsed by the server
                                *                        as an answer to the 'getlogin'-request.
                                **/
                                Y.fire(LOGGEDIN, facade);
    /*jshint expr:true */
                                (message=responseObj.message) && Y.showMessage(responseObj.title, message);
    /*jshint expr:false */
                            }
                            else if (responseObj.status==='ERROR') {
                                message = responseObj.message || loginintl.unspecifiederror;
                                // production-errors will be shown through the messagecontroller
                                Y.usePromise(GALLERYITSADIALOG).then(
                                    function() {
                                        Y.showError(responseObj.title || loginintl[ERROR], message);
                                    }
                                );
                            }
                            else if (responseObj.status!=='OK') {
                                // program-errors will be shown by fireing events. They can be seen by using Y.ITSAErrorReporter
                                message = 'Wrong response.status x found: '+responseObj.status;
                                facade = {src: 'Y.ITSAViewLogin.createAccount()', msg: message};
                                instance.fire('warn', facade);
                            }
                        },
                        function(reason) {
/*jshint expr:true */
                            (reason instanceof Error) && Y.showError(reason.message);
/*jshint expr:false */
                        }
                    );
                }
                else if (value===LOGIN) {
                    Y.usePromise(GALLERYITSALOGIN).then(
                        function() {
                            return Y.getLogin('Login', 'Please enter login', instance.get(SYNC));
                        }
                    );
                }
            }
        )
    );
    eventhandlers.push(
        Y.after(
            LOGGEDIN,
            function(e) {
                var messageLoggedin = e.messageLoggedin,
                    model = instance.get(MODEL);
                instance._loggedin = true;
                instance._displayname = e.displayname;
                // need to delay, because automatic refocussing would fail if previous template disappeared to soon
//                Y.soon(function() {
                    if (!instance.get(DESTROYED)) {
                        instance.get(CONTAINER).addClass(ITSAVIEWLOGIN_LOGGEDIN);
                        instance.get(CONTAINER).removeClass(ITSAVIEWLOGIN_LOGGEDOUT);
    /*jshint expr:true */
                        messageLoggedin && instance.set(MESSAGELOGGEDIN, messageLoggedin);
    /*jshint expr:false */
                        instance.setSubmitButtons(false);
                        model._set(USERNAME, instance.get(USERNAME));
                        model._set(PASSWORD, instance.get(PASSWORD));
                        model._set(REMEMBER, instance.get(REMEMBER));
                        model._set(BUTTON, LOGOUT);
                        model.setSyncMessage(SUBMIT, loginintl.loggingout);
                        instance._setTemplateRenderer(false);
                        instance.render();
                    }
  //              });
            }
        )
    );

    eventhandlers.push(
        Y.on(
            LOGGEDOUT,
            function() {
                var model = instance.get(MODEL);
                instance._loggedin = false;
                instance._displayname = null;
                // need to delay, because automatic refocussing would fail if previous template disappeared to soon
                Y.soon(function() {
                    if (!instance.get(DESTROYED)) {
                        instance.get(CONTAINER).addClass(ITSAVIEWLOGIN_LOGGEDOUT);
                        instance.get(CONTAINER).removeClass(ITSAVIEWLOGIN_LOGGEDIN);
                        instance.setSubmitButtons(true);
                        model._set(BUTTON, GETLOGIN);
                        model.setSyncMessage(SUBMIT, loginintl.attemptlogin);
                        instance._setTemplateRenderer(true);
                        instance.render();
                    }
                });
            }
        )
    );

    eventhandlers.push(
        instance.on('*:submit', function(e) {
            var formmodel = e.target,
                logout = (formmodel.get('button')===LOGOUT);
            if (e.currentTarget===instance) {
                e.promise._logout = logout; // flag for aftersubscriber;
        /*jshint expr:true */
                logout && Y.fire(LOGGEDOUT);
        /*jshint expr:false */
            }
        })
    );

    eventhandlers.push(
        instance.after('*:submit', function(e) {
            Y.log('after(*:submit)', 'info', 'ITSAViewLogin');
            var formmodel = e.target,
                promise = e.promise;
            if (e.currentTarget===instance) {
                // Cautious: e.response is NOT available in the after-bubble chain --> see Y.ITSAFormModel - know issues
                promise.then(
                    function(response) {
                        var responseObj = PARSED(response),
                            loginintl = instance._loginintl,
                            messageType = formmodel.messageType,
                            message, facade;
                        if (responseObj && responseObj.status && !promise._logout) {
                            if (responseObj.status==='ERROR') {
                                message = responseObj.message || loginintl.unspecifiederror;
                                // production-errors will be shown through the messagecontroller
                                Y.usePromise(GALLERYITSADIALOG).then(
                                    function() {
                                        Y.showError(responseObj.title || loginintl[ERROR], message);
                                    }
                                );
                            }
                            else if (responseObj.status==='OK') {
                                facade = Y.merge(responseObj, formmodel.toJSON());
                                // fire the login-event in case messageType===CAP_GETLOGIN
    // lazy publish the event
    /**
    * Event fired when a a user successfully logs in.<br>
    * Not preventable.
    *
    * @event loggedin
    * @param e {EventFacade} Event Facade including 'username', 'password', 'remember' and all properties that were responsed by the server
    *                        as an answer to the 'getlogin'-request.
    **/
                                Y.fire(LOGGEDIN, facade);


    /*jshint expr:true */
                                (message=responseObj.message) && Y.showMessage(responseObj.title, message);
    /*jshint expr:false */
                            }
                            else if ((messageType===CAP_GETLOGIN) && (responseObj.status==='NOACCESS')) {
                                message = responseObj.message || loginintl.loginblocked;
                                // production-errors will be shown through the messagecontroller
                                Y.usePromise(GALLERYITSADIALOG).then(
                                    function() {
                                        Y.showError(responseObj.title || loginintl[ERROR], message);
                                    }
                                );
                            }
                            else if (responseObj.status==='RETRY') {
                /*jshint expr:true */
                                (message = responseObj.message || loginintl.unknownlogin);
                /*jshint expr:false */
                                Y.usePromise(GALLERYITSADIALOG).then(
                                    function() {
                                        Y.showWarning(responseObj.title || loginintl[ERROR], message);
                                    }
                                );
                            }
                            else if (responseObj.status==='CHANGEPASSWORD') {
                                Y.usePromise(GALLERYITSALOGIN).then(
                                    function() {
                                        var itsamessage = {
                                            syncPromise: instance.get(SYNC),
                                            _config: {}
                                        };
                                        Y.ITSADialog._changePwFn(itsamessage).then(
                                            function(response) {
                                                var newResponseObj = PARSED(response);
                                                facade = Y.merge(responseObj, newResponseObj, formmodel.toJSON(), {password: response.password});
                                                // overrule password, because the new password is appropriate

                                                // fire the login-event
                                                // lazy publish the event
                                                /**
                                                * Event fired when a a user successfully logs in.<br>
                                                * Not preventable.
                                                *
                                                * @event loggedin
                                                * @param e {EventFacade} Event Facade including 'username', 'password', 'remember' and all properties that were responsed by the server
                                                *                        as an answer to the 'getlogin'-request.
                                                **/
                                                Y.fire(LOGGEDIN, facade);
                    /*jshint expr:true */
                                                (message=responseObj.message) && Y.showMessage(responseObj.title, message);
                    /*jshint expr:false */
                                            },
                                            function(reason) {
                                                Y.log((reason && (reason.message || reason)), 'warn', 'ITSAViewLogin');
                                                message = loginintl.passwordnotchanged;
                                                // production-errors will be shown through the messagecontroller
                                                Y.showError(loginintl[ERROR], message);
                                            }
                                        );
                                    }
                                );
                            }
                            else {
                                // program-errors will be shown by fireing events. They can be seen by using Y.ITSAErrorReporter
                                message = 'Wrong response.status found: '+responseObj.status;
                                facade = {src: 'Y.ITSAViewLogin.submit()', msg: message};
                                instance.fire('warn', facade);
                            }
                        }
                        else {
                            // program-errors will be shown by fireing events. They can be seen by using Y.ITSAErrorReporter
                            message = 'Response returned without response.status';
                            facade = {src: 'Y.ITSAViewLogin.submit()', msg: message};
                            instance.fire('warn', facade);
                        }
                    }
                ).then(
                    null,
                    function(catchErr) {
                        var message = (catchErr && (catchErr.message || catchErr)) || 'Undefined error during submission';
                        // production-errors will be shown through the messagecontroller
                        Y.usePromise(GALLERYITSADIALOG).then(
                            function() {
                                Y.showWarning(message);
                            }
                        );
                    }
                );
            }
        })
    );

};

/**
 *
 * Renderes a login-panel where the user can fill in a username and password. Using config, the behaviour of the panel can be extended
 * by introducing several sub-panels:<br>
 *
 *      <ul>
 *          <li><code>changepassword-panel</code> will show up when the server responses to button==='getlogin' with {status: 'CHANGEPASSWORD'}</li>
 *          <li><code>forgot-username-or-password-panel</code> is available when config.regain==='usernameorpassword'</li>
 *          <li><code>forgotusername-panel</code> is available when config.regain==='usernameorpassword' || 'username'</li>
 *          <li><code>forgotpassword-panel</code> is available when config.regain==='usernameorpassword' || 'password'</li>
 *          <li><code>createaccount-panel</code> needs to be set-up by the developer, using config.createAccount: createAccountPromise --> see examples</li>
 *      </ul>
 *
 * @method getLogin
 * @return {Y.Promise} Promise that holds valid logindata (if resolved) --> resolve(result) result={username, password, remember} OR reject(reason)
 * @since 0.1
 */
ITSAViewLogin.prototype.getLogin = function() {
};

ITSAViewLogin.prototype.renderOnReady = function() {
    var instance = this;
    return Y.usePromise(GALLERYCSS_DIALOG, GALLERYCSS_FORM, GALLERYCSS_ANIMATESPIN).then(
        function() {
            instance.render();
        }
    );
};

/**
 * @method _defineModel
 * @private
 * @since 0.1
*/
ITSAViewLogin.prototype._defineModel = function() {
    var instance = this,
        loginintl = instance._loginintl,
        usernameIsEmail = instance.get(USERNAMEISEMAIL),
        imagebuttons = instance.get(IMAGEBUTTONS),
        extrabuttons = [],
        MyLoginModel, formconfigUsername, formconfigPassword, formconfigRemember, model;

    Y.log('initializer', 'info', 'ITSAViewLogin');
    formconfigUsername = instance.get(FORMCONFIG+CAP_USERNAME);
/*jshint expr:true */
    formconfigUsername[LABEL] || formconfigUsername[PLACEHOLDER] || (formconfigUsername[LABEL]=loginintl[usernameIsEmail ? EMAILADDRESS : USERNAME]);
/*jshint expr:false */
    formconfigUsername.initialfocus = true;
    formconfigUsername[FULLSELECT] = true;
    formconfigUsername[PRIMARYBTNONENTER] = false;
    formconfigUsername[CLASSNAME] = ITSA_LOGIN + (formconfigUsername[CLASSNAME] ? ' '+formconfigUsername[CLASSNAME] : '');
    formconfigUsername[REQUIRED] = true;

    // setting config for password:
    formconfigPassword = instance.get(FORMCONFIG+CAP_PASSWORD);
/*jshint expr:true */
    formconfigPassword[LABEL] || formconfigPassword[PLACEHOLDER] || (formconfigPassword[LABEL]=loginintl[PASSWORD]);
/*jshint expr:false */
    formconfigPassword[FULLSELECT] = true;
    formconfigPassword[PRIMARYBTNONENTER] = true;
    formconfigPassword[CLASSNAME] = ITSA_LOGIN + (formconfigPassword[CLASSNAME] ? ' '+formconfigPassword[CLASSNAME] : '');
    formconfigPassword[REQUIRED] = true;

    // setting config for remember:
    formconfigRemember = instance.get(FORMCONFIG+CAP_REMEMBER);
    formconfigRemember.widgetconfig = {
        primarybtnonenter: true
    };
/*jshint expr:true */
    formconfigUsername[LABEL] && !formconfigPassword[LABEL] && (formconfigPassword[LABEL] = ' ');
    formconfigPassword[LABEL] && !formconfigUsername[LABEL] && (formconfigUsername[LABEL] = ' ');
    formconfigRemember[LABEL] || (formconfigRemember[LABEL]=loginintl[STAYLOGGEDIN]);
/*jshint expr:false */
    formconfigRemember.switchlabel = true;

/*jshint expr:true */
    instance.get(REGAIN) && extrabuttons.push(imagebuttons ?
                                            {
                                                buttonId: IMGBTN_+FORGOT,
                                                labelHTML: I_CLASS_ITSADIALOG+'-question"></i>'+loginintl[FORGOT],
                                                config: {
                                                    value: FORGOT,
                                                    classname: ITSABUTTON_ICONLEFT
                                                }
                                            } :
                                            {
                                                buttonId: BTN_+FORGOT,
                                                labelHTML: loginintl[FORGOT],
                                                config: {
                                                    value: FORGOT
                                                }
                                            }
                                        );
    instance.get(CAP_CREATEACCOUNT) && extrabuttons.push(imagebuttons ?
                                            {
                                                buttonId: IMGBTN_+CREATEACCOUNT,
                                                labelHTML: I_CLASS_ITSADIALOG+'-user"></i>'+loginintl[CREATEACCOUNT],
                                                config: {
                                                    value: CREATEACCOUNT,
                                                    classname: ITSABUTTON_ICONLEFT
                                                }
                                            } :
                                            {
                                                buttonId: BTN_CREATEACCOUNT,
                                                labelHTML: loginintl[CREATEACCOUNT],
                                                config: {
                                                    value: CREATEACCOUNT
                                                }
                                            }
                                        );
    instance.get(COMPRESSED) && extrabuttons.push(imagebuttons ?
                                            {
                                                buttonId: IMGBTN_+LOGIN,
                                                labelHTML: I_CLASS_ITSADIALOG+'-login"></i>'+loginintl[LOGIN],
                                                config: {
                                                    value: LOGIN,
                                                    classname: ITSABUTTON_ICONLEFT+' '+TEXTBOTTOM_CLASS
                                                }
                                            } :
                                            {
                                                buttonId: BTN_+LOGIN,
                                                labelHTML: loginintl[LOGIN],
                                                config: {
                                                    value: LOGIN,
                                                    classname: TEXTBOTTOM_CLASS
                                                }
                                            }
                                        );
    (extrabuttons.length>0) && instance.addCustomBtns(extrabuttons);
/*jshint expr:false */

    MyLoginModel = Y.Base.create('itsaviewloginmodel', Y.ITSAFormModel, [], null, {
                      ATTRS: {
                          username: {
                              value: instance.get(USERNAME),
                              formtype: usernameIsEmail ? 'email' : 'text',
                              formconfig: formconfigUsername,
                              validator: instance.get(VALIDATOR+CAP_USERNAME),
                              validationerror: instance.get(VALIDATIONERROR+CAP_USERNAME)
                          },
                          password: {
                              value: instance.get(PASSWORD),
                              formtype: PASSWORD,
                              formconfig: formconfigPassword,
                              validator: instance.get(VALIDATOR+CAP_PASSWORD),
                              validationerror: instance.get(VALIDATIONERROR+CAP_PASSWORD)
                          },
                          remember: {
                              value: instance.get(REMEMBER),
                              formtype: Y.ITSACheckbox,
                              formconfig: formconfigRemember
                          },
                          button: {
                              value: GETLOGIN,
                              writeOnce: 'initOnly'
                          }
                      }
                  });
    model = new MyLoginModel();
    model.setSyncMessage(SUBMIT, loginintl.attemptlogin);
    instance._set(MODEL, model);
    // need to set target manually, for the subscribers (_bindUI) aren't loaded yet:
    model.addTarget(instance);
    model.syncPromise = instance.get(SYNC);
    // redefine, because the templaterenderer was set with editable=false for there was no model
    instance._setTemplateRenderer(true);
};

/**
 * @method _getterTempl
 * @private
 * @since 0.1
*/
ITSAViewLogin.prototype._getterTempl = function() {
    Y.log('_getterTempl', 'info', 'ITSAViewLogin');
    var instance = this,
        template = instance._loggedin ? instance._logoutTempl() : instance._loginTempl();

    return instance.get(IMAGEBUTTONS) ? template.replace(/\{btn_/g, '{'+IMGBTN_) : template;
};

/**
 * @method _loginTempl
 * @private
 * @since 0.1
*/
ITSAViewLogin.prototype._loginTempl = function() {
    Y.log('_loginTempl', 'info', 'ITSAViewLogin');
    var instance = this,
        compressed = instance.get(COMPRESSED),
        icon = instance.get(ICONLOGIN);

    return (icon ? Lang.sub(ICONTEMPLATE, {icon: icon, size: (compressed ? SMALL : LARGE)}) : '') +
           (instance.get(LOGINTEMPLATE) || (instance.get(COMPRESSED) ? instance._defComprLoginTempl() : instance._defLoginTempl()));
};

/**
 * The default compressed login-template, when attribute 'loginTemplate' is null
 *
 * @method _defComprLoginTempl
 * @private
 * @since 0.1
*/
ITSAViewLogin.prototype._defComprLoginTempl = function() {
    Y.log('_defComprLoginTempl', 'info', 'ITSAViewLogin');
    return '{'+BTN_+LOGIN+'}';
};

/**
 * The default login-template, when attribute 'loginTemplate' is null
 *
 * @method _defLoginTempl
 * @private
 * @since 0.1
*/
ITSAViewLogin.prototype._defLoginTempl = function() {
    Y.log('_defLoginTempl', 'info', 'ITSAViewLogin');
    var instance = this,
        footer;

    footer = (instance.get(REGAIN) ? '{'+BTN_+FORGOT+'}' : '');
/*jshint expr:true */
    instance.get(CAP_CREATEACCOUNT) && (footer += '{'+BTN_CREATEACCOUNT+'}');
/*jshint expr:false */
    footer += '{'+BTNSUBMIT+'}';
    return SPANWRAPPER + (instance.get(MESSAGE) || '') + ENDSPAN+
           FIELDSET_START+
               DIVCLASS_PURECONTROLGROUP+'{'+USERNAME+'}'+ENDDIV+
               DIVCLASS_PURECONTROLGROUP+'{'+PASSWORD+'}'+ENDDIV+
               (instance.get('showStayLoggedin') ? DIVCLASS_ITSA+'login-checkbox pure-controls">'+'{remember}'+ENDDIV : '')+
               DIVCLASS_PURECONTROLS+footer+ENDDIV+
           ENDFIELDSET;
};

/**
 * @method _logoutTempl
 * @private
 * @since 0.1
*/
ITSAViewLogin.prototype._logoutTempl = function() {
    Y.log('_logoutTempl', 'info', 'ITSAViewLogin');
    Y.log('_loginTempl', 'info', 'ITSAViewLogin');
    var instance = this,
        compressed = instance.get(COMPRESSED),
        logouttemplate = instance.get(LOGOUTTEMPLATE),
        icon = instance.get(ICONLOGOUT);

    return ((icon && logouttemplate) ? Lang.sub(ICONTEMPLATE, {icon: icon, size: (compressed ? SMALL : LARGE)}) : '') +
           (logouttemplate || (compressed ? instance._defComprLogoutTempl() : instance._defLogoutTempl(' itsaviewlogin-noncompressed')));
};

/**
 * The default compressed logout-template, when attribute 'loginTemplate' is null
 *
 * @method _defComprLogoutTempl
 * @private
 * @since 0.1
*/
ITSAViewLogin.prototype._defComprLogoutTempl = function() {
    Y.log('_defComprLogoutTempl', 'info', 'ITSAViewLogin');
    return this._defLogoutTempl('');
};

/**
 * The default logout-template, when attribute 'loginTemplate' is null
 *
 * @method _defLogoutTempl
 * @private
 * @since 0.1
*/
ITSAViewLogin.prototype._defLogoutTempl = function(formclass) {
    Y.log('_defLogoutTempl', 'info', 'ITSAViewLogin');
    var instance = this,
        displayname = instance._displayname,
        icon = instance.get(ICONLOGOUT),
        message = (instance.get(MESSAGELOGGEDIN) || (displayname ? instance._loginintl.youareloggedinas : instance._loginintl.youareloggedin)),
        loggedinUser = displayname || '',
        logoutBtn = '{'+BTNSUBMIT+'}';

    return '<form class="pure-form'+formclass+'">'+
               ((!instance.get(LOGOUTTEMPLATE)) ? Lang.sub(ICONTEMPLATE, {icon: icon, size: (instance.get(COMPRESSED) ? SMALL : LARGE)}) : '') +
               SPANWRAPPER + Lang.sub(message, {displayname: loggedinUser}) + ENDSPAN +
               Lang.sub(SPANBUTTONWRAPPER, {size: (instance.get(COMPRESSED) ? SMALL : LARGE)})+ logoutBtn + ENDSPAN +
           '</form>';
};

/**
 * Internal objects with internationalized login-messages
 *
 * @property _loginintl
 * @private
 * @type Object
*/
ITSAViewLogin.prototype._loginintl = Y.Intl.get(GALLERYITSAI18NLOGIN);
