YUI.add("gallery-itsascrollviewkeynav",function(e,t){"use strict";var n=e.Lang,r=e.Array,i="itsa-scrollviewmodel",s=i+"-focus",o=function(e,t){return parseInt(e.getStyle(t),10)};e.namespace("Plugin").ITSAScrollViewKeyNav=e.Base.create("itsscrollviewkeynav",e.Plugin.Base,[],{_eventhandlers:[],host:null,initializer:function(){var t=this,n;t.host=n=t.get("host"),n instanceof e.ScrollView&&t._bindUI()},destructor:function(){this._clearEventhandlers()},_bindUI:function(){var t=this;t._eventhandlers.push(e.on("keydown",e.rbind(t._handleKeyDown,t)))},_handleKeyDown:function(t){var n=this,r=n.host,u=t.keyCode,a=r.itssvinfinite,f=e.rbind(r.scrollTo,r),l=r.get("boundingBox"),c=l.getX(),h=l.getY(),p=l.get("offsetHeight"),d=l.get("offsetWidth"),v=parseInt(l.getStyle("borderRightWidth"),10),m=parseInt(l.getStyle("borderBottomWidth"),10),g,y,b,w,E,S,x,T,N,C,k,L,A,O,M,_,D,P,H,B,j,F,I,q,R,U,z,W,X,V,$,J,K,Q,G,Z,et,tt,nt,rt,it,st,ot,ut,at,ft,lt,ct,ht,pt;L=function(e,t,n,r,i,s){var o=e.getXY(),u=t.getXY(),a=o[0],f=o[1],l=a+e.get("offsetWidth"),c=f+e.get("offsetHeight"),h=u[0]+(n||0),p=u[1]+(r||0),d=u[0]+(i||0)+t.get("offsetWidth"),v=u[1]+(s||0)+t.get("offsetHeight");return a>=h&&l<=d&&f>=p&&c<=v},at=function(e,t){var n,r;return t?(n=e.getY()+e.get("offsetHeight")+o(e,"marginBottom"),r=h+p):(n=e.getX()+e.get("offsetWidth")+o(e,"marginRight"),r=c+d),r-n},ft=function(e,t){var n;return t?n=e.getY()-o(e,"marginTop"):n=e.getX()-o(e,"marginLeft"),n-(t?h:c)},rt=function(e){return e&&L(e,l)},tt=function(e){var t=e.next("."+i)||!1;return t&&L(t,l)},nt=function(e){var t=e.previous("."+i)||!1;return t&&L(t,l)},U=function(e){return!r._moreItemsAvailable&&L(e.item(e.size()-1),l,0,0,v,m)},it=function(e){var t;return e.some(function(e){return t=rt(e)&&e.hasClass(i)&&e,t}),t},st=function(e){var t=!1,n;return e.some(function(e){var r=rt(e);return r&&(t=!0,e.hasClass(i)&&(n=e)),t&&!r}),n},Z=function(){r.scrollIntoView(0),w?f(null,0):f(0,null)},et=function(){r.scrollIntoView(G.size()-1)},ut=function(e){var t=G&&e&&G.getByClientId(e.getData("modelClientId"));t&&r.scrollIntoView(t)};if(r.get("focused")){P=r.get("modelsSelectable"),k=r._viewNode||r.get("srcNode"),g=r.hasPlugin("pages"),g&&(H=r.pages,W=e.rbind(n._paginatorScrollToIndex,n),z=e.rbind(H.scrollToIndex,H)),y=r.get("axis"),b=y.x,w=y.y,q=u===36,R=u===35,E=u===37&&b,S=u===39&&b,x=u===38&&w,T=u===40&&w,A=u===33&&b&&!w,O=u===34&&b&&!w,M=u===33&&w,_=u===34&&w,D=u===13||u===32,(D||E||S||x||T||A||O||M||_||q||R)&&t.preventDefault();if(P){G=r._abberantModelList||r.get("modelList");if(q)Z();else if(R)et();else if(D||E||S||x||T||A||O||M||_){Q=k.one("."+s);if(Q)if(E||S||x||T)Q=T||S?Q.next("."+i):Q.previous("."+i),Q&&ut(Q),(x||E)&&!Q&&Z();else if(O||_){lt=tt(Q);if(!rt(Q)&&!lt)ot=Q.next("."+i),ut(ot||Q);else if(lt)I=k.all("li"),ut(st(I));else{ot=Q.next("."+i),V=at(Q,_);while(ot&&L(ot,l,0,(_?p:d)-V,0,(_?p:d)-V))Q=ot,ot=Q.next("."+i);ut(Q)}}else if(A||M){lt=nt(Q);if(!rt(Q)&&!lt)ot=Q.previous("."+i),ut(ot||Q);else if(lt)I=k.all("li"),ut(it(I));else{ot=Q.previous("."+i);if(!ot)Z();else{V=ft(Q,M);while(ot&&L(ot,l,0,-(M?p:d)+V,0,-(M?p:d)+V))Q=ot,ot=Q.previous("."+i);ut(Q)}}}else D&&(ht=Q.getData("modelClientId"),pt=G.getByClientId(ht),r.modelIsSelected(pt)?r.unselectModels(pt):r.selectModels(pt));else if(T||S||_||O)I=k.all("li"),T||S?ut(it(I)):ut(st(I))}}else if(g){B=H.get("index"),j=H.get("total"),I=k.all("li"),(E||x)&&H.prev();if(M&&B>0){N=!0;for(C=B-1;N&&C>=0;C--)F=I.item(C),N=C===B-1||L(F,l,0,-p);ct=C+2,B===ct?z(0):z(ct)}if(A&&B>0){N=!0;for(C=B-1;N&&C>=0;C--)F=I.item(C),N=C===B-1||L(F,l,-d,0);z(C+2)}q&&z(0),(S||T)&&!U(I)&&W(B+1);if((_||O)&&!U(I)){N=!0;for(C=B+1;N&&C<j;C++)F=I.item(C),N=L(F,l);W(C-1)}R&&!U(I)&&(a&&r._moreItemsAvailable&&r.itssvinfinite.loadAllItems(),W(j-1))}else X=r.get(w?"scrollY":"scrollX"),J=e.rbind(n._saveScrollTo,n),E||x||S||T||A||M||O||_?(E||x||S||T?$=n.get("step"):$=w?p:d,K=O||_||S||T,w?J(null,X+(K?$:-$)):J(X+(K?$:-$),null),a&&K&&a.checkExpansion()):q?w?f(null,0):f(0,null):R&&(a&&a.loadAllItems(),w?J(null,k.get("offsetHeight")):J(k.get("offsetWidth"),null))}},_paginatorScrollToIndex:function(e){var t=this.host,n=t&&t.pages;n&&n.scrollToIndex(Math.min(e,t._getMaxPaginatorGotoIndex(0)))},_saveScrollTo:function(e,t){var n=this.host,r=n.get("boundingBox"),i=n._viewNode||n.get("scrNode"),s;e&&(e=Math.max(0,e),s=i.get("offsetWidth")-r.get("offsetWidth"),e=Math.min(e,s)),t&&(t=Math.max(0,t),s=i.get("offsetHeight")-r.get("offsetHeight"),t=Math.min(t,s)),n.scrollTo(e,t)},_focusHost:function(){var e=this.host;e&&e.focus&&e.focus()},_clearEventhandlers:function(){r.each(this._eventhandlers,function(e){e.detach()})}},{NS:"itssvkeynav",ATTRS:{initialFocus:{value:!0,lazyAdd:!1,validator:function(e){return n.isBoolean(e)},setter:"_focusHost"},step:{value:10,validator:function(e){return n.isNumber(e)}}}})},"@VERSION@",{requires:["base-build","plugin","pluginhost-base","node-base"]});
