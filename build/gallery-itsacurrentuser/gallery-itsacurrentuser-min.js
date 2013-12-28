YUI.add("gallery-itsacurrentuser",function(e,t){"use strict";function h(){h.superclass.constructor.apply(this,arguments)}var n=e.Array,r,i="logged",s=i+"in",o=i+"out",u="string",a=30,f=256320,l="currentuser",c=function(e,t){e.setTime(e.getTime()+6e4*t)};h.NAME="itsacurrentuser",e.ITSACurrentUserClass=e.extend(h,e.Model),h.prototype.sessionid=null,h.prototype.remember=null,h.prototype._expire=0,h.prototype.expireAfter=a,h.prototype.displayname=null,h.prototype.messageLoggedin=null,h.prototype._isLoggedin=!1,h.prototype.initializer=function(){var t=this,n=t._eventhandlers=[];n.push(e.after(s,function(e){var n=e.sessionid,r=e.remember||!1,i=e.expireAfter,s=e.displayname,o=e.messageLoggedin,a=e.userdata;typeof n===u&&n.length>0?t.dologin(n,r,i,s,o,a):t.dologout()})),n.push(e.after(o,e.bind(t.dologout,t))),n.push(e.after(["keydown","orientationchange","mousemove","mousedown","mousewheel"],e.bind(t.refreshState,t))),t._isReady=new e.Promise(function(e){t._loadUser().then(e,e)})},h.prototype.dologin=function(e,t,n,r,i,s){var o=this,u;o.sessionid=e,o.remember=t,o.displayname=r,o.messageLoggedin=i,o.setAttrs(s),o.expireAfter=n||(t?f:a),o._isLoggedin=!0,u=new Date,c(u,o.expireAfter),o._expire=u.getTime(),o._saveUser(u)},h.prototype.dologout=function(){var e=this;return e.reset(),e.set("id",undefined),e.sessionid=null,e.remember=!1,e.displayname=null,e.messageLoggedin=null,e._expire=0,e.expireAfter=a,e._isLoggedin=!1,e._clearUser()},h.prototype.getCurrent=function(){var e=this,t,n;return e.isReady().then(function(){e._isLoggedin&&(n=e._lastActiveTime?e._lastActiveTime.getTime():0,n+=6e4*e.expireAfter,t=new Date,n>t.getTime()||e.dologout());if(!e._isLoggedin)throw new Error("not loggedin");return t=t||new Date,c(t,e.expireAfter),e._expire=t.getTime(),e._saveUser(t),{sessionid:e.sessionid,remember:e.remember,expire:t,displayname:e.displayname,messageLoggedin:e.messageLoggedin,userdata:e.toJSON()}})},h.prototype.getSyncHeader=function(){return this.getCurrent().then(function(e){return{headers:{"X-Access-Token":e.sessionid}}},function(){return{}})},h.prototype.isReady=function(){return this._isReady},h.prototype.refreshState=function(){this._isLoggedin&&(this._lastActiveTime=new Date)},h.prototype.destructor=function(){this._clearEventhandlers()},h.prototype._clearEventhandlers=function(){n.each(this._eventhandlers,function(e){e.detach()})},h.prototype._clearUser=function(){return e.ITSAStorage.removeItem(l)},h.prototype._loadUser=function(){var t=this;return e.ITSAStorage.getItem(l).then(function(e){t.sessionid=e.sessionid,t.remember=e.remember,t.displayname=e.displayname,t.messageLoggedin=e.messageLoggedin,t.setAttrs(e.userdata),t._isLoggedin=!0,t.refreshState()},function(){return t.dologout()})},h.prototype._saveUser=function(t){var n=this,r={sessionid:n.sessionid,remember:n.remember,displayname:n.displayname,messageLoggedin:n.messageLoggedin,userdata:n.toJSON()};return e.ITSAStorage.setItem(l,r,t)},r=e.ITSACurrentUser=new e.ITSACurrentUserClass,e.Model.prototype.defSyncOptions=e.bind(r.getSyncHeader,r),e.ModelList.prototype.defSyncOptions=e.bind(r.getSyncHeader,r)},"@VERSION@",{requires:["yui-base","node-base","promise","gallery-itsastorage","gallery-itsamodelsyncpromise","gallery-itsamodellistsyncpromise"]});
