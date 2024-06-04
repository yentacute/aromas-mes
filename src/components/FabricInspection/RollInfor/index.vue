<template>
  <el-dialog
    class="roll__information"
    v-model="store.showPopupRollData"
    xs:fullscreen
  >
    <SearchBarCode/>
    <el-table
      :data="store.rollLists"
      ref="singleTableRef"
      @current-change="handleCurrentChange"
      highlight-current-row
      border
      show-overflow-tooltip
      v-loading="store.loading"
      stripe
    >
      <el-table-column :label="$t('fabricInpsection.bill_id')" align="center" prop="billId" width="120"/>
      <el-table-column label="Qrcode"  align="center" prop="qrcode" />
      <el-table-column :label="$t('load.container_load_num')" align="center" prop="containerLoadNum" />
      <el-table-column :label="$t('load.container_load_date')" align="center" prop="containerLoadDate" :formatter="formatContainerLoadDate" />
      <el-table-column :label="$t('load.purchase_order_num')" align="center" prop="purchaseOrderNum" />
      <el-table-column :label="$t('load.part_num')" align="center" prop="itemCode" />
      <el-table-column :label="$t('load.colour')" align="center" prop="itemColor" />
      <el-table-column :label="$t('load.size')"  align="center" prop="width" />
      <el-table-column :label="$t('load.cylinder_num')"  align="center" prop="lot" />
      <el-table-column :label="$t('load.match_num')"  align="center" prop="roll" />
      <el-table-column :label="$t('fabricInpsection.purchasing_unit')"  align="center" prop="purchasingUnit" />
      <el-table-column :label="$t('load.production_plant_area')"  align="center" prop="productionPlantArea" />
      <el-table-column :label="$t('fabricInpsection.supplier')"  align="center" prop="businessEntityName" />
      <el-table-column :label="$t('fabricInpsection.gross_weight')"  align="center" prop="grossWeight" />
      <el-table-column :label="$t('load.season')"  align="center" prop="season" />
    </el-table>
      <div class="pagination">
      <el-pagination
        v-model:current-page="store.paginationData.pageNum"
        v-model:page-size="store.paginationData.pageSize"
        :disabled="disabled"
        layout="prev, pager, next, jumper"
        :total="store.totalItems"
        @current-change="handleCurrentPagiChange"
      />  
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="store.showPopupRollData = false" class="btn-cancel">
          {{$t("cancel")}}
        </el-button>
        <el-button type="primary" class="btn-confirm" @click="handleSubmit">
          {{ $t("submit")}}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { reactive, ref, watch } from "vue";
import { ElMessage } from 'element-plus'
import SearchBarCode from "@/components/FabricInspection/SearchBarCode";
import useSettingsStore from "@/store/modules/settings.js";
import useFabricInspection from "@/store/modules/fabric_inspection.js";
import { getFabricInspection } from "@/api/lining/fabric_inspection.js";
import { useI18n } from "vue-i18n";
const store = useFabricInspection();
const singleTableRef = ref(null);
const currentVal = ref();
const disabled = ref(false)
const totalItems = ref(null);
const { t } = useI18n();

const formatContainerLoadDate = (row) => {
  const date = new Date(row.containerLoadDate);
  return date.toLocaleString();
}

watch(
  () => store.paginationData.pageNum,
  () => {
    store.getListFabricInspection();
  }
)


const setCurrent = (row) => {
  singleTableRef.value.setCurrentRow(row);
};

const handleCurrentChange = (val) => {
  currentVal.value = val;
};

const handleCurrentPagiChange = (val) => {
  store.paginationData.pageNum = val;
}

const getFabricWithId = async(id) => {
  const response = await getFabricInspection(id);
  const { data } = response;
  data.lengthActual = data.lengthActual || data.lengthOriginal;
  data.widthActual = data.widthActual || data.widthOriginal;
  data.weightActual = data.weightActual || data.weightOriginal;
  data.patternRepeatCountActual = data.patternRepeatCountActual || data.patternRepeatCountOriginal;

  store.rollDetailsData = data;
  if (store.rollDetailsData.wmsFabricInspectionRollDetails !== null) {
    const filterDisable = store.rollDetailsData.wmsFabricInspectionRollDetails.filter( data => data.disable != 1 );
    store.errorsData = filterDisable;
  } else {
    store.errorsData = [];
  }
  if (data.result !== null && typeof (data.result) !== 'undefined') {
    store.selectedValue = data.result;
  } else {
   store.selectedValue = 'OK'; 
  }
}

const resetSearch = () => {
  store.listFabricBody = {
    "qrcode": "",
    "lot": "",
    "roll": "",
    "itemColor": "",
    "itemCode": ""
  };
}

const handleSubmit = () => {
  if (!currentVal.value) {
    ElMessage({
      type: "error",
      message: t('fabricInpsection.notSelectDataError')
    });
    return;
  }

  if (currentVal.value.id == null) {
    store.errorsData = [];
    store.rollDetailsData = currentVal.value;
  } else {
    getFabricWithId(currentVal.value.id);
  }

  currentVal.value = null;
  store.barCode = null;
  store.showPopupRollData = false;
  store.scanValue = '';
  resetSearch();
  setCurrent();
};

</script>
<style lang="scss">
  .pagination {
    margin-top: 12px;
    display: flex;
    justify-content: flex-end;
    .el-pagination__classifier {
      margin-left: 0;
    }
    .el-pagination {
      flex-wrap: wrap;
      gap: 8px;
      @media (max-width: 767px) {
        justify-content: center;
      }
    }
    .el-pagination__jump  {
      gap: 10px;
      margin-left: 0;
    }
    .el-pagination__goto {
      margin-right: 0;
    }
  }
  .search-data {
    margin-bottom: 8px;
  }
  .el-table__row:hover{
    cursor: pointer;
  }
  .roll__information {
    width: 80%;
    overflow: auto;
    @media (max-width: 768px) {
      &:not(.is-fullscreen) {
        width: 100%;
        position: fixed;
        margin-top: 0 !important;
        height: 100%;
      }
    }
    .el-dialog__body {
      padding-bottom: 12px;
    }
  }
  
</style>