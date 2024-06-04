import{V as y,r as c,e as oe,N as ae,h as p,K as te,o as R,c as ne,L as N,M,k as o,i as e,j as n,p as de,x as k,I as q,s as re,n as P,t as A,H as ue,z as ie}from"./index-BP30Yz_m.js";function pe(s){return y({url:"/agv/hai/task/list",method:"get",params:s})}function me(s){return y({url:"/agv/hai/task/"+s,method:"get"})}function se(s){return y({url:"/agv/hai/task",method:"post",data:s})}function fe(s){return y({url:"/agv/hai/task",method:"put",data:s})}function ce(s){return y({url:"/agv/hai/task/"+s,method:"delete"})}const be={class:"app-container"},ge={class:"dialog-footer"},ke=ue({name:"Task"}),ye=Object.assign(ke,{setup(s){const{proxy:b}=ie(),L=c([]),g=c(!1),_=c(!0),C=c(!0),h=c([]),Y=c(!0),I=c(!0),w=c(0),x=c(""),z=oe({form:{},queryParams:{pageNum:1,pageSize:10,taskCode:null,taskType:null},rules:{taskCode:[{required:!0,message:"任务编码不能为空",trigger:"blur"}],taskType:[{required:!0,message:"任务类型不能为空",trigger:"change"}]}}),{queryParams:f,form:t,rules:B}=ae(z);function V(){_.value=!0,pe(f.value).then(i=>{L.value=i.rows,w.value=i.total,_.value=!1})}function K(){g.value=!1,T()}function T(){t.value={id:null,taskCode:null,taskType:null,taskPriority:null,taskGroupCode:null,taskGroupPriority:null,containerCode:null,containerType:null,fromLocationCode:null,toLocationCode:null,fromStationCode:null,toStationCode:null,robotCode:null,robotType:null,executionStartTime:null,executionEndTime:null,executionDuration:null,taskStatus:null,belongArea:null,remark:null,createId:null,createName:null,createTime:null,modifyId:null,modifyName:null,modifyTime:null,disable:null,companyId:null},b.resetForm("taskRef")}function S(){f.value.pageNum=1,V()}function F(){b.resetForm("queryRef"),S()}function Q(i){h.value=i.map(l=>l.id),Y.value=i.length!=1,I.value=!i.length}function j(){T(),g.value=!0,x.value="添加任务调度"}function U(i){T();const l=i.id||h.value;me(l).then(u=>{t.value=u.data,g.value=!0,x.value="修改任务调度"})}function H(){b.$refs.taskRef.validate(i=>{i&&(t.value.id!=null?fe(t.value).then(l=>{b.$modal.msgSuccess("修改成功"),g.value=!1,V()}):se(t.value).then(l=>{b.$modal.msgSuccess("新增成功"),g.value=!1,V()}))})}function E(i){const l=i.id||h.value;b.$modal.confirm('是否确认删除任务调度编号为"'+l+'"的数据项？').then(function(){return ce(l)}).then(()=>{V(),b.$modal.msgSuccess("删除成功")}).catch(()=>{})}function O(){b.download("agv/task/export",{...f.value},`task_${new Date().getTime()}.xlsx`)}return V(),(i,l)=>{const u=p("el-input"),d=p("el-form-item"),m=p("el-button"),G=p("el-form"),v=p("el-col"),J=p("right-toolbar"),W=p("el-row"),r=p("el-table-column"),X=p("el-table"),Z=p("pagination"),D=p("el-date-picker"),ee=p("el-dialog"),le=te("loading");return R(),ne("div",be,[N(e(G,{model:o(f),ref:"queryRef",inline:!0,"label-width":"68px"},{default:n(()=>[e(d,{label:"任务编码",prop:"taskCode"},{default:n(()=>[e(u,{modelValue:o(f).taskCode,"onUpdate:modelValue":l[0]||(l[0]=a=>o(f).taskCode=a),placeholder:"请输入任务编码",clearable:"",onKeyup:de(S,["enter"])},null,8,["modelValue","onKeyup"])]),_:1}),e(d,null,{default:n(()=>[e(m,{type:"primary",icon:"Search",onClick:S},{default:n(()=>[k("搜索")]),_:1}),e(m,{icon:"Refresh",onClick:F},{default:n(()=>[k("重置")]),_:1})]),_:1})]),_:1},8,["model"]),[[M,o(C)]]),e(W,{gutter:10,class:"mb8"},{default:n(()=>[e(v,{span:1.5},{default:n(()=>[e(m,{type:"primary",plain:"",icon:"Plus",onClick:j},{default:n(()=>[k("新增")]),_:1})]),_:1}),e(v,{span:1.5},{default:n(()=>[e(m,{type:"success",plain:"",icon:"Edit",disabled:o(Y),onClick:U},{default:n(()=>[k("修改")]),_:1},8,["disabled"])]),_:1}),e(v,{span:1.5},{default:n(()=>[e(m,{type:"danger",plain:"",icon:"Delete",disabled:o(I),onClick:E},{default:n(()=>[k("删除")]),_:1},8,["disabled"])]),_:1}),e(v,{span:1.5},{default:n(()=>[e(m,{type:"warning",plain:"",icon:"Download",onClick:O,class:"btn-export"},{default:n(()=>[k("导出")]),_:1})]),_:1}),e(J,{showSearch:o(C),"onUpdate:showSearch":l[1]||(l[1]=a=>q(C)?C.value=a:null),onQueryTable:V},null,8,["showSearch"])]),_:1}),N((R(),re(X,{data:o(L),onSelectionChange:Q,border:""},{default:n(()=>[e(r,{type:"selection",width:"55",align:"center"}),e(r,{label:"序号",type:"index",width:"65",align:"center",fixed:"left"}),e(r,{label:"任务编码",width:"200",align:"center",prop:"taskCode",fixed:"left"}),e(r,{label:"任务类型",width:"200",align:"center",prop:"taskType",fixed:"left"}),e(r,{label:"起始库位",width:"150",align:"center",prop:"fromLocationCode"}),e(r,{label:"目标库位",width:"150",align:"center",prop:"toLocationCode"}),e(r,{label:"起始工作站",width:"100",align:"center",prop:"fromStationCode"}),e(r,{label:"目标工作站",width:"100",align:"center",prop:"toStationCode"}),e(r,{label:"容器编号",width:"120",align:"center",prop:"containerCode"}),e(r,{label:"容器类型",width:"200",align:"center",prop:"containerType"}),e(r,{label:"任务组编码",width:"230",align:"center",prop:"taskGroupCode"}),e(r,{label:"机器人编码",width:"100",align:"center",prop:"robotCode"}),e(r,{label:"机器人类型",width:"100",align:"center",prop:"robotType"}),e(r,{label:"任务组优选级",width:"150",align:"center",prop:"taskGroupPriority"}),e(r,{label:"任务优选级",width:"150",align:"center",prop:"taskPriority"}),e(r,{label:"执行开始时间",align:"center",prop:"executionStartTime",width:"120"},{default:n(a=>[P("span",null,A(i.parseTime(a.row.executionStartTime,"{y}-{m}-{d}")),1)]),_:1}),e(r,{label:"执行结束时间",align:"center",prop:"executionEndTime",width:"120"},{default:n(a=>[P("span",null,A(i.parseTime(a.row.executionEndTime,"{y}-{m}-{d}")),1)]),_:1}),e(r,{label:"执行时长",align:"center",prop:"executionDuration"}),e(r,{label:"归属区域",align:"center",prop:"belongArea"}),e(r,{label:"任务状态",align:"center",prop:"taskStatus",fixed:"right"}),e(r,{label:"创建时间",align:"center",prop:"createTime",width:"180",fixed:"right"}),e(r,{label:"操作",width:"100",align:"center","class-name":"small-padding fixed-width",fixed:"right"},{default:n(a=>[e(m,{link:"",type:"primary",icon:"View",onClick:$=>U(a.row)},null,8,["onClick"]),e(m,{link:"",type:"primary",icon:"Edit",onClick:$=>U(a.row)},null,8,["onClick"]),e(m,{link:"",type:"primary",icon:"Delete",onClick:$=>E(a.row)},null,8,["onClick"])]),_:1})]),_:1},8,["data"])),[[le,o(_)]]),N(e(Z,{total:o(w),page:o(f).pageNum,"onUpdate:page":l[2]||(l[2]=a=>o(f).pageNum=a),limit:o(f).pageSize,"onUpdate:limit":l[3]||(l[3]=a=>o(f).pageSize=a),onPagination:V},null,8,["total","page","limit"]),[[M,o(w)>0]]),e(ee,{title:o(x),modelValue:o(g),"onUpdate:modelValue":l[25]||(l[25]=a=>q(g)?g.value=a:null),width:"500px","append-to-body":""},{footer:n(()=>[P("div",ge,[e(m,{type:"primary",class:"btn-confirm",onClick:H},{default:n(()=>[k("确 定")]),_:1}),e(m,{onClick:K,class:"btn-cancel"},{default:n(()=>[k("取 消")]),_:1})])]),default:n(()=>[e(G,{ref:"taskRef",model:o(t),rules:o(B),"label-width":"80px"},{default:n(()=>[e(d,{label:"任务编码",prop:"taskCode"},{default:n(()=>[e(u,{modelValue:o(t).taskCode,"onUpdate:modelValue":l[4]||(l[4]=a=>o(t).taskCode=a),placeholder:"请输入任务编码"},null,8,["modelValue"])]),_:1}),e(d,{label:"任务组优选级",prop:"taskPriority"},{default:n(()=>[e(u,{modelValue:o(t).taskPriority,"onUpdate:modelValue":l[5]||(l[5]=a=>o(t).taskPriority=a),placeholder:"请输入任务组优选级"},null,8,["modelValue"])]),_:1}),e(d,{label:"任务组编码",prop:"taskGroupCode"},{default:n(()=>[e(u,{modelValue:o(t).taskGroupCode,"onUpdate:modelValue":l[6]||(l[6]=a=>o(t).taskGroupCode=a),placeholder:"请输入任务组编码"},null,8,["modelValue"])]),_:1}),e(d,{label:"任务组优选级",prop:"taskGroupPriority"},{default:n(()=>[e(u,{modelValue:o(t).taskGroupPriority,"onUpdate:modelValue":l[7]||(l[7]=a=>o(t).taskGroupPriority=a),placeholder:"请输入任务组优选级"},null,8,["modelValue"])]),_:1}),e(d,{label:"容器编号",prop:"containerCode"},{default:n(()=>[e(u,{modelValue:o(t).containerCode,"onUpdate:modelValue":l[8]||(l[8]=a=>o(t).containerCode=a),placeholder:"请输入容器编号"},null,8,["modelValue"])]),_:1}),e(d,{label:"起始库位",prop:"fromLocationCode"},{default:n(()=>[e(u,{modelValue:o(t).fromLocationCode,"onUpdate:modelValue":l[9]||(l[9]=a=>o(t).fromLocationCode=a),placeholder:"请输入起始库位"},null,8,["modelValue"])]),_:1}),e(d,{label:"目标库位",prop:"toLocationCode"},{default:n(()=>[e(u,{modelValue:o(t).toLocationCode,"onUpdate:modelValue":l[10]||(l[10]=a=>o(t).toLocationCode=a),placeholder:"请输入目标库位"},null,8,["modelValue"])]),_:1}),e(d,{label:"起始工作站",prop:"fromStationCode"},{default:n(()=>[e(u,{modelValue:o(t).fromStationCode,"onUpdate:modelValue":l[11]||(l[11]=a=>o(t).fromStationCode=a),placeholder:"请输入起始工作站"},null,8,["modelValue"])]),_:1}),e(d,{label:"目标工作站",prop:"toStationCode"},{default:n(()=>[e(u,{modelValue:o(t).toStationCode,"onUpdate:modelValue":l[12]||(l[12]=a=>o(t).toStationCode=a),placeholder:"请输入目标工作站"},null,8,["modelValue"])]),_:1}),e(d,{label:"机器人编码",prop:"robotCode"},{default:n(()=>[e(u,{modelValue:o(t).robotCode,"onUpdate:modelValue":l[13]||(l[13]=a=>o(t).robotCode=a),placeholder:"请输入机器人编码"},null,8,["modelValue"])]),_:1}),e(d,{label:"执行开始时间",prop:"executionStartTime"},{default:n(()=>[e(D,{clearable:"",modelValue:o(t).executionStartTime,"onUpdate:modelValue":l[14]||(l[14]=a=>o(t).executionStartTime=a),type:"date","value-format":"YYYY-MM-DD",placeholder:"请选择执行开始时间"},null,8,["modelValue"])]),_:1}),e(d,{label:"执行结束时间",prop:"executionEndTime"},{default:n(()=>[e(D,{clearable:"",modelValue:o(t).executionEndTime,"onUpdate:modelValue":l[15]||(l[15]=a=>o(t).executionEndTime=a),type:"date","value-format":"YYYY-MM-DD",placeholder:"请选择执行结束时间"},null,8,["modelValue"])]),_:1}),e(d,{label:"执行时长",prop:"executionDuration"},{default:n(()=>[e(u,{modelValue:o(t).executionDuration,"onUpdate:modelValue":l[16]||(l[16]=a=>o(t).executionDuration=a),placeholder:"请输入执行时长"},null,8,["modelValue"])]),_:1}),e(d,{label:"归属区域|仓库",prop:"belongArea"},{default:n(()=>[e(u,{modelValue:o(t).belongArea,"onUpdate:modelValue":l[17]||(l[17]=a=>o(t).belongArea=a),placeholder:"请输入归属区域|仓库"},null,8,["modelValue"])]),_:1}),e(d,{label:"备注",prop:"remark"},{default:n(()=>[e(u,{modelValue:o(t).remark,"onUpdate:modelValue":l[18]||(l[18]=a=>o(t).remark=a),placeholder:"请输入备注"},null,8,["modelValue"])]),_:1}),e(d,{label:"创建人",prop:"createId"},{default:n(()=>[e(u,{modelValue:o(t).createId,"onUpdate:modelValue":l[19]||(l[19]=a=>o(t).createId=a),placeholder:"请输入创建人"},null,8,["modelValue"])]),_:1}),e(d,{label:"创建人昵称",prop:"createName"},{default:n(()=>[e(u,{modelValue:o(t).createName,"onUpdate:modelValue":l[20]||(l[20]=a=>o(t).createName=a),placeholder:"请输入创建人昵称"},null,8,["modelValue"])]),_:1}),e(d,{label:"更新人",prop:"modifyId"},{default:n(()=>[e(u,{modelValue:o(t).modifyId,"onUpdate:modelValue":l[21]||(l[21]=a=>o(t).modifyId=a),placeholder:"请输入更新人"},null,8,["modelValue"])]),_:1}),e(d,{label:"修改人昵称",prop:"modifyName"},{default:n(()=>[e(u,{modelValue:o(t).modifyName,"onUpdate:modelValue":l[22]||(l[22]=a=>o(t).modifyName=a),placeholder:"请输入修改人昵称"},null,8,["modelValue"])]),_:1}),e(d,{label:"更新时间",prop:"modifyTime"},{default:n(()=>[e(D,{clearable:"",modelValue:o(t).modifyTime,"onUpdate:modelValue":l[23]||(l[23]=a=>o(t).modifyTime=a),type:"date","value-format":"YYYY-MM-DD",placeholder:"请选择更新时间"},null,8,["modelValue"])]),_:1}),e(d,{label:"0正常 1禁用",prop:"disable"},{default:n(()=>[e(u,{modelValue:o(t).disable,"onUpdate:modelValue":l[24]||(l[24]=a=>o(t).disable=a),placeholder:"请输入0正常 1禁用"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["title","modelValue"])])}}});export{ye as default};