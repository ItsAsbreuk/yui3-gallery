YUI.add("gallery-itsamessagecontroller",function(e,t){"use strict";function p(){p.superclass.constructor.apply(this,arguments)}var n="application",r="error",i="message",s=5e3,o="_pub_",u="new"+i,a=o+u,f=u+"_added",l=o+f,c="model-list",h="gallery-itsamessage";p.NAME="itsamessagecontroller",e.extend(p,e.Base),p.prototype.initializer=function(){var t=this;e.later(s,t,t.readyPromise)},p.prototype.readyPromise=function(){var t=this;return t._readyPromise||(t._readyPromise=e.usePromise(c,h).then(e.bind(t._initQueue,t)))},p.prototype._initQueue=function(){var t=this;t.queue=new e.ModelList,e.later(2e3,null,function(){console.log(t.queue.size())},null,!0)},p.prototype.getConfirmation=function(e,t,n){return this._queueMessage(e,t,n,"{btn_no}{btn_yes}")},p.prototype.getInput=function(e,t,n){return this._queueMessage(e,t,n,"{btn_cancel}{btn_ok}")},p.prototype.showMessage=function(e,t,n){return console.log("showmessage "+e),this._queueMessage(e,t,n,"{btn_ok}")},p.prototype.queueMessage=function(t){console.log("queueMessage "+t.get("message"));var n=this,r,i,s;return r=new e.Promise(function(e,t){i=e,s=t}),t||(t={}),t.promise=r,t.resolvePromise=i,t.rejectPromise=s,n[a]||(n[a]=n._publishAsync(u,{defaultTargetOnly:!0,emitFacade:!0,defaultFn:e.rbind(n._defQueueFn,n),preventedFn:n._prevDefFn})),n.readyPromise().then(function(){console.log("fireing "+u),n.fire(u,{model:t}),t instanceof e.ITSAMessage||t.rejectPromise(new Error("Param added to queueMessage is no instance of Y.ITSAMessage"))}),r},p.prototype.destructor=function(){var e=this.queue;e&&e.destroy()},p.prototype._prevDefFn=function(e){e.message.promiseReject(new Error("preventDefaulted"))},p.prototype._defQueueFn=function(e){console.log("_defQueueFn "+e.model.get("message"));var t=this,n=e.model,r=t.queue;return r.add(n),t[l]||(t[l]=t.publish(f,{defaultTargetOnly:!0,emitFacade:!0})),console.log("fireing "+f),t.fire(f,{model:n}),n.promise.then(function(){r.remove(n)},function(){r.remove(n)})},p.prototype._queueMessage=function(t,r,i,s){console.log("_queueMessage "+t);var o=this,u=typeof r=="string",a,f;return u||(i=r,r=t,t=null),f=i&&typeof i.imagebuttons=="boolean"&&i.imagebuttons,f&&s.replace(/\{btn_/g,"{imgbtn_"),a={title:t,message:r,footer:s,source:n,level:i&&i.level&&i.type,options:i,target:i&&i.target},o.readyPromise().then(function(){return o.queueMessage(new e.ITSAMessage(a))})},p.prototype._publishAsync=function(t,n){var r=this,i=this.publish(t,n);i._firing=new e.Promise(function(e){e()}),i.fire=function(t){var n=e.Array(arguments,0,!0),s={id:i.id,next:i,silent:i.silent,stopped:0,prevented:0,bubbling:null,type:i.type,defaultTargetOnly:i.defaultTargetOnly},o;i._firing=i._firing.then(function(){i.details=n;var e=i._subscribers,u=[],a,f,l;u.push.apply(u,t),a=i._createFacade(u),a.target=a.target||r;if(e)for(f=0,l=e.length;f<l;++f)try{e[f].fn.call(e[f].context,a)}catch(c){}return i.bubbles&&!i.stopped&&(r.bubble(i,n,null,s),a.prevented=Math.max(a.prevented,s.prevented)),a.prevented?i.preventedFn.call(r,a).then(null,function(e){return!1}):i.defaultFn.call(r,a).then(function(){e=i._afters;if(e)for(f=0,l=e.length;f<l;++f)try{e[f].fn.call(e[f].context,a)}catch(t){}if(s.afterQueue)while(o=s.afterQueue.last())o()}).then(null,function(e){return!1})})},i._fire=function(e){return i.fire(e[0])}},YUI.Env.ITSAMessageController=new p},"@VERSION@",{requires:["yui-base","oop","base-base","promise","gallery-itsamodulesloadedpromise"]});
