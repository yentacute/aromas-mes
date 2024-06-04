<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
      <el-form-item label="任务编码" prop="taskCode">
        <el-input
          v-model="queryParams.taskCode"
          placeholder="请输入任务编码"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="机器人编码" prop="robotCode">
        <el-input
          v-model="queryParams.robotCode"
          placeholder="请输入机器人编码"
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
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          class="btn-export"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="taskList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="主键" align="center" prop="taskId" /> -->
      <el-table-column label="任务编码" width="200" align="center" prop="taskCode" />
      <el-table-column label="任务类型" width="100" align="center" prop="taskType" />
      <el-table-column label="容器编号" width="200" align="center" prop="containerCode" />
      <el-table-column label="容器类型" width="200" align="center" prop="containerType" />
      <el-table-column label="起始库位" width="200" align="center" prop="fromLocationCode" />
      <el-table-column label="目标库位" width="200" align="center" prop="toLocationCode" />
      <el-table-column label="机器人编码" width="200" align="center" prop="robotCode" />
      <el-table-column label="机器人类型" width="200" align="center" prop="robotType" />
      <el-table-column label="执行开始时间" width="200" align="center" prop="executionStartTime" />
      <el-table-column label="执行结束时间" width="200" align="center" prop="executionEndTime" />
      <el-table-column label="执行时长" align="center" prop="executionDuration" />
      <el-table-column label="任务状态" align="center" prop="taskStatus" />
      <el-table-column label="归属仓库" align="center" prop="belongWarehouse" />
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

    <!-- 添加或修改任务调度对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="taskRef" :model="form" :rules="rules" >
        <el-form-item label="任务编码" prop="taskCode">
          <el-input v-model="form.taskCode" placeholder="请输入任务编码" />
        </el-form-item>
        <el-form-item label="机器人编码" prop="robotCode">
          <el-input v-model="form.robotCode" placeholder="请输入机器人编码" />
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
        <el-form-item label="执行开始时间" prop="executionStartTime">
          <el-input v-model="form.executionStartTime" placeholder="请输入执行开始时间" />
        </el-form-item>
        <el-form-item label="执行结束时间" prop="executionEndTime">
          <el-input v-model="form.executionEndTime" placeholder="请输入执行结束时间" />
        </el-form-item>
        <el-form-item label="执行时长" prop="executionDuration">
          <el-input v-model="form.executionDuration" placeholder="请输入执行时长" />
        </el-form-item>
        <el-form-item label="归属仓库" prop="belongWarehouse">
          <el-input v-model="form.belongWarehouse" placeholder="请输入归属仓库" />
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

<script setup name="TaskScheduling">
import { listTask, getTask, delTask, addTask, updateTask } from "@/api/dispatcher/taskScheduling";

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
    taskType: null,
    robotCode: null,
  },
  rules: {
    containerCode: [
      { required: true, message: "容器编号不能为空", trigger: "blur" }
    ],
    containerType: [
      { required: true, message: "容器类型不能为空", trigger: "change" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询任务调度列表 */
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
    taskId: null,
    taskCode: null,
    taskType: null,
    robotCode: null,
    robotType: null,
    containerCode: null,
    containerType: null,
    fromLocationCode: null,
    toLocationCode: null,
    executionStartTime: null,
    executionEndTime: null,
    executionDuration: null,
    taskStatus: null,
    belongWarehouse: null,
    isDelete: null,
    createUserId: null,
    createUserName: null,
    createTime: null,
    updateTime: null
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
  ids.value = selection.map(item => item.taskId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加任务调度";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _taskId = row.taskId || ids.value
  getTask(_taskId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改任务调度";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["taskRef"].validate(valid => {
    if (valid) {
      if (form.value.taskId != null) {
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
  const _taskIds = row.taskId || ids.value;
  proxy.$modal.confirm('是否确认删除任务调度编号为"' + _taskIds + '"的数据项？').then(function() {
    return delTask(_taskIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('bok/task/export', {
    ...queryParams.value
  }, `task_${new Date().getTime()}.xlsx`)
}

getList();
</script>
