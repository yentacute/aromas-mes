<script setup>
import modal from "@/plugins/modal.js";
import qrcode from "qrcode";
import printJS from 'print-js'

defineOptions({
  name: "LoadQrCode"
});
const props = defineProps({
  list: {
    type: Array,
    required: true
  }
})
const qrCodeData = ref()
// 批量打印
const handleBulkPrint = async () => {
  modal.closeLoading();
  // 选中数据
  if (props.list.length === 0) {
    return modal.msgWarning("请选择要打印的数据!")
  }
  const container = document.createElement('div')
  // container.style.display = 'none'
  document.body.appendChild(container)
  // qrCodeData.value = await qrcode.toDataURL(JSON.stringify(props.list[0]));
  // 循环生成二维码并打印
  for (let i = 0; i < props.list.length; i++) {
    const item = props.list[i];
    let temp = item.qrcode
    // let temp = Object.values(item).join(',')
    // let lastIndex = temp.lastIndexOf(',');
    // if (lastIndex !== -1) {
    //   temp = temp.substring(0, lastIndex);
    // }
    console.log(temp, 999)
    // 生成二维码图片
    qrCodeData.value = qrcode.toDataURL(temp);
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
    qrcode.toDataURL(temp, option, async (err, qrCodeImage) => {
      if (err) {
        modal.msgError('错误打印!', err)
      }
      // 创建一个包含要打印的内容的div元素
      const content = document.createElement('div')
      /*
      * No: 料号
      * C:颜色
      * R:卷号
      * PO:PO单号
      * C.NO:装柜单号
      * Lot: 缸号
      * L:布料长度-> 数量
      * */
      content.innerHTML = `
        <div class="left">
          <img src='${qrCodeImage}'>
          <div>
            <span>Item No:</span>
            <span>${item.itemCode}</span>
          </div>
        </div>
        <div class="right">
            <div class="text">
                <span>PO:</span>
                <span>${item.supplierPo}</span>
            </div>
            <div class="text">
                <span>C.NO:</span>
                <span>${item.supplierContrinerLoadNum}</span>
            </div>
            <div class="text">
                <span>Lot:</span>
                <span>${item.lot}</span>
            </div>
            <div class="c">
                <span>C:</span>
                <span>${item.itemColor}</span>
            </div>
            <div>
                <span>R:</span>
                <span>${item.roll}</span>
            </div>
            <div>
                <span>L:</span>
                <span>${item.quantityIncludingFoc}</span>
            </div>
        </div>
`
      content.style.display = 'flex'
      content.style.padding = '0'
      content.style.margin = '0'
      content.style.marginBottom = '20px'
      content.style.width = '100%'
      content.style.fontSize = '10px'
      content.style.boxSizing = 'border-box'
      content.style.fontWeight = '800'
      content.style.pageBreakInside = 'avoid'

      // content.style.border = '4px solid #000'
      // 将图片添加到文档中
      container.appendChild(content)
      // 如果是最后一个二维码，则进行打印操作
      if (i === props.list.length - 1) {
        printJS({
          printable: container.innerHTML,
          type: 'raw-html',
          style: `@media print {
          html{padding:0;margin:0;}
          body{padding:0;margin:0;}
          img { width:100%; height: auto;}
          .left{display:flex;flex-direction: column;flex-warp:warp;text-warp:warp;}
          .right{display:flex;flex-direction: column;margin-left: 0px;padding-right: 10px;flex-warp:warp;}
          .right-up{display:flex;flex-direction: column;flex: 1;}
          `
        })
        // 移除所有的图片元素
        container.innerHTML = ''
      }
    })
  }
}
defineExpose({handleBulkPrint});
</script>

<template>
</template>

<style scoped lang="scss">
div {
  border: 1px solid #000;
}
</style>
