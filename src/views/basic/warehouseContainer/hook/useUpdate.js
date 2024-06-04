import { reactive, ref,computed } from 'vue'
import {
    ElMessage
} from "element-plus"
import { requiredCheck } from "@/utils/verify";
import {useI18n} from "vue-i18n";
import {
    reqGetAllWarehouseALocation,
} from "@/api/basic/warehouseLocation.js";
import {
    addWarehouseContainer,
    getWarehouseContainer,
    updateWarehouseContainer
} from "@/api/basic/warehouseContainer.js";
export default function useUpdate() {
    const {t} = useI18n()
    // 添加表单
    const updateFormData = reactive({
        containerCode: null,
        containerType: null,
        warehouseId: null,
        warehourseLocationId: null,
        containerDescription: null,
        remark: null,
    })
    const updateFormRef = ref()
    const updateFormRules = reactive({
        containerCode: requiredCheck(  t('warehouseContainer.containerCode') + t('cannot_empty')),
        containerType: requiredCheck(  t('warehouseContainer.containerType') + t('cannot_empty')),
        warehouseId: requiredCheck(  t('warehouseContainer.warehouseName') + t('cannot_empty')),
        // warehourseLocationId: requiredCheck(  t('warehouseContainer.locationName') + t('cannot_empty')),
    })
    const title =ref('')
    const disabled =ref(false)
    const warehouseLocationOptions = ref([])
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
                    await  updateWarehouseContainer(updateFormData)
                } else {//添加
                    await  addWarehouseContainer(updateFormData)
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
        title.value = isDetails.value ? t('check_details') :  row && id ? t('edit') + t('warehouseContainer.warehouseContainer') :t('add') + t('warehouseContainer.warehouseContainer')
        disabled.value = !!(row && id)
        resetForm()
        showHandle.value = true
        // updateFormData.isVirtual = 0
        // updateFormData.isAllowNegativeStock = 0
        // updateFormData.enableStorageLocation = 0
        if (Boolean(id)) {//编辑赋值
            const {data} = await getWarehouseContainer({id})
            await getAllWarehouseLocation()
            for (let key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    updateFormData[key] = data[key]
                }
            }
        }
        // updateFormData.notDelete = undefined
        // updateFormData.notEdit = undefined
        // updateFormData.createTime = undefined
        // updateFormData.createName = undefined
        // updateFormData.modifyName = undefined
        // updateFormData.modifyTime = undefined
        // updateFormData.disable = undefined
        // updateFormData.materialCategoryName = undefined
        // updateFormData.groupName = undefined
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
    }
    // 查看详情
    const handleCheckDetail = (row) => {
        isDetails.value = true
        openHandle(row,row.id)
    }
    const getAllWarehouseLocation = async() => {
        const {data} = await reqGetAllWarehouseALocation({
            disable:0,
            warehouseId:updateFormData.warehouseId
        })
        warehouseLocationOptions.value = data
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
        isDetails,
        getAllWarehouseLocation,
        warehouseLocationOptions
    };
}
