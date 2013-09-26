YUI.add("gallery-itsaviewmodel",function(e,t){"use strict";function Kt(){}var n,r=e.Lang,i=e.Array,s=e.Object,o=e.Intl,u="pure-form",a=u+" "+u+"-aligned",f="itsabutton-iconleft",l='<i class="itsaicon-form-{type}"></i>',c=e.Template.Micro,h="FORM",p="Change",d="tagName",v="gallery-",m="itsaviewmodel",g="itsa-focused",y="styled",b="button",w="model",E="Save",S="Submit",x="Load",T="Destroy",N="Reset",C="Promise",k="destroyed",L="delete",A="_defFn_",O="boolean",M="string",_="editable",D="container",P="_defPrevFn_",H="itsatabkeymanager",B="focusManaged",j="disabled",F="pure-"+b+"-"+j,I={button:!0,destroy:!0,remove:!0,reset:!0,save:!0,submit:!0,load:!0},q={btn_abort:!0,btn_cancel:!0,btn_close:!0,btn_destroy:!0,btn_ignore:!0,btn_load:!0,btn_no:!0,btn_ok:!0,btn_remove:!0,btn_reset:!0,btn_retry:!0,btn_save:!0,btn_submit:!0,btn_yes:!0,imgbtn_abort:!0,imgbtn_cancel:!0,imgbtn_close:!0,imgbtn_destroy:!0,imgbtn_ignore:!0,imgbtn_load:!0,imgbtn_no:!0,imgbtn_ok:!0,imgbtn_remove:!0,imgbtn_reset:!0,imgbtn_retry:!0,imgbtn_save:!0,imgbtn_submit:!0,imgbtn_yes:!0,spinbtn_load:!0,spinbtn_remove:!0,spinbtn_save:!0,spinbtn_submit:!0},R="destroy",U="remove",z="load",W="reset",X="save",V="submit",$="click",J=$+"outside",K="abort",Q="cancel",G="close",Y="ignore",Z="no",et="ok",tt="retry",nt="yes",rt="btn_",it=rt+K,st=rt+Q,ot=rt+G,ut=rt+R,at=rt+Y,ft=rt+z,lt=rt+Z,ct=rt+et,ht=rt+U,pt=rt+W,dt=rt+tt,vt=rt+X,mt=rt+V,gt=rt+nt,yt="img",bt=yt+it,wt=yt+st,Et=yt+ot,St=yt+ut,xt=yt+at,Tt=yt+ft,Nt=yt+lt,Ct=yt+ct,kt=yt+ht,Lt=yt+pt,At=yt+dt,Ot=yt+vt,Mt=yt+mt,_t=yt+gt,Dt="spin",Pt=Dt+ft,Ht=Dt+ht,Bt=Dt+vt,jt=Dt+mt,Ft="focusnext",It="validationerror",qt="uichanged",Rt=b+$,Ut=b+G,zt=R+$,Wt=U+$,Xt=z+$,Vt=V+$,$t=W+$,Jt=X+$;e.mix(Kt.prototype,{cleanupWidgets:function(t){var n=this,r=e.Widget;r&&n.all(".yui3-widget").each(function(e){if(n.one("#"+e.get("id"))){var i=r.getByNode(e);i&&i.destroy(t)}})},cleanup:function(){var e=this;e.cleanupWidgets(!0),e.empty()}},!0),e.Node.ITSANodeCleanup=Kt,e.Base.mix(e.Node,[Kt]),n=e.ITSAViewModel=e.Base.create(m,e.View,[],{},{ATTRS:{editable:{value:!1,validator:function(e){return typeof e===O},getter:function(e){var t=this.get(w);return e&&t&&t.toJSONUI}},focusManaged:{value:!0,validator:function(e){return typeof e===O}},model:{value:{},validator:function(t){return t===null||r.isObject(t)||typeof t===M||t instanceof e.Model},setter:"_setModel"},partOfMultiView:{value:!1,initOnly:!0,validator:function(e){return typeof e===O}},styled:{value:!0,validator:function(e){return typeof e===O}},template:{value:null,validator:function(e){return typeof e===M},getter:function(e){var t=this;return t._textTemplate||(e===null?t.warnNoTemplate?t._intl.undefined_template:"":e)}}}}),n.prototype._formcss_loaded=!1,n.prototype.initializer=function(){var t=this,n=t.get(w);t._intl=o.get(v+m),t.warnNoTemplate=!0,i.each([zt,Wt,$t,Jt,Vt,Rt,Xt,qt],function(n){t[P+n]=function(e){e.modelEventFacade.preventDefault()},t.publish(n,{preventedFn:e.bind(t[P+n],t),emitFacade:!0})}),t.publish(Ft,{defaultFn:e.bind(t[A+Ft],t),emitFacade:!0}),t.publish(It,{defaultFn:e.bind(t[A+It],t),preventedFn:e.bind(t[P+It],t),emitFacade:!0}),t._eventhandlers=[],t._contIsForm=t.get(D).get(d)===h,t._setTemplateRenderer(t.get(_)),n&&n.addTarget&&n.addTarget(t),t._customBtns={},t._hotkeys={},t._customBtnLabels={},t._createButtons()},n.prototype.addCustomBtn=function(e,t,n){var r=this;q[e]||(r._customBtns[e]={config:n,labelHTML:t||e})},n.prototype.blur=function(){this.get("container").removeClass(g)},n.prototype.focus=function(){var e=this.get("container"),t=e.itsatabkeymanager;e.addClass(g),t&&t._retreiveFocus()},n.prototype.lockView=function(){var e=this,t=e.get(w),n=e.get(_)&&t&&t.toJSONUI;n?t.disableUI():e.get("container").all("button").addClass(F)},n.prototype.removeButtonLabel=function(e){delete this._customBtnLabels[e]},n.prototype.removeCustomBtn=function(e){delete this._customBtns[e]},n.prototype.removeHotKey=function(e){var t=this;t._hotkeys[e]&&delete t._hotkeys[e]&&t._createButtons()},n.prototype.render=function(t){var n=this,r=n.get(D),i=n.get(w),s=n.get(_),o=e.Global.ItsaDateTimePicker,u=t||!i?"":n._modelRenderer(i);if(s||n._isMicroTemplate)s&&(n._initialEditAttrs=i.getAttrs()),r.cleanupWidgets(!0);return n._rendered||(r.inDoc()||e.one("body").append(r),r.addClass(m),r.toggleClass(m+"-"+y,n.get(y)),n._bindUI()),n._rendered=!0,u.length>0&&s&&n._viewNeedsForm&&(u='<form class="'+a+'">'+u+"</form>"),r.setHTML(u),n._setFocusManager(s&&n.get(B)),o&&o.panel.get("visible")&&o.hide(!0),n.fire("viewrendered",{target:n}),n},n.prototype.setButtonLabel=function(e,t){var n=this;q[e]&&typeof t===M&&t.length>0&&(n._customBtnLabels[e]=t)},n.prototype.setHotKey=function(e,t){var n=this;q[e]&&(typeof t===M||r.isObject(t))&&(n._hotkeys[e]=t)&&n._createButtons()},n.prototype.toJSON=function(){var t=this.get(w);return t instanceof e.Model?t.toJSON():t},n.prototype.translate=function(e){return this._intl[e]||e},n.prototype.unlockView=function(){var e=this,t=e.get(w),n=e.get(_)&&t&&t.toJSONUI;n?t.enableUI():e.get("container").all("button").removeClass(F)},n.prototype.destructor=function(){var e=this,t=e.get(w),n=e.get(D);t&&t.removeTarget&&t.removeTarget(e),e._clearEventhandlers(),e._customBtns={},e._customBtnLabels={},e._hotkeys={},n.hasPlugin(H)&&n.unplug(H)},n.prototype._bindUI=function(){var t=this,n=t.get(D),r=t._eventhandlers;r.push(t.after("model"+p,function(e){var n=e.prevVal,r=e.newVal,i=n&&n.toJSONUI,s=r&&r.toJSONUI;n&&n.removeTarget&&n.removeTarget(t),r&&r.addTarget&&r.addTarget(t),i!==s&&t._setTemplateRenderer(s&&t.get(_)),t.render()})),r.push(t.after("template"+p,function(){t._setTemplateRenderer(t.get(_)),t.render()})),r.push(t.after(W,function(){var e;t._isMicroTemplate?t.render():(e=n.itsatabkeymanager,e&&e.focusInitialItem())})),r.push(t.after("editable"+p,function(e){var n=e.newVal,r=t.get(w);r&&r.toJSONUI&&(t._setTemplateRenderer(n),t.render())})),r.push(t.after("*:change",function(n){n.target instanceof e.Model&&!t.get(_)&&t.render()})),t.get("partOfMultiView"
)||r.push(t.on(["*:"+V,"*:"+X,"*:"+z,"*:"+R],function(r){var i=r.promise,s=r.target,o=r.type.split(":")[1],u=r.options,a=o===R&&(u.remove||u[L]),f;if(!a&&s instanceof e.Model){alert(1),t.lockView();if(o===V||o===X)f=s.getAttrs(),s.UIToModel();t._setSpin(o,!0),o===R||i.then(function(){(o===z||o===V||o===X)&&s.setResetAttrs()},function(){return(o===V||o===X)&&s.setAttrs(f),!0}).then(function(){var e=n.itsatabkeymanager;t._setSpin(o,!1),t.unlockView(),e&&e.focusInitialItem()})}})),r.push(t.after("*:destroy",function(e){e.target!==t&&t.render(!0)})),r.push(t.after(D+p,function(e){t._contIsForm=e.newVal.get(d)===h})),r.push(n.after($,function(){n.addClass(g)})),r.push(n.after(J,function(){n.removeClass(g)})),r.push(e.Intl.after("intl:lang"+p,function(){t._intl=e.Intl.get(v+m),t.render()})),r.push(t.after(y+p,function(e){n.toggleClass(m+"-"+y,e.newVal)})),r.push(t.after(B+p,function(e){t._setFocusManager(e.newVal)})),i.each([$,It,qt,Ft],function(e){r.push(t.on("*:"+e,function(n){var r=!0,i=e,s,o;n.target!==t&&(e===$&&(o=n.type.split(":")[0],I[o]?i=o+e:r=!1),s={type:i,model:t.get(w),modelEventFacade:n,target:t,value:n.value,node:n.node,nodeid:n.nodeid,nodelist:n.nodelist,formElement:n.formElement},r&&(t.fire(i,s),i===Rt&&n.value===G&&(s.type=i=Ut,t.fire(i,s))))}))})},i.each([E,S,x,T,N],function(t){n.prototype[w+t]=function(){var n=this,r=n.get(w);r instanceof e.Model&&!r.get(k)&&r[A+t]&&r[A+t]()}}),i.each([E,S,x,T],function(t){n.prototype[w+t+C]=function(){var n=this,r=n.get(w),i=t.toLowerCase();return r instanceof e.Model&&!r.get(k)&&r[i+C]||null}}),n.prototype._clearEventhandlers=function(){i.each(this._eventhandlers,function(e){e.detach()})},n.prototype._createButtons=function(){var e=this,t=e._customBtnLabels,n=e._hotkeys;e._buttons=[{propertykey:it,type:b,config:{value:K,hotkey:n[it]},labelHTML:function(){return t[it]?r.sub(t[it],{label:e._intl[K]}):e._intl[K]}},{propertykey:st,type:b,config:{value:Q,hotkey:n[st]},labelHTML:function(){return t[st]?r.sub(t[st],{label:e._intl[Q]}):e._intl[Q]}},{propertykey:ot,type:b,config:{value:G,hotkey:n[ot]},labelHTML:function(){return t[ot]?r.sub(t[ot],{label:e._intl[G]}):e._intl[G]}},{propertykey:ut,type:R,config:{value:R,hotkey:n[ut]},labelHTML:function(){return t[ut]?r.sub(t[ut],{label:e._intl[R]}):e._intl[R]}},{propertykey:at,type:b,config:{value:Y,hotkey:n[at]},labelHTML:function(){return t[at]?r.sub(t[at],{label:e._intl[Y]}):e._intl[Y]}},{propertykey:ft,type:z,config:{value:z,hotkey:n[ft]},labelHTML:function(){return t[ft]?r.sub(t[ft],{label:e._intl[z]}):e._intl[z]}},{propertykey:lt,type:b,config:{value:Z,hotkey:n[lt]},labelHTML:function(){return t[lt]?r.sub(t[lt],{label:e._intl[Z]}):e._intl[Z]}},{propertykey:ct,type:b,config:{value:et,hotkey:n[ct]},labelHTML:function(){return t[ct]?r.sub(t[ct],{label:e._intl[et]}):e._intl[et]}},{propertykey:ht,type:U,config:{value:U,hotkey:n[ht]},labelHTML:function(){return t[ht]?r.sub(t[ht],{label:e._intl[U]}):e._intl[U]}},{propertykey:pt,type:W,config:{value:W,hotkey:n[pt]},labelHTML:function(){return t[pt]?r.sub(t[pt],{label:e._intl[W]}):e._intl[W]}},{propertykey:dt,type:b,config:{value:tt,hotkey:n[dt]},labelHTML:function(){return t[dt]?r.sub(t[dt],{label:e._intl[tt]}):e._intl[tt]}},{propertykey:vt,type:X,config:{value:X,hotkey:n[vt]},labelHTML:function(){return t[vt]?r.sub(t[vt],{label:e._intl[X]}):e._intl[X]}},{propertykey:mt,type:V,config:{value:V,hotkey:n[mt]},labelHTML:function(){return t[mt]?r.sub(t[mt],{label:e._intl[V]}):e._intl[V]}},{propertykey:gt,type:b,config:{value:nt,hotkey:n[gt]},labelHTML:function(){return t[gt]?r.sub(t[gt],{label:e._intl[nt]}):e._intl[nt]}},{propertykey:bt,type:b,config:{classname:f,value:K,hotkey:n[bt]},labelHTML:function(){return t[bt]?r.sub(t[bt],{label:e._intl[K]}):r.sub(l,{type:K})+e._intl[K]}},{propertykey:wt,type:b,config:{classname:f,value:Q,hotkey:n[wt]},labelHTML:function(){return t[wt]?r.sub(t[wt],{label:e._intl[Q]}):r.sub(l,{type:Q})+e._intl[Q]}},{propertykey:Et,type:b,config:{classname:f,value:G,hotkey:n[Et]},labelHTML:function(){return t[Et]?r.sub(t[Et],{label:e._intl[G]}):r.sub(l,{type:Q})+e._intl[G]}},{propertykey:St,type:R,config:{classname:f,value:R,hotkey:n[St]},labelHTML:function(){return t[St]?r.sub(t[St],{label:e._intl[R]}):r.sub(l,{type:R})+e._intl[R]}},{propertykey:xt,type:b,config:{classname:f,value:Y,hotkey:n[xt]},labelHTML:function(){return t[xt]?r.sub(t[xt],{label:e._intl[Y]}):r.sub(l,{type:Y})+e._intl[Y]}},{propertykey:Tt,type:z,config:{classname:f,value:z,hotkey:n[Tt]},labelHTML:function(){return t[Tt]?r.sub(t[Tt],{label:e._intl[z]}):r.sub(l,{type:z})+e._intl[z]}},{propertykey:Nt,type:b,config:{classname:f,value:Z,hotkey:n[Nt]},labelHTML:function(){return t[Nt]?r.sub(t[Nt],{label:e._intl[Z]}):r.sub(l,{type:Z})+e._intl[Z]}},{propertykey:Ct,type:b,config:{classname:f,value:et,hotkey:n[Ct]},labelHTML:function(){return t[Ct]?r.sub(t[Ct],{label:e._intl[et]}):r.sub(l,{type:et})+e._intl[et]}},{propertykey:kt,type:U,config:{classname:f,value:U,hotkey:n[kt]},labelHTML:function(){return t[kt]?r.sub(t[kt],{label:e._intl[U]}):r.sub(l,{type:U})+e._intl[U]}},{propertykey:Lt,type:W,config:{classname:f,value:W,hotkey:n[Lt]},labelHTML:function(){return t[Lt]?r.sub(t[Lt],{label:e._intl[W]}):r.sub(l,{type:W})+e._intl[W]}},{propertykey:At,type:b,config:{classname:f,value:tt,hotkey:n[At]},labelHTML:function(){return t[At]?r.sub(t[At],{label:e._intl[tt]}):r.sub(l,{type:tt})+e._intl[tt]}},{propertykey:Ot,type:X,config:{classname:f,value:X,hotkey:n[Ot]},labelHTML:function(){return t[Ot]?r.sub(t[Ot],{label:e._intl[X]}):r.sub(l,{type:X})+e._intl[X]}},{propertykey:Mt,type:V,config:{classname:f,value:V,hotkey:n[Mt]},labelHTML:function(){return t[Mt]?r.sub(t[Mt],{label:e._intl[V]}):r.sub(l,{type:V})+e._intl[V]}},{propertykey:_t,type:b,config:{classname:f,value:nt,hotkey:n[_t]},labelHTML:function(){return t[_t]?r.sub(t[_t],{label:e._intl[nt]}):r.sub(l,{type:nt})+e._intl[nt]}},{propertykey:Pt,type:z,config:{spinbusy:!0,classname:f,value:z,hotkey:n[Pt]},labelHTML:function(){return t
[Pt]?r.sub(t[Pt],{label:e._intl[z]}):r.sub(l,{type:z})+e._intl[z]}},{propertykey:Ht,type:U,config:{spinbusy:!0,classname:f,value:U,hotkey:n[Ht]},labelHTML:function(){return t[Ht]?r.sub(t[Ht],{label:e._intl[U]}):r.sub(l,{type:U})+e._intl[U]}},{propertykey:Bt,type:X,config:{spinbusy:!0,classname:f,value:X,hotkey:n[Bt]},labelHTML:function(){return t[Bt]?r.sub(t[Bt],{label:e._intl[X]}):r.sub(l,{type:X})+e._intl[X]}},{propertykey:jt,type:V,config:{spinbusy:!0,classname:f,value:V,hotkey:n[jt]},labelHTML:function(){return t[jt]?r.sub(t[jt],{label:e._intl[V]}):r.sub(l,{type:V})+e._intl[V]}}]},n.prototype[A+Ft]=function(){var e=this,t=e.get(D),n=t&&t.itsatabkeymanager;n&&n.next()},n.prototype[P+It]=function(e){e.modelEventFacade.preventDefault()},n.prototype[A+It]=function(t){var n=t.nodelist.item(0);n&&(n.getDOMNode()===e.config.doc.activeElement?e.ITSAFormElement.tipsyInvalid._handleDelegateStart({currentTarget:n}):n.focus(),n.scrollIntoView())},n.prototype._setFocusManager=function(t){var n=this,r=n.get(D),i=r.itsatabkeymanager;t?e.use(v+H,function(){n.get(k)||(i?i.refresh(r):(r.plug(e.Plugin.ITSATabKeyManager),i=r.itsatabkeymanager),r.hasClass(g)&&i.focusInitialItem())}):i&&r.unplug(H)},n.prototype._setModel=function(t){var n=this;return typeof t===M?(n._textTemplate=t,t={}):n._textTemplate=null,!n._formcss_loaded&&t&&t.toJSONUI&&(n._formcss_loaded=!0,e.use("gallerycss-itsa-form")),t},n.prototype._setSpin=function(e,t){var n=this,r=n.get("container").all('[data-buttonsubtype="'+e+'"] i');r.toggleClass("itsaicon-form-loading",t),r.toggleClass("itsa-busy",t)},n.prototype._setTemplateRenderer=function(e){var t=this,n=t.get("template"),o,u,a,f;o=function(){var e=/<%(.+)%>/;return e.test(n)},f=function(e,n){var r,o,u,a;i.each(t._buttons,function(t){r=t.propertykey,o=t.type,u=t.labelHTML(),a=t.config,e[r]=n._renderBtnFns[o].call(n,u,a)}),s.each(t._customBtns,function(t,r){u=t.labelHTML,a=t.config,e[r]=n._renderBtnFns[b].call(n,u,a)})},u=t._isMicroTemplate=o(),u?(a=c.compile(n),t._modelRenderer=function(n){var r=e?n.toJSONUI():t.toJSON();return n.toJSONUI&&f(r,n),a(r)}):t._modelRenderer=function(i){var s=e?i.toJSONUI():t.toJSON();return i.toJSONUI&&f(s,i),r.sub(n,s)},t._viewNeedsForm=!t._contIsForm&&!/<form([^>]*)>/.test(n)}},"@VERSION@",{requires:["intl","base-build","view","template-micro","model","event-custom","event-outside","pluginhost-base","gallerycss-itsa-base"],lang:["ar","bg","bs","cs","da","de","en","es","fa","fi","fr","he","hi","hr","hu","it","ja","nb","nl","pl","pt","ru","sk","sr","sv","uk","zh"],skinnable:!0});
