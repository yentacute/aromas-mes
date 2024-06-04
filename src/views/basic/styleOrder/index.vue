<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" >
      <el-form-item label="订单号" prop="orderId">
        <el-input
          v-model="queryParams.orderId"
          placeholder="请输入订单号"
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

    <el-table v-loading="loading" :data="styleOrderList" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column type="index" width="150" :label="$t('serial_number')" align="center"/>
<!--      <el-table-column label="${comment}" align="center" prop="styleOrderId" />-->
      <el-table-column label="订单号" align="center" prop="orderId" />
      <el-table-column label="款号" align="center" prop="styleNum" />
      <el-table-column label="月Buy" align="center" prop="monthBuy" />
      <el-table-column label="款号颜色" align="center" prop="styleColour" />
      <el-table-column label="尺码" align="center" prop="size" />
      <el-table-column label="数量" align="center" prop="quantity" />
      <el-table-column label="客户名" align="center" prop="customerName" />
      <el-table-column label="订单日期" align="center" prop="orderTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.orderTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单交期" align="center" prop="deliveryTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.deliveryTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人userid" align="center" prop="createUserId" />
      <el-table-column label="更新人" align="center" prop="updateUserId" />
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

    <!-- 添加或修改款号订单对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="styleOrderRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="订单号" prop="orderId">
          <el-input v-model="form.orderId" placeholder="请输入订单号" />
        </el-form-item>
        <el-form-item label="款号" prop="styleNum">
          <el-input v-model="form.styleNum" placeholder="请输入款号" />
        </el-form-item>
        <el-form-item label="月Buy" prop="monthBuy">
          <el-input v-model="form.monthBuy" placeholder="请输入月Buy" />
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
        <el-form-item label="客户名" prop="customerName">
          <el-input v-model="form.customerName" placeholder="请输入客户名" />
        </el-form-item>
        <el-form-item label="订单日期" prop="orderTime">
          <el-date-picker clearable
            v-model="form.orderTime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择订单日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="订单交期" prop="deliveryTime">
          <el-date-picker clearable
            v-model="form.deliveryTime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择订单交期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="创建人userid" prop="createUserId">
          <el-input v-model="form.createUserId" placeholder="请输入创建人userid" />
        </el-form-item>
        <el-form-item label="更新人" prop="updateUserId">
          <el-input v-model="form.updateUserId" placeholder="请输入更新人" />
        </el-form-item>
        <el-form-item label="0正常1删除" prop="delFlag">
          <el-input v-model="form.delFlag" placeholder="请输入0正常1删除" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" :loading="useSettingsStore().loading" @click="submitForm">确 定</el-button>
          <el-button class="btn-cancel" @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="StyleOrder">
import { listStyleOrder, getStyleOrder, delStyleOrder, addStyleOrder, updateStyleOrder } from "@/api/basic/styleOrder";
import useSettingsStore from "@/store/modules/settings.js";

const { proxy } = getCurrentInstance();

const styleOrderList = ref([]);
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
    orderId: null,
    styleNum: null,
    monthBuy: null,
    styleColour: null,
    size: null,
    quantity: null,
    customerName: null,
    orderTime: null,
    deliveryTime: null,
    createUserId: null,
    updateUserId: null,
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询款号订单列表 */
function getList() {
  loading.value = true;
  listStyleOrder(queryParams.value).then(response => {
    styleOrderList.value = response.rows;
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
    styleOrderId: null,
    orderId: null,
    styleNum: null,
    monthBuy: null,
    styleColour: null,
    size: null,
    quantity: null,
    customerName: null,
    orderTime: null,
    deliveryTime: null,
    createUserId: null,
    createTime: null,
    updateUserId: null,
    updateTime: null,
    delFlag: null
  };
  proxy.resetForm("styleOrderRef");
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
  ids.value = selection.map(item => item.styleOrderId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加款号订单";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _styleOrderId = row.styleOrderId || ids.value
  getStyleOrder(_styleOrderId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改款号订单";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["styleOrderRef"].validate(valid => {
    if (valid) {
      if (form.value.styleOrderId != null) {
        updateStyleOrder(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addStyleOrder(form.value).then(response => {
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
  const _styleOrderIds = row.styleOrderId || ids.value;
  proxy.$modal.confirm('是否确认删除款号订单编号为"' + _styleOrderIds + '"的数据项？').then(function() {
    return delStyleOrder(_styleOrderIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('bok/styleOrder/export', {
    ...queryParams.value
  }, `styleOrder_${new Date().getTime()}.xlsx`)
}

getList();
</script>
