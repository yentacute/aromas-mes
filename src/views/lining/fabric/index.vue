<script setup>
import {useI18n} from "vue-i18n";
import useSettingsStore from "@/store/modules/settings.js";
import CtnTable from "@/components/CtnTable/index.vue";
import useData from "./hook/useData.js";
import useSearch from "./hook/useSearch.js";
import useUpdate from "./hook/useUpdate.js";
import useDelete from "./hook/useDelete.js";

defineOptions({
  name: "Fabric"
});
const {t} = useI18n()
const {proxy} = getCurrentInstance();
const {
  pageData
} = useData()
const {
  formData,
  tableData,
  loadData,
  searchFormRef,
  resetData,
} = useSearch()
const {
  updateFormData,
  updateFormRef,
  updateFormRules,
  submit,
  openHandle,
  showHandle,
  title,
  disabled
} = useUpdate()
const {
  deleteHandler,
  select,
  idList
} = useDelete(t, proxy)

const showSearch = ref(true);
const tableRef = ref('');

onMounted(() => {
  loadData()
})


/**
 * 提交
 */
const submitCb = async () => {
  try {
    await submit();
    setTimeout(() => {
      loadData();
    }, 50);
  } catch (error) {
    throw error;
  }
}
/**
 * 删除
 */
const deleteCb = async (row) => {
  await deleteHandler(row)
  setTimeout(() => {
    loadData();
  }, 50);
}
/** 导出按钮操作 */
function handleExport() {
  proxy.download('bok/fabric/export', {
    ...formData
  }, `fabric_${new Date().getTime()}.xlsx`)
}
</script>


<template>
  <div class="app-container">
    <el-form :model="formData" ref="searchFormRef" :inline="true" v-show="showSearch" labelSuffix=":">
      <el-row :gutter="20">
        <el-col :lg="4" :sm="12" :md="12" :xs="24">
          <el-form-item label="面料编号" prop="fabricCode">
            <el-input
                v-model="formData.fabricCode"
                placeholder="请输入面料编号"
                clearable
                @keyup.enter="loadData"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="4" :sm="12" :md="12" :xs="24">
          <el-form-item label="面料名称" prop="fabricName">
            <el-input
                v-model="formData.fabricName"
                placeholder="请输入面料名称"
                clearable
                @keyup.enter="loadData"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="4" :sm="12" :md="12" :xs="24">
          <el-form-item :label="$t('brandInfo.english_name')" prop="brandEnName">
            <el-input
                v-model="formData.brandEnName"
                :placeholder="`${$t('input')}${$t('brandInfo.english_name')} `"
                clearable
            />
          </el-form-item>
        </el-col>
        <el-col :lg="2" :sm="12" :md="12" :xs="24">
          <el-form-item label="" prop="delFlag">
            <el-checkbox v-model="formData.disable" @change="loadData"  :true-label="1" :false-label="0" label="包含禁用" size="large"/>
          </el-form-item>
        </el-col>
        <el-col :lg="4" :sm="12" :md="12" :xs="24">
          <el-form-item>
            <el-button type="primary" icon="Search" @click="loadData">{{ $t('query') }}</el-button>
            <el-button icon="Refresh" @click="resetData">{{ $t('reset') }}</el-button>
          </el-form-item>
        </el-col>

      </el-row>
    </el-form>

    <el-row :gutter="10" class="mb10 mt10">
      <el-col :span="1.5">
        <el-button
            type="primary"
            plain
            icon="Plus"
            @click="openHandle"
        >{{ $t('add') }}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="danger"
            plain
            icon="Delete"
            :disabled="!Boolean(idList.length)"
            @click="deleteCb"
        >{{ $t('delete') }}
        </el-button>
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
      <!--      <right-toolbar v-model:showSearch="showSearch" @queryTable="loadData"></right-toolbar>-->
    </el-row>
    <ctn-table
        :loading="useSettingsStore().loading"
        @select="select" ref="tableRef" @queryTable="loadData" v-model:showSearch="showSearch" table-key="fabricId"
        @handleCurrentChange="loadData" :total="tableData.total" showMultipleColumn v-model:pageSize="formData.pageSize"
        v-model:pageNum="formData.pageNum" operateWidth="100px" :tableData="tableData.list"
        :columnData="pageData.columnData" :showSummary="false" :showOperate="false" :show-multiple="true"
        :show-multiple-column="true" :showPagination="true">
      <template #operateDefault="{ data:{row} }">
        <el-tooltip
            class="box-item"
            effect="dark"
            :content="$t('edit')"
            placement="top-start"
        >
          <el-button link type="primary" icon="Edit" @click="openHandle(row,row.id)">
          </el-button>
        </el-tooltip>
        <el-tooltip
            class="box-item"
            effect="dark"
            :content="$t('edit')"
            placement="top-start"
        >
          <el-button link type="primary" icon="Delete" :disabled="Boolean(idList.length)" @click="deleteCb(row)">
          </el-button>
        </el-tooltip>
      </template>
      <template #delFlagDefault="{ data: { row } }">
        <el-tag :type="!row.delFlag ? 'success': 'info'">{{ !row.delFlag ? '正常' : '禁用' }}</el-tag>
      </template>
    </ctn-table>

    <!-- 添加或修改面料档案对话框 -->
    <el-dialog :title="title" v-model="showHandle" width="500px" append-to-body>
      <el-form ref="updateFormRef" label-position="left" :model="updateFormData" :rules="updateFormRules"
               label-suffix="：">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="物料分类" prop="materialTypeId">
              <el-input v-model="updateFormData.materialTypeId" placeholder="请输入物料分类ID"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="面料编号" prop="fabricCode">
              <el-input v-model="updateFormData.fabricCode" placeholder="请输入面料编号"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="面料名称" prop="fabricName">
              <el-input v-model="updateFormData.fabricName" placeholder="请输入面料名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="面料英文名称" prop="fabricEnName">
              <el-input v-model="updateFormData.fabricEnName" placeholder="请输入面料英文名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="规格" prop="specification">
              <el-input v-model="updateFormData.specification" placeholder="请输入规格"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="织物成分" prop="component">
              <el-input v-model="updateFormData.component" placeholder="请输入织物成分"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="面料颜色" prop="colorId">
              <el-input v-model="updateFormData.colorId" placeholder="请输入面料颜色"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="标准幅宽" prop="widthStandard">
              <el-input v-model="updateFormData.widthStandard" placeholder="请输入标准幅宽"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="最小幅宽" prop="widthLower">
              <el-input v-model="updateFormData.widthLower" placeholder="请输入最小幅宽"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="最大幅宽" prop="widthUpper">
              <el-input v-model="updateFormData.widthUpper" placeholder="请输入最大幅宽"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="标准克重" prop="weightStandard">
              <el-input v-model="updateFormData.weightStandard" placeholder="请输入标准克重"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
          <el-form-item label="最小克重" prop="weightLower">
            <el-input v-model="updateFormData.weightLower" placeholder="请输入最小克重"/>
          </el-form-item>
          </el-col>
          <el-col :span="24">
          <el-form-item label="最大克重" prop="weightUpper">
            <el-input v-model="updateFormData.weightUpper" placeholder="请输入最大克重"/>
          </el-form-item>
          </el-col>
          <el-col :span="24">
          <el-form-item label="专属客户" prop="customerId">
            <el-input v-model="updateFormData.customerId" placeholder="请输入专属客户"/>
          </el-form-item>
          </el-col>
          <el-col :span="24">
          <el-form-item label="默认品牌" prop="brandId">
            <el-input v-model="updateFormData.brandId" placeholder="请输入默认品牌"/>
          </el-form-item>
          </el-col>
          <el-col :span="24">
          <el-form-item label="客户物料编码" prop="customerFabricCode">
            <el-input v-model="updateFormData.customerFabricCode" placeholder="请输入客户物料编码"/>
          </el-form-item>
          </el-col>
          <el-col :span="24">
          <el-form-item label="客户物料名称" prop="customerFabricName">
            <el-input v-model="updateFormData.customerFabricName" placeholder="请输入客户物料名称"/>
          </el-form-item>
          </el-col>
          <el-col :span="24">
          <el-form-item label="供应商" prop="supplierId">
            <el-input v-model="updateFormData.supplierId" placeholder="请输入供应商"/>
          </el-form-item>
          </el-col>
          <el-col :span="24">
          <el-form-item label="供应商物料编码" prop="supplierFabricCode">
            <el-input v-model="updateFormData.supplierFabricCode" placeholder="请输入供应商物料编码"/>
          </el-form-item>
          </el-col>
          <el-col :span="24">
          <el-form-item label="供应商物料名称" prop="supplierFabricName">
            <el-input v-model="updateFormData.supplierFabricName" placeholder="请输入供应商物料名称"/>
          </el-form-item>
          </el-col>
          <el-col :span="24">
          <el-form-item label="业务单位" prop="unitCode">
            <el-input v-model="updateFormData.unitCode" placeholder="请输入业务单位"/>
          </el-form-item>
          </el-col>
          <el-col :span="24">
          <el-form-item label="销售单位" prop="unitCodeSale">
            <el-input v-model="updateFormData.unitCodeSale" placeholder="请输入销售单位"/>
          </el-form-item>
          </el-col>
          <el-col :span="24">
          <el-form-item label="单位重量" prop="unitWeight">
            <el-input v-model="updateFormData.unitWeight" placeholder="请输入单位重量"/>
          </el-form-item>
          </el-col>
          <el-col :span="24">
          <el-form-item label="安全库存" prop="safetyStock">
            <el-input v-model="updateFormData.safetyStock" placeholder="请输入安全库存"/>
          </el-form-item>
          </el-col>
          <el-col :span="24">
          <el-form-item label="使用部位" prop="partsUsed">
            <el-input v-model="updateFormData.partsUsed" placeholder="请输入使用部位"/>
          </el-form-item>
          </el-col>
          <el-col :span="24">
          <el-form-item label="季节" prop="season">
            <el-input v-model="updateFormData.season" placeholder="请输入季节"/>
          </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('brandInfo.remark')" prop="remark">
              <el-input v-model="updateFormData.remark" type="textarea" clearable
                        :placeholder="`${$t('input')}${$t('brandInfo.remark')} `"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" class="btn-confirm" :loading="useSettingsStore().loading" @click="submitCb">{{ $t('confirm') }}
          </el-button>
          <el-button @click="showHandle = false" class="btn-cancel">{{ $t('cancel') }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

