<script setup>
import {useI18n} from "vue-i18n";
import useSettingsStore from "@/store/modules/settings.js";
import CtnTable from "@/components/CtnTable/index.vue";
import useData from "./hook/useData.js";
import useSearch from "./hook/useSearch.js";
import {defaultTime} from "@/utils/index.js";

defineOptions({
  name: "InventoryPopup" // 选择库存弹窗
});
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  width:{
    type: String,
    default: '65%'
  },
  eliminateIds:{
    type: String,
    default: ''
  }
});
const emit = defineEmits([
  'select',
  "update:modelValue"
]);
const value = computed(() => {
  return props.modelValue;
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
  time
} = useSearch()

const showSearch = ref(true);
const tableRef = ref('');
const selectList = ref([])
const open = () => {
  if(props.eliminateIds){
    formData.eliminateIds = props.eliminateIds
  }
  loadData()
}


const select = (e) => {
  selectList.value = e.rowList;
}

/**
 * 提交
 */
const confirmCallback = async () => {
  emit('select', selectList.value)
  emit("update:modelValue", false);
  selectList.value = []

}
const cancelCallbackCb= () => {
  emit("update:modelValue", false);
  formData.eliminateIds = ''
  selectList.value = []
  resetData()
}

</script>


<template>
  <div class="app-container">
  <el-dialog destroy-on-close v-model="value"
             @open="open"
             :title="t('wmsPicking.inventory')" draggable :width="props.width" align-center
             :close-on-click-modal="false" @close="cancelCallbackCb">
    <el-form :model="formData" ref="searchFormRef" :inline="true" labelSuffix=":">
      <el-row :gutter="20">
        <el-col :lg="5" :sm="12" :md="12" :xs="24">
          <el-form-item :label="t('stockFabric.fabricCode')" prop="fabricCode">
            <el-input
                v-model="formData.fabricCode"
                :placeholder="`${t('input')}${t('stockFabric.fabricCode')} `"
                clearable
            />
          </el-form-item>
        </el-col>
        <el-col :lg="5" :sm="12" :md="12" :xs="24">
          <el-form-item :label="t('stockFabric.colorName')" prop="colorName">
            <el-input
                v-model="formData.colorName"
                :placeholder="`${t('input')}${t('stockFabric.colorName')} `"
                clearable
            />
          </el-form-item>
        </el-col>
        <el-col :lg="5" :sm="12" :md="12" :xs="24">
          <el-form-item :label="t('stockFabric.width')" prop="width">
            <el-input
                v-model="formData.width"
                :placeholder="`${t('input')}${t('stockFabric.width')} `"
                clearable
            />
          </el-form-item>
        </el-col>

        <el-col :lg="2" :sm="12" :md="12" :xs="24" class="mt5">
          <el-tag>已选:{{selectList.length || 0}}</el-tag>
        </el-col>
        <el-col :lg="6" :sm="12" :md="12" :xs="24">
          <el-form-item>
            <el-button type="primary" icon="Search" @click="loadData">{{ t('query') }}</el-button>
            <el-button icon="Refresh" @click="resetData">{{ t('reset') }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-show="showSearch">
        <el-col :lg="5" :sm="12" :md="12" :xs="24">
          <el-form-item :label="t('stockFabric.lot')" prop="lot">
            <el-input
                v-model="formData.lot"
                :placeholder="`${t('input')}${t('stockFabric.lot')} `"
                clearable
            />
          </el-form-item>
        </el-col>
        <el-col :lg="5" :sm="12" :md="12" :xs="24">
          <el-form-item :label="t('stockFabric.styleNo')" prop="styleNo">
            <el-input
                v-model="formData.styleNo"
                :placeholder="`${t('input')}${t('stockFabric.styleNo')} `"
                clearable
            />
          </el-form-item>
        </el-col>
        <el-col :lg="9" :sm="12" :md="12" :xs="24">
          <el-form-item :label="t('searchTab.time')" prop="startTime">
            <el-date-picker clearable
                            v-model="time"
                            type="datetimerange"
                            unlink-panels
                            :default-time="defaultTime"
                            value-format="YYYY-MM-DD HH:mm:ss"
                            :range-separator="$t('searchTab.to')"
                            :start-placeholder="$t('searchTab.startTime')"
                            :end-placeholder="$t('searchTab.endTime')"
                            :placeholder="`${$t('choose')}${$t('upload_time')}`">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <ctn-table
        :loading="useSettingsStore().loading" v-model:showSearch="showSearch"
        @select="select" ref="tableRef" @queryTable="loadData" :showSearch="false" table-key="InventoryPopupId"
        @handleCurrentChange="loadData" :total="tableData.total" showMultipleColumn v-model:pageSize="formData.pageSize"
        v-model:pageNum="formData.pageNum" operateWidth="100px" :tableData="tableData.list"
        :columnData="pageData.columnData" :showSummary="false" :showOperate="false" :show-multiple="true"
        :show-multiple-column="true" :showPagination="true">
    </ctn-table>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" class="btn-confirm" :loading="useSettingsStore().loading" @click="confirmCallback">
          {{ t('confirm') }}
        </el-button>
        <el-button class="btn-cancel" @click="cancelCallbackCb">{{ t('cancel') }}</el-button>
      </div>
    </template>
  </el-dialog>
  </div>
</template>

