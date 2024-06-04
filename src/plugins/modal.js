import { ElMessage, ElMessageBox, ElNotification, ElLoading } from 'element-plus'
import i18n from "@/lang/lang.js";


let loadingInstance;
export default {
  // 消息提示
  msg(content) {
    ElMessage.info(content)
  },
  // 错误消息
  msgError(content) {
    ElMessage.error(content)
  },
  // 成功消息
  msgSuccess(content) {
    ElMessage.success(content)
  },
  // 警告消息
  msgWarning(content) {
    ElMessage.warning(content)
  },
  // 弹出提示
  alert(content) {
    ElMessageBox.alert(content, i18n.global.t('system_hint'))
  },
  // 错误提示
  alertError(content) {
    ElMessageBox.alert(content, i18n.global.t('system_hint'), { type: 'error' })
  },
  // 成功提示
  alertSuccess(content) {
    ElMessageBox.alert(content, i18n.global.t('system_hint'), { type: 'success' })
  },
  // 警告提示
  alertWarning(content) {
    ElMessageBox.alert(content, i18n.global.t('system_hint'), { type: 'warning' })
  },
  // 通知提示
  notify(content) {
    ElNotification.info(content)
  },
  // 错误通知
  notifyError(content) {
    ElNotification.error(content);
  },
  // 成功通知
  notifySuccess(content) {
    ElNotification.success(content)
  },
  // 警告通知
  notifyWarning(content) {
    ElNotification.warning(content)
  },
  getTip(){
    return t('system_hint')
  },
  // 确认窗体
  confirm(content) {
    return ElMessageBox.confirm(content, i18n.global.t('system_hint'), {
      confirmButtonText: i18n.global.t('confirm'),
      cancelButtonText: i18n.global.t('cancel'),
      type: "warning",
    })
  },
  // 提交内容
  prompt(content) {
    return ElMessageBox.prompt(content, i18n.global.t('system_hint'), {
      confirmButtonText: i18n.global.t('confirm'),
      cancelButtonText: i18n.global.t('cancel'),
      type: "warning",
    })
  },
  // 打开遮罩层
  loading(content) {
    loadingInstance = ElLoading.service({
      lock: true,
      text: content,
      background: "rgba(0, 0, 0, 0.7)",
    })
  },
  // 关闭遮罩层
  closeLoading() {
    loadingInstance.close();
  }
}
