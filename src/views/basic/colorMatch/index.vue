<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" >
      <el-form-item label="生产制单号" prop="productionDocumentNum">
        <el-input
          v-model="queryParams.productionDocumentNum"
          placeholder="请输入生产制单号"
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

    <el-table v-loading="loading" :data="colorMatchList" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55" align="center" />
<!--      <el-table-column label="${comment}" align="center" prop="colorMatchId" />-->
      <el-table-column label="生产制单号" align="center" prop="productionDocumentNum" />
      <el-table-column label="款号" align="center" prop="styleNum" />
      <el-table-column label="款号颜色" align="center" prop="styleColour" />
      <el-table-column label="布料编号" align="center" prop="clothNum" />
      <el-table-column label="布料颜色" align="center" prop="clothColour" />
      <el-table-column label="部位" align="center" prop="part" />
      <el-table-column label="部位描述" align="center" prop="partDescribe" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template #default="{row}">
          <el-tooltip
              class="box-item"
              effect="dark"
              :content="$t('edit')"
              placement="top-start"
          >
            <el-button link type="primary" icon="Edit"  @click="handleUpdate(row)"
                       >
            </el-button>
          </el-tooltip>
          <el-tooltip
              class="box-item"
              effect="dark"
              :content="$t('delete')"
              placement="top-start"
          >
            <el-button link type="primary" icon="Delete"  @click="handleDelete(row)"
                       >
            </el-button>
          </el-tooltip>
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

    <!-- 添加或修改配色对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="colorMatchRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="生产制单号" prop="productionDocumentNum">
          <el-input v-model="form.productionDocumentNum" placeholder="请输入生产制单号" />
        </el-form-item>
        <el-form-item label="款号" prop="styleNum">
          <el-input v-model="form.styleNum" placeholder="请输入款号" />
        </el-form-item>
        <el-form-item label="款号颜色" prop="styleColour">
          <el-input v-model="form.styleColour" placeholder="请输入款号颜色" />
        </el-form-item>
        <el-form-item label="布料编号" prop="clothNum">
          <el-input v-model="form.clothNum" placeholder="请输入布料编号" />
        </el-form-item>
        <el-form-item label="布料颜色" prop="clothColour">
          <el-input v-model="form.clothColour" placeholder="请输入布料颜色" />
        </el-form-item>
        <el-form-item label="部位" prop="part">
          <el-input v-model="form.part" placeholder="请输入部位" />
        </el-form-item>
        <el-form-item label="部位描述" prop="partDescribe">
          <el-input v-model="form.partDescribe" placeholder="请输入部位描述" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" :loading="useSettingsStore().loading" @click="submitForm">确 定</el-button>
          <el-button @click="cancel" class="btn-cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="ColorMatch">
import { listColorMatch, getColorMatch, delColorMatch, addColorMatch, updateColorMatch } from "@/api/basic/colorMatch";
import useSettingsStore from "@/store/modules/settings.js";

const { proxy } = getCurrentInstance();

const colorMatchList = ref([]);
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
    productionDocumentNum: null,
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询配色列表 */
function getList() {
  loading.value = true;
  listColorMatch(queryParams.value).then(response => {
    colorMatchList.value = response.rows;
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
    colorMatchId: null,
    productionDocumentNum: null,
    styleNum: null,
    styleColour: null,
    clothNum: null,
    clothColour: null,
    part: null,
    partDescribe: null,
    createUserId: null,
    createTime: null,
    updateUserId: null,
    updateTime: null,
    delFlag: null
  };
  proxy.resetForm("colorMatchRef");
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
  ids.value = selection.map(item => item.colorMatchId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加配色";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _colorMatchId = row.colorMatchId || ids.value
  getColorMatch(_colorMatchId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改配色";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["colorMatchRef"].validate(valid => {
    if (valid) {
      if (form.value.colorMatchId != null) {
        updateColorMatch(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addColorMatch(form.value).then(response => {
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
  const _colorMatchIds = row.colorMatchId || ids.value;
  proxy.$modal.confirm('是否确认删除配色编号为"' + _colorMatchIds + '"的数据项？').then(function() {
    return delColorMatch(_colorMatchIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('bok/colorMatch/export', {
    ...queryParams.value
  }, `colorMatch_${new Date().getTime()}.xlsx`)
}

getList();
</script>
