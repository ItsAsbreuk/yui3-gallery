YUI.add("gallery-itsafilemanager",function(e,t){"use strict";var n=e.Lang,r=e.Array,i="filemanager",s="ready",o="<div class='filemanTree'></div><div class='filemanMain'><div class='filemanFlow'></div><div class='filemanItems'></div></div>",u="yui3-filemanager-itsaresehandlerx",a="yui3-filemanager-itsaresehandlery",f="yui3-itsafilemanager-border",l="yui3-itsafilemanager-shadow";e.ITSAFileManager=e.Base.create("itsafilemanager",e.Panel,[],{_resizeEventhandlers:[],_resizeApprovedX:!1,_resizeApprovedY:!1,_bodyNode:null,_resizeEvent:null,_busyResize:!1,_panelHD:null,_panelBD:null,_panelFT:null,_nodeFilemanTree:null,_nodeFilemanFlow:null,_borderTreeArea:0,_halfBorderTreeArea:0,_borderFlowArea:0,_halfBorderFlowArea:0,_mouseOffset:0,initializer:function(){var t=this;t.set("headerContent",i),t.set("bodyContent",o),t.statusBar&&t.set("footerContent",s),t._bodyNode=e.one("body"),t.after("render",t._afterRender,t)},_afterRender:function(){var t=this,n=t.get("boundingBox"),r,i,s,o;n.toggleClass("yui3-itsafilemanager-loading",!0),t._nodeFilemanTree=r=n.one(".filemanTree"),t._nodeFilemanFlow=i=n.one(".filemanFlow"),t._borderTreeArea=s=parseInt(r.getStyle("borderRightWidth"),10),t._borderFlowArea=o=parseInt(i.getStyle("borderBottomWidth"),10),t._halfBorderTreeArea=Math.round(s/2),t._halfBorderFlowArea=Math.round(o/2),t.set("sizeTreeArea",t.get("sizeTreeArea")),t.set("sizeFlowArea",t.get("sizeFlowArea")),t.hasPlugin("dd")&&t.dd.addHandle(".yui3-widget-hd"),t.hasPlugin("resize")?t.resize.hasPlugin("con")?(t.resize.con.set("preserveRatio",!1),t._setConstraints(),n.toggleClass("yui3-itsafilemanager-loading",!1)):e.use("resize-constrain",function(){t.resize.plug(e.Plugin.ResizeConstrained,{preserveRatio:!1}),t._setConstraints(),n.toggleClass("yui3-itsafilemanager-loading",!1)}):(t._setConstraints(),n.toggleClass("yui3-itsafilemanager-loading",!1))},_setConstraints:function(){var e=this,t=e.resize&&e.resize.con,n=e._panelHD,r=e._panelFT,i=n?n.get("offsetHeight"):0,s=r?r.get("offsetHeight"):0,o=(e.get("treeVisible")?Math.max(e.get("sizeTreeArea"),e._borderTreeArea):0)+e.get("minSizeFileArea"),u=(e.get("flowVisible")?Math.max(e.get("sizeFlowArea"),e._borderFlowArea):0)+e.get("minSizeFileArea")+i+s,a=e.get("boundingBox");t&&(t.set("minWidth",o),t.set("minHeight",u)),parseInt(a.getStyle("width"),10)<o&&(a.setStyle("width",o+"px"),e.set("sizeTreeArea",e.get("sizeTreeArea"))),parseInt(a.getStyle("height"),10)<u&&(a.setStyle("height",u+"px"),e._panelBD.setStyle("height",u-i-s+"px"),e.set("sizeFlowArea",e.get("sizeFlowArea")))},_correctHeightAfterResize:function(){var e=this,t=e._panelHD,n=e._panelFT,r=t?t.get("offsetHeight"):0,i=n?n.get("offsetHeight"):0;e._panelBD.setStyle("height",parseInt(e.get("boundingBox").getStyle("height"),10)-r-i+"px")},bindUI:function(){var e=this,t=e._resizeEventhandlers,n=e.get("contentBox"),r;e._panelHD=n.one(".yui3-widget-hd"),e._panelBD=r=n.one(".yui3-widget-bd"),e._panelFT=n.one(".yui3-widget-ft"),t.push(r.on(["mousemove","touchstart"],e._checkResizeAprovement,e)),t.push(r.on("mouseleave",e._checkEndResizeApprovement,e)),t.push(r.on(["mousedown","touchstart"],e._startResize,e)),t.push(e._bodyNode.on(["mouseup","mouseleave","touchend"],e._stopResize,e)),e.hasPlugin("resize")&&t.push(e.resize.on("resize:end",e._correctHeightAfterResize,e))},showFlow:function(){this.set("flowVisible",!0)},hideFlow:function(){this.set("flowVisible",!1)},showTree:function(){this.set("treeVisible",!0)},hideTree:function(){this.set("treeVisible",!1)},destructor:function(){var e=this;e._resizeEvent&&e._resizeEvent.detach(),e._clearEventhandlers()},_checkResizeAprovement:function(t){if(!this._busyResize){var n=this,r=n._panelBD,i=n._nodeFilemanFlow,s=t.pageX,o=t.pageY,f=r.getX(),l=r.getY(),c=n.get("contentBox"),h=n.get("treeVisible"),p=n.get("flowVisible"),d=i.get("offsetHeight"),v=e.UA.mobile?n.get("resizeMarginTouchDevice"):n.get("resizeMargin"),m=Math.round(v/2),g=Math.abs(s-f+n._halfBorderTreeArea),y=Math.abs(o-(l+d-n._halfBorderFlowArea));n._resizeApprovedX=h&&g<=m,n._resizeApprovedY=p&&y<=m&&(!h||s>f+m),c.toggleClass(u,n._resizeApprovedX),c.toggleClass(a,n._resizeApprovedY)}},_checkEndResizeApprovement:function(){var e=this;(e._resizeApprovedX||e._resizeApprovedY)&&!e._busyResize&&e._endResizeApprovement()},_endResizeApprovement:function(){var e=this,t=e.get("contentBox");e._resizeApprovedX=!1,e._resizeApprovedY=!1,t.toggleClass(u,!1),t.toggleClass(a,!1)},_startResize:function(e){var t=this,n=t._nodeFilemanTree,r=t._nodeFilemanFlow,i,s,o,u;t._resizeApprovedX?(t._busyResize=!0,i=n.getX(),o=n.get("offsetWidth"),t._mouseOffset=e.pageX-(i+o),t._resizeEvent&&t._resizeEvent.detach(),t._resizeEvent=t._bodyNode.on(["mousemove","touchmove"],t._resizeColumnX,t)):t._resizeApprovedY&&(t._busyResize=!0,s=r.getY(),u=r.get("offsetHeight"),t._mouseOffset=e.pageY-(s+u),t._resizeEvent&&t._resizeEvent.detach(),t._resizeEvent=t._bodyNode.on(["mousemove","touchmove"],t._resizeColumnY,t))},_stopResize:function(){var e=this;e._busyResize&&(e._busyResize=!1,e._resizeEvent&&e._resizeEvent.detach())},_resizeColumnX:function(e){if(this._busyResize){var t=this,n=t._nodeFilemanTree,r=n.getX(),i=Math.round(e.pageX-r-t._mouseOffset);t.set("sizeTreeArea",i)}},_resizeColumnY:function(e){if(this._busyResize){var t=this,n=t._nodeFilemanFlow,r=n.getY(),i=Math.round(e.pageY-r-t._mouseOffset);t.set("sizeFlowArea",i)}},_clearEventhandlers:function(){r.each(this._eventhandlers,function(e){e.detach()})}},{ATTRS:{treeVisible:{validator:function(e){return n.isBoolean(e)},setter:function(e){var t=this;t._nodeFilemanTree.setStyle("display",e?"inline-block":"none"),t.resize&&t.resize.hasPlugin("con")&&t._setConstraints()},getter:function(){return this._nodeFilemanTree.getStyle("display")!=="none"}},flowVisible:{validator:function(e){return n.isBoolean(e)},setter:function(e){var t=this;t._nodeFilemanFlow.setStyle("display",e?"block":"none"),t.resize&&t.resize.hasPlugin("con")&&t._setConstraints()},getter:function(){return this._nodeFilemanFlow.getStyle("display")!=="none"}},sizeTreeArea:{value:200,validator:function(e){return n.isNumber(e)},setter:function(e){var t=this,n=t._nodeFilemanTree,r=t._borderTreeArea,i=Math.max(t.get("minSizeTreeArea"),r),s=t.get("contentBox").get("offsetWidth")-t.get("minSizeFileArea"),o=Math.max(e,i),u;o=Math.min(o,s),u=o-r,n.setStyle("width",u+"px"),n.setStyle("marginLeft",-o+"px"),t._panelBD.setStyle("marginLeft",o+"px"),t.resize&&t.resize.hasPlugin("con")&&t._setConstraints()}},sizeFlowArea:{value:150,validator:function(e){return n.isNumber(e)},setter:function(e){var t=this,n=t._borderFlowArea,r=Math.max(t.get("minSizeFlowArea")-n,0),i=t._panelBD.get("offsetHeight")-t.get("minSizeFileArea")-n,s=Math.max(e-n,r);s=Math.min(s,i),t._nodeFilemanFlow.setStyle("height",s+"px"),t.resize&&t.resize.hasPlugin("con")&&t._setConstraints()}},minSizeTreeArea:{value:100,validator:function(e){return n.isNumber(e)&&e>=0},setter:function(){var e=this;e.resize&&e.resize.hasPlugin("con")&&e._setConstraints()}},minSizeFlowArea:{value:100,validator:function(e){return n.isNumber(e)&&e>=0},setter:function(){var e=this;e.resize&&e.resize.hasPlugin("con")&&e._setConstraints()}},minSizeFileArea:{value:100,validator:function(e){return n.isNumber(e)&&e>=0},setter:function(){var e=this;e.resize&&e.resize.hasPlugin("con")&&e._setConstraints()}},resizeMargin:{value:6,validator:function(e){return n.isNumber(e)&&e>=2&&e<=60}},resizeMarginTouchDevice:{value:32,validator:function(e){return n.isNumber(e)&&e>=2&&e<=60}},statusBar:{value:!0,lazyAdd:!1,validator:function(e){return n.isBoolean(e)},setter:function(){this.set("footerContent",s)}},border:{value:!0,lazyAdd:!1,validator:function(e){return n.isBoolean(e)},setter:function(e){this.get("boundingBox").toggleClass(f,e)}},shadow:{value:!0,lazyAdd:!1,validator:function(e){return n.isBoolean(e)},setter:function(e){this.get("boundingBox").toggleClass(l,e)}},minColWidth:{value:0,validator:function(e){return n.isNumber(e)&&e>=0}}}})},"@VERSION@",{requires:["base-build","panel","node-base","node-screen","node-event-delegate","event-mouseenter","event-custom","event-touch","pluginhost-base"],skinnable:!1});
