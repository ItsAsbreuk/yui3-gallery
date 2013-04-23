YUI.add("gallery-itsaviewmodel",function(e,t){"use strict";function f(){}var n=e.Lang,r=e.Array,i=e.Template.Micro,s="itsa-modelview-styled",o="yui3-form",u="yui3-itsaformelement",a=u+"-changed";e.mix(f.prototype,{cleanupWidgets:function(t){var n=this,r=e.Widget;r&&n.all(".yui3-widget").each(function(e){if(n.one("#"+e.get("id"))){var i=r.getByNode(e);i&&i.destroy(t)}})},cleanup:function(){var e=this;e.cleanupWidgets(!0),e.empty()}},!0),e.Node.ITSANodeCleanup=f,e.Base.mix(e.Node,[f]),e.ITSAViewModel=e.Base.create("itsaviewmodel",e.Widget,[],{view:null,_isMicroTemplate:null,_modelRenderer:null,_eventhandlers:[],_initialEditAttrs:null,initializer:function(){var t=this,n=t.get("boundingBox"),r=t.get("model"),i=t.get("modelEditable"),s=i&&r.itsaeditmodel;s&&!n.itsatabkeymanager?e.use("gallery-itsatabkeymanager",function(e){n.plug(e.Plugin.ITSATabKeyManager),t.initializeFurther(n,r,s)}):t.initializeFurther(n,r,s)},initializeFurther:function(t,n,r){var i=this,u=i.get("contentBox"),a=i.get("events"),f=r?n.itsaeditmodel.get("template"):i.get("template"),l=i.get("styled"),c;l&&t.addClass(s).addClass(o),c=i.view=new e.View({container:u,model:n}),c.events=a,c.template=f,i._setTemplateRenderer(f,r),c.render=e.rbind(i._viewRenderer,i),n&&n.addTarget&&n.addTarget(c)},bindUI:function(){var t=this,n=t.get("boundingBox"),r=t.get("model"),i=t._eventhandlers,u=t.view;i.push(t.after("modelChange",function(e){var n=e.prevVal,i=e.newVal;n&&n.removeTarget&&n.removeTarget(u),i&&i.addTarget&&i.addTarget(u),u.set("model",i),r=t.get("model"),u.render()})),i.push(u.after("model:templateChange",function(e){var n=e.newVal,i=t.get("modelEditable");if(!i||!r.itsaeditmodel)u.template=n,t._setTemplateRenderer(n,!1),u.render()})),i.push(u.after("itsaeditmodel:templateChange",function(e){var n=e.newVal,i=t.get("modelEditable");i&&r.itsaeditmodel&&(u.template=n,t._setTemplateRenderer(n,!0),u.render())})),i.push(u.after("model:resetclick",function(e){var n=e.target,r=u.get("container"),i={fromEditModel:!0},s;n.setAttrs(t._initialEditAttrs,i),u.render(),s=r.one("#"+e.elementId),s&&s.focus()})),i.push(t.after("modelEditableChange",function(e){var n=e.newVal,i;r.itsaeditmodel&&(i=n?r.itsaeditmodel.get("template"):t.get("template"),u.template=i,t._setTemplateRenderer(i,n),u.render())})),i.push(t.after("itsaeditmodel:editmodelConfigAttrsChange",function(){r.itsaeditmodel&&t.get("modelEditable")&&u.render()})),i.push(u.after("itsaeditmodel:destroy",function(){if(t.get("modelEditable")){var e=t.get("template");u.template=e,t._setTemplateRenderer(e,!1),u.render()}})),i.push(u.after("itsaeditmodel:pluggedin",function(){e.use("gallery-itsatabkeymanager",function(e){n.itsatabkeymanager||n.plug(e.Plugin.ITSATabKeyManager);if(t.get("modelEditable")){var i=r.itsaeditmodel.get("template");u.template=i,t._setTemplateRenderer(i,!0),u.render()}})})),i.push(u.after("itsaeditmodel:focusnext",function(){var e=n.itsatabkeymanager;e&&t.get("focused")&&e.next()})),i.push(t.after("eventsChange",function(e){u.events=e.newVal})),i.push(t.after("styledChange",function(e){n.toggleClass(s,e.newVal).toggleClass(o,e.newVal)})),i.push(u.after("model:change",function(){!t.get("modelEditable")||!r.itsaeditmodel?u.render(!1):u.get("container").all("."+a).removeClass(a)})),i.push(u.after("model:destroy",function(){u.render(!0)}))},getModelToJSON:function(e){return e.get&&n.type(e.get)==="function"?e.toJSON():e},syncUI:function(){this.view.render()},destructor:function(){var e=this,t=e.get("boundingBox");e._clearEventhandlers(),e.view.destroy(),t.hasPlugin("itsatabkeymanager")&&t.unplug("itsatabkeymanager")},_setTemplateRenderer:function(e,t){var r=this,s,o,u;s=function(){var t=/<%(.+)%>/;return t.test(e)},o=r._isMicroTemplate=s(),o?(u=i.compile(e),r._modelRenderer=function(e){var n=t?e.itsaeditmodel.toJSON(e.itsaeditmodel.get("editmodelConfigAttrs")):r.getModelToJSON(e);return u(n)}):r._modelRenderer=function(i){var s=t?i.itsaeditmodel.toJSON(i.itsaeditmodel.get("editmodelConfigAttrs")):r.getModelToJSON(i);return n.sub(e,s)}},_viewRenderer:function(t){var n=this,r=n.get("boundingBox"),i=r.itsatabkeymanager,s=n.view,o=s.get("container"),u=s.get("model"),a=u.itsaeditmodel&&n.get("modelEditable"),f=e.Global.ItsaDateTimePicker,l=t?"":n._modelRenderer(u);if(a||n._isMicroTemplate)a&&(n._initialEditAttrs=u.getAttrs()),o.cleanupWidgets(!0);return o.setHTML(l),i&&(i.refresh(r),n.get("focused")&&i.focusInitialItem()),f&&f.panel.get("visible")&&f.hide(!0),n},_clearEventhandlers:function(){r.each(this._eventhandlers,function(e){e.detach()})}},{ATTRS:{events:{value:{},validator:function(e){return n.isObject(e)}},modelEditable:{value:!1,lazyAdd:!1,validator:function(e){return n.isBoolean(e)}},model:{value:null,validator:function(t){return t instanceof e.Model||n.isObject(t)||t===null}},styled:{value:!0,validator:function(e){return n.isBoolean(e)}},template:{value:"{clientId}",validator:function(e){return n.isString(e)}}}})},"@VERSION@",{requires:["base-build","widget","view","template-micro","model","pluginhost-base"],skinnable:!0});
