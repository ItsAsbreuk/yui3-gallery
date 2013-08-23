YUI.add("gallery-itsaformmodel",function(e,t){"use strict";var n=e.Array,r=e.Object,i=e.Lang,s=e.ITSAFormElement,o="Data has been changed outside the form. Load it into the formelements? (if not, then the data will be reset to the current form-values)",u="Data has been changed outside the form. Load it into the formelements?",a="UNDEFINED FORM-ELEMENT",f="click",l="save",c="destroy",h="remove",p="cancel",d="submit",v="reset",m="date",g="time",y="picker",b="data",w="value",E="button",S="type",x=b+"-"+E+"sub"+S,T=b+"-"+E+S,N="focusnext",C="uichanged",k=E+f,L=c+f,A=h+f,O=d+f,M=p+f,_=v+f,D=l+f,P=m+y+f,H=g+y+f,B=m+g+y+f;e.ITSAFormModel=e.Base.create("itsaformmodel",e.Model,[],{_widgetValueFields:{},_allowedFormTypes:{text:!0,number:!0,password:!0,textarea:!0,checkbox:!0,date:!0,time:!0,datetime:!0,email:!0,url:!0},initializer:function(){var t=this;t._eventhandlers=[],t._FORM_elements={},t._ATTRS_nodes={},t._bkpAttrs=t.getAttrs(),t._lifeUpdate=!1,t._focusNextElements={text:!0,number:!0,password:!0,textarea:!0,email:!0,url:!0},t.publish(N,{defaultFn:e.bind(t.defFnFocusNext,t),emitFacade:!0}),t.publish(C,{defaultFn:e.bind(t._defFnUIChanged,t),emitFacade:!0}),t.publish(L,{defaultFn:e.bind(t._defFnDestroy,t),emitFacade:!0}),t.publish(A,{defaultFn:e.bind(t._defFnRemove,t),emitFacade:!0}),t.publish(O,{defaultFn:e.bind(t._defFnSubmit,t),emitFacade:!0}),t.publish(M,{defaultFn:e.bind(t._defFnCancel,t),emitFacade:!0}),t.publish(_,{defaultFn:e.bind(t._defFnReset,t),emitFacade:!0}),t.publish(D,{defaultFn:e.bind(t._defFnSave,t),emitFacade:!0}),t.publish(P,{defaultFn:e.bind(t._defFnChangeDate,t),emitFacade:!0}),t.publish(H,{defaultFn:e.bind(t._defFnChangeDate,t),emitFacade:!0}),t.publish(B,{defaultFn:e.bind(t._defFnChangeDate,t),emitFacade:!0}),t._bindUI()},defFnFocusNext:function(){},renderBtn:function(e,t){return this._renderBtn(e,t,E,!0)},renderCancelBtn:function(e,t){return this._renderBtn(e,t,p,!0)},renderDestroyBtn:function(e,t){return this._renderBtn(e,t,c,!0)},renderRemoveBtn:function(e,t){return this._renderBtn(e,t,h,!0)},renderResetBtn:function(e,t){return this._renderBtn(e,t,v)},renderSaveBtn:function(e,t){return this._renderBtn(e,t,l,!0)},renderSubmitBtn:function(e,t){return this._renderBtn(e,t,d)},renderFormElement:function(t){var n=this,r,i,o,u,f,l,c,h,p,d,v,m;return r=n._FORM_elements,i=n._ATTRS_nodes,o=n.get(t),u=n._getAttrCfg(t),c=u.formtype||"text",m=typeof c=="function"&&c.prototype.BOUNDING_TEMPLATE,m||n._allowedFormTypes[c]?(h=u.formconfig||{},h.value=o,m&&(p=n._getWidgetValueField(c),h.widgetconfig||(h.widgetconfig={}),h.widgetconfig[p]=o),h.modelattribute=!0,h.name=t,f=s.getElement(c,h),d=f.nodeid,r[d]=f,i[t]||(i[t]=[]),i[t].push(d),v=f.widget,v&&n._eventhandlers.push(v.after(p+"Change",function(t){var r=C,i={target:n,value:t.newVal,formElement:f,node:e.one("#"+d),nodeid:d,type:r};n.fire(r,i)})),l=f.html,f.widget&&f.widget.addTarget(n)):l=a,l},setLifeUpdate:function(e){var t=this;return typeof e=="boolean"&&(t._lifeUpdate=e),t},setResetAttrs:function(){var e=this;e._bkpAttrs=e.getAttrs()},setWidgetValueField:function(e,t){this._widgetValueFields[e]=t},UIToModel:function(t){var n=this,s,o,u,a,f,l,c,h;o=n._FORM_elements,s=t&&o[t],s&&(a=e.one("#"+t))&&a.getData("modelattribute")?(c=s.widget,h=s.type,f=c?n._getWidgetValue(c,h):a.get(w),l=s.name,i.isValue(f)&&(u={formelement:!0},(h==="date"||h==="time"||h==="date")&&(f=new Date(parseInt(f,10))),h==="number"&&(f=s.config.digits?parseFloat(f):parseInt(f,10)),n.set(l,f,u))):t||r.each(n._FORM_elements,function(e,t){n.UIToModel(t)})},destructor:function(){var e=this;e._autoSaveTimer&&e._autoSaveTimer.cancel(),e._fireEventTimer&&e._fireEventTimer.cancel(),e._clearEventhandlers(),e._removeTargets(),e._FORM_elements={},e._ATTRS_nodes={},e._focusNextElements={}},_bindUI:function(){var t=this,n=t._eventhandlers,r=e.one("body");n.push(r.delegate([P,H,B,k,D,L,A,M,O,_],function(e){var n=e.target,r=e.type,i=n.getAttribute(w),s={target:t,value:r===P||r===H||r===B?(new Date).setTime(parseInt(i,10)):i,formElement:t._FORM_elements[n.get("id")],buttonNode:n,type:r};t.fire(r,s)},function(e,n){return t._FORM_elements[n.target.get("id")]})),n.push(r.delegate("valuechange",function(e){var n=e.target,r=C,i={target:t,value:n.get(w),formElement:t._FORM_elements[n.get("id")],node:n,nodeid:n.get("id"),type:r};t.fire(r,i)},function(e,n){return t._FORM_elements[n.target.get("id")]})),n.push(t.after("*:change",function(n){n.formelement||e.use("gallery-itsadialog",function(){t._lifeUpdate?e.confirm(o).then(e.bind(t._modelToUI,t,null),e.bind(t.UIToModel,t,null)):e.confirm(u).then(e.bind(t._modelToUI,t,null))})})),n.push(r.delegate("keypress",function(e){e.preventDefault();var n=N,r={target:e.target,type:n};t.fire(n,r)},function(e,n){var r=t._FORM_elements[n.target.get("id")];return r&&n.keyCode===13&&t._focusNextElements[r.type]}))},_clearEventhandlers:function(){n.each(this._eventhandlers,function(e){e.detach()})},_defFnUIChanged:function(e){var t=this,n=e.formElement,r=n.name,i=e.value,s;n.widget?t._updateSimularWidgetUI(e.nodeid,r,t._getWidgetValueField(n.type),i):(s=e.node,t._updateSimularUI(s,r,i),t._lifeUpdate&&t.UIToModel(s.get("id")))},_defFnCancel:function(){var e=this;e.setAttrs(e._bkpAttrs)},_defFnDestroy:function(){this.destroyPromise()},_defFnChangeDate:function(t){e.use("gallery-itsadatetimepicker",function(){var n=t.target,r=t.type,s=t.buttonNode,o=e.ItsaDateTimePicker,u=t.formElement,a=i.isDate(t.value)?t.value:new Date,f,l;r===P?f=e.bind(o.getDate,o):r===H?f=e.bind(o.getTime,o):r===B&&(f=e.bind(o.getDateTime,o)),f(new Date(a),u.config).then(function(e){l=u.config.format,n._updateDateTimeUI(u.name,e,r,l),n._lifeUpdate&&n.UIToModel(s.get("id"))},function(){return!0}).then(function(){s&&s.focus()})})},_defFnRemove:function(){this.destroyPromise({remove:!0})},_defFnReset:function(){var e=this;e.setAttrs(e._bkpAttrs),e._modelToUI()},_defFnSubmit:function(){var e=this,t;t=e.getAttrs(),e.UIToModel(),e.submitPromise().then(null,function(){e.setAttrs(t),e._modelToUI
()})},_defFnSave:function(){var e=this,t;t=e.getAttrs(),e.UIToModel(),e.savePromise().then(null,function(){e.setAttrs(t),e._modelToUI()})},_getWidgetValue:function(e,t){return e&&e.get(this._getWidgetValueField(t))},_getWidgetValueField:function(e){var t=typeof e=="function"&&e.prototype.BOUNDING_TEMPLATE;return t&&this._widgetValueFields[e.NAME]||"value"},_modelToUI:function(t){var n=this,i,s,o,u,a,f,l,c,h;s=n._FORM_elements,i=t&&s[t],i&&(o=e.one("#"+t))&&o.getData("modelattribute")?(f=i.widget,a=i.name,u=n.get(a,u),f?f.set(n._getWidgetValueField(i.type),u):(c=i.type,l=c==="date"||c==="time"||c==="datetime",l?(h=i.config.format,n._updateDateTimeUI(i.name,u,c,h)):o.set("value",u))):t||r.each(n._FORM_elements,function(e,t){n._modelToUI(t)})},_removeTargets:function(){var e=this;r.each(e._FORM_elements,function(t){var n=t.widget;n&&n.removeTarget(e)})},_renderBtn:function(e,t,n,r){var i=this,o,u;return t||(t={}),n||(n=E),e||(e=n),u=t.value||e,t.buttonText=e,t.data||(t.data=""),r&&(t.data+=" "+x+'="'+n+'"'),o=s.getElement(n===d||n===v?n:E,t),i._FORM_elements[o.nodeid]=o,o.html},_updateDateTimeUI:function(t,r,i,s){var o=this,u=o._ATTRS_nodes[t];u&&(s||(i==="date"?s="%x":i==="time"?s="%X":s="%x %X"),n.each(u,function(t){var n=e.one('span[data-for="'+t+'"]');n&&n.set("text",e.Date.format(r,{format:s}))}))},_updateSimularUI:function(t,r,i){var s=this,o=s._ATTRS_nodes[r];o&&n.each(o,function(n){var r=e.one("#"+n);r&&r!==t&&r.set("value",i)}),s._lifeUpdate&&s.UIToModel(t.get("id"))},_updateSimularWidgetUI:function(t,r,i,s){var o=this,u=o._ATTRS_nodes[r],a,f;u&&n.each(u,function(n){a=o._FORM_elements[n],f=a&&a.widget,n!==t&&f&&f.set(i,s);if(f&&f.getClassName()==="yui3-slider"){var r=e.one('span[data-for="'+n+'"]');r&&r.set("text",s)}}),o._lifeUpdate&&o.UIToModel(t)}},{_ATTR_CFG:["formtype","formconfig"]}),e.ITSAFormModel.prototype._widgetValueFields.itsacheckbox="checked",e.ITSAFormModel.prototype._widgetValueFields.itsaselectlist="index",n.each([E,l,c,h,p],function(t){e.Event.define(t+f,{on:function(e,n,r){n._handle=e.on(f,function(e){var n=e.target;n.getAttribute(T)===E&&n.getAttribute(x)===t&&r.fire(e)})},detach:function(e,t){t._handle.detach()},delegate:function(e,n,r,i){n._delegatehandle=e.on(f,function(e){var n=e.target;i&&n.getAttribute(T)===E&&n.getAttribute(x)===t&&r.fire(e)},i)},detachDelegate:function(e,t){t._delegatehandle.detach()}})})},"@VERSION@",{requires:["yui-base","base-base","attribute-base","base-build","model","datatype-date-format","node-base","node-core","oop","node-event-delegate","event-synthetic","event-valuechange","event-base","gallery-itsamodelsyncpromise","gallery-itsaformelement"]});
