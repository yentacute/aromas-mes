import {reactive, ref} from 'vue'
import {
    ElMessage
} from "element-plus"
import {requiredCheck} from "@/utils/verify";
import {useI18n} from "vue-i18n";
import {
    addFabricPicking, getFabricPicking,
    reqGetBusinessUnits,
    reqGetFabricPickingOrder
} from "@/api/lining/fabricPicking.js";

export default function useUpdate() {
    const {t} = useI18n()
    // 添加表单
    const updateFormData = reactive({
        billNo: null, // 领料单号
        billStatus: 'draft', // 单据状态
        billDate: '', // 	单据日期
        materialType: null, // 物料分类
        handler: null, //经手人
        requiredTime: '', // 	需求日期
        remark: null,
        businessType: 'department', //业务类型
        businessEntityId: null, // 业务单位ID
        refBillNo: null, // 引用单据号
        wmsFabricPickingEntityDtos: [{
            rowId: '', // 行号
        id: undefined,
        stockEntityId: '', // 选择库存的id
        arriveItemId: '',
        qrcode:'',
        lot: '',
        roll: '',
        materialId: '',
        fabricCode: '',
        materialColorId: '',
        quantity: '',
        unitId: '', // 单位
        styleId: '',
        remark: '',
        }
        ], // 库存

    })
    const updateFormRef = ref()
    const updateFormRules = reactive({
        businessType: requiredCheck(t('wmsPicking.sourceType') + t('cannot_empty')),
        businessEntityId: requiredCheck(t('wmsPicking.source') + t('cannot_empty')),
    })
    const wmsFabricPickingEntityDtos = ref([])
    const businessUnitsList = ref([])
    //提交
    const submit = async () => {
        return new Promise(async (resolve, reject) => {
            if (!updateFormRef.value) {
                reject(false)
                return
            }
            try {
                await updateFormRef.value.validate()
                if (!updateFormData.wmsFabricPickingEntityDtos.length) {
                    return ElMessage.warning(t('stockFabric.fabricName') + t('cannot_empty'))
                }
                console.log(businessUnitsList.value,77)
                updateFormData.businessEntityName = businessUnitsList.value.find(item => item.sourceId === updateFormData.businessEntityId)?.sourceName
                formatFabricPickingEntityDtos()
                await addFabricPicking(updateFormData)
                resetForm()
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

    const openHandle = async (id) => {
        resetForm()
        if (Boolean(id)) {//编辑赋值
            const {data} = await getFabricPicking({id})
            for (let key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    updateFormData[key] = data[key]
                }
            }
            updateFormData.wmsFabricPickingEntityDtos = data.details
            updateFormData.details = undefined

        }
        updateFormData.createTime = undefined
        updateFormData.updateTime = undefined
        updateFormData.createNickName = undefined
        updateFormData.updateNickName = undefined
        updateFormData.updateNickName = undefined
        // updateFormData.disable = 0
        await nextTick()
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
        updateFormData.billStatus = 'draft'
        updateFormData.businessType = 'department'
        updateFormData.billDate = new Date()
        updateFormData.requiredTime = new Date()
        updateFormData.wmsFabricPickingEntityDtos = [
        //     {
        //     rowId: '', // 行号
        //     id: undefined,
        //     stockEntityId: '', // 选择库存的id
        //     arriveItemId: '',
        //     qrcode:'',
        //     lot: '',
        //     roll: '',
        //     materialId: '',
        //     fabricCode: '',
        //     materialColorId: '',
        //     quantity: '',
        //     unitId: '', // 单位
        //     styleId: '',
        //     remark: '',
        // }
        ]
    }
    // 获取带*单据号
    const getFabricPickingOrder = async () => {
        const {msg} = await reqGetFabricPickingOrder()
        updateFormData.billNo = msg
    }
    // 获取领料单位
    const getBusinessUnits = async (e) => {
        const {data} = await reqGetBusinessUnits({businessType: e})
        businessUnitsList.value = data
    }
    // 格式化库存
    const formatFabricPickingEntityDtos = () => {
        updateFormData.wmsFabricPickingEntityDtos = updateFormData.wmsFabricPickingEntityDtos?.map(item => {
            return {
                rowId: item.rowId, // 行号
                id: item.id,
                stockEntityId: item.fabricWarehouseEntityId, // 选择库存的id
                arriveItemId: item.fabricArriveEntityId,
                qrcode: item.qrcode,
                lot: item.lot,
                roll: item.roll,
                materialId: item.fabricId,
                fabricCode: item.fabricCode,
                materialColorId: item.colorId,
                quantity: item.quantity,
                unitId: item.unitId, // 单位
                styleId: item.styleId,
                remark: item.remark,
            }
        })
    }
    return {
        updateFormData,
        updateFormRef,
        updateFormRules,
        submit,
        openHandle,
        wmsFabricPickingEntityDtos,
        getFabricPickingOrder,
        getBusinessUnits,
        businessUnitsList,
        resetForm
    };
}
