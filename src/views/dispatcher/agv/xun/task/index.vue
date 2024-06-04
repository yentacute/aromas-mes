<template>
  <div class="app-container">
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-row>
      <el-form-item label="场景一:（纯AGV呼叫到目标点）"></el-form-item>
    </el-row>
    <el-row>
      <el-form-item label="目标工作位编码">
        <el-input v-model="formInline.locationCode" placeholder="目标工作位编码" clearable />
      </el-form-item>
      <el-form-item label="目标工作站编码">
        <el-input v-model="formInline.stationCode" placeholder="目标工作站编码" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onCall1">一键呼叫（纯AGV呼叫到目标点）</el-button>
      </el-form-item>
    </el-row>

    <el-row>
      <el-form-item label="场景二:(AGV+容器到目标点)"></el-form-item>
    </el-row>
    <el-row>
      <el-form-item label="容器编码">
        <el-input v-model="formInline.containerCode1" placeholder="容器编码" clearable />
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item label="起始库位编码">
        <el-input v-model="formInline.startLocationCode1" placeholder="起始库位编码" clearable />
      </el-form-item>
      <el-form-item label="目标库位编码">
        <el-input v-model="formInline.endLocationCode1" placeholder="目标库位编码" clearable />
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item label="起始工作位编码">
        <el-input v-model="formInline.startWorkstationCode1" placeholder="起始工作位编码" clearable />
      </el-form-item>
      <el-form-item label="目标工作位编码">
        <el-input v-model="formInline.endWorkstationCode1" placeholder="目标工作位编码" clearable />
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item label="起始工作站编码">
        <el-input v-model="formInline.startWorkstationCode1" placeholder="起始工作站编码" clearable />
      </el-form-item>
      <el-form-item label="目标工作站编码">
        <el-input v-model="formInline.endWorkstationCode1" placeholder="目标工作站编码" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="btn-confirm" @click="onSubmit">一键呼叫(AGV+容器到目标点)</el-button>
      </el-form-item>
    </el-row>

    <el-row>
      <el-form-item label="场景三:(容器从A到B)"></el-form-item>
    </el-row>
    <el-row>
      <el-form-item label="容器编码">
        <el-input v-model="formInline.containerCode3" placeholder="容器编码" clearable />
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item label="起始库位编码">
        <el-input v-model="formInline.startLocationCode3" placeholder="起始库位编码" clearable />
      </el-form-item>
      <el-form-item label="目标库位编码">
        <el-input v-model="formInline.endLocationCode3" placeholder="目标库位编码" clearable />
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item label="起始工作位编码">
        <el-input v-model="formInline.startWorkstationCode3" placeholder="起始工作位编码" clearable />
      </el-form-item>
      <el-form-item label="目标工作位编码">
        <el-input v-model="formInline.endWorkstationCode3" placeholder="目标工作位编码" clearable />
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item label="起始工作站编码">
        <el-input v-model="formInline.startWorkstationCode3" placeholder="起始工作站编码" clearable />
      </el-form-item>
      <el-form-item label="目标工作站编码">
        <el-input v-model="formInline.endWorkstationCode3" placeholder="目标工作站编码" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="btn-confirm" @click="onSubmit">一键呼叫(容器从A到B)</el-button>
      </el-form-item>
    </el-row>

  </el-form>
</div>
</template>

<script setup>
import { reactive } from 'vue'

const formInline = reactive({
  user: '',
  region: '',
  date: '',
})

const onSubmit = () => {
  console.log('submit!')
}


const onCall1 = () => {
  console.log('onCall1!')
}

const onCall2 = () => {
  console.log('onCall2!')
}

const onCall3 = () => {
  console.log('onCall3!')
}

</script>

<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>