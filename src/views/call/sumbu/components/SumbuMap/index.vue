<script setup>

import useData from "./hook/useData.js";
import useUpdate from "./hook/useUpdate.js";
import {computed, onMounted, reactive} from "vue";
import {useI18n} from "vue-i18n";
import G6 from "@antv/g6";
import {ElMessage} from "element-plus";
import useSearch from "./hook/useSearch.js";

defineOptions({
  name: 'SumbuMap'
})
const {
  formData,
  locationList,
  loadData,
  searchFormRef,
  resetData,
  getRaabFabricList,
  fabricList,
  getRaabFabricColorList,
  fabricColorList,
  fabricLotList,
  getRaabFabricLotList,
  searchFormRules,
  reloadData
} = useSearch()
const {
  pageData,
  leftAcrossNode,
  leftVerticalNode,
  leftUpNode,
  leftDownNode,
  reightAcrossNode,
  rightUpNode,
  rightDownNodeA,
  rightDownNodeB,
  rightDownNodeC,
  rightDownNodeD,
  rightDownNodeE,
  combosA,
  combosB,
} = useData()
const props = defineProps({
  type: {
    type: Number,
    required: true,
    default:3
  },
})
let graph
let container
const barList = [
  {
    label: '空',
    color: 'gray'
  },
  {
    label: '满',
    color: 'green'
  },
  {
    label: '正在进',
    color: 'orange'
  },
  {
    label: '正在出',
    color: 'purple'
  },
  {
    label: '禁用',
    color: 'black'
  },
]
const {t} = useI18n()
const currentItem = reactive({
  locationCode: '',
  status: 0,
  containerCode: ''
})
const showTip = ref(false)
const popper = ref()
const statusType = new Map([
  [0, '空'],
  [1, '满'],
  [2, '正在进'],
  [3, '正在出'],
  [4, '禁用']
])
const initData = () => {
  const handler = pageType[props.type]
  return handler()
}
const pageType = {
  '1': () => {
    pageData.nodes = [
      ...reightAcrossNode,
      ...rightUpNode,
      ...rightDownNodeA,
      ...rightDownNodeB,
      ...rightDownNodeC,
      ...rightDownNodeD,
      ...rightDownNodeE
    ]
    pageData.combos = combosA
  },
  '2': () => {
    pageData.nodes = [
      ...leftAcrossNode,
      ...leftVerticalNode,
      ...leftUpNode,
      ...leftDownNode,
    ]
    pageData.combos = combosB
  }
}
// 刷新
const resetForm = () => {
  currentItem.locationCode = ''
  currentItem.status = 0
  currentItem.containerCode = ''
  reloadData()
  graph.getNodes().forEach(item => graph.setItemState(item, 'selected', false))
  graph.render();
};
const emit = defineEmits([
  "confirmCallback",
]);

const createGraph = (data) => {
  // container 动态获取当前屏幕宽高
  const width = 880;
  const height = 500;
  // new 实例对象，设置画布宽高以及挂载点
  graph = new G6.Graph({
    container: 'container',
    width, // Number，
    height, // Number，
    fitView: true, // 是否将图适配到画布大小
    // ...其他配置项,
    modes: {
      default: [
        'drag-canvas',
        'zoom-canvas',
        {
          type: 'click-select',
          selectCombo: false,
        },
      ] // 允许拖拽画布、放缩画布
    },
    layout: {
      data: pageData,
      linkDistance: 50
    },
    defaultNode: { // 节点样式修改
      type: 'rect', // 设置节点为矩形
      size: [25, 10], // 节点大小
      // labelCfg: { // 修改节点label样式
      //   style: {
      //     fill: '#5B8FF9', // 字体颜色
      //     fontSize: 14 // 字体大小
      //   }
      // },
      style: {
        fill: 'gray',
        stroke: 'transparent',
      },
    },
    groupByTypes: false,
    defaultCombo: {
      type: 'rect',
      // size: [70, 100],
      // ... 其他属性
      labelCfg: {
        position: 'top',
        offset: [10, 10, 10, 10],
        style: {
          fill: '#666',
        },
      },
    },
  });

  // 配置数据源，渲染
  graph.data(data);
  graph.render();
  graph.getMaxZoom(1)

  // 点击节点事件
  graph.on('node:click', (e) => {
    const model = e.item.getModel();
    currentItem.locationCode = model.id
    currentItem.clientX = e.clientX
    currentItem.clientY = e.clientY
    showTip.value = true
    graph.setItemState(e.item, 'selected', true);
  });
  // 鼠标点击画布空白事件
  graph.on('canvas:mousedown', (ev) => {
    showTip.value = false
  });
  // 缩放事件
  graph.on('wheel', (ev) => {
    showTip.value = false
  });
}

const loadDataCb = async () => {
  if (!searchFormRef.value) return;
  await searchFormRef.value.validate();
  await loadData();
  const locationSet = new Set(locationList.value.map(item => item.locationId))
  pageData.nodes.forEach((item) => {
    if (locationSet.has(item.id)) {
      graph.setItemState(graph.findById(item.id), 'selected', true)
    }
  })
};
onMounted(() => {
  container = document.getElementById('container');
  popper.value = document.getElementsByClassName('el-popover popperClass')[0]
  initData()
  createGraph(pageData);
})

// 选择工作站
const handleSelect = () => {
  if (currentItem.locationCode === '') {
    ElMessage({
      type: 'error',
      message: '请选择工作站'
    })
    return
  }
  emit('confirmCallback', currentItem)
  resetForm()
}

defineExpose({
  resetForm
})
</script>
<template>
  <el-form :model="formData" ref="searchFormRef" :rules="searchFormRules" :inline="true" labelSuffix=":">
    <el-row :gutter="20">
      <el-col :lg="6" :sm="12" :md="12" :xs="24">
        <el-form-item label="料号" prop="fabricId">
          <el-select v-model="formData.fabricId" clearable
                     filterable
                     @change="() => getRaabFabricColorList()"
                     :remote-method="getRaabFabricList"
                     remote
          >
            <el-option
                v-for="item in fabricList"
                :key="item.fabricId"
                :label="item.fabricName"
                :value="item.fabricId"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :lg="6" :sm="12" :md="12" :xs="24">
        <el-form-item label="颜色" prop="colorId">
          <el-select v-model="formData.colorId"
                     filterable
                     @change="() => getRaabFabricLotList()"
                     :remote-method="getRaabFabricColorList"
                     remote
                     clearable
          >
            <el-option
                v-for="item in fabricColorList"
                :key="item.colorId"
                :label="item.colorName"
                :value="item.colorId"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :lg="6" :sm="12" :md="12" :xs="24">
        <el-form-item label="缸号" prop="lot">
          <el-select v-model="formData.lot" clearable
                     filterable
                     :remote-method="getRaabFabricLotList"
                     remote
          >
            <el-option
                v-for="item in fabricLotList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :lg="6" :sm="12" :md="12" :xs="24">
        <el-button type="primary" class="btn-confirm" @click="loadDataCb">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-col>
    </el-row>
  </el-form>
  <el-row :gutter="20" justify="end">
    <el-col :lg="5" :sm="12" :md="12" :xs="24">
      <el-tag class="mt5">已选：{{ currentItem.locationCode }}</el-tag>
    </el-col>
    <el-col :lg="3" :sm="12" :md="12" :xs="24">
      <el-button class="mb5" type="primary" @click="handleSelect">确定</el-button>
    </el-col>
  </el-row>
  <div style="position: relative">
    <div id="container">
    </div>
    <div id="bar">
      <div v-for="item in barList">
        <div class="item">
          <div :class="item.color" style=""></div>
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
#container {
  border: 1px solid #676a6c;
}

#bar {
  position: absolute;
  top: 2%;
  right: 1%;
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  font-weight: 800;
  font-size: 14px;
  color: #545454;
  background-color: rgba(226, 226, 226, 0.9);
  padding: 10px 8px;
  width: 100px;
  cursor: pointer;

  .item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  .item > div {
    width: 25px;
    height: 18px;
    border-radius: 5px;
    margin-right: 10px;
  }

  .gray {
    background-color: #676a6c;
  }

  .green {

    background-color: #4eaf51;
  }

  .orange {
    background-color: #fe5824;
  }

  .purple {
    background-color: #663bb8;
  }

  .black {
    background-color: #000000;
  }
}

#tip {
  width: 180px;
  height: 95px;
  display: flex;
  font-size: 14px;
  flex-direction: column;
  justify-content: space-between;
  //align-items: center;
  .btn {
    display: flex;
    justify-content: space-between;
  }
}

.confirmButtonClass {
  --el-button-bg-color: red;
}
</style>
