<template>
  <div class="fullpage">
    <el-form class="form" ref="formRef" :model="formData" :rules="formRules" inline>
      <el-form-item :label="t('sumbu.startCode')" prop="startCode">
        <el-input v-model="formData.startCode" placeholder=" " clearable :prefix-icon="Search" @click="showMap('startCode')" />
      </el-form-item>
      <el-form-item :label="t('sumbu.endCode')" prop="endCode">
        <el-input v-model="formData.endCode" placeholder=" " clearable :prefix-icon="Search" @click="showMap('endCode')" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleExec">执行</el-button>
        <el-button type="primary" @click="handleCommand('1')">空托盘补位</el-button>
        <el-button type="primary" @click="handleCommand('2')">空托盘补位</el-button>
        <el-button type="primary" @click="handleCommand('3')">空托盘补位</el-button>
      </el-form-item>
    </el-form>
    <el-divider style="margin: 0" />
    <div class="onekey">
      <el-button type="primary" @click="handleCommand('0')">一键呼叫</el-button>
    </div>

    <div class="progress" v-for="item in taskList" :key="item.taskCode">
      <div class="progress-label">{{ item.taskType }}</div>
      <div class="progress-label">{{ item.startLocation }}</div>
      <div
        class="progress-slider"
        :class="{
          // taskStatus:executing=任务下发进度条开始，success=成功绿色,suspend=挂起黄色，cancel=取消黑色,fail=失败红色
          'progress-success': item.taskStatus === 'success',
          'progress-suspend': item.taskStatus === 'suspend',
          'progress-cancel': item.taskStatus === 'cancel',
          'progress-fail': item.taskStatus === 'fail'
        }"
      >
        <el-slider v-model="item.progress" :show-tooltip="false" :min="0" :max="100" range :marks="marks" />
      </div>
      <div class="progress-label">{{ item.endLocation }}</div>
    </div>

    <el-dialog v-if="dialogVisible" v-model="dialogVisible" title="地图选起止" width="1024" draggable>
      <SumbuMap :type="1" @confirmCallback="haneleSelect"></SumbuMap>
    </el-dialog>
  </div>
</template>

<script setup name="Sumbu">
import { ref, onActivated, onDeactivated, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Search, ArrowDown } from '@element-plus/icons-vue'
import { execute, onekeycall, progressbar } from '@/api/call/sumbu.js'
import SumbuMap from './components/SumbuMap'
import useUserStore from '@/store/modules/user.js'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const formRef = ref(null)
const formData = ref({
  userId: useUserStore().id,
  areaType: 1, // 区域类型:1=松布区,2=拉布区,3=裁片区,4=产前区
  startCode: '',
  endCode: ''
})
const formRules = reactive({
  startCode: [{ required: true, message: t('required') }],
  endCode: [{ required: true, message: t('required') }]
})

// 地图弹框
const dialogVisible = ref(false)
let formDataKey = ''
const showMap = (e) => {
  formDataKey = e
  dialogVisible.value = true
}
const haneleSelect = (payload) => {
  dialogVisible.value = false
  if (!payload) return
  formData.value[formDataKey] = payload.locationCode
}

// 执行点对点搬运 taskStatus:executing=任务下发进度条开始，success=成功绿色,fail=失败红色，suspend=挂起黄色，cancel=取消黑色
const handleExec = async () => {
  await formRef.value.validate()
  const { data } = await execute(formData.value)
  const task = data[0]
  if (task?.taskStatus === 'executing') {
    taskList.value = [
      {
        taskCode: task.taskCode,
        eventType: 'executing',
        taskType: task.taskType,
        taskStatus: task.taskStatus,
        progress: [0, 0]
      }
    ]
    reTimer()
    autoProgress()
    ElMessage({ message: t('success'), type: 'success' })
    return
  }
  ElMessage({ message: t(taskStatus), type: 'error' })
}

// 进度条
let timer = null
const taskList = ref([])
const marks = ref({
  0: '任务开始', // "eventType": "executing" 开始
  33: '到达起点(取得容器)', // tote_load 取箱
  66: '到达终点(放下容器)', // tote_unload 放箱
  100: '任务完成' // task 结束
})

// 一键呼叫3个按钮
const handleCommand = async (command) => {
  const { data } = await onekeycall({
    userId: useUserStore().id,
    areaType: 1,
    taskType: command || 0, // 任务类型:1=空托补位,2=空托回仓,3=满料回仓,0=Auto
    workstationCode: localStorage.getItem('settingBelongId')
  })
  if (data && Array.isArray(data)) {
    data.forEach((item) => {
      // 事件类型（tote_load=取箱，tote_unload=放箱，task=任务）说明：事件类型必须和任务状态=success同时满足，才算一个事件的完成
      if (!item.progress) item.progress = [0, 0]
      // if (item.eventType === 'executing') item.progress = [0, 0]
      if (item.eventType === 'tote_load') item.progress = [0, 33]
      if (item.eventType === 'tote_unload') item.progress = [0, 66]
      if (item.eventType === 'task') item.progress = [0, 100]
    })
    taskList.value = [...taskList.value, ...data]
    console.log(taskList.value)
    ElMessage({ message: t('success'), type: 'success' })
    reTimer()
    autoProgress()
  }
}

// 轮询进度 间隔3秒
const reTimer = () => {
  if (timer) clearInterval(timer)
  timer = setInterval(async () => {
    const { data } = await progressbar({
      userId: useUserStore().id,
      codes: taskList.value.map((item) => item.taskCode).toString()
    })

    if (data && Array.isArray(data)) {
      // 修复进度条
      taskList.value.forEach((task) => {
        const findTask = data.find((item) => item.taskCode === task.taskCode)
        if (findTask?.eventType === 'executing' && task.progress[1] < 1) task.progress[1] = 1
        if (findTask?.eventType === 'tote_load' && task.progress[1] < 34) task.progress[1] = 34
        if (findTask?.eventType === 'tote_unload' && task.progress[1] < 67) task.progress[1] = 67
        if (findTask?.eventType === 'task' && task.progress[1] < 100) task.progress[1] = 100
      })
    }
  }, 3000)
}

// 进度自增动效
let autoTimer = null
const autoProgress = () => {
  if (autoTimer) clearInterval(autoTimer)
  autoTimer = setInterval(() => {
    taskList.value.forEach((item) => {
      if (!item.progress) item.progress = [0, 0]
      let max = 32
      // if (item.eventType === 'executing') max = 32
      if (item.eventType === 'tote_load') max = 65
      if (item.eventType === 'tote_unload') max = 99
      if (item.eventType === 'task') max = 100
      if (item.progress[1] < max) item.progress[1]++
    })
  }, 1000)
}

// onMounted(() => {
//   console.log('onMounted')
// })
onUnmounted(() => {
  console.log('onUnmounted')
  if (timer) clearInterval(timer)
  if (autoTimer) clearInterval(autoTimer)
})
// onActivated(() => {
//   console.log('onActivated')
// })
onDeactivated(() => {
  console.log('onDeactivated')
  if (timer) clearInterval(timer)
  if (autoTimer) clearInterval(autoTimer)
})
</script>

<style lang="scss" scoped>
.fullpage {
  padding: 20px;

  .onekey {
    margin: 20px;
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

::v-deep .el-input__wrapper {
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

// 进度条指示点

.progress-success ::v-deep .el-slider__runway > .el-slider__button-wrapper:nth-of-type(3) {
  .el-slider__button {
    background-color: #67c23a !important;
    border: 2px solid #67c23a !important;
  }
}

.progress-suspend ::v-deep .el-slider__runway > .el-slider__button-wrapper:nth-of-type(3) {
  .el-slider__button {
    background-color: #e6a23c !important;
    border: 2px solid #e6a23c !important;
  }
}

.progress-cancel ::v-deep .el-slider__runway > .el-slider__button-wrapper:nth-of-type(3) {
  .el-slider__button {
    background-color: #909399 !important;
    border: 2px solid #909399 !important;
  }
}

.progress-fail ::v-deep .el-slider__runway > .el-slider__button-wrapper:nth-of-type(3) {
  .el-slider__button {
    background-color: #f56c6c !important;
    border: 2px solid #f56c6c !important;
  }
}
</style>
