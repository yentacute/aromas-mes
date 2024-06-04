<template>
  <div class="app-container">
    <el-form :model="formData" ref="searchFormRef" :inline="true" v-show="showSearch" labelSuffix=":">
      <el-row :gutter="20">
        <el-col :lg="5" :sm="12" :md="12" :xs="24">
          <el-form-item :label="t('brandInfo.abbreviation')" prop="brandName">
            <el-input
                v-model="formData.brandName"
                :placeholder="`${t('input')}${t('brandInfo.abbreviation')} `"
                clearable
            />
          </el-form-item>
        </el-col>
        <el-col :lg="5" :sm="12" :md="12" :xs="24">
          <el-form-item :label="t('brandInfo.full_name')" prop="brandFullName">
            <el-input
                v-model="formData.brandFullName"
                :placeholder="`${t('input')}${t('brandInfo.full_name')} `"
                clearable
            />
          </el-form-item>
        </el-col>
        <el-col :lg="5" :sm="12" :md="12" :xs="24">
          <el-form-item :label="t('brandInfo.english_name')" prop="brandEnName">
            <el-input
                v-model="formData.brandEnName"
                :placeholder="`${t('input')}${t('brandInfo.english_name')} `"
                clearable
            />
          </el-form-item>
        </el-col>
        <el-col :lg="2" :sm="12" :md="12" :xs="24">
          <el-form-item label="" prop="delFlag">
            <el-checkbox v-model="formData.disable" @change="loadData"  :true-label="1" :false-label="0" :label="t('include_disable')" size="large"/>
          </el-form-item>
        </el-col>
        <el-col :lg="5" :sm="12" :md="12" :xs="24">
          <el-form-item>
            <el-button type="primary" icon="Search" @click="loadData">{{ t('query') }}</el-button>
            <el-button icon="Refresh" @click="resetData">{{ t('reset') }}</el-button>
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
        >{{ t('add') }}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="danger"
            plain
            icon="Delete"
            :disabled="!Boolean(idList.length)"
            @click="deleteCb"
        >{{ t('delete') }}
        </el-button>
      </el-col>
    </el-row>
    <ctn-table
        :loading="useSettingsStore().loading"
        @select="select" ref="tableRef" @queryTable="loadData" v-model:showSearch="showSearch" table-key="brandId" row-key="id"
        @handleCurrentChange="loadData" :total="tableData.total" showMultipleColumn v-model:pageSize="formData.pageSize"
        v-model:pageNum="formData.pageNum" operateWidth="100px" :tableData="tableData.list"
        :columnData="pageData.columnData" :showSummary="false" :showOperate="false" :show-multiple="true"
        :show-multiple-column="true" :showPagination="true">
      <template #operateDefault="{ data:{row} }">
        <el-tooltip
            class="box-item"
            effect="dark"
            :content="t('check_details')"
            placement="top-start"
        >
          <el-button link type="primary" icon="View" @click="handleCheckDetail(row)"
                     >
          </el-button>
        </el-tooltip>
        <el-tooltip
            class="box-item"
            effect="dark"
            :content="t('edit')"
            placement="top-start"
        >
          <el-button link type="primary" icon="Edit" @click="openHandle(row,row.id)"
                     >
          </el-button>
        </el-tooltip>
        <el-tooltip
            class="box-item"
            effect="dark"
            :content="t('delete')"
            placement="top-start"
        >
          <el-button link type="primary" icon="Delete" :disabled="Boolean(idList.length)" @click="deleteCb(row)"
                     >
          </el-button>
        </el-tooltip>
      </template>
      <template #disableDefault="{ data: { row } }">
        <el-tag :type="!row.disable ? 'success': 'info'">{{ !row.disable ? t('normal') : t('disabled') }}</el-tag>
      </template>
    </ctn-table>

    <!-- 添加或修改品牌库对话框 -->
    <el-dialog draggable :title="title" v-model="showHandle" width="500px" append-to-body @close="closeHandle">
      <el-form ref="updateFormRef" label-position="left" :model="updateFormData" :rules="updateFormRules"
               label-suffix="：">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="t('brandInfo.brand_code')" prop="brandCode">
              <el-input v-model="updateFormData.brandCode" :disabled="disabled || isDetails" clearable
                        :placeholder="`${t('input')}${t('brandInfo.brand_code')} `"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="t('brandInfo.abbreviation')" prop="brandName">
              <el-input v-model="updateFormData.brandName" :disabled="disabled || isDetails" clearable
                        :placeholder="`${t('input')}${t('brandInfo.abbreviation')} `"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="t('brandInfo.full_name')" prop="brandFullName">
              <el-input v-model="updateFormData.brandFullName" clearable :disabled="isDetails"
                        :placeholder="`${t('input')}${t('brandInfo.full_name')} `"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="t('brandInfo.english_name')" prop="brandEnName">
              <el-input v-model="updateFormData.brandEnName" clearable :disabled="isDetails"
                        :placeholder="`${t('input')}${t('brandInfo.english_name')} `"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="t('brandInfo.packaging_requirements')" prop="packageRequest">
              <el-input v-model="updateFormData.packageRequest" clearable :disabled="isDetails"
                        :placeholder="`${t('input')}${t('brandInfo.packaging_requirements')} `"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="t('brandInfo.shipping_requirements')" prop="shippingMark">
              <el-input v-model="updateFormData.shippingMark" clearable :disabled="isDetails"
                        :placeholder="`${t('input')}${t('brandInfo.shipping_requirements')} `"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="t('brandInfo.remark')" prop="remark">
              <el-input v-model="updateFormData.remark" type="textarea" :disabled="isDetails" clearable
                        :placeholder="`${t('input')}${t('brandInfo.remark')} `"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" class="btn-confirm" v-if="!isDetails" :loading="useSettingsStore().loading" @click="submitCb">
            {{ t('confirm') }}
          </el-button>
          <el-button class="btn-cancel" @click="closeHandle">{{ isDetails ? t('close'): t('cancel') }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {useI18n} from "vue-i18n";
import useSettingsStore from "@/store/modules/settings.js";
import CtnTable from "@/components/CtnTable/index.vue";
import useData from "./hook/useData.js";
import useSearch from "./hook/useSearch.js";
import useUpdate from "./hook/useUpdate.js";
import useDelete from "./hook/useDelete.js";

defineOptions({
  name: "Brand" // 品牌库
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
  closeHandle,
  title,
  disabled,
  isDetails,
  handleCheckDetail
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
  await submit();
  await loadData();

}


/**
 * 删除
 */
const deleteCb = async (row) => {
  await deleteHandler(row);
  await loadData();
}


</script>
