YUI.add("gallery-itsadialogbox",function(e,t){"use strict";var n=e.Lang,r="<div class='itsadialogbox-icon {iconclass}'></div>",i="<div{bdclass}>{bdtext}</div>",s='<td class="itsaform-tablelabel{classnamelabel}"{paddingstyle}>{label}</td><td class="itsaform-tableelement"{paddingstyle}>{element}<div class="itsa-formelement-validationmessage itsa-formelement-hidden">{validationMessage}</div></td>',o='<span class="itsaform-spanlabel{classnamelabel}"{marginstyle}>{label}</span>{element}<div class="itsa-formelement-validationmessage itsa-formelement-hidden">{validationMessage}</div>';e.ITSADIALOGBOX=e.Base.create("itsadialogbox",e.Panel,[],{ICON_BUBBLE:"icon-bubble",ICON_INFO:"icon-info",ICON_QUESTION:"icon-question",ICON_WARN:"icon-warn",ICON_ERROR:"icon-error",ICON_SUCCESS:"icon-success",ACTION_HIDE:"_actionHide",ACTION_STAYALIVE:"_actionStayAlive",ACTION_RESET:"_actionReset",ACTION_CLEAR:"_actionClear",panelOptions:[],_activePanelOption:null,_validationButtons:null,_descendantChange:0,initializer:function(){var t=this;t.get("contentBox").plug(e.Plugin.NodeFocusManager,{descendants:"button, input, textarea",circular:!0,focusClass:"focus"}),t._initiatePanels()},definePanel:function(e){var t=this;return n.isObject(e)?(t.panelOptions.push(e),t.panelOptions.length-1):-1},removePanel:function(e){var t=this;e>=0&&e<t.panelOptions.length&&t.panelOptions.splice(e,1)},showPanel:function(e,t,s,o,u,a,f,l,c){var h=this,p,d=h.get("contentBox");e>=0&&e<h.panelOptions.length&&(h._activePanelOption=h.panelOptions[e],p=l||h._activePanelOption.iconClass,h.get("boundingBox").toggleClass("withicon",n.isString(p)),n.isString(s)||(a=u,u=o,o=s,s=t,t="&nbsp;"),h.set("headerContent",t||"&nbsp;"),h.set("bodyContent",(p?n.sub(r,{iconclass:p}):"")+n.sub(i,{bdclass:p?' class="itsadialogbox-messageindent"':"",bdtext:s})),h.set("buttons",f||h._activePanelOption.buttons||{}),h._activePanelOption.callback=o,h._activePanelOption.context=u,h._activePanelOption.args=a,h._activePanelOption.eventArgs=c,d.focusManager.refresh(),h.centered(),h.activatePanel(),d.focusManager.focus(h._getFirstFocusNode()),h.show())},getRetryConfirmation:function(e,t,n,r,i,s,o){this.showPanel(0,e,t,n,r,i,s,o)},getConfirmation:function(e,t,n,r,i,s,o){this.showPanel(1,e,t,n,r,i,s,o)},getInput:function(t,n,r,i,s,o,u,a){var f=this;f.inputElement=new e.ITSAFORMELEMENT({name:"value",type:"input",value:r,classNameValue:"yui3-itsadialogbox-stringinput itsa-formelement-lastelement",marginTop:10,initialFocus:!0,selectOnFocus:!0}),f.showPanel(2,t,n+"<br>"+f.inputElement.render(),i,s,o,u,a)},getLogin:function(t,n,r,i,s,o,u,a){var f=this,l;r={usernameLabel:"username",passwordLabel:"password",defaultUsername:"enter username"},f.inputElementUsername=new e.ITSAFORMELEMENT({label:r.usernameLabel,name:"username",type:"input",value:r.defaultUsername,classNameValue:"yui3-itsadialogbox-stringinput itsa-formelement-firstelement",marginTop:24,initialFocus:!0,selectOnFocus:!0}),f.inputElementPassword=new e.ITSAFORMELEMENT({label:r.passwordLabel,name:"password",type:"password",value:"",classNameValue:"yui3-itsadialogbox-stringinput itsa-formelement-lastelement",marginTop:7,initialFocus:!1,selectOnFocus:!0}),l="<table><tbody>",l+="<tr>"+f.inputElementUsername.render(!0)+"</tr>",l+="<tr>"+f.inputElementPassword.render(!0)+"</tr>",l+="</tbody></table>",f.showPanel(7,t,n+"<br>"+l,i,s,o,u,a)},getNumber:function(t,r,i,s,o,u,a,f,l,c){var h=this,p=n.isNumber(s),d=n.isNumber(o),v="",m={};p&&d?v="Input must be between "+s+" and "+o:(p&&(v="Input must not be below "+s),d&&(v="Input must not be above "+o)),h.inputElement=new e.ITSAFORMELEMENT({name:"value",type:"input",value:i?i.toString():"",label:r,keyValidation:function(t){var r=t.keyCode,i=t.target,s=!0,o=i.get("selectionStart"),u=i.get("selectionEnd"),a=i.get("value"),f=String.fromCharCode(r>=96&&r<=105?r-48:r),l,c=t.minValue,h=t.maxValue,p=[48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105],d=[8,9,13,27,37,38,39,40,46,48,49,50,51,52,53,54,55,56,57,173,189,45,96,97,98,99,100,101,102,103,104,105,109],v=[173,189,45,109];return e.Array.indexOf(d,r)===-1?(t.halt(!0),!1):t.shiftKey&&r!==9&&r!==37&&r!==38&&r!==39&&r!==40||t.ctrlKey||t.altKey||t.metaKey?(t.halt(!0),!1):n.isNumber(c)&&c>0&&o===0&&(r===48||r===96)?(t.halt(!0),!1):o!==1||r!==48&&r!==96||a!=="0"&&a!=="-"?n.isNumber(c)&&c>=0&&o===0&&e.Array.indexOf(v,r)!==-1?(t.halt(!0),!1):o>0&&e.Array.indexOf(v,r)!==-1?(t.halt(!0),!1):((n.isNumber(c)||n.isNumber(h))&&(e.Array.indexOf(p,r)!==-1||r===8||r===46)&&(r===8?l=parseInt(a.substring(0,o===u?o-1:o)+a.substring(u),10):r===46?l=parseInt(a.substring(0,o)+a.substring(o===u?u+1:u),10):l=parseInt(a.substring(0,o)+f+a.substring(u),10),n.isNumber(l)?n.isNumber(c)&&l<c?(t.showValidation&&t.showValidation(),t.deactivatePanel&&t.deactivatePanel(),s=!1):n.isNumber(h)&&l>h&&(t.showValidation&&t.showValidation(),t.deactivatePanel&&t.deactivatePanel(),s=!1):(t.showValidation&&t.showValidation(),t.deactivatePanel&&t.deactivatePanel(),s=!1)),o===1&&a==="0"&&e.Array.indexOf(p,r)!==-1&&i.set("value",""),r!==9&&r!==13&&(s&&t.hideValidation&&t.hideValidation(),s&&t.activatePanel&&t.activatePanel()),!0):(t.halt(!0),!1)},autoCorrection:function(e){var t=this,r=e&&e.minValue,i=e&&e.maxValue,s=t.get("elementNode").get("value"),o=s===""||s==="-"?0:s,u=parseInt(o,10);return t.set("value",u.toString()),n.isNumber(r)&&u<r||n.isNumber(i)&&u>i?(e.showValidation&&e.showValidation(),e.activatePanel&&e.activatePanel(),!1):!0},validationMessage:v,classNameValue:"yui3-itsadialogbox-numberinput itsa-formelement-lastelement",initialFocus:!0,selectOnFocus:!0}),n.isNumber(s)&&(m.minValue=s),n.isNumber(o)&&(m.maxValue=o),v&&(m.showValidation=e.bind(h.inputElement.showValidation,h.inputElement),m.hideValidation=e.bind(h.inputElement.hideValidation,h.inputElement));if(m.minValue||m.maxValue)m.activatePanel=e.bind(h.activatePanel,h),m.deactivatePanel=e.bind(h.deactivatePanel,h);h.showPanel(3,t,h.inputElement.render(),u,a,f,l,c,m)},showErrorMessage:function(e,t,n,r
,i){this.showPanel(4,e,t,n,r,i)},showMessage:function(e,t,n,r,i,s,o){this.showPanel(5,e,t,n,r,i,s,o)},showWarning:function(e,t,n,r,i){this.showPanel(6,e,t,n,r,i)},_actionHide:function(t){var n=this,r=n.get("contentBox").one(".yui3-widget-bd"),i=n._serializeForm(r),s=t.target;t.preventDefault(),s.hasClass("yui3-button-disabled")||(i.buttonName=t.target.getData("name"),n.hide(),e.Lang.isFunction(n._activePanelOption.callback)&&e.rbind(n._activePanelOption.callback,n._activePanelOption.context,i,n._activePanelOption.args)())},_actionStayAlive:function(t){var n=this,r=n.get("contentBox").one(".yui3-widget-bd"),i=n._serializeForm(r),s=t.target;t.preventDefault(),s.hasClass("yui3-button-disabled")||(i.buttonName=t.target.getData("name"),e.Lang.isFunction(n._activePanelOption.callback)&&e.rbind(n._activePanelOption.callback,n._activePanelOption.context,i,n._activePanelOption.args)())},_actionReset:function(e){var t=this,n=t.get("contentBox").one(".yui3-widget-bd"),r=t._serializeForm(n);e.preventDefault(),r.buttonName=e.target.getData("name")},_actionClear:function(e){var t=this,n=t.get("contentBox").one(".yui3-widget-bd"),r=t._serializeForm(n);e.preventDefault(),r.buttonName=e.target.getData("name")},focus:function(){var e=this,t=e.get("contentBox"),n=t.focusManager;e.constructor.superclass.focus.call(e),n&&n.focus()},bindUI:function(){var e=this,t=e.get("contentBox"),r=t.focusManager;e._panelListener=t.on("keydown",function(e){e.keyCode===9&&(e.preventDefault(),this.shiftFocus(e.shiftKey))},e),e._buttonsListener=e.after("buttonsChange",e._setValidationButtons,e),e._descendantListener=r.on("activeDescendantChange",function(e){var i=this,s=e.prevVal,o=e.newVal,u,a,f=r.get("descendants"),l;i._descendantChange++,n.isNumber(s)&&s>=0&&(s=f.item(e.prevVal)),n.isNumber(o)&&(o=f.item(e.newVal)),l=o.compareTo(s),u=t.one(".yui3-button-primary"),a=o.get("tagName")==="BUTTON",u&&u.toggleClass("nofocus",o!==u&&a),f.removeClass("mousepressfocus"),a&&o.addClass("mousepressfocus"),(!l||i._descendantChange<4)&&o.hasClass("itsa-formelement-selectall")&&o.select(),l||i._validate(a,o)},e,t),e._headerMousedownListener=t.delegate("mousedown",function(e){e.target.addClass("cursormove")},".yui3-widget-hd"),e._headerMouseupListener=t.delegate("mouseup",function(e){e.target.removeClass("cursormove")},".yui3-widget-hd"),e._inputListener=t.delegate("keydown",e._checkInput,"input",e),e._checkBoxListener=t.delegate("change",e._shiftFocusFromCheckbox,function(){var e=this;return e.get("tagName")==="INPUT"&&e.get("type")==="checkbox"},e),t.on("click",function(){this.focus(this.get("activeDescendant"))},r)},shiftFocus:function(e,t){var r=this,i=r.get("contentBox").focusManager,s=i.get("descendants"),o=t?s.indexOf(t):i.get("activeDescendant"),u=s.size();t||i.get("focused")?n.isBoolean(e)&&e?(o--,i.focus(o<0?u-1:o)):(o++,i.focus(o>=u?0:o)):i.focus(r._getFirstFocusNode())},_shiftFocusFromCheckbox:function(e){var t=this,n=e.target;n.hasClass("itsa-formelement-lastelement")?t.get("contentBox").focusManager.focus(t._getDefaultButtonNode()):t.shiftFocus(!1,n)},_checkInput:function(t){var n=this,r=t.target,i,s,o=n._activePanelOption.eventArgs;if(r.hasClass("itsa-formelement-keyvalidation")&&n.inputElement){e.mix(t,o);if(!n.inputElement.get("keyValidation")(t))return}t.keyCode===13&&(t.preventDefault(),r.hasClass("itsa-formelement-lastelement")?(i=n.inputElement&&n.inputElement.get("autoCorrection"),s=!0,i&&(s=e.bind(i,n.inputElement,o)(),s||(o.showValidation(),n.deactivatePanel(),n.get("contentBox").focusManager.focus(n._getFirstFocusNode()))),s?(r.setData("name",n._getDefaultButtonNode().getData("name")),n._actionHide(t)):r.select()):n.shiftFocus())},_validate:function(t,n){var r=this,i=r._activePanelOption.eventArgs,s=t&&n.hasClass("itsadialogbox-button-validated"),o=r.inputElement&&r.inputElement.get("autoCorrection"),u=!0;o&&s&&(u=e.bind(o,r.inputElement,i)(),u||(i&&i.showValidation&&i.showValidation(),r.deactivatePanel())),u&&(i&&i.hideValidation&&i.hideValidation(),r.activatePanel())},activatePanel:function(){this._validationButtons.toggleClass("yui3-button-disabled",!1)},deactivatePanel:function(){this._validationButtons.toggleClass("yui3-button-disabled",!0)},destructor:function(){var e=this;e.keyDownHandle&&e.keyDownHandle.detach(),e._panelListener&&e._panelListener.detach(),e._descendantListener&&e._descendantListener.detach(),e._headerMousedownListener&&e._headerMousedownListener.detach(),e._headerMouseupListener&&e._headerMouseupListener.detach(),e._inputListener&&e._inputListener.detach(),e._checkBoxListener&&e._checkBoxListener.detach(),e._buttonsListener&&e._buttonsListener.detach(),e.panelOptions.length=0},_setValidationButtons:function(){var t=this,n=t._activePanelOption.buttons,r=t.get("contentBox");r.all(".itsadialogbox-button-validated").removeClass("itsadialogbox-button-validated"),n&&(n.header&&e.Array.each(n.header,t._markButtonValidated,t),n.body&&e.Array.each(n.body,t._markButtonValidated,t),n.footer&&e.Array.each(n.footer,t._markButtonValidated,t)),t._validationButtons=r.all(".itsadialogbox-button-validated")},_markButtonValidated:function(e){var t=this,r=e.name,i,s;s=t.getButton(r),s&&(i=e.validation,n.isBoolean(i)&&i&&s.addClass("itsadialogbox-button-validated"))},_initiatePanels:function(){var e=this;e.definePanel({iconClass:e.ICON_WARN,buttons:{footer:[{name:"abort",label:"Abort",action:e.ACTION_HIDE},{name:"ignore",label:"Ignore",action:e.ACTION_HIDE},{name:"retry",label:"Retry",action:e.ACTION_HIDE,isDefault:!0}]}}),e.definePanel({iconClass:e.ICON_INFO,buttons:{footer:[{name:"no",label:"No",action:e.ACTION_HIDE,isDefault:!0},{name:"yes",label:"Yes",action:e.ACTION_HIDE}]}}),e.definePanel({iconClass:e.ICON_QUESTION,form:[{name:"count",label:"{message}",value:"{count}"}],buttons:{footer:[{name:"cancel",label:"Cancel",action:e.ACTION_HIDE},{name:"ok",label:"Ok",action:e.ACTION_HIDE,validation:!0,isDefault:!0}]}}),e.definePanel({iconClass:e.ICON_QUESTION,form:[{name:"count",label:"{message}",value:"{count}"}
],buttons:{footer:[{name:"cancel",label:"Cancel",action:e.ACTION_HIDE},{name:"ok",label:"Ok",action:e.ACTION_HIDE,validation:!0,isDefault:!0}]}}),e.definePanel({iconClass:e.ICON_ERROR,buttons:{footer:[{name:"ok",label:"Ok",action:e.ACTION_HIDE,isDefault:!0}]}}),e.definePanel({buttons:{footer:[{name:"ok",label:"Ok",action:e.ACTION_HIDE,isDefault:!0}]}}),e.definePanel({iconClass:e.ICON_WARN,buttons:{footer:[{name:"ok",label:"Ok",action:e.ACTION_HIDE,isDefault:!0}]}}),e.definePanel({iconClass:e.ICON_QUESTION,form:[{name:"username",label:"{username}",value:"{username}"},{name:"password",label:"{password}",value:"{password}"}],buttons:{footer:[{name:"ok",label:"Ok",action:e.ACTION_HIDE,isDefault:!0}]}})},_getFirstFocusNode:function(){var e=this,t=e.get("contentBox"),n;return n=t.one(".itsa-formelement-firstfocus")||t.one(".itsa-firstformelement")||e._getDefaultButtonNode(),n},_getDefaultButtonNode:function(){var e=this.get("contentBox").one(".yui3-button-primary");return e},_serializeForm:function(e){var t=e.all(".itsa-formelement"),n,r,i={};return t.each(function(e){n=e.get("value"),r=parseInt(n,10),i[e.get("name")]=n===r.toString()?r:n}),i}},{ATTRS:{}}),e.Global.ItsaDialog||(e.Global.ItsaDialog=new e.ITSADIALOGBOX({visible:!1,centered:!0,render:!0,zIndex:21e3,modal:!0,bodyContent:"",focusOn:[{eventName:"clickoutside"}]}),e.Global.ItsaDialog.plug(e.Plugin.Drag),e.Global.ItsaDialog.dd.addHandle(".yui3-widget-hd")),e.ItsaDialogBox=e.Global.ItsaDialog,e.ITSAFORMELEMENT=e.Base.create("itsaformelement",e.Base,[],{id:null,initializer:function(){this.id=e.guid()},render:function(e){var t=this,r=t.get("marginTop"),i=r&&!e?' style="margin-top:'+r+'px"':"",u=r?' style="padding-top:'+r+'px"':"",a=t.get("type"),f=t.get("classNameLabel"),l=t.get("classNameValue"),c=t.get("initialFocus"),h=t.get("selectOnFocus"),p=t.get("keyValidation"),d=t.get("validation"),v=t.get("autoCorrection"),m=c?" itsa-formelement-firstfocus":"",g=h?" itsa-formelement-selectall":"",y=p?" itsa-formelement-keyvalidation":"",b=d?" itsa-formelement-validation":"",w=v?" itsa-formelement-autocorrect":"",E=' class="itsa-formelement '+l+m+g+y+b+w+'"',S="";return a==="input"&&(S='<input id="'+t.id+'" type="text" name="'+t.get("name")+'" value="'+t.get("value")+'"'+E+i+" />"),a==="password"&&(S='<input id="'+t.id+'" type="password" name="'+t.get("name")+'" value="'+t.get("value")+'"'+E+i+" />"),n.sub(e?s:o,{marginstyle:i,paddingstyle:u,label:t.get("label"),element:S,classnamelabel:f,validationMessage:t.get("validationMessage"),classnamevalue:l})},showValidation:function(){var e=this.get("elementNode");e&&e.get("parentNode").one(".itsa-formelement-validationmessage").toggleClass("itsa-formelement-hidden",!1)},hideValidation:function(){var e=this.get("elementNode");e&&e.get("parentNode").one(".itsa-formelement-validationmessage").toggleClass("itsa-formelement-hidden",!0)},destructor:function(){var e=this;e.blurevent&&e.blurevent.detach(),e.keyevent&&e.keyevent.detach()}},{ATTRS:{name:{value:"undefined-name",setter:function(e){var t=this.get("elementNode");return t&&t.set("name",e),e},validator:function(e){return n.isString(e)}},type:{value:"",setter:function(e){return n.isString(e)&&(e=e.toLowerCase()),e},validator:function(e){return n.isString(e)&&(e==="input"||e==="password"||e==="textarea"||e==="checkbox"||e==="radiogroup"||e==="selectbox"||e==="button"||e==="hidden")}},value:{value:null,setter:function(e){var t=this.get("elementNode");return t&&t.set("value",e),e}},label:{value:"",validator:function(e){return n.isString(e)}},keyValidation:{value:null,validator:function(e){return n.isFunction(e)}},validation:{value:null,validator:function(e){return n.isFunction(e)}},validationMessage:{value:"",validator:function(e){return n.isString(e)}},autoCorrection:{value:null,validator:function(e){return n.isFunction(e)}},classNameLabel:{value:"",validator:function(e){return n.isString(e)}},classNameValue:{value:"",validator:function(e){return n.isString(e)}},marginTop:{value:0,validator:function(e){return n.isNumber(e)}},initialFocus:{value:!1,validator:function(e){return n.isBoolean(e)}},selectOnFocus:{value:!1,validator:function(e){return n.isBoolean(e)}},elementNode:{value:null,readOnly:!0,getter:function(){return e.one("#"+this.id)}}}})},"@VERSION@",{requires:["yui-base","base-build","panel","node-base","node-event-delegate","dd-plugin","node-focusmanager","event-valuechange","event-custom-base","node-core","oop"]});
