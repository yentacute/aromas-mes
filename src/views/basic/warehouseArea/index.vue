<script setup>
import {useI18n} from "vue-i18n";
import useSettingsStore from "@/store/modules/settings.js";
import CtnTable from "@/components/CtnTable/index.vue";
import useData from "./hook/useData.js";
import useSearch from "./hook/useSearch.js";
import useUpdate from "./hook/useUpdate.js";
import useDelete from "./hook/useDelete.js";
defineOptions({
  name: "warehouseArea" // 仓库档案
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
  warehouseOptions,
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
        <el-col :lg="6" :sm="12" :md="12" :xs="24">
          <el-form-item :label="t('storeArea.areaName')" prop="areaName">
            <el-input
                v-model="formData.areaName"
                :placeholder="t('storeArea.areaName')"
                clearable
                @keyup.enter="loadData"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="2" :sm="12" :md="12" :xs="24">
          <el-form-item label="" prop="disable">
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
        table-key="warehouseAreaId"
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
            <el-form-item :label="t('storeArea.warehouseName')" prop="warehouseId">
              <el-select v-model="updateFormData.warehouseId" clearable :disabled="isDetails">
                <el-option
                    v-for="item in warehouseOptions"
                    :key="item.id"
                    :label="item.warehouseName"
                    :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="t('storeArea.areaCode')" prop="areaCode">
              <el-input v-model="updateFormData.areaCode" :disabled="isDetails" :placeholder="t('input') + t('storeArea.areaCode')" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="t('storeArea.areaName')" prop="areaName">
              <el-input v-model="updateFormData.areaName" :disabled="isDetails" :placeholder="t('input') + t('storeArea.areaName')" />
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

