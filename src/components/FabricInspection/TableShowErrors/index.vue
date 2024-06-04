<template>
  <div class="fabric__inspection-error">
    <el-table :data="filteredErrorsData" border max-height="350"
      stripe
    >
      <el-table-column
        :label="$t('serial_number')"
        align="center"
        type="index"
        width="120"
        fixed
      />
      <el-table-column
        :label="$t('fabricInpsection.position')"
        align="center"
        prop="position"
        width="120"
        sortable
      />
      <el-table-column :label="$t('fabricInpsection.reason')" align="center" prop="reason" />
      <el-table-column :label="$t('fabricInpsection.deduction')" align="center" prop="defect" />
      <el-table-column :label="$t('fabricInpsection.action')" align="center">
        <template #default="scope">
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="$t('fabricInpsection.insert')"
            placement="top-start"
            v-if="scope.row.position !== 1"
          >
            <el-button
              link
              type="primary"
              icon="Plus"
              @click="insertBefore(scope.$index, scope.row)"
            >
            </el-button>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="$t('delete')"
            placement="top-start"
          >
            <el-button
              link
              type="warning"
              icon="Delete"
              @click="deleteItem(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-button
      class="fabric__inspection--add-error"
      type="primary"
      style="width: 100%"
      :class="{ inActive: store.isRollDetailsDataEmpty }"
      plain
      @click="showErrorPopup"
    >
      {{ $t("add") }}
    </el-button>
    <ErrorPopupTable />
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import useFabricInspection from "@/store/modules/fabric_inspection.js";
import ErrorPopupTable from "@/components/FabricInspection/ErrorInspection";
const store = useFabricInspection();
const showErrorPopup = () => {
  store.showPopupPoints = true;
};

const filteredErrorsData = computed(() => {
  if (store.errorsData !== null) {
    return store.errorsData.filter((data) => data.disable !== 1);
  }
  return (store.errorsData = []);
});

const deleteItem = (index, row) => {
  if (row.disable == 0) {
    row.disable = 1;
  }
  if (!row.disable) {
    store.errorsData.splice(index, 1);
  }
};

const insertBefore = (index, row) => {
  store.positionNumber = row.position - 1;
  store.showPopupPoints = true;
};
</script>
<style lang="scss">
.fabric__inspection-error .el-button {
  border-radius: 0;
}
.fabric__inspection-choose-error {
  @media (max-width: 767px) {
    width: 100%;
  }

  .el-table {
    max-height: 65vh;
    overflow: auto;
  }
  .el-table__row.hover-row td,
  .el-table__body tr.hover-row > td.el-table__cell {
    --el-table-row-hover-bg-color: transparent;
    background-color: var(--el-table-row-hover-bg-color);
  }
  .error-name {
    pointer-events: none;
  }
  td {
    user-select: none;
    &:hover {
      cursor: pointer;
      background: #bebaba !important;
    }
  }
}
</style>