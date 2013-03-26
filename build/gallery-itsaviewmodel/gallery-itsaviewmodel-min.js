YUI.add("gallery-itsaviewmodel",function(e,t){"use strict";function o(){}var n=e.Lang,r=e.Array,i=e.Template.Micro,s="itsa-modelview-styled";e.mix(o.prototype,{cleanup:function(){var t=this,n=e.Widget;n&&t.all(".yui3-widget").each(function(e){if(t.one("#"+e.get("id"))){var r=n.getByNode(e);r&&r.destroy(!0)}}),t.all("children").destroy(!0)}},!0),e.Node.ITSANodeCleanup=o,e.Base.mix(e.Node,[o]),e.ITSAViewModel=e.Base.create("itsaviewmodel",e.Widget,[],{view:null,_isMicroTemplate:null,_modelTemplate:null,_eventhandlers:[],initializer:function(){var t=this,n=t.get("boundingBox"),r=t.get("contentBox"),i=t.get("events"),o=t.get("model"),u=t.get("template"),a=t.get("styled"),f;a&&n.addClass(s),f=t.view=new e.View({container:r,model:o}),f.events=i,f.template=u,t._setTemplateRenderer(u),f.render=e.rbind(t._viewRenderer,t),o&&o.addTarget&&o.addTarget(f)},bindUI:function(){var t=this,n=t.get("boundingBox"),r=t._eventhandlers,i=t.view;r.push(t.after("modelChange",function(e){var t=e.prevVal,n=e.newVal;t&&t.removeTarget&&t.removeTarget(i),n&&n.addTarget&&n.addTarget(i),i.set("model",n),i.render()})),r.push(t.after("templateChange",function(e){var n=e.newVal;i.template=n,t._setTemplateRenderer(n),i.render()})),r.push(t.after("eventsChange",function(e){i.events=e.newVal})),r.push(t.after("styledChange",function(e){n.toggleClass(s,e.newVal)})),r.push(i.after("*:change",e.bind(i.render,i,!1))),r.push(i.after("model:destroy",e.bind(i.render,i,!0)))},getModelToJSON:function(e){return e.get&&n.type(e.get)==="function"?e.toJSON():e},syncUI:function(){this.view.render()},destructor:function(){var e=this;e._clearEventhandlers(),e.view.destroy()},_setTemplateRenderer:function(e){var t=this,r,s,o;r=function(){var t=/<%(.+)%>/;return t.test(e)},s=t._isMicroTemplate=r(),s?(o=i.compile(e),t._modelTemplate=function(e){return o(t.getModelToJSON(e))}):t._modelTemplate=function(r){return n.sub(e,t.getModelToJSON(r))}},_viewRenderer:function(e){var t=this,n=t.view,r=n.get("container"),i=n.get("model"),s=e?"":t._modelTemplate(i);return t._isMicroTemplate&&r.cleanup(),r.setHTML(s),t},_clearEventhandlers:function(){r.each(this._eventhandlers,function(e){e.detach()})}},{ATTRS:{events:{value:{},validator:function(e){return n.isObject(e)}},model:{value:null,validator:function(t){return t instanceof e.Model||n.isObject(t)||t===null}},styled:{value:!0,validator:function(e){return n.isBoolean(e)}},template:{value:"{clientId}",validator:function(e){return n.isString(e)}}}})},"@VERSION@",{requires:["base-build","widget","view","template-micro","model"],skinnable:!0});
