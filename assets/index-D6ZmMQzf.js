import{d as i,bi as e,r as t,ct as l,cc as a,o as s,Z as d,U as n,g as o,t as h,a as u,b as v,c as p,f as c,X as m,cd as w,_ as g,by as b,M as r,w as _,v as x,i as f,S as y,cx as L,bN as k}from"./index-Djll9IJd.js";const z={class:"live2d-container"},j=["width","height"],D=g(i({__name:"Live2DWindow",props:{modelPath:{}},setup(i){const g=i,{modelPath:b}=e(g),r=t({width:320,height:480});l(b,(i=>{i&&x()}),{debounce:500});const _=t(!0),x=()=>{_.value=!0,setTimeout((()=>{_.value=!1,setTimeout((()=>{loadlive2d("live2d_canvas",b.value)}),0)}))};a("live2d/lib/live2d.min.js",(i=>{}));const f=w((i=>{r.value.width=Number(i.width.replace("px","")),r.value.height=Number(i.height.replace("px","")),x()}),100);return(i,e)=>(s(),d(m,{onResize:u(f),"init-win-options":{width:u(r).width+"px",height:u(r).height+"px"},"show-close":!1,class:"live2d-window",wid:"live2d_window_size","allow-maximum":""},{titleBarLeft:n((()=>[o(h(u(b))+" ("+h(u(r).width)+"x"+h(u(r).height)+") ",1)])),default:n((()=>[v("div",z,[u(_)?c("",!0):(s(),p("canvas",{key:0,width:u(r).width,height:u(r).height,id:"live2d_canvas"},null,8,j))])])),_:1},8,["onResize","init-win-options"]))}}),[["__scopeId","data-v-06b3bf56"]]),N={class:"live-2d-wrap"},R=k('<ul><li>备注</li><li>https://github.com/guansss/pixi-live2d-display</li><li>https://github.com/canwdev/live2d-vue-component</li><li>https://github.com/galnetwen/Live2D</li><li>https://github.com/imuncle/live2d</li><li>https://github.com/Eikanya/Live2d-model</li><li>https://guansss.github.io/live2d-viewer-web/</li><li> 点击页面报错可能是一些<a href="https://github.com/galnetwen/Live2D/issues/4" target="_blank">模型的问题</a></li><li>目前 live2d 实例加载后无法卸载，在对性能有要求的项目上谨慎使用。</li></ul>',1),U="/live2d/models/suzukaze_aoba/index.json",P=i({__name:"index",setup(i){const e=b("live2d_model_path",U);return r((()=>{})),(i,t)=>(s(),p("div",N,[v("ul",null,[v("li",null,[o(" 模型URL："),_(v("input",{"onUpdate:modelValue":t[0]||(t[0]=i=>f(e)?e.value=i:null),type:"text",class:"vp-input",style:{width:"75%"}},null,512),[[x,u(e)]]),v("button",{class:"vp-button",onClick:t[1]||(t[1]=i=>e.value=U)},"重置")])]),R,(s(),d(L,{to:".page-root"},[y(D,{"model-path":u(e)},null,8,["model-path"])]))]))}});export{P as default};
