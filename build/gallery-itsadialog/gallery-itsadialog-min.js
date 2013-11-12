YUI.add("gallery-itsadialog",function(e,t){"use strict";function F(){F.superclass.constructor.apply(this,arguments)}var n=e.Array,r=e.Lang,i=335,s=5e3,o='<i class="itsa-dialogicon {icon}"></i>',u="_suspended",a="boolean",f="string",l="model",c="title",h="footer",p="info",d="warn",v="error",m="value",g="uppercase",y="lowercase",b="capitalize",w="itsa",E="dialog",S=w+E,x=w+"-"+E,T="escape:hide",N="visible",C="itsa-panelclosebtn",k="closebutton",L="btn_",A="button",O="Change",M="Transform",_=A+M,D="label"+M,P="up",H=x+p+P,B=x+d+P,j=x+v+P;F.NAME="itsadialog",e.ITSADialogClass=e.extend(F,e.ITSAMessageViewer,{},{ATTRS:{buttonTransform:{value:null,validator:function(e){return e===null||e===g||e===y||e===b}},labelTransform:{value:null,validator:function(e){return e===null||e===g||e===y||e===b}},showIcon:{value:!0,validator:function(e){return typeof e===a}}}}),F.prototype.initializer=function(){var t=this;t._eventhandlers=[],t._body=e.one("body"),t._panels={},t._viewName=S,e.later(s,t,t.isRendered)},F.prototype.isRendered=function(){var t=this;return t._renderPromise||(t._renderPromise=e.usePromise("gallery-itsaviewmodelpanel","gallerycss-itsa-dialog","gallerycss-itsa-form").then(e.bind(t._renderPanels,t)))},F.prototype.resurrect=function(e){var t=this;t.isRendered().then(function(){var n=t._panels[e.level];n&&n.set(N,!0,{silent:!0})})},F.prototype.suspend=function(e){var t=this;t.isRendered().then(function(){var n=t._panels[e.level];n&&n.set(N,!1,{silent:!0})})},F.prototype.viewMessage=function(t){var n=this;return n.isRendered().then(function(){return new e.Promise(function(r){var i=n._panels,s=i[t.level];n._showPanel(s,t),t._promise.then(function(){return s.set(N,!1,{silent:!0})},function(){return s.set(N,!1,{silent:!0})}).then(r).then(null,function(t){e.soon(function(){throw t})})})})},F.prototype.destructor=function(){var e=this._panels;this._clearEventhandlers(),e[p].destroy(),e[d].destroy(),e[v].destroy()},F.prototype._clearEventhandlers=function(){var e=this;n.each(e._eventhandlers,function(e){e.detach()})},F.prototype._renderPanels=function(){var t=this,r={visible:!1,centered:!0,modal:!0,editable:!0,minWidth:i,dragable:!0,maxWidth:550,buttonTransform:t.get(_),labelTransform:t.get(D),className:x},s=t._panels,o=t._eventhandlers,u,a,f;u=s[p]=new e.ITSAViewModelPanel(r),a=s[d]=new e.ITSAViewModelPanel(r),f=s[v]=new e.ITSAViewModelPanel(r),n.each([p,d,v],function(e){o.push(s[e].after("*:hide",function(e){var t=e.target,n=t.get(l),r=e.buttonNode,i=r&&r.get(m),s=n.rejectButton,o=r&&r.hasClass(C)&&(i=k),u=e.type===T||o||s&&(new RegExp(L+i+"$")).test(s);n.UIToModel(),n._set(A,i),u?n.reject(i):n.resolve(n.toJSON())}))}),o.push(t.on(D+O,function(e){var t=e.newVal;u.set(D,t),a.set(D,t),f.set(D,t)})),o.push(t.on(_+O,function(e){var t=e.newVal;u.set(_,t),a.set(_,t),f.set(_,t)})),o.push(u.on(N+O,function(e){t._body.toggleClass(H,e.newVal)})),o.push(a.on(N+O,function(e){t._body.toggleClass(B,e.newVal)})),o.push(f.on(N+O,function(e){t._body.toggleClass(j,e.newVal)})),u.render(),a.render(),f.render()},F.prototype._showPanel=function(e,t){var n=this,i=t.primaryButton,s=t.rejectButton,p=t.buttonLabels,d=t.hotKeys,v=t.customBtns,m=t.noButtons,g=t.closeButton,y=typeof t.noHideOnSubmit===a?t.noHideOnSubmit:!1,b=t[h],w=/btn_/.test(b),E=t.icon,S=E&&n.get("showIcon"),x,T;e.set("noHideOnSubmit",y),e.removeButtonLabel(),e.removeCustomBtn(),e.removeHotKey(),e.set("closeButton",typeof g===a?g:!w&&!m),e.set("closableByEscape",typeof s===f),e.set(h+"Template",m?null:b),p&&e.setButtonLabels(p),d&&e.setHotKeys(d),v&&e.addCustomBtns(v),!m&&b&&r.isValue(i)&&(x=e.get("footerView"),T=typeof i=="boolean"&&!i,T?x.removePrimaryButton():x.setPrimaryButton(i)),e.set(c,t[c]),e.set(l,t),e._body.toggleClass("itsa-hasicon",S),e.set("template",(S?r.sub(o,{icon:E}):"")+t.message),t[u]||e.show()},e.Global.ITSADialog||(e.Global.ITSADialog=new F),e.ITSADialog=e.Global.ITSADialog},"@VERSION@",{requires:["yui-base","promise","event-custom-base","yui-later","timers","oop","gallery-itsaviewmodelpanel","gallery-itsamodulesloadedpromise","gallery-itsamessageviewer"],skinnable:!0});
