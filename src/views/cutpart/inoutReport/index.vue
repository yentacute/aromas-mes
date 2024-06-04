<template>
  <div class="app-container">
    <el-form :model="formData" ref="queryRef" :inline="false" v-show="showSearch" labelSuffix=":">
      <el-row :gutter="20">
        <el-col :lg="6" :xl="4" :sm="12" :md="12" :xs="24">
          <el-form-item prop="moNo">
            <el-input
                v-model="formData.moNo"
                :placeholder="$t('cutpart.moNo')"
                clearable
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :xl="4" :sm="12" :md="12" :xs="24">
          <el-form-item prop="styleNo">
            <el-input
                v-model="formData.styleNo"
                :placeholder="$t('cutpart.styleNo')"
                clearable
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :xl="4" :sm="12" :md="12" :xs="24">
          <el-form-item prop="styleColorName">
            <el-input
                v-model="formData.styleColorName"
                :placeholder="$t('cutpart.styleColorName')"
                clearable
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :xl="4" :sm="12" :md="12" :xs="24">
          <el-form-item prop="sizeName">
            <el-input
                v-model="formData.sizeName"
                :placeholder="$t('cutpart.sizeName')"
                clearable
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :xl="4" :sm="12" :md="12" :xs="24">
          <el-form-item prop="bedNo">
            <el-input
                v-model="formData.bedNo"
                :placeholder="$t('cutpart.bedNo')"
                clearable
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :xl="4" :sm="12" :md="12" :xs="24">
          <el-form-item prop="bundleNo">
            <el-input
                v-model="formData.bundleNo"
                :placeholder="$t('cutpart.bundleNo')"
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
              :disabled="dataArr.length <= 0"
            >
              {{ $t("fabricInpsection.export") }}
            </el-button>
            </div>
          </el-col>
      </el-row>
    </el-form>
    <ctn-table
        :loading="useSettingsStore().loading"
        @queryTable="getlistCutPartInOut(formData)" v-model:showSearch="showSearch"
        @handleCurrentChange="handleCurrentChange" :total="totalItems" showMultipleColumn v-model:pageSize="formData.pageSize"
        v-model:pageNum="formData.pageNum" operateWidth="100px" :tableData="dataArr"
        :columnData="pageData.columnData" :showSummary="false" :showOperate="false" :show-multiple="false"
        :show-multiple-column="true" :showPagination="true">
    </ctn-table> 
  </div>


</template>

<script setup>
import {useI18n} from 'vue-i18n'
import useSettingsStore from '@/store/modules/settings'
import useData from "./hook/useData.js";
import { listCutPartInOut } from "@/api/cutpart/cutpart.js";
import CtnTable from "@/components/CtnTable/index.vue";
import { reactive } from 'vue';

const { proxy } = getCurrentInstance();

const { pageData } = useData();
const {t} = useI18n()
const multipleTableRef = ref();
const showSearch = ref(true);
const loading = ref(false);
const totalItems = ref(0);
const dataArr = ref([]);
const initFormData = {
  moNo: '',
  styleNo:'',
  styleColorName:'',
  sizeName:'',
  bedNo:'',
  bundleNo:'',
  pageNum: 1,
  pageSize: 10
}

const formData = reactive({
  ...initFormData
})
const getlistCutPartInOut = async(params) => {
  try {
    loading.value = true; 
    const response = await listCutPartInOut(params);
    const { total, rows } = response;

    totalItems.value = total;
    dataArr.value = rows;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false; 
  }
}

const handleExport = () => {
  proxy.download(
    "bok/cutPartWarehouseInboundOutboundReport/export",
    formData,
    `cutpart_in_out_report_${new Date().getTime()}.xlsx`
  );
}

const handleCurrentChange = () => {
  getlistCutPartInOut(formData);
}
const handleSearch = () => {
  formData.moNo = formData.moNo.trim();
  formData.styleNo = formData.styleNo.trim();
  formData.styleColorName = formData.styleColorName.trim();
  formData.sizeName = formData.sizeName.trim();
  formData.bedNo = formData.bedNo.trim();
  formData.bundleNo = formData.bundleNo.trim();
  getlistCutPartInOut(formData);
}
onMounted(() => {
  getlistCutPartInOut(formData);
})

const resetFormData = () => {
  Object.assign(formData, { ...initFormData });
  getlistCutPartInOut();
}

</script>
