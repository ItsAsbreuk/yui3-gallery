YUI.add("gallery-itsanodepromise",function(e,t){"use strict";e.Node.prototype.availablePromise=function(t,n){return new e.Promise(function(r,i){e.on("available",function(){r(e.one("nodeid"))},t),n&&e.later(n,null,function(){var e="node "+t+" was not available within "+n+" ms";i(new Error(e))})})},e.Node.prototype.contentreadyPromise=function(t,n){return new e.Promise(function(r,i){e.on("contentready",function(){r(e.one("nodeid"))},t),n&&e.later(n,null,function(){var e="the content of node "+t+" was not ready within "+n+" ms";i(new Error(e))})})}},"@VERSION@",{requires:["yui-base","yui-later","node-base","base-build","panel","promise"]});
