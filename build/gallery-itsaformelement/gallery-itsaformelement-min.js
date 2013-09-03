YUI.add("gallery-itsaformelement",function(e,t){"use strict";var n,r,i,s=e.Array,o=e.Lang,u=e.one("body"),a=a,f="disabled",l="itsa-widget-parent",c="pure",h="button",p=c+"-"+h,d="date",v="time",m=d+v,g=p+"-"+m,y=p+"-"+f,b=p+"-primary",w="modelattribute",E="hideatstartup",S="itsa-invisible",x="error",T="boolean",N="picker",C="click",k="itsa-icon",L=k+d,A=k+v,O=k+m,M=' data-formelement="true"',_='<span class="format',D="</span>",P="^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}$",H="[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)+(/[\\w-]+)*",B="^(http://)?"+H,j="^(https://)?"+H,F="^(https?://)?"+H,I="^(([-]?[1-9][0-9]*)|0)$",q="^[-]?(([1-9][0-9]*)|0)(\\.[0-9]+)?$",R='<label for="',U="</label>",z="text",W="password",X="email",V="url",$="radio",J="checkbox",K="hidden",Q="textarea",G="div",Y="label",Z="span",et="plain",tt="initialfocus",nt="fullselect",rt="number",it=c+"-"+$,st=c+"-"+J,ot="readonly",ut="checked",at="required",ft="name",lt="value",ct="placeholder",ht="pattern",pt="data",dt="class",vt="labelHTML",mt="switch",gt=mt+"ed",yt=mt+Y,bt=mt+lt,wt=Y+pt,Et=lt+gt,St=lt+"non"+gt,xt="focusable",Tt="{"+f+"}",Nt="{"+ot+"}",Ct="{"+ut+"}",kt="{"+at+"}",Lt="{"+ft+"}",At="{"+lt+"}",Ot="{"+ct+"}",Mt="{"+ht+"}",_t="{"+pt+"}",Dt="{"+dt+"}",Pt="{"+K+"}",Ht='id="{id}"',Bt="{"+Et+"}",jt="{"+St+"}",Ft="{"+wt+"}",It="{"+vt+"}",qt="{"+xt+"}",Rt="type",Ut="submit",zt="reset",Wt="<input "+Rt+'="',Xt="<"+h+" "+Rt+'="',Vt=dt+ft,$t=Y+"Class"+ft,Jt="widget",Kt="{"+Rt+"}",Qt=' data-labeldatetime="true"',Gt=pt+"-"+m+"=",Yt=pt+"-"+h+Rt,Zt=pt+"-"+h+"sub"+Rt,en="<"+Z+" "+Ht+">UNDEFINED ELEMENTTYPE</"+Z+">",tn="<"+Z+" "+Ht+Lt+_t+Pt+Dt+">"+At+"</"+Z+">",nn=Wt+z+'" '+Ht+Lt+At+Ot+Tt+kt+Nt+Mt+_t+qt+Pt+Dt+" />",rn=Wt+W+'" '+Ht+Lt+At+Ot+Tt+kt+Nt+Mt+_t+qt+Pt+Dt+" />",sn=Wt+X+'" '+Ht+Lt+At+Ot+Tt+kt+Nt+_t+qt+Pt+Dt+Mt+" />",on=Wt+V+'" '+Ht+Lt+At+Ot+Tt+kt+Nt+_t+qt+Pt+Dt+Mt+" />",un=Wt+z+'" '+Ht+Lt+At+Ot+Tt+kt+Nt+_t+qt+Pt+Dt+Mt+" />",an=Wt+$+'" '+Ht+Lt+At+Tt+Ct+_t+qt+Pt+Dt+" />",fn=Wt+J+'" '+Ht+Lt+At+Tt+Nt+Ct+_t+qt+Pt+Dt+" />",ln=Wt+K+'" '+Ht+Lt+At+" />",cn="<"+Q+" "+Ht+Lt+Ot+Tt+kt+Nt+_t+qt+Pt+Dt+">"+At+"</"+Q+">",hn=jt+"<"+G+" "+Ht+Lt+Pt+_t+qt+Dt+"></"+G+">"+Bt,pn=Xt+Kt+'" '+Ht+Lt+At+_t+qt+Pt+Dt+">"+It+"</"+h+">",dn=jt+Xt+h+'" '+Ht+Lt+At+Pt+kt+Qt+Nt+" "+Gt+'"'+d+'"'+_t+qt+Dt+"><i "+dt+'="'+L+'"></i></'+h+">"+Bt,vn=jt+Xt+h+'" '+Ht+Lt+At+Pt+kt+Qt+Nt+" "+Gt+'"'+v+'"'+_t+qt+Dt+"><i "+dt+'="'+A+'"></i></'+h+">"+Bt,mn=jt+Xt+h+'" '+Ht+Lt+At+Pt+kt+Qt+Nt+" "+Gt+'"'+m+'"'+_t+qt+Dt+"><i "+dt+'="'+O+'"></i></'+h+">"+Bt,gn={widget:hn,plain:tn,text:nn,password:rn,email:sn,url:on,number:un,radio:an,checkbox:fn,hidden:ln,textarea:cn,button:pn,reset:pn,submit:pn,date:dn,time:vn,datetime:mn},yn=function(t,n,r,i,s,o,u,a){var f=s?" "+s:"",l=u?" "+S:"",c=typeof n=="string"&&n.length>0?" formattime-"+n:"";return i||(t==="date"?i="%x":t==="time"?i="%X":i="%x %X"),e.use("gallery-itsadatetimepicker"),_+"value"+c+f+l+'" data-for="'+a+'"'+f+o+">"+e.Date.format(r,{format:i})+D},bn=/\{\s*([^|}]+?)\s*(?:\|([^}]*))?\s*\}/g,wn=function(t,n){return t.replace?t.replace(bn,function(t,r){return e.Lang.isUndefined(n[r])?"":n[r]}):t};n=e.ITSAFormElement={},n.getElement=function(t,r,i){var s,o,u,a;i=i||e.guid(),r=r||{},o=typeof t=="function"&&t.NAME,typeof t=="string"&&(t=t.toLowerCase()),s={type:t,nodeid:i,config:r,name:r.name,html:n._renderedElement(o?t.NAME:t,r,i,o)};if(o){u=t;try{a=s.widget=new u(r.widgetconfig),t.NAME==="editorBase"?e.use("gallery-itsaeditorrenderpromise",function(){a.renderOnAvailable("#"+i)}):e.use("gallery-itsawidgetrenderpromise",function(){a.renderOnAvailable("#"+i)})}catch(f){e.fire(x,f)}}return s},n._renderedElement=function(t,n,r,i){var s=e.merge(n),u=typeof s[yt]===T?s[yt]:!1,a=typeof s[xt]===T?s[xt]:!0,c=typeof s[nt]===T?s[nt]:!1,x=typeof s[E]===T?s[E]:!1,N=n.tooltip,C=n.tooltipinvalid,k=n.nossl,L=n.onlyssl,A=n.digits,O=n[lt],H=n[w],G=n[bt],Z=n[pt],mt=M,gt=t===d||t===v||t===m,Tt,Nt,Ct,kt,Lt,At,Ot,Mt,_t,Dt,Ht,Bt;return Z&&(mt+=" "+Z),H&&(mt+=" data-"+w+'="true"'),s[pt]=mt,N&&(N=N.replace(/"/g,"''"),s[pt]+=' data-content="'+N+'" data-contentvalid="'+N+'"'),C&&typeof C=="string"&&C.length>0&&(s[pt]+=' data-contentinvalid="'+C.replace(/"/g,"''")+'"'),n[tt]&&(s[pt]+=" data-"+tt+'="true"'),n[ft]&&(s[ft]=" "+ft+'="'+s[ft]+'"'),At=typeof n[K]===T?n[K]:!1,s[K]=At?" "+K+'="'+K+'"':"",i?(s[pt]+=' data-type="'+t+'"',s[dt]=' class="'+(n[Vt]||"")+" "+l+(x?" "+S:"")+'"',n[Y]&&(s[wt]=s[wt]||"",s[wt]+=' data-widgetlabel="true"'),s[xt]=a?" data-"+xt+'="true"':"",t==="slider"&&(s[G?Et:St]=_+"value formatslider-"+n.name+(n[Vt]?" "+n[Vt]:"")+'" data-for="'+r+'"'+s[K]+">"+O+D),t=Jt):(Ot=typeof s[f]===T?s[f]:!1,Mt=!n["remove"+at]&&(typeof s[at]===T?s[at]:t===W),Ht=typeof s[ot]===T?s[ot]:!1,s[xt]=a?" data-"+xt+'="true"':"",s[f]=Ot?" "+f+'="'+f+'"':"",s[at]=Mt?" "+at+'="'+at+'"':"",s[ot]=Ht?" "+ot+'="'+ot+'"':"",n[ct]&&(s[ct]=" "+ct+'="'+s[ct]+'"'),n[ht]&&(s[ht]=" "+ht+'="'+s[ht]+'"'),t!==Q&&t!==et&&O&&(s[lt]=" "+lt+'="'+s[lt]+'"'),t===X?s[ht]=" "+ht+'="'+P+'"':t===V?typeof k===T&&k?s[ht]=" "+ht+'="'+B+'"':typeof L===T&&L?s[ht]=" "+ht+'="'+j+'"':s[ht]=" "+ht+'="'+F+'"':t===rt?s[ht]=" "+ht+'="'+(typeof A===T&&A?q:I)+'"':t===$||t===J?(Lt=t===$?it:st,_t=typeof s[ut]===T?s[ut]:!1,s[ut]=_t?" "+ut+'="'+ut+'"':"",s[f]=Ot?" "+f+'="'+f+'"':""):t===h||t===Ut||t===zt?(delete s[Y],Dt=!0,s[Rt]=t,s[pt]+=" data-"+h+Rt+'="'+(n[h+Rt]||t)+'"',Ct=n.primary,Nt=Ot,n[vt]||(s[vt]=O||t),s[lt]||(s[lt]=" "+lt+'="'+s[vt]+'"')):gt&&(o.isDate(O)||(O=new Date),Dt=!0,Nt=Ot,s[lt]=' value="'+O.getTime()+'"',s[pt]+=" data-"+m+'picker="true"',s[G?Et:St]=yn(t,n.name||"",O,s.format,n[Vt],s[K],x,r)),n.removepattern&&s[ht]&&(s[pt]+=" data-"+ht+"="+s[ht].substr(9),delete s[ht]),c&&(t===z||t===rt||t===W||t===Q||t===X||t===V)&&(s[pt]+=" data-"+nt+'="true"'),(n[Vt]||Dt||x||gt)&&(s[dt]=' class="'+(gt?"":n[Vt]||"")+(Dt?" "+p:"")+(gt?" "+g:"")+(Nt?" "+y:"")+(Ct?" "+b:"")+(x?" "+S:"")+'"')),kt=gn[t]||en,s[Y]&&(Lt?(s[Y]='<span class="formatlabel">'+s[Y]+D,Tt=' class="'+Lt+(n[$t
]?" "+n[$t]:"")+'"',kt=R+'{id}"'+Pt+Ft+Tt+">"+(u?kt+"{label}":"{label}"+kt)+U):(Tt=n[$t]?' class="'+n[$t]+'"':"",Bt=(gt?"<"+Y:R+'{id}"')+Pt+Ft+Tt+">{label}"+U,u?kt+=Bt:kt=Bt+kt)),s.id=r,wn(kt,s)},n.tooltipReadyPromise=function(){return n._tooltipreadypromise||(n._tooltipreadypromise=new e.Promise(function(t,n){r=(new e.Tipsy({placement:"right",selector:'[data-formelement][data-content]:not([data-valid="false"])',showOn:["touchstart","focus"],hideOn:["touchend","blur","keypress"]})).render(),i=(new e.Tipsy({placement:"right",selector:'[data-formelement][data-content][data-valid="false"]',showOn:["touchstart","focus"],hideOn:["touchend","blur","keypress"]})).render(),r.get("boundingBox").addClass("tipsy-formelement"),i.get("boundingBox").addClass("tipsy-formelement-invalid"),e.batch(r.renderPromise(),i.renderPromise()).then(t,n)})),n._tooltipreadypromise},e.later(500,null,n.tooltipReadyPromise),u.delegate("focus",function(t){var n=t.target,r=n.getAttribute(pt+"-"+nt)==="true",i;!r&&n.test("input")&&t.preventDefault(),i=n.getData(a),e.ITSAFormElement._activeNode=n,i?n.clearData(a):r?n.select():(n.set("selectionStart",n.get("value").length),n.set("scrollTop",999999))},function(e,t){var n=t.target;return e===n&&n.test("input[type=text],input[type=password],input[type=url],input[type=email],textarea")}),u.delegate("mousedown",function(t){var n=t.target;e.ITSAFormElement._activeNode!==n&&n.setData(a,!0)},function(e,t){var n=t.target;return e===n&&n.test("input[type=text],input[type=password],input[type=url],input[type=email],textarea")}),s.each([d,v,m],function(t){var n={on:function(e,n,r){n._handle=e.on(C,function(e){var n=e.target;n.get("tagName")!=="BUTTON"&&(n=n.get("parentNode"),e.target=n),n.getAttribute(pt+"-"+m)===t&&r.fire(e)})},detach:function(e,t){t._handle.detach()}};n.delegate=n.on,n.detachDelegate=n.detach,e.Event.define(t+N+C,n)}),s.each([Ut,zt],function(t){var n={on:function(e,n,r){n._handle=e.on(C,function(e){var n=e.target;n.get("tagName")!=="BUTTON"&&(n=n.get("parentNode"),e.target=n),(n.getAttribute(Yt)===t||n.getAttribute(Yt)===h&&n.getAttribute(Zt)===t)&&r.fire(e)})},detach:function(e,t){t._handle.detach()}};n.delegate=n.on,n.detachDelegate=n.detach,e.Event.define(t+C,n)})},"@VERSION@",{requires:["yui-base","datatype-date-format","event-synthetic","yui-later","promise","event-tap","event-custom","gallery-tipsy","gallery-itsawidgetrenderpromise"],skinnable:!0});
