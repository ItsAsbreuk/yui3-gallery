YUI.add("gallery-itsapanel",function(e,t){"use strict";var n,r=e.Array,i=e.Lang,s="gallery",o="itsa-",u=s+"css-"+o,a=4e3,f="error",l="warn",c="destroyed",h="string",p="boolean",d="visible",v="closeButton",m="closableByEscape",g="width",y="height",b="boundingBox",w="contentBox",E="paddingTop",S="paddingBottom",x="button",T="focused",N=o+T,C="keydown",k="hidden",L="View",A="panel",O="Change",M="floated",_="body",D="header",P="footer",H=D+L,B=_+L,j=P+L,F="number",I="offsetHeight",q="offsetWidth",R=o+"label-",U=o+x+"-",z="uppercase",W="lowercase",X="capitalize",V=R+z,$=R+W,J=R+X,K=U+z,Q=U+W,G=U+X,Y="Transform",Z=x+Y,et="label"+Y,tt="modal",nt="px",rt="title",it="Right",st=rt+it,ot="centered",ut="readyText",at="drag",ft=at+"able",lt="resize",ct="resizable",ht="dd",pt="-plugin",dt="styled",vt="itsatabkeymanager",mt=o+A,gt=o+dt+A,yt=o+k+A,bt=o+k+"section",wt=o+"inline"+A,Et="className",St=o+A+D,xt=o+A+_,Tt=o+A+P,Nt=o+A+"statusbar",Ct="inner",kt=o+A+Ct+D,Lt=o+A+Ct+_,At=o+A+Ct+P,Ot=o+A+"closebtn",Mt="pure-"+x+"-disabled",_t='<div class="'+St+'"><div class="'+kt+'"></div></div>',Dt='<div class="'+xt+'"><div class="'+Lt+'"></div></div>',Pt='<div class="'+Tt+'"><div class="'+At+'"></div></div>',Ht='<div class="'+Nt+'"></div>',Bt="<"+x+' class="pure-'+x+" itsa"+x+"-onlyicon "+Ot+'" data-focusable="true"><i class="itsaicon-form-abort"></i></'+x+">",jt='<div>{title}</div><div class="itsa-rightalign">{titleRight}</div>',Ft="{body}",It="<div>{"+P+'}</div><div class="itsa-rightalign">{footerRight}</div>',qt="click",Rt=qt+"outside",Ut=P+"OnTop",zt="statusBar",Wt=o+A+P+"-top",Xt="small",Vt="medium",$t="large",Jt="footerSize",Kt="size",Qt=o+A+P+Xt+Kt,Gt=o+A+P+Vt+Kt,Yt=o+A+P+$t+Kt,Zt="value",en="focusnext",tn=x+qt,nn=x+":hide",rn="escape:hide";n=e.ITSAPanel=e.Base.create("itsapanel",e.Widget,[e.WidgetPosition,e.WidgetModality,e.WidgetPositionAlign,e.WidgetPositionConstrain,e.WidgetStack],null,{ATTRS:{body:{value:null,validator:function(e){return e===null||typeof e===h}},bodyView:{value:null,validator:function(t){return t===null||typeof t===h||t instanceof e.View}},buttonTransform:{value:null,validator:function(e){return e===null||e===z||e===W||e===X}},className:{value:null,validator:function(e){return e===null||typeof e===h}},closableByEscape:{value:!0,validator:function(e){return typeof e===p}},closeButton:{value:!0,validator:function(e){return typeof e===p}},dragable:{value:!1,validator:function(e){return typeof e===p}},footer:{value:null,validator:function(e){return e===null||typeof e===h}},footerOnTop:{value:!1,validator:function(e){return typeof e===p}},footerRight:{value:null,validator:function(e){return e===null||typeof e===h}},footerSize:{value:Vt,validator:function(e){return e===Xt||e===Vt||e===$t}},footerView:{value:null,validator:function(t){return t===null||typeof t===h||t instanceof e.View}},floated:{value:!0,validator:function(e){return typeof e===p}},focusOnShow:{value:!0,validator:function(e){return typeof e===p}},headerView:{value:null,validator:function(t){return t===null||typeof t===h||t instanceof e.View}},height:{value:null,lazyAdd:!1,validator:function(e){return e===null||typeof e===F},getter:"_getHeight",setter:"_setHeight"},labelTransform:{value:null,validator:function(e){return e===null||e===z||e===W||e===X}},maxHeight:{value:null,lazyAdd:!1,validator:function(e){return e===null||typeof e===F},setter:"_setMaxHeight"},maxWidth:{value:null,lazyAdd:!1,validator:function(e){return e===null||typeof e===F},setter:"_setMaxWidth"},minHeight:{value:null,lazyAdd:!1,validator:function(e){return e===null||typeof e===F},setter:"_setMinHeight"},minWidth:{value:null,lazyAdd:!1,validator:function(e){return e===null||typeof e===F},setter:"_setMinWidth"},readyText:{value:null,validator:function(e){return e===null||typeof e===h}},resizable:{value:!1,validator:function(e){return typeof e===p}},statusBar:{value:!1,validator:function(e){return typeof e===p}},styled:{value:!0,validator:function(e){return typeof e===p}},title:{value:null,validator:function(e){return e===null||typeof e===h}},titleRight:{value:null,validator:function(e){return e===null||typeof e===h}},visible:{value:!1,validator:function(e){return typeof e===p}},width:{value:null,lazyAdd:!1,validator:function(e){return e===null||typeof e===F},getter:"_getWidth",setter:"_setWidth"}}}),n.prototype.initializer=function(){var t=this,n=t.get(b),r=t.get(Ut),i=t.get(Jt),s=t.get(Et);e.use(u+"base",u+"form"),t.publish(nn,{defaultFn:e.bind(t.hide,t),emitFacade:!0}),t.publish(rn,{defaultFn:e.bind(t.hide,t),emitFacade:!0}),t.publish(f,{emitFacade:!0,broadcast:1}),t.publish(l,{emitFacade:!0,broadcast:1}),t._eventhandlers=[],t._partOfMultiView=!1,n.addClass(mt),n.toggleClass(wt,!t.get(M)),n.toggleClass(gt,t.get(dt)),n.toggleClass(N,t.get(T)),i===Xt&&n.addClass(Qt),i===Vt&&n.addClass(Gt),i===$t&&n.addClass(Yt),n.addClass(yt),t._setButtonTransform(t.get(Z)),t._setLabelTransform(t.get(et)),t.publish(en,{defaultFn:e.bind(t._defFn_focusnext,t),emitFacade:!0}),t.get(d)&&t.get(w).addClass(N),s&&n.addClass(s),r&&n.addClass(Wt),t._statusbarReady=new e.Promise(function(e){t._resolveStatusbarReady=e}),t.readyPromise().then(function(){t.get(d)&&n.removeClass(yt)})},n.prototype.bindUI=function(){var t=this,n=t.get(b),r=t.get(w),s=t._eventhandlers,o=t.get(H),u=t.get(B),f=t.get(j);o instanceof e.View&&!t._partOfMultiView&&o.addTarget(t),u instanceof e.View&&u.addTarget(t),f instanceof e.View&&!t._partOfMultiView&&f.addTarget(t),t.get(ft)&&t.get(M)&&e.use(ht+pt,function(){t.get(c)||n.plug(e.Plugin.Drag).dd.addHandle("."+St)&&n.dd.addTarget(t)}),t.get(ct)&&e.use(lt+pt,function(){t.get(c)||r.plug(e.Plugin.Resize,{handles:["r","b","br"]}).resize.addTarget(t)}),t._setFocusManager(),t.get(m)&&(t._escapeHandler=e.on(C,e.rbind(t._handleEscapeKey,t))),s.push(t.after(m+O,function(n){n.newVal?t._escapeHandler=e.on(C,e.rbind(t._handleEscapeKey,t)):t._escapeHandler&&t._escapeHandler.detach()})),s.push(t.after(d+O,function(e){var i=e.newVal;t.readyPromise().then(function(){n.toggleClass
(yt,!i)}),r.toggleClass(N,i),i?(t.get(tt)||t.get("focusOnShow"))&&t.focus():t.blur()})),s.push(t.after(et+O,function(e){t._setLabelTransform(e.newVal)})),s.push(t.after(Z+O,function(e){t._setButtonTransform(e.newVal)})),s.push(t.after(Jt+O,function(e){var r=e.newVal;n.addClass(Qt,r===Xt),n.addClass(Gt,r===Vt),n.addClass(Yt,r===$t),t.get(Ut)?t._adjustPaddingTop():t._adjustPaddingBottom()})),s.push(t.after(M+O,function(r){n.toggleClass(wt,!r.newVal),t.get(ft)&&(r.newVal&&!n.dd&&e.use(ht+pt,function(){t.get(c)||n.plug(e.Plugin.Drag).dd.addHandle("."+St)&&n.dd.addTarget(t)}),!r.newVal&&n.dd&&n.dd.removeTarget(t)&&n.unplug(ht))})),s.push(t.after(ft+O,function(r){r.newVal&&t.get(M)&&!n.dd&&e.use(ht+pt,function(){t.get(c)||n.plug(e.Plugin.Drag).dd.addHandle("."+St)&&n.dd.addTarget(t)}),!r.newVal&&n.dd&&n.dd.removeTarget(t)&&n.unplug(ht)})),s.push(t.after(ct+O,function(n){n.newVal&&!r[lt]&&e.use(lt+pt,function(){t.get(c)||r.plug(e.Plugin.Resize,{handles:["r","b","br"]}).resize.addTarget(t)}),!n.newVal&&r[lt]&&r[lt].removeTarget(t)&&r[lt].unplug(lt)})),s.push(t.after([at+":"+at,at+":end"],function(){var t=e.ITSAFormElement,n=t&&t.tipsyOK,r=t&&t.tipsyInvalid;n&&n.get(d)&&n._lastnode&&n._alignTooltip(n._lastnode),r&&r.get(d)&&r._lastnode&&r._alignTooltip(r._lastnode)})),s.push(t.after([lt+":end",y+O,g+O,"minHeight"+O,"minWidth"+O],function(){t.get(ot)&&t[ot]()})),s.push(t.after([H+O,B+O,j+O],function(n){var r=n.type,i=n.newVal,s=n.prevVal,o=r.split(":"),u=o[1]||o[0],a;u===j+O&&(a=!i&&!t.get(P)&&!t.get(P+it),t._footercont.toggleClass(bt,a)),s instanceof e.View&&s.removeTarget(t),i instanceof e.View&&(!t._partOfMultiView||u===B+O)&&i.addTarget(t)})),s.push(t.after("*:viewrendered",function(){var n=t.get(j),i,s;n&&(s=t._footercont,i=n.get("container"),s.toggleClass("itsa-inlinefooter",!0),i=n.get("container"),i.setStyle("paddingLeft","1.2em"),s.setStyle("overflow","visible"),t._body.setStyle("minWidth",""),t._body.setStyle("minWidth",t._footer.get("offsetWidth")+"px"),s.toggleClass("itsa-inlinefooter",!1),s.setStyle("overflow",""),i.setStyle("paddingLeft","")),e.later(250,null,function(){r.pluginReady(vt,a).then(function(e){e.refresh(r),r.hasClass(N)&&t.get(d)&&!t._locked&&e.focusInitialItem()})})})),s.push(t.after([P+O,P+it+O],e.bind(t._renderFooter,t))),s.push(t.after([rt+O,rt+it+O],e.bind(t._renderHeader,t))),s.push(t.after(dt+O,function(e){n.toggleClass(gt,e.newVal)})),s.push(t.after(Et+O,function(e){e.prevVal&&n.removeClass(e.prevVal),e.newVal&&n.addClass(e.newVal)})),s.push(t.after(Ut+O,function(e){var r=e.newVal;n.toggleClass(Wt,r),t._itsastatusbar&&t._footercont.setStyle("bottom",r?"":t._statusbar.get(I)+"px"),t._adjustPaddingTop(),t._adjustPaddingBottom()})),s.push(t.on(zt+O,e.bind(t._renderStatusBar,t))),s.push(t.on(ut+O,function(e){t._itsastatusbar&&t._itsastatusbar.set(ut,e.newVal)})),s.push(t.on([rt+O,st+O,v+O],function(e){var n=e.newVal,r=e.type.split(":"),s=r[r.length-1],o=s===rt+O?n:t.get(rt),u=s===st+O?n:t.get(st),a=s===v+O?n:t.get(v),f=t.get(H);(!f||typeof f===h)&&t._header.setHTML(i.sub(f||jt,{title:o||"",titleRight:u===null?a?Bt:"":u}))})),s.push(t.on(tt+O,function(e){!t.get(M)&&e.preventDefault()})),s.push(t.on(B+O,e.bind(t._renderBody,t))),s.push(t.on(H+O,e.bind(t._renderHeader,t))),s.push(t.on(j+O,e.bind(t._renderFooter,t))),s.push(t._header.delegate(qt,function(e){var n=e.target;n.hasClass(Mt)||t.fire(nn,{buttonNode:e.target})},"."+Ot)),s.push(n.delegate(qt,function(e){var n=e.currentTarget,r;r={type:tn,target:t,value:n&&n.get(Zt),buttonNode:n},t.fire(tn,r)},x)),s.push(n.on(qt,function(){t.focus()})),s.push(n.on(Rt,function(){t.blur()})),s.push(t.after(T+O,function(e){var n=e.newVal&&t.get(d);t.get(w).toggleClass(N,n),n&&r.pluginReady(vt,a).then(function(e){e._retreiveFocus()})})),s.push(t.after("*:viewrendered",function(){t._adjustPaddingTop(),t._adjustPaddingBottom()}))},e.Widget.prototype.promiseBeforeReady=function(){return this._statusbarReady},n.prototype.renderUI=function(){var e=this,t=e.get(w);t.setHTML(_t+Dt+Pt+Ht),e._header=t.one("."+kt),e._body=t.one("."+Lt),e._footer=t.one("."+At),e._footercont=t.one("."+Tt),e._statusbar=t.one("."+Nt),e._renderHeader(),e._renderBody(),e._renderFooter(),e._renderStatusBar()},n.prototype.destructor=function(){var t=this,n=t.get(b),r=t.get(w),i=t.get(H),s=t.get(B),o=t.get(j);i instanceof e.View&&i.removeTarget(t),s instanceof e.View&&s.removeTarget(t),o instanceof e.View&&o.removeTarget(t),n.hasPlugin(ht)&&n.dd.removeTarget(t)&&n.unplug(ht),r.hasPlugin[lt]&&r[lt].removeTarget(t)&&r.unplug(lt),r.hasPlugin(vt)&&r.unplug(vt),t._escapeHandler&&t._escapeHandler.detach(),t._clearEventhandlers()},n.prototype._adjustPaddingBottom=function(){var e=this,t=0;e.get(Ut)||(t+=e._footercont.get(I)),e.get(zt)&&(t+=e._statusbar.get(I)),e.get(w).setStyle(S,t+nt)},n.prototype._adjustPaddingTop=function(){var e=this,t=e._footercont,n=e._header.get(I),r=e.get(Ut);t.setStyle("top",r?n:""),r&&(n+=t.get(I)),e.get(w).setStyle(E,n+nt)},n.prototype._clearEventhandlers=function(){r.each(this._eventhandlers,function(e){e.detach()})},n.prototype._handleEscapeKey=function(e){var t=this;e.keyCode===27&&t.get(T)&&t.fire(rn)},n.prototype._defFn_focusnext=function(){var e=this,t=e.get(w);t.hasClass(N)&&t.pluginReady(vt,a).then(function(e){e.next()},function(){})},n.prototype._getHeight=function(){return Math.round(this.get(b).get(I))},n.prototype._getWidth=function(){return Math.round(this.get(b).get(q))},n.prototype._renderBody=function(){var t=this,n=t.get(_),r=t.get(B);!r||typeof r===h?t._body.setHTML(i.sub(r||Ft,{body:n||""})):r instanceof e.View&&(r._set("container",t._body),r.render&&r.render())},n.prototype._renderFooter=function(){var t=this,n=t.get(P),r=t.get(P+it),s=t.get(j),o=t._footer,u=!s&&!n&&!r;u||(!s||typeof s===h?o.setHTML(i.sub(s||It,{footer:n||"",footerRight:r||""})):s instanceof e.View&&(s._set("container",t._footer),s.render&&s.render())),t._footercont.toggleClass(bt,u),t.get(Ut)?t._adjustPaddingTop():t._adjustPaddingBottom()},n.prototype._renderHeader=
function(){var t=this,n=t.get(rt),r=t.get(st),s=t.get(v),o=t.get(H);!o||typeof o===h?t._header.setHTML(i.sub(o||jt,{title:n||"",titleRight:r===null?s?Bt:"":r})):o instanceof e.View&&(o._set("container",t._header),o.render&&o.render()),t._adjustPaddingTop()},n.prototype._renderStatusBar=function(){var t=this,n=t._statusbar,r=t._footercont,i=t.get(Ut),s=t._itsastatusbar,o=!t.get(zt);n.toggleClass(bt,o),o?(t._resolveStatusbarReady(),s&&(s.destroy(),i||r.setStyle("bottom",""),t._adjustPaddingBottom())):s||e.use("gallery-itsastatusbar",function(){s=t._itsastatusbar=new e.ITSAStatusbar({parentNode:n,readyText:t.get(ut)}),s.isReady().then(function(){i||r.setStyle("bottom",t._statusbar.get(I)+"px"),t._adjustPaddingBottom(),t._resolveStatusbarReady()})})},n.prototype._setButtonTransform=function(e){var t=this.get(b);t.toggleClass(K,e===z),t.toggleClass(Q,e===W),t.toggleClass(G,e===X)},n.prototype._setFocusManager=function(){var t=this,n=t.get(w),r=n.itsatabkeymanager;e.use(s+"-"+vt,function(){t.get(c)||(r?r.refresh(n):(n.plug(e.Plugin.ITSATabKeyManager),r=n.itsatabkeymanager,t.addTarget(r)),n.hasClass(N)&&r.focusInitialItem())})},n.prototype._setHeight=function(e){var t=this;t.get(w).setStyle(y,e?e+nt:"")},n.prototype._setLabelTransform=function(e){var t=this.get(b);t.toggleClass(V,e===z),t.toggleClass($,e===W),t.toggleClass(J,e===X)},n.prototype._setMaxHeight=function(e){this.get(w).setStyle("maxHeight",e?e+nt:"")},n.prototype._setMaxWidth=function(e){this.get(w).setStyle("maxWidth",e?e+nt:"")},n.prototype._setMinHeight=function(e){this.get(w).setStyle("minHeight",e?e+nt:"")},n.prototype._setMinWidth=function(e){this.get(w).setStyle("minWidth",e?e+nt:"")},n.prototype._setWidth=function(e){var t=this;t.get(w).setStyle(g,e?e+nt:"")}},"@VERSION@",{requires:["yui-base","node-pluginhost","gallery-itsapluginpromise","dd-ddm","node-event-delegate","node-style","base-base","base-build","widget-modality","widget-position","widget-position-align","widget-position-constrain","widget-stack","view","promise","oop","widget","event-custom-base","yui-later","gallery-itsawidgetrenderpromise"],skinnable:!0});
