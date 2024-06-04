<template>
  <div class="qr-wrapper">
    <div class="qr-field">
      <el-input
        v-model="store.scanValue"
        :placeholder="t('fabricInpsection.bar_code')"
        clearable
      />
      <el-button
        icon="CameraFilled"
        class="scan-button"
        @click="accessDevices(constraints)"
      />
    </div>

    <el-button  type="primary" @click="handleFillFormData">{{
      t("search")
    }}</el-button>
    <canvas ref="canvasEl"></canvas>
    <el-dialog
      v-model="qrPopup"
      @close="handleClose"
      title="Scan fabric code"
      width="500"
      align-center
      center
      destroy-on-close
    >
      <div class="qr-container">
        <video
          ref="videoElement"
          autoplay
        ></video>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onUnmounted, watch } from "vue";
import jsQR from "jsqr";
import QRCodeDecoder from "qrcode-decoder";
import useFabricInspection from "@/store/modules/fabric_inspection.js";
import { scanQrCode } from "@/api/lining/fabric_inspection.js";
import { useI18n } from "vue-i18n";
import { ElMessage } from "element-plus";
const { t } = useI18n();
const store = useFabricInspection();

const videoElement = ref(null);
let videoStream = null;
const canvasEl = ref(null);
const qrPopup = ref(false);
const constraints = {
  audio: false,
  video: true,
};
const ctx = ref(null);

const accessDevices = (constraints) => {
  qrPopup.value = true;
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      videoStream = stream;
      videoElement.value.srcObject = stream;
      getImageData();
    })
    .catch((error) => {
      console.error(`An error occurred: ${error}`);
    });
};

const getImageData = () => {
  const decoder = new QRCodeDecoder();
  decoder
    .decodeFromCamera(videoElement.value)
    .then((result) => {
      if (result.data) {
        store.scanValue = result.data;
        ElMessage({
          type: "success",
          message: t("fabricInpsection.bar_code_found"),
        });
        qrPopup.value = false;
        handleClose();
      }
    })
    .catch((error) => {
      ElMessage({
        type: "error",
        message: t("fabricInpsection.barcode_not_found"),
      });
    });
};

const handleClose = () => {
  qrPopup.value = false;
  if (videoStream) {
    videoStream.getTracks().forEach((track) => track.stop());
    videoElement.value.srcObject = null;
    canvasEl.value = null;
  }
};

const handleFillFormData = async () => {
  try {
    const response = await scanQrCode(store.scanValue);
    const { data } = response;
    if (data) {
      data.lengthActual = data.lengthActual || data.lengthOriginal;
      data.widthActual = data.widthActual || data.widthOriginal;
      data.weightActual = data.weightActual || data.weightOriginal;
      data.patternRepeatCountActual = data.patternRepeatCountActual || data.patternRepeatCountOriginal;
      if (data.result !== null && typeof (data.result) !== 'undefined') {
        store.selectedValue = data.result;
      } else {
      store.selectedValue = 'OK'; 
      }
      store.rollDetailsData = data;
      if (store.rollDetailsData.wmsFabricInspectionRollDetails !== null) {
        const filterDisable = store.rollDetailsData.wmsFabricInspectionRollDetails.filter( data => data.disable != 1 );
        store.errorsData = filterDisable;
      } else {
        store.errorsData = [];
      }
      ElMessage({
        type: "success",
        message: t("fabricInpsection.fill_success"),
      });
    } else {
      ElMessage({
        type: "warning",
        message: t("fabricInpsection.data_not_found"),
      });
    }
   
  } catch (error) {
    console.log(error);
  }
};
</script>
<style  lang="scss" scoped>
video {
  width: 250px;
  height: 250px;
  object-fit: cover;
}
canvas {
  display: none;
}

.qr-wrapper {
  position: relative;
  display: flex;
  gap: 12px;
  @media (min-width: 1280px) {
    flex-basis: 400px;
  }
  .qr-container {
    width: 250px;
    height: 250px;
    margin: 0 auto;
  }

  .qr-field {
    position: relative;
    width: 100%;
    @media (min-width: 768px) {
      max-width: 300px;
    }
    input {
      width: 100%;
    }
  }

  @media (max-width: 767px) {
    width: 100%;

    .qr-field {
      width: 100%;
      display: flex;
      input {
        width: 100%;
      }
    }
  }

  .scan-button {
    position: absolute;
    right: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
