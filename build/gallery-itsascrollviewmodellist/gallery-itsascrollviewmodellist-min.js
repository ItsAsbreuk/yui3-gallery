YUI.add("gallery-itsascrollviewmodellist",function(e,t){"use strict";var n=e.Lang,r="itsa-scrollviewmodel",i="itsa-modellistview",s=i+"-groupheader",o=function(e,t){return parseInt(e.getStyle(t),10)};e.ITSAScrollViewModellist=e.Base.create("itsascrollviewmodellist",e.ScrollView,[e.ITSAModellistViewExtention],{_lastItemTopInit:!1,saveScrollTo:function(e,t){var n=this,r=n.get("boundingBox"),i=n._viewNode,s;e&&(e=Math.max(0,e),s=i.get("offsetWidth")-r.get("offsetWidth"),e=Math.min(e,s)),t&&(t=Math.max(0,t),s=i.get("offsetHeight")-r.get("offsetHeight"),t=Math.min(t,s)),n.scrollTo(e,t)},scrollIntoView:function(t,i,u){var a=this,f=a.get("boundingBox"),l=a.get("axis"),c=l.y,h=c?f.get("offsetHeight"):f.get("offsetWidth"),p=c?f.getY():f.getX(),d=a._viewNode,v=a.itsainfiniteview,m=a.pages,g=i&&n.isBoolean(i.showHeaders)&&i.showHeaders,y,b,w,E,S,x,T,N,C,k,L;x=function(e){var t=c?e.getY():e.getX(),r;return c?r=t+e.get("offsetHeight")+o(e,"marginTop")+o(e,"marginBottom"):r=t+e.get("offsetWidth")+o(e,"marginLeft")+o(e,"marginRight"),t<p||i&&n.isBoolean(i.forceTop)&&i.forceTop?-1:r>p+h||i&&n.isBoolean(i.forceBottom)&&i.forceBottom?1:0},t instanceof e.Node&&(E=t),E||n.isNumber(t)?(E=E||a.getNodeFromIndex(t,u),E&&(N=x(E),m&&N!==0&&(S=d.get("children"),S.some(function(e,n){return e.hasClass(r)||t++,n===t})))):(E=t&&a.getNodeFromModel(t,u),N=x(E),E&&m&&N!==0&&(S=d.all(">li"),t=0,S.some(function(e,n){var r=e===E;return r&&(t=n),r})));if(E){(!i||!n.isBoolean(i.noFocus)||!i.noFocus)&&a._focusModelNode(E);if(N===0&&g){L=E.previous();while(L&&L.hasClass(s))E=L,L=L.previous();N=x(E)}if(N!==0){T=N===-1;if(T&&g){L=E.previous();while(L&&L.hasClass(s))t--,E=L,L=L.previous()}c?(y=E.getY(),b=a.get("scrollY"),C=E.get("offsetHeight")+o(E,"marginTop")+o(E,"marginBottom")):(y=E.getX(),b=a.get("scrollX"),C=E.get("offsetWidth")+o(E,"marginLeft")+o(E,"marginRight"));if(m){if(!T){while(C<h&&t>0)k=!0,t--,E=E.previous("li"),c?C+=E.get("offsetHeight")+o(E,"marginTop")+o(E,"marginBottom"):C+=E.get("offsetWidth")+o(E,"marginLeft")+o(E,"marginRight");k&&t++,t=Math.min(t,a._getMaxPaginatorGotoIndex(t,u))}m.scrollToIndex(t)}else w=Math.round(b+y-p-(T?0:h-C)),c?a.saveScrollTo(null,w):a.saveScrollTo(w,null);v&&!T&&v.checkExpansion()}}},_setLastItemOnTop:function(e){var t=this;t._lastItemTopInit?e?(t._addEmptyItem(null,e),t.syncUI()):(t._removeEmptyItem(),t.syncUI()):t._lastItemTopInit=!0}},{ATTRS:{lastItemOnTop:{value:0,validator:function(e){return n.isNumber(e)&&e>-1&&e<3},setter:"_setLastItemOnTop"}}})},"@VERSION@",{requires:["scrollview","gallery-itsamodellistviewextention"],skinnable:!0});
