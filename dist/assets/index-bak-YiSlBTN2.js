import{V as _,r as f,e as ne,N as re,h as p,K as A,o as C,c as de,L as y,M as z,k as a,i as e,j as n,p as ue,x as k,s as v,I as B,n as U,t as Y,H as ie,z as pe}from"./index-BP30Yz_m.js";function me(m){return _({url:"/agv/xun/task/list",method:"get",params:m})}function se(m){return _({url:"/agv/xun/task/"+m,method:"get"})}function ce(m){return _({url:"/agv/xun/task",method:"post",data:m})}function fe(m){return _({url:"/agv/xun/task",method:"put",data:m})}function ge(m){return _({url:"/agv/xun/task/"+m,method:"delete"})}const be={class:"app-container"},ke={class:"dialog-footer"},Ve=ie({name:"Task"}),Ce=Object.assign(Ve,{setup(m){const{proxy:g}=pe(),q=f([]),b=f(!1),w=f(!0),x=f(!0),h=f([]),G=f(!0),E=f(!0),N=f(0),D=f(""),K=ne({form:{},queryParams:{pageNum:1,pageSize:10,taskCode:null},rules:{taskCode:[{required:!0,message:"任务编码不能为空",trigger:"blur"}],taskType:[{required:!0,message:"任务类型不能为空",trigger:"change"}],taskGroupCode:[{required:!0,message:"任务组编码不能为空",trigger:"blur"}],containerCode:[{required:!0,message:"容器编号不能为空",trigger:"blur"}],containerType:[{required:!0,message:"容器类型不能为空",trigger:"change"}],robotCode:[{required:!0,message:"机器人编码不能为空",trigger:"blur"}]}}),{queryParams:c,form:t,rules:F}=re(K);function V(){w.value=!0,me(c.value).then(i=>{q.value=i.rows,N.value=i.total,w.value=!1})}function Q(){b.value=!1,I()}function I(){t.value={id:null,taskCode:null,taskType:null,taskPriority:null,taskGroupCode:null,taskGroupPriority:null,containerCode:null,containerType:null,fromLocationCode:null,toLocationCode:null,fromStationCode:null,toStationCode:null,robotCode:null,robotType:null,executionStartTime:null,executionEndTime:null,executionDuration:null,taskStatus:null,belongArea:null,remark:null,createId:null,createName:null,createTime:null,modifyId:null,modifyName:null,modifyTime:null,disable:null,companyId:null},g.resetForm("taskRef")}function P(){c.value.pageNum=1,V()}function X(){g.resetForm("queryRef"),P()}function j(i){h.value=i.map(l=>l.id),G.value=i.length!=1,E.value=!i.length}function H(){I(),b.value=!0,D.value="添加任务调度-XUN"}function R(i){I();const l=i.id||h.value;se(l).then(u=>{t.value=u.data,b.value=!0,D.value="修改任务调度-XUN"})}function O(){g.$refs.taskRef.validate(i=>{i&&(t.value.id!=null?fe(t.value).then(l=>{g.$modal.msgSuccess("修改成功"),b.value=!1,V()}):ce(t.value).then(l=>{g.$modal.msgSuccess("新增成功"),b.value=!1,V()}))})}function $(i){const l=i.id||h.value;g.$modal.confirm('是否确认删除任务调度-XUN编号为"'+l+'"的数据项？').then(function(){return ge(l)}).then(()=>{V(),g.$modal.msgSuccess("删除成功")}).catch(()=>{})}function J(){g.download("agv/xun/task/export",{...c.value},`task_${new Date().getTime()}.xlsx`)}return V(),(i,l)=>{const u=p("el-input"),d=p("el-form-item"),s=p("el-button"),M=p("el-form"),T=p("el-col"),W=p("right-toolbar"),Z=p("el-row"),r=p("el-table-column"),ee=p("el-table"),le=p("pagination"),L=p("el-date-picker"),oe=p("el-dialog"),S=A("hasPermi"),ae=A("loading");return C(),de("div",be,[y(e(M,{model:"queryParams",ref:"queryRef",inline:!0,"label-width":"68px"},{default:n(()=>[e(d,{label:"任务编码",prop:"taskCode"},{default:n(()=>[e(u,{modelValue:a(c).taskCode,"onUpdate:modelValue":l[0]||(l[0]=o=>a(c).taskCode=o),placeholder:"请输入任务编码",clearable:"",onKeyup:ue(P,["enter"])},null,8,["modelValue","onKeyup"])]),_:1}),e(d,null,{default:n(()=>[e(s,{type:"primary",icon:"Search",onClick:P},{default:n(()=>[k("搜索")]),_:1}),e(s,{icon:"Refresh",onClick:X},{default:n(()=>[k("重置")]),_:1})]),_:1})]),_:1},512),[[z,a(x)]]),e(Z,{gutter:10,class:"mb8"},{default:n(()=>[e(T,{span:1.5},{default:n(()=>[y((C(),v(s,{type:"primary",plain:"",icon:"Plus",onClick:H},{default:n(()=>[k("新增")]),_:1})),[[S,["agv/xun:task:add"]]])]),_:1}),e(T,{span:1.5},{default:n(()=>[y((C(),v(s,{type:"success",plain:"",icon:"Edit",disabled:a(G),onClick:R},{default:n(()=>[k("修改")]),_:1},8,["disabled"])),[[S,["agv/xun:task:edit"]]])]),_:1}),e(T,{span:1.5},{default:n(()=>[y((C(),v(s,{type:"danger",plain:"",icon:"Delete",disabled:a(E),onClick:$},{default:n(()=>[k("删除")]),_:1},8,["disabled"])),[[S,["agv/xun:task:remove"]]])]),_:1}),e(T,{span:1.5},{default:n(()=>[y((C(),v(s,{type:"warning",plain:"",icon:"Download",onClick:J,class:"btn-export"},{default:n(()=>[k("导出")]),_:1})),[[S,["agv/xun:task:export"]]])]),_:1}),e(W,{showSearch:a(x),"onUpdate:showSearch":l[1]||(l[1]=o=>B(x)?x.value=o:null),onQueryTable:V},null,8,["showSearch"])]),_:1}),y((C(),v(ee,{data:a(q),onSelectionChange:j},{default:n(()=>[e(r,{type:"selection",width:"55",align:"center"}),e(r,{label:"主键",align:"center",prop:"id"}),e(r,{label:"任务编码",align:"center",prop:"taskCode"}),e(r,{label:"任务类型",align:"center",prop:"taskType"}),e(r,{label:"任务组优选级",align:"center",prop:"taskPriority"}),e(r,{label:"任务组编码",align:"center",prop:"taskGroupCode"}),e(r,{label:"任务组优选级",align:"center",prop:"taskGroupPriority"}),e(r,{label:"容器编号",align:"center",prop:"containerCode"}),e(r,{label:"容器类型",align:"center",prop:"containerType"}),e(r,{label:"起始库位",align:"center",prop:"fromLocationCode"}),e(r,{label:"目标库位",align:"center",prop:"toLocationCode"}),e(r,{label:"起始工作站",align:"center",prop:"fromStationCode"}),e(r,{label:"目标工作站",align:"center",prop:"toStationCode"}),e(r,{label:"机器人编码",align:"center",prop:"robotCode"}),e(r,{label:"机器人类型",align:"center",prop:"robotType"}),e(r,{label:"执行开始时间",align:"center",prop:"executionStartTime",width:"180"},{default:n(o=>[U("span",null,Y(i.parseTime(o.row.executionStartTime,"{y}-{m}-{d}")),1)]),_:1}),e(r,{label:"执行结束时间",align:"center",prop:"executionEndTime",width:"180"},{default:n(o=>[U("span",null,Y(i.parseTime(o.row.executionEndTime,"{y}-{m}-{d}")),1)]),_:1}),e(r,{label:"执行时长",align:"center",prop:"executionDuration"}),e(r,{label:"任务状态",align:"center",prop:"taskStatus"}),e(r,{label:"归属区域|仓库",align:"center",prop:"belongArea"}),e(r,{label:"备注",align:"center",prop:"remark"}),e(r,{label:"创建人",align:"center",prop:"createId"}),e(r,{label:"创建人昵称",align:"center",prop:"createName"}),e(r,{label:"更新人",align:"center",prop:"modifyId"}),e(r,{label:"修改人昵称",align:"center",prop:"modifyName"}),e(r,{label:"更新时间",align:"center",prop:"modifyTime",width:"180"},{default:n(o=>[U("span",null,Y(i.parseTime(o.row.modifyTime,"{y}-{m}-{d}")),1)]),_:1}),e(r,{label:"0正常 1禁用",align:"center",prop:"disable"}),e(r,{label:"公司id",align:"center",prop:"companyId"}),e(r,{label:"操作",align:"center","class-name":"small-padding fixed-width"},{default:n(o=>[e(s,{link:"",type:"primary",icon:"Edit",onClick:te=>R(o.row)},null,8,["onClick"]),e(s,{link:"",type:"primary",icon:"Delete",onClick:te=>$(o.row)},null,8,["onClick"])]),_:1})]),_:1},8,["data"])),[[ae,a(w)]]),y(e(le,{total:a(N),page:a(c).pageNum,"onUpdate:page":l[2]||(l[2]=o=>a(c).pageNum=o),limit:a(c).pageSize,"onUpdate:limit":l[3]||(l[3]=o=>a(c).pageSize=o),onPagination:V},null,8,["total","page","limit"]),[[z,a(N)>0]]),e(oe,{title:a(D),modelValue:a(b),"onUpdate:modelValue":l[26]||(l[26]=o=>B(b)?b.value=o:null),width:"500px","append-to-body":""},{footer:n(()=>[U("div",ke,[e(s,{type:"primary",class:"btn-confirm",onClick:O},{default:n(()=>[k("确 定")]),_:1}),e(s,{onClick:Q,class:"btn-cancel"},{default:n(()=>[k("取 消")]),_:1})])]),default:n(()=>[e(M,{ref:"taskRef",model:a(t),rules:a(F),"label-width":"80px"},{default:n(()=>[e(d,{label:"任务编码",prop:"taskCode"},{default:n(()=>[e(u,{modelValue:a(t).taskCode,"onUpdate:modelValue":l[4]||(l[4]=o=>a(t).taskCode=o),placeholder:"请输入任务编码"},null,8,["modelValue"])]),_:1}),e(d,{label:"任务组优选级",prop:"taskPriority"},{default:n(()=>[e(u,{modelValue:a(t).taskPriority,"onUpdate:modelValue":l[5]||(l[5]=o=>a(t).taskPriority=o),placeholder:"请输入任务组优选级"},null,8,["modelValue"])]),_:1}),e(d,{label:"任务组编码",prop:"taskGroupCode"},{default:n(()=>[e(u,{modelValue:a(t).taskGroupCode,"onUpdate:modelValue":l[6]||(l[6]=o=>a(t).taskGroupCode=o),placeholder:"请输入任务组编码"},null,8,["modelValue"])]),_:1}),e(d,{label:"任务组优选级",prop:"taskGroupPriority"},{default:n(()=>[e(u,{modelValue:a(t).taskGroupPriority,"onUpdate:modelValue":l[7]||(l[7]=o=>a(t).taskGroupPriority=o),placeholder:"请输入任务组优选级"},null,8,["modelValue"])]),_:1}),e(d,{label:"容器编号",prop:"containerCode"},{default:n(()=>[e(u,{modelValue:a(t).containerCode,"onUpdate:modelValue":l[8]||(l[8]=o=>a(t).containerCode=o),placeholder:"请输入容器编号"},null,8,["modelValue"])]),_:1}),e(d,{label:"起始库位",prop:"fromLocationCode"},{default:n(()=>[e(u,{modelValue:a(t).fromLocationCode,"onUpdate:modelValue":l[9]||(l[9]=o=>a(t).fromLocationCode=o),placeholder:"请输入起始库位"},null,8,["modelValue"])]),_:1}),e(d,{label:"目标库位",prop:"toLocationCode"},{default:n(()=>[e(u,{modelValue:a(t).toLocationCode,"onUpdate:modelValue":l[10]||(l[10]=o=>a(t).toLocationCode=o),placeholder:"请输入目标库位"},null,8,["modelValue"])]),_:1}),e(d,{label:"起始工作站",prop:"fromStationCode"},{default:n(()=>[e(u,{modelValue:a(t).fromStationCode,"onUpdate:modelValue":l[11]||(l[11]=o=>a(t).fromStationCode=o),placeholder:"请输入起始工作站"},null,8,["modelValue"])]),_:1}),e(d,{label:"目标工作站",prop:"toStationCode"},{default:n(()=>[e(u,{modelValue:a(t).toStationCode,"onUpdate:modelValue":l[12]||(l[12]=o=>a(t).toStationCode=o),placeholder:"请输入目标工作站"},null,8,["modelValue"])]),_:1}),e(d,{label:"机器人编码",prop:"robotCode"},{default:n(()=>[e(u,{modelValue:a(t).robotCode,"onUpdate:modelValue":l[13]||(l[13]=o=>a(t).robotCode=o),placeholder:"请输入机器人编码"},null,8,["modelValue"])]),_:1}),e(d,{label:"执行开始时间",prop:"executionStartTime"},{default:n(()=>[e(L,{clearable:"",modelValue:a(t).executionStartTime,"onUpdate:modelValue":l[14]||(l[14]=o=>a(t).executionStartTime=o),type:"date","value-format":"YYYY-MM-DD",placeholder:"请选择执行开始时间"},null,8,["modelValue"])]),_:1}),e(d,{label:"执行结束时间",prop:"executionEndTime"},{default:n(()=>[e(L,{clearable:"",modelValue:a(t).executionEndTime,"onUpdate:modelValue":l[15]||(l[15]=o=>a(t).executionEndTime=o),type:"date","value-format":"YYYY-MM-DD",placeholder:"请选择执行结束时间"},null,8,["modelValue"])]),_:1}),e(d,{label:"执行时长",prop:"executionDuration"},{default:n(()=>[e(u,{modelValue:a(t).executionDuration,"onUpdate:modelValue":l[16]||(l[16]=o=>a(t).executionDuration=o),placeholder:"请输入执行时长"},null,8,["modelValue"])]),_:1}),e(d,{label:"归属区域|仓库",prop:"belongArea"},{default:n(()=>[e(u,{modelValue:a(t).belongArea,"onUpdate:modelValue":l[17]||(l[17]=o=>a(t).belongArea=o),placeholder:"请输入归属区域|仓库"},null,8,["modelValue"])]),_:1}),e(d,{label:"备注",prop:"remark"},{default:n(()=>[e(u,{modelValue:a(t).remark,"onUpdate:modelValue":l[18]||(l[18]=o=>a(t).remark=o),placeholder:"请输入备注"},null,8,["modelValue"])]),_:1}),e(d,{label:"创建人",prop:"createId"},{default:n(()=>[e(u,{modelValue:a(t).createId,"onUpdate:modelValue":l[19]||(l[19]=o=>a(t).createId=o),placeholder:"请输入创建人"},null,8,["modelValue"])]),_:1}),e(d,{label:"创建人昵称",prop:"createName"},{default:n(()=>[e(u,{modelValue:a(t).createName,"onUpdate:modelValue":l[20]||(l[20]=o=>a(t).createName=o),placeholder:"请输入创建人昵称"},null,8,["modelValue"])]),_:1}),e(d,{label:"更新人",prop:"modifyId"},{default:n(()=>[e(u,{modelValue:a(t).modifyId,"onUpdate:modelValue":l[21]||(l[21]=o=>a(t).modifyId=o),placeholder:"请输入更新人"},null,8,["modelValue"])]),_:1}),e(d,{label:"修改人昵称",prop:"modifyName"},{default:n(()=>[e(u,{modelValue:a(t).modifyName,"onUpdate:modelValue":l[22]||(l[22]=o=>a(t).modifyName=o),placeholder:"请输入修改人昵称"},null,8,["modelValue"])]),_:1}),e(d,{label:"更新时间",prop:"modifyTime"},{default:n(()=>[e(L,{clearable:"",modelValue:a(t).modifyTime,"onUpdate:modelValue":l[23]||(l[23]=o=>a(t).modifyTime=o),type:"date","value-format":"YYYY-MM-DD",placeholder:"请选择更新时间"},null,8,["modelValue"])]),_:1}),e(d,{label:"0正常 1禁用",prop:"disable"},{default:n(()=>[e(u,{modelValue:a(t).disable,"onUpdate:modelValue":l[24]||(l[24]=o=>a(t).disable=o),placeholder:"请输入0正常 1禁用"},null,8,["modelValue"])]),_:1}),e(d,{label:"公司id",prop:"companyId"},{default:n(()=>[e(u,{modelValue:a(t).companyId,"onUpdate:modelValue":l[25]||(l[25]=o=>a(t).companyId=o),placeholder:"请输入公司id"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["title","modelValue"])])}}});export{Ce as default};
