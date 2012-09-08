YUI.add("gallery-itsatoolbar",function(c){var e=c.Lang,p=c.Node,f="<button class='yui3-button'></button>",h="<span class='itsa-button-icon'></span>",j="yui3-button-active",o="itsa-button-active",g="itsa-button-indent",m="itsa-button",r="itsa-syncbutton",l="itsa-togglebutton",i="itsa-buttongroup",n="itsa-button-customfunc",q="<div class='itsatoolbar'></div>",b="itsa-buttonsize-small",a="itsa-buttonsize-medium",s="itsatoolbar-editorpart",d="<div></div>",k="<span id='itsatoolbar-ref'></span>";c.namespace("Plugin").ITSAToolbar=c.Base.create("itsatoolbar",c.Plugin.Base,[],{editor:null,editorY:null,editorNode:null,containerNode:null,toolbarNode:null,_destroyed:false,ICON_BOLD:"itsa-icon-bold",ICON_ITALIC:"itsa-icon-italic",ICON_UNDERLINE:"itsa-icon-underline",ICON_ALIGN_LEFT:"itsa-icon-alignleft",ICON_ALIGN_CENTER:"itsa-icon-aligncenter",ICON_ALIGN_RIGHT:"itsa-icon-alignright",ICON_ALIGN_JUSTIFY:"itsa-icon-alignjustify",ICON_SUBSCRIPT:"itsa-icon-subscript",ICON_SUPERSCRIPT:"itsa-icon-superscript",ICON_TEXTCOLOR:"itsa-icon-textcolor",ICON_MARKCOLOR:"itsa-icon-markcolor",ICON_INDENT:"itsa-icon-indent",ICON_OUTDENT:"itsa-icon-outdent",ICON_UNORDEREDLIST:"itsa-icon-unorderedlist",ICON_ORDEREDLIST:"itsa-icon-orderedlist",ICON_UNDO:"itsa-icon-undo",ICON_REDO:"itsa-icon-redo",ICON_EMAIL:"itsa-icon-email",ICON_HYPERLINK:"itsa-icon-hyperlink",ICON_IMAGE:"itsa-icon-image",ICON_FILE:"itsa-icon-file",ICON_VIDEO:"itsa-icon-video",initializer:function(u){var t=this;t.editor=t.get("host");if(t.editor.frame&&t.editor.frame.get("node")){t._render();}else{t.editor.on("frame:ready",t._render,t);}},_render:function(){var t=this;if(!t._destroyed){t.editorY=t.editor.getInstance();t.editorNode=t.editor.frame.get("node");t.containerNode=t.editorNode.get("parentNode");t.get("paraSupport")?t.editor.plug(c.Plugin.EditorPara):t.editor.plug(c.Plugin.EditorBR);t.editor.plug(c.Plugin.ExecCommand);t._defineCustomExecCommands();t._renderUI();t._bindUI();t.editor.frame.focus(c.bind(t._initStatus,t));}},_initStatus:function(){var t=this,u=t._getCursorRef();if(u){t.toolbarNode.fire("itsatoolbar:statusChange",{changedNode:u});}},_getCursorRef:function(){var t=this,w,u,v;w=new t.editorY.EditorSelection();u=w.getSelected();if(!w.isCollapsed&&u.size()){v=u.item(0);}else{t._removeCursorRef();t.editor.exec.command("inserthtml",k);v=t.editorY.one("#itsatoolbar-ref");}return v;},_removeCursorRef:function(){var t=this,v,u;u=t.editorY?t.editorY:c;v=u.all("#itsatoolbar-ref");if(v){v.remove();}},sync:function(u){var t=this;if(u&&u.changedNode){t.toolbarNode.fire("itsatoolbar:statusChange",u);}},addButton:function(w,y,v,u){var t=this,x,z;x=p.create(f);x.addClass(m);if(e.isString(y)){x.setData("execCommand",y);}else{if(e.isObject(y)){if(e.isString(y.command)){x.setData("execCommand",y.command);}if(e.isString(y.value)){x.setData("execValue",y.value);}if(e.isFunction(y.customFunc)){x.addClass(n);x.on("click",y.customFunc,y.context||t);}}}if(e.isBoolean(v)&&v){x.addClass(g);}z=p.create(h);z.addClass(w);x.append(z);t.toolbarNode.append(x);return x;},addSyncButton:function(z,A,x,t,v,w,y){var B=this,u=B.addButton(z,A,v,w);if(!y){u.addClass(r);}B.toolbarNode.addTarget(u);if(e.isFunction(x)){u.on("itsatoolbar:statusChange",c.bind(x,t||B));}return u;},addToggleButton:function(w,z,A,y,v,u){var t=this,x=t.addSyncButton(w,z,A,y,v,u,true);x.addClass(l);return x;},addButtongroup:function(A,v,z){var C=this,y=c.guid(),x,u,t=null,B,w;for(w=0;w<A.length;w++){x=A[w];if(x.iconClass&&x.command){if(e.isString(x.value)){B={command:x.command,value:x.value};}else{B=x.command;}u=C.addButton(x.iconClass,B,v&&(w===0),(z)?z+w:null);u.addClass(i);u.addClass(i+"-"+y);u.setData("buttongroup",y);C.toolbarNode.addTarget(u);if(e.isFunction(x.syncFunc)){u.on("itsatoolbar:statusChange",c.bind(x.syncFunc,x.context||C));}if(!t){t=u;}}}return t;},addSelectlist:function(z,A,y,t,v,u,x){var B=this,w;u=c.merge(u,{items:z,defaultButtonText:""});w=new c.ITSASelectList(u);w.after("render",function(J,G,H,F,D){var C=this,I=J.currentTarget,E=I.buttonNode;if(e.isString(G)){E.setData("execCommand",G);}else{if(e.isString(G.command)){E.setData("execCommand",G.command);}if(e.isString(G.restoreCommand)){E.setData("restoreCommand",G.restoreCommand);}if(e.isString(G.restoreValue)){E.setData("restoreValue",G.restoreValue);}}if(D){I.get("boundingBox").addClass("itsa-button-indent");}C.toolbarNode.addTarget(E);I.on("selectChange",C._handleSelectChange,C);if(e.isFunction(H)){E.on("itsatoolbar:statusChange",c.bind(H,F||C));}C.editor.on("nodeChange",I.hideListbox,I);},B,A,y,t,v);w.render(B.toolbarNode);return w;},destructor:function(){var t=this,u=t.get("srcNode");t._destroyed=true;t._removeCursorRef();if(t.toolbarNode){t.toolbarNode.remove(true);}},_renderUI:function(){var u=this,v=u.get("srcNode"),t=u.get("btnSize");u.toolbarNode=p.create(q);if(t===1){u.toolbarNode.addClass(b);}else{if(t===2){u.toolbarNode.addClass(a);}}if(v){v.prepend(u.toolbarNode);}else{u.toolbarNode.addClass(s);u.editorNode.set("height",parseInt(u.containerNode.getStyle("height"),10)-parseInt(u.toolbarNode.getStyle("height"),10)+"px");u.editorNode.insert(u.toolbarNode,"before");}u._initializeButtons();},_bindUI:function(){var t=this;t.editor.on("nodeChange",t.sync,t);t.toolbarNode.delegate("click",t._handleBtnClick,"button",t);},_defineCustomExecCommands:function(){var t=this;t._defineExecCommandFontSize();t._defineExecCommandHyperlink();t._defineExecCommandMaillink();t._defineExecCommandImage();t._defineExecCommandYouTube();},_handleBtnClick:function(v){var t=this,u=v.currentTarget;if(u.hasClass(m)){if(u.hasClass(l)){u.toggleClass(j);}else{if(u.hasClass(r)){u.toggleClass(o,true);}else{if(u.hasClass(i)){t.toolbarNode.all("."+i+"-"+u.getData("buttongroup")).toggleClass(j,false);u.toggleClass(j,true);}}}if(!u.hasClass(n)){t._execCommandFromData(u);}}},_handleSelectChange:function(w){var v,t,u;v=w.currentTarget.buttonNode;t=v.getData("restoreCommand");u=(t&&(w.value===v.getData("restoreValue")))?t:v.getData("execCommand");this.execCommand(u,w.value);
},_execCommandFromData:function(t){var u,v;u=t.getData("execCommand");v=t.getData("execValue");this.execCommand(u,v);},execCommand:function(v,u){var t=this;t.editor.focus();t.editor.exec.command(v,u);},_checkInbetweenSelector:function(v,u,y){var t=this,A="<s*"+v+"[^>]*>(.*?)<s*/s*"+v+">",z=new RegExp(A,"gi"),x,w=false;x=z.exec(u);while((x!==null)&&!w){w=((y>x.index)&&(y<(x.index+x[0].length)));x=z.exec(u);}return w;},_initializeButtons:function(){var B=this,w,u,x,A,C,y,D,t,v,z;if(B.get("btnFontfamily")){y=B.get("fontFamilies");for(w=0;w<y.length;w++){C=y[w];y[w]={text:"<span style='font-family:"+C+"'>"+C+"</span>",returnValue:C};}B.fontSelectlist=B.addSelectlist(y,"fontname2",function(H){var G=H.changedNode.getStyle("fontFamily"),F=G.split(","),E=F[0];this.fontSelectlist.selectItemByValue(E,true,true);},null,true,{buttonWidth:145});}if(B.get("btnFontsize")){y=[];for(w=6;w<=32;w++){y.push({text:w.toString(),returnValue:w+"px"});}B.sizeSelectlist=B.addSelectlist(y,"itsafontsize",function(H){var G=H.changedNode.getStyle("fontSize"),F=parseFloat(G),E=G.substring(F.toString().length);this.sizeSelectlist.selectItemByValue(Math.round(F)+E,true);},null,true,{buttonWidth:42,className:"itsatoolbar-fontsize",listAlignLeft:false});}if(B.get("btnHeader")){y=[];y.push({text:"No header",returnValue:"none"});for(w=1;w<=B.get("headerLevels");w++){y.push({text:"Header "+w,returnValue:"h"+w});}B.headerSelectlist=B.addSelectlist(y,"itsaheading",function(J){var E=this,H=J.changedNode,K,I,F,G=E.editorY.one("body").getHTML();K=G.indexOf(H.getHTML());for(F=1;(!I&&(F<=E.get("headerLevels")));F++){if(E._checkInbetweenSelector("h"+F,G,K)){I=F;}}if(!I){I=0;}E.headerSelectlist.selectItem(I);},null,true,{buttonWidth:96});}if(B.get("btnBold")){B.addToggleButton(B.ICON_BOLD,"bold",function(E){E.currentTarget.toggleClass(j,(E.changedNode.getStyle("fontWeight")==="bold"));},null,true);}if(B.get("btnItalic")){B.addToggleButton(B.ICON_ITALIC,"italic",function(E){E.currentTarget.toggleClass(j,(E.changedNode.getStyle("fontStyle")==="italic"));});}if(B.get("btnUnderline")){B.addToggleButton(B.ICON_UNDERLINE,"underline",function(E){E.currentTarget.toggleClass(j,(E.changedNode.getStyle("textDecoration")==="underline"));});}if(B.get("grpAlign")){z=[{iconClass:B.ICON_ALIGN_LEFT,command:"JustifyLeft",value:"",syncFunc:function(E){E.currentTarget.toggleClass(j,((E.changedNode.getStyle("textAlign")==="left")||(E.changedNode.getStyle("textAlign")==="start")));}},{iconClass:B.ICON_ALIGN_CENTER,command:"JustifyCenter",value:"",syncFunc:function(E){E.currentTarget.toggleClass(j,(E.changedNode.getStyle("textAlign")==="center"));}},{iconClass:B.ICON_ALIGN_RIGHT,command:"JustifyRight",value:"",syncFunc:function(E){E.currentTarget.toggleClass(j,(E.changedNode.getStyle("textAlign")==="right"));}}];if(B.get("btnJustify")){z.push({iconClass:B.ICON_ALIGN_JUSTIFY,command:"JustifyFull",value:"",syncFunc:function(E){E.currentTarget.toggleClass(j,(E.changedNode.getStyle("textAlign")==="justify"));}});}B.addButtongroup(z,true);}if(B.get("grpSubsuper")){B.addToggleButton(B.ICON_SUBSCRIPT,"subscript",function(E){E.currentTarget.toggleClass(j,(E.changedNode.test("sub")));},null,true);B.addToggleButton(B.ICON_SUPERSCRIPT,"superscript",function(E){E.currentTarget.toggleClass(j,(E.changedNode.test("sup")));});}if(B.get("btnTextcolor")){y=[];v=B.get("colorPallet");for(w=0;w<v.length;w++){D=v[w];y.push({text:"<div style='background-color:"+D+";'></div>",returnValue:D});}B.colorSelectlist=B.addSelectlist(y,"forecolor",function(H){var E=this,G=H.changedNode.getStyle("color"),F=E._filter_rgb(G);E.colorSelectlist.selectItemByValue(F,true,true);},null,true,{listWidth:256,className:"itsatoolbar-colors",iconClassName:B.ICON_TEXTCOLOR});}if(B.get("btnMarkcolor")){y=[];v=B.get("colorPallet");for(w=0;w<v.length;w++){D=v[w];y.push({text:"<div style='background-color:"+D+";'></div>",returnValue:D});}B.markcolorSelectlist=B.addSelectlist(y,"hilitecolor",function(H){var E=this,G=H.changedNode.getStyle("backgroundColor"),F=E._filter_rgb(G);E.markcolorSelectlist.selectItemByValue(F,true,true);},null,true,{listWidth:256,className:"itsatoolbar-colors",iconClassName:B.ICON_MARKCOLOR});}if(B.get("grpIndent")){B.addButton(B.ICON_INDENT,"indent",true);B.addButton(B.ICON_OUTDENT,"outdent");}if(B.get("grpLists")){B.addToggleButton(B.ICON_UNORDEREDLIST,"insertunorderedlist",function(H){var E=this,G=H.changedNode,I,F=E.editorY.one("body").getHTML();I=F.indexOf(G.getHTML());H.currentTarget.toggleClass(j,(E._checkInbetweenSelector("ul",F,I)));},null,true);B.addToggleButton(B.ICON_ORDEREDLIST,"insertorderedlist",function(H){var E=this,G=H.changedNode,I,F=E.editorY.one("body").getHTML();I=F.indexOf(G.getHTML());H.currentTarget.toggleClass(j,(E._checkInbetweenSelector("ol",F,I)));});}if(B.get("btnEmail")){B.addSyncButton(B.ICON_EMAIL,"itsacreatemaillink",function(J){var F=this,H=J.changedNode,K,I,E,G=F.editorY.one("body").getHTML();K=G.indexOf(H.getHTML());I=F._checkInbetweenSelector("a",G,K);if(I){while(H&&!H.test("a")){H=H.get("parentNode");}E=(H.get("href").match("^mailto:","i")=="mailto:");}J.currentTarget.toggleClass(o,(I&&E));},null,true);}if(B.get("btnHyperlink")){B.addSyncButton(B.ICON_HYPERLINK,"itsacreatehyperlink",function(K){var N=this,L=".doc.docx.xls.xlsx.pdf.txt.zip.rar.",I=K.changedNode,H,J,M=false,F,E,P,O,G=N.editorY.one("body").getHTML();H=G.indexOf(I.getHTML());J=N._checkInbetweenSelector("a",G,H);if(J){while(I&&!I.test("a")){I=I.get("parentNode");}F=I.get("href");O=F.match("^mailto:","i")!="mailto:";if(O){E=F.lastIndexOf(".");if(E!==-1){P=F.substring(E)+".";M=(L.indexOf(P)!==-1);}}}K.currentTarget.toggleClass(o,(J&&O&&!M));});}if(B.get("btnImage")){B.addSyncButton(B.ICON_IMAGE,"itsacreateimage",function(E){E.currentTarget.toggleClass(o,(E.changedNode.test("img")));});}if(B.get("btnVideo")){B.addSyncButton(B.ICON_VIDEO,"itsacreateyoutube",function(E){E.currentTarget.toggleClass(o,(E.changedNode.test("iframe")));});}if(false){B.addSyncButton(B.ICON_FILE,{customFunc:function(E){c.config.cmas2plus.uploader.show(null,c.bind(function(F){this.editor.execCommand("itsacreatehyperlink","http://files.brongegevens.nl/"+c.config.cmas2plusdomain+"/"+F.n);
},this));}},function(K){var N=this,L=".doc.docx.xls.xlsx.pdf.txt.zip.rar.",I=K.changedNode,H,M=false,J,F,E,P,O,G=N.editorY.one("body").getHTML();H=G.indexOf(I.getHTML());J=N._checkInbetweenSelector("a",G,H);if(J){while(I&&!I.test("a")){I=I.get("parentNode");}F=I.get("href");O=F.match("^mailto:","i")!="mailto:";if(O){E=F.lastIndexOf(".");if(E!==-1){P=F.substring(E)+".";M=(L.indexOf(P)!==-1);}}}K.currentTarget.toggleClass(o,M);});}if(B.get("grpUndoredo")){B.addButton(B.ICON_UNDO,"undo",true);B.addButton(B.ICON_REDO,"redo");}},_filter_rgb:function(v){if(v.toLowerCase().indexOf("rgb")!=-1){var y=new RegExp("(.*?)rgb\\s*?\\(\\s*?([0-9]+).*?,\\s*?([0-9]+).*?,\\s*?([0-9]+).*?\\)(.*?)","gi"),u=v.replace(y,"$1,$2,$3,$4,$5").split(","),x,w,t;if(u.length===5){x=parseInt(u[1],10).toString(16);w=parseInt(u[2],10).toString(16);t=parseInt(u[3],10).toString(16);x=x.length===1?"0"+x:x;w=w.length===1?"0"+w:w;t=t.length===1?"0"+t:t;v="#"+x+w+t;}}return v;},_defineExecCommandFontSize:function(){if(!c.Plugin.ExecCommand.COMMANDS.itsafontsize){c.mix(c.Plugin.ExecCommand.COMMANDS,{itsafontsize:function(w,x){var v=this,y=v.get("host").getInstance(),u=new y.EditorSelection(),t;if(!u.isCollapsed&&u.anchorNode&&(v._lastKey!==32)){if(c.UA.webkit){if(u.anchorNode.getStyle("lineHeight")){u.anchorNode.setStyle("lineHeight","");}}u.anchorNode.all("span").setStyle("fontSize","");t=u.wrapContent("span");t.item(0).setStyle("fontSize",x);}else{}}});}},_defineExecCommandHyperlink:function(){if(!c.Plugin.ExecCommand.COMMANDS.itsacreatehyperlink){c.mix(c.Plugin.ExecCommand.COMMANDS,{itsacreatehyperlink:function(w,v){var y=this,B=y.get("host").getInstance(),x,C,u,A,t,z,D;t=v||prompt("Enter url","http://");if(t){A=B.config.doc.createElement("div");t=t.replace(/"/g,"").replace(/'/g,"");t=B.config.doc.createTextNode(t);A.appendChild(t);t=A.innerHTML;y.get("host")._execCommand("createlink",t);u=new B.EditorSelection();x=u.getSelected();if(!u.isCollapsed&&x.size()){C=x.item(0).one("a");if(C){x.item(0).replace(C);}if(C&&c.UA.gecko){if(C.get("parentNode").test("span")){if(C.get("parentNode").one("br.yui-cursor")){C.get("parentNode").insert(C,"before");}}}}else{y.get("host").execCommand("inserthtml",'<a href="'+t+'" target="_blank">'+t+"</a>");}}return C;}});}},_defineExecCommandMaillink:function(){if(!c.Plugin.ExecCommand.COMMANDS.itsacreatemaillink){c.mix(c.Plugin.ExecCommand.COMMANDS,{itsacreatemaillink:function(w,v){var y=this,B=y.get("host").getInstance(),x,C,u,A,t,D,z,E;t=v||prompt("Enter email","");if(t){A=B.config.doc.createElement("div");t=t.replace(/"/g,"").replace(/'/g,"");D=t;t="mailto:"+t;t=B.config.doc.createTextNode(t);A.appendChild(t);t=A.innerHTML;y.get("host")._execCommand("createlink",t);u=new B.EditorSelection();x=u.getSelected();if(!u.isCollapsed&&x.size()){C=x.item(0).one("a");if(C){x.item(0).replace(C);}if(C&&c.UA.gecko){if(C.get("parentNode").test("span")){if(C.get("parentNode").one("br.yui-cursor")){C.get("parentNode").insert(C,"before");}}}}else{y.get("host").execCommand("inserthtml",'<a href="'+t+'">'+D+"</a>");}}return C;}});}},_defineExecCommandImage:function(){if(!c.Plugin.ExecCommand.COMMANDS.itsacreateimage){c.mix(c.Plugin.ExecCommand.COMMANDS,{itsacreateimage:function(w,v){var y=this,B=y.get("host").getInstance(),x,C,u,A,t,z,D;t=v||prompt("Enter link to image","http://");if(t){A=B.config.doc.createElement("div");t=t.replace(/"/g,"").replace(/'/g,"");t=B.config.doc.createTextNode(t);A.appendChild(t);t=A.innerHTML;y.get("host")._execCommand("createlink",t);u=new B.EditorSelection();x=u.getSelected();if(!u.isCollapsed&&x.size()){C=x.item(0).one("a");if(C){x.item(0).replace(C);}if(C&&c.UA.gecko){if(C.get("parentNode").test("span")){if(C.get("parentNode").one("br.yui-cursor")){C.get("parentNode").insert(C,"before");}}}}else{y.get("host").execCommand("inserthtml",'<img src="'+t+'" />');}}return C;}});}},_defineExecCommandYouTube:function(){if(!c.Plugin.ExecCommand.COMMANDS.itsacreateyoutube){c.mix(c.Plugin.ExecCommand.COMMANDS,{itsacreateyoutube:function(w,v){var y=this,B=y.get("host").getInstance(),x,C,u,A,t,z,D;t=v||prompt("Enter link to image","http://");if(t){A=B.config.doc.createElement("div");t=t.replace(/"/g,"").replace(/'/g,"");t=B.config.doc.createTextNode(t);A.appendChild(t);t=A.innerHTML;y.get("host")._execCommand("createlink",t);u=new B.EditorSelection();x=u.getSelected();if(!u.isCollapsed&&x.size()){C=x.item(0).one("a");if(C){x.item(0).replace(C);}if(C&&c.UA.gecko){if(C.get("parentNode").test("span")){if(C.get("parentNode").one("br.yui-cursor")){C.get("parentNode").insert(C,"before");}}}}else{D=t.indexOf("watch?v=");if(D!==-1){z=t.substring(t.videoitempos+8);y.get("host").execCommand("inserthtml",'<iframe width="420" height="315" src="http://www.youtube.com/embed/'+z+'" frameborder="0" allowfullscreen></iframe>');}}}return C;}});}}},{NS:"itsatoolbar",ATTRS:{paraSupport:{value:false,validator:function(t){return e.isBoolean(t);}},srcNode:{value:null,writeOnce:"initOnly",setter:function(t){return c.one(t);},validator:function(t){return c.one(t);}},btnSize:{value:2,validator:function(t){return(e.isNumber(t)&&(t>0)&&(t<4));}},headerLevels:{value:6,validator:function(t){return(e.isNumber(t)&&(t>0)&&(t<10));}},fontFamilies:{value:["Arial","Arial Black","Comic Sans MS","Courier New","Lucida Console","Tahoma","Times New Roman","Trebuchet MS","Verdana"],validator:function(t){return(e.isArray(t));}},btnFontfamily:{value:true,validator:function(t){return e.isBoolean(t);}},btnFontsize:{value:true,validator:function(t){return e.isBoolean(t);}},btnHeader:{value:false,validator:function(t){return e.isBoolean(t);}},btnBold:{value:true,validator:function(t){return e.isBoolean(t);}},btnItalic:{value:true,validator:function(t){return e.isBoolean(t);}},btnUnderline:{value:true,validator:function(t){return e.isBoolean(t);}},grpAlign:{value:true,validator:function(t){return e.isBoolean(t);}},btnJustify:{value:true,validator:function(t){return e.isBoolean(t);}},grpSubsuper:{value:true,validator:function(t){return e.isBoolean(t);
}},btnTextcolor:{value:true,validator:function(t){return e.isBoolean(t);}},btnMarkcolor:{value:true,validator:function(t){return e.isBoolean(t);}},grpIndent:{value:true,validator:function(t){return e.isBoolean(t);}},grpLists:{value:true,validator:function(t){return e.isBoolean(t);}},grpUndoredo:{value:true,validator:function(t){return e.isBoolean(t);}},btnEmail:{value:true,validator:function(t){return e.isBoolean(t);}},btnHyperlink:{value:true,validator:function(t){return e.isBoolean(t);}},btnImage:{value:false,validator:function(t){return e.isBoolean(t);}},btnVideo:{value:false,validator:function(t){return e.isBoolean(t);}},colorPallet:{value:["#111111","#2D2D2D","#434343","#5B5B5B","#737373","#8B8B8B","#A2A2A2","#B9B9B9","#000000","#D0D0D0","#E6E6E6","#FFFFFF","#BFBF00","#FFFF00","#FFFF40","#FFFF80","#FFFFBF","#525330","#898A49","#AEA945","#7F7F00","#C3BE71","#E0DCAA","#FCFAE1","#60BF00","#80FF00","#A0FF40","#C0FF80","#DFFFBF","#3B5738","#668F5A","#7F9757","#407F00","#8A9B55","#B7C296","#E6EBD5","#00BF00","#00FF80","#40FFA0","#80FFC0","#BFFFDF","#033D21","#438059","#7FA37C","#007F40","#8DAE94","#ACC6B5","#DDEBE2","#00BFBF","#00FFFF","#40FFFF","#80FFFF","#BFFFFF","#033D3D","#347D7E","#609A9F","#007F7F","#96BDC4","#B5D1D7","#E2F1F4","#0060BF","#0080FF","#40A0FF","#80C0FF","#BFDFFF","#1B2C48","#385376","#57708F","#00407F","#7792AC","#A8BED1","#DEEBF6","#0000BF","#0000FF","#4040FF","#8080FF","#BFBFFF","#212143","#373E68","#444F75","#00007F","#585E82","#8687A4","#D2D1E1","#6000BF","#8000FF","#A040FF","#C080FF","#DFBFFF","#302449","#54466F","#655A7F","#40007F","#726284","#9E8FA9","#DCD1DF","#BF00BF","#FF00FF","#FF40FF","#FF80FF","#FFBFFF","#4A234A","#794A72","#936386","#7F007F","#9D7292","#C0A0B6","#ECDAE5","#BF005F","#FF007F","#FF409F","#FF80BF","#FFBFDF","#451528","#823857","#A94A76","#7F003F","#BC6F95","#D8A5BB","#F7DDE9","#C00000","#FF0000","#FF4040","#FF8080","#FFC0C0","#441415","#82393C","#AA4D4E","#800000","#BC6E6E","#D8A3A4","#F8DDDD","#BF5F00","#FF7F00","#FF9F40","#FFBF80","#FFDFBF","#482C1B","#855A40","#B27C51","#7F3F00","#C49B71","#E1C4A8","#FDEEE0"],validator:function(t){return e.isArray(t);}}}});},"@VERSION@",{requires:["plugin","base-build","node-base","editor","event-delegate","event-custom","cssbutton","gallery-itsaselectlist"],skinnable:true});