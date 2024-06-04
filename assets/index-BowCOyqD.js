import{a as Qe,r as s,e as Je,N as Ge,h as r,K as ce,o as m,c as F,L as y,M as X,k as a,i as t,j as o,p as fe,F as Z,q as ee,s as h,I as S,x as i,n as B,t as ve,v as O,H as We,z as Xe,J as Y}from"./index-BP30Yz_m.js";import{l as Ze,e as el,f as ll,g as ye,h as tl,i as al,j as ol,k as nl}from"./role-C4IWMDn3.js";import{r as ul,t as dl}from"./menu-DGXnTXMP.js";const rl={class:"app-container"},sl={class:"dialog-footer"},il={class:"dialog-footer"},pl=We({name:"Role"}),yl=Object.assign(pl,{setup(ml){const he=Qe(),{proxy:v}=Xe(),{sys_normal_disable:le}=v.useDict("sys_normal_disable"),te=s([]),_=s(!1),j=s(!0),T=s(!0),H=s([]),ae=s(!0),oe=s(!0),Q=s(0),N=s(""),U=s([]),I=s([]),$=s(!1),q=s(!1),M=s(!0),A=s(!1),E=s([]),w=s(!1),g=s(null),k=s(null),_e=s([{value:"1",label:"全部数据权限"},{value:"2",label:"自定数据权限"},{value:"3",label:"本部门数据权限"},{value:"4",label:"本部门及以下数据权限"},{value:"5",label:"仅本人数据权限"}]),ge=Je({form:{},queryParams:{pageNum:1,pageSize:10,roleName:void 0,roleKey:void 0,status:void 0},rules:{roleName:[{required:!0,message:"角色名称不能为空",trigger:"blur"}],roleKey:[{required:!0,message:"权限字符不能为空",trigger:"blur"}],roleSort:[{required:!0,message:"角色顺序不能为空",trigger:"blur"}]}}),{queryParams:c,form:u,rules:ke}=Ge(ge);function b(){j.value=!0,Ze(v.addDateRange(c.value,U.value)).then(n=>{te.value=n.rows,Q.value=n.total,j.value=!1})}function P(){c.value.pageNum=1,b()}function be(){U.value=[],v.resetForm("queryRef"),P()}function ne(n){const e=n.roleId||H.value;v.$modal.confirm('是否确认删除角色编号为"'+e+'"的数据项?').then(function(){return el(e)}).then(()=>{b(),v.$modal.msgSuccess("删除成功")}).catch(()=>{})}function Ve(){v.download("system/role/export",{...c.value},`role_${new Date().getTime()}.xlsx`)}function Ce(n){H.value=n.map(e=>e.roleId),ae.value=n.length!=1,oe.value=!n.length}function Se(n){let e=n.status==="0"?"启用":"停用";v.$modal.confirm('确认要"'+e+'""'+n.roleName+'"角色吗?').then(function(){return ll(n.roleId,n.status)}).then(()=>{v.$modal.msgSuccess(e+"成功")}).catch(function(){n.status=n.status==="0"?"1":"0"})}function we(n){he.push("/system/role-auth/user/"+n.roleId)}function xe(){dl().then(n=>{I.value=n.data})}function Ke(){let n=k.value.getCheckedKeys(),e=k.value.getHalfCheckedKeys();return n.unshift.apply(n,e),n}function R(){g.value!=null&&g.value.setCheckedKeys([]),$.value=!1,q.value=!1,M.value=!0,A.value=!1,u.value={roleId:void 0,roleName:void 0,roleKey:void 0,roleSort:0,status:"0",menuIds:[],deptIds:[],menuCheckStrictly:!0,deptCheckStrictly:!0,remark:void 0},v.resetForm("roleRef")}function Ne(){R(),xe(),_.value=!0,N.value="添加角色"}function ue(n){R();const e=n.roleId||H.value,p=Ue(e);ye(e).then(d=>{u.value=d.data,u.value.roleSort=Number(u.value.roleSort),_.value=!0,Y(()=>{p.then(L=>{L.checkedKeys.forEach(G=>{Y(()=>{g.value.setChecked(G,!0,!1)})})})}),N.value="修改角色"})}function Ue(n){return ul(n).then(e=>(I.value=e.menus,e))}function Ie(n){return nl(n).then(e=>(E.value=e.depts,e))}function de(n,e){if(e=="menu"){let p=I.value;for(let d=0;d<p.length;d++)g.value.store.nodesMap[p[d].id].expanded=n}else if(e=="dept"){let p=E.value;for(let d=0;d<p.length;d++)k.value.store.nodesMap[p[d].id].expanded=n}}function re(n,e){e=="menu"?g.value.setCheckedNodes(n?I.value:[]):e=="dept"&&k.value.setCheckedNodes(n?E.value:[])}function se(n,e){e=="menu"?u.value.menuCheckStrictly=!!n:e=="dept"&&(u.value.deptCheckStrictly=!!n)}function ie(){let n=g.value.getCheckedKeys(),e=g.value.getHalfCheckedKeys();return n.unshift.apply(n,e),n}function Re(){v.$refs.roleRef.validate(n=>{n&&(u.value.roleId!=null?(u.value.menuIds=ie(),tl(u.value).then(e=>{v.$modal.msgSuccess("修改成功"),_.value=!1,b()})):(u.value.menuIds=ie(),al(u.value).then(e=>{v.$modal.msgSuccess("新增成功"),_.value=!1,b()})))})}function De(){_.value=!1,R()}function Te(n){n!=="2"&&k.value.setCheckedKeys([])}function $e(n){R();const e=Ie(n.roleId);ye(n.roleId).then(p=>{u.value=p.data,w.value=!0,Y(()=>{e.then(d=>{Y(()=>{k.value&&k.value.setCheckedKeys(d.checkedKeys)})})}),N.value="分配数据权限"})}function qe(){u.value.roleId!=null&&(u.value.deptIds=Ke(),ol(u.value).then(n=>{v.$modal.msgSuccess("修改成功"),w.value=!1,b()}))}function Me(){w.value=!1,R()}return b(),(n,e)=>{const p=r("el-input"),d=r("el-form-item"),L=r("el-option"),J=r("el-select"),G=r("el-date-picker"),f=r("el-button"),W=r("el-form"),z=r("el-col"),Ae=r("right-toolbar"),Ee=r("el-row"),V=r("el-table-column"),Pe=r("el-switch"),D=r("el-tooltip"),Le=r("el-table"),ze=r("pagination"),Fe=r("question-filled"),Be=r("el-icon"),Oe=r("el-input-number"),Ye=r("el-radio"),je=r("el-radio-group"),x=r("el-checkbox"),pe=r("el-tree"),me=r("el-dialog"),C=ce("hasPermi"),He=ce("loading");return m(),F("div",rl,[y(t(W,{model:a(c),ref:"queryRef",inline:!0,"label-width":"68px"},{default:o(()=>[t(d,{label:"角色名称",prop:"roleName"},{default:o(()=>[t(p,{modelValue:a(c).roleName,"onUpdate:modelValue":e[0]||(e[0]=l=>a(c).roleName=l),placeholder:"请输入角色名称",clearable:"",style:{width:"240px"},onKeyup:fe(P,["enter"])},null,8,["modelValue","onKeyup"])]),_:1}),t(d,{label:"权限字符",prop:"roleKey"},{default:o(()=>[t(p,{modelValue:a(c).roleKey,"onUpdate:modelValue":e[1]||(e[1]=l=>a(c).roleKey=l),placeholder:"请输入权限字符",clearable:"",style:{width:"240px"},onKeyup:fe(P,["enter"])},null,8,["modelValue","onKeyup"])]),_:1}),t(d,{label:"状态",prop:"status"},{default:o(()=>[t(J,{modelValue:a(c).status,"onUpdate:modelValue":e[2]||(e[2]=l=>a(c).status=l),placeholder:"角色状态",clearable:"",style:{width:"240px"}},{default:o(()=>[(m(!0),F(Z,null,ee(a(le),l=>(m(),h(L,{key:l.value,label:l.label,value:l.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),t(d,{label:"创建时间",style:{width:"308px"}},{default:o(()=>[t(G,{modelValue:a(U),"onUpdate:modelValue":e[3]||(e[3]=l=>S(U)?U.value=l:null),"value-format":"YYYY-MM-DD",type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期"},null,8,["modelValue"])]),_:1}),t(d,null,{default:o(()=>[t(f,{type:"primary",icon:"Search",onClick:P},{default:o(()=>[i("搜索")]),_:1}),t(f,{icon:"Refresh",onClick:be},{default:o(()=>[i("重置")]),_:1})]),_:1})]),_:1},8,["model"]),[[X,a(T)]]),t(Ee,{gutter:10,class:"mb8"},{default:o(()=>[t(z,{span:1.5},{default:o(()=>[y((m(),h(f,{type:"primary",plain:"",icon:"Plus",onClick:Ne},{default:o(()=>[i("新增")]),_:1})),[[C,["system:role:add"]]])]),_:1}),t(z,{span:1.5},{default:o(()=>[y((m(),h(f,{type:"success",plain:"",icon:"Edit",disabled:a(ae),onClick:ue},{default:o(()=>[i("修改")]),_:1},8,["disabled"])),[[C,["system:role:edit"]]])]),_:1}),t(z,{span:1.5},{default:o(()=>[y((m(),h(f,{type:"danger",plain:"",icon:"Delete",disabled:a(oe),onClick:ne},{default:o(()=>[i("删除")]),_:1},8,["disabled"])),[[C,["system:role:remove"]]])]),_:1}),t(z,{span:1.5},{default:o(()=>[y((m(),h(f,{type:"warning",plain:"",icon:"Download",onClick:Ve,class:"btn-export"},{default:o(()=>[i("导出")]),_:1})),[[C,["system:role:export"]]])]),_:1}),t(Ae,{showSearch:a(T),"onUpdate:showSearch":e[4]||(e[4]=l=>S(T)?T.value=l:null),onQueryTable:b},null,8,["showSearch"])]),_:1}),y((m(),h(Le,{data:a(te),onSelectionChange:Ce},{default:o(()=>[t(V,{type:"selection",width:"55",align:"center"}),t(V,{label:"角色编号",prop:"roleId",width:"120"}),t(V,{label:"角色名称",prop:"roleName","show-overflow-tooltip":!0,width:"150"}),t(V,{label:"权限字符",prop:"roleKey","show-overflow-tooltip":!0,width:"150"}),t(V,{label:"显示顺序",prop:"roleSort",width:"100"}),t(V,{label:"状态",align:"center",width:"100"},{default:o(l=>[t(Pe,{modelValue:l.row.status,"onUpdate:modelValue":K=>l.row.status=K,"active-value":"0","inactive-value":"1",onChange:K=>Se(l.row)},null,8,["modelValue","onUpdate:modelValue","onChange"])]),_:1}),t(V,{label:"创建时间",align:"center",prop:"createTime"},{default:o(l=>[B("span",null,ve(n.parseTime(l.row.createTime)),1)]),_:1}),t(V,{label:"操作",align:"center","class-name":"small-padding fixed-width"},{default:o(l=>[l.row.roleId!==1?(m(),h(D,{key:0,content:"修改",placement:"top"},{default:o(()=>[y(t(f,{link:"",type:"primary",icon:"Edit",onClick:K=>ue(l.row)},null,8,["onClick"]),[[C,["system:role:edit"]]])]),_:2},1024)):O("",!0),l.row.roleId!==1?(m(),h(D,{key:1,content:"删除",placement:"top"},{default:o(()=>[y(t(f,{link:"",type:"primary",icon:"Delete",onClick:K=>ne(l.row)},null,8,["onClick"]),[[C,["system:role:remove"]]])]),_:2},1024)):O("",!0),l.row.roleId!==1?(m(),h(D,{key:2,content:"数据权限",placement:"top"},{default:o(()=>[y(t(f,{link:"",type:"primary",icon:"CircleCheck",onClick:K=>$e(l.row)},null,8,["onClick"]),[[C,["system:role:edit"]]])]),_:2},1024)):O("",!0),l.row.roleId!==1?(m(),h(D,{key:3,content:"分配用户",placement:"top"},{default:o(()=>[y(t(f,{link:"",type:"primary",icon:"User",onClick:K=>we(l.row)},null,8,["onClick"]),[[C,["system:role:edit"]]])]),_:2},1024)):O("",!0)]),_:1})]),_:1},8,["data"])),[[He,a(j)]]),y(t(ze,{total:a(Q),page:a(c).pageNum,"onUpdate:page":e[5]||(e[5]=l=>a(c).pageNum=l),limit:a(c).pageSize,"onUpdate:limit":e[6]||(e[6]=l=>a(c).pageSize=l),onPagination:b},null,8,["total","page","limit"]),[[X,a(Q)>0]]),t(me,{title:a(N),modelValue:a(_),"onUpdate:modelValue":e[18]||(e[18]=l=>S(_)?_.value=l:null),width:"500px","append-to-body":""},{footer:o(()=>[B("div",sl,[t(f,{type:"primary",class:"btn-confirm",onClick:Re},{default:o(()=>[i("确 定")]),_:1}),t(f,{onClick:De,class:"btn-cancel"},{default:o(()=>[i("取 消")]),_:1})])]),default:o(()=>[t(W,{ref:"roleRef",model:a(u),rules:a(ke),"label-width":"100px"},{default:o(()=>[t(d,{label:"角色名称",prop:"roleName"},{default:o(()=>[t(p,{modelValue:a(u).roleName,"onUpdate:modelValue":e[7]||(e[7]=l=>a(u).roleName=l),placeholder:"请输入角色名称"},null,8,["modelValue"])]),_:1}),t(d,{prop:"roleKey"},{label:o(()=>[B("span",null,[t(D,{content:"控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasRole('admin')`)",placement:"top"},{default:o(()=>[t(Be,null,{default:o(()=>[t(Fe)]),_:1})]),_:1}),i(" 权限字符 ")])]),default:o(()=>[t(p,{modelValue:a(u).roleKey,"onUpdate:modelValue":e[8]||(e[8]=l=>a(u).roleKey=l),placeholder:"请输入权限字符"},null,8,["modelValue"])]),_:1}),t(d,{label:"角色顺序",prop:"roleSort"},{default:o(()=>[t(Oe,{modelValue:a(u).roleSort,"onUpdate:modelValue":e[9]||(e[9]=l=>a(u).roleSort=l),"controls-position":"right",min:0},null,8,["modelValue"])]),_:1}),t(d,{label:"状态"},{default:o(()=>[t(je,{modelValue:a(u).status,"onUpdate:modelValue":e[10]||(e[10]=l=>a(u).status=l)},{default:o(()=>[(m(!0),F(Z,null,ee(a(le),l=>(m(),h(Ye,{key:l.value,label:l.value},{default:o(()=>[i(ve(l.label),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue"])]),_:1}),t(d,{label:"菜单权限"},{default:o(()=>[t(x,{modelValue:a($),"onUpdate:modelValue":e[11]||(e[11]=l=>S($)?$.value=l:null),onChange:e[12]||(e[12]=l=>de(l,"menu"))},{default:o(()=>[i("展开/折叠")]),_:1},8,["modelValue"]),t(x,{modelValue:a(q),"onUpdate:modelValue":e[13]||(e[13]=l=>S(q)?q.value=l:null),onChange:e[14]||(e[14]=l=>re(l,"menu"))},{default:o(()=>[i("全选/全不选")]),_:1},8,["modelValue"]),t(x,{modelValue:a(u).menuCheckStrictly,"onUpdate:modelValue":e[15]||(e[15]=l=>a(u).menuCheckStrictly=l),onChange:e[16]||(e[16]=l=>se(l,"menu"))},{default:o(()=>[i("父子联动")]),_:1},8,["modelValue"]),t(pe,{class:"tree-border",data:a(I),"show-checkbox":"",ref_key:"menuRef",ref:g,"node-key":"id","check-strictly":!a(u).menuCheckStrictly,"empty-text":"加载中，请稍候",props:{label:"label",children:"children"}},null,8,["data","check-strictly"])]),_:1}),t(d,{label:"备注"},{default:o(()=>[t(p,{modelValue:a(u).remark,"onUpdate:modelValue":e[17]||(e[17]=l=>a(u).remark=l),type:"textarea",placeholder:"请输入内容"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["title","modelValue"]),t(me,{title:a(N),modelValue:a(w),"onUpdate:modelValue":e[28]||(e[28]=l=>S(w)?w.value=l:null),width:"500px","append-to-body":""},{footer:o(()=>[B("div",il,[t(f,{type:"primary",class:"btn-confirm",onClick:qe},{default:o(()=>[i("确 定")]),_:1}),t(f,{class:"btn-cancel",onClick:Me},{default:o(()=>[i("取 消")]),_:1})])]),default:o(()=>[t(W,{model:a(u),"label-width":"80px"},{default:o(()=>[t(d,{label:"角色名称"},{default:o(()=>[t(p,{modelValue:a(u).roleName,"onUpdate:modelValue":e[19]||(e[19]=l=>a(u).roleName=l),disabled:!0},null,8,["modelValue"])]),_:1}),t(d,{label:"权限字符"},{default:o(()=>[t(p,{modelValue:a(u).roleKey,"onUpdate:modelValue":e[20]||(e[20]=l=>a(u).roleKey=l),disabled:!0},null,8,["modelValue"])]),_:1}),t(d,{label:"权限范围"},{default:o(()=>[t(J,{modelValue:a(u).dataScope,"onUpdate:modelValue":e[21]||(e[21]=l=>a(u).dataScope=l),onChange:Te},{default:o(()=>[(m(!0),F(Z,null,ee(a(_e),l=>(m(),h(L,{key:l.value,label:l.label,value:l.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),y(t(d,{label:"数据权限"},{default:o(()=>[t(x,{modelValue:a(M),"onUpdate:modelValue":e[22]||(e[22]=l=>S(M)?M.value=l:null),onChange:e[23]||(e[23]=l=>de(l,"dept"))},{default:o(()=>[i("展开/折叠")]),_:1},8,["modelValue"]),t(x,{modelValue:a(A),"onUpdate:modelValue":e[24]||(e[24]=l=>S(A)?A.value=l:null),onChange:e[25]||(e[25]=l=>re(l,"dept"))},{default:o(()=>[i("全选/全不选")]),_:1},8,["modelValue"]),t(x,{modelValue:a(u).deptCheckStrictly,"onUpdate:modelValue":e[26]||(e[26]=l=>a(u).deptCheckStrictly=l),onChange:e[27]||(e[27]=l=>se(l,"dept"))},{default:o(()=>[i("父子联动")]),_:1},8,["modelValue"]),t(pe,{class:"tree-border",data:a(E),"show-checkbox":"","default-expand-all":"",ref_key:"deptRef",ref:k,"node-key":"id","check-strictly":!a(u).deptCheckStrictly,"empty-text":"加载中，请稍候",props:{label:"label",children:"children"}},null,8,["data","check-strictly"])]),_:1},512),[[X,a(u).dataScope==2]])]),_:1},8,["model"])]),_:1},8,["title","modelValue"])])}}});export{yl as default};