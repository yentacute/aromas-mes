import { reactive, ref,computed } from 'vue'
import {
    ElMessage
} from "element-plus"
import { requiredCheck } from "@/utils/verify";
import {useI18n} from "vue-i18n";
import {addBrand, getBrand, updateBrand} from "@/api/basic/brand.js";
export default function useUpdate() {
    const {t} = useI18n()
    // 添加表单
    const updateFormData = reactive({
        brandCode: null,
        brandName: null,
        brandFullName: null,
        brandEnName: null,
        packageRequest: null,
        shippingMark: null,
        remark: null,
        disable: 0,

    })
    const updateFormRef = ref()
    const updateFormRules = reactive({
        brandCode: requiredCheck(  t('brandInfo.brand_code') + t('brandInfo.input_tip1')),
        brandName: requiredCheck(  t('brandInfo.abbreviation') + t('brandInfo.input_tip1')),
    })
    const title =ref('')
    const disabled =ref(false)
    const isDetails = ref(false)
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
                    await  updateBrand(updateFormData)
                } else {//添加
                    await  addBrand(updateFormData)
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
    const openHandle= async (row, id) => {
        title.value = isDetails.value ? t('check_details') : row && id ? t('edit') + t('brandInfo.brand') : t('add') + t('brandInfo.brand')
        disabled.value = !!(row && id)
        resetForm()
        showHandle.value = true
        if (Boolean(id)) {//编辑赋值
            const {data} = await getBrand(id)
            for (let key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    updateFormData[key] = data[key]
                }
            }

        }
        updateFormData.createTime = undefined
        updateFormData.updateTime = undefined
        updateFormData.createNickName = undefined
        updateFormData.updateNickName = undefined
        updateFormData.updateNickName = undefined
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
    const closeHandle = () => {
        showHandle.value = false
        isDetails.value = false
        disabled.value = false
        resetForm()
    }
    /**
     * 查看详情
     */
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
        isDetails,
        handleCheckDetail
    };
}
