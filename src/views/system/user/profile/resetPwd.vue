<template>
   <el-form ref="pwdRef" :model="user" :rules="rules" >
      <el-form-item :label="t('user.oldPassword')" prop="oldPassword">
         <el-input v-model="user.oldPassword" :placeholder="t('input') + t('user.oldPassword')" type="password" show-password />
      </el-form-item>
      <el-form-item :label="t('user.newPassword')" prop="newPassword">
         <el-input v-model="user.newPassword" :placeholder="t('input') + t('user.newPassword')" type="password" show-password />
      </el-form-item>
      <el-form-item :label="t('user.confirmPassword')" prop="confirmPassword">
         <el-input v-model="user.confirmPassword" :placeholder="t('input') + t('user.confirmPassword')" type="password" show-password/>
      </el-form-item>
      <el-form-item>
      <el-button type="primary" class="btn-confirm" @click="submit">{{t('user.confirmPassword')}}</el-button>
      <el-button type="danger" @click="close">{{t('close')}}</el-button>
      </el-form-item>
   </el-form>
</template>

<script setup>
import { updateUserPwd } from "@/api/system/user";
import {useI18n} from "vue-i18n";
const {t} = useI18n()
const { proxy } = getCurrentInstance();

const user = reactive({
  oldPassword: undefined,
  newPassword: undefined,
  confirmPassword: undefined
});

const equalToPassword = (rule, value, callback) => {
  if (user.newPassword !== value) {
    callback(new Error(t('user.tip11')));
  } else {
    callback();
  }
};
const rules = ref({
  oldPassword: [{ required: true, message: t('user.oldPassword') + t('cannot_empty'), trigger: "blur" }],
  newPassword: [{ required: true, message: t('user.newPassword') + t('cannot_empty'), trigger: "blur" }, { min: 6, max: 20, message: t('user.tip12'), trigger: "blur" }, { pattern: /^[^<>"'|\\]+$/, message: "不能包含非法字符：< > \" ' \\\ |", trigger: "blur" }],
  confirmPassword: [{ required: true, message: t('user.confirmPassword') + t('cannot_empty'), trigger: "blur" }, { required: true, validator: equalToPassword, trigger: "blur" }]
});

/** 提交按钮 */
function submit() {
  proxy.$refs.pwdRef.validate(valid => {
    if (valid) {
      updateUserPwd(user.oldPassword, user.newPassword).then(response => {
        proxy.$modal.msgSuccess(t('edit') +t('success') );
      });
    }
  });
};
/** 关闭按钮 */
function close() {
  proxy.$tab.closePage();
};
</script>
