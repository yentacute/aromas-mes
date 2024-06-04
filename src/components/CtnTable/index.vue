<script setup>
// /*1. 渲染headerV 2. 渲染数据（一级，二级，多级表头）V 3. 操作按钮处理V
//4. 多选处理V 5.自定义列处理V 6. 自适应宽度处理 7.表头筛选处理  8。分页 类型*/
import {
  ref,
  computed, onMounted,
} from 'vue';
import HeaderTable from './HeaderTable/index.vue';
import Operate from './Operate/index.vue';
import {
  deepClone
} from '@/utils/index'
import {
  ElMessage
} from 'element-plus'
import {useI18n} from "vue-i18n";
const {t} = useI18n()
const props = defineProps({
  //===配置表头
  columnData: {
    type: Array,
    default: () => [],
  },
  //====表格数据
  tableData: {
    type: Array,
    default: [],
  },
  //====表格配置
  tableConfig: {
    type: Array,
    default: [],
  },
  //====最右侧操作
  showOperate: {
    type: Boolean,
    default: false
  },
  operateType: {
    type: Number,
    default: 0
  }, //操作样式类型
  operateList: {
    type: Array,
    default: ['edit', 'del'],
  },
  operateWidth: {
    type: String,
    default: 'auto'
  },
  //====是否多选
  showMultiple: {
    type: Boolean,
    default: true
  },
  //====是否显示序号
  showIndex: {
    type: Boolean,
    default: true
  },
  maxMultipleNum: {
    default: undefined
  },
  //====loading
  loading: {
    type: Boolean,
    default: false
  },
  //表尾合计
  showSummary: {
    type: Boolean,
    default: false
  },
  //不显示合计的字段
  hideSummaryList: {
    type: Array,
    default: () => [],
  },
  //合计列数据
  summaryList: {
    type: Array,
    default: () => [],
  },
  //分页
  pageNum: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 20
  },
  total: 100,
  showPagination: {
    type: Boolean,
    default: true
  },
  //多列
  showMultipleColumn: {
    type: Boolean,
    default: true
  },
  // 表行显示样式
  rowClassRowConditions: {
    type: Function,
    default: (row) => false
  },
  rowClassName: {
    type: String,
    default: ''
  },
  showSearch: {
    type: Boolean,
    default:false,
  },
  // 动态列记忆区分不同表格
  tableKey: {
    type: String,
    default: ''
  },
  // 单元格可编辑
  showEdit: {
    type: Boolean,
    default: false
  },
  maxHeight: {
    type: [String, Number],
    default: 'auto'
  },
  isShowTool: {
    type: Boolean,
    default: true
  },
  // 行数据的 Key
  rowKey: {
    type: String,
    default: ''
  },
});
const emit = defineEmits([
  'editHandClick',
  'delHandClick',
  'addHandClick',
  'handleSelectionChange',
  'getSummaries',
  'sortChange',
  'select',
  //分页
  'update:pageNum',
  'update:pageSize',
  'update:showSearch',
  'handleRowClick',
  'queryTable',
  'handleCurrentChange', //分页
  'tableCurrentChange', //表格单选
  'hanldeCellClick', // 单元格编辑
]);

//---操作事件
function delHandClick($index) {
  console.log('del');
  emit('delHandClick', $index);
}

function editHandClick($index) {
  console.log('edit');
  emit('editHandClick', $index);
}

function addHandClick($index) {
  console.log('add');
  emit('addHandClick', $index);
}

//---多选事件
function select(selection) {
  if (Boolean(props.maxMultipleNum)) {
    if (selection.length > props.maxMultipleNum) {
      console.log('selection', selection)
      let del_row = selection.shift();
      tableRef.value.toggleRowSelection(del_row, false);
      ElMessage({
        type: 'warning',
        message: `最多支持选择${props.maxMultipleNum}个！`
      })
    }
    ;
  }
  let idList = selection.map((item) => item.id);
  idList = idList.filter((item) => item != undefined);
  emit('select', {
    rowList: selection,
    idList: idList,
  });
}

function selectAll(selections) {
  if (Boolean(props.maxMultipleNum)) {
    if (selections.length > props.maxMultipleNum) {
      ElMessage({
        type: 'warning',
        message: `最多支持选择${props.maxMultipleNum}个！`
      })
      selections.length = props.maxMultipleNum;
    }
    ;
  }
  let idList = selections.map((item) => item.id);
  idList = idList.filter((item) => item != undefined);
  emit('select', {
    rowList: selections,
    idList: idList,
  });
}

//---合计
const getSummaries = (param) => {
  const {columns, data} = param
  const sums = []
  let getMyData = []
  if (props.hideSummaryList?.length) {
    columns.forEach((column) => {
      if (!props.hideSummaryList.includes(column.property)) {
        getMyData.push(column)
      } else {
        getMyData.push({})
      }
    })
  } else {
    getMyData = deepClone(columns)
  }
  getMyData.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '本页合计'
      return
    }
    const values = data.map((item) => Number(item[column.property]))
    if (!values.every((value) => Number.isNaN(value))) {
      let num = values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!Number.isNaN(value)) {
          return prev + curr
        } else {
          return prev
        }
      }, 0)
      sums[index] = `${Math.round(num * 100) / 100}`
    } else {
      sums[index] = ''
    }
  })

  return sums
}

// const getSummaries = (param: SummaryMethodProps) => {
//   const { columns } = param;
//   const sums: string[] = [];
//   sums[0] = '合计';
//   // 给每一项配置合计
//   columns.forEach((column, index: number) => {
//     console.log(column);
//     if (index === 0) {
//       sums[index] = '合计';
//       return;
//     }
//     console.log('summaryList', props.summaryList, index);
//     if (Boolean(props.summaryList[index])) {
//       sums[index] = props.summaryList[index];
//     } else {
//       sums[index] = '';
//     }
//   });
//   return sums;
// };
//---排序
function sortChange({
                      column,
                      prop,
                      order,
                    }) {
  emit('sortChange', {
    column,
    prop,
    order,
  });
}

// ---分页
// const currentPageSize = computed(() => {
//   return props.pageSize;
// });
function handleCurrentChange(currentPage) {
  emit('update:pageNum', currentPage);
  emit('handleCurrentChange', currentPage);
}

function handleSizeChange(pageSize) {
  emit('update:pageSize', pageSize);
  emit('handleCurrentChange', props.pageNum);
}

const pageSizes = computed(() => {
  let arr = [];
  if (props.total <= 10) {
    arr = [1, 5, 10];
  } else if (props.total <= 20) {
    arr = [5, 10, 20];
  } else if (props.total <= 50) {
    arr = [10, 20, 30, 40, 50];
  } else if (props.total <= 100) {
    arr = [5, 10, 20, 50, 100];
  } else {
    arr = [10, 50, 100, 150, 200];
  }
  return arr;
});


//-----选择列
const isIndeterminate = computed(() => {
  return (
      checkedKeys.value.length > 0 &&
      checkedKeys.value.length < props.columnData.length
  );
});
const checkedKeys = ref(
    JSON.parse(localStorage.getItem(props.tableKey) || 'null') ||
    props.columnData.map((column) => column.prop)
);
// 全选
const checkAll = computed({
  get: () => {
    return checkedKeys.value.length === props.columnData.length;
  },
  set: (value) => {
    checkedKeys.value = value ? props.columnData.map((column) => column.prop) : [];
  },
});

watch(checkedKeys, (value) => {
  localStorage.setItem(props.tableKey, JSON.stringify(value));
});
const realColumns = computed(() => {
  return props.columnData.filter((column) =>
      checkedKeys.value.includes(column.prop)
  );
});

const tableRef = ref()

const handleRowClick = (row) => {
  emit('handleRowClick', {...row})
  let menu = document.querySelector("#popover");
  menu.style.display = "none";
}
const clearSelection = () => {
  return tableRef.value.clearSelection()
}
defineExpose({
  tableRef,
  clearSelection

})

//单选
function tableCurrentChange(row) {
  emit('tableCurrentChange', row)
}

/**
 * @desc 给单行设置颜色
 */
function changRowStyle({row}) {
  if (props.rowClassRowConditions(row)) {
    return props.rowClassName
  }
}

function queryTable() {
  emit('queryTable');
}

function toggleSearch() {
  emit("update:showSearch", !props.showSearch);
}

const editing = computed(() => {
  return index => {
    return props.tableData[index].isEdit && props.showEdit;
  };
});
const focusProp = ref('')
const inputRef = ref()
const hanldeCellClick = (row, column, cell, event) => {
  row.isEdit = true
  focusProp.value = column.property
  nextTick(() => {
    inputRef.value.focus()
  })
}
const blurInput = (row) => {
  row.isEdit = false
  emit('hanldeCellClick',row,props.tableData);
}
const color = ref()
const currentyRow = ref()
const tableRowStyle = ({ row }) => {
  if(row.id === currentyRow.value ){
    return { backgroundColor: color.value + '!important' }
  }
}
const getRowKey = (row) => {
  return row[props.rowKey]
}
const rowContextmenu = (row, column, event) => {
  event.preventDefault();
  let menu = document.querySelector("#popover");
  // 根据事件对象中鼠标点击的位置，进行定位
  menu.style.left = event.clientX - 258 + "px";
  menu.style.top = event.clientY - 75 + "px";
  // 改变自定义菜单的隐藏与显示
  menu.style.display = "block";
  menu.style.zIndex = 1000;
  currentyRow.value = row.id
}
// onMounted(async() =>{
//   await nextTick(() => {
//   setSortCloumn()
// })
// })
// watch(() => props.columnData, (newVal) => {
//   dragList.value = newVal
// })
const dragColumn = ref(props.columnData)
const dragTableList = ref(props.tableData)
function setSortCloumn() {//列拖拽
  const wrapperTr  = document.querySelector('.el-table__header-wrapper tr');
  Sortable.create(wrapperTr , {
    animation: 180,
    delay: 0,
    onEnd: (evt) => {
      console.log(evt,22225)
      const oldItem = dragList.value[evt.oldIndex];
      dragList.value.splice(evt.oldIndex, 1);
      dragList.value.splice(evt.newIndex, 0, oldItem);
      console.log(dragList.value);
    }
  })
}
</script>

<template>

  <!-- 选择列 -->
  <div class="search">
<!--    <div class="demo-color-block mr10">-->
<!--      <span class="demonstration">With default value</span>-->
<!--      <el-color-picker v-model="color1" />-->
<!--    </div>-->
    <div class="chose-column" v-if="showMultipleColumn">
      <!--      <el-dropdown trigger="click" :hide-on-click="false">-->
      <!--        <el-button>选择列</el-button>-->
      <!--        <template #dropdown>-->
      <!--          <el-dropdown-menu class="dropdown">-->
      <!--            <el-dropdown-item>-->
      <!--              <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
      <!--            </el-dropdown-item>-->
      <!--            <el-dropdown-item v-for="(item, index) in pageData.columnList" :key="index">-->
      <!--              <el-checkbox v-model="item.initShow" @change="handleRowClick({ ...item, index })">{{-->
      <!--                  item.label-->
      <!--                }}</el-checkbox>-->
      <!--            </el-dropdown-item>-->
      <!--          </el-dropdown-menu>-->
      <!--        </template>-->
      <!--      </el-dropdown>-->
      <el-popover placement="bottom" trigger="click" width="10%">
        <template #reference>
          <div>
            <el-tooltip
                class="box-item" effect="dark" :content="t('display_hide_columns')" placement="top"
            >
              <el-button circle icon="Menu"></el-button>
            </el-tooltip>
          </div>
        </template>
        <template #default>
          <div class="check">
            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate">
              {{t('check_all')}}
            </el-checkbox>
            <el-checkbox-group v-model="checkedKeys">
              <el-checkbox
                  class="checkbox"
                  v-for="column in columnData"
                  :key="column.prop"
                  :label="column.prop"
                  :value="column.prop"
              >
                {{ column.label }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </template>
      </el-popover>
    </div>

    <div v-if="isShowTool">
      <right-toolbar @toggleSearch="toggleSearch" :show-search="showSearch" @queryTable="queryTable" ></right-toolbar>
    </div>

  </div>

  <el-table :row-class-name="changRowStyle" @current-change="tableCurrentChange" :max-height="maxHeight"
            :header-cell-stdelHandClickyle="{ background: '#f0f2f5' }" :showSummary="showSummary" :row-key="getRowKey"
            :show-overflow-tooltip="true" @cell-dblclick="hanldeCellClick" scrollbar-always-on
            sum-text="合计" :border="true" v-loading="loading" v-bind="{ ...tableConfig }" :data="tableData" stripe
            style="width: 100%" @select="select" @select-all="selectAll" :summary-method="getSummaries"
            @row-click="handleRowClick" ref="tableRef" @sort-change="sortChange">
    <!-- 多选 -->
    <el-table-column v-if="showMultiple" type="selection" width="55"/>
    <el-table-column v-if="showIndex" type="index" :label="t('serial_number')" width="115" align="center" :fixed="showIndex"/>
    <HeaderTable :columnData="realColumns">
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
               <el-input v-model= "obj.data.row[obj.data.prop]" ref="inputRef"  @blur="blurInput(obj.data.row)"/>
          </span>
          <span v-else>{{ obj.data.row[obj.data.prop] }}</span>
        </slot>
      </template>
    </HeaderTable>
    <Operate :loading="loading" :operateWidth="operateWidth" v-if="showOperate" @addHandClick="addHandClick"
             @delHandClick="delHandClick" @editHandClick="editHandClick" :operateType="operateType"
             :operateList="operateList"
             fixed="right">
      <!-- 添加更多操作 -->
      <template #more="{ data }">
        <!-- {{ data }} -->
        <slot name="moreOperate" :data="{ $index: data }"></slot>
      </template>
    </Operate>
  </el-table>
  <div class="pagination" v-show="showPagination">
    <!-- hide-on-single-page 只有一页时隐藏 -->
    <el-pagination :current-page="pageNum" :page-size="pageSize" :page-sizes="pageSizes" :hide-on-single-page="false"
                   :small="false" :disabled="loading" layout="total, sizes, prev, pager, next, jumper" :total="total"
                   @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
  </div>
  <div class="popover" id="popover">
    <el-card style="max-width: 580px">
      <el-input v-model="color"
                :placeholder="t('set') + t('colorLibrary.16Color')">
        <template #append>
          <el-color-picker size="small" v-model="color"/>
        </template>
      </el-input>
    </el-card>
  </div>
</template>

<style scoped>
.pagination {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 30px;
}

.chose-column {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
  margin-right: 15px;
  /* //max-height: 300px; */
  /* overflow-y: scroll; */
}

.check {
  max-height: 300px;
  overflow-y: auto;
  line-height: 40px;
}

.checkbox {
  display: block;
}

.search {
  display: flex;
  justify-content: flex-end;
}
.popover{
  display: none;
  position: absolute;
}
</style>
<!--

  使用
      <Demo
      :showMultiple="false"
      :showOperate="true"
      :operateType="0"
      :tableData="[
        {
          vvv: 1,
          fff: 1,
          ddd: 12,
        },
      ]"
      :columnData="[
        {
          prop: 'vvv',
          label: 'a',
          children: [
            {
              prop: 'fff',
              label: 'aa',
            },
          ],
        },
        {
          prop: 'ddd',
          label: 'b',
        },
      ]"
    >
     <! 动态表头 prop+"Header"
      <template #aHeader="{ data }"> {{ data.prop }} </template>
       动态表列 prop+"Default"
      <template #fffDefault="{ data }"> {{ data.value }} </template>
    </Demo>
 -->
