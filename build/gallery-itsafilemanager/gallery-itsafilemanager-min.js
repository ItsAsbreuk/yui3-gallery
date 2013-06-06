YUI.add("gallery-itsafilemanager",function(e,t){"use strict";var n=e.Lang,r=e.Array,i=e.UA.ie,s="\0",o='<img src="{thumbnail}" />',u="Filemanager",a="ready",f="yui3-itsafilemanager",l=f+"-title",c=f+"-buttons",h=f+"-hidden",p=f+"-border",d=f+"-shadow",v=f+"-itsaresehandlerx",m=f+"-itsaresehandlery",g=f+"-tree",y=f+"-treeview",b=f+"-main",w=f+"-flow",E=f+"-items",S='<div class="'+l+'">{title}</div><div class="'+c+'">edit</div>',x="<div class='"+g+"'>"+"<div class='"+y+"'></div>"+"</div>"+"<div class='"+b+"'>"+"<div class='"+w+"'></div>"+"<div class='"+E+"'></div>"+"</div>",T="error",N=function(t){if(typeof t=="string")try{return e.JSON.parse(t)}catch(n){return this.fire(T,{error:n,response:t,src:"parse"}),null}return t};e.Tree.Node.prototype.getTreeInfo=function(e){var t=this,n=t.isRoot()?"/":"/"+t[e],r=t.parent;while(r&&!r.isRoot())n="/"+r[e]+n,r=r.parent;return n},e.SortableTreeView=e.Base.create("sortableTreeView",e.TreeView,[e.Tree.Sortable],{sortComparator:function(e){return(e.canHaveChildren?s:"")+e.label}}),e.ITSAFileManager=e.Base.create("itsafilemanager",e.Panel,[],{initializer:function(){var t=this;t._inlineblock="inline"+(i>0&&i<8?"":"-block"),t._eventhandlers=[],t._resizeApprovedX=!1,t._resizeApprovedY=!1,t._bodyNode=null,t._resizeEvent=null,t._busyResize=!1,t._panelHD=null,t._panelBD=null,t._panelFT=null,t._nodeFilemanTree=null,t._nodeFilemanTreeView=null,t._nodeFilemanFlow=null,t._nodeFilemanItems=null,t._borderTreeArea=0,t._halfBorderTreeArea=0,t._borderFlowArea=0,t._halfBorderFlowArea=0,t._mouseOffset=0,t._bodyNode=e.one("body"),t._createPromises()},bindUI:function(){var e=this,t=e._eventhandlers,r=e.get("boundingBox"),i=e.get("contentBox"),s;e.set("headerContent",n.sub(S,{title:e.get("title")})),e.set("bodyContent",x),e.set("footerContent",a),e._panelHD=i.one(".yui3-widget-hd"),s=e._panelBD=i.one(".yui3-widget-bd"),e._panelFT=i.one(".yui3-widget-ft"),e.get("statusBar")||e._panelFT.setStyle("display","none"),t.push(s.on(["mousemove","touchstart"],e._checkResizeAprovement,e)),t.push(s.on("mouseleave",e._checkEndResizeApprovement,e)),t.push(s.on(["mousedown","touchstart"],e._startResize,e)),t.push(e._bodyNode.on(["mouseup","mouseleave","touchend"],e._stopResize,e)),t.push(e.on("sortableTreeView:select",e._loadFilePane,e)),e.get("visible")||r.addClass(h),t.push(e.after("visibleChange",function(e){r.toggleClass(h,!e.newVal)})),e.hasPlugin("resize")&&t.push(e.resize.on("resize:end",e._correctHeightAfterResize,e))},getCurrentDir:function(){return this._currentDir},hideFlow:function(){this.set("flow",!1)},hideTree:function(){this.set("tree",!1)},showFlow:function(){this.set("flow",!0)},showTree:function(){this.set("tree",!0)},sync:function(){return new e.Promise(function(e,t){t(new Error("The sync()-method was not overridden"))})},destructor:function(){var e=this;e._resizeEvent&&e._resizeEvent.detach(),e._clearEventhandlers(),e.files.destroy(),e.filescrollview.destroy(),e.tree.destroy()},_createPromises:function(){var t=this;t.readyPromise=new e.Promise(function(n){t.renderPromise().then(function(){e.rbind(t._afterRender,t)()}).then(e.rbind(t._allWidgetsRenderedPromise,t)).then(function(){n()})}),t.dataPromise=new e.Promise(function(n){t._createMethods(),t.readyPromise.then(function(){return e.batch(t.loadFiles(),t.get("lazyRender")?t.loadTreeLazy():t.loadTree())}).then(function(){n()})})},_allWidgetsRenderedPromise:function(){alert("start check All widgets are rendered");var t=this;return e.batch(t.filescrollview.renderPromise())},_afterRender:function(){var t=this,n=t.get("boundingBox"),r,i,s,o;n.toggleClass("yui3-itsafilemanager-loading",!0),t._nodeFilemanTree=r=n.one("."+g),t._nodeFilemanTreeView=n.one("."+y),t._nodeFilemanFlow=i=n.one("."+w),t._nodeFilemanItems=n.one("."+E),t._borderTreeArea=s=parseInt(r.getStyle("borderRightWidth"),10),t._borderFlowArea=o=parseInt(i.getStyle("borderBottomWidth"),10),t._halfBorderTreeArea=Math.round(s/2),t._halfBorderFlowArea=Math.round(o/2),t.set("sizeTreeArea",t.get("sizeTreeArea")),t.set("sizeFlowArea",t.get("sizeFlowArea")),t.hasPlugin("dd")&&t.dd.addHandle("."+l),t.hasPlugin("resize")?t.resize.hasPlugin("con")?(t.resize.con.set("preserveRatio",!1),t._setConstraints(),n.toggleClass("yui3-itsafilemanager-loading",!1)):e.use("resize-constrain",function(){t.resize.plug(e.Plugin.ResizeConstrained,{preserveRatio:!1}),t._setConstraints(),n.toggleClass("yui3-itsafilemanager-loading",!1)}):(t._setConstraints(),n.toggleClass("yui3-itsafilemanager-loading",!1)),t._currentDir="/",t._renderTree(),t._renderFiles()},_renderFiles:function(){var t=this,n,r,i;t.files=n=new e.LazyModelList,n.comparator=function(e){return e.filename||""},r=o,t.filescrollview=i=new e.ITSAScrollViewModellist({boundingBox:t._nodeFilemanItems,height:"394px",modelTemplate:r,axis:"y",modelListStyled:!1,modelList:n}),i.addTarget(t),i.render()},_renderTree:function(){var t=this,n,r;r=t.get("lazyRender"),t.tree=n=new e.SortableTreeView({container:t._nodeFilemanTreeView,lazyRender:r,multiSelect:!1}),n.addTarget(t),n.render(),r&&e.use("tree-lazy",function(){n.plug(e.Plugin.Tree.Lazy,{load:function(e,n){t.loadTreeLazy(e).then(function(){n()},function(e){n(new Error(e))})}})})},_checkEndResizeApprovement:function(){var e=this;(e._resizeApprovedX||e._resizeApprovedY)&&!e._busyResize&&e._endResizeApprovement()},_checkResizeAprovement:function(t){if(!this._busyResize){var n=this,r=n._panelBD,i=n._nodeFilemanFlow,s=t.pageX,o=t.pageY,u=r.getX(),a=r.getY(),f=n.get("contentBox"),l=n.get("tree"),c=n.get("flow"),h=i.get("offsetHeight"),p=e.UA.mobile?n.get("resizeMarginTouchDevice"):n.get("resizeMargin"),d=Math.round(p/2),g=Math.abs(s-u+n._halfBorderTreeArea),y=Math.abs(o-(a+h-n._halfBorderFlowArea));n._resizeApprovedX=l&&g<=d,n._resizeApprovedY=c&&y<=d&&(!l||s>u+d),f.toggleClass(v,n._resizeApprovedX),f.toggleClass(m,n._resizeApprovedY)}},_clearEventhandlers:function(){var e=this;r.each(this._eventhandlers,function(e){e.detach()})},_correctHeightAfterResize:function(){var e=this,t=e._panelHD,n=e.
_panelFT,r=t?t.get("offsetHeight"):0,i=n?n.get("offsetHeight"):0;e._panelBD.setStyle("height",parseInt(e.get("boundingBox").getStyle("height"),10)-r-i+"px")},_createMethods:function(){var t=this,n;r.each(["loadFiles","loadMoreFiles","loadTree","loadTreeLazy","renameFile","renameDir","deleteFiles","deleteDir","createDir","moveDir","moveFiles","cloneDir","copyFiles"],function(r){t[r]=function(i){var s={},o;return t.get("rendered")||t.render(),r==="loadFiles"?s.currentDir=t.getCurrentDir():r==="loadAppendFiles"?(s.currentDir=t.getCurrentDir(),s.batchSize=t.get("batchSize"),s.size=t.files.size(),s.lastFileId=t._lastFileId):r==="loadTree"?s.showTreefiles=t.get("showTreefiles"):r==="loadTreeLazy"?(s.showTreefiles=t.get("showTreefiles"),s.directory=i?i.getTreeInfo("label")+"/":"/"):r==="renameFile"?(s.selectedFiles=t.getSelectedFiles(),s.newFilename=i):r==="renameDir"?(s.currentDir=t.getCurrentDir(),s.newDirname=i):r==="deleteFiles"?s.selectedFiles=t.getSelectedFiles():r==="deleteDir"?s.currentDir=t.getCurrentDir():r==="createDir"?(s.currentDir=t.getCurrentDir(),s.dirName=i):r==="moveDir"?(s.currentDir=t.getCurrentDir(),s.newParentDir=i):r==="moveFiles"?(s.selectedFiles=t.getSelectedFiles(),s.dirName=i):r==="cloneDir"?(s.currentDir=t.getCurrentDir(),s.cloneDirname=i):r==="copyFiles"&&(s.selectedFiles=t.getSelectedFiles(),s.destinationDir=i),o={options:s},t.readyPromise.then(e.bind(t.sync,t,r,s)).then(function(e){return t["_"+r]||(t["_"+r]=t.publish(r,{preventable:!1})),r==="loadFiles"?t.files.reset(N(e)):r!=="loadAppendFiles"&&(r==="loadTreeLazy"&&t.get("lazyRender")?t.tree.insertNode(i,N(e)):r!=="renameFile"&&r!=="renameDir"&&r!=="deleteFiles"&&r!=="deleteDir"&&r!=="createDir"&&r!=="moveDir"&&r!=="moveFiles"&&r!=="cloneDir"&&r!=="copyFiles"&&r==="loadTree"&&!t.get("lazyRender")&&(n=t.tree,n.insertNode(n.rootNode,N(e)))),o.response=e,t.fire(r,o),e},function(e){return o.error=e,o.src=r,t.fire(T,o),e})}})},_endResizeApprovement:function(){var e=this,t=e.get("contentBox");e._resizeApprovedX=!1,e._resizeApprovedY=!1,t.toggleClass(v,!1),t.toggleClass(m,!1)},_loadFilePane:function(e){var t=this,n=e.node;n.canHaveChildren&&(t._currentDir=n.getTreeInfo("label")+"/",t.loadFiles())},_resizeTree:function(e){if(this._busyResize){var t=this,n=t._nodeFilemanTree,r=n.getX(),i=Math.round(e.pageX-r-t._mouseOffset);t.set("sizeTreeArea",i)}},_resizeFlow:function(e){if(this._busyResize){var t=this,n=t._nodeFilemanFlow,r=n.getY(),i=Math.round(e.pageY-r-t._mouseOffset);t.set("sizeFlowArea",i)}},_setConstraints:function(){var e=this,t=e.resize&&e.resize.con,n=e._panelHD,r=e._panelFT,i=n?n.get("offsetHeight"):0,s=r?r.get("offsetHeight"):0,o=(e.get("tree")?Math.max(e.get("sizeTreeArea"),e._borderTreeArea):0)+e.get("minWidthFileArea"),u=(e.get("flow")?Math.max(e.get("sizeFlowArea"),e._borderFlowArea):0)+e.get("minHeightFileArea")+i+s,a=e.get("boundingBox");t&&(t.set("minWidth",o),t.set("minHeight",u)),parseInt(a.getStyle("width"),10)<o&&(a.setStyle("width",o+"px"),e.set("sizeTreeArea",e.get("sizeTreeArea"))),parseInt(a.getStyle("height"),10)<u&&(a.setStyle("height",u+"px"),e._panelBD.setStyle("height",u-i-s+"px"),e.set("sizeFlowArea",e.get("sizeFlowArea")))},_setShowTreefiles:function(e){},_setSizeFlowArea:function(e,t,n){var r=this,i=r._borderFlowArea,s=n?0:Math.max(r.get("minSizeFlowArea")-i,0),o=r._panelBD.get("offsetHeight")-r.get("minHeightFileArea")-i,u=Math.max(e-i,s);return u=Math.min(u,o),r._nodeFilemanFlow.setStyle("height",u+"px"),r.resize&&r.resize.hasPlugin("con")&&r._setConstraints(),u},_setSizeTreeArea:function(e,t,n){var r=this,i=r._nodeFilemanTree,s=r._borderTreeArea,o=n?0:Math.max(r.get("minSizeTreeArea"),s),u=r.get("contentBox").get("offsetWidth")-r.get("minWidthFileArea"),a=Math.max(e,o),f;return a=Math.min(a,u),f=a-s,i.setStyle("width",f+"px"),i.setStyle("marginLeft",-a+"px"),r._panelBD.setStyle("marginLeft",a+"px"),r.resize&&r.resize.hasPlugin("con")&&r._setConstraints(),a},_startResize:function(e){var t=this,n=t._nodeFilemanTree,r=t._nodeFilemanFlow,i,s,o,u;t._resizeApprovedX?(t._busyResize=!0,i=n.getX(),o=n.get("offsetWidth"),t._mouseOffset=e.pageX-(i+o),t._resizeEvent&&t._resizeEvent.detach(),t._resizeEvent=t._bodyNode.on(["mousemove","touchmove"],t._resizeTree,t)):t._resizeApprovedY&&(t._busyResize=!0,s=r.getY(),u=r.get("offsetHeight"),t._mouseOffset=e.pageY-(s+u),t._resizeEvent&&t._resizeEvent.detach(),t._resizeEvent=t._bodyNode.on(["mousemove","touchmove"],t._resizeFlow,t))},_stopResize:function(){var e=this;e._busyResize&&(e._busyResize=!1,e._resizeEvent&&e._resizeEvent.detach())}},{ATTRS:{batchSize:{value:500,validator:function(e){return typeof e=="number"&&e>0}},border:{value:!0,lazyAdd:!1,validator:function(e){return typeof e=="boolean"},setter:function(e){this.get("boundingBox").toggleClass(p,e)}},tree:{value:!0,validator:function(e){return typeof e=="boolean"},setter:function(e){var t=this;t._nodeFilemanTree.setStyle("display",e?t._inlineblock:"none"),t.resize&&t.resize.hasPlugin("con")&&t._setConstraints(),t._setSizeTreeArea(e?t.get("sizeTreeArea"):0,null,!0)},getter:function(){return this._nodeFilemanTree.getStyle("display")!=="none"}},flow:{value:!1,validator:function(e){return typeof e=="boolean"},setter:function(e){var t=this;t._nodeFilemanFlow.setStyle("display",e?"block":"none"),t.resize&&t.resize.hasPlugin("con")&&t._setConstraints(),t._setSizeFlowArea(e?t.get("sizeFlowArea"):0,null,!0)},getter:function(){return this._nodeFilemanFlow.getStyle("display")!=="none"}},lazyRender:{value:!1,writeOnce:"initOnly",validator:function(e){return typeof e=="boolean"}},showTreefiles:{value:!1,validator:function(e){return typeof e=="boolean"},setter:"_setShowTreefiles"},sizeTreeArea:{value:200,validator:function(e){return typeof e=="number"},setter:"_setSizeTreeArea"},sizeFlowArea:{value:150,validator:function(e){return typeof e=="number"},setter:"_setSizeFlowArea"},minSizeTreeArea:{value:100,validator:function(e){return typeof e=="number"&&e>=0},setter:function(){var e=this;e.resize&&e.resize.
hasPlugin("con")&&e._setConstraints()}},minSizeFlowArea:{value:100,validator:function(e){return typeof e=="number"&&e>=0},setter:function(){var e=this;e.resize&&e.resize.hasPlugin("con")&&e._setConstraints()}},minWidthFileArea:{value:200,validator:function(e){return typeof e=="number"&&e>=50},setter:function(){var e=this;e.resize&&e.resize.hasPlugin("con")&&e._setConstraints()}},minHeightFileArea:{value:100,validator:function(e){return typeof e=="number"&&e>=50},setter:function(){var e=this;e.resize&&e.resize.hasPlugin("con")&&e._setConstraints()}},title:{value:u,validator:function(e){return typeof e=="string"},setter:function(e){this.set("headerContent",e)}},resizeMargin:{value:6,validator:function(e){return n.isNumber(e)&&e>=2&&e<=60}},resizeMarginTouchDevice:{value:32,validator:function(e){return typeof e=="number"&&e>=2&&e<=60}},statusBar:{value:!0,validator:function(e){return typeof e=="boolean"},setter:function(e){var t=this;t._panelFT.setStyle("display",e?"":"none"),t._correctHeightAfterResize()}},shadow:{value:!0,lazyAdd:!1,validator:function(e){return n.isBoolean(e)},setter:function(e){this.get("boundingBox").toggleClass(d,e)}}}})},"@VERSION@",{requires:["base-build","panel","node-base","node-screen","node-event-delegate","event-mouseenter","event-custom","event-touch","pluginhost-base","lazy-model-list","gallery-sm-treeview","gallery-itsascrollviewmodellist","gallery-itsawidgetrenderpromise","promise","json-parse","tree-sortable"],skinnable:!1});
