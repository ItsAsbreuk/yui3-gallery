YUI.add("gallery-itsachangemodeltemplate",function(e,t){"use strict";var n=e.Lang,r=e.Array,i="yui3-itsaformelement",s=i+"-changed",o="Attribute editTemplate is undefined",u=function(e){var t=/<%(.+)%>/;return t.test(e)};e.namespace("Plugin").ITSAChangeModelTemplate=e.Base.create("itsachangemodeltemplate",e.Plugin.Base,[],{host:null,_secondTempl:null,_secondTemplIsMicro:null,_editTempl:null,_editTemplIsMicro:null,_initialEditAttrs:{},_secondModels:{},_editModels:{},_prevMode:{},_eventhandlers:[],_currentModelHasChanged:!1,_prevComparator:{},initializer:function(){var e=this,t;e.host=t=e.get("host"),e._bindUI()},setModelToOriginalTemplate:function(e){var t=this,n=t.host,r=n.getModelAttr(e,"clientId"),i=n.get("modelList"),s=i&&i.comparator,o;o=t._getMode(e),o!==1&&(t._prevMode[r]=t._getMode(e),delete t._secondModels[r],delete t._initialEditAttrs[r],t._editModels[r]&&t._unplugITSAEditModel(e,r),t._currentModelHasChanged&&s&&t._prevComparator[r]!==t._getComparator(i,s,e)?(i.sort(),n._listLazy&&i.free(),n._repositionModel(e)):t._renderOriginalTemplate(e),delete t._prevComparator[r],t._currentModelHasChanged=!1)},setModelToSecondTemplate:function(t){var n=this,r=n.host,i=r.getModelAttr(t,"clientId"),s=r.get("modelList"),o=s&&e.bind(s.comparator,s),u;u=n._getMode(t),u!==2&&(delete n._initialEditAttrs[i],n._prevMode[i]=n._getMode(t),n._secondModels[i]=!0,n._editModels[i]&&n._unplugITSAEditModel(t,i),n._currentModelHasChanged&&o&&n._prevComparator[i]!==n._getComparator(s,o,t)?(s.sort(),r._listLazy&&s.free(),r._renderView()):n._renderSecondTemplate(t),delete n._prevComparator[i],n._currentModelHasChanged=!1)},setModelToEditTemplate:function(t){var r=this,i=r.host,s=i.get("modelList"),o=s&&e.bind(s.comparator,s),u=i.getModelAttr(t,"clientId"),a;r.get("modelsEditable")&&(a=r._getMode(t),a!==3&&(r._currentModelHasChanged=!1,r._prevComparator[u]=o&&r._getComparator(s,o,t),r._prevMode[u]=a,r._editModels[u]=!0,delete r._secondModels[u],r._renderEditTemplate(t,function(){var e=n.isNumber(t)?i.getNodeFromIndex(t,0):i.getNodeFromModel(t,0);e&&e.itsatabkeymanager&&e.itsatabkeymanager.focusInitialItem()})))},restoreTemplate:function(e){var t=this,n=t.host.getModelAttr(e,"clientId"),r=t._prevMode[n]||1;switch(r){case 1:t.setModelToOriginalTemplate(e);break;case 2:t.setModelToSecondTemplate(e);break;case 3:t.setModelToEditTemplate(e)}},destructor:function(){var e=this;e._clearEventhandlers(),e._initialEditAttrs={},e._secondModels={},e._editModels={},e._prevMode={},e._prevComparator={}},_bindUI:function(){var t=this,r=t.host,i=t._eventhandlers;i.push(r.after("itsaeditmodel:focusnext",function(e){var t=e.inputNode,n=t.get("parentNode"),r;while(n&&!n.hasClass("itsa-model"))n=n.get("parentNode");n&&(r=n.itsatabkeymanager,r&&n.hasClass("itsa-model-focus")&&r.next())})),i.push(r.after("model:resetclick",function(e){var i=e.target,s={fromEditModel:!0},o=t._initialEditAttrs[i.get("clientId")];o&&(i.setAttrs(o,s),t._getMode(i)===3&&t._renderEditTemplate(i,function(){var e=n.isNumber(i)?r.getNodeFromIndex(i,0):r.getNodeFromModel(i,0);e&&e.itsatabkeymanager&&e.itsatabkeymanager.focusInitialItem()}),r.modelIsSelected(i)&&r._fireSelectedModels())})),i.push(r.after(["itsaeditmodel:editmodelConfigAttrsChange","itsaeditmodel:templateChange"],function(){t.get("modelsEditable")&&r._renderView(null,null)})),i.push(t.after("modelsEditableChange",e.bind(r._renderView,r,null,null))),i.push(t.after("editmodelConfigAttrsChange",function(){t._editTempl=null})),i.push(r.after("model:change",function(e){var n=e.target,i;t._getMode(n)===3&&(t._currentModelHasChanged=!0,i=r.getNodeFromModel(n,0),i.all("."+s).removeClass(s))})),i.push(r.on("model:destroy",function(e){var n=e.target;delete t._editModels[n.get("clientId")],r.modelIsSelected(n)&&r.unselectModels(n,!1,!0)}))},_clearEventhandlers:function(){r.each(this._eventhandlers,function(e){e.detach()})},_getComparator:function(e,t,n){var r=this,i=r.host,s,o;return i._listLazy&&n.get&&typeof n.get=="function"?(s=e.indexOf(n),o=e.item(s)):o=n,t(o)},_getMode:function(e){var t=this,n=t.get("modelsEditable"),r=t.host.getModelAttr(e,"clientId"),i=1;return t._secondModels[r]&&(i=2),n&&t._editModels[r]&&(i=3),i},_getModelEngine:function(e,t,r){var i=this,s=i.host,o=i._getMode(e),u,a;switch(o){case 1:u=s.getModelToJSON(e),a=r?r(u):n.sub(t,u);break;case 2:a=i._altTempl(e);break;case 3:a=i._editTempl(e)}return a},_renderEditTemplate:function(t,r){var i=this,s=i.host,a,f,l,c;a=n.isNumber(t)?s.getNodeFromIndex(t,0):s.getNodeFromModel(t,0),a&&((u(i.get("template"))||i._secondTempl&&i._secondTemplIsMicro)&&a.cleanup(),e.use("gallery-itsatabkeymanager",function(e){a.itsatabkeymanager||a.plug(e.Plugin.ITSATabKeyManager),f=t.get&&typeof t.get=="function",!f&&s._listLazy&&(l=s.get("modelList").revive(t)),c=l||t,i._initialEditAttrs[c.get("clientId")]=c.getAttrs(),c.itsaeditmodel?(i._editTempl||i._setEditTemplate(i.get("editTemplate")||c.itsaeditmodel.get("template")||o),a.setHTML(i._editTempl(c)),typeof r=="function"&&r()):e.use("gallery-itsaeditmodel",function(e){c.plug(e.Plugin.ITSAEditModel,i.get("configForEditModel")),i._editTempl||i._setEditTemplate(i.get("editTemplate")||c.itsaeditmodel.get("template")||o),a.setHTML(i._editTempl(c)),typeof r=="function"&&r()})}))},_renderSecondTemplate:function(e){var t=this,r=t.host,i=t._secondTempl||r._templFns.template,s;s=n.isNumber(e)?r.getNodeFromIndex(e,0):r.getNodeFromModel(e,0),s&&i&&((u(t.get("template"))||e.itsaeditmodel)&&s.cleanup(),s.setHTML(i(e)))},_renderOriginalTemplate:function(e){var t=this,r=t.host,i;i=n.isNumber(e)?r.getNodeFromIndex(e,0):r.getNodeFromModel(e,0),i&&((t._secondTempl&&t._secondTemplIsMicro||e.itsaeditmodel)&&i.cleanup(),i.setHTML(r._templFns.template(e)))},_setEditTemplate:function(t){var r=this,i=r.host,s,o;!t||t===""?r._editTempl=i._templFns.template:(o=r._editTemplIsMicro=u(t),o?(s=e.TemplateMicro.compile(t),r._editTempl=function(t){var n=t.get&&t.get==="function";return!n&&i._listLazy&&(t=i.get("modelList").revive(t),t.itsaeditmodel||
t.plug(e.Plugin.ITSAEditModel,r.get("configForEditModel"))),s(t.itsaeditmodel.toJSON(r.get("editmodelConfigAttrs")||t.itsaeditmodel.get("editmodelConfigAttrs")))}):r._editTempl=function(s){var o=s.get&&s.get==="function";return!o&&i._listLazy&&(s=i.get("modelList").revive(s),!o&&i._listLazy&&s.plug(e.Plugin.ITSAEditModel,r.get("configForEditModel"))),n.sub(t,s.itsaeditmodel.toJSON(r.get("editmodelConfigAttrs")||s.itsaeditmodel.get("editmodelConfigAttrs")))})},_setSecondTemplate:function(t){var r=this,i=r.host,s,o;!t||t===""?r._secondTempl=null:(o=r._secondTemplIsMicro=u(t),o?(s=e.TemplateMicro.compile(t),r._secondTempl=function(e){return s(i.getModelToJSON(e))}):r._secondTempl=function(e){return n.sub(t,i.getModelToJSON(e))})},_unplugITSAEditModel:function(e,t){var r=this,i=r.host,s,o;s=e.get&&typeof e.get=="function",!s&&i._listLazy&&(e=i.get("modelList").revive(e)),e.unplug&&e.unplug("itsaeditmodel"),delete r._editModels[t],o=n.isNumber(e)?i.getNodeFromIndex(e,0):i.getNodeFromModel(e,0),o&&o.unplug("itsatabkeymanager")}},{NS:"itsacmtemplate",ATTRS:{editmodelConfigAttrs:{value:{},validator:function(e){return n.isObject(e)}},configForEditModel:{value:null,validator:function(e){return n.isObject(e)}},editTemplate:{value:null,validator:function(e){return typeof e=="string"},setter:"_setEditTemplate"},modelsEditable:{value:!0,lazyAdd:!1,validator:function(e){return n.isBoolean(e)}},secondTemplate:{value:null,validator:function(e){return typeof e=="string"},setter:"_setSecondTemplate"}}})},"@VERSION@",{requires:["yui-base","node-core","base-base","base-build","plugin","pluginhost-base","oop","template-micro"]});
