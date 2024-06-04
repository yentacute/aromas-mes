 <template>
   <el-form ref="userRef" :model="form" :rules="rules">
      <el-form-item :label="t('user.nickName')" prop="nickName">
         <el-input v-model="form.nickName" maxlength="30" />
      </el-form-item>
      <el-form-item :label="t('user.phonenumber')" prop="phonenumber">
         <el-input v-model="form.phonenumber" maxlength="11" />
      </el-form-item>
      <el-form-item :label="t('user.email')" prop="email">
         <el-input v-model="form.email" maxlength="50" />
      </el-form-item>
      <el-form-item :label="t('user.sex')">
         <el-radio-group v-model="form.sex">
            <el-radio label="0">{{t('user.man')}}</el-radio>
            <el-radio label="1">{{t('user.woman')}}</el-radio>
         </el-radio-group>
      </el-form-item>
      <el-form-item>
      <el-button type="primary" class="btn-confirm" @click="submit">{{t('confirm')}}</el-button>
      <el-button type="danger" @click="close">{{t('close')}}</el-button>
      </el-form-item>
   </el-form>
</template>

<script setup>
import { updateUserProfile } from "@/api/system/user";
import {useI18n} from "vue-i18n";
const {t} = useI18n()
const props = defineProps({
  user: {
    type: Object
  }
});

const { proxy } = getCurrentInstance();

const form = ref({});
const rules = ref({
  nickName: [{ required: true, message: t('user.nickName') + t('cannot_empty'), trigger: "blur" }],
  email: [{ required: true, message: t('user.email') + t('cannot_empty'), trigger: "blur" }, { type: "email", message: t('user.tip2'), trigger: ["blur", "change"] }],
  phonenumber: [{ required: true, message: t('user.phonenumber') + t('cannot_empty'), trigger: "blur" }, { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: t('user.tip3'), trigger: "blur" }],
});

/** 提交按钮 */
function submit() {
  proxy.$refs.userRef.validate(valid => {
    if (valid) {
      updateUserProfile(form.value).then(response => {
        proxy.$modal.msgSuccess(t('edit') + t('success'));
        props.user.phonenumber = form.value.phonenumber;
        props.user.email = form.value.email;
      });
    }
  });
};

/** 关闭按钮 */
function close() {
  proxy.$tab.closePage();
};

// 回显当前登录用户信息
watch(() => props.user, user => {
  if (user) {
    form.value = { nickName: user.nickName, phonenumber: user.phonenumber, email: user.email, sex: user.sex };
  }
},{ immediate: true });
</script>
