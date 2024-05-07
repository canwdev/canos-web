import{am as e,c1 as n,c2 as o,p as a,l as r,a9 as t,m as l,ab as i,b9 as s,ba as d,d as c,q as u,s as h,r as v,aO as f,z as b,ac as p,aQ as m,w as g,$ as x,A as w,aR as k,aS as y,B as z,aU as C,aV as S,al as B,aW as R,a8 as D,as as $,aG as T,aH as F,K as M}from"./index-DSBX7T2Q.js";const H={name:"Slider",common:e,self:e=>{const{railColor:o,primaryColor:a,baseColor:r,cardColor:t,modalColor:l,popoverColor:i,borderRadius:s,fontSize:d,opacityDisabled:c}=e;return Object.assign(Object.assign({},n),{fontSize:d,markFontSize:d,railColor:o,railColorHover:o,fillColor:a,fillColorHover:a,opacityDisabled:c,handleColor:"#FFF",dotColor:t,dotColorModal:l,dotColorPopover:i,handleBoxShadow:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",handleBoxShadowHover:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",handleBoxShadowActive:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",handleBoxShadowFocus:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",indicatorColor:"rgba(0, 0, 0, .85)",indicatorBoxShadow:"0 2px 8px 0 rgba(0, 0, 0, 0.12)",indicatorTextColor:r,indicatorBorderRadius:s,dotBorder:`2px solid ${o}`,dotBorderActive:`2px solid ${a}`,dotBoxShadow:""})}};function A(e){return window.TouchEvent&&e instanceof window.TouchEvent}function V(){const e=new Map;return o((()=>{e.clear()})),[e,n=>o=>{e.set(n,o)}]}const j=a([r("slider","\n display: block;\n padding: calc((var(--n-handle-size) - var(--n-rail-height)) / 2) 0;\n position: relative;\n z-index: 0;\n width: 100%;\n cursor: pointer;\n user-select: none;\n -webkit-user-select: none;\n ",[t("reverse",[r("slider-handles",[r("slider-handle-wrapper","\n transform: translate(50%, -50%);\n ")]),r("slider-dots",[r("slider-dot","\n transform: translateX(50%, -50%);\n ")]),t("vertical",[r("slider-handles",[r("slider-handle-wrapper","\n transform: translate(-50%, -50%);\n ")]),r("slider-marks",[r("slider-mark","\n transform: translateY(calc(-50% + var(--n-dot-height) / 2));\n ")]),r("slider-dots",[r("slider-dot","\n transform: translateX(-50%) translateY(0);\n ")])])]),t("vertical","\n padding: 0 calc((var(--n-handle-size) - var(--n-rail-height)) / 2);\n width: var(--n-rail-width-vertical);\n height: 100%;\n ",[r("slider-handles","\n top: calc(var(--n-handle-size) / 2);\n right: 0;\n bottom: calc(var(--n-handle-size) / 2);\n left: 0;\n ",[r("slider-handle-wrapper","\n top: unset;\n left: 50%;\n transform: translate(-50%, 50%);\n ")]),r("slider-rail","\n height: 100%;\n ",[l("fill","\n top: unset;\n right: 0;\n bottom: unset;\n left: 0;\n ")]),t("with-mark","\n width: var(--n-rail-width-vertical);\n margin: 0 32px 0 8px;\n "),r("slider-marks","\n top: calc(var(--n-handle-size) / 2);\n right: unset;\n bottom: calc(var(--n-handle-size) / 2);\n left: 22px;\n font-size: var(--n-mark-font-size);\n ",[r("slider-mark","\n transform: translateY(50%);\n white-space: nowrap;\n ")]),r("slider-dots","\n top: calc(var(--n-handle-size) / 2);\n right: unset;\n bottom: calc(var(--n-handle-size) / 2);\n left: 50%;\n ",[r("slider-dot","\n transform: translateX(-50%) translateY(50%);\n ")])]),t("disabled","\n cursor: not-allowed;\n opacity: var(--n-opacity-disabled);\n ",[r("slider-handle","\n cursor: not-allowed;\n ")]),t("with-mark","\n width: 100%;\n margin: 8px 0 32px 0;\n "),a("&:hover",[r("slider-rail",{backgroundColor:"var(--n-rail-color-hover)"},[l("fill",{backgroundColor:"var(--n-fill-color-hover)"})]),r("slider-handle",{boxShadow:"var(--n-handle-box-shadow-hover)"})]),t("active",[r("slider-rail",{backgroundColor:"var(--n-rail-color-hover)"},[l("fill",{backgroundColor:"var(--n-fill-color-hover)"})]),r("slider-handle",{boxShadow:"var(--n-handle-box-shadow-hover)"})]),r("slider-marks","\n position: absolute;\n top: 18px;\n left: calc(var(--n-handle-size) / 2);\n right: calc(var(--n-handle-size) / 2);\n ",[r("slider-mark","\n position: absolute;\n transform: translateX(-50%);\n white-space: nowrap;\n ")]),r("slider-rail","\n width: 100%;\n position: relative;\n height: var(--n-rail-height);\n background-color: var(--n-rail-color);\n transition: background-color .3s var(--n-bezier);\n border-radius: calc(var(--n-rail-height) / 2);\n ",[l("fill","\n position: absolute;\n top: 0;\n bottom: 0;\n border-radius: calc(var(--n-rail-height) / 2);\n transition: background-color .3s var(--n-bezier);\n background-color: var(--n-fill-color);\n ")]),r("slider-handles","\n position: absolute;\n top: 0;\n right: calc(var(--n-handle-size) / 2);\n bottom: 0;\n left: calc(var(--n-handle-size) / 2);\n ",[r("slider-handle-wrapper","\n outline: none;\n position: absolute;\n top: 50%;\n transform: translate(-50%, -50%);\n cursor: pointer;\n display: flex;\n ",[r("slider-handle","\n height: var(--n-handle-size);\n width: var(--n-handle-size);\n border-radius: 50%;\n overflow: hidden;\n transition: box-shadow .2s var(--n-bezier), background-color .3s var(--n-bezier);\n background-color: var(--n-handle-color);\n box-shadow: var(--n-handle-box-shadow);\n ",[a("&:hover","\n box-shadow: var(--n-handle-box-shadow-hover);\n ")]),a("&:focus",[r("slider-handle","\n box-shadow: var(--n-handle-box-shadow-focus);\n ",[a("&:hover","\n box-shadow: var(--n-handle-box-shadow-active);\n ")])])])]),r("slider-dots","\n position: absolute;\n top: 50%;\n left: calc(var(--n-handle-size) / 2);\n right: calc(var(--n-handle-size) / 2);\n ",[t("transition-disabled",[r("slider-dot","transition: none;")]),r("slider-dot","\n transition:\n border-color .3s var(--n-bezier),\n box-shadow .3s var(--n-bezier),\n background-color .3s var(--n-bezier);\n position: absolute;\n transform: translate(-50%, -50%);\n height: var(--n-dot-height);\n width: var(--n-dot-width);\n border-radius: var(--n-dot-border-radius);\n overflow: hidden;\n box-sizing: border-box;\n border: var(--n-dot-border);\n background-color: var(--n-dot-color);\n ",[t("active","border: var(--n-dot-border-active);")])])]),r("slider-handle-indicator","\n font-size: var(--n-font-size);\n padding: 6px 10px;\n border-radius: var(--n-indicator-border-radius);\n color: var(--n-indicator-text-color);\n background-color: var(--n-indicator-color);\n box-shadow: var(--n-indicator-box-shadow);\n ",[i()]),r("slider-handle-indicator","\n font-size: var(--n-font-size);\n padding: 6px 10px;\n border-radius: var(--n-indicator-border-radius);\n color: var(--n-indicator-text-color);\n background-color: var(--n-indicator-color);\n box-shadow: var(--n-indicator-box-shadow);\n ",[t("top","\n margin-bottom: 12px;\n "),t("right","\n margin-left: 12px;\n "),t("bottom","\n margin-top: 12px;\n "),t("left","\n margin-right: 12px;\n "),i()]),s(r("slider",[r("slider-dot","background-color: var(--n-dot-color-modal);")])),d(r("slider",[r("slider-dot","background-color: var(--n-dot-color-popover);")]))]),N=c({name:"Slider",props:Object.assign(Object.assign({},h.props),{to:y.propTo,defaultValue:{type:[Number,Array],default:0},marks:Object,disabled:{type:Boolean,default:void 0},formatTooltip:Function,keyboard:{type:Boolean,default:!0},min:{type:Number,default:0},max:{type:Number,default:100},step:{type:[Number,String],default:1},range:Boolean,value:[Number,Array],placement:String,showTooltip:{type:Boolean,default:void 0},tooltip:{type:Boolean,default:!0},vertical:Boolean,reverse:Boolean,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onDragstart:[Function],onDragend:[Function]}),setup(e){const{mergedClsPrefixRef:n,namespaceRef:o,inlineThemeDisabled:a}=u(e),r=h("Slider","-slider",j,H,e,n),t=v(null),[l,i]=V(),[s,d]=V(),c=v(new Set),z=f(e),{mergedDisabledRef:C}=z,S=b((()=>{const{step:n}=e;if(Number(n)<=0||"mark"===n)return 0;const o=n.toString();let a=0;return o.includes(".")&&(a=o.length-o.indexOf(".")-1),a})),B=v(e.defaultValue),R=p(e,"value"),D=m(R,B),N=b((()=>{const{value:n}=D;return(e.range?n:[n]).map(ne)})),I=b((()=>N.value.length>2)),O=b((()=>void 0===e.placement?e.vertical?"right":"top":e.placement)),E=b((()=>{const{marks:n}=e;return n?Object.keys(n).map(parseFloat):null})),P=v(-1),K=v(-1),U=v(-1),X=v(!1),Y=v(!1),L=b((()=>{const{vertical:n,reverse:o}=e;return n?o?"top":"bottom":o?"right":"left"})),W=b((()=>{if(I.value)return;const n=N.value,o=oe(e.range?Math.min(...n):e.min),a=oe(e.range?Math.max(...n):n[0]),{value:r}=L;return e.vertical?{[r]:`${o}%`,height:a-o+"%"}:{[r]:`${o}%`,width:a-o+"%"}})),_=b((()=>{const n=[],{marks:o}=e;if(o){const a=N.value.slice();a.sort(((e,n)=>e-n));const{value:r}=L,{value:t}=I,{range:l}=e,i=t?()=>!1:e=>l?e>=a[0]&&e<=a[a.length-1]:e<=a[0];for(const e of Object.keys(o)){const a=Number(e);n.push({active:i(a),label:o[e],style:{[r]:`${oe(a)}%`}})}}return n}));function q(n){return e.showTooltip||U.value===n||P.value===n&&X.value}function G(){s.forEach(((e,n)=>{q(n)&&e.syncPosition()}))}function Q(n){const{"onUpdate:value":o,onUpdateValue:a}=e,{nTriggerFormInput:r,nTriggerFormChange:t}=z;a&&$(a,n),o&&$(o,n),B.value=n,r(),t()}function J(n){const{range:o}=e;if(o){if(Array.isArray(n)){const{value:e}=N;n.join()!==e.join()&&Q(n)}}else if(!Array.isArray(n)){N.value[0]!==n&&Q(n)}}function Z(n,o){if(e.range){const e=N.value.slice();e.splice(o,1,n),J(e)}else J(n)}function ee(n,o,a){const r=void 0!==a;a||(a=n-o>0?1:-1);const t=E.value||[],{step:l}=e;if("mark"===l){const e=ae(n,t.concat(o),r?a:void 0);return e?e.value:o}if(l<=0)return o;const{value:i}=S;let s;if(r){const e=Number((o/l).toFixed(i)),n=Math.floor(e),r=e<n?n:n+1;s=ae(o,[Number(((e>n?n:n-1)*l).toFixed(i)),Number((r*l).toFixed(i)),...t],a)}else{const o=function(n){const{step:o,min:a}=e;if(Number(o)<=0||"mark"===o)return n;const r=Math.round((n-a)/o)*o+a;return Number(r.toFixed(S.value))}(n);s=ae(n,[...t,o])}return s?ne(s.value):o}function ne(n){return Math.min(e.max,Math.max(e.min,n))}function oe(n){const{max:o,min:a}=e;return(n-a)/(o-a)*100}function ae(e,n=E.value,o){if(!(null==n?void 0:n.length))return null;let a=null,r=-1;for(;++r<n.length;){const t=n[r]-e,l=Math.abs(t);(void 0===o||t*o>0)&&(null===a||l<a.distance)&&(a={index:r,distance:l,value:n[r]})}return a}function re(n){const o=t.value;if(!o)return;const a=A(n)?n.touches[0]:n,r=o.getBoundingClientRect();let l;return l=e.vertical?(r.bottom-a.clientY)/r.height:(a.clientX-r.left)/r.width,e.reverse&&(l=1-l),function(n){const{max:o,min:a}=e;return a+(o-a)*n}(l)}function te(n){const o=P.value;if(-1===o)return;const{step:a}=e,r=N.value[o];Z(ee(Number(a)<=0||"mark"===a?r:r+a*n,r,n>0?1:-1),o)}function le(){X.value&&(X.value=!1,e.onDragend&&$(e.onDragend),F("touchend",document,se),F("mouseup",document,se),F("touchmove",document,ie),F("mousemove",document,ie))}function ie(e){const{value:n}=P;if(!X.value||-1===n)return void le();const o=re(e);void 0!==o&&Z(ee(o,N.value[n]),n)}function se(){le()}g(P,((e,n)=>{M((()=>K.value=n))})),g(D,(()=>{if(e.marks){if(Y.value)return;Y.value=!0,M((()=>{Y.value=!1}))}M(G)})),x((()=>{le()}));const de=b((()=>{const{self:{markFontSize:e,railColor:n,railColorHover:o,fillColor:a,fillColorHover:t,handleColor:l,opacityDisabled:i,dotColor:s,dotColorModal:d,handleBoxShadow:c,handleBoxShadowHover:u,handleBoxShadowActive:h,handleBoxShadowFocus:v,dotBorder:f,dotBoxShadow:b,railHeight:p,railWidthVertical:m,handleSize:g,dotHeight:x,dotWidth:w,dotBorderRadius:k,fontSize:y,dotBorderActive:z,dotColorPopover:C},common:{cubicBezierEaseInOut:S}}=r.value;return{"--n-bezier":S,"--n-dot-border":f,"--n-dot-border-active":z,"--n-dot-border-radius":k,"--n-dot-box-shadow":b,"--n-dot-color":s,"--n-dot-color-modal":d,"--n-dot-color-popover":C,"--n-dot-height":x,"--n-dot-width":w,"--n-fill-color":a,"--n-fill-color-hover":t,"--n-font-size":y,"--n-handle-box-shadow":c,"--n-handle-box-shadow-active":h,"--n-handle-box-shadow-focus":v,"--n-handle-box-shadow-hover":u,"--n-handle-color":l,"--n-handle-size":g,"--n-opacity-disabled":i,"--n-rail-color":n,"--n-rail-color-hover":o,"--n-rail-height":p,"--n-rail-width-vertical":m,"--n-mark-font-size":e}})),ce=a?w("slider",void 0,de,e):void 0,ue=b((()=>{const{self:{fontSize:e,indicatorColor:n,indicatorBoxShadow:o,indicatorTextColor:a,indicatorBorderRadius:t}}=r.value;return{"--n-font-size":e,"--n-indicator-border-radius":t,"--n-indicator-box-shadow":o,"--n-indicator-color":n,"--n-indicator-text-color":a}})),he=a?w("slider-indicator",void 0,ue,e):void 0;return{mergedClsPrefix:n,namespace:o,uncontrolledValue:B,mergedValue:D,mergedDisabled:C,mergedPlacement:O,isMounted:k(),adjustedTo:y(e),dotTransitionDisabled:Y,markInfos:_,isShowTooltip:q,shouldKeepTooltipTransition:function(e){return!X.value||!(P.value===e&&K.value===e)},handleRailRef:t,setHandleRefs:i,setFollowerRefs:d,fillStyle:W,getHandleStyle:function(e,n){const o=oe(e),{value:a}=L;return{[a]:`${o}%`,zIndex:n===P.value?1:0}},activeIndex:P,arrifiedValues:N,followerEnabledIndexSet:c,handleRailMouseDown:function(n){var o,a;if(C.value)return;if(!A(n)&&0!==n.button)return;const r=re(n);if(void 0===r)return;const t=N.value.slice(),i=e.range?null!==(a=null===(o=ae(r,t))||void 0===o?void 0:o.index)&&void 0!==a?a:-1:0;-1!==i&&(n.preventDefault(),function(e){var n;~e&&(P.value=e,null===(n=l.get(e))||void 0===n||n.focus())}(i),X.value||(X.value=!0,e.onDragstart&&$(e.onDragstart),T("touchend",document,se),T("mouseup",document,se),T("touchmove",document,ie),T("mousemove",document,ie)),Z(ee(r,N.value[i]),i))},handleHandleFocus:function(e){P.value=e,C.value||(U.value=e)},handleHandleBlur:function(e){P.value===e&&(P.value=-1,le()),U.value===e&&(U.value=-1)},handleHandleMouseEnter:function(e){U.value=e},handleHandleMouseLeave:function(e){U.value===e&&(U.value=-1)},handleRailKeyDown:function(n){if(C.value||!e.keyboard)return;const{vertical:o,reverse:a}=e;switch(n.key){case"ArrowUp":n.preventDefault(),te(o&&a?-1:1);break;case"ArrowRight":n.preventDefault(),te(!o&&a?-1:1);break;case"ArrowDown":n.preventDefault(),te(o&&a?1:-1);break;case"ArrowLeft":n.preventDefault(),te(!o&&a?1:-1)}},indicatorCssVars:a?void 0:ue,indicatorThemeClass:null==he?void 0:he.themeClass,indicatorOnRender:null==he?void 0:he.onRender,cssVars:a?void 0:de,themeClass:null==ce?void 0:ce.themeClass,onRender:null==ce?void 0:ce.onRender}},render(){var e;const{mergedClsPrefix:n,themeClass:o,formatTooltip:a}=this;return null===(e=this.onRender)||void 0===e||e.call(this),z("div",{class:[`${n}-slider`,o,{[`${n}-slider--disabled`]:this.mergedDisabled,[`${n}-slider--active`]:-1!==this.activeIndex,[`${n}-slider--with-mark`]:this.marks,[`${n}-slider--vertical`]:this.vertical,[`${n}-slider--reverse`]:this.reverse}],style:this.cssVars,onKeydown:this.handleRailKeyDown,onMousedown:this.handleRailMouseDown,onTouchstart:this.handleRailMouseDown},z("div",{class:`${n}-slider-rail`},z("div",{class:`${n}-slider-rail__fill`,style:this.fillStyle}),this.marks?z("div",{class:[`${n}-slider-dots`,this.dotTransitionDisabled&&`${n}-slider-dots--transition-disabled`]},this.markInfos.map((e=>z("div",{key:e.label,class:[`${n}-slider-dot`,{[`${n}-slider-dot--active`]:e.active}],style:e.style})))):null,z("div",{ref:"handleRailRef",class:`${n}-slider-handles`},this.arrifiedValues.map(((e,o)=>{const r=this.isShowTooltip(o);return z(C,null,{default:()=>[z(S,null,{default:()=>z("div",{ref:this.setHandleRefs(o),class:`${n}-slider-handle-wrapper`,tabindex:this.mergedDisabled?-1:0,style:this.getHandleStyle(e,o),onFocus:()=>{this.handleHandleFocus(o)},onBlur:()=>{this.handleHandleBlur(o)},onMouseenter:()=>{this.handleHandleMouseEnter(o)},onMouseleave:()=>{this.handleHandleMouseLeave(o)}},B(this.$slots.thumb,(()=>[z("div",{class:`${n}-slider-handle`})])))}),this.tooltip&&z(R,{ref:this.setFollowerRefs(o),show:r,to:this.adjustedTo,enabled:this.showTooltip&&!this.range||this.followerEnabledIndexSet.has(o),teleportDisabled:this.adjustedTo===y.tdkey,placement:this.mergedPlacement,containerClass:this.namespace},{default:()=>z(D,{name:"fade-in-scale-up-transition",appear:this.isMounted,css:this.shouldKeepTooltipTransition(o),onEnter:()=>{this.followerEnabledIndexSet.add(o)},onAfterLeave:()=>{this.followerEnabledIndexSet.delete(o)}},{default:()=>{var o;return r?(null===(o=this.indicatorOnRender)||void 0===o||o.call(this),z("div",{class:[`${n}-slider-handle-indicator`,this.indicatorThemeClass,`${n}-slider-handle-indicator--${this.mergedPlacement}`],style:this.indicatorCssVars},"function"==typeof a?a(e):e)):null}})})]})}))),this.marks?z("div",{class:`${n}-slider-marks`},this.markInfos.map((e=>z("div",{key:e.label,class:`${n}-slider-mark`,style:e.style},e.label)))):null))}});export{N as _};
