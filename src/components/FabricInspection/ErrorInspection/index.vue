<template>
  <el-dialog
    :title="props.title"
    v-model="store.showPopupPoints"
    @close="handleClose"
    width="80%"
    destroy-on-close
    class="fabric__inspection-choose-error"
  >
    <div class="fabric__inspection-position-error">
      <h4>{{ $t("fabricInpsection.position") }}:</h4>
      <el-input-number
        class="position-input"
        v-model="store.positionNumber"
        :min="1"
      />
    </div>
    <el-table
      :data="errorDataTable.errorsData"
      @cell-click="getCellValue" 
      @cell-dblclick ="showQualityInput"
      :row-class-name="getRowClassName"
      ref="tableRef"
      border
      stripe
    >
      <el-table-column
        prop="error_type"
        class-name="error-name"
        fixed
      />
      <el-table-column prop="name" class-name="error-name" />
      <el-table-column
        label="0.1~3英吋各扣1點"
        align="center"
        prop="bellow_three"
        class-name="minus-1"
      >
      </el-table-column>
      <el-table-column
        label="3.1~6英吋各扣2點"
        align="center"
        prop="bellow_six"
        class-name="minus-2"
      >
      </el-table-column>
      <el-table-column
        label="6.1~9.0英吋各扣3點"
        align="center"
        prop="bellow_nine"
        class-name="minus-3"
      >
      </el-table-column>
      <el-table-column
        label="9.0英寸以上各扣4點"
        align="center"
        prop="upper_nine"
        class-name="minus-4"
      >
      </el-table-column>
    </el-table>
    <template #footer>
      <div class="dialog-footer">
        <el-button class="btn-cancel" @click="store.showPopupPoints = false">{{
          $t("cancel")
        }}</el-button>
        <el-button type="primary" @click="submitData" class="btn-confirm">
          {{ $t("vxe.button.confirm") }}
        </el-button>
      </div>
    </template>
     <el-dialog
      v-model="dbClick"
      width="400"
      align-center
      :title="$t('fabricInpsection.editQuantity')"
    >
    <div class="quantity-modify">
      <el-input-number size="large" :min="0" v-model="inputQuantity" @change="inputQuantityChange" />
    </div>
     <template #footer>
      <div class="dialog-footer">
        <el-button @click="dbClick = false" class="btn-cancel">{{
          $t("cancel")
        }}</el-button>
        <el-button class="btn-confirm" type="primary" @click="saveQuantity">
          {{ $t("save") }}
        </el-button>
      </div>
    </template>
    </el-dialog>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, watch, defineProps, onMounted } from "vue";
import useFabricInspection from "@/store/modules/fabric_inspection.js";
import errorDataTable from "@/views/lining/quality/errors/errors.json";
import useSettingsStore from "@/store/modules/settings.js";
const props = defineProps(["title", "elTableRef"]);

const store = useFabricInspection();

const elTableRef = ref(null);

const tableRef = ref(null);
const activeClass = ref(false);
const inputQuantity = ref(0);
const currentCell = ref(null);
let currentId = 1;
const dbClick = ref(false);
const inputQuantityChange = (value) => {
  inputQuantity.value = value;
}


const showQualityInput = (row, column, cell) => {
  dbClick.value = true;
  currentCell.value = cell;
}

const saveQuantity = () => {
  dbClick.value = false;
  currentCell.value.textContent = inputQuantity.value;
}

const resetCellValues = () => {
  tableRef.value.clearSelection();
};
const handleClose = () => {
  store.showPopupPoints = false;
  resetCellValues();
};
const getCellValue = (row, column, cell, event) => {
  dbClick.value = false;
  if (cell) {
    let cellValue = cell ? parseInt(cell.textContent) : 0;
    const plusCellValue = ++cellValue;
    inputQuantity.value = plusCellValue;
    cell.textContent = plusCellValue;
  }
};
const submitData = () => {
  const rows = document.querySelectorAll('[class*="row-data-"]');
  for (let i = 0; i < rows.length; i++) {
    let totalPoints = 0;
    const tds = rows[i].querySelectorAll('[class*="minus-"]');
    tds.forEach((td) => {
      let tdValue = parseInt(td.innerText);
      if (tdValue > 0) {
        if (td.classList.contains("minus-1")) {
          tdValue = tdValue * 1;
        } else if (td.classList.contains("minus-2")) {
          tdValue = tdValue * 2;
        } else if (td.classList.contains("minus-3")) {
          tdValue = tdValue * 3;
        } else {
          tdValue = tdValue * 4;
        }
      }
      totalPoints += tdValue;
    });
    if (totalPoints > 0) {
      const className = Array.from(rows[i].classList).find((cls) =>
        cls.startsWith("row-data-")
      );
      const errorType = className.split("-");
      const duplicateIndex = store.errorsData.findIndex((item) => {
        return (
          item.position === store.positionNumber && item.reason === errorType[1]
        );
      });

      const reasonData = `${errorType[2]} (${errorType[3]} ${errorType[4]})`

      if (duplicateIndex !== -1) {
        store.errorsData[duplicateIndex].defect = totalPoints;
      } else {
        store.errorsData.push({
          defect: totalPoints,
          position: store.positionNumber,
          reason: reasonData,
        });
      }
      store.showPopupPoints = false;
    }
  }
  resetCellValues();
};

const getRowClassName = ({ row }) => {
  const errorType = row.error_type;
  const errorName = row.name.replace(' ', '-');
  return `row-data-${errorType}-${errorName}`;
};

// Watch for changes in store.errorsData
watch(() => store.errorsData, (newValue, oldValue) => {
  if(newValue.length > 0) {
    const lastItem = newValue[newValue.length - 1].position;
    store.positionNumber = lastItem + 1;
  }
}, { deep: true });
</script>
<style lang="scss">
.fabric__inspection-position-error {
  margin-bottom: 12px;
  display: flex;
  column-gap: 12px;
  height: 36px;
  align-items: center;
  .position-input {
    --el-border-radius-base: 0;
    .el-input-number__increase,
    .el-input-number__decrease {
      &:hover ~ .el-input {
        .el-input__wrapper {
          box-shadow: 0 0 1px;
        }
      }
    }
  }
}
.quantity-modify {
  text-align: center;
}
</style>