import{d as Y,u as Vo,o as ft,a as An,b as Vn,c as P,r as O,e as Mt,f as Re,p as Qe,h as i,m as En,V as ko,n as kt,g as Dn,i as So,j as Eo,k as m,l as f,q as W,s as Be,t as fe,v as Ln,w as lt,x as Un,y as ae,z as Ie,N as Ht,A as st,T as ho,B as U,C as Le,D as fo,E as ue,F as Hn,G as et,H as Qt,I as nt,J as Oe,K as Do,L as vo,M as Nn,O as Nt,P as jn,Q as ce,R as Lo,S as _o,U as Wn,W as St,X as de,Y as Kn,Z as po,_ as qn,$ as _t,a0 as Yn,a1 as je,a2 as De,a3 as We,a4 as tt,a5 as Ue,a6 as ct,a7 as ot,a8 as dt,a9 as ut,aa as wt,ab as ro,ac as lo,ad as io,ae as Gn,af as jt,ag as Uo,ah as Ho,ai as Wt,aj as ao,ak as Xn,al as yt,am as go,an as Zn,ao as Qn,ap as No,aq as Jn,ar as er,as as tr,at as Ro,au as or,av as jo,aw as Jt,ax as nr,ay as rr,az as lr,aA as ir,aB as To,aC as eo,aD as ar,aE as te,aF as we,aG as Se,aH as sr,aI as Ke,aJ as Kt,aK as Et,aL as Dt,aM as bo,aN as be,aO as Fe,aP as Me,aQ as Je,aR as xt,aS as cr,aT as qt,aU as mo,aV as Wo,aW as dr,aX as $o,aY as Ko,aZ as ur,a_ as zo,a$ as hr,b0 as gt,b1 as fr}from"./index-4ed801e6.js";import{c as qo,a as Bt,b as vr,u as Yt,i as yo,d as pr,N as gr,_ as Yo,e as wo,f as rt,g as ht,V as Go,h as Xo,j as Zo}from"./Input-1edc8d20.js";import{_ as br}from"./Slider-b2b0191f.js";import{c as mr,h as Lt,a as yr,C as wr}from"./create-0c525a59.js";import{u as xr}from"./use-compitable-adbd472e.js";import{s as Cr,_ as xo}from"./Space-14e7bd2d.js";function Qo(e,t,o){t/=100,o/=100;const n=t*Math.min(o,1-o)+o;return[e,n?(2-2*o/n)*100:0,n*100]}function At(e,t,o){t/=100,o/=100;const n=o-o*t/2,r=Math.min(n,1-n);return[e,r?(o-n)/r*100:0,n*100]}function Ne(e,t,o){t/=100,o/=100;let n=(r,l=(r+e/60)%6)=>o-o*t*Math.max(Math.min(l,4-l,1),0);return[n(5)*255,n(3)*255,n(1)*255]}function so(e,t,o){e/=255,t/=255,o/=255;let n=Math.max(e,t,o),r=n-Math.min(e,t,o),l=r&&(n==e?(t-o)/r:n==t?2+(o-e)/r:4+(e-t)/r);return[60*(l<0?l+6:l),n&&r/n*100,n*100]}function co(e,t,o){e/=255,t/=255,o/=255;let n=Math.max(e,t,o),r=n-Math.min(e,t,o),l=1-Math.abs(n+n-r-1),s=r&&(n==e?(t-o)/r:n==t?2+(o-e)/r:4+(e-t)/r);return[60*(s<0?s+6:s),l?r/l*100:0,(n+n-r)*50]}function uo(e,t,o){t/=100,o/=100;let n=t*Math.min(o,1-o),r=(l,s=(l+e/30)%12)=>o-n*Math.max(Math.min(s-3,9-s,1),-1);return[r(0)*255,r(8)*255,r(4)*255]}function kr(e){switch(e){case"tiny":return"mini";case"small":return"tiny";case"medium":return"small";case"large":return"medium";case"huge":return"large"}throw Error(`${e} has no smaller size.`)}function Sr(e){switch(typeof e){case"string":return e||void 0;case"number":return String(e);default:return}}function to(e){const t=e.filter(o=>o!==void 0);if(t.length!==0)return t.length===1?t[0]:o=>{e.forEach(n=>{n&&n(o)})}}function Io(e){return e&-e}class _r{constructor(t,o){this.l=t,this.min=o;const n=new Array(t+1);for(let r=0;r<t+1;++r)n[r]=0;this.ft=n}add(t,o){if(o===0)return;const{l:n,ft:r}=this;for(t+=1;t<=n;)r[t]+=o,t+=Io(t)}get(t){return this.sum(t+1)-this.sum(t)}sum(t){if(t===void 0&&(t=this.l),t<=0)return 0;const{ft:o,min:n,l:r}=this;if(t>r)throw new Error("[FinweckTree.sum]: `i` is larger than length.");let l=t*n;for(;t>0;)l+=o[t],t-=Io(t);return l}getBound(t){let o=0,n=this.l;for(;n>o;){const r=Math.floor((o+n)/2),l=this.sum(r);if(l>t){n=r;continue}else if(l<t){if(o===r)return this.sum(o+1)<=t?o+1:r;o=r}else return r}return o}}let Pt;function Rr(){return Pt===void 0&&("matchMedia"in window?Pt=window.matchMedia("(pointer:coarse)").matches:Pt=!1),Pt}let oo;function Po(){return oo===void 0&&(oo="chrome"in window?window.devicePixelRatio:1),oo}const Tr=Bt(".v-vl",{maxHeight:"inherit",height:"100%",overflow:"auto",minWidth:"1px"},[Bt("&:not(.v-vl--show-scrollbar)",{scrollbarWidth:"none"},[Bt("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb",{width:0,height:0,display:"none"})])]),$r=Y({name:"VirtualList",inheritAttrs:!1,props:{showScrollbar:{type:Boolean,default:!0},items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:"div"},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:"key"},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},setup(e){const t=Vo();Tr.mount({id:"vueuc/virtual-list",head:!0,anchorMetaName:qo,ssr:t}),ft(()=>{const{defaultScrollIndex:v,defaultScrollKey:_}=e;v!=null?d({index:v}):_!=null&&d({key:_})});let o=!1,n=!1;An(()=>{if(o=!1,!n){n=!0;return}d({top:g.value,left:C})}),Vn(()=>{o=!0,n||(n=!0)});const r=P(()=>{const v=new Map,{keyField:_}=e;return e.items.forEach((V,X)=>{v.set(V[_],X)}),v}),l=O(null),s=O(void 0),a=new Map,u=P(()=>{const{items:v,itemSize:_,keyField:V}=e,X=new _r(v.length,_);return v.forEach((G,J)=>{const K=G[V],Z=a.get(K);Z!==void 0&&X.add(J,Z)}),X}),p=O(0);let C=0;const g=O(0),S=Mt(()=>Math.max(u.value.getBound(g.value-Re(e.paddingTop))-1,0)),w=P(()=>{const{value:v}=s;if(v===void 0)return[];const{items:_,itemSize:V}=e,X=S.value,G=Math.min(X+Math.ceil(v/V+1),_.length-1),J=[];for(let K=X;K<=G;++K)J.push(_[K]);return J}),d=(v,_)=>{if(typeof v=="number"){M(v,_,"auto");return}const{left:V,top:X,index:G,key:J,position:K,behavior:Z,debounce:b=!0}=v;if(V!==void 0||X!==void 0)M(V,X,Z);else if(G!==void 0)k(G,Z,b);else if(J!==void 0){const $=r.value.get(J);$!==void 0&&k($,Z,b)}else K==="bottom"?M(0,Number.MAX_SAFE_INTEGER,Z):K==="top"&&M(0,0,Z)};let y,B=null;function k(v,_,V){const{value:X}=u,G=X.sum(v)+Re(e.paddingTop);if(!V)l.value.scrollTo({left:0,top:G,behavior:_});else{y=v,B!==null&&window.clearTimeout(B),B=window.setTimeout(()=>{y=void 0,B=null},16);const{scrollTop:J,offsetHeight:K}=l.value;if(G>J){const Z=X.get(v);G+Z<=J+K||l.value.scrollTo({left:0,top:G+Z-K,behavior:_})}else l.value.scrollTo({left:0,top:G,behavior:_})}}function M(v,_,V){l.value.scrollTo({left:v,top:_,behavior:V})}function D(v,_){var V,X,G;if(o||e.ignoreItemResize||N(_.target))return;const{value:J}=u,K=r.value.get(v),Z=J.get(K),b=(G=(X=(V=_.borderBoxSize)===null||V===void 0?void 0:V[0])===null||X===void 0?void 0:X.blockSize)!==null&&G!==void 0?G:_.contentRect.height;if(b===Z)return;b-e.itemSize===0?a.delete(v):a.set(v,b-e.itemSize);const j=b-Z;if(j===0)return;J.add(K,j);const se=l.value;if(se!=null){if(y===void 0){const xe=J.sum(K);se.scrollTop>xe&&se.scrollBy(0,j)}else if(K<y)se.scrollBy(0,j);else if(K===y){const xe=J.sum(K);b+xe>se.scrollTop+se.offsetHeight&&se.scrollBy(0,j)}F()}p.value++}const H=!Rr();let E=!1;function z(v){var _;(_=e.onScroll)===null||_===void 0||_.call(e,v),(!H||!E)&&F()}function A(v){var _;if((_=e.onWheel)===null||_===void 0||_.call(e,v),H){const V=l.value;if(V!=null){if(v.deltaX===0&&(V.scrollTop===0&&v.deltaY<=0||V.scrollTop+V.offsetHeight>=V.scrollHeight&&v.deltaY>=0))return;v.preventDefault(),V.scrollTop+=v.deltaY/Po(),V.scrollLeft+=v.deltaX/Po(),F(),E=!0,vr(()=>{E=!1})}}}function T(v){if(o||N(v.target)||v.contentRect.height===s.value)return;s.value=v.contentRect.height;const{onResize:_}=e;_!==void 0&&_(v)}function F(){const{value:v}=l;v!=null&&(g.value=v.scrollTop,C=v.scrollLeft)}function N(v){let _=v;for(;_!==null;){if(_.style.display==="none")return!0;_=_.parentElement}return!1}return{listHeight:s,listStyle:{overflow:"auto"},keyToIndex:r,itemsStyle:P(()=>{const{itemResizable:v}=e,_=Qe(u.value.sum());return p.value,[e.itemsStyle,{boxSizing:"content-box",height:v?"":_,minHeight:v?_:"",paddingTop:Qe(e.paddingTop),paddingBottom:Qe(e.paddingBottom)}]}),visibleItemsStyle:P(()=>(p.value,{transform:`translateY(${Qe(u.value.sum(S.value))})`})),viewportItems:w,listElRef:l,itemsElRef:O(null),scrollTo:d,handleListResize:T,handleListScroll:z,handleListWheel:A,handleItemResize:D}},render(){const{itemResizable:e,keyField:t,keyToIndex:o,visibleItemsTag:n}=this;return i(ko,{onResize:this.handleListResize},{default:()=>{var r,l;return i("div",En(this.$attrs,{class:["v-vl",this.showScrollbar&&"v-vl--show-scrollbar"],onScroll:this.handleListScroll,onWheel:this.handleListWheel,ref:"listElRef"}),[this.items.length!==0?i("div",{ref:"itemsElRef",class:"v-vl-items",style:this.itemsStyle},[i(n,Object.assign({class:"v-vl-visible-items",style:this.visibleItemsStyle},this.visibleItemsProps),{default:()=>this.viewportItems.map(s=>{const a=s[t],u=o.get(a),p=this.$slots.default({item:s,index:u})[0];return e?i(ko,{key:a,onResize:C=>this.handleItemResize(a,C)},{default:()=>p}):(p.key=a,p)})})]):(l=(r=this.$slots).empty)===null||l===void 0?void 0:l.call(r)])}})}}),Ge="v-hidden",zr=Bt("[v-hidden]",{display:"none!important"}),Oo=Y({name:"Overflow",props:{getCounter:Function,getTail:Function,updateCounter:Function,onUpdateOverflow:Function},setup(e,{slots:t}){const o=O(null),n=O(null);function r(){const{value:s}=o,{getCounter:a,getTail:u}=e;let p;if(a!==void 0?p=a():p=n.value,!s||!p)return;p.hasAttribute(Ge)&&p.removeAttribute(Ge);const{children:C}=s,g=s.offsetWidth,S=[],w=t.tail?u==null?void 0:u():null;let d=w?w.offsetWidth:0,y=!1;const B=s.children.length-(t.tail?1:0);for(let M=0;M<B-1;++M){if(M<0)continue;const D=C[M];if(y){D.hasAttribute(Ge)||D.setAttribute(Ge,"");continue}else D.hasAttribute(Ge)&&D.removeAttribute(Ge);const H=D.offsetWidth;if(d+=H,S[M]=H,d>g){const{updateCounter:E}=e;for(let z=M;z>=0;--z){const A=B-1-z;E!==void 0?E(A):p.textContent=`${A}`;const T=p.offsetWidth;if(d-=S[z],d+T<=g||z===0){y=!0,M=z-1,w&&(M===-1?(w.style.maxWidth=`${g-T}px`,w.style.boxSizing="border-box"):w.style.maxWidth="");break}}}}const{onUpdateOverflow:k}=e;y?k!==void 0&&k(!0):(k!==void 0&&k(!1),p.setAttribute(Ge,""))}const l=Vo();return zr.mount({id:"vueuc/overflow",head:!0,anchorMetaName:qo,ssr:l}),ft(r),{selfRef:o,counterRef:n,sync:r}},render(){const{$slots:e}=this;return kt(this.sync),i("div",{class:"v-overflow",ref:"selfRef"},[Dn(e,"default"),e.counter?e.counter():i("span",{style:{display:"inline-block"},ref:"counterRef"}),e.tail?e.tail():null])}});function Jo(e,t){t&&(ft(()=>{const{value:o}=e;o&&So.registerHandler(o,t)}),Eo(()=>{const{value:o}=e;o&&So.unregisterHandler(o)}))}const Ir=Y({name:"Add",render(){return i("svg",{width:"512",height:"512",viewBox:"0 0 512 512",fill:"none",xmlns:"http://www.w3.org/2000/svg"},i("path",{d:"M256 112V400M400 256H112",stroke:"currentColor","stroke-width":"32","stroke-linecap":"round","stroke-linejoin":"round"}))}}),Pr=Y({name:"Checkmark",render(){return i("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16"},i("g",{fill:"none"},i("path",{d:"M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z",fill:"currentColor"})))}}),Or=Y({name:"Empty",render(){return i("svg",{viewBox:"0 0 28 28",fill:"none",xmlns:"http://www.w3.org/2000/svg"},i("path",{d:"M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z",fill:"currentColor"}),i("path",{d:"M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z",fill:"currentColor"}))}}),Fr=Y({props:{onFocus:Function,onBlur:Function},setup(e){return()=>i("div",{style:"width: 0; height: 0",tabindex:0,onFocus:e.onFocus,onBlur:e.onBlur})}}),Mr=m("empty",`
 display: flex;
 flex-direction: column;
 align-items: center;
 font-size: var(--n-font-size);
`,[f("icon",`
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 line-height: var(--n-icon-size);
 color: var(--n-icon-color);
 transition:
 color .3s var(--n-bezier);
 `,[W("+",[f("description",`
 margin-top: 8px;
 `)])]),f("description",`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),f("extra",`
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]),Br=Object.assign(Object.assign({},fe.props),{description:String,showDescription:{type:Boolean,default:!0},showIcon:{type:Boolean,default:!0},size:{type:String,default:"medium"},renderIcon:Function}),Ar=Y({name:"Empty",props:Br,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:o}=Be(e),n=fe("Empty","-empty",Mr,Ln,e,t),{localeRef:r}=Yt("Empty"),l=lt(Un,null),s=P(()=>{var C,g,S;return(C=e.description)!==null&&C!==void 0?C:(S=(g=l==null?void 0:l.mergedComponentPropsRef.value)===null||g===void 0?void 0:g.Empty)===null||S===void 0?void 0:S.description}),a=P(()=>{var C,g;return((g=(C=l==null?void 0:l.mergedComponentPropsRef.value)===null||C===void 0?void 0:C.Empty)===null||g===void 0?void 0:g.renderIcon)||(()=>i(Or,null))}),u=P(()=>{const{size:C}=e,{common:{cubicBezierEaseInOut:g},self:{[ae("iconSize",C)]:S,[ae("fontSize",C)]:w,textColor:d,iconColor:y,extraTextColor:B}}=n.value;return{"--n-icon-size":S,"--n-font-size":w,"--n-bezier":g,"--n-text-color":d,"--n-icon-color":y,"--n-extra-text-color":B}}),p=o?Ie("empty",P(()=>{let C="";const{size:g}=e;return C+=g[0],C}),u,e):void 0;return{mergedClsPrefix:t,mergedRenderIcon:a,localizedDescription:P(()=>s.value||r.value.description),cssVars:o?void 0:u,themeClass:p==null?void 0:p.themeClass,onRender:p==null?void 0:p.onRender}},render(){const{$slots:e,mergedClsPrefix:t,onRender:o}=this;return o==null||o(),i("div",{class:[`${t}-empty`,this.themeClass],style:this.cssVars},this.showIcon?i("div",{class:`${t}-empty__icon`},e.icon?e.icon():i(Ht,{clsPrefix:t},{default:this.mergedRenderIcon})):null,this.showDescription?i("div",{class:`${t}-empty__description`},e.default?e.default():this.localizedDescription):null,e.extra?i("div",{class:`${t}-empty__extra`},e.extra()):null)}});function Vr(e,t){return i(ho,{name:"fade-in-scale-up-transition"},{default:()=>e?i(Ht,{clsPrefix:t,class:`${t}-base-select-option__check`},{default:()=>i(Pr)}):null})}const Fo=Y({name:"NBaseSelectOption",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){const{valueRef:t,pendingTmNodeRef:o,multipleRef:n,valueSetRef:r,renderLabelRef:l,renderOptionRef:s,labelFieldRef:a,valueFieldRef:u,showCheckmarkRef:p,nodePropsRef:C,handleOptionClick:g,handleOptionMouseEnter:S}=lt(yo),w=Mt(()=>{const{value:k}=o;return k?e.tmNode.key===k.key:!1});function d(k){const{tmNode:M}=e;M.disabled||g(k,M)}function y(k){const{tmNode:M}=e;M.disabled||S(k,M)}function B(k){const{tmNode:M}=e,{value:D}=w;M.disabled||D||S(k,M)}return{multiple:n,isGrouped:Mt(()=>{const{tmNode:k}=e,{parent:M}=k;return M&&M.rawNode.type==="group"}),showCheckmark:p,nodeProps:C,isPending:w,isSelected:Mt(()=>{const{value:k}=t,{value:M}=n;if(k===null)return!1;const D=e.tmNode.rawNode[u.value];if(M){const{value:H}=r;return H.has(D)}else return k===D}),labelField:a,renderLabel:l,renderOption:s,handleMouseMove:B,handleMouseEnter:y,handleClick:d}},render(){const{clsPrefix:e,tmNode:{rawNode:t},isSelected:o,isPending:n,isGrouped:r,showCheckmark:l,nodeProps:s,renderOption:a,renderLabel:u,handleClick:p,handleMouseEnter:C,handleMouseMove:g}=this,S=Vr(o,e),w=u?[u(t,o),l&&S]:[st(t[this.labelField],t,o),l&&S],d=s==null?void 0:s(t),y=i("div",Object.assign({},d,{class:[`${e}-base-select-option`,t.class,d==null?void 0:d.class,{[`${e}-base-select-option--disabled`]:t.disabled,[`${e}-base-select-option--selected`]:o,[`${e}-base-select-option--grouped`]:r,[`${e}-base-select-option--pending`]:n,[`${e}-base-select-option--show-checkmark`]:l}],style:[(d==null?void 0:d.style)||"",t.style||""],onClick:to([p,d==null?void 0:d.onClick]),onMouseenter:to([C,d==null?void 0:d.onMouseenter]),onMousemove:to([g,d==null?void 0:d.onMousemove])}),i("div",{class:`${e}-base-select-option__content`},w));return t.render?t.render({node:y,option:t,selected:o}):a?a({node:y,option:t,selected:o}):y}}),Mo=Y({name:"NBaseSelectGroupHeader",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){const{renderLabelRef:e,renderOptionRef:t,labelFieldRef:o,nodePropsRef:n}=lt(yo);return{labelField:o,nodeProps:n,renderLabel:e,renderOption:t}},render(){const{clsPrefix:e,renderLabel:t,renderOption:o,nodeProps:n,tmNode:{rawNode:r}}=this,l=n==null?void 0:n(r),s=t?t(r,!1):st(r[this.labelField],r,!1),a=i("div",Object.assign({},l,{class:[`${e}-base-select-group-header`,l==null?void 0:l.class]}),s);return r.render?r.render({node:a,option:r}):o?o({node:a,option:r,selected:!1}):a}}),Er=m("base-select-menu",`
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`,[m("scrollbar",`
 max-height: var(--n-height);
 `),m("virtual-list",`
 max-height: var(--n-height);
 `),m("base-select-option",`
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `,[f("content",`
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]),m("base-select-group-header",`
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `),m("base-select-menu-option-wrapper",`
 position: relative;
 width: 100%;
 `),f("loading, empty",`
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `),f("loading",`
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `),f("action",`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),m("base-select-group-header",`
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `),m("base-select-option",`
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `,[U("show-checkmark",`
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
 `),U("grouped",`
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `),U("pending",[W("&::before",`
 background-color: var(--n-option-color-pending);
 `)]),U("selected",`
 color: var(--n-option-text-color-active);
 `,[W("&::before",`
 background-color: var(--n-option-color-active);
 `),U("pending",[W("&::before",`
 background-color: var(--n-option-color-active-pending);
 `)])]),U("disabled",`
 cursor: not-allowed;
 `,[Le("selected",`
 color: var(--n-option-text-color-disabled);
 `),U("selected",`
 opacity: var(--n-option-opacity-disabled);
 `)]),f("check",`
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `,[fo({enterScale:"0.5"})])])]),Dr=Y({name:"InternalSelectMenu",props:Object.assign(Object.assign({},fe.props),{clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:"medium"},value:{type:[String,Number,Array],default:null},autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,nodeProps:Function,showCheckmark:{type:Boolean,default:!0},onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,onResize:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,onToggle:Function}),setup(e){const t=fe("InternalSelectMenu","-internal-select-menu",Er,Hn,e,ue(e,"clsPrefix")),o=O(null),n=O(null),r=O(null),l=P(()=>e.treeMate.getFlattenedNodes()),s=P(()=>mr(l.value)),a=O(null);function u(){const{treeMate:b}=e;let $=null;const{value:j}=e;j===null?$=b.getFirstAvailableNode():(e.multiple?$=b.getNode((j||[])[(j||[]).length-1]):$=b.getNode(j),(!$||$.disabled)&&($=b.getFirstAvailableNode())),v($||null)}function p(){const{value:b}=a;b&&!e.treeMate.getNode(b.key)&&(a.value=null)}let C;et(()=>e.show,b=>{b?C=et(()=>e.treeMate,()=>{e.resetMenuOnOptionsChange?(e.autoPending?u():p(),kt(_)):p()},{immediate:!0}):C==null||C()},{immediate:!0}),Eo(()=>{C==null||C()});const g=P(()=>Re(t.value.self[ae("optionHeight",e.size)])),S=P(()=>Qt(t.value.self[ae("padding",e.size)])),w=P(()=>e.multiple&&Array.isArray(e.value)?new Set(e.value):new Set),d=P(()=>{const b=l.value;return b&&b.length===0});function y(b){const{onToggle:$}=e;$&&$(b)}function B(b){const{onScroll:$}=e;$&&$(b)}function k(b){var $;($=r.value)===null||$===void 0||$.sync(),B(b)}function M(){var b;(b=r.value)===null||b===void 0||b.sync()}function D(){const{value:b}=a;return b||null}function H(b,$){$.disabled||v($,!1)}function E(b,$){$.disabled||y($)}function z(b){var $;Lt(b,"action")||($=e.onKeyup)===null||$===void 0||$.call(e,b)}function A(b){var $;Lt(b,"action")||($=e.onKeydown)===null||$===void 0||$.call(e,b)}function T(b){var $;($=e.onMousedown)===null||$===void 0||$.call(e,b),!e.focusable&&b.preventDefault()}function F(){const{value:b}=a;b&&v(b.getNext({loop:!0}),!0)}function N(){const{value:b}=a;b&&v(b.getPrev({loop:!0}),!0)}function v(b,$=!1){a.value=b,$&&_()}function _(){var b,$;const j=a.value;if(!j)return;const se=s.value(j.key);se!==null&&(e.virtualScroll?(b=n.value)===null||b===void 0||b.scrollTo({index:se}):($=r.value)===null||$===void 0||$.scrollTo({index:se,elSize:g.value}))}function V(b){var $,j;!(($=o.value)===null||$===void 0)&&$.contains(b.target)&&((j=e.onFocus)===null||j===void 0||j.call(e,b))}function X(b){var $,j;!(($=o.value)===null||$===void 0)&&$.contains(b.relatedTarget)||(j=e.onBlur)===null||j===void 0||j.call(e,b)}nt(yo,{handleOptionMouseEnter:H,handleOptionClick:E,valueSetRef:w,pendingTmNodeRef:a,nodePropsRef:ue(e,"nodeProps"),showCheckmarkRef:ue(e,"showCheckmark"),multipleRef:ue(e,"multiple"),valueRef:ue(e,"value"),renderLabelRef:ue(e,"renderLabel"),renderOptionRef:ue(e,"renderOption"),labelFieldRef:ue(e,"labelField"),valueFieldRef:ue(e,"valueField")}),nt(pr,o),ft(()=>{const{value:b}=r;b&&b.sync()});const G=P(()=>{const{size:b}=e,{common:{cubicBezierEaseInOut:$},self:{height:j,borderRadius:se,color:xe,groupHeaderTextColor:Te,actionDividerColor:$e,optionTextColorPressed:ie,optionTextColor:Ce,optionTextColorDisabled:he,optionTextColorActive:me,optionOpacityDisabled:Pe,optionCheckColor:_e,actionTextColor:qe,optionColorPending:Ae,optionColorActive:Ve,loadingColor:Ee,loadingSize:ke,optionColorActivePending:Ye,[ae("optionFontSize",b)]:x,[ae("optionHeight",b)]:Q,[ae("optionPadding",b)]:ee}}=t.value;return{"--n-height":j,"--n-action-divider-color":$e,"--n-action-text-color":qe,"--n-bezier":$,"--n-border-radius":se,"--n-color":xe,"--n-option-font-size":x,"--n-group-header-text-color":Te,"--n-option-check-color":_e,"--n-option-color-pending":Ae,"--n-option-color-active":Ve,"--n-option-color-active-pending":Ye,"--n-option-height":Q,"--n-option-opacity-disabled":Pe,"--n-option-text-color":Ce,"--n-option-text-color-active":me,"--n-option-text-color-disabled":he,"--n-option-text-color-pressed":ie,"--n-option-padding":ee,"--n-option-padding-left":Qt(ee,"left"),"--n-option-padding-right":Qt(ee,"right"),"--n-loading-color":Ee,"--n-loading-size":ke}}),{inlineThemeDisabled:J}=e,K=J?Ie("internal-select-menu",P(()=>e.size[0]),G,e):void 0,Z={selfRef:o,next:F,prev:N,getPendingTmNode:D};return Jo(o,e.onResize),Object.assign({mergedTheme:t,virtualListRef:n,scrollbarRef:r,itemSize:g,padding:S,flattenedNodes:l,empty:d,virtualListContainer(){const{value:b}=n;return b==null?void 0:b.listElRef},virtualListContent(){const{value:b}=n;return b==null?void 0:b.itemsElRef},doScroll:B,handleFocusin:V,handleFocusout:X,handleKeyUp:z,handleKeyDown:A,handleMouseDown:T,handleVirtualListResize:M,handleVirtualListScroll:k,cssVars:J?void 0:G,themeClass:K==null?void 0:K.themeClass,onRender:K==null?void 0:K.onRender},Z)},render(){const{$slots:e,virtualScroll:t,clsPrefix:o,mergedTheme:n,themeClass:r,onRender:l}=this;return l==null||l(),i("div",{ref:"selfRef",tabindex:this.focusable?0:-1,class:[`${o}-base-select-menu`,r,this.multiple&&`${o}-base-select-menu--multiple`],style:this.cssVars,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},this.loading?i("div",{class:`${o}-base-select-menu__loading`},i(Do,{clsPrefix:o,strokeWidth:20})):this.empty?i("div",{class:`${o}-base-select-menu__empty`,"data-empty":!0},Nn(e.empty,()=>[i(Ar,{theme:n.peers.Empty,themeOverrides:n.peerOverrides.Empty})])):i(vo,{ref:"scrollbarRef",theme:n.peers.Scrollbar,themeOverrides:n.peerOverrides.Scrollbar,scrollable:this.scrollable,container:t?this.virtualListContainer:void 0,content:t?this.virtualListContent:void 0,onScroll:t?void 0:this.doScroll},{default:()=>t?i($r,{ref:"virtualListRef",class:`${o}-virtual-list`,items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:s})=>s.isGroup?i(Mo,{key:s.key,clsPrefix:o,tmNode:s}):s.ignored?null:i(Fo,{clsPrefix:o,key:s.key,tmNode:s})}):i("div",{class:`${o}-base-select-menu-option-wrapper`,style:{paddingTop:this.padding.top,paddingBottom:this.padding.bottom}},this.flattenedNodes.map(s=>s.isGroup?i(Mo,{key:s.key,clsPrefix:o,tmNode:s}):i(Fo,{clsPrefix:o,key:s.key,tmNode:s})))}),Oe(e.action,s=>s&&[i("div",{class:`${o}-base-select-menu__action`,"data-action":!0,key:"action"},s),i(Fr,{onFocus:this.onTabOut,key:"focus-detector"})]))}}),Lr=e=>{const{textColor2:t,primaryColorHover:o,primaryColorPressed:n,primaryColor:r,infoColor:l,successColor:s,warningColor:a,errorColor:u,baseColor:p,borderColor:C,opacityDisabled:g,tagColor:S,closeIconColor:w,closeIconColorHover:d,closeIconColorPressed:y,borderRadiusSmall:B,fontSizeMini:k,fontSizeTiny:M,fontSizeSmall:D,fontSizeMedium:H,heightMini:E,heightTiny:z,heightSmall:A,heightMedium:T,closeColorHover:F,closeColorPressed:N,buttonColor2Hover:v,buttonColor2Pressed:_,fontWeightStrong:V}=e;return Object.assign(Object.assign({},jn),{closeBorderRadius:B,heightTiny:E,heightSmall:z,heightMedium:A,heightLarge:T,borderRadius:B,opacityDisabled:g,fontSizeTiny:k,fontSizeSmall:M,fontSizeMedium:D,fontSizeLarge:H,fontWeightStrong:V,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:p,colorCheckable:"#0000",colorHoverCheckable:v,colorPressedCheckable:_,colorChecked:r,colorCheckedHover:o,colorCheckedPressed:n,border:`1px solid ${C}`,textColor:t,color:S,colorBordered:"rgb(250, 250, 252)",closeIconColor:w,closeIconColorHover:d,closeIconColorPressed:y,closeColorHover:F,closeColorPressed:N,borderPrimary:`1px solid ${ce(r,{alpha:.3})}`,textColorPrimary:r,colorPrimary:ce(r,{alpha:.12}),colorBorderedPrimary:ce(r,{alpha:.1}),closeIconColorPrimary:r,closeIconColorHoverPrimary:r,closeIconColorPressedPrimary:r,closeColorHoverPrimary:ce(r,{alpha:.12}),closeColorPressedPrimary:ce(r,{alpha:.18}),borderInfo:`1px solid ${ce(l,{alpha:.3})}`,textColorInfo:l,colorInfo:ce(l,{alpha:.12}),colorBorderedInfo:ce(l,{alpha:.1}),closeIconColorInfo:l,closeIconColorHoverInfo:l,closeIconColorPressedInfo:l,closeColorHoverInfo:ce(l,{alpha:.12}),closeColorPressedInfo:ce(l,{alpha:.18}),borderSuccess:`1px solid ${ce(s,{alpha:.3})}`,textColorSuccess:s,colorSuccess:ce(s,{alpha:.12}),colorBorderedSuccess:ce(s,{alpha:.1}),closeIconColorSuccess:s,closeIconColorHoverSuccess:s,closeIconColorPressedSuccess:s,closeColorHoverSuccess:ce(s,{alpha:.12}),closeColorPressedSuccess:ce(s,{alpha:.18}),borderWarning:`1px solid ${ce(a,{alpha:.35})}`,textColorWarning:a,colorWarning:ce(a,{alpha:.15}),colorBorderedWarning:ce(a,{alpha:.12}),closeIconColorWarning:a,closeIconColorHoverWarning:a,closeIconColorPressedWarning:a,closeColorHoverWarning:ce(a,{alpha:.12}),closeColorPressedWarning:ce(a,{alpha:.18}),borderError:`1px solid ${ce(u,{alpha:.23})}`,textColorError:u,colorError:ce(u,{alpha:.1}),colorBorderedError:ce(u,{alpha:.08}),closeIconColorError:u,closeIconColorHoverError:u,closeIconColorPressedError:u,closeColorHoverError:ce(u,{alpha:.12}),closeColorPressedError:ce(u,{alpha:.18})})},Ur={name:"Tag",common:Nt,self:Lr},en=Ur,tn={color:Object,type:{type:String,default:"default"},round:Boolean,size:{type:String,default:"medium"},closable:Boolean,disabled:{type:Boolean,default:void 0}},Hr=m("tag",`
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
`,[U("strong",`
 font-weight: var(--n-font-weight-strong);
 `),f("border",`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),f("icon",`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),f("avatar",`
 display: flex;
 margin: 0 6px 0 0;
 `),f("close",`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),U("round",`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[f("icon",`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),f("avatar",`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),U("closable",`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),U("icon, avatar",[U("round",`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),U("disabled",`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),U("checkable",`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[Le("disabled",[W("&:hover","background-color: var(--n-color-hover-checkable);",[Le("checked","color: var(--n-text-color-hover-checkable);")]),W("&:active","background-color: var(--n-color-pressed-checkable);",[Le("checked","color: var(--n-text-color-pressed-checkable);")])]),U("checked",`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[Le("disabled",[W("&:hover","background-color: var(--n-color-checked-hover);"),W("&:active","background-color: var(--n-color-checked-pressed);")])])])]),Nr=Object.assign(Object.assign(Object.assign({},fe.props),tn),{bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function}),jr=St("n-tag"),Vt=Y({name:"Tag",props:Nr,setup(e){const t=O(null),{mergedBorderedRef:o,mergedClsPrefixRef:n,inlineThemeDisabled:r,mergedRtlRef:l}=Be(e),s=fe("Tag","-tag",Hr,en,e,n);nt(jr,{roundRef:ue(e,"round")});function a(w){if(!e.disabled&&e.checkable){const{checked:d,onCheckedChange:y,onUpdateChecked:B,"onUpdate:checked":k}=e;B&&B(!d),k&&k(!d),y&&y(!d)}}function u(w){if(e.triggerClickOnClose||w.stopPropagation(),!e.disabled){const{onClose:d}=e;d&&de(d,w)}}const p={setTextContent(w){const{value:d}=t;d&&(d.textContent=w)}},C=Lo("Tag",l,n),g=P(()=>{const{type:w,size:d,color:{color:y,textColor:B}={}}=e,{common:{cubicBezierEaseInOut:k},self:{padding:M,closeMargin:D,closeMarginRtl:H,borderRadius:E,opacityDisabled:z,textColorCheckable:A,textColorHoverCheckable:T,textColorPressedCheckable:F,textColorChecked:N,colorCheckable:v,colorHoverCheckable:_,colorPressedCheckable:V,colorChecked:X,colorCheckedHover:G,colorCheckedPressed:J,closeBorderRadius:K,fontWeightStrong:Z,[ae("colorBordered",w)]:b,[ae("closeSize",d)]:$,[ae("closeIconSize",d)]:j,[ae("fontSize",d)]:se,[ae("height",d)]:xe,[ae("color",w)]:Te,[ae("textColor",w)]:$e,[ae("border",w)]:ie,[ae("closeIconColor",w)]:Ce,[ae("closeIconColorHover",w)]:he,[ae("closeIconColorPressed",w)]:me,[ae("closeColorHover",w)]:Pe,[ae("closeColorPressed",w)]:_e}}=s.value;return{"--n-font-weight-strong":Z,"--n-avatar-size-override":`calc(${xe} - 8px)`,"--n-bezier":k,"--n-border-radius":E,"--n-border":ie,"--n-close-icon-size":j,"--n-close-color-pressed":_e,"--n-close-color-hover":Pe,"--n-close-border-radius":K,"--n-close-icon-color":Ce,"--n-close-icon-color-hover":he,"--n-close-icon-color-pressed":me,"--n-close-icon-color-disabled":Ce,"--n-close-margin":D,"--n-close-margin-rtl":H,"--n-close-size":$,"--n-color":y||(o.value?b:Te),"--n-color-checkable":v,"--n-color-checked":X,"--n-color-checked-hover":G,"--n-color-checked-pressed":J,"--n-color-hover-checkable":_,"--n-color-pressed-checkable":V,"--n-font-size":se,"--n-height":xe,"--n-opacity-disabled":z,"--n-padding":M,"--n-text-color":B||$e,"--n-text-color-checkable":A,"--n-text-color-checked":N,"--n-text-color-hover-checkable":T,"--n-text-color-pressed-checkable":F}}),S=r?Ie("tag",P(()=>{let w="";const{type:d,size:y,color:{color:B,textColor:k}={}}=e;return w+=d[0],w+=y[0],B&&(w+=`a${_o(B)}`),k&&(w+=`b${_o(k)}`),o.value&&(w+="c"),w}),g,e):void 0;return Object.assign(Object.assign({},p),{rtlEnabled:C,mergedClsPrefix:n,contentRef:t,mergedBordered:o,handleClick:a,handleCloseClick:u,cssVars:r?void 0:g,themeClass:S==null?void 0:S.themeClass,onRender:S==null?void 0:S.onRender})},render(){var e,t;const{mergedClsPrefix:o,rtlEnabled:n,closable:r,color:{borderColor:l}={},round:s,onRender:a,$slots:u}=this;a==null||a();const p=Oe(u.avatar,g=>g&&i("div",{class:`${o}-tag__avatar`},g)),C=Oe(u.icon,g=>g&&i("div",{class:`${o}-tag__icon`},g));return i("div",{class:[`${o}-tag`,this.themeClass,{[`${o}-tag--rtl`]:n,[`${o}-tag--strong`]:this.strong,[`${o}-tag--disabled`]:this.disabled,[`${o}-tag--checkable`]:this.checkable,[`${o}-tag--checked`]:this.checkable&&this.checked,[`${o}-tag--round`]:s,[`${o}-tag--avatar`]:p,[`${o}-tag--icon`]:C,[`${o}-tag--closable`]:r}],style:this.cssVars,onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},C||p,i("span",{class:`${o}-tag__content`,ref:"contentRef"},(t=(e=this.$slots).default)===null||t===void 0?void 0:t.call(e)),!this.checkable&&r?i(Wn,{clsPrefix:o,class:`${o}-tag__close`,disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:s,isButtonTag:this.internalCloseIsButtonTag,absolute:!0}):null,!this.checkable&&this.mergedBordered?i("div",{class:`${o}-tag__border`,style:{borderColor:l}}):null)}}),Wr=W([m("base-selection",`
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
 `,[m("base-loading",`
 color: var(--n-loading-color);
 `),m("base-selection-tags","min-height: var(--n-height);"),f("border, state-border",`
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
 `),f("state-border",`
 z-index: 1;
 border-color: #0000;
 `),m("base-suffix",`
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `,[f("arrow",`
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]),m("base-selection-overlay",`
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
 `,[f("wrapper",`
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),m("base-selection-placeholder",`
 color: var(--n-placeholder-color);
 `,[f("inner",`
 max-width: 100%;
 overflow: hidden;
 `)]),m("base-selection-tags",`
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
 `),m("base-selection-label",`
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
 `,[m("base-selection-input",`
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
 `,[f("content",`
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]),f("render-label",`
 color: var(--n-text-color);
 `)]),Le("disabled",[W("&:hover",[f("state-border",`
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]),U("focus",[f("state-border",`
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]),U("active",[f("state-border",`
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `),m("base-selection-label","background-color: var(--n-color-active);"),m("base-selection-tags","background-color: var(--n-color-active);")])]),U("disabled","cursor: not-allowed;",[f("arrow",`
 color: var(--n-arrow-color-disabled);
 `),m("base-selection-label",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[m("base-selection-input",`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `),f("render-label",`
 color: var(--n-text-color-disabled);
 `)]),m("base-selection-tags",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `),m("base-selection-placeholder",`
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]),m("base-selection-input-tag",`
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `,[f("input",`
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
 `),f("mirror",`
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]),["warning","error"].map(e=>U(`${e}-status`,[f("state-border",`border: var(--n-border-${e});`),Le("disabled",[W("&:hover",[f("state-border",`
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]),U("active",[f("state-border",`
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `),m("base-selection-label",`background-color: var(--n-color-active-${e});`),m("base-selection-tags",`background-color: var(--n-color-active-${e});`)]),U("focus",[f("state-border",`
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]),m("base-selection-popover",`
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `),m("base-selection-tag-wrapper",`
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `,[W("&:last-child","padding-right: 0;"),m("tag",`
 font-size: 14px;
 max-width: 100%;
 `,[f("content",`
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]),Kr=Y({name:"InternalSelection",props:Object.assign(Object.assign({},fe.props),{clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:""},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:"medium"},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean,ignoreComposition:{type:Boolean,default:!0},onResize:Function}),setup(e){const t=O(null),o=O(null),n=O(null),r=O(null),l=O(null),s=O(null),a=O(null),u=O(null),p=O(null),C=O(null),g=O(!1),S=O(!1),w=O(!1),d=fe("InternalSelection","-internal-selection",Wr,Kn,e,ue(e,"clsPrefix")),y=P(()=>e.clearable&&!e.disabled&&(w.value||e.active)),B=P(()=>e.selectedOption?e.renderTag?e.renderTag({option:e.selectedOption,handleClose:()=>{}}):e.renderLabel?e.renderLabel(e.selectedOption,!0):st(e.selectedOption[e.labelField],e.selectedOption,!0):e.placeholder),k=P(()=>{const h=e.selectedOption;if(h)return h[e.labelField]}),M=P(()=>e.multiple?!!(Array.isArray(e.selectedOptions)&&e.selectedOptions.length):e.selectedOption!==null);function D(){var h;const{value:R}=t;if(R){const{value:L}=o;L&&(L.style.width=`${R.offsetWidth}px`,e.maxTagCount!=="responsive"&&((h=p.value)===null||h===void 0||h.sync()))}}function H(){const{value:h}=C;h&&(h.style.display="none")}function E(){const{value:h}=C;h&&(h.style.display="inline-block")}et(ue(e,"active"),h=>{h||H()}),et(ue(e,"pattern"),()=>{e.multiple&&kt(D)});function z(h){const{onFocus:R}=e;R&&R(h)}function A(h){const{onBlur:R}=e;R&&R(h)}function T(h){const{onDeleteOption:R}=e;R&&R(h)}function F(h){const{onClear:R}=e;R&&R(h)}function N(h){const{onPatternInput:R}=e;R&&R(h)}function v(h){var R;(!h.relatedTarget||!(!((R=n.value)===null||R===void 0)&&R.contains(h.relatedTarget)))&&z(h)}function _(h){var R;!((R=n.value)===null||R===void 0)&&R.contains(h.relatedTarget)||A(h)}function V(h){F(h)}function X(){w.value=!0}function G(){w.value=!1}function J(h){!e.active||!e.filterable||h.target!==o.value&&h.preventDefault()}function K(h){T(h)}function Z(h){if(h.key==="Backspace"&&!b.value&&!e.pattern.length){const{selectedOptions:R}=e;R!=null&&R.length&&K(R[R.length-1])}}const b=O(!1);let $=null;function j(h){const{value:R}=t;if(R){const L=h.target.value;R.textContent=L,D()}e.ignoreComposition&&b.value?$=h:N(h)}function se(){b.value=!0}function xe(){b.value=!1,e.ignoreComposition&&N($),$=null}function Te(h){var R;S.value=!0,(R=e.onPatternFocus)===null||R===void 0||R.call(e,h)}function $e(h){var R;S.value=!1,(R=e.onPatternBlur)===null||R===void 0||R.call(e,h)}function ie(){var h,R;if(e.filterable)S.value=!1,(h=s.value)===null||h===void 0||h.blur(),(R=o.value)===null||R===void 0||R.blur();else if(e.multiple){const{value:L}=r;L==null||L.blur()}else{const{value:L}=l;L==null||L.blur()}}function Ce(){var h,R,L;e.filterable?(S.value=!1,(h=s.value)===null||h===void 0||h.focus()):e.multiple?(R=r.value)===null||R===void 0||R.focus():(L=l.value)===null||L===void 0||L.focus()}function he(){const{value:h}=o;h&&(E(),h.focus())}function me(){const{value:h}=o;h&&h.blur()}function Pe(h){const{value:R}=a;R&&R.setTextContent(`+${h}`)}function _e(){const{value:h}=u;return h}function qe(){return o.value}let Ae=null;function Ve(){Ae!==null&&window.clearTimeout(Ae)}function Ee(){e.disabled||e.active||(Ve(),Ae=window.setTimeout(()=>{M.value&&(g.value=!0)},100))}function ke(){Ve()}function Ye(h){h||(Ve(),g.value=!1)}et(M,h=>{h||(g.value=!1)}),ft(()=>{po(()=>{const h=s.value;h&&(h.tabIndex=e.disabled||S.value?-1:0)})}),Jo(n,e.onResize);const{inlineThemeDisabled:x}=e,Q=P(()=>{const{size:h}=e,{common:{cubicBezierEaseInOut:R},self:{borderRadius:L,color:pe,placeholderColor:ve,textColor:ze,paddingSingle:vt,paddingMultiple:pt,caretColor:Rt,colorDisabled:Tt,textColorDisabled:$t,placeholderColorDisabled:Gt,colorActive:Xt,boxShadowFocus:zt,boxShadowActive:He,boxShadowHover:c,border:I,borderFocus:q,borderHover:le,borderActive:oe,arrowColor:re,arrowColorDisabled:ne,loadingColor:ge,colorActiveWarning:It,boxShadowFocusWarning:Zt,boxShadowActiveWarning:pn,boxShadowHoverWarning:gn,borderWarning:bn,borderFocusWarning:mn,borderHoverWarning:yn,borderActiveWarning:wn,colorActiveError:xn,boxShadowFocusError:Cn,boxShadowActiveError:kn,boxShadowHoverError:Sn,borderError:_n,borderFocusError:Rn,borderHoverError:Tn,borderActiveError:$n,clearColor:zn,clearColorHover:In,clearColorPressed:Pn,clearSize:On,arrowSize:Fn,[ae("height",h)]:Mn,[ae("fontSize",h)]:Bn}}=d.value;return{"--n-bezier":R,"--n-border":I,"--n-border-active":oe,"--n-border-focus":q,"--n-border-hover":le,"--n-border-radius":L,"--n-box-shadow-active":He,"--n-box-shadow-focus":zt,"--n-box-shadow-hover":c,"--n-caret-color":Rt,"--n-color":pe,"--n-color-active":Xt,"--n-color-disabled":Tt,"--n-font-size":Bn,"--n-height":Mn,"--n-padding-single":vt,"--n-padding-multiple":pt,"--n-placeholder-color":ve,"--n-placeholder-color-disabled":Gt,"--n-text-color":ze,"--n-text-color-disabled":$t,"--n-arrow-color":re,"--n-arrow-color-disabled":ne,"--n-loading-color":ge,"--n-color-active-warning":It,"--n-box-shadow-focus-warning":Zt,"--n-box-shadow-active-warning":pn,"--n-box-shadow-hover-warning":gn,"--n-border-warning":bn,"--n-border-focus-warning":mn,"--n-border-hover-warning":yn,"--n-border-active-warning":wn,"--n-color-active-error":xn,"--n-box-shadow-focus-error":Cn,"--n-box-shadow-active-error":kn,"--n-box-shadow-hover-error":Sn,"--n-border-error":_n,"--n-border-focus-error":Rn,"--n-border-hover-error":Tn,"--n-border-active-error":$n,"--n-clear-size":On,"--n-clear-color":zn,"--n-clear-color-hover":In,"--n-clear-color-pressed":Pn,"--n-arrow-size":Fn}}),ee=x?Ie("internal-selection",P(()=>e.size[0]),Q,e):void 0;return{mergedTheme:d,mergedClearable:y,patternInputFocused:S,filterablePlaceholder:B,label:k,selected:M,showTagsPanel:g,isComposing:b,counterRef:a,counterWrapperRef:u,patternInputMirrorRef:t,patternInputRef:o,selfRef:n,multipleElRef:r,singleElRef:l,patternInputWrapperRef:s,overflowRef:p,inputTagElRef:C,handleMouseDown:J,handleFocusin:v,handleClear:V,handleMouseEnter:X,handleMouseLeave:G,handleDeleteOption:K,handlePatternKeyDown:Z,handlePatternInputInput:j,handlePatternInputBlur:$e,handlePatternInputFocus:Te,handleMouseEnterCounter:Ee,handleMouseLeaveCounter:ke,handleFocusout:_,handleCompositionEnd:xe,handleCompositionStart:se,onPopoverUpdateShow:Ye,focus:Ce,focusInput:he,blur:ie,blurInput:me,updateCounter:Pe,getCounter:_e,getTail:qe,renderLabel:e.renderLabel,cssVars:x?void 0:Q,themeClass:ee==null?void 0:ee.themeClass,onRender:ee==null?void 0:ee.onRender}},render(){const{status:e,multiple:t,size:o,disabled:n,filterable:r,maxTagCount:l,bordered:s,clsPrefix:a,onRender:u,renderTag:p,renderLabel:C}=this;u==null||u();const g=l==="responsive",S=typeof l=="number",w=g||S,d=i(qn,null,{default:()=>i(gr,{clsPrefix:a,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>{var B,k;return(k=(B=this.$slots).arrow)===null||k===void 0?void 0:k.call(B)}})});let y;if(t){const{labelField:B}=this,k=_=>i("div",{class:`${a}-base-selection-tag-wrapper`,key:_.value},p?p({option:_,handleClose:()=>{this.handleDeleteOption(_)}}):i(Vt,{size:o,closable:!_.disabled,disabled:n,onClose:()=>{this.handleDeleteOption(_)},internalCloseIsButtonTag:!1,internalCloseFocusable:!1},{default:()=>C?C(_,!0):st(_[B],_,!0)})),M=()=>(S?this.selectedOptions.slice(0,l):this.selectedOptions).map(k),D=r?i("div",{class:`${a}-base-selection-input-tag`,ref:"inputTagElRef",key:"__input-tag__"},i("input",Object.assign({},this.inputProps,{ref:"patternInputRef",tabindex:-1,disabled:n,value:this.pattern,autofocus:this.autofocus,class:`${a}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),i("span",{ref:"patternInputMirrorRef",class:`${a}-base-selection-input-tag__mirror`},this.pattern)):null,H=g?()=>i("div",{class:`${a}-base-selection-tag-wrapper`,ref:"counterWrapperRef"},i(Vt,{size:o,ref:"counterRef",onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:n})):void 0;let E;if(S){const _=this.selectedOptions.length-l;_>0&&(E=i("div",{class:`${a}-base-selection-tag-wrapper`,key:"__counter__"},i(Vt,{size:o,ref:"counterRef",onMouseenter:this.handleMouseEnterCounter,disabled:n},{default:()=>`+${_}`})))}const z=g?r?i(Oo,{ref:"overflowRef",updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:M,counter:H,tail:()=>D}):i(Oo,{ref:"overflowRef",updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:M,counter:H}):S?M().concat(E):M(),A=w?()=>i("div",{class:`${a}-base-selection-popover`},g?M():this.selectedOptions.map(k)):void 0,T=w?{show:this.showTagsPanel,trigger:"hover",overlap:!0,placement:"top",width:"trigger",onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover}:null,N=(this.selected?!1:this.active?!this.pattern&&!this.isComposing:!0)?i("div",{class:`${a}-base-selection-placeholder ${a}-base-selection-overlay`},i("div",{class:`${a}-base-selection-placeholder__inner`},this.placeholder)):null,v=r?i("div",{ref:"patternInputWrapperRef",class:`${a}-base-selection-tags`},z,g?null:D,d):i("div",{ref:"multipleElRef",class:`${a}-base-selection-tags`,tabindex:n?void 0:0},z,d);y=i(_t,null,w?i(Yo,Object.assign({},T,{scrollable:!0,style:"max-height: calc(var(--v-target-height) * 6.6);"}),{trigger:()=>v,default:A}):v,N)}else if(r){const B=this.pattern||this.isComposing,k=this.active?!B:!this.selected,M=this.active?!1:this.selected;y=i("div",{ref:"patternInputWrapperRef",class:`${a}-base-selection-label`},i("input",Object.assign({},this.inputProps,{ref:"patternInputRef",class:`${a}-base-selection-input`,value:this.active?this.pattern:"",placeholder:"",readonly:n,disabled:n,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),M?i("div",{class:`${a}-base-selection-label__render-label ${a}-base-selection-overlay`,key:"input"},i("div",{class:`${a}-base-selection-overlay__wrapper`},p?p({option:this.selectedOption,handleClose:()=>{}}):C?C(this.selectedOption,!0):st(this.label,this.selectedOption,!0))):null,k?i("div",{class:`${a}-base-selection-placeholder ${a}-base-selection-overlay`,key:"placeholder"},i("div",{class:`${a}-base-selection-overlay__wrapper`},this.filterablePlaceholder)):null,d)}else y=i("div",{ref:"singleElRef",class:`${a}-base-selection-label`,tabindex:this.disabled?void 0:0},this.label!==void 0?i("div",{class:`${a}-base-selection-input`,title:Sr(this.label),key:"input"},i("div",{class:`${a}-base-selection-input__content`},p?p({option:this.selectedOption,handleClose:()=>{}}):C?C(this.selectedOption,!0):st(this.label,this.selectedOption,!0))):i("div",{class:`${a}-base-selection-placeholder ${a}-base-selection-overlay`,key:"placeholder"},i("div",{class:`${a}-base-selection-placeholder__inner`},this.placeholder)),d);return i("div",{ref:"selfRef",class:[`${a}-base-selection`,this.themeClass,e&&`${a}-base-selection--${e}-status`,{[`${a}-base-selection--active`]:this.active,[`${a}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${a}-base-selection--disabled`]:this.disabled,[`${a}-base-selection--multiple`]:this.multiple,[`${a}-base-selection--focus`]:this.focused}],style:this.cssVars,onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},y,s?i("div",{class:`${a}-base-selection__border`}):null,s?i("div",{class:`${a}-base-selection__state-border`}):null)}});function Ut(e){return e.type==="group"}function on(e){return e.type==="ignored"}function no(e,t){try{return!!(1+t.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch{return!1}}function qr(e,t){return{getIsGroup:Ut,getIgnored:on,getKey(n){return Ut(n)?n.name||n.key||"key-required":n[e]},getChildren(n){return n[t]}}}function Yr(e,t,o,n){if(!t)return e;function r(l){if(!Array.isArray(l))return[];const s=[];for(const a of l)if(Ut(a)){const u=r(a[n]);u.length&&s.push(Object.assign({},a,{[n]:u}))}else{if(on(a))continue;t(o,a)&&s.push(a)}return s}return r(e)}function Gr(e,t,o){const n=new Map;return e.forEach(r=>{Ut(r)?r[o].forEach(l=>{n.set(l[t],l)}):n.set(r[t],r)}),n}const Xr=m("input-group",`
 display: inline-flex;
 width: 100%;
 flex-wrap: nowrap;
 vertical-align: bottom;
`,[W(">",[m("input",[W("&:not(:last-child)",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),W("&:not(:first-child)",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 margin-left: -1px!important;
 `)]),m("button",[W("&:not(:last-child)",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[f("state-border, border",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)]),W("&:not(:first-child)",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[f("state-border, border",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])]),W("*",[W("&:not(:last-child)",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[W(">",[m("input",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),m("base-selection",[m("base-selection-label",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),m("base-selection-tags",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),f("box-shadow, border, state-border",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)])])]),W("&:not(:first-child)",`
 margin-left: -1px!important;
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[W(">",[m("input",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),m("base-selection",[m("base-selection-label",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),m("base-selection-tags",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),f("box-shadow, border, state-border",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])])])])])]),Zr={},Qr=Y({name:"InputGroup",props:Zr,setup(e){const{mergedClsPrefixRef:t}=Be(e);return Yn("-input-group",Xr,t),{mergedClsPrefix:t}},render(){const{mergedClsPrefix:e}=this;return i("div",{class:`${e}-input-group`},this.$slots)}});function Jr(e,t){switch(e[0]){case"hex":return t?"#000000FF":"#000000";case"rgb":return t?"rgba(0, 0, 0, 1)":"rgb(0, 0, 0)";case"hsl":return t?"hsla(0, 0%, 0%, 1)":"hsl(0, 0%, 0%)";case"hsv":return t?"hsva(0, 0%, 0%, 1)":"hsv(0, 0%, 0%)"}return"#000000"}function Ct(e){return e===null?null:/^ *#/.test(e)?"hex":e.includes("rgb")?"rgb":e.includes("hsl")?"hsl":e.includes("hsv")?"hsv":null}function el(e){return e=Math.round(e),e>=360?359:e<0?0:e}function tl(e){return e=Math.round(e*100)/100,e>1?1:e<0?0:e}const ol={rgb:{hex(e){return je(De(e))},hsl(e){const[t,o,n,r]=De(e);return We([...co(t,o,n),r])},hsv(e){const[t,o,n,r]=De(e);return tt([...so(t,o,n),r])}},hex:{rgb(e){return Ue(De(e))},hsl(e){const[t,o,n,r]=De(e);return We([...co(t,o,n),r])},hsv(e){const[t,o,n,r]=De(e);return tt([...so(t,o,n),r])}},hsl:{hex(e){const[t,o,n,r]=ct(e);return je([...uo(t,o,n),r])},rgb(e){const[t,o,n,r]=ct(e);return Ue([...uo(t,o,n),r])},hsv(e){const[t,o,n,r]=ct(e);return tt([...Qo(t,o,n),r])}},hsv:{hex(e){const[t,o,n,r]=ot(e);return je([...Ne(t,o,n),r])},rgb(e){const[t,o,n,r]=ot(e);return Ue([...Ne(t,o,n),r])},hsl(e){const[t,o,n,r]=ot(e);return We([...At(t,o,n),r])}}};function nn(e,t,o){return o=o||Ct(e),o?o===t?e:ol[o][t](e):null}const at="12px",nl=12,Xe="6px",rl=6,ll="linear-gradient(90deg,red,#ff0 16.66%,#0f0 33.33%,#0ff 50%,#00f 66.66%,#f0f 83.33%,red)",il=Y({name:"HueSlider",props:{clsPrefix:{type:String,required:!0},hue:{type:Number,required:!0},onUpdateHue:{type:Function,required:!0},onComplete:Function},setup(e){const t=O(null);function o(l){t.value&&(dt("mousemove",document,n),dt("mouseup",document,r),n(l))}function n(l){const{value:s}=t;if(!s)return;const{width:a,left:u}=s.getBoundingClientRect(),p=el((l.clientX-u-rl)/(a-nl)*360);e.onUpdateHue(p)}function r(){var l;ut("mousemove",document,n),ut("mouseup",document,r),(l=e.onComplete)===null||l===void 0||l.call(e)}return{railRef:t,handleMouseDown:o}},render(){const{clsPrefix:e}=this;return i("div",{class:`${e}-color-picker-slider`,style:{height:at,borderRadius:Xe}},i("div",{ref:"railRef",style:{boxShadow:"inset 0 0 2px 0 rgba(0, 0, 0, .24)",boxSizing:"border-box",backgroundImage:ll,height:at,borderRadius:Xe,position:"relative"},onMousedown:this.handleMouseDown},i("div",{style:{position:"absolute",left:Xe,right:Xe,top:0,bottom:0}},i("div",{class:`${e}-color-picker-handle`,style:{left:`calc((${this.hue}%) / 359 * 100 - ${Xe})`,borderRadius:Xe,width:at,height:at}},i("div",{class:`${e}-color-picker-handle__fill`,style:{backgroundColor:`hsl(${this.hue}, 100%, 50%)`,borderRadius:Xe,width:at,height:at}})))))}}),bt="12px",al=12,Ze="6px",sl=Y({name:"AlphaSlider",props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},alpha:{type:Number,default:0},onUpdateAlpha:{type:Function,required:!0},onComplete:Function},setup(e){const t=O(null);function o(l){!t.value||!e.rgba||(dt("mousemove",document,n),dt("mouseup",document,r),n(l))}function n(l){const{value:s}=t;if(!s)return;const{width:a,left:u}=s.getBoundingClientRect(),p=(l.clientX-u)/(a-al);e.onUpdateAlpha(tl(p))}function r(){var l;ut("mousemove",document,n),ut("mouseup",document,r),(l=e.onComplete)===null||l===void 0||l.call(e)}return{railRef:t,railBackgroundImage:P(()=>{const{rgba:l}=e;return l?`linear-gradient(to right, rgba(${l[0]}, ${l[1]}, ${l[2]}, 0) 0%, rgba(${l[0]}, ${l[1]}, ${l[2]}, 1) 100%)`:""}),handleMouseDown:o}},render(){const{clsPrefix:e}=this;return i("div",{class:`${e}-color-picker-slider`,ref:"railRef",style:{height:bt,borderRadius:Ze},onMousedown:this.handleMouseDown},i("div",{style:{borderRadius:Ze,position:"absolute",left:0,right:0,top:0,bottom:0,overflow:"hidden"}},i("div",{class:`${e}-color-picker-checkboard`}),i("div",{class:`${e}-color-picker-slider__image`,style:{backgroundImage:this.railBackgroundImage}})),this.rgba&&i("div",{style:{position:"absolute",left:Ze,right:Ze,top:0,bottom:0}},i("div",{class:`${e}-color-picker-handle`,style:{left:`calc(${this.alpha*100}% - ${Ze})`,borderRadius:Ze,width:bt,height:bt}},i("div",{class:`${e}-color-picker-handle__fill`,style:{backgroundColor:Ue(this.rgba),borderRadius:Ze,width:bt,height:bt}}))))}}),Ot="12px",Ft="6px",cl=Y({name:"Pallete",props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},displayedHue:{type:Number,required:!0},displayedSv:{type:Array,required:!0},onUpdateSV:{type:Function,required:!0},onComplete:Function},setup(e){const t=O(null);function o(l){t.value&&(dt("mousemove",document,n),dt("mouseup",document,r),n(l))}function n(l){const{value:s}=t;if(!s)return;const{width:a,height:u,left:p,bottom:C}=s.getBoundingClientRect(),g=(C-l.clientY)/u,S=(l.clientX-p)/a,w=100*(S>1?1:S<0?0:S),d=100*(g>1?1:g<0?0:g);e.onUpdateSV(w,d)}function r(){var l;ut("mousemove",document,n),ut("mouseup",document,r),(l=e.onComplete)===null||l===void 0||l.call(e)}return{palleteRef:t,handleColor:P(()=>{const{rgba:l}=e;return l?`rgb(${l[0]}, ${l[1]}, ${l[2]})`:""}),handleMouseDown:o}},render(){const{clsPrefix:e}=this;return i("div",{class:`${e}-color-picker-pallete`,onMousedown:this.handleMouseDown,ref:"palleteRef"},i("div",{class:`${e}-color-picker-pallete__layer`,style:{backgroundImage:`linear-gradient(90deg, white, hsl(${this.displayedHue}, 100%, 50%))`}}),i("div",{class:`${e}-color-picker-pallete__layer ${e}-color-picker-pallete__layer--shadowed`,style:{backgroundImage:"linear-gradient(180deg, rgba(0, 0, 0, 0%), rgba(0, 0, 0, 100%))"}}),this.rgba&&i("div",{class:`${e}-color-picker-handle`,style:{width:Ot,height:Ot,borderRadius:Ft,left:`calc(${this.displayedSv[0]}% - ${Ft})`,bottom:`calc(${this.displayedSv[1]}% - ${Ft})`}},i("div",{class:`${e}-color-picker-handle__fill`,style:{backgroundColor:this.handleColor,borderRadius:Ft,width:Ot,height:Ot}})))}}),Co=St("n-color-picker");function dl(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(parseInt(e),255)):!1}function ul(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(parseInt(e),360)):!1}function hl(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(parseInt(e),100)):!1}function fl(e){const t=e.trim();return/^#[0-9a-fA-F]+$/.test(t)?[4,5,7,9].includes(t.length):!1}function vl(e){return/^\d{1,3}\.?\d*%$/.test(e.trim())?Math.max(0,Math.min(parseInt(e)/100,100)):!1}const pl={paddingSmall:"0 4px"},Bo=Y({name:"ColorInputUnit",props:{label:{type:String,required:!0},value:{type:[Number,String],default:null},showAlpha:Boolean,onUpdateValue:{type:Function,required:!0}},setup(e){const t=O(""),{themeRef:o}=lt(Co,null);po(()=>{t.value=n()});function n(){const{value:s}=e;if(s===null)return"";const{label:a}=e;return a==="HEX"?s:a==="A"?`${Math.floor(s*100)}%`:String(Math.floor(s))}function r(s){t.value=s}function l(s){let a,u;switch(e.label){case"HEX":u=fl(s),u&&e.onUpdateValue(s),t.value=n();break;case"H":a=ul(s),a===!1?t.value=n():e.onUpdateValue(a);break;case"S":case"L":case"V":a=hl(s),a===!1?t.value=n():e.onUpdateValue(a);break;case"A":a=vl(s),a===!1?t.value=n():e.onUpdateValue(a);break;case"R":case"G":case"B":a=dl(s),a===!1?t.value=n():e.onUpdateValue(a);break}}return{mergedTheme:o,inputValue:t,handleInputChange:l,handleInputUpdateValue:r}},render(){const{mergedTheme:e}=this;return i(wo,{size:"small",placeholder:this.label,theme:e.peers.Input,themeOverrides:e.peerOverrides.Input,builtinThemeOverrides:pl,value:this.inputValue,onUpdateValue:this.handleInputUpdateValue,onChange:this.handleInputChange,style:this.label==="A"?"flex-grow: 1.25;":""})}}),gl=Y({name:"ColorInput",props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},modes:{type:Array,required:!0},showAlpha:{type:Boolean,required:!0},value:{type:String,default:null},valueArr:{type:Array,default:null},onUpdateValue:{type:Function,required:!0},onUpdateMode:{type:Function,required:!0}},setup(e){return{handleUnitUpdateValue(t,o){const{showAlpha:n}=e;if(e.mode==="hex"){e.onUpdateValue((n?je:wt)(o));return}let r;switch(e.valueArr===null?r=[0,0,0,0]:r=Array.from(e.valueArr),e.mode){case"hsv":r[t]=o,e.onUpdateValue((n?tt:io)(r));break;case"rgb":r[t]=o,e.onUpdateValue((n?Ue:lo)(r));break;case"hsl":r[t]=o,e.onUpdateValue((n?We:ro)(r));break}}}},render(){const{clsPrefix:e,modes:t}=this;return i("div",{class:`${e}-color-picker-input`},i("div",{class:`${e}-color-picker-input__mode`,onClick:this.onUpdateMode,style:{cursor:t.length===1?"":"pointer"}},this.mode.toUpperCase()+(this.showAlpha?"A":"")),i(Qr,null,{default:()=>{const{mode:o,valueArr:n,showAlpha:r}=this;if(o==="hex"){let l=null;try{l=n===null?null:(r?je:wt)(n)}catch{}return i(Bo,{label:"HEX",showAlpha:r,value:l,onUpdateValue:s=>{this.handleUnitUpdateValue(0,s)}})}return(o+(r?"a":"")).split("").map((l,s)=>i(Bo,{label:l.toUpperCase(),value:n===null?null:n[s],onUpdateValue:a=>{this.handleUnitUpdateValue(s,a)}}))}}))}}),bl=Y({name:"ColorPickerTrigger",props:{clsPrefix:{type:String,required:!0},value:{type:String,default:null},hsla:{type:Array,default:null},disabled:Boolean,onClick:Function},setup(e){const{colorPickerSlots:t,renderLabelRef:o}=lt(Co,null);return()=>{const{hsla:n,value:r,clsPrefix:l,onClick:s,disabled:a}=e,u=t.label||o.value;return i("div",{class:[`${l}-color-picker-trigger`,a&&`${l}-color-picker-trigger--disabled`],onClick:a?void 0:s},i("div",{class:`${l}-color-picker-trigger__fill`},i("div",{class:`${l}-color-picker-checkboard`}),i("div",{style:{position:"absolute",left:0,right:0,top:0,bottom:0,backgroundColor:n?We(n):""}}),r&&n?i("div",{class:`${l}-color-picker-trigger__value`,style:{color:n[2]>50||n[3]<.5?"black":"white"}},u?u(r):r):null))}}});function ml(e,t){if(t==="hsv"){const[o,n,r,l]=ot(e);return Ue([...Ne(o,n,r),l])}return e}function yl(e){const t=document.createElement("canvas").getContext("2d");return t.fillStyle=e,t.fillStyle}const wl=Y({name:"ColorPickerSwatches",props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},swatches:{type:Array,required:!0},onUpdateColor:{type:Function,required:!0}},setup(e){const t=P(()=>e.swatches.map(l=>{const s=Ct(l);return{value:l,mode:s,legalValue:ml(l,s)}}));function o(l){const{mode:s}=e;let{value:a,mode:u}=l;return u||(u="hex",/^[a-zA-Z]+$/.test(a)?a=yl(a):(Gn("color-picker",`color ${a} in swatches is invalid.`),a="#000000")),u===s?a:nn(a,s,u)}function n(l){e.onUpdateColor(o(l))}function r(l,s){l.key==="Enter"&&n(s)}return{parsedSwatchesRef:t,handleSwatchSelect:n,handleSwatchKeyDown:r}},render(){const{clsPrefix:e}=this;return i("div",{class:`${e}-color-picker-swatches`},this.parsedSwatchesRef.map(t=>i("div",{class:`${e}-color-picker-swatch`,tabindex:0,onClick:()=>{this.handleSwatchSelect(t)},onKeydown:o=>{this.handleSwatchKeyDown(o,t)}},i("div",{class:`${e}-color-picker-swatch__fill`,style:{background:t.legalValue}}))))}}),xl=Y({name:"ColorPreview",props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},color:{type:String,default:null,validator:e=>{const t=Ct(e);return!!(!e||t&&t!=="hsv")}},onUpdateColor:{type:Function,required:!0}},setup(e){function t(o){var n;const r=o.target.value;(n=e.onUpdateColor)===null||n===void 0||n.call(e,nn(r.toUpperCase(),e.mode,"hex")),o.stopPropagation()}return{handleChange:t}},render(){const{clsPrefix:e}=this;return i("div",{class:`${e}-color-picker-preview__preview`},i("span",{class:`${e}-color-picker-preview__fill`,style:{background:this.color||"#000000"}}),i("input",{class:`${e}-color-picker-preview__input`,type:"color",value:this.color,onChange:this.handleChange}))}}),Cl=W([m("color-picker",`
 display: inline-block;
 box-sizing: border-box;
 height: var(--n-height);
 font-size: var(--n-font-size);
 width: 100%;
 position: relative;
 `),m("color-picker-panel",`
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
 `,[fo(),m("input",`
 text-align: center;
 `)]),m("color-picker-checkboard",`
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
 `)]),m("color-picker-slider",`
 margin-bottom: 8px;
 position: relative;
 box-sizing: border-box;
 `,[f("image",`
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
 `)]),m("color-picker-handle",`
 z-index: 1;
 box-shadow: 0 0 2px 0 rgba(0, 0, 0, .45);
 position: absolute;
 background-color: white;
 overflow: hidden;
 `,[f("fill",`
 box-sizing: border-box;
 border: 2px solid white;
 `)]),m("color-picker-pallete",`
 height: 180px;
 position: relative;
 margin-bottom: 8px;
 cursor: crosshair;
 `,[f("layer",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[U("shadowed",`
 box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
 `)])]),m("color-picker-preview",`
 display: flex;
 `,[f("sliders",`
 flex: 1 0 auto;
 `),f("preview",`
 position: relative;
 height: 30px;
 width: 30px;
 margin: 0 0 8px 6px;
 border-radius: 50%;
 box-shadow: rgba(0, 0, 0, .15) 0px 0px 0px 1px inset;
 overflow: hidden;
 `),f("fill",`
 display: block;
 width: 30px;
 height: 30px;
 `),f("input",`
 position: absolute;
 top: 0;
 left: 0;
 width: 30px;
 height: 30px;
 opacity: 0;
 z-index: 1;
 `)]),m("color-picker-input",`
 display: flex;
 align-items: center;
 `,[m("input",`
 flex-grow: 1;
 flex-basis: 0;
 `),f("mode",`
 width: 72px;
 text-align: center;
 `)]),m("color-picker-control",`
 padding: 12px;
 `),m("color-picker-action",`
 display: flex;
 margin-top: -4px;
 border-top: 1px solid var(--n-divider-color);
 padding: 8px 12px;
 justify-content: flex-end;
 `,[m("button","margin-left: 8px;")]),m("color-picker-trigger",`
 border: var(--n-border);
 height: 100%;
 box-sizing: border-box;
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 cursor: pointer;
 `,[f("value",`
 white-space: nowrap;
 position: relative;
 `),f("fill",`
 border-radius: var(--n-border-radius);
 position: absolute;
 display: flex;
 align-items: center;
 justify-content: center;
 left: 4px;
 right: 4px;
 top: 4px;
 bottom: 4px;
 `),U("disabled","cursor: not-allowed"),m("color-picker-checkboard",`
 border-radius: var(--n-border-radius);
 `,[W("&::after",`
 --n-block-size: calc((var(--n-height) - 8px) / 3);
 background-size: calc(var(--n-block-size) * 2) calc(var(--n-block-size) * 2);
 background-position: 0 0, 0 var(--n-block-size), var(--n-block-size) calc(-1 * var(--n-block-size)), calc(-1 * var(--n-block-size)) 0px; 
 `)])]),m("color-picker-swatches",`
 display: grid;
 grid-gap: 8px;
 flex-wrap: wrap;
 position: relative;
 grid-template-columns: repeat(auto-fill, 18px);
 margin-top: 10px;
 `,[m("color-picker-swatch",`
 width: 18px;
 height: 18px;
 background-image: linear-gradient(45deg, #DDD 25%, #0000 25%), linear-gradient(-45deg, #DDD 25%, #0000 25%), linear-gradient(45deg, #0000 75%, #DDD 75%), linear-gradient(-45deg, #0000 75%, #DDD 75%);
 background-size: 8px 8px;
 background-position: 0px 0, 0px 4px, 4px -4px, -4px 0px;
 background-repeat: repeat;
 `,[f("fill",`
 position: relative;
 width: 100%;
 height: 100%;
 border-radius: 3px;
 box-shadow: rgba(0, 0, 0, .15) 0px 0px 0px 1px inset;
 cursor: pointer;
 `),W("&:focus",`
 outline: none;
 `,[f("fill",[W("&::after",`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 background: inherit;
 filter: blur(2px);
 content: "";
 `)])])])])]),kl=Object.assign(Object.assign({},fe.props),{value:String,show:{type:Boolean,default:void 0},defaultShow:Boolean,defaultValue:String,modes:{type:Array,default:()=>["rgb","hex","hsl"]},placement:{type:String,default:"bottom-start"},to:ht.propTo,showAlpha:{type:Boolean,default:!0},showPreview:Boolean,swatches:Array,disabled:{type:Boolean,default:void 0},actions:{type:Array,default:null},internalActions:Array,size:String,renderLabel:Function,onComplete:Function,onConfirm:Function,"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]}),Sl=Y({name:"ColorPicker",props:kl,setup(e,{slots:t}){const o=O(null);let n=null;const r=jt(e),{mergedSizeRef:l,mergedDisabledRef:s}=r,{localeRef:a}=Yt("global"),{mergedClsPrefixRef:u,namespaceRef:p,inlineThemeDisabled:C}=Be(e),g=fe("ColorPicker","-color-picker",Cl,Xn,e,u);nt(Co,{themeRef:g,renderLabelRef:ue(e,"renderLabel"),colorPickerSlots:t});const S=O(e.defaultShow),w=rt(ue(e,"show"),S);function d(x){const{onUpdateShow:Q,"onUpdate:show":ee}=e;Q&&de(Q,x),ee&&de(ee,x),S.value=x}const{defaultValue:y}=e,B=O(y===void 0?Jr(e.modes,e.showAlpha):y),k=rt(ue(e,"value"),B),M=O([k.value]),D=O(0),H=P(()=>Ct(k.value)),{modes:E}=e,z=O(Ct(k.value)||E[0]||"rgb");function A(){const{modes:x}=e,{value:Q}=z,ee=x.findIndex(h=>h===Q);~ee?z.value=x[(ee+1)%x.length]:z.value="rgb"}let T,F,N,v,_,V,X,G;const J=P(()=>{const{value:x}=k;if(!x)return null;switch(H.value){case"hsv":return ot(x);case"hsl":return[T,F,N,G]=ct(x),[...Qo(T,F,N),G];case"rgb":case"hex":return[_,V,X,G]=De(x),[...so(_,V,X),G]}}),K=P(()=>{const{value:x}=k;if(!x)return null;switch(H.value){case"rgb":case"hex":return De(x);case"hsv":return[T,F,v,G]=ot(x),[...Ne(T,F,v),G];case"hsl":return[T,F,N,G]=ct(x),[...uo(T,F,N),G]}}),Z=P(()=>{const{value:x}=k;if(!x)return null;switch(H.value){case"hsl":return ct(x);case"hsv":return[T,F,v,G]=ot(x),[...At(T,F,v),G];case"rgb":case"hex":return[_,V,X,G]=De(x),[...co(_,V,X),G]}}),b=P(()=>{switch(z.value){case"rgb":case"hex":return K.value;case"hsv":return J.value;case"hsl":return Z.value}}),$=O(0),j=O(1),se=O([0,0]);function xe(x,Q){const{value:ee}=J,h=$.value,R=ee?ee[3]:1;se.value=[x,Q];const{showAlpha:L}=e;switch(z.value){case"hsv":ie((L?tt:io)([h,x,Q,R]),"cursor");break;case"hsl":ie((L?We:ro)([...At(h,x,Q),R]),"cursor");break;case"rgb":ie((L?Ue:lo)([...Ne(h,x,Q),R]),"cursor");break;case"hex":ie((L?je:wt)([...Ne(h,x,Q),R]),"cursor");break}}function Te(x){$.value=x;const{value:Q}=J;if(!Q)return;const[,ee,h,R]=Q,{showAlpha:L}=e;switch(z.value){case"hsv":ie((L?tt:io)([x,ee,h,R]),"cursor");break;case"rgb":ie((L?Ue:lo)([...Ne(x,ee,h),R]),"cursor");break;case"hex":ie((L?je:wt)([...Ne(x,ee,h),R]),"cursor");break;case"hsl":ie((L?We:ro)([...At(x,ee,h),R]),"cursor");break}}function $e(x){switch(z.value){case"hsv":[T,F,v]=J.value,ie(tt([T,F,v,x]),"cursor");break;case"rgb":[_,V,X]=K.value,ie(Ue([_,V,X,x]),"cursor");break;case"hex":[_,V,X]=K.value,ie(je([_,V,X,x]),"cursor");break;case"hsl":[T,F,N]=Z.value,ie(We([T,F,N,x]),"cursor");break}j.value=x}function ie(x,Q){Q==="cursor"?n=x:n=null;const{nTriggerFormChange:ee,nTriggerFormInput:h}=r,{onUpdateValue:R,"onUpdate:value":L}=e;R&&de(R,x),L&&de(L,x),ee(),h(),B.value=x}function Ce(x){ie(x,"input"),kt(he)}function he(x=!0){const{value:Q}=k;if(Q){const{nTriggerFormChange:ee,nTriggerFormInput:h}=r,{onComplete:R}=e;R&&R(Q);const{value:L}=M,{value:pe}=D;x&&(L.splice(pe+1,L.length,Q),D.value=pe+1),ee(),h()}}function me(){const{value:x}=D;x-1<0||(ie(M.value[x-1],"input"),he(!1),D.value=x-1)}function Pe(){const{value:x}=D;x<0||x+1>=M.value.length||(ie(M.value[x+1],"input"),he(!1),D.value=x+1)}function _e(){ie(null,"input"),d(!1)}function qe(){const{value:x}=k,{onConfirm:Q}=e;Q&&Q(x),d(!1)}const Ae=P(()=>D.value>=1),Ve=P(()=>{const{value:x}=M;return x.length>1&&D.value<x.length-1});et(w,x=>{x||(M.value=[k.value],D.value=0)}),po(()=>{if(!(n&&n===k.value)){const{value:x}=J;x&&($.value=x[0],j.value=x[3],se.value=[x[1],x[2]])}n=null});const Ee=P(()=>{const{value:x}=l,{common:{cubicBezierEaseInOut:Q},self:{textColor:ee,color:h,panelFontSize:R,boxShadow:L,border:pe,borderRadius:ve,dividerColor:ze,[ae("height",x)]:vt,[ae("fontSize",x)]:pt}}=g.value;return{"--n-bezier":Q,"--n-text-color":ee,"--n-color":h,"--n-panel-font-size":R,"--n-font-size":pt,"--n-box-shadow":L,"--n-border":pe,"--n-border-radius":ve,"--n-height":vt,"--n-divider-color":ze}}),ke=C?Ie("color-picker",P(()=>l.value[0]),Ee,e):void 0;function Ye(){var x;const{value:Q}=K,{value:ee}=$,{internalActions:h,modes:R,actions:L}=e,{value:pe}=g,{value:ve}=u;return i("div",{class:[`${ve}-color-picker-panel`,ke==null?void 0:ke.themeClass.value],onDragstart:ze=>{ze.preventDefault()},style:C?void 0:Ee.value},i("div",{class:`${ve}-color-picker-control`},i(cl,{clsPrefix:ve,rgba:Q,displayedHue:ee,displayedSv:se.value,onUpdateSV:xe,onComplete:he}),i("div",{class:`${ve}-color-picker-preview`},i("div",{class:`${ve}-color-picker-preview__sliders`},i(il,{clsPrefix:ve,hue:ee,onUpdateHue:Te,onComplete:he}),e.showAlpha?i(sl,{clsPrefix:ve,rgba:Q,alpha:j.value,onUpdateAlpha:$e,onComplete:he}):null),e.showPreview?i(xl,{clsPrefix:ve,mode:z.value,color:K.value&&wt(K.value),onUpdateColor:ze=>{ie(ze,"input")}}):null),i(gl,{clsPrefix:ve,showAlpha:e.showAlpha,mode:z.value,modes:R,onUpdateMode:A,value:k.value,valueArr:b.value,onUpdateValue:Ce}),((x=e.swatches)===null||x===void 0?void 0:x.length)&&i(wl,{clsPrefix:ve,mode:z.value,swatches:e.swatches,onUpdateColor:ze=>{ie(ze,"input")}})),L!=null&&L.length?i("div",{class:`${ve}-color-picker-action`},L.includes("confirm")&&i(yt,{size:"small",onClick:qe,theme:pe.peers.Button,themeOverrides:pe.peerOverrides.Button},{default:()=>a.value.confirm}),L.includes("clear")&&i(yt,{size:"small",onClick:_e,disabled:!k.value,theme:pe.peers.Button,themeOverrides:pe.peerOverrides.Button},{default:()=>a.value.clear})):null,t.action?i("div",{class:`${ve}-color-picker-action`},{default:t.action}):h?i("div",{class:`${ve}-color-picker-action`},h.includes("undo")&&i(yt,{size:"small",onClick:me,disabled:!Ae.value,theme:pe.peers.Button,themeOverrides:pe.peerOverrides.Button},{default:()=>a.value.undo}),h.includes("redo")&&i(yt,{size:"small",onClick:Pe,disabled:!Ve.value,theme:pe.peers.Button,themeOverrides:pe.peerOverrides.Button},{default:()=>a.value.redo})):null)}return{mergedClsPrefix:u,namespace:p,selfRef:o,hsla:Z,rgba:K,mergedShow:w,mergedDisabled:s,isMounted:Uo(),adjustedTo:ht(e),mergedValue:k,handleTriggerClick(){d(!0)},handleClickOutside(x){var Q;!((Q=o.value)===null||Q===void 0)&&Q.contains(Ho(x))||d(!1)},renderPanel:Ye,cssVars:C?void 0:Ee,themeClass:ke==null?void 0:ke.themeClass,onRender:ke==null?void 0:ke.onRender}},render(){const{$slots:e,mergedClsPrefix:t,onRender:o}=this;return o==null||o(),i("div",{class:[this.themeClass,`${t}-color-picker`],ref:"selfRef",style:this.cssVars},i(Go,null,{default:()=>[i(Xo,null,{default:()=>i(bl,{clsPrefix:t,value:this.mergedValue,hsla:this.hsla,disabled:this.mergedDisabled,onClick:this.handleTriggerClick},{label:e.label})}),i(Zo,{placement:this.placement,show:this.mergedShow,containerClass:this.namespace,teleportDisabled:this.adjustedTo===ht.tdkey,to:this.adjustedTo},{default:()=>i(ho,{name:"fade-in-scale-up-transition",appear:this.isMounted},{default:()=>this.mergedShow?Wt(this.renderPanel(),[[ao,this.handleClickOutside,void 0,{capture:!0}]]):null})})]}))}}),_l=W([m("select",`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 `),m("select-menu",`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[fo({originalTransition:"background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)"})])]),Rl=Object.assign(Object.assign({},fe.props),{to:ht.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},keyboard:{type:Boolean,default:!0},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:Function,placement:{type:String,default:"bottom-start"},widthMode:{type:String,default:"trigger"},tag:Boolean,onCreate:Function,fallbackOption:{type:[Function,Boolean],default:void 0},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},childrenField:{type:String,default:"children"},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,nodeProps:Function,ignoreComposition:{type:Boolean,default:!0},showOnFocus:Boolean,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:"show"},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,showCheckmark:{type:Boolean,default:!0},onChange:[Function,Array],items:Array}),Tl=Y({name:"Select",props:Rl,setup(e){const{mergedClsPrefixRef:t,mergedBorderedRef:o,namespaceRef:n,inlineThemeDisabled:r}=Be(e),l=fe("Select","-select",_l,Zn,e,t),s=O(e.defaultValue),a=ue(e,"value"),u=rt(a,s),p=O(!1),C=O(""),g=P(()=>{const{valueField:c,childrenField:I}=e,q=qr(c,I);return yr(_.value,q)}),S=P(()=>Gr(N.value,e.valueField,e.childrenField)),w=O(!1),d=rt(ue(e,"show"),w),y=O(null),B=O(null),k=O(null),{localeRef:M}=Yt("Select"),D=P(()=>{var c;return(c=e.placeholder)!==null&&c!==void 0?c:M.value.placeholder}),H=xr(e,["items","options"]),E=[],z=O([]),A=O([]),T=O(new Map),F=P(()=>{const{fallbackOption:c}=e;if(c===void 0){const{labelField:I,valueField:q}=e;return le=>({[I]:String(le),[q]:le})}return c===!1?!1:I=>Object.assign(c(I),{value:I})}),N=P(()=>A.value.concat(z.value).concat(H.value)),v=P(()=>{const{filter:c}=e;if(c)return c;const{labelField:I,valueField:q}=e;return(le,oe)=>{if(!oe)return!1;const re=oe[I];if(typeof re=="string")return no(le,re);const ne=oe[q];return typeof ne=="string"?no(le,ne):typeof ne=="number"?no(le,String(ne)):!1}}),_=P(()=>{if(e.remote)return H.value;{const{value:c}=N,{value:I}=C;return!I.length||!e.filterable?c:Yr(c,v.value,I,e.childrenField)}});function V(c){const I=e.remote,{value:q}=T,{value:le}=S,{value:oe}=F,re=[];return c.forEach(ne=>{if(le.has(ne))re.push(le.get(ne));else if(I&&q.has(ne))re.push(q.get(ne));else if(oe){const ge=oe(ne);ge&&re.push(ge)}}),re}const X=P(()=>{if(e.multiple){const{value:c}=u;return Array.isArray(c)?V(c):[]}return null}),G=P(()=>{const{value:c}=u;return!e.multiple&&!Array.isArray(c)?c===null?null:V([c])[0]||null:null}),J=jt(e),{mergedSizeRef:K,mergedDisabledRef:Z,mergedStatusRef:b}=J;function $(c,I){const{onChange:q,"onUpdate:value":le,onUpdateValue:oe}=e,{nTriggerFormChange:re,nTriggerFormInput:ne}=J;q&&de(q,c,I),oe&&de(oe,c,I),le&&de(le,c,I),s.value=c,re(),ne()}function j(c){const{onBlur:I}=e,{nTriggerFormBlur:q}=J;I&&de(I,c),q()}function se(){const{onClear:c}=e;c&&de(c)}function xe(c){const{onFocus:I,showOnFocus:q}=e,{nTriggerFormFocus:le}=J;I&&de(I,c),le(),q&&he()}function Te(c){const{onSearch:I}=e;I&&de(I,c)}function $e(c){const{onScroll:I}=e;I&&de(I,c)}function ie(){var c;const{remote:I,multiple:q}=e;if(I){const{value:le}=T;if(q){const{valueField:oe}=e;(c=X.value)===null||c===void 0||c.forEach(re=>{le.set(re[oe],re)})}else{const oe=G.value;oe&&le.set(oe[e.valueField],oe)}}}function Ce(c){const{onUpdateShow:I,"onUpdate:show":q}=e;I&&de(I,c),q&&de(q,c),w.value=c}function he(){Z.value||(Ce(!0),w.value=!0,e.filterable&&$t())}function me(){Ce(!1)}function Pe(){C.value="",A.value=E}const _e=O(!1);function qe(){e.filterable&&(_e.value=!0)}function Ae(){e.filterable&&(_e.value=!1,d.value||Pe())}function Ve(){Z.value||(d.value?e.filterable?$t():me():he())}function Ee(c){var I,q;!((q=(I=k.value)===null||I===void 0?void 0:I.selfRef)===null||q===void 0)&&q.contains(c.relatedTarget)||(p.value=!1,j(c),me())}function ke(c){xe(c),p.value=!0}function Ye(c){p.value=!0}function x(c){var I;!((I=y.value)===null||I===void 0)&&I.$el.contains(c.relatedTarget)||(p.value=!1,j(c),me())}function Q(){var c;(c=y.value)===null||c===void 0||c.focus(),me()}function ee(c){var I;d.value&&(!((I=y.value)===null||I===void 0)&&I.$el.contains(Ho(c))||me())}function h(c){if(!Array.isArray(c))return[];if(F.value)return Array.from(c);{const{remote:I}=e,{value:q}=S;if(I){const{value:le}=T;return c.filter(oe=>q.has(oe)||le.has(oe))}else return c.filter(le=>q.has(le))}}function R(c){L(c.rawNode)}function L(c){if(Z.value)return;const{tag:I,remote:q,clearFilterAfterSelect:le,valueField:oe}=e;if(I&&!q){const{value:re}=A,ne=re[0]||null;if(ne){const ge=z.value;ge.length?ge.push(ne):z.value=[ne],A.value=E}}if(q&&T.value.set(c[oe],c),e.multiple){const re=h(u.value),ne=re.findIndex(ge=>ge===c[oe]);if(~ne){if(re.splice(ne,1),I&&!q){const ge=pe(c[oe]);~ge&&(z.value.splice(ge,1),le&&(C.value=""))}}else re.push(c[oe]),le&&(C.value="");$(re,V(re))}else{if(I&&!q){const re=pe(c[oe]);~re?z.value=[z.value[re]]:z.value=E}Tt(),me(),$(c[oe],c)}}function pe(c){return z.value.findIndex(q=>q[e.valueField]===c)}function ve(c){d.value||he();const{value:I}=c.target;C.value=I;const{tag:q,remote:le}=e;if(Te(I),q&&!le){if(!I){A.value=E;return}const{onCreate:oe}=e,re=oe?oe(I):{[e.labelField]:I,[e.valueField]:I},{valueField:ne}=e;H.value.some(ge=>ge[ne]===re[ne])||z.value.some(ge=>ge[ne]===re[ne])?A.value=E:A.value=[re]}}function ze(c){c.stopPropagation();const{multiple:I}=e;!I&&e.filterable&&me(),se(),I?$([],[]):$(null,null)}function vt(c){!Lt(c,"action")&&!Lt(c,"empty")&&c.preventDefault()}function pt(c){$e(c)}function Rt(c){var I,q,le,oe,re;if(!e.keyboard){c.preventDefault();return}switch(c.key){case" ":if(e.filterable)break;c.preventDefault();case"Enter":if(!(!((I=y.value)===null||I===void 0)&&I.isComposing)){if(d.value){const ne=(q=k.value)===null||q===void 0?void 0:q.getPendingTmNode();ne?R(ne):e.filterable||(me(),Tt())}else if(he(),e.tag&&_e.value){const ne=A.value[0];if(ne){const ge=ne[e.valueField],{value:It}=u;e.multiple&&Array.isArray(It)&&It.some(Zt=>Zt===ge)||L(ne)}}}c.preventDefault();break;case"ArrowUp":if(c.preventDefault(),e.loading)return;d.value&&((le=k.value)===null||le===void 0||le.prev());break;case"ArrowDown":if(c.preventDefault(),e.loading)return;d.value?(oe=k.value)===null||oe===void 0||oe.next():he();break;case"Escape":d.value&&(Qn(c),me()),(re=y.value)===null||re===void 0||re.focus();break}}function Tt(){var c;(c=y.value)===null||c===void 0||c.focus()}function $t(){var c;(c=y.value)===null||c===void 0||c.focusInput()}function Gt(){var c;d.value&&((c=B.value)===null||c===void 0||c.syncPosition())}ie(),et(ue(e,"options"),ie);const Xt={focus:()=>{var c;(c=y.value)===null||c===void 0||c.focus()},blur:()=>{var c;(c=y.value)===null||c===void 0||c.blur()}},zt=P(()=>{const{self:{menuBoxShadow:c}}=l.value;return{"--n-menu-box-shadow":c}}),He=r?Ie("select",void 0,zt,e):void 0;return Object.assign(Object.assign({},Xt),{mergedStatus:b,mergedClsPrefix:t,mergedBordered:o,namespace:n,treeMate:g,isMounted:Uo(),triggerRef:y,menuRef:k,pattern:C,uncontrolledShow:w,mergedShow:d,adjustedTo:ht(e),uncontrolledValue:s,mergedValue:u,followerRef:B,localizedPlaceholder:D,selectedOption:G,selectedOptions:X,mergedSize:K,mergedDisabled:Z,focused:p,activeWithoutMenuOpen:_e,inlineThemeDisabled:r,onTriggerInputFocus:qe,onTriggerInputBlur:Ae,handleTriggerOrMenuResize:Gt,handleMenuFocus:Ye,handleMenuBlur:x,handleMenuTabOut:Q,handleTriggerClick:Ve,handleToggle:R,handleDeleteOption:L,handlePatternInput:ve,handleClear:ze,handleTriggerBlur:Ee,handleTriggerFocus:ke,handleKeydown:Rt,handleMenuAfterLeave:Pe,handleMenuClickOutside:ee,handleMenuScroll:pt,handleMenuKeydown:Rt,handleMenuMousedown:vt,mergedTheme:l,cssVars:r?void 0:zt,themeClass:He==null?void 0:He.themeClass,onRender:He==null?void 0:He.onRender})},render(){return i("div",{class:`${this.mergedClsPrefix}-select`},i(Go,null,{default:()=>[i(Xo,null,{default:()=>i(Kr,{ref:"triggerRef",inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,labelField:this.labelField,valueField:this.valueField,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus,onResize:this.handleTriggerOrMenuResize,ignoreComposition:this.ignoreComposition},{arrow:()=>{var e,t;return[(t=(e=this.$slots).arrow)===null||t===void 0?void 0:t.call(e)]}})}),i(Zo,{ref:"followerRef",show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===ht.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?"target":void 0,minWidth:"target",placement:this.placement},{default:()=>i(ho,{name:"fade-in-scale-up-transition",appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{default:()=>{var e,t,o;return this.mergedShow||this.displayDirective==="show"?((e=this.onRender)===null||e===void 0||e.call(this),Wt(i(Dr,Object.assign({},this.menuProps,{ref:"menuRef",onResize:this.handleTriggerOrMenuResize,inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,(t=this.menuProps)===null||t===void 0?void 0:t.class],clsPrefix:this.mergedClsPrefix,focusable:!0,labelField:this.labelField,valueField:this.valueField,autoPending:!0,nodeProps:this.nodeProps,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:"medium",renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[(o=this.menuProps)===null||o===void 0?void 0:o.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,showCheckmark:this.showCheckmark,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange}),{empty:()=>{var n,r;return[(r=(n=this.$slots).empty)===null||r===void 0?void 0:r.call(n)]},action:()=>{var n,r;return[(r=(n=this.$slots).action)===null||r===void 0?void 0:r.call(n)]}}),this.displayDirective==="show"?[[go,this.mergedShow],[ao,this.handleMenuClickOutside,void 0,{capture:!0}]]:[[ao,this.handleMenuClickOutside,void 0,{capture:!0}]])):null}})})]}))}}),$l=No({name:"DynamicTags",common:Nt,peers:{Input:Jn,Button:er,Tag:en,Space:Cr},self(){return{inputWidth:"64px"}}}),zl=$l,Il=m("dynamic-tags",[m("input",{minWidth:"var(--n-input-width)"})]),Pl=Object.assign(Object.assign(Object.assign({},fe.props),tn),{size:{type:String,default:"medium"},closable:{type:Boolean,default:!0},defaultValue:{type:Array,default:()=>[]},value:Array,inputStyle:[String,Object],inputProps:Object,max:Number,tagStyle:[String,Object],renderTag:Function,onCreate:{type:Function,default:e=>e},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onChange:[Function,Array]}),Ol=Y({name:"DynamicTags",props:Pl,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:o}=Be(e),{localeRef:n}=Yt("DynamicTags"),r=jt(e),{mergedDisabledRef:l}=r,s=O(""),a=O(!1),u=O(!0),p=O(null),C=fe("DynamicTags","-dynamic-tags",Il,zl,e,t),g=O(e.defaultValue),S=ue(e,"value"),w=rt(S,g),d=P(()=>n.value.add),y=P(()=>kr(e.size)),B=P(()=>l.value||!!e.max&&w.value.length>=e.max);function k(F){const{onChange:N,"onUpdate:value":v,onUpdateValue:_}=e,{nTriggerFormInput:V,nTriggerFormChange:X}=r;N&&de(N,F),_&&de(_,F),v&&de(v,F),g.value=F,V(),X()}function M(F){const N=w.value.slice(0);N.splice(F,1),k(N)}function D(F){switch(F.key){case"Enter":H()}}function H(F){const N=F??s.value;if(N){const v=w.value.slice(0);v.push(e.onCreate(N)),k(v)}a.value=!1,u.value=!0,s.value=""}function E(){H()}function z(){a.value=!0,kt(()=>{var F;(F=p.value)===null||F===void 0||F.focus(),u.value=!1})}const A=P(()=>{const{self:{inputWidth:F}}=C.value;return{"--n-input-width":F}}),T=o?Ie("dynamic-tags",void 0,A,e):void 0;return{mergedClsPrefix:t,inputInstRef:p,localizedAdd:d,inputSize:y,inputValue:s,showInput:a,inputForceFocused:u,mergedValue:w,mergedDisabled:l,triggerDisabled:B,handleInputKeyUp:D,handleAddClick:z,handleInputBlur:E,handleCloseClick:M,handleInputConfirm:H,mergedTheme:C,cssVars:o?void 0:A,themeClass:T==null?void 0:T.themeClass,onRender:T==null?void 0:T.onRender}},render(){const{mergedTheme:e,cssVars:t,mergedClsPrefix:o,onRender:n,renderTag:r}=this;return n==null||n(),i(xo,{class:[`${o}-dynamic-tags`,this.themeClass],size:"small",style:t,theme:e.peers.Space,themeOverrides:e.peerOverrides.Space,itemStyle:"display: flex;"},{default:()=>{const{mergedTheme:l,tagStyle:s,type:a,round:u,size:p,color:C,closable:g,mergedDisabled:S,showInput:w,inputValue:d,inputStyle:y,inputSize:B,inputForceFocused:k,triggerDisabled:M,handleInputKeyUp:D,handleInputBlur:H,handleAddClick:E,handleCloseClick:z,handleInputConfirm:A,$slots:T}=this;return this.mergedValue.map((F,N)=>r?r(F,N):i(Vt,{key:N,theme:l.peers.Tag,themeOverrides:l.peerOverrides.Tag,style:s,type:a,round:u,size:p,color:C,closable:g,disabled:S,onClose:()=>{z(N)}},{default:()=>typeof F=="string"?F:F.label})).concat(w?T.input?T.input({submit:A,deactivate:H}):i(wo,Object.assign({placeholder:"",size:B,style:y,autosize:!0},this.inputProps,{ref:"inputInstRef",value:d,onUpdateValue:F=>{this.inputValue=F},theme:l.peers.Input,themeOverrides:l.peerOverrides.Input,onKeyup:D,onBlur:H,internalForceFocus:k})):T.trigger?T.trigger({activate:E,disabled:M}):i(yt,{dashed:!0,disabled:M,theme:l.peers.Button,themeOverrides:l.peerOverrides.Button,size:B,onClick:E},{icon:()=>i(Ht,{clsPrefix:o},{default:()=>i(Ir,null)})}))}})}}),Fl=e=>{const{baseColor:t,textColor2:o,bodyColor:n,cardColor:r,dividerColor:l,actionColor:s,scrollbarColor:a,scrollbarColorHover:u,invertedColor:p}=e;return{textColor:o,textColorInverted:"#FFF",color:n,colorEmbedded:s,headerColor:r,headerColorInverted:p,footerColor:s,footerColorInverted:p,headerBorderColor:l,headerBorderColorInverted:p,footerBorderColor:l,footerBorderColorInverted:p,siderBorderColor:l,siderBorderColorInverted:p,siderColor:r,siderColorInverted:p,siderToggleButtonBorder:`1px solid ${l}`,siderToggleButtonColor:t,siderToggleButtonIconColor:o,siderToggleButtonIconColorInverted:o,siderToggleBarColor:Ro(n,a),siderToggleBarColorHover:Ro(n,u),__invertScrollbar:"true"}},Ml=No({name:"Layout",common:Nt,peers:{Scrollbar:tr},self:Fl}),rn=Ml,Bl=e=>{const{primaryColor:t,opacityDisabled:o,borderRadius:n,textColor3:r}=e,l="rgba(0, 0, 0, .14)";return Object.assign(Object.assign({},or),{iconColor:r,textColor:"white",loadingColor:t,opacityDisabled:o,railColor:l,railColorActive:t,buttonBoxShadow:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",buttonColor:"#FFF",railBorderRadiusSmall:n,railBorderRadiusMedium:n,railBorderRadiusLarge:n,buttonBorderRadiusSmall:n,buttonBorderRadiusMedium:n,buttonBorderRadiusLarge:n,boxShadowFocus:`0 0 0 2px ${ce(t,{alpha:.2})}`})},Al={name:"Switch",common:Nt,self:Bl},Vl=Al,El=St("n-layout-sider"),ln={type:String,default:"static"},Dl=m("layout",`
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
`,[m("layout-scroll-container",`
 overflow-x: hidden;
 box-sizing: border-box;
 height: 100%;
 `),U("absolute-positioned",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),Ll={embedded:Boolean,position:ln,nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,onScroll:Function,contentStyle:{type:[String,Object],default:""},hasSider:Boolean,siderPlacement:{type:String,default:"left"}},an=St("n-layout");function sn(e){return Y({name:e?"LayoutContent":"Layout",props:Object.assign(Object.assign({},fe.props),Ll),setup(t){const o=O(null),n=O(null),{mergedClsPrefixRef:r,inlineThemeDisabled:l}=Be(t),s=fe("Layout","-layout",Dl,rn,t,r);function a(y,B){if(t.nativeScrollbar){const{value:k}=o;k&&(B===void 0?k.scrollTo(y):k.scrollTo(y,B))}else{const{value:k}=n;k&&k.scrollTo(y,B)}}nt(an,t);let u=0,p=0;const C=y=>{var B;const k=y.target;u=k.scrollLeft,p=k.scrollTop,(B=t.onScroll)===null||B===void 0||B.call(t,y)};jo(()=>{if(t.nativeScrollbar){const y=o.value;y&&(y.scrollTop=p,y.scrollLeft=u)}});const g={display:"flex",flexWrap:"nowrap",width:"100%",flexDirection:"row"},S={scrollTo:a},w=P(()=>{const{common:{cubicBezierEaseInOut:y},self:B}=s.value;return{"--n-bezier":y,"--n-color":t.embedded?B.colorEmbedded:B.color,"--n-text-color":B.textColor}}),d=l?Ie("layout",P(()=>t.embedded?"e":""),w,t):void 0;return Object.assign({mergedClsPrefix:r,scrollableElRef:o,scrollbarInstRef:n,hasSiderStyle:g,mergedTheme:s,handleNativeElScroll:C,cssVars:l?void 0:w,themeClass:d==null?void 0:d.themeClass,onRender:d==null?void 0:d.onRender},S)},render(){var t;const{mergedClsPrefix:o,hasSider:n}=this;(t=this.onRender)===null||t===void 0||t.call(this);const r=n?this.hasSiderStyle:void 0,l=[this.themeClass,e&&`${o}-layout-content`,`${o}-layout`,`${o}-layout--${this.position}-positioned`];return i("div",{class:l,style:this.cssVars},this.nativeScrollbar?i("div",{ref:"scrollableElRef",class:`${o}-layout-scroll-container`,style:[this.contentStyle,r],onScroll:this.handleNativeElScroll},this.$slots):i(vo,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentStyle:[this.contentStyle,r]}),this.$slots))}})}const Ul=sn(!1),Hl=sn(!0),Nl=m("layout-sider",`
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
`,[U("bordered",[f("border",`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 1px;
 background-color: var(--n-border-color);
 transition: background-color .3s var(--n-bezier);
 `)]),f("left-placement",[U("bordered",[f("border",`
 right: 0;
 `)])]),U("right-placement",`
 justify-content: flex-start;
 `,[U("bordered",[f("border",`
 left: 0;
 `)]),U("collapsed",[m("layout-toggle-button",[m("base-icon",`
 transform: rotate(180deg);
 `)]),m("layout-toggle-bar",[W("&:hover",[f("top",{transform:"rotate(-12deg) scale(1.15) translateY(-2px)"}),f("bottom",{transform:"rotate(12deg) scale(1.15) translateY(2px)"})])])]),m("layout-toggle-button",`
 left: 0;
 transform: translateX(-50%) translateY(-50%);
 `,[m("base-icon",`
 transform: rotate(0);
 `)]),m("layout-toggle-bar",`
 left: -28px;
 transform: rotate(180deg);
 `,[W("&:hover",[f("top",{transform:"rotate(12deg) scale(1.15) translateY(-2px)"}),f("bottom",{transform:"rotate(-12deg) scale(1.15) translateY(2px)"})])])]),U("collapsed",[m("layout-toggle-bar",[W("&:hover",[f("top",{transform:"rotate(-12deg) scale(1.15) translateY(-2px)"}),f("bottom",{transform:"rotate(12deg) scale(1.15) translateY(2px)"})])]),m("layout-toggle-button",[m("base-icon",`
 transform: rotate(0);
 `)])]),m("layout-toggle-button",`
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
 `,[m("base-icon",`
 transition: transform .3s var(--n-bezier);
 transform: rotate(180deg);
 `)]),m("layout-toggle-bar",`
 cursor: pointer;
 height: 72px;
 width: 32px;
 position: absolute;
 top: calc(50% - 36px);
 right: -28px;
 `,[f("top, bottom",`
 position: absolute;
 width: 4px;
 border-radius: 2px;
 height: 38px;
 left: 14px;
 transition: 
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),f("bottom",`
 position: absolute;
 top: 34px;
 `),W("&:hover",[f("top",{transform:"rotate(12deg) scale(1.15) translateY(-2px)"}),f("bottom",{transform:"rotate(-12deg) scale(1.15) translateY(2px)"})]),f("top, bottom",{backgroundColor:"var(--n-toggle-bar-color)"}),W("&:hover",[f("top, bottom",{backgroundColor:"var(--n-toggle-bar-color-hover)"})])]),f("border",`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 width: 1px;
 transition: background-color .3s var(--n-bezier);
 `),m("layout-sider-scroll-container",`
 flex-grow: 1;
 flex-shrink: 0;
 box-sizing: border-box;
 height: 100%;
 opacity: 0;
 transition: opacity .3s var(--n-bezier);
 max-width: 100%;
 `),U("show-content",[m("layout-sider-scroll-container",{opacity:1})]),U("absolute-positioned",`
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 `)]),jl=Y({name:"LayoutToggleButton",props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){const{clsPrefix:e}=this;return i("div",{class:`${e}-layout-toggle-button`,onClick:this.onClick},i(Ht,{clsPrefix:e},{default:()=>i(wr,null)}))}}),Wl=Y({props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){const{clsPrefix:e}=this;return i("div",{onClick:this.onClick,class:`${e}-layout-toggle-bar`},i("div",{class:`${e}-layout-toggle-bar__top`}),i("div",{class:`${e}-layout-toggle-bar__bottom`}))}}),Kl={position:ln,bordered:Boolean,collapsedWidth:{type:Number,default:48},width:{type:[Number,String],default:272},contentStyle:{type:[String,Object],default:""},collapseMode:{type:String,default:"transform"},collapsed:{type:Boolean,default:void 0},defaultCollapsed:Boolean,showCollapsedContent:{type:Boolean,default:!0},showTrigger:{type:[Boolean,String],default:!1},nativeScrollbar:{type:Boolean,default:!0},inverted:Boolean,scrollbarProps:Object,triggerStyle:[String,Object],collapsedTriggerStyle:[String,Object],"onUpdate:collapsed":[Function,Array],onUpdateCollapsed:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,onExpand:[Function,Array],onCollapse:[Function,Array],onScroll:Function},ql=Y({name:"LayoutSider",props:Object.assign(Object.assign({},fe.props),Kl),setup(e){const t=lt(an),o=O(null),n=O(null),r=P(()=>Jt(u.value?e.collapsedWidth:e.width)),l=P(()=>e.collapseMode!=="transform"?{}:{minWidth:Jt(e.width)}),s=P(()=>t?t.siderPlacement:"left"),a=O(e.defaultCollapsed),u=rt(ue(e,"collapsed"),a);function p(E,z){if(e.nativeScrollbar){const{value:A}=o;A&&(z===void 0?A.scrollTo(E):A.scrollTo(E,z))}else{const{value:A}=n;A&&A.scrollTo(E,z)}}function C(){const{"onUpdate:collapsed":E,onUpdateCollapsed:z,onExpand:A,onCollapse:T}=e,{value:F}=u;z&&de(z,!F),E&&de(E,!F),a.value=!F,F?A&&de(A):T&&de(T)}let g=0,S=0;const w=E=>{var z;const A=E.target;g=A.scrollLeft,S=A.scrollTop,(z=e.onScroll)===null||z===void 0||z.call(e,E)};jo(()=>{if(e.nativeScrollbar){const E=o.value;E&&(E.scrollTop=S,E.scrollLeft=g)}}),nt(El,{collapsedRef:u,collapseModeRef:ue(e,"collapseMode")});const{mergedClsPrefixRef:d,inlineThemeDisabled:y}=Be(e),B=fe("Layout","-layout-sider",Nl,rn,e,d);function k(E){var z,A;E.propertyName==="max-width"&&(u.value?(z=e.onAfterLeave)===null||z===void 0||z.call(e):(A=e.onAfterEnter)===null||A===void 0||A.call(e))}const M={scrollTo:p},D=P(()=>{const{common:{cubicBezierEaseInOut:E},self:z}=B.value,{siderToggleButtonColor:A,siderToggleButtonBorder:T,siderToggleBarColor:F,siderToggleBarColorHover:N}=z,v={"--n-bezier":E,"--n-toggle-button-color":A,"--n-toggle-button-border":T,"--n-toggle-bar-color":F,"--n-toggle-bar-color-hover":N};return e.inverted?(v["--n-color"]=z.siderColorInverted,v["--n-text-color"]=z.textColorInverted,v["--n-border-color"]=z.siderBorderColorInverted,v["--n-toggle-button-icon-color"]=z.siderToggleButtonIconColorInverted,v.__invertScrollbar=z.__invertScrollbar):(v["--n-color"]=z.siderColor,v["--n-text-color"]=z.textColor,v["--n-border-color"]=z.siderBorderColor,v["--n-toggle-button-icon-color"]=z.siderToggleButtonIconColor),v}),H=y?Ie("layout-sider",P(()=>e.inverted?"a":"b"),D,e):void 0;return Object.assign({scrollableElRef:o,scrollbarInstRef:n,mergedClsPrefix:d,mergedTheme:B,styleMaxWidth:r,mergedCollapsed:u,scrollContainerStyle:l,siderPlacement:s,handleNativeElScroll:w,handleTransitionend:k,handleTriggerClick:C,inlineThemeDisabled:y,cssVars:D,themeClass:H==null?void 0:H.themeClass,onRender:H==null?void 0:H.onRender},M)},render(){var e;const{mergedClsPrefix:t,mergedCollapsed:o,showTrigger:n}=this;return(e=this.onRender)===null||e===void 0||e.call(this),i("aside",{class:[`${t}-layout-sider`,this.themeClass,`${t}-layout-sider--${this.position}-positioned`,`${t}-layout-sider--${this.siderPlacement}-placement`,this.bordered&&`${t}-layout-sider--bordered`,o&&`${t}-layout-sider--collapsed`,(!o||this.showCollapsedContent)&&`${t}-layout-sider--show-content`],onTransitionend:this.handleTransitionend,style:[this.inlineThemeDisabled?void 0:this.cssVars,{maxWidth:this.styleMaxWidth,width:Jt(this.width)}]},this.nativeScrollbar?i("div",{class:`${t}-layout-sider-scroll-container`,onScroll:this.handleNativeElScroll,style:[this.scrollContainerStyle,{overflow:"auto"},this.contentStyle],ref:"scrollableElRef"},this.$slots):i(vo,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",style:this.scrollContainerStyle,contentStyle:this.contentStyle,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,builtinThemeOverrides:this.inverted&&this.cssVars.__invertScrollbar==="true"?{colorHover:"rgba(255, 255, 255, .4)",color:"rgba(255, 255, 255, .3)"}:void 0}),this.$slots),n?n==="bar"?i(Wl,{clsPrefix:t,style:o?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):i(jl,{clsPrefix:t,style:o?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):null,this.bordered?i("div",{class:`${t}-layout-sider__border`}):null)}}),Yl=W([m("list",`
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
 `,[U("show-divider",[m("list-item",[W("&:not(:last-child)",[f("divider",`
 background-color: var(--n-merged-border-color);
 `)])])]),U("clickable",[m("list-item",`
 cursor: pointer;
 `)]),U("bordered",`
 border: 1px solid var(--n-merged-border-color);
 border-radius: var(--n-border-radius);
 `),U("hoverable",[m("list-item",`
 border-radius: var(--n-border-radius);
 `,[W("&:hover",`
 background-color: var(--n-merged-color-hover);
 `,[f("divider",`
 background-color: transparent;
 `)])])]),U("bordered, hoverable",[m("list-item",`
 padding: 12px 20px;
 `),f("header, footer",`
 padding: 12px 20px;
 `)]),f("header, footer",`
 padding: 12px 0;
 box-sizing: border-box;
 transition: border-color .3s var(--n-bezier);
 `,[W("&:not(:last-child)",`
 border-bottom: 1px solid var(--n-merged-border-color);
 `)]),m("list-item",`
 position: relative;
 padding: 12px 0; 
 box-sizing: border-box;
 display: flex;
 flex-wrap: nowrap;
 align-items: center;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[f("prefix",`
 margin-right: 20px;
 flex: 0;
 `),f("suffix",`
 margin-left: 20px;
 flex: 0;
 `),f("main",`
 flex: 1;
 `),f("divider",`
 height: 1px;
 position: absolute;
 bottom: 0;
 left: 0;
 right: 0;
 background-color: transparent;
 transition: background-color .3s var(--n-bezier);
 pointer-events: none;
 `)])]),nr(m("list",`
 --n-merged-color-hover: var(--n-color-hover-modal);
 --n-merged-color: var(--n-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),rr(m("list",`
 --n-merged-color-hover: var(--n-color-hover-popover);
 --n-merged-color: var(--n-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),Gl=Object.assign(Object.assign({},fe.props),{size:{type:String,default:"medium"},bordered:Boolean,clickable:Boolean,hoverable:Boolean,showDivider:{type:Boolean,default:!0}}),cn=St("n-list"),Xl=Y({name:"List",props:Gl,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:o,mergedRtlRef:n}=Be(e),r=Lo("List",n,t),l=fe("List","-list",Yl,lr,e,t);nt(cn,{showDividerRef:ue(e,"showDivider"),mergedClsPrefixRef:t});const s=P(()=>{const{common:{cubicBezierEaseInOut:u},self:{fontSize:p,textColor:C,color:g,colorModal:S,colorPopover:w,borderColor:d,borderColorModal:y,borderColorPopover:B,borderRadius:k,colorHover:M,colorHoverModal:D,colorHoverPopover:H}}=l.value;return{"--n-font-size":p,"--n-bezier":u,"--n-text-color":C,"--n-color":g,"--n-border-radius":k,"--n-border-color":d,"--n-border-color-modal":y,"--n-border-color-popover":B,"--n-color-modal":S,"--n-color-popover":w,"--n-color-hover":M,"--n-color-hover-modal":D,"--n-color-hover-popover":H}}),a=o?Ie("list",void 0,s,e):void 0;return{mergedClsPrefix:t,rtlEnabled:r,cssVars:o?void 0:s,themeClass:a==null?void 0:a.themeClass,onRender:a==null?void 0:a.onRender}},render(){var e;const{$slots:t,mergedClsPrefix:o,onRender:n}=this;return n==null||n(),i("ul",{class:[`${o}-list`,this.rtlEnabled&&`${o}-list--rtl`,this.bordered&&`${o}-list--bordered`,this.showDivider&&`${o}-list--show-divider`,this.hoverable&&`${o}-list--hoverable`,this.clickable&&`${o}-list--clickable`,this.themeClass],style:this.cssVars},t.header?i("div",{class:`${o}-list__header`},t.header()):null,(e=t.default)===null||e===void 0?void 0:e.call(t),t.footer?i("div",{class:`${o}-list__footer`},t.footer()):null)}}),Zl=Y({name:"ListItem",setup(){const e=lt(cn,null);return e||ir("list-item","`n-list-item` must be placed in `n-list`."),{showDivider:e.showDividerRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){const{$slots:e,mergedClsPrefix:t}=this;return i("li",{class:`${t}-list-item`},e.prefix?i("div",{class:`${t}-list-item__prefix`},e.prefix()):null,e.default?i("div",{class:`${t}-list-item__main`},e):null,e.suffix?i("div",{class:`${t}-list-item__suffix`},e.suffix()):null,this.showDivider&&i("div",{class:`${t}-list-item__divider`}))}}),Ql=m("switch",`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[f("children-placeholder",`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),f("rail-placeholder",`
 display: flex;
 flex-wrap: none;
 `),f("button-placeholder",`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),m("base-loading",`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[To({left:"50%",top:"50%",originalTransform:"translateX(-50%) translateY(-50%)"})]),f("checked, unchecked",`
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
 `),f("checked",`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),f("unchecked",`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),W("&:focus",[f("rail",`
 box-shadow: var(--n-box-shadow-focus);
 `)]),U("round",[f("rail","border-radius: calc(var(--n-rail-height) / 2);",[f("button","border-radius: calc(var(--n-button-height) / 2);")])]),Le("disabled",[Le("icon",[U("rubber-band",[U("pressed",[f("rail",[f("button","max-width: var(--n-button-width-pressed);")])]),f("rail",[W("&:active",[f("button","max-width: var(--n-button-width-pressed);")])]),U("active",[U("pressed",[f("rail",[f("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])]),f("rail",[W("&:active",[f("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])])])])])]),U("active",[f("rail",[f("button","left: calc(100% - var(--n-button-width) - var(--n-offset))")])]),f("rail",`
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
 `,[f("button-icon",`
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
 `,[To()]),f("button",`
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
 `)]),U("active",[f("rail","background-color: var(--n-rail-color-active);")]),U("loading",[f("rail",`
 cursor: wait;
 `)]),U("disabled",[f("rail",`
 cursor: not-allowed;
 opacity: .5;
 `)])]),Jl=Object.assign(Object.assign({},fe.props),{size:{type:String,default:"medium"},value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},onChange:[Function,Array]});let mt;const dn=Y({name:"Switch",props:Jl,setup(e){mt===void 0&&(typeof CSS<"u"?typeof CSS.supports<"u"?mt=CSS.supports("width","max(1px)"):mt=!1:mt=!0);const{mergedClsPrefixRef:t,inlineThemeDisabled:o}=Be(e),n=fe("Switch","-switch",Ql,Vl,e,t),r=jt(e),{mergedSizeRef:l,mergedDisabledRef:s}=r,a=O(e.defaultValue),u=ue(e,"value"),p=rt(u,a),C=P(()=>p.value===e.checkedValue),g=O(!1),S=O(!1),w=P(()=>{const{railStyle:T}=e;if(T)return T({focused:S.value,checked:C.value})});function d(T){const{"onUpdate:value":F,onChange:N,onUpdateValue:v}=e,{nTriggerFormInput:_,nTriggerFormChange:V}=r;F&&de(F,T),v&&de(v,T),N&&de(N,T),a.value=T,_(),V()}function y(){const{nTriggerFormFocus:T}=r;T()}function B(){const{nTriggerFormBlur:T}=r;T()}function k(){e.loading||s.value||(p.value!==e.checkedValue?d(e.checkedValue):d(e.uncheckedValue))}function M(){S.value=!0,y()}function D(){S.value=!1,B(),g.value=!1}function H(T){e.loading||s.value||T.key===" "&&(p.value!==e.checkedValue?d(e.checkedValue):d(e.uncheckedValue),g.value=!1)}function E(T){e.loading||s.value||T.key===" "&&(T.preventDefault(),g.value=!0)}const z=P(()=>{const{value:T}=l,{self:{opacityDisabled:F,railColor:N,railColorActive:v,buttonBoxShadow:_,buttonColor:V,boxShadowFocus:X,loadingColor:G,textColor:J,iconColor:K,[ae("buttonHeight",T)]:Z,[ae("buttonWidth",T)]:b,[ae("buttonWidthPressed",T)]:$,[ae("railHeight",T)]:j,[ae("railWidth",T)]:se,[ae("railBorderRadius",T)]:xe,[ae("buttonBorderRadius",T)]:Te},common:{cubicBezierEaseInOut:$e}}=n.value;let ie,Ce,he;return mt?(ie=`calc((${j} - ${Z}) / 2)`,Ce=`max(${j}, ${Z})`,he=`max(${se}, calc(${se} + ${Z} - ${j}))`):(ie=Qe((Re(j)-Re(Z))/2),Ce=Qe(Math.max(Re(j),Re(Z))),he=Re(j)>Re(Z)?se:Qe(Re(se)+Re(Z)-Re(j))),{"--n-bezier":$e,"--n-button-border-radius":Te,"--n-button-box-shadow":_,"--n-button-color":V,"--n-button-width":b,"--n-button-width-pressed":$,"--n-button-height":Z,"--n-height":Ce,"--n-offset":ie,"--n-opacity-disabled":F,"--n-rail-border-radius":xe,"--n-rail-color":N,"--n-rail-color-active":v,"--n-rail-height":j,"--n-rail-width":se,"--n-width":he,"--n-box-shadow-focus":X,"--n-loading-color":G,"--n-text-color":J,"--n-icon-color":K}}),A=o?Ie("switch",P(()=>l.value[0]),z,e):void 0;return{handleClick:k,handleBlur:D,handleFocus:M,handleKeyup:H,handleKeydown:E,mergedRailStyle:w,pressed:g,mergedClsPrefix:t,mergedValue:p,checked:C,mergedDisabled:s,cssVars:o?void 0:z,themeClass:A==null?void 0:A.themeClass,onRender:A==null?void 0:A.onRender}},render(){const{mergedClsPrefix:e,mergedDisabled:t,checked:o,mergedRailStyle:n,onRender:r,$slots:l}=this;r==null||r();const{checked:s,unchecked:a,icon:u,"checked-icon":p,"unchecked-icon":C}=l,g=!(eo(u)&&eo(p)&&eo(C));return i("div",{role:"switch","aria-checked":o,class:[`${e}-switch`,this.themeClass,g&&`${e}-switch--icon`,o&&`${e}-switch--active`,t&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`],tabindex:this.mergedDisabled?void 0:0,style:this.cssVars,onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},i("div",{class:`${e}-switch__rail`,"aria-hidden":"true",style:n},Oe(s,S=>Oe(a,w=>S||w?i("div",{"aria-hidden":!0,class:`${e}-switch__children-placeholder`},i("div",{class:`${e}-switch__rail-placeholder`},i("div",{class:`${e}-switch__button-placeholder`}),S),i("div",{class:`${e}-switch__rail-placeholder`},i("div",{class:`${e}-switch__button-placeholder`}),w)):null)),i("div",{class:`${e}-switch__button`},Oe(u,S=>Oe(p,w=>Oe(C,d=>i(ar,null,{default:()=>this.loading?i(Do,{key:"loading",clsPrefix:e,strokeWidth:20}):this.checked&&(w||S)?i("div",{class:`${e}-switch__button-icon`,key:w?"checked-icon":"icon"},w||S):!this.checked&&(d||S)?i("div",{class:`${e}-switch__button-icon`,key:d?"unchecked-icon":"icon"},d||S):null})))),Oe(s,S=>S&&i("div",{key:"checked",class:`${e}-switch__checked`},S)),Oe(a,S=>S&&i("div",{key:"unchecked",class:`${e}-switch__unchecked`},S)))))}}),ei={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 20 20"},ti=Se("g",{fill:"none"},[Se("path",{d:"M15.854 7.646a.5.5 0 0 1 .001.707l-5.465 5.484a.55.55 0 0 1-.78 0L4.147 8.353a.5.5 0 1 1 .708-.706L10 12.812l5.147-5.165a.5.5 0 0 1 .707-.001z",fill:"currentColor"})],-1),oi=[ti],ni=Y({name:"ChevronDown20Regular",render:function(t,o){return te(),we("svg",ei,oi)}}),ri={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 20 20"},li=Se("g",{fill:"none"},[Se("path",{d:"M10 2a8 8 0 1 1 0 16a8 8 0 0 1 0-16zm0 1a7 7 0 1 0 0 14a7 7 0 0 0 0-14zm0 10.5a.75.75 0 1 1 0 1.5a.75.75 0 0 1 0-1.5zm0-8a2.5 2.5 0 0 1 1.651 4.377l-.154.125l-.219.163l-.087.072a1.968 1.968 0 0 0-.156.149c-.339.36-.535.856-.535 1.614a.5.5 0 0 1-1 0c0-1.012.293-1.752.805-2.298a3.11 3.11 0 0 1 .356-.323l.247-.185l.118-.1A1.5 1.5 0 1 0 8.5 8a.5.5 0 0 1-1 .001A2.5 2.5 0 0 1 10 5.5z",fill:"currentColor"})],-1),ii=[li],ai=Y({name:"QuestionCircle20Regular",render:function(t,o){return te(),we("svg",ri,ii)}}),un=Y({name:"VueRender",props:{renderFn:{type:[Object,Function],required:!0}},render(){return typeof this.renderFn=="function"?this.renderFn():this.renderFn}}),si=Y({name:"RectSwitch",props:{modelValue:{type:[Boolean,String,Number],default:!1},options:{type:Array,default(){return[]}}},setup(e,{emit:t}){return{mValue:sr(e,t)}}});const ci={class:"rect-switch"},di=["onClick"];function ui(e,t,o,n,r,l){return te(),we("div",ci,[(te(!0),we(_t,null,Kt(e.options,s=>(te(),we("div",{key:s.value,class:Et(["r-item",{active:s.value===e.mValue}]),onClick:a=>e.mValue=s.value},Dt(s.label),11,di))),128))])}const hn=Ke(si,[["render",ui]]);var ye=(e=>(e.SWITCH="switch",e.MULTIPLE_SWITCH="multiple_switch",e.SLIDER="slider",e.SELECT="select",e.INPUT="input",e.COLOR_PICKER="color_picker",e.DYNAMIC_TAGS="dynamic_tags",e))(ye||{});const hi=["#258292","#3A6EA5","#F0C869","#E81123","#e91e63","#FFFFFF","#000000","#007aff","#a2845e","#8e8e93","#28cd41","#5856d6","#ff9500","#ff2d55","#af52de","#ff3b30","#5ac8fa","#ffcc00"],fi=Y({name:"ItemAction",components:{VueRender:un,RectSwitch:hn},props:{item:{type:Object,required:!0}},setup(e,{emit:t}){const{item:o}=bo(e),n=P({get(){return o.value.store?o.value.store[o.value.key]:o.value.value},set(r){if(o.value.store){o.value.store[o.value.key]=r;return}o.value.value=r}});return{StOptionType:ye,dynamicValue:n,swatches:hi}}});const vi={key:2,class:"option-slider-wrap"};function pi(e,t,o,n,r,l){const s=dn,a=hn,u=br,p=Tl,C=wo,g=Sl,S=Ol,w=un,d=xo;return te(),be(d,{class:"option-item-action",size:"small",align:"center"},{default:Fe(()=>[e.item.type===e.StOptionType.SWITCH?(te(),be(s,{key:0,value:e.dynamicValue,"onUpdate:value":t[0]||(t[0]=y=>e.dynamicValue=y)},null,8,["value"])):e.item.type===e.StOptionType.MULTIPLE_SWITCH?(te(),be(a,{key:1,options:e.item.selectOptions,modelValue:e.dynamicValue,"onUpdate:modelValue":t[1]||(t[1]=y=>e.dynamicValue=y)},null,8,["options","modelValue"])):e.item.type===e.StOptionType.SLIDER?(te(),we("div",vi,[Me(u,{class:"option-slider",value:e.dynamicValue,"onUpdate:value":t[2]||(t[2]=y=>e.dynamicValue=y)},null,8,["value"])])):e.item.type===e.StOptionType.SELECT?(te(),be(p,{key:3,class:"option-select",value:e.dynamicValue,"onUpdate:value":t[3]||(t[3]=y=>e.dynamicValue=y),options:e.item.selectOptions,"value-field":"value","label-field":"label",size:"small"},null,8,["value","options"])):e.item.type===e.StOptionType.INPUT?(te(),be(C,{key:4,class:"option-select option-input",value:e.dynamicValue,"onUpdate:value":t[4]||(t[4]=y=>e.dynamicValue=y),size:"small",type:"text",clearable:"",placeholder:e.item.placeholder||""},null,8,["value","placeholder"])):e.item.type===e.StOptionType.COLOR_PICKER?(te(),be(g,{key:5,class:"option-select",value:e.dynamicValue,"onUpdate:value":t[5]||(t[5]=y=>e.dynamicValue=y),size:"small",swatches:e.swatches,"show-alpha":!1,actions:["clear"],modes:["hex"]},null,8,["value","swatches"])):e.item.type===e.StOptionType.DYNAMIC_TAGS?(te(),be(S,{key:6,class:"dynamic-tags",value:e.dynamicValue,"onUpdate:value":t[6]||(t[6]=y=>e.dynamicValue=y),size:"small"},null,8,["value"])):Je("",!0),e.item.actionRender?(te(),be(w,{key:7,"render-fn":e.item.actionRender},null,8,["render-fn"])):Je("",!0)]),_:1})}const fn=Ke(fi,[["render",pi]]),gi=Y({name:"OptionItem",components:{QuestionCircle20Regular:ai,ItemAction:fn,ChevronDown20Regular:ni},props:{item:{type:Object,required:!0},foldedKeyMap:{type:Object,default(){return{}}}},setup(e,{emit:t}){const{item:o,foldedKeyMap:n}=bo(e);return{isExpanded:P(()=>!n.value[o.value.key]),StOptionType:ye}}});const bi={class:"panel-header"},mi={class:"p-left"},yi={class:"item-label"},wi={class:"p-right"},xi={key:0,class:"panel-body"},Ci={class:"o-left"},ki={key:0,class:"item-icon"},Si=["src"],_i={class:"item-title-wrap"},Ri={class:"item-label-wrap"},Ti={class:"item-label"},$i=["innerHTML"],zi=["innerHTML"],Ii={class:"o-right"};function Pi(e,t,o,n,r,l){const s=xt("ChevronDown20Regular"),a=cr,u=fn,p=xt("QuestionCircle20Regular"),C=Yo;return te(),we("div",{class:Et(["c-panel-item",[e.item.cls]])},[Se("div",bi,[Se("div",mi,[Se("div",yi,Dt(e.item.label),1)]),Se("div",wi,[e.item.children&&e.item.children.length?(te(),we("div",{key:0,class:Et(["btn-no-style btn-toggle-expand",{expanded:e.isExpanded}]),onClick:t[0]||(t[0]=g=>e.$emit("onToggleExpand",e.item))},[Me(a,{size:"20"},{default:Fe(()=>[Me(s)]),_:1})],2)):(te(),be(u,{key:1,item:e.item},null,8,["item"]))])]),e.item.children&&e.item.children.length?Wt((te(),we("div",xi,[(te(!0),we(_t,null,Kt(e.item.children,g=>(te(),we("div",{key:g.key,class:"sub-item"},[Se("div",Ci,[g.icon?(te(),we("div",ki,[Se("img",{src:g.icon,alt:"icon"},null,8,Si)])):Je("",!0),Se("div",_i,[Se("div",Ri,[Se("span",Ti,Dt(g.label),1),g.tips?(te(),be(C,{key:0,trigger:"hover"},{trigger:Fe(()=>[Me(a,{size:"16"},{default:Fe(()=>[Me(p)]),_:1})]),default:Fe(()=>[Se("span",{innerHTML:g.tips},null,8,$i)]),_:2},1024)):Je("",!0)]),g.subtitle?(te(),we("div",{key:0,class:"item-subtitle",innerHTML:g.subtitle},null,8,zi)):Je("",!0)])]),Se("div",Ii,[Me(u,{item:g},null,8,["item"])])]))),128))],512)),[[go,e.isExpanded]]):Je("",!0)],2)}const vn=Ke(gi,[["render",Pi]]),Ao="option_ui_folded_key_map",Oi=Y({name:"OptionUI",components:{OptionItem:vn},props:{optionList:{type:Array,default(){return[]}},expandId:{type:String,default:""}},setup(e,{emit:t}){const{expandId:o}=bo(e),n=O(JSON.parse(localStorage.getItem(Ao+o.value)||"null")||{});return{StOptionType:ye,foldedKeyMap:n,handleToggleExpand:l=>{n.value[l.key]?delete n.value[l.key]:n.value[l.key]=!0,localStorage.setItem(Ao+o.value,JSON.stringify(n.value))}}}}),Fi={class:"option-ui"};function Mi(e,t,o,n,r,l){const s=vn;return te(),we("div",Fi,[(te(!0),we(_t,null,Kt(e.optionList,a=>Wt((te(),be(s,{item:a,key:a.key,"folded-key-map":e.foldedKeyMap,onOnToggleExpand:e.handleToggleExpand},null,8,["item","folded-key-map","onOnToggleExpand"])),[[go,!a.hidden]])),128))])}const it=Ke(Oi,[["render",Mi]]),Bi=()=>{const e=[{label:"Bing",url:"https://api.dujin.org/bing/1920.php"},{label:"ACG",url:"https://api.dujin.org/pic/"},{label:"Ghibli",url:"https://api.dujin.org/pic/ghibli"},{label:"风景",url:"https://api.dujin.org/pic/fengjing"}];let t='<b><a href="https://www.dujin.org/12142.html" target="_blank">随机壁纸API</a></b>';return e.forEach(o=>{t+=`<br>${o.label}: <a href="${o.url}" target="_blank">${o.url}</a>`}),t},Ai=Y({name:"SettingsPersonalization",components:{OptionUI:it},setup(e,{emit:t}){qt();const o=mo();return{optionList:P(()=>[{label:"个性化",key:"personalization",children:[{label:"主题色",key:"themeColor",store:o,type:ye.COLOR_PICKER},{label:"桌面壁纸",key:"desktopWallpaper",store:o,type:ye.INPUT,tips:Bi(),placeholder:"optional"},!o.desktopWallpaper&&{label:"桌面背景色",key:"desktopBgColor",store:o,type:ye.COLOR_PICKER},{label:"明暗模式",key:"ldTheme",store:o,type:ye.MULTIPLE_SWITCH,selectOptions:Wo},{label:"系统主题",key:"customTheme",store:o,type:ye.SELECT,selectOptions:dr},o.customTheme===$o.DEFAULT&&{label:"圆角样式",key:"enableRoundedTheme",store:o,type:ye.SWITCH},o.customTheme===$o.DEFAULT&&{label:"Aero 效果",key:"enableAeroTheme",store:o,type:ye.SWITCH},{label:"Disable Animation",subtitle:"E-Ink optimization",key:"disableAnimation",store:o,type:ye.SWITCH}].filter(Boolean)},{label:"系统 UI",key:"system_ui",children:[{label:"多窗口模式",key:"isWindowed",store:o,type:ye.SWITCH},{label:"任务栏显示时钟",key:"taskbarShowClock",store:o,type:ye.SWITCH},{label:"任务栏只显示图标",key:"taskbarIconOnly",store:o,type:ye.SWITCH}]}])}}});function Vi(e,t,o,n,r,l){const s=it;return te(),be(s,{"option-list":e.optionList},null,8,["option-list"])}const Ei=Ke(Ai,[["render",Vi]]),Di=Y({name:"SettingsSystem",components:{OptionUI:it},setup(e,{emit:t}){const{t:o}=qt(),n=mo(),r=Ko(),l=O({});return ft(async()=>{if(r.isBackendAvailable){const a=await ur();l.value=a||{}}}),{optionList:P(()=>[{label:"系统信息",key:"os_info",children:[{key:"frontend_version",label:"前端版本",subtitle:zo.name,actionRender:i("div",zo.version)},{key:"backend_version",label:"后端服务器版本",subtitle:r.isBackendAvailable?l.value.name:"后端服务不可用",actionRender:i("div",r.isBackendAvailable?l.value.version:"N/A")},{key:"github",label:"仓库地址",subtitle:"作者: Canwdev",actionRender:i("a",{href:"https://github.com/canwdev/canos-web",target:"_blank",rel:"nofollow noopener"},"Github")}].filter(Boolean)},{label:"媒体设置",key:"media_settings",children:[{label:"音量",key:"audioVolume",store:n,type:ye.SLIDER,selectOptions:Wo},{label:"播放模式",key:"loopMode",store:n,type:ye.SELECT,selectOptions:Object.values(hr).map(a=>({label:o(a.i18nKey),value:a.value}))}]}])}}});function Li(e,t,o,n,r,l){const s=it;return te(),be(s,{"option-list":e.optionList},null,8,["option-list"])}const Ui=Ke(Di,[["render",Li]]),Hi=Y({name:"SettingsPrograms",components:{OptionUI:it},setup(e,{emit:t}){qt();const o=mo(),n=Ko();return{optionList:P(()=>{const l={};return o.appAutoStartIds.forEach(s=>{l[s]=!0}),[{label:"应用管理",key:"app_management",children:n.allApps.map(s=>({icon:s.icon,label:s.title,key:s.appid,actionRender:i(xo,{size:"small",align:"center"},()=>[i("div",{},"开机自启"),i(dn,{value:l[s.appid],onClick:()=>{l[s.appid]?delete l[s.appid]:l[s.appid]=!0,o.appAutoStartIds=Object.keys(l)}})])}))}]})}}});function Ni(e,t,o,n,r,l){const s=it;return te(),be(s,{"option-list":e.optionList},null,8,["option-list"])}const ji=Ke(Hi,[["render",Ni]]),Wi=Y({name:"SettingsApp",components:{SettingsPrograms:ji,SettingsSystem:Ui,SettingsPersonalization:Ei,OptionUI:it},setup(e,{emit:t}){qt();const o=O([{label:"个性化",value:gt.PERSONALIZATION},{label:"应用程序",value:gt.PROGRAMS},{label:"系统",value:gt.SYSTEM}]),n=O(gt.PERSONALIZATION);return{SettingsTabType:gt,settingsTabs:o,curTab:n}}});const Ki={class:"settings-app"};function qi(e,t,o,n,r,l){const s=Zl,a=Xl,u=ql,p=xt("SettingsPersonalization"),C=xt("SettingsPrograms"),g=xt("SettingsSystem"),S=Hl,w=Ul;return te(),we("div",Ki,[Me(w,{"has-sider":"",style:{height:"100%"}},{default:Fe(()=>[Me(u,{"collapse-mode":"width","collapsed-width":0,width:200,style:{height:"100%"},"show-trigger":"arrow-circle",bordered:""},{default:Fe(()=>[Me(a,{hoverable:"",clickable:""},{default:Fe(()=>[(te(!0),we(_t,null,Kt(e.settingsTabs,d=>(te(),be(s,{class:Et(["left-list-item",{active:e.curTab===d.value}]),key:d.value,onClick:y=>e.curTab=d.value},{default:Fe(()=>[fr(Dt(d.label),1)]),_:2},1032,["onClick","class"]))),128))]),_:1})]),_:1}),Me(S,null,{default:Fe(()=>[e.curTab===e.SettingsTabType.PERSONALIZATION?(te(),be(p,{key:0})):e.curTab===e.SettingsTabType.PROGRAMS?(te(),be(C,{key:1})):e.curTab===e.SettingsTabType.SYSTEM?(te(),be(g,{key:2})):Je("",!0)]),_:1})]),_:1})])}const ea=Ke(Wi,[["render",qi],["__scopeId","data-v-4bbfba4e"]]);export{ea as default};
