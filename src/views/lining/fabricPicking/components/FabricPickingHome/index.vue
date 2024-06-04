<script setup>
import {useI18n} from "vue-i18n";
import useSettingsStore from "@/store/modules/settings.js";
import CtnTable from "@/components/CtnTable/index.vue";
import useData from "./hook/useData.js";
import useSearch from "./hook/useSearch.js";
import useDelete from "./hook/useDelete.js";
import {ref} from "vue";
import {ArrowDown, Printer} from "@element-plus/icons-vue";
import FabricPickingPrint from "@/views/lining/fabricPicking/components/FabricPickingPrint/index.vue";
import {getFabricPicking, reqUpdateFabricPickingStatus} from "@/api/lining/fabricPicking.js";
import modal from "@/plugins/modal.js";
import {ElMessage} from "element-plus";

defineOptions({
  name: "FabricPickingHome" // 领料单
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
  deleteHandler,
  select,
  idList
} = useDelete(t, proxy)

const showSearch = ref(true);
const loading = ref(useSettingsStore().loading)
const printRef = ref()
const printType = ref()
const printData = reactive({})
const printList = ref([])
onMounted(() => {
  loadData()
})

onActivated(() => {
  resetData()
})

/**
 * 删除
 */
const deleteCb = async (row) => {
  await deleteHandler(row);
  await loadData();
}

// 提交撤回单据
const handleUpdatePicking = async (row, type) => {
  const confirmationMessage = type ? t('submitOk') : t('submitBack');
  await proxy.$modal.confirm(confirmationMessage);
  await updateFabricPickingStatus(row);
  await loadData();

}
// 提交撤回单据
const updateFabricPickingStatus = async ({id, billStatus}) => {
  await reqUpdateFabricPickingStatus({id, billStatus: billStatus === 'draft' ? 'approved' : 'draft'})
  ElMessage({
    type: 'success',
    message: t('operate_success')
  })
}

// 打印
const handlePrint = async (e,{id}) => {
  printType.value = e
  modal.loading("正在生成打印预览，请稍后...");
  loading.value = false
  const {data} = await getFabricPicking({id})
  Object.assign(printData, data)
  printList.value = data.details
  await nextTick()
  if (printRef.value) {
    await printRef.value[printType.value ? 'print' : 'PrintAroma']();
    loading.value = useSettingsStore().loading
  }
}
const handleAdd = (id, type) => {
  emit('toggleClick', {
    name: 'addFabricPicking',
    id,
    type
  })

}
const emit = defineEmits([
  'toggleClick',
]);
</script>

<template>
  <div class="app-container">
    <el-form :model="formData" ref="searchFormRef" :inline="true" v-show="showSearch" labelSuffix=":">
      <el-row :gutter="20">
        <el-col :lg="5" :sm="12" :md="12" :xs="24">
          <el-form-item :label="t('wmsPicking.billNo')" prop="billNo">
            <el-input
                v-model="formData.billNo"
                :placeholder="`${t('input')}${t('wmsPicking.billNo')} `"
                clearable
            />
          </el-form-item>
        </el-col>
        <el-col :lg="5" :sm="12" :md="12" :xs="24">
          <el-form-item :label="t('wmsPicking.materialInfo')" prop="materialInfo">
            <el-input
                v-model="formData.materialInfo"
                :placeholder="`${t('input')}${t('wmsPicking.materialInfo')} `"
                clearable
            />
          </el-form-item>
        </el-col>
        <!--        <el-col :lg="5" :sm="12" :md="12" :xs="24">-->
        <!--          <el-form-item :label="t('wmsPicking.english_name')" prop="brandEnName">-->
        <!--            <el-input-->
        <!--                v-model="formData.brandEnName"-->
        <!--                :placeholder="`${t('input')}${t('wmsPicking.english_name')} `"-->
        <!--                clearable-->
        <!--            />-->
        <!--          </el-form-item>-->
        <!--        </el-col>-->
        <el-col :lg="6" :sm="12" :md="12" :xs="24">
          <el-form-item label="" prop="delFlag">
            <el-checkbox v-model="formData.disable" @change="loadData" :true-label="1" :false-label="0"
                         :label="t('include_disable')" size="large"/>
            <el-checkbox v-model="formData.createId" @change="loadData" :true-label="1" :false-label="0"
                         :label="t('wmsPicking.personal')" size="large"/>
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
            @click="handleAdd(undefined,false)"
        >{{ t('add') }}
        </el-button>
      </el-col>
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--            type="danger"-->
      <!--            plain-->
      <!--            icon="Delete"-->
      <!--            :disabled="!Boolean(idList.length)"-->
      <!--            @click="deleteCb"-->
      <!--        >{{ t('delete') }}-->
      <!--        </el-button>-->
      <!--      </el-col>-->
    </el-row>
    <ctn-table
        :loading="loading"
        :hide-summary-list="['orderInfo','styleInfo','situation','percentage','businessEntityName','remark','disable']"
        @select="select" @queryTable="loadData" v-model:showSearch="showSearch" table-key="fabricPickingId"
        @handleCurrentChange="loadData" :total="tableData.total" showMultipleColumn v-model:pageSize="formData.pageSize"
        v-model:pageNum="formData.pageNum" operateWidth="100px" :tableData="tableData.list"
        :columnData="pageData.columnData" :showSummary="true" :showOperate="false" :show-multiple="false"
        :show-multiple-column="true" :showPagination="true">
      <template #operateDefault="{ data:{row} }">
        <el-tooltip
            class="box-item"
            effect="dark"
            :content="t('check_details')"
            placement="top-start"
        >
          <el-button link type="primary" icon="View" @click="handleAdd(row.id,true)"
          >
          </el-button>
        </el-tooltip>
        <el-tooltip
            v-if="row.billStatus === 'draft'"
            class="box-item"
            effect="dark"
            :content="t('edit')"
            placement="top-start"
        >
          <el-button link type="primary" icon="Edit" @click="handleAdd(row.id,false)"
          >
          </el-button>
        </el-tooltip>
        <el-tooltip
            v-if="row.billStatus === 'draft'"
            class="box-item"
            effect="dark"
            :content="t('submit')"
            placement="top-start"
        >
          <el-button link type="primary" @click="handleUpdatePicking(row,1)"
          >
            <el-icon>
              <Finished/>
            </el-icon>
          </el-button>
        </el-tooltip>
        <el-tooltip
            v-else
            class="box-item"
            effect="dark"
            :content="t('backSubmit')"
            placement="top-start"
        >
          <el-button link type="primary" @click="handleUpdatePicking(row,0)"
          >
            <el-icon>
              <RefreshLeft/>
            </el-icon>
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
        <el-tooltip
            class="box-item"
            effect="dark"
            :content="t('print')"
            placement="top-start"
        >
          <!--          <el-button link type="primary" :disabled="Boolean(idList.length)" @click="handlePrint(row)">-->
          <!--            <el-icon><Printer/></el-icon>-->
          <!--          </el-button>-->
          <el-dropdown @command="handlePrint($event,row)">
            <div class="el-dropdown-link mt6">
              <el-icon>
                <Printer/>
              </el-icon>
              <el-icon class="el-icon--right">
                <arrow-down/>
              </el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :command="1">{{t('wmsPicking.basic')}}</el-dropdown-item>
                <el-dropdown-item :command="0">Aroma</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-tooltip>
      </template>
      <template #billStatusDefault="{ data: { row } }">
        <el-tag :type="row.billStatus === 'draft' ? 'info': 'success'">
          {{ row.billStatus === 'draft' ? t('draft') : t('approved') }}
        </el-tag>
      </template>
      <template #percentageDefault="{ data: { row } }">
        <el-progress :text-inside="true" :stroke-width="16" :percentage="row.percentage"/>
      </template>
      <template #disableDefault="{ data: { row } }">
        <el-tag :type="!row.disable ? 'success': 'info'">{{ !row.disable ? t('normal') : t('disabled') }}</el-tag>
      </template>
    </ctn-table>
    <div v-show="false">
      <fabric-picking-print ref="printRef" :data="printData" :list="printList" v-show="false" :type="printType"
                            :column-data="pageData.printData"></fabric-picking-print>
    </div>
  </div>
</template>


