<template>
  <div class="app-container">
    <el-form :model="formData" ref="queryRef" :inline="true" v-show="showSearch" labelSuffix=":">
      <el-row :gutter="20">
        <el-col :lg="4" :sm="12" :md="12" :xs="24">
          <el-form-item :label="$t('file_name')" prop="fileName">
            <el-input
                v-model="formData.fileName"
                :placeholder="`${$t('input')}${$t('file_name')}`"
                clearable
            />
          </el-form-item>
        </el-col>
        <el-col :lg="7" :sm="12" :md="12" :xs="24">
          <el-form-item :label="$t('uploadInfo.time')" prop="time">
            <el-date-picker clearable
                            v-model="time"
                            type="datetimerange"
                            :default-time="defaultTime"
                            value-format="YYYY-MM-DD HH:mm:ss"
                            :range-separator="$t('searchTab.to')"
                            :start-placeholder="$t('searchTab.startTime')"
                            :end-placeholder="$t('searchTab.endTime')"
                            :placeholder="`${$t('choose')}${$t('upload_time')}`">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :lg="5" :sm="12" :md="12" :xs="24">
          <el-form-item :label="`${$t('upload')}${$t('nick_name')}`" prop="nickName" label-width="120px">
            <el-input
                v-model="formData.nickName"
                :placeholder="`${$t('input')}${$t('upload')}${$t('nick_name')}`"
                clearable
            />
          </el-form-item>
        </el-col>
        <el-col :lg="8" :sm="12" :md="12" :xs="24">
          <el-form-item>
            <el-button type="primary" :loading="useSettingsStore().loading" icon="Search" @click="loadData">
              {{ $t('query') }}
            </el-button>
            <el-button icon="Refresh" @click="resetData">{{ $t('reset') }}</el-button>
            <el-button
                type="info"
                plain
                icon="Upload"
                @click="handleImport"
            >{{ $t('import') }}
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <ctn-table
        :loading="useSettingsStore().loading"
        @queryTable="loadData" v-model:showSearch="showSearch" table-key="loadId"
        @handleCurrentChange="loadData" :total="tableData.total" showMultipleColumn v-model:pageSize="formData.pageSize"
        v-model:pageNum="formData.pageNum" operateWidth="100px" :tableData="tableData.list"
        :columnData="pageData.columnData" :showSummary="false" :showOperate="false" :show-multiple="false"
        :show-multiple-column="true" :showPagination="true">
      <template #operateDefault="{ data:{row} }">
        <el-tooltip
            class="box-item"
            effect="dark"
            :content="$t('check_details')"
            placement="top-start"
        >
          <el-button link type="primary" icon="View" @click="handleDetail(row.id)">
          </el-button>
        </el-tooltip>
        <el-tooltip
            class="box-item"
            effect="dark"
            :content="$t('print')"
            placement="top-start"
        >
          <el-button link type="primary" @click="handlePrintAll(row)">
            <el-icon>
              <Printer/>
            </el-icon>
          </el-button>
        </el-tooltip>
      </template>
    </ctn-table>

    <!--    明细详情-->
    <el-dialog v-model="isShowDetails" fullscreen>
      <el-form :model="detailFormData" ref="detailFormRef" :inline="true" v-show="showSearch" labelSuffix=":" class="detail-search">
        <el-row :gutter="20">
          <el-col :lg="6" :sm="12" :md="12" :xs="24">
            <!--            货柜号-->
            <el-form-item :label="$t('load.best_cabinet_num')" prop="supplierContrinerLoadNum">
              <el-select v-model="detailFormData.supplierContrinerLoadNum" clearable
                         @focus="getOptions('supplierContrinerLoadNum')"
                         :placeholder="`${$t('choose')}${$t('load.best_cabinet_num')}`">
                <el-option
                    v-for="item in optionsList"
                    :key="item.dictValue"
                    :label="item.dictLable"
                    :value="item.dictValue"
                />
              </el-select>
              <!--              <SelectMapInput v-model="detailFormData.supplierContrinerLoadNum" :valueId="useSettingsStore().mapData['领料类型']" />-->
            </el-form-item>
          </el-col>
          <el-col :lg="6" :sm="12" :md="12" :xs="24">
            <!--            布料编码-->
            <el-form-item :label="$t('load.part_num')" prop="part_num">
              <el-select v-model="detailFormData.itemCode" clearable
                         @focus="getOptions('itemCode')"
                         :placeholder="`${$t('choose')}${$t('load.part_num')}`">
                <el-option
                    v-for="item in optionsList"
                    :key="item.dictValue"
                    :label="item.dictLable"
                    :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :sm="12" :md="12" :xs="24">
            <!--季节-->
            <el-form-item :label="$t('load.season')" prop="season">
              <el-select v-model="detailFormData.season" clearable
                         @focus="getOptions('season')"
                         :placeholder="`${$t('choose')}${$t('load.season')}`">
                <el-option
                    v-for="item in optionsList"
                    :key="item.dictValue"
                    :label="item.dictLable"
                    :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <!--          供应商-->
          <el-col :lg="6" :sm="12" :md="12" :xs="24">
            <el-form-item :label="$t('load.supplier')" prop="supplier">
              <el-select v-model="detailFormData.businessEntityName" clearable
                         @focus="getOptions('businessEntityName')"
                         :placeholder="`${$t('choose')}${$t('load.supplier')}`">
                <el-option
                    v-for="item in optionsList"
                    :key="item.dictValue"
                    :label="item.dictLable"
                    :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <!--          颜色-->
          <el-col :lg="6" :sm="12" :md="12" :xs="24">
            <el-form-item :label="$t('load.colour')" prop="colour">
              <el-select v-model="detailFormData.itemColor" clearable
                         @focus="getOptions('itemColor')"
                         :placeholder="`${$t('choose')}${$t('load.colour')}`">
                <el-option
                    v-for="item in optionsList"
                    :key="item.dictValue"
                    :label="item.dictLable"
                    :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <!--          缸号-->
          <el-col :lg="6" :sm="12" :md="12" :xs="24">
            <el-form-item :label="$t('load.cylinder_num')" prop="lot">
              <el-select v-model="detailFormData.lot" clearable
                         @focus="getOptions('lot')"
                         :placeholder="`${$t('choose')}${$t('load.cylinder_num')}`">
                <el-option
                    v-for="item in optionsList"
                    :key="item.dictValue"
                    :label="item.dictLable"
                    :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="5" :sm="12" :md="12" :xs="24">
            <el-form-item>
              <el-button type="primary" :loading="useSettingsStore().loading" icon="Search" @click="getLoadDetailsList">
                {{ $t('query') }}
              </el-button>
              <el-button icon="Refresh" @click="resetDetailFormData">{{ $t('reset') }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button type="primary" @click="handlePrint" :disabled="!selectionList.length">
            批量打印
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="primary" @click="showAddFormData = true" >
            {{ $t('add')}}
          </el-button>
        </el-col>

      </el-row>
      <ctn-table
          :loading="useSettingsStore().loading" ref="multipleTableRef" @select="handleSelectionChange"
          @queryTable="getLoadDetailsList" v-model:showSearch="showSearch" table-key="loadDetailsId"
          @handleCurrentChange="getLoadDetailsList" :total="tableData.detailsTotal" showMultipleColumn
          v-model:pageSize="detailFormData.pageSize"
          v-model:pageNum="detailFormData.pageNum" operateWidth="100px" :tableData="tableData.loadDetailsList"
          :columnData="pageData.detailsColumnData" :showSummary="false" :showOperate="false" :show-multiple="true"
          :show-multiple-column="true" :showPagination="true">
        <template #inFabricDefault="{ data: { row } }">
          <el-tag :type="!row.inFabric ? 'success': 'info'">{{ !row.inFabric ? t('inStorage') : t('notInStorage') }}</el-tag>
        </template>
        <template #operateDefault="{ data:{row} }">
           <el-tooltip
              class="box-item"
              effect="dark"
              :content="$t('edit')"
              placement="top-start"
            >
            <el-button link type="primary" @click="handleEdit(row)">
              <el-icon>
                <Edit />
              </el-icon>
            </el-button>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="$t('delete')"
            placement="top-start"
          >
            <el-button link type="primary" @click="handleDelete(row)">
              <el-icon>
                <Delete />
              </el-icon>
            </el-button>
          </el-tooltip>
          <el-tooltip
              class="box-item"
              effect="dark"
              :content="$t('print')"
              placement="top-start"
          >
            <el-button link type="primary" @click="handlePrint(row,1)">
              <el-icon>
                <Printer/>
              </el-icon>
            </el-button>
          </el-tooltip>
        </template>
      </ctn-table>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="isShowDetails = false" type="info">关闭</el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 导入 -->
    <CtnImportPopup
        width="400px"
        v-model="upload.open"
        :upload-api="reqUploadLoadingDetail"
        @confirmCallback="onConfirmBack"
        isDownloadRes
        :title="$t('uploadInfo.title1')"
        :confirmText="$t('confirm')"
        :cancelText="$t('cancel')"
    />
    <LoadQrCode :list="printList" ref="printRef"></LoadQrCode>

     <el-dialog
        v-model="showEditForm"
        title="Edit Data"
        class="popup-form"
      >
        <el-form :model="editFormData">
          <el-form-item v-for="(item, key) in pageData.detailsColumnData" :key="key" :label="item.label">
            <el-select v-model="editFormData[item.prop]" v-if="item.prop == 'inFabric'">
              <el-option :label="getLabel(0)" :value="0" />
              <el-option :label="getLabel(1)" :value="1" />
            </el-select>
            <el-input v-model="editFormData[item.prop]" v-else/>

          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="showEditForm = false">Cancel</el-button>
            <el-button type="primary" @click="handleEditSubmit">
              Confirm
            </el-button>
          </div>
        </template>
      </el-dialog>
     <el-dialog
        v-model="showAddFormData"
        title="Add Data"
        class="popup-form"
      >
        <el-form 
          :model="newFormData"
          :rules="rules"
          ref="ruleFormRef"
        >
          <el-form-item v-for="(item, key) in pageData.detailsColumnData" :key="key" :label="item.label" :prop="item.prop">
            <el-select v-model="newFormData[item.prop]" v-if="item.prop == 'inFabric'">
              <el-option :label="getLabel(0)" :value="0" />
              <el-option :label="getLabel(1)" :value="1" />
            </el-select>
            <el-date-picker
              v-model="newFormData[item.prop]"
              type="datetime"
              :placeholder="item.label"
              v-else-if="item.prop == 'containerLoadDate'"
            />
            <el-date-picker
              v-model="newFormData[item.prop]"
              type="datetime"
              :placeholder="item.label"
              v-else-if="item.prop == 'deliveryDate'"
            />
            <el-input v-model="newFormData[item.prop]" v-else/>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="showAddFormData = false">{{$t('cancel')}}</el-button>
            <el-button type="primary" @click="handleAddData(ruleFormRef)">
              {{$t('confirm')}}
            </el-button>
          </div>
        </template>
      </el-dialog>
  </div>

</template>

<script setup>
import {reqGetAllLoadDetails, reqUploadLoadingDetail, editLoadDetail, deleteLoadDetail, addLoadDetail} from "@/api/lining/load";
import {Printer} from "@element-plus/icons-vue";
import {getToken} from "@/utils/auth";
import {useI18n} from 'vue-i18n'
import CtnImportPopup from "@/components/CtnImportPopup/index.vue";
import LoadQrCode from "@/components/LoadQrCode/index.vue";
import modal from "@/plugins/modal.js";
import useSettingsStore from '@/store/modules/settings'
import useData from "./hook/useData.js";
import useSearch from "./hook/useSearch.js";
import CtnTable from "@/components/CtnTable/index.vue";
import {defaultTime} from "@/utils/index.js";
import { ElMessage, ElMessageBox  } from "element-plus";

import { reactive } from "vue";

defineOptions({
  name: 'Load'
})
const {t} = useI18n()
const {proxy} = getCurrentInstance();
const multipleTableRef = ref();
const showSearch = ref(true);
const {
  pageData
} = useData()
const {
  formData,
  tableData,
  loadData,
  time,
  detailFormData,
  resetData,
  getLoadDetailsList,
  billId,
  resetDetailFormData,
  detailFormRef,
  getOptions,
  optionsList
} = useSearch()
onMounted(() => {
  loadData()
})

const isShowDetails = ref(false)
const printList = ref([])
const selectionList = ref([])
const printRef = ref();
const showEditForm = ref(false)
const showAddFormData = ref(false)
const editFormData = ref({})
const newFormData = ref({
  billId: null
})
const ruleFormRef = ref(null)
const getLabel = (value) => {
  switch (value) {
    case 0:
      return t('inStorage');
    case 1:
      return t('notInStorage');
    default:
      return '';
  }
};

const rules = reactive({
  qrcode: [
    {
      required: true,
      message: t('fabricInpsection.require_fill'),
      trigger: 'blur',
    },
  ]
})

const handleEdit = async(row) => {
  showEditForm.value = true;
  editFormData.value = { ...row };
}
const handleAddData = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
          newFormData.value.billId = billId.value;
          const response = await addLoadDetail(newFormData.value);
          if (response.code == 200) {
            showAddFormData.value = false;
            ElMessage({
              type: "success",
              message: t("uploadInfo.success"),
            });
            getLoadDetailsList();
          }
        } catch (error) {
          ElMessage({
            type: "error",
            message: t("uploadInfo.error"),
          });
        }
    }
  })
  
}
const handleEditSubmit = async () => {
  try {
    const response = await editLoadDetail(editFormData.value);
    if (response.code == 200) {
      showEditForm.value = false;
      ElMessage({
        type: "success",
        message: t("uploadInfo.success"),
      });
      editFormData.value = {};
      getLoadDetailsList();
    }
  } catch (error) {
    ElMessage({
      type: "error",
      message: t("uploadInfo.error"),
    });
  }
}
const handleDelete = (row) => {
  ElMessageBox.confirm(
    t('delete_tip4'),
    'Warning',
    {
      confirmButtonText: t('yes'),
      cancelButtonText: t('no'),
      type: 'warning',
    }
  )
    .then(async () => {
      try {
        const response = await deleteLoadDetail(row);
        ElMessage({
          type: 'success',
          message: t('success'),
        });
        getLoadDetailsList();
      } catch (error) {
        ElMessage({
          type: 'error',
          message: t('error'),
        })
      }

    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: t('cancel'),
      })
    })
}

// 多选框选中数据
function handleSelectionChange({rowList}) {
  selectionList.value = rowList
}

/*** 用户导入参数 */
const upload = reactive({
  // 是否显示弹出层（用户导入）
  open: false,
  // 弹出层标题（用户导入）
  title: "",
  // 是否禁用上传
  isUploading: false,
  // 是否更新已经存在的用户数据
  updateSupport: 0,
  // 设置上传的请求头部
  headers: {Authorization: "Bearer " + getToken()},
  // 上传的地址
  url: import.meta.env.VITE_APP_BASE_API + "/system/user/importData"
});

/** 导入按钮操作 */
function handleImport() {
  upload.title = "用户导入";
  upload.open = true;
}

// 查看详情
const handleDetail = (id) => {
  billId.value = id
  resetDetailFormData()
  isShowDetails.value = true
}

//导入提交
const onConfirmBack = () => {
  loadData()
  upload.open = false
}

// 打印所有明细
const handlePrintAll = async (row) => {
  modal.loading("正在生成打印预览，请稍后...");
  const {data} = await reqGetAllLoadDetails({billId: row.id})
  printList.value = data.map(item => ({
    supplierPo: item.supplierPo, // PO单号 BEST采购单号
    supplier: item.supplier, // 供应商代码
    season: item.season, // 季节
    itemCode: item.itemCode, // 布料号
    itemName: item.itemName, // 颜色
    lot: item.lot, // 缸号
    roll: item.roll, // 卷号
    quantityIncludingFoc: item.quantityIncludingFoc, // 布料长度
    weight: item.weight, // 布料克重
    grossWeight: item.grossWeight, // 布料毛克重
    netWeight: item.netWeight, // 布料净克重
    supplierContrinerLoadNum: item.supplierContrinerLoadNum, // 装柜单号
    qrcode: item.qrcode, // 流水号
  }))
  await nextTick()
  await printRef.value.handleBulkPrint()
  printList.value = []
}

// 打印单个明细
const handlePrint = async (row, type) => {
  modal.loading("正在生成打印预览，请稍后...");
  if (type) {
    selectionList.value = []
    multipleTableRef.value.clearSelection()
    printList.value.push({
      supplierPo: row.supplierPo, // PO单号
      supplier: row.supplier, // 供应商代码
      season: row.season, // 季节 => 季节
      itemCode: row.itemCode, // 布料号
      itemColor: row.itemColor, // 颜色
      lot: row.lot, // 缸号
      roll: row.roll, // 卷号 => 匹号
      quantityIncludingFoc: row.quantityIncludingFoc, // 布料长度 =>数量
      weight: row.weight, // 布料克重
      grossWeight: row.grossWeight, // 布料毛克重
      netWeight: row.netWeight, // 布料净克重
      supplierContrinerLoadNum: row.supplierContrinerLoadNum, // 装柜单号
      qrcode: row.qrcode, // 流水号
    })
    // printList.value[0].id = row.containerLoadNum
  } else {
    selectionList.value = selectionList.value.map(item => ({
      supplierPo: item.supplierPo, // PO单号
      supplier: item.supplier, // 供应商代码
      season: item.season, // 季节
      itemCode: item.itemCode, // 布料号
      itemColor: item.itemColor, // 颜色
      lot: item.lot, // 缸号
      roll: item.roll, // 卷号
      quantityIncludingFoc: item.quantityIncludingFoc, // 布料长度
      weight: item.weight, // 布料克重
      grossWeight: item.grossWeight, // 布料毛克重
      netWeight: item.netWeight, // 布料净克重
      supplierContrinerLoadNum: item.supplierContrinerLoadNum, // 装柜单号
      qrcode: item.qrcode, // 流水号
    }))
    printList.value.push(...selectionList.value)

  }
  await printRef.value.handleBulkPrint()
  printList.value = []
  selectionList.value = []
  multipleTableRef.value.clearSelection()
}
</script>

<style lang="scss">
  @import "@/assets/styles/mixin.scss";

.luckysheet-wrap {
  margin: 0;
  padding: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.detail-search {
  .el-form-item__content {
    width: 100%;
    .el-select {
      width: 100%;
    }
  }
  .el-form-item {
    width: 100%;
  }
}
.popup-form {
  max-width: 100%;
  width: 100%;
  @include minWidth(768px) {
    max-width: 60%;
    width: 100%;
  }
}

</style>
