import{r as P,G as de,bx as _e,by as Ie,bz as Ke,j as Ce,a9 as W,bA as Oe,a8 as q,d as B,h as u,W as le,w as F,bB as he,c as y,I as G,e as J,T as $e,m as be,A as Q,aS as ze,ae as Be,$ as De,bC as Ae,bD as Te,bE as Fe,k as _,D as je,q as M,C as ue,B as K,l as z,E as C,s as Ee,t as me,X as re,y as T,z as Le,bF as Me,bG as Ge,aH as He,aI as Ue,aE as Ve,aF as We,aG as ce,aP as X,aO as ie,b1 as pe,b9 as qe,al as Xe}from"./index-362206a9.js";import{V as Je,h as Qe,j as Ye,r as Ze,f as eo,_ as oo,p as we,e as no}from"./Input-6da7108d.js";import{C as to,h as fe,a as ro}from"./create-3595cc5c.js";import"./use-compitable-95c2111f.js";function io(e){return o=>{o?e.value=o.$el:e.value=null}}function ao(e,o,i){if(!o)return e;const r=P(e.value);let t=null;return de(e,n=>{t!==null&&window.clearTimeout(t),n===!0?i&&!i.value?r.value=!0:t=window.setTimeout(()=>{r.value=!0},o):r.value=!1}),r}function lo(e={},o){const i=_e({ctrl:!1,command:!1,win:!1,shift:!1,tab:!1}),{keydown:r,keyup:t}=e,n=a=>{switch(a.key){case"Control":i.ctrl=!0;break;case"Meta":i.command=!0,i.win=!0;break;case"Shift":i.shift=!0;break;case"Tab":i.tab=!0;break}r!==void 0&&Object.keys(r).forEach(v=>{if(v!==a.key)return;const h=r[v];if(typeof h=="function")h(a);else{const{stop:x=!1,prevent:S=!1}=h;x&&a.stopPropagation(),S&&a.preventDefault(),h.handler(a)}})},l=a=>{switch(a.key){case"Control":i.ctrl=!1;break;case"Meta":i.command=!1,i.win=!1;break;case"Shift":i.shift=!1;break;case"Tab":i.tab=!1;break}t!==void 0&&Object.keys(t).forEach(v=>{if(v!==a.key)return;const h=t[v];if(typeof h=="function")h(a);else{const{stop:x=!1,prevent:S=!1}=h;x&&a.stopPropagation(),S&&a.preventDefault(),h.handler(a)}})},c=()=>{(o===void 0||o.value)&&(q("keydown",document,n),q("keyup",document,l)),o!==void 0&&de(o,a=>{a?(q("keydown",document,n),q("keyup",document,l)):(W("keydown",document,n),W("keyup",document,l))})};return Ie()?(Ke(c),Ce(()=>{(o===void 0||o.value)&&(W("keydown",document,n),W("keyup",document,l))})):c(),Oe(i)}const ye=B({name:"DropdownDivider",props:{clsPrefix:{type:String,required:!0}},render(){return u("div",{class:`${this.clsPrefix}-dropdown-divider`})}}),se=le("n-dropdown-menu"),Y=le("n-dropdown"),ve=le("n-dropdown-option");function ae(e,o){return e.type==="submenu"||e.type===void 0&&e[o]!==void 0}function so(e){return e.type==="group"}function ge(e){return e.type==="divider"}function uo(e){return e.type==="render"}const xe=B({name:"DropdownOption",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:"right-start"},props:Object,scrollable:Boolean},setup(e){const o=F(Y),{hoverKeyRef:i,keyboardKeyRef:r,lastToggledSubmenuKeyRef:t,pendingKeyPathRef:n,activeKeyPathRef:l,animatedRef:c,mergedShowRef:a,renderLabelRef:v,renderIconRef:h,labelFieldRef:x,childrenFieldRef:S,renderOptionRef:R,nodePropsRef:g,menuPropsRef:j}=o,k=F(ve,null),O=F(se),H=F(he),Z=y(()=>e.tmNode.rawNode),U=y(()=>{const{value:s}=S;return ae(e.tmNode.rawNode,s)}),ee=y(()=>{const{disabled:s}=e.tmNode;return s}),oe=y(()=>{if(!U.value)return!1;const{key:s,disabled:w}=e.tmNode;if(w)return!1;const{value:I}=i,{value:D}=r,{value:te}=t,{value:A}=n;return I!==null?A.includes(s):D!==null?A.includes(s)&&A[A.length-1]!==s:te!==null?A.includes(s):!1}),ne=y(()=>r.value===null&&!c.value),V=ao(oe,300,ne),E=y(()=>!!(k!=null&&k.enteringSubmenuRef.value)),L=P(!1);G(ve,{enteringSubmenuRef:L});function $(){L.value=!0}function d(){L.value=!1}function m(){const{parentKey:s,tmNode:w}=e;w.disabled||a.value&&(t.value=s,r.value=null,i.value=w.key)}function f(){const{tmNode:s}=e;s.disabled||a.value&&i.value!==s.key&&m()}function p(s){if(e.tmNode.disabled||!a.value)return;const{relatedTarget:w}=s;w&&!fe({target:w},"dropdownOption")&&!fe({target:w},"scrollbarRail")&&(i.value=null)}function N(){const{value:s}=U,{tmNode:w}=e;a.value&&!s&&!w.disabled&&(o.doSelect(w.key,w.rawNode),o.doUpdateShow(!1))}return{labelField:x,renderLabel:v,renderIcon:h,siblingHasIcon:O.showIconRef,siblingHasSubmenu:O.hasSubmenuRef,menuProps:j,popoverBody:H,animated:c,mergedShowSubmenu:y(()=>V.value&&!E.value),rawNode:Z,hasSubmenu:U,pending:J(()=>{const{value:s}=n,{key:w}=e.tmNode;return s.includes(w)}),childActive:J(()=>{const{value:s}=l,{key:w}=e.tmNode,I=s.findIndex(D=>w===D);return I===-1?!1:I<s.length-1}),active:J(()=>{const{value:s}=l,{key:w}=e.tmNode,I=s.findIndex(D=>w===D);return I===-1?!1:I===s.length-1}),mergedDisabled:ee,renderOption:R,nodeProps:g,handleClick:N,handleMouseMove:f,handleMouseEnter:m,handleMouseLeave:p,handleSubmenuBeforeEnter:$,handleSubmenuAfterEnter:d}},render(){var e,o;const{animated:i,rawNode:r,mergedShowSubmenu:t,clsPrefix:n,siblingHasIcon:l,siblingHasSubmenu:c,renderLabel:a,renderIcon:v,renderOption:h,nodeProps:x,props:S,scrollable:R}=this;let g=null;if(t){const H=(e=this.menuProps)===null||e===void 0?void 0:e.call(this,r,r.children);g=u(Se,Object.assign({},H,{clsPrefix:n,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}))}const j={class:[`${n}-dropdown-option-body`,this.pending&&`${n}-dropdown-option-body--pending`,this.active&&`${n}-dropdown-option-body--active`,this.childActive&&`${n}-dropdown-option-body--child-active`,this.mergedDisabled&&`${n}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},k=x==null?void 0:x(r),O=u("div",Object.assign({class:[`${n}-dropdown-option`,k==null?void 0:k.class],"data-dropdown-option":!0},k),u("div",be(j,S),[u("div",{class:[`${n}-dropdown-option-body__prefix`,l&&`${n}-dropdown-option-body__prefix--show-icon`]},[v?v(r):Q(r.icon)]),u("div",{"data-dropdown-option":!0,class:`${n}-dropdown-option-body__label`},a?a(r):Q((o=r[this.labelField])!==null&&o!==void 0?o:r.title)),u("div",{"data-dropdown-option":!0,class:[`${n}-dropdown-option-body__suffix`,c&&`${n}-dropdown-option-body__suffix--has-submenu`]},this.hasSubmenu?u(ze,null,{default:()=>u(to,null)}):null)]),this.hasSubmenu?u(Je,null,{default:()=>[u(Qe,null,{default:()=>u("div",{class:`${n}-dropdown-offset-container`},u(Ye,{show:this.mergedShowSubmenu,placement:this.placement,to:R&&this.popoverBody||void 0,teleportDisabled:!R},{default:()=>u("div",{class:`${n}-dropdown-menu-wrapper`},i?u($e,{onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:"fade-in-scale-up-transition",appear:!0},{default:()=>g}):g)}))})]}):null);return h?h({node:O,option:r}):O}}),co=B({name:"DropdownGroupHeader",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){const{showIconRef:e,hasSubmenuRef:o}=F(se),{renderLabelRef:i,labelFieldRef:r,nodePropsRef:t,renderOptionRef:n}=F(Y);return{labelField:r,showIcon:e,hasSubmenu:o,renderLabel:i,nodeProps:t,renderOption:n}},render(){var e;const{clsPrefix:o,hasSubmenu:i,showIcon:r,nodeProps:t,renderLabel:n,renderOption:l}=this,{rawNode:c}=this.tmNode,a=u("div",Object.assign({class:`${o}-dropdown-option`},t==null?void 0:t(c)),u("div",{class:`${o}-dropdown-option-body ${o}-dropdown-option-body--group`},u("div",{"data-dropdown-option":!0,class:[`${o}-dropdown-option-body__prefix`,r&&`${o}-dropdown-option-body__prefix--show-icon`]},Q(c.icon)),u("div",{class:`${o}-dropdown-option-body__label`,"data-dropdown-option":!0},n?n(c):Q((e=c.title)!==null&&e!==void 0?e:c[this.labelField])),u("div",{class:[`${o}-dropdown-option-body__suffix`,i&&`${o}-dropdown-option-body__suffix--has-submenu`],"data-dropdown-option":!0})));return l?l({node:a,option:c}):a}}),po=B({name:"NDropdownGroup",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){const{tmNode:e,parentKey:o,clsPrefix:i}=this,{children:r}=e;return u(De,null,u(co,{clsPrefix:i,tmNode:e,key:e.key}),r==null?void 0:r.map(t=>{const{rawNode:n}=t;return n.show===!1?null:ge(n)?u(ye,{clsPrefix:i,key:t.key}):t.isGroup?(Be("dropdown","`group` node is not allowed to be put in `group` node."),null):u(xe,{clsPrefix:i,tmNode:t,parentKey:o,key:t.key})}))}}),fo=B({name:"DropdownRenderOption",props:{tmNode:{type:Object,required:!0}},render(){const{rawNode:{render:e,props:o}}=this.tmNode;return u("div",o,[e==null?void 0:e()])}}),Se=B({name:"DropdownMenu",props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){const{renderIconRef:o,childrenFieldRef:i}=F(Y);G(se,{showIconRef:y(()=>{const t=o.value;return e.tmNodes.some(n=>{var l;if(n.isGroup)return(l=n.children)===null||l===void 0?void 0:l.some(({rawNode:a})=>t?t(a):a.icon);const{rawNode:c}=n;return t?t(c):c.icon})}),hasSubmenuRef:y(()=>{const{value:t}=i;return e.tmNodes.some(n=>{var l;if(n.isGroup)return(l=n.children)===null||l===void 0?void 0:l.some(({rawNode:a})=>ae(a,t));const{rawNode:c}=n;return ae(c,t)})})});const r=P(null);return G(Ae,null),G(Te,null),G(he,r),{bodyRef:r}},render(){const{parentKey:e,clsPrefix:o,scrollable:i}=this,r=this.tmNodes.map(t=>{const{rawNode:n}=t;return n.show===!1?null:uo(n)?u(fo,{tmNode:t,key:t.key}):ge(n)?u(ye,{clsPrefix:o,key:t.key}):so(n)?u(po,{clsPrefix:o,tmNode:t,parentKey:e,key:t.key}):u(xe,{clsPrefix:o,tmNode:t,parentKey:e,key:t.key,props:n.props,scrollable:i})});return u("div",{class:[`${o}-dropdown-menu`,i&&`${o}-dropdown-menu--scrollable`],ref:"bodyRef"},i?u(Fe,{contentClass:`${o}-dropdown-menu__content`},{default:()=>r}):r,this.showArrow?Ze({clsPrefix:o,arrowStyle:this.arrowStyle}):null)}}),vo=_("dropdown-menu",`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[je(),_("dropdown-option",`
 position: relative;
 `,[M("a",`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[M("&::before",`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),_("dropdown-option-body",`
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `,[M("&::before",`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `),ue("disabled",[K("pending",`
 color: var(--n-option-text-color-hover);
 `,[z("prefix, suffix",`
 color: var(--n-option-text-color-hover);
 `),M("&::before","background-color: var(--n-option-color-hover);")]),K("active",`
 color: var(--n-option-text-color-active);
 `,[z("prefix, suffix",`
 color: var(--n-option-text-color-active);
 `),M("&::before","background-color: var(--n-option-color-active);")]),K("child-active",`
 color: var(--n-option-text-color-child-active);
 `,[z("prefix, suffix",`
 color: var(--n-option-text-color-child-active);
 `)])]),K("disabled",`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),K("group",`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[z("prefix",`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[K("show-icon",`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),z("prefix",`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[K("show-icon",`
 width: var(--n-option-icon-prefix-width);
 `),_("icon",`
 font-size: var(--n-option-icon-size);
 `)]),z("label",`
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `),z("suffix",`
 box-sizing: border-box;
 flex-grow: 0;
 flex-shrink: 0;
 display: flex;
 justify-content: flex-end;
 align-items: center;
 min-width: var(--n-option-suffix-width);
 padding: 0 8px;
 transition: color .3s var(--n-bezier);
 color: var(--n-suffix-color);
 z-index: 1;
 `,[K("has-submenu",`
 width: var(--n-option-icon-suffix-width);
 `),_("icon",`
 font-size: var(--n-option-icon-size);
 `)]),_("dropdown-menu","pointer-events: all;")]),_("dropdown-offset-container",`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]),_("dropdown-divider",`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `),_("dropdown-menu-wrapper",`
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `),M(">",[_("scrollbar",`
 height: inherit;
 max-height: inherit;
 `)]),ue("scrollable",`
 padding: var(--n-padding);
 `),K("scrollable",[z("content",`
 padding: var(--n-padding);
 `)])]),ho={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:{type:String,default:"medium"},inverted:Boolean,placement:{type:String,default:"bottom"},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:"label"},keyField:{type:String,default:"key"},childrenField:{type:String,default:"children"},value:[String,Number]},bo=Object.keys(we),mo=Object.assign(Object.assign(Object.assign({},we),ho),me.props),wo=B({name:"Dropdown",inheritAttrs:!1,props:mo,setup(e){const o=P(!1),i=eo(C(e,"show"),o),r=y(()=>{const{keyField:d,childrenField:m}=e;return ro(e.options,{getKey(f){return f[d]},getDisabled(f){return f.disabled===!0},getIgnored(f){return f.type==="divider"||f.type==="render"},getChildren(f){return f[m]}})}),t=y(()=>r.value.treeNodes),n=P(null),l=P(null),c=P(null),a=y(()=>{var d,m,f;return(f=(m=(d=n.value)!==null&&d!==void 0?d:l.value)!==null&&m!==void 0?m:c.value)!==null&&f!==void 0?f:null}),v=y(()=>r.value.getPath(a.value).keyPath),h=y(()=>r.value.getPath(e.value).keyPath),x=J(()=>e.keyboard&&i.value);lo({keydown:{ArrowUp:{prevent:!0,handler:ee},ArrowRight:{prevent:!0,handler:U},ArrowDown:{prevent:!0,handler:oe},ArrowLeft:{prevent:!0,handler:Z},Enter:{prevent:!0,handler:ne},Escape:H}},x);const{mergedClsPrefixRef:S,inlineThemeDisabled:R}=Ee(e),g=me("Dropdown","-dropdown",vo,Ge,e,S);G(Y,{labelFieldRef:C(e,"labelField"),childrenFieldRef:C(e,"childrenField"),renderLabelRef:C(e,"renderLabel"),renderIconRef:C(e,"renderIcon"),hoverKeyRef:n,keyboardKeyRef:l,lastToggledSubmenuKeyRef:c,pendingKeyPathRef:v,activeKeyPathRef:h,animatedRef:C(e,"animated"),mergedShowRef:i,nodePropsRef:C(e,"nodeProps"),renderOptionRef:C(e,"renderOption"),menuPropsRef:C(e,"menuProps"),doSelect:j,doUpdateShow:k}),de(i,d=>{!e.animated&&!d&&O()});function j(d,m){const{onSelect:f}=e;f&&re(f,d,m)}function k(d){const{"onUpdate:show":m,onUpdateShow:f}=e;m&&re(m,d),f&&re(f,d),o.value=d}function O(){n.value=null,l.value=null,c.value=null}function H(){k(!1)}function Z(){E("left")}function U(){E("right")}function ee(){E("up")}function oe(){E("down")}function ne(){const d=V();d!=null&&d.isLeaf&&i.value&&(j(d.key,d.rawNode),k(!1))}function V(){var d;const{value:m}=r,{value:f}=a;return!m||f===null?null:(d=m.getNode(f))!==null&&d!==void 0?d:null}function E(d){const{value:m}=a,{value:{getFirstAvailableNode:f}}=r;let p=null;if(m===null){const N=f();N!==null&&(p=N.key)}else{const N=V();if(N){let s;switch(d){case"down":s=N.getNext();break;case"up":s=N.getPrev();break;case"right":s=N.getChild();break;case"left":s=N.getParent();break}s&&(p=s.key)}}p!==null&&(n.value=null,l.value=p)}const L=y(()=>{const{size:d,inverted:m}=e,{common:{cubicBezierEaseInOut:f},self:p}=g.value,{padding:N,dividerColor:s,borderRadius:w,optionOpacityDisabled:I,[T("optionIconSuffixWidth",d)]:D,[T("optionSuffixWidth",d)]:te,[T("optionIconPrefixWidth",d)]:A,[T("optionPrefixWidth",d)]:ke,[T("fontSize",d)]:Ne,[T("optionHeight",d)]:Pe,[T("optionIconSize",d)]:Re}=p,b={"--n-bezier":f,"--n-font-size":Ne,"--n-padding":N,"--n-border-radius":w,"--n-option-height":Pe,"--n-option-prefix-width":ke,"--n-option-icon-prefix-width":A,"--n-option-suffix-width":te,"--n-option-icon-suffix-width":D,"--n-option-icon-size":Re,"--n-divider-color":s,"--n-option-opacity-disabled":I};return m?(b["--n-color"]=p.colorInverted,b["--n-option-color-hover"]=p.optionColorHoverInverted,b["--n-option-color-active"]=p.optionColorActiveInverted,b["--n-option-text-color"]=p.optionTextColorInverted,b["--n-option-text-color-hover"]=p.optionTextColorHoverInverted,b["--n-option-text-color-active"]=p.optionTextColorActiveInverted,b["--n-option-text-color-child-active"]=p.optionTextColorChildActiveInverted,b["--n-prefix-color"]=p.prefixColorInverted,b["--n-suffix-color"]=p.suffixColorInverted,b["--n-group-header-text-color"]=p.groupHeaderTextColorInverted):(b["--n-color"]=p.color,b["--n-option-color-hover"]=p.optionColorHover,b["--n-option-color-active"]=p.optionColorActive,b["--n-option-text-color"]=p.optionTextColor,b["--n-option-text-color-hover"]=p.optionTextColorHover,b["--n-option-text-color-active"]=p.optionTextColorActive,b["--n-option-text-color-child-active"]=p.optionTextColorChildActive,b["--n-prefix-color"]=p.prefixColor,b["--n-suffix-color"]=p.suffixColor,b["--n-group-header-text-color"]=p.groupHeaderTextColor),b}),$=R?Le("dropdown",y(()=>`${e.size[0]}${e.inverted?"i":""}`),L,e):void 0;return{mergedClsPrefix:S,mergedTheme:g,tmNodes:t,mergedShow:i,handleAfterLeave:()=>{e.animated&&O()},doUpdateShow:k,cssVars:R?void 0:L,themeClass:$==null?void 0:$.themeClass,onRender:$==null?void 0:$.onRender}},render(){const e=(r,t,n,l,c)=>{var a;const{mergedClsPrefix:v,menuProps:h}=this;(a=this.onRender)===null||a===void 0||a.call(this);const x=(h==null?void 0:h(void 0,this.tmNodes.map(R=>R.rawNode)))||{},S={ref:io(t),class:[r,`${v}-dropdown`,this.themeClass],clsPrefix:v,tmNodes:this.tmNodes,style:[n,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:l,onMouseleave:c};return u(Se,be(this.$attrs,S,x))},{mergedTheme:o}=this,i={show:this.mergedShow,theme:o.peers.Popover,themeOverrides:o.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return u(oo,Object.assign({},Me(this.$props,bo),i),{trigger:()=>{var r,t;return(t=(r=this.$slots).default)===null||t===void 0?void 0:t.call(r)}})}}),yo=B({name:"IframeBrowser",props:{visible:{type:Boolean,default:!1}},setup(e,{emit:o}){const i=He(e,o,"visible"),r=P(!1),t=P(!1),n=P(),l=P(""),c=P(""),a=y(()=>t.value?"(Loading...)":""),v=()=>{l.value="",l.value=c.value,t.value=!0},h=()=>{t.value=!1},x=g=>{t.value=!1,console.error("[handleIframeError]",g)},S=y(()=>[{label:"Google",value:"https://www.google.com/webhp?igu=1"},{label:"Bing",value:"https://www.bing.com"},{label:"Win11React",value:"https://win11.blueedge.me/"},{label:"Grid Layout it",value:"https://grid.layoutit.com/"},{label:"Can I use",value:"https://caniuse.com/"},{label:"CSS Gradient Generator",value:"https://www.colorzilla.com/gradient-editor/"},{label:"CSS clip-path maker",value:"https://bennettfeely.com/clippy/"},{label:"JSON Editor Online",value:"https://jsoneditoronline.org/"},{label:"在线工具 tool.lu",value:"https://tool.lu/"},{label:"二维码生成 cli.im",value:"https://cli.im/"}].map(g=>({label:"🌎 "+(g.label||g.value),value:g.value})));return{mVisible:i,iframeRef:n,iframeSrc:l,addressBarUrl:c,isMaximum:r,handleGo:v,handleIframeLoad:h,handleIframeError:x,titleText:a,shortcutList:S,handleSelectShortcut:g=>{c.value=g,v()}}}});const go={class:"iframe-browser-inner-wrap"},xo={class:"iframe-browser-address-bar-wrap"},So=["src"];function ko(e,o,i,r,t,n){const l=Xe,c=wo,a=no;return Ve(),We("div",go,[ce("div",xo,[X(c,{options:e.shortcutList,"key-field":"value",size:"small",placement:"bottom-start",onSelect:e.handleSelectShortcut},{default:ie(()=>[X(l,{size:"tiny"},{default:ie(()=>[pe("@")]),_:1})]),_:1},8,["options","onSelect"]),X(a,{class:"iframe-browser-input font-code",size:"tiny",value:e.addressBarUrl,"onUpdate:value":o[0]||(o[0]=v=>e.addressBarUrl=v),placeholder:"input url (https://)",type:"text",onKeyup:o[1]||(o[1]=qe(v=>e.handleGo(),["enter"]))},null,8,["value"]),X(l,{size:"tiny",onClick:o[2]||(o[2]=v=>e.handleGo())},{default:ie(()=>[pe("Go")]),_:1})]),ce("iframe",{ref:"iframeRef",onLoad:o[3]||(o[3]=(...v)=>e.handleIframeLoad&&e.handleIframeLoad(...v)),onError:o[4]||(o[4]=(...v)=>e.handleIframeError&&e.handleIframeError(...v)),class:"iframe-browser-inner-iframe",src:e.iframeSrc,frameborder:"0"},null,40,So)])}const Io=Ue(yo,[["render",ko],["__scopeId","data-v-eed93dbd"]]);export{Io as default};
