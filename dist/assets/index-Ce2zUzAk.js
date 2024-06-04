import{_ as W,b as G,r as i,d as R,e as K,a0 as Q,a1 as X,h as c,o as x,c as I,i as t,j as r,k as S,a2 as q,x as _,n as g,t as m,F as Y,q as Z,O as ee,W as y,J as ae}from"./index-BP30Yz_m.js";import{S as se,e as oe,o as te,p as A}from"./index-BLWGdF-D.js";import"./index-BZLRhA_T.js";import"./verify-D2E6NcQX.js";const le={class:"fullpage"},ne={class:"onekey"},re={class:"progress-label"},de={class:"progress-label"},ue={class:"progress-label"},ce=Object.assign({name:"CallRaab"},{__name:"index",setup(pe){const{t:v}=G(),k=i(!1),V=i(null),d=i({userId:R().id,areaType:2,startCode:"HAI-011-025-06_1",endCode:"HAI-001-001-03_1"}),B=K({startCode:[{required:!0,message:v("required")}],endCode:[{required:!0,message:v("required")}]}),p=i([]),h=i(),u=i([]),D=async()=>{var a;await V.value.validate();const{data:e}=await oe(d.value).catch(()=>{d.value.startCode="",d.value.endCode=""});if(e&&Array.isArray(e)){if(((a=e[0])==null?void 0:a.taskStatus)==="failed"){y({message:v("task")+v("failed"),type:"error"});return}y({message:v("task")+v("success"),type:"success"})}p.value.length===0?await T(e):await T(p.value.concat(e)),U()},L=async e=>{await te({userId:R().id,areaType:1,taskType:e,workstationCode:"002"});const a=[{taskCode:"TaskCode-20240530-0096",taskType:"空托补位",startLocation:"1040000001",endLocation:"工作位A",taskStatus:"executing"},{taskCode:"TaskCode-20240530-0093",taskType:"空托补位",startLocation:"1040000003",endLocation:"工作位B",taskStatus:"executing"},{taskCode:"TaskCode-20240530-0106",taskType:"空托补位",startLocation:"1040000003",endLocation:"工作位B",taskStatus:"executing"}],l=await A({userId:"1800479800323735552",codes:"TaskCode-20240530-0096,TaskCode-20240530-0093,TaskCode-20240530-0106"});console.log(E.value,555),p.value=a.map(o=>{const n=l.data.find(w=>w.taskCode===o.taskCode);return console.log(n,588),n&&(o.progress=[0,C.get(n.eventType)],o.eventType=n.eventType,o.taskStatus=n.taskStatus),o}),U(),await T(a),y({message:v("Success"),type:"success"})};let f=null;const E=i([]),T=async e=>{f&&clearInterval(f),f=setInterval(async()=>{const{data:a}=await A({userId:"1800479800323735552",codes:"TaskCode-20240530-0096,TaskCode-20240530-0093,TaskCode-20240530-0106"});p.value=e.map(l=>{const o=a.find(n=>n.taskCode===l.taskCode);return o&&(l.progress=[0,C.get(o.eventType)],l.eventType=o.eventType,l.taskStatus=o.taskStatus),l})},3e3)},$=i({0:"任务开始",33:"到达起点(取得容器)",66:"到达终点(放下容器)",100:"任务完成"}),C=new Map([["task_allocated",0],["tote_load",33],["tote_unload",66],["task",100]]),M=new Map([["task_allocated",16.5],["tote_load",49.5],["tote_unload",82.5],["task",100]]),U=()=>{u.value.forEach(clearInterval),u.value=[],console.log(p.value,555),p.value.forEach((e,a)=>{if(e.taskStatus!=="failed"){const l=setInterval(async()=>{const o=C.get(e.eventType),n=M.get(e.eventType);e.progress[1]<n?(e.progress[1]=(e.progress[1]+1)%n,await ae()):(console.log(e.progress[1],789),e.progress[1]=o,clearInterval(l))},100);u.value[a]=l,e.progress=[0,C.get(e.eventType)]}else e.progress=[0,M.get(e.eventType)]})},F=e=>{y(`click on item ${e}`),L(e)},N=async e=>{k.value=!1,d.value.startCode?d.value.endCode=e.locationCode:d.value.startCode=e.locationCode},O=async()=>{await h.value.resetForm()};return Q(()=>{f&&clearInterval(f),u.value&&(u.value.forEach(clearInterval),u.value=[])}),X(()=>{f&&clearInterval(f),u.value&&(u.value.forEach(clearInterval),u.value=[])}),(e,a)=>{const l=c("el-input"),o=c("el-form-item"),n=c("el-button"),w=c("el-form"),b=c("el-dropdown-item"),j=c("el-dropdown-menu"),H=c("el-dropdown"),z=c("el-slider"),J=c("el-dialog");return x(),I("div",le,[t(w,{class:"form",ref_key:"formRef",ref:V,model:d.value,rules:S(B),inline:""},{default:r(()=>[t(o,{label:"startCode",prop:"startCode"},{default:r(()=>[t(l,{modelValue:d.value.startCode,"onUpdate:modelValue":a[0]||(a[0]=s=>d.value.startCode=s),placeholder:" ",onClick:a[1]||(a[1]=s=>k.value=!0),readonly:"",clearable:"","prefix-icon":S(q)},null,8,["modelValue","prefix-icon"])]),_:1}),t(o,{label:"endCode",prop:"endCode"},{default:r(()=>[t(l,{modelValue:d.value.endCode,"onUpdate:modelValue":a[2]||(a[2]=s=>d.value.endCode=s),placeholder:" ",onClick:a[3]||(a[3]=s=>k.value=!0),readonly:"",clearable:"","prefix-icon":S(q)},null,8,["modelValue","prefix-icon"])]),_:1}),t(o,null,{default:r(()=>[t(n,{type:"primary",onClick:D},{default:r(()=>[_("执行")]),_:1})]),_:1})]),_:1},8,["model","rules"]),g("div",ne,[t(H,{"split-button":"",type:"primary",placement:"bottom-end",onClick:a[4]||(a[4]=s=>L(0)),onCommand:F},{dropdown:r(()=>[t(j,null,{default:r(()=>[t(b,{command:"a"},{default:r(()=>[_("空托盘补位")]),_:1}),t(b,{command:"b"},{default:r(()=>[_("空托盘回库")]),_:1}),t(b,{command:"c"},{default:r(()=>[_("满料托盘回库")]),_:1})]),_:1})]),default:r(()=>[_(" 一键呼叫 ")]),_:1})]),_(" "+m(E.value)+" "+m(p.value)+" ",1),(x(!0),I(Y,null,Z(p.value,s=>(x(),I("div",{class:"progress",key:s.taskCode},[g("div",re,m(s.taskType),1),g("div",de,m(s.startLocation),1),g("div",{class:ee(["progress-slider",{"progress-error":s.taskStatus!=="success"}])},[_(m(s.progress)+" ",1),t(z,{modelValue:s.progress,"onUpdate:modelValue":P=>s.progress=P,"show-tooltip":!1,min:0,max:100,range:"",marks:$.value,disabled:s.taskStatus==="failed"},null,8,["modelValue","onUpdate:modelValue","marks","disabled"])],2),g("div",ue,m(s.endLocation),1)]))),128)),t(J,{modelValue:k.value,"onUpdate:modelValue":a[5]||(a[5]=s=>k.value=s),width:"55%",title:"选择工作站",onClose:O},{default:r(()=>[t(se,{onConfirmCallback:N,type:1,ref_key:"mapRef",ref:h},null,512)]),_:1},8,["modelValue"])])}}}),me=W(ce,[["__scopeId","data-v-fe1ea9e6"]]);export{me as default};
