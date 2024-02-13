import{d as G,u as Yo,o as yt,a as Zn,b as Jn,c as P,r as B,e as Ht,f as Te,p as tt,h as s,m as Qn,V as Oo,n as It,g as er,i as Fo,j as Go,k as _,l as g,q as W,s as Be,t as pe,v as tr,w as at,x as or,y as ae,z as Pe,N as Gt,A as ht,T as Co,B as H,C as Ue,D as ko,E as fe,F as nr,G as qe,H as io,I as rt,J as Fe,K as Xo,L as So,M as rr,O as Xt,P as lr,Q as de,R as Zo,S as Mo,U as ir,W as Pt,X as he,Y as ar,Z as _o,_ as sr,$ as Ot,a0 as cr,a1 as Ye,a2 as De,a3 as Ge,a4 as ot,a5 as Le,a6 as vt,a7 as nt,a8 as gt,a9 as bt,aa as Tt,ab as po,ac as go,ad as bo,ae as dr,af as Zt,ag as Jo,ah as Qo,ai as Ft,aj as mo,ak as ur,al as Rt,am as Ro,an as hr,ao as fr,ap as en,aq as vr,ar as pr,as as gr,at as Bo,au as br,av as tn,aw as ao,ax as mr,ay as yr,az as wr,aA as xr,aB as Ao,aC as so,aD as Cr,aE as Jt,aF as Ne,aG as Q,aH as be,aI as kr,aJ as ue,aK as co,aL as $t,aM as Ke,aN as pt,aO as Sr,aP as _r,aQ as Rr,aR as Qt,aS as me,aT as je,aU as ft,aV as eo,aW as To,aX as on,aY as Tr,aZ as Eo,a_ as nn,a$ as $r,b0 as Vo,b1 as zr,b2 as kt,b3 as uo,b4 as Ir}from"./index-cc315b76.js";import{c as rn,a as jt,b as Pr,u as to,i as $o,d as Or,N as Fr,_ as ln,e as zo,f as lt,g as mt,V as an,h as sn,j as cn}from"./Input-4810dfa0.js";import{_ as Mr}from"./Slider-ef9fc453.js";import{c as Br,h as qt,a as Ar,C as Er}from"./create-b0870b90.js";import{u as Vr}from"./use-compitable-42064c6e.js";import{s as Dr,_ as Io}from"./Space-dfdd7f4a.js";function dn(e,t,o){t/=100,o/=100;const n=t*Math.min(o,1-o)+o;return[e,n?(2-2*o/n)*100:0,n*100]}function Wt(e,t,o){t/=100,o/=100;const n=o-o*t/2,r=Math.min(n,1-n);return[e,r?(o-n)/r*100:0,n*100]}function We(e,t,o){t/=100,o/=100;let n=(r,l=(r+e/60)%6)=>o-o*t*Math.max(Math.min(l,4-l,1),0);return[n(5)*255,n(3)*255,n(1)*255]}function yo(e,t,o){e/=255,t/=255,o/=255;let n=Math.max(e,t,o),r=n-Math.min(e,t,o),l=r&&(n==e?(t-o)/r:n==t?2+(o-e)/r:4+(e-t)/r);return[60*(l<0?l+6:l),n&&r/n*100,n*100]}function wo(e,t,o){e/=255,t/=255,o/=255;let n=Math.max(e,t,o),r=n-Math.min(e,t,o),l=1-Math.abs(n+n-r-1),a=r&&(n==e?(t-o)/r:n==t?2+(o-e)/r:4+(e-t)/r);return[60*(a<0?a+6:a),l?r/l*100:0,(n+n-r)*50]}function xo(e,t,o){t/=100,o/=100;let n=t*Math.min(o,1-o),r=(l,a=(l+e/30)%12)=>o-n*Math.max(Math.min(a-3,9-a,1),-1);return[r(0)*255,r(8)*255,r(4)*255]}function Ur(e){switch(e){case"tiny":return"mini";case"small":return"tiny";case"medium":return"small";case"large":return"medium";case"huge":return"large"}throw Error(`${e} has no smaller size.`)}function Lr(e){switch(typeof e){case"string":return e||void 0;case"number":return String(e);default:return}}function ho(e){const t=e.filter(o=>o!==void 0);if(t.length!==0)return t.length===1?t[0]:o=>{e.forEach(n=>{n&&n(o)})}}function Do(e){return e&-e}class Nr{constructor(t,o){this.l=t,this.min=o;const n=new Array(t+1);for(let r=0;r<t+1;++r)n[r]=0;this.ft=n}add(t,o){if(o===0)return;const{l:n,ft:r}=this;for(t+=1;t<=n;)r[t]+=o,t+=Do(t)}get(t){return this.sum(t+1)-this.sum(t)}sum(t){if(t===void 0&&(t=this.l),t<=0)return 0;const{ft:o,min:n,l:r}=this;if(t>r)throw new Error("[FinweckTree.sum]: `i` is larger than length.");let l=t*n;for(;t>0;)l+=o[t],t-=Do(t);return l}getBound(t){let o=0,n=this.l;for(;n>o;){const r=Math.floor((o+n)/2),l=this.sum(r);if(l>t){n=r;continue}else if(l<t){if(o===r)return this.sum(o+1)<=t?o+1:r;o=r}else return r}return o}}let Ut;function Hr(){return Ut===void 0&&("matchMedia"in window?Ut=window.matchMedia("(pointer:coarse)").matches:Ut=!1),Ut}let fo;function Uo(){return fo===void 0&&(fo="chrome"in window?window.devicePixelRatio:1),fo}const jr=jt(".v-vl",{maxHeight:"inherit",height:"100%",overflow:"auto",minWidth:"1px"},[jt("&:not(.v-vl--show-scrollbar)",{scrollbarWidth:"none"},[jt("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb",{width:0,height:0,display:"none"})])]),Wr=G({name:"VirtualList",inheritAttrs:!1,props:{showScrollbar:{type:Boolean,default:!0},items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:"div"},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:"key"},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},setup(e){const t=Yo();jr.mount({id:"vueuc/virtual-list",head:!0,anchorMetaName:rn,ssr:t}),yt(()=>{const{defaultScrollIndex:m,defaultScrollKey:$}=e;m!=null?h({index:m}):$!=null&&h({key:$})});let o=!1,n=!1;Zn(()=>{if(o=!1,!n){n=!0;return}h({top:f.value,left:b})}),Jn(()=>{o=!0,n||(n=!0)});const r=P(()=>{const m=new Map,{keyField:$}=e;return e.items.forEach((L,X)=>{m.set(L[$],X)}),m}),l=B(null),a=B(void 0),i=new Map,c=P(()=>{const{items:m,itemSize:$,keyField:L}=e,X=new Nr(m.length,$);return m.forEach((Y,ee)=>{const K=Y[L],Z=i.get(K);Z!==void 0&&X.add(ee,Z)}),X}),d=B(0);let b=0;const f=B(0),w=Ht(()=>Math.max(c.value.getBound(f.value-Te(e.paddingTop))-1,0)),C=P(()=>{const{value:m}=a;if(m===void 0)return[];const{items:$,itemSize:L}=e,X=w.value,Y=Math.min(X+Math.ceil(m/L+1),$.length-1),ee=[];for(let K=X;K<=Y;++K)ee.push($[K]);return ee}),h=(m,$)=>{if(typeof m=="number"){I(m,$,"auto");return}const{left:L,top:X,index:Y,key:ee,position:K,behavior:Z,debounce:S=!0}=m;if(L!==void 0||X!==void 0)I(L,X,Z);else if(Y!==void 0)k(Y,Z,S);else if(ee!==void 0){const F=r.value.get(ee);F!==void 0&&k(F,Z,S)}else K==="bottom"?I(0,Number.MAX_SAFE_INTEGER,Z):K==="top"&&I(0,0,Z)};let y,x=null;function k(m,$,L){const{value:X}=c,Y=X.sum(m)+Te(e.paddingTop);if(!L)l.value.scrollTo({left:0,top:Y,behavior:$});else{y=m,x!==null&&window.clearTimeout(x),x=window.setTimeout(()=>{y=void 0,x=null},16);const{scrollTop:ee,offsetHeight:K}=l.value;if(Y>ee){const Z=X.get(m);Y+Z<=ee+K||l.value.scrollTo({left:0,top:Y+Z-K,behavior:$})}else l.value.scrollTo({left:0,top:Y,behavior:$})}}function I(m,$,L){l.value.scrollTo({left:m,top:$,behavior:L})}function V(m,$){var L,X,Y;if(o||e.ignoreItemResize||E($.target))return;const{value:ee}=c,K=r.value.get(m),Z=ee.get(K),S=(Y=(X=(L=$.borderBoxSize)===null||L===void 0?void 0:L[0])===null||X===void 0?void 0:X.blockSize)!==null&&Y!==void 0?Y:$.contentRect.height;if(S===Z)return;S-e.itemSize===0?i.delete(m):i.set(m,S-e.itemSize);const j=S-Z;if(j===0)return;ee.add(K,j);const se=l.value;if(se!=null){if(y===void 0){const ke=ee.sum(K);se.scrollTop>ke&&se.scrollBy(0,j)}else if(K<y)se.scrollBy(0,j);else if(K===y){const ke=ee.sum(K);S+ke>se.scrollTop+se.offsetHeight&&se.scrollBy(0,j)}R()}d.value++}const U=!Hr();let D=!1;function O(m){var $;($=e.onScroll)===null||$===void 0||$.call(e,m),(!U||!D)&&R()}function A(m){var $;if(($=e.onWheel)===null||$===void 0||$.call(e,m),U){const L=l.value;if(L!=null){if(m.deltaX===0&&(L.scrollTop===0&&m.deltaY<=0||L.scrollTop+L.offsetHeight>=L.scrollHeight&&m.deltaY>=0))return;m.preventDefault(),L.scrollTop+=m.deltaY/Uo(),L.scrollLeft+=m.deltaX/Uo(),R(),D=!0,Pr(()=>{D=!1})}}}function v(m){if(o||E(m.target)||m.contentRect.height===a.value)return;a.value=m.contentRect.height;const{onResize:$}=e;$!==void 0&&$(m)}function R(){const{value:m}=l;m!=null&&(f.value=m.scrollTop,b=m.scrollLeft)}function E(m){let $=m;for(;$!==null;){if($.style.display==="none")return!0;$=$.parentElement}return!1}return{listHeight:a,listStyle:{overflow:"auto"},keyToIndex:r,itemsStyle:P(()=>{const{itemResizable:m}=e,$=tt(c.value.sum());return d.value,[e.itemsStyle,{boxSizing:"content-box",height:m?"":$,minHeight:m?$:"",paddingTop:tt(e.paddingTop),paddingBottom:tt(e.paddingBottom)}]}),visibleItemsStyle:P(()=>(d.value,{transform:`translateY(${tt(c.value.sum(w.value))})`})),viewportItems:C,listElRef:l,itemsElRef:B(null),scrollTo:h,handleListResize:v,handleListScroll:O,handleListWheel:A,handleItemResize:V}},render(){const{itemResizable:e,keyField:t,keyToIndex:o,visibleItemsTag:n}=this;return s(Oo,{onResize:this.handleListResize},{default:()=>{var r,l;return s("div",Qn(this.$attrs,{class:["v-vl",this.showScrollbar&&"v-vl--show-scrollbar"],onScroll:this.handleListScroll,onWheel:this.handleListWheel,ref:"listElRef"}),[this.items.length!==0?s("div",{ref:"itemsElRef",class:"v-vl-items",style:this.itemsStyle},[s(n,Object.assign({class:"v-vl-visible-items",style:this.visibleItemsStyle},this.visibleItemsProps),{default:()=>this.viewportItems.map(a=>{const i=a[t],c=o.get(i),d=this.$slots.default({item:a,index:c})[0];return e?s(Oo,{key:i,onResize:b=>this.handleItemResize(i,b)},{default:()=>d}):(d.key=i,d)})})]):(l=(r=this.$slots).empty)===null||l===void 0?void 0:l.call(r)])}})}}),Je="v-hidden",Kr=jt("[v-hidden]",{display:"none!important"}),Lo=G({name:"Overflow",props:{getCounter:Function,getTail:Function,updateCounter:Function,onUpdateOverflow:Function},setup(e,{slots:t}){const o=B(null),n=B(null);function r(){const{value:a}=o,{getCounter:i,getTail:c}=e;let d;if(i!==void 0?d=i():d=n.value,!a||!d)return;d.hasAttribute(Je)&&d.removeAttribute(Je);const{children:b}=a,f=a.offsetWidth,w=[],C=t.tail?c==null?void 0:c():null;let h=C?C.offsetWidth:0,y=!1;const x=a.children.length-(t.tail?1:0);for(let I=0;I<x-1;++I){if(I<0)continue;const V=b[I];if(y){V.hasAttribute(Je)||V.setAttribute(Je,"");continue}else V.hasAttribute(Je)&&V.removeAttribute(Je);const U=V.offsetWidth;if(h+=U,w[I]=U,h>f){const{updateCounter:D}=e;for(let O=I;O>=0;--O){const A=x-1-O;D!==void 0?D(A):d.textContent=`${A}`;const v=d.offsetWidth;if(h-=w[O],h+v<=f||O===0){y=!0,I=O-1,C&&(I===-1?(C.style.maxWidth=`${f-v}px`,C.style.boxSizing="border-box"):C.style.maxWidth="");break}}}}const{onUpdateOverflow:k}=e;y?k!==void 0&&k(!0):(k!==void 0&&k(!1),d.setAttribute(Je,""))}const l=Yo();return Kr.mount({id:"vueuc/overflow",head:!0,anchorMetaName:rn,ssr:l}),yt(r),{selfRef:o,counterRef:n,sync:r}},render(){const{$slots:e}=this;return It(this.sync),s("div",{class:"v-overflow",ref:"selfRef"},[er(e,"default"),e.counter?e.counter():s("span",{style:{display:"inline-block"},ref:"counterRef"}),e.tail?e.tail():null])}});function un(e,t){t&&(yt(()=>{const{value:o}=e;o&&Fo.registerHandler(o,t)}),Go(()=>{const{value:o}=e;o&&Fo.unregisterHandler(o)}))}const qr=G({name:"Add",render(){return s("svg",{width:"512",height:"512",viewBox:"0 0 512 512",fill:"none",xmlns:"http://www.w3.org/2000/svg"},s("path",{d:"M256 112V400M400 256H112",stroke:"currentColor","stroke-width":"32","stroke-linecap":"round","stroke-linejoin":"round"}))}}),Yr=G({name:"Checkmark",render(){return s("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16"},s("g",{fill:"none"},s("path",{d:"M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z",fill:"currentColor"})))}}),Gr=G({name:"Empty",render(){return s("svg",{viewBox:"0 0 28 28",fill:"none",xmlns:"http://www.w3.org/2000/svg"},s("path",{d:"M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z",fill:"currentColor"}),s("path",{d:"M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z",fill:"currentColor"}))}}),Xr=G({props:{onFocus:Function,onBlur:Function},setup(e){return()=>s("div",{style:"width: 0; height: 0",tabindex:0,onFocus:e.onFocus,onBlur:e.onBlur})}}),Zr=_("empty",`
 display: flex;
 flex-direction: column;
 align-items: center;
 font-size: var(--n-font-size);
`,[g("icon",`
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 line-height: var(--n-icon-size);
 color: var(--n-icon-color);
 transition:
 color .3s var(--n-bezier);
 `,[W("+",[g("description",`
 margin-top: 8px;
 `)])]),g("description",`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),g("extra",`
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]),Jr=Object.assign(Object.assign({},pe.props),{description:String,showDescription:{type:Boolean,default:!0},showIcon:{type:Boolean,default:!0},size:{type:String,default:"medium"},renderIcon:Function}),Qr=G({name:"Empty",props:Jr,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:o}=Be(e),n=pe("Empty","-empty",Zr,tr,e,t),{localeRef:r}=to("Empty"),l=at(or,null),a=P(()=>{var b,f,w;return(b=e.description)!==null&&b!==void 0?b:(w=(f=l==null?void 0:l.mergedComponentPropsRef.value)===null||f===void 0?void 0:f.Empty)===null||w===void 0?void 0:w.description}),i=P(()=>{var b,f;return((f=(b=l==null?void 0:l.mergedComponentPropsRef.value)===null||b===void 0?void 0:b.Empty)===null||f===void 0?void 0:f.renderIcon)||(()=>s(Gr,null))}),c=P(()=>{const{size:b}=e,{common:{cubicBezierEaseInOut:f},self:{[ae("iconSize",b)]:w,[ae("fontSize",b)]:C,textColor:h,iconColor:y,extraTextColor:x}}=n.value;return{"--n-icon-size":w,"--n-font-size":C,"--n-bezier":f,"--n-text-color":h,"--n-icon-color":y,"--n-extra-text-color":x}}),d=o?Pe("empty",P(()=>{let b="";const{size:f}=e;return b+=f[0],b}),c,e):void 0;return{mergedClsPrefix:t,mergedRenderIcon:i,localizedDescription:P(()=>a.value||r.value.description),cssVars:o?void 0:c,themeClass:d==null?void 0:d.themeClass,onRender:d==null?void 0:d.onRender}},render(){const{$slots:e,mergedClsPrefix:t,onRender:o}=this;return o==null||o(),s("div",{class:[`${t}-empty`,this.themeClass],style:this.cssVars},this.showIcon?s("div",{class:`${t}-empty__icon`},e.icon?e.icon():s(Gt,{clsPrefix:t},{default:this.mergedRenderIcon})):null,this.showDescription?s("div",{class:`${t}-empty__description`},e.default?e.default():this.localizedDescription):null,e.extra?s("div",{class:`${t}-empty__extra`},e.extra()):null)}});function el(e,t){return s(Co,{name:"fade-in-scale-up-transition"},{default:()=>e?s(Gt,{clsPrefix:t,class:`${t}-base-select-option__check`},{default:()=>s(Yr)}):null})}const No=G({name:"NBaseSelectOption",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){const{valueRef:t,pendingTmNodeRef:o,multipleRef:n,valueSetRef:r,renderLabelRef:l,renderOptionRef:a,labelFieldRef:i,valueFieldRef:c,showCheckmarkRef:d,nodePropsRef:b,handleOptionClick:f,handleOptionMouseEnter:w}=at($o),C=Ht(()=>{const{value:k}=o;return k?e.tmNode.key===k.key:!1});function h(k){const{tmNode:I}=e;I.disabled||f(k,I)}function y(k){const{tmNode:I}=e;I.disabled||w(k,I)}function x(k){const{tmNode:I}=e,{value:V}=C;I.disabled||V||w(k,I)}return{multiple:n,isGrouped:Ht(()=>{const{tmNode:k}=e,{parent:I}=k;return I&&I.rawNode.type==="group"}),showCheckmark:d,nodeProps:b,isPending:C,isSelected:Ht(()=>{const{value:k}=t,{value:I}=n;if(k===null)return!1;const V=e.tmNode.rawNode[c.value];if(I){const{value:U}=r;return U.has(V)}else return k===V}),labelField:i,renderLabel:l,renderOption:a,handleMouseMove:x,handleMouseEnter:y,handleClick:h}},render(){const{clsPrefix:e,tmNode:{rawNode:t},isSelected:o,isPending:n,isGrouped:r,showCheckmark:l,nodeProps:a,renderOption:i,renderLabel:c,handleClick:d,handleMouseEnter:b,handleMouseMove:f}=this,w=el(o,e),C=c?[c(t,o),l&&w]:[ht(t[this.labelField],t,o),l&&w],h=a==null?void 0:a(t),y=s("div",Object.assign({},h,{class:[`${e}-base-select-option`,t.class,h==null?void 0:h.class,{[`${e}-base-select-option--disabled`]:t.disabled,[`${e}-base-select-option--selected`]:o,[`${e}-base-select-option--grouped`]:r,[`${e}-base-select-option--pending`]:n,[`${e}-base-select-option--show-checkmark`]:l}],style:[(h==null?void 0:h.style)||"",t.style||""],onClick:ho([d,h==null?void 0:h.onClick]),onMouseenter:ho([b,h==null?void 0:h.onMouseenter]),onMousemove:ho([f,h==null?void 0:h.onMousemove])}),s("div",{class:`${e}-base-select-option__content`},C));return t.render?t.render({node:y,option:t,selected:o}):i?i({node:y,option:t,selected:o}):y}}),Ho=G({name:"NBaseSelectGroupHeader",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){const{renderLabelRef:e,renderOptionRef:t,labelFieldRef:o,nodePropsRef:n}=at($o);return{labelField:o,nodeProps:n,renderLabel:e,renderOption:t}},render(){const{clsPrefix:e,renderLabel:t,renderOption:o,nodeProps:n,tmNode:{rawNode:r}}=this,l=n==null?void 0:n(r),a=t?t(r,!1):ht(r[this.labelField],r,!1),i=s("div",Object.assign({},l,{class:[`${e}-base-select-group-header`,l==null?void 0:l.class]}),a);return r.render?r.render({node:i,option:r}):o?o({node:i,option:r,selected:!1}):i}}),tl=_("base-select-menu",`
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`,[_("scrollbar",`
 max-height: var(--n-height);
 `),_("virtual-list",`
 max-height: var(--n-height);
 `),_("base-select-option",`
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `,[g("content",`
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]),_("base-select-group-header",`
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `),_("base-select-menu-option-wrapper",`
 position: relative;
 width: 100%;
 `),g("loading, empty",`
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `),g("loading",`
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `),g("action",`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),_("base-select-group-header",`
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `),_("base-select-option",`
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `,[H("show-checkmark",`
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `),W("&::before",`
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),W("&:active",`
 color: var(--n-option-text-color-pressed);
 `),H("grouped",`
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `),H("pending",[W("&::before",`
 background-color: var(--n-option-color-pending);
 `)]),H("selected",`
 color: var(--n-option-text-color-active);
 `,[W("&::before",`
 background-color: var(--n-option-color-active);
 `),H("pending",[W("&::before",`
 background-color: var(--n-option-color-active-pending);
 `)])]),H("disabled",`
 cursor: not-allowed;
 `,[Ue("selected",`
 color: var(--n-option-text-color-disabled);
 `),H("selected",`
 opacity: var(--n-option-opacity-disabled);
 `)]),g("check",`
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `,[ko({enterScale:"0.5"})])])]),ol=G({name:"InternalSelectMenu",props:Object.assign(Object.assign({},pe.props),{clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:"medium"},value:{type:[String,Number,Array],default:null},autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,nodeProps:Function,showCheckmark:{type:Boolean,default:!0},onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,onResize:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,onToggle:Function}),setup(e){const t=pe("InternalSelectMenu","-internal-select-menu",tl,nr,e,fe(e,"clsPrefix")),o=B(null),n=B(null),r=B(null),l=P(()=>e.treeMate.getFlattenedNodes()),a=P(()=>Br(l.value)),i=B(null);function c(){const{treeMate:S}=e;let F=null;const{value:j}=e;j===null?F=S.getFirstAvailableNode():(e.multiple?F=S.getNode((j||[])[(j||[]).length-1]):F=S.getNode(j),(!F||F.disabled)&&(F=S.getFirstAvailableNode())),m(F||null)}function d(){const{value:S}=i;S&&!e.treeMate.getNode(S.key)&&(i.value=null)}let b;qe(()=>e.show,S=>{S?b=qe(()=>e.treeMate,()=>{e.resetMenuOnOptionsChange?(e.autoPending?c():d(),It($)):d()},{immediate:!0}):b==null||b()},{immediate:!0}),Go(()=>{b==null||b()});const f=P(()=>Te(t.value.self[ae("optionHeight",e.size)])),w=P(()=>io(t.value.self[ae("padding",e.size)])),C=P(()=>e.multiple&&Array.isArray(e.value)?new Set(e.value):new Set),h=P(()=>{const S=l.value;return S&&S.length===0});function y(S){const{onToggle:F}=e;F&&F(S)}function x(S){const{onScroll:F}=e;F&&F(S)}function k(S){var F;(F=r.value)===null||F===void 0||F.sync(),x(S)}function I(){var S;(S=r.value)===null||S===void 0||S.sync()}function V(){const{value:S}=i;return S||null}function U(S,F){F.disabled||m(F,!1)}function D(S,F){F.disabled||y(F)}function O(S){var F;qt(S,"action")||(F=e.onKeyup)===null||F===void 0||F.call(e,S)}function A(S){var F;qt(S,"action")||(F=e.onKeydown)===null||F===void 0||F.call(e,S)}function v(S){var F;(F=e.onMousedown)===null||F===void 0||F.call(e,S),!e.focusable&&S.preventDefault()}function R(){const{value:S}=i;S&&m(S.getNext({loop:!0}),!0)}function E(){const{value:S}=i;S&&m(S.getPrev({loop:!0}),!0)}function m(S,F=!1){i.value=S,F&&$()}function $(){var S,F;const j=i.value;if(!j)return;const se=a.value(j.key);se!==null&&(e.virtualScroll?(S=n.value)===null||S===void 0||S.scrollTo({index:se}):(F=r.value)===null||F===void 0||F.scrollTo({index:se,elSize:f.value}))}function L(S){var F,j;!((F=o.value)===null||F===void 0)&&F.contains(S.target)&&((j=e.onFocus)===null||j===void 0||j.call(e,S))}function X(S){var F,j;!((F=o.value)===null||F===void 0)&&F.contains(S.relatedTarget)||(j=e.onBlur)===null||j===void 0||j.call(e,S)}rt($o,{handleOptionMouseEnter:U,handleOptionClick:D,valueSetRef:C,pendingTmNodeRef:i,nodePropsRef:fe(e,"nodeProps"),showCheckmarkRef:fe(e,"showCheckmark"),multipleRef:fe(e,"multiple"),valueRef:fe(e,"value"),renderLabelRef:fe(e,"renderLabel"),renderOptionRef:fe(e,"renderOption"),labelFieldRef:fe(e,"labelField"),valueFieldRef:fe(e,"valueField")}),rt(Or,o),yt(()=>{const{value:S}=r;S&&S.sync()});const Y=P(()=>{const{size:S}=e,{common:{cubicBezierEaseInOut:F},self:{height:j,borderRadius:se,color:ke,groupHeaderTextColor:$e,actionDividerColor:ze,optionTextColorPressed:ie,optionTextColor:Se,optionTextColorDisabled:ve,optionTextColorActive:xe,optionOpacityDisabled:Oe,optionCheckColor:Re,actionTextColor:Xe,optionColorPending:Ae,optionColorActive:Ee,loadingColor:Ve,loadingSize:_e,optionColorActivePending:Ze,[ae("optionFontSize",S)]:T,[ae("optionHeight",S)]:J,[ae("optionPadding",S)]:te}}=t.value;return{"--n-height":j,"--n-action-divider-color":ze,"--n-action-text-color":Xe,"--n-bezier":F,"--n-border-radius":se,"--n-color":ke,"--n-option-font-size":T,"--n-group-header-text-color":$e,"--n-option-check-color":Re,"--n-option-color-pending":Ae,"--n-option-color-active":Ee,"--n-option-color-active-pending":Ze,"--n-option-height":J,"--n-option-opacity-disabled":Oe,"--n-option-text-color":Se,"--n-option-text-color-active":xe,"--n-option-text-color-disabled":ve,"--n-option-text-color-pressed":ie,"--n-option-padding":te,"--n-option-padding-left":io(te,"left"),"--n-option-padding-right":io(te,"right"),"--n-loading-color":Ve,"--n-loading-size":_e}}),{inlineThemeDisabled:ee}=e,K=ee?Pe("internal-select-menu",P(()=>e.size[0]),Y,e):void 0,Z={selfRef:o,next:R,prev:E,getPendingTmNode:V};return un(o,e.onResize),Object.assign({mergedTheme:t,virtualListRef:n,scrollbarRef:r,itemSize:f,padding:w,flattenedNodes:l,empty:h,virtualListContainer(){const{value:S}=n;return S==null?void 0:S.listElRef},virtualListContent(){const{value:S}=n;return S==null?void 0:S.itemsElRef},doScroll:x,handleFocusin:L,handleFocusout:X,handleKeyUp:O,handleKeyDown:A,handleMouseDown:v,handleVirtualListResize:I,handleVirtualListScroll:k,cssVars:ee?void 0:Y,themeClass:K==null?void 0:K.themeClass,onRender:K==null?void 0:K.onRender},Z)},render(){const{$slots:e,virtualScroll:t,clsPrefix:o,mergedTheme:n,themeClass:r,onRender:l}=this;return l==null||l(),s("div",{ref:"selfRef",tabindex:this.focusable?0:-1,class:[`${o}-base-select-menu`,r,this.multiple&&`${o}-base-select-menu--multiple`],style:this.cssVars,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},this.loading?s("div",{class:`${o}-base-select-menu__loading`},s(Xo,{clsPrefix:o,strokeWidth:20})):this.empty?s("div",{class:`${o}-base-select-menu__empty`,"data-empty":!0},rr(e.empty,()=>[s(Qr,{theme:n.peers.Empty,themeOverrides:n.peerOverrides.Empty})])):s(So,{ref:"scrollbarRef",theme:n.peers.Scrollbar,themeOverrides:n.peerOverrides.Scrollbar,scrollable:this.scrollable,container:t?this.virtualListContainer:void 0,content:t?this.virtualListContent:void 0,onScroll:t?void 0:this.doScroll},{default:()=>t?s(Wr,{ref:"virtualListRef",class:`${o}-virtual-list`,items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:a})=>a.isGroup?s(Ho,{key:a.key,clsPrefix:o,tmNode:a}):a.ignored?null:s(No,{clsPrefix:o,key:a.key,tmNode:a})}):s("div",{class:`${o}-base-select-menu-option-wrapper`,style:{paddingTop:this.padding.top,paddingBottom:this.padding.bottom}},this.flattenedNodes.map(a=>a.isGroup?s(Ho,{key:a.key,clsPrefix:o,tmNode:a}):s(No,{clsPrefix:o,key:a.key,tmNode:a})))}),Fe(e.action,a=>a&&[s("div",{class:`${o}-base-select-menu__action`,"data-action":!0,key:"action"},a),s(Xr,{onFocus:this.onTabOut,key:"focus-detector"})]))}}),nl=e=>{const{textColor2:t,primaryColorHover:o,primaryColorPressed:n,primaryColor:r,infoColor:l,successColor:a,warningColor:i,errorColor:c,baseColor:d,borderColor:b,opacityDisabled:f,tagColor:w,closeIconColor:C,closeIconColorHover:h,closeIconColorPressed:y,borderRadiusSmall:x,fontSizeMini:k,fontSizeTiny:I,fontSizeSmall:V,fontSizeMedium:U,heightMini:D,heightTiny:O,heightSmall:A,heightMedium:v,closeColorHover:R,closeColorPressed:E,buttonColor2Hover:m,buttonColor2Pressed:$,fontWeightStrong:L}=e;return Object.assign(Object.assign({},lr),{closeBorderRadius:x,heightTiny:D,heightSmall:O,heightMedium:A,heightLarge:v,borderRadius:x,opacityDisabled:f,fontSizeTiny:k,fontSizeSmall:I,fontSizeMedium:V,fontSizeLarge:U,fontWeightStrong:L,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:d,colorCheckable:"#0000",colorHoverCheckable:m,colorPressedCheckable:$,colorChecked:r,colorCheckedHover:o,colorCheckedPressed:n,border:`1px solid ${b}`,textColor:t,color:w,colorBordered:"rgb(250, 250, 252)",closeIconColor:C,closeIconColorHover:h,closeIconColorPressed:y,closeColorHover:R,closeColorPressed:E,borderPrimary:`1px solid ${de(r,{alpha:.3})}`,textColorPrimary:r,colorPrimary:de(r,{alpha:.12}),colorBorderedPrimary:de(r,{alpha:.1}),closeIconColorPrimary:r,closeIconColorHoverPrimary:r,closeIconColorPressedPrimary:r,closeColorHoverPrimary:de(r,{alpha:.12}),closeColorPressedPrimary:de(r,{alpha:.18}),borderInfo:`1px solid ${de(l,{alpha:.3})}`,textColorInfo:l,colorInfo:de(l,{alpha:.12}),colorBorderedInfo:de(l,{alpha:.1}),closeIconColorInfo:l,closeIconColorHoverInfo:l,closeIconColorPressedInfo:l,closeColorHoverInfo:de(l,{alpha:.12}),closeColorPressedInfo:de(l,{alpha:.18}),borderSuccess:`1px solid ${de(a,{alpha:.3})}`,textColorSuccess:a,colorSuccess:de(a,{alpha:.12}),colorBorderedSuccess:de(a,{alpha:.1}),closeIconColorSuccess:a,closeIconColorHoverSuccess:a,closeIconColorPressedSuccess:a,closeColorHoverSuccess:de(a,{alpha:.12}),closeColorPressedSuccess:de(a,{alpha:.18}),borderWarning:`1px solid ${de(i,{alpha:.35})}`,textColorWarning:i,colorWarning:de(i,{alpha:.15}),colorBorderedWarning:de(i,{alpha:.12}),closeIconColorWarning:i,closeIconColorHoverWarning:i,closeIconColorPressedWarning:i,closeColorHoverWarning:de(i,{alpha:.12}),closeColorPressedWarning:de(i,{alpha:.18}),borderError:`1px solid ${de(c,{alpha:.23})}`,textColorError:c,colorError:de(c,{alpha:.1}),colorBorderedError:de(c,{alpha:.08}),closeIconColorError:c,closeIconColorHoverError:c,closeIconColorPressedError:c,closeColorHoverError:de(c,{alpha:.12}),closeColorPressedError:de(c,{alpha:.18})})},rl={name:"Tag",common:Xt,self:nl},hn=rl,fn={color:Object,type:{type:String,default:"default"},round:Boolean,size:{type:String,default:"medium"},closable:Boolean,disabled:{type:Boolean,default:void 0}},ll=_("tag",`
 white-space: nowrap;
 position: relative;
 box-sizing: border-box;
 cursor: default;
 display: inline-flex;
 align-items: center;
 flex-wrap: nowrap;
 padding: var(--n-padding);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 transition: 
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 line-height: 1;
 height: var(--n-height);
 font-size: var(--n-font-size);
`,[H("strong",`
 font-weight: var(--n-font-weight-strong);
 `),g("border",`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),g("icon",`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),g("avatar",`
 display: flex;
 margin: 0 6px 0 0;
 `),g("close",`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),H("round",`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[g("icon",`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),g("avatar",`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),H("closable",`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),H("icon, avatar",[H("round",`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),H("disabled",`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),H("checkable",`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[Ue("disabled",[W("&:hover","background-color: var(--n-color-hover-checkable);",[Ue("checked","color: var(--n-text-color-hover-checkable);")]),W("&:active","background-color: var(--n-color-pressed-checkable);",[Ue("checked","color: var(--n-text-color-pressed-checkable);")])]),H("checked",`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[Ue("disabled",[W("&:hover","background-color: var(--n-color-checked-hover);"),W("&:active","background-color: var(--n-color-checked-pressed);")])])])]),il=Object.assign(Object.assign(Object.assign({},pe.props),fn),{bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function}),al=Pt("n-tag"),Kt=G({name:"Tag",props:il,setup(e){const t=B(null),{mergedBorderedRef:o,mergedClsPrefixRef:n,inlineThemeDisabled:r,mergedRtlRef:l}=Be(e),a=pe("Tag","-tag",ll,hn,e,n);rt(al,{roundRef:fe(e,"round")});function i(C){if(!e.disabled&&e.checkable){const{checked:h,onCheckedChange:y,onUpdateChecked:x,"onUpdate:checked":k}=e;x&&x(!h),k&&k(!h),y&&y(!h)}}function c(C){if(e.triggerClickOnClose||C.stopPropagation(),!e.disabled){const{onClose:h}=e;h&&he(h,C)}}const d={setTextContent(C){const{value:h}=t;h&&(h.textContent=C)}},b=Zo("Tag",l,n),f=P(()=>{const{type:C,size:h,color:{color:y,textColor:x}={}}=e,{common:{cubicBezierEaseInOut:k},self:{padding:I,closeMargin:V,closeMarginRtl:U,borderRadius:D,opacityDisabled:O,textColorCheckable:A,textColorHoverCheckable:v,textColorPressedCheckable:R,textColorChecked:E,colorCheckable:m,colorHoverCheckable:$,colorPressedCheckable:L,colorChecked:X,colorCheckedHover:Y,colorCheckedPressed:ee,closeBorderRadius:K,fontWeightStrong:Z,[ae("colorBordered",C)]:S,[ae("closeSize",h)]:F,[ae("closeIconSize",h)]:j,[ae("fontSize",h)]:se,[ae("height",h)]:ke,[ae("color",C)]:$e,[ae("textColor",C)]:ze,[ae("border",C)]:ie,[ae("closeIconColor",C)]:Se,[ae("closeIconColorHover",C)]:ve,[ae("closeIconColorPressed",C)]:xe,[ae("closeColorHover",C)]:Oe,[ae("closeColorPressed",C)]:Re}}=a.value;return{"--n-font-weight-strong":Z,"--n-avatar-size-override":`calc(${ke} - 8px)`,"--n-bezier":k,"--n-border-radius":D,"--n-border":ie,"--n-close-icon-size":j,"--n-close-color-pressed":Re,"--n-close-color-hover":Oe,"--n-close-border-radius":K,"--n-close-icon-color":Se,"--n-close-icon-color-hover":ve,"--n-close-icon-color-pressed":xe,"--n-close-icon-color-disabled":Se,"--n-close-margin":V,"--n-close-margin-rtl":U,"--n-close-size":F,"--n-color":y||(o.value?S:$e),"--n-color-checkable":m,"--n-color-checked":X,"--n-color-checked-hover":Y,"--n-color-checked-pressed":ee,"--n-color-hover-checkable":$,"--n-color-pressed-checkable":L,"--n-font-size":se,"--n-height":ke,"--n-opacity-disabled":O,"--n-padding":I,"--n-text-color":x||ze,"--n-text-color-checkable":A,"--n-text-color-checked":E,"--n-text-color-hover-checkable":v,"--n-text-color-pressed-checkable":R}}),w=r?Pe("tag",P(()=>{let C="";const{type:h,size:y,color:{color:x,textColor:k}={}}=e;return C+=h[0],C+=y[0],x&&(C+=`a${Mo(x)}`),k&&(C+=`b${Mo(k)}`),o.value&&(C+="c"),C}),f,e):void 0;return Object.assign(Object.assign({},d),{rtlEnabled:b,mergedClsPrefix:n,contentRef:t,mergedBordered:o,handleClick:i,handleCloseClick:c,cssVars:r?void 0:f,themeClass:w==null?void 0:w.themeClass,onRender:w==null?void 0:w.onRender})},render(){var e,t;const{mergedClsPrefix:o,rtlEnabled:n,closable:r,color:{borderColor:l}={},round:a,onRender:i,$slots:c}=this;i==null||i();const d=Fe(c.avatar,f=>f&&s("div",{class:`${o}-tag__avatar`},f)),b=Fe(c.icon,f=>f&&s("div",{class:`${o}-tag__icon`},f));return s("div",{class:[`${o}-tag`,this.themeClass,{[`${o}-tag--rtl`]:n,[`${o}-tag--strong`]:this.strong,[`${o}-tag--disabled`]:this.disabled,[`${o}-tag--checkable`]:this.checkable,[`${o}-tag--checked`]:this.checkable&&this.checked,[`${o}-tag--round`]:a,[`${o}-tag--avatar`]:d,[`${o}-tag--icon`]:b,[`${o}-tag--closable`]:r}],style:this.cssVars,onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},b||d,s("span",{class:`${o}-tag__content`,ref:"contentRef"},(t=(e=this.$slots).default)===null||t===void 0?void 0:t.call(e)),!this.checkable&&r?s(ir,{clsPrefix:o,class:`${o}-tag__close`,disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:a,isButtonTag:this.internalCloseIsButtonTag,absolute:!0}):null,!this.checkable&&this.mergedBordered?s("div",{class:`${o}-tag__border`,style:{borderColor:l}}):null)}}),sl=W([_("base-selection",`
 position: relative;
 z-index: auto;
 box-shadow: none;
 width: 100%;
 max-width: 100%;
 display: inline-block;
 vertical-align: bottom;
 border-radius: var(--n-border-radius);
 min-height: var(--n-height);
 line-height: 1.5;
 font-size: var(--n-font-size);
 `,[_("base-loading",`
 color: var(--n-loading-color);
 `),_("base-selection-tags","min-height: var(--n-height);"),g("border, state-border",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border: var(--n-border);
 border-radius: inherit;
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),g("state-border",`
 z-index: 1;
 border-color: #0000;
 `),_("base-suffix",`
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `,[g("arrow",`
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]),_("base-selection-overlay",`
 display: flex;
 align-items: center;
 white-space: nowrap;
 pointer-events: none;
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 padding: var(--n-padding-single);
 transition: color .3s var(--n-bezier);
 `,[g("wrapper",`
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),_("base-selection-placeholder",`
 color: var(--n-placeholder-color);
 `,[g("inner",`
 max-width: 100%;
 overflow: hidden;
 `)]),_("base-selection-tags",`
 cursor: pointer;
 outline: none;
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 display: flex;
 padding: var(--n-padding-multiple);
 flex-wrap: wrap;
 align-items: center;
 width: 100%;
 vertical-align: bottom;
 background-color: var(--n-color);
 border-radius: inherit;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),_("base-selection-label",`
 height: var(--n-height);
 display: inline-flex;
 width: 100%;
 vertical-align: bottom;
 cursor: pointer;
 outline: none;
 z-index: auto;
 box-sizing: border-box;
 position: relative;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 border-radius: inherit;
 background-color: var(--n-color);
 align-items: center;
 `,[_("base-selection-input",`
 font-size: inherit;
 line-height: inherit;
 outline: none;
 cursor: pointer;
 box-sizing: border-box;
 border:none;
 width: 100%;
 padding: var(--n-padding-single);
 background-color: #0000;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 caret-color: var(--n-caret-color);
 `,[g("content",`
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]),g("render-label",`
 color: var(--n-text-color);
 `)]),Ue("disabled",[W("&:hover",[g("state-border",`
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]),H("focus",[g("state-border",`
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]),H("active",[g("state-border",`
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `),_("base-selection-label","background-color: var(--n-color-active);"),_("base-selection-tags","background-color: var(--n-color-active);")])]),H("disabled","cursor: not-allowed;",[g("arrow",`
 color: var(--n-arrow-color-disabled);
 `),_("base-selection-label",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[_("base-selection-input",`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `),g("render-label",`
 color: var(--n-text-color-disabled);
 `)]),_("base-selection-tags",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `),_("base-selection-placeholder",`
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]),_("base-selection-input-tag",`
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `,[g("input",`
 font-size: inherit;
 font-family: inherit;
 min-width: 1px;
 padding: 0;
 background-color: #0000;
 outline: none;
 border: none;
 max-width: 100%;
 overflow: hidden;
 width: 1em;
 line-height: inherit;
 cursor: pointer;
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 `),g("mirror",`
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]),["warning","error"].map(e=>H(`${e}-status`,[g("state-border",`border: var(--n-border-${e});`),Ue("disabled",[W("&:hover",[g("state-border",`
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]),H("active",[g("state-border",`
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `),_("base-selection-label",`background-color: var(--n-color-active-${e});`),_("base-selection-tags",`background-color: var(--n-color-active-${e});`)]),H("focus",[g("state-border",`
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]),_("base-selection-popover",`
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `),_("base-selection-tag-wrapper",`
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `,[W("&:last-child","padding-right: 0;"),_("tag",`
 font-size: 14px;
 max-width: 100%;
 `,[g("content",`
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]),cl=G({name:"InternalSelection",props:Object.assign(Object.assign({},pe.props),{clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:""},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:"medium"},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean,ignoreComposition:{type:Boolean,default:!0},onResize:Function}),setup(e){const t=B(null),o=B(null),n=B(null),r=B(null),l=B(null),a=B(null),i=B(null),c=B(null),d=B(null),b=B(null),f=B(!1),w=B(!1),C=B(!1),h=pe("InternalSelection","-internal-selection",sl,ar,e,fe(e,"clsPrefix")),y=P(()=>e.clearable&&!e.disabled&&(C.value||e.active)),x=P(()=>e.selectedOption?e.renderTag?e.renderTag({option:e.selectedOption,handleClose:()=>{}}):e.renderLabel?e.renderLabel(e.selectedOption,!0):ht(e.selectedOption[e.labelField],e.selectedOption,!0):e.placeholder),k=P(()=>{const p=e.selectedOption;if(p)return p[e.labelField]}),I=P(()=>e.multiple?!!(Array.isArray(e.selectedOptions)&&e.selectedOptions.length):e.selectedOption!==null);function V(){var p;const{value:z}=t;if(z){const{value:N}=o;N&&(N.style.width=`${z.offsetWidth}px`,e.maxTagCount!=="responsive"&&((p=d.value)===null||p===void 0||p.sync()))}}function U(){const{value:p}=b;p&&(p.style.display="none")}function D(){const{value:p}=b;p&&(p.style.display="inline-block")}qe(fe(e,"active"),p=>{p||U()}),qe(fe(e,"pattern"),()=>{e.multiple&&It(V)});function O(p){const{onFocus:z}=e;z&&z(p)}function A(p){const{onBlur:z}=e;z&&z(p)}function v(p){const{onDeleteOption:z}=e;z&&z(p)}function R(p){const{onClear:z}=e;z&&z(p)}function E(p){const{onPatternInput:z}=e;z&&z(p)}function m(p){var z;(!p.relatedTarget||!(!((z=n.value)===null||z===void 0)&&z.contains(p.relatedTarget)))&&O(p)}function $(p){var z;!((z=n.value)===null||z===void 0)&&z.contains(p.relatedTarget)||A(p)}function L(p){R(p)}function X(){C.value=!0}function Y(){C.value=!1}function ee(p){!e.active||!e.filterable||p.target!==o.value&&p.preventDefault()}function K(p){v(p)}function Z(p){if(p.key==="Backspace"&&!S.value&&!e.pattern.length){const{selectedOptions:z}=e;z!=null&&z.length&&K(z[z.length-1])}}const S=B(!1);let F=null;function j(p){const{value:z}=t;if(z){const N=p.target.value;z.textContent=N,V()}e.ignoreComposition&&S.value?F=p:E(p)}function se(){S.value=!0}function ke(){S.value=!1,e.ignoreComposition&&E(F),F=null}function $e(p){var z;w.value=!0,(z=e.onPatternFocus)===null||z===void 0||z.call(e,p)}function ze(p){var z;w.value=!1,(z=e.onPatternBlur)===null||z===void 0||z.call(e,p)}function ie(){var p,z;if(e.filterable)w.value=!1,(p=a.value)===null||p===void 0||p.blur(),(z=o.value)===null||z===void 0||z.blur();else if(e.multiple){const{value:N}=r;N==null||N.blur()}else{const{value:N}=l;N==null||N.blur()}}function Se(){var p,z,N;e.filterable?(w.value=!1,(p=a.value)===null||p===void 0||p.focus()):e.multiple?(z=r.value)===null||z===void 0||z.focus():(N=l.value)===null||N===void 0||N.focus()}function ve(){const{value:p}=o;p&&(D(),p.focus())}function xe(){const{value:p}=o;p&&p.blur()}function Oe(p){const{value:z}=i;z&&z.setTextContent(`+${p}`)}function Re(){const{value:p}=c;return p}function Xe(){return o.value}let Ae=null;function Ee(){Ae!==null&&window.clearTimeout(Ae)}function Ve(){e.disabled||e.active||(Ee(),Ae=window.setTimeout(()=>{I.value&&(f.value=!0)},100))}function _e(){Ee()}function Ze(p){p||(Ee(),f.value=!1)}qe(I,p=>{p||(f.value=!1)}),yt(()=>{_o(()=>{const p=a.value;p&&(p.tabIndex=e.disabled||w.value?-1:0)})}),un(n,e.onResize);const{inlineThemeDisabled:T}=e,J=P(()=>{const{size:p}=e,{common:{cubicBezierEaseInOut:z},self:{borderRadius:N,color:ye,placeholderColor:ge,textColor:Ie,paddingSingle:xt,paddingMultiple:Ct,caretColor:Bt,colorDisabled:At,textColorDisabled:Et,placeholderColorDisabled:no,colorActive:ro,boxShadowFocus:Vt,boxShadowActive:He,boxShadowHover:u,border:M,borderFocus:q,borderHover:le,borderActive:oe,arrowColor:re,arrowColorDisabled:ne,loadingColor:we,colorActiveWarning:Dt,boxShadowFocusWarning:lo,boxShadowActiveWarning:In,boxShadowHoverWarning:Pn,borderWarning:On,borderFocusWarning:Fn,borderHoverWarning:Mn,borderActiveWarning:Bn,colorActiveError:An,boxShadowFocusError:En,boxShadowActiveError:Vn,boxShadowHoverError:Dn,borderError:Un,borderFocusError:Ln,borderHoverError:Nn,borderActiveError:Hn,clearColor:jn,clearColorHover:Wn,clearColorPressed:Kn,clearSize:qn,arrowSize:Yn,[ae("height",p)]:Gn,[ae("fontSize",p)]:Xn}}=h.value;return{"--n-bezier":z,"--n-border":M,"--n-border-active":oe,"--n-border-focus":q,"--n-border-hover":le,"--n-border-radius":N,"--n-box-shadow-active":He,"--n-box-shadow-focus":Vt,"--n-box-shadow-hover":u,"--n-caret-color":Bt,"--n-color":ye,"--n-color-active":ro,"--n-color-disabled":At,"--n-font-size":Xn,"--n-height":Gn,"--n-padding-single":xt,"--n-padding-multiple":Ct,"--n-placeholder-color":ge,"--n-placeholder-color-disabled":no,"--n-text-color":Ie,"--n-text-color-disabled":Et,"--n-arrow-color":re,"--n-arrow-color-disabled":ne,"--n-loading-color":we,"--n-color-active-warning":Dt,"--n-box-shadow-focus-warning":lo,"--n-box-shadow-active-warning":In,"--n-box-shadow-hover-warning":Pn,"--n-border-warning":On,"--n-border-focus-warning":Fn,"--n-border-hover-warning":Mn,"--n-border-active-warning":Bn,"--n-color-active-error":An,"--n-box-shadow-focus-error":En,"--n-box-shadow-active-error":Vn,"--n-box-shadow-hover-error":Dn,"--n-border-error":Un,"--n-border-focus-error":Ln,"--n-border-hover-error":Nn,"--n-border-active-error":Hn,"--n-clear-size":qn,"--n-clear-color":jn,"--n-clear-color-hover":Wn,"--n-clear-color-pressed":Kn,"--n-arrow-size":Yn}}),te=T?Pe("internal-selection",P(()=>e.size[0]),J,e):void 0;return{mergedTheme:h,mergedClearable:y,patternInputFocused:w,filterablePlaceholder:x,label:k,selected:I,showTagsPanel:f,isComposing:S,counterRef:i,counterWrapperRef:c,patternInputMirrorRef:t,patternInputRef:o,selfRef:n,multipleElRef:r,singleElRef:l,patternInputWrapperRef:a,overflowRef:d,inputTagElRef:b,handleMouseDown:ee,handleFocusin:m,handleClear:L,handleMouseEnter:X,handleMouseLeave:Y,handleDeleteOption:K,handlePatternKeyDown:Z,handlePatternInputInput:j,handlePatternInputBlur:ze,handlePatternInputFocus:$e,handleMouseEnterCounter:Ve,handleMouseLeaveCounter:_e,handleFocusout:$,handleCompositionEnd:ke,handleCompositionStart:se,onPopoverUpdateShow:Ze,focus:Se,focusInput:ve,blur:ie,blurInput:xe,updateCounter:Oe,getCounter:Re,getTail:Xe,renderLabel:e.renderLabel,cssVars:T?void 0:J,themeClass:te==null?void 0:te.themeClass,onRender:te==null?void 0:te.onRender}},render(){const{status:e,multiple:t,size:o,disabled:n,filterable:r,maxTagCount:l,bordered:a,clsPrefix:i,onRender:c,renderTag:d,renderLabel:b}=this;c==null||c();const f=l==="responsive",w=typeof l=="number",C=f||w,h=s(sr,null,{default:()=>s(Fr,{clsPrefix:i,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>{var x,k;return(k=(x=this.$slots).arrow)===null||k===void 0?void 0:k.call(x)}})});let y;if(t){const{labelField:x}=this,k=$=>s("div",{class:`${i}-base-selection-tag-wrapper`,key:$.value},d?d({option:$,handleClose:()=>{this.handleDeleteOption($)}}):s(Kt,{size:o,closable:!$.disabled,disabled:n,onClose:()=>{this.handleDeleteOption($)},internalCloseIsButtonTag:!1,internalCloseFocusable:!1},{default:()=>b?b($,!0):ht($[x],$,!0)})),I=()=>(w?this.selectedOptions.slice(0,l):this.selectedOptions).map(k),V=r?s("div",{class:`${i}-base-selection-input-tag`,ref:"inputTagElRef",key:"__input-tag__"},s("input",Object.assign({},this.inputProps,{ref:"patternInputRef",tabindex:-1,disabled:n,value:this.pattern,autofocus:this.autofocus,class:`${i}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),s("span",{ref:"patternInputMirrorRef",class:`${i}-base-selection-input-tag__mirror`},this.pattern)):null,U=f?()=>s("div",{class:`${i}-base-selection-tag-wrapper`,ref:"counterWrapperRef"},s(Kt,{size:o,ref:"counterRef",onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:n})):void 0;let D;if(w){const $=this.selectedOptions.length-l;$>0&&(D=s("div",{class:`${i}-base-selection-tag-wrapper`,key:"__counter__"},s(Kt,{size:o,ref:"counterRef",onMouseenter:this.handleMouseEnterCounter,disabled:n},{default:()=>`+${$}`})))}const O=f?r?s(Lo,{ref:"overflowRef",updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:I,counter:U,tail:()=>V}):s(Lo,{ref:"overflowRef",updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:I,counter:U}):w?I().concat(D):I(),A=C?()=>s("div",{class:`${i}-base-selection-popover`},f?I():this.selectedOptions.map(k)):void 0,v=C?{show:this.showTagsPanel,trigger:"hover",overlap:!0,placement:"top",width:"trigger",onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover}:null,E=(this.selected?!1:this.active?!this.pattern&&!this.isComposing:!0)?s("div",{class:`${i}-base-selection-placeholder ${i}-base-selection-overlay`},s("div",{class:`${i}-base-selection-placeholder__inner`},this.placeholder)):null,m=r?s("div",{ref:"patternInputWrapperRef",class:`${i}-base-selection-tags`},O,f?null:V,h):s("div",{ref:"multipleElRef",class:`${i}-base-selection-tags`,tabindex:n?void 0:0},O,h);y=s(Ot,null,C?s(ln,Object.assign({},v,{scrollable:!0,style:"max-height: calc(var(--v-target-height) * 6.6);"}),{trigger:()=>m,default:A}):m,E)}else if(r){const x=this.pattern||this.isComposing,k=this.active?!x:!this.selected,I=this.active?!1:this.selected;y=s("div",{ref:"patternInputWrapperRef",class:`${i}-base-selection-label`},s("input",Object.assign({},this.inputProps,{ref:"patternInputRef",class:`${i}-base-selection-input`,value:this.active?this.pattern:"",placeholder:"",readonly:n,disabled:n,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),I?s("div",{class:`${i}-base-selection-label__render-label ${i}-base-selection-overlay`,key:"input"},s("div",{class:`${i}-base-selection-overlay__wrapper`},d?d({option:this.selectedOption,handleClose:()=>{}}):b?b(this.selectedOption,!0):ht(this.label,this.selectedOption,!0))):null,k?s("div",{class:`${i}-base-selection-placeholder ${i}-base-selection-overlay`,key:"placeholder"},s("div",{class:`${i}-base-selection-overlay__wrapper`},this.filterablePlaceholder)):null,h)}else y=s("div",{ref:"singleElRef",class:`${i}-base-selection-label`,tabindex:this.disabled?void 0:0},this.label!==void 0?s("div",{class:`${i}-base-selection-input`,title:Lr(this.label),key:"input"},s("div",{class:`${i}-base-selection-input__content`},d?d({option:this.selectedOption,handleClose:()=>{}}):b?b(this.selectedOption,!0):ht(this.label,this.selectedOption,!0))):s("div",{class:`${i}-base-selection-placeholder ${i}-base-selection-overlay`,key:"placeholder"},s("div",{class:`${i}-base-selection-placeholder__inner`},this.placeholder)),h);return s("div",{ref:"selfRef",class:[`${i}-base-selection`,this.themeClass,e&&`${i}-base-selection--${e}-status`,{[`${i}-base-selection--active`]:this.active,[`${i}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${i}-base-selection--disabled`]:this.disabled,[`${i}-base-selection--multiple`]:this.multiple,[`${i}-base-selection--focus`]:this.focused}],style:this.cssVars,onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},y,a?s("div",{class:`${i}-base-selection__border`}):null,a?s("div",{class:`${i}-base-selection__state-border`}):null)}});function Yt(e){return e.type==="group"}function vn(e){return e.type==="ignored"}function vo(e,t){try{return!!(1+t.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch{return!1}}function dl(e,t){return{getIsGroup:Yt,getIgnored:vn,getKey(n){return Yt(n)?n.name||n.key||"key-required":n[e]},getChildren(n){return n[t]}}}function ul(e,t,o,n){if(!t)return e;function r(l){if(!Array.isArray(l))return[];const a=[];for(const i of l)if(Yt(i)){const c=r(i[n]);c.length&&a.push(Object.assign({},i,{[n]:c}))}else{if(vn(i))continue;t(o,i)&&a.push(i)}return a}return r(e)}function hl(e,t,o){const n=new Map;return e.forEach(r=>{Yt(r)?r[o].forEach(l=>{n.set(l[t],l)}):n.set(r[t],r)}),n}const fl=_("input-group",`
 display: inline-flex;
 width: 100%;
 flex-wrap: nowrap;
 vertical-align: bottom;
`,[W(">",[_("input",[W("&:not(:last-child)",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),W("&:not(:first-child)",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 margin-left: -1px!important;
 `)]),_("button",[W("&:not(:last-child)",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[g("state-border, border",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)]),W("&:not(:first-child)",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[g("state-border, border",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])]),W("*",[W("&:not(:last-child)",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[W(">",[_("input",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),_("base-selection",[_("base-selection-label",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),_("base-selection-tags",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),g("box-shadow, border, state-border",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)])])]),W("&:not(:first-child)",`
 margin-left: -1px!important;
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[W(">",[_("input",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),_("base-selection",[_("base-selection-label",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),_("base-selection-tags",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),g("box-shadow, border, state-border",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])])])])])]),vl={},pl=G({name:"InputGroup",props:vl,setup(e){const{mergedClsPrefixRef:t}=Be(e);return cr("-input-group",fl,t),{mergedClsPrefix:t}},render(){const{mergedClsPrefix:e}=this;return s("div",{class:`${e}-input-group`},this.$slots)}});function gl(e,t){switch(e[0]){case"hex":return t?"#000000FF":"#000000";case"rgb":return t?"rgba(0, 0, 0, 1)":"rgb(0, 0, 0)";case"hsl":return t?"hsla(0, 0%, 0%, 1)":"hsl(0, 0%, 0%)";case"hsv":return t?"hsva(0, 0%, 0%, 1)":"hsv(0, 0%, 0%)"}return"#000000"}function zt(e){return e===null?null:/^ *#/.test(e)?"hex":e.includes("rgb")?"rgb":e.includes("hsl")?"hsl":e.includes("hsv")?"hsv":null}function bl(e){return e=Math.round(e),e>=360?359:e<0?0:e}function ml(e){return e=Math.round(e*100)/100,e>1?1:e<0?0:e}const yl={rgb:{hex(e){return Ye(De(e))},hsl(e){const[t,o,n,r]=De(e);return Ge([...wo(t,o,n),r])},hsv(e){const[t,o,n,r]=De(e);return ot([...yo(t,o,n),r])}},hex:{rgb(e){return Le(De(e))},hsl(e){const[t,o,n,r]=De(e);return Ge([...wo(t,o,n),r])},hsv(e){const[t,o,n,r]=De(e);return ot([...yo(t,o,n),r])}},hsl:{hex(e){const[t,o,n,r]=vt(e);return Ye([...xo(t,o,n),r])},rgb(e){const[t,o,n,r]=vt(e);return Le([...xo(t,o,n),r])},hsv(e){const[t,o,n,r]=vt(e);return ot([...dn(t,o,n),r])}},hsv:{hex(e){const[t,o,n,r]=nt(e);return Ye([...We(t,o,n),r])},rgb(e){const[t,o,n,r]=nt(e);return Le([...We(t,o,n),r])},hsl(e){const[t,o,n,r]=nt(e);return Ge([...Wt(t,o,n),r])}}};function pn(e,t,o){return o=o||zt(e),o?o===t?e:yl[o][t](e):null}const ut="12px",wl=12,Qe="6px",xl=6,Cl="linear-gradient(90deg,red,#ff0 16.66%,#0f0 33.33%,#0ff 50%,#00f 66.66%,#f0f 83.33%,red)",kl=G({name:"HueSlider",props:{clsPrefix:{type:String,required:!0},hue:{type:Number,required:!0},onUpdateHue:{type:Function,required:!0},onComplete:Function},setup(e){const t=B(null);function o(l){t.value&&(gt("mousemove",document,n),gt("mouseup",document,r),n(l))}function n(l){const{value:a}=t;if(!a)return;const{width:i,left:c}=a.getBoundingClientRect(),d=bl((l.clientX-c-xl)/(i-wl)*360);e.onUpdateHue(d)}function r(){var l;bt("mousemove",document,n),bt("mouseup",document,r),(l=e.onComplete)===null||l===void 0||l.call(e)}return{railRef:t,handleMouseDown:o}},render(){const{clsPrefix:e}=this;return s("div",{class:`${e}-color-picker-slider`,style:{height:ut,borderRadius:Qe}},s("div",{ref:"railRef",style:{boxShadow:"inset 0 0 2px 0 rgba(0, 0, 0, .24)",boxSizing:"border-box",backgroundImage:Cl,height:ut,borderRadius:Qe,position:"relative"},onMousedown:this.handleMouseDown},s("div",{style:{position:"absolute",left:Qe,right:Qe,top:0,bottom:0}},s("div",{class:`${e}-color-picker-handle`,style:{left:`calc((${this.hue}%) / 359 * 100 - ${Qe})`,borderRadius:Qe,width:ut,height:ut}},s("div",{class:`${e}-color-picker-handle__fill`,style:{backgroundColor:`hsl(${this.hue}, 100%, 50%)`,borderRadius:Qe,width:ut,height:ut}})))))}}),St="12px",Sl=12,et="6px",_l=G({name:"AlphaSlider",props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},alpha:{type:Number,default:0},onUpdateAlpha:{type:Function,required:!0},onComplete:Function},setup(e){const t=B(null);function o(l){!t.value||!e.rgba||(gt("mousemove",document,n),gt("mouseup",document,r),n(l))}function n(l){const{value:a}=t;if(!a)return;const{width:i,left:c}=a.getBoundingClientRect(),d=(l.clientX-c)/(i-Sl);e.onUpdateAlpha(ml(d))}function r(){var l;bt("mousemove",document,n),bt("mouseup",document,r),(l=e.onComplete)===null||l===void 0||l.call(e)}return{railRef:t,railBackgroundImage:P(()=>{const{rgba:l}=e;return l?`linear-gradient(to right, rgba(${l[0]}, ${l[1]}, ${l[2]}, 0) 0%, rgba(${l[0]}, ${l[1]}, ${l[2]}, 1) 100%)`:""}),handleMouseDown:o}},render(){const{clsPrefix:e}=this;return s("div",{class:`${e}-color-picker-slider`,ref:"railRef",style:{height:St,borderRadius:et},onMousedown:this.handleMouseDown},s("div",{style:{borderRadius:et,position:"absolute",left:0,right:0,top:0,bottom:0,overflow:"hidden"}},s("div",{class:`${e}-color-picker-checkboard`}),s("div",{class:`${e}-color-picker-slider__image`,style:{backgroundImage:this.railBackgroundImage}})),this.rgba&&s("div",{style:{position:"absolute",left:et,right:et,top:0,bottom:0}},s("div",{class:`${e}-color-picker-handle`,style:{left:`calc(${this.alpha*100}% - ${et})`,borderRadius:et,width:St,height:St}},s("div",{class:`${e}-color-picker-handle__fill`,style:{backgroundColor:Le(this.rgba),borderRadius:et,width:St,height:St}}))))}}),Lt="12px",Nt="6px",Rl=G({name:"Pallete",props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},displayedHue:{type:Number,required:!0},displayedSv:{type:Array,required:!0},onUpdateSV:{type:Function,required:!0},onComplete:Function},setup(e){const t=B(null);function o(l){t.value&&(gt("mousemove",document,n),gt("mouseup",document,r),n(l))}function n(l){const{value:a}=t;if(!a)return;const{width:i,height:c,left:d,bottom:b}=a.getBoundingClientRect(),f=(b-l.clientY)/c,w=(l.clientX-d)/i,C=100*(w>1?1:w<0?0:w),h=100*(f>1?1:f<0?0:f);e.onUpdateSV(C,h)}function r(){var l;bt("mousemove",document,n),bt("mouseup",document,r),(l=e.onComplete)===null||l===void 0||l.call(e)}return{palleteRef:t,handleColor:P(()=>{const{rgba:l}=e;return l?`rgb(${l[0]}, ${l[1]}, ${l[2]})`:""}),handleMouseDown:o}},render(){const{clsPrefix:e}=this;return s("div",{class:`${e}-color-picker-pallete`,onMousedown:this.handleMouseDown,ref:"palleteRef"},s("div",{class:`${e}-color-picker-pallete__layer`,style:{backgroundImage:`linear-gradient(90deg, white, hsl(${this.displayedHue}, 100%, 50%))`}}),s("div",{class:`${e}-color-picker-pallete__layer ${e}-color-picker-pallete__layer--shadowed`,style:{backgroundImage:"linear-gradient(180deg, rgba(0, 0, 0, 0%), rgba(0, 0, 0, 100%))"}}),this.rgba&&s("div",{class:`${e}-color-picker-handle`,style:{width:Lt,height:Lt,borderRadius:Nt,left:`calc(${this.displayedSv[0]}% - ${Nt})`,bottom:`calc(${this.displayedSv[1]}% - ${Nt})`}},s("div",{class:`${e}-color-picker-handle__fill`,style:{backgroundColor:this.handleColor,borderRadius:Nt,width:Lt,height:Lt}})))}}),Po=Pt("n-color-picker");function Tl(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(parseInt(e),255)):!1}function $l(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(parseInt(e),360)):!1}function zl(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(parseInt(e),100)):!1}function Il(e){const t=e.trim();return/^#[0-9a-fA-F]+$/.test(t)?[4,5,7,9].includes(t.length):!1}function Pl(e){return/^\d{1,3}\.?\d*%$/.test(e.trim())?Math.max(0,Math.min(parseInt(e)/100,100)):!1}const Ol={paddingSmall:"0 4px"},jo=G({name:"ColorInputUnit",props:{label:{type:String,required:!0},value:{type:[Number,String],default:null},showAlpha:Boolean,onUpdateValue:{type:Function,required:!0}},setup(e){const t=B(""),{themeRef:o}=at(Po,null);_o(()=>{t.value=n()});function n(){const{value:a}=e;if(a===null)return"";const{label:i}=e;return i==="HEX"?a:i==="A"?`${Math.floor(a*100)}%`:String(Math.floor(a))}function r(a){t.value=a}function l(a){let i,c;switch(e.label){case"HEX":c=Il(a),c&&e.onUpdateValue(a),t.value=n();break;case"H":i=$l(a),i===!1?t.value=n():e.onUpdateValue(i);break;case"S":case"L":case"V":i=zl(a),i===!1?t.value=n():e.onUpdateValue(i);break;case"A":i=Pl(a),i===!1?t.value=n():e.onUpdateValue(i);break;case"R":case"G":case"B":i=Tl(a),i===!1?t.value=n():e.onUpdateValue(i);break}}return{mergedTheme:o,inputValue:t,handleInputChange:l,handleInputUpdateValue:r}},render(){const{mergedTheme:e}=this;return s(zo,{size:"small",placeholder:this.label,theme:e.peers.Input,themeOverrides:e.peerOverrides.Input,builtinThemeOverrides:Ol,value:this.inputValue,onUpdateValue:this.handleInputUpdateValue,onChange:this.handleInputChange,style:this.label==="A"?"flex-grow: 1.25;":""})}}),Fl=G({name:"ColorInput",props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},modes:{type:Array,required:!0},showAlpha:{type:Boolean,required:!0},value:{type:String,default:null},valueArr:{type:Array,default:null},onUpdateValue:{type:Function,required:!0},onUpdateMode:{type:Function,required:!0}},setup(e){return{handleUnitUpdateValue(t,o){const{showAlpha:n}=e;if(e.mode==="hex"){e.onUpdateValue((n?Ye:Tt)(o));return}let r;switch(e.valueArr===null?r=[0,0,0,0]:r=Array.from(e.valueArr),e.mode){case"hsv":r[t]=o,e.onUpdateValue((n?ot:bo)(r));break;case"rgb":r[t]=o,e.onUpdateValue((n?Le:go)(r));break;case"hsl":r[t]=o,e.onUpdateValue((n?Ge:po)(r));break}}}},render(){const{clsPrefix:e,modes:t}=this;return s("div",{class:`${e}-color-picker-input`},s("div",{class:`${e}-color-picker-input__mode`,onClick:this.onUpdateMode,style:{cursor:t.length===1?"":"pointer"}},this.mode.toUpperCase()+(this.showAlpha?"A":"")),s(pl,null,{default:()=>{const{mode:o,valueArr:n,showAlpha:r}=this;if(o==="hex"){let l=null;try{l=n===null?null:(r?Ye:Tt)(n)}catch{}return s(jo,{label:"HEX",showAlpha:r,value:l,onUpdateValue:a=>{this.handleUnitUpdateValue(0,a)}})}return(o+(r?"a":"")).split("").map((l,a)=>s(jo,{label:l.toUpperCase(),value:n===null?null:n[a],onUpdateValue:i=>{this.handleUnitUpdateValue(a,i)}}))}}))}}),Ml=G({name:"ColorPickerTrigger",props:{clsPrefix:{type:String,required:!0},value:{type:String,default:null},hsla:{type:Array,default:null},disabled:Boolean,onClick:Function},setup(e){const{colorPickerSlots:t,renderLabelRef:o}=at(Po,null);return()=>{const{hsla:n,value:r,clsPrefix:l,onClick:a,disabled:i}=e,c=t.label||o.value;return s("div",{class:[`${l}-color-picker-trigger`,i&&`${l}-color-picker-trigger--disabled`],onClick:i?void 0:a},s("div",{class:`${l}-color-picker-trigger__fill`},s("div",{class:`${l}-color-picker-checkboard`}),s("div",{style:{position:"absolute",left:0,right:0,top:0,bottom:0,backgroundColor:n?Ge(n):""}}),r&&n?s("div",{class:`${l}-color-picker-trigger__value`,style:{color:n[2]>50||n[3]<.5?"black":"white"}},c?c(r):r):null))}}});function Bl(e,t){if(t==="hsv"){const[o,n,r,l]=nt(e);return Le([...We(o,n,r),l])}return e}function Al(e){const t=document.createElement("canvas").getContext("2d");return t.fillStyle=e,t.fillStyle}const El=G({name:"ColorPickerSwatches",props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},swatches:{type:Array,required:!0},onUpdateColor:{type:Function,required:!0}},setup(e){const t=P(()=>e.swatches.map(l=>{const a=zt(l);return{value:l,mode:a,legalValue:Bl(l,a)}}));function o(l){const{mode:a}=e;let{value:i,mode:c}=l;return c||(c="hex",/^[a-zA-Z]+$/.test(i)?i=Al(i):(dr("color-picker",`color ${i} in swatches is invalid.`),i="#000000")),c===a?i:pn(i,a,c)}function n(l){e.onUpdateColor(o(l))}function r(l,a){l.key==="Enter"&&n(a)}return{parsedSwatchesRef:t,handleSwatchSelect:n,handleSwatchKeyDown:r}},render(){const{clsPrefix:e}=this;return s("div",{class:`${e}-color-picker-swatches`},this.parsedSwatchesRef.map(t=>s("div",{class:`${e}-color-picker-swatch`,tabindex:0,onClick:()=>{this.handleSwatchSelect(t)},onKeydown:o=>{this.handleSwatchKeyDown(o,t)}},s("div",{class:`${e}-color-picker-swatch__fill`,style:{background:t.legalValue}}))))}}),Vl=G({name:"ColorPreview",props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},color:{type:String,default:null,validator:e=>{const t=zt(e);return!!(!e||t&&t!=="hsv")}},onUpdateColor:{type:Function,required:!0}},setup(e){function t(o){var n;const r=o.target.value;(n=e.onUpdateColor)===null||n===void 0||n.call(e,pn(r.toUpperCase(),e.mode,"hex")),o.stopPropagation()}return{handleChange:t}},render(){const{clsPrefix:e}=this;return s("div",{class:`${e}-color-picker-preview__preview`},s("span",{class:`${e}-color-picker-preview__fill`,style:{background:this.color||"#000000"}}),s("input",{class:`${e}-color-picker-preview__input`,type:"color",value:this.color,onChange:this.handleChange}))}}),Dl=W([_("color-picker",`
 display: inline-block;
 box-sizing: border-box;
 height: var(--n-height);
 font-size: var(--n-font-size);
 width: 100%;
 position: relative;
 `),_("color-picker-panel",`
 margin: 4px 0;
 width: 240px;
 font-size: var(--n-panel-font-size);
 color: var(--n-text-color);
 background-color: var(--n-color);
 transition:
 box-shadow .3s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 `,[ko(),_("input",`
 text-align: center;
 `)]),_("color-picker-checkboard",`
 background: white; 
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[W("&::after",`
 background-image: linear-gradient(45deg, #DDD 25%, #0000 25%), linear-gradient(-45deg, #DDD 25%, #0000 25%), linear-gradient(45deg, #0000 75%, #DDD 75%), linear-gradient(-45deg, #0000 75%, #DDD 75%);
 background-size: 12px 12px;
 background-position: 0 0, 0 6px, 6px -6px, -6px 0px;
 background-repeat: repeat;
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),_("color-picker-slider",`
 margin-bottom: 8px;
 position: relative;
 box-sizing: border-box;
 `,[g("image",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `),W("&::after",`
 content: "";
 position: absolute;
 border-radius: inherit;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
 pointer-events: none;
 `)]),_("color-picker-handle",`
 z-index: 1;
 box-shadow: 0 0 2px 0 rgba(0, 0, 0, .45);
 position: absolute;
 background-color: white;
 overflow: hidden;
 `,[g("fill",`
 box-sizing: border-box;
 border: 2px solid white;
 `)]),_("color-picker-pallete",`
 height: 180px;
 position: relative;
 margin-bottom: 8px;
 cursor: crosshair;
 `,[g("layer",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[H("shadowed",`
 box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
 `)])]),_("color-picker-preview",`
 display: flex;
 `,[g("sliders",`
 flex: 1 0 auto;
 `),g("preview",`
 position: relative;
 height: 30px;
 width: 30px;
 margin: 0 0 8px 6px;
 border-radius: 50%;
 box-shadow: rgba(0, 0, 0, .15) 0px 0px 0px 1px inset;
 overflow: hidden;
 `),g("fill",`
 display: block;
 width: 30px;
 height: 30px;
 `),g("input",`
 position: absolute;
 top: 0;
 left: 0;
 width: 30px;
 height: 30px;
 opacity: 0;
 z-index: 1;
 `)]),_("color-picker-input",`
 display: flex;
 align-items: center;
 `,[_("input",`
 flex-grow: 1;
 flex-basis: 0;
 `),g("mode",`
 width: 72px;
 text-align: center;
 `)]),_("color-picker-control",`
 padding: 12px;
 `),_("color-picker-action",`
 display: flex;
 margin-top: -4px;
 border-top: 1px solid var(--n-divider-color);
 padding: 8px 12px;
 justify-content: flex-end;
 `,[_("button","margin-left: 8px;")]),_("color-picker-trigger",`
 border: var(--n-border);
 height: 100%;
 box-sizing: border-box;
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 cursor: pointer;
 `,[g("value",`
 white-space: nowrap;
 position: relative;
 `),g("fill",`
 border-radius: var(--n-border-radius);
 position: absolute;
 display: flex;
 align-items: center;
 justify-content: center;
 left: 4px;
 right: 4px;
 top: 4px;
 bottom: 4px;
 `),H("disabled","cursor: not-allowed"),_("color-picker-checkboard",`
 border-radius: var(--n-border-radius);
 `,[W("&::after",`
 --n-block-size: calc((var(--n-height) - 8px) / 3);
 background-size: calc(var(--n-block-size) * 2) calc(var(--n-block-size) * 2);
 background-position: 0 0, 0 var(--n-block-size), var(--n-block-size) calc(-1 * var(--n-block-size)), calc(-1 * var(--n-block-size)) 0px; 
 `)])]),_("color-picker-swatches",`
 display: grid;
 grid-gap: 8px;
 flex-wrap: wrap;
 position: relative;
 grid-template-columns: repeat(auto-fill, 18px);
 margin-top: 10px;
 `,[_("color-picker-swatch",`
 width: 18px;
 height: 18px;
 background-image: linear-gradient(45deg, #DDD 25%, #0000 25%), linear-gradient(-45deg, #DDD 25%, #0000 25%), linear-gradient(45deg, #0000 75%, #DDD 75%), linear-gradient(-45deg, #0000 75%, #DDD 75%);
 background-size: 8px 8px;
 background-position: 0px 0, 0px 4px, 4px -4px, -4px 0px;
 background-repeat: repeat;
 `,[g("fill",`
 position: relative;
 width: 100%;
 height: 100%;
 border-radius: 3px;
 box-shadow: rgba(0, 0, 0, .15) 0px 0px 0px 1px inset;
 cursor: pointer;
 `),W("&:focus",`
 outline: none;
 `,[g("fill",[W("&::after",`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 background: inherit;
 filter: blur(2px);
 content: "";
 `)])])])])]),Ul=Object.assign(Object.assign({},pe.props),{value:String,show:{type:Boolean,default:void 0},defaultShow:Boolean,defaultValue:String,modes:{type:Array,default:()=>["rgb","hex","hsl"]},placement:{type:String,default:"bottom-start"},to:mt.propTo,showAlpha:{type:Boolean,default:!0},showPreview:Boolean,swatches:Array,disabled:{type:Boolean,default:void 0},actions:{type:Array,default:null},internalActions:Array,size:String,renderLabel:Function,onComplete:Function,onConfirm:Function,"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]}),Ll=G({name:"ColorPicker",props:Ul,setup(e,{slots:t}){const o=B(null);let n=null;const r=Zt(e),{mergedSizeRef:l,mergedDisabledRef:a}=r,{localeRef:i}=to("global"),{mergedClsPrefixRef:c,namespaceRef:d,inlineThemeDisabled:b}=Be(e),f=pe("ColorPicker","-color-picker",Dl,ur,e,c);rt(Po,{themeRef:f,renderLabelRef:fe(e,"renderLabel"),colorPickerSlots:t});const w=B(e.defaultShow),C=lt(fe(e,"show"),w);function h(T){const{onUpdateShow:J,"onUpdate:show":te}=e;J&&he(J,T),te&&he(te,T),w.value=T}const{defaultValue:y}=e,x=B(y===void 0?gl(e.modes,e.showAlpha):y),k=lt(fe(e,"value"),x),I=B([k.value]),V=B(0),U=P(()=>zt(k.value)),{modes:D}=e,O=B(zt(k.value)||D[0]||"rgb");function A(){const{modes:T}=e,{value:J}=O,te=T.findIndex(p=>p===J);~te?O.value=T[(te+1)%T.length]:O.value="rgb"}let v,R,E,m,$,L,X,Y;const ee=P(()=>{const{value:T}=k;if(!T)return null;switch(U.value){case"hsv":return nt(T);case"hsl":return[v,R,E,Y]=vt(T),[...dn(v,R,E),Y];case"rgb":case"hex":return[$,L,X,Y]=De(T),[...yo($,L,X),Y]}}),K=P(()=>{const{value:T}=k;if(!T)return null;switch(U.value){case"rgb":case"hex":return De(T);case"hsv":return[v,R,m,Y]=nt(T),[...We(v,R,m),Y];case"hsl":return[v,R,E,Y]=vt(T),[...xo(v,R,E),Y]}}),Z=P(()=>{const{value:T}=k;if(!T)return null;switch(U.value){case"hsl":return vt(T);case"hsv":return[v,R,m,Y]=nt(T),[...Wt(v,R,m),Y];case"rgb":case"hex":return[$,L,X,Y]=De(T),[...wo($,L,X),Y]}}),S=P(()=>{switch(O.value){case"rgb":case"hex":return K.value;case"hsv":return ee.value;case"hsl":return Z.value}}),F=B(0),j=B(1),se=B([0,0]);function ke(T,J){const{value:te}=ee,p=F.value,z=te?te[3]:1;se.value=[T,J];const{showAlpha:N}=e;switch(O.value){case"hsv":ie((N?ot:bo)([p,T,J,z]),"cursor");break;case"hsl":ie((N?Ge:po)([...Wt(p,T,J),z]),"cursor");break;case"rgb":ie((N?Le:go)([...We(p,T,J),z]),"cursor");break;case"hex":ie((N?Ye:Tt)([...We(p,T,J),z]),"cursor");break}}function $e(T){F.value=T;const{value:J}=ee;if(!J)return;const[,te,p,z]=J,{showAlpha:N}=e;switch(O.value){case"hsv":ie((N?ot:bo)([T,te,p,z]),"cursor");break;case"rgb":ie((N?Le:go)([...We(T,te,p),z]),"cursor");break;case"hex":ie((N?Ye:Tt)([...We(T,te,p),z]),"cursor");break;case"hsl":ie((N?Ge:po)([...Wt(T,te,p),z]),"cursor");break}}function ze(T){switch(O.value){case"hsv":[v,R,m]=ee.value,ie(ot([v,R,m,T]),"cursor");break;case"rgb":[$,L,X]=K.value,ie(Le([$,L,X,T]),"cursor");break;case"hex":[$,L,X]=K.value,ie(Ye([$,L,X,T]),"cursor");break;case"hsl":[v,R,E]=Z.value,ie(Ge([v,R,E,T]),"cursor");break}j.value=T}function ie(T,J){J==="cursor"?n=T:n=null;const{nTriggerFormChange:te,nTriggerFormInput:p}=r,{onUpdateValue:z,"onUpdate:value":N}=e;z&&he(z,T),N&&he(N,T),te(),p(),x.value=T}function Se(T){ie(T,"input"),It(ve)}function ve(T=!0){const{value:J}=k;if(J){const{nTriggerFormChange:te,nTriggerFormInput:p}=r,{onComplete:z}=e;z&&z(J);const{value:N}=I,{value:ye}=V;T&&(N.splice(ye+1,N.length,J),V.value=ye+1),te(),p()}}function xe(){const{value:T}=V;T-1<0||(ie(I.value[T-1],"input"),ve(!1),V.value=T-1)}function Oe(){const{value:T}=V;T<0||T+1>=I.value.length||(ie(I.value[T+1],"input"),ve(!1),V.value=T+1)}function Re(){ie(null,"input"),h(!1)}function Xe(){const{value:T}=k,{onConfirm:J}=e;J&&J(T),h(!1)}const Ae=P(()=>V.value>=1),Ee=P(()=>{const{value:T}=I;return T.length>1&&V.value<T.length-1});qe(C,T=>{T||(I.value=[k.value],V.value=0)}),_o(()=>{if(!(n&&n===k.value)){const{value:T}=ee;T&&(F.value=T[0],j.value=T[3],se.value=[T[1],T[2]])}n=null});const Ve=P(()=>{const{value:T}=l,{common:{cubicBezierEaseInOut:J},self:{textColor:te,color:p,panelFontSize:z,boxShadow:N,border:ye,borderRadius:ge,dividerColor:Ie,[ae("height",T)]:xt,[ae("fontSize",T)]:Ct}}=f.value;return{"--n-bezier":J,"--n-text-color":te,"--n-color":p,"--n-panel-font-size":z,"--n-font-size":Ct,"--n-box-shadow":N,"--n-border":ye,"--n-border-radius":ge,"--n-height":xt,"--n-divider-color":Ie}}),_e=b?Pe("color-picker",P(()=>l.value[0]),Ve,e):void 0;function Ze(){var T;const{value:J}=K,{value:te}=F,{internalActions:p,modes:z,actions:N}=e,{value:ye}=f,{value:ge}=c;return s("div",{class:[`${ge}-color-picker-panel`,_e==null?void 0:_e.themeClass.value],onDragstart:Ie=>{Ie.preventDefault()},style:b?void 0:Ve.value},s("div",{class:`${ge}-color-picker-control`},s(Rl,{clsPrefix:ge,rgba:J,displayedHue:te,displayedSv:se.value,onUpdateSV:ke,onComplete:ve}),s("div",{class:`${ge}-color-picker-preview`},s("div",{class:`${ge}-color-picker-preview__sliders`},s(kl,{clsPrefix:ge,hue:te,onUpdateHue:$e,onComplete:ve}),e.showAlpha?s(_l,{clsPrefix:ge,rgba:J,alpha:j.value,onUpdateAlpha:ze,onComplete:ve}):null),e.showPreview?s(Vl,{clsPrefix:ge,mode:O.value,color:K.value&&Tt(K.value),onUpdateColor:Ie=>{ie(Ie,"input")}}):null),s(Fl,{clsPrefix:ge,showAlpha:e.showAlpha,mode:O.value,modes:z,onUpdateMode:A,value:k.value,valueArr:S.value,onUpdateValue:Se}),((T=e.swatches)===null||T===void 0?void 0:T.length)&&s(El,{clsPrefix:ge,mode:O.value,swatches:e.swatches,onUpdateColor:Ie=>{ie(Ie,"input")}})),N!=null&&N.length?s("div",{class:`${ge}-color-picker-action`},N.includes("confirm")&&s(Rt,{size:"small",onClick:Xe,theme:ye.peers.Button,themeOverrides:ye.peerOverrides.Button},{default:()=>i.value.confirm}),N.includes("clear")&&s(Rt,{size:"small",onClick:Re,disabled:!k.value,theme:ye.peers.Button,themeOverrides:ye.peerOverrides.Button},{default:()=>i.value.clear})):null,t.action?s("div",{class:`${ge}-color-picker-action`},{default:t.action}):p?s("div",{class:`${ge}-color-picker-action`},p.includes("undo")&&s(Rt,{size:"small",onClick:xe,disabled:!Ae.value,theme:ye.peers.Button,themeOverrides:ye.peerOverrides.Button},{default:()=>i.value.undo}),p.includes("redo")&&s(Rt,{size:"small",onClick:Oe,disabled:!Ee.value,theme:ye.peers.Button,themeOverrides:ye.peerOverrides.Button},{default:()=>i.value.redo})):null)}return{mergedClsPrefix:c,namespace:d,selfRef:o,hsla:Z,rgba:K,mergedShow:C,mergedDisabled:a,isMounted:Jo(),adjustedTo:mt(e),mergedValue:k,handleTriggerClick(){h(!0)},handleClickOutside(T){var J;!((J=o.value)===null||J===void 0)&&J.contains(Qo(T))||h(!1)},renderPanel:Ze,cssVars:b?void 0:Ve,themeClass:_e==null?void 0:_e.themeClass,onRender:_e==null?void 0:_e.onRender}},render(){const{$slots:e,mergedClsPrefix:t,onRender:o}=this;return o==null||o(),s("div",{class:[this.themeClass,`${t}-color-picker`],ref:"selfRef",style:this.cssVars},s(an,null,{default:()=>[s(sn,null,{default:()=>s(Ml,{clsPrefix:t,value:this.mergedValue,hsla:this.hsla,disabled:this.mergedDisabled,onClick:this.handleTriggerClick},{label:e.label})}),s(cn,{placement:this.placement,show:this.mergedShow,containerClass:this.namespace,teleportDisabled:this.adjustedTo===mt.tdkey,to:this.adjustedTo},{default:()=>s(Co,{name:"fade-in-scale-up-transition",appear:this.isMounted},{default:()=>this.mergedShow?Ft(this.renderPanel(),[[mo,this.handleClickOutside,void 0,{capture:!0}]]):null})})]}))}}),Nl=W([_("select",`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 `),_("select-menu",`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[ko({originalTransition:"background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)"})])]),Hl=Object.assign(Object.assign({},pe.props),{to:mt.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},keyboard:{type:Boolean,default:!0},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:Function,placement:{type:String,default:"bottom-start"},widthMode:{type:String,default:"trigger"},tag:Boolean,onCreate:Function,fallbackOption:{type:[Function,Boolean],default:void 0},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},childrenField:{type:String,default:"children"},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,nodeProps:Function,ignoreComposition:{type:Boolean,default:!0},showOnFocus:Boolean,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:"show"},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,showCheckmark:{type:Boolean,default:!0},onChange:[Function,Array],items:Array}),jl=G({name:"Select",props:Hl,setup(e){const{mergedClsPrefixRef:t,mergedBorderedRef:o,namespaceRef:n,inlineThemeDisabled:r}=Be(e),l=pe("Select","-select",Nl,hr,e,t),a=B(e.defaultValue),i=fe(e,"value"),c=lt(i,a),d=B(!1),b=B(""),f=P(()=>{const{valueField:u,childrenField:M}=e,q=dl(u,M);return Ar($.value,q)}),w=P(()=>hl(E.value,e.valueField,e.childrenField)),C=B(!1),h=lt(fe(e,"show"),C),y=B(null),x=B(null),k=B(null),{localeRef:I}=to("Select"),V=P(()=>{var u;return(u=e.placeholder)!==null&&u!==void 0?u:I.value.placeholder}),U=Vr(e,["items","options"]),D=[],O=B([]),A=B([]),v=B(new Map),R=P(()=>{const{fallbackOption:u}=e;if(u===void 0){const{labelField:M,valueField:q}=e;return le=>({[M]:String(le),[q]:le})}return u===!1?!1:M=>Object.assign(u(M),{value:M})}),E=P(()=>A.value.concat(O.value).concat(U.value)),m=P(()=>{const{filter:u}=e;if(u)return u;const{labelField:M,valueField:q}=e;return(le,oe)=>{if(!oe)return!1;const re=oe[M];if(typeof re=="string")return vo(le,re);const ne=oe[q];return typeof ne=="string"?vo(le,ne):typeof ne=="number"?vo(le,String(ne)):!1}}),$=P(()=>{if(e.remote)return U.value;{const{value:u}=E,{value:M}=b;return!M.length||!e.filterable?u:ul(u,m.value,M,e.childrenField)}});function L(u){const M=e.remote,{value:q}=v,{value:le}=w,{value:oe}=R,re=[];return u.forEach(ne=>{if(le.has(ne))re.push(le.get(ne));else if(M&&q.has(ne))re.push(q.get(ne));else if(oe){const we=oe(ne);we&&re.push(we)}}),re}const X=P(()=>{if(e.multiple){const{value:u}=c;return Array.isArray(u)?L(u):[]}return null}),Y=P(()=>{const{value:u}=c;return!e.multiple&&!Array.isArray(u)?u===null?null:L([u])[0]||null:null}),ee=Zt(e),{mergedSizeRef:K,mergedDisabledRef:Z,mergedStatusRef:S}=ee;function F(u,M){const{onChange:q,"onUpdate:value":le,onUpdateValue:oe}=e,{nTriggerFormChange:re,nTriggerFormInput:ne}=ee;q&&he(q,u,M),oe&&he(oe,u,M),le&&he(le,u,M),a.value=u,re(),ne()}function j(u){const{onBlur:M}=e,{nTriggerFormBlur:q}=ee;M&&he(M,u),q()}function se(){const{onClear:u}=e;u&&he(u)}function ke(u){const{onFocus:M,showOnFocus:q}=e,{nTriggerFormFocus:le}=ee;M&&he(M,u),le(),q&&ve()}function $e(u){const{onSearch:M}=e;M&&he(M,u)}function ze(u){const{onScroll:M}=e;M&&he(M,u)}function ie(){var u;const{remote:M,multiple:q}=e;if(M){const{value:le}=v;if(q){const{valueField:oe}=e;(u=X.value)===null||u===void 0||u.forEach(re=>{le.set(re[oe],re)})}else{const oe=Y.value;oe&&le.set(oe[e.valueField],oe)}}}function Se(u){const{onUpdateShow:M,"onUpdate:show":q}=e;M&&he(M,u),q&&he(q,u),C.value=u}function ve(){Z.value||(Se(!0),C.value=!0,e.filterable&&Et())}function xe(){Se(!1)}function Oe(){b.value="",A.value=D}const Re=B(!1);function Xe(){e.filterable&&(Re.value=!0)}function Ae(){e.filterable&&(Re.value=!1,h.value||Oe())}function Ee(){Z.value||(h.value?e.filterable?Et():xe():ve())}function Ve(u){var M,q;!((q=(M=k.value)===null||M===void 0?void 0:M.selfRef)===null||q===void 0)&&q.contains(u.relatedTarget)||(d.value=!1,j(u),xe())}function _e(u){ke(u),d.value=!0}function Ze(u){d.value=!0}function T(u){var M;!((M=y.value)===null||M===void 0)&&M.$el.contains(u.relatedTarget)||(d.value=!1,j(u),xe())}function J(){var u;(u=y.value)===null||u===void 0||u.focus(),xe()}function te(u){var M;h.value&&(!((M=y.value)===null||M===void 0)&&M.$el.contains(Qo(u))||xe())}function p(u){if(!Array.isArray(u))return[];if(R.value)return Array.from(u);{const{remote:M}=e,{value:q}=w;if(M){const{value:le}=v;return u.filter(oe=>q.has(oe)||le.has(oe))}else return u.filter(le=>q.has(le))}}function z(u){N(u.rawNode)}function N(u){if(Z.value)return;const{tag:M,remote:q,clearFilterAfterSelect:le,valueField:oe}=e;if(M&&!q){const{value:re}=A,ne=re[0]||null;if(ne){const we=O.value;we.length?we.push(ne):O.value=[ne],A.value=D}}if(q&&v.value.set(u[oe],u),e.multiple){const re=p(c.value),ne=re.findIndex(we=>we===u[oe]);if(~ne){if(re.splice(ne,1),M&&!q){const we=ye(u[oe]);~we&&(O.value.splice(we,1),le&&(b.value=""))}}else re.push(u[oe]),le&&(b.value="");F(re,L(re))}else{if(M&&!q){const re=ye(u[oe]);~re?O.value=[O.value[re]]:O.value=D}At(),xe(),F(u[oe],u)}}function ye(u){return O.value.findIndex(q=>q[e.valueField]===u)}function ge(u){h.value||ve();const{value:M}=u.target;b.value=M;const{tag:q,remote:le}=e;if($e(M),q&&!le){if(!M){A.value=D;return}const{onCreate:oe}=e,re=oe?oe(M):{[e.labelField]:M,[e.valueField]:M},{valueField:ne}=e;U.value.some(we=>we[ne]===re[ne])||O.value.some(we=>we[ne]===re[ne])?A.value=D:A.value=[re]}}function Ie(u){u.stopPropagation();const{multiple:M}=e;!M&&e.filterable&&xe(),se(),M?F([],[]):F(null,null)}function xt(u){!qt(u,"action")&&!qt(u,"empty")&&u.preventDefault()}function Ct(u){ze(u)}function Bt(u){var M,q,le,oe,re;if(!e.keyboard){u.preventDefault();return}switch(u.key){case" ":if(e.filterable)break;u.preventDefault();case"Enter":if(!(!((M=y.value)===null||M===void 0)&&M.isComposing)){if(h.value){const ne=(q=k.value)===null||q===void 0?void 0:q.getPendingTmNode();ne?z(ne):e.filterable||(xe(),At())}else if(ve(),e.tag&&Re.value){const ne=A.value[0];if(ne){const we=ne[e.valueField],{value:Dt}=c;e.multiple&&Array.isArray(Dt)&&Dt.some(lo=>lo===we)||N(ne)}}}u.preventDefault();break;case"ArrowUp":if(u.preventDefault(),e.loading)return;h.value&&((le=k.value)===null||le===void 0||le.prev());break;case"ArrowDown":if(u.preventDefault(),e.loading)return;h.value?(oe=k.value)===null||oe===void 0||oe.next():ve();break;case"Escape":h.value&&(fr(u),xe()),(re=y.value)===null||re===void 0||re.focus();break}}function At(){var u;(u=y.value)===null||u===void 0||u.focus()}function Et(){var u;(u=y.value)===null||u===void 0||u.focusInput()}function no(){var u;h.value&&((u=x.value)===null||u===void 0||u.syncPosition())}ie(),qe(fe(e,"options"),ie);const ro={focus:()=>{var u;(u=y.value)===null||u===void 0||u.focus()},blur:()=>{var u;(u=y.value)===null||u===void 0||u.blur()}},Vt=P(()=>{const{self:{menuBoxShadow:u}}=l.value;return{"--n-menu-box-shadow":u}}),He=r?Pe("select",void 0,Vt,e):void 0;return Object.assign(Object.assign({},ro),{mergedStatus:S,mergedClsPrefix:t,mergedBordered:o,namespace:n,treeMate:f,isMounted:Jo(),triggerRef:y,menuRef:k,pattern:b,uncontrolledShow:C,mergedShow:h,adjustedTo:mt(e),uncontrolledValue:a,mergedValue:c,followerRef:x,localizedPlaceholder:V,selectedOption:Y,selectedOptions:X,mergedSize:K,mergedDisabled:Z,focused:d,activeWithoutMenuOpen:Re,inlineThemeDisabled:r,onTriggerInputFocus:Xe,onTriggerInputBlur:Ae,handleTriggerOrMenuResize:no,handleMenuFocus:Ze,handleMenuBlur:T,handleMenuTabOut:J,handleTriggerClick:Ee,handleToggle:z,handleDeleteOption:N,handlePatternInput:ge,handleClear:Ie,handleTriggerBlur:Ve,handleTriggerFocus:_e,handleKeydown:Bt,handleMenuAfterLeave:Oe,handleMenuClickOutside:te,handleMenuScroll:Ct,handleMenuKeydown:Bt,handleMenuMousedown:xt,mergedTheme:l,cssVars:r?void 0:Vt,themeClass:He==null?void 0:He.themeClass,onRender:He==null?void 0:He.onRender})},render(){return s("div",{class:`${this.mergedClsPrefix}-select`},s(an,null,{default:()=>[s(sn,null,{default:()=>s(cl,{ref:"triggerRef",inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,labelField:this.labelField,valueField:this.valueField,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus,onResize:this.handleTriggerOrMenuResize,ignoreComposition:this.ignoreComposition},{arrow:()=>{var e,t;return[(t=(e=this.$slots).arrow)===null||t===void 0?void 0:t.call(e)]}})}),s(cn,{ref:"followerRef",show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===mt.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?"target":void 0,minWidth:"target",placement:this.placement},{default:()=>s(Co,{name:"fade-in-scale-up-transition",appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{default:()=>{var e,t,o;return this.mergedShow||this.displayDirective==="show"?((e=this.onRender)===null||e===void 0||e.call(this),Ft(s(ol,Object.assign({},this.menuProps,{ref:"menuRef",onResize:this.handleTriggerOrMenuResize,inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,(t=this.menuProps)===null||t===void 0?void 0:t.class],clsPrefix:this.mergedClsPrefix,focusable:!0,labelField:this.labelField,valueField:this.valueField,autoPending:!0,nodeProps:this.nodeProps,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:"medium",renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[(o=this.menuProps)===null||o===void 0?void 0:o.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,showCheckmark:this.showCheckmark,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange}),{empty:()=>{var n,r;return[(r=(n=this.$slots).empty)===null||r===void 0?void 0:r.call(n)]},action:()=>{var n,r;return[(r=(n=this.$slots).action)===null||r===void 0?void 0:r.call(n)]}}),this.displayDirective==="show"?[[Ro,this.mergedShow],[mo,this.handleMenuClickOutside,void 0,{capture:!0}]]:[[mo,this.handleMenuClickOutside,void 0,{capture:!0}]])):null}})})]}))}}),Wl=en({name:"DynamicTags",common:Xt,peers:{Input:vr,Button:pr,Tag:hn,Space:Dr},self(){return{inputWidth:"64px"}}}),Kl=Wl,ql=_("dynamic-tags",[_("input",{minWidth:"var(--n-input-width)"})]),Yl=Object.assign(Object.assign(Object.assign({},pe.props),fn),{size:{type:String,default:"medium"},closable:{type:Boolean,default:!0},defaultValue:{type:Array,default:()=>[]},value:Array,inputStyle:[String,Object],inputProps:Object,max:Number,tagStyle:[String,Object],renderTag:Function,onCreate:{type:Function,default:e=>e},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onChange:[Function,Array]}),Gl=G({name:"DynamicTags",props:Yl,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:o}=Be(e),{localeRef:n}=to("DynamicTags"),r=Zt(e),{mergedDisabledRef:l}=r,a=B(""),i=B(!1),c=B(!0),d=B(null),b=pe("DynamicTags","-dynamic-tags",ql,Kl,e,t),f=B(e.defaultValue),w=fe(e,"value"),C=lt(w,f),h=P(()=>n.value.add),y=P(()=>Ur(e.size)),x=P(()=>l.value||!!e.max&&C.value.length>=e.max);function k(R){const{onChange:E,"onUpdate:value":m,onUpdateValue:$}=e,{nTriggerFormInput:L,nTriggerFormChange:X}=r;E&&he(E,R),$&&he($,R),m&&he(m,R),f.value=R,L(),X()}function I(R){const E=C.value.slice(0);E.splice(R,1),k(E)}function V(R){switch(R.key){case"Enter":U()}}function U(R){const E=R??a.value;if(E){const m=C.value.slice(0);m.push(e.onCreate(E)),k(m)}i.value=!1,c.value=!0,a.value=""}function D(){U()}function O(){i.value=!0,It(()=>{var R;(R=d.value)===null||R===void 0||R.focus(),c.value=!1})}const A=P(()=>{const{self:{inputWidth:R}}=b.value;return{"--n-input-width":R}}),v=o?Pe("dynamic-tags",void 0,A,e):void 0;return{mergedClsPrefix:t,inputInstRef:d,localizedAdd:h,inputSize:y,inputValue:a,showInput:i,inputForceFocused:c,mergedValue:C,mergedDisabled:l,triggerDisabled:x,handleInputKeyUp:V,handleAddClick:O,handleInputBlur:D,handleCloseClick:I,handleInputConfirm:U,mergedTheme:b,cssVars:o?void 0:A,themeClass:v==null?void 0:v.themeClass,onRender:v==null?void 0:v.onRender}},render(){const{mergedTheme:e,cssVars:t,mergedClsPrefix:o,onRender:n,renderTag:r}=this;return n==null||n(),s(Io,{class:[`${o}-dynamic-tags`,this.themeClass],size:"small",style:t,theme:e.peers.Space,themeOverrides:e.peerOverrides.Space,itemStyle:"display: flex;"},{default:()=>{const{mergedTheme:l,tagStyle:a,type:i,round:c,size:d,color:b,closable:f,mergedDisabled:w,showInput:C,inputValue:h,inputStyle:y,inputSize:x,inputForceFocused:k,triggerDisabled:I,handleInputKeyUp:V,handleInputBlur:U,handleAddClick:D,handleCloseClick:O,handleInputConfirm:A,$slots:v}=this;return this.mergedValue.map((R,E)=>r?r(R,E):s(Kt,{key:E,theme:l.peers.Tag,themeOverrides:l.peerOverrides.Tag,style:a,type:i,round:c,size:d,color:b,closable:f,disabled:w,onClose:()=>{O(E)}},{default:()=>typeof R=="string"?R:R.label})).concat(C?v.input?v.input({submit:A,deactivate:U}):s(zo,Object.assign({placeholder:"",size:x,style:y,autosize:!0},this.inputProps,{ref:"inputInstRef",value:h,onUpdateValue:R=>{this.inputValue=R},theme:l.peers.Input,themeOverrides:l.peerOverrides.Input,onKeyup:V,onBlur:U,internalForceFocus:k})):v.trigger?v.trigger({activate:D,disabled:I}):s(Rt,{dashed:!0,disabled:I,theme:l.peers.Button,themeOverrides:l.peerOverrides.Button,size:x,onClick:D},{icon:()=>s(Gt,{clsPrefix:o},{default:()=>s(qr,null)})}))}})}}),Xl=e=>{const{baseColor:t,textColor2:o,bodyColor:n,cardColor:r,dividerColor:l,actionColor:a,scrollbarColor:i,scrollbarColorHover:c,invertedColor:d}=e;return{textColor:o,textColorInverted:"#FFF",color:n,colorEmbedded:a,headerColor:r,headerColorInverted:d,footerColor:a,footerColorInverted:d,headerBorderColor:l,headerBorderColorInverted:d,footerBorderColor:l,footerBorderColorInverted:d,siderBorderColor:l,siderBorderColorInverted:d,siderColor:r,siderColorInverted:d,siderToggleButtonBorder:`1px solid ${l}`,siderToggleButtonColor:t,siderToggleButtonIconColor:o,siderToggleButtonIconColorInverted:o,siderToggleBarColor:Bo(n,i),siderToggleBarColorHover:Bo(n,c),__invertScrollbar:"true"}},Zl=en({name:"Layout",common:Xt,peers:{Scrollbar:gr},self:Xl}),gn=Zl,Jl=e=>{const{primaryColor:t,opacityDisabled:o,borderRadius:n,textColor3:r}=e,l="rgba(0, 0, 0, .14)";return Object.assign(Object.assign({},br),{iconColor:r,textColor:"white",loadingColor:t,opacityDisabled:o,railColor:l,railColorActive:t,buttonBoxShadow:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",buttonColor:"#FFF",railBorderRadiusSmall:n,railBorderRadiusMedium:n,railBorderRadiusLarge:n,buttonBorderRadiusSmall:n,buttonBorderRadiusMedium:n,buttonBorderRadiusLarge:n,boxShadowFocus:`0 0 0 2px ${de(t,{alpha:.2})}`})},Ql={name:"Switch",common:Xt,self:Jl},ei=Ql,ti=Pt("n-layout-sider"),bn={type:String,default:"static"},oi=_("layout",`
 color: var(--n-text-color);
 background-color: var(--n-color);
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 flex: auto;
 overflow: hidden;
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
`,[_("layout-scroll-container",`
 overflow-x: hidden;
 box-sizing: border-box;
 height: 100%;
 `),H("absolute-positioned",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),ni={embedded:Boolean,position:bn,nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,onScroll:Function,contentStyle:{type:[String,Object],default:""},hasSider:Boolean,siderPlacement:{type:String,default:"left"}},mn=Pt("n-layout");function yn(e){return G({name:e?"LayoutContent":"Layout",props:Object.assign(Object.assign({},pe.props),ni),setup(t){const o=B(null),n=B(null),{mergedClsPrefixRef:r,inlineThemeDisabled:l}=Be(t),a=pe("Layout","-layout",oi,gn,t,r);function i(y,x){if(t.nativeScrollbar){const{value:k}=o;k&&(x===void 0?k.scrollTo(y):k.scrollTo(y,x))}else{const{value:k}=n;k&&k.scrollTo(y,x)}}rt(mn,t);let c=0,d=0;const b=y=>{var x;const k=y.target;c=k.scrollLeft,d=k.scrollTop,(x=t.onScroll)===null||x===void 0||x.call(t,y)};tn(()=>{if(t.nativeScrollbar){const y=o.value;y&&(y.scrollTop=d,y.scrollLeft=c)}});const f={display:"flex",flexWrap:"nowrap",width:"100%",flexDirection:"row"},w={scrollTo:i},C=P(()=>{const{common:{cubicBezierEaseInOut:y},self:x}=a.value;return{"--n-bezier":y,"--n-color":t.embedded?x.colorEmbedded:x.color,"--n-text-color":x.textColor}}),h=l?Pe("layout",P(()=>t.embedded?"e":""),C,t):void 0;return Object.assign({mergedClsPrefix:r,scrollableElRef:o,scrollbarInstRef:n,hasSiderStyle:f,mergedTheme:a,handleNativeElScroll:b,cssVars:l?void 0:C,themeClass:h==null?void 0:h.themeClass,onRender:h==null?void 0:h.onRender},w)},render(){var t;const{mergedClsPrefix:o,hasSider:n}=this;(t=this.onRender)===null||t===void 0||t.call(this);const r=n?this.hasSiderStyle:void 0,l=[this.themeClass,e&&`${o}-layout-content`,`${o}-layout`,`${o}-layout--${this.position}-positioned`];return s("div",{class:l,style:this.cssVars},this.nativeScrollbar?s("div",{ref:"scrollableElRef",class:`${o}-layout-scroll-container`,style:[this.contentStyle,r],onScroll:this.handleNativeElScroll},this.$slots):s(So,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentStyle:[this.contentStyle,r]}),this.$slots))}})}const ri=yn(!1),li=yn(!0),ii=_("layout-sider",`
 flex-shrink: 0;
 box-sizing: border-box;
 position: relative;
 z-index: 1;
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 min-width .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 transform .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 display: flex;
 justify-content: flex-end;
`,[H("bordered",[g("border",`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 1px;
 background-color: var(--n-border-color);
 transition: background-color .3s var(--n-bezier);
 `)]),g("left-placement",[H("bordered",[g("border",`
 right: 0;
 `)])]),H("right-placement",`
 justify-content: flex-start;
 `,[H("bordered",[g("border",`
 left: 0;
 `)]),H("collapsed",[_("layout-toggle-button",[_("base-icon",`
 transform: rotate(180deg);
 `)]),_("layout-toggle-bar",[W("&:hover",[g("top",{transform:"rotate(-12deg) scale(1.15) translateY(-2px)"}),g("bottom",{transform:"rotate(12deg) scale(1.15) translateY(2px)"})])])]),_("layout-toggle-button",`
 left: 0;
 transform: translateX(-50%) translateY(-50%);
 `,[_("base-icon",`
 transform: rotate(0);
 `)]),_("layout-toggle-bar",`
 left: -28px;
 transform: rotate(180deg);
 `,[W("&:hover",[g("top",{transform:"rotate(12deg) scale(1.15) translateY(-2px)"}),g("bottom",{transform:"rotate(-12deg) scale(1.15) translateY(2px)"})])])]),H("collapsed",[_("layout-toggle-bar",[W("&:hover",[g("top",{transform:"rotate(-12deg) scale(1.15) translateY(-2px)"}),g("bottom",{transform:"rotate(12deg) scale(1.15) translateY(2px)"})])]),_("layout-toggle-button",[_("base-icon",`
 transform: rotate(0);
 `)])]),_("layout-toggle-button",`
 transition:
 color .3s var(--n-bezier),
 right .3s var(--n-bezier),
 left .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 cursor: pointer;
 width: 24px;
 height: 24px;
 position: absolute;
 top: 50%;
 right: 0;
 border-radius: 50%;
 display: flex;
 align-items: center;
 justify-content: center;
 font-size: 18px;
 color: var(--n-toggle-button-icon-color);
 border: var(--n-toggle-button-border);
 background-color: var(--n-toggle-button-color);
 box-shadow: 0 2px 4px 0px rgba(0, 0, 0, .06);
 transform: translateX(50%) translateY(-50%);
 z-index: 1;
 `,[_("base-icon",`
 transition: transform .3s var(--n-bezier);
 transform: rotate(180deg);
 `)]),_("layout-toggle-bar",`
 cursor: pointer;
 height: 72px;
 width: 32px;
 position: absolute;
 top: calc(50% - 36px);
 right: -28px;
 `,[g("top, bottom",`
 position: absolute;
 width: 4px;
 border-radius: 2px;
 height: 38px;
 left: 14px;
 transition: 
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),g("bottom",`
 position: absolute;
 top: 34px;
 `),W("&:hover",[g("top",{transform:"rotate(12deg) scale(1.15) translateY(-2px)"}),g("bottom",{transform:"rotate(-12deg) scale(1.15) translateY(2px)"})]),g("top, bottom",{backgroundColor:"var(--n-toggle-bar-color)"}),W("&:hover",[g("top, bottom",{backgroundColor:"var(--n-toggle-bar-color-hover)"})])]),g("border",`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 width: 1px;
 transition: background-color .3s var(--n-bezier);
 `),_("layout-sider-scroll-container",`
 flex-grow: 1;
 flex-shrink: 0;
 box-sizing: border-box;
 height: 100%;
 opacity: 0;
 transition: opacity .3s var(--n-bezier);
 max-width: 100%;
 `),H("show-content",[_("layout-sider-scroll-container",{opacity:1})]),H("absolute-positioned",`
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 `)]),ai=G({name:"LayoutToggleButton",props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){const{clsPrefix:e}=this;return s("div",{class:`${e}-layout-toggle-button`,onClick:this.onClick},s(Gt,{clsPrefix:e},{default:()=>s(Er,null)}))}}),si=G({props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){const{clsPrefix:e}=this;return s("div",{onClick:this.onClick,class:`${e}-layout-toggle-bar`},s("div",{class:`${e}-layout-toggle-bar__top`}),s("div",{class:`${e}-layout-toggle-bar__bottom`}))}}),ci={position:bn,bordered:Boolean,collapsedWidth:{type:Number,default:48},width:{type:[Number,String],default:272},contentStyle:{type:[String,Object],default:""},collapseMode:{type:String,default:"transform"},collapsed:{type:Boolean,default:void 0},defaultCollapsed:Boolean,showCollapsedContent:{type:Boolean,default:!0},showTrigger:{type:[Boolean,String],default:!1},nativeScrollbar:{type:Boolean,default:!0},inverted:Boolean,scrollbarProps:Object,triggerStyle:[String,Object],collapsedTriggerStyle:[String,Object],"onUpdate:collapsed":[Function,Array],onUpdateCollapsed:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,onExpand:[Function,Array],onCollapse:[Function,Array],onScroll:Function},di=G({name:"LayoutSider",props:Object.assign(Object.assign({},pe.props),ci),setup(e){const t=at(mn),o=B(null),n=B(null),r=P(()=>ao(c.value?e.collapsedWidth:e.width)),l=P(()=>e.collapseMode!=="transform"?{}:{minWidth:ao(e.width)}),a=P(()=>t?t.siderPlacement:"left"),i=B(e.defaultCollapsed),c=lt(fe(e,"collapsed"),i);function d(D,O){if(e.nativeScrollbar){const{value:A}=o;A&&(O===void 0?A.scrollTo(D):A.scrollTo(D,O))}else{const{value:A}=n;A&&A.scrollTo(D,O)}}function b(){const{"onUpdate:collapsed":D,onUpdateCollapsed:O,onExpand:A,onCollapse:v}=e,{value:R}=c;O&&he(O,!R),D&&he(D,!R),i.value=!R,R?A&&he(A):v&&he(v)}let f=0,w=0;const C=D=>{var O;const A=D.target;f=A.scrollLeft,w=A.scrollTop,(O=e.onScroll)===null||O===void 0||O.call(e,D)};tn(()=>{if(e.nativeScrollbar){const D=o.value;D&&(D.scrollTop=w,D.scrollLeft=f)}}),rt(ti,{collapsedRef:c,collapseModeRef:fe(e,"collapseMode")});const{mergedClsPrefixRef:h,inlineThemeDisabled:y}=Be(e),x=pe("Layout","-layout-sider",ii,gn,e,h);function k(D){var O,A;D.propertyName==="max-width"&&(c.value?(O=e.onAfterLeave)===null||O===void 0||O.call(e):(A=e.onAfterEnter)===null||A===void 0||A.call(e))}const I={scrollTo:d},V=P(()=>{const{common:{cubicBezierEaseInOut:D},self:O}=x.value,{siderToggleButtonColor:A,siderToggleButtonBorder:v,siderToggleBarColor:R,siderToggleBarColorHover:E}=O,m={"--n-bezier":D,"--n-toggle-button-color":A,"--n-toggle-button-border":v,"--n-toggle-bar-color":R,"--n-toggle-bar-color-hover":E};return e.inverted?(m["--n-color"]=O.siderColorInverted,m["--n-text-color"]=O.textColorInverted,m["--n-border-color"]=O.siderBorderColorInverted,m["--n-toggle-button-icon-color"]=O.siderToggleButtonIconColorInverted,m.__invertScrollbar=O.__invertScrollbar):(m["--n-color"]=O.siderColor,m["--n-text-color"]=O.textColor,m["--n-border-color"]=O.siderBorderColor,m["--n-toggle-button-icon-color"]=O.siderToggleButtonIconColor),m}),U=y?Pe("layout-sider",P(()=>e.inverted?"a":"b"),V,e):void 0;return Object.assign({scrollableElRef:o,scrollbarInstRef:n,mergedClsPrefix:h,mergedTheme:x,styleMaxWidth:r,mergedCollapsed:c,scrollContainerStyle:l,siderPlacement:a,handleNativeElScroll:C,handleTransitionend:k,handleTriggerClick:b,inlineThemeDisabled:y,cssVars:V,themeClass:U==null?void 0:U.themeClass,onRender:U==null?void 0:U.onRender},I)},render(){var e;const{mergedClsPrefix:t,mergedCollapsed:o,showTrigger:n}=this;return(e=this.onRender)===null||e===void 0||e.call(this),s("aside",{class:[`${t}-layout-sider`,this.themeClass,`${t}-layout-sider--${this.position}-positioned`,`${t}-layout-sider--${this.siderPlacement}-placement`,this.bordered&&`${t}-layout-sider--bordered`,o&&`${t}-layout-sider--collapsed`,(!o||this.showCollapsedContent)&&`${t}-layout-sider--show-content`],onTransitionend:this.handleTransitionend,style:[this.inlineThemeDisabled?void 0:this.cssVars,{maxWidth:this.styleMaxWidth,width:ao(this.width)}]},this.nativeScrollbar?s("div",{class:`${t}-layout-sider-scroll-container`,onScroll:this.handleNativeElScroll,style:[this.scrollContainerStyle,{overflow:"auto"},this.contentStyle],ref:"scrollableElRef"},this.$slots):s(So,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",style:this.scrollContainerStyle,contentStyle:this.contentStyle,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,builtinThemeOverrides:this.inverted&&this.cssVars.__invertScrollbar==="true"?{colorHover:"rgba(255, 255, 255, .4)",color:"rgba(255, 255, 255, .3)"}:void 0}),this.$slots),n?n==="bar"?s(si,{clsPrefix:t,style:o?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):s(ai,{clsPrefix:t,style:o?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):null,this.bordered?s("div",{class:`${t}-layout-sider__border`}):null)}}),ui=W([_("list",`
 --n-merged-border-color: var(--n-border-color);
 --n-merged-color: var(--n-color);
 --n-merged-color-hover: var(--n-color-hover);
 margin: 0;
 font-size: var(--n-font-size);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 padding: 0;
 list-style-type: none;
 color: var(--n-text-color);
 background-color: var(--n-merged-color);
 `,[H("show-divider",[_("list-item",[W("&:not(:last-child)",[g("divider",`
 background-color: var(--n-merged-border-color);
 `)])])]),H("clickable",[_("list-item",`
 cursor: pointer;
 `)]),H("bordered",`
 border: 1px solid var(--n-merged-border-color);
 border-radius: var(--n-border-radius);
 `),H("hoverable",[_("list-item",`
 border-radius: var(--n-border-radius);
 `,[W("&:hover",`
 background-color: var(--n-merged-color-hover);
 `,[g("divider",`
 background-color: transparent;
 `)])])]),H("bordered, hoverable",[_("list-item",`
 padding: 12px 20px;
 `),g("header, footer",`
 padding: 12px 20px;
 `)]),g("header, footer",`
 padding: 12px 0;
 box-sizing: border-box;
 transition: border-color .3s var(--n-bezier);
 `,[W("&:not(:last-child)",`
 border-bottom: 1px solid var(--n-merged-border-color);
 `)]),_("list-item",`
 position: relative;
 padding: 12px 0; 
 box-sizing: border-box;
 display: flex;
 flex-wrap: nowrap;
 align-items: center;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[g("prefix",`
 margin-right: 20px;
 flex: 0;
 `),g("suffix",`
 margin-left: 20px;
 flex: 0;
 `),g("main",`
 flex: 1;
 `),g("divider",`
 height: 1px;
 position: absolute;
 bottom: 0;
 left: 0;
 right: 0;
 background-color: transparent;
 transition: background-color .3s var(--n-bezier);
 pointer-events: none;
 `)])]),mr(_("list",`
 --n-merged-color-hover: var(--n-color-hover-modal);
 --n-merged-color: var(--n-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),yr(_("list",`
 --n-merged-color-hover: var(--n-color-hover-popover);
 --n-merged-color: var(--n-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),hi=Object.assign(Object.assign({},pe.props),{size:{type:String,default:"medium"},bordered:Boolean,clickable:Boolean,hoverable:Boolean,showDivider:{type:Boolean,default:!0}}),wn=Pt("n-list"),fi=G({name:"List",props:hi,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:o,mergedRtlRef:n}=Be(e),r=Zo("List",n,t),l=pe("List","-list",ui,wr,e,t);rt(wn,{showDividerRef:fe(e,"showDivider"),mergedClsPrefixRef:t});const a=P(()=>{const{common:{cubicBezierEaseInOut:c},self:{fontSize:d,textColor:b,color:f,colorModal:w,colorPopover:C,borderColor:h,borderColorModal:y,borderColorPopover:x,borderRadius:k,colorHover:I,colorHoverModal:V,colorHoverPopover:U}}=l.value;return{"--n-font-size":d,"--n-bezier":c,"--n-text-color":b,"--n-color":f,"--n-border-radius":k,"--n-border-color":h,"--n-border-color-modal":y,"--n-border-color-popover":x,"--n-color-modal":w,"--n-color-popover":C,"--n-color-hover":I,"--n-color-hover-modal":V,"--n-color-hover-popover":U}}),i=o?Pe("list",void 0,a,e):void 0;return{mergedClsPrefix:t,rtlEnabled:r,cssVars:o?void 0:a,themeClass:i==null?void 0:i.themeClass,onRender:i==null?void 0:i.onRender}},render(){var e;const{$slots:t,mergedClsPrefix:o,onRender:n}=this;return n==null||n(),s("ul",{class:[`${o}-list`,this.rtlEnabled&&`${o}-list--rtl`,this.bordered&&`${o}-list--bordered`,this.showDivider&&`${o}-list--show-divider`,this.hoverable&&`${o}-list--hoverable`,this.clickable&&`${o}-list--clickable`,this.themeClass],style:this.cssVars},t.header?s("div",{class:`${o}-list__header`},t.header()):null,(e=t.default)===null||e===void 0?void 0:e.call(t),t.footer?s("div",{class:`${o}-list__footer`},t.footer()):null)}}),vi=G({name:"ListItem",setup(){const e=at(wn,null);return e||xr("list-item","`n-list-item` must be placed in `n-list`."),{showDivider:e.showDividerRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){const{$slots:e,mergedClsPrefix:t}=this;return s("li",{class:`${t}-list-item`},e.prefix?s("div",{class:`${t}-list-item__prefix`},e.prefix()):null,e.default?s("div",{class:`${t}-list-item__main`},e):null,e.suffix?s("div",{class:`${t}-list-item__suffix`},e.suffix()):null,this.showDivider&&s("div",{class:`${t}-list-item__divider`}))}}),pi=_("switch",`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[g("children-placeholder",`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),g("rail-placeholder",`
 display: flex;
 flex-wrap: none;
 `),g("button-placeholder",`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),_("base-loading",`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[Ao({left:"50%",top:"50%",originalTransform:"translateX(-50%) translateY(-50%)"})]),g("checked, unchecked",`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 box-sizing: border-box;
 position: absolute;
 white-space: nowrap;
 top: 0;
 bottom: 0;
 display: flex;
 align-items: center;
 line-height: 1;
 `),g("checked",`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),g("unchecked",`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),W("&:focus",[g("rail",`
 box-shadow: var(--n-box-shadow-focus);
 `)]),H("round",[g("rail","border-radius: calc(var(--n-rail-height) / 2);",[g("button","border-radius: calc(var(--n-button-height) / 2);")])]),Ue("disabled",[Ue("icon",[H("rubber-band",[H("pressed",[g("rail",[g("button","max-width: var(--n-button-width-pressed);")])]),g("rail",[W("&:active",[g("button","max-width: var(--n-button-width-pressed);")])]),H("active",[H("pressed",[g("rail",[g("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])]),g("rail",[W("&:active",[g("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])])])])])]),H("active",[g("rail",[g("button","left: calc(100% - var(--n-button-width) - var(--n-offset))")])]),g("rail",`
 overflow: hidden;
 height: var(--n-rail-height);
 min-width: var(--n-rail-width);
 border-radius: var(--n-rail-border-radius);
 cursor: pointer;
 position: relative;
 transition:
 opacity .3s var(--n-bezier),
 background .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-rail-color);
 `,[g("button-icon",`
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 font-size: calc(var(--n-button-height) - 4px);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 justify-content: center;
 align-items: center;
 line-height: 1;
 `,[Ao()]),g("button",`
 align-items: center; 
 top: var(--n-offset);
 left: var(--n-offset);
 height: var(--n-button-height);
 width: var(--n-button-width-pressed);
 max-width: var(--n-button-width);
 border-radius: var(--n-button-border-radius);
 background-color: var(--n-button-color);
 box-shadow: var(--n-button-box-shadow);
 box-sizing: border-box;
 cursor: inherit;
 content: "";
 position: absolute;
 transition:
 background-color .3s var(--n-bezier),
 left .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `)]),H("active",[g("rail","background-color: var(--n-rail-color-active);")]),H("loading",[g("rail",`
 cursor: wait;
 `)]),H("disabled",[g("rail",`
 cursor: not-allowed;
 opacity: .5;
 `)])]),gi=Object.assign(Object.assign({},pe.props),{size:{type:String,default:"medium"},value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},onChange:[Function,Array]});let _t;const xn=G({name:"Switch",props:gi,setup(e){_t===void 0&&(typeof CSS<"u"?typeof CSS.supports<"u"?_t=CSS.supports("width","max(1px)"):_t=!1:_t=!0);const{mergedClsPrefixRef:t,inlineThemeDisabled:o}=Be(e),n=pe("Switch","-switch",pi,ei,e,t),r=Zt(e),{mergedSizeRef:l,mergedDisabledRef:a}=r,i=B(e.defaultValue),c=fe(e,"value"),d=lt(c,i),b=P(()=>d.value===e.checkedValue),f=B(!1),w=B(!1),C=P(()=>{const{railStyle:v}=e;if(v)return v({focused:w.value,checked:b.value})});function h(v){const{"onUpdate:value":R,onChange:E,onUpdateValue:m}=e,{nTriggerFormInput:$,nTriggerFormChange:L}=r;R&&he(R,v),m&&he(m,v),E&&he(E,v),i.value=v,$(),L()}function y(){const{nTriggerFormFocus:v}=r;v()}function x(){const{nTriggerFormBlur:v}=r;v()}function k(){e.loading||a.value||(d.value!==e.checkedValue?h(e.checkedValue):h(e.uncheckedValue))}function I(){w.value=!0,y()}function V(){w.value=!1,x(),f.value=!1}function U(v){e.loading||a.value||v.key===" "&&(d.value!==e.checkedValue?h(e.checkedValue):h(e.uncheckedValue),f.value=!1)}function D(v){e.loading||a.value||v.key===" "&&(v.preventDefault(),f.value=!0)}const O=P(()=>{const{value:v}=l,{self:{opacityDisabled:R,railColor:E,railColorActive:m,buttonBoxShadow:$,buttonColor:L,boxShadowFocus:X,loadingColor:Y,textColor:ee,iconColor:K,[ae("buttonHeight",v)]:Z,[ae("buttonWidth",v)]:S,[ae("buttonWidthPressed",v)]:F,[ae("railHeight",v)]:j,[ae("railWidth",v)]:se,[ae("railBorderRadius",v)]:ke,[ae("buttonBorderRadius",v)]:$e},common:{cubicBezierEaseInOut:ze}}=n.value;let ie,Se,ve;return _t?(ie=`calc((${j} - ${Z}) / 2)`,Se=`max(${j}, ${Z})`,ve=`max(${se}, calc(${se} + ${Z} - ${j}))`):(ie=tt((Te(j)-Te(Z))/2),Se=tt(Math.max(Te(j),Te(Z))),ve=Te(j)>Te(Z)?se:tt(Te(se)+Te(Z)-Te(j))),{"--n-bezier":ze,"--n-button-border-radius":$e,"--n-button-box-shadow":$,"--n-button-color":L,"--n-button-width":S,"--n-button-width-pressed":F,"--n-button-height":Z,"--n-height":Se,"--n-offset":ie,"--n-opacity-disabled":R,"--n-rail-border-radius":ke,"--n-rail-color":E,"--n-rail-color-active":m,"--n-rail-height":j,"--n-rail-width":se,"--n-width":ve,"--n-box-shadow-focus":X,"--n-loading-color":Y,"--n-text-color":ee,"--n-icon-color":K}}),A=o?Pe("switch",P(()=>l.value[0]),O,e):void 0;return{handleClick:k,handleBlur:V,handleFocus:I,handleKeyup:U,handleKeydown:D,mergedRailStyle:C,pressed:f,mergedClsPrefix:t,mergedValue:d,checked:b,mergedDisabled:a,cssVars:o?void 0:O,themeClass:A==null?void 0:A.themeClass,onRender:A==null?void 0:A.onRender}},render(){const{mergedClsPrefix:e,mergedDisabled:t,checked:o,mergedRailStyle:n,onRender:r,$slots:l}=this;r==null||r();const{checked:a,unchecked:i,icon:c,"checked-icon":d,"unchecked-icon":b}=l,f=!(so(c)&&so(d)&&so(b));return s("div",{role:"switch","aria-checked":o,class:[`${e}-switch`,this.themeClass,f&&`${e}-switch--icon`,o&&`${e}-switch--active`,t&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`],tabindex:this.mergedDisabled?void 0:0,style:this.cssVars,onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},s("div",{class:`${e}-switch__rail`,"aria-hidden":"true",style:n},Fe(a,w=>Fe(i,C=>w||C?s("div",{"aria-hidden":!0,class:`${e}-switch__children-placeholder`},s("div",{class:`${e}-switch__rail-placeholder`},s("div",{class:`${e}-switch__button-placeholder`}),w),s("div",{class:`${e}-switch__rail-placeholder`},s("div",{class:`${e}-switch__button-placeholder`}),C)):null)),s("div",{class:`${e}-switch__button`},Fe(c,w=>Fe(d,C=>Fe(b,h=>s(Cr,null,{default:()=>this.loading?s(Xo,{key:"loading",clsPrefix:e,strokeWidth:20}):this.checked&&(C||w)?s("div",{class:`${e}-switch__button-icon`,key:C?"checked-icon":"icon"},C||w):!this.checked&&(h||w)?s("div",{class:`${e}-switch__button-icon`,key:h?"unchecked-icon":"icon"},h||w):null})))),Fe(a,w=>w&&s("div",{key:"checked",class:`${e}-switch__checked`},w)),Fe(i,w=>w&&s("div",{key:"unchecked",class:`${e}-switch__unchecked`},w)))))}}),Cn=G({name:"VueRender",props:{renderFn:{type:[Object,Function],required:!0}},render(){return typeof this.renderFn=="function"?this.renderFn():this.renderFn}});var bi=20,mi=1,it=1e6,Wo=1e6,yi=-7,wi=21,xi=!1,Mt="[big.js] ",st=Mt+"Invalid ",oo=st+"decimal places",Ci=st+"rounding mode",kn=Mt+"Division by zero",ce={},Me=void 0,ki=/^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;function Sn(){function e(t){var o=this;if(!(o instanceof e))return t===Me?Sn():new e(t);if(t instanceof e)o.s=t.s,o.e=t.e,o.c=t.c.slice();else{if(typeof t!="string"){if(e.strict===!0&&typeof t!="bigint")throw TypeError(st+"value");t=t===0&&1/t<0?"-0":String(t)}Si(o,t)}o.constructor=e}return e.prototype=ce,e.DP=bi,e.RM=mi,e.NE=yi,e.PE=wi,e.strict=xi,e.roundDown=0,e.roundHalfUp=1,e.roundHalfEven=2,e.roundUp=3,e}function Si(e,t){var o,n,r;if(!ki.test(t))throw Error(st+"number");for(e.s=t.charAt(0)=="-"?(t=t.slice(1),-1):1,(o=t.indexOf("."))>-1&&(t=t.replace(".","")),(n=t.search(/e/i))>0?(o<0&&(o=n),o+=+t.slice(n+1),t=t.substring(0,n)):o<0&&(o=t.length),r=t.length,n=0;n<r&&t.charAt(n)=="0";)++n;if(n==r)e.c=[e.e=0];else{for(;r>0&&t.charAt(--r)=="0";);for(e.e=o-n-1,e.c=[],o=0;n<=r;)e.c[o++]=+t.charAt(n++)}return e}function ct(e,t,o,n){var r=e.c;if(o===Me&&(o=e.constructor.RM),o!==0&&o!==1&&o!==2&&o!==3)throw Error(Ci);if(t<1)n=o===3&&(n||!!r[0])||t===0&&(o===1&&r[0]>=5||o===2&&(r[0]>5||r[0]===5&&(n||r[1]!==Me))),r.length=1,n?(e.e=e.e-t+1,r[0]=1):r[0]=e.e=0;else if(t<r.length){if(n=o===1&&r[t]>=5||o===2&&(r[t]>5||r[t]===5&&(n||r[t+1]!==Me||r[t-1]&1))||o===3&&(n||!!r[0]),r.length=t,n){for(;++r[--t]>9;)if(r[t]=0,t===0){++e.e,r.unshift(1);break}}for(t=r.length;!r[--t];)r.pop()}return e}function wt(e,t,o){var n=e.e,r=e.c.join(""),l=r.length;if(t)r=r.charAt(0)+(l>1?"."+r.slice(1):"")+(n<0?"e":"e+")+n;else if(n<0){for(;++n;)r="0"+r;r="0."+r}else if(n>0)if(++n>l)for(n-=l;n--;)r+="0";else n<l&&(r=r.slice(0,n)+"."+r.slice(n));else l>1&&(r=r.charAt(0)+"."+r.slice(1));return e.s<0&&o?"-"+r:r}ce.abs=function(){var e=new this.constructor(this);return e.s=1,e};ce.cmp=function(e){var t,o=this,n=o.c,r=(e=new o.constructor(e)).c,l=o.s,a=e.s,i=o.e,c=e.e;if(!n[0]||!r[0])return n[0]?l:r[0]?-a:0;if(l!=a)return l;if(t=l<0,i!=c)return i>c^t?1:-1;for(a=(i=n.length)<(c=r.length)?i:c,l=-1;++l<a;)if(n[l]!=r[l])return n[l]>r[l]^t?1:-1;return i==c?0:i>c^t?1:-1};ce.div=function(e){var t=this,o=t.constructor,n=t.c,r=(e=new o(e)).c,l=t.s==e.s?1:-1,a=o.DP;if(a!==~~a||a<0||a>it)throw Error(oo);if(!r[0])throw Error(kn);if(!n[0])return e.s=l,e.c=[e.e=0],e;var i,c,d,b,f,w=r.slice(),C=i=r.length,h=n.length,y=n.slice(0,i),x=y.length,k=e,I=k.c=[],V=0,U=a+(k.e=t.e-e.e)+1;for(k.s=l,l=U<0?0:U,w.unshift(0);x++<i;)y.push(0);do{for(d=0;d<10;d++){if(i!=(x=y.length))b=i>x?1:-1;else for(f=-1,b=0;++f<i;)if(r[f]!=y[f]){b=r[f]>y[f]?1:-1;break}if(b<0){for(c=x==i?r:w;x;){if(y[--x]<c[x]){for(f=x;f&&!y[--f];)y[f]=9;--y[f],y[x]+=10}y[x]-=c[x]}for(;!y[0];)y.shift()}else break}I[V++]=b?d:++d,y[0]&&b?y[x]=n[C]||0:y=[n[C]]}while((C++<h||y[0]!==Me)&&l--);return!I[0]&&V!=1&&(I.shift(),k.e--,U--),V>U&&ct(k,U,o.RM,y[0]!==Me),k};ce.eq=function(e){return this.cmp(e)===0};ce.gt=function(e){return this.cmp(e)>0};ce.gte=function(e){return this.cmp(e)>-1};ce.lt=function(e){return this.cmp(e)<0};ce.lte=function(e){return this.cmp(e)<1};ce.minus=ce.sub=function(e){var t,o,n,r,l=this,a=l.constructor,i=l.s,c=(e=new a(e)).s;if(i!=c)return e.s=-c,l.plus(e);var d=l.c.slice(),b=l.e,f=e.c,w=e.e;if(!d[0]||!f[0])return f[0]?e.s=-c:d[0]?e=new a(l):e.s=1,e;if(i=b-w){for((r=i<0)?(i=-i,n=d):(w=b,n=f),n.reverse(),c=i;c--;)n.push(0);n.reverse()}else for(o=((r=d.length<f.length)?d:f).length,i=c=0;c<o;c++)if(d[c]!=f[c]){r=d[c]<f[c];break}if(r&&(n=d,d=f,f=n,e.s=-e.s),(c=(o=f.length)-(t=d.length))>0)for(;c--;)d[t++]=0;for(c=t;o>i;){if(d[--o]<f[o]){for(t=o;t&&!d[--t];)d[t]=9;--d[t],d[o]+=10}d[o]-=f[o]}for(;d[--c]===0;)d.pop();for(;d[0]===0;)d.shift(),--w;return d[0]||(e.s=1,d=[w=0]),e.c=d,e.e=w,e};ce.mod=function(e){var t,o=this,n=o.constructor,r=o.s,l=(e=new n(e)).s;if(!e.c[0])throw Error(kn);return o.s=e.s=1,t=e.cmp(o)==1,o.s=r,e.s=l,t?new n(o):(r=n.DP,l=n.RM,n.DP=n.RM=0,o=o.div(e),n.DP=r,n.RM=l,this.minus(o.times(e)))};ce.neg=function(){var e=new this.constructor(this);return e.s=-e.s,e};ce.plus=ce.add=function(e){var t,o,n,r=this,l=r.constructor;if(e=new l(e),r.s!=e.s)return e.s=-e.s,r.minus(e);var a=r.e,i=r.c,c=e.e,d=e.c;if(!i[0]||!d[0])return d[0]||(i[0]?e=new l(r):e.s=r.s),e;if(i=i.slice(),t=a-c){for(t>0?(c=a,n=d):(t=-t,n=i),n.reverse();t--;)n.push(0);n.reverse()}for(i.length-d.length<0&&(n=d,d=i,i=n),t=d.length,o=0;t;i[t]%=10)o=(i[--t]=i[t]+d[t]+o)/10|0;for(o&&(i.unshift(o),++c),t=i.length;i[--t]===0;)i.pop();return e.c=i,e.e=c,e};ce.pow=function(e){var t=this,o=new t.constructor("1"),n=o,r=e<0;if(e!==~~e||e<-Wo||e>Wo)throw Error(st+"exponent");for(r&&(e=-e);e&1&&(n=n.times(t)),e>>=1,!!e;)t=t.times(t);return r?o.div(n):n};ce.prec=function(e,t){if(e!==~~e||e<1||e>it)throw Error(st+"precision");return ct(new this.constructor(this),e,t)};ce.round=function(e,t){if(e===Me)e=0;else if(e!==~~e||e<-it||e>it)throw Error(oo);return ct(new this.constructor(this),e+this.e+1,t)};ce.sqrt=function(){var e,t,o,n=this,r=n.constructor,l=n.s,a=n.e,i=new r("0.5");if(!n.c[0])return new r(n);if(l<0)throw Error(Mt+"No square root");l=Math.sqrt(n+""),l===0||l===1/0?(t=n.c.join(""),t.length+a&1||(t+="0"),l=Math.sqrt(t),a=((a+1)/2|0)-(a<0||a&1),e=new r((l==1/0?"5e":(l=l.toExponential()).slice(0,l.indexOf("e")+1))+a)):e=new r(l+""),a=e.e+(r.DP+=4);do o=e,e=i.times(o.plus(n.div(o)));while(o.c.slice(0,a).join("")!==e.c.slice(0,a).join(""));return ct(e,(r.DP-=4)+e.e+1,r.RM)};ce.times=ce.mul=function(e){var t,o=this,n=o.constructor,r=o.c,l=(e=new n(e)).c,a=r.length,i=l.length,c=o.e,d=e.e;if(e.s=o.s==e.s?1:-1,!r[0]||!l[0])return e.c=[e.e=0],e;for(e.e=c+d,a<i&&(t=r,r=l,l=t,d=a,a=i,i=d),t=new Array(d=a+i);d--;)t[d]=0;for(c=i;c--;){for(i=0,d=a+c;d>c;)i=t[d]+l[c]*r[d-c-1]+i,t[d--]=i%10,i=i/10|0;t[d]=i}for(i?++e.e:t.shift(),c=t.length;!t[--c];)t.pop();return e.c=t,e};ce.toExponential=function(e,t){var o=this,n=o.c[0];if(e!==Me){if(e!==~~e||e<0||e>it)throw Error(oo);for(o=ct(new o.constructor(o),++e,t);o.c.length<e;)o.c.push(0)}return wt(o,!0,!!n)};ce.toFixed=function(e,t){var o=this,n=o.c[0];if(e!==Me){if(e!==~~e||e<0||e>it)throw Error(oo);for(o=ct(new o.constructor(o),e+o.e+1,t),e=e+o.e+1;o.c.length<e;)o.c.push(0)}return wt(o,!1,!!n)};ce[Symbol.for("nodejs.util.inspect.custom")]=ce.toJSON=ce.toString=function(){var e=this,t=e.constructor;return wt(e,e.e<=t.NE||e.e>=t.PE,!!e.c[0])};ce.toNumber=function(){var e=Number(wt(this,!0,!0));if(this.constructor.strict===!0&&!this.eq(e.toString()))throw Error(Mt+"Imprecise conversion");return e};ce.toPrecision=function(e,t){var o=this,n=o.constructor,r=o.c[0];if(e!==Me){if(e!==~~e||e<1||e>it)throw Error(st+"precision");for(o=ct(new n(o),e,t);o.c.length<e;)o.c.push(0)}return wt(o,e<=o.e||o.e<=n.NE||o.e>=n.PE,!!r)};ce.valueOf=function(){var e=this,t=e.constructor;if(t.strict===!0)throw Error(Mt+"valueOf disallowed");return wt(e,e.e<=t.NE||e.e>=t.PE,!0)};var Ko=Sn();function _i(e,t){let o=-1,n=t[0],r=Math.abs(e-t[0]);for(let l=1;l<t.length;l++){const a=Math.abs(e-t[l]);a<r&&(o=l,n=t[l],r=a)}return{index:o,value:n}}const Ri=G({name:"AdvancedNumberInput",props:{modelValue:{type:Number,required:!0},disabled:{type:Boolean,default:!1},isDebug:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},min:Number,max:Number,step:{type:Number,default:1},format:Function,parse:Function,marks:{type:Object}},setup(e,{emit:t}){const{marks:o,step:n,min:r,max:l,modelValue:a,readonly:i,disabled:c}=Jt(e),d=P({get:()=>e.modelValue,set:v=>t("update:modelValue",v)}),b=P(()=>{if(!o.value)return null;const v=[];return Object.keys(o.value).forEach(R=>{v.push(Number(R))}),v.sort((R,E)=>R-E)}),f=v=>{const R=b.value;if(R){let E=R.findIndex(m=>m===d.value);if(E<0&&(E=_i(d.value,R).index,E<0&&(console.error("number not found!",{idx:E,numbers:R,mValue:d.value,isNext:v}),E=0)),v){if(R[E+1]!==void 0)return R[E+1]}else if(R[E-1]!==void 0)return R[E-1]}return null},w=P(()=>{if(b.value)return f(!0);const v=l.value,R=new Ko(d.value).add(n.value).toNumber();return v!==void 0?R<=v?R:null:R}),C=P(()=>w.value!==null),h=P(()=>{if(b.value)return f(!1);const v=r.value,R=new Ko(d.value).minus(n.value).toNumber();return v!==void 0?R>=v?R:null:R}),y=P(()=>h.value!==null),x=()=>{C.value&&!e.disabled&&(d.value=w.value)},k=()=>{y.value&&!e.disabled&&(d.value=h.value)},I=B(""),V=v=>e.format?e.format(v):String(v);qe(a,v=>{I.value=V(v)},{immediate:!0});const U=()=>{if(i.value||c.value)return;let v;e.parse?v=e.parse(String(I.value))||0:v=Number(I.value)||0,e.max!==void 0&&v>e.max&&(v=e.max),e.min!==void 0&&v<e.min&&(v=e.min),e.step&&(v=Math.round(v/e.step)*e.step),d.value=v,I.value=V(v)},D=B(!1);return{mValue:d,handleUp:x,handleDown:k,isAllowUp:C,isAllowDown:y,nextUpValue:w,nextDownValue:h,marksNumberArray:b,inputValue:I,handleBlur:()=>{U(),D.value=!1},handleEnter:U,handleFocus:()=>{D.value=!0},isFocused:D}}});const _n=e=>(Sr("data-v-1dbe7d6e"),e=e(),_r(),e),Ti=["readonly","disabled"],$i={key:0,class:"debug-val"},zi={class:"toggle-wrap"},Ii=["disabled"],Pi=_n(()=>ue("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 12 12"},[ue("g",{fill:"none"},[ue("path",{d:"M2.146 7.354a.5.5 0 0 0 .708 0L6 4.207l3.146 3.147a.5.5 0 1 0 .708-.708l-3.5-3.5a.5.5 0 0 0-.708 0l-3.5 3.5a.5.5 0 0 0 0 .708z",fill:"currentColor"})])],-1)),Oi=[Pi],Fi=["disabled"],Mi=_n(()=>ue("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 12 12"},[ue("g",{fill:"none"},[ue("path",{d:"M2.146 4.646a.5.5 0 0 1 .708 0L6 7.793l3.146-3.147a.5.5 0 1 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 0 1 0-.708z",fill:"currentColor"})])],-1)),Bi=[Mi];function Ai(e,t,o,n,r,l){return Q(),be("div",{class:pt(["advanced-number-input",{disabled:e.disabled,focused:e.isFocused}])},[Ft(ue("input",{"onUpdate:modelValue":t[0]||(t[0]=a=>e.inputValue=a),type:"text",class:"text-input",readonly:e.readonly,onFocus:t[1]||(t[1]=(...a)=>e.handleFocus&&e.handleFocus(...a)),onBlur:t[2]||(t[2]=(...a)=>e.handleBlur&&e.handleBlur(...a)),onKeyup:[t[3]||(t[3]=co((...a)=>e.handleEnter&&e.handleEnter(...a),["enter"])),t[4]||(t[4]=co((...a)=>e.handleUp&&e.handleUp(...a),["up"])),t[5]||(t[5]=co((...a)=>e.handleDown&&e.handleDown(...a),["down"]))],disabled:e.disabled},null,40,Ti),[[kr,e.inputValue]]),e.isDebug?(Q(),be("div",$i,$t(e.modelValue),1)):Ke("",!0),ue("div",zi,[ue("button",{onClick:t[6]||(t[6]=(...a)=>e.handleUp&&e.handleUp(...a)),class:"btn-no-style btn-up",disabled:!e.isAllowUp||e.disabled},Oi,8,Ii),ue("button",{onClick:t[7]||(t[7]=(...a)=>e.handleDown&&e.handleDown(...a)),class:"btn-no-style btn-down",disabled:!e.isAllowDown||e.disabled},Bi,8,Fi)])],2)}const Rn=Ne(Ri,[["render",Ai],["__scopeId","data-v-1dbe7d6e"]]),Ei=G({name:"RectSwitch",props:{modelValue:{type:[Boolean,String,Number],default:!1},options:{type:Array,default(){return[]}}},setup(e,{emit:t}){return{mValue:Rr(e,t)}}});const Vi={class:"rect-switch"},Di=["onClick"];function Ui(e,t,o,n,r,l){return Q(),be("div",Vi,[(Q(!0),be(Ot,null,Qt(e.options,a=>(Q(),be("div",{key:a.value,class:pt(["r-item",{active:a.value===e.mValue}]),onClick:i=>e.mValue=a.value},$t(a.label),11,Di))),128))])}const Tn=Ne(Ei,[["render",Ui]]);var Ce=(e=>(e.SWITCH="switch",e.MULTIPLE_SWITCH="multiple_switch",e.SLIDER="slider",e.SELECT="select",e.INPUT="input",e.INPUT_NUMBER="input_number",e.COLOR_PICKER="color_picker",e.DYNAMIC_TAGS="dynamic_tags",e))(Ce||{});const Li=["#258292","#3A6EA5","#F0C869","#E81123","#e91e63","#FFFFFF","#000000","#007aff","#a2845e","#8e8e93","#28cd41","#5856d6","#ff9500","#ff2d55","#af52de","#ff3b30","#5ac8fa","#ffcc00"],Ni=G({name:"ItemAction",components:{AdvancedNumberInput:Rn,VueRender:Cn,RectSwitch:Tn},props:{item:{type:Object,required:!0}},setup(e,{emit:t}){const{item:o}=Jt(e),n=P({get(){return o.value.store?o.value.store[o.value.key]:o.value.value},set(r){if(o.value.store){o.value.store[o.value.key]=r;return}o.value.value=r}});return{StOptionType:Ce,dynamicValue:n,swatches:Li}}});const Hi={key:2,class:"option-slider-wrap"};function ji(e,t,o,n,r,l){const a=xn,i=Tn,c=Mr,d=jl,b=zo,f=Ll,w=Gl,C=Rn,h=Cn,y=Io;return Q(),me(y,{class:"option-item-action",size:"small",align:"center"},{default:je(()=>[e.item.type===e.StOptionType.SWITCH?(Q(),me(a,{key:0,value:e.dynamicValue,"onUpdate:value":t[0]||(t[0]=x=>e.dynamicValue=x)},null,8,["value"])):e.item.type===e.StOptionType.MULTIPLE_SWITCH?(Q(),me(i,{key:1,options:e.item.selectOptions,modelValue:e.dynamicValue,"onUpdate:modelValue":t[1]||(t[1]=x=>e.dynamicValue=x)},null,8,["options","modelValue"])):e.item.type===e.StOptionType.SLIDER?(Q(),be("div",Hi,[ft(c,{class:"option-slider",value:e.dynamicValue,"onUpdate:value":t[2]||(t[2]=x=>e.dynamicValue=x)},null,8,["value"])])):e.item.type===e.StOptionType.SELECT?(Q(),me(d,{key:3,class:"option-select",value:e.dynamicValue,"onUpdate:value":t[3]||(t[3]=x=>e.dynamicValue=x),options:e.item.selectOptions,"value-field":"value","label-field":"label",size:"small"},null,8,["value","options"])):e.item.type===e.StOptionType.INPUT?(Q(),me(b,{key:4,class:"option-select option-input",value:e.dynamicValue,"onUpdate:value":t[4]||(t[4]=x=>e.dynamicValue=x),size:"small",type:"text",clearable:"",placeholder:e.item.placeholder||""},null,8,["value","placeholder"])):e.item.type===e.StOptionType.COLOR_PICKER?(Q(),me(f,{key:5,class:"option-select",value:e.dynamicValue,"onUpdate:value":t[5]||(t[5]=x=>e.dynamicValue=x),size:"small",swatches:e.swatches,"show-alpha":!1,actions:["clear"],modes:["hex"]},null,8,["value","swatches"])):e.item.type===e.StOptionType.DYNAMIC_TAGS?(Q(),me(w,{key:6,class:"dynamic-tags",value:e.dynamicValue,"onUpdate:value":t[6]||(t[6]=x=>e.dynamicValue=x),size:"small"},null,8,["value"])):e.item.type===e.StOptionType.INPUT_NUMBER?(Q(),me(C,{key:7,modelValue:e.dynamicValue,"onUpdate:modelValue":t[7]||(t[7]=x=>e.dynamicValue=x),max:e.item.max,min:e.item.min,step:e.item.step,format:e.item.formatFn,parse:e.item.parseFn,marks:e.item.marks,disabled:e.item.disabled},null,8,["modelValue","max","min","step","format","parse","marks","disabled"])):Ke("",!0),e.item.actionRender?(Q(),me(h,{key:8,"render-fn":e.item.actionRender},null,8,["render-fn"])):Ke("",!0)]),_:1})}const $n=Ne(Ni,[["render",ji]]),Wi=G({name:"OptionItem",components:{ItemAction:$n},props:{item:{type:Object,required:!0},foldedKeyMap:{type:Object,default(){return{}}}},setup(e,{emit:t}){const{item:o,foldedKeyMap:n}=Jt(e);return{isExpanded:P(()=>!n.value[o.value.key]),StOptionType:Ce,handleItemClick:(a,i)=>{typeof i=="function"&&i(a,o.value)}}}});const Ki={class:"panel-header"},qi={class:"p-left"},Yi={class:"item-label"},Gi={class:"p-right"},Xi={style:{width:"20px",height:"20px"},xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 20 20"},Zi=ue("g",{fill:"none"},[ue("path",{d:"M15.794 7.733a.75.75 0 0 1-.026 1.06l-5.25 5.001a.75.75 0 0 1-1.035 0l-5.25-5a.75.75 0 0 1 1.034-1.087l4.734 4.509l4.733-4.51a.75.75 0 0 1 1.06.027z",fill:"currentColor"})],-1),Ji=[Zi],Qi={key:0,class:"panel-body"},ea=["onClick"],ta={class:"o-left"},oa={key:0,class:"item-icon"},na=["src"],ra={class:"item-title-wrap"},la={class:"item-label-wrap"},ia={class:"item-label"},aa={style:{width:"16px",height:"16px"},xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 20 20"},sa=ue("g",{fill:"none"},[ue("path",{d:"M10 2a8 8 0 1 1 0 16a8 8 0 0 1 0-16zm0 1a7 7 0 1 0 0 14a7 7 0 0 0 0-14zm0 10.5a.75.75 0 1 1 0 1.5a.75.75 0 0 1 0-1.5zm0-8a2.5 2.5 0 0 1 1.651 4.377l-.154.125l-.219.163l-.087.072a1.968 1.968 0 0 0-.156.149c-.339.36-.535.856-.535 1.614a.5.5 0 0 1-1 0c0-1.012.293-1.752.805-2.298a3.11 3.11 0 0 1 .356-.323l.247-.185l.118-.1A1.5 1.5 0 1 0 8.5 8a.5.5 0 0 1-1 .001A2.5 2.5 0 0 1 10 5.5z",fill:"currentColor"})],-1),ca=[sa],da=["innerHTML"],ua=["innerHTML"],ha={class:"o-right"};function fa(e,t,o,n,r,l){const a=$n,i=ln;return Q(),be("div",{class:pt(["c-panel-item",[e.item.cls]])},[ue("div",Ki,[ue("div",qi,[ue("div",Yi,$t(e.item.label),1)]),ue("div",Gi,[e.item.children&&e.item.children.length?(Q(),be("div",{key:0,class:pt(["btn-no-style btn-toggle-expand",{expanded:e.isExpanded}]),onClick:t[0]||(t[0]=c=>e.$emit("onToggleExpand",e.item))},[(Q(),be("svg",Xi,Ji))],2)):(Q(),me(a,{key:1,item:e.item},null,8,["item"]))])]),e.item.children&&e.item.children.length?Ft((Q(),be("div",Qi,[(Q(!0),be(Ot,null,Qt(e.item.children,c=>(Q(),be("div",{key:c.key,class:pt(["sub-item",{clickable:c.clickFn}]),onClick:d=>e.handleItemClick(d,c.clickFn)},[ue("div",ta,[c.icon?(Q(),be("div",oa,[ue("img",{src:c.icon,alt:"icon"},null,8,na)])):Ke("",!0),ue("div",ra,[ue("div",la,[ue("span",ia,$t(c.label),1),c.tips?(Q(),me(i,{key:0,trigger:"hover"},{trigger:je(()=>[(Q(),be("svg",aa,ca))]),default:je(()=>[ue("span",{innerHTML:c.tips},null,8,da)]),_:2},1024)):Ke("",!0)]),c.subtitle?(Q(),be("div",{key:0,class:"item-subtitle",innerHTML:c.subtitle},null,8,ua)):Ke("",!0)])]),ue("div",ha,[ft(a,{item:c},null,8,["item"])])],10,ea))),128))],512)),[[Ro,e.isExpanded]]):Ke("",!0)],2)}const zn=Ne(Wi,[["render",fa]]),qo="option_ui_folded_key_map",va=G({name:"OptionUI",components:{OptionItem:zn},props:{optionList:{type:Array,default(){return[]}},expandId:{type:String,default:""}},setup(e,{emit:t}){const{expandId:o}=Jt(e),n=B(JSON.parse(localStorage.getItem(qo+o.value)||"null")||{});return{StOptionType:Ce,foldedKeyMap:n,handleToggleExpand:l=>{n.value[l.key]?delete n.value[l.key]:n.value[l.key]=!0,localStorage.setItem(qo+o.value,JSON.stringify(n.value))}}}}),pa={class:"option-ui"};function ga(e,t,o,n,r,l){const a=zn;return Q(),be("div",pa,[(Q(!0),be(Ot,null,Qt(e.optionList,i=>Ft((Q(),me(a,{item:i,key:i.key,"folded-key-map":e.foldedKeyMap,onOnToggleExpand:e.handleToggleExpand},null,8,["item","folded-key-map","onOnToggleExpand"])),[[Ro,!i.hidden]])),128))])}const dt=Ne(va,[["render",ga]]),ba=()=>{const e=[{label:"Bing",url:"https://api.dujin.org/bing/1920.php"},{label:"ACG",url:"https://api.dujin.org/pic/"},{label:"Ghibli",url:"https://api.dujin.org/pic/ghibli"},{label:"风景",url:"https://api.dujin.org/pic/fengjing"}];let t='<b><a href="https://www.dujin.org/12142.html" target="_blank">随机壁纸API</a></b>';return e.forEach(o=>{t+=`<br>${o.label}: <a href="${o.url}" target="_blank">${o.url}</a>`}),t},ma=G({name:"SettingsPersonalization",components:{OptionUI:dt},setup(e,{emit:t}){eo();const o=To();return{optionList:P(()=>[{label:"个性化",key:"personalization",children:[{label:"主题色",key:"themeColor",store:o,type:Ce.COLOR_PICKER},{label:"桌面壁纸",key:"desktopWallpaper",store:o,type:Ce.INPUT,tips:ba(),placeholder:"optional"},!o.desktopWallpaper&&{label:"桌面背景色",key:"desktopBgColor",store:o,type:Ce.COLOR_PICKER},{label:"明暗模式",key:"ldTheme",store:o,type:Ce.MULTIPLE_SWITCH,selectOptions:on},{label:"系统主题",key:"customTheme",store:o,type:Ce.SELECT,selectOptions:Tr},o.customTheme===Eo.DEFAULT&&{label:"圆角样式",key:"enableRoundedTheme",store:o,type:Ce.SWITCH},o.customTheme===Eo.DEFAULT&&{label:"Aero 效果",key:"enableAeroTheme",store:o,type:Ce.SWITCH},{label:"Disable Animation",subtitle:"E-Ink optimization",key:"disableAnimation",store:o,type:Ce.SWITCH}].filter(Boolean)},{label:"系统 UI",key:"system_ui",children:[{label:"多窗口模式",key:"isWindowed",store:o,type:Ce.SWITCH},{label:"任务栏显示时钟",key:"taskbarShowClock",store:o,type:Ce.SWITCH},{label:"任务栏只显示图标",key:"taskbarIconOnly",store:o,type:Ce.SWITCH}]}])}}});function ya(e,t,o,n,r,l){const a=dt;return Q(),me(a,{"option-list":e.optionList},null,8,["option-list"])}const wa=Ne(ma,[["render",ya]]),xa=G({name:"SettingsSystem",components:{OptionUI:dt},setup(e,{emit:t}){const{t:o}=eo(),n=To(),r=nn(),l=B({});return yt(async()=>{if(r.isBackendAvailable){const i=await $r();l.value=i||{}}}),{optionList:P(()=>[{label:"系统信息",key:"os_info",children:[{key:"frontend_version",label:"前端版本",subtitle:Vo.name,actionRender:s("div",Vo.version)},{key:"backend_version",label:"后端服务器版本",subtitle:r.isBackendAvailable?l.value.name:"后端服务不可用",actionRender:s("div",r.isBackendAvailable?l.value.version:"N/A")},{key:"github",label:"仓库地址",subtitle:"作者: Canwdev",actionRender:s("a",{href:"https://github.com/canwdev/canos-web",target:"_blank",rel:"nofollow noopener"},"Github")}].filter(Boolean)},{label:"媒体设置",key:"media_settings",children:[{label:"音量",key:"audioVolume",store:n,type:Ce.SLIDER,selectOptions:on},{label:"播放模式",key:"loopMode",store:n,type:Ce.SELECT,selectOptions:Object.values(zr).map(i=>({label:o(i.i18nKey),value:i.value}))}]}])}}});function Ca(e,t,o,n,r,l){const a=dt;return Q(),me(a,{"option-list":e.optionList},null,8,["option-list"])}const ka=Ne(xa,[["render",Ca]]),Sa=G({name:"SettingsPrograms",components:{OptionUI:dt},setup(e,{emit:t}){eo();const o=To(),n=nn();return{optionList:P(()=>{const l={};return o.appAutoStartIds.forEach(a=>{l[a]=!0}),[{label:"应用管理",key:"app_management",children:n.allApps.map(a=>({icon:a.icon,label:a.title,key:a.appid,actionRender:s(Io,{size:"small",align:"center"},()=>[s("div",{},"开机自启"),s(xn,{value:l[a.appid],onClick:()=>{l[a.appid]?delete l[a.appid]:l[a.appid]=!0,o.appAutoStartIds=Object.keys(l)}})])}))}]})}}});function _a(e,t,o,n,r,l){const a=dt;return Q(),me(a,{"option-list":e.optionList},null,8,["option-list"])}const Ra=Ne(Sa,[["render",_a]]),Ta=G({name:"SettingsApp",components:{SettingsPrograms:Ra,SettingsSystem:ka,SettingsPersonalization:wa,OptionUI:dt},setup(e,{emit:t}){eo();const o=B([{label:"个性化",value:kt.PERSONALIZATION},{label:"应用程序",value:kt.PROGRAMS},{label:"系统",value:kt.SYSTEM}]),n=B(kt.PERSONALIZATION);return{SettingsTabType:kt,settingsTabs:o,curTab:n}}});const $a={class:"settings-app"};function za(e,t,o,n,r,l){const a=vi,i=fi,c=di,d=uo("SettingsPersonalization"),b=uo("SettingsPrograms"),f=uo("SettingsSystem"),w=li,C=ri;return Q(),be("div",$a,[ft(C,{"has-sider":"",style:{height:"100%"}},{default:je(()=>[ft(c,{"collapse-mode":"width","collapsed-width":0,width:200,style:{height:"100%"},"show-trigger":"arrow-circle",bordered:""},{default:je(()=>[ft(i,{hoverable:"",clickable:""},{default:je(()=>[(Q(!0),be(Ot,null,Qt(e.settingsTabs,h=>(Q(),me(a,{class:pt(["left-list-item",{active:e.curTab===h.value}]),key:h.value,onClick:y=>e.curTab=h.value},{default:je(()=>[Ir($t(h.label),1)]),_:2},1032,["onClick","class"]))),128))]),_:1})]),_:1}),ft(w,null,{default:je(()=>[e.curTab===e.SettingsTabType.PERSONALIZATION?(Q(),me(d,{key:0})):e.curTab===e.SettingsTabType.PROGRAMS?(Q(),me(b,{key:1})):e.curTab===e.SettingsTabType.SYSTEM?(Q(),me(f,{key:2})):Ke("",!0)]),_:1})]),_:1})])}const Aa=Ne(Ta,[["render",za],["__scopeId","data-v-4bbfba4e"]]);export{Aa as default};
