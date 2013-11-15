YUI.add("gallery-itsapanel",function(e,t){"use strict";var n,r=e.Array,i=e.Lang,s="gallery",o="itsa-",u=s+"css-"+o,a=4e3,f="error",l="warn",c="destroyed",h="string",p="boolean",d="visible",v="closeButton",m="closableByEscape",g="width",y="height",b="boundingBox",w="contentBox",E="paddingTop",S="paddingBottom",x="button",T="focused",N=o+T,C="keydown",k="hidden",L="View",A="panel",O="Change",M="floated",_="body",D="header"+L,P=_+L,H="footer",B=H+L,j="number",F="offsetHeight",I="offsetWidth",q=o+"label-",R=o+x+"-",U="uppercase",z="lowercase",W="capitalize",X=q+U,V=q+z,$=q+W,J=R+U,K=R+z,Q=R+W,G="Transform",Y=x+G,Z="label"+G,et="modal",tt="px",nt="title",rt="Right",it=nt+rt,st="centered",ot="drag",ut=ot+"able",at="resize",ft="resizable",lt="dd",ct="-plugin",ht="styled",pt="itsatabkeymanager",dt=o+A,vt=o+ht+A,mt=o+k+A,gt=o+k+"section",yt=o+"inline"+A,bt="className",wt=o+"panelheader",Et=o+"panelbody",St=o+"panelfooter",xt=o+"panelstatusbar",Tt=o+"panelinnerheader",Nt=o+"panelinnerbody",Ct=o+"panelinnerfooter",kt=o+A+"closebtn",Lt="pure-"+x+"-disabled",At='<div class="'+wt+'"><div class="'+Tt+'"></div></div>',Ot='<div class="'+Et+'"><div class="'+Nt+'"></div></div>',Mt='<div class="'+St+'"><div class="'+Ct+'"></div></div>',_t='<div class="'+xt+'"></div>',Dt="<"+x+' class="pure-'+x+" itsa"+x+"-onlyicon "+kt+'" data-focusable="true"><i class="itsaicon-form-abort"></i></'+x+">",Pt='<div>{title}</div><div class="itsa-rightalign">{titleRight}</div>',Ht="{body}",Bt='<div>{footer}</div><div class="itsa-rightalign">{footerRight}</div>',jt="click",Ft=jt+"outside",It="footerOnTop",qt="statusBar",Rt="itsa-panelfooter-top",Ut="value",zt="focusnext",Wt=x+jt,Xt=x+":hide",Vt="escape:hide";n=e.ITSAPanel=e.Base.create("itsapanel",e.Widget,[e.WidgetPosition,e.WidgetModality,e.WidgetPositionAlign,e.WidgetPositionConstrain,e.WidgetStack],null,{ATTRS:{body:{value:null,validator:function(e){return e===null||typeof e===h}},bodyView:{value:null,validator:function(t){return t===null||typeof t===h||t instanceof e.View}},buttonTransform:{value:null,validator:function(e){return e===null||e===U||e===z||e===W}},className:{value:null,validator:function(e){return e===null||typeof e===h}},closableByEscape:{value:!0,validator:function(e){return typeof e===p}},closeButton:{value:!0,validator:function(e){return typeof e===p}},dragable:{value:!1,validator:function(e){return typeof e===p}},footer:{value:null,validator:function(e){return e===null||typeof e===h}},footerOnTop:{value:!1,validator:function(e){return typeof e===p}},footerRight:{value:null,validator:function(e){return e===null||typeof e===h}},footerView:{value:null,validator:function(t){return t===null||typeof t===h||t instanceof e.View}},floated:{value:!0,validator:function(e){return typeof e===p}},focusOnShow:{value:!0,validator:function(e){return typeof e===p}},headerView:{value:null,validator:function(t){return t===null||typeof t===h||t instanceof e.View}},height:{value:null,lazyAdd:!1,validator:function(e){return e===null||typeof e===j},getter:"_getHeight",setter:"_setHeight"},labelTransform:{value:null,validator:function(e){return e===null||e===U||e===z||e===W}},maxHeight:{value:null,lazyAdd:!1,validator:function(e){return e===null||typeof e===j},setter:"_setMaxHeight"},maxWidth:{value:null,lazyAdd:!1,validator:function(e){return e===null||typeof e===j},setter:"_setMaxWidth"},minHeight:{value:null,lazyAdd:!1,validator:function(e){return e===null||typeof e===j},setter:"_setMinHeight"},minWidth:{value:null,lazyAdd:!1,validator:function(e){return e===null||typeof e===j},setter:"_setMinWidth"},resizable:{value:!1,validator:function(e){return typeof e===p}},statusBar:{value:!1,validator:function(e){return typeof e===p}},styled:{value:!0,validator:function(e){return typeof e===p}},title:{value:null,validator:function(e){return e===null||typeof e===h}},titleRight:{value:null,validator:function(e){return e===null||typeof e===h}},visible:{value:!1,validator:function(e){return typeof e===p}},width:{value:null,lazyAdd:!1,validator:function(e){return e===null||typeof e===j},getter:"_getWidth",setter:"_setWidth"}}}),n.prototype.initializer=function(){var t=this,n=t.get(b),r=t.get(It),i=t.get(bt);e.use(u+"base",u+"form"),t.publish(Xt,{defaultFn:e.bind(t.hide,t),emitFacade:!0}),t.publish(Vt,{defaultFn:e.bind(t.hide,t),emitFacade:!0}),t.publish(f,{emitFacade:!0,broadcast:1}),t.publish(l,{emitFacade:!0,broadcast:1}),t._eventhandlers=[],t._partOfMultiView=!1,n.addClass(dt),n.toggleClass(yt,!t.get(M)),n.toggleClass(vt,t.get(ht)),n.toggleClass(N,t.get(T)),n.addClass(mt),t._setButtonTransform(t.get(Y)),t._setLabelTransform(t.get(Z)),t.publish(zt,{defaultFn:e.bind(t._defFn_focusnext,t),emitFacade:!0}),t.get(d)&&t.get(w).addClass(N),i&&n.addClass(i),r&&n.addClass(Rt),t.renderPromise().then(function(){t.get(d)&&n.removeClass(mt)})},n.prototype.bindUI=function(){var t=this,n=t.get(b),r=t.get(w),s=t._eventhandlers,o=t.get(D),u=t.get(P),f=t.get(B);o instanceof e.View&&!t._partOfMultiView&&o.addTarget(t),u instanceof e.View&&u.addTarget(t),f instanceof e.View&&!t._partOfMultiView&&f.addTarget(t),t.get(ut)&&t.get(M)&&e.use(lt+ct,function(){t.get(c)||n.plug(e.Plugin.Drag).dd.addHandle("."+wt)&&n.dd.addTarget(t)}),t.get(ft)&&e.use(at+ct,function(){t.get(c)||r.plug(e.Plugin.Resize,{handles:["r","b","br"]}).resize.addTarget(t)}),t._setFocusManager(),t.get(m)&&(t._escapeHandler=e.on(C,e.rbind(t._handleEscapeKey,t))),s.push(t.after(m+O,function(n){n.newVal?t._escapeHandler=e.on(C,e.rbind(t._handleEscapeKey,t)):t._escapeHandler&&t._escapeHandler.detach()})),s.push(t.after(d+O,function(e){var i=e.newVal;n.toggleClass(mt,!i),r.toggleClass(N,i),i?(t.get(et)||t.get("focusOnShow"))&&t.focus():t.blur()})),s.push(t.after(Z+O,function(e){t._setLabelTransform(e.newVal)})),s.push(t.after(Y+O,function(e){t._setButtonTransform(e.newVal)})),s.push(t.after(M+O,function(r){n.toggleClass(yt,!r.newVal),t.get(ut)&&(r.newVal&&!n.dd&&e.use(lt+ct,function(){t.get(c)||n.plug(e.Plugin.Drag).dd.addHandle("."+wt)&&n.dd.addTarget
(t)}),!r.newVal&&n.dd&&n.dd.removeTarget(t)&&n.unplug(lt))})),s.push(t.after(ut+O,function(r){r.newVal&&t.get(M)&&!n.dd&&e.use(lt+ct,function(){t.get(c)||n.plug(e.Plugin.Drag).dd.addHandle("."+wt)&&n.dd.addTarget(t)}),!r.newVal&&n.dd&&n.dd.removeTarget(t)&&n.unplug(lt)})),s.push(t.after(ft+O,function(n){n.newVal&&!r[at]&&e.use(at+ct,function(){t.get(c)||r.plug(e.Plugin.Resize,{handles:["r","b","br"]}).resize.addTarget(t)}),!n.newVal&&r[at]&&r[at].removeTarget(t)&&r[at].unplug(at)})),s.push(t.after([ot+":"+ot,ot+":end"],function(){var t=e.ITSAFormElement,n=t&&t.tipsyOK,r=t&&t.tipsyInvalid;n&&n.get(d)&&n._lastnode&&n._alignTooltip(n._lastnode),r&&r.get(d)&&r._lastnode&&r._alignTooltip(r._lastnode)})),s.push(t.after([at+":end",y+O,g+O,"minHeight"+O,"minWidth"+O],function(){t.get(st)&&t.centered()})),s.push(t.after([D+O,P+O,B+O],function(n){n.prevVal instanceof e.View&&n.prevVal.removeTarget(t),n.newVal instanceof e.View&&(!t._partOfMultiView||n.type===P+O)&&n.newVal.addTarget(t)})),s.push(t.after("*:viewrendered",function(){var n=t.get(B),i,s;n&&(s=t._footercont,i=n.get("container"),s.toggleClass("itsa-inlinefooter",!0),i=n.get("container"),i.setStyle("paddingLeft","1.2em"),s.setStyle("overflow","visible"),t._body.setStyle("minWidth",""),t._body.setStyle("minWidth",t._footer.get("offsetWidth")+"px"),s.toggleClass("itsa-inlinefooter",!1),s.setStyle("overflow",""),i.setStyle("paddingLeft","")),e.later(250,null,function(){r.pluginReady(pt,a).then(function(e){e.refresh(r),r.hasClass(N)&&t.get(d)&&!t._locked&&e.focusInitialItem()})})})),s.push(t.after([H+O,H+rt+O],e.bind(t._renderFooter,t))),s.push(t.after([nt+O,nt+rt+O],e.bind(t._renderHeader,t))),s.push(t.after(ht+O,function(e){n.toggleClass(vt,e.newVal)})),s.push(t.after(bt+O,function(e){e.prevVal&&n.removeClass(e.prevVal),e.newVal&&n.addClass(e.newVal)})),s.push(t.after(It+O,function(e){n.toggleClass(Rt,e.newVal),t._adjustPaddingTop(),t._adjustPaddingBottom()})),s.push(t.on(qt+O,e.bind(t._renderStatusBar,t))),s.push(t.on([nt+O,it+O,v+O],function(e){var n=e.newVal,r=e.type.split(":"),s=r[r.length-1],o=s===nt+O?n:t.get(nt),u=s===it+O?n:t.get(it),a=s===v+O?n:t.get(v),f=t.get(D);(!f||typeof f===h)&&t._header.setHTML(i.sub(f||Pt,{title:o||"",titleRight:u===null?a?Dt:"":u}))})),s.push(t.on(et+O,function(e){!t.get(M)&&e.preventDefault()})),s.push(t.on(P+O,e.bind(t._renderBody,t))),s.push(t.on(D+O,e.bind(t._renderHeader,t))),s.push(t.on(B+O,e.bind(t._renderFooter,t))),s.push(t._header.delegate(jt,function(e){var n=e.target;n.hasClass(Lt)||t.fire(Xt,{buttonNode:e.target})},"."+kt)),s.push(n.delegate(jt,function(e){var n=e.currentTarget,r;r={type:Wt,target:t,value:n&&n.get(Ut),buttonNode:n},t.fire(Wt,r)},x)),s.push(n.on(jt,function(){t.focus()})),s.push(n.on(Ft,function(){t.blur()})),s.push(t.after(T+O,function(e){var n=e.newVal&&t.get(d);t.get(w).toggleClass(N,n),n&&r.pluginReady(pt,a).then(function(e){e._retreiveFocus()})})),s.push(t.after("*:viewrendered",function(){t._adjustPaddingTop(),t._adjustPaddingBottom()}))},n.prototype.renderUI=function(){var e=this,t=e.get(w);t.setHTML(At+Ot+Mt+_t),e._header=t.one("."+Tt),e._body=t.one("."+Nt),e._footer=t.one("."+Ct),e._footercont=t.one("."+St),e._statusbar=t.one("."+xt),e._renderHeader(),e._renderBody(),e._renderFooter(),e._renderStatusBar()},n.prototype.destructor=function(){var t=this,n=t.get(b),r=t.get(w),i=t.get(D),s=t.get(P),o=t.get(B);i instanceof e.View&&i.removeTarget(t),s instanceof e.View&&s.removeTarget(t),o instanceof e.View&&o.removeTarget(t),n.hasPlugin(lt)&&n.dd.removeTarget(t)&&n.unplug(lt),r.hasPlugin[at]&&r[at].removeTarget(t)&&r.unplug(at),r.hasPlugin(pt)&&r.unplug(pt),t._escapeHandler&&t._escapeHandler.detach(),t._clearEventhandlers()},n.prototype._adjustPaddingBottom=function(){var e=this,t=0;e.get(It)||(t+=e._footercont.get(F)),e.get(qt)&&(t+=e._statusbar.get(F)),e.get(w).setStyle(S,t+tt)},n.prototype._adjustPaddingTop=function(){var e=this,t=e._footercont,n=e._header.get(F),r=e.get(It);t.setStyle("top",r?n:""),r&&(n+=t.get(F)),e.get(w).setStyle(E,n+tt)},n.prototype._clearEventhandlers=function(){r.each(this._eventhandlers,function(e){e.detach()})},n.prototype._handleEscapeKey=function(e){var t=this;e.keyCode===27&&t.get(T)&&t.fire(Vt)},n.prototype._defFn_focusnext=function(){var e=this,t=e.get(w);t.hasClass(N)&&t.pluginReady(pt,a).then(function(e){e.next()},function(){})},n.prototype._getHeight=function(){return Math.round(this.get(b).get(F))},n.prototype._getWidth=function(){return Math.round(this.get(b).get(I))},n.prototype._renderBody=function(){var t=this,n=t.get(_),r=t.get(P);!r||typeof r===h?t._body.setHTML(i.sub(r||Ht,{body:n||""})):r instanceof e.View&&(r._set("container",t._body),r.render&&r.render())},n.prototype._renderFooter=function(){var t=this,n=t.get(H),r=t.get(H+rt),s=t.get(B),o=t._footer,u=!s&&!n&&!r;u||(!s||typeof s===h?o.setHTML(i.sub(s||Bt,{footer:n||"",footerRight:r||""})):s instanceof e.View&&(s._set("container",t._footer),s.render&&s.render())),t._footercont.toggleClass(gt,u),t.get(It)?t._adjustPaddingTop():t._adjustPaddingBottom()},n.prototype._renderHeader=function(){var t=this,n=t.get(nt),r=t.get(it),s=t.get(v),o=t.get(D);!o||typeof o===h?t._header.setHTML(i.sub(o||Pt,{title:n||"",titleRight:r===null?s?Dt:"":r})):o instanceof e.View&&(o._set("container",t._header),o.render&&o.render()),t._adjustPaddingTop()},n.prototype._renderStatusBar=function(){var t=this,n=t._statusbar,r=t._itsastatusbar,i=!t.get(qt);console.log(n),n.toggleClass(gt,i),i?r&&r.destroy():r||e.use("gallery-itsastatusbar",function(){t._itsastatusbar=new e.ITSAStatusbar({parentNode:n})}),t._adjustPaddingBottom()},n.prototype._setButtonTransform=function(e){var t=this.get(b);t.toggleClass(J,e===U),t.toggleClass(K,e===z),t.toggleClass(Q,e===W)},n.prototype._setFocusManager=function(){var t=this,n=t.get(w),r=n.itsatabkeymanager;e.use(s+"-"+pt,function(){t.get(c)||(r?r.refresh(n):(n.plug(e.Plugin.ITSATabKeyManager),r=n.itsatabkeymanager,t.addTarget(r)),n.hasClass(N)&&r.focusInitialItem())})},n.prototype
._setHeight=function(e){var t=this;t.get(w).setStyle(y,e?e+tt:"")},n.prototype._setLabelTransform=function(e){var t=this.get(b);t.toggleClass(X,e===U),t.toggleClass(V,e===z),t.toggleClass($,e===W)},n.prototype._setMaxHeight=function(e){this.get(w).setStyle("maxHeight",e?e+tt:"")},n.prototype._setMaxWidth=function(e){this.get(w).setStyle("maxWidth",e?e+tt:"")},n.prototype._setMinHeight=function(e){this.get(w).setStyle("minHeight",e?e+tt:"")},n.prototype._setMinWidth=function(e){this.get(w).setStyle("minWidth",e?e+tt:"")},n.prototype._setWidth=function(e){var t=this;t.get(w).setStyle(g,e?e+tt:"")}},"@VERSION@",{requires:["node-pluginhost","gallery-itsapluginpromise","dd-ddm","node-event-delegate","base-build","widget-modality","widget-position","widget-position-align","widget-position-constrain","widget-stack","view","widget","gallery-itsawidgetrenderpromise"],skinnable:!0});
