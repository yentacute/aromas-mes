<template>
  <div>
    <el-form
      ref="ruleFormRef"
      class="fabric__inspection-form"
      label-position="top"
      :model="ruleForm"
      :rules="rules"
    >
      <el-row class="mb8 fabric__inspection-header" justify="space-between">
        <ScanInspection />
        <div class="fabric__inspection-actions">
          <el-form-item>
             <el-select
              v-model="store.selectedValue"
              class="fabric__inspection-status"
              :class="setSelectedColor"
            >
              <el-option
                v-for="item in store.dict_list"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue"
              />
            </el-select>
          </el-form-item>
            <el-form-item  prop="machineNo">
              <el-select
              v-model="ruleForm.machineNo"
              :placeholder="$t('fabricInpsection.select_machine')"
              @change="getCurrentSelected"
            >
              <el-option
                v-for="item in store.machineLists"
                :key="item.id"
                :label="item.equipmentName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-button
            :class="{ inActive: store.isRollDetailsDataEmpty }"
            type="success"
            icon="Plus"
            @click="submitForm(ruleFormRef)"
            plain
          >
            {{ $t("saveSubmit") }}
          </el-button>
          <el-button
            type="primary"
            icon="Search"
            plain
            @click="showFabricData"
            >{{ $t("fabricInpsection.select_option") }}</el-button
          >
          <el-button
            type="warning"
            :class="{ inActive: store.isRollDetailsDataEmpty }"
            icon="Download"
            plain
            @click="handleExport"
            class="btn-export"
          >
            {{ $t("fabricInpsection.export") }}
          </el-button>
        </div>
      </el-row>
      <el-row :gutter="24" class="mb8">
        <el-col>
          <h3>{{ $t("fabricInpsection.rollInfo") }}</h3>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6">
          <el-form-item :label="$t('fabricInpsection.supplier')">
            <el-input v-model="store.rollDetailsData.businessEntityName" disabled />
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6">
          <el-form-item :label="$t('load.part_num')">
            <el-input v-model="store.rollDetailsData.itemCode" disabled />
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6">
          <el-form-item :label="$t('fabricInpsection.machineNo')">
            <el-input v-model="store.rollDetailsData.machineNo" disabled />
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6">
          <el-form-item :label="$t('fabricInpsection.color')">
            <el-input v-model="store.rollDetailsData.color" disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <div :gutter="24" class="mb8 fabric__inspection-roll">
        <el-row :gutter="24">
        <el-col :xs="12" :sm="12" :md="6">
          <el-form-item :label="$t('load.cylinder_num')">
            <el-input v-model="store.rollDetailsData.lot" disabled />
          </el-form-item>
        </el-col>
          <el-col :xs="12" :sm="12" :md="6">
            <el-form-item :label="$t('fabricInpsection.roll')">
              <el-input v-model="store.rollDetailsData.roll" disabled />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="6">
            <el-form-item :label="$t('fabricInpsection.widthOriginal')">
              <el-input v-model="store.rollDetailsData.widthOriginal" disabled />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="6">
            <el-form-item :label="$t('fabricInpsection.widthActual')" prop="widthActual">
              <el-input v-model="ruleForm.widthActual" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :xs="12" :sm="12" :md="6">
            <el-form-item :label="$t('fabricInpsection.lengthOriginal')">
              <el-input v-model="store.rollDetailsData.lengthOriginal" disabled />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="6">
            <el-form-item :label="$t('fabricInpsection.lengthActual')" prop="lengthActual">
              <el-input v-model="ruleForm.lengthActual" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="6">
            <el-form-item :label="$t('fabricInpsection.weightOriginal')">
              <el-input v-model="store.rollDetailsData.weightOriginal" disabled />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="6">
            <el-form-item :label="$t('fabricInpsection.weightActual')" prop="weightActual">
              <el-input v-model="ruleForm.weightActual" clearable />
            </el-form-item>
          </el-col>
         
        </el-row>
        <el-row :gutter="24">
          <el-col :xs="12" :sm="12" :md="6">
            <el-form-item :label="$t('fabricInpsection.patternRepeatCountOriginal')">
              <el-input
                v-model="store.rollDetailsData.patternRepeatCountOriginal"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="6">
            <el-form-item
              :label="$t('fabricInpsection.patternRepeatCountActual')"
              prop="patternRepeatCountActual"
            >
              <el-input v-model="ruleForm.patternRepeatCountActual" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="6">
            <el-form-item
              :label="$t('fabricInpsection.totalDeductionPt')"
            >
              <el-input v-model="totalDeductions" disabled />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="6">
            <el-form-item
              :label="$t('fabricInpsection.unitLengthDeductionPt')"
            >
              <el-input v-model="unitLengthDeductionPt" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :xs="12" :sm="12" :md="6">
            <el-form-item
              :label="$t('fabricInpsection.unitAreaDeductionPt')"
            >
              <el-input v-model="unitAreaDeductionPt" disabled />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>
<script setup>
import { ref, reactive, computed, watch } from "vue";
import { ElMessage } from "element-plus";
import ScanInspection from "@/components/FabricInspection/ScanInspection";
import useFabricInspection from "@/store/modules/fabric_inspection.js";
import { addFabricInspection } from "@/api/lining/fabric_inspection.js";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const { proxy } = getCurrentInstance();
const store = useFabricInspection();
const loading = ref(false);
const ruleFormRef = ref(null);

const inspectionDate = computed(() => {
  return new Date().toLocaleString();
});

 const totalDeductions = computed(() =>
  store.errorsData.length && store.errorsData.reduce((total, item) => total += item.defect, 0)
);

const unitLengthDeductionPt = computed(() =>
  store.errorsData.length &&
  store.rollDetailsData.lengthActual &&
  ((totalDeductions.value / store.rollDetailsData.lengthActual) * 100).toFixed(1)
);

const unitAreaDeductionPt = computed(() =>
  store.errorsData.length &&
  store.rollDetailsData.lengthActual &&
  store.rollDetailsData.widthOriginal
    ? ( (totalDeductions.value * 3600) / (store.rollDetailsData.lengthActual * store.rollDetailsData.widthOriginal)).toFixed(1)
    : 0
);

const setSelectedColor = computed(() => {
  return {
    'is-green': store.selectedValue === 'OK',
    'is-red': store.selectedValue !== 'OK',
  }
})

const ruleForm = reactive({
  id: "",
  wmsFabricArriveEntityId: "",
  roll: "",
  lengthOriginal: "",
  lengthActual: "",
  widthOriginal: "",
  widthActual: "",
  weightOriginal: "",
  weightActual: "",
  lot: "",
  totalDeductionPt: null,
  unitLengthDeductionPt: null,
  unitAreaDeductionPt: null,
  patternRepeatCountOriginal: "",
  patternRepeatCountActual: "",
  wmsFabricInspectionRollDetails: null,
  result: "",
  machineNo: localStorage.getItem("machineNo") || ''
});

const rules = reactive({
  lengthActual: [
    {
      required: true,
      message: t("fabricInpsection.require_fill"),
      trigger: "blur",
    },
  ],
  machineNo: [
    {
      required: true,
      message: t("fabricInpsection.require_select"),
      trigger: "change",
    },
  ],
  widthActual: [
    {
      required: true,
      message: t("fabricInpsection.require_fill"),
      trigger: "blur",
    },
  ],
  weightActual: [
    {
      required: true,
      message: t("fabricInpsection.require_fill"),
      trigger: "blur",
    },
  ],
  patternRepeatCountActual: [
    {
      required: true,
      message: t("fabricInpsection.require_fill"),
      trigger: "blur",
    },
  ],
});

const getCurrentSelected = (value) => {
 const selectedLabel = store.machineLists.find(item => item.id === value).equipmentName;
 store.rollDetailsData.machineNo = selectedLabel; 
}

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      ruleForm.roll = store.rollDetailsData.roll;
      ruleForm.id = store.rollDetailsData.id;
      ruleForm.wmsFabricArriveEntityId = store.rollDetailsData.wmsFabricArriveEntityId;
      ruleForm.lengthOriginal = store.rollDetailsData.lengthOriginal;
      ruleForm.widthOriginal = store.rollDetailsData.widthOriginal;
      ruleForm.weightOriginal = store.rollDetailsData.weightOriginal;
      ruleForm.totalDeductionPt = parseFloat(totalDeductions.value);
      ruleForm.unitLengthDeductionPt = parseFloat(unitLengthDeductionPt.value);
      ruleForm.unitAreaDeductionPt = parseFloat(unitAreaDeductionPt.value);
      ruleForm.lot = store.rollDetailsData.lot;
      ruleForm.result = store.selectedValue;
      ruleForm.patternRepeatCountOriginal = store.rollDetailsData.patternRepeatCountOriginal;
      ruleForm.wmsFabricInspectionRollDetails = store.errorsData;
      addFabricInspection(ruleForm).then((response) => {
        if (response.code == 200) {
          ElMessage({
            type: "success",
            message: t("uploadInfo.success"),
          });
          store.rollDetailsData = {};
          store.errorsData = [];
          store.selectedValue = 'OK'; 
        } else {
          ElMessage({
            type: "error",
            message: t("uploadInfo.error"),
          });
        }
      });
    }
  });
};

const showFabricData = () => {
  store.showPopupRollData = true;
  store.getListFabricInspection();
};

const handleExport = () => {
  if (!store.rollDetailsData.id || store.rollDetailsData.id == null) {
    ElMessage({
      type: "error",
      message: t("fabricInpsection.exportErrorNotExist"),
    });
    return;
  }
  proxy.download(
    "bok/fabricInspection/export",
    { id: store.rollDetailsData.id },
    `fabric_inspection_${store.rollDetailsData.id}_${new Date().getTime()}.xlsx`
  );
};

watch(
  () => store.rollDetailsData,
  () => {
    ruleForm.lengthActual = store.rollDetailsData.lengthActual;
    ruleForm.widthActual = store.rollDetailsData.widthActual;
    ruleForm.weightActual = store.rollDetailsData.weightActual;
    ruleForm.patternRepeatCountActual = store.rollDetailsData.patternRepeatCountActual;
  },
  { immediate: true }
);

watch(() => ruleForm.machineNo, (current) => {
  localStorage.setItem("machineNo", current);
})
</script>
<style lang="scss">
  h3 {
    font-weight: 600;
    color: var(--el-text-color-regular);
    border-bottom: 1px solid var(--el-border-color);
    margin: 0 0 24px;
    padding: 24px 0;
    font-size: 16px;
  }

  
  .fabric__inspection-header {
    display: flex;
    flex-wrap: nowrap;
    gap: 30px;

    @media(max-width: 1279px) {
      flex-direction: column;
    }

    @media(max-width: 767px) {
      gap: 12px;
    }
    .fabric__inspection-actions {
      flex: 1;
    }                                                       
  }
  .fabric__inspection-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: flex-start;

    @media(min-width: 1280px) {
      justify-content: flex-end;
    }
    @media (max-width: 767px) {
      width: 100%;
      .el-button,
      .el-form-item--default {
        width: calc(50% - 6px);
      }
      
      .el-select {
        width: 100%;
      }
    }
    .el-button + .el-button {
      margin-left: 0;
    }

   .el-form-item--default {
    margin-bottom: 0;
   }
}
</style>