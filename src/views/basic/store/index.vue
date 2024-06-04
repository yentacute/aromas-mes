<script setup>
import {useI18n} from "vue-i18n";
import useSettingsStore from "@/store/modules/settings.js";
import CtnTable from "@/components/CtnTable/index.vue";
import useData from "./hook/useData.js";
import useSearch from "./hook/useSearch.js";
import useUpdate from "./hook/useUpdate.js";
import useDelete from "./hook/useDelete.js";
import CtnImportPopup from "@/components/CtnImportPopup/index.vue";
import {addAccessoriesColor, reqUploadAccessoriesColor} from "@/api/basic/accessoriesColor.js";
import ImportTable from "@/components/ImportTable/index.vue";

defineOptions({
  name: "StoreIndex" // 仓库档案
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
  storeGroupOptions,
  materialCategoryOptions,
  getOption
} = useSearch()
const {
  updateFormData,
  updateFormRef,
  updateFormRules,
  submit,
  openHandle,
  showHandle,
  title,
  handleCheckDetail,
  closeHandle,
  isDetails
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
  getOption()
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

</script>


<template>
  <div class="app-container">
    <el-form :model="formData" ref="searchFormRef" :inline="true" v-show="showSearch" labelSuffix=":">
      <el-row :gutter="20">
        <el-col :lg="4" :sm="12" :md="12" :xs="24">
          <el-form-item :label="t('storeArchives.storeGroup')" prop="storeName">
            <el-input
                v-model="formData.storeName"
                :placeholder="t('input') + t('storeArchives.storeGroup')"
                clearable
                @keyup.enter="loadData"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="2" :sm="12" :md="12" :xs="24">
          <el-form-item label="" prop="delFlag">
            <el-checkbox v-model="formData.disable" @change="loadData"  :true-label="1" :false-label="0" :label="t('include_disable')" size="large"/>
          </el-form-item>
        </el-col>
        <el-col :lg="4" :sm="12" :md="12" :xs="24">
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
    </el-row>
    <ctn-table
        :loading="useSettingsStore().loading"
        @select="select" ref="tableRef" @queryTable="loadData" v-model:showSearch="showSearch"
        table-key="storeId"
        @handleCurrentChange="loadData" :total="tableData.total" showMultipleColumn v-model:pageSize="formData.pageSize"
        v-model:pageNum="formData.pageNum" operateWidth="100px" :tableData="tableData.list"
        :columnData="pageData.columnData" :showSummary="false" :showOperate="false" :show-multiple="false"
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
          <el-button link type="primary" icon="Edit" :disabled="row.notEdit" @click="openHandle(row,row.id)"
                     >
          </el-button>
        </el-tooltip>
        <el-tooltip
            class="box-item"
            effect="dark"
            :content="t('delete')"
            placement="top-start"
        >
          <el-button link type="primary" icon="Delete" :disabled="row.notDelete" @click="deleteCb(row)"
                     >
          </el-button>
        </el-tooltip>
      </template>
      <template #enableStorageLocationDefault="{ data: { row } }">
        <el-tag :type="row.enableStorageLocation ? 'success': 'info'">{{ row.enableStorageLocation ? t('storeArchives.enable') : t('storeArchives.not_enabled') }}</el-tag>
      </template>
      <template #isAllowNegativeStockDefault="{ data: { row } }">
        <el-tag :type="row.isAllowNegativeStock ? 'success': 'info'">{{ row.isAllowNegativeStock ? t('yes') : t('no')  }}</el-tag>
      </template>
      <template #isVirtualDefault="{ data: { row } }">
        <el-tag :type="row.isVirtual ? 'success': 'info'">{{ row.isVirtual ? t('yes') : t('no') }}</el-tag>
      </template>
      <template #disableDefault="{ data: { row } }">
        <el-tag :type="!row.disable ? 'success': 'info'">{{ !row.disable ? t('normal') : t('disabled') }}</el-tag>
      </template>
    </ctn-table>

    <!-- 添加或修改对话框 -->
    <el-dialog :title="title" v-model="showHandle" width="500px" append-to-body @close="closeHandle">
      <el-form ref="updateFormRef" label-position="left" :model="updateFormData" :rules="updateFormRules"
               label-suffix="：">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="t('storeArchives.storeGroup')" prop="storeGroupId">
              <el-select v-model="updateFormData.storeGroupId" clearable :disabled="isDetails">
                <el-option
                    v-for="item in storeGroupOptions"
                    :key="item.id"
                    :label="item.groupName"
                    :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="t('storeArchives.materialCategory')" prop="materialCategory">
              <el-select v-model="updateFormData.materialCategory" clearable :disabled="isDetails">
                <el-option
                    v-for="item in materialCategoryOptions"
                    :key="item.materialCategory"
                    :label="item.materialCategoryName"
                    :value="item.materialCategory"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="t('storeArchives.storeCode')" prop="storeCode">
              <el-input v-model="updateFormData.storeCode" :disabled="isDetails" :placeholder="t('input') + t('storeArchives.storeCode')" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="t('storeArchives.storeName')" prop="storeName">
              <el-input v-model="updateFormData.storeName" :disabled="isDetails" :placeholder="t('input') + t('storeArchives.storeName')" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="t('storeArchives.enableStorageLocation')" prop="enableStorageLocation">
              <el-radio-group v-model="updateFormData.enableStorageLocation" class="ml-4" :disabled="isDetails">
                <el-radio :value="1" :label="1" size="small">{{ t('storeArchives.enable') }}</el-radio>
                <el-radio :value="0" :label="0" size="small">{{ t('storeArchives.not_enabled') }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="t('storeArchives.allowNegativeStock')" prop="isAllowNegativeStock">
              <el-radio-group v-model="updateFormData.isAllowNegativeStock" class="ml-4" :disabled="isDetails">
                <el-radio :value="1" :label="1" size="small">{{ t('yes') }}</el-radio>
                <el-radio :value="0" :label="0" size="small">{{ t('no') }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="t('storeArchives.virtual')" prop="isVirtual">
              <el-radio-group v-model="updateFormData.isVirtual" class="ml-4" :disabled="isDetails">
                <el-radio :value="1" :label="1"  size="small">{{ t('yes') }}</el-radio>
                <el-radio :value="0" :label="0" size="small">{{ t('no') }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="t('storeArchives.storeTypeCode')" prop="storeTypeCode">
              <el-input v-model="updateFormData.storeTypeCode" :disabled="isDetails" :placeholder="t('input') + t('storeArchives.storeTypeCode')" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="t('remark')" prop="remark">
              <el-input v-model="updateFormData.remark" type="textarea" clearable :disabled="isDetails"
                        :placeholder="`${t('input')}${t('remark')} `"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" class="btn-confirm" v-if="!isDetails" :loading="useSettingsStore().loading" @click="submitCb">
            {{ t('confirm') }}
          </el-button>
          <el-button class="btn-cancel" @click="closeHandle">{{ isDetails ? t('close') : t('cancel') }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

