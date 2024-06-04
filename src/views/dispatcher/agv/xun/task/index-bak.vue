<template>
  <div class="app-container">
    <el-form model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="任务编码" prop="taskCode">
        <el-input
          v-model="queryParams.taskCode"
          placeholder="请输入任务编码"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Plus"
          @click="handleAdd"
          v-hasPermi="['agv/xun:task:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['agv/xun:task:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['agv/xun:task:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          class="btn-export"
          v-hasPermi="['agv/xun:task:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="taskList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="id" />
      <el-table-column label="任务编码" align="center" prop="taskCode" />
      <el-table-column label="任务类型" align="center" prop="taskType" />
      <el-table-column label="任务组优选级" align="center" prop="taskPriority" />
      <el-table-column label="任务组编码" align="center" prop="taskGroupCode" />
      <el-table-column label="任务组优选级" align="center" prop="taskGroupPriority" />
      <el-table-column label="容器编号" align="center" prop="containerCode" />
      <el-table-column label="容器类型" align="center" prop="containerType" />
      <el-table-column label="起始库位" align="center" prop="fromLocationCode" />
      <el-table-column label="目标库位" align="center" prop="toLocationCode" />
      <el-table-column label="起始工作站" align="center" prop="fromStationCode" />
      <el-table-column label="目标工作站" align="center" prop="toStationCode" />
      <el-table-column label="机器人编码" align="center" prop="robotCode" />
      <el-table-column label="机器人类型" align="center" prop="robotType" />
      <el-table-column label="执行开始时间" align="center" prop="executionStartTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.executionStartTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="执行结束时间" align="center" prop="executionEndTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.executionEndTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="执行时长" align="center" prop="executionDuration" />
      <el-table-column label="任务状态" align="center" prop="taskStatus" />
      <el-table-column label="归属区域|仓库" align="center" prop="belongArea" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="创建人" align="center" prop="createId" />
      <el-table-column label="创建人昵称" align="center" prop="createName" />
      <el-table-column label="更新人" align="center" prop="modifyId" />
      <el-table-column label="修改人昵称" align="center" prop="modifyName" />
      <el-table-column label="更新时间" align="center" prop="modifyTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.modifyTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="0正常 1禁用" align="center" prop="disable" />
      <el-table-column label="公司id" align="center" prop="companyId" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"></el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改任务调度-XUN对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="taskRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="任务编码" prop="taskCode">
          <el-input v-model="form.taskCode" placeholder="请输入任务编码" />
        </el-form-item>
        <el-form-item label="任务组优选级" prop="taskPriority">
          <el-input v-model="form.taskPriority" placeholder="请输入任务组优选级" />
        </el-form-item>
        <el-form-item label="任务组编码" prop="taskGroupCode">
          <el-input v-model="form.taskGroupCode" placeholder="请输入任务组编码" />
        </el-form-item>
        <el-form-item label="任务组优选级" prop="taskGroupPriority">
          <el-input v-model="form.taskGroupPriority" placeholder="请输入任务组优选级" />
        </el-form-item>
        <el-form-item label="容器编号" prop="containerCode">
          <el-input v-model="form.containerCode" placeholder="请输入容器编号" />
        </el-form-item>
        <el-form-item label="起始库位" prop="fromLocationCode">
          <el-input v-model="form.fromLocationCode" placeholder="请输入起始库位" />
        </el-form-item>
        <el-form-item label="目标库位" prop="toLocationCode">
          <el-input v-model="form.toLocationCode" placeholder="请输入目标库位" />
        </el-form-item>
        <el-form-item label="起始工作站" prop="fromStationCode">
          <el-input v-model="form.fromStationCode" placeholder="请输入起始工作站" />
        </el-form-item>
        <el-form-item label="目标工作站" prop="toStationCode">
          <el-input v-model="form.toStationCode" placeholder="请输入目标工作站" />
        </el-form-item>
        <el-form-item label="机器人编码" prop="robotCode">
          <el-input v-model="form.robotCode" placeholder="请输入机器人编码" />
        </el-form-item>
        <el-form-item label="执行开始时间" prop="executionStartTime">
          <el-date-picker clearable
            v-model="form.executionStartTime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择执行开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="执行结束时间" prop="executionEndTime">
          <el-date-picker clearable
            v-model="form.executionEndTime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择执行结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="执行时长" prop="executionDuration">
          <el-input v-model="form.executionDuration" placeholder="请输入执行时长" />
        </el-form-item>
        <el-form-item label="归属区域|仓库" prop="belongArea">
          <el-input v-model="form.belongArea" placeholder="请输入归属区域|仓库" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="创建人" prop="createId">
          <el-input v-model="form.createId" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="创建人昵称" prop="createName">
          <el-input v-model="form.createName" placeholder="请输入创建人昵称" />
        </el-form-item>
        <el-form-item label="更新人" prop="modifyId">
          <el-input v-model="form.modifyId" placeholder="请输入更新人" />
        </el-form-item>
        <el-form-item label="修改人昵称" prop="modifyName">
          <el-input v-model="form.modifyName" placeholder="请输入修改人昵称" />
        </el-form-item>
        <el-form-item label="更新时间" prop="modifyTime">
          <el-date-picker clearable
            v-model="form.modifyTime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择更新时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="0正常 1禁用" prop="disable">
          <el-input v-model="form.disable" placeholder="请输入0正常 1禁用" />
        </el-form-item>
        <el-form-item label="公司id" prop="companyId">
          <el-input v-model="form.companyId" placeholder="请输入公司id" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" class="btn-confirm" @click="submitForm">确 定</el-button>
          <el-button @click="cancel" class="btn-cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Task">
import { listTask, getTask, delTask, addTask, updateTask } from "@/api/agv/xun/task";

const { proxy } = getCurrentInstance();

const taskList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    taskCode: null,
  },
  rules: {
    taskCode: [
      { required: true, message: "任务编码不能为空", trigger: "blur" }
    ],
    taskType: [
      { required: true, message: "任务类型不能为空", trigger: "change" }
    ],
    taskGroupCode: [
      { required: true, message: "任务组编码不能为空", trigger: "blur" }
    ],
    containerCode: [
      { required: true, message: "容器编号不能为空", trigger: "blur" }
    ],
    containerType: [
      { required: true, message: "容器类型不能为空", trigger: "change" }
    ],
    robotCode: [
      { required: true, message: "机器人编码不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询任务调度-XUN列表 */
function getList() {
  loading.value = true;
  listTask(queryParams.value).then(response => {
    taskList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

// 取消按钮
function cancel() {
  open.value = false;
  reset();
}

// 表单重置
function reset() {
  form.value = {
    id: null,
    taskCode: null,
    taskType: null,
    taskPriority: null,
    taskGroupCode: null,
    taskGroupPriority: null,
    containerCode: null,
    containerType: null,
    fromLocationCode: null,
    toLocationCode: null,
    fromStationCode: null,
    toStationCode: null,
    robotCode: null,
    robotType: null,
    executionStartTime: null,
    executionEndTime: null,
    executionDuration: null,
    taskStatus: null,
    belongArea: null,
    remark: null,
    createId: null,
    createName: null,
    createTime: null,
    modifyId: null,
    modifyName: null,
    modifyTime: null,
    disable: null,
    companyId: null
  };
  proxy.resetForm("taskRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}

// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加任务调度-XUN";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value
  getTask(_id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改任务调度-XUN";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["taskRef"].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateTask(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addTask(form.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _ids = row.id || ids.value;
  proxy.$modal.confirm('是否确认删除任务调度-XUN编号为"' + _ids + '"的数据项？').then(function() {
    return delTask(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('agv/xun/task/export', {
    ...queryParams.value
  }, `task_${new Date().getTime()}.xlsx`)
}

getList();
</script>
