YUI.add("gallery-itsaviewlogin",function(e,t){"use strict";function tn(){tn.superclass.constructor.apply(this,arguments)}var n=e.Lang,r=500,i="icon",s="message",o="model",u="config",a="form"+u,f="Regain",l=f+"Un",c=f+"Pw",h=l+"Pw",p="validator",d="validationerror",v="mail",m="e"+v,g="address",y=m+g,b="button",w="primarybtnonenter",E="fullselect",S="required",x="logged",T=x+"in",N=x+"out",C="simplified",k="stay"+T,L="sername",A="assword",O="emember",M="u"+L,_="p"+A,D="r"+O,P="U"+L,H="P"+A,B="R"+O,j=M+"IsEmail",F="sync",I="itsa",q="ogin",R="ogout",U="get",z="messageLoggedin",W=U+"L"+q,X="l"+q,V="l"+R,$=i+"L"+q,J=i+"L"+R,K=U+X,Q=I+"-"+X,G="Template",Y=X+G,Z=V+G,et="label",tt="placeholder",nt="classname",rt='<span class="itsa-messagewrapper">',it='<span class="itsa-buttonwrapper itsa-buttonwrappersize-{size}">',st='<fieldset class="'+Q+'">',ot="</span>",ut='<div class="pure-control-group">',at='<div class="pure-controls">',ft='<div class="itsa-',lt="</fieldset>",ct="</div>",ht="error",pt="Change",dt="object",vt="string",mt="boolean",gt="function",yt="create",bt="ccount",wt="img",Et="submit",St="forgot",xt="btn_",Tt=xt+Et,Nt=wt+xt,Ct=yt+"a"+bt,kt="btn_"+Ct,Lt=yt+"A"+bt,At="regain",Ot=M+"or"+_,Mt=St+M,_t=St+_,Dt="dialog",Pt="destroyed",Ht="imageButtons",Bt='<i class="itsa-mainicon {icon} itsa-iconsize-{size}"></i>',jt=I+"button-iconleft",Ft=I+"button-textbottom",It='<i class="itsaicon-'+Dt,qt="container",Rt="small",Ut="large",zt="gallery",Wt=zt+"css-itsa-",Xt=Wt+Dt,Vt=Wt+"form",$t=Wt+"animatespin",Jt=zt+"-"+I+"-i18n-login",Kt=zt+"-"+I+Dt,Qt=zt+"-"+I+X,Gt=I+"view"+X,Yt=Gt+"-"+x+"in",Zt=Gt+"-"+x+"out",en=function(t){if(typeof t=="string")try{return e.JSON.parse(t)}catch(n){return this.fire(ht,{error:n,response:t,src:"parse"}),{}}return t||{}};tn.NAME="itsaviewlogin",e.ITSAViewLogin=e.extend(tn,e.ITSAViewModel,{},{ATTRS:{configChangePassword:{value:{},validator:function(e){return typeof e===dt}},configRegainPw:{value:{},validator:function(e){return typeof e===dt},getter:function(t){return e.merge(t,{usernameIsEmail:this.get(j)})}},configRegainUn:{value:{},validator:function(e){return typeof e===dt},getter:function(t){return e.merge(t,{usernameIsEmail:this.get(j)})}},configRegainUnPw:{value:{},validator:function(e){return typeof e===dt}},createAccount:{value:null,validator:function(e){return typeof e===gt}},editable:{value:!0,readOnly:!0},formconfigPassword:{value:{},validator:function(e){return typeof e===dt},initOnly:!0},formconfigRemember:{value:{},validator:function(e){return typeof e===dt},initOnly:!0},formconfigUsername:{value:{},validator:function(e){return typeof e===dt},initOnly:!0},iconLogin:{value:null,validator:function(e){return e===null||typeof e===vt}},iconLogout:{value:null,validator:function(e){return e===null||typeof e===vt}},imageButtons:{value:!1,validator:function(e){return typeof e===mt},initOnly:!0},loginTemplate:{value:null,validator:function(e){return e===null||typeof e===vt}},logoutTemplate:{value:null,validator:function(e){return e===null||typeof e===vt}},message:{value:null,validator:function(e){return typeof e===vt}},messageLoggedin:{value:null,validator:function(e){return typeof e===vt}},model:{readOnly:!0},partOfMultiView:{value:!1,readOnly:!0},regain:{value:null,validator:function(e){return e===null||e===Ot||e===M||e===_},initOnly:!0},showStayLoggedin:{value:!1,initOnly:!0},simplified:{value:!1,validator:function(e){return typeof e===mt},initOnly:!0},sync:{value:null,validator:function(e){return typeof e===gt}},template:{readOnly:!0,getter:"_getterTempl"},usernameIsEmail:{value:!1,initOnly:!0},validationerrorPassword:{value:null,validator:function(e){return e===null||typeof e===vt},initOnly:!0},validationerrorUsername:{value:null,validator:function(e){return e===null||typeof e===vt},initOnly:!0},validatorPassword:{value:null,validator:function(e){return e===null||typeof e===gt},initOnly:!0},validatorUsername:{value:null,validator:function(e){return e===null||typeof e===gt},initOnly:!0}}}),tn.prototype.initializer=function(){var t=this,n=t._eventhandlers,i;t._loggedin=!1,t.get(qt).addClass(Gt),i=t._loginintl,t._setSubmitButtons(!0),t.get(Ht)&&e.usePromise(Xt,Vt,$t),t._defineModel(),t.get(C)&&e.later(r,null,function(){e.use(Qt)}),n.push(t.after(M+pt,function(e){t.get(o).set(M,e.newVal)})),n.push(t.after(_+pt,function(e){t.get(o).set(_,e.newVal)})),n.push(t.after(D+pt,function(e){t.get(o).set(D,e.newVal)})),n.push(t.after(F+pt,function(n){var r=t.get(o);r[F+"Promise"]=e.bind(n.newVal,r)})),n.push(t.on("buttonclick",function(n){var r=n.value;r===St?e.usePromise(Qt).then(function(){var n=e.ITSADialog,r=t.get(At),i=t.get(F);t.focusInitialItem().then(null,function(){return!0}).then(function(){return r===Ot?n._regainFn_UnPw(t.get(u+h)):!0}).then(function(e){if(e.button===Mt||r===M)return n._regainFn_Un(t.get(u+l),i);if(e.button===_t||r===_)return n._regainFn_Pw(t.get(u+c),i)},function(t){t instanceof Error&&e.showError(t.message)})}):r===Ct?t.get(Lt)(t.get(F)).then(function(n){var r=en(n),s,o;r.status==="LOGIN"?(s=r,e.fire(T,s),(o=r.message)&&e.showMessage(r.title,o)):r.status==="ERROR"?(o=r.message||i.unspecifiederror,e.usePromise(Kt).then(function(){e.showError(r.title||i[ht],o)})):r.status!=="OK"&&(o="Wrong response.status found: "+r.status,s={src:"Y.ITSAViewLogin.createAccount()",msg:o},t.fire("warn",s))},function(t){t instanceof Error&&e.showError(t.message)}):r===X&&e.usePromise(Qt).then(function(){return e.getLogin("Login","Please enter login",t.get(F))})})),n.push(e.after(T,function(e){t.get(Pt)||(t._buildLogoutView(e.displayname,e.messageLoggedin),t.render())})),n.push(e.on(N,function(){t.get(Pt)||(t._buildLoginView(),t.render())})),n.push(t.on("*:submit",function(n){var r=n.target,i=r.get("button")===V;n.currentTarget===t&&(n.promise._logout=i,i&&e.fire(N))})),n.push(t.after("*:submit",function(n){var r=n.target,i=n.promise;n.currentTarget===t&&i.then(function(n){var s=en(n),o=t._loginintl,a=r.messageType,f,l;s&&s.status&&!i._logout?s.status==="ERROR"?(f=s.message||
o.unspecifiederror,e.usePromise(Kt).then(function(){e.showError(s.title||o[ht],f)})):s.status==="OK"?(l=e.merge(s,r.toJSON()),e.fire(T,l),(f=s.message)&&e.showMessage(s.title,f)):a===W&&s.status==="NOACCESS"?(f=s.message||o.loginblocked,e.usePromise(Kt).then(function(){e.showError(s.title||o[ht],f)})):s.status==="RETRY"?(f=s.message||o.unknownlogin,e.usePromise(Kt).then(function(){e.showWarning(s.title||o[ht],f)})):s.status==="CHANGEPASSWORD"?e.usePromise(Qt).then(function(){e.ITSADialog._changePwFn(t.get(u+pt+H),t.get(F)).then(function(t){var n=en(t);l=e.merge(s,n,r.toJSON(),{password:t.password}),e.fire(T,l),(f=s.message)&&e.showMessage(s.title,f)},function(t){f=o.passwordnotchanged,e.showError(o[ht],f)})}):(f="Wrong response.status found: "+s.status,l={src:"Y.ITSAViewLogin.submit()",msg:f},t.fire("warn",l)):(f="Response returned without response.status",l={src:"Y.ITSAViewLogin.submit()",msg:f},t.fire("warn",l))}).then(null,function(t){var n=t&&(t.message||t)||"Undefined error during submission";e.usePromise(Kt).then(function(){e.showWarning(n)})})}))},tn.prototype.isReady=function(){var t=this;return e.usePromise(Xt,Vt,$t).then(function(){var n=e.ITSACurrentUser,r;return n?r=n.getCurrent().then(function(e){var n=t.get(o);n.set(M,e[M],{silent:!0}),n.set(_,e[_],{silent:!0}),n.set(D,e[D],{silent:!0}),t._buildLogoutView(e.displayname,e.messageLoggedin)},function(){t._buildLoginView()}):t._buildLoginView(),n?r:!0})},tn.prototype.render=function(){var e=this;return e.isReady().then(null,function(){return!0}).then(function(){e.constructor.superclass.render.call(e)}),e},tn.prototype._buildLoginView=function(){var e=this,t=e._loginintl,n=e.get(o);e._loggedin=!1,e._displayname=null,e.get(qt).addClass(Zt),e.get(qt).removeClass(Yt),e._setSubmitButtons(!0),n._set(b,K),n.setSyncMessage(Et,t.attemptlogin),e._setTemplateRenderer(!0)},tn.prototype._buildLogoutView=function(e,t){var n=this,r=n._loginintl,i=n.get(o);n._loggedin=!0,n._displayname=e,n.get(qt).addClass(Yt),n.get(qt).removeClass(Zt),t&&n.set(z,t),n._setSubmitButtons(!1),i._set(M,""),i._set(_,""),i._set(D,!1),i._set(b,V),i.setSyncMessage(Et,r.loggingout),n._setTemplateRenderer(!1)},tn.prototype._defComprLoginTempl=function(){return"{"+xt+X+"}"},tn.prototype._defComprLogoutTempl=function(){return this._defLogoutTempl("")},tn.prototype._defineModel=function(){var t=this,n=t._loginintl,r=t.get(j),i=t.get(Ht),s=[],u,f,l,c,h;f=t.get(a+P),f[et]||f[tt]||(f[et]=n[r?y:M]),f.initialfocus=!0,f[E]=!0,f[w]=!1,f[nt]=Q+(f[nt]?" "+f[nt]:""),f[S]=!0,l=t.get(a+H),l[et]||l[tt]||(l[et]=n[_]),l[E]=!0,l[w]=!0,l[nt]=Q+(l[nt]?" "+l[nt]:""),l[S]=!0,c=t.get(a+B),c.widgetconfig={primarybtnonenter:!0},f[et]&&!l[et]&&(l[et]=" "),l[et]&&!f[et]&&(f[et]=" "),c[et]||(c[et]=n[k]),c.switchlabel=!0,t.get(At)&&s.push(i?{buttonId:Nt+St,labelHTML:It+'-question"></i>'+n[St],config:{value:St,classname:jt}}:{buttonId:xt+St,labelHTML:n[St],config:{value:St}}),t.get(Lt)&&s.push(i?{buttonId:Nt+Ct,labelHTML:It+'-user"></i>'+n[Ct],config:{value:Ct,classname:jt}}:{buttonId:kt,labelHTML:n[Ct],config:{value:Ct}}),t.get(C)&&s.push(i?{buttonId:Nt+X,labelHTML:It+'-login"></i>'+n[X],config:{value:X,classname:jt+" "+Ft}}:{buttonId:xt+X,labelHTML:n[X],config:{value:X,classname:Ft}}),s.length>0&&t.addCustomBtns(s),u=e.Base.create("itsaviewloginmodel",e.ITSAFormModel,[],null,{ATTRS:{username:{value:"",formtype:r?"email":"text",formconfig:f,validator:t.get(p+P),validationerror:t.get(d+P)},password:{value:"",formtype:_,formconfig:l,validator:t.get(p+H),validationerror:t.get(d+H)},remember:{value:!1,formtype:e.ITSACheckbox,formconfig:c},button:{value:K,writeOnce:"initOnly"}}}),h=new u,h.setSyncMessage(Et,n.attemptlogin),t._set(o,h),h.addTarget(t),h.syncPromise=e.bind(t.get(F),h),t._setTemplateRenderer(!0)},tn.prototype._defLoginTempl=function(){var e=this,t;return t=e.get(At)?"{"+xt+St+"}":"",e.get(Lt)&&(t+="{"+kt+"}"),t+="{"+Tt+"}",rt+(e.get(s)||"")+ot+st+ut+"{"+M+"}"+ct+ut+"{"+_+"}"+ct+(e.get("showStayLoggedin")?ft+'login-checkbox pure-controls">'+"{remember}"+ct:"")+at+t+ct+lt},tn.prototype._defLogoutTempl=function(e){var t=this,r=t._displayname,i=t.get(J),s=t.get(C),o=t.get(z)||(r?t._loginintl.youareloggedinas:t._loginintl.youareloggedin),u=r||"",a="{"+Tt+"}";return'<form class="pure-form'+e+'">'+(!t.get(Z)&&i?n.sub(Bt,{icon:i,size:s?Rt:Ut}):"")+rt+n.sub(o,{displayname:u})+ot+n.sub(it,{size:s?Rt:Ut})+a+ot+"</form>"},tn.prototype._getterTempl=function(){var e=this,t=e._loggedin?e._logoutTempl():e._loginTempl();return e.get(Ht)?t.replace(/\{btn_/g,"{"+Nt):t},tn.prototype._loginintl=e.Intl.get(Jt),tn.prototype._loginTempl=function(){var e=this,t=e.get(C),r=e.get($);return(r?n.sub(Bt,{icon:r,size:t?Rt:Ut}):"")+(e.get(Y)||(t?e._defComprLoginTempl():e._defLoginTempl()))},tn.prototype._logoutTempl=function(){var e=this,t=e.get(C),r=e.get(Z),i=e.get(J);return(i&&r?n.sub(Bt,{icon:i,size:t?Rt:Ut}):"")+(r||(t?e._defComprLogoutTempl():e._defLogoutTempl(" itsaviewlogin-non"+C)))},tn.prototype._setSubmitButtons=function(e){var t=this,n=e?X:V,r=t._loginintl;t.get(Ht)?(t._loggedin?t.removePrimaryButton():t.setPrimaryButton(Nt+Et),t.setButtonLabel(Nt+Et,It+"-"+n+'"></i>'+r[n])):(t._loggedin?t.removePrimaryButton():t.setPrimaryButton(Tt),t.setButtonLabel(Tt,r[n]))}},"@VERSION@",{requires:["yui-base","intl","base-build","promise","gallery-itsaformmodel","gallery-itsaviewmodel","gallery-itsacheckbox","gallery-itsa-i18n-login","gallery-itsamodelsyncpromise","gallery-itsamodulesloadedpromise"],skinnable:!0});
