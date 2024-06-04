<script setup>
import G6 from '@antv/g6';
import {onMounted, reactive} from "vue";
import useData from "./hook/useData.js";
import useUpdate from "./hook/useUpdate.js";
import {agvTask} from "@/api/sumbu/scheduling.js";
import {ElMessage} from "element-plus";
import {useI18n} from "vue-i18n";

defineOptions({
  name: 'Prenatal'
})
const {
  pageData,
  leftAcrossNode,
  leftVerticalNode,
  leftUpNode,
  leftDownNode,
  reightAcrossNode,
  // rightUpNode,
  // rightDownNodeA,
  // rightDownNodeB,
  // rightDownNodeC,
  // rightDownNodeD,
  // rightDownNodeE
} = useData()
const {
  updateFormData,
  updateFormRef,
  updateFormRules,
  resetForm
} = useUpdate()
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
const socketInfo = reactive({
  url: "ws://192.168.1.5:8082/dev-api/websocket/message",
  message: "",
  text_content: ""
})
const {t} = useI18n()
const socket = ref()
// const queryParams = reactive({
//   start: '',
//   end: ''
// })
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
  pageData.nodes = [
    ...leftAcrossNode,
    ...leftUpNode,
    ...leftDownNode,
    ...leftVerticalNode,
    ...reightAcrossNode,
    // ...rightUpNode,
    // ...rightDownNodeA,
    // ...rightDownNodeB,
    // ...rightDownNodeC,
    // ...rightDownNodeD,
    // ...rightDownNodeE
  ]
}
// 刷新
const getData = () => {
  // 其他操作
  // 生成画布
  // createGraph(pageData);
  console.log('refresh')
  showTip.value = false
  graph.render();
};

// 重置
// const resetForm = () => {
//   updateFormData.fromLocationCode = ''
//   updateFormData.toLocationCode = ''
// }
const createGraph = (data) => {
  // container 动态获取当前屏幕宽高
  const width = container.scrollWidth || 1000;
  const height = container.scrollHeight || 700;
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
  // graph.zoom(0.5)

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

watch(showTip, (newVal, oldVal) => {
  popper.value.style.display = newVal ? 'block' : 'none'
});
watch(currentItem, (newVal, oldVal) => {
  popper.value.style.left = newVal?.clientX + 'px'
  popper.value.style.top = newVal?.clientY + 'px'
});

// 设置起终点
const handleSet = () => {
  if (updateFormData.fromLocationCode === "") {
    updateFormData.fromLocationCode = currentItem.locationCode
    showTip.value = false
  } else if (updateFormData.toLocationCode === "" && updateFormData.fromLocationCode !== currentItem.locationCode) {
    updateFormData.toLocationCode = currentItem.locationCode
    showTip.value = false
  }
  initData()
}
onMounted(() => {
  container = document.getElementById('container');
  popper.value = document.getElementsByClassName('el-popover popperClass')[0]
  initData()
  createGraph(pageData);
  join()

})

function join() {
  const wsuri = socketInfo.url;
  socket.value = new WebSocket(wsuri);
  // 连接成功
  socket.value.onopen = function (event) {
    socketInfo.text_content = socketInfo.text_content + "已经打开连接!" + "\n";
  };
  // 接收消息
  socket.value.onmessage = function (event) {
    socketInfo.text_content = event.data + "\n";
  };
  // 连接关闭
  socket.value.onclose = function (event) {
    socketInfo.text_content = socketInfo.text_content + "已经关闭连接!" + "\n";
  };
  // 发生错误
  socket.value.onerror = function (event) {
    socketInfo.text_content = socketInfo.text_content + "发生错误!" + "\n";
  };
}

function exit() {
  if (socket.value) {
    socket.value.close();
    socket.value = null;
  }
}

function send() {
  if (socket.value) {
    socket.value.send({
      fromLocationCode: updateFormData.fromLocationCode,
      toLocationCode: updateFormData.fromLocationCode,
      taskType:2,
      warehouseCode:"W001",
      containerCode:"",
    });
  } else {
    alert("未连接到服务器");
  }
}
const handleSubmit = async() => {
  if (!updateFormRef.value) return
  await updateFormRef.value.validate()
  await agvTask(updateFormData)
  ElMessage({
    type: 'success',
    message: t('operate_success')
  })
  resetForm()
  getData()

}
</script>

<template>
  <div class="app-container">

    <el-form :model="updateFormData" ref="updateFormRef" :rules="updateFormRules" :inline="true" labelSuffix=":">
      <el-row :gutter="20">
        <el-col :lg="4" :sm="12" :md="12" :xs="24">
          <el-form-item label="任务类型" prop="taskType">
            <el-input v-model="updateFormData.taskType"/>
          </el-form-item>
        </el-col>
        <el-col :lg="4" :sm="12" :md="12" :xs="24">
          <el-form-item label="仓库编码" prop="warehouseCode">
            <el-input v-model="updateFormData.warehouseCode"/>
          </el-form-item>
        </el-col>
        <el-col :lg="4" :sm="12" :md="12" :xs="24">
          <el-form-item label="容器编码" prop="containerCode">
            <el-input v-model="updateFormData.containerCode"/>
          </el-form-item>
        </el-col>

        <el-col :lg="4" :sm="12" :md="12" :xs="24">
          <el-form-item label="起始点位" prop="fromLocationCode">
            <el-input v-model="updateFormData.fromLocationCode"/>
          </el-form-item>
        </el-col>
        <el-col :lg="4" :sm="12" :md="12" :xs="24">
          <el-form-item label="目标点位" prop="toLocationCode">
            <el-input v-model="updateFormData.toLocationCode"/>
          </el-form-item>
        </el-col>
        <el-col :lg="4" :sm="12" :md="12" :xs="24">
          <el-button type="primary" class="btn-confirm" @click="handleSubmit">执行</el-button>
          <el-button @click="resetForm">重置</el-button>
          <el-button type="primary" @click="getData">刷新</el-button>
        </el-col>
<!--        <el-col :lg="1" :sm="12" :md="12" :xs="24">-->
<!--          <el-button @click="resetForm">重置</el-button>-->
<!--        </el-col>-->
<!--        <el-col :lg="1" :sm="12" :md="12" :xs="24">-->
<!--          <el-button type="primary" @click="getData">刷新</el-button>-->
<!--        </el-col>-->
      </el-row>
    </el-form>


<!--        <div>-->
<!--          <el-input v-model="socketInfo.url" type="text" style="width: 20%" /> &nbsp; &nbsp;-->
<!--          <el-button @click="join" type="primary">连接</el-button>-->
<!--          <el-button @click="exit" type="danger">断开</el-button>-->

<!--          <br />-->
<!--          <el-input  v-model="socketInfo.message" :rows="9" />-->
<!--          <el-button type="info" @click="send">发送消息</el-button>-->
<!--          <br />-->
<!--          <br />-->
<!--          <el-input v-model="socketInfo.text_content" :rows="9" /> 返回内容-->
<!--          <br />-->
<!--          <br />-->
<!--        </div>-->
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
    <el-popover
        v-model="showTip"
        trigger="click"
        :show-arrow="false"
        popper-class="popperClass"
        width="200">
      <div id="tip">
        <div class="mb10">{{ currentItem.locationCode }}</div>
        <div class="mb10">{{ currentItem.containerCode }}</div>
        <div class="mb10">{{ statusType.get(currentItem.status) }}</div>
        <div class="btn">
          <el-button type="primary" :disabled="updateFormData.toLocationCode !== ''" @click="handleSet" size="small">
            设为{{ updateFormData.fromLocationCode === '' ? '起点' : '终点' }}
          </el-button>
          <el-button type="primary" size="small">容器出库</el-button>
        </div>

      </div>
    </el-popover>
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

