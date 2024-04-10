import{_ as e}from"./index-xF8xbv1_.js";import{u as t,D as n,B as a,bs as r,d as o,bi as s,o as i,c as l,a as c,c9 as u,ca as p,r as d,cb as f,bJ as m,bK as v,k as g,cc as C,cd as h,ce as b,M as y,cf as w,_ as x,w as O,v as j,b as R,Y as T,S as _}from"./index-Djll9IJd.js";import{u as P}from"./useQRCode-oFJArJmp.js";import"./VueRender.vue_vue_type_script_lang-DjABlx-x.js";const L={class:"qr-code-display"},q=["src","alt"],k={key:1},S=o({__name:"QrCodeDisplay",props:{text:{default:""}},setup(e){const t=e,{text:n}=s(t),a=P(n,{errorCorrectionLevel:"H",margin:2});return(e,t)=>(i(),l("div",L,[c(n)?(i(),l("img",{key:0,src:c(a),alt:c(n)},null,8,q)):(i(),l("span",k,"Input text to generate QR code"))]))}}),A=e=>({label:"🤳 QR Code Toolbox",search:"qrcode",children:[{label:"text to QR Code",render:a(S,{text:e})}]}),E=async(e,t=!1)=>{if(!e)return;"object"==typeof e&&(console.info("object",e),e=JSON.stringify(e,null,2)),console.info("copy:",e),await u(e);let n="";t&&(n=e.length>50?e.slice(0,50)+"...":e),n&&(n=": "+n),window.$message.success(`Copied${n}`)},Q=(e,t)=>{const n=t.trim().toLowerCase();let a=!1;return e.search&&(a=e.search.toLowerCase().includes(n)),!a&&e.label&&(a=e.label.toLowerCase().includes(n)),a};var U=function(){return U=Object.assign||function(e){for(var t,n=1,a=arguments.length;n<a;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},U.apply(this,arguments)};function $(e){return e.toLowerCase()}"function"==typeof SuppressedError&&SuppressedError;var I=[/([a-z0-9])([A-Z])/g,/([A-Z])([A-Z][a-z])/g],M=/[^A-Z0-9]+/gi;function Z(e,t){void 0===t&&(t={});for(var n=t.splitRegexp,a=void 0===n?I:n,r=t.stripRegexp,o=void 0===r?M:r,s=t.transform,i=void 0===s?$:s,l=t.delimiter,c=void 0===l?" ":l,u=z(z(e,a,"$1\0$2"),o,"\0"),p=0,d=u.length;"\0"===u.charAt(p);)p++;for(;"\0"===u.charAt(d-1);)d--;return u.slice(p,d).split("\0").map(i).join(c)}function z(e,t,n){return t instanceof RegExp?e.replace(t,n):t.reduce((function(e,t){return e.replace(t,n)}),e)}function D(e,t){var n=e.charAt(0),a=e.substr(1).toLowerCase();return t>0&&n>="0"&&n<="9"?"_"+n+a:""+n.toUpperCase()+a}function B(e){return e.charAt(0).toUpperCase()+e.slice(1).toLowerCase()}function J(e,t){return void 0===t&&(t={}),Z(e,U({delimiter:"",transform:D},t))}function K(e,t){return 0===t?e.toLowerCase():D(e,t)}function V(e){return e.charAt(0).toUpperCase()+e.substr(1)}function F(e){return V(e.toLowerCase())}function H(e,t){return void 0===t&&(t={}),Z(e,U({delimiter:" ",transform:F},t))}function N(e){return e.toUpperCase()}function Y(e,t){return void 0===t&&(t={}),Z(e,U({delimiter:"."},t))}function G(e,t){var n=e.toLowerCase();return 0===t?V(n):n}const W=Object.freeze(Object.defineProperty({__proto__:null,camelCase:function(e,t){return void 0===t&&(t={}),J(e,U({transform:K},t))},camelCaseTransform:K,camelCaseTransformMerge:function(e,t){return 0===t?e.toLowerCase():B(e)},capitalCase:H,capitalCaseTransform:F,constantCase:function(e,t){return void 0===t&&(t={}),Z(e,U({delimiter:"_",transform:N},t))},dotCase:Y,headerCase:function(e,t){return void 0===t&&(t={}),H(e,U({delimiter:"-"},t))},noCase:Z,paramCase:function(e,t){return void 0===t&&(t={}),Y(e,U({delimiter:"-"},t))},pascalCase:J,pascalCaseTransform:D,pascalCaseTransformMerge:B,pathCase:function(e,t){return void 0===t&&(t={}),Y(e,U({delimiter:"/"},t))},sentenceCase:function(e,t){return void 0===t&&(t={}),Z(e,U({delimiter:" ",transform:G},t))},sentenceCaseTransform:G,snakeCase:function(e,t){return void 0===t&&(t={}),Y(e,U({delimiter:"_"},t))}},Symbol.toStringTag,{value:"Module"})),X=p((()=>({staticPlugins:d([]),dynamicPlugins:d([])}))),ee={label:"❓帮助说明：\n- 输入 /? 查看帮助\n- 按 tab 键切换到下方功能列表，再按 esc 聚焦到输入框\n- 部分功能支持多行文本\n- 支持输入时间戳，如：1709794946384\n- 支持插件功能，你可以在 /q-plugins 文件夹下编写自己的插件\n"},te={label:"🔄 Reload Plugins",props:{onClick:async()=>{await window.$qlUtils.reloadPlugins()}}},ne=o({name:"QuickLaunch",components:{QuickOptions:e},setup(e,{emit:o}){const s=b(),i=d(),l=d(!1),c=()=>{u.value.focus()};y((()=>{c(),R()}));const{textarea:u,input:p}=w(),{qlOptions:x}=(()=>{const e=t();return{qlOptions:n((()=>{const t=[];return e.allApps.forEach((n=>{t.push({label:n.title,search:n.appid,iconRender:a(r,{name:n.icon}),props:{onClick:()=>{e.createTask(n)}}})})),t}))}})(),{filteredOptions:O,handleSearch:j}=(e=>{const{staticPlugins:t,dynamicPlugins:n}=X(),a=d([]);return{handleSearch:h((r=>{let o=[];const s=r.value;"/?"===s&&o.push(ee);const i=[...e.value,...t.value,A(r),te];a.value=s?[...o,...i.filter((e=>Q(e,s))),...n.value.map((e=>e(r)))].filter((e=>!!e)):[...o,...i]}),100),filteredOptions:a}})(x),R=()=>{j(p)};(e=>{const{staticPlugins:t,dynamicPlugins:a}=X(),r="q-plugins",o=d([]),s=async()=>{if(a.value=[],t.value=[],o.value.length){console.log("[reloadPlugins] unloading plugin scripts...");for(const e in o.value){const t=o.value[e];await t()}o.value=[]}const e=await fetch(`${r}/index.json`),n=await e.json(),{plugins:s}=n;console.log("[reloadPlugins] loading plugins...",s);for(const t in s){let e=s[t];/^(?:http(s)?:\/\/)/.test(e)||(e=r+"/"+e);const{load:n,unload:a}=C(e,(()=>{}),{manual:!0});o.value.push(a),await n()}},i=n=>{"function"==typeof n?a.value.push(n):t.value.push(n),e()};f((()=>{window.$qlUtils={copy:E,moment:m,useFileDialog:v,changeCase:W,ref:d,computed:n,watch:g,filterLabel:Q,update:e,reloadPlugins:s,addPlugin:i},s()}))})(R),g(s,(()=>{R()}));return{textareaRef:u,qRef:i,anyText:p,qlOptions:x,handleInput:()=>{l.value||R()},filteredOptions:O,focus:c,cleanText:()=>{p.value="",R()},isEnterSub:l}}}),ae={class:"quick-launch"};const re=x(ne,[["render",function(t,n,a,r,o,s){const c=e;return i(),l("div",ae,[O(R("textarea",{ref:"textareaRef",rows:"1","onUpdate:modelValue":n[0]||(n[0]=e=>t.anyText=e),onInput:n[1]||(n[1]=(...e)=>t.handleInput&&t.handleInput(...e)),placeholder:"/?",type:"textarea",class:"font-code vp-input",onKeyup:n[2]||(n[2]=T(((...e)=>t.cleanText&&t.cleanText(...e)),["esc"]))},null,544),[[j,t.anyText]]),_(c,{ref:"qRef","auto-focus":!1,options:t.filteredOptions,"is-static":"",class:"font-emoji",onOnClose:n[3]||(n[3]=e=>t.textareaRef.focus()),onOnEnter:n[4]||(n[4]=e=>t.isEnterSub=!0),onOnBack:n[5]||(n[5]=e=>t.isEnterSub=!1)},null,8,["options"])])}]]);export{re as default};
