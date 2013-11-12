YUI.add("gallery-itsalogin",function(e,t){"use strict";var n=e.ITSAMessageControllerClass,r=e.ITSAMessageController,i=e.ITSADialogClass,s=e.ITSADialog,o=e.Array,u=e.Intl,a="boolean",f="info",l="warn",c="error",h="_",p="ogin",d="l"+p,v="text",m="get",g=m+"L"+p,y="application",b="type",w="itsaicon-dialog-",E=w+f,S=w+"question",x="username",T="password",N="forgot",C="mail",k="e"+C,L="address",A=k+L,O=x+"or"+T,M=N+x,_=N+T,D=_+k,P=N+O,H="createaccount",B="send",j="reset",F=B+x,I="change",q=j+T,R=I+T,U="show"+T,z=T+I,W=z+"d",X="verify",V=X+T,$="verification"+c,J=I+"your"+T,K="verifyNewPassword",Q="message",G=Q+"resolve",Y="loggedin",Z="stay"+Y,et="_pub_"+Y,tt="gallery-itsalogin",nt="check",rt="receivedmailwithinstructions",it=nt+"spambox",st=nt+"mail",ot="classname",ut="primarybtnonenter",at="fullselect",ft="label",lt="placeholder",ct="required",ht="itsa",pt=ht+"-"+d,dt="dialog",vt=ht+dt,mt='<span class="itsa-messagewrapper">',gt='<fieldset class="'+pt+'">',yt="</span>",bt='<div class="pure-control-group">',wt="</div>",Et='<div class="itsa-',St="</fieldset>",xt="img",Tt="submit",Nt="btn_",Ct=Nt+Tt,kt="contentBox",Lt=xt+Nt,At="button",Ot=dt+"-"+N+At,Mt='input[name="',_t="itsabutton-iconleft",Dt='<i class="itsaicon-dialog',Pt="string",Ht,Bt,jt,Ft,It=function(t){if(typeof t=="string")try{return e.JSON.parse(t)}catch(n){return this.fire(c,{error:n,response:t,src:"parse"}),{}}return t||{}};n.prototype[h+g]=function(t,n,r,i){var o=this,u=s._intl,l=o._retrieveLoginParams(t,n,r,i),c,h,p,v,b,w,S,C,k,L,D,P,B,j,F,I;return t=l.title,n=l.message,r=l.config,b=l.syncPromise,B=r.createAccount instanceof e.LazyPromise&&r.createAccount,L=Ct,j=typeof r.required===a&&r.required||!1,I=typeof r.usernameIsEmail===a&&r.usernameIsEmail||!1,F=typeof r.showStayLoggedin===a&&r.showStayLoggedin||!1,C=typeof r.imageButtons===a&&r.imageButtons,w=r.regain,w&&I&&(w=T),D=w===O||w===x||w===T,k=D?"{"+Nt+N+"}":"",B&&(k+="{"+Nt+H+"}"),k+="{"+Ct+"}",C&&(k=k.replace(/\{btn_/g,"{"+Lt),L=L.replace(/btn_/g,Lt)),h=r.formconfigUsername||{},h[ft]||h[lt]||(h[ft]=u[I?A:x]),h[at]=!0,h[ut]=!1,h[ot]=pt+(h[ot]?" "+h[ot]:""),h[ct]=!0,p=r.formconfigPassword||{},p[ft]||p[lt]||(p[ft]=u[T]),p[at]=!0,p[ut]=!0,p[ot]=pt+(p[ot]?" "+p[ot]:""),p[ct]=!0,v=r.formconfigRemember||{},v.widgetconfig={primarybtnonenter:!0},h[ft]&&!p[ft]&&(p[ft]=" "),p[ft]&&!h[ft]&&(h[ft]=" "),v[ft]||(v[ft]=u[Z]),v.switchlabel=!0,S=typeof r.valueRemember===a&&r.valueRemember||!1,o.isReady().then(function(){var i;return c=e.Base.create("itsamessageinput",e.ITSAMessage,[],null,{ATTRS:{username:{value:r.valueUsername||"",formtype:I?"email":"text",formconfig:h,validator:r.validatorUsername,validationerror:r.validationerrorUsername},password:{value:r.valuePassword||"",formtype:T,formconfig:p,validator:r.validatorPassword,validationerror:r.validationerrorPassword},remember:{value:F&&S||!1,formtype:e.ITSACheckbox,formconfig:v}}}),n=mt+n+yt+gt+bt+"{"+x+"}"+wt+bt+"{"+T+"}"+wt+(F?Et+'login-checkbox">'+"{remember}"+wt:"")+St,i=new c,i.syncPromise=b,i._config=r,i.icon=r.icon||E,i.target=vt,i.title=t,i.message=n,i.footer=k,i.imageButtons=C,i.closeButton=!j,i.priority=r.priority,i.primaryButton=r.primaryButton||L,i.timeoutReject=r.timeoutReject,i.level=f,i.source=r.source||y,i.messageType=g,i._submitBtn=m+d,i.buttonLabels=[{buttonType:Ct,labelHTML:u[d]},{buttonType:xt+Ct,labelHTML:Dt+'-login"></i>'+u[d]}],i.customBtns=[],B&&i.customBtns.push(C?{buttonId:Lt+H,labelHTML:Dt+'-user"></i>'+u[H],config:{value:H,classname:_t}}:{buttonId:Nt+H,labelHTML:u[H],config:{value:H}}),D&&(i.customBtns.push(C?{buttonId:Lt+N,labelHTML:Dt+'-question"></i>'+u[N],config:{value:N,classname:_t}}:{buttonId:Nt+N,labelHTML:u[N],config:{value:N}}),i.on(G,function(t){t.attrs&&t.attrs.button===N&&(t.preventDefault(),P=w===O?jt(r):Bt(r,b),s._panels[f].focusInitialItem().then(null,function(){return!0}).then(function(){return P}).then(function(e){if(e.button===M)return Ht(r,b);if(e.button===_&&!I)return Bt(r,b)},function(t){t instanceof Error&&e.showError(t)}))})),B?o.queueMessage(i).then(function(e){return e.button===H?B.then():e}):o.queueMessage(i)})},n.prototype._retrieveLoginParams=function(t,n,r,i){var s=typeof n===Pt,o,u;return s||(i=r,r=n,n=t,t=null),o=typeof n===Pt,o||(i=r,r=n,n="",t=null),u=typeof r=="object",u||(i=r,r={}),typeof i=="function"||(i=function(){var t="no syncPromise defined";return new e.Promise(function(e,n){n(new Error(t))})}),{title:t,message:n,config:r,syncPromise:i}},i.prototype._intl=u.get(tt),i.prototype.translate=function(e){return this._intl[e]||e},Ft=function(t){var n=t._config,i=typeof n[K]===a&&n[K]||!0,o=s._intl,u,f,c,h,p,d,m;return f=n.formconfigPassword||{},f[ft]||f[lt]||(f[ft]=o[T]),f[at]=!0,f[ut]=!i,f[ot]=pt+(f[ot]?" "+f[ot]:""),f[ct]=!0,i&&(c=n.formconfigVerifyPassword||{},c[ft]||c[lt]||(c[ft]=o[X]),c[at]=!0,c[ut]=!0,c[ot]=pt+(f[ot]?" "+f[ot]:""),c[ct]=!0),h=n.formconfigShowPassword||{},h[ft]||h[lt]||(h[ft]=o[U]),h.switchlabel=!0,p=e.Base.create("itsamessagechangepw",e.ITSAMessage,[],{crossValidation:function(){var e=this,t=[];return i&&e.get(T)!==e.get(V)&&(t.push({attribute:T,validationerror:o[$]}),t.push({attribute:V,validationerror:o[$]})),t}},{ATTRS:{password:{formtype:T,formconfig:f,validator:n.validatorPassword,validationerror:n.validationerrorPassword},verifypassword:{formtype:T,formconfig:c,validator:n.validatorPassword,validationerror:n.validationerrorPassword},showpassword:{value:!1,formtype:e.ITSACheckbox,formconfig:h}}}),d=mt+(n.messageChangePassword||o.needchangepassword)+yt+gt+bt+"{"+T+"}"+wt+(i?bt+"{"+V+"}"+wt+Et+'login-checkbox">{'+U+"}"+wt:"")+St,u=new p,u.syncPromise=t.syncPromise,m=typeof n.imageButtons===a&&n.imageButtons,u.icon=n.iconquestion||E,u.title=n.titleChangePassword||o[J],u.message=d,u.level=l,u.config=n,u.target=vt,u.source=n.source||y,u.messageType=R,u.closeButton=t._config.closeButton||!0,u.footer="{"+(m?xt:"")+Ct+"}",u.primaryButton=(m?xt:"")+Ct,u._submitBtn=R,u.buttonLabels=[{buttonType:(m?xt:"")+Ct,labelHTML:(m?Dt+'-switch"></i>':"")+o[R]}],i&&(u.setLifeUpdate
(!0),u.after("showpasswordChange",function(e){var t=s._panels[l],n=t.get(kt).one(Mt+T+'"]'),r=t.get(kt).one(Mt+V+'"]'),i=e.newVal;n.setAttribute(b,i?v:T),r.setAttribute(b,i?v:T)})),r.queueMessage(u)},jt=function(t){var n=s._intl,i=typeof t.imageButtons===a&&t.imageButtons,o="<form>"+(t.messageForgotUsernameOrPassword||n[N+"what"])+Et+Ot+" "+vt+'-firstbutton">{'+(i?xt:"")+Nt+M+"}"+wt+Et+Ot+'">{'+(i?xt:"")+Nt+_+"}"+wt+"</form>",u=new e.ITSAMessage;return u.icon=t.iconquestion||S,u.title=t.titleForgotUsernameOrPassword||n[P],u.level=l,u._config=t,u.target=vt,u.source=t.source||y,u.messageType=P,u.message=o,u.closeButton=!0,i?u.customBtns=[{buttonId:Lt+M,labelHTML:Dt+'-user"></i>'+n[M],config:{value:M,classname:_t}},{buttonId:Lt+_,labelHTML:Dt+'-key"></i>'+n[_],config:{value:_,classname:_t}}]:u.customBtns=[{buttonId:Nt+M,labelHTML:n[M],config:{value:M}},{buttonId:Nt+_,labelHTML:n[_],config:{value:_}}],r.queueMessage(u)},Ht=function(t,n){var i,o,u,f,c,h;return h=s._intl,i=t.formconfigForgotUsername||{},i[ft]||i[lt]||(i[ft]=h[k]),i[at]=!0,i[ut]=!0,i[ot]=pt+(i[ot]?" "+i[ot]:""),i[ct]=!0,o=e.Base.create("itsamessageforgotun",e.ITSAMessage,[],null,{ATTRS:{emailaddress:{formtype:k,formconfig:i,validator:t.validatorForgotUsername,validationerror:t.validationerrorForgotUsername}}}),u=mt+(t.messageForgotUsername||h.entersignupaddress)+yt+gt+bt+"{"+A+"}"+wt+St,f=new o,f.syncPromise=n,c=typeof t.imageButtons===a&&t.imageButtons,f.icon=t.iconquestion||S,f.title=t.titleForgotUsername||h[M],f.message=u,f.level=l,f.config=t,f.target=vt,f.source=t.source||y,f.messageType=M,f._submitBtn=M,f.closeButton=!0,f.primaryButton=(c?xt:"")+Ct,f.footer="{"+(c?xt:"")+Ct+"}",f.buttonLabels=[{buttonType:(c?xt:"")+Ct,labelHTML:(c?Dt+'-mail"></i>':"")+h[F]}],r.queueMessage(f)},Bt=function(t,n){var i,o,u,f,c,h,p;return h=s._intl,p=typeof t.usernameIsEmail===a&&t.usernameIsEmail||!1,i=t.formconfigForgotPassword||{},i.label||i[lt]||(i.label=h[p?A:x]),i[at]=!0,i[ut]=!0,i[ot]=pt+(i[ot]?" "+i[ot]:""),i[ct]=!0,o=e.Base.create("itsamessageforgotpw",e.ITSAMessage,[],null,{ATTRS:{username:{formtype:p?"email":"text",formconfig:i,validator:t.validatorUsername,validationerror:t.validationerrorUsername}}}),u=mt+(t.messageForgotPassword||(p?h.retrievepasswordinstructionsmaillogin:h.retrievepasswordinstructions))+yt+gt+bt+"{"+x+"}"+wt+St,f=new o,f.syncPromise=n,c=typeof t.imageButtons===a&&t.imageButtons,f.icon=t.iconquestion||S,f.title=t.titleForgotPassword||h[_],f.message=u,f.level=l,f.config=t,f.target=vt,f.source=t.source||y,f.messageType=p?D:_,f._submitBtn=_,f.closeButton=!0,f.primaryButton=(c?xt:"")+Ct,f.footer="{"+(c?xt:"")+Ct+"}",f.buttonLabels=[{buttonType:(c?xt:"")+Ct,labelHTML:(c?Dt+'-mail"></i>':"")+h[q]}],r.queueMessage(f)},s.isRendered().then(function(){o.each([f,l],function(t){var n=s._panels[t];s._eventhandlers.push(n.on("*:submit",function(e){var t=e.target,n=t.messageType;(n===g||n===R||n===M||n===_||n===D)&&t._set(At,t._submitBtn)})),s._eventhandlers.push(n.after("*:submit",function(t){var r=t.target;t.promise.then(function(t){var i=It(t),o=s._intl,u=r.messageType,a,f,h,p,d;i&&i.status?(i.status==="ERROR"&&(f=i.message||o.unspecifiederror,e.showError(i.title||o[c],f),r.reject(f)),i.status==="OK"?(h=e.merge(i,r.toJSON()),r.resolve(h),u===g?(s[et]||(s[et]=e.publish(Y,{defaultTargetOnly:!0,emitFacade:!0,broadcast:2,preventable:!1})),s.fire(Y,h)):u===M||u===_||u===D?(d=r._config,f=d.instructionMessage||o[rt]+", "+o[it],p={level:l,target:vt,source:d.source||y,messageType:"instructions"},e.showMessage(p.instructionTitle||o[st],f,p)):u===z&&(d=r._config,f=d.passwordChangedMessage||o[W],p={level:l,target:vt,source:d.source||y,messageType:W},e.showMessage(p.passwordChangeTitle||o[z],f,p),r.resolve())):u===g&&i.status==="NOACCESS"?(f=i.message||o.loginblocked,e.showError(i.title||o[c],f),r.reject(f)):i.status!=="RETRY"||u!==g&&u!==M&&u!==_&&u!==D&&u!==R?u===g&&i.status==="CHANGEPASSWORD"?Ft(r).then(function(t){h=e.merge(i,r.toJSON(),{password:t.password}),r.resolve(h),s[et]||(s[et]=e.publish(Y,{defaultTargetOnly:!0,emitFacade:!0,broadcast:2,preventable:!1})),s.fire(Y,h)},function(){f=o.passwordnotchanged,e.showError(o[c],f)}):(f="Wrong response.status found: "+i.status,h={src:"Y.ITSALogin.submit()",msg:f},n.fire("warn",h),r.reject(f)):(i.title&&n.set("title",i.title),u===g&&(f=i.message||o.unknownlogin),u===R&&(f=i.message||o.passwordnotaccepted),u===_&&(f=i.message||o.unknownusername),u===D&&(f=i.message||o.unknownemail),u===M&&(f=i.message||o.unknownemail),f&&(a=n.get(kt),a.one(".itsa-messagewrapper").setHTML(f)))):(f="Response returned without response.status",h={src:"Y.ITSALogin.submit()",msg:f},n.fire("warn",h),r.reject(f))}).then(null,function(t){var n=t&&(t.message||t)||"Undefined error during submission";e.showWarning(n)})}))})}),e[d]=e.bind(r[h+g],r)},"@VERSION@",{requires:["yui-base","intl","base-build","promise","gallery-lazy-promise","gallery-itsamessagecontroller","gallery-itsacheckbox","gallery-itsadialog","gallery-itsamessage","gallery-itsaviewmodelpanel","gallerycss-itsa-base","gallerycss-itsa-animatespin","gallerycss-itsa-dialog"],lang:["ar","bg","bs","cs","da","de","en","es","fa","fi","fr","he","hi","hr","hu","it","ja","nb","nl","pl","pt","ru","sk","sr","sv","uk","zh"],skinnable:!0});
