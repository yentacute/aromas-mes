<script setup lang='ts'>
interface Props {
  showUp:boolean
}

withDefaults(defineProps<Props>(), {
  showUp:true
});
</script>

<template>
  <div class="layout-up-down pad-base">
    <div class="up" v-if="showUp">
      <slot name="up">

      </slot>
    </div>
    <div class="down">
      <slot name="down"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout-up-down {
  display: flex;
  flex-direction: column;

  .up {
    background: #f7f8fa;
    padding: 16px;
  }
  .down {
    margin-top: 20px;
  }
}
</style>
