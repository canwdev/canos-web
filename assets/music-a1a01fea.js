import{bm as ne,bn as ae,bo as ie,bp as D,bq as pe,aU as k,br as O,bs as ye}from"./index-4ed801e6.js";var le=function(){if(typeof Symbol!="function"||typeof Object.getOwnPropertySymbols!="function")return!1;if(typeof Symbol.iterator=="symbol")return!0;var e={},t=Symbol("test"),r=Object(t);if(typeof t=="string"||Object.prototype.toString.call(t)!=="[object Symbol]"||Object.prototype.toString.call(r)!=="[object Symbol]")return!1;var n=42;e[t]=n;for(t in e)return!1;if(typeof Object.keys=="function"&&Object.keys(e).length!==0||typeof Object.getOwnPropertyNames=="function"&&Object.getOwnPropertyNames(e).length!==0)return!1;var a=Object.getOwnPropertySymbols(e);if(a.length!==1||a[0]!==t||!Object.prototype.propertyIsEnumerable.call(e,t))return!1;if(typeof Object.getOwnPropertyDescriptor=="function"){var y=Object.getOwnPropertyDescriptor(e,t);if(y.value!==n||y.enumerable!==!0)return!1}return!0},W=typeof Symbol<"u"&&Symbol,se=le,fe=function(){return typeof W!="function"||typeof Symbol!="function"||typeof W("foo")!="symbol"||typeof Symbol("bar")!="symbol"?!1:se()},ue="Function.prototype.bind called on incompatible ",T=Array.prototype.slice,ce=Object.prototype.toString,de="[object Function]",ve=function(e){var t=this;if(typeof t!="function"||ce.call(t)!==de)throw new TypeError(ue+t);for(var r=T.call(arguments,1),n,a=function(){if(this instanceof n){var f=t.apply(this,r.concat(T.call(arguments)));return Object(f)===f?f:this}else return t.apply(e,r.concat(T.call(arguments)))},y=Math.max(0,t.length-r.length),i=[],s=0;s<y;s++)i.push("$"+s);if(n=Function("binder","return function ("+i.join(",")+"){ return binder.apply(this,arguments); }")(a),t.prototype){var p=function(){};p.prototype=t.prototype,n.prototype=new p,p.prototype=null}return n},he=ve,L=Function.prototype.bind||he,me=L,ge=me.call(Function.call,Object.prototype.hasOwnProperty),l,E=SyntaxError,Q=Function,P=TypeError,j=function(o){try{return Q('"use strict"; return ('+o+").constructor;")()}catch{}},m=Object.getOwnPropertyDescriptor;if(m)try{m({},"")}catch{m=null}var N=function(){throw new P},Ae=m?function(){try{return arguments.callee,N}catch{try{return m(arguments,"callee").get}catch{return N}}}():N,A=fe(),d=Object.getPrototypeOf||function(o){return o.__proto__},b={},be=typeof Uint8Array>"u"?l:d(Uint8Array),S={"%AggregateError%":typeof AggregateError>"u"?l:AggregateError,"%Array%":Array,"%ArrayBuffer%":typeof ArrayBuffer>"u"?l:ArrayBuffer,"%ArrayIteratorPrototype%":A?d([][Symbol.iterator]()):l,"%AsyncFromSyncIteratorPrototype%":l,"%AsyncFunction%":b,"%AsyncGenerator%":b,"%AsyncGeneratorFunction%":b,"%AsyncIteratorPrototype%":b,"%Atomics%":typeof Atomics>"u"?l:Atomics,"%BigInt%":typeof BigInt>"u"?l:BigInt,"%Boolean%":Boolean,"%DataView%":typeof DataView>"u"?l:DataView,"%Date%":Date,"%decodeURI%":decodeURI,"%decodeURIComponent%":decodeURIComponent,"%encodeURI%":encodeURI,"%encodeURIComponent%":encodeURIComponent,"%Error%":Error,"%eval%":eval,"%EvalError%":EvalError,"%Float32Array%":typeof Float32Array>"u"?l:Float32Array,"%Float64Array%":typeof Float64Array>"u"?l:Float64Array,"%FinalizationRegistry%":typeof FinalizationRegistry>"u"?l:FinalizationRegistry,"%Function%":Q,"%GeneratorFunction%":b,"%Int8Array%":typeof Int8Array>"u"?l:Int8Array,"%Int16Array%":typeof Int16Array>"u"?l:Int16Array,"%Int32Array%":typeof Int32Array>"u"?l:Int32Array,"%isFinite%":isFinite,"%isNaN%":isNaN,"%IteratorPrototype%":A?d(d([][Symbol.iterator]())):l,"%JSON%":typeof JSON=="object"?JSON:l,"%Map%":typeof Map>"u"?l:Map,"%MapIteratorPrototype%":typeof Map>"u"||!A?l:d(new Map()[Symbol.iterator]()),"%Math%":Math,"%Number%":Number,"%Object%":Object,"%parseFloat%":parseFloat,"%parseInt%":parseInt,"%Promise%":typeof Promise>"u"?l:Promise,"%Proxy%":typeof Proxy>"u"?l:Proxy,"%RangeError%":RangeError,"%ReferenceError%":ReferenceError,"%Reflect%":typeof Reflect>"u"?l:Reflect,"%RegExp%":RegExp,"%Set%":typeof Set>"u"?l:Set,"%SetIteratorPrototype%":typeof Set>"u"||!A?l:d(new Set()[Symbol.iterator]()),"%SharedArrayBuffer%":typeof SharedArrayBuffer>"u"?l:SharedArrayBuffer,"%String%":String,"%StringIteratorPrototype%":A?d(""[Symbol.iterator]()):l,"%Symbol%":A?Symbol:l,"%SyntaxError%":E,"%ThrowTypeError%":Ae,"%TypedArray%":be,"%TypeError%":P,"%Uint8Array%":typeof Uint8Array>"u"?l:Uint8Array,"%Uint8ClampedArray%":typeof Uint8ClampedArray>"u"?l:Uint8ClampedArray,"%Uint16Array%":typeof Uint16Array>"u"?l:Uint16Array,"%Uint32Array%":typeof Uint32Array>"u"?l:Uint32Array,"%URIError%":URIError,"%WeakMap%":typeof WeakMap>"u"?l:WeakMap,"%WeakRef%":typeof WeakRef>"u"?l:WeakRef,"%WeakSet%":typeof WeakSet>"u"?l:WeakSet},Pe=function o(e){var t;if(e==="%AsyncFunction%")t=j("async function () {}");else if(e==="%GeneratorFunction%")t=j("function* () {}");else if(e==="%AsyncGeneratorFunction%")t=j("async function* () {}");else if(e==="%AsyncGenerator%"){var r=o("%AsyncGeneratorFunction%");r&&(t=r.prototype)}else if(e==="%AsyncIteratorPrototype%"){var n=o("%AsyncGenerator%");n&&(t=d(n.prototype))}return S[e]=t,t},V={"%ArrayBufferPrototype%":["ArrayBuffer","prototype"],"%ArrayPrototype%":["Array","prototype"],"%ArrayProto_entries%":["Array","prototype","entries"],"%ArrayProto_forEach%":["Array","prototype","forEach"],"%ArrayProto_keys%":["Array","prototype","keys"],"%ArrayProto_values%":["Array","prototype","values"],"%AsyncFunctionPrototype%":["AsyncFunction","prototype"],"%AsyncGenerator%":["AsyncGeneratorFunction","prototype"],"%AsyncGeneratorPrototype%":["AsyncGeneratorFunction","prototype","prototype"],"%BooleanPrototype%":["Boolean","prototype"],"%DataViewPrototype%":["DataView","prototype"],"%DatePrototype%":["Date","prototype"],"%ErrorPrototype%":["Error","prototype"],"%EvalErrorPrototype%":["EvalError","prototype"],"%Float32ArrayPrototype%":["Float32Array","prototype"],"%Float64ArrayPrototype%":["Float64Array","prototype"],"%FunctionPrototype%":["Function","prototype"],"%Generator%":["GeneratorFunction","prototype"],"%GeneratorPrototype%":["GeneratorFunction","prototype","prototype"],"%Int8ArrayPrototype%":["Int8Array","prototype"],"%Int16ArrayPrototype%":["Int16Array","prototype"],"%Int32ArrayPrototype%":["Int32Array","prototype"],"%JSONParse%":["JSON","parse"],"%JSONStringify%":["JSON","stringify"],"%MapPrototype%":["Map","prototype"],"%NumberPrototype%":["Number","prototype"],"%ObjectPrototype%":["Object","prototype"],"%ObjProto_toString%":["Object","prototype","toString"],"%ObjProto_valueOf%":["Object","prototype","valueOf"],"%PromisePrototype%":["Promise","prototype"],"%PromiseProto_then%":["Promise","prototype","then"],"%Promise_all%":["Promise","all"],"%Promise_reject%":["Promise","reject"],"%Promise_resolve%":["Promise","resolve"],"%RangeErrorPrototype%":["RangeError","prototype"],"%ReferenceErrorPrototype%":["ReferenceError","prototype"],"%RegExpPrototype%":["RegExp","prototype"],"%SetPrototype%":["Set","prototype"],"%SharedArrayBufferPrototype%":["SharedArrayBuffer","prototype"],"%StringPrototype%":["String","prototype"],"%SymbolPrototype%":["Symbol","prototype"],"%SyntaxErrorPrototype%":["SyntaxError","prototype"],"%TypedArrayPrototype%":["TypedArray","prototype"],"%TypeErrorPrototype%":["TypeError","prototype"],"%Uint8ArrayPrototype%":["Uint8Array","prototype"],"%Uint8ClampedArrayPrototype%":["Uint8ClampedArray","prototype"],"%Uint16ArrayPrototype%":["Uint16Array","prototype"],"%Uint32ArrayPrototype%":["Uint32Array","prototype"],"%URIErrorPrototype%":["URIError","prototype"],"%WeakMapPrototype%":["WeakMap","prototype"],"%WeakSetPrototype%":["WeakSet","prototype"]},x=L,w=ge,Se=x.call(Function.call,Array.prototype.concat),Ee=x.call(Function.apply,Array.prototype.splice),Y=x.call(Function.call,String.prototype.replace),C=x.call(Function.call,String.prototype.slice),Ie=x.call(Function.call,RegExp.prototype.exec),Oe=/[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,xe=/\\(\\)?/g,Fe=function(e){var t=C(e,0,1),r=C(e,-1);if(t==="%"&&r!=="%")throw new E("invalid intrinsic syntax, expected closing `%`");if(r==="%"&&t!=="%")throw new E("invalid intrinsic syntax, expected opening `%`");var n=[];return Y(e,Oe,function(a,y,i,s){n[n.length]=i?Y(s,xe,"$1"):y||a}),n},Re=function(e,t){var r=e,n;if(w(V,r)&&(n=V[r],r="%"+n[0]+"%"),w(S,r)){var a=S[r];if(a===b&&(a=Pe(r)),typeof a>"u"&&!t)throw new P("intrinsic "+e+" exists, but is not available. Please file an issue!");return{alias:n,name:r,value:a}}throw new E("intrinsic "+e+" does not exist!")},$=function(e,t){if(typeof e!="string"||e.length===0)throw new P("intrinsic name must be a non-empty string");if(arguments.length>1&&typeof t!="boolean")throw new P('"allowMissing" argument must be a boolean');if(Ie(/^%?[^%]*%?$/,e)===null)throw new E("`%` may not be present anywhere but at the beginning and end of the intrinsic name");var r=Fe(e),n=r.length>0?r[0]:"",a=Re("%"+n+"%",t),y=a.name,i=a.value,s=!1,p=a.alias;p&&(n=p[0],Ee(r,Se([0,1],p)));for(var f=1,v=!0;f<r.length;f+=1){var u=r[f],g=C(u,0,1),F=C(u,-1);if((g==='"'||g==="'"||g==="`"||F==='"'||F==="'"||F==="`")&&g!==F)throw new E("property names with quotes must have matching quotes");if((u==="constructor"||!v)&&(s=!0),n+="."+u,y="%"+n+"%",w(S,y))i=S[y];else if(i!=null){if(!(u in i)){if(!t)throw new P("base intrinsic for "+e+" exists, but the property is not available.");return}if(m&&f+1>=r.length){var R=m(i,u);v=!!R,v&&"get"in R&&!("originalValue"in R.get)?i=R.get:i=i[u]}else v=w(i,u),i=i[u];v&&!s&&(S[y]=i)}}return i},q={exports:{}};(function(o){var e=L,t=$,r=t("%Function.prototype.apply%"),n=t("%Function.prototype.call%"),a=t("%Reflect.apply%",!0)||e.call(n,r),y=t("%Object.getOwnPropertyDescriptor%",!0),i=t("%Object.defineProperty%",!0),s=t("%Math.max%");if(i)try{i({},"a",{value:1})}catch{i=null}o.exports=function(v){var u=a(e,n,arguments);if(y&&i){var g=y(u,"length");g.configurable&&i(u,"length",{value:1+s(0,v.length-(arguments.length-1))})}return u};var p=function(){return a(e,r,arguments)};i?i(o.exports,"apply",{value:p}):o.exports.apply=p})(q);var we=q.exports,X=$,K=we,Ce=K(X("String.prototype.indexOf")),Te=function(e,t){var r=X(e,!!t);return typeof r=="function"&&Ce(e,".prototype.")>-1?K(r):r},G=$,I=Te;G("%TypeError%");G("%WeakMap%",!0);G("%Map%",!0);I("WeakMap.prototype.get",!0);I("WeakMap.prototype.set",!0);I("WeakMap.prototype.has",!0);I("Map.prototype.get",!0);I("Map.prototype.set",!0);I("Map.prototype.has",!0);var je=String.prototype.replace,Ne=/%20/g,U={RFC1738:"RFC1738",RFC3986:"RFC3986"},Z={default:U.RFC3986,formatters:{RFC1738:function(o){return je.call(o,Ne,"+")},RFC3986:function(o){return String(o)}},RFC1738:U.RFC1738,RFC3986:U.RFC3986},Ue=Z,B=Object.prototype.hasOwnProperty,h=Array.isArray,c=function(){for(var o=[],e=0;e<256;++e)o.push("%"+((e<16?"0":"")+e.toString(16)).toUpperCase());return o}(),Be=function(e){for(;e.length>1;){var t=e.pop(),r=t.obj[t.prop];if(h(r)){for(var n=[],a=0;a<r.length;++a)typeof r[a]<"u"&&n.push(r[a]);t.obj[t.prop]=n}}},ee=function(e,t){for(var r=t&&t.plainObjects?Object.create(null):{},n=0;n<e.length;++n)typeof e[n]<"u"&&(r[n]=e[n]);return r},_e=function o(e,t,r){if(!t)return e;if(typeof t!="object"){if(h(e))e.push(t);else if(e&&typeof e=="object")(r&&(r.plainObjects||r.allowPrototypes)||!B.call(Object.prototype,t))&&(e[t]=!0);else return[e,t];return e}if(!e||typeof e!="object")return[e].concat(t);var n=e;return h(e)&&!h(t)&&(n=ee(e,r)),h(e)&&h(t)?(t.forEach(function(a,y){if(B.call(e,y)){var i=e[y];i&&typeof i=="object"&&a&&typeof a=="object"?e[y]=o(i,a,r):e.push(a)}else e[y]=a}),e):Object.keys(t).reduce(function(a,y){var i=t[y];return B.call(a,y)?a[y]=o(a[y],i,r):a[y]=i,a},n)},Me=function(e,t){return Object.keys(t).reduce(function(r,n){return r[n]=t[n],r},e)},Le=function(o,e,t){var r=o.replace(/\+/g," ");if(t==="iso-8859-1")return r.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(r)}catch{return r}},$e=function(e,t,r,n,a){if(e.length===0)return e;var y=e;if(typeof e=="symbol"?y=Symbol.prototype.toString.call(e):typeof e!="string"&&(y=String(e)),r==="iso-8859-1")return escape(y).replace(/%u[0-9a-f]{4}/gi,function(f){return"%26%23"+parseInt(f.slice(2),16)+"%3B"});for(var i="",s=0;s<y.length;++s){var p=y.charCodeAt(s);if(p===45||p===46||p===95||p===126||p>=48&&p<=57||p>=65&&p<=90||p>=97&&p<=122||a===Ue.RFC1738&&(p===40||p===41)){i+=y.charAt(s);continue}if(p<128){i=i+c[p];continue}if(p<2048){i=i+(c[192|p>>6]+c[128|p&63]);continue}if(p<55296||p>=57344){i=i+(c[224|p>>12]+c[128|p>>6&63]+c[128|p&63]);continue}s+=1,p=65536+((p&1023)<<10|y.charCodeAt(s)&1023),i+=c[240|p>>18]+c[128|p>>12&63]+c[128|p>>6&63]+c[128|p&63]}return i},Ge=function(e){for(var t=[{obj:{o:e},prop:"o"}],r=[],n=0;n<t.length;++n)for(var a=t[n],y=a.obj[a.prop],i=Object.keys(y),s=0;s<i.length;++s){var p=i[s],f=y[p];typeof f=="object"&&f!==null&&r.indexOf(f)===-1&&(t.push({obj:y,prop:p}),r.push(f))}return Be(t),e},De=function(e){return Object.prototype.toString.call(e)==="[object RegExp]"},ke=function(e){return!e||typeof e!="object"?!1:!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))},We=function(e,t){return[].concat(e,t)},Ve=function(e,t){if(h(e)){for(var r=[],n=0;n<e.length;n+=1)r.push(t(e[n]));return r}return t(e)},te={arrayToObject:ee,assign:Me,combine:We,compact:Ge,decode:Le,encode:$e,isBuffer:ke,isRegExp:De,maybeMap:Ve,merge:_e},Ye=te,re=Z,He=Date.prototype.toISOString,H=re.default;Ye.encode,re.formatters[H];var Je=te;Je.decode;const oe=ne({baseURL:ae+"/api/filesystem"});function Ze(o={}){const{path:e,getPlayStat:t}=o;return oe.post("/list",{path:e,getPlayStat:t})}function ze(o={}){const{path:e,filename:t,updatePlayStat:r,updateStatOnly:n}=o;return oe.post("/media-details",{path:e,filename:t,updatePlayStat:r,updateStatOnly:n})}class J{constructor(e){this.guid=ie(),this.fileInfo=e||{}}get src(){return D+"/mfs"+this.fileInfo.path+this.fileInfo.filename}get titleDisplay(){var e;return this.title||((e=this.fileInfo)==null?void 0:e.filename)||""}get artistsAlbumDisplay(){const{artist:e,album:t}=this;return[e,t].join(" - ")}get artist(){return(this.artists||[]).join(", ")}async fetchDetail(){const e=await ze({path:this.fileInfo.path,filename:this.fileInfo.filename});e.cover&&(this.cover=D+e.cover),this.lyric=e.lyric||"";const{metadata:t}=e;this.title=t.common.title||"",this.artists=t.common.artists||[],this.album=t.common.album||"",this.allMetadata=t}}const Qe=/\.(mp3|wav|ogg|flac|opus)$/i,z=o=>Qe.test(o);function qe(o){return{all:o=o||new Map,on:function(e,t){var r=o.get(e);r?r.push(t):o.set(e,[t])},off:function(e,t){var r=o.get(e);r&&(t?r.splice(r.indexOf(t)>>>0,1):o.set(e,[]))},emit:function(e,t){var r=o.get(e);r&&r.slice().map(function(n){n(t)}),(r=o.get("*"))&&r.slice().map(function(n){n(e,t)})}}}const Xe=qe(),_=Xe,M={ACTION_PLAY:"ACTION_PLAY",ACTION_PAUSE:"ACTION_PAUSE",ACTION_TOGGLE_PLAY:"ACTION_TOGGLE_PLAY",ACTION_CHANGE_CURRENT_TIME:"ACTION_CHANGE_CURRENT_TIME",ACTION_LOCATE_FILE:"ACTION_LOCATE_FILE"},et=pe("music",{state:()=>({musicItem:new J,playingList:[],playingIndex:0,paused:!0,currentTime:0,duration:0,playbackRate:1,stopCountdown:null,isPlayEnded:!1,isLoadedAutoplay:!0}),actions:{playFromFiles(o,e=[]){if(z(o.filename)){let t=e.filter(a=>z(a.filename)).map(a=>new J(a));const r=t.findIndex(a=>a.fileInfo.id===o.id),n=t[r];this.playingList=t,this.playingIndex=r,this.musicItem=n,this.isLoadedAutoplay=!0;return}window.$message.error("格式不支持")},playPrev(){let o=this.playingIndex-1;o<0&&(o=this.playingList.length-1),this.playByIndex(o)},playShuffle(){function o(e,t){const r=e.reduce((a,y,i)=>(i!==t&&a.push(i),a),[]),n=ye(0,r.length-1);return r[n]}this.playByIndex(o(this.playingList,this.playingIndex))},playNext(){const o=k();if(o.loopMode===O.SHUFFLE){this.playShuffle();return}let e=this.playingIndex+1;if(e>this.playingList.length-1)if(o.loopMode===O.LOOP_SEQUENCE)e=0;else return;this.playByIndex(e)},handlePlayEnded(){const o=k();if(this.isPlayEnded=!0,o.loopMode===O.LOOP_SINGLE){_.emit(M.ACTION_PLAY);return}if(o.loopMode===O.LOOP_REVERSE){this.playPrev();return}if(o.loopMode===O.SHUFFLE){this.playShuffle();return}this.playNext()},playByIndex(o){this.musicItem=this.playingList[o],this.playingIndex=o,console.log("[playByIndex]",o,this.musicItem),setTimeout(()=>{this.isPlayEnded?(_.emit(M.ACTION_PLAY),this.isPlayEnded=!1):this.paused&&_.emit(M.ACTION_PLAY)},100)}}});export{M as G,_ as a,Ze as g,z as i,et as u};
