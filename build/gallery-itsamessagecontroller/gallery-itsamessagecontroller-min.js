YUI.add("gallery-itsamessagecontroller",function(e,t){"use strict";function j(){j.superclass.constructor.apply(this,arguments)}var n,r=e.Array,i="application",s="boolean",o="error",u="info",a="warn",f="essage",l="m"+f,c=5e3,h="_pub_",p="new"+l,d=h+p,v=p+"_added",m=h+v,g="gallery-itsamessage",y="get",b="show",w="Date",E="Time",S="Confirmation",x=y+"Retry"+S,T=y+S,N=y+"Input",C=y+"Number",k=y+w,L=y+E,A=k+E,O=b+"M"+f,M=b+"Warning",_=b+"Error",D=b+"Status",P="_",H="base-build",B="slider";j.NAME="itsamessagecontroller",e.extend(j,e.Base),j.prototype.initializer=function(){var t=this;t.queue=[],e.later(c,t,t.readyPromise)},j.prototype.readyPromise=function(){var t=this;return t._readyPromise||(t._readyPromise=e.usePromise(g))},j.prototype[P+x]=function(e,t,n){return this._queueMessage(e,t,n,"{btn_abort}{btn_ignore}{btn_retry}","btn_retry","btn_abort",x,u)},j.prototype[P+T]=function(e,t,n){return this._queueMessage(e,t,n,"{btn_no}{btn_yes}","btn_yes","btn_no",T,u)},j.prototype[P+N]=function(t,n,r){console.log("_getInput");var i=this,o=typeof n=="string",a,f;return o||(r=n,n=t,t=null),r.formconfig||(r.formconfig={}),r.formconfig.fullselect=!0,r.formconfig.primarybtnonenter=!0,a=typeof r.formconfig.required===s&&r.formconfig.required,i.readyPromise().then(function(){return r.slider?e.usePromise(H,B):e.usePromise(H)}).then(function(){return f=e.Base.create("itsamessageinput",e.ITSAMessage,[],null,{ATTRS:{input:{value:r.value,formtype:r.slider?e.Slider:"number",formconfig:r.formconfig,validator:r.validator,validationerror:r.validationerror}}}),n+='<fieldset><div class="pure-control-group">{input}</div></fieldset>',i._queueMessage(t,n,r,(a?"":"{btn_cancel}")+"{btn_ok}","btn_ok","btn_cancel",N,u,f)})},j.prototype[P+C]=function(e,t,n){return this._queueMessage(e,t,n,"{btn_cancel}{btn_ok}","btn_ok","btn_cancel",C,u)},j.prototype[P+k]=function(e,t,n){return this._queueMessage(e,t,n,"{btn_cancel}{btn_ok}","btn_ok","btn_cancel",k,u)},j.prototype[P+L]=function(e,t,n){return this._queueMessage(e,t,n,"{btn_cancel}{btn_ok}","btn_ok","btn_cancel",L,u)},j.prototype[P+A]=function(e,t,n){return this._queueMessage(e,t,n,"{btn_cancel}{btn_ok}","btn_ok","btn_cancel",A,u)},j.prototype[P+O]=function(e,t,n){return this._queueMessage(e,t,n,"{btn_ok}","btn_ok",null,O,u)},j.prototype[P+M]=function(e,t,n){return this._queueMessage(e,t,n,"{btn_ok}","btn_ok",null,M,a)},j.prototype[P+_]=function(e,t,n){return this._queueMessage(e,t,n,"{btn_ok}","btn_ok",null,_,o)},j.prototype[P+D]=function(t,n,r){var s=this,o=typeof n=="string",a;return o||(r=n,n=t,t=null),a=e.merge(r,{title:t,message:n,footer:null,noButtons:!0,source:i,type:D,level:u}),s.readyPromise().then(function(){var t=new e.ITSAMessage(a);return s.queueMessage(t),t})},j.prototype.queueMessage=function(t){console.log("queueMessage "+t.get("message"));var n=this,r=t.get("autoDestroy"),i,s,o;return i=new e.Promise(function(e,t){s=e,o=t}),t||(t={}),t.promise=i,t.resolvePromise=s,t.rejectPromise=o,t.setLifeUpdate(!0),t.after("submit",function(){t.resolve()}),n[d]||(n[d]=e._publishAsync(p,{defaultTargetOnly:!0,emitFacade:!0,broadcast:2,defaultFn:e.rbind(n._defQueueFn,n),preventedFn:n._prevDefFn})),r>0&&t.promise.then(e.bind(n._autoDestroyMsg,n,t,r),e.bind(n._autoDestroyMsg,n,t,r)),e.fire(p,{model:t}),console.log("fireing "+p),i},j.prototype.destructor=function(){var t=this,n=t.queue;t.removeTarget(e),r.each(n,function(e){e.detachAll(),e.destroy(),e=null}),n.length=0},j.prototype._autoDestroyMsg=function(t,n){e.later(n,null,function(){console.log("DESTROYING "+t.get("title")),t.detachAll(),t.destroy(),t=null})},j.prototype._prevDefFn=function(e){e.message.promiseReject(new Error("preventDefaulted"))},j.prototype._defQueueFn=function(t){console.log("_defQueueFn "+t.model.get("message"));var n=this,r=t.model,i=n.queue;return i.push(r),n[m]||(n[m]=e.publish(v,{defaultTargetOnly:!0,broadcast:2,emitFacade:!0})),console.log("fireing "+v),e.fire(v,{model:r}),r.promise.then(null,function(){return!0}).then(function(){var e=i.indexOf(r);e>-1&&i.splice(e,1)})},j.prototype._queueMessage=function(t,n,r,o,u,a,f,l,c){console.log("_queueMessage "+t);var h=this,p=typeof n=="string",d,v;return p||(r=n,n=t,t=null),v=r&&typeof r.imageButtons===s&&r.imageButtons,v&&(o=o.replace(/\{btn_/g,"{imgbtn_"),u&&(u=u.replace(/btn_/g,"imgbtn_"))),d=e.merge(r,{title:t,message:n,footer:o,source:i,primaryButton:u,rejectButton:a,type:f,level:l}),r.level&&(d.level=r.level),r.primaryButton&&(d.primaryButton=r.primaryButton),d.level||(d.level=r.type),h.readyPromise().then(function(){return h.queueMessage(c?new c(d):new e.ITSAMessage(d))})},e._publishAsync=function(t,n){var r=this,i=this.publish(t,n);i._firing=new e.Promise(function(e){e()}),i.fire=function(t){var n=e.Array(arguments,0,!0),s={id:i.id,next:i,silent:i.silent,stopped:0,prevented:0,bubbling:null,type:i.type,defaultTargetOnly:i.defaultTargetOnly},o;i._firing=i._firing.then(function(){i.details=n;var e=i._subscribers,u=[],a,f,l;u.push.apply(u,t),a=i._createFacade(u),a.target=a.target||r;if(e)for(f=0,l=e.length;f<l;++f)try{e[f].fn.call(e[f].context,a)}catch(c){}return i.bubbles&&!i.stopped&&(r.bubble(i,n,null,s),a.prevented=Math.max(a.prevented,s.prevented)),a.prevented?i.preventedFn.call(r,a).then(null,function(e){return!1}):i.defaultFn.call(r,a).then(function(){e=i._afters;if(e)for(f=0,l=e.length;f<l;++f)try{e[f].fn.call(e[f].context,a)}catch(t){}if(s.afterQueue)while(o=s.afterQueue.last())o()}).then(null,function(e){return!1})})},i._fire=function(e){return i.fire(e[0])}},e.Global.ITSAMessageController||(e.Global.ITSAMessageController=new j),n=e.ITSAMessageController=e.Global.ITSAMessageController,e[x]=e.bind(n[P+x],n),e[N]=e.bind(n[P+N],n),e[C]=e.bind(n[P+C],n),e[k]=e.bind(n[P+k],n),e[L]=e.bind(n[P+L],n),e[A]=e.bind(n[P+A],n),e[O]=e.bind(n[P+O],n),e[M]=e.bind(n[P+M],n),e[_]=e.bind(n[P+_],n),e[D]=e.bind(n[P+D],n)},"@VERSION@",{requires:["yui-base","oop","base-base","event-custom-complex","promise","gallery-itsamodulesloadedpromise"]});
