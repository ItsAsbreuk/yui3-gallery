YUI.add("gallery-itsanodepromise",function(e,t){"use strict";var n=e.Node,r=document.implementation.hasFeature("MutationEvents","2.0"),i=250;n.availablePromise=function(t,n){return new e.Promise(function(r,i){e.once("available",function(){r(e.one(t))},t),n&&e.later(n,null,function(){var e="node "+t+" was not available within "+n+" ms";i(new Error(e))})})},n.contentreadyPromise=function(t,n){return new e.Promise(function(r,i){e.once("contentready",function(){r(e.one(t))},t),n&&e.later(n,null,function(){var e="the content of node "+t+" was not ready within "+n+" ms";i(new Error(e))})})},n.unavailablePromise=function(t,n){var s=this,o;return n=n||{},n.afteravailable?(o=e.merge(n),delete o.afteravailable,this.availablePromise(t,n.timeout).then(e.bind(s.unavailablePromise,s,t,o))):new e.Promise(function(s,o){var u,a,f=n&&n.timeout,l=n&&n.intervalNonNative;e.one(t)?(r?a=e.after("DOMNodeRemoved",function(){e.soon(function(){e.one(t)||(a.detach(),s(t))})}):u=e.later(l||i,null,function(){e.one(t)||(u.cancel(),s(t))},null,!0),f&&e.later(f,null,function(){var n="node "+t+" was not removed within "+f+" ms";!r&&!e.one(t)?s(t):o(new Error(n))})):s(t)})},r&&e.mix(e.Node.DOM_EVENTS,{DOMNodeRemoved:!0}),e.Node.prototype.availablePromise=n.availablePromise,e.Node.prototype.contentreadyPromise=n.contentreadyPromise,e.Node.prototype.unavailablePromise=n.unavailablePromise},"@VERSION@",{requires:["yui-base","yui-later","node-base","timers","promise"]});
