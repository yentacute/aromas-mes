import{b as Q,e as F,r as h,W as ce,f as pe,h as f,o as b,c as A,L as me,M as fe,k as e,i as l,j as o,F as q,q as B,s as V,v as K,p as be,x as I,t as x,$ as ae,I as le,n as he,z as _e}from"./index-BP30Yz_m.js";import{C as we}from"./index-DTWQQqpJ.js";import{b as ge}from"./warehouse-DqhAX_t8.js";import{l as ye,u as ke,a as Ce,g as ve,d as Ne}from"./warehouseLocation-DZB7UK2n.js";import{r as P}from"./verify-D2E6NcQX.js";import{r as Ve}from"./warehouseArea-Ck7-7bct.js";function De(){const{t:n}=Q();return{pageData:F({columnData:[{label:n("storeLocation.warehouseName"),prop:"warehouseName",width:"150",fixed:"left"},{label:n("storeLocation.areaName"),prop:"areaName",width:"150",fixed:"left"},{label:n("storeLocation.locationName"),prop:"locationName",width:"auto",fixed:"left"},{label:n("storeLocation.locationCode"),prop:"locationCode",width:"auto",fixed:"left"},{label:n("is_disable"),prop:"disable",width:"auto"},{label:n("remark"),prop:"remark",width:"auto"},{label:n("operate"),prop:"operate",width:"150",fixed:"right"}]})}}function Le(){const n=F({pageSize:10,pageNum:1,locationName:null,warehouseId:null,warehouseAreaId:null,disable:0}),t=F({list:[],total:0}),u=h(),k=h([]),s=()=>{n.pageNum=1,n.pageSize=10,n.disable=0},_=()=>{u.value&&(u.value.resetFields(),u.value.clearValidate());for(const i in n)Object.prototype.hasOwnProperty.call(n,i)&&(n[i]=void 0);s(),d()},d=async()=>{const{rows:i,total:c}=await ye(n);t.list=i,t.total=c};return{formData:n,loadData:d,searchFormRef:u,resetData:_,tableData:t,reloadData:s,warehouseOptions:k,getOption:async()=>{const{data:i}=await ge();k.value=i}}}function Ie(){const{t:n}=Q(),t=F({locationCode:null,locationName:null,warehouseId:null,warehouseAreaId:null,remark:null}),u=h(),k=F({locationCode:P(n("storeLocation.locationCode")+n("cannot_empty")),locationName:P(n("storeLocation.locationName")+n("cannot_empty")),warehouseId:P(n("storeLocation.warehouseName")+n("cannot_empty")),warehouseAreaId:P(n("storeLocation.areaName")+n("cannot_empty"))}),s=h(""),_=h(!1),d=h([]),L=async()=>new Promise(async(m,w)=>{if(!u.value){w(!1);return}try{await u.value.validate(),t.id?await ke(t):await Ce(t),O(),ce({type:"success",message:n("operate_success")}),m(!0)}catch(C){throw w(C),C}}),i=h(!1),c=h(!1),U=async(m,w)=>{if(s.value=c.value?n("check_details"):m&&w?n("edit")+n("storeLocation.warehouseLocation"):n("add")+n("storeLocation.warehouseLocation"),_.value=!!(m&&w),p(),i.value=!0,w){const{data:C}=await ve({id:w});await R();for(let S in C)Object.prototype.hasOwnProperty.call(C,S)&&(t[S]=C[S])}},p=()=>{u.value&&(u.value.resetFields(),u.value.clearValidate());for(let m in t)t[m]=void 0},O=()=>{i.value=!1,c.value=!1,p()},j=m=>{c.value=!0,U(m,m.id)},R=async()=>{const{data:m}=await Ve({disable:0,warehouseId:t.warehouseId});d.value=m};return{updateFormData:t,updateFormRef:u,updateFormRules:k,submit:L,showHandle:i,openHandle:U,closeHandle:O,title:s,disabled:_,handleCheckDetail:j,isDetails:c,getAllWarehouseArea:R,warehouseAreaOptions:d}}const D=h([]),G=h();function xe(n,t){async function u(s){s.id||G.value;const _=D.value.length>0&&D.value.every(c=>c.disable),d=!D.value.length&&s.disable,L=async()=>{await Ne({id:s.id}),G.value="",D.value=[],t.$modal.msgSuccess(n("operate_success"))},i=c=>t.$modal.confirm(c).then(L);_?await i(n("delete_tip1")):D.value.length?await i(n("delete_tip2")):d?await i(n("delete_tip4")):await i(n("delete_tip3"))}function k({rowList:s}){D.value=s;const _=s.map(d=>d.id);G.value=_.join(",")}return{deleteHandler:u,select:k,idList:D}}const Se={class:"app-container"},Ae={class:"dialog-footer"},ze=Object.assign({name:"warehouseLocation"},{__name:"index",setup(n){const{t}=Q(),{proxy:u}=_e(),{pageData:k}=De(),{formData:s,tableData:_,loadData:d,searchFormRef:L,resetData:i,warehouseOptions:c,getOption:U}=Le(),{updateFormData:p,updateFormRef:O,updateFormRules:j,submit:R,openHandle:m,showHandle:w,title:C,handleCheckDetail:S,closeHandle:J,isDetails:N,getAllWarehouseArea:X,warehouseAreaOptions:Y}=Ie(),{deleteHandler:te,select:oe}=xe(t,u),W=h(!0),ne=h("");pe(()=>{d(),U()});const se=async()=>{try{await R(),setTimeout(()=>{d()},50)}catch(H){throw H}},re=async H=>{await te(H),setTimeout(()=>{d()},50)};return(H,r)=>{const z=f("el-option"),$=f("el-select"),y=f("el-form-item"),g=f("el-col"),T=f("el-input"),de=f("el-checkbox"),v=f("el-button"),E=f("el-row"),Z=f("el-form"),M=f("el-tooltip"),ie=f("el-tag"),ue=f("el-dialog");return b(),A("div",Se,[me(l(Z,{model:e(s),ref_key:"searchFormRef",ref:L,inline:!0,labelSuffix:":"},{default:o(()=>[l(E,{gutter:20},{default:o(()=>[l(g,{span:6},{default:o(()=>[l(y,{label:e(t)("storeLocation.warehouseName"),prop:"warehouseId"},{default:o(()=>[l($,{modelValue:e(s).warehouseId,"onUpdate:modelValue":r[0]||(r[0]=a=>e(s).warehouseId=a),clearable:"",onChange:e(X)},{default:o(()=>[(b(!0),A(q,null,B(e(c),a=>(b(),V(z,{key:a.id,label:a.warehouseName,value:a.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue","onChange"])]),_:1},8,["label"])]),_:1}),e(c).length?(b(),V(g,{key:0,span:6},{default:o(()=>[l(y,{label:e(t)("storeLocation.areaName"),prop:"warehouseAreaId"},{default:o(()=>[l($,{modelValue:e(s).warehouseAreaId,"onUpdate:modelValue":r[1]||(r[1]=a=>e(s).warehouseAreaId=a),clearable:""},{default:o(()=>[(b(!0),A(q,null,B(e(Y),a=>(b(),V(z,{key:a.id,label:a.areaName,value:a.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1},8,["label"])]),_:1})):K("",!0),l(g,{lg:6,sm:12,md:12,xs:24},{default:o(()=>[l(y,{label:e(t)("storeLocation.locationName"),prop:"areaName"},{default:o(()=>[l(T,{modelValue:e(s).locationName,"onUpdate:modelValue":r[2]||(r[2]=a=>e(s).locationName=a),placeholder:e(t)("storeLocation.locationName"),clearable:"",onKeyup:be(e(d),["enter"])},null,8,["modelValue","placeholder","onKeyup"])]),_:1},8,["label"])]),_:1}),l(g,{lg:2,sm:12,md:12,xs:24},{default:o(()=>[l(y,{label:"",prop:"disable"},{default:o(()=>[l(de,{modelValue:e(s).disable,"onUpdate:modelValue":r[3]||(r[3]=a=>e(s).disable=a),onChange:e(d),"true-label":1,"false-label":0,label:e(t)("include_disable"),size:"large"},null,8,["modelValue","onChange","label"])]),_:1})]),_:1}),l(g,{lg:4,sm:12,md:12,xs:24},{default:o(()=>[l(y,null,{default:o(()=>[l(v,{type:"primary",icon:"Search",onClick:e(d)},{default:o(()=>[I(x(e(t)("query")),1)]),_:1},8,["onClick"]),l(v,{icon:"Refresh",onClick:e(i)},{default:o(()=>[I(x(e(t)("reset")),1)]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1},8,["model"]),[[fe,e(W)]]),l(E,{gutter:10,class:"mb10 mt10"},{default:o(()=>[l(g,{span:1.5},{default:o(()=>[l(v,{type:"primary",plain:"",icon:"Plus",onClick:e(m)},{default:o(()=>[I(x(e(t)("add")),1)]),_:1},8,["onClick"])]),_:1})]),_:1}),l(we,{loading:e(ae)().loading,onSelect:e(oe),ref_key:"tableRef",ref:ne,onQueryTable:e(d),showSearch:e(W),"onUpdate:showSearch":r[4]||(r[4]=a=>le(W)?W.value=a:null),"table-key":"warehouseLocationId",onHandleCurrentChange:e(d),total:e(_).total,showMultipleColumn:"",pageSize:e(s).pageSize,"onUpdate:pageSize":r[5]||(r[5]=a=>e(s).pageSize=a),pageNum:e(s).pageNum,"onUpdate:pageNum":r[6]||(r[6]=a=>e(s).pageNum=a),operateWidth:"100px",tableData:e(_).list,columnData:e(k).columnData,showSummary:!1,showOperate:!1,"show-multiple":!1,"show-multiple-column":!0,showPagination:!0},{operateDefault:o(({data:{row:a}})=>[l(M,{class:"box-item",effect:"dark",content:e(t)("check_details"),placement:"top-start"},{default:o(()=>[l(v,{link:"",type:"primary",icon:"View",onClick:ee=>e(S)(a)},null,8,["onClick"])]),_:2},1032,["content"]),l(M,{class:"box-item",effect:"dark",content:e(t)("edit"),placement:"top-start"},{default:o(()=>[l(v,{link:"",type:"primary",icon:"Edit",disabled:a.notEdit,onClick:ee=>e(m)(a,a.id)},null,8,["disabled","onClick"])]),_:2},1032,["content"]),l(M,{class:"box-item",effect:"dark",content:e(t)("delete"),placement:"top-start"},{default:o(()=>[l(v,{link:"",type:"primary",icon:"Delete",disabled:a.notDelete,onClick:ee=>re(a)},null,8,["disabled","onClick"])]),_:2},1032,["content"])]),disableDefault:o(({data:{row:a}})=>[l(ie,{type:a.disable?"info":"success"},{default:o(()=>[I(x(a.disable?e(t)("disabled"):e(t)("normal")),1)]),_:2},1032,["type"])]),_:1},8,["loading","onSelect","onQueryTable","showSearch","onHandleCurrentChange","total","pageSize","pageNum","tableData","columnData"]),l(ue,{title:e(C),modelValue:e(w),"onUpdate:modelValue":r[12]||(r[12]=a=>le(w)?w.value=a:null),width:"30%","append-to-body":"",onClose:e(J)},{footer:o(()=>[he("div",Ae,[e(N)?K("",!0):(b(),V(v,{key:0,type:"primary",class:"btn-confirm",loading:e(ae)().loading,onClick:se},{default:o(()=>[I(x(e(t)("confirm")),1)]),_:1},8,["loading"])),l(v,{class:"btn-cancel",onClick:e(J)},{default:o(()=>[I(x(e(N)?e(t)("close"):e(t)("cancel")),1)]),_:1},8,["onClick"])])]),default:o(()=>[l(Z,{ref_key:"updateFormRef",ref:O,"label-position":"left",model:e(p),rules:e(j),"label-suffix":"："},{default:o(()=>[l(E,{gutter:20},{default:o(()=>[l(g,{span:24},{default:o(()=>[l(y,{label:e(t)("storeLocation.warehouseName"),prop:"warehouseId"},{default:o(()=>[l($,{modelValue:e(p).warehouseId,"onUpdate:modelValue":r[7]||(r[7]=a=>e(p).warehouseId=a),clearable:"",disabled:e(N),onChange:e(X)},{default:o(()=>[(b(!0),A(q,null,B(e(c),a=>(b(),V(z,{key:a.id,label:a.warehouseName,value:a.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue","disabled","onChange"])]),_:1},8,["label"])]),_:1}),e(c).length?(b(),V(g,{key:0,span:24},{default:o(()=>[l(y,{label:e(t)("storeLocation.areaName"),prop:"warehouseAreaId"},{default:o(()=>[l($,{modelValue:e(p).warehouseAreaId,"onUpdate:modelValue":r[8]||(r[8]=a=>e(p).warehouseAreaId=a),clearable:"",disabled:e(N)},{default:o(()=>[(b(!0),A(q,null,B(e(Y),a=>(b(),V(z,{key:a.id,label:a.areaName,value:a.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue","disabled"])]),_:1},8,["label"])]),_:1})):K("",!0),l(g,{span:24},{default:o(()=>[l(y,{label:e(t)("storeLocation.locationCode"),prop:"locationCode"},{default:o(()=>[l(T,{modelValue:e(p).locationCode,"onUpdate:modelValue":r[9]||(r[9]=a=>e(p).locationCode=a),disabled:e(N),placeholder:e(t)("input")+e(t)("storeLocation.locationCode")},null,8,["modelValue","disabled","placeholder"])]),_:1},8,["label"])]),_:1}),l(g,{span:24},{default:o(()=>[l(y,{label:e(t)("storeLocation.locationName"),prop:"locationName"},{default:o(()=>[l(T,{modelValue:e(p).locationName,"onUpdate:modelValue":r[10]||(r[10]=a=>e(p).locationName=a),disabled:e(N),placeholder:e(t)("input")+e(t)("storeLocation.locationName")},null,8,["modelValue","disabled","placeholder"])]),_:1},8,["label"])]),_:1}),l(g,{span:24},{default:o(()=>[l(y,{label:e(t)("remark"),prop:"remark"},{default:o(()=>[l(T,{modelValue:e(p).remark,"onUpdate:modelValue":r[11]||(r[11]=a=>e(p).remark=a),type:"textarea",clearable:"",disabled:e(N),placeholder:`${e(t)("input")}${e(t)("remark")} `},null,8,["modelValue","disabled","placeholder"])]),_:1},8,["label"])]),_:1})]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["title","modelValue","onClose"])])}}});export{ze as default};
