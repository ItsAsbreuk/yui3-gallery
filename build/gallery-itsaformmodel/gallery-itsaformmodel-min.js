YUI.add("gallery-itsaformmodel",function(e,t){"use strict";var n=e.Array,r=e.Object,i=e.Node,s=e.Lang,o=e.Intl,u=e.ITSAFormElement,a="notification",f="datachanged",l="wantreload",c="noreloadmsg",h="UNDEFINED FORM-ELEMENT",p="inputrequired",d="itsa-invisible",v='<span style="background-color:F00; color:#FFF">DUPLICATED FORMELEMENT is not allowed</span>',m=1e4,g=1728e5,y=864e5,b="true",w='i[class^="itsaicon-"], i[class*=" itsaicon-"]',E="itsa-busy",S="itsaicon-form-loading",x="data-spinbusy",T="disabled",N="was-"+T,C="button",k="pure-"+C+"-"+T,L="-before",A='span[data-for="',O="yui3-slider",M="itsabutton-asktoclick",_={button:!0,destroy:!0,remove:!0,reset:!0,save:!0,submit:!0,load:!0},D="gallery-itsa",P=D+"formmodel",H="function",B="renderpromise",j="click",F="save",I="load",q="destroy",R="remove",U="submit",z="date",W="time",X=z+W,V="number",$="string",J="boolean",K="picker",Q="data",G="value",Y="type",Z=Q+"-"+C+"sub"+Y,et=Q+"-"+C+Y,tt=Q+"-modelattribute",nt="id",rt=Q+"-content",it={text:!0,number:!0,password:!0,textarea:!0,email:!0,url:!0},st="reset",ot="focusnext",ut="validationerror",at="uichanged",ft=C+":"+j,lt=q+":"+j,ct=R+":"+j,ht=U+":"+j,pt=st+":"+j,dt=F+":"+j,vt=I+":"+j,mt=z+K+j,gt=W+K+j,yt=z+W+K+j,bt=U+":auto",wt=e.ITSAFormModel=e.Base.create("itsaformmodel",e.Model,[],{},{_ATTR_CFG:["formtype","formconfig","validationerror"]});wt.prototype._widgetValueFields={},wt.prototype._allowedFormTypes={text:!0,number:!0,password:!0,textarea:!0,checkbox:!0,date:!0,time:!0,datetime:!0,email:!0,url:!0,plain:!0},wt.prototype._dateTimeTypes={date:!0,time:!0,datetime:!0},wt.prototype._datePickerClicks={datepickerclick:!0,timepickerclick:!0,datetimepickerclick:!0},wt.prototype.initializer=function(){var t=this;t._eventhandlers=[],t._FORM_elements={},t._ATTRS_nodes={},t._knownNodeIds={},t._lifeUpdate=!1,t._intl=o.get(P),t._renderBtnFns={button:t.renderBtn,destroy:t.renderDestroyBtn,remove:t.renderRemoveBtn,reset:t.renderResetBtn,save:t.renderSaveBtn,load:t.renderLoadBtn,submit:t.renderSubmitBtn},t.publish(at,{defaultFn:e.bind(t._defFn_uichanged,t),emitFacade:!0}),t.publish(lt,{defaultFn:e.bind(t._defFn_destroy,t),emitFacade:!0}),t.publish(ct,{defaultFn:e.bind(t._defFn_remove,t),emitFacade:!0}),t.publish(ht,{defaultFn:e.bind(t._defFn_submit,t),emitFacade:!0}),t.publish(bt,{defaultFn:e.bind(t._defFn_submitauto,t),emitFacade:!0}),t.publish(pt,{defaultFn:e.bind(t._defFn_reset,t),emitFacade:!0}),t.publish(dt,{defaultFn:e.bind(t._defFn_save,t),emitFacade:!0}),t.publish(vt,{defaultFn:e.bind(t._defFn_load,t),emitFacade:!0}),t.publish(mt,{defaultFn:e.bind(t._defFn_changedate,t),emitFacade:!0}),t.publish(gt,{defaultFn:e.bind(t._defFn_changedate,t),emitFacade:!0}),t.publish(yt,{defaultFn:e.bind(t._defFn_changedate,t),emitFacade:!0}),t._bindUI(),t._gcTimer=e.later(y,t,t._garbageCollect,null,!0)},wt.prototype.crossValidation=function(){},wt.prototype.disableUI=function(){var t=this,n=t._FORM_elements;r.each(n,function(t,n){var r=e.one("#"+n),i=t.widget,s,o,u,a;r&&(i?(o=i.get(T),o||(i.disable(),i.getClassName()===O&&(u=e.one(A+n+'"]'),u&&u.setAttribute(T,T)))):(s=r.get("tagName")==="BUTTON"&&r.getAttribute(Y)===C,a=r.getAttribute("data-datetimepicker")===b,o=r.get(T),s&&(o=o||r.hasClass(k),o||r.addClass(k)),o||r.setAttribute(T,T),r.setData(N,o),a&&(u=e.one(A+n+'"]'),u&&u.setAttribute(T,T))),o&&r.setData(L,!0))})},wt.prototype.enableUI=function(){var t=this,n=t._FORM_elements;r.each(n,function(t,n){var r=e.one("#"+n),i=t.widget,s,o,u,a;r&&(o=r.getData(L),o?r.clearData(L):i?(i.enable(),i.getClassName()===O&&(u=e.one(A+n+'"]'),u&&u.removeAttribute(T))):(s=r.get("tagName")==="BUTTON"&&r.getAttribute(Y)===C,a=r.getAttribute("data-datetimepicker")===b,r.getData(N)||(r.removeAttribute(T),s&&r.removeClass(k)),r.clearData(N),a&&(u=e.one(A+n+'"]'),u&&u.removeAttribute(T))))})},wt.prototype.getCurrentFormElement=function(e){return this.getCurrentFormElements(e)[0]||null},wt.prototype.getCurrentFormElements=function(t){var i=this,s=i._ATTRS_nodes[t],o=[],u;return s?n.each(s,function(t){var n=e.one("#"+t);n&&(u=i._FORM_elements[t],u.node=n,o.push(u))}):r.each(i._FORM_elements,function(n){var r=e.one("#"+n.nodeid);r&&r.getAttribute("name")===t&&(n.node=r,o.push(n))}),o},wt.prototype.getUI=function(t){var n=this,r,i,o,u,a,f,l,c;return u=n._ATTRS_nodes[t],o=u&&u.length>0&&u[0],i=n._FORM_elements,r=o&&i[o],r&&(a=e.one("#"+o))&&a.getAttribute(tt)&&(l=r.widget,c=r.type,f=l?n._getWidgetValue(l,c):a.get(G),s.isValue(f)&&(n._dateTimeTypes[c]&&(f=new Date(parseInt(f,10))),c===V&&(f=r.config.digits?parseFloat(f):parseInt(f,10)))),f},wt.prototype.getUnvalidatedUI=function(){var t=this,i,o,u,a=[];return r.each(this._FORM_elements,function(n){n.widget||(i=e.one("#"+n.nodeid),i&&(o=t._validValue(i,n,n.name,i.get(G)),t._setNodeValidation(i,o),o||a.push(i)))}),u=t.crossValidation(),s.isArray(u)&&u.length>0&&n.each(u,function(r){var i=r.attribute,s=i&&t._ATTRS_nodes[i];s&&n.each(s,function(n){var i=e.one("#"+n),s=r.validationerror,o;i&&(o=typeof s===$?s:null,t._setNodeValidation(i,!1,o),a.push(i))})}),new e.NodeList(a)},wt.prototype[R]=function(){this.fire(R)},wt.prototype.renderBtn=function(e,t){return this._renderBtn(e,t,C)},wt.prototype.renderDestroyBtn=function(e,t){return this._renderBtn(e,t,q)},wt.prototype.renderLoadBtn=function(e,t){return this._renderBtn(e,t,I)},wt.prototype.renderRemoveBtn=function(e,t){return this._renderBtn(e,t,R)},wt.prototype.renderResetBtn=function(e,t){return this._renderBtn(e,t,st)},wt.prototype.renderSaveBtn=function(e,t){return this._renderBtn(e,t,F)},wt.prototype.renderSubmitBtn=function(e,t){return this._renderBtn(e,t,U)},wt.prototype.renderFormElement=function(t){var r=this,s=r._knownNodeIds,o,a,f,l,c,p,g,y,b,w,E,S,x,T;return o=r._FORM_elements,a=r._ATTRS_nodes,f=r.get(t),l=r._getAttrCfg(t),g=l.formtype||"text",S=typeof g===H&&g.NAME,S||r._allowedFormTypes[g]?(y=l.formconfig||{},y.value=f,S&&(b=r._getWidgetValueField(g),y.widgetconfig||(y.widgetconfig={}),x=typeof b!==$,x?n.each(b,function(e){y.widgetconfig
[e]=f}):y.widgetconfig[b]=f),y.modelattribute=!0,y.name=t,y.tooltipinvalid=l.validationerror,y.removerequired=!0,delete y.pattern,y.removepattern=!0,y.hideatstartup=!0,c=u.getElement(g,y),w=c.nodeid,o[w]=c,a[t]||(a[t]=[]),a[t].push(w),E=c.widget,E?(T=g.NAME==="editorBase",e.use(T?D+"editor"+B:D+"widget"+B,function(){E.renderPromise().then(function(){var t=e.one("#"+w);s[w]?t.insert(v,"replace"):(s[w]=!0,T&&t.removeClass(d),r._modelToUI(w),!T&&t.removeClass(d))})}),x?n.each(b,function(t){r._eventhandlers.push(E.after(t+"Change",function(t){var n=at,i={target:r,value:t.newVal,formElement:c,node:e.one("#"+w),nodeid:w,type:n};r.fire(n,i)}))}):r._eventhandlers.push(E.after(b+"Change",function(t){var n=at,i={target:r,value:t.newVal,formElement:c,node:e.one("#"+w),nodeid:w,type:n};r.fire(n,i)}))):i.availablePromise("#"+w,m).then(function(t){s[w]?t.insert(v,"replace"):(s[w]=!0,r._modelToUI(w),t.removeClass(d),r._dateTimeTypes[g]&&(t=e.one('span.formatvalue[data-for="'+w+'"]'),t&&t.removeClass(d)))},function(e){}),p=c.html,c.widget&&c.widget.addTarget(r)):p=h,p},wt.prototype.reset=function(){var e=this,t;e._internalChange=!0,e.constructor.superclass.constructor.superclass.reset.apply(e,arguments),arguments.length===0&&(e._internalChange=null,e._modelToUI(),e._removeValidation(),t={type:st,target:e},e.fire(st,t))},wt.prototype.setLifeUpdate=function(e){var t=this;return typeof e===J&&(t._lifeUpdate=e),t},wt.prototype.setResetAttrs=function(){console.log("setResetAttrs");var e=this,t=e.getAttrs();delete t.clientId,delete t.destroyed,delete t.initialized,e.idAttribute!==nt&&delete t.id,r.each(t,function(t,n){t&&e._state.add(n,"initValue",t)})},wt.prototype.setWidgetValueField=function(e,t){this._widgetValueFields[e]=t},wt.prototype[U]=function(){this.sync(U,null,function(){})},wt.prototype.toJSONUI=function(t){var i=this,o={},u=i.getAttrs(),a=i._renderBtnFns,f,l,c,h,p;return delete u.clientId,delete u.destroyed,delete u.initialized,i.idAttribute!==nt&&delete u.id,r.each(u,function(e,t){o[t]=i.renderFormElement(t)}),s.isObject(t)?(f=t.propertykey,l=t.type,c=t.labelHTML,h=t.config,f&&l&&a[l]&&(o[f]=e.bind(a[l],i,c,h)())):s.isArray(t)&&n.each(t,function(t){f=t.propertykey,l=t.type,c=t.labelHTML,h=t.config,f&&l&&a[l]&&(o[f]=e.bind(a[l],i,c,h)())}),p=i.toJSON(),r.each(p,function(e,t){o["_"+t]=e}),o},wt.prototype.UIToModel=function(t){var n=this,i,o,u,a,f,l,c,h;o=n._FORM_elements,i=t&&o[t],i&&(a=e.one("#"+t))&&a.getAttribute(tt)?(c=i.widget,h=i.type,f=c?n._getWidgetValue(c,h):a.get(G),l=i.name,s.isValue(f)&&(u={formelement:!0},n._dateTimeTypes[h]&&(f=new Date(parseInt(f,10))),h===V&&(f=i.config.digits?parseFloat(f):parseInt(f,10)),n.set(l,f,u))):t||r.each(n._FORM_elements,function(e,t){n.UIToModel(t)})},wt.prototype.validated=function(){return this.getUnvalidatedUI().size()===0},wt.prototype.destructor=function(){var e=this;e._clearEventhandlers(),e._removeTargets(),e._FORM_elements={},e._ATTRS_nodes={},e._widgetValueFields={},e._knownNodeIds={},e._gcTimer.cancel()},wt.prototype._bindUI=function(){var t=this,n=t._eventhandlers,r=e.one("body");n.push(r.delegate([mt,gt,yt,ft,vt,dt,lt,ct,ht,pt],function(e){var n=e.type,r=e.target,i,s,o;t._FORM_elements[r.get(nt)]&&(e.preventDefault(),s=r.getAttribute(G),t._datePickerClicks[n]&&(o=new Date,o.setTime(parseInt(s,10)),s=o),i={target:t,value:s,formElement:t._FORM_elements[r.get(nt)],buttonNode:r,type:n},t.fire(n,i))})),n.push(r.delegate("click",function(e){e.preventDefault()},".itsa-widget-parent")),n.push(r.delegate("valuechange",function(e){var n=e.target,r=at,i={target:t,value:n.get(G),formElement:t._FORM_elements[n.get(nt)],node:n,nodeid:n.get(nt),type:r};t.fire(r,i)},function(e,n){return n&&n.target&&t._FORM_elements[n.target.get(nt)]})),n.push(t.after("*:change",function(n){!t._internalChange&&!n.formelement&&!n.fromInternal?e.use(D+"dialog",function(){var n=t._intl;t._lifeUpdate?e.confirm(n[a],n[f]+"<br />"+n[l]+"? ("+n[c]+").").then(e.bind(t._modelToUI,t,null),e.bind(t.UIToModel,t,null)):e.confirm(n[a],n[f]+"<br />"+n[l]+"?").then(e.bind(t._modelToUI,t,null))}):n.fromInternal&&t._modelToUI()})),n.push(r.delegate("keypress",function(e){e.halt();var n=e.target,r=n.getAttribute("data-submitonenter")==="true",i,s;r?(i=bt,s={target:t,type:i},t.fire(i,s)):(i=ot,s={target:e.target,type:i},t.fire(i,s))},function(e,n){var r=t._FORM_elements[n.target.get(nt)];return r&&n.keyCode===13&&it[r.type]})),n.push(e.Intl.after("intl:langChange",function(){t._intl=e.Intl.get(P)})),n.push(e.on(M,function(e){var n=e.buttonNode,r;t._FORM_elements[n.get("id")]&&(r=n.get("value"),t.fire((_[r]?r:C)+":click",{buttonNode:n,value:r}))}))},wt.prototype._clearEventhandlers=function(){n.each(this._eventhandlers,function(e){e.detach()})},wt.prototype._defFn_destroy=function(){this.destroyPromise()},wt.prototype._defFn_changedate=function(t){var n=t.target,r=t.type,i=t.buttonNode,o=e.ItsaDateTimePicker,u=t.formElement,a=s.isDate(t.value)?t.value:new Date,f,l,c;r===mt?f=e.bind(o.getDate,o):r===gt?f=e.bind(o.getTime,o):r===yt&&(f=e.bind(o.getDateTime,o)),f(new Date(a),{alignToNode:i,modal:!0,forceSelectdate:!1}).then(function(e){l=u.config.format,n._updateDateTimeUI(u.name,e,r,l),n._lifeUpdate&&n.UIToModel(i.get(nt))},function(){return!0}).then(function(){var e=ot,t={target:i,type:e};i&&(i.removeAttribute(rt),i.focus(),c=i.getAttribute(Q+"-contentvalid"),c&&i.setAttribute(rt,c)),n.fire(e,t)})},wt.prototype._defFn_load=function(t){var n=this,r=t.buttonNode,i=r.one(w),s=i&&t.buttonNode.getAttribute(x)===b;n.disableUI(),s&&i.addClass(E).addClass(S),n.loadPromise({fromInternal:!0}).then(function(){n.setResetAttrs(),r=e.one("#"+r.get("id")),r&&(s&&i.removeClass(E).removeClass(S),n.enableUI())},function(){r=e.one("#"+r.get("id")),r&&(s&&i.removeClass(E).removeClass(S),n.enableUI())})},wt.prototype._defFn_remove=function(t){var n=this,r=t.buttonNode,i=r.one(w),s=i&&t.buttonNode.getAttribute(x)===b;n.disableUI(),s&&i.addClass(E).addClass(S),n.destroyPromise({remove:!0}).then(function(){r=e.one("#"+r
.get("id")),r&&(s&&i.removeClass(E).removeClass(S),n.enableUI())},function(){r=e.one("#"+r.get("id")),r&&(s&&i.removeClass(E).removeClass(S),n.enableUI())})},wt.prototype._defFn_reset=function(){var e=this;e.reset()},wt.prototype._defFn_save=function(t){var n=this,r=t.buttonNode,i=r.one(w),s=i&&t.buttonNode.getAttribute(x)===b,o,u;u=n.getUnvalidatedUI(),u.isEmpty()?(n.disableUI(),s&&i.addClass(E).addClass(S),o=n.getAttrs(),n.UIToModel(),n.savePromise().then(function(){n.setResetAttrs(),r=e.one("#"+r.get("id")),r&&(s&&i.removeClass(E).removeClass(S),n.enableUI())},function(){n.setAttrs(o),r=e.one("#"+r.get("id")),r&&(n._modelToUI(),s&&i.removeClass(E).removeClass(S),n.enableUI())})):(n.fire(ut,{nodelist:u}),t.halt())},wt.prototype._defFn_submitauto=function(t){var n=this,i;r.some(n._FORM_elements,function(n,r){return n.type===C&&(i=e.one("#"+r))&&i.getAttribute(Z)===U&&(t.buttonNode=i),t.buttonNode}),n._defFn_submit(t)},wt.prototype._defFn_submit=function(t){var n=this,r=t.buttonNode,i=r&&r.one(w),s=i&&r.getAttribute(x)===b,o,u;u=n.getUnvalidatedUI(),u.isEmpty()?(n.disableUI(),s&&i.addClass(E).addClass(S),o=n.getAttrs(),n.UIToModel(),n.submitPromise().then(function(){r=r&&e.one("#"+r.get("id")),r&&(s&&i.removeClass(E).removeClass(S),n.enableUI())},function(){n.setAttrs(o),r=r&&e.one("#"+r.get("id")),r&&(n._modelToUI(),s&&i.removeClass(E).removeClass(S),n.enableUI())})):(n.fire(ut,{nodelist:u}),t.halt())},wt.prototype._defFn_uichanged=function(e){var t=this,r=e.formElement,i=r.name,s=r.type,o=e.value,u,a,f;r.widget?(f=this._getWidgetValueField(s),typeof f===$?t._updateSimularWidgetUI(e.nodeid,i,f,o):n.each(f,function(n){t._updateSimularWidgetUI(e.nodeid,i,n,o,!0)})):(u=e.node,a=t._validValue(u,r,i,o),t._updateSimularUI(u,i,o,a),t._lifeUpdate&&a&&t.UIToModel(u.get(nt)))},wt.prototype._garbageCollect=function(){var t=this,i=(new Date).getTime(),s=t._ATTRS_nodes,o=t._FORM_elements,u=t._knownNodeIds,a=[],f,l,c,h;i-=g,r.each(u,function(t,r,u){typeof t===J?e.one("#"+r)||(u[r]=(new Date).getTime()):t<i&&(c=o[r],h=c.name,f=s[h],l=f&&n.indexOf(f,r),delete o[r],l>0&&f.splice(l,1),a.push(r))}),n.each(a,function(e){delete u[e]})},wt.prototype._getWidgetValue=function(e,t){var n=this._getWidgetValueField(t);return e&&e.get(typeof n===$?n:n[0])},wt.prototype._getWidgetValueField=function(e){var t=typeof e===H&&e.NAME;return t&&this._widgetValueFields[e.NAME]||G},wt.prototype._modelToUI=function(t){var n=this,i,s,o,u,a,f,l,c,h;s=n._FORM_elements,i=t&&s[t],i&&(o=e.one("#"+t))&&o.getAttribute(tt)?(f=i.widget,a=i.name,u=n.get(a,u)||"",f?(h=this._getWidgetValueField(i.type),f.set(typeof h===$?h:h[0],u)):(l=i.type,n._dateTimeTypes[l]?(c=i.config.format,n._updateDateTimeUI(i.name,u,l,c)):o.set(G,u))):t||r.each(n._FORM_elements,function(e,t){n._modelToUI(t)})},wt.prototype._removeTargets=function(){var e=this;r.each(e._FORM_elements,function(t){var n=t.widget;n&&n.removeTarget(e)})},wt.prototype._removeValidation=function(){var t=this;r.each(t._FORM_elements,function(n){var r=e.one("#"+n.nodeid);r&&t._setNodeValidation(r,!0)})},wt.prototype._renderBtn=function(e,t,n){var r=this,s=r._FORM_elements,o=r._knownNodeIds,a,f;return t||(t={}),n||(n=C),e||(e=n),t[Q]||(t[Q]=""),t[G]||(t[G]=n),t[Q]+=" "+Z+'="'+n+'"',t.buttontype=C,t.labelHTML=e,a=u.getElement(C,t),f=a.nodeid,s[f]=a,i.availablePromise("#"+f).then(function(e){o[f]?e.insert(v,"replace"):o[f]=!0}),a.html},wt.prototype._updateDateTimeUI=function(t,r,i,o){var u=this,a=u._ATTRS_nodes[t];a&&(o||(i===z?o="%x":i===W?o="%X":o="%x %X"),n.each(a,function(t){var n=e.one("#"+t),i=e.one('span[data-for="'+t+'"]'),u=s.isDate(r);u&&n&&n.set(G,r.getTime()),i&&i.set("text",u?e.Date.format(r,{format:o}):"invalid Date: "+r)}))},wt.prototype._updateSimularUI=function(t,r,i,s){var o=this,u=o._ATTRS_nodes[r];u&&n.each(u,function(n){var r=e.one("#"+n);r&&(r!==t&&r.set(G,i),o._setNodeValidation(r,s))})},wt.prototype._setNodeValidation=function(e,t,n){var r;e.setAttribute(Q+"-valid",t),r=n||e.getAttribute(rt+(t?"valid":"invalid")),!t&&!n&&r===""&&(r=this._intl[p]),r?e.setAttribute(rt,r):e.removeAttribute(rt)},wt.prototype._updateSimularWidgetUI=function(t,r,i,s,o){var u=this,a=u._ATTRS_nodes[r],f,l;a&&n.each(a,function(n){f=u._FORM_elements[n],l=f&&f.widget,(n!==t||o)&&l&&l.set(i,s);if(l&&l.getClassName()===O){var r=e.one('span[data-for="'+n+'"]');r&&r.set("text",s)}}),u._lifeUpdate&&u.UIToModel(t)},wt.prototype._validValue=function(e,t,n,r){var i=this,s=t.type,o=s===z||s===W||s===X||s==="checkbox",u,a,f,l,c,h,p,d,v,m;return o||(u=i._getAttrCfg(n),d=u.formconfig,p=d&&d.required,h=typeof p===J&&p||s==="password",v=r===""&&!h,v||(a=u.validator,f=e.getAttribute(Q+"-pattern"),l=!a||a(s===V?t.config.digits?parseFloat(r):parseInt(r,10):r),c=!f||(new RegExp(f,"i")).test(r),m=r!==""||!h)),o||v||l&&c&&m},wt.prototype._widgetValueFields.itsacheckbox="checked",wt.prototype._widgetValueFields.itsaselectlist="index",wt.prototype._widgetValueFields.toggleButton=["checked","pressed"],wt.prototype._widgetValueFields.editorBase="content",n.each([C,F,q,R,I],function(t){var n={on:function(e,n,r){n._handle=e.on(j,function(e){var n=e.target;n&&n.get("tagName")!=="BUTTON"&&(n=n.get("parentNode"),e.target=n),n&&n.getAttribute(et)===C&&n.getAttribute(Z)===t&&r.fire(e)})},detach:function(e,t){t._handle.detach()}};n.delegate=n.on,n.detachDelegate=n.detach,e.Event.define(t+":"+j,n)})},"@VERSION@",{requires:["yui-base","intl","base-base","attribute-base","base-build","selector-css2","model","datatype-date-format","node-base","node-style","node-core","oop","yui-later","node-event-delegate","event-valuechange","event-synthetic","event-base","event-custom","gallery-itsanodepromise","gallery-itsadatetimepicker","gallery-itsamodelsyncpromise","gallery-itsaformelement"],lang:["ar","bg","bs","cs","da","de","en","es","fa","fi","fr","he","hi","hr","hu","it","ja","nb","nl","pl","pt","ru","sk","sr","sv","uk","zh"]});
