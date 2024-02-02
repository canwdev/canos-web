import{aM as le,r as m,G as M,o as X,aI as Z,aE as b,aF as h,aG as c,b0 as z,aL as T,aK as Q,d as se,bh as L,c as N,j as oe,aR as re,aj as S,an as H,cj as ie,$ as O,aJ as A,aN as B}from"./index-49ca2576.js";import{a as ue}from"./axios-28bc18a3.js";import{u as W,a as ce}from"./use-local-storage-6b36f708.js";var C=(e=>(e[e.SEMITONE=12]="SEMITONE",e[e.KEY_COUNT=88]="KEY_COUNT",e))(C||{}),I=(e=>(e[e.HIDDEN=-1]="HIDDEN",e[e.WHITE=0]="WHITE",e[e.BLACK=1]="BLACK",e[e.CUSTOM=2]="CUSTOM",e))(I||{});const q=[{isMP3:!1,value:"sine",label:"正弦波(sine)"},{isMP3:!1,value:"square",label:"方波(square)"},{isMP3:!1,value:"sawtooth",label:"锯齿波(sawtooth)"},{isMP3:!1,value:"triangle",label:"三角波(triangle)"},{isMP3:!0,value:"pianoKeyAudio",label:"钢琴原声(LowRes)"},{isMP3:!0,value:"pianoKeyAudioFL",label:"钢琴原声(FL)"}],J=[{label:"A",type:0},{label:"W",type:1},{label:"S",type:0},{label:"E",type:1},{label:"D",type:0},{label:"F",type:0},{label:"T",type:1},{label:"G",type:0},{label:"Y",type:1},{label:"H",type:0},{label:"U",type:1},{label:"J",type:0},{label:"K",type:0},{label:"O",type:1},{label:"L",type:0},{label:"P",type:1},{label:";",type:0},{label:"'",type:0}],D=[{label:"Z",extraLabel:"﹣",type:2},{label:"X",extraLabel:"﹢",type:2},{label:"C",extraLabel:"﹣",type:2},{label:"V",extraLabel:"﹢",type:2}];[1,2,3,4,5,6,7].forEach(e=>{D.push({label:e.toString(),extraLabel:"",type:-1})});const de={props:{keyType:{type:Number,default:I.WHITE},label:{type:String,default:""},extraLabel:{type:String,default:""},active:{type:Boolean,default:!1},small:{type:Boolean,default:!1}},emits:["onPress","onRelease"],setup(e,{emit:d}){const{active:v}=le(e),r=m(),s=m(!1);M(v,t=>{s.value=t});const f=t=>{t.buttons===1&&(s.value||(d("onPress",r.value),s.value=!0))},i=()=>{s.value&&(d("onRelease",r.value),s.value=!1)};return X(()=>{const t=r.value;t.addEventListener("mousedown",f),t.addEventListener("mouseup",i),t.addEventListener("mouseover",f),t.addEventListener("mouseleave",i)}),{pressed:s,buttonRef:r}}};const ve={class:"inner"};function ye(e,d,v,r,s,f){return b(),h("button",{ref:"buttonRef",class:Q(["key",{black:v.keyType===1,custom:v.keyType===2,hidden:v.keyType===-1,pressed:r.pressed,small:v.small}])},[c("span",ve,[z(T(v.label)+" ",1),c("sub",null,T(v.extraLabel),1)])],2)}const pe=Z(de,[["render",ye],["__scopeId","data-v-56dda1d1"]]),be=ue.create({});function fe(e,d){return new Promise((v,r)=>{be.get(d,{responseType:"arraybuffer"}).then(s=>{e.decodeAudioData(s.data,f=>{f?v(f):r()})}).catch(s=>{r(s)})})}function me(){let e=[];for(let d=0;d<9;d++)e[d]=[];return e[0].A=27.5,e[0]["A#"]=29.13523509488062,e[0].B=30.867706328507754,e[1].C=32.70319566257483,e[1]["C#"]=34.64782887210901,e[1].D=36.70809598967595,e[1]["D#"]=38.890872965260115,e[1].E=41.20344461410874,e[1].F=43.653528929125486,e[1]["F#"]=46.2493028389543,e[1].G=48.99942949771866,e[1]["G#"]=51.91308719749314,e[1].A=55,e[1]["A#"]=58.27047018976124,e[1].B=61.735412657015516,e[2].C=65.40639132514966,e[2]["C#"]=69.29565774421802,e[2].D=73.4161919793519,e[2]["D#"]=77.78174593052023,e[2].E=82.40688922821748,e[2].F=87.30705785825097,e[2]["F#"]=92.4986056779086,e[2].G=97.99885899543732,e[2]["G#"]=103.82617439498628,e[2].A=110,e[2]["A#"]=116.54094037952248,e[2].B=123.47082531403103,e[3].C=130.8127826502993,e[3]["C#"]=138.59131548843604,e[3].D=146.8323839587038,e[3]["D#"]=155.56349186104046,e[3].E=164.81377845643496,e[3].F=174.61411571650194,e[3]["F#"]=184.9972113558172,e[3].G=195.99771799087463,e[3]["G#"]=207.65234878997256,e[3].A=220,e[3]["A#"]=233.08188075904496,e[3].B=246.94165062806206,e[4].C=261.6255653005986,e[4]["C#"]=277.1826309768721,e[4].D=293.6647679174076,e[4]["D#"]=311.1269837220809,e[4].E=329.6275569128699,e[4].F=349.2282314330039,e[4]["F#"]=369.9944227116344,e[4].G=391.99543598174927,e[4]["G#"]=415.3046975799451,e[4].A=440,e[4]["A#"]=466.1637615180899,e[4].B=493.8833012561241,e[5].C=523.2511306011972,e[5]["C#"]=554.3652619537442,e[5].D=587.3295358348151,e[5]["D#"]=622.2539674441618,e[5].E=659.2551138257398,e[5].F=698.4564628660078,e[5]["F#"]=739.9888454232688,e[5].G=783.9908719634985,e[5]["G#"]=830.6093951598903,e[5].A=880,e[5]["A#"]=932.3275230361799,e[5].B=987.7666025122483,e[6].C=1046.5022612023945,e[6]["C#"]=1108.7305239074883,e[6].D=1174.6590716696303,e[6]["D#"]=1244.5079348883237,e[6].E=1318.5102276514797,e[6].F=1396.9129257320155,e[6]["F#"]=1479.9776908465376,e[6].G=1567.981743926997,e[6]["G#"]=1661.2187903197805,e[6].A=1760,e[6]["A#"]=1864.6550460723597,e[6].B=1975.5332050244965,e[7].C=2093.004522404789,e[7]["C#"]=2217.4610478149766,e[7].D=2349.3181433392606,e[7]["D#"]=2489.0158697766474,e[7].E=2637.0204553029594,e[7].F=2793.825851464031,e[7]["F#"]=2959.955381693075,e[7].G=3135.963487853994,e[7]["G#"]=3322.437580639561,e[7].A=3520,e[7]["A#"]=3729.3100921447194,e[7].B=3951.066410048993,e[8].C=4186.009044809578,e}const F=me(),Te=se({name:"App",components:{PianoKey:pe},setup(){const e=m(),d=m(),v=m([]),r=L(),s=L(),f=L(),i=W("KEY_OFFSET",52),t=m([]),u=m([]),p=m([]),P=m(0),k=m(),E=W("VOLUME",1),_=ce("selectedToneType","sine");M(E,a=>{r.value.gain.value=a.toFixed(1)});const R=()=>{const a=v.value[j.value];a&&d.value.scrollTo({left:a.offsetLeft-50,behavior:"smooth"})};M(i,()=>{R()}),M(_,a=>{localStorage.setItem("selectedToneType",a),x(),G()});const K=N(()=>q.filter(a=>a.value===_.value)[0].isMP3||!1),G=async()=>{const a=window.AudioContext||window.webkitAudioContext||!1;if(a||alert("您的浏览器不支持 Web Audio API，程序无法正常运作"),s.value=new a,r.value=s.value.createGain(),r.value.gain.value=E.value,t.value=[],u.value=[],k.value=null,f.value=s.value.createAnalyser(),f.value.connect(s.value.destination),K.value)for(let n=1;n<=C.KEY_COUNT;n++)t.value[n]=await fe(s.value,`./tones/${_.value}/${n}.mp3`).catch(l=>{console.error(l)}),P.value=n;else{let n=1;F.forEach(l=>{Object.entries(l).forEach(([o,w])=>{t.value[n]=w,P.value=n,n++})})}window.addEventListener("keydown",g),window.addEventListener("keyup",g),R()},x=()=>{window.removeEventListener("keydown",g),window.removeEventListener("keyup",g),s.value=null},U=(a,n)=>{clearTimeout(k.value);let l=null;const y=s.value;K.value?(l=y.createBufferSource(),l.buffer=a):(l=y.createOscillator(),l.type=_.value,l.frequency.value=a);const o=y.createGain();return l.connect(o),K.value||(o.gain.exponentialRampToValueAtTime(1,y.currentTime),o.gain.exponentialRampToValueAtTime(1e-4,y.currentTime+1.5)),o.connect(r.value),r.value.connect(f.value),l.start(y.currentTime),u.value[n]={audio:l,gainNode:o},l},$=a=>{clearTimeout(k.value);const n=u.value[a];n?(n.gainNode.gain.exponentialRampToValueAtTime(1e-4,s.value.currentTime+1),k.value=setTimeout(()=>{n.audio.stop(),u.value[a]=null},1e3)):console.warn("stopTone: named tone not exist: "+a)},ee=a=>{const n=t.value[a];n?U(n,a):console.warn("handleMiniKeyboardPress: index tone not exist: "+a)},V=a=>{let n=a+i.value;const l=t.value[n];l?U(l,a):console.warn("[handleMainKeyboardPress]: index tone not exist: "+n+", The name is "+a)},g=a=>{const n=a.key.toUpperCase(),l=J.findIndex(o=>o.label===n),y=D.findIndex(o=>o.label===n);if(l!==-1||y!==-1){const o=p.value.indexOf(n);if(a.type==="keydown")if(o===-1)p.value.push(n);else return;else o!==-1&&p.value.splice(o,1)}l!==-1&&(a.type==="keydown"?V(l):$(l)),y!==-1&&a.type==="keyup"&&Y(n)},Y=a=>{switch(a){case"Z":i.value=Math.max(4,i.value-C.SEMITONE);break;case"X":i.value=Math.min(76,i.value+C.SEMITONE);break;case"C":E.value=Math.max(0,E.value-.1);break;case"V":E.value=Math.min(1,E.value+.1);break}/[1-9]/.test(a)&&(i.value=(Number(a)-1)*C.SEMITONE+4)};X(async()=>{"ontouchstart"in window&&alert("请使用鼠标或键盘输入"),await G()}),oe(()=>{x()});const j=N(()=>Math.floor(i.value/C.SEMITONE)+1),ae=N(()=>{let a=0,n=[];for(let l=0;l<F.length;l++){const y=Object.entries(F[l]);let o=[];for(let w=0;w<y.length;w++){const[te,ne]=y[w];o.push({label:te,value:ne,realIndex:a}),a++}n.push(o)}return n});return{rootRef:e,miniKeyboardRef:d,miniKeyboardOctavesRef:v,PianoConstant:C,KeyType:I,ToneTypesOptions:q,pianoNoteTable:F,MainKeyboardKeys:J,ControlKeys:D,loadingCount:P,keyOffset:i,keyPressedPC:p,octave:j,handleMainKeyboardPress:V,selectedToneType:_,volume:E,handleMiniKeyboardPress:ee,stopTone:$,setSettings:Y,miniKeys:ae}}});const he={ref:"rootRef",class:"piano-js-wrap"},Ee={class:"piano-loading"},Ce={class:"piano-body"},ke={class:"info-wrap"},Pe={class:"desc"},_e={class:"desc"},we={class:"desc pro"},Oe={class:"desc pro3"},Ae=["value","disabled"],ge={class:"mini-keyboard-wrap",ref:"miniKeyboardRef"},Fe={class:"main-keyboard-wrap"},Me={class:"control-wrap"};function Ke(e,d,v,r,s,f){const i=re("PianoKey");return b(),h("div",he,[S(c("div",Ee,[c("p",null,"加载音频素材 "+T(e.loadingCount)+"/"+T(e.PianoConstant.KEY_COUNT),1)],512),[[H,e.loadingCount+1<=e.PianoConstant.KEY_COUNT]]),c("div",Ce,[c("div",ke,[c("div",null,[c("div",Pe,"音量: "+T(Number(e.volume.toFixed(2))*100)+"%",1),c("div",_e,"偏移: "+T(e.keyOffset)+" / "+T(e.PianoConstant.KEY_COUNT),1),c("div",we,"八度音程: C"+T(e.octave),1),S(c("div",{class:"desc pro2"}," 按下: "+T(e.keyPressedPC.join(" ")),513),[[H,e.keyPressedPC.length>0]])]),c("div",Oe,[z(" 音色： "),S(c("select",{"onUpdate:modelValue":d[0]||(d[0]=t=>e.selectedToneType=t)},[(b(!0),h(O,null,A(e.ToneTypesOptions,(t,u)=>(b(),h("option",{key:u,value:t.value,disabled:t.isMP3},T(t.label),9,Ae))),128))],512),[[ie,e.selectedToneType]])])]),c("div",ge,[(b(!0),h(O,null,A(e.miniKeys,(t,u)=>(b(),h("div",{ref_for:!0,ref:"miniKeyboardOctavesRef",key:u,class:Q(["octave",{active:u===e.octave}])},[(b(!0),h(O,null,A(t,(p,P)=>(b(),B(i,{small:"",key:P,label:p.label,"extra-label":u.toString(),"key-type":p.label.length===1?e.KeyType.WHITE:e.KeyType.BLACK,onOnPress:k=>e.handleMiniKeyboardPress(p.realIndex+1),onOnRelease:k=>e.stopTone(p.realIndex+1)},null,8,["label","extra-label","key-type","onOnPress","onOnRelease"]))),128))],2))),128))],512),c("div",Fe,[(b(!0),h(O,null,A(e.MainKeyboardKeys,(t,u)=>(b(),B(i,{key:u,label:t.label,"key-type":t.type,active:e.keyPressedPC.indexOf(t.label)!==-1,onOnPress:p=>e.handleMainKeyboardPress(u),onOnRelease:p=>e.stopTone(u)},null,8,["label","key-type","active","onOnPress","onOnRelease"]))),128))]),c("div",Me,[(b(!0),h(O,null,A(e.ControlKeys,(t,u)=>(b(),B(i,{key:u,label:t.label,"key-type":t.type,"extra-label":t.extraLabel,active:e.keyPressedPC.indexOf(t.label)!==-1,onOnPress:p=>e.setSettings(t.label)},null,8,["label","key-type","extra-label","active","onOnPress"]))),128))])])],512)}const Be=Z(Te,[["render",Ke],["__scopeId","data-v-ca4b928c"]]);export{Be as default};
