import{b as E,u as O,r as i,J as F,h as r,K as H,o as C,c as J,n as _,t as f,k as e,i as t,j as s,L as S,s as L,M,I as V,x as $,H as P,z as q}from"./index-BP30Yz_m.js";import{a as G,u as Q}from"./user-TxY_T3CH.js";const W={class:"app-container"},X={class:"form-header h4"},Y={class:"form-header h4"},Z={style:{"text-align":"center","margin-left":"-120px","margin-top":"30px"}},ee=P({name:"AuthRole"}),ne=Object.assign(ee,{setup(le){const{t:a}=E(),I=O(),{proxy:b}=q(),v=i(!0),h=i(0),c=i(1),d=i(10),k=i([]),g=i([]),u=i({nickName:void 0,userName:void 0,userId:void 0});function T(o){b.$refs.roleRef.toggleRowSelection(o)}function j(o){k.value=o.map(l=>l.roleId)}function B(o){return o.roleId}function w(){const o={path:"/system/user"};b.$tab.closeOpenPage(o)}function D(){const o=u.value.userId,l=k.value.join(",");Q({userId:o,roleIds:l}).then(m=>{b.$modal.msgSuccess(a("user.authorizationSuccess")),w()})}return(()=>{const o=I.params&&I.params.userId;o&&(v.value=!0,G(o).then(l=>{u.value=l.user,g.value=l.roles,h.value=g.value.length,F(()=>{g.value.forEach(m=>{m.flag&&b.$refs.roleRef.toggleRowSelection(m)})}),v.value=!1}))})(),(o,l)=>{const m=r("el-input"),N=r("el-form-item"),x=r("el-col"),K=r("el-row"),R=r("el-form"),p=r("el-table-column"),U=r("el-table"),z=r("pagination"),y=r("el-button"),A=H("loading");return C(),J("div",W,[_("h4",X,f(e(a)("user.basicInfo")),1),t(R,{model:e(u),"label-width":"80px"},{default:s(()=>[t(K,null,{default:s(()=>[t(x,{span:8,offset:2},{default:s(()=>[t(N,{label:e(a)("user.nickName"),prop:"nickName"},{default:s(()=>[t(m,{modelValue:e(u).nickName,"onUpdate:modelValue":l[0]||(l[0]=n=>e(u).nickName=n),disabled:""},null,8,["modelValue"])]),_:1},8,["label"])]),_:1}),t(x,{span:8,offset:2},{default:s(()=>[t(N,{label:e(a)("user.loginID"),prop:"userName"},{default:s(()=>[t(m,{modelValue:e(u).userName,"onUpdate:modelValue":l[1]||(l[1]=n=>e(u).userName=n),disabled:""},null,8,["modelValue"])]),_:1},8,["label"])]),_:1})]),_:1})]),_:1},8,["model"]),_("h4",Y,f(e(a)("user.roleInfo")),1),S((C(),L(U,{"row-key":B,onRowClick:T,ref:"roleRef",onSelectionChange:j,data:e(g).slice((e(c)-1)*e(d),e(c)*e(d))},{default:s(()=>[t(p,{label:e(a)("user.serial_number"),width:"150",type:"index",align:"center"},{default:s(n=>[_("span",null,f((e(c)-1)*e(d)+n.$index+1),1)]),_:1},8,["label"]),t(p,{type:"selection","reserve-selection":!0,width:"55"}),t(p,{label:e(a)("user.roleId"),align:"center",prop:"roleId"},null,8,["label"]),t(p,{label:e(a)("user.roleName"),align:"center",prop:"roleName"},null,8,["label"]),t(p,{label:e(a)("user.roleKey"),align:"center",prop:"roleKey"},null,8,["label"]),t(p,{label:e(a)("user.createTime"),align:"center",prop:"createTime",width:"180"},{default:s(n=>[_("span",null,f(o.parseTime(n.row.createTime)),1)]),_:1},8,["label"])]),_:1},8,["data"])),[[A,e(v)]]),S(t(z,{total:e(h),page:e(c),"onUpdate:page":l[2]||(l[2]=n=>V(c)?c.value=n:null),limit:e(d),"onUpdate:limit":l[3]||(l[3]=n=>V(d)?d.value=n:null)},null,8,["total","page","limit"]),[[M,e(h)>0]]),t(R,{"label-width":"100px"},{default:s(()=>[_("div",Z,[t(y,{type:"primary",class:"btn-confirm",onClick:l[4]||(l[4]=n=>D())},{default:s(()=>[$(f(e(a)("user.submit")),1)]),_:1}),t(y,{onClick:l[5]||(l[5]=n=>w())},{default:s(()=>[$(f(e(a)("user.back")),1)]),_:1})])]),_:1})])}}});export{ne as default};