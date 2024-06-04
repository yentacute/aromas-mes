<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" >
      <el-form-item label="
生产制单号" prop="productionDocumentNum">
        <el-input
          v-model="queryParams.productionDocumentNum"
          placeholder="请输入
生产制单号"
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

    <el-table v-loading="loading" :data="createDocumentList" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column type="index" width="150" :label="$t('serial_number')" align="center"/>
<!--      <el-table-column label="${comment}" align="center" prop="createDocumentId" />-->
      <el-table-column label="
生产制单号" align="center" prop="productionDocumentNum" />
      <el-table-column label="款号" align="center" prop="styleNum" />
      <el-table-column label="版号" align="center" prop="formatNum" />
      <el-table-column label="款号颜色" align="center" prop="styleColour" />
      <el-table-column label="尺码" align="center" prop="size" />
      <el-table-column label="数量" align="center" prop="quantity" />
      <el-table-column label="布料编号" align="center" prop="clothNum" />
      <el-table-column label="布料颜色" align="center" prop="clothColour" />
      <el-table-column label="布料需求量 " align="center" prop="clothDemand" />
      <el-table-column label="需求量单位" align="center" prop="clothUnit" />
      <el-table-column label="制程" align="center" prop="process" />
      <el-table-column label="生产制单日期" align="center" prop="productionDocumentTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.productionDocumentTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
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

    <!-- 添加或修改制单对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="createDocumentRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="
生产制单号" prop="productionDocumentNum">
          <el-input v-model="form.productionDocumentNum" placeholder="请输入
生产制单号" />
        </el-form-item>
        <el-form-item label="款号" prop="styleNum">
          <el-input v-model="form.styleNum" placeholder="请输入款号" />
        </el-form-item>
        <el-form-item label="版号" prop="formatNum">
          <el-input v-model="form.formatNum" placeholder="请输入版号" />
        </el-form-item>
        <el-form-item label="款号颜色" prop="styleColour">
          <el-input v-model="form.styleColour" placeholder="请输入款号颜色" />
        </el-form-item>
        <el-form-item label="尺码" prop="size">
          <el-input v-model="form.size" placeholder="请输入尺码" />
        </el-form-item>
        <el-form-item label="数量" prop="quantity">
          <el-input v-model="form.quantity" placeholder="请输入数量" />
        </el-form-item>
        <el-form-item label="布料编号" prop="clothNum">
          <el-input v-model="form.clothNum" placeholder="请输入布料编号" />
        </el-form-item>
        <el-form-item label="布料颜色" prop="clothColour">
          <el-input v-model="form.clothColour" placeholder="请输入布料颜色" />
        </el-form-item>
        <el-form-item label="布料需求量 " prop="clothDemand">
          <el-input v-model="form.clothDemand" placeholder="请输入布料需求量 " />
        </el-form-item>
        <el-form-item label="需求量单位" prop="clothUnit">
          <el-input v-model="form.clothUnit" placeholder="请输入需求量单位" />
        </el-form-item>
        <el-form-item label="制程" prop="process">
          <el-input v-model="form.process" placeholder="请输入制程" />
        </el-form-item>
        <el-form-item label="生产制单日期" prop="productionDocumentTime">
          <el-date-picker clearable
            v-model="form.productionDocumentTime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择生产制单日期">
          </el-date-picker>
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

<script setup name="CreateDocument">
import { listCreateDocument, getCreateDocument, delCreateDocument, addCreateDocument, updateCreateDocument } from "@/api/basic/createDocument";
import useSettingsStore from "@/store/modules/settings.js";

const { proxy } = getCurrentInstance();

const createDocumentList = ref([]);
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

/** 查询制单列表 */
function getList() {
  loading.value = true;
  listCreateDocument(queryParams.value).then(response => {
    createDocumentList.value = response.rows;
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
    createDocumentId: null,
    productionDocumentNum: null,
    styleNum: null,
    formatNum: null,
    styleColour: null,
    size: null,
    quantity: null,
    clothNum: null,
    clothColour: null,
    clothDemand: null,
    clothUnit: null,
    process: null,
    productionDocumentTime: null,
    createUserId: null,
    createTime: null,
    updateUserId: null,
    updateTime: null,
    delFlag: null
  };
  proxy.resetForm("createDocumentRef");
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
  ids.value = selection.map(item => item.createDocumentId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加制单";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _createDocumentId = row.createDocumentId || ids.value
  getCreateDocument(_createDocumentId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改制单";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["createDocumentRef"].validate(valid => {
    if (valid) {
      if (form.value.createDocumentId != null) {
        updateCreateDocument(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addCreateDocument(form.value).then(response => {
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
  const _createDocumentIds = row.createDocumentId || ids.value;
  proxy.$modal.confirm('是否确认删除制单编号为"' + _createDocumentIds + '"的数据项？').then(function() {
    return delCreateDocument(_createDocumentIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('bok/createDocument/export', {
    ...queryParams.value
  }, `createDocument_${new Date().getTime()}.xlsx`)
}

getList();
</script>
