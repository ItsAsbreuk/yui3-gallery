YUI.add("gallery-itsautils",function(e,t){"use strict";var n=/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/,r=function(e,t){return n.test(t)?new Date(t):t},i="application/json";e.JSON.fullparse=function(e){try{return this.parse(e,r)}catch(t){throw t}},e.io.json=function(t,n){n=n||{},n.headers||(n.headers={}),n.headers.Accept=i;var s=e.io.xhr(t,n);return e.mix(s.then(function(t){return e.JSON.parse(t.responseText,r)}),{abort:s.abort},!0)},e.Array.each(["post","put"],function(t){e.io[t+"JSON"]=function(n,r,i){return i=i||{},i.method=t.toUpperCase(),i.data={data:e.JSON.stringify(r)},e.io.json(n,i)}}),e.JSONPRequest.prototype.send=function(){function o(n,s){return typeof n=="function"?function(o){var u=!0,a="_requests",f;if(typeof o=="object"){f=e.JSON.stringify(o);try{o=e.JSON.fullparse(f)}catch(l){}}s?(++t._timeouts[i],--t._requests[i]):(t._requests[i]||(u=!1,a="_timeouts"),--t[a][i]),!t._requests[i]&&!t._timeouts[i]&&delete YUI.Env.JSONP[i],u&&n.apply(r.context,[o].concat(r.args))}:null}var t=this,n=e.Array(arguments,0,!0),r=t._config,i=t._proxy||e.guid(),s;return r.allowCache&&(t._proxy=i),t._requests[i]===undefined&&(t._requests[i]=0),t._timeouts[i]===undefined&&(t._timeouts[i]=0),t._requests[i]++,n.unshift(t.url,"YUI.Env.JSONP."+i),s=r.format.apply(t,n),r.on.success?(YUI.Env.JSONP[i]=o(r.on.success),e.Get.js(s,{onFailure:o(r.on.failure),onTimeout:o(r.on.timeout,!0),timeout:r.timeout,charset:r.charset,attributes:r.attributes,async:r.async}).execute(),t):t}},"@VERSION@",{requires:["yui-base","json","jsonp","gallery-io-utils"]});