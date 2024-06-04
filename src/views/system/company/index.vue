<script setup>
import {useI18n} from "vue-i18n";
import useSettingsStore from "@/store/modules/settings.js";
import CtnTable from "@/components/CtnTable/index.vue";
import useData from "./hook/useData.js";
import useSearch from "./hook/useSearch.js";
import useUpdate from "./hook/useUpdate.js";
import useDelete from "./hook/useDelete.js";
import ImageUpload from "@/components/ImageUpload/index.vue";

defineOptions({
  name: "Company" // 公司信息
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
  isDetails,
  closeHandle
} = useUpdate()
const {
  deleteHandler,
  select,
  idList
} = useDelete(t, proxy)

const showSearch = ref(true);
const tableRef = ref('');
const isUnFold = ref(false)
const activeNames = ref(['1'])
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
  proxy.download('bok/company/export', {
    ...formData
  }, `company_${new Date().getTime()}.xlsx`)
}
const handleUnfold= () => {
  isUnFold.value = !isUnFold.value
  activeNames.value = isUnFold.value ? ['1','2','3','4'] : ['1']
}
</script>


<template>
  <div class="app-container">
    <el-form :model="formData" ref="searchFormRef" :inline="true" v-show="showSearch" labelSuffix=":">
      <el-row :gutter="20">
        <el-col :lg="4" :sm="12" :md="12" :xs="24">
          <el-form-item :label="t('company.short-name')" prop="companyShortName">
            <el-input
                v-model="formData.companyShortName"
                :placeholder="t('company.input')  + t('company.short-name')"
                clearable
                @keyup.enter="loadData"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="4" :sm="12" :md="12" :xs="24">
          <el-form-item :label="t('company.all-name')" prop="companyFullName">
            <el-input
                v-model="formData.companyFullName"
                :placeholder="t('company.input')  + t('company.all-name')"
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
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--            type="danger"-->
<!--            plain-->
<!--            icon="Delete"-->
<!--            :disabled="!Boolean(idList.length)"-->
<!--            @click="deleteCb"-->
<!--        >{{ $t('delete') }}-->
<!--        </el-button>-->
<!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
            type="warning"
            plain
            icon="Download"
            @click="handleExport"
            class="btn-export"
        >{{t('import')}}</el-button>
      </el-col>
<!--            <right-toolbar v-model:showSearch="showSearch" :columns="pageData.columnData"  @queryTable="loadData"></right-toolbar>-->
    </el-row>
    <ctn-table
        :loading="useSettingsStore().loading"
        @select="select" ref="tableRef" @queryTable="loadData" v-model:showSearch="showSearch" table-key="companyId"
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
          <el-button link type="primary" icon="View" @click="handleCheckDetail(row)">
          </el-button>
        </el-tooltip>
        <el-tooltip
            class="box-item"
            effect="dark"
            :content="t('edit')"
            placement="top-start"
        >
          <el-button link type="primary" icon="Edit" @click="openHandle(row,row.id)">
          </el-button>
        </el-tooltip>
        <el-tooltip
            class="box-item"
            effect="dark"
            :content="t('delete')"
            placement="top-start"
        >
          <el-button link type="primary" icon="Delete" :disabled="Boolean(idList.length)" @click="deleteCb(row)">
          </el-button>
        </el-tooltip>
      </template>
      <template #disableDefault="{ data: { row } }">
        <el-tag :type="!row.disable ? 'success': 'info'">{{ !row.disable ? t('normal') : t('disabled') }}</el-tag>
      </template>
    </ctn-table>
    <!-- 添加或修改对话框 -->
    <el-dialog :title="title" v-model="showHandle" width="40%" append-to-body draggable>
      <template #header="{ close, titleId, titleClass }">
        <div class="my-header">
          <div :id="titleId" :class="titleClass">{{title}}</div>
          <div>
          <el-button class="mr20" @click="handleUnfold">{{ isUnFold ? t('company.complete') : t('company.contracted') }}</el-button>
          </div>
        </div>
      </template>

      <el-form ref="updateFormRef" label-position="left" :model="updateFormData" :rules="updateFormRules"
               label-suffix="：">
        <el-collapse v-model="activeNames">
          <el-collapse-item :title="t('company.main')" name="1">
            <el-row :gutter="20">
              <el-col :lg="12" :sm="12" :md="12" :xs="24">
                <el-form-item :label="t('company.code')" prop="companyCode">
                  <el-input v-model="updateFormData.companyCode" :disabled="isDetails" :placeholder="t('company.input') + t('company.code')" />
                </el-form-item>
              </el-col>
              <el-col :lg="12" :sm="12" :md="12" :xs="24">
                <el-form-item :label="t('company.short-name')" prop="companyShortName">
                  <el-input v-model="updateFormData.companyShortName" :disabled="isDetails" :placeholder="t('company.input') + t('company.short-name')" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :lg="12" :sm="12" :md="12" :xs="24">
                <el-form-item :label="t('company.all-name')" prop="companyFullName">
                  <el-input v-model="updateFormData.companyFullName" :disabled="isDetails" :placeholder="t('company.input') + t('company.all-name')" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item :title="t('company.secondary')" name="2">
            <el-row :gutter="20">
              <el-col :lg="12" :sm="12" :md="12" :xs="24">
                <el-form-item :label="t('company.enName')" prop="companyEnName">
                  <el-input v-model="updateFormData.companyEnName" :disabled="isDetails" :placeholder="t('company.input') + t('company.enName')" />
                </el-form-item>
              </el-col>
              <el-col :lg="12" :sm="12" :md="12" :xs="24">
                <el-form-item :label="t('company.home')" prop="companyHomepage">
                  <el-input v-model="updateFormData.companyHomepage" :disabled="isDetails" :placeholder="t('company.input') + t('company.home')" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :lg="12" :sm="12" :md="12" :xs="24">
                <el-form-item :label="t('company.country')" prop="country">
                  <el-input v-model="updateFormData.country" :disabled="isDetails" :placeholder="t('company.input') + t('company.country')" />
                </el-form-item>
              </el-col>
              <el-col :lg="12" :sm="12" :md="12" :xs="24">
                <el-form-item :label="t('company.region')" prop="district">
                  <el-input v-model="updateFormData.district" :disabled="isDetails" :placeholder="t('company.input') + t('company.region')" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :lg="12" :sm="12" :md="12" :xs="24">
                <el-form-item :label="t('company.bank_name')" prop="bankName">
                  <el-input v-model="updateFormData.bankName" :disabled="isDetails" :placeholder="t('company.input') + t('company.bank_name')" />
                </el-form-item>
              </el-col>
              <el-col :lg="12" :sm="12" :md="12" :xs="24">
                <el-form-item :label="t('company.bank_account')" prop="bankAccount">
                  <el-input v-model="updateFormData.bankAccount" :disabled="isDetails" :placeholder="t('company.input') + t('company.bank_account')" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :lg="12" :sm="12" :md="12" :xs="24">
                <el-form-item :label="t('company.duty_paragraph')" prop="taxNo">
                  <el-input v-model="updateFormData.taxNo" :disabled="isDetails" :placeholder="t('company.input') + t('company.duty_paragraph')" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item :title="t('company.contact')" name="3">
            <el-row :gutter="20">
              <el-col :lg="12" :sm="12" :md="12" :xs="24">
                <el-form-item :label="t('company.contact')" prop="contactPerson">
                  <el-input v-model="updateFormData.contactPerson" :disabled="isDetails" :placeholder="t('company.input') + t('company.contact')" />
                </el-form-item>
              </el-col>
              <el-col :lg="12" :sm="12" :md="12" :xs="24">
                <el-form-item :label="t('company.contactWay')" prop="contactNumber">
                  <el-input v-model="updateFormData.contactNumber" :disabled="isDetails" :placeholder="t('company.input') + t('company.contactWay')" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :lg="12" :sm="12" :md="12" :xs="24">
                <el-form-item :label="t('company.email')" prop="eMail">
                  <el-input v-model="updateFormData.eMail" :disabled="isDetails" :placeholder="t('company.input') + t('company.email')" />
                </el-form-item>
              </el-col>
              <el-col :lg="12" :sm="12" :md="12" :xs="24">
                <el-form-item :label="t('company.postalCode')" prop="postCode">
                  <el-input v-model="updateFormData.postCode" :disabled="isDetails" :placeholder="t('company.input') + t('company.postalCode')" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :lg="12" :sm="12" :md="12" :xs="24">
                <el-form-item :label="t('company.address')" prop="address">
                  <el-input v-model="updateFormData.address" :disabled="isDetails" :placeholder="t('company.input') + t('company.address')" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item :title="t('company.other')" name="4">
            <el-row :gutter="20">
              <el-col :lg="15" :sm="12" :md="12" :xs="24">
                <el-form-item :label="t('company.logo')" prop="logoPath" label-width="120">
<!--                  <el-input v-model="updateFormData.logoPath" placeholder="请输入logo地址" />-->
                  <image-upload v-model="updateFormData.logoPath" :disabled="isDetails" :limit="1"></image-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :lg="15" :sm="12" :md="12" :xs="24">
                <el-form-item :label="t('company.bgImg')" prop="backgroundPath" label-width="120">
<!--                  <el-input v-model="updateFormData.backgroundPath" placeholder="请输入背景图片地址" />-->
                  <image-upload v-model="updateFormData.backgroundPath" :disabled="isDetails" :limit="1"></image-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :lg="12" :sm="12" :md="12" :xs="24">
                <el-form-item :label="$t('company.note')" prop="remark">
                  <el-input v-model="updateFormData.remark" type="textarea" clearable :disabled="isDetails"
                            :placeholder="`${$t('input')}${$t('company.note')} `"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" class="btn-confirm" v-if="!isDetails" :loading="useSettingsStore().loading" @click="submitCb">
            {{ $t('confirm') }}
          </el-button>
          <el-button class="btn-cancel" @click="closeHandle">{{ isDetails ? t('close') : t('cancel') }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style>
.my-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>
