import{d as e,ah as l,r as t,l as a,o as s,c as i,k as o,a as n,h as u,m as p,C as c,j as d,B as r,g as v,R as m,_}from"./index-Ch1CAwop.js";import{_ as h}from"./index.vue_vue_type_style_index_0_lang-B6do1Ahd.js";const f={class:"file-selector"},F=_(e({__name:"FileSelector",props:{selectFileMode:{default:"file"},multiple:{type:Boolean,default:!1},showButton:{type:Boolean,default:!0}},emits:["handleSelect"],setup(e,{expose:_,emit:F}){const w=e,x=F,{selectFileMode:y,multiple:S}=l(w),b=t(!1),B=e=>{b.value=!1,x("handleSelect",e)},k=a((()=>"file"===y.value?S.value?"Open Files...":"Open File...":"Open Folder..."));return _({isShowFileSelectWindow:b,show(){b.value=!0},close(){b.value=!1}}),(e,l)=>(s(),i("div",f,[e.showButton?(s(),i("button",{key:0,class:"vp-button primary",onClick:l[0]||(l[0]=e=>b.value=!0)},o(n(k)),1)):u("",!0),p(m,{visible:n(b),"onUpdate:visible":l[2]||(l[2]=e=>v(b)?b.value=e:null),"init-center":"","init-win-options":{width:"500px",height:"500px"}},{titleBarLeft:c((()=>[d(o(n(k)),1)])),default:c((()=>[n(b)?(s(),r(h,{key:0,selectFileMode:n(y),multiple:n(S),onCancelSelect:l[1]||(l[1]=e=>b.value=!1),onHandleSelect:B},null,8,["selectFileMode","multiple"])):u("",!0)])),_:1},8,["visible"])]))}}),[["__scopeId","data-v-b9a3eca1"]]);export{F};