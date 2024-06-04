import{r as k,w as P,h as u,o as f,s as N,j as l,i as e,x as o,k as w,v as U,c as y,F as v,L as $,q as _,M as G,n as I,z as H}from"./index-BP30Yz_m.js";import{l as J}from"./menu-DGXnTXMP.js";const K=I("i",{class:"el-icon-arrow-down el-icon--right"},null,-1),Q=I("h4",{class:"form-header"},"其他信息",-1),R=I("h4",{class:"form-header"},"关联信息",-1),Z={__name:"genInfoForm",props:{info:{type:Object,default:null},tables:{type:Array,default:null}},setup(t){const q=k([]),F=k([]),{proxy:M}=H(),c=t,W=k({tplCategory:[{required:!0,message:"请选择生成模板",trigger:"blur"}],packageName:[{required:!0,message:"请输入生成包路径",trigger:"blur"}],moduleName:[{required:!0,message:"请输入生成模块名",trigger:"blur"}],businessName:[{required:!0,message:"请输入生成业务名",trigger:"blur"}],functionName:[{required:!0,message:"请输入生成功能名",trigger:"blur"}]});function j(p){c.info.subTableFkName=""}function B(p){p!=="sub"&&(c.info.subTableName="",c.info.subTableFkName="")}function S(p){for(var a in c.tables){const i=c.tables[a].tableName;if(p===i){q.value=c.tables[a].columns;break}}}function z(){J().then(p=>{F.value=M.handleTree(p.data,"menuId")})}return P(()=>c.info.subTableName,p=>{S(p)}),P(()=>c.info.tplWebType,p=>{p===""&&(c.info.tplWebType="element-plus")}),z(),(p,a)=>{const i=u("el-option"),g=u("el-select"),d=u("el-form-item"),m=u("el-col"),r=u("question-filled"),s=u("el-icon"),b=u("el-tooltip"),C=u("el-input"),x=u("el-radio"),E=u("tree-select"),L=u("el-button"),O=u("el-dropdown-item"),h=u("el-dropdown-menu"),A=u("el-dropdown"),T=u("el-row"),D=u("el-form");return f(),N(D,{ref:"genInfoForm",model:t.info,rules:w(W),"label-width":"150px"},{default:l(()=>[e(T,null,{default:l(()=>[e(m,{span:12},{default:l(()=>[e(d,{prop:"tplCategory"},{label:l(()=>[o("生成模板")]),default:l(()=>[e(g,{modelValue:t.info.tplCategory,"onUpdate:modelValue":a[0]||(a[0]=n=>t.info.tplCategory=n),onChange:B},{default:l(()=>[e(i,{label:"单表（增删改查）",value:"crud"}),e(i,{label:"树表（增删改查）",value:"tree"}),e(i,{label:"主子表（增删改查）",value:"sub"})]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(m,{span:12},{default:l(()=>[e(d,{prop:"tplWebType"},{label:l(()=>[o("前端类型")]),default:l(()=>[e(g,{modelValue:t.info.tplWebType,"onUpdate:modelValue":a[1]||(a[1]=n=>t.info.tplWebType=n)},{default:l(()=>[e(i,{label:"Vue2 Element UI 模版",value:"element-ui"}),e(i,{label:"Vue3 Element Plus 模版",value:"element-plus"})]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(m,{span:12},{default:l(()=>[e(d,{prop:"packageName"},{label:l(()=>[o(" 生成包路径 "),e(b,{content:"生成在哪个java包下，例如 com.ruoyi.system",placement:"top"},{default:l(()=>[e(s,null,{default:l(()=>[e(r)]),_:1})]),_:1})]),default:l(()=>[e(C,{modelValue:t.info.packageName,"onUpdate:modelValue":a[2]||(a[2]=n=>t.info.packageName=n)},null,8,["modelValue"])]),_:1})]),_:1}),e(m,{span:12},{default:l(()=>[e(d,{prop:"moduleName"},{label:l(()=>[o(" 生成模块名 "),e(b,{content:"可理解为子系统名，例如 system",placement:"top"},{default:l(()=>[e(s,null,{default:l(()=>[e(r)]),_:1})]),_:1})]),default:l(()=>[e(C,{modelValue:t.info.moduleName,"onUpdate:modelValue":a[3]||(a[3]=n=>t.info.moduleName=n)},null,8,["modelValue"])]),_:1})]),_:1}),e(m,{span:12},{default:l(()=>[e(d,{prop:"businessName"},{label:l(()=>[o(" 生成业务名 "),e(b,{content:"可理解为功能英文名，例如 user",placement:"top"},{default:l(()=>[e(s,null,{default:l(()=>[e(r)]),_:1})]),_:1})]),default:l(()=>[e(C,{modelValue:t.info.businessName,"onUpdate:modelValue":a[4]||(a[4]=n=>t.info.businessName=n)},null,8,["modelValue"])]),_:1})]),_:1}),e(m,{span:12},{default:l(()=>[e(d,{prop:"functionName"},{label:l(()=>[o(" 生成功能名 "),e(b,{content:"用作类描述，例如 用户",placement:"top"},{default:l(()=>[e(s,null,{default:l(()=>[e(r)]),_:1})]),_:1})]),default:l(()=>[e(C,{modelValue:t.info.functionName,"onUpdate:modelValue":a[5]||(a[5]=n=>t.info.functionName=n)},null,8,["modelValue"])]),_:1})]),_:1}),e(m,{span:12},{default:l(()=>[e(d,{prop:"genType"},{label:l(()=>[o(" 生成代码方式 "),e(b,{content:"默认为zip压缩包下载，也可以自定义生成路径",placement:"top"},{default:l(()=>[e(s,null,{default:l(()=>[e(r)]),_:1})]),_:1})]),default:l(()=>[e(x,{modelValue:t.info.genType,"onUpdate:modelValue":a[6]||(a[6]=n=>t.info.genType=n),label:"0"},{default:l(()=>[o("zip压缩包")]),_:1},8,["modelValue"]),e(x,{modelValue:t.info.genType,"onUpdate:modelValue":a[7]||(a[7]=n=>t.info.genType=n),label:"1"},{default:l(()=>[o("自定义路径")]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(m,{span:12},{default:l(()=>[e(d,null,{label:l(()=>[o(" 上级菜单 "),e(b,{content:"分配到指定菜单下，例如 系统管理",placement:"top"},{default:l(()=>[e(s,null,{default:l(()=>[e(r)]),_:1})]),_:1})]),default:l(()=>[e(E,{value:t.info.parentMenuId,"onUpdate:value":a[8]||(a[8]=n=>t.info.parentMenuId=n),options:w(F),objMap:{value:"menuId",label:"menuName",children:"children"},placeholder:"请选择系统菜单"},null,8,["value","options"])]),_:1})]),_:1}),t.info.genType=="1"?(f(),N(m,{key:0,span:24},{default:l(()=>[e(d,{prop:"genPath"},{label:l(()=>[o(" 自定义路径 "),e(b,{content:"填写磁盘绝对路径，若不填写，则生成到当前Web项目下",placement:"top"},{default:l(()=>[e(s,null,{default:l(()=>[e(r)]),_:1})]),_:1})]),default:l(()=>[e(C,{modelValue:t.info.genPath,"onUpdate:modelValue":a[10]||(a[10]=n=>t.info.genPath=n)},{append:l(()=>[e(A,null,{dropdown:l(()=>[e(h,null,{default:l(()=>[e(O,{onClick:a[9]||(a[9]=n=>t.info.genPath="/")},{default:l(()=>[o("恢复默认的生成基础路径")]),_:1})]),_:1})]),default:l(()=>[e(L,{type:"primary"},{default:l(()=>[o(" 最近路径快速选择 "),K]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})):U("",!0)]),_:1}),t.info.tplCategory=="tree"?(f(),y(v,{key:0},[Q,$(e(T,null,{default:l(()=>[e(m,{span:12},{default:l(()=>[e(d,null,{label:l(()=>[o(" 树编码字段 "),e(b,{content:"树显示的编码字段名， 如：dept_id",placement:"top"},{default:l(()=>[e(s,null,{default:l(()=>[e(r)]),_:1})]),_:1})]),default:l(()=>[e(g,{modelValue:t.info.treeCode,"onUpdate:modelValue":a[11]||(a[11]=n=>t.info.treeCode=n),placeholder:"请选择"},{default:l(()=>[(f(!0),y(v,null,_(t.info.columns,(n,V)=>(f(),N(i,{key:V,label:n.columnName+"："+n.columnComment,value:n.columnName},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(m,{span:12},{default:l(()=>[e(d,null,{label:l(()=>[o(" 树父编码字段 "),e(b,{content:"树显示的父编码字段名， 如：parent_Id",placement:"top"},{default:l(()=>[e(s,null,{default:l(()=>[e(r)]),_:1})]),_:1})]),default:l(()=>[e(g,{modelValue:t.info.treeParentCode,"onUpdate:modelValue":a[12]||(a[12]=n=>t.info.treeParentCode=n),placeholder:"请选择"},{default:l(()=>[(f(!0),y(v,null,_(t.info.columns,(n,V)=>(f(),N(i,{key:V,label:n.columnName+"："+n.columnComment,value:n.columnName},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(m,{span:12},{default:l(()=>[e(d,null,{label:l(()=>[o(" 树名称字段 "),e(b,{content:"树节点的显示名称字段名， 如：dept_name",placement:"top"},{default:l(()=>[e(s,null,{default:l(()=>[e(r)]),_:1})]),_:1})]),default:l(()=>[e(g,{modelValue:t.info.treeName,"onUpdate:modelValue":a[13]||(a[13]=n=>t.info.treeName=n),placeholder:"请选择"},{default:l(()=>[(f(!0),y(v,null,_(t.info.columns,(n,V)=>(f(),N(i,{key:V,label:n.columnName+"："+n.columnComment,value:n.columnName},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},512),[[G,t.info.tplCategory=="tree"]])],64)):U("",!0),t.info.tplCategory=="sub"?(f(),y(v,{key:1},[R,e(T,null,{default:l(()=>[e(m,{span:12},{default:l(()=>[e(d,null,{label:l(()=>[o(" 关联子表的表名 "),e(b,{content:"关联子表的表名， 如：sys_user",placement:"top"},{default:l(()=>[e(s,null,{default:l(()=>[e(r)]),_:1})]),_:1})]),default:l(()=>[e(g,{modelValue:t.info.subTableName,"onUpdate:modelValue":a[14]||(a[14]=n=>t.info.subTableName=n),placeholder:"请选择",onChange:j},{default:l(()=>[(f(!0),y(v,null,_(t.tables,(n,V)=>(f(),N(i,{key:V,label:n.tableName+"："+n.tableComment,value:n.tableName},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(m,{span:12},{default:l(()=>[e(d,null,{label:l(()=>[o(" 子表关联的外键名 "),e(b,{content:"子表关联的外键名， 如：user_id",placement:"top"},{default:l(()=>[e(s,null,{default:l(()=>[e(r)]),_:1})]),_:1})]),default:l(()=>[e(g,{modelValue:t.info.subTableFkName,"onUpdate:modelValue":a[15]||(a[15]=n=>t.info.subTableFkName=n),placeholder:"请选择"},{default:l(()=>[(f(!0),y(v,null,_(w(q),(n,V)=>(f(),N(i,{key:V,label:n.columnName+"："+n.columnComment,value:n.columnName},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1})],64)):U("",!0)]),_:1},8,["model","rules"])}}};export{Z as default};
