<template>
  <el-form :inline="true" class="search-data">
    <el-form-item>
      <el-input
        v-model="store.listFabricBody.qrcode"
        type="text"
        :placeholder="$t('fabricInpsection.bar_code')"
        clearable
        @keydown.enter.prevent
      />
    </el-form-item>
    <el-form-item>
      <el-input
        v-model="store.listFabricBody.lot"
        type="text"
        :placeholder="$t('load.cylinder_num')"
        clearable
        @keydown.enter.prevent
      />
    </el-form-item>
    <el-form-item>
      <el-input
        v-model="store.listFabricBody.roll"
        type="text"
        :placeholder="$t('load.match_num')"
        clearable
        @keydown.enter.prevent
      />
    </el-form-item>
    <el-form-item>
      <el-input
        v-model="store.listFabricBody.itemColor"
        type="text"
        :placeholder="$t('fabricInpsection.color')"
        clearable
        @keydown.enter.prevent
      />
    </el-form-item>
    <el-form-item>
      <el-input
        v-model="store.listFabricBody.itemCode"
        type="text"
        :placeholder="$t('load.part_num')"
        clearable
        @keydown.enter.prevent
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" icon="Search" @click="store.getListFabricInspection">{{
        $t("search")
      }}</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
  import useFabricInspection from "@/store/modules/fabric_inspection.js";
  import { listFabricInspection } from "@/api/lining/fabric_inspection.js";
  import { reactive, ref } from "vue";

  const store = useFabricInspection();
</script>
<style lang="scss" scoped>
  .el-form--inline .el-form-item {
    margin: 0;
  } 
  .search-data {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 24px;
    .el-form-item {
      @media(max-width: 1279px) {
        width: calc((100% / 2) - 12px);
      }
      @media(max-width: 767px) {
        width: calc((100% / 2) - 6px);
      }
    }
  }
</style>