<template>
  <div class="app-container">
    <el-form :model="formData" ref="queryRef" :inline="false" v-show="showSearch" labelSuffix=":">
      <el-row :gutter="20">
        <el-col :lg="6" :xl="4" :sm="12" :md="12" :xs="24">
          <el-form-item prop="warehouseName">
            <el-input
                v-model="formData.warehouseName"
                :placeholder="$t('inAnOutReport.warehouseName')"
                clearable
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :xl="4" :sm="12" :md="12" :xs="24">
          <el-form-item prop="typeCode">
            <el-input
                v-model="formData.typeCode"
                :placeholder="$t('inAnOutReport.typeCode')"
                clearable
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :xl="4" :sm="12" :md="12" :xs="24">
          <el-form-item prop="fabricCode">
            <el-input
                v-model="formData.fabricCode"
                :placeholder="$t('inAnOutReport.fabricCode')"
                clearable
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :xl="4" :sm="12" :md="12" :xs="24">
          <el-form-item prop="roll">
            <el-input
                v-model="formData.roll"
                :placeholder="$t('inAnOutReport.roll')"
                clearable
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :xl="4" :sm="12" :md="12" :xs="24">
          <el-form-item prop="lot">
            <el-input
                v-model="formData.lot"
                :placeholder="$t('inAnOutReport.lot')"
                clearable
            />
          </el-form-item>
        </el-col>
        <el-col :lg="8" :xl="4" :sm="12" :md="12" :xs="24">
          <div class="action-container">
            <el-button type="primary" :loading="useSettingsStore().loading" icon="Search" @click="handleSearch">
              {{ $t('query') }}
            </el-button>
            <el-button icon="Refresh" @click="resetFormData">{{ $t('reset') }}</el-button>
            <el-button
              type="warning"
              icon="Download"
              plain
              @click="handleExport"
              class="btn-export"
              :disabled="store.dataArr.length <= 0"
            >
              {{ $t("fabricInpsection.export") }}
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <ctn-table
        :loading="useSettingsStore().loading"
        @queryTable="store.getListReports(formData)" v-model:showSearch="showSearch"
        @handleCurrentChange="store.getListReports(formData)" :total="store.totalItems" showMultipleColumn v-model:pageSize="formData.pageSize"
        v-model:pageNum="formData.pageNum" operateWidth="100px" :tableData="store.dataArr"
        :columnData="pageData.columnData" :showSummary="false" :showOperate="false" :show-multiple="false"
        :show-multiple-column="true" :showPagination="true">
    </ctn-table>
  </div>


</template>

<script setup>
import {useI18n} from 'vue-i18n'
import useSettingsStore from '@/store/modules/settings'
import useData from "./hook/useData.js";
import CtnTable from "@/components/CtnTable/index.vue";
import {defaultTime} from "@/utils/index.js";
import useReportInOut from '@/store/modules/reports'

const { pageData } = useData();
const store = useReportInOut();
const {t} = useI18n()
const {proxy} = getCurrentInstance();
const multipleTableRef = ref();
const showSearch = ref(true);
const initFormData = {
  warehouseName: '',
  typeCode:'',
  fabricCode:'',
  lot:'',
  roll:'',
  pageNum: 1,
  pageSize: 10
}

const formData = reactive({
  ...initFormData
})

const handleExport = () => {
  proxy.download(
    "bok/fabricWarehouseInOutboundReport/export",
    formData,
    `in_out_bound_${new Date().getTime()}.xlsx`
  );
} 

const handleSearch = () => {
  formData.warehouseName = formData.warehouseName.trim();
  formData.typeCode = formData.typeCode.trim();
  formData.fabricCode = formData.fabricCode.trim();
  formData.lot = formData.lot.trim();
  formData.roll = formData.roll.trim();
  store.getListReports(formData);
}
onMounted(() => {
  store.getListReports(formData);
})

const resetFormData = () => {
  Object.assign(formData, { ...initFormData });
  store.getListReports();
}

</script>
