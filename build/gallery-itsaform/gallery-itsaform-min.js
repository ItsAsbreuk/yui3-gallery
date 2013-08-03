YUI.add("gallery-itsaform",function(e,t){"use strict";var n=e.Lang,r="<table><tbody>",i="</tbody></table>";ITSAFORMELEMENT_CLASS="itsa-formelement",YClassNameManagerGetClassName=e.ClassNameManager.getClassName,ITSAFORMELEMENT_LABEL_CLASS=YClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS,"label"),ITSAFORMELEMENT_LABELMERGED_CLASS=YClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS,"label","merged"),ITSAFORMELEMENT_ELEMENT_CLASS=YClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS,"element"),ITSAFORMELEMENT_VALIDATION_CLASS=YClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS,"validation"),ITSAFORMELEMENT_HIDDEN_CLASS=YClassNameManagerGetClassName(ITSAFORMELEMENT_CLASS,"hidden"),EXPRESSION_LABEL="{label}",EXPRESSION_LABEL_CLASSNAME="{classnamelabel}",EXPRESSION_ELEMENT="{element}",EXPRESSION_ELEMENT_CLASSNAME="{classnameelement}",EXPRESSION_VALIDATION="{validationmessage}",ITSAFORM_TABLETEMPLATE='<td class="'+ITSAFORMELEMENT_LABEL_CLASS+" "+EXPRESSION_LABEL_CLASSNAME+'">'+EXPRESSION_LABEL+"</td>"+'<td class="'+ITSAFORMELEMENT_ELEMENT_CLASS+'">'+EXPRESSION_ELEMENT+'<div class="'+ITSAFORMELEMENT_VALIDATION_CLASS+ITSAFORMELEMENT_HIDDEN_CLASS+'">'+EXPRESSION_VALIDATION+"</div></td>",ITSAFORM_INLINETEMPLATE='<span class="'+ITSAFORMELEMENT_LABEL_CLASS+" "+EXPRESSION_LABEL_CLASSNAME+'">'+EXPRESSION_LABEL+"</span>"+'<span class="'+ITSAFORMELEMENT_ELEMENT_CLASS+'">'+EXPRESSION_ELEMENT+"</span>"+'<div class="'+ITSAFORMELEMENT_VALIDATION_CLASS+ITSAFORMELEMENT_HIDDEN_CLASS+'">'+EXPRESSION_VALIDATION+"</div>",ITSAFORM_TABLETEMPLATE_MERGED='<td colspan="2"><span class="'+ITSAFORMELEMENT_LABEL_CLASS+ITSAFORMELEMENT_LABELMERGED_CLASS+" "+EXPRESSION_LABEL_CLASSNAME+'">'+EXPRESSION_LABEL+"</span><br />"+'<span class="'+ITSAFORMELEMENT_ELEMENT_CLASS+'">'+EXPRESSION_ELEMENT+"</span>"+'<div class="'+ITSAFORMELEMENT_VALIDATION_CLASS+ITSAFORMELEMENT_HIDDEN_CLASS+'">'+EXPRESSION_VALIDATION+"</div></td>",ITSAFORM_INLINETEMPLATE_MERGED='<span class="'+ITSAFORMELEMENT_LABEL_CLASS+ITSAFORMELEMENT_LABELMERGED_CLASS+" "+EXPRESSION_LABEL_CLASSNAME+'">'+EXPRESSION_LABEL+"</span><br />"+'<span class="'+ITSAFORMELEMENT_ELEMENT_CLASS+'">'+EXPRESSION_ELEMENT+"</span>"+'<div class="'+ITSAFORMELEMENT_VALIDATION_CLASS+ITSAFORMELEMENT_HIDDEN_CLASS+'">'+EXPRESSION_VALIDATION+"</div>",ITSAFORM_TABLETEMPLATE_MERGED_NOLABEL='<td colspan="2"><span class="'+ITSAFORMELEMENT_ELEMENT_CLASS+'">'+EXPRESSION_ELEMENT+"</span>"+'<div class="'+ITSAFORMELEMENT_VALIDATION_CLASS+ITSAFORMELEMENT_HIDDEN_CLASS+'">'+EXPRESSION_VALIDATION+"</div></td>",ITSAFORM_INLINETEMPLATE_MERGED_NOLABEL='<span class="'+ITSAFORMELEMENT_ELEMENT_CLASS+'">'+EXPRESSION_ELEMENT+"</span>"+'<div class="'+ITSAFORMELEMENT_VALIDATION_CLASS+ITSAFORMELEMENT_HIDDEN_CLASS+'">'+EXPRESSION_VALIDATION+"</div>",e.ITSAFORM=e.Base.create("itsaform",e.Widget,[],{CONTENT_TEMPLATE:"<form></form>",elementObjects:[],initializer:function(){this.id=e.guid()},renderUI:function(){var t=this,n,s=t.get("tableform"),o=t.get("contentBox");t._clearMemory(),o.setHTML(s?r:""),e.Array.each(t.get("elements"),function(r){n=new e.ITSAFORMELEMENT(r),o.append(n.getNode(s)),t.elementObjects.push(n)}),s&&o.append(i)},bindUI:function(){var e=this,t=e.get("contentBox");t.delegate("click",e._sendForm,function(){var e=this;return e.get("tagName")==="INPUT"&&e.get("type")==="submit"},e)},_syncFormAttributes:function(){var t=this,n=t.get("contentBox");n.setAttrs({action:t.get("action"),method:t.get("method")}),t.get("encodingType")===e.ITSAFORM.MULTIPART_ENCODED&&n.setAttribute("enctype","multipart/form-data")},_sendForm:function(t){var n=this,r;t.preventDefault(),r={method:n.get("method"),on:{success:n._sendSuccess,failure:n._sendFailure},context:n,form:{id:n.get("contentBox"),useDisabled:!1,upload:!1}},n._sendRequest=e.io(n.get("action"),r)},_sendSuccess:function(){var t=this,n=t.get("messageSuccess");t.resetForm(),n&&e.Global.ItsaDialog.showMessage(n)},resetForm:function(){var t=e.Node.getDOMNode(this.get("contentBox"));e.Lang.isFunction(t.reset)&&t.reset()},_sendFailure:function(){var t=this.get("messageFailure");t&&e.Global.ItsaDialog.showErrorMessage(t)},_clearMemory:function(){var t=this;e.Array.each(t.elementObjects,function(e){e.destroy(!1)})},destructor:function(){var e=this;e._clearMemory(),e._sendRequest&&e._sendRequest.isInProgress()&&e._sendRequest.abort()}},{ATTRS:{name:{value:"undefined-name",setter:function(e){var t=this.get("elementNode");return t&&t.set("name",e),e},validator:function(e){return n.isString(e)}},action:{value:"/",validator:function(e){return n.isString(e)}},method:{value:"post"},tableform:{value:!1},elements:{value:[]},messageSuccess:{value:null,validator:function(e){return n.isString(e)}},messageFailure:{value:null,validator:function(e){return n.isString(e)}},encodingType:{value:1,validator:e.Lang.isNumber}},URL_ENCODED:1,MULTIPART_ENCODED:2})},"@VERSION@",{requires:["base-build","widget","node-base","io","gallery-itsadialogbox"],skinnable:!0});