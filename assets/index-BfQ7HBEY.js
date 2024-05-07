import{_ as e,o as t,c as i,bX as n,bT as s,b as a,k as c,n as o,d as l,r as d,bH as r,cn as u,cv as m,D as h,c7 as v,a as p,bm as f}from"./index-DSBX7T2Q.js";const y={name:"AnalogClock",props:{},data:()=>({}),mounted(){const e=document.querySelector("#utility-clock");this.utilityClock(e),e.parentNode.classList.contains("apple-clock-fill")&&this.autoResize(e,327)},beforeUnmount(){},methods:{utilityClock(e){const t=function(e,t){e.style.transform=e.style.webkitTransform="rotate("+6*t+"deg)"},i=function(e,t,i){const n=2*t*Math.PI;e.style.top=(-i*Math.cos(n)).toFixed(1)+"px",e.style.left=(i*Math.sin(n)).toFixed(1)+"px"},n=e.querySelector(".dynamic"),s=e.querySelector(".hour"),a=e.querySelector(".minute"),c=e.querySelector(".second"),o=function(e){return e%5==0?function(e){const t=document.createElement("div");t.className="minute-text",t.innerHTML=(e<10?"0":"")+e,i(t,e/60,135),n.appendChild(t)}(e):function(e){const i=document.createElement("div");i.className="anchor";const s=document.createElement("div");s.className="element minute-line",t(i,e),i.appendChild(s),n.appendChild(i)}(e)},l=function(e){const t=document.createElement("div");t.className="hour-text hour-"+e,t.innerHTML=e,i(t,e/12,105),n.appendChild(t)},d=function(){const e=new Date,i=3600*e.getHours()+60*e.getMinutes()+e.getSeconds()+e.getMilliseconds()/1e3;t(c,i),t(a,i/60),t(s,i/60/12),requestAnimationFrame(d)};for(let r=1;r<=60;r++)o(r);for(let r=1;r<=12;r++)l(r);d()},autoResize(e,t){const i=function(){const i=Math.min(window.innerWidth,window.innerHeight)/t;e.style.transform=e.style.webkitTransform="scale("+i.toFixed(3)+")"};i(),window.addEventListener("resize",i)}}},k={class:"apple-clock-wrapper"},g=[n('<div class="apple-clock-fill"><div class="reference"></div><div class="apple-clock" id="utility-clock"><div class="clock-centre"><div class="dynamic"></div><div class="expand round circle-1"></div><div class="anchor hour"><div class="element thin-hand"></div><div class="element fat-hand"></div></div><div class="anchor minute"><div class="element thin-hand"></div><div class="element fat-hand minute-hand"></div></div><div class="anchor second"><div class="element second-hand"></div></div><div class="expand round circle-2"></div><div class="expand round circle-3"></div></div></div></div>',1)];const T=e(y,[["render",function(e,n,s,a,c,o){return t(),i("div",k,g)}]]);s.locale(navigator.language||"zh-CN");const b={name:"DigitalClock",props:{isLightTheme:{type:Boolean,default:!1},isMini:{type:Boolean,default:!1}},data:()=>({lastDateText:"",timeout:null,accTime:"",accDate:""}),mounted(){this.updateTime(),this.timer(this.updateTime)},beforeUnmount(){clearTimeout(this.timeout)},methods:{timer(e){const t=()=>{const s=Date.now()-n;s>i&&console.warn('something really bad happened. Maybe the browser (tab) was inactive?\npossibly special handling to avoid futile "catch up" run'),e(),n+=i,this.timeout=setTimeout(t,Math.max(0,i-s))},i=1e3;let n=Date.now()+i;this.timeout=setTimeout(t,i)},updateTime(){const e=new Date;this.accTime=s(e).format("HH:mm:ss");const t=s(e).format("LL dddd");t!==this.lastDateText&&(this.accDate=t,this.lastDateText=t)}}},w={class:"clock-centered"};const x=e(b,[["render",function(e,n,s,l,d,r){return t(),i("div",{class:o(["digital-clock-wrapper",{"is-mini":s.isMini}])},[a("div",w,[a("h1",null,c(d.accTime),1),a("h2",null,c(d.accDate),1)])],2)}]]),D={class:"float-bar"},M=e(l({__name:"index",setup(e){const n=d(),s=r("is_digital_clock",!1),{isFullscreen:c,toggle:l}=u(n),{isSupported:y,isActive:k,request:g,release:b}=m();return h((()=>{g("screen")})),v((()=>{b()})),(e,d)=>(t(),i("div",{ref_key:"rootRef",ref:n,class:o(["screen-clock",{isFullscreen:p(c)}])},[a("div",D,[a("button",{title:"Fullscreen",onClick:d[0]||(d[0]=(...e)=>p(l)&&p(l)(...e))},"⌗"),a("button",{title:"Toggle",onClick:d[1]||(d[1]=e=>s.value=!p(s))},"✱")]),p(s)?(t(),f(x,{key:0})):(t(),f(T,{key:1}))],2))}}),[["__scopeId","data-v-67ec6c3c"]]);export{M as default};
