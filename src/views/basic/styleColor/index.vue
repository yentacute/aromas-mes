<script setup>
import {useI18n} from "vue-i18n";
import useSettingsStore from "@/store/modules/settings.js";
import CtnTable from "@/components/CtnTable/index.vue";
import useData from "./hook/useData.js";
import useSearch from "./hook/useSearch.js";
import useUpdate from "./hook/useUpdate.js";
import useDelete from "./hook/useDelete.js";

defineOptions({
  name: "FabricColor"
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
  closeHandle,
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
  proxy.download('bok/fabricColor/export', {
    ...formData
  }, `fabricColor${new Date().getTime()}.xlsx`)
}
</script>


<template>
  <div class="app-container">
    <el-form :model="formData" ref="searchFormRef" :inline="true" v-show="showSearch" labelSuffix=":">
      <el-row :gutter="20">
        <el-col :lg="4" :sm="12" :md="12" :xs="24">
          <el-form-item label="颜色编码" prop="colorCode">
            <el-input
                v-model="formData.colorCode"
                placeholder="请输入颜色编码"
                clearable
                @keyup.enter="loadData"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="4" :sm="12" :md="12" :xs="24">
          <el-form-item label="颜色名称" prop="colorName">
            <el-input
                v-model="formData.colorName"
                placeholder="请输入颜色名称"
                clearable
                @keyup.enter="loadData"
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
        @select="select" ref="tableRef" @queryTable="loadData" v-model:showSearch="showSearch" table-key="fabricColorId"
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
          <el-button link type="primary" icon="Edit" @click="openHandle(row,row.id)"
                     >
          </el-button>
        </el-tooltip>
        <el-tooltip
            class="box-item"
            effect="dark"
            :content="$t('edit')"
            placement="top-start"
        >
          <el-button link type="primary" icon="Delete" :disabled="Boolean(idList.length)" @click="deleteCb(row)"
                     >
          </el-button>
        </el-tooltip>
      </template>
      <template #delFlagDefault="{ data: { row } }">
        <el-tag :type="!row.delFlag ? 'success': 'info'">{{ !row.delFlag ? '正常' : '禁用' }}</el-tag>
      </template>
    </ctn-table>

    <!-- 添加或修改对话框 -->
    <el-dialog :title="title" v-model="showHandle" width="500px" append-to-body @close="closeHandle">
      <el-form ref="updateFormRef" label-position="left" :model="updateFormData" :rules="updateFormRules"
               label-suffix="：">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="颜色编码" prop="colorCode">
              <el-input v-model="updateFormData.colorCode" placeholder="请输入颜色编码" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="颜色名称" prop="colorName">
              <el-input v-model="updateFormData.colorName" placeholder="请输入颜色名称" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="十六进制颜色" prop="sixteenDigitColor">
              <el-input v-model="updateFormData.sixteenDigitColor" placeholder="请输入十六进制颜色" />
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
          <el-button class="btn-cancel" @click="showHandle = false">{{ $t('cancel') }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

