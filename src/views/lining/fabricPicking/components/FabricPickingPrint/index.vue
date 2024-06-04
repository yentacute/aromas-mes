<script setup>
import modal from "@/plugins/modal.js";
import qrcode from "qrcode";
import printJS from 'print-js'
import {useI18n} from "vue-i18n";

defineOptions({
  name: 'FabricPickingPrint',
})
const {t} = useI18n()
const props = defineProps({
  list: {
    type: Array,
    // required: true
  },
  columnData: {
    type: Array,
    required: true
  },
  data: {
    type: Object,
    required: true
  },
  type: {
    type: Number,
    required: 1
  }
})
const qrCodeData = ref()
// 批量打印
// watch(() => props.data, (newVal, oldVal) => {
//   console.log(newVal, oldVal, '====')
// })
const print = async () => {
  modal.closeLoading();
  const temp = props.data.billNo
  const option = {
    errorCorrectionLevel: 'H',
    type: 'image/jpeg',
    // quality: 0.3,
    margin: 1,
    color: {
      dark: '#000000',
      light: '#ffffff'
    }
  }
  qrCodeData.value = qrcode.toDataURL(temp)
  qrcode.toDataURL(temp, option, async (err, qrCodeImage) => {
    if (err) {
      modal.msgError('错误打印!', err)
    }
    qrCodeData.value = qrCodeImage
    await nextTick()
    const style = '@page {  } ' + '@media print {td{border:1px    solid #000;text-align:center;height:40px}th{border:1px solid #000} }';//这里修改的是el-table边框问题
    printJS({
      printable: 'main',	//打印区域id
      type: 'html',		//打印类型是html
      scanStyles: false,
      // scanStyles: true,
      style: `@media print {
        .header{width: 100%;font-weight: bold;position: relative;height: 180px;display: flex;justify-content: center;align-items: center;}
        .img{position: absolute;left: 0;top: 0;width: 160px;fontsize: 12px;display: flex;flex-direction: column;align-items: center;}
        img{width: 100%;height: auto;}
        .title{font-weight: bold;}
        .content{display: flex;justify-content: space-evenly;align-items: center;margin-top: 20px;}
        .table{padding: 0 5px;width: 100%;word-wrap: break-word;}
        td{border:1px    solid #000;text-align:center;height:40px}th{border:1px solid #000}
      }`,
      targetStyles: ['*'],
    })
  })

}

const PrintAroma = () => {
  modal.closeLoading();
  console.log('PrintAroma')
  printJS({
    printable: 'Armoa',	//打印区域id
    maxWidth: 1150, // 最大宽度
    type: 'html',		//打印类型是html
    scanStyles: false,
    font_size: '',
    // scanStyles: true,
    style: `@media print {
        .company{width: 100%;font-weight:500;font-size: 18px;display: flex;justify-content: center;align-items: center;}
        .en{font-size: 12px;font-size: 18px;display: flex;justify-content: center;align-items: center;}
        .title{font-weight: bold;font-size: 18px;font-size: 18px;display: flex;justify-content: center;align-items: center;}
        .other{display: flex;justify-content: space-between;align-items: center;margin-top: 20px;font-weight:800;padding: 0 15px;}
        .center{display: flex;justify-content: center;align-items: center;}
        .table{padding: 0 5px;width: 100%;word-wrap: break-word;}
        td{border:1px    solid #000;text-align:center;height:40px}th{border:1px solid #000}
      }`,
    targetStyles: ['*'],

  })
}
defineExpose({ print,PrintAroma});


</script>

<template>
  <div>
    <div v-if="type" id="main">
      <div style="margin: 14px 5px;font-size: 18px">
        <div class="header" v-if="qrCodeData">
          <div class="img">
            <img :src="qrCodeData" alt="">
            <div>{{ data.billNo }}</div>
          </div>
          <div class="title" style="font-size: 34px">
            出仓单
          </div>
        </div>
        <div class="content">
          <div>
            单号：{{ data.billNo }}
          </div>
          <div>
            制单日期：{{ data.billDate || ''}}
<!--            制单日期：{{ data.billDate.split('T')[0] || ''}}-->
          </div>
        </div>

      </div>
      <div class="ml5 table">
        <el-table :data="list" style="width: 100%" class="table" border>
          <el-table-column type="index" :label="t('serial_number')" width="60"/>
          <el-table-column :prop="item.prop" :label="item.label"
                           v-bind="item"
                           :key="index"
                           align="center"
                           width="100%"
                           v-for="(item, index) in columnData"
                           resizable/>
        </el-table>
      </div>
    </div>
    <div v-else id="Armoa">
      <div style="margin: 14px 5px;font-size: 18px">
        <div class="company" style="font-size: 34px">
          莎美娜(柬埔寨)股份有限公司
        </div>
        <div class="en" style="font-size: 16px">
          Sabrina(Cambodia)Garment Manufacturing Corp
        </div>
        <div class="title" style="font-size: 26px">
          NIKE 12 月 Buy發布單-主料
        </div>
        <div class="other" style="font-size: 12px">
          <div>TOP:NIKE</div>
          <div class="center">2023112115~2023112131</div>
          <div>12</div>
        </div>
      </div>
      <div class="ml5 table">
        <el-table :data="list" style="width: 100%" class="table" border>
          <el-table-column type="index" :label="t('serial_number')" width="60"/>
          <el-table-column :prop="item.prop" :label="item.label"
                           v-bind="item"
                           :key="index"
                           align="center"
                           width="100%"
                           v-for="(item, index) in columnData"
                           resizable/>
        </el-table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

:deep(.el-table) {
  width: 100%;
  border: 1px solid #ebeef5;
}
//.header{
//  width: 100%;
//  font-weight: bold;
//  position: relative;
//  height: 180px;
//  display: flex;
//  justify-content: center;
//  align-items: center;
//}
//.img{
//  position: absolute;
//  left: 0;
//  top: 0;
//  width: 160px;
//  font-size: 12px;
//  display: flex;
//  flex-direction: column;
//  align-items: center;
//}
//img{
//  width: 100%;
//  height: auto;
//}
//.title{
//  font-weight: bold;
//  font-size: 34px;
//}
//.content{
//  display: flex;
//  justify-content: space-evenly;
//  align-items: center;
//  margin-top: 20px;
//}
</style>
