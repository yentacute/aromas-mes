import{V as D,r as d,h as s,K as V,o as b,c as j,i as e,j as l,k as t,p as C,x as y,L as k,s as L,n as K,t as S,M as z,I as B,H as F,z as O}from"./index-BP30Yz_m.js";function Q(c){return D({url:"/monitor/online/list",method:"get",params:c})}function E(c){return D({url:"/monitor/online/"+c,method:"delete"})}const H={class:"app-container"},M=F({name:"Online"}),J=Object.assign(M,{setup(c){const{proxy:f}=O(),N=d([]),_=d(!0),g=d(0),r=d(1),u=d(10),p=d({ipaddr:void 0,userName:void 0});function w(){_.value=!0,Q(p.value).then(i=>{N.value=i.rows,g.value=i.total,_.value=!1})}function m(){r.value=1,w()}function I(){f.resetForm("queryRef"),m()}function R(i){f.$modal.confirm('是否确认强退名称为"'+i.userName+'"的用户?').then(function(){return E(i.tokenId)}).then(()=>{w(),f.$modal.msgSuccess("删除成功")}).catch(()=>{})}return w(),(i,a)=>{const x=s("el-input"),h=s("el-form-item"),v=s("el-button"),T=s("el-form"),n=s("el-table-column"),U=s("el-table"),$=s("pagination"),q=V("hasPermi"),P=V("loading");return b(),j("div",H,[e(T,{model:t(p),ref:"queryRef",inline:!0},{default:l(()=>[e(h,{label:"登录地址",prop:"ipaddr"},{default:l(()=>[e(x,{modelValue:t(p).ipaddr,"onUpdate:modelValue":a[0]||(a[0]=o=>t(p).ipaddr=o),placeholder:"请输入登录地址",clearable:"",style:{width:"200px"},onKeyup:C(m,["enter"])},null,8,["modelValue","onKeyup"])]),_:1}),e(h,{label:"用户名称",prop:"userName"},{default:l(()=>[e(x,{modelValue:t(p).userName,"onUpdate:modelValue":a[1]||(a[1]=o=>t(p).userName=o),placeholder:"请输入用户名称",clearable:"",style:{width:"200px"},onKeyup:C(m,["enter"])},null,8,["modelValue","onKeyup"])]),_:1}),e(h,null,{default:l(()=>[e(v,{type:"primary",icon:"Search",onClick:m},{default:l(()=>[y("搜索")]),_:1}),e(v,{icon:"Refresh",onClick:I},{default:l(()=>[y("重置")]),_:1})]),_:1})]),_:1},8,["model"]),k((b(),L(U,{data:t(N).slice((t(r)-1)*t(u),t(r)*t(u)),style:{width:"100%"}},{default:l(()=>[e(n,{label:"序号",width:"50",type:"index",align:"center"},{default:l(o=>[K("span",null,S((t(r)-1)*t(u)+o.$index+1),1)]),_:1}),e(n,{label:"会话编号",align:"center",prop:"tokenId","show-overflow-tooltip":!0}),e(n,{label:"登录名称",align:"center",prop:"userName","show-overflow-tooltip":!0}),e(n,{label:"所属部门",align:"center",prop:"deptName","show-overflow-tooltip":!0}),e(n,{label:"主机",align:"center",prop:"ipaddr","show-overflow-tooltip":!0}),e(n,{label:"登录地点",align:"center",prop:"loginLocation","show-overflow-tooltip":!0}),e(n,{label:"操作系统",align:"center",prop:"os","show-overflow-tooltip":!0}),e(n,{label:"浏览器",align:"center",prop:"browser","show-overflow-tooltip":!0}),e(n,{label:"登录时间",align:"center",prop:"loginTime",width:"180"},{default:l(o=>[K("span",null,S(i.parseTime(o.row.loginTime)),1)]),_:1}),e(n,{label:"操作",align:"center","class-name":"small-padding fixed-width"},{default:l(o=>[k((b(),L(v,{link:"",type:"primary",icon:"Delete",onClick:A=>R(o.row)},{default:l(()=>[y("强退")]),_:2},1032,["onClick"])),[[q,["monitor:online:forceLogout"]]])]),_:1})]),_:1},8,["data"])),[[P,t(_)]]),k(e($,{total:t(g),page:t(r),"onUpdate:page":a[2]||(a[2]=o=>B(r)?r.value=o:null),limit:t(u),"onUpdate:limit":a[3]||(a[3]=o=>B(u)?u.value=o:null)},null,8,["total","page","limit"]),[[z,t(g)>0]])])}}});export{J as default};