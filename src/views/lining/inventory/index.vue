<template>
  <div class="app-container">
    <el-form :model="formData" ref="queryRef" :inline="false" v-show="showSearch" labelSuffix=":">
      <el-row :gutter="20">
        <el-col :lg="6" :xl="4" :sm="12" :md="12" :xs="24">
          <el-form-item prop="businessEntityName">
            <el-input
                v-model="formData.businessEntityName"
                :placeholder="$t('fabricInventory.businessEntityName')"
                clearable
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :xl="4" :sm="12" :md="12" :xs="24">
          <el-form-item prop="fabricCode">
            <el-input
                v-model="formData.fabricCode"
                :placeholder="$t('fabricInventory.fabricCode')"
                clearable
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :xl="4" :sm="12" :md="12" :xs="24">
          <el-form-item prop="colorName">
            <el-input
                v-model="formData.colorName"
                :placeholder="$t('fabricInventory.colorName')"
                clearable
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :xl="4" :sm="12" :md="12" :xs="24">
          <el-form-item prop="roll">
            <el-input
                v-model="formData.roll"
                :placeholder="$t('fabricInventory.roll')"
                clearable
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :xl="4" :sm="12" :md="12" :xs="24">
          <el-form-item prop="lot">
            <el-input
                v-model="formData.lot"
                :placeholder="$t('fabricInventory.lot')"
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
        @queryTable="store.getInventoryListReports(formData)" v-model:showSearch="showSearch"
        @handleCurrentChange="store.getInventoryListReports(formData)" :total="store.totalItems" showMultipleColumn v-model:pageSize="formData.pageSize"
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
import useFabricInventory from '@/store/modules/fabric_inventory'

const { proxy } = getCurrentInstance();

const { pageData } = useData();
const store = useFabricInventory();
const {t} = useI18n()
const multipleTableRef = ref();
const showSearch = ref(true);
const initFormData = {
  businessEntityName: '',
  fabricCode:'',
  colorName:'',
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
    "bok/fabricWarehouseInventoryReport/export",
    formData,
    `fabric_inventory_report_${new Date().getTime()}.xlsx`
  );
}

const handleSearch = () => {
  formData.businessEntityName = formData.businessEntityName.trim();
  formData.colorName = formData.colorName.trim();
  formData.fabricCode = formData.fabricCode.trim();
  formData.lot = formData.lot.trim();
  formData.roll = formData.roll.trim();
  store.getInventoryListReports(formData);
}
onMounted(() => {
  store.getInventoryListReports(formData);
})

const resetFormData = () => {
  Object.assign(formData, { ...initFormData });
  store.getInventoryListReports();
}

</script>