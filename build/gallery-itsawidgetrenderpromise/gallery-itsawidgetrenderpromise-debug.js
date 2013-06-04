YUI.add('gallery-itsawidgetrenderpromise', function (Y, NAME) {

'use strict';
/**
 * ITSAWidgetRenderPromise
 *
 *
 * This module adds Widget.renderPromise() to the Y.Widget class.
 * By using this Promise, you don't need to listen for the 'render'-event, neither look for the value of the attribute 'rendered'.
 *
 *
 * @module gallery-itsawidgetrenderpromise
 * @class Y.Widget
 * @since 0.1
 *
 * <i>Copyright (c) 2013 Marco Asbreuk - http://theinternetwizard.net</i>
 * Special thanks to Jeff Pinach - http://http://fromanegg.com :)
 * YUI BSD License - http://developer.yahoo.com/yui/license.html
 *
*/

var DEFAULTTIMEOUT = 20000;

/**
 * Promise that will be resolved once the widget is rendered.
 * By using this Promise, you don't need to listen for the 'render'-event, neither look for the value of the attribute 'rendered'.
 *
 * @method renderPromise
 * @param [timeout] {int} Timeout in ms, after which the promise will be rejected. Set to 0 to de-activate.<br />
 *                                      If omitted, a timeout of 20 seconds (20000ms) wil be used.
 * @return {Y.Promise} promised response --> resolve(e) OR reject(reason).
 * @since 0.1
*/
Y.Widget.prototype.renderPromise = function(timeout) {
    Y.log('renderPromise', 'info', 'widget');
    var instance = this;
    return new Y.Promise(function (resolve, reject) {
        instance.after(
            'render',
            function(e) {
                Y.log('renderPromise is resolved by the after-ready event', 'info', 'widget');
                resolve(e);
            }
        );
        if (instance.get('rendered')) {
            Y.log('renderPromise is resolved by the rendered-attribute', 'info', 'widget');
            resolve();
        }
        if (timeout !== 0) {
            Y.later(
                timeout || DEFAULTTIMEOUT,
                null,
                function() {
                    var errormessage = 'renderPromise is rejected by timeout of '+(timeout || DEFAULTTIMEOUT)+ ' ms';
                    Y.log(errormessage, 'warn', 'widget');
                    reject(new Error(errormessage));
                }
            );
        }
    });
};

}, '@VERSION@', {"requires": ["yui-base", "widget", "promise"]});
