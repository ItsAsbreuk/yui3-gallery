YUI.add("gallery-itsapanel",function(e,t){"use strict";var n,r=e.Array,i=e.Lang,s="gallery",o="itsa-",u=s+"css-"+o,a=4e3,f="error",l="warn",c="destroyed",h="container",p="string",d="boolean",v="visible",m="closeButton",g="closableByEscape",y="width",b="height",w="boundingBox",E="contentBox",S="paddingTop",x="paddingBottom",T="button",N="focused",C=o+N,k="keydown",L="hidden",A="View",O="panel",M="Change",_="floated",D="body",P="header",H="footer",B=P+A,j=D+A,F=H+A,I="number",q="offsetHeight",R="offsetWidth",U=o+"label-",z=o+T+"-",W="uppercase",X="lowercase",V="capitalize",$=U+W,J=U+X,K=U+V,Q=z+W,G=z+X,Y=z+V,Z="Transform",et=T+Z,tt="label"+Z,nt="modal",rt="px",it="title",st="Right",ot=it+st,ut="centered",at="readyText",ft="drag",lt=ft+"able",ct="resize",ht="resizable",pt="dd",dt="-plugin",vt="styled",mt="itsatabkeymanager",gt=o+O,yt=o+vt+O,bt=o+L+O,wt=o+L+"section",Et=o+"inline"+O,St="className",xt=o+O+P,Tt=o+O+D,Nt=o+O+H,Ct=o+O+"statusbar",kt="inner",Lt=o+O+kt+P,At=o+O+kt+D,Ot=o+O+kt+H,Mt=o+O+"closebtn",_t="pure-"+T+"-disabled",Dt='<div class="'+xt+'"><div class="'+Lt+'"></div></div>',Pt='<div class="'+Tt+'"><div class="'+At+'"></div></div>',Ht='<div class="'+Nt+'"><div class="'+Ot+'"></div></div>',Bt='<div class="'+Ct+'"></div>',jt="<"+T+' class="pure-'+T+" itsa"+T+"-onlyicon "+Mt+'" data-focusable="true"><i class="itsaicon-form-abort"></i></'+T+">",Ft='<div>{title}</div><div class="itsa-rightalign">{titleRight}</div>',It="{body}",qt="<div>{"+H+'}</div><div class="itsa-rightalign">{footerRight}</div>',Rt="click",Ut=Rt+"outside",zt=H+"OnTop",Wt="statusBar",Xt=Wt+Z,Vt=o+O+H+"-top",$t="small",Jt="medium",Kt="large",Qt="footerSize",Gt="size",Yt=o+O+H+$t+Gt,Zt=o+O+H+Jt+Gt,en=o+O+H+Kt+Gt,tn="value",nn="focusnext",rn=T+Rt,sn=T+":hide",on="escape:hide";n=e.ITSAPanel=e.Base.create("itsapanel",e.Widget,[e.WidgetPosition,e.WidgetModality,e.WidgetPositionAlign,e.WidgetPositionConstrain,e.WidgetStack],null,{ATTRS:{body:{value:null,validator:function(e){return e===null||typeof e===p}},bodyView:{value:null,validator:function(t){return t===null||typeof t===p||t instanceof e.View}},buttonTransform:{value:null,validator:function(e){return e===null||e===W||e===X||e===V}},className:{value:null,validator:function(e){return e===null||typeof e===p}},closableByEscape:{value:!0,validator:function(e){return typeof e===d}},closeButton:{value:!0,validator:function(e){return typeof e===d}},dragable:{value:!1,validator:function(e){return typeof e===d}},footer:{value:null,validator:function(e){return e===null||typeof e===p}},footerOnTop:{value:!1,validator:function(e){return typeof e===d}},footerRight:{value:null,validator:function(e){return e===null||typeof e===p}},footerSize:{value:Jt,validator:function(e){return e===$t||e===Jt||e===Kt}},footerView:{value:null,validator:function(t){return t===null||typeof t===p||t instanceof e.View}},floated:{value:!0,validator:function(e){return typeof e===d}},focusOnShow:{value:!0,validator:function(e){return typeof e===d}},headerView:{value:null,validator:function(t){return t===null||typeof t===p||t instanceof e.View}},height:{value:null,lazyAdd:!1,validator:function(e){return e===null||typeof e===I},getter:"_getHeight",setter:"_setHeight"},labelTransform:{value:null,validator:function(e){return e===null||e===W||e===X||e===V}},maxHeight:{value:null,lazyAdd:!1,validator:function(e){return e===null||typeof e===I},setter:"_setMaxHeight"},maxWidth:{value:null,lazyAdd:!1,validator:function(e){return e===null||typeof e===I},setter:"_setMaxWidth"},minHeight:{value:null,lazyAdd:!1,validator:function(e){return e===null||typeof e===I},setter:"_setMinHeight"},minWidth:{value:null,lazyAdd:!1,validator:function(e){return e===null||typeof e===I},setter:"_setMinWidth"},readyText:{value:null,validator:function(e){return e===null||typeof e===p}},resizable:{value:!1,validator:function(e){return typeof e===d}},statusBar:{value:!1,validator:function(e){return typeof e===d}},statusBarTransform:{value:X,validator:function(e){return e===null||e===W||e===X||e===V}},styled:{value:!0,validator:function(e){return typeof e===d}},title:{value:null,validator:function(e){return e===null||typeof e===p}},titleRight:{value:null,validator:function(e){return e===null||typeof e===p}},visible:{value:!1,validator:function(e){return typeof e===d}},width:{value:null,lazyAdd:!1,validator:function(e){return e===null||typeof e===I},getter:"_getWidth",setter:"_setWidth"}}}),n.prototype._prevFocussed=null,n.prototype.initializer=function(){var t=this,n=t.get(v),r=t.get(w),i=t.get(zt),s=t.get(Qt),o=t.get(St);e.use(u+"base",u+"form"),t._showTransition=new e.Promise(function(e){e()}),t.publish(sn,{defaultFn:e.bind(t.hide,t),emitFacade:!0}),t.publish(on,{defaultFn:e.bind(t.hide,t),emitFacade:!0}),t.publish(f,{emitFacade:!0,broadcast:1}),t.publish(l,{emitFacade:!0,broadcast:1}),t._eventhandlers=[],t._partOfMultiView=!1,r.addClass(gt),r.toggleClass(Et,!t.get(_)),r.toggleClass(yt,t.get(vt)),r.toggleClass(C,t.get(N)),s===$t&&r.addClass(Yt),s===Jt&&r.addClass(Zt),s===Kt&&r.addClass(en),r.addClass(bt),t._setButtonTransform(t.get(et)),t._setLabelTransform(t.get(tt)),t.publish(nn,{defaultFn:e.bind(t._defFn_focusnext,t),emitFacade:!0}),n&&t.get(E).addClass(C),o&&r.addClass(o),i&&r.addClass(Vt),t._statusbarReady=new e.Promise(function(e){t._resolveStatusbarReady=e}),t.readyPromise().then(function(){r.setStyle("opacity",n?1:0),n&&(r.removeClass(bt),t.get(nt)&&(t._getTabkeyManagerNode(),t.focus()))})},n.prototype.bindUI=function(){var t=this,n=t.get(w),r=t.get(E),s=t._eventhandlers,o=t.get(B),u=t.get(j),f=t.get(F);o instanceof e.View&&!t._partOfMultiView&&o.addTarget(t),u instanceof e.View&&u.addTarget(t),f instanceof e.View&&!t._partOfMultiView&&f.addTarget(t),t.get(lt)&&t.get(_)&&e.use(pt+dt,function(){t.get(c)||n.plug(e.Plugin.Drag).dd.addHandle("."+xt)&&n.dd.addTarget(t)}),t.get(ht)&&e.use(ct+dt,function(){t.get(c)||r.plug(e.Plugin.Resize,{handles:["r","b","br"]}).resize.addTarget(t)}),t._setFocusManager(),t.get(g)&&(t._escapeHandler=e.on
(k,e.rbind(t._handleEscapeKey,t))),s.push(t.after(g+M,function(n){n.newVal?t._escapeHandler=e.on(k,e.rbind(t._handleEscapeKey,t)):t._escapeHandler&&t._escapeHandler.detach()})),s.push(t.after(v+M,function(i){var s=i.newVal,o=t.get(nt),u=i.transname,a=i.transconfig,f;t.readyPromise().then(function(){a?s?t._showTransition.then(function(){n.toggleClass(bt,!1),t._showTransition=n.showPromise(u,a)}):t._showTransition.then(function(){t._showTransition=n.hidePromise(u,a).then(function(){n.toggleClass(bt,!0)})}):t._showTransition.then(function(){n.setStyle("opacity",s?1:0),n.toggleClass(bt,!s)})}),r.toggleClass(C,s),s?(t._prevFocussed||o&&t._getTabkeyManagerNode(),(o||t.get("focusOnShow"))&&e.soon(function(){t.blur(),t.focus()})):(t.blur(),o&&(f=t._prevFocussed)&&e.soon(function(){f.addClass(C),f.itsatabkeymanager._retrieveFocus(),t._prevFocussed=null}))})),s.push(t.after(tt+M,function(e){t._setLabelTransform(e.newVal)})),s.push(t.after(et+M,function(e){t._setButtonTransform(e.newVal)})),s.push(t.after(Qt+M,function(e){var r=e.newVal;n.addClass(Yt,r===$t),n.addClass(Zt,r===Jt),n.addClass(en,r===Kt),t.get(zt)?t._adjustPaddingTop():t._adjustPaddingBottom()})),s.push(t.after(_+M,function(r){n.toggleClass(Et,!r.newVal),t.get(lt)&&(r.newVal&&!n.dd&&e.use(pt+dt,function(){t.get(c)||n.plug(e.Plugin.Drag).dd.addHandle("."+xt)&&n.dd.addTarget(t)}),!r.newVal&&n.dd&&n.dd.removeTarget(t)&&n.unplug(pt))})),s.push(t.after(lt+M,function(r){r.newVal&&t.get(_)&&!n.dd&&e.use(pt+dt,function(){t.get(c)||n.plug(e.Plugin.Drag).dd.addHandle("."+xt)&&n.dd.addTarget(t)}),!r.newVal&&n.dd&&n.dd.removeTarget(t)&&n.unplug(pt)})),s.push(t.after(ht+M,function(n){n.newVal&&!r[ct]&&e.use(ct+dt,function(){t.get(c)||r.plug(e.Plugin.Resize,{handles:["r","b","br"]}).resize.addTarget(t)}),!n.newVal&&r[ct]&&r[ct].removeTarget(t)&&r[ct].unplug(ct)})),s.push(t.after([ft+":"+ft,ft+":end"],function(){var t=e.ITSAFormElement,n=t&&t.tipsyOK,r=t&&t.tipsyInvalid;n&&n.get(v)&&n._lastnode&&n._alignTooltip(n._lastnode),r&&r.get(v)&&r._lastnode&&r._alignTooltip(r._lastnode)})),s.push(t.after([ct+":end",b+M,y+M,"minHeight"+M,"minWidth"+M],function(){t.get(ut)&&t[ut]()})),s.push(t.after([B+M,j+M,F+M],function(n){var r=n.type,i=n.newVal,s=n.prevVal,o=r.split(":"),u=o[1]||o[0],a;u===F+M&&(a=!i&&!t.get(H)&&!t.get(H+st),t._footercont.toggleClass(wt,a)),s instanceof e.View&&s.removeTarget(t),i instanceof e.View&&(!t._partOfMultiView||u===j+M)&&i.addTarget(t)})),s.push(t.after("*:viewrendered",function(){var n=t.get(F),i,s;n&&(s=t._footercont,i=n.get(h),s.toggleClass("itsa-inlinefooter",!0),i=n.get(h),i.setStyle("paddingLeft","1.2em"),s.setStyle("overflow","visible"),t._body.setStyle("minWidth",""),t._body.setStyle("minWidth",t._footer.get("offsetWidth")+"px"),s.toggleClass("itsa-inlinefooter",!1),s.setStyle("overflow",""),i.setStyle("paddingLeft","")),t._adjustPaddingTop(),t._adjustPaddingBottom(),e.later(250,null,function(){r.pluginReady(mt,a).then(function(e){e.refresh(r),r.hasClass(C)&&t.get(v)&&!t._locked&&e.focusInitialItem()})})})),s.push(t.after([H+M,H+st+M],e.bind(t._renderFooter,t))),s.push(t.after([it+M,it+st+M],e.bind(t._renderHeader,t))),s.push(t.after(vt+M,function(e){n.toggleClass(yt,e.newVal)})),s.push(t.after(St+M,function(e){e.prevVal&&n.removeClass(e.prevVal),e.newVal&&n.addClass(e.newVal)})),s.push(t.after(zt+M,function(e){var r=e.newVal;n.toggleClass(Vt,r),t._itsastatusbar&&t._footercont.setStyle("bottom",r?"":t._statusbar.get(q)+"px"),t._adjustPaddingTop(),t._adjustPaddingBottom()})),s.push(t.on(Wt+M,e.bind(t._renderStatusBar,t))),s.push(t.on(at+M,function(e){t._itsastatusbar&&t._itsastatusbar.set(at,e.newVal)})),s.push(t.on(Xt+M,function(e){t._itsastatusbar&&t._itsastatusbar.set("text"+Z,e.newVal)})),s.push(t.on([it+M,ot+M,m+M],function(e){var n=e.newVal,r=e.type.split(":"),s=r[r.length-1],o=s===it+M?n:t.get(it),u=s===ot+M?n:t.get(ot),a=s===m+M?n:t.get(m),f=t.get(B);(!f||typeof f===p)&&t._header.setHTML(i.sub(f||Ft,{title:o||"",titleRight:u===null?a?jt:"":u}))})),s.push(t.on(nt+M,function(e){!t.get(_)&&e.preventDefault()})),s.push(t.on(j+M,e.bind(t._renderBody,t))),s.push(t.on(B+M,e.bind(t._renderHeader,t))),s.push(t.on(F+M,e.bind(t._renderFooter,t))),s.push(t._header.delegate(Rt,function(e){var n=e.target;n.hasClass(_t)||t.fire(sn,{buttonNode:e.target})},"."+Mt)),s.push(n.delegate(Rt,function(e){var n=e.currentTarget,r;r={type:rn,target:t,value:n&&n.get(tn),buttonNode:n},t.fire(rn,r)},T)),s.push(n.after(Rt,function(){t.get(v)&&e.soon(function(){t.blur(),t.focus()})})),s.push(n.after(Ut,function(){e.soon(function(){t.blur(),t.get(v)&&t.get(nt)&&t.focus()})})),s.push(t.after(N+M,function(e){var n=e.newVal&&t.get(v);r.toggleClass(C,n),n&&r.pluginReady(mt,a).then(function(e){t.get(v)&&e._retrieveFocus()})}))},n.prototype.hide=function(e,t){return i.isObject(e)&&(t=e)&&(e=null),t&&(!t.duration||t.duration===0)&&(t=null),this.set(v,!1,{transname:e,transconfig:t})},n.prototype.show=function(e,t){return i.isObject(e)&&(t=e)&&(e=null),t&&(!t.duration||t.duration===0)&&(t=null),this.set(v,!0,{transname:e,transconfig:t})},n.prototype.promiseBeforeReady=function(){return this._statusbarReady},n.prototype.renderUI=function(){var e=this,t=e.get(E);t.setHTML(Dt+Pt+Ht+Bt),e._header=t.one("."+Lt),e._headercont=t.one("."+xt),e._body=t.one("."+At),e._footer=t.one("."+Ot),e._footercont=t.one("."+Nt),e._statusbar=t.one("."+Ct),e._renderHeader(),e._renderBody(),e._renderFooter(),e._renderStatusBar()},n.prototype.destructor=function(){var t=this,n=t.get(w),r=t.get(E),i=t.get(B),s=t.get(j),o=t.get(F),u=t._prevFocussed;t._destroyAllNodes=!0,t._clearEventhandlers(),t.blur(),u&&(u.addClass(C),u.itsatabkeymanager._retrieveFocus()),i instanceof e.View&&i.removeTarget(t),s instanceof e.View&&s.removeTarget(t),o instanceof e.View&&o.removeTarget(t),n.hasPlugin(pt)&&n.dd.removeTarget(t)&&n.unplug(pt),r.hasPlugin[ct]&&r[ct].removeTarget(t)&&r.unplug(ct),r.hasPlugin(mt)&&r.unplug(mt),t._escapeHandler&&t._escapeHandler.detach()},n.prototype._adjustPaddingBottom=function(
){var e=this,t=0;e.get(zt)||(t+=e._footercont.get(q)),e.get(Wt)&&(t+=e._statusbar.get(q)),e.get(E).setStyle(x,t+rt)},n.prototype._adjustPaddingTop=function(){var e=this,t=e._footercont,n=0,r=e.get(zt);e._headercont.setStyle("top",r?-e._footercont.get(q):""),t.setStyle("top",r?e._headercont.get(q):""),r&&(n+=t.get(q)),e.get(E).setStyle(S,n+rt)},n.prototype._clearEventhandlers=function(){r.each(this._eventhandlers,function(e){e.detach()})},n.prototype._handleEscapeKey=function(e){var t=this;e.keyCode===27&&t.get(N)&&t.fire(on)},n.prototype._defFn_focusnext=function(){var e=this,t=e.get(E);t.hasClass(C)&&t.pluginReady(mt,a).then(function(e){e.next()},function(){})},n.prototype._getHeight=function(){return Math.round(this.get(w).get(q))},n.prototype._getTabkeyManagerNode=function(){var t=this,n=e.one(e.config.doc.activeElement);t._prevFocussed=null,n&&n.itsatabkeymanager&&(t._prevFocussed=n);while(!t._prevFocussed&&n)n=n.get("parentNode"),n&&n.itsatabkeymanager&&(t._prevFocussed=n)},n.prototype._getWidth=function(){return Math.round(this.get(w).get(R))},n.prototype._renderBody=function(){var t=this,n=t.get(D),r=t.get(j),s;!r||typeof r===p?(t._body.empty(),t._body.setHTML(i.sub(r||It,{body:n||""}))):r instanceof e.View&&(s=r.get(h),r._set(h,t._body),s.inDoc()||(s.empty(),s.destroy(!0)),r.render&&r.render())},n.prototype._renderFooter=function(){var t=this,n=t.get(H),r=t.get(H+st),s=t.get(F),o=t._footer,u=!s&&!n&&!r,a;u||(!s||typeof s===p?(o.empty(),o.setHTML(i.sub(s||qt,{footer:n||"",footerRight:r||""}))):s instanceof e.View&&(a=s.get(h),s._set(h,t._footer),a.inDoc()||(a.empty(),a.destroy(!0)),s.render&&s.render())),t._footercont.toggleClass(wt,u),t.get(zt)?t._adjustPaddingTop():t._adjustPaddingBottom()},n.prototype._renderHeader=function(){var t=this,n=t.get(it),r=t.get(ot),s=t.get(m),o=t.get(B),u;!o||typeof o===p?(t._header.empty(),t._header.setHTML(i.sub(o||Ft,{title:n||"",titleRight:r===null?s?jt:"":r}))):o instanceof e.View&&(u=o.get(h),o._set(h,t._header),u.inDoc()||(u.empty(),u.destroy(!0)),o.render&&o.render()),t._adjustPaddingTop()},n.prototype._renderStatusBar=function(){var t=this,n=t._statusbar,r=t._footercont,i=t.get(zt),s=t._itsastatusbar,o=!t.get(Wt);n.toggleClass(wt,o),o?(t._viewName=null,t._resolveStatusbarReady(),s&&(s.destroy(),i||r.setStyle("bottom",""),t._adjustPaddingBottom())):s||e.use("gallery-itsastatusbar",function(){s=t._itsastatusbar=new e.ITSAStatusbar({parentNode:n,readyText:t.get(at),textTransform:t.get(Xt)}),t._viewName=s._viewName,s.isReady().then(function(){i||r.setStyle("bottom",t._statusbar.get(q)+"px"),t._adjustPaddingBottom(),t._resolveStatusbarReady()})})},n.prototype._setButtonTransform=function(e){var t=this.get(w);t.toggleClass(Q,e===W),t.toggleClass(G,e===X),t.toggleClass(Y,e===V)},n.prototype._setFocusManager=function(){var t=this,n=t.get(E),r=n.itsatabkeymanager;e.use(s+"-"+mt,function(){t.get(c)||(r?r.refresh(n):(n.plug(e.Plugin.ITSATabKeyManager),r=n.itsatabkeymanager,t.addTarget(r)),n.hasClass(C)&&r.focusInitialItem())})},n.prototype._setHeight=function(e){var t=this;t.get(E).setStyle(b,e?e+rt:"")},n.prototype._setLabelTransform=function(e){var t=this.get(w);t.toggleClass($,e===W),t.toggleClass(J,e===X),t.toggleClass(K,e===V)},n.prototype._setMaxHeight=function(e){this.get(E).setStyle("maxHeight",e?e+rt:"")},n.prototype._setMaxWidth=function(e){this.get(E).setStyle("maxWidth",e?e+rt:"")},n.prototype._setMinHeight=function(e){this.get(E).setStyle("minHeight",e?e+rt:"")},n.prototype._setMinWidth=function(e){this.get(E).setStyle("minWidth",e?e+rt:"")},n.prototype._setWidth=function(e){var t=this;t.get(E).setStyle(y,e?e+rt:"")}},"@VERSION@",{requires:["yui-base","node-pluginhost","gallery-itsapluginpromise","dd-ddm","node-event-delegate","node-style","base-base","base-build","widget-modality","widget-position","widget-position-align","widget-position-constrain","widget-stack","view","promise","oop","widget","timers","event-custom-base","yui-later","gallery-itsawidgetrenderpromise","gallery-itsanodepromise"],skinnable:!0});
