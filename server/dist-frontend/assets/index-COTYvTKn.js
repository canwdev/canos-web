import{d as e,W as a,X as t,Y as l,Z as n,N as o,U as i,l as s,o as r,B as p,a as d,$ as c,a0 as u,a1 as b,a2 as v,a3 as k,u as m,a4 as y,_ as g,D as f,a5 as h,a6 as I,a7 as S,a8 as R,a9 as T,aa as A,ab as C,ac as w,ad as O,c as _,b as W,F as E,e as $,n as P,h as L,k as x,ae as B,af as j,r as H,ag as U,w as D,m as N,C as M,g as z}from"./index-Ch1CAwop.js";import{_ as V,S as G}from"./index.vue_vue_type_script_setup_true_lang-ku6N27pC.js";import"./el-tooltip-l0sNRNKZ.js";/* empty css                  *//* empty css                 */const F=e({__name:"SettingsPersonalization",setup(e){const m=()=>{let e='<b><a href="https://www.dujin.org/12142.html" target="_blank">随机壁纸API</a></b>';return[{label:"Bing",url:"https://api.dujin.org/bing/1920.php"},{label:"ACG",url:"https://api.dujin.org/pic/"},{label:"Ghibli",url:"https://api.dujin.org/pic/ghibli"},{label:"风景",url:"https://api.dujin.org/pic/fengjing"}].forEach((a=>{e+=`<br>${a.label}: <a href="${a.url}" target="_blank">${a.url}</a>`})),e};a();const y=t(),{themeOptions:g}=l(),{iconOptions:f}=n(),h=o(i.WALLPAPER_STORAGE,""),I=s((()=>[{label:"个性化",key:"personalization",children:[{label:"主题色",key:"themeColor",store:y,type:G.COLOR_PICKER},{label:"桌面壁纸",key:"desktopWallpaper",store:y,type:y.desktopWallpaper===c?void 0:G.INPUT,tips:m(),placeholder:"optional",actionRender:()=>u("div",{class:"flex-row-center-gap"},[u("button",{class:"vp-button",async onClick(){const[e]=await window.showOpenFilePicker({types:[{description:"Image",accept:{"image/*":[".png",".jpg",".jpeg",".gif",".webp",".svg"]}}]}),a=await e.getFile();y.desktopWallpaper=c,h.value=await b(a)}},"Open..."),y.desktopWallpaper===c&&u("button",{class:"vp-button",onClick(){y.desktopWallpaper=""}},"Clear")].filter(Boolean))},y.desktopWallpaper&&{label:"壁纸尺寸",key:"desktopBackgroundSize",store:y,type:G.SELECT,options:v},{label:"桌面背景色",key:"desktopBgColor",store:y,type:G.COLOR_PICKER},{label:"明暗模式",key:"ldTheme",store:y,type:G.MULTIPLE_SWITCH,options:k},{label:"系统主题",key:"customTheme",store:y,type:G.SELECT,options:g.value},{label:"图标主题",key:"iconTheme",store:y,type:G.SELECT,options:f.value},{label:"Disable Animation",subtitle:"E-Ink optimization",key:"disableAnimation",store:y,type:G.SWITCH}].filter(Boolean)}]));return(e,a)=>(r(),p(V,{"option-list":d(I)},null,8,["option-list"]))}});const q=g(e({name:"SettingsSystem",components:{OptionUI:V},setup(e,{emit:l}){a();const n=t(),o=m();return{optionList:s((()=>{var e,a;return[{label:"软件信息",key:"os_info",children:[{key:"frontend_version",label:"前端版本",subtitle:y.name,actionRender:u("div",y.version)},{key:"backend_version",label:"后端服务器版本",subtitle:o.isBackendAvailable?null==(e=o.serverInfo)?void 0:e.name:"后端服务不可用",actionRender:u("div",o.isBackendAvailable?null==(a=o.serverInfo)?void 0:a.version:"N/A")},{key:"github",label:"仓库地址",subtitle:"作者: Canwdev",actionRender:u("a",{href:"https://github.com/canwdev/canos-web",target:"_blank",rel:"nofollow noopener"},"Github")}].filter(Boolean)},{label:"系统 UI",key:"system_ui",children:[{label:"多窗口模式",key:"isWindowed",store:n,type:G.SWITCH},{label:"任务栏只显示图标",key:"taskbarIconOnly",store:n,type:G.SWITCH},{label:"托盘：FPS",key:"taskbarShowFps",store:n,type:G.SWITCH},{label:"托盘：JS 内存",key:"taskbarShowMemory",store:n,type:G.SWITCH},{label:"托盘：电池",key:"taskbarShowBattery",store:n,type:G.SWITCH},{label:"托盘：时钟",key:"taskbarShowClock",store:n,type:G.SWITCH}]}]}))}}}),[["render",function(e,a,t,l,n,o){const i=f("OptionUI");return r(),p(i,{"option-list":e.optionList},null,8,["option-list"])}]]);const Z=g(e({name:"SettingsPrograms",components:{OptionUI:V},setup(e,{emit:l}){a();const n=t(),o=m();return{optionList:s((()=>{const e={};return n.appAutoStartIds.forEach((a=>{e[a]=!0})),[{label:"应用管理",key:"app_management",children:o.allApps.map((a=>({iconRender:u(h,{name:a.icon}),label:a.title,subtitle:[a.appid,a.singleInstance&&"单例模式",a.requireBackend&&"需要后端服务"].filter(Boolean).join(" | "),key:a.appid,actionRender:u("div",{style:"display:flex; align-items: center; gap:8px;"},[u("button",{class:"vp-button",onClick(){o.createTaskById(a.appid)}},"启动"),u(I,{label:"自动启动",checked:e[a.appid],onClick:()=>{console.log(e),e[a.appid]?delete e[a.appid]:e[a.appid]=!0,n.appAutoStartIds=Object.keys(e)}})])})))}]}))}}}),[["render",function(e,a,t,l,n,o){const i=f("OptionUI");return r(),p(i,{"option-list":e.optionList},null,8,["option-list"])}]]);const Y=g(e({name:"SettingsHardware",components:{OptionUI:V},setup(e,{emit:t}){a();const l=m(),{devices:n}=S(),{pixelRatio:o}=R(),{isOnline:i,offlineAt:r,downlink:p,downlinkMax:d,effectiveType:c,saveData:b,type:v}=T(),{charging:k,chargingTime:y,dischargingTime:g,level:f}=A(),h=e=>C.duration(e,"seconds").format("HH:mm:ss",{trim:!1}),I=e=>u("textarea",{style:"width: 300px; height: 100px; font-size: 12px;",class:"font-code vp-input",readonly:!0,value:e});return{optionList:s((()=>{let e=`电量 ${100*f.value}%`;return k.value?(e+=" (充电中)",e+=`<br>充电完成时间: ${h(y.value)}`):e+=`<br>剩余可用时间: ${h(g.value)}`,[l.isBackendAvailable&&{label:"后端",key:"server",children:[{key:"hostname",label:"服务器系统信息",actionRender:()=>I(`Hostname: ${l.serverInfo.os.hostname}\nPlatform: ${l.serverInfo.os.platform} | Arch: ${l.serverInfo.os.arch}\nOS: ${l.serverInfo.os.type} | ${l.serverInfo.os.version} | ${l.serverInfo.os.release}\nCPU: ${l.serverInfo.os.cpu}\n`)}]},{label:"前端设备信息",key:"frontend",children:[{label:"浏览器网络",actionRender:()=>I(`Is Online: ${i.value}\nOffline At: ${r.value}\nDownlink: ${p.value}\nDownlink Max: ${d.value}\nEffective Type: ${c.value}\nSave Data: ${b.value}\nType: ${v.value}`)},{label:"电池",actionRender:()=>u("div",{style:"text-align: right",innerHTML:e})},{label:"设备像素比",key:"pixelRatio",actionRender:()=>u("div",{innerHTML:`${o.value||"N/A"}`})}]},{label:"前端多媒体设备",key:"devmgmt.msc",children:[{label:"Devices",key:"devices",actionRender:u("button",{class:"vp-button",onClick:()=>{console.log(n.value)}},"Print to Console")},...Array.from(n.value).map((e=>({label:e.label||"/",subtitle:e.kind,actionRender:I(`deviceId: ${e.deviceId||"/"}\ngroupId: ${e.groupId||"/"}`)})))]}].filter(Boolean)}))}}}),[["render",function(e,a,t,l,n,o){const i=f("OptionUI");return r(),p(i,{"option-list":e.optionList},null,8,["option-list"])}]]),K=e({name:"TabLayout",components:{VueRender:w},props:{modelValue:{type:[String,Number],required:!0},horizontal:{type:Boolean,default:!1},options:{type:Array,default:()=>[]}},setup:(e,{emit:a})=>({mValue:O(e,a)})}),J={class:"sidebar-wrap"},X={class:"mc-tab-list"},Q=["onClick","title"],ee={key:1,class:"item-text"},ae={class:"content-wrap"};const te=g(K,[["render",function(e,a,t,l,n,o){const i=f("VueRender");return r(),_("div",{class:P(["mc-vertical-tab-layout vp-bg",{horizontal:e.horizontal}])},[W("div",J,[W("div",X,[(r(!0),_(E,null,$(e.options,(a=>(r(),_("div",{key:a.value,class:P([{active:a.value===e.mValue},"list-item"]),onClick:t=>e.mValue=a.value,title:a.title},[a.render?(r(),p(i,{key:0,"render-fn":a.render},null,8,["render-fn"])):L("",!0),a.label?(r(),_("div",ee,x(a.label),1)):L("",!0)],10,Q)))),128))])]),W("div",ae,[B(e.$slots,"default",{},void 0,!0)])],2)}],["__scopeId","data-v-611ffcd9"]]),le=e({__name:"SettingsWidgets",setup(e){a();const o=t();l(),n();const i=s((()=>{const e={};return o.enabledWidgetIds.forEach((a=>{e[a]=!0})),[{label:"Widgets",key:"widgets",children:j.map((a=>({iconRender:u(h,{name:a.icon}),label:a.title,subtitle:[a.appid,a.singleInstance&&"单例模式",a.requireBackend&&"需要后端服务"].filter(Boolean).join(" | "),key:a.appid,actionRender:u("div",{style:"display:flex; align-items: center; gap:8px;"},[u(I,{label:"启用",checked:e[a.appid],onClick:()=>{e[a.appid]?delete e[a.appid]:e[a.appid]=!0,o.enabledWidgetIds=Object.keys(e)}})])})))}]}));return(e,a)=>(r(),p(V,{"option-list":d(i)},null,8,["option-list"]))}}),ne={class:"settings-app"},oe={class:"settings-content"},ie=g(e({name:"SettingsApp",props:{appParams:{}},setup(e){var a;const t=e,l=H([{label:"个性化",value:U.PERSONALIZATION},{label:"应用程序",value:U.PROGRAMS},{label:"Widgets",value:U.WIDGETS},{label:"硬件",value:U.HARDWARE},{label:"系统",value:U.SYSTEM}]),n=H((null==(a=t.appParams)?void 0:a.curTab)||U.PERSONALIZATION);return D((()=>t.appParams),(()=>{t.appParams&&(n.value=t.appParams.curTab)})),(e,a)=>(r(),_("div",ne,[N(te,{horizontal:"",modelValue:d(n),"onUpdate:modelValue":a[0]||(a[0]=e=>z(n)?n.value=e:null),options:d(l)},{default:M((()=>[W("div",oe,[d(n)===d(U).PERSONALIZATION?(r(),p(F,{key:0})):d(n)===d(U).PROGRAMS?(r(),p(Z,{key:1})):L("",!0),d(n)===d(U).WIDGETS?(r(),p(le,{key:2})):d(n)===d(U).HARDWARE?(r(),p(Y,{key:3})):d(n)===d(U).SYSTEM?(r(),p(q,{key:4})):L("",!0)])])),_:1},8,["modelValue","options"])]))}}),[["__scopeId","data-v-d946fd93"]]);export{ie as default};