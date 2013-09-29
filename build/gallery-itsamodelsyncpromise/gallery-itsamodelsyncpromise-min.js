YUI.add("gallery-itsamodelsyncpromise",function(e,t){"use strict";var n=e.Model,r=e.Object,i=e.Array,s="destroy",o="load",u="save",a="error",f="delete",l="read",c=s+"ed",h="_published",p="Promise",d=function(t){if(typeof t=="string")try{return e.JSON.parse(t)}catch(n){return this.fire(a,{error:n,response:t,src:"parse"}),{}}return t||{}};i.each([o,s,u],function(e){n.prototype[e]=function(t,n){var r=this,i;return(i=r[e+p](t))&&n&&i.then(function(e){n(null,e)},function(e){n(e)}),r},n.prototype[e+p]=function(t){return this._createPromise(e,t)}}),n.prototype.publishAsync=function(t,n){var r=this,i=this.publish(t,n);i._firing=new e.Promise(function(e){e()}),i.fire=function(t){var n=e.Array(arguments,0,!0),s={id:i.id,next:i,silent:i.silent,stopped:0,prevented:0,bubbling:null,type:i.type,defaultTargetOnly:i.defaultTargetOnly},o;i._firing=i._firing.then(function(){i.details=n;var e=i._subscribers,u=[],a,f,l;u.push.apply(u,t),a=i._createFacade(u),a.target=a.target||r;if(e)for(f=0,l=e.length;f<l;++f)try{e[f].fn.call(e[f].context,a)}catch(c){}return i.bubbles&&!i.stopped&&(r.bubble(i,n,null,s),a.prevented=Math.max(a.prevented,s.prevented)),a.prevented?i.preventedFn.call(r,a).then(null,function(e){return!1}):i.defaultFn.call(r,a).then(function(){e=i._afters;if(e)for(f=0,l=e.length;f<l;++f)try{e[f].fn.call(e[f].context,a)}catch(t){}if(s.afterQueue)while(o=s.afterQueue.last())o()}).then(null,function(e){return!1})},function(e){var t={error:e,src:"Model.publishAsync()"};r._lazyFireErrorEvent(t)})},i._fire=function(e){return i.fire(e[0])}},n.prototype._createPromise=function(t,n){var i=this,s,o,u,a;return s=new e.Promise(function(e,t){o=e,u=t}),a={promise:s,promiseResolve:o,promiseReject:u,response:"",parsed:{},options:e.merge(n)},typeof n=="object"&&r.each(n,function(e,t){a[t]=e}),i[h+t]||(i[h+t]=i.publishAsync(t,{defaultTargetOnly:!0,emitFacade:!0,defaultFn:i["_defFn_"+t],preventedFn:i._prevDefFn})),i.fire(t,a),s},n.prototype._defFn_destroy=function(e){var t=this,n=e.promiseResolve,r=e.promiseReject,o=e.options,u=o.remove||o[f],a,l,h;return t.get(c)?r(new Error("Model is already destroyed")):(h=function(){t._baseDestroy(),i.each(t.lists.concat(),function(e){e.remove(t,o)})},u?(a=function(e){var n={error:e,src:s,options:o};t._lazyFireErrorEvent(n),r(new Error(e))},l=function(e){h(),n(e)},t.syncPromise?t._syncTimeoutPromise(f,o).then(l,a):t.sync(f,o,function(e,t){e?a(e):l(t)})):(h(),n())),e.promise},n.prototype._defFn_load=function(e){var t=this,n=e.options,r,i;return r=function(r){var i={options:n,error:r,src:o};t._lazyFireErrorEvent(i),e.promiseReject(new Error(r))},i=function(r){var i;e.response=r,i=d(r),i.responseText&&(i=i.responseText),e.parsed=i,t.setAttrs(i,n),t.changed={},e.promiseResolve(r)},t.syncPromise?t._syncTimeoutPromise(l,n).then(i,r):t.sync(l,n,function(e,t){e?r(e):i(t)}),e.promise},n.prototype._defFn_save=function(e){var t=this,n=t.isNew()?"create":"update",i=e.options,s=e.promiseReject,o,a,f,l={options:i,method:n};return t._validate(t.toJSON(),function(c){c?(l.error=c,l.src=u,t._lazyFireErrorEvent(l),s(new Error(c))):(o=function(e){l.error=e,l.src=u,t._lazyFireErrorEvent(l),s(new Error(e))},a=function(n){var s;e.response=n,s=d(n),s.responseText&&(s=s.responseText),r.keys(s).length>0&&(e.parsed=s,s.id===-1?t.destroy():t.setAttrs(s,(i.fromInternal=!0)&&i)),t.changed={},e.promiseResolve(n)},!t.toJSONUI||(f=t.getUnvalidatedUI())&&f.isEmpty()?t.syncPromise?t._syncTimeoutPromise(n,i).then(a,o):t.sync(n,i,function(e,t){e?o(e):a(t)}):(o(t._intl.unvalidated),t.fire("validationerror",{target:t,nodelist:f,src:u})))}),e.promise},n.prototype._prevDefFn=function(e){e.promiseReject(new Error("preventDefaulted"))},n.prototype._lazyFireErrorEvent=function(e){var t=this;t._errorEvent||(t._errorEvent=t.publish(a,{broadcast:1})),t.fire(a,e)},n.prototype._syncTimeoutPromise=function(t,n){var r=this,i;return i=r.syncPromise(t,n),i instanceof e.Promise||(i=new e.Promise(function(e,n){var r="syncPromise is rejected --> "+t+" not defined as a Promise inside syncPromise()";n(new Error(r))})),i}},"@VERSION@",{requires:["yui-base","base-base","base-build","node-base","json-parse","promise","model"]});
