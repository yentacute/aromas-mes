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
  name: "AccessoriesColor"
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
  handleCheckDetail,
  colorList,
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

/** 下载模板操作 */
function handleDownloadTemplate() {
  proxy.download('/bok/accessoriesColor/importTemplate', {
    ...formData
  }, `accessoriesColor_${new Date().getTime()}.xlsx`)
}

/** 导入按钮操作 */
function handleImport() {
  upload.title =  t('import') + t('colorLibrary.accessory_color')
  upload.open = true;
}

//导入提交
const onConfirmBack = () => {
  loadData()
  upload.open = false
}
/*** 用户导入参数 */
const upload = reactive({
  // 是否显示弹出层（用户导入）
  open: false,
  // 弹出层标题（用户导入）
  title: "",
});

const showImportTable = ref(false);
// 批量导入
const confirmBatchImport = async (tableData) => {
  colorList.value = tableData.filter(item => {
    return item.colorCode !== '' && item.colorName !== ''
  }).map(item => {
    return {
      colorCode: item.colorCode,
      colorName: item.colorName,
      sixteenDigitColor: item.sixteenDigitColor,
      remark: item.remark
    }
  })
  if(!colorList.value.length) return
  await addAccessoriesColor(colorList.value)
  setTimeout(() => {
    loadData();
  }, 50);
}
</script>


<template>
  <div class="app-container">
    <el-form :model="formData" ref="searchFormRef" :inline="true" v-show="showSearch" labelSuffix=":">
      <el-row :gutter="20">
        <el-col :lg="5" :sm="12" :md="12" :xs="24">
          <el-form-item :label="t('colorLibrary.colorCode')" prop="colorCode">
            <el-input
                v-model="formData.colorCode"
                :placeholder="t('input') + t('colorLibrary.colorCode')"
                clearable
                @keyup.enter="loadData"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="5" :sm="12" :md="12" :xs="24">
          <el-form-item :label="t('colorLibrary.colorName')" prop="colorName">
            <el-input
                v-model="formData.colorName"
                :placeholder="t('input') + t('colorLibrary.colorName')"
                clearable
                @keyup.enter="loadData"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="2" :sm="12" :md="12" :xs="24">
          <el-form-item label="" prop="delFlag">
            <el-checkbox v-model="formData.disable" @change="loadData" :true-label="1" :false-label="0" :label="t('include_disable')" size="large"/>
          </el-form-item>
        </el-col>
        <el-col :lg="5" :sm="12" :md="12" :xs="24">
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
            type="primary"
            plain
            icon="Plus"
            @click="showImportTable = true"
        >{{t('batch')+ t('add')}}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="info"
            plain
            icon="Upload"
            @click="handleImport"
        >{{ t('import') }}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="warning"
            plain
            icon="Download"
            @click="handleDownloadTemplate"
        >{{ t('download_template') }}
        </el-button>
      </el-col>
    </el-row>
    <ctn-table
        :loading="useSettingsStore().loading"
        @select="select" ref="tableRef" @queryTable="loadData" v-model:showSearch="showSearch"
        table-key="accessoriesColorId"
        @handleCurrentChange="loadData" :total="tableData.total" showMultipleColumn v-model:pageSize="formData.pageSize"
        v-model:pageNum="formData.pageNum" operateWidth="100px" :tableData="tableData.list"
        :columnData="pageData.columnData" :showSummary="false" :showOperate="false" :show-multiple="false"
        :show-multiple-column="true" :showPagination="true">
      <template #sixteenDigitColorDefault="{ data:{row} }">
        <div style="display: flex;justify-content: space-between;width: 100%;height: 100%">
        <div :style="{width:'40%',color:'#000000FF', background:`${row.sixteenDigitColor}`}"></div>
        <div>{{ row.sixteenDigitColor }}</div></div>
      </template>
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
        <el-tag :type="!row.disable ? 'success': 'info'">{{ !row.disable ? t('normal') : t('disable') }}</el-tag>
      </template>
    </ctn-table>

    <!-- 添加或修改对话框 -->
    <el-dialog :title="title" v-model="showHandle" width="500px" append-to-body @close="closeHandle">
      <el-form ref="updateFormRef" label-position="left" :model="updateFormData" :rules="updateFormRules"
               label-suffix="：">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="t('colorLibrary.colorCode')" prop="colorCode">
              <el-input v-model="updateFormData.colorCode" :disabled="isDetails" :placeholder="t('input') + t('colorLibrary.colorCode')"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="t('colorLibrary.colorName')" prop="colorName">
              <el-input v-model="updateFormData.colorName" :disabled="isDetails" :placeholder="t('input') + t('colorLibrary.colorName')"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="t('colorLibrary.16Color')" prop="sixteenDigitColor">
              <el-input v-model="updateFormData.sixteenDigitColor" :disabled="isDetails"
                        :placeholder="t('set') + t('colorLibrary.16Color')">
                <template #append>
                  <el-color-picker size="small" v-model="updateFormData.sixteenDigitColor"/>
                </template>
              </el-input>
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
          <el-button @click="closeHandle" class="btn-cancel">{{ isDetails ? t('close') : t('cancel') }}</el-button>
        </div>
      </template>
    </el-dialog>

    <!--    批量导入-->
    <import-table :title="t('import') + t('colorLibrary.accessory_color')" v-model="showImportTable" :columnData="pageData.matchColumnData"
                  @confirmCallback="confirmBatchImport">
      <template #sixteenDigitColorDefault="{ data: { row } }">
        <el-input
            v-model="row.sixteenDigitColor"
            :placeholder="t('choose') + t('colorLibrary.16Color')"
            disabled
        >
          <template #append>
            <el-color-picker size="small" v-model="row.sixteenDigitColor"/>
          </template>
        </el-input>

      </template>
    </import-table>
    <!-- 导入excel -->
    <CtnImportPopup
        width="400px"
        v-model="upload.open"
        :upload-api="reqUploadAccessoriesColor"
        @confirmCallback="onConfirmBack"
        isDownloadRes
        :title="upload.title"
        :confirmText="t('confirm')"
        :cancelText="t('cancel')"
    />
  </div>
</template>

