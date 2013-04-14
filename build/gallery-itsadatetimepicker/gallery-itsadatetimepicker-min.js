YUI.add("gallery-itsadatetimepicker",function(e,t){"use strict";var n=e.Lang,r=e.Node,i=e.Array,s="itsa-datetimepicker",o=s+"-loading",u=s+"-unclosable",a=s+"-panel",f=s+"-timechanged",l=1e3,c=s+"-datepicker",h=s+"-timepicker",p=h+"-hidden",d="Select date",v="Select date and time",m="Select time",g="yui3-button",y="itsa-button-datetime",b=s+"-icondate",w=s+"-icontime",E=s+"-icondatetime",S='<button class="'+g+" "+y+'"><span class="'+b+'"></span></button>',x='<button class="'+g+" "+y+'"><span class="'+E+'"></span></button>',T='<button class="'+g+" "+y+'"><span class="'+w+'"></span></button>',N="_datetimepicker:",C=N+"selectdate",k=N+"selected",L=N+"cancel",A={titleDate:d,titleDateTime:v,titleTime:m,alignToNode:null,modal:!1,dragable:!1,forceSelectdate:!1,minTime:"00:00",maxTime:"24:00",timeFormat:"%H:%M",resetStr:"Reset",tooltipHandle:"Drag to set time",selectOnRelease:!0,customRenderer:{},showPrevMonth:!1,showNextMonth:!1,headerRenderer:"%B %Y",minimumDate:null,maximumDate:null,enabledDatesRule:null,disabledDatesRule:null},O=function(e){return parseInt(e,10)};e.ITSADateTimePicker=e.Base.create("itsadatetimepicker",e.Base,[],{panel:null,calendar:null,timedial:null,_closebutton:null,_dialHandle:null,_eventhandlers:[],_panelRendererDelay:null,_resetNode:null,_timeFormat:null,_timeNode:null,_timepickerSelectOnRelease:null,_unclosable:null,_window:null,initializer:function(){var t=this;t._window=e.one("window"),t._renderUI(),t._bindUI(),e.one("body").removeClass(o)},dateNode:function(){return r.create(S)},datetimeNode:function(){return r.create(x)},getDate:function(t,n){var r=this,i;return r._saveShow(1,t,n),i=new e.Promise(function(t,n){var s,o;s=e.once(C,function(e){o.detach();var n=e.newDate;n.setMilliseconds(0),n.setSeconds(0),n.setMinutes(0),n.setHours(0),r._hide(),t(n),i=null}),o=e.once(L,function(){s.detach(),r.calendar.hide(),n(new Error("canceled")),i=null})}),i},getDateTime:function(t,n){var r=this,i;return n=n||{},n.selectOnRelease=!1,r._saveShow(2,t,n),i=new e.Promise(function(t,n){var s,o;s=e.once(k,function(){o.detach();var e=r.calendar.get("selectedDates")[0],n=O(r.timedial.get("value")),s=Math.floor(n/60),u=n-60*s;e.setMilliseconds(0),e.setSeconds(0),e.setMinutes(u),e.setHours(s),r._hide(),t(e),i=null}),o=e.once(L,function(){s.detach(),r.calendar.hide(),r._toggleTimePicker(!1,!1),n(new Error("canceled")),i=null})}),i},getTime:function(t,n){var r=this,i;return r._saveShow(3,t,n),i=new e.Promise(function(t,n){var s,o;s=e.once(k,function(){o.detach();var e=O(r.timedial.get("value")),n=Math.floor(e/60),s=e-60*n,u=new Date(1900,0,1,n,s,0,0);r._hide(),t(u),i=null}),o=e.once(L,function(){s.detach(),r._toggleTimePicker(!1,!1),n(new Error("canceled")),i=null})}),i},timeNode:function(){return r.create(T)},destructor:function(){var e=this;e._clearEventhandlers(),e._panelRendererDelay&&e._panelRendererDelay.cancel(),e.timedial.destroy(),e.calendar.destroy()},_bindUI:function(){var t=this,n=t._eventhandlers,r=t.panel;r.onceAfter("render",function(){var i=r.get("boundingBox"),s;t._closebutton=s=i.one(".yui3-button-close"),n.push(s.on("click",function(){t._unclosable||e.fire(L)})),n.push(i.on("keydown",function(n){n.keyCode===27&&!t._unclosable&&(t._hide(),e.fire(L))})),t._fillPanel()}),t._panelRendererDelay=e.later(l,t,function(){t._panelRendererDelay=null,r.render()})},_clearEventhandlers:function(){var e=this._eventhandlers;i.each(e,function(e){e.detach()}),e.length=0},_createTimeDial:function(){var t=this,n=t.panel.get("contentBox"),r;t.timedial=r=new e.Dial({min:0,max:1440,stepsPerRevolution:720,value:0}),r.onceAfter("render",function(){t._timeNode=n.one(".yui3-dial-label-string"),t._resetNode=n.one(".yui3-dial-reset-string"),t._dialHandle=n.one(".yui3-dial-handle"),t._eventhandlers.push(r._dd1.on("drag:end",t._afterDialChange,t))}),r.render(n.one("#"+h)),t._eventhandlers.push(r.after("valueChange",function(e){var n=parseInt(e.newVal,10),r=Math.floor(n/60),i=n-60*r,s=t._timeNode;s.setHTML(t._renderDialTime(r,i)),s.addClass(f)}))},_afterDialChange:function(){var t=this;t._timepickerSelectOnRelease&&e.fire(k)},_createCalendar:function(){var t=this;t.calendar=new e.Calendar({height:"250px",width:"250px",showPrevMonth:!0,showNextMonth:!0,visible:!1,date:new Date}),t._eventhandlers.push(t.calendar.on("dateClick",e.rbind(t._calendarNewDate,t))),t.calendar.render(t.panel.get("contentBox").one("#"+c))},_calendarNewDate:function(t){var n=this,r;n.calendar.get("visible")&&(r=t.date,e.fire(C,{newDate:r}))},_fillPanel:function(){var t=this,n=t.panel,r=n.get("boundingBox"),i;r.addClass(a),t._createCalendar(),t._createTimeDial(),i={value:"Select",action:function(t){t.preventDefault(),e.fire(k)},section:e.WidgetStdMod.FOOTER},n.addButton(i)},_hide:function(){var e=this;e.calendar.hide(),e._toggleTimePicker(!1,!1),e.panel.hide()},_renderDialTime:function(t,n){var r=this,i=new Date(1900,0,1,t,n,0,0);return e.Date.format(i,{format:r._timeFormat})},_renderUI:function(){var t=this;t.panel=new e.Panel({zIndex:15e3,modal:!1,visible:!1,render:!1,fillHeight:null,hideOn:[],bodyContent:'<div id="'+c+'"></div><div id="'+h+'"></div>'})},_saveShow:function(e,t,n){var r=this,i=r.panel;i.get("rendered")?r._show(e,t,n||{}):i.onceAfter("render",function(){r._show(e,t,n||{})}),r._panelRendererDelay&&(r._panelRendererDelay.cancel(),i.render())},_show:function(t,r,i){var s=this,o=s.panel,a=r||new Date,l=s._timeNode,c=e.merge(s.get("defaultConfig"),i),h=s.timedial,p=s.calendar,d,v,m,g,y,b,w,E,S,x,T,N,C,k,A,M,_,D,P,H,B,j;C=c.alignToNode,o.get("visible")&&(e.fire(L),s.panel.hide()),t<3?(p.deselectDates(),p.selectDates(a),p.set("date",a),n.isObject(i)&&(E={customRenderer:c.customRenderer,showPrevMonth:c.showPrevMonth,showNextMonth:c.showNextMonth,headerRenderer:c.headerRenderer,minimumDate:c.minimumDate,maximumDate:c.maximumDate,enabledDatesRule:c.enabledDatesRule,disabledDatesRule:c.disabledDatesRule},p.setAttrs(E)),p.show()):p.hide(),t>1?(s._resetNode.setHTML(c.resetStr),s._dialHandle.setAttribute("title",c.tooltipHandle),s.
_timeFormat=c.timeFormat,k=c.minTime,A=c.maxTime,typeof k=="string"&&(D=k.split(":"),D.length===2&&(B=parseInt(D[0],10),P=parseInt(D[1],10),M=P+60*B)),typeof A=="string"&&(D=A.split(":"),D.length===2&&(j=parseInt(D[0],10),H=parseInt(D[1],10),_=H+60*j)),M||(M=0),_||(_=1440),h.set("min",M),h.set("max",_),x=a.getHours(),S=a.getMinutes(),T=S+60*x,T<M&&(T=M,x=B,S=P),T>_&&(T=_,x=j,S=H),h.set("value",T),h._originalValue=T,l.setHTML(s._renderDialTime(x,S)),l.removeClass(f),s._toggleTimePicker(!0,!c.selectOnRelease)):s._toggleTimePicker(!1,!1);if(c.alignToNode instanceof e.Node){v=s._window;if(v){m=O(v.get("winWidth")),g=O(v.get("docScrollX"));switch(t){case 1:N=285;break;case 2:N=155;break;case 3:N=415}y=Math.max(o.get("boundingBox").get("offsetWidth"),N),b=C.getX(),w=C.get("offsetWidth"),d=b+w+y<g+m||b+w<y}o.align(C,d?[e.WidgetPositionAlign.TL,e.WidgetPositionAlign.TR]:[e.WidgetPositionAlign.TR,e.WidgetPositionAlign.BR])}else o.centered();o.set("modal",c.modal);switch(t){case 1:o.set("headerContent",c.title||c.titleDate);break;case 2:o.set("headerContent",c.title||c.titleDateTime);break;case 3:o.set("headerContent",c.title||c.titleTime)}c.dragable?o.hasPlugin("dd")?o.hasPlugin("dd")&&o.unplug("dd"):(o.plug(e.Plugin.Drag),o.dd.addHandle(".yui3-widget-hd")):o.hasPlugin("dd")&&o.unplug("dd"),s._unclosable=c.forceSelectdate,s._timepickerSelectOnRelease=c.selectOnRelease,s._closebutton.toggleClass(u,s._unclosable),o.show()},_toggleTimePicker:function(e,t){var n=this;n.timedial.get("boundingBox").toggleClass(p,!e),n._resetNode.toggleClass(p,!t),n.panel.get("contentBox").one(".yui3-widget-ft").toggleClass(p,!t)}},{ATTRS:{defaultConfig:{value:A,validator:function(e){return n.isObject(e)},setter:function(t){return e.merge(A,t)}}}}),e.Global.ItsaDateTimePicker||(e.Global.ItsaDateTimePicker=new e.ITSADateTimePicker),e.ItsaDateTimePicker=e.Global.ItsaDateTimePicker},"@VERSION@",{requires:["base","node-base","node-screen","panel","calendar","dial","promise","cssbutton","datatype-date-format","dd-plugin"],skinnable:!0});
