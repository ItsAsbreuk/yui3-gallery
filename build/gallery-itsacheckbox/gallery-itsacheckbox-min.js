YUI.add("gallery-itsacheckbox",function(e,t){var n=e.Lang,r=e.Array,i="yui3-itsacheckbox",s="readonly",o=i+"-"+s,u=i+"-parent",a=i+"-loading",f=i+"-rerender",l=i+"-hidden",c=i+"-created-checkbox",h="option",p=h+"wrapper",d=h+"container",v=h+"on",m=h+"btn",g=h+"off",y=e.UA.ie>0,b="boundingBox",w="string",E="width",S="height",x="offsetWidth",T="offsetHeight",N="borderRadius",C="paddingTop",k="paddingBottom",L="paddingLeft",A="paddingRight",O="marginLeft",M="px",_="left",D="disabled",P="checked",H="Change",B="unselectable",j='<div class="',F="</div>",I='<input id="{id}" type="checkbox" class="'+c+'"{'+s+"}{"+P+"}{"+D+"}>",q="{htmlcheckbox}"+j+p+'">'+j+d+'"{'+B+"}>"+j+v+'">{'+v+"}"+F+j+g+'">{'+g+"}"+F+j+m+'">'+F+F+F,R=function(e){return parseInt(e,10)};e.ITSACheckbox=e.Base.create("itsacheckbox",e.Widget,[],{CONTENT_TEMPLATE:null,initializer:function(){var e=this,t=e.get(b);t.addClass(a),e.get(s)&&t.addClass(o),e._eventhandlers=[]},renderUI:function(){var t=this,n=t.get(b),r;r=t.get("srcNode"),r&&r.get("tagName")==="INPUT"&&r.getAttribute("type")==="checkbox"&&(t._src=e.one(r),r.addClass(l),n.insert(r,"before")),t._parentNode&&t._parentNode.addClass(u),t._setTemplate()},bindUI:function(){var t=this,n=t.get(b),r;t.dd=r=(new e.DD.Drag({node:t._containerNode,lock:t.get(D)||t.get(s)})).plug(e.Plugin.DDConstrained,{constrain:t._wrapperNode}),r.on("drag:end",function(e){var n=e.pageX-t.get(b).getX();t.set(P,n>-t._changePosition)}),t._eventhandlers.push(t.after(P+H,function(e){var n=e.newVal;t._goFinal(n),t.fire("value"+H,e),t._src&&(n?t._src.setAttribute(P,P):t._src.removeAttribute(P))})),t._eventhandlers.push(t.after([v+H,g+H],e.bind(t._setDimensions,t))),t._eventhandlers.push(t.after(D+H,function(n){var i=n.newVal,o=e.merge(n),u;t._forceCheckedVal=!0,u=t.get(P),t._forceCheckedVal=!1,r.set("lock",i||t.get(s)),t._goFinal(u,!0),i?(o.newVal=null,o.prevVal=u):(o.newVal=u,o.prevVal=null),t.fire("value"+H,o),t._src&&(i?t._src.setAttribute(D,D):t._src.removeAttribute(D))})),t._eventhandlers.push(t.after(s+H,function(e){var i=e.newVal,u;t._forceCheckedVal=!0,u=t.get(P),t._forceCheckedVal=!1,n.toggleClass(o,i),r.set("lock",i||t.get(D)),t._goFinal(u,!0),t._src&&(i?t._src.setAttribute(s,s):t._src.removeAttribute(s))})),t._eventhandlers.push(t._containerNode.on("tap",function(){t.toggle()})),t._eventhandlers.push(e.on("keydown",function(e){if(t.get("focused")){var n=e.keyCode;e.preventDefault(),n===37||n===40?t.set(P,!1):n===39||n===38?t.set(P,!0):n===32&&t.toggle()}}))},check:function(){var e=this;return e.set(P,!0),e.getValue()},getValue:function(){return this.get(P)},syncUI:function(){var e=this;e._setDimensions()},toggle:function(){var e=this,t=e.get(P),n;return t!==null&&(e.set(P,!t),n=e.get(P)),n!==t},uncheck:function(){var e=this;return e.set(P,!1),e.getValue()},destructor:function(){var e=this,t=e.dd,n=e._createdSrc,r=e._src;t&&t.destroy(),e._clearEventhandlers(),n?n.destroy():r.removeClass(l),e._wrapperNode.remove(!0),e._parentNode&&e._parentNode.removeClass(u)},_clearEventhandlers:function(){r.each(this._eventhandlers,function(e){e.detach()})},_goFinal:function(e,t){var n=this;e?n._goRight(!0,t):n._goLeft(!0,t)},_goLeft:function(e,t){var n=this,r=n._containerNode;if(!n.get(D)&&!n.get(s)||t)e?n._moveAnimated(0):r.setStyle(_,"0")},_goRight:function(e,t){var n=this,r=n._containerNode;if(!n.get(D)&&!n.get(s)||t)e?n._moveAnimated(n._onPosition):r.setStyle(_,n._onPosition+M)},_moveAnimated:function(e){var t=this;t._containerNode.transition({easing:"ease-in",duration:t.get("duration"),left:e+M})},_setDimensions:function(){var e=this,t=e.get(b),n,r,i,s,o,u,a,l,c,h,p,d,m,y,w,D,H,B,j,F,I,q;n=e._optionBtnNode,r=e._optionOnNode,i=e._optionOffNode,D=e._wrapperNode,c=e._containerNode,t.addClass(f),e.get("rendered")&&(I=!0,r.set("text",e.get(v)),i.set("text",e.get(g))),c.setStyle(E,""),r.setStyle(E,""),i.setStyle(E,""),n.setStyle(E,""),c.setStyle(S,""),r.setStyle(S,""),i.setStyle(S,""),n.setStyle(S,""),r.setStyle(L,""),r.setStyle(A,""),r.setStyle(C,""),r.setStyle(k,""),i.setStyle(L,""),i.setStyle(A,""),i.setStyle(C,""),i.setStyle(k,""),h=r.get(T),p=i.get(T),u=Math.max(h,p),s=Math.floor(u/2),o=u-s,j=R(n.getStyle("borderTopWidth")),F=R(n.getStyle("borderBottomWidth")),a=u-j-F+M,n.setStyle(S,a),r.setStyle(C,R(r.getStyle(C))+M),r.setStyle(k,R(r.getStyle(k))+M),i.setStyle(C,R(i.getStyle(C))+M),i.setStyle(k,R(i.getStyle(k))+M),r.setStyle(S,u-R(r.getStyle(C))-R(r.getStyle(k))+M),i.setStyle(S,u-R(i.getStyle(C))-R(i.getStyle(k))+M),r.setStyle(A,R(r.getStyle(A))+s+M),i.setStyle(L,R(i.getStyle(L))+o+M),r.setStyle(L,R(r.getStyle(L))+M),i.setStyle(A,R(i.getStyle(A))+M),m=r.get(x),y=i.get(x),w=Math.max(m,y),d=m-R(r.getStyle(L))-R(r.getStyle(A)),r.setStyle(E,d+(w-m)+M),d=y-R(i.getStyle(L))-R(i.getStyle(A)),i.setStyle(E,d+(w-y)+M),n.setStyle(E,a),l=w-s,D.setStyle(E,3*w-s+M),c.setStyle(E,2*w+M),B=w+o+1,t.setStyle(E,B+M),n.setStyle(O,-s-w+M),wrapperLeftPos=s-w,D.setStyle(_,wrapperLeftPos+M),e._onPosition=w-s,e._changePosition=Math.round(-wrapperLeftPos/2),n.setStyle(N,s+M),q=s-1,r.setStyle(N,q+M+" 0 0 0"),i.setStyle(N,"0 "+q+M+" 0 0"),H=t.get(T),t.setStyle(N,Math.round(H/2)+M),e.get(P)?e._goRight(!1,!0):e._goLeft(!1,!0),t.removeClass(f),I&&e.fire("contentUpdate")},_setTemplate:function(){var e=this,t=e.get(b),r=e.get(v),i=e.get(g),o,u,a,f;e._src||(u=e._parentNode||t,o="checkbox_"+u.get("id")),t.setHTML(n.sub(q,{htmlcheckbox:o?n.sub(I,{id:o,readonly:e.get(s)?" "+s+'="'+s+'"':"",checked:e.get(P)?" "+P+'="'+P+'"':"",disabled:e.get(D)?" "+D+'="'+D+'"':""}):"",optionon:r,optionoff:i,unselectable:y?" "+B+"=on":""})),o&&(e._createdSrc=e._src=t.one("#"+o)),e._wrapperNode=t.one("."+p),e._containerNode=t.one("."+d),e._optionOnNode=a=t.one("."+v),e._optionOffNode=f=a.next(),e._optionBtnNode=f.next()},_srcNodeValidCheckbox:function(e){return e.get("tagName")==="INPUT"&&e.getAttribute("type")==="checkbox"}},{ATTRS:{checked:{value:!1,validator:function(e){var t=this,n;return t.get("rendered")&&(n=t.get(D)||t.get(s)),typeof e=="boolean"&&!n},getter
:function(e){var t=this;return!t.get(D)||t._forceCheckedVal?e:null}},duration:{value:.15,validator:function(e){return typeof e=="number"}},optionon:{value:"I",validator:function(e){return typeof e===w}},optionoff:{value:"O",validator:function(e){return typeof e===w}},readonly:{value:!1,validator:function(e){return typeof e=="boolean"}}},HTML_PARSER:{checked:function(e){var t=e.getAttribute(P).toLowerCase()===P;return this._srcNodeValidCheckbox(e)&&t},readonly:function(e){var t=e.getAttribute(s).toLowerCase()===s;return this._srcNodeValidCheckbox(e)&&t},disabled:function(e){var t=e.getAttribute(D).toLowerCase()===D;return this._srcNodeValidCheckbox(e)&&t}}})},"@VERSION@",{requires:["yui-base","node-base","dom-screen","widget","base-build","dd-drag","dd-constrain","event-tap","transition"],skinnable:!0});
