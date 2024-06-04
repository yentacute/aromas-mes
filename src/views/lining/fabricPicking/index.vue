<template>
  <keep-alive>
    <component :is="Component"  class="main-content" @toggleClick="toggleClick" :id="currentItem.id" :isDetails="currentItem.type"/>
  </keep-alive>
</template>

<script setup>
import AddFabricPicking from "@/views/lining/fabricPicking/components/AddFabricPicking/index.vue";
import FabricPickingHome from "@/views/lining/fabricPicking/components/FabricPickingHome/index.vue";
import {ref} from "vue";

defineOptions({
  name: "FabricPicking", // 领料单
  components:{
    AddFabricPicking,
    FabricPickingHome,
  }
});
const Component = ref('FabricPickingHome');
const currentItem = ref({});
const toggleClick = async({name,id,type}) => {
  Component.value = name
  currentItem.value.id = id
  currentItem.value.type = type
}
</script>
