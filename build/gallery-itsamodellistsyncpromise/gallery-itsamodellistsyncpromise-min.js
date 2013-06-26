YUI.add("gallery-itsamodellistsyncpromise",function(e,t){"use strict";function f(){}var n="error",r="save",i="submit",s="loadappend",o="load",u="destroy",a=function(t){var n;try{n=e.JSON.parse(t)}catch(r){}return n};e.mix(f.prototype,{destroyPromise:function(t){var n=this,r=[];return n.each(function(e){r.push(e.destroyPromise(t))}),e.batch.apply(e,r).then(function(e){var r={options:t,src:"destroy"};return n._destroyEvent||(n._destroyEvent=n.publish(u,{preventable:!1})),n.fire(u,r),e},function(e){var r={options:t,src:"Modellist.destroyPromise()",error:e};return n._lazyFireErrorEvent(r),e})},loadPromise:function(t){var n=this,r,i,u;return t=t||{},r=t.append,i=typeof r=="boolean"&&r,u=i?s:o,new e.Promise(function(e,r){var s,o,f=i?"readappend":"read",l={options:t};s=function(e){l.error=e,l.src="Modellist.loadPromise() - load"+(i?"append":""),n._lazyFireErrorEvent(l),r(new Error(e))},o=function(r){var s;n["_"+u]||(n["_"+u]=n.publish(u,{preventable:!1})),l.response=r,s=l.parsed=a(r),i?n.add(s,t):n.reset(s,t),n.fire(u,l),e(r,t)},n.syncPromise?n.syncPromise(f,t).then(o,s):n.sync(f,t,function(e,t){e?s(e):o(t)})})},savePromise:function(t){var n=this,i=[];return n.each(function(e){e.isModified()&&i.push(e.savePromise(t))}),e.batch.apply(e,i).then(function(e){var i={options:t,src:"save"};return n._saveEvent||(n._saveEvent=n.publish(r,{preventable:!1})),n.fire(r,i),e},function(e){var r={options:t,src:"Modellist.savePromise()",error:e};return n._lazyFireErrorEvent(r),e})},submitPromise:function(t){var n=this,r=[];return n.each(function(e){r.push(e.submitPromise(t))}),e.batch.apply(e,r).then(function(e){var r={options:t,src:"submit"};return n._submitEvent||(n._submitEvent=n.publish(i,{preventable:!1})),n.fire(i,r),e},function(e){var r={options:t,src:"Modellist.submitPromise()",error:e};return n._lazyFireErrorEvent(r),e})},_lazyFireErrorEvent:function(e){var t=this;t._errorEvent||(t._errorEvent=t.publish(n,{broadcast:1})),t.fire(n,e)}},!0),e.ITSAModellistSyncPromise=f,e.Base.mix(e.ModelList,[f])},"@VERSION@",{requires:["yui-base","base-base","base-build","node-base","json-parse","promise","model","model-list","gallery-itsamodelsyncpromise"]});
