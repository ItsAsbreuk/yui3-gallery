YUI.add("gallery-itsaformelement",function(e,t){"use strict";var n,r=e.Array,i=e.Object,s=e.Lang,o=e.Intl,u=5,a=e.one("body"),f=f,l="data",c="hotkey",h=l+"-for",p=h+c,d="disabled",v="widget",m="string",g="itsa-"+v+"-parent",y="pure",b="button",w=y+"-"+b,E=w+"-active",S=" itsa"+b+"-bordered",x="date",T="time",N=x+T,C=" "+w+"-"+N+" itsa"+b+"-onlyicon",k=w+"-"+d,L=w+"-primary",A="modelattribute",O="hideatstartup",M="itsa-invisible",_="renderpromise",D="gallery",P="-itsa",H="editor",B="error",j="boolean",F="[data-formelement][data-content]",I='[data-valid="false"]',q="tipsy-formelement",R="boundingBox",U="touchstart",z="touchend",W="focus",X="blur",V="keypress",$="right",J="picker",K="click",Q="itsaicon-datetime-",G=Q+x,Y=Q+T,Z=Q+N,et=' data-formelement="true"',tt='<span class="format',nt="</span>",rt="itsa-"+c,it='<span class="'+rt+'" data-'+c+'="{'+c+'}" '+p+'="{nodeid}">$1'+nt,st="itsabutton-asktoclick",ot="^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}$",ut="[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)+(/[\\w-]+)*",at="^(http://)?"+ut,ft="^(https://)?"+ut,lt="^(https?://)?"+ut,ct="^(([-]?[1-9][0-9]*)|0)$",ht="^[-]?(([1-9][0-9]*)|0)(\\.[0-9]+)?$",pt='<label for="',dt="</label>",vt="text",mt="password",gt="email",yt="url",bt="radio",wt="checkbox",Et="hidden",St="textarea",xt="div",Tt="label",Nt="span",Ct="plain",kt="initialfocus",Lt="fullselect",At="submitonenter",Ot="primarybtnonenter",Mt="number",_t=y+"-"+bt,Dt=y+"-"+wt,Pt="readonly",Ht="checked",Bt="required",jt="name",Ft="value",It="placeholder",qt="pattern",Rt="class",Ut="labelHTML",zt="switch",Wt=zt+"ed",Xt=zt+Tt,Vt=zt+Ft,$t=Tt+l,Jt=Ft+Wt,Kt=Ft+"non"+Wt,Qt="focusable",Gt="spinbusy",Yt="{"+d+"}",Zt="{"+Pt+"}",en="{"+Ht+"}",tn="{"+Bt+"}",nn="{"+jt+"}",rn="{"+Ft+"}",sn="{"+It+"}",on="{"+qt+"}",un="{"+l+"}",an="{"+Rt+"}",fn="{"+Et+"}",ln='id="{id}"',cn="{"+Jt+"}",hn="{"+Kt+"}",pn="{"+$t+"}",dn="{"+Ut+"}",vn="{"+Qt+"}",mn="type",gn="submit",yn="reset",bn="<input "+mn+'="',wn="<"+b+" "+mn+'="',En=Rt+jt,Sn=Tt+"Class"+jt,xn="{"+mn+"}",Tn=' data-labeldatetime="true"',Nn=l+"-"+N+"=",Cn=l+"-"+b+mn,kn=l+"-"+b+"sub"+mn,Ln="<"+Nt+" "+ln+">UNDEFINED ELEMENTTYPE</"+Nt+">",An="<"+Nt+" "+ln+nn+un+fn+an+">"+rn+"</"+Nt+">",On=bn+vt+'" '+ln+nn+rn+sn+Yt+tn+Zt+on+un+vn+fn+an+" />",Mn=bn+mt+'" '+ln+nn+rn+sn+Yt+tn+Zt+on+un+vn+fn+an+" />",_n=bn+gt+'" '+ln+nn+rn+sn+Yt+tn+Zt+un+vn+fn+an+on+" />",Dn=bn+yt+'" '+ln+nn+rn+sn+Yt+tn+Zt+un+vn+fn+an+on+" />",Pn=bn+vt+'" '+ln+nn+rn+sn+Yt+tn+Zt+un+vn+fn+an+on+" />",Hn=bn+bt+'" '+ln+nn+rn+Yt+en+un+vn+fn+an+" />",Bn=bn+wt+'" '+ln+nn+rn+Yt+Zt+en+un+vn+fn+an+" />",jn=bn+Et+'" '+ln+nn+rn+" />",Fn="<"+St+" "+ln+nn+sn+Yt+tn+Zt+un+vn+fn+an+">"+rn+"</"+St+">",In=hn+"<"+xt+" "+ln+nn+fn+un+vn+an+"></"+xt+">"+cn,qn=wn+xn+'" '+ln+nn+rn+un+vn+fn+an+">"+dn+"</"+b+">",Rn=hn+wn+b+'" '+ln+nn+rn+fn+tn+Tn+Zt+" "+Nn+'"'+x+'"'+un+vn+an+"><i "+Rt+'="'+G+'"></i></'+b+">"+cn,Un=hn+wn+b+'" '+ln+nn+rn+fn+tn+Tn+Zt+" "+Nn+'"'+T+'"'+un+vn+an+"><i "+Rt+'="'+Y+'"></i></'+b+">"+cn,zn=hn+wn+b+'" '+ln+nn+rn+fn+tn+Tn+Zt+" "+Nn+'"'+N+'"'+un+vn+an+"><i "+Rt+'="'+Z+'"></i></'+b+">"+cn,Wn={widget:In,plain:An,text:On,password:Mn,email:_n,url:Dn,number:Pn,radio:Hn,checkbox:Bn,hidden:jn,textarea:Fn,button:qn,reset:qn,submit:qn,date:Rn,time:Un,datetime:zn},Xn=function(t,n,r,i,s,o,u,a,f){var l=s?" "+s:"",c=a?" "+M:"",p=typeof n===m&&n.length>0?" formattime-"+n:"";return i||(t==="date"?i="%x":t==="time"?i="%X":i="%x %X"),e.use(D+P+"datetimepicker"),tt+"value"+p+l+c+'" '+h+'="'+f+'"'+l+o+u+">"+e.Date.format(r,{format:i})+nt},Vn={date:!0,time:!0,datetime:!0},$n={text:!0,number:!0,password:!0,textarea:!0,email:!0,url:!0},Jn={button:!0,submit:!0,reset:!0},Kn={radio:!0,checkbox:!0},Qn=/\{\s*([^|}]+?)\s*(?:\|([^}]*))?\s*\}/g,Gn=function(t,n){return t.replace?t.replace(Qn,function(t,r){return e.Lang.isUndefined(n[r])?"":n[r]}):t};e.Node.prototype.displayInDoc=function(){var e=this,t=e.inDoc();while(e&&t)t=e.getStyle("display")!=="none",t&&(e=e.get("parentNode"));return t},n=e.ITSAFormElement={},n.getElement=function(t,r,i){var s,o,u,a;i=i||e.guid(),r=r||{},o=typeof t=="function"&&t.NAME,typeof t===m&&(t=t.toLowerCase()),s={type:t,nodeid:i,config:r,name:r.name,html:n._renderedElement(o?t.NAME:t,r,i,o)};if(o){u=t;try{a=s.widget=new u(r.widgetconfig),t.NAME===H+"Base"?e.use(D+P+H+_,function(){a.renderOnAvailable("#"+i)}):e.use(D+P+v+_,function(){a.renderOnAvailable("#"+i)})}catch(f){e.fire(B,f)}}return s},n._renderedElement=function(t,u,a,f){var p=e.merge(u),y=Vn[t],E=typeof p[Xt]===j?p[Xt]:!1,x=typeof p[Qt]===j?p[Qt]:!0,T=typeof p[Lt]===j?p[Lt]:!1,_=typeof p[At]===j?p[At]:!1,H=typeof p[Ot]===j?p[Ot]:!1,B=typeof p[O]===j?p[O]:!1,F=!y&&u.tooltip,I=!y&&u.tooltipinvalid,q=u.nossl,R=u.onlyssl,U=u.digits,z=u[Ft],W=u[A],X=u[Vt],V=u[l],$=et,J=u[c],K,Q,G,Y,Z,rt,st,ut,vt,wt,xt,Nt,zt,Wt,Yt,Zt,en,tn,nn;return V&&($+=" "+V),W&&($+=" data-"+A+'="true"'),p[l]=$,F&&(F=F.replace(/"/g,"''"),p[l]+=' data-content="'+F+'" data-contentvalid="'+F+'"'),I&&typeof I===m&&I.length>0&&(p[l]+=' data-contentinvalid="'+I.replace(/"/g,"''")+'"'),u[kt]&&(p[l]+=" data-"+kt+'="true"'),u[jt]&&(p[jt]=" "+jt+'="'+p[jt]+'"'),rt=typeof u[Et]===j?u[Et]:!1,st=typeof p[d]===j?p[d]:!1,p[Et]=rt?" "+Et+'="'+Et+'"':"",p[d]=st?" "+d+'="'+d+'"':"",J&&(s.isObject(J)&&(Yt=o.getLang(D+"-itsaformelement")||e.config.lang,tn=[],i.each(J,function(e,t){typeof t===m&&typeof e===m&&tn.push(t)}),en=0,nn=Yt.length,r.some(tn,function(e){var t=e.length;return(t>en&&(en===0||t<=nn)||t<en&&en>nn)&&Yt.match(new RegExp("^"+e))&&(Zt=e,en=Zt.length),e===Yt}),J=J[Zt]),typeof J===m&&J.length===1&&(Wt=J.toLowerCase())),f?(p[l]+=' data-type="'+t+'"',p[Rt]=' class="'+(u[En]||"")+" "+g+(B?" "+M:"")+'"',u[Tt]&&(p[$t]=p[$t]||"",p[$t]+=" data-"+v+Tt+'="true"'),p[Qt]=x?" data-"+Qt+'="true"':"",t==="slider"&&(p[X?Jt:Kt]=tt+"value formatslider-"+u.name+(u[En]?" "+u[En]:"")+'" '+h+'="'+a+'"'+p[Et]+p[d]+">"+z+nt),t=v):(ut=!u["remove"+Bt]&&(typeof p[Bt]===j?p[Bt]:t===mt),xt=typeof p[Pt]===j?p[Pt]:!1,p[Qt]=x?" data-"+Qt+'="true"'
:"",p[Bt]=ut?" "+Bt+'="'+Bt+'"':"",p[Pt]=xt?" "+Pt+'="'+Pt+'"':"",u[It]&&(p[It]=" "+It+'="'+p[It]+'"'),u[qt]&&(p[qt]=" "+qt+'="'+p[qt]+'"'),t!==St&&t!==Ct&&z&&(p[Ft]=" "+Ft+'="'+p[Ft]+'"'),t===gt?p[qt]=" "+qt+'="'+ot+'"':t===yt?typeof q===j&&q?p[qt]=" "+qt+'="'+at+'"':typeof R===j&&R?p[qt]=" "+qt+'="'+ft+'"':p[qt]=" "+qt+'="'+lt+'"':t===Mt?p[qt]=" "+qt+'="'+(typeof U===j&&U?ht:ct)+'"':Kn[t]?(Z=t===bt?_t:Dt,vt=typeof p[Ht]===j?p[Ht]:!1,p[Ht]=vt?" "+Ht+'="'+Ht+'"':""):Jn[t]?(delete p[Tt],wt=!0,p[mn]=t,p[l]+=" data-"+b+mn+'="'+(u[b+mn]||t)+'"',G=u.primary,Q=st,u[Gt]&&(p[l]+=" data-"+Gt+'="true"',e.use(D+"css"+P+"-animatespin")),u[Ut]||(p[Ut]=z||t),p[Ft]=" "+Ft+'="'+(u[Ft]||e.Escape.html(p[Ut]))+'"',Wt&&(zt=new RegExp("(?![^<]*>)("+Wt+")","i"))&&zt.test(p[Ut])&&(p[Ut]=p[Ut].replace(zt,s.sub(it,{hotkey:Wt,nodeid:a})),n._HKList||n._actHKList())):y&&(e.use(D+"css"+P+"-"+N),s.isDate(z)||(z=new Date),wt=!0,Q=st,p[Ft]=' value="'+z.getTime()+'"',p[l]+=" data-"+N+'picker="true"',p[X?Jt:Kt]=Xn(t,u.name||"",z,p.format,u[En],p[Et],p[d],B,a)),u.removepattern&&p[qt]&&(p[l]+=" data-"+qt+"="+p[qt].substr(9),delete p[qt]),$n[t]&&(n._TXTList||n._actTXTList()),T&&$n[t]&&(p[l]+=" data-"+Lt+'="true"'),_&&$n[t]&&(p[l]+=" data-"+At+'="true"'),H&&$n[t]&&(p[l]+=" data-"+Ot+'="true"'),(u[En]||wt||B||y)&&(p[Rt]=' class="'+(y?"":u[En]||"")+(wt?" "+w+S:"")+(y?C:"")+(Q?" "+k:"")+(G?" "+L:"")+(B?" "+M:"")+'"')),Y=Wn[t]||Ln,p[Tt]&&(Wt&&(zt=new RegExp("(?![^<]*>)("+Wt+")","i"))&&zt.test(p[Tt])&&(p[Tt]=p[Tt].replace(zt,s.sub(it,{hotkey:Wt,nodeid:a})),n._HKList||n._actHKList()),Z?(p[Tt]='<span class="formatlabel">'+p[Tt]+nt,K=' class="'+Z+(u[Sn]?" "+u[Sn]:"")+'"',Y=pt+'{id}"'+fn+pn+K+">"+(E?Y+"{label}":"{label}"+Y)+dt):(K=u[Sn]?' class="'+u[Sn]+'"':"",Nt=(y?"<"+Tt:pt+'{id}"')+fn+pn+K+">{label}"+dt,E?Y+=Nt:Y=Nt+Y)),p.id=a,Gn(Y,p)},n.tooltipReadyPromise=function(){return n._tooltipreadypromise||(n._tooltipreadypromise=new e.Promise(function(t,r){var i=n.tipsyOK=(new e.Tipsy({placement:$,selector:F+":not("+I+")",showOn:[U,W],hideOn:[z,X,V],zIndex:u})).render(),s=n.tipsyInvalid=(new e.Tipsy({placement:$,selector:F+I,showOn:[U,W],hideOn:[z,X,V],zIndex:u})).render();i.get(R).addClass(),s.get(R).addClass(q+"-invalid"),i._alignTooltip=function(t){var n=this;e.Tipsy.prototype._alignTooltip.apply(n,arguments),n._lastnode=t},s._alignTooltip=function(t){var n=this;e.Tipsy.prototype._alignTooltip.apply(n,arguments),n._lastnode=t},e.batch(i.renderPromise(),s.renderPromise()).then(t,r)})),n._tooltipreadypromise},n._pressedBtn=null,n._actHKList=function(){n._HKList=!0,a.on("keydown",function(t){var r=t.charCode,i,s,o,u,a;t.altKey&&(i=String.fromCharCode(r).toLowerCase(),s=e.one("."+rt+"[data-"+c+'="'+i+'"]:not(['+d+"]):not(["+Pt+"])"),s&&(o=s.getAttribute(p),u=e.one("#"+o)),u&&(u.getStyle("visibility")==="hidden"||!u.displayInDoc())?(s=e.all("."+rt+"[data-"+c+'="'+i+'"]:not(['+d+"]):not(["+Pt+"])"),s.some(function(t,n){return n>0&&(o=t.getAttribute(p),u=e.one("#"+o),a=u&&u.getStyle("visibility")!=="hidden"&&u.displayInDoc()&&u),a})):a=u,a&&(t.halt(),a.focus(),a.get("tagName")==="BUTTON"&&(a.addClass(E),e.fire(st,{buttonNode:a}),n._pressedBtn=a)))}),a.on("keyup",function(){var e=n._pressedBtn;e&&(e.removeClass(E),n._pressedBtn=null)})},n._actTXTList=function(){n._TXTList=!0,a.delegate(W,function(t){var n=t.target,r=n.getAttribute(l+"-"+Lt)==="true",i;!r&&n.test("input")&&t.preventDefault(),i=n.getData(f),e.ITSAFormElement._activeNode=n,i?n.clearData(f):r?n.select():(n.set("selectionStart",n.get("value").length),n.set("scrollTop",999999))},function(e,t){var n=t.target;return e===n&&n.test("input[type=text],input[type=password],input[type=url],input[type=email],textarea")}),a.delegate("mousedown",function(t){var n=t.target;e.ITSAFormElement._activeNode!==n&&n.setData(f,!0)},function(e,t){var n=t.target;return e===n&&n.test("input[type=text],input[type=password],input[type=url],input[type=email],textarea")})},e.later(500,null,n.tooltipReadyPromise),r.each([x,T,N],function(t){var n={on:function(e,n,r){n._handle=e.on(K,function(e){var n=e.target;n&&n.get("tagName")!=="BUTTON"&&(n=n.get("parentNode"),e.target=n),n&&n.getAttribute(l+"-"+N)===t&&r.fire(e)})},detach:function(e,t){t._handle.detach()}};n.delegate=n.on,n.detachDelegate=n.detach,e.Event.define(t+J+K,n)}),r.each([gn,yn],function(t){var n={on:function(e,n,r){n._handle=e.on(K,function(e){var n=e.target;n&&n.get("tagName")!=="BUTTON"&&(n=n.get("parentNode"),e.target=n),n&&(n.getAttribute(Cn)===t||n.getAttribute(Cn)===b&&n.getAttribute(kn)===t)&&r.fire(e)})},detach:function(e,t){t._handle.detach()}};n.delegate=n.on,n.detachDelegate=n.detach,e.Event.define(t+":"+K,n)})},"@VERSION@",{requires:["yui-base","node-core","node-event-delegate","datatype-date-format","event-base","event-synthetic","yui-later","promise","event-tap","event-custom","escape","intl","gallerycss-itsa-base","gallery-tipsy","gallery-itsawidgetrenderpromise"],skinnable:!0});
