<template>
  <div class="app-container">
    <div class="fabric__inspection">
      <FormSubmit/>
      <TableShowErrors />
      <RollInfo />
    </div>
  </div>
</template>

<script setup name="Container">
  import { Search } from "@element-plus/icons-vue";
  import useSettingsStore from "@/store/modules/settings.js";
  import TableShowErrors from "@/components/FabricInspection/TableShowErrors";
  import FormSubmit from "@/components/FabricInspection/FormSubmit";
  import RollInfo from "@/components/FabricInspection/RollInfor";
  import useFabricInspection from "@/store/modules/fabric_inspection.js";
  import { onMounted, watch } from "vue";
  const store = useFabricInspection();
  store.getMachineData();
  store.getDictList();

</script>
<style lang="scss">
.fabric__inspection {
  &--add-error {
    border-radius: 0;
  }
  &-header {
    row-gap: 24px;
  }
  &-status {
    @media(min-width: 768px) {
      max-width: 150px;
    }
    .el-input__inner,
    svg {
      color: #fff;
    }
  }
  
}
.inActive {
  pointer-events: none;
  opacity: .6;
}

.is-green .el-input__wrapper {
  background-color: var(--el-color-success);
  --el-select-input-focus-border-color: var(--el-color-success);
}
.is-red .el-input__wrapper {
  background-color: var(--el-color-danger);
  --el-select-input-focus-border-color: var(--el-color-danger);
}
</style>