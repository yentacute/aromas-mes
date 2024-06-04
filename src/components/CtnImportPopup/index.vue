<script setup>
import { computed, ref } from "vue";
import { formatDate } from "@/utils";
import { ElMessage } from "element-plus";
import {useI18n} from "vue-i18n";
import useSettingsStore from "@/store/modules/settings.js";
const { t } = useI18n()
defineOptions({
  name: "CtnImportPopup"
});
const props = defineProps({
  // downloadApi: {
  //   type: Function,
  //   // required: true,
  // },
  uploadApi: {
    type: Function,
    required: true,
  },
  downloadParams: {
    type: Object,
    default: () => ({}), // 默认返回一个空对象
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  cancelText: {
    type: String,
    default: '',
  },
  confirmText: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '50%',
  },
  action: {
    type: String,
    default: '',
  },
  fileName: {
    type: String,
    default: undefined, // 或者你可以提供一个默认值
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
  loading: {
    type: Boolean,
    default: false,
  },
  isDownloadRes: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits([
  "update:modelValue",
  "confirmCallback",
  "cancelCallback",
  "download"
]);
const value = computed(() => {
  return props.modelValue;
});
const upload = ref()
function closePopup() {
  upload.value.clearFiles();
  fileList.value = [];
  emit("update:modelValue", false);
  emit("cancelCallback");
}
// 文件模板下载
// const handleDownloadTemplate = async () => {
//   await props.downloadApi().then(res => {
//     const blobUrl = window.URL.createObjectURL(
//       new Blob([res], { type: "xlsx" })
//     );
//     download(blobUrl);
//   });
// };
// function download(blobUrl, fileName = "文件模板") {
//   const a = document.createElement("a");
//   a.download = fileName + "." + "xlsx";
//   a.href = blobUrl;
//   a.click();
// }

const fileList = ref([]);
// 确定上传
const handleUploadFile = async () => {
  console.log("this.fileList", fileList.value);
  if (fileList.value.length === 0) {
    return ElMessage({
      type: "warning",
      message: t('uploadInfo.info')
    });
  }
  const file = fileList.value[0];
  console.log(file, "file");
  const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.') + 1);
  // 检查文件扩展名是否是 "xlsx" 或 "xls"
  if (fileExtension !== 'xlsx' && fileExtension !== 'xls') {
    ElMessage({
      type: "warning",
      message: t('uploadInfo.type')
    });
    fileList.value = [];
    return;
  }
  const formData = new FormData();
  formData.append("file", file.raw);
  await props.uploadApi(formData).then(res => {
    if (props.isDownloadRes) {
      const blobUrl = window.URL.createObjectURL(
        new Blob([res], { type: "xlsx" })
      );
      console.log("blobUrl", blobUrl);
      // download(blobUrl, props.fileName);
    }
    ElMessage({
      type: "success",
      message: t('uploadInfo.success')
    });
  }).finally(() => {
    emit("update:modelValue", false);
    emit("confirmCallback");
  })
  // ElMessage({
  //   type: "success",
  //   message: t('uploadInfo.success')
  // });

};
// 文件状态改变时的钩子
// const handleChange = (file) => {
//   const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.') + 1);
//   // 检查文件扩展名是否是 "xlsx" 或 "xls"
//   if (fileExtension !== 'xlsx' && fileExtension !== 'xls') {
//     ElMessage({
//       type: "warning",
//       message: "请选择xlsx、xls格式文件！"
//     });
//     fileList.value = [];
//     return;
//   }
//   // 如果文件扩展名正确，则将文件添加到列表中
//   fileList.value.push(file.raw);
// };
const handleChange = (file) => {
  if (file.name.indexOf("xlsx") == -1 && file.name.indexOf("xls") == -1) {
    ElMessage({
      type: "warning",
      message: t('uploadInfo.type')
    });
    fileList.value = [];
    return;
  } else {
    fileList.value.push(file.raw);
  }
};
// 文件超出个数限制时的钩子
const handleExceed = (file) => {
  return ElMessage({
    type: "warning",
    message: t('uploadInfo.limit1')
  });
};
// 文件列表移除文件时的钩子
const handleRemove = (file, list) => {
  fileList.value = list;
};
const checkFile = () => {

}
</script>

<template>
  <div v-loading="loading">
    <el-dialog
      destroy-on-close
      @close="closePopup"
      v-model="value"
      :title="props.title"
      :width="width"
      align-center
      draggable
      :close-on-click-modal="false"
    >

      <el-row class="pad-l-lg mg-t-lg">
        <el-col :span="24">
          <el-upload
            ref="upload"
            v-model:file-list="fileList"
            accept=".xls,.xlsx"
            :action="action"
            limit="1"
            drag
            :auto-upload="false"
            :on-exceed="handleExceed"
            :on-change="handleChange"
            :on-remove="handleRemove"
            >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
<!--              Drop file here or <em>click to upload</em>-->
              {{$t('uploadInfo.text1')}}<em>&nbsp;{{$t('uploadInfo.text2')}}</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                1、{{$t('uploadInfo.tip1')}}
              </div>
              <div class="el-upload__tip">
                2、{{$t('uploadInfo.tip2')}}
              </div>
              <div class="el-upload__tip">
                3、{{$t('uploadInfo.tip3')}}
              </div>
            </template>
            <div
              slot="tip"
              class="el-upload__tip"
              style="display: inline-block; margin-left: 20px"
            >
<!--              只能上传xlsx文件-->
            </div>
          </el-upload>
        </el-col>
      </el-row>
      <template #footer>
        <div>
          <span class="dialog-footer">
            <el-button v-show="showCancel" class="btn-cancel" @click="closePopup">{{
              props.cancelText
            }}</el-button>
            <el-button
              v-show="showConfirm"
              :loading="useSettingsStore().loading"
              type="primary"
              @click="handleUploadFile"
              class="btn-confirm"
            >
              {{ props.confirmText }}
            </el-button>
          </span>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<style scoped></style>
