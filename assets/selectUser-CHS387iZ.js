import{r as f,e as P,h as r,o as Q,s as A,j as l,n as v,i as e,x as _,k as n,p as N,t as E,L as F,M as H,I as M,H as O,z as G}from"./index-BP30Yz_m.js";import{u as J,d as W}from"./role-C4IWMDn3.js";const X={class:"dialog-footer"},Y=O({name:"SelectUser"}),oe=Object.assign(Y,{props:{roleId:{type:[Number,String]}},emits:["ok"],setup(S,{expose:I,emit:k}){const V=S,{proxy:p}=G(),{sys_normal_disable:C}=p.useDict("sys_normal_disable"),h=f([]),i=f(!1),g=f(0),y=f([]),a=P({pageNum:1,pageSize:10,roleId:void 0,userName:void 0,phonenumber:void 0});function x(){a.roleId=V.roleId,b(),i.value=!0}function U(s){p.$refs.refTable.toggleRowSelection(s)}function R(s){y.value=s.map(o=>o.userId)}function b(){J(a).then(s=>{h.value=s.rows,g.value=s.total})}function m(){a.pageNum=1,b()}function T(){p.resetForm("queryRef"),m()}const K=k;function z(){const s=a.roleId,o=y.value.join(",");if(o==""){p.$modal.msgError("请选择要分配的用户");return}W({roleId:s,userIds:o}).then(d=>{p.$modal.msgSuccess(d.msg),d.code===200&&(i.value=!1,K("ok"))})}return I({show:x}),(s,o)=>{const d=r("el-input"),w=r("el-form-item"),c=r("el-button"),L=r("el-form"),u=r("el-table-column"),$=r("dict-tag"),j=r("el-table"),q=r("pagination"),B=r("el-row"),D=r("el-dialog");return Q(),A(D,{title:"选择用户",modelValue:n(i),"onUpdate:modelValue":o[5]||(o[5]=t=>M(i)?i.value=t:null),width:"800px",top:"5vh","append-to-body":""},{footer:l(()=>[v("div",X,[e(c,{type:"primary",onClick:z},{default:l(()=>[_("确 定")]),_:1}),e(c,{onClick:o[4]||(o[4]=t=>i.value=!1)},{default:l(()=>[_("取 消")]),_:1})])]),default:l(()=>[e(L,{model:n(a),ref:"queryRef",inline:!0},{default:l(()=>[e(w,{label:"用户名称",prop:"userName"},{default:l(()=>[e(d,{modelValue:n(a).userName,"onUpdate:modelValue":o[0]||(o[0]=t=>n(a).userName=t),placeholder:"请输入用户名称",clearable:"",style:{width:"200px"},onKeyup:N(m,["enter"])},null,8,["modelValue","onKeyup"])]),_:1}),e(w,{label:"手机号码",prop:"phonenumber"},{default:l(()=>[e(d,{modelValue:n(a).phonenumber,"onUpdate:modelValue":o[1]||(o[1]=t=>n(a).phonenumber=t),placeholder:"请输入手机号码",clearable:"",style:{width:"200px"},onKeyup:N(m,["enter"])},null,8,["modelValue","onKeyup"])]),_:1}),e(w,null,{default:l(()=>[e(c,{type:"primary",icon:"Search",onClick:m},{default:l(()=>[_("搜索")]),_:1}),e(c,{icon:"Refresh",onClick:T},{default:l(()=>[_("重置")]),_:1})]),_:1})]),_:1},8,["model"]),e(B,null,{default:l(()=>[e(j,{onRowClick:U,ref:"refTable",data:n(h),onSelectionChange:R,height:"260px"},{default:l(()=>[e(u,{type:"selection",width:"55"}),e(u,{label:"用户名称",prop:"userName","show-overflow-tooltip":!0}),e(u,{label:"用户昵称",prop:"nickName","show-overflow-tooltip":!0}),e(u,{label:"邮箱",prop:"email","show-overflow-tooltip":!0}),e(u,{label:"手机",prop:"phonenumber","show-overflow-tooltip":!0}),e(u,{label:"状态",align:"center",prop:"status"},{default:l(t=>[e($,{options:n(C),value:t.row.status},null,8,["options","value"])]),_:1}),e(u,{label:"创建时间",align:"center",prop:"createTime",width:"180"},{default:l(t=>[v("span",null,E(s.parseTime(t.row.createTime)),1)]),_:1})]),_:1},8,["data"]),F(e(q,{total:n(g),page:n(a).pageNum,"onUpdate:page":o[2]||(o[2]=t=>n(a).pageNum=t),limit:n(a).pageSize,"onUpdate:limit":o[3]||(o[3]=t=>n(a).pageSize=t),onPagination:b},null,8,["total","page","limit"]),[[H,n(g)>0]])]),_:1})]),_:1},8,["modelValue"])}}});export{oe as default};