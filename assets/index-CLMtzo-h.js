import{d as e,r as a,cs as t,c5 as s,D as l,$ as r,ct as i,o as c,c as h,b as v,a as n,_ as u}from"./index-DSBX7T2Q.js";const d=["src"],o=u(e({__name:"index",setup(e){const u=a(),o=a(),f=t(o),p=t(u),_=s({height:0,width:0}),g=a();l((()=>{(()=>{let e=0,a=2,t=0,s=2;clearInterval(g.value),g.value=setInterval((()=>{_.height=f.height.value-p.height.value,_.width=f.width.value-p.width.value,e+=a,e>=_.height&&(e=_.height,a=-a,u.value.classList.add("_reverse")),e<=0&&(a=-a,u.value.classList.remove("_reverse")),u.value.style.top=e+"px",t+=s,t>=_.width&&(t=_.width,s=-s),t<=0&&(s=-s),u.value.style.left=t+"px"}),10)})()})),r((()=>{clearInterval(g.value)}));const{getIconPath:w}=i();return(e,a)=>(c(),h("div",{ref_key:"rootRef",ref:o,class:"bouncy-ball-wrap"},[v("img",{ref_key:"ballRef",ref:u,src:n(w)("applications-internet")},null,8,d)],512))}}),[["__scopeId","data-v-18928cef"]]);export{o as default};
