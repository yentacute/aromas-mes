import { reactive, ref,computed } from 'vue'
import {
    ElMessage
} from "element-plus"
import { requiredCheck } from "@/utils/verify";
import {useI18n} from "vue-i18n";
import {addFabric, updateFabric} from "@/api/lining/fabric.js";
import {addAccessoriesColor, updateAccessoriesColor} from "@/api/basic/accessoriesColor.js";
import {addFabricColor, updateFabricColor} from "@/api/basic/fabricColor.js";
export default function useUpdate() {
    const {t} = useI18n()
    // 添加表单
    const updateFormData = reactive({
        colorCode: null,
        colorName: null,
        sixteenDigitColor: null,
        remark: null,
        modifyId: null,
        modifyName: null,
        modifyTime: null,
        notDelete: null,
        notEdit: null,
        disable: null,
        companyId: null
    })
    const updateFormRef = ref()
    const updateFormRules = reactive({
        colorCode: requiredCheck(  '颜色编码不能为空'),
        colorName: requiredCheck(  '颜色名称不能为空'),
    })
    const title =ref('')
    const disabled =ref(false)
    //提交
    const submit = async () => {
        return new Promise(async (resolve, reject) => {
            if (!updateFormRef.value) {
                reject(false)
                return
            }
            try {
                await updateFormRef.value.validate()
                if (updateFormData.id) { //编辑
                    await  updateFabricColor(updateFormData)
                } else {//添加
                    await  addFabricColor(updateFormData)
                }
                closeHandle()
                ElMessage({
                    type: 'success',
                    message: t('operate_success')
                })
                resolve(true)
            } catch (error) {
                reject(error)
                throw error
            }
        })
    }

    //打开弹窗
    const showHandle = ref(false)
    const openHandle= (row, id) => {
        title.value = row && id ? '修改面料色号' :'新增面料色号'
        disabled.value = !!(row && id)
        resetForm()
        showHandle.value = true
        if (Boolean(id)) {//编辑赋值
            for (let key in row) {
                if (Object.prototype.hasOwnProperty.call(row, key)) {
                    updateFormData[key] = row[key]
                }
            }

        }
        // updateFormData.createTime = undefined
        // updateFormData.updateTime = undefined
        // updateFormData.createNickName = undefined
        // updateFormData.updateNickName = undefined
        // updateFormData.updateNickName = undefined
        updateFormData.disable = 0
    }
    //重置表单
    const resetForm = () => {
        if (updateFormRef.value) {
            updateFormRef.value.resetFields()
            updateFormRef.value.clearValidate()
        }
        for (let key in updateFormData) {
            updateFormData[key] = undefined
        }
        updateFormData.disable = 0
    }
    //关闭弹窗
    const closeHandle= () => {
        showHandle.value = false
        resetForm()
    }
    return {
        updateFormData,
        updateFormRef,
        updateFormRules,
        submit,
        showHandle,
        openHandle,
        closeHandle,
        title,
        disabled
    };
}
