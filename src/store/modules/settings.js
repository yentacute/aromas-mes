import defaultSettings from '@/settings'
import { useDynamicTitle } from '@/utils/dynamicTitle'
import { defineStore } from 'pinia'

const { sideTheme, showSettings, topNav, tagsView, fixedHeader, sidebarLogo, dynamicTitle, tableStyle } = defaultSettings

const storageSetting = JSON.parse(localStorage.getItem('layout-setting')) || {}

// Function to apply CSS variables
function applyCSS(storageSetting) {
  const cssVariables = {
    '--el-disabled-input-bg-color': storageSetting.disabledInputColor || '#ededed',
    '--el-normal-input': storageSetting.normalInputColor || '#ffffff',
    '--el-input-label-color': storageSetting.labelInputColor || '#333333',
    '--el-input-bg-color': storageSetting.normalInputColor || '#ffffff',
    '--el-confirm-button': storageSetting.confirmBgColor || '#409EFF',
    '--el-confirm-button-hover': storageSetting.confirmBgColorHover || '#79bbff',
    '--el-confirm-text-color': storageSetting.confirmTextColor || '#ffffff',
    '--el-confirm-text-color-hover': storageSetting.confirmTextColorHover || '#ffffff',
    '--el-cancel-button': storageSetting.cancelBgColor || '#bebebe',
    '--el-cancel-button-hover': storageSetting.cancelBgColorHover || '#dcdfe6',
    '--el-cancel-text-color': storageSetting.cancelTextColor || '#ffffff',
    '--el-cancel-text-color-hover': storageSetting.cancelTextColorHover || '#ffffff',
    '--el-export-button-bg': storageSetting.exportBgColor || '#fdf6ec',
    '--el-export-button-bg-hover': storageSetting.exportBgColorHover || '#e6a23c',
    '--el-export-text-color': storageSetting.exportTextColor || '#e6a23c',
    '--el-export-text-color-hover': storageSetting.exportTextColorHover || '#ffffff',
    '--table-border-color': storageSetting.tableLine || '#dedede',
    '--table-text-color': storageSetting.tableTextColorRow || '#222',
    '--table-text-color-striped': storageSetting.tableTextColorStriped || '#222',
    '--table-header-text-color': storageSetting.tableTextColorHeader || '#222',
    '--table-row-hover-bg-color': storageSetting.tableRowCurrentBg || '#bebaba',
    '--table-row-hover-text-color': storageSetting.tableRowCurrentColor || '#222',
    '--table-row-striped-bg-color': storageSetting.tableRowStriped || '#ededed',
    '--table-header-bg-color': storageSetting.tableHeaderBg || '#a5a5a5',
    '--table-row-bg-color': storageSetting.tableRowBg || '#dbdbdb'
  }

  for (const [key, value] of Object.entries(cssVariables)) {
    document.documentElement.style.setProperty(key, value)
  }
}

applyCSS(storageSetting)

const useSettingsStore = defineStore(
  'settings',
  {
    state: () => ({
      title: '',
      theme: storageSetting.theme || '#409EFF',
      sideTheme: storageSetting.sideTheme || sideTheme,
      tableStyle: storageSetting.tableStyle || tableStyle,
      showSettings,
      topNav: storageSetting.topNav ?? topNav,
      tagsView: storageSetting.tagsView ?? tagsView,
      fixedHeader: storageSetting.fixedHeader ?? fixedHeader,
      sidebarLogo: storageSetting.sidebarLogo ?? sidebarLogo,
      dynamicTitle: storageSetting.dynamicTitle ?? dynamicTitle,
      loading: false,
      labelInputColor: storageSetting.labelInputColor,
      disabledInputColor: storageSetting.disabledInputColor,
      normalInputColor: storageSetting.normalInputColor,
      confirmBgColor: storageSetting.confirmBgColor,
      confirmBgColorHover: storageSetting.confirmBgColorHover,
      confirmTextColor: storageSetting.confirmTextColor,
      confirmTextColorHover: storageSetting.confirmTextColorHover,
      cancelBgColor: storageSetting.cancelBgColor,
      cancelBgColorHover: storageSetting.cancelBgColorHover,
      cancelTextColor: storageSetting.cancelTextColor,
      cancelTextColorHover: storageSetting.cancelTextColorHover,
      exportBgColor: storageSetting.exportBgColor,
      exportBgColorHover: storageSetting.exportBgColorHover,
      exportTextColor: storageSetting.exportTextColor,
      exportTextColorHover: storageSetting.exportTextColorHover,
      tableHeaderBg: storageSetting.tableHeaderBg || '#a5a5a5',
      tableLine: storageSetting.tableLine || '#dedede',
      tableRowBg: storageSetting.tableRowBg || '#dbdbdb',
      tableRowStriped:  storageSetting.tableRowStriped || '#ededed',
      tableTextColorHeader: storageSetting.tableTextColorHeader || '#222',
      tableTextColorRow: storageSetting.tableTextColorRow || '#222',
      tableTextColorStriped: storageSetting.tableTextColorStriped || '#222',
      tableRowCurrentBg: storageSetting.tableRowCurrentBg || '#bebaba',
      tableRowCurrentColor: storageSetting.tableRowCurrentColor || '#222',
    }),
    actions: {
      changeSetting(data) {
        const { key, value } = data
        if (this.hasOwnProperty(key)) {
          this[key] = value
        }
      },
      setTitle(title) {
        this.title = title
        useDynamicTitle()
      },
      changeLoading(data) {
        this.loading = data
      },
      addProperties(storageSetting) {
        applyCSS(storageSetting)
      }
    }
  })

export default useSettingsStore