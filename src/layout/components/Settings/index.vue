<template>
  <el-drawer
    v-model="showSettings"
    :withHeader="false"
    direction="rtl"
    size="300px"
  >
    <div class="setting-drawer-title">
      <h3 class="drawer-title">{{ t("layout.themeStyle") }}</h3>
    </div>
    <div class="setting-drawer-block-checbox">
      <div
        class="setting-drawer-block-checbox-item"
        @click="handleTheme('theme-dark')"
      >
        <img src="@/assets/images/dark.svg" alt="dark" />
        <div
          v-if="sideTheme === 'theme-dark'"
          class="setting-drawer-block-checbox-selectIcon"
          style="display: block"
        >
          <i aria-label="图标: check" class="anticon anticon-check">
            <svg
              viewBox="64 64 896 896"
              data-icon="check"
              width="1em"
              height="1em"
              :fill="theme"
              aria-hidden="true"
              focusable="false"
              class
            >
              <path
                d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"
              />
            </svg>
          </i>
        </div>
      </div>
      <div
        class="setting-drawer-block-checbox-item"
        @click="handleTheme('theme-light')"
      >
        <img src="@/assets/images/light.svg" alt="light" />
        <div
          v-if="sideTheme === 'theme-light'"
          class="setting-drawer-block-checbox-selectIcon"
          style="display: block"
        >
          <i aria-label="图标: check" class="anticon anticon-check">
            <svg
              viewBox="64 64 896 896"
              data-icon="check"
              width="1em"
              height="1em"
              :fill="theme"
              aria-hidden="true"
              focusable="false"
              class
            >
              <path
                d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"
              />
            </svg>
          </i>
        </div>
      </div>
    </div>
     <div class="drawer-item">
      <span>{{ t("layout.themeColor") }}</span>
      <span class="comp-style">
        <el-color-picker
          v-model="theme"
          :predefine="predefineColors"
          @change="themeChange"
        />
      </span>
    </div>
    <el-divider />
    <div class="setting-drawer-title">
      <h3 class="drawer-title">{{ t("layout.tableStyle") }}</h3>
    </div>
    <div class="setting-drawer-block-checbox">
      <el-tooltip :content="t('layout.tableDark')" placement="top" effect="dark">
        <div
          class="setting-drawer-block-checbox-item"
          @click="handleTableStyle('table-dark')"
        >
          <div class="table-image table-dark" >
            <svg  viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                <path d="M1740 0c99.24 0 180 80.76 180 180v1560c0 99.24-80.76 180-180 180H180c-99.24 0-180-80.76-180-180V180C0 80.76 80.76 0 180 0h1560Zm-420 1200h480V720h-480v480Zm480 540v-420h-480v480h420c33 0 60-27 60-60ZM720 1200h480V720H720v480Zm0 600h480v-480H720v480Zm-600-600h480V720H120v480Zm480 600v-480H120v420c0 33 27 60 60 60h420Z" fill-rule="evenodd"/>
            </svg>
          </div>
          <div
            class="setting-drawer-block-checbox-selectIcon"
            v-if="tableStyle === 'table-dark'"
          >
            <i aria-label="图标: check" class="anticon anticon-check">
              <svg
                viewBox="64 64 896 896"
                data-icon="check"
                width="1em"
                height="1em"
                :fill="theme"
                aria-hidden="true"
                focusable="false"
                class
              >
                <path
                  d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"
                />
              </svg>
            </i>
          </div>
        </div>
      </el-tooltip>
      
      <el-tooltip :content="t('layout.tableLight')" placement="top" effect="dark">
        <div
          class="setting-drawer-block-checbox-item"
          @click="handleTableStyle('table-bright')"
        >
          <div class="table-image table-bright">
            <svg  viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                <path d="M1740 0c99.24 0 180 80.76 180 180v1560c0 99.24-80.76 180-180 180H180c-99.24 0-180-80.76-180-180V180C0 80.76 80.76 0 180 0h1560Zm-420 1200h480V720h-480v480Zm480 540v-420h-480v480h420c33 0 60-27 60-60ZM720 1200h480V720H720v480Zm0 600h480v-480H720v480Zm-600-600h480V720H120v480Zm480 600v-480H120v420c0 33 27 60 60 60h420Z" fill-rule="evenodd"/>
            </svg>
          </div>
          <div
            class="setting-drawer-block-checbox-selectIcon"
            v-if="tableStyle === 'table-bright'"
          >
            <i aria-label="图标: check" class="anticon anticon-check">
              <svg
                viewBox="64 64 896 896"
                data-icon="check"
                width="1em"
                height="1em"
                :fill="theme"
                aria-hidden="true"
                focusable="false"
                class
              >
                <path
                  d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"
                />
              </svg>
            </i>
          </div>
        </div>
      </el-tooltip>
      <el-tooltip :content="t('layout.tableColorful')" placement="top" effect="dark">
        <div
          class="setting-drawer-block-checbox-item"
          @click="handleTableStyle('table-colorful')"
        >
          <div class="table-image table-colorful">
            <svg  viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                <path d="M1740 0c99.24 0 180 80.76 180 180v1560c0 99.24-80.76 180-180 180H180c-99.24 0-180-80.76-180-180V180C0 80.76 80.76 0 180 0h1560Zm-420 1200h480V720h-480v480Zm480 540v-420h-480v480h420c33 0 60-27 60-60ZM720 1200h480V720H720v480Zm0 600h480v-480H720v480Zm-600-600h480V720H120v480Zm480 600v-480H120v420c0 33 27 60 60 60h420Z" fill-rule="evenodd"/>
            </svg>
          </div>
          <div
            v-if="tableStyle === 'table-colorful'"
            class="setting-drawer-block-checbox-selectIcon"
            style="display: block"
          >
            <i aria-label="图标: check" class="anticon anticon-check">
              <svg
                viewBox="64 64 896 896"
                data-icon="check"
                width="1em"
                height="1em"
                :fill="theme"
                aria-hidden="true"
                focusable="false"
                class
              >
                <path
                  d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"
                />
              </svg>
            </i>
          </div>
        </div>
      </el-tooltip> 
    </div>
    
    <div class="drawer-item">
      <span>{{ t("layout.tableHeaderBg") }}</span>
      <span class="comp-style">
        <el-color-picker
          v-model="tableHeaderBg"
          :predefine="predefineColors"
          @change="value => storeSettings.tableHeaderBg = value"
        />
      </span>
    </div>
    <div class="drawer-item">
      <span>{{ t("layout.tableLine") }}</span>
      <span class="comp-style">
        <el-color-picker
          v-model="tableLine"
          :predefine="predefineColors"
          @change="value => storeSettings.tableLine = value"
        />
      </span>
    </div>
    <div class="drawer-item">
      <span>{{ t("layout.tableRowBg") }}</span>
      <span class="comp-style">
        <el-color-picker
          v-model="tableRowBg"
          :predefine="predefineColors"
          @change="value => storeSettings.tableRowBg = value"
        />
      </span>
    </div>
    <div class="drawer-item">
      <span>{{ t("layout.tableRowCurrentBg") }}</span>
      <span class="comp-style">
        <el-color-picker
          v-model="tableRowCurrentBg"
          :predefine="predefineColors"
          @change="value => storeSettings.tableRowCurrentBg = value"
        />
      </span>
    </div>
    <div class="drawer-item">
      <span>{{ t("layout.tableRowCurrentColor") }}</span>
      <span class="comp-style">
        <el-color-picker
          v-model="tableRowCurrentColor"
          :predefine="predefineColors"
          @change="value => storeSettings.tableRowCurrentColor = value"
        />
      </span>
    </div>
    <div class="drawer-item">
      <span>{{ t("layout.tableRowStriped") }}</span>
      <span class="comp-style">
        <el-color-picker
          v-model="tableRowStriped"
          :predefine="predefineColors"
          @change="value => storeSettings.tableRowStriped = value"
        />
      </span>
    </div>
    <div class="drawer-item">
      <span>{{ t("layout.tableTextColorHeader") }}</span>
      <span class="comp-style">
        <el-color-picker
          v-model="tableTextColorHeader"
          :predefine="predefineColors"
          @change="value => storeSettings.tableTextColorHeader = value"
        />
      </span>
    </div>
    <div class="drawer-item">
      <span>{{ t("layout.tableTextColorRow") }}</span>
      <span class="comp-style">
        <el-color-picker
          v-model="tableTextColorRow"
          :predefine="predefineColors"
          @change="value => storeSettings.tableTextColorRow = value"
        />
      </span>
    </div>
    <div class="drawer-item">
      <span>{{ t("layout.tableTextColorStriped") }}</span>
      <span class="comp-style">
        <el-color-picker
          v-model="tableTextColorStriped"
          :predefine="predefineColors"
          @change="value => storeSettings.tableTextColorStriped = value"
        />
      </span>
    </div>
    <el-divider />

    <h3 class="drawer-title">{{ t("layout.formSettings") }}</h3>

    <div class="drawer-item">
      <span>{{ t("layout.labelInputColor") }}</span>
      <span class="comp-style">
        <el-color-picker
          v-model="labelInputColor"
          :predefine="predefineColors"
          @change="value => storeSettings.labelInputColor = value"
        />
      </span>
    </div>
    <div class="drawer-item">
      <span>{{ t("layout.disabledInputColor") }}</span>
      <span class="comp-style">
        <el-color-picker
          v-model="disabledInputColor"
          color-format="hex"
          :predefine="predefineColors"
          @change="value => storeSettings.disabledInputColor = value"
        />
      </span>
    </div>

    <div class="drawer-item">
      <span>{{ t("layout.normalInputColor") }}</span>
      <span class="comp-style">
        <el-color-picker
          v-model="normalInputColor"
          :predefine="predefineColors"
          @change="value => storeSettings.normalInputColor = value"
        />
      </span>
    </div>
    <h3 class="drawer-title">{{ t("layout.exportButton") }}</h3>
    <div class="drawer-item">
      <span>{{ t("layout.exportBgColor") }}</span>
      <span class="comp-style">
        <el-color-picker
          v-model="exportBgColor"
          :predefine="predefineColors"
          @change="value => storeSettings.exportBgColor = value"
        />
      </span>
    </div>
    <div class="drawer-item">
      <span>{{ t("layout.exportTextColor") }}</span>
      <span class="comp-style">
        <el-color-picker
          v-model="exportTextColor"
          :predefine="predefineColors"
          @change="value => storeSettings.exportTextColor = value"
        />
      </span>
    </div>
    <div class="drawer-item">
      <span>{{ t("layout.exportBgColorHover") }}</span>
      <span class="comp-style">
        <el-color-picker
          v-model="exportBgColorHover"
          :predefine="predefineColors"
          @change="value => storeSettings.exportBgColorHover = value"
        />
      </span>
    </div>
    <div class="drawer-item">
      <span>{{ t("layout.exportTextColorHover") }}</span>
      <span class="comp-style">
        <el-color-picker
          v-model="exportTextColorHover"
          :predefine="predefineColors"
          @change="value => storeSettings.exportTextColorHover = value"
        />
      </span>
    </div>

    <h3 class="drawer-title">{{ t("layout.confirmButton") }}</h3>
    <div class="drawer-item">
      <span>{{ t("layout.confirmBgColor") }}</span>
      <span class="comp-style">
        <el-color-picker
          v-model="confirmBgColor"
          :predefine="predefineColors"
          @change="value => storeSettings.confirmBgColor = value"
        />
      </span>
    </div>
    <div class="drawer-item">
      <span>{{ t("layout.confirmTextColor") }}</span>
      <span class="comp-style">
        <el-color-picker
          v-model="confirmTextColor"
          :predefine="predefineColors"
          @change="value => storeSettings.confirmTextColor = value"
        />
      </span>
    </div>
    <div class="drawer-item">
      <span>{{ t("layout.confirmBgColorHover") }}</span>
      <span class="comp-style">
        <el-color-picker
          v-model="confirmBgColorHover"
          :predefine="predefineColors"
          @change="value => storeSettings.confirmBgColorHover = value"
        />
      </span>
    </div>
    <div class="drawer-item">
      <span>{{ t("layout.confirmTextColorHover") }}</span>
      <span class="comp-style">
        <el-color-picker
          v-model="confirmTextColorHover"
          :predefine="predefineColors"
          @change="value => storeSettings.confirmTextColorHover = value"
        />
      </span>
    </div>
    <h3 class="drawer-title">{{ t("layout.cancelButton") }}</h3>
    <div class="drawer-item">
      <span>{{ t("layout.cancelBgColor") }}</span>
      <span class="comp-style">
        <el-color-picker
          v-model="cancelBgColor"
          :predefine="predefineColors"
          @change="value => storeSettings.cancelBgColor = value"
        />
      </span>
    </div>
    <div class="drawer-item">
      <span>{{ t("layout.cancelTextColor") }}</span>
      <span class="comp-style">
        <el-color-picker
          v-model="cancelTextColor"
          :predefine="predefineColors"
          @change="value => storeSettings.cancelTextColor = value"
        />
      </span>
    </div>
    <div class="drawer-item">
      <span>{{ t("layout.cancelBgColorHover") }}</span>
      <span class="comp-style">
        <el-color-picker
          v-model="cancelBgColorHover"
          :predefine="predefineColors"
          @change="value => storeSettings.cancelBgColorHover = value"
        />
      </span>
    </div>
    <div class="drawer-item">
      <span>{{ t("layout.cancelTextColorHover") }}</span>
      <span class="comp-style">
        <el-color-picker
          v-model="cancelTextColorHover"
          :predefine="predefineColors"
          @change="value => storeSettings.cancelTextColorHover = value"
        />
      </span>
    </div>
    <el-divider />

    <h3 class="drawer-title">{{ t("layout.systemLayout") }}</h3>

    <div class="drawer-item">
      <span>{{ t("layout.open") }} TopNav</span>
      <span class="comp-style">
        <el-switch
          v-model="settingsStore.topNav"
          @change="topNavChange"
          class="drawer-switch"
        />
      </span>
    </div>

    <div class="drawer-item">
      <span>{{ t("layout.open") }} Tags-Views</span>
      <span class="comp-style">
        <el-switch v-model="settingsStore.tagsView" class="drawer-switch" />
      </span>
    </div>

    <div class="drawer-item">
      <span>{{ t("layout.fixed") }} Header</span>
      <span class="comp-style">
        <el-switch v-model="settingsStore.fixedHeader" class="drawer-switch" />
      </span>
    </div>

    <div class="drawer-item">
      <span>{{ t("layout.show") }} Logo</span>
      <span class="comp-style">
        <el-switch v-model="settingsStore.sidebarLogo" class="drawer-switch" />
      </span>
    </div>

    <div class="drawer-item">
      <span>{{ t("layout.dynamicHeadings") }}</span>
      <span class="comp-style">
        <el-switch v-model="settingsStore.dynamicTitle" class="drawer-switch" />
      </span>
    </div>

    <el-divider />

    <el-button type="primary" plain icon="DocumentAdd" @click="saveSetting">{{
      t("layout.save")
    }}</el-button>
    <el-button plain icon="Refresh" @click="resetSetting">{{
      t("layout.reset")
    }}</el-button>
  </el-drawer>
</template>

<script setup>
import variables from "@/assets/styles/variables.module.scss";
import axios from "axios";
import { ElLoading, ElMessage } from "element-plus";
import { useDynamicTitle } from "@/utils/dynamicTitle";
import useAppStore from "@/store/modules/app";
import useSettingsStore from "@/store/modules/settings";
import usePermissionStore from "@/store/modules/permission";
import { handleThemeStyle } from "@/utils/theme";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const { proxy } = getCurrentInstance();
const appStore = useAppStore();
const settingsStore = useSettingsStore();
const permissionStore = usePermissionStore();
const showSettings = ref(false);
const labelInputColor = ref(settingsStore.labelInputColor);
const disabledInputColor = ref(settingsStore.disabledInputColor);
const normalInputColor = ref(settingsStore.normalInputColor);
const cancelBgColor = ref(settingsStore.cancelBgColor);
const cancelBgColorHover = ref(settingsStore.cancelBgColorHover);
const cancelTextColor = ref(settingsStore.cancelTextColor);
const cancelTextColorHover = ref(settingsStore.cancelTextColorHover);
const confirmBgColor = ref(settingsStore.confirmBgColor);
const confirmBgColorHover = ref(settingsStore.confirmBgColorHover);
const confirmTextColor = ref(settingsStore.confirmTextColor);
const confirmTextColorHover = ref(settingsStore.confirmTextColorHover);
const exportBgColor = ref(settingsStore.exportBgColor);
const exportBgColorHover = ref(settingsStore.exportBgColorHover);
const exportTextColor = ref(settingsStore.exportTextColor);
const exportTextColorHover = ref(settingsStore.exportTextColorHover);
const theme = ref(settingsStore.theme);
const sideTheme = ref(settingsStore.sideTheme);
const tableStyle  = ref(settingsStore.tableStyle );
const tableHeaderBg  = ref(settingsStore.tableHeaderBg );
const tableLine  = ref(settingsStore.tableLine );
const tableRowBg  = ref(settingsStore.tableRowBg );
const tableRowCurrentBg  = ref(settingsStore.tableRowCurrentBg );
const tableRowCurrentColor  = ref(settingsStore.tableRowCurrentColor );
const tableRowStriped  = ref(settingsStore.tableRowStriped );
const tableTextColorHeader  = ref(settingsStore.tableTextColorHeader );
const tableTextColorRow  = ref(settingsStore.tableTextColorRow );
const tableTextColorStriped  = ref(settingsStore.tableTextColorStriped );
const storeSettings = computed(() => settingsStore);
const predefineColors = ref([
  "#409EFF",
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
]);

function setTableColor() {
  if(tableStyle.value ==='table-bright') {
    tableHeaderBg.value = '#e7e7e7',
    tableLine.value = '#eee',
    tableRowBg.value = '#f2f2f2',
    tableRowStriped.value = '#e7e7e7',
    tableTextColorHeader.value = '#222',
    tableTextColorRow.value = '#222',
    tableTextColorStriped.value = '#222',
    tableRowCurrentBg.value = '#d7d5dd',
    tableRowCurrentColor.value = '#222'
  } else if(tableStyle.value ==='table-colorful') {
    tableHeaderBg.value = '#409eff',
    tableLine.value = '#eee',
    tableRowBg.value = '#caf4ff',
    tableRowStriped.value = '#8fe6f7',
    tableTextColorHeader.value = '#fff',
    tableTextColorRow.value = '#222',
    tableTextColorStriped.value = '#222',
    tableRowCurrentBg.value = '#519aff',
    tableRowCurrentColor.value = '#222'
  } else {
    tableHeaderBg.value = '#a5a5a5',
    tableLine.value = '#dedede',
    tableRowBg.value = '#dbdbdb',
    tableRowStriped.value = '#ededed',
    tableTextColorHeader.value = '#fff',
    tableTextColorRow.value = '#222',
    tableTextColorStriped.value = '#222',
    tableRowCurrentBg.value = '#bebaba',
    tableRowCurrentColor.value = '#222'
  }
}
/** 是否需要topnav */
function topNavChange(val) {
  if (!val) {
    appStore.toggleSideBarHide(false);
    permissionStore.setSidebarRouters(permissionStore.defaultRoutes);
  }
}

function themeChange(val) {
  settingsStore.theme = val;
  handleThemeStyle(val);
}

function handleTheme(val) {
  sideTheme.value = val;
  settingsStore.sideTheme = val;
}
function handleTableStyle(val) {
  tableStyle.value = val;
  settingsStore.tableStyle = val;
  setTableColor()
}

function saveSetting() {
  proxy.$modal.loading(t("layout.tip1"));
  let layoutSetting = {
    topNav: storeSettings.value.topNav,
    tagsView: storeSettings.value.tagsView,
    fixedHeader: storeSettings.value.fixedHeader,
    sidebarLogo: storeSettings.value.sidebarLogo,
    dynamicTitle: storeSettings.value.dynamicTitle,
    tableStyle: storeSettings.value.tableStyle,
    tableTheme: storeSettings.value.tableTheme,
    theme: storeSettings.value.theme,
    sideTheme: storeSettings.value.sideTheme,
    labelInputColor: labelInputColor.value,
    disabledInputColor: disabledInputColor.value,
    normalInputColor: normalInputColor.value,
    confirmBgColor: confirmBgColor.value,
    confirmBgColorHover: confirmBgColorHover.value,
    confirmTextColor: confirmTextColor.value,
    confirmTextColorHover: confirmTextColorHover.value,
    cancelBgColor: cancelBgColor.value,
    cancelBgColorHover: cancelBgColorHover.value,
    cancelTextColor: cancelTextColor.value,
    cancelTextColorHover: cancelTextColorHover.value,
    exportBgColor: exportBgColor.value,
    exportBgColorHover: exportBgColorHover.value,
    exportTextColor: exportTextColor.value,
    exportTextColorHover: exportTextColorHover.value,
    tableHeaderBg: tableHeaderBg.value,
    tableLine: tableLine.value,
    tableRowBg: tableRowBg.value,
    tableRowStriped:  tableRowStriped.value,
    tableTextColorHeader: tableTextColorHeader.value,
    tableTextColorRow: tableTextColorRow.value,
    tableTextColorStriped: tableTextColorStriped.value,
    tableRowCurrentBg: tableRowCurrentBg.value,
    tableRowCurrentColor: tableRowCurrentColor.value,
  };
  localStorage.setItem("layout-setting", JSON.stringify(layoutSetting));
  setTimeout(proxy.$modal.closeLoading(), 1000);
  setTimeout("window.location.reload()", 1000);
}
function resetSetting() {
  proxy.$modal.loading(t("layout.tip2"));
  localStorage.removeItem("layout-setting");
  setTimeout("window.location.reload()", 1000);
}
function openSetting() {
  showSettings.value = true;
}

defineExpose({
  openSetting,
});
</script>

<style lang='scss' scoped>
.setting-drawer-title {
  margin-bottom: 12px;
  color: rgba(0, 0, 0, 0.85);
  line-height: 22px;
  font-weight: bold;
  .drawer-title {
    font-size: 14px;
  }
}
.setting-drawer-block-checbox {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;

  .setting-drawer-block-checbox-item {
    position: relative;
    margin-right: 16px;
    border-radius: 2px;
    cursor: pointer;

    img {
      width: 48px;
      height: 48px;
    }

    .custom-img {
      width: 48px;
      height: 38px;
      border-radius: 5px;
      box-shadow: 1px 1px 2px #898484;
    }

    .setting-drawer-block-checbox-selectIcon {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      padding-top: 15px;
      padding-left: 24px;
      color: #1890ff;
      font-weight: 700;
      font-size: 14px;
    }
  }
}

.drawer-item {
  color: rgba(0, 0, 0, 0.65);
  padding: 12px 0;
  font-size: 14px;

  .comp-style {
    float: right;
    margin: -3px 8px 0px 0px;
  }
}
</style>
