import{b as E,e as F,V as O,r as h,W as pe,f as me,h as f,o as D,c as q,L as fe,M as he,k as e,i as o,j as n,p as be,x,t as N,$ as X,I as Y,n as we,s as z,v as Z,F as ee,q as ae,z as Ce}from"./index-BP30Yz_m.js";import{C as _e}from"./index-DTWQQqpJ.js";import{b as ye}from"./warehouse-DqhAX_t8.js";import{r as P}from"./verify-D2E6NcQX.js";import{r as ge}from"./warehouseLocation-DZB7UK2n.js";function ke(){const{t:a}=E();return{pageData:F({columnData:[{label:a("warehouseContainer.containerCode"),prop:"containerCode",width:"auto",fixed:"left"},{label:a("warehouseContainer.containerType"),prop:"containerType",width:"auto",fixed:"left"},{label:a("warehouseContainer.locationName"),prop:"locationName",width:"150",fixed:"left"},{label:a("warehouseContainer.containerDescription"),prop:"containerDescription",width:"auto"},{label:a("warehouseContainer.warehouseName"),prop:"warehouseName",width:"150"},{label:a("is_disable"),prop:"disable",width:"auto"},{label:a("remark"),prop:"remark",width:"auto"},{label:a("operate"),prop:"operate",width:"150",fixed:"right"}]})}}function ve(a){return O({url:"/bok/container/getList",method:"get",params:a})}function De(a){return O({url:"/bok/container/getById",method:"get",params:a})}function Ve(a){return O({url:"/bok/container/add",method:"post",data:a})}function Se(a){return O({url:"/bok/container/update",method:"post",data:a})}function xe(a){return O({url:"/bok/container/del",method:"post",data})}function Ne(){const a=F({pageSize:10,pageNum:1,containerCode:null,warehouseId:null,containerType:null,disable:0}),t=F({list:[],total:0}),c=h(),y=h([]),s=()=>{a.pageNum=1,a.pageSize=10,a.disable=0},b=()=>{c.value&&(c.value.resetFields(),c.value.clearValidate());for(const d in a)Object.prototype.hasOwnProperty.call(a,d)&&(a[d]=void 0);s(),i()},i=async()=>{const{rows:d,total:m}=await ve(a);t.list=d,t.total=m};return{formData:a,loadData:i,searchFormRef:c,resetData:b,tableData:t,reloadData:s,warehouseOptions:y,getOption:async()=>{const{data:d}=await ye();y.value=d}}}function Ie(){const{t:a}=E(),t=F({containerCode:null,containerType:null,warehouseId:null,warehourseLocationId:null,containerDescription:null,remark:null}),c=h(),y=F({containerCode:P(a("warehouseContainer.containerCode")+a("cannot_empty")),containerType:P(a("warehouseContainer.containerType")+a("cannot_empty")),warehouseId:P(a("warehouseContainer.warehouseName")+a("cannot_empty"))}),s=h(""),b=h(!1),i=h([]),S=async()=>new Promise(async(p,w)=>{if(!c.value){w(!1);return}try{await c.value.validate(),t.id?await Se(t):await Ve(t),U(),pe({type:"success",message:a("operate_success")}),p(!0)}catch(g){throw w(g),g}}),d=h(!1),m=h(!1),R=async(p,w)=>{if(s.value=m.value?a("check_details"):p&&w?a("edit")+a("warehouseContainer.warehouseContainer"):a("add")+a("warehouseContainer.warehouseContainer"),b.value=!!(p&&w),u(),d.value=!0,w){const{data:g}=await De({id:w});await L();for(let I in g)Object.prototype.hasOwnProperty.call(g,I)&&(t[I]=g[I])}},u=()=>{c.value&&(c.value.resetFields(),c.value.clearValidate());for(let p in t)t[p]=void 0},U=()=>{d.value=!1,m.value=!1,u()},$=p=>{m.value=!0,R(p,p.id)},L=async()=>{const{data:p}=await ge({disable:0,warehouseId:t.warehouseId});i.value=p};return{updateFormData:t,updateFormRef:c,updateFormRules:y,submit:S,showHandle:d,openHandle:R,closeHandle:U,title:s,disabled:b,handleCheckDetail:$,isDetails:m,getAllWarehouseLocation:L,warehouseLocationOptions:i}}const V=h([]),j=h();function Te(a,t){async function c(s){s.id||j.value;const b=V.value.length>0&&V.value.every(m=>m.disable),i=!V.value.length&&s.disable,S=async()=>{await xe({id:s.id}),j.value="",V.value=[],t.$modal.msgSuccess(a("operate_success"))},d=m=>t.$modal.confirm(m).then(S);b?await d(a("delete_tip1")):V.value.length?await d(a("delete_tip2")):i?await d(a("delete_tip4")):await d(a("delete_tip3"))}function y({rowList:s}){V.value=s;const b=s.map(i=>i.id);j.value=b.join(",")}return{deleteHandler:c,select:y,idList:V}}const Fe={class:"app-container"},Oe={class:"dialog-footer"},ze=Object.assign({name:"warehouseContainer"},{__name:"index",setup(a){const{t}=E(),{proxy:c}=Ce(),{pageData:y}=ke(),{formData:s,tableData:b,loadData:i,searchFormRef:S,resetData:d,warehouseOptions:m,getOption:R}=Ne(),{updateFormData:u,updateFormRef:U,updateFormRules:$,submit:L,openHandle:p,showHandle:w,title:g,handleCheckDetail:I,closeHandle:M,isDetails:k,getAllWarehouseLocation:te,warehouseLocationOptions:oe}=Ie(),{deleteHandler:le,select:ne}=Te(t,c),W=h(!0),re=h("");me(()=>{i(),R()});const se=async()=>{try{await L(),setTimeout(()=>{i()},50)}catch(H){throw H}},ie=async H=>{await le(H),setTimeout(()=>{i()},50)};return(H,r)=>{const T=f("el-input"),_=f("el-form-item"),C=f("el-col"),de=f("el-checkbox"),v=f("el-button"),A=f("el-row"),K=f("el-form"),B=f("el-tooltip"),ue=f("el-tag"),G=f("el-option"),Q=f("el-select"),ce=f("el-dialog");return D(),q("div",Fe,[fe(o(K,{model:e(s),ref_key:"searchFormRef",ref:S,inline:!0,labelSuffix:":"},{default:n(()=>[o(A,{gutter:20},{default:n(()=>[o(C,{lg:4,sm:12,md:12,xs:24},{default:n(()=>[o(_,{label:e(t)("warehouseContainer.containerCode"),prop:"containerCode"},{default:n(()=>[o(T,{modelValue:e(s).containerCode,"onUpdate:modelValue":r[0]||(r[0]=l=>e(s).containerCode=l),placeholder:e(t)("warehouseContainer.containerCode"),clearable:"",onKeyup:be(e(i),["enter"])},null,8,["modelValue","placeholder","onKeyup"])]),_:1},8,["label"])]),_:1}),o(C,{lg:2,sm:12,md:12,xs:24},{default:n(()=>[o(_,{label:"",prop:"disable"},{default:n(()=>[o(de,{modelValue:e(s).disable,"onUpdate:modelValue":r[1]||(r[1]=l=>e(s).disable=l),onChange:e(i),"true-label":1,"false-label":0,label:e(t)("include_disable"),size:"large"},null,8,["modelValue","onChange","label"])]),_:1})]),_:1}),o(C,{lg:4,sm:12,md:12,xs:24},{default:n(()=>[o(_,null,{default:n(()=>[o(v,{type:"primary",icon:"Search",onClick:e(i)},{default:n(()=>[x(N(e(t)("query")),1)]),_:1},8,["onClick"]),o(v,{icon:"Refresh",onClick:e(d)},{default:n(()=>[x(N(e(t)("reset")),1)]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1},8,["model"]),[[he,e(W)]]),o(A,{gutter:10,class:"mb10 mt10"},{default:n(()=>[o(C,{span:1.5},{default:n(()=>[o(v,{type:"primary",plain:"",icon:"Plus",onClick:e(p)},{default:n(()=>[x(N(e(t)("add")),1)]),_:1},8,["onClick"])]),_:1})]),_:1}),o(_e,{loading:e(X)().loading,onSelect:e(ne),ref_key:"tableRef",ref:re,onQueryTable:e(i),showSearch:e(W),"onUpdate:showSearch":r[2]||(r[2]=l=>Y(W)?W.value=l:null),"table-key":"warehouseContainerId",onHandleCurrentChange:e(i),total:e(b).total,showMultipleColumn:"",pageSize:e(s).pageSize,"onUpdate:pageSize":r[3]||(r[3]=l=>e(s).pageSize=l),pageNum:e(s).pageNum,"onUpdate:pageNum":r[4]||(r[4]=l=>e(s).pageNum=l),operateWidth:"100px",tableData:e(b).list,columnData:e(y).columnData,showSummary:!1,showOperate:!1,"show-multiple":!1,"show-multiple-column":!0,showPagination:!0},{operateDefault:n(({data:{row:l}})=>[o(B,{class:"box-item",effect:"dark",content:e(t)("check_details"),placement:"top-start"},{default:n(()=>[o(v,{link:"",type:"primary",icon:"View",onClick:J=>e(I)(l)},null,8,["onClick"])]),_:2},1032,["content"]),o(B,{class:"box-item",effect:"dark",content:e(t)("edit"),placement:"top-start"},{default:n(()=>[o(v,{link:"",type:"primary",icon:"Edit",disabled:l.notEdit,onClick:J=>e(p)(l,l.id)},null,8,["disabled","onClick"])]),_:2},1032,["content"]),o(B,{class:"box-item",effect:"dark",content:e(t)("delete"),placement:"top-start"},{default:n(()=>[o(v,{link:"",type:"primary",icon:"Delete",disabled:l.notDelete,onClick:J=>ie(l)},null,8,["disabled","onClick"])]),_:2},1032,["content"])]),disableDefault:n(({data:{row:l}})=>[o(ue,{type:l.disable?"info":"success"},{default:n(()=>[x(N(l.disable?e(t)("disabled"):e(t)("normal")),1)]),_:2},1032,["type"])]),_:1},8,["loading","onSelect","onQueryTable","showSearch","onHandleCurrentChange","total","pageSize","pageNum","tableData","columnData"]),o(ce,{title:e(g),modelValue:e(w),"onUpdate:modelValue":r[11]||(r[11]=l=>Y(w)?w.value=l:null),width:"30%","append-to-body":"",onClose:e(M)},{footer:n(()=>[we("div",Oe,[e(k)?Z("",!0):(D(),z(v,{key:0,type:"primary",class:"btn-confirm",loading:e(X)().loading,onClick:se},{default:n(()=>[x(N(e(t)("confirm")),1)]),_:1},8,["loading"])),o(v,{class:"btn-cancel",onClick:e(M)},{default:n(()=>[x(N(e(k)?e(t)("close"):e(t)("cancel")),1)]),_:1},8,["onClick"])])]),default:n(()=>[o(K,{ref_key:"updateFormRef",ref:U,"label-position":"left",model:e(u),rules:e($),"label-suffix":"："},{default:n(()=>[o(A,{gutter:20},{default:n(()=>[o(C,{span:24},{default:n(()=>[o(_,{label:e(t)("warehouseContainer.warehouseName"),prop:"warehouseId"},{default:n(()=>[o(Q,{modelValue:e(u).warehouseId,"onUpdate:modelValue":r[5]||(r[5]=l=>e(u).warehouseId=l),clearable:"",disabled:e(k),onChange:e(te)},{default:n(()=>[(D(!0),q(ee,null,ae(e(m),l=>(D(),z(G,{key:l.id,label:l.warehouseName,value:l.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue","disabled","onChange"])]),_:1},8,["label"])]),_:1}),e(m).length?(D(),z(C,{key:0,span:24},{default:n(()=>[o(_,{label:e(t)("warehouseContainer.locationName"),prop:""},{default:n(()=>[o(Q,{modelValue:e(u).warehourseLocationId,"onUpdate:modelValue":r[6]||(r[6]=l=>e(u).warehourseLocationId=l),clearable:"",disabled:e(k)},{default:n(()=>[(D(!0),q(ee,null,ae(e(oe),l=>(D(),z(G,{key:l.id,label:l.locationName,value:l.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue","disabled"])]),_:1},8,["label"])]),_:1})):Z("",!0),o(C,{span:24},{default:n(()=>[o(_,{label:e(t)("warehouseContainer.containerCode"),prop:"containerCode"},{default:n(()=>[o(T,{modelValue:e(u).containerCode,"onUpdate:modelValue":r[7]||(r[7]=l=>e(u).containerCode=l),disabled:e(k),placeholder:e(t)("input")+e(t)("warehouseContainer.containerCode")},null,8,["modelValue","disabled","placeholder"])]),_:1},8,["label"])]),_:1}),o(C,{span:24},{default:n(()=>[o(_,{label:e(t)("warehouseContainer.containerType"),prop:"containerType"},{default:n(()=>[o(T,{modelValue:e(u).containerType,"onUpdate:modelValue":r[8]||(r[8]=l=>e(u).containerType=l),disabled:e(k),placeholder:e(t)("input")+e(t)("warehouseContainer.containerType")},null,8,["modelValue","disabled","placeholder"])]),_:1},8,["label"])]),_:1}),o(C,{span:24},{default:n(()=>[o(_,{label:e(t)("warehouseContainer.containerDescription"),prop:""},{default:n(()=>[o(T,{modelValue:e(u).containerDescription,"onUpdate:modelValue":r[9]||(r[9]=l=>e(u).containerDescription=l),disabled:e(k),placeholder:e(t)("input")+e(t)("warehouseContainer.containerDescription")},null,8,["modelValue","disabled","placeholder"])]),_:1},8,["label"])]),_:1}),o(C,{span:24},{default:n(()=>[o(_,{label:e(t)("remark"),prop:"remark"},{default:n(()=>[o(T,{modelValue:e(u).remark,"onUpdate:modelValue":r[10]||(r[10]=l=>e(u).remark=l),type:"textarea",clearable:"",disabled:e(k),placeholder:`${e(t)("input")}${e(t)("remark")} `},null,8,["modelValue","disabled","placeholder"])]),_:1},8,["label"])]),_:1})]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["title","modelValue","onClose"])])}}});export{ze as default};
