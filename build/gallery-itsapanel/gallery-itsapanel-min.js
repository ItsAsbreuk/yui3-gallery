YUI.add("gallery-itsapanel",function(e,t){"use strict";var n,r=e.Array,i=e.Lang,s="gallerycss-itsa-",o="destroyed",u="string",a="boolean",f="visible",l="width",c="height",h="boundingBox",p="contentBox",d="paddingTop",v="paddingBottom",m="button",g="itsa-",y="focused",b=g+y,w="hidden",E="View",S="panel",x="Change",T="floated",N="body",C="header"+E,k=N+E,L="footer",A=L+E,O="number",M="offsetHeight",_="offsetWidth",D="modal",P="px",H="title",B="Right",j=H+B,F="centered",I="drag",q=I+"able",R="resize",U="resizable",z="dd",W="-plugin",X="styled",V=g+S,$=g+X+S,J=g+w+S,K=g+w+"section",Q=g+"inline"+S,G="className",Y=g+"panelheader",Z=g+"panelbody",et=g+"panelfooter",tt=g+"panelinnerheader",nt=g+"panelinnerbody",rt=g+"panelinnerfooter",it=g+S+"closebtn",st='<div class="'+Y+'"><div class="'+tt+'"></div></div>',ot='<div class="'+Z+'"><div class="'+nt+'"></div></div>',ut='<div class="'+et+'"><div class="'+rt+'"></div></div>',at="<"+m+' class="pure-'+m+" itsa"+m+"-onlyicon "+it+'" data-focusable="true"><i class="itsaicon-form-abort"></i></'+m+">",ft='<div>{title}</div><div class="itsa-rightalign">{titleRight}</div>',lt="{body}",ct='<div>{footer}</div><div class="itsa-rightalign">{footerRight}</div>',ht="click",pt=ht+"outside",dt="value",vt=m+ht,mt=m+":hide";n=e.ITSAPanel=e.Base.create("itsapanel",e.Widget,[e.WidgetPosition,e.WidgetAutohide,e.WidgetModality,e.WidgetPositionAlign,e.WidgetPositionConstrain,e.WidgetStack],null,{ATTRS:{body:{value:null,validator:function(e){return e===null||typeof e===u}},bodyView:{value:null,validator:function(t){return t===null||typeof t===u||t instanceof e.View}},className:{value:null,validator:function(e){return e===null||typeof e===u}},dragable:{value:!1,validator:function(e){return typeof e===a}},footer:{value:null,validator:function(e){return e===null||typeof e===u}},footerRight:{value:null,validator:function(e){return e===null||typeof e===u}},footerView:{value:null,validator:function(t){return t===null||typeof t===u||t instanceof e.View}},floated:{value:!0,validator:function(e){return typeof e===a}},focusOnShow:{value:!0,validator:function(e){return typeof e===a}},headerView:{value:null,validator:function(t){return t===null||typeof t===u||t instanceof e.View}},height:{value:null,lazyAdd:!1,validator:function(e){return e===null||typeof e===O},getter:"_getHeight",setter:"_setHeight"},maxHeight:{value:null,lazyAdd:!1,validator:function(e){return e===null||typeof e===O},setter:"_setMaxHeight"},maxWidth:{value:null,lazyAdd:!1,validator:function(e){return e===null||typeof e===O},setter:"_setMaxWidth"},minHeight:{value:null,lazyAdd:!1,validator:function(e){return e===null||typeof e===O},setter:"_setMinHeight"},minWidth:{value:null,lazyAdd:!1,validator:function(e){return e===null||typeof e===O},setter:"_setMinWidth"},resizable:{value:!1,validator:function(e){return typeof e===a}},styled:{value:!0,validator:function(e){return typeof e===a}},visible:{value:!1,validator:function(e){return typeof e===a}},width:{value:null,lazyAdd:!1,validator:function(e){return e===null||typeof e===O},getter:"_getWidth",setter:"_setWidth"},title:{value:null,validator:function(e){return e===null||typeof e===u}},titleRight:{value:null,validator:function(e){return e===null||typeof e===u}}}}),n.prototype.initializer=function(){var t=this,n=t.get(h),r=t.get(G);e.use(s+"base",s+"form"),t.publish(mt,{defaultFn:e.bind(t.hide,t),emitFacade:!0}),t._eventhandlers=[],n.addClass(V),n.toggleClass(Q,!t.get(T)),n.toggleClass($,t.get(X)),n.toggleClass(b,t.get(y)),n.addClass(J),r&&n.addClass(r),t.renderPromise().then(function(){t.get(f)&&n.removeClass(J)})},n.prototype.bindUI=function(){var t=this,n=t.get(h),r=t.get(p),s=t._eventhandlers,a=t.get(C),d=t.get(k),v=t.get(A);a instanceof e.View&&a.addTarget(t),d instanceof e.View&&d.addTarget(t),v instanceof e.View&&v.addTarget(t),t.get(q)&&t.get(T)&&e.use(z+W,function(){t.get(o)||n.plug(e.Plugin.Drag).dd.addHandle("."+Y)&&n.dd.addTarget(t)}),t.get(U)&&e.use(R+W,function(){t.get(o)||r.plug(e.Plugin.Resize,{handles:["r","b","br"]}).resize.addTarget(t)}),s.push(t.after(f+x,function(e){var r=e.newVal;n.toggleClass(J,!r),r?(t.get(D)||t.get("focusOnShow"))&&t.focus():t.blur()})),s.push(t.after(T+x,function(r){n.toggleClass(Q,!r.newVal),t.get(q)&&(r.newVal&&!n.dd&&e.use(z+W,function(){t.get(o)||n.plug(e.Plugin.Drag).dd.addHandle("."+Y)&&n.dd.addTarget(t)}),!r.newVal&&n.dd&&n.dd.removeTarget(t)&&n.unplug(z))})),s.push(t.after(q+x,function(r){r.newVal&&t.get(T)&&!n.dd&&e.use(z+W,function(){t.get(o)||n.plug(e.Plugin.Drag).dd.addHandle("."+Y)&&n.dd.addTarget(t)}),!r.newVal&&n.dd&&n.dd.removeTarget(t)&&n.unplug(z)})),s.push(t.after(U+x,function(n){n.newVal&&!r[R]&&e.use(R+W,function(){t.get(o)||r.plug(e.Plugin.Resize,{handles:["r","b","br"]}).resize.addTarget(t)}),!n.newVal&&r[R]&&r[R].removeTarget(t)&&r[R].unplug(R)})),s.push(t.after([I+":"+I,I+":end"],function(){var t=e.ITSAFormElement,n=t&&t.tipsyOK,r=t&&t.tipsyInvalid;n&&n.get(f)&&n._lastnode&&n._alignTooltip(n._lastnode),r&&r.get(f)&&r._lastnode&&r._alignTooltip(r._lastnode)})),s.push(t.after([R+":end",c+x,l+x,"minHeight"+x,"minWidth"+x],function(){t.get(F)&&t.centered()})),s.push(t.after([C+x,k+x,A+x],function(n){n.prevVal instanceof e.View&&n.prevVal.removeTarget(t),n.newVal instanceof e.View&&n.newVal.addTarget(t)})),s.push(t.after([L+x,L+B+x],e.bind(t._renderFooter,t))),s.push(t.after(X+x,function(e){n.toggleClass($,e.newVal)})),s.push(t.after(G+x,function(e){e.prevVal&&n.removeClass(e.prevVal),e.newVal&&n.addClass(e.newVal)})),s.push(t.on(H+x,function(e){var n=e.newVal,r=t.get(j),s=t.get(C);(!s||typeof s===u)&&t._header.setHTML(i.sub(s||ft,{title:n||"",titleRight:r===null?at:r}))})),s.push(t.on(j+x,function(e){var n=e.newVal,r=t.get(H),s=t.get(C);(!s||typeof s===u)&&t._header.setHTML(i.sub(s||ft,{title:r||"",titleRight:n===null?at:n}))})),s.push(t.on(D+x,function(e){!t.get(T)&&e.preventDefault()})),s.push(t.on(k+x,e.bind(t._renderBody,t))),s.push(t.on(C+x,e.bind(t._renderHeader,t))),s.push(t.on(A+x,e.bind(t._renderFooter
,t))),s.push(t._header.delegate(ht,function(e){t.fire(mt,{buttonNode:e.target})},"."+it)),s.push(n.delegate(ht,function(e){var n=e.currentTarget,r;r={type:vt,target:t,value:n&&n.get(dt),buttonNode:n},t.fire(vt,r)},m)),s.push(n.on(ht,function(){t.focus()})),s.push(n.on(pt,function(){t.blur()})),s.push(t.after(y+x,function(e){n.toggleClass(b,e.newVal)})),s.push(t.after("*:viewrendered",function(){t._adjustPaddingTop(),t._adjustPaddingBottom()}))},n.prototype.renderUI=function(){var e=this,t=e.get(p);t.setHTML(st+ot+ut),e._header=t.one("."+tt),e._body=t.one("."+nt),e._footer=t.one("."+rt),e._footercont=t.one("."+et),e._renderHeader(),e._renderBody(),e._renderFooter()},n.prototype.destructor=function(){var t=this,n=t.get(h),r=t.get(p),i=t.get(C),s=t.get(k),o=t.get(A);i instanceof e.View&&i.removeTarget(t),s instanceof e.View&&s.removeTarget(t),o instanceof e.View&&o.removeTarget(t),n.hasPlugin(z)&&n.dd.removeTarget(t)&&n.unplug(z),r.hasPlugin[R]&&r[R].removeTarget(t)&&r.unplug(R),t._clearEventhandlers()},n.prototype._adjustPaddingBottom=function(){var e=this;e.get(p).setStyle(v,e._footer.get(M)+P)},n.prototype._adjustPaddingTop=function(){var e=this;e.get(p).setStyle(d,e._header.get(M)+P)},n.prototype._clearEventhandlers=function(){r.each(this._eventhandlers,function(e){e.detach()})},n.prototype._getHeight=function(){return Math.round(this.get(h).get(M))},n.prototype._getWidth=function(){return Math.round(this.get(h).get(_))},n.prototype._renderHeader=function(){var t=this,n=t.get(H),r=t.get(j),s=t.get(C);!s||typeof s===u?t._header.setHTML(i.sub(s||ft,{title:n||"",titleRight:r===null?at:r})):s instanceof e.View&&(s._set("container",t._header),s.render&&s.render()),t._adjustPaddingTop()},n.prototype._renderBody=function(){var t=this,n=t.get(N),r=t.get(k);!r||typeof r===u?t._body.setHTML(i.sub(r||lt,{body:n||""})):r instanceof e.View&&(r._set("container",t._body),r.render&&r.render())},n.prototype._renderFooter=function(){var t=this,n=t.get(L),r=t.get(L+B),s=t.get(A),o=t._footer,a=!s&&!n&&!r;a||(!s||typeof s===u?o.setHTML(i.sub(s||ct,{footer:n||"",footerRight:r||""})):s instanceof e.View&&(s._set("container",t._footer),s.render&&s.render())),t._footercont.toggleClass(K,a),t._adjustPaddingBottom()},n.prototype._setHeight=function(e){var t=this;t.get(p).setStyle(c,e?e+P:"")},n.prototype._setMaxHeight=function(e){this.get(p).setStyle("maxHeight",e?e+P:"")},n.prototype._setMaxWidth=function(e){this.get(p).setStyle("maxWidth",e?e+P:"")},n.prototype._setMinHeight=function(e){this.get(p).setStyle("minHeight",e?e+P:"")},n.prototype._setMinWidth=function(e){this.get(p).setStyle("minWidth",e?e+P:"")},n.prototype._setWidth=function(e){var t=this;t.get(p).setStyle(l,e?e+P:"")}},"@VERSION@",{requires:["node-pluginhost","dd-ddm","node-event-delegate","base-build","widget-autohide","widget-modality","widget-position","widget-position-align","widget-position-constrain","widget-stack","view","widget","gallery-itsawidgetrenderpromise"],skinnable:!0});
