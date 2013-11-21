YUI.add("gallery-itsaformmodel",function(e,t){"use strict";var n=e.Array,r=e.Object,i=e.Node,s=e.Lang,o=e.Intl,u=e.ITSAFormElement,a="notification",f="datachanged",l="wantreload",c="noreloadmsg",h="UNDEFINED FORM-ELEMENT",p="inputrequired",d="itsa-invisible",v='<span style="background-color:F00; color:#FFF">DUPLICATED FORMELEMENT is not allowed</span>',m=1e4,g=1728e5,y=864e5,b="true",w="disabled",E="was-"+w,S=w+"-checked",x="button",T="pure-"+x+"-"+w,N="-before",C='span[data-for="',k="yui3-slider",L="itsabutton-asktoclick",A="onenter",O="submit"+A,M="primarybtn"+A,_="data-",D=_+O,P=_+M,H=_+"focusnext"+A,B={button:!0,destroy:!0,remove:!0,reset:!0,save:!0,submit:!0,load:!0},j="gallery-itsa",F=j+"formmodel",I="function",q="renderpromise",R="click",U="save",z="load",W="destroy",X="remove",V="Promise",$="submit",J="date",K="time",Q=J+K,G="number",Y="string",Z="boolean",et="picker",tt="error",nt="data",rt="value",it="type",st=nt+"-"+x+"sub"+it,ot=nt+"-"+x+it,ut=nt+"-modelattribute",at="id",ft=nt+"-content",lt={text:!0,number:!0,password:!0,email:!0,url:!0},ct="reset",ht="focusnext",pt="validationerror",dt="uichanged",vt=x+":"+R,mt=W+":"+R,gt=X+":"+R,yt=$+":"+R,bt=ct+":"+R,wt=U+":"+R,Et=z+":"+R,St=J+et+R,xt=K+et+R,Tt=J+K+et+R,Nt=function(t){if(typeof t=="string")try{return e.JSON.parse(t)}catch(n){return this.fire(tt,{error:n,response:t,src:"parse"}),{}}return t||{}},Ct=e.ITSAFormModel=e.Base.create("itsaformmodel",e.Model,[],{},{_ATTR_CFG:["formtype","formconfig","validationerror"]});Ct.prototype._widgetValueFields={},Ct.prototype._allowedFormTypes={text:!0,number:!0,password:!0,textarea:!0,checkbox:!0,date:!0,time:!0,datetime:!0,email:!0,url:!0,plain:!0},Ct.prototype._dateTimeTypes={date:!0,time:!0,datetime:!0},Ct.prototype._datePickerClicks={datepickerclick:!0,timepickerclick:!0,datetimepickerclick:!0},Ct.prototype.initializer=function(){var t=this;t._eventhandlers=[],t._FORM_elements={},t._ATTRS_nodes={},t._knownNodeIds={},t._lifeUpdate=!1,t._intl=o.get(F),t._renderBtnFns={button:t.renderBtn,destroy:t.renderDestroyBtn,remove:t.renderRemoveBtn,reset:t.renderResetBtn,save:t.renderSaveBtn,load:t.renderLoadBtn,submit:t.renderSubmitBtn},t.publish(dt,{defaultFn:e.bind(t._defFn_uichanged,t),emitFacade:!0}),t.publish(mt,{defaultFn:e.bind(t.destroy,t),emitFacade:!0}),t.publish(gt,{defaultFn:e.bind(t.destroy,t,{remove:!0,fromInternal:!0}),emitFacade:!0}),t.publish(yt,{defaultFn:e.bind(t.submit,t,{fromInternal:!0}),emitFacade:!0}),t.publish(bt,{defaultFn:function(){t.reset()},emitFacade:!0}),t.publish(wt,{defaultFn:e.bind(t.save,t,{fromInternal:!0}),emitFacade:!0}),t.publish(Et,{defaultFn:e.bind(t.load,t,{fromInternal:!0}),emitFacade:!0}),t.publish(St,{defaultFn:e.bind(t._defFn_changedate,t),emitFacade:!0}),t.publish(xt,{defaultFn:e.bind(t._defFn_changedate,t),emitFacade:!0}),t.publish(Tt,{defaultFn:e.bind(t._defFn_changedate,t),emitFacade:!0}),t._bindUI(),t._gcTimer=e.later(y,t,t._garbageCollect,null,!0)},Ct.prototype.crossValidation=function(){},Ct.prototype.disableUI=function(){var t=this,n=t._FORM_elements;r.each(n,function(t,n){var r=e.one("#"+n),i=t.widget,s,o,u,a;r&&(i?(o=i.get(w)&&!r.getData(S),o||(i.disable(),i.getClassName()===k&&(u=e.one(C+n+'"]'),u&&u.setAttribute(w,w)))):(s=r.get("tagName")==="BUTTON"&&r.getAttribute(it)===x,a=r.getAttribute("data-datetimepicker")===b,o=r.get(w)&&!r.getData(S),s&&(o=o||r.hasClass(T)&&!r.getData(S),o||r.addClass(T)),o||r.setAttribute(w,w),r.setData(E,o),a&&(u=e.one(C+n+'"]'),u&&u.setAttribute(w,w))),r.setData(S,!0),o&&r.setData(N,!0))})},Ct.prototype.enableUI=function(){var t=this,n=t._FORM_elements;r.each(n,function(t,n){var r=e.one("#"+n),i=t.widget,s,o,u,a;r&&(o=r.getData(N),o?r.clearData(N):i?(i.enable(),i.getClassName()===k&&(u=e.one(C+n+'"]'),u&&u.removeAttribute(w))):(s=r.get("tagName")==="BUTTON"&&r.getAttribute(it)===x,a=r.getAttribute("data-datetimepicker")===b,r.getData(E)||(r.removeAttribute(w),s&&r.removeClass(T)),r.clearData(E),a&&(u=e.one(C+n+'"]'),u&&u.removeAttribute(w))),r.clearData(S))})},Ct.prototype.getCurrentFormElement=function(e){return this.getCurrentFormElements(e)[0]||null},Ct.prototype.getCurrentFormElements=function(t){var i=this,s=i._ATTRS_nodes[t],o=[],u;return s?n.each(s,function(t){var n=e.one("#"+t);n&&(u=i._FORM_elements[t],u.node=n,o.push(u))}):r.each(i._FORM_elements,function(n){var r=e.one("#"+n.nodeid);r&&r.getAttribute("name")===t&&(n.node=r,o.push(n))}),o},Ct.prototype.getUI=function(t){var n=this,r,i,o,u,a,f,l,c;return u=n._ATTRS_nodes[t],o=u&&u.length>0&&u[0],i=n._FORM_elements,r=o&&i[o],r&&(a=e.one("#"+o))&&a.getAttribute(ut)&&(l=r.widget,c=r.type,f=l?n._getWidgetValue(l,c):a.get(rt),s.isValue(f)&&(n._dateTimeTypes[c]&&(f=new Date(parseInt(f,10))),c===G&&(f=r.config.digits?parseFloat(f):parseInt(f,10)))),f},Ct.prototype.getUnvalidatedUI=function(){var t=this,i,o,u,a=[];return r.each(this._FORM_elements,function(n){n.widget||(i=e.one("#"+n.nodeid),i&&i.get("tagName")!=="BUTTON"&&(o=t._validValue(i,n,n.name,i.get(rt)),t._setNodeValidation(i,o),o||a.push(i)))}),u=t.crossValidation(),s.isArray(u)&&u.length>0&&n.each(u,function(r){var i=r.attribute,s=i&&t._ATTRS_nodes[i];s&&n.each(s,function(n){var i=e.one("#"+n),s=r.validationerror,o;i&&(o=typeof s===Y?s:null,t._setNodeValidation(i,!1,o),a.push(i))})}),new e.NodeList(a)},Ct.prototype[X]=function(){this.fire(X)},Ct.prototype.renderBtn=function(e,t){return this._renderBtn(e,t,x)},Ct.prototype.renderDestroyBtn=function(e,t){return this._renderBtn(e,t,W)},Ct.prototype.renderLoadBtn=function(e,t){return this._renderBtn(e,t,z)},Ct.prototype.renderRemoveBtn=function(e,t){return this._renderBtn(e,t,X)},Ct.prototype.renderResetBtn=function(e,t){return this._renderBtn(e,t,ct)},Ct.prototype.renderSaveBtn=function(e,t){return this._renderBtn(e,t,U)},Ct.prototype.renderSubmitBtn=function(e,t){return this._renderBtn(e,t,$)},Ct.prototype.renderFormElement=function(t){var r=this,s=r._knownNodeIds,o,a,f,l,c,p,g,y,b,w,E,S,x,T;return o=r._FORM_elements,a=r._ATTRS_nodes,f=r.get(t),l=r._getAttrCfg
(t),g=l.formtype||"text",S=typeof g===I&&g.NAME,S||r._allowedFormTypes[g]?(y=l.formconfig||{},y.value=f,S&&(b=r._getWidgetValueField(g),y.widgetconfig||(y.widgetconfig={}),x=typeof b!==Y,x?n.each(b,function(e){y.widgetconfig[e]=f}):y.widgetconfig[b]=f),y.modelattribute=!0,y.name=t,y.tooltipinvalid=l.validationerror,y.removerequired=!0,delete y.pattern,y.removepattern=!0,y.hideatstartup=!0,c=u.getElement(g,y),w=c.nodeid,o[w]=c,a[t]||(a[t]=[]),a[t].push(w),E=c.widget,E?(E.addTarget(r),T=g.NAME==="editorBase",e.use(T?j+"editor"+q:j+"widget"+q,function(){E.renderPromise().then(function(){var t=e.one("#"+w);s[w]?t.insert(v,"replace"):(s[w]=!0,T&&t.removeClass(d),r._modelToUI(w),!T&&t.removeClass(d))})}),x?n.each(b,function(t){r._eventhandlers.push(E.after(t+"Change",function(t){var n=dt,i={target:r,value:t.newVal,formElement:c,node:e.one("#"+w),nodeid:w,type:n};r.fire(n,i)}))}):r._eventhandlers.push(E.after(b+"Change",function(t){var n=dt,i={target:r,value:t.newVal,formElement:c,node:e.one("#"+w),nodeid:w,type:n};r.fire(n,i)}))):i.availablePromise("#"+w,m).then(function(t){s[w]?t.insert(v,"replace"):(s[w]=!0,r._modelToUI(w),t.removeClass(d),r._dateTimeTypes[g]&&(t=e.one('span.formatvalue[data-for="'+w+'"]'),t&&t.removeClass(d)))},function(e){}),p=c.html,c.widget&&c.widget.addTarget(r)):p=h,p},Ct.prototype.reset=function(){var e=this,t;e._internalChange=!0,Ct.superclass.reset.apply(e,arguments),arguments.length===0&&(e._internalChange=null,e._modelToUI(),e._removeValidation(),t={type:ct,target:e},e.fire(ct,t))},Ct.prototype.setLifeUpdate=function(e){var t=this;return typeof e===Z&&(t._lifeUpdate=e),t},Ct.prototype.setResetAttrs=function(){var e=this,t=e.getAttrs();delete t.clientId,delete t.destroyed,delete t.initialized,e.idAttribute!==at&&delete t.id,r.each(t,function(t,n){t&&e._state.add(n,"initValue",t)})},Ct.setWidgetValueField=function(e,t){this._widgetValueFields[e]=t},Ct.prototype.setWidgetValueField=Ct.setWidgetValueField,Ct.prototype[$]=function(e,t){var n=this,r;return(r=n.submitPromise(e))&&t&&r.then(function(e){t(null,e)},function(e){t(e)}),n},Ct.prototype[$+V]=function(e){return this._createPromise($,e)},Ct.prototype.toJSONUI=function(e){var t=this,i={},o=t.getAttrs(),u=t._renderBtnFns,a,f,l,c,h;return delete o.clientId,delete o.destroyed,delete o.initialized,t.idAttribute!==at&&delete o.id,r.each(o,function(e,n){i[n]=t.renderFormElement(n)}),s.isObject(e)?(a=e.propertykey,f=e.type,l=e.labelHTML,c=e.config,a&&f&&u[f]&&(i[a]=u[f].call(t,l,c))):s.isArray(e)&&n.each(e,function(e){a=e.propertykey,f=e.type,l=e.labelHTML,c=e.config,a&&f&&u[f]&&(i[a]=u[f].call(t,l,c))}),h=t.toJSON(),r.each(h,function(e,t){i["_"+t]=e}),i},Ct.prototype.UIToModel=function(t){var n=this,i,o,u,a,f,l,c,h;return o=n._FORM_elements,i=t&&o[t],i&&(a=e.one("#"+t))&&a.getAttribute(ut)?(c=i.widget,h=i.type,f=c?n._getWidgetValue(c,h):a.get(rt),l=i.name,s.isValue(f)&&(u={formelement:!0},n._dateTimeTypes[h]&&(f=new Date(parseInt(f,10))),h===G&&(f=i.config.digits?parseFloat(f):parseInt(f,10)),n.set(l,f,u))):t||r.each(n._FORM_elements,function(e,t){n.UIToModel(t)}),n},Ct.prototype.translate=function(e){return this._intl[e]||e},Ct.translatePromise=function(t){return e.usePromise("intl").then(function(){var e=o.get(F);return e[t]||t},function(){return t})},Ct.prototype.translatePromise=Ct.translatePromise,Ct.prototype.validated=function(){return this.getUnvalidatedUI().size()===0},Ct.prototype.destructor=function(){var e=this;e._clearEventhandlers(),e._removeTargets(),e._FORM_elements={},e._ATTRS_nodes={},e._widgetValueFields={},e._knownNodeIds={},e._gcTimer.cancel()},e.Node.prototype.displayInDoc=function(){var e=this,t=e.inDoc();while(e&&t)t=e.getStyle("display")!=="none",t&&(e=e.get("parentNode"));return t},Ct.prototype._bindUI=function(){var t=this,n=t._eventhandlers,i=e.one("body");n.push(i.delegate([St,xt,Tt,vt,Et,wt,mt,gt,yt,bt],function(e){var n=e.type,r=e.target,i=t._FORM_elements[r.get(at)],s,o,u;i&&(e.preventDefault(),o=r.getAttribute(rt),t._datePickerClicks[n]&&(u=new Date,u.setTime(parseInt(o,10)),o=u),s={target:t,value:o,formElement:t._FORM_elements[r.get(at)],buttonNode:r,type:n},t.fire(n,s))})),n.push(i.delegate("valuechange",function(e){var n=e.target,r=dt,i=t._FORM_elements[n.get(at)],s;i&&(s={target:t,value:n.get(rt),formElement:t._FORM_elements[n.get(at)],node:n,nodeid:n.get(at),type:r},t.fire(r,s))})),n.push(t.after("*:change",function(n){var i=n.changed,s=!1;!t._internalChange&&!n.formelement&&!n.fromInternal?(r.some(i,function(e,n){return s=t._ATTRS_nodes[n],s}),s&&e.use(j+"dialog",function(){var n=t._intl;t._lifeUpdate?e.confirm(n[a],n[f]+"<br />"+n[l]+"? ("+n[c]+").").then(e.bind(t._modelToUI,t,null),e.bind(t.UIToModel,t,null)):e.confirm(n[a],n[f]+"<br />"+n[l]+"?").then(e.bind(t._modelToUI,t,null))})):n.fromInternal&&t._modelToUI()})),n.push(i.delegate("keydown",function(e){e.halt();var n=e.target,r=n.getAttribute(D)==="true",i=n.getAttribute(P)==="true",s,o,u;i&&(u=t._findPrimaryBtnNode())?u.simulate(R):r?t.submit({fromInternal:!0}):(s=ht,o={target:e.target,type:s},t.fire(s,o))},function(e,n){var r=n.target,i=t._FORM_elements[r.get(at)];return i&&n.keyCode===13&&(lt[i.type]||r.getAttribute(D)==="true"||r.getAttribute(P)==="true"||r.getAttribute(H)==="true")})),n.push(t.on([wt,yt],function(e){var n=t.getUnvalidatedUI();n.isEmpty()?t.UIToModel():(e.preventDefault(),t.fire(pt,{target:t,nodelist:n,src:e.type}))})),n.push(e.Intl.on("intl:langChange",function(){t._intl=e.Intl.get(F)})),n.push(e.on(L,function(e){var n=e.buttonNode,r;t._FORM_elements[n.get("id")]&&(r=n.get("value"),t.fire((B[r]?r:x)+":click",{buttonNode:n,value:r}))}))},Ct.prototype._clearEventhandlers=function(){n.each(this._eventhandlers,function(e){e.detach()})},Ct.prototype._defFn_changedate=function(t){var n=t.target,r=t.type,i=t.buttonNode,o=e.ItsaDateTimePicker,u=t.formElement,a=s.isDate(t.value)?t.value:new Date,f,l,c;r===St?f=e.bind(o.getDate,o):r===xt?f=e.bind(o.getTime,o):r===Tt&&(f=e.bind(o.getDateTime,o)),f(new Date(a),{alignToNode
:i,modal:!0,forceSelectdate:!1}).then(function(e){l=u.config.format,n._updateDateTimeUI(u.name,e,r,l),n._lifeUpdate&&n.UIToModel(i.get(at))},function(){return!0}).then(function(){var e=ht,t={target:i,type:e};i&&(i.removeAttribute(ft),i.focus(),c=i.getAttribute(nt+"-contentvalid"),c&&i.setAttribute(ft,c)),n.fire(e,t)})},Ct.prototype["_defFn_"+$]=function(e){var t=this,n=e.options,i=e.promiseReject,s,o,u,a={options:n};return t._validate(t.toJSON(),function(f){f?(a.error=f,a.src=$,t._lazyFireErrorEvent(a),i(new Error(f))):(s=function(e){a.error=e,a.src=$,t._lazyFireErrorEvent(a),i(new Error(e))},o=function(i){var s;e.response=i,s=Nt(i),s.responseText&&(s=s.responseText),r.keys(s).length>0&&(e.parsed=s,t.setAttrs(s,(n.fromInternal=!0)&&n)),t.changed={},e.promiseResolve(i)},(u=t.getUnvalidatedUI())&&u.isEmpty()?t.syncPromise?t._syncTimeoutPromise($,n).then(o,s):t.sync($,n,function(e,t){e?s(e):o(t)}):(s(t._intl.unvalidated),t.fire(pt,{target:t,nodelist:u,src:$})))}),e.promise},Ct.prototype._defFn_uichanged=function(e){var t=this,r=e.formElement,i=r.name,s=r.type,o=e.value,u,a,f;r.widget?(f=this._getWidgetValueField(s),typeof f===Y?t._updateSimularWidgetUI(e.nodeid,i,f,o):n.each(f,function(n){t._updateSimularWidgetUI(e.nodeid,i,n,o,!0)})):(u=e.node,a=t._validValue(u,r,i,o),t._updateSimularUI(u,i,o,a),t._lifeUpdate&&a&&t.UIToModel(u.get(at)))},Ct.prototype._findPrimaryBtnNode=function(){var t=this._FORM_elements,n;return r.some(t,function(t,r){var i=t.config.primary,s=typeof i===Z&&i;return n=s&&e.one("#"+r),n}),n},Ct.prototype._garbageCollect=function(){var t=this,i=(new Date).getTime(),s=t._ATTRS_nodes,o=t._FORM_elements,u=t._knownNodeIds,a=[],f,l,c,h;i-=g,r.each(u,function(t,r,u){typeof t===Z?e.one("#"+r)||(u[r]=(new Date).getTime()):t<i&&(c=o[r],h=c.name,f=s[h],l=f&&n.indexOf(f,r),delete o[r],l>0&&f.splice(l,1),a.push(r))}),n.each(a,function(e){delete u[e]})},Ct.prototype._getWidgetValue=function(e,t){var n=this._getWidgetValueField(t);return e&&e.get(typeof n===Y?n:n[0])},Ct.prototype._getWidgetValueField=function(e){var t=typeof e===I&&e.NAME;return t&&this._widgetValueFields[e.NAME]||rt},Ct.prototype._modelToUI=function(t){var n=this,i,s,o,u,a,f,l,c,h;s=n._FORM_elements,i=t&&s[t],i&&(o=e.one("#"+t))&&o.getAttribute(ut)?(f=i.widget,a=i.name,u=n.get(a,u)||"",f?(h=this._getWidgetValueField(i.type),f.set(typeof h===Y?h:h[0],u)):(l=i.type,n._dateTimeTypes[l]?(c=i.config.format,n._updateDateTimeUI(i.name,u,l,c)):o.set(rt,u))):t||r.each(n._FORM_elements,function(e,t){n._modelToUI(t)})},Ct.prototype._removeTargets=function(){var e=this;r.each(e._FORM_elements,function(t){var n=t.widget;n&&n.removeTarget(e)})},Ct.prototype._removeValidation=function(){var t=this;r.each(t._FORM_elements,function(n){var r=e.one("#"+n.nodeid);r&&t._setNodeValidation(r,!0)})},Ct.prototype._renderBtn=function(e,t,n){var r=this,s=r._FORM_elements,o=r._knownNodeIds,a,f;return t||(t={}),n||(n=x),e||(e=n),t[nt]||(t[nt]=""),t[rt]||(t[rt]=n),t[nt]+=" "+st+'="'+n+'"',t.buttontype=x,t.labelHTML=e,a=u.getElement(x,t),f=a.nodeid,s[f]=a,i.availablePromise("#"+f).then(function(e){o[f]?e.insert(v,"replace"):o[f]=!0}),a.html},Ct.prototype._updateDateTimeUI=function(t,r,i,o){var u=this,a=u._ATTRS_nodes[t];a&&(o||(i===J?o="%x":i===K?o="%X":o="%x %X"),n.each(a,function(t){var n=e.one("#"+t),i=e.one('span[data-for="'+t+'"]'),u=s.isDate(r);u&&n&&n.set(rt,r.getTime()),i&&i.set("text",u?e.Date.format(r,{format:o}):"invalid Date: "+r)}))},Ct.prototype._updateSimularUI=function(t,r,i,s){var o=this,u=o._ATTRS_nodes[r];u&&n.each(u,function(n){var r=e.one("#"+n);r&&(r!==t&&r.set(rt,i),o._setNodeValidation(r,s))})},Ct.prototype._setNodeValidation=function(e,t,n){var r;e.setAttribute(nt+"-valid",t),r=n||e.getAttribute(ft+(t?"valid":"invalid")),!t&&!n&&r===""&&(r=this._intl[p]),r?e.setAttribute(ft,r):e.removeAttribute(ft)},Ct.prototype._updateSimularWidgetUI=function(t,r,i,s,o){var u=this,a=u._ATTRS_nodes[r],f,l;a&&n.each(a,function(n){f=u._FORM_elements[n],l=f&&f.widget,(n!==t||o)&&l&&l.set(i,s);if(l&&l.getClassName()===k){var r=e.one('span[data-for="'+n+'"]');r&&r.set("text",s)}}),u._lifeUpdate&&u.UIToModel(t)},Ct.prototype._validValue=function(e,t,n,r){var i=this,s=t.type,o=s===J||s===K||s===Q||s==="checkbox",u,a,f,l,c,h,p,d,v,m;return o||(u=i._getAttrCfg(n),d=u.formconfig,p=d&&d.required,h=typeof p===Z&&p||s==="password",v=r===""&&!h,v||(a=u.validator,f=e.getAttribute(nt+"-pattern"),l=!a||a(s===G?t.config.digits?parseFloat(r):parseInt(r,10):r),typeof l===Z||(l=!1),c=!f||(new RegExp(f,"i")).test(r),m=r!==""||!h)),o||v||l&&c&&m},Ct.prototype._widgetValueFields.itsacheckbox="checked",Ct.prototype._widgetValueFields.itsaselectlist="index",Ct.prototype._widgetValueFields.toggleButton=["checked","pressed"],Ct.prototype._widgetValueFields.editorBase="content",n.each([x,U,W,X,z],function(t){var n={on:function(e,n,r){n._handle=e.on(R,function(e){var n=e.target;n&&n.get("tagName")!=="BUTTON"&&(n=n.get("parentNode"),e.target=n),n&&n.getAttribute(ot)===x&&n.getAttribute(st)===t&&r.fire(e)})},detach:function(e,t){t._handle.detach()}};n.delegate=n.on,n.detachDelegate=n.detach,e.Event.define(t+":"+R,n)})},"@VERSION@",{requires:["yui-base","intl","base-base","attribute-base","base-build","selector-css2","model","datatype-date-format","node-base","node-style","node-core","oop","yui-later","node-event-delegate","node-event-simulate","event-valuechange","event-synthetic","event-base","event-custom-base","event-custom","json-parse","gallery-itsanodepromise","gallery-itsamodulesloadedpromise","gallery-itsadatetimepicker","gallery-itsamodelsyncpromise","gallery-itsaformelement"],lang:["ar","bg","bs","cs","da","de","en","es","fa","fi","fr","he","hi","hr","hu","it","ja","nb","nl","pl","pt","ru","sk","sr","sv","uk","zh"]});
