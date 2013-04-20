YUI.add('gallery-itsamodelsyncpromise', function(Y) {

   var YArray = Y.Array,
       DEFAULT_TIMEOUT = 60000,
       TIMEOUT_MESSAGE = 'Model sync-method did not return a callback in time. Please read the Docs how to setup the sync-method.',
   /**
     * Fired when an error occurs, such as when an attribute (or property) doesn't validate or when
     * the sync layer submit-function returns an error.
     * @event error
     * @param e {EventFacade} Event Facade including:
     * @param e.error {any} Error message.
     * @param e.src {String} Source of the error. May be one of the following (or any
     *                     custom error source defined by a Model subclass):
     *
     * `submit`: An error submitting the model from within a sync layer.
     *
     * `attributevalidation`: An error validating an attribute (or property). The attribute (or objectproperty)
     *                        that failed validation will be provided as the `attribute` property on the event facade.
     *
     * @param e.attribute {String} The attribute/property that failed validation.
     * @param e.validationerror {String} The errormessage in case of attribute-validation error.
    **/
    EVT_ERROR = 'error',
   /**
     * Fired after model is submitted from the sync layer.
     * @event submit
     * @param e {EventFacade} Event Facade including:
     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.
     * @param [e.parsed] {Object} The parsed version of the sync layer's response to the submit-request, if there was a response.
     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.
     * @since 0.1
    **/
    EVT_SUBMIT = 'submit',
   /**
     * Fired after model is read from the sync layer.
     * @event load
     * @param e {EventFacade} Event Facade including:
     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.
     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.
     * @since 0.1
    **/
    EVT_LOAD = 'load',
   /**
     * Fired after model is saved through the sync layer.
     * @event submit
     * @param e {EventFacade} Event Facade including:
     * @param [e.options] {Object} The options=object that was passed to the sync-layer, if there was one.
     * @param [e.parsed] {Object} The parsed version of the sync layer's response to the submit-request, if there was a response.
     * @param [e.response] {any} The sync layer's raw, unparsed response to the submit-request, if there was one.
     * @since 0.1
    **/
    EVT_SAVE = 'save',

    PARSED = function(value) {
        var parsed;
        try {
            parsed = Y.JSON.parse(value);
        } catch (ex) {}
        return parsed;
    };

    // -- Mixing extra Methods to Y.Model -----------------------------------
    function ITSAModelSyncPromise() {}
    Y.mix(ITSAModelSyncPromise.prototype, {
       /**
         * Submits this model to the server.
         *
         * This method delegates to the `sync()` method to perform the actual submit
         * operation, which is Y.Promise. Read the Promise.then() and look for resolve(response, options) OR reject(reason).
         *
         * A successful submit-operation will also fire a `submit` event, while an unsuccessful
         * submit operation will fire an `error` event with the `src` value "submit".
         *
         * <b>CAUTION</b> The sync-method MUST call its callback-function to make the promised resolved. If there is no callback-function
         * then the promise will be rejected after a timeout. When timeout is not specified,
         * @method submitPromise
         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync
         *                 implementation to determine what options it supports or requires, if any.
         * @param {Int} [timeout] when no response within this timesetting, then the Promise will be rejected. When not specified,
         *              a timeout of 60000 (1 minute) is taken. We need this, because we need to be sure the sync-functions has a callback.
         *              without a callback the promise would never be resolved. This is now caught with the timeout.
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
        **/
        submitPromise: function(options, timeout) {
            options = options || {};
            var instance = this,
                submitpromise = new Y.Promise(function (resolve, reject) {
                    var timeoutHandler = Y.later(
                        timeout || DEFAULT_TIMEOUT,
                        instance,
                        function() {
                            var facade = {
                                    src     : 'submit',
                                    options : options,
                                    error   : TIMEOUT_MESSAGE
                                };
                            instance.fire(EVT_ERROR, facade);
                            reject(new Error(TIMEOUT_MESSAGE));
                        }
                    );
                    instance.sync('submit', options, function (err, response) {
                        if (timeoutHandler) {
                            timeoutHandler.cancel();
                        }
                        if (submitpromise.getStatus()==='pending') {
                            var facade = {
                                    options : options,
                                    response: response
                                };
                            if (err) {
                                facade.error = err;
                                facade.src   = 'submit';
                                instance.fire(EVT_ERROR, facade);
                                reject(new Error(err));
                            }
                            else {
                                // Lazy publish.
                                if (!instance._submitEvent) {
                                    instance._submitEvent = instance.publish(EVT_SUBMIT, {
                                        preventable: false
                                    });
                                }
                                instance.fire(EVT_SUBMIT, facade);
                                resolve(response, options);
                            }
                        }
                    });
                });
            return submitpromise;
        },


        /**
         * Loads this model from the server.
         *
         * This method delegates to the `sync()` method to perform the actual load
         * operation, which is an asynchronous action. Specify a _callback_ function to
         * be notified of success or failure.
         *
         * A successful load operation will fire a `load` event, while an unsuccessful
         * load operation will fire an `error` event with the `src` value "load".
         *
         * If the load operation succeeds and one or more of the loaded attributes
         * differ from this model's current attributes, a `change` event will be fired.
         * @method loadPromise
         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync
         *                 implementation to determine what options it supports or requires, if any.
         * @param {Int} [timeout] when no response within this timesetting, then the Promise will be rejected. When not specified,
         *              a timeout of 60000 (1 minute) is taken. We need this, because we need to be sure the sync-functions has a callback.
         *              without a callback the promise would never be resolved. This is now caught with the timeout.
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
        **/
        loadPromise: function (options, timeout) {
            options = options || {};
            var instance = this,
                loadpromise = new Y.Promise(function (resolve, reject) {
                    var timeoutHandler = Y.later(
                        timeout || DEFAULT_TIMEOUT,
                        instance,
                        function() {
                            var facade = {
                                    src     : 'load',
                                    options : options,
                                    error   : TIMEOUT_MESSAGE
                                };
                            instance.fire(EVT_ERROR, facade);
                            reject(new Error(TIMEOUT_MESSAGE));
                        }
                    );
                    instance.sync('read', options, function (err, response) {
                        if (timeoutHandler) {
                            timeoutHandler.cancel();
                        }
                        if (loadpromise.getStatus()==='pending') {
                            var parsed,
                                facade = {
                                    options : options,
                                    response: response
                                };
                            if (err) {
                                facade.error = err;
                                facade.src   = 'load';
                                instance.fire(EVT_ERROR, facade);
                                reject(new Error(err));
                            }
                            else {
                                // Lazy publish.
                                if (!instance._loadEvent) {
                                    instance._loadEvent = instance.publish(EVT_LOAD, {
                                        preventable: false
                                    });
                                }
                                parsed = facade.parsed = PARSED(response);
                                instance.setAttrs(parsed, options);
                                instance.changed = {};
                                instance.fire(EVT_LOAD, facade);
                                resolve(response, options);
                            }
                        }
                    });
                });
            return loadpromise;
        },

       /**
        * Saves this model to the server.
        *
        * This method delegates to the `sync()` method to perform the actual save
        * operation, which is an asynchronous action. Specify a _callback_ function to
        * be notified of success or failure.
        *
        * A successful save operation will fire a `save` event, while an unsuccessful
        * save operation will fire an `error` event with the `src` value "save".
        *
        * If the save operation succeeds and one or more of the attributes returned in
        * the server's response differ from this model's current attributes, a
        * `change` event will be fired.
        *
        * @method savePromise
         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync
         *                 implementation to determine what options it supports or requires, if any.
         * @param {Int} [timeout] when no response within this timesetting, then the Promise will be rejected. When not specified,
         *              a timeout of 60000 (1 minute) is taken. We need this, because we need to be sure the sync-functions has a callback.
         *              without a callback the promise would never be resolved. This is now caught with the timeout.
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
        **/
        savePromise: function (options, timeout) {
            options = options || {};
            var instance = this,
                savepromise = new Y.Promise(function (resolve, reject) {
                    var facade = {
                            options : options,
                            src     :'save'
                        },
                        timeoutHandler;
                    instance._validate(instance.toJSON(), function (validateErr) {
                        if (validateErr) {
                            facade.error = validateErr;
                            instance.fire(EVT_ERROR, facade);
                            reject(new Error(validateErr));
                        }
                        else {
                            timeoutHandler = Y.later(
                                timeout || DEFAULT_TIMEOUT,
                                instance,
                                function() {
                                    var facade = {
                                            error   : TIMEOUT_MESSAGE
                                        };
                                    instance.fire(EVT_ERROR, facade);
                                    reject(new Error(TIMEOUT_MESSAGE));
                                }
                            );
                            instance.sync(instance.isNew() ? 'create' : 'update', options, function (err, response) {
                                if (timeoutHandler) {
                                    timeoutHandler.cancel();
                                }
                                if (savepromise.getStatus()==='pending') {
                                    var parsed;
                                    facade.response = response;
                                    if (err) {
                                        facade.error = err;
                                        facade.src   = 'save';
                                        instance.fire(EVT_ERROR, facade);
                                        reject(new Error(err));
                                    }
                                    else {
                                        // Lazy publish.
                                        if (!instance._saveEvent) {
                                            instance._saveEvent = instance.publish(EVT_SAVE, {
                                                preventable: false
                                            });
                                        }
                                        parsed = facade.parsed = PARSED(response);
                                        instance.setAttrs(parsed, options);
                                        instance.changed = {};
                                        instance.fire(EVT_SAVE, facade);
                                        resolve(response, options);
                                    }
                                }
                            });
                        }
                    });
                });
            return savepromise;
        },

      /**
         * Destroys this model instance and removes it from its containing lists, if any.
         *
         * The _callback_, if one is provided, will be called after the model is
         * destroyed.
         *
         * If `options.remove` is `true`, then this method delegates to the `sync()`
         * method to delete the model from the persistence layer, which is an
         * asynchronous action. In this case, the _callback_ (if provided) will be
         * called after the sync layer indicates success or failure of the delete
         * operation.
         *
         * @method destroyPromise
         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync
         *                 implementation to determine what options it supports or requires, if any.
         * @param {Int} [timeout] when no response within this timesetting, then the Promise will be rejected. When not specified,
         *              a timeout of 60000 (1 minute) is taken. We need this, because we need to be sure the sync-functions has a callback.
         *              without a callback the promise would never be resolved. This is now caught with the timeout.
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
        **/
        destroyPromise: function (options, timeout) {
            options = options || {};
            var instance = this,
                destroypromise = new Y.Promise(function (resolve, reject) {
                    var timeoutHandler = Y.later(
                            timeout || DEFAULT_TIMEOUT,
                            instance,
                            function() {
                                var facade = {
                                        error   : TIMEOUT_MESSAGE
                                    };
                                instance.fire(EVT_ERROR, facade);
                                reject(new Error(TIMEOUT_MESSAGE));
                            }
                        );
                    instance.onceAfter('destroy', function () {
                        function finish() {
                            YArray.each(instance.lists.concat(), function (list) {
                                list.remove(instance, options);
                            });
                        }
                        if (options.remove || options['delete']) {
                            instance.sync('delete', options, function (err) {
                                if (timeoutHandler) {
                                    timeoutHandler.cancel();
                                }
                                if (destroypromise.getStatus()==='pending') {
                                    if (err) {
                                        var facade = {
                                            error   : err,
                                            src     : 'destroy',
                                            options : options
                                        };
                                        instance.fire(EVT_ERROR, facade);
                                        reject(new Error(err));
                                    }
                                    else {
                                        finish();
                                        resolve(options);
                                    }
                                }
                            });
                        } else {
                            if (timeoutHandler) {
                                timeoutHandler.cancel();
                            }
                            if (destroypromise.getStatus()==='pending') {
                                finish();
                                resolve(options);
                            }
                        }
                    });
                });
            Y.Model.superclass.destroy.call(instance);
            return destroypromise;
        }

    }, true);
    Y.ITSAModelSyncPromise = ITSAModelSyncPromise;
    Y.Base.mix(Y.Model, [ITSAModelSyncPromise]);

    //==============================================================================

    // -- Mixing extra Methods to Y.Model -----------------------------------
    function ITSAModellistSyncPromise() {}
    Y.mix(ITSAModellistSyncPromise.prototype, {
        /**
         * Loads models from the server and adds them into the ModelList
         *
         * This method delegates to the `sync()` method to perform the actual load
         * operation, which is an asynchronous action. Specify a _callback_ function to
         * be notified of success or failure.
         *
         * A successful load operation will fire a `load` event, while an unsuccessful
         * load operation will fire an `error` event with the `src` value "load".
         *
         * If the load operation succeeds and one or more of the loaded attributes
         * differ from this model's current attributes, a `change` event will be fired.
         *
         * @method loadPromise
         * @param {Object} [options] Options to be passed to `sync()`. It's up to the custom sync
         *                 implementation to determine what options it supports or requires, if any.
         * @param {Int} [timeout] when no response within this timesetting, then the Promise will be rejected. When not specified,
         *              a timeout of 60000 (1 minute) is taken. We need this, because we need to be sure the sync-functions has a callback.
         *              without a callback the promise would never be resolved. This is now caught with the timeout.
         * @return {Y.Promise} promised response --> resolve(response, options) OR reject(reason).
        **/
        loadPromise: function (options, timeout) {
            options = options || {};
            var instance = this,
                loadpromise = new Y.Promise(function (resolve, reject) {
                    var timeoutHandler = Y.later(
                        timeout || DEFAULT_TIMEOUT,
                        instance,
                        function() {
                            var facade = {
                                    src     : 'load',
                                    options : options,
                                    error   : TIMEOUT_MESSAGE
                                };
                            instance.fire(EVT_ERROR, facade);
                            reject(new Error(TIMEOUT_MESSAGE));
                        }
                    );
                    instance.sync('read', options, function (err, response) {
                        if (timeoutHandler) {
                            timeoutHandler.cancel();
                        }
                        if (loadpromise.getStatus()==='pending') {
                            var parsed,
                                facade = {
                                    options : options,
                                    response: response
                                };
                            if (err) {
                                facade.error = err;
                                facade.src   = 'load';
                                instance.fire(EVT_ERROR, facade);
                                reject(new Error(err));
                            }
                            else {
                                // Lazy publish.
                                if (!instance._loadEvent) {
                                    instance._loadEvent = instance.publish(EVT_LOAD, {
                                        preventable: false
                                    });
                                }
                                parsed = facade.parsed = PARSED(response);
                                instance.reset(parsed, options);
                                instance.fire(EVT_LOAD, facade);
                                resolve(response, options);
                            }
                        }
                    });
                });
            return loadpromise;
        }
    }, true);
    Y.ITSAModellistSyncPromise = ITSAModellistSyncPromise;
    Y.Base.mix(Y.ModelList, [ITSAModellistSyncPromise]);

    //==============================================================================

}, '0.0.1', {requires: ['base-build', 'node-base', 'json-parse', 'model', 'model-list']});