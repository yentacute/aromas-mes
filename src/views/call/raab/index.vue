<template>
  <div class="fullpage">
    <el-form class="form" ref="formRef" :model="formData" :rules="formRules" inline>
      <el-form-item label="startCode" prop="startCode">
        <el-input v-model="formData.startCode" placeholder=" " @click="showMap = true" readonly clearable
                  :prefix-icon="Search"/>
      </el-form-item>
      <el-form-item label="endCode" prop="endCode">
        <el-input v-model="formData.endCode" placeholder=" " @click="showMap = true" readonly clearable
                  :prefix-icon="Search"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleExec">执行</el-button>
      </el-form-item>
    </el-form>
    <div class="onekey">
      <el-dropdown split-button type="primary" placement="bottom-end" @click="handleOnekeycall(0)"
                   @command="handleCommand">
        一键呼叫
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="a">空托盘补位</el-dropdown-item>
            <el-dropdown-item command="b">空托盘回库</el-dropdown-item>
            <el-dropdown-item command="c">满料托盘回库</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    {{progressData}}
    {{ taskList }}
    <div class="progress" v-for="item in taskList" :key="item.taskCode">
      <div class="progress-label">{{ item.taskType }}</div>
      <div class="progress-label">{{ item.startLocation }}</div>
      <div class="progress-slider" :class="{ 'progress-error': item.taskStatus !== 'success' }">
        {{ item.progress }}
        <el-slider v-model="item.progress" :show-tooltip="false" :min="0" :max="100" range :marks="marks"
                   :disabled="item.taskStatus === 'failed'"/>
      </div>
      <div class="progress-label">{{ item.endLocation }}</div>
    </div>
    <el-dialog v-model="showMap" width="55%" title="选择工作站" @close="onMapClose">
      <sumbu-map @confirm-callback="handleSelect" :type="1" ref="mapRef"></sumbu-map>
    </el-dialog>
  </div>
</template>

<script setup>
import {onDeactivated, onUnmounted, ref} from 'vue'
import {ElMessage} from 'element-plus'
import {Search, ArrowDown} from '@element-plus/icons-vue'
import {execute, onekeycall, progressbar} from '@/api/call/sumbu.js'
import {useI18n} from 'vue-i18n'
import SumbuMap from "@/views/call/sumbu/components/SumbuMap/index.vue";
import useUserStore from "@/store/modules/user.js";

defineOptions({
  name: 'CallRaab',
})
const {t} = useI18n()
const showMap = ref(false)
const formRef = ref(null)
const formData = ref({
  userId: useUserStore().id,
  areaType: 2, // 区域类型:1=松布区,2=拉布区,3=裁片区,4=产前区
  // startCode: 'KIVA-018-009-01',
  startCode: 'HAI-011-025-06_1',
  endCode: 'HAI-001-001-03_1'
  // endCode: 'KIVA-019-028-01'
})
const formRules = reactive({
  startCode: [{required: true, message: t('required')}],
  endCode: [{required: true, message: t('required')}]
})
const taskList = ref([])
const mapRef = ref()
const timers = ref([]);
// 执行
const handleExec = async () => {
  await formRef.value.validate()
  const {data} = await execute(formData.value).catch(() => {
    formData.value.startCode = ''
    formData.value.endCode = ''
  })
  if (data && Array.isArray(data)) {
    if (data[0]?.taskStatus === 'failed') {
      ElMessage({message: t('task') + t('failed'), type: 'error'})
      return
    }
    ElMessage({message: t('task') + t('success'), type: 'success'})
  }
  if (taskList.value.length === 0) {
    await getProgress(data)
  } else {
    await getProgress(taskList.value.concat(data))
  }

  startTimers()
}

// 一键呼叫：会根据当前工作站的状态（比如两个工作位有没有容器，容器里面有没有物料），自动调用其余三个功能；
// 点击四个按钮任意一个，接口都将返回任务号、任务类型、起始点位、目标点位、任务状态等信息，数据条数为0-4条，
// 如果返回0，则表示无任务，如果返回1-4，则对应1-4条任务，将此任务状态显示在底部的任务进度状态区，并通过定时轮询的方式刷新任务状态

const handleOnekeycall = async (command) => {
  const {data} = await onekeycall({
    userId: useUserStore().id,
    areaType: 1,
    taskType: command,
    workstationCode: '002'
  })
  const arr = [
    {
      taskCode: "TaskCode-20240530-0096",
      taskType: "空托补位",
      startLocation: "1040000001",
      endLocation: "工作位A",
      taskStatus: "executing"
    },
    {
      taskCode: "TaskCode-20240530-0093",
      taskType: "空托补位",
      startLocation: "1040000003",
      endLocation: "工作位B",
      taskStatus: "executing"
    },
    {
      taskCode: "TaskCode-20240530-0106",
      taskType: "空托补位",
      startLocation: "1040000003",
      endLocation: "工作位B",
      taskStatus: "executing"
    }
  ]
  const res = await progressbar({
    // userId: useUserStore().id,
    userId: '1800479800323735552',
    codes: 'TaskCode-20240530-0096,TaskCode-20240530-0093,TaskCode-20240530-0106'
    // codes: taskList.value.concat(arr).map(item => item.taskCode).join(',')
  })

  console.log(progressData.value,555)
  taskList.value = arr.map(item => {
    const temp = res.data.find(i => i.taskCode === item.taskCode)
    console.log(temp,588)
    if (temp) {
      item.progress = [0, progressStarMap.get(temp.eventType)]
      item.eventType = temp.eventType
      item.taskStatus = temp.taskStatus
    }
    return item
  })
  // if (data) {
    startTimers()
    await getProgress(arr)
    ElMessage({message: t('Success'), type: 'success'})
  // }
}
let timer = null
const progressData = ref([])
const getProgress = async (arr) => {
  if (timer) clearInterval(timer)
  timer = setInterval(async () => {
    const {data} = await progressbar({
      // userId: useUserStore().id,
      userId: '1800479800323735552',
      codes: 'TaskCode-20240530-0096,TaskCode-20240530-0093,TaskCode-20240530-0106'
      // codes: taskList.value.concat(arr).map(item => item.taskCode).join(',')
    })
    // progressData.value = data
    taskList.value = arr.map(item => {
      const temp = data.find(i => i.taskCode === item.taskCode)
      if (temp) {
        item.progress = [0, progressStarMap.get(temp.eventType)]
        item.eventType = temp.eventType
        item.taskStatus = temp.taskStatus
      }
      return item
    })
  }, 3000)

}
const marks = ref({
  0: '任务开始',
  33: '到达起点(取得容器)',
  66: '到达终点(放下容器)',
  100: '任务完成'
})
const progressStarMap = new Map([
  ['task_allocated', 0],
  ['tote_load', 33],
  ['tote_unload', 66],
  ['task', 100]
])
const progressEndMap = new Map([
  ['task_allocated', 16.5],
  ['tote_load', 49.5],
  ['tote_unload', 82.5],
  ['task', 100]
])
// 初始化定时器
const startTimers = () => {
  // 清除定时器
  timers.value.forEach(clearInterval)
  timers.value = [] // 重置定时器
  console.log(taskList.value, 555)
  taskList.value.forEach((item, index) => {
    if (item.taskStatus !== 'failed') {
    const intervalId = setInterval(async () => {
      const startValue = progressStarMap.get(item.eventType)
      const endValue = progressEndMap.get(item.eventType)
      if (item.progress[1] < endValue) {
        item.progress[1] = (item.progress[1] + 1) % endValue; // 模运算来循环进度
        // item.progress = Math.min(item.progress + 1, endValue);
        await nextTick();
      } else {
        console.log(item.progress[1],789)
        item.progress[1] = startValue
        // 达到最终值，清除定时器
        clearInterval(intervalId)
      }
    }, 100);
    // 存储定时器 ID
    timers.value[index] = intervalId;
    item.progress = [0, progressStarMap.get(item.eventType)]
    } else {
      item.progress = [0,progressEndMap.get(item.eventType)]
    }
  })
};

const handleCommand = (command) => {
  ElMessage(`click on item ${command}`)
  handleOnekeycall(command)
}


// 选择工作站
const handleSelect = async (val) => {
  showMap.value = false
  if (!formData.value.startCode) {
    formData.value.startCode = val.locationCode
  } else {
    formData.value.endCode = val.locationCode
  }
}
const onMapClose = async () => {
  await mapRef.value.resetForm()
}
onUnmounted(() => {
  if (timer) clearInterval(timer)
  if (timers.value) {
    timers.value.forEach(clearInterval)
    timers.value = []
  }
})
onDeactivated(() => {
  if (timer) clearInterval(timer)
  if (timers.value) {
    timers.value.forEach(clearInterval)
    timers.value = []
  }
})
</script>

<style lang="scss" scoped>
.fullpage {
  padding: 20px;

  .onekey {
    margin: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .progress {
    height: 32px;
    margin: 40px 20px;
    display: flex;
    align-items: center;

    .progress-label {
      height: 32px;
      line-height: 32px;
      margin: 0 8px;
    }

    .progress-slider {
      flex: 1;
      margin: 0 40px;
    }
  }
}

:deep(.el-input__wrapper) {
  position: relative;

  .el-input__inner {
    padding-right: 18px;
  }

  .el-input__suffix {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
  }
}

::v-deep .el-slider__stop {
  width: var(--el-slider-button-size);
  height: var(--el-slider-button-size);
  vertical-align: middle;
  border: solid 2px var(--el-slider-main-bg-color);
  background-color: var(--el-color-white);
  border-radius: 50%;
  box-sizing: border-box;
  transition: var(--el-transition-duration-fast);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transform: translate(-50%, -36%);
}

::v-deep .el-slider__button {
  // background-color: #67c23a;
}
// 进度条指示点
.progress-error :deep(.el-slider__runway > .el-slider__button-wrapper:nth-of-type(3) ) {
  .el-slider__button {
    background-color: #f56c6c !important;
    border: 2px solid #f56c6c !important;
  }
}
</style>
