<script setup>

import useSettingsStore from "@/store/modules/settings.js";
import useData from "./hook/useData.js";
import useUpdate from "./hook/useUpdate.js";
import CtnTable from "@/components/CtnTable/index.vue";
import ChooseInventoryPopup from "@/views/lining/fabricPicking/components/ChooseInventoryPopup/index.vue";
import {useI18n} from "vue-i18n";
import {reqGetBillStatus, reqGetBusinessTypeAll} from "@/api/lining/fabricPicking.js";

defineOptions({
  name: "AddFabricPicking" // 领料单
});
const props = defineProps({
  id: {
    type: String,
    required:true,
  },
  isDetails: {
    type: Boolean,
    default:false,
  },
})
const emit = defineEmits([
  'toggleClick',
]);
const {t} = useI18n()
const {
  pageData
} = useData()
const {
  updateFormData,
  updateFormRef,
  updateFormRules,
  submit,
  openHandle,
  resetForm,
  wmsFabricPickingEntityDtos,
  getFabricPickingOrder,
  getBusinessUnits,
  businessUnitsList,
} = useUpdate()
const showInventory = ref(false)
const eliminateIds = ref('') //
const businessTypeList = ref([])
const billStatusList = ref([])
onActivated(async() => {
  resetForm()
  await getFabricPickingOrder()
  await getBusinessTypeAll()
  await getBillStatus()
  await getBusinessUnits(updateFormData.businessType)
  if(props.id) {
    await openHandle(props.id)
  }
})


onDeactivated(() => {
  resetForm()
})

const getBusinessTypeAll = async () => {
  const {data} = await reqGetBusinessTypeAll()
  businessTypeList.value = data
}
// 选择库存
const handleSelectInventory = (rowList) => {
  eliminateIds.value = ''
  updateFormData.wmsFabricPickingEntityDtos?.push(...rowList)
  console.log(updateFormData,'updateFormData.wmsFabricPickingEntityDtos')
  updateFormData.wmsFabricPickingEntityDtos = updateFormData.wmsFabricPickingEntityDtos?.map((item, index) => {
    return{
      ...item,
      rowId: index + 1
    }
  });
  eliminateIds.value = updateFormData.wmsFabricPickingEntityDtos?.map(item => item.fabricWarehouseEntityId).join(',')
}

// 删除行
const handleDelRow = async (index) => {
  updateFormData.wmsFabricPickingEntityDtos.splice(index,1)
  eliminateIds.value = updateFormData.wmsFabricPickingEntityDtos?.map(item => item.fabricWarehouseEntityId).join(',')
}

// 打开选择库存
const handleOpenInventory = () => {
  showInventory.value = true
  // 库存排除项
  eliminateIds.value = updateFormData.wmsFabricPickingEntityDtos?.map(item => item.fabricWarehouseEntityId).join(',')
}
const handleBack = () => {
  emit('toggleClick', {
    name:'FabricPickingHome'
  })
}
// 提交
const submitCb = async () => {
  await submit()
  emit('toggleClick', {
    name:'FabricPickingHome'
  })
}

// 获取单据类型
const getBillStatus = async (value) => {
  const {data} =  await reqGetBillStatus(value)
  billStatusList.value = data
}
</script>

<template>
  <div class="app-container">
    <el-row :gutter="20" justify="end" class="mb10">
<!--      <el-col :lg="3" :sm="12" :md="12" :xs="24">-->
<!--        <el-button type="primary" link @click="handleBack">-->
<!--          <el-icon class="mr5"><Back /></el-icon>{{ t('back') }}-->
<!--        </el-button>-->
<!--      </el-col>-->

      <el-col :lg="3" :sm="12" :md="12" :xs="24">
        <el-button type="primary" class="btn-confirm" v-if="!isDetails" :loading="useSettingsStore().loading" @click="submitCb">
          {{ t('confirm') }}
        </el-button>
        <el-button class="btn-cancel" @click="handleBack">{{ isDetails ? t('close') : t('cancel') }}</el-button>
      </el-col>
    </el-row>
    <el-form ref="updateFormRef" label-position="left" :model="updateFormData" :rules="updateFormRules"
             label-suffix="：">
      <el-row :gutter="20">
        <el-col :lg="5" :sm="12" :md="12" :xs="24">
          <el-form-item :label="t('wmsPicking.billNo')" prop="billNo">
            <el-input v-model="updateFormData.billNo" disabled
                      :placeholder="`${t('input')}${t('wmsPicking.billNo')} `"/>
          </el-form-item>
        </el-col>
        <el-col :lg="5" :sm="12" :md="12" :xs="24">
          <el-form-item :label="t('wmsPicking.billStatus')" prop="billStatus">
            <el-select v-model="updateFormData.billStatus" clearable disabled
                       :placeholder="`${$t('choose')}${$t('wmsPicking.billStatus')}`">
              <el-option
                  v-for="item in billStatusList"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="5" :sm="12" :md="12" :xs="24">
          <el-form-item :label="t('wmsPicking.billDate')" prop="billDate">
            <el-date-picker clearable
                            :disabled="isDetails"
                            v-model="updateFormData.billDate"
                            type="Date"
                            format="YYYY-MM-DD"
                            :placeholder="`${$t('choose')}${$t('wmsPicking.billDate')}`">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :lg="5" :sm="12" :md="12" :xs="24">
          <el-form-item :label="t('wmsPicking.handler')" prop="handler">
            <el-input v-model="updateFormData.handler" clearable :disabled="isDetails"
                      :placeholder="`${t('input')}${t('wmsPicking.handler')} `"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :lg="5" :sm="12" :md="12" :xs="24">
          <el-form-item :label="t('wmsPicking.sourceType')" prop="businessType">
            <el-select v-model="updateFormData.businessType" clearable @change="getBusinessUnits" :disabled="isDetails">
              <el-option
                  v-for="item in businessTypeList"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="5" :sm="12" :md="12" :xs="24">
          <el-form-item :label="t('wmsPicking.source')" prop="businessEntityId">
            <el-select v-model="updateFormData.businessEntityId" clearable :disabled="isDetails">
              <el-option
                  v-for="item in businessUnitsList"
                  :key="item.sourceId"
                  :label="item.sourceName"
                  :value="item.sourceId"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :lg="5" :sm="12" :md="12" :xs="24">
          <el-form-item :label="t('wmsPicking.requiredTime')" prop="requiredTime">
            <el-date-picker clearable
                            :disabled="isDetails"
                            v-model="updateFormData.requiredTime"
                            type="Date"
                            format="YYYY-MM-DD"
                            :placeholder="`${$t('choose')}${$t('wmsPicking.requiredTime')}`">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :lg="9" :sm="12" :md="12" :xs="24">
          <el-form-item :label="t('remark')" prop="remark">
            <el-input v-model="updateFormData.remark" clearable :disabled="isDetails"
                      :placeholder="`${t('input')}${t('remark')} `"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" justify="end" class="mb10">
        <el-col :lg="3" :sm="12" :md="12" :xs="24">
          <el-button type="primary" :disabled="isDetails" @click="handleOpenInventory">{{ t('wmsPicking.inventory') }}
          </el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <ctn-table
            :loading="useSettingsStore().loading" :max-height="350"
            :showSearch="false" table-key="fabricPickingAddId" :is-show-tool="false"
            operateWidth="100px" :tableData="updateFormData.wmsFabricPickingEntityDtos"
            :columnData="pageData.columnData" :showSummary="false" :showOperate="false" :show-multiple="false"
            :show-multiple-column="false" :showPagination="false">
          <template #quantityDefault="{ data: { row } }">
            <el-input-number v-model.number="row.quantity" :disabled="isDetails" :min="1" :max="row.inventoryQuantity" clearable :precision="0"
                             controls-position="right"/>
          </template>
          <template #operateDefault="{ data:{row,$index} }">
            <el-tooltip
                class="box-item"
                effect="dark"
                :content="t('delete')"
                placement="top-start"
            >
              <el-button link type="primary" icon="Close" :disabled="isDetails" @click="handleDelRow($index)"
              >
              </el-button>
            </el-tooltip>
          </template>
        </ctn-table>
      </el-row>
    </el-form>
    <ChooseInventoryPopup v-model="showInventory" :eliminateIds="eliminateIds" @select="handleSelectInventory"></ChooseInventoryPopup>
  </div>
</template>

<style scoped lang="scss">

</style>
