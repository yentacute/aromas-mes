<script setup>
import useSettingsStore from "@/store/modules/settings.js";
import HeaderTable from './HeaderTable/index.vue'
import {computed, ref} from "vue";
import {useI18n} from "vue-i18n";
const {t} = useI18n()
const props = defineProps({
  modelValue: Boolean,
  title: String,
  width: String,
  columnData: {
    type: Array,
    default: () => [],
  },
  cancelText: {
    type: String,
    default: undefined,
  },
  confirmText: {
    type: String,
    default: undefined,
  },
  showCancel: {
    type: Boolean,
    default: true,
  },
  showConfirm: {
    type: Boolean,
    default: true,
  },
  showLeftFooter: {
    type: Boolean,
    default: true,
  },
})
const loading = ref(false)
const emit = defineEmits(['update:modelValue', 'confirmCallback', 'cancelCallback'])
let value = computed(() => {
  return props.modelValue
})

function closePopup() {
  emit('update:modelValue', false)
  emit('cancelCallback')
  tableData.value = []
}

const editing = computed(() => {
  return index => {
    return tableData.value[index].isEdit
  };
});
const focusProp = ref('')
const inputRef = ref()
const tableData = ref([])
const hanldeCellClick = (row, column, cell, event) => {
  focusProp.value = column.property
  row.isEdit = true
  nextTick(() => {
    inputRef.value.focus()
  })
}
const blurInput = (row) => {
  row.isEdit = false
}
// 初始化表格数据
const initTableData = () => {
  const row = {}
  props.columnData.forEach((item) => {
    if (item.prop) row[item.prop] = ''
  })
  for (let i = 0; i < 100; i++) {
    tableData.value.push({...row, rowKey: i + 1})
  }
}

// 打开弹窗
const openPopup = () => {
  initTableData()
}
const confirmCallback = () => {
  loading.value = true
  emit('update:modelValue', false)
  emit('confirmCallback', tableData.value);
  tableData.value = []
  loading.value = false
}
</script>

<template>
  <div>
    <el-dialog destroy-on-close @close="closePopup" @open="openPopup" v-model="value" :title="props.title"
               :width="width" align-center
               draggable :close-on-click-modal="false">
      <el-row class="mb10">
        <el-button @click="initTableData"><el-icon><Plus /></el-icon>&nbsp;100&nbsp;{{ t('item') }}</el-button>
      </el-row>
      <el-row>
        <div class="table">
          <el-table :data="tableData" :border="true" @cell-dblclick="hanldeCellClick" max-height="500">
            <el-table-column type="index" :label="t('serial_number')" width="55" align="center" fixed="left"/>
            <HeaderTable :columnData="columnData">
              <!-- 操作 -->
              <!-- 动态表头 插槽名称：prop字段+'Header'  最多支持二级-->
              <template #propHeader="data">
                <slot :name="`${data.data?.prop}Header`" :data="data.data">
                  {{ data.data.label }}
                </slot>
              </template>
              <!-- 动态表列 插槽名称：prop字段+'Default' 最多支持二级-->
              <template #propDefault="obj">
                <slot :name="`${obj.data.prop}Default`" :data="obj.data">
                  <span v-if="editing(obj.data.$index) && obj.data.prop === focusProp">
                     <el-input type="text" v-model="obj.data.row[obj.data.prop]" ref="inputRef"
                               @blur="blurInput(obj.data.row)"/>
                  </span>
                </slot>
              </template>
            </HeaderTable>
          </el-table>
        </div>
      </el-row>
      <template #footer>
        <div class="h-box justify-between">
          <div class="h-box justify-between w-100">
            <div>
                <span class="dialog-footer">
                   <el-button v-show="showCancel" @click="closePopup" class="btn-cancel">{{ props.cancelText || t('cancel') }}</el-button>
                   <el-button v-show="showConfirm" :disabled="loading" class="btn-confirm"
                        v-loading="loading" type="primary"
                        @click="confirmCallback">
                      {{ props.confirmText || t('confirm') }}
                   </el-button>
                </span>
            </div>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.table {
  width: 100%;
  height: 50%;
  overflow-y: auto;
}
</style>
