YUI.add("gallery-itsastatusbar",function(e,t){"use strict";function _(){_.superclass.constructor.apply(this,arguments)}var n=e.Array,r=e.Lang,i=e.Node,s="body",o="info",u="warn",a="error",f="empty",l="number",c='<div class="itsa-statusbar-container"></div>',h='<div class="itsa-statusbar-empty"></div>',p='<div class="itsa-statusbar-info" style="display: none;"></div>',d='<div class="itsa-statusbar-warn" style="display: none;"></div>',v='<div class="itsa-statusbar-error" style="display: none;"></div>',m="itsa-statusbar-texttransform-",g="textTransform",y="Change",b=5e3,w="uppercase",E="lowercase",S="capitalize",x="_suspended",T="boolean",N="string",C="button",k="readyText",L="className",A='<button class="pure-button itsabutton-rounded itsabutton-bordered" data-barlevel="{level}"">{buttontext}</button>',O='<i class="itsa-dialogicon {icon}"></i>',M='<div class="itsa-statusbar-statusmsg">{icontemplate}{message}</div>{button}';_.NAME="itsastatusbar",e.ITSAStatusbar=e.extend(_,e.ITSAMessageViewer,{},{ATTRS:{className:{value:null,validator:function(e){return e===null||typeof e===N}},fadeDelay:{value:.15,validator:function(e){return typeof e===l&&e>=0}},parentNode:{getter:function(t){return t instanceof i&&t||e.one(t||s)||e.one(s)},validator:function(e){return e instanceof i||typeof e===N}},textTransform:{value:E,validator:function(e){return e===null||e===w||e===E||e===S}},readyText:{value:e.Intl.get("gallery-itsaformmodel").ready,validator:function(e){return e===null||typeof e===N}},showIcon:{value:!0,validator:function(e){return typeof e===T}},statusSpin:{value:"itsaicon-controll-spin6",validator:function(e){return typeof e===N}}}}),_.prototype.initializer=function(){var t=this;t._eventhandlers=[],t._bars={},t.simpleMessages=!0,t._renderBars(),e.later(b,t,t.isReady)},_.prototype.isReady=function(){var t=this;return t._readyPromise||(t._readyPromise=e.usePromise("gallery-itsanodepromise","gallerycss-itsa-base","gallerycss-itsa-animatespin","gallerycss-itsa-controll","gallerycss-itsa-dialog"))},_.prototype.resurrect=function(e){var t=this;t.isReady().then(function(){var n=t._bars[e.level];n&&n.showPromise()})},_.prototype.suspend=function(e){var t=this;t.isReady().then(function(){var n=t._bars[e.level];n&&n.hidePromise()})},_.prototype.viewMessage=function(t){var n=this;return n.isReady().then(function(){return new e.Promise(function(r){var i=n._bars,s=i[t.level];n._hideBar(i[f]),n._showBar(s,t),t._promise.then(function(){return n._hideBar(s,!0)},function(){return n._hideBar(s,!0)}).then(function(){r(),n.countMessages(!0)===0&&i[f].show()&&i[f].setStyle("opacity",1)}).then(null,function(t){e.soon(function(){throw t})})})})},_.prototype.destructor=function(){var e=this;e._clearEventhandlers(),e._containerNode.destroy(!0)},_.prototype._clearEventhandlers=function(){var e=this;n.each(e._eventhandlers,function(e){e.detach()})},_.prototype._hideBar=function(e,t){return t&&e.set("text",""),e.setStyle("opacity",0),e.hide()},_.prototype._renderBars=function(){var t=this,n=t._eventhandlers,r=t.get(g),s=t.get("parentNode"),l=t.get(L),b,x,T,N,A,O;O=i.create(c),b=t._bars,x=b[f]=i.create(h),T=b[o]=i.create(p),N=b[u]=i.create(d),A=b[a]=i.create(v),s===e.one("body")&&O.addClass("itsa-body-statusbar"),s.prepend(O.append(x).append(T).append(N).append(A)),t._containerNode=O,l&&O.addClass(l),x.set("text",t.get(k)),r&&O.addClass(m+r),n.push(O.delegate("tap",function(e){var n=e.target,r=n.getAttribute("data-barlevel"),i;i=t._lastMessage[r],i&&i.resolve()},C)),n.push(t.on(g+y,function(e){var t=e.newVal;O.removeClass(m+w),O.removeClass(m+E),O.removeClass(m+S),t&&O.addClass(m+t)})),n.push(t.on(k+y,function(e){x.set("text",e.newVal)})),n.push(t.after(L+y,function(e){e.prevVal&&O.removeClass(e.prevVal),e.newVal&&O.addClass(e.newVal)}))},_.prototype._showBar=function(t,n){var i=this,s=i.get("fadeDelay"),u=n.level===o?n._config.icon:n.icon,a;return n.messageType==="showStatus"&&(u=i.get("statusSpin")+" itsa-iconstandalone itsa-busy"),a={icontemplate:u?r.sub(O,{icon:u}):"",message:e.Escape.html(n.message.replace(/<br ?\/?>/g,"x")),button:n.noButtons?"":r.sub(A,{buttontext:"close",level:n.level})},t.setHTML(r.sub(M,a)),n[x]||(s===0?t.show():t.showPromise(null,{duration:s}))}},"@VERSION@",{requires:["yui-base","intl","event-tap","promise","timers","escape","node-event-delegate","node-style","gallery-itsamessageviewer"],skinnable:!0});
