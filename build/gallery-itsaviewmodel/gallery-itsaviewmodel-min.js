YUI.add("gallery-itsaviewmodel",function(e,t){"use strict";function Xt(){}var n,r=e.Lang,i=e.Array,s=e.Object,o=e.Intl,u="itsabutton-iconleft",a='<i class="itsaicon-form-{type}"></i>',f=e.Template.Micro,l="FORM",c="Change",h="tagName",p="gallery-",d="itsaviewmodel",v="itsa-focused",m="styled",g="button",y="model",b="Save",w="Submit",E="Load",S="Destroy",x="Reset",T="Promise",N="destroyed",C="_defFn_",k="boolean",L="string",A="function",O="editable",M="container",_="_defPrevFn_",D={destroy:!0,remove:!0,reset:!0,save:!0,submit:!0,load:!0},P={button:!0,destroy:!0,remove:!0,reset:!0,save:!0,submit:!0,load:!0},H={btn_abort:!0,btn_cancel:!0,btn_close:!0,btn_destroy:!0,btn_ignore:!0,btn_load:!0,btn_no:!0,btn_ok:!0,btn_remove:!0,btn_reset:!0,btn_retry:!0,btn_save:!0,btn_submit:!0,btn_yes:!0,imgbtn_abort:!0,imgbtn_cancel:!0,imgbtn_close:!0,imgbtn_destroy:!0,imgbtn_ignore:!0,imgbtn_load:!0,imgbtn_no:!0,imgbtn_ok:!0,imgbtn_remove:!0,imgbtn_reset:!0,imgbtn_retry:!0,imgbtn_save:!0,imgbtn_submit:!0,imgbtn_yes:!0,spinbtn_load:!0,spinbtn_remove:!0,spinbtn_save:!0,spinbtn_submit:!0},B="destroy",j="remove",F="load",I="reset",q="save",R="submit",U="auto",z="click",W=z+"outside",X="abort",V="cancel",$="close",J="ignore",K="no",Q="ok",G="retry",Y="yes",Z="btn_",et=Z+X,tt=Z+V,nt=Z+$,rt=Z+B,it=Z+J,st=Z+F,ot=Z+K,ut=Z+Q,at=Z+j,ft=Z+I,lt=Z+G,ct=Z+q,ht=Z+R,pt=Z+Y,dt="img",vt=dt+et,mt=dt+tt,gt=dt+nt,yt=dt+rt,bt=dt+it,wt=dt+st,Et=dt+ot,St=dt+ut,xt=dt+at,Tt=dt+ft,Nt=dt+lt,Ct=dt+ct,kt=dt+ht,Lt=dt+pt,At="spin",Ot=At+st,Mt=At+at,_t=At+ct,Dt=At+ht,Pt="focusnext",Ht="validationerror",Bt="uichanged",jt=g+z,Ft=g+$,It=B+z,qt=j+z,Rt=F+z,Ut=R+z,zt=I+z,Wt=q+z;e.mix(Xt.prototype,{cleanupWidgets:function(t){var n=this,r=e.Widget;r&&n.all(".yui3-widget").each(function(e){if(n.one("#"+e.get("id"))){var i=r.getByNode(e);i&&i.destroy(t)}})},cleanup:function(){var e=this;e.cleanupWidgets(!0),e.empty()}},!0),e.Node.ITSANodeCleanup=Xt,e.Base.mix(e.Node,[Xt]),n=e.ITSAViewModel=e.Base.create(d,e.View,[],{},{ATTRS:{editable:{value:!1,validator:function(e){return typeof e===k},getter:function(e){var t=this.get(y);return e&&t&&t.toJSONUI}},model:{value:{},validator:function(e){return e===null||r.isObject(e)||typeof e===L||e.get&&typeof e.get===A&&e.get("clientId")},setter:"_setModel"},styled:{value:!0,validator:function(e){return typeof e===k}},template:{value:null,validator:function(e){return typeof e===L},getter:function(e){var t=this;return t._textTemplate||e||t._intl.undefined_template}}}}),n.prototype._formcss_loaded=!1,n.prototype.initializer=function(){var t=this,n=t.get(y);i.each([It,qt,zt,Wt,Ut,jt,Rt,Bt],function(n){t[_+n]=function(e){e.modelEventFacade.preventDefault()},t.publish(n,{preventedFn:e.bind(t[_+n],t),emitFacade:!0})}),t.publish(Pt,{defaultFn:e.bind(t[C+Pt],t),emitFacade:!0}),t.publish(Ht,{defaultFn:e.bind(t[C+Ht],t),preventedFn:e.bind(t[_+Ht],t),emitFacade:!0}),t._isMicroTemplate=null,t._modelRenderer=null,t._eventhandlers=[],t._textTemplate=null,t._contIsForm=t.get(M).get(h)===l,t._setTemplateRenderer(t.get(O)),n&&n.addTarget&&n.addTarget(t),t._intl=o.get(p+d),t._customBtns={},t._hotkeys={},t._customBtnLabels={},t._createButtons()},n.prototype.addCustomBtn=function(e,t,n){var r=this;H[e]||(r._customBtns[e]={config:n,labelHTML:t||e})},n.prototype.blur=function(){this.get("container").removeClass(v)},n.prototype.focus=function(){var e=this.get("container"),t=e.itsatabkeymanager;e.addClass(v),t&&t._retreiveFocus()},n.prototype.removeCustomBtn=function(e){delete this._customBtns[e]},n.prototype.removeButtonLabel=function(e){delete this._customBtnLabels[e]},n.prototype.removeHotKey=function(e){var t=this;t._hotkeys[e]&&delete t._hotkeys[e]&&t._createButtons()},n.prototype.render=function(t){var n=this,r=n.get(M),i=r.itsatabkeymanager,s=n.get(y),o=n.get(O),u=e.Global.ItsaDateTimePicker,a=t||!s?"":n._modelRenderer(s);if(o||n._isMicroTemplate)o&&(n._initialEditAttrs=s.getAttrs()),r.cleanupWidgets(!0);return n._rendered||(r.inDoc()||e.one("body").append(r),r.addClass(d),r.toggleClass(d+"-"+m,n.get(m)),n._bindUI()),n._rendered=!0,a.length>0&&o&&n._viewNeedsForm&&(a="<form>"+a+"</form>"),r.setHTML(a),o&&e.use(p+"itsatabkeymanager",function(){i?i.refresh(r):(r.plug(e.Plugin.ITSATabKeyManager),i=r.itsatabkeymanager),r.hasClass(v)&&i.focusInitialItem()}),u&&u.panel.get("visible")&&u.hide(!0),n.fire("viewrendered",{target:n}),n},n.prototype.setButtonLabel=function(e,t){var n=this;H[e]&&typeof t===L&&t.length>0&&(n._customBtnLabels[e]=t)},n.prototype.setHotKey=function(e,t){var n=this;H[e]&&(typeof t===L||r.isObject(t))&&(n._hotkeys[e]=t)&&n._createButtons()},n.prototype.toJSON=function(){var t=this.get(y);return t instanceof e.Model?t.toJSON():t},n.prototype.destructor=function(){var e=this,t=e.get(y),n=e.get(M);t&&t.removeTarget&&t.removeTarget(e),e._clearEventhandlers(),e._customBtns={},e._customBtnLabels={},e._hotkeys={},n.hasPlugin("itsatabkeymanager")&&n.unplug("itsatabkeymanager")},n.prototype._bindUI=function(){var t=this,n=t.get(M),r=t._eventhandlers;r.push(t.after("model"+c,function(e){var n=e.prevVal,r=e.newVal,i=n&&n.toJSONUI,s=r&&r.toJSONUI;n&&n.removeTarget&&n.removeTarget(t),r&&r.addTarget&&r.addTarget(t),i!==s&&t._setTemplateRenderer(s&&t.get(O)),t.render()})),r.push(t.after("template"+c,function(){t._setTemplateRenderer(t.get(O)),t.render()})),r.push(t.after("resetclick",function(){var e=n.itsatabkeymanager;t._isMicroTemplate&&t.render(),e&&e.focusInitialItem()})),r.push(t.after("editable"+c,function(e){var n=e.newVal,r=t.get(y);r&&r.toJSONUI&&(t._setTemplateRenderer(n),t.render())})),r.push(t.after("*:change",function(n){n.target instanceof e.Model&&!t.get(O)&&t.render()})),r.push(t.after([y+R,y+q,y+F,y+I],function(e){var t=n.itsatabkeymanager;t&&(e.model.enableUI(),t.focusInitialItem())})),r.push(t.after("*:destroy",function(e){e.target!==t&&t.render(!0)})),r.push(t.after(M+c,function(e){t._contIsForm=e.newVal.get(h)===l})),r.push(n.after(z,function(){n.addClass(v)})),r.push(n.after(W,function(){n.removeClass(v)})),r.
push(e.Intl.after("intl:lang"+c,function(){t._intl=e.Intl.get(p+d),t.render()})),r.push(t.after(m+c,function(e){n.toggleClass(d+"-"+m,e.newVal)})),i.each([B,j,I,q,R,F,z,U,Ht,Bt,Pt],function(e){r.push(t.after("*:"+e,function(n){var r=!0,i=n.type,s=e,o,u;n.target!==t&&(D[e]?s=y+e:e===z&&(u=n.type.split(":")[0],P[u]?s=u+e:r=!1),e===U&&(r=i===R+":"+U,s=y+i),o={type:s,model:t.get(y),modelEventFacade:n,target:t,value:n.value,node:n.node,nodeid:n.nodeid,nodelist:n.nodelist,formElement:n.formElement},r&&(t.fire(s,o),s===jt&&n.value===$&&(o.type=s=Ft,t.fire(s,o))))}))})},i.each([b,w,E,S,x],function(t){n.prototype[y+t]=function(){var n=this,r=n.get(y);r instanceof e.Model&&!r.get(N)&&r[C+t]&&r[C+t]()}}),i.each([b,w,E,S],function(t){n.prototype[y+t+T]=function(){var n=this,r=n.get(y),i=t.toLowerCase();return r instanceof e.Model&&!r.get(N)&&r[i+T]||null}}),n.prototype._clearEventhandlers=function(){i.each(this._eventhandlers,function(e){e.detach()})},n.prototype._createButtons=function(){var e=this,t=e._customBtnLabels,n=e._hotkeys;e._buttons=[{propertykey:et,type:g,config:{value:X,hotkey:n[et]},labelHTML:function(){return t[et]?r.sub(t[et],{label:e._intl[X]}):e._intl[X]}},{propertykey:tt,type:g,config:{value:V,hotkey:n[tt]},labelHTML:function(){return t[tt]?r.sub(t[tt],{label:e._intl[V]}):e._intl[V]}},{propertykey:nt,type:g,config:{value:$,hotkey:n[nt]},labelHTML:function(){return t[nt]?r.sub(t[nt],{label:e._intl[$]}):e._intl[$]}},{propertykey:rt,type:B,config:{value:B,hotkey:n[rt]},labelHTML:function(){return t[rt]?r.sub(t[rt],{label:e._intl[B]}):e._intl[B]}},{propertykey:it,type:g,config:{value:J,hotkey:n[it]},labelHTML:function(){return t[it]?r.sub(t[it],{label:e._intl[J]}):e._intl[J]}},{propertykey:st,type:F,config:{value:F,hotkey:n[st]},labelHTML:function(){return t[st]?r.sub(t[st],{label:e._intl[F]}):e._intl[F]}},{propertykey:ot,type:g,config:{value:K,hotkey:n[ot]},labelHTML:function(){return t[ot]?r.sub(t[ot],{label:e._intl[K]}):e._intl[K]}},{propertykey:ut,type:g,config:{value:Q,hotkey:n[ut]},labelHTML:function(){return t[ut]?r.sub(t[ut],{label:e._intl[Q]}):e._intl[Q]}},{propertykey:at,type:j,config:{value:j,hotkey:n[at]},labelHTML:function(){return t[at]?r.sub(t[at],{label:e._intl[j]}):e._intl[j]}},{propertykey:ft,type:I,config:{value:I,hotkey:n[ft]},labelHTML:function(){return t[ft]?r.sub(t[ft],{label:e._intl[I]}):e._intl[I]}},{propertykey:lt,type:g,config:{value:G,hotkey:n[lt]},labelHTML:function(){return t[lt]?r.sub(t[lt],{label:e._intl[G]}):e._intl[G]}},{propertykey:ct,type:q,config:{value:q,hotkey:n[ct]},labelHTML:function(){return t[ct]?r.sub(t[ct],{label:e._intl[q]}):e._intl[q]}},{propertykey:ht,type:R,config:{value:R,hotkey:n[ht]},labelHTML:function(){return t[ht]?r.sub(t[ht],{label:e._intl[R]}):e._intl[R]}},{propertykey:pt,type:g,config:{value:Y,hotkey:n[pt]},labelHTML:function(){return t[pt]?r.sub(t[pt],{label:e._intl[Y]}):e._intl[Y]}},{propertykey:vt,type:g,config:{classname:u,value:X,hotkey:n[vt]},labelHTML:function(){return t[vt]?r.sub(t[vt],{label:e._intl[X]}):r.sub(a,{type:X})+e._intl[X]}},{propertykey:mt,type:g,config:{classname:u,value:V,hotkey:n[mt]},labelHTML:function(){return t[mt]?r.sub(t[mt],{label:e._intl[V]}):r.sub(a,{type:V})+e._intl[V]}},{propertykey:gt,type:g,config:{classname:u,value:$,hotkey:n[gt]},labelHTML:function(){return t[gt]?r.sub(t[gt],{label:e._intl[$]}):r.sub(a,{type:V})+e._intl[$]}},{propertykey:yt,type:B,config:{classname:u,value:B,hotkey:n[yt]},labelHTML:function(){return t[yt]?r.sub(t[yt],{label:e._intl[B]}):r.sub(a,{type:B})+e._intl[B]}},{propertykey:bt,type:g,config:{classname:u,value:J,hotkey:n[bt]},labelHTML:function(){return t[bt]?r.sub(t[bt],{label:e._intl[J]}):r.sub(a,{type:J})+e._intl[J]}},{propertykey:wt,type:F,config:{classname:u,value:F,hotkey:n[wt]},labelHTML:function(){return t[wt]?r.sub(t[wt],{label:e._intl[F]}):r.sub(a,{type:F})+e._intl[F]}},{propertykey:Et,type:g,config:{classname:u,value:K,hotkey:n[Et]},labelHTML:function(){return t[Et]?r.sub(t[Et],{label:e._intl[K]}):r.sub(a,{type:K})+e._intl[K]}},{propertykey:St,type:g,config:{classname:u,value:Q,hotkey:n[St]},labelHTML:function(){return t[St]?r.sub(t[St],{label:e._intl[Q]}):r.sub(a,{type:Q})+e._intl[Q]}},{propertykey:xt,type:j,config:{classname:u,value:j,hotkey:n[xt]},labelHTML:function(){return t[xt]?r.sub(t[xt],{label:e._intl[j]}):r.sub(a,{type:j})+e._intl[j]}},{propertykey:Tt,type:I,config:{classname:u,value:I,hotkey:n[Tt]},labelHTML:function(){return t[Tt]?r.sub(t[Tt],{label:e._intl[I]}):r.sub(a,{type:I})+e._intl[I]}},{propertykey:Nt,type:g,config:{classname:u,value:G,hotkey:n[Nt]},labelHTML:function(){return t[Nt]?r.sub(t[Nt],{label:e._intl[G]}):r.sub(a,{type:G})+e._intl[G]}},{propertykey:Ct,type:q,config:{classname:u,value:q,hotkey:n[Ct]},labelHTML:function(){return t[Ct]?r.sub(t[Ct],{label:e._intl[q]}):r.sub(a,{type:q})+e._intl[q]}},{propertykey:kt,type:R,config:{classname:u,value:R,hotkey:n[kt]},labelHTML:function(){return t[kt]?r.sub(t[kt],{label:e._intl[R]}):r.sub(a,{type:R})+e._intl[R]}},{propertykey:Lt,type:g,config:{classname:u,value:Y,hotkey:n[Lt]},labelHTML:function(){return t[Lt]?r.sub(t[Lt],{label:e._intl[Y]}):r.sub(a,{type:Y})+e._intl[Y]}},{propertykey:Ot,type:F,config:{spinbusy:!0,classname:u,value:F,hotkey:n[Ot]},labelHTML:function(){return t[Ot]?r.sub(t[Ot],{label:e._intl[F]}):r.sub(a,{type:F})+e._intl[F]}},{propertykey:Mt,type:j,config:{spinbusy:!0,classname:u,value:j,hotkey:n[Mt]},labelHTML:function(){return t[Mt]?r.sub(t[Mt],{label:e._intl[j]}):r.sub(a,{type:j})+e._intl[j]}},{propertykey:_t,type:q,config:{spinbusy:!0,classname:u,value:q,hotkey:n[_t]},labelHTML:function(){return t[_t]?r.sub(t[_t],{label:e._intl[q]}):r.sub(a,{type:q})+e._intl[q]}},{propertykey:Dt,type:R,config:{spinbusy:!0,classname:u,value:R,hotkey:n[Dt]},labelHTML:function(){return t[Dt]?r.sub(t[Dt],{label:e._intl[R]}):r.sub(a,{type:R})+e._intl[R]}}]},n.prototype[C+Pt]=function(){var e=this,t=e.get(M),n=t&&t.itsatabkeymanager;n&&n.next()},n.prototype[_+Ht]=function(e){e.modelEventFacade.
preventDefault()},n.prototype[C+Ht]=function(t){var n=t.nodelist.item(0);n&&(n.getDOMNode()===e.config.doc.activeElement?e.ITSAFormElement.tipsyInvalid._handleDelegateStart({currentTarget:n}):n.focus(),n.scrollIntoView())},n.prototype._setModel=function(t){var n=this;return typeof t===L?(n._textTemplate=t,t={}):n._textTemplate=null,!n._formcss_loaded&&t&&t.toJSONUI&&(n._formcss_loaded=!0,e.use("gallerycss-itsa-form")),t},n.prototype._setTemplateRenderer=function(t){var n=this,o=n.get("template"),u,a,l,c;u=function(){var e=/<%(.+)%>/;return e.test(o)},c=function(t,r){var o,u,a,f;i.each(n._buttons,function(n){o=n.propertykey,u=n.type,a=n.labelHTML(),f=n.config,t[o]=e.bind(r._renderBtnFns[u],r,a,f)()}),s.each(n._customBtns,function(n,i){a=n.labelHTML,f=n.config,t[i]=e.bind(r._renderBtnFns[g],r,a,f)()})},a=n._isMicroTemplate=u(),a?(l=f.compile(o),n._modelRenderer=function(e){var r=t?e.toJSONUI():n.toJSON();return e.toJSONUI&&c(r,e),l(r)}):n._modelRenderer=function(e){var i=t?e.toJSONUI():n.toJSON();return e.toJSONUI&&c(i,e),r.sub(o,i)},n._viewNeedsForm=!n._contIsForm&&!/<form([^>]*)>/.test(o)}},"@VERSION@",{requires:["intl","base-build","view","template-micro","model","event-custom","event-outside","pluginhost-base","gallerycss-itsa-base"],lang:["ar","bg","bs","cs","da","de","en","es","fa","fi","fr","he","hi","hr","hu","it","ja","nb","nl","pl","pt","ru","sk","sr","sv","uk","zh"],skinnable:!0});
