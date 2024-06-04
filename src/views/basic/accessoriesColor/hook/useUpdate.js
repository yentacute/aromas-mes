import { reactive, ref } from 'vue'
import {
    ElMessage
} from "element-plus"
import { requiredCheck } from "@/utils/verify";
import {useI18n} from "vue-i18n";
import {addAccessoriesColor, getAccessoriesColor, updateAccessoriesColor} from "@/api/basic/accessoriesColor.js";
export default function useUpdate() {
    const {t} = useI18n()
    // 添加表单
    const updateFormData = reactive({
        colorCode: null,
        colorName: null,
        sixteenDigitColor: null,
        remark: null,
    })
    const updateFormRef = ref()
    const updateFormRules = reactive({
        colorCode: requiredCheck(  t('colorLibrary.colorCode') + t('cannot_empty')),
        colorName: requiredCheck(  t('colorLibrary.colorName') + t('cannot_empty')),
    })
    const title =ref('')
    const disabled =ref(false)
    const colorList  = ref([])
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
                    await  updateAccessoriesColor(updateFormData)
                } else {//添加
                    colorList.value.push(updateFormData)
                    await  addAccessoriesColor(colorList.value)
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
    const isDetails = ref(false)
    const openHandle= async (row, id) => {
        title.value = isDetails.value ? t('check_details'):  row && id ? t('edit') + t('colorLibrary.accessory_color') :t('add') + t('colorLibrary.accessory_color')
        disabled.value = !!(row && id)
        resetForm()
        showHandle.value = true
        if (Boolean(id)) {//编辑赋值
            const {data} = await getAccessoriesColor({id})
            for (let key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    updateFormData[key] = data[key]
                }
            }
        }
        // updateFormData.createTime = undefined
        // updateFormData.updateTime = undefined
        // updateFormData.createNickName = undefined
        // updateFormData.updateNickName = undefined
        // updateFormData.updateNickName = undefined
        // updateFormData.disable = 0
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
        // updateFormData.disable = 0
    }
    //关闭弹窗
    const closeHandle= () => {
        showHandle.value = false
        isDetails.value = false
        resetForm()
        colorList.value = []
    }
    // 查看详情
    const handleCheckDetail = (row) => {
        isDetails.value = true
        openHandle(row,row.id)
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
        disabled,
        handleCheckDetail,
        colorList,
        isDetails
    };
}
