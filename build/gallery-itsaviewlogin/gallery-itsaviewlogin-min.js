YUI.add("gallery-itsaviewlogin",function(e,t){"use strict";function kt(){kt.superclass.constructor.apply(this,arguments)}var n=e.Lang,r="icon",i="message",s="model",o="formconfig",u="validator",a="validationerror",f="mail",l="e"+f,c="address",h=l+c,p="primarybtnonenter",d="fullselect",v="required",m="loggedin",g="stay"+m,y="sername",b="assword",w="emember",E="u"+y,S="p"+b,x="r"+w,T="U"+y,N="P"+b,C="R"+w,k=E+"IsEmail",L="sync",A="itsa",O="ogin",M="get",_=M+"L"+O,D="l"+O,P=M+D,H=A+"-"+D,B="label",j="placeholder",F="classname",I='<span class="itsa-messagewrapper">',q='<fieldset class="'+H+'">',R="</span>",U='<div class="pure-control-group">',z='<div class="pure-controls">',W='<div class="itsa-',X="</fieldset>",V="</div>",$="error",J="_pub_"+m,K="Change",Q="object",G="string",Y="boolean",Z="function",et="create",tt="ccount",nt="img",rt="submit",it="btn_",st=it+rt,ot=nt+it,ut=et+"a"+tt,at="btn_"+ut,ft=nt+at,lt=et+"A"+tt,ct="regain",ht=E+"or"+S,pt="forgot",dt="dialog",vt="imageButtons",mt='<i class="{icon}"></i>',gt="itsabutton-iconleft",yt='<i class="itsaicon-'+dt,bt="gallery",wt=bt+"css-itsa-",Et=wt+dt,St=wt+"form",xt=wt+"animatespin",Tt=bt+"-itsa-i18n-login",Nt=bt+"-itsa"+dt,Ct=function(t){if(typeof t=="string")try{return e.JSON.parse(t)}catch(n){return this.fire($,{error:n,response:t,src:"parse"}),{}}return t||{}};kt.NAME="itsaviewlogin",e.ITSAViewLogin=e.extend(kt,e.ITSAViewModel,{},{ATTRS:{createAccount:{value:null,validator:function(t){return t instanceof e.LazyPromise}},editable:{value:!0,readOnly:!0},formconfigPassword:{value:{},validator:function(e){return typeof e===Q},initOnly:!0},formconfigRemember:{value:{},validator:function(e){return typeof e===Q},initOnly:!0},formconfigUsername:{value:{},validator:function(e){return typeof e===Q},initOnly:!0},icon:{value:null,validator:function(e){return typeof e===G}},imageButtons:{value:!1,validator:function(e){return typeof e===Y},initOnly:!0},message:{value:null,validator:function(e){return typeof e===G}},model:{readOnly:!0},partOfMultiView:{value:!1,readOnly:!0},password:{value:""},regain:{value:null,validator:function(e){return e===null||e===ht||e===E||e===S},initOnly:!0},remember:{value:!1},showStayLoggedin:{value:!1,initOnly:!0},sync:{value:null,validator:function(e){return typeof e===Z}},template:{readOnly:!0,getter:"_getterTemplate"},username:{value:""},usernameIsEmail:{value:!1,initOnly:!0},validationerrorPassword:{value:null,validator:function(e){return e===null||typeof e===G},initOnly:!0},validationerrorUsername:{value:null,validator:function(e){return e===null||typeof e===G},initOnly:!0},validatorPassword:{value:null,validator:function(e){return e===null||typeof e===Z},initOnly:!0},validatorUsername:{value:null,validator:function(e){return e===null||typeof e===Z},initOnly:!0}}}),kt.prototype.initializer=function(){var t=this,n=t._eventhandlers,r;r=t._loginintl,t.get(vt)?(t.setButtonLabel(ot+rt,yt+'-login"></i>'+r[D]),t.setPrimaryButton(ot+rt),e.usePromise("gallerycss-itsa-dialog","gallerycss-itsa-form","gallerycss-itsa-animatespin")):(t.setButtonLabel(st,r[D]),t.setPrimaryButton(st)),t._defineModel(),n.push(t.after(E+K,function(e){t.get(s).set(E,e.newVal)})),n.push(t.after(S+K,function(e){t.get(s).set(S,e.newVal)})),n.push(t.after(x+K,function(e){t.get(s).set(x,e.newVal)})),n.push(t.after(L+K,function(e){t.get(s)[L+"Promise"]=e.newVal})),n.push(e.after(m,function(e){console.log("subdcriber "+m)})),n.push(t.after("*:submit",function(n){var r=n.target;n.currentTarget===t&&n.promise.then(function(n){var i=Ct(n),s=t._loginintl,o=r.messageType,u,a;i&&i.status?(console.log(i.status+" "+i.message),i.status==="ERROR"&&(u=i.message||s.unspecifiederror,e.showError(i.title||s[$],u)),i.status==="OK"?(a=e.merge(i,r.toJSON()),console.log("firein "+m),e.fire(m,a),(u=i.message)&&e.showMessage(i.title,u)):o===_&&i.status==="NOACCESS"?(u=i.message||s.loginblocked,e.usePromise(Nt).then(function(){e.showError(i.title||s[$],u)})):i.status==="RETRY"?(u=i.message||s.unknownlogin,e.usePromise(Nt).then(function(){e.showWarning(i.title||s[$],u)})):i.status!=="CHANGEPASSWORD"&&(u="Wrong response.status found: "+i.status,a={src:"Y.ITSALogin.submit()",msg:u},t.fire("warn",a))):(u="Response returned without response.status",a={src:"Y.ITSALogin.submit()",msg:u},t.fire("warn",a))}).then(null,function(t){var n=t&&(t.message||t)||"Undefined error during submission";e.usePromise(Nt).then(function(){e.showWarning(n)})})}))},kt.prototype.getLogin=function(){},kt.prototype.renderOnReady=function(){var t=this;return e.usePromise(Et,St,xt).then(function(){t.render()})},kt.prototype._defineModel=function(){var t=this,n=t._loginintl,r=t.get(k),i=t.get(vt),f=[],l,c,m,y,b;c=t.get(o+T),c[B]||c[j]||(c[B]=n[r?h:E]),c.initialfocus=!0,c[d]=!0,c[p]=!1,c[F]=H+(c[F]?" "+c[F]:""),c[v]=!0,m=t.get(o+N),m[B]||m[j]||(m[B]=n[S]),m[d]=!0,m[p]=!0,m[F]=H+(m[F]?" "+m[F]:""),m[v]=!0,y=t.get(o+C),y.widgetconfig={primarybtnonenter:!0},c[B]&&!m[B]&&(m[B]=" "),m[B]&&!c[B]&&(c[B]=" "),y[B]||(y[B]=n[g]),y.switchlabel=!0,t.get(ct)&&f.push(i?{buttonId:ot+pt,labelHTML:yt+'-question"></i>'+n[pt],config:{value:pt,classname:gt}}:{buttonId:it+pt,labelHTML:n[pt],config:{value:pt}}),t.get(lt)&&f.push(i?{buttonId:ot+ut,labelHTML:yt+'-user"></i>'+n[ut],config:{value:ut,classname:gt}}:{buttonId:at,labelHTML:n[ut],config:{value:ut}}),f.length>0&&t.addCustomBtns(f),l=e.Base.create("itsaviewloginmodel",e.ITSAFormModel,[],null,{ATTRS:{username:{value:t.get(E),formtype:r?"email":"text",formconfig:c,validator:t.get(u+T),validationerror:t.get(a+T)},password:{value:t.get(S),formtype:S,formconfig:m,validator:t.get(u+N),validationerror:t.get(a+N)},remember:{value:t.get(x),formtype:e.ITSACheckbox,formconfig:y},button:{value:P,writeOnce:"initOnly"}}}),b=new l,b.setSyncMessage(rt,n.attemptlogin),t._set(s,b),b.addTarget(t),b.syncPromise=t.get(L),t._setTemplateRenderer(!0)},kt.prototype._getterTemplate=function(){var e=this;return e._loggedin?e._loggedoutTemplate():e._loggedinTemplate()},kt.prototype._loggedinTemplate=function(
){var e=this,t=e.get(r),s=e.get(vt),o;return s?(o=e.get(ct)?"{"+ot+pt+"}":"",e.get(lt)&&(o+="{"+ft+"}"),o+="{"+ot+rt+"}"):(o=e.get(ct)?"{"+it+pt+"}":"",e.get(lt)&&(o+="{"+at+"}"),o+="{"+st+"}"),(t?n.sub(mt,{icon:t}):"")+I+(e.get(i)||"")+R+q+U+"{"+E+"}"+V+U+"{"+S+"}"+V+(e.get("showStayLoggedin")?W+'login-checkbox pure-controls">'+"{remember}"+V:"")+z+o+V+X},kt.prototype._loggedoutTemplate=function(){console.log("_loggedoutTemplate");var e=this,t=e.get(r),s=e.get(vt),o;return s?o+="{"+ot+rt+"}":o+="{"+st+"}",console.log("_loggedoutTemplate 2"),(t?n.sub(mt,{icon:t}):"")+I+(e.get(i)||"")+R+q+z+o+V+X},kt.prototype._loginintl=e.Intl.get(Tt)},"@VERSION@",{requires:["yui-base","intl","base-build","gallery-itsaformmodel","gallery-itsaviewmodel","gallery-itsacheckbox","gallery-itsa-i18n-login","gallery-itsamodelsyncpromise","gallery-itsamodulesloadedpromise","gallery-lazy-promise"],skinnable:!0});
