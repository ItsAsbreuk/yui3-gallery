YUI.add("gallery-itsamodellistsyncpromise",function(e,t){"use strict";function a(){}var n="error",r="save",i="submit",s="load",o="destroy",u=function(t){var n;try{n=e.JSON.parse(t)}catch(r){}return n};e.mix(a.prototype,{destroyPromise:function(t){var r=this,i=[];return r.each(function(e){i.push(e.destroyPromise(t))}),e.batch(i).then(function(){var e={options:t,src:"destroy"};r.fire(o,e)},function(e){var i={options:t,src:"destroy",error:e};r.fire(n,i)})},loadPromise:function(t){var r=this;return t=t||{},new e.Promise(function(e,i){r.sync("read",t,function(o,a){var f,l={options:t,response:a};o?(l.error=o,l.src="load",r.fire(n,l),i(new Error(o))):(r._loadEvent||(r._loadEvent=r.publish(s,{preventable:!1})),f=l.parsed=u(a),r.reset(f,t),r.fire(s,l),e(a,t))})})},savePromise:function(t){var i=this,s=[];return i.each(function(e){e.isModified()&&s.push(e.savePromise(t))}),e.batch(s).then(function(){var e={options:t,src:"save"};i.fire(r,e)},function(e){var r={options:t,src:"save",error:e};i.fire(n,r)})},submitPromise:function(t){var r=this,s=[];return r.each(function(e){s.push(e.submitPromise(t))}),e.batch(s).then(function(){var e={options:t,src:"submit"};r.fire(i,e)},function(e){var i={options:t,src:"submit",error:e};r.fire(n,i)})}},!0),e.ITSAModellistSyncPromise=a,e.Base.mix(e.ModelList,[a])},"@VERSION@",{requires:["yui-base","base-base","base-build","node-base","json-parse","promise","model","model-list","gallery-itsamodelsyncpromise"]});
