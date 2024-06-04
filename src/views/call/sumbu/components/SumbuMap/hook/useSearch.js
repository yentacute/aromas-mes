import {reactive, ref} from 'vue'
import {listAccessoriesColor} from "@/api/basic/accessoriesColor.js";
import {
    reqGetRaabFabricColorList,
    reqGetRaabFabricList,
    reqGetRaabFabricLot,
    reqGetRaabLocationId
} from "@/api/call/sumbu.js";
import {requiredCheck} from "@/utils/verify.js";
import {useI18n} from "vue-i18n";

export default function useSearch() {
    const { t } = useI18n()
    // 查询的数据
    const formData = reactive({
        // pageSize: 10,
        // pageNum: 1,
        // time: shortcuts[3].value(),
        fabricId: '',
        colorId: '',
        lot: '',
    })

    const searchFormRef = ref()
    const searchFormRules = reactive({
        fabricId: requiredCheck(t('cannot_empty')),
        colorId: requiredCheck(t('cannot_empty')),
        lot: requiredCheck(t('cannot_empty')),
    })
    const locationList = ref([])
    const fabricColorList = ref([])
    const fabricLotList = ref([])
    const fabricList = ref([])
    //数据重载
    const reloadData = () => {
        formData.fabricCode = ''
        formData.colorId = ''
        formData.lot = ''
    }
    // 重置
    const resetData = () => {
        if (searchFormRef.value) {
            searchFormRef.value.resetFields()
            searchFormRef.value.clearValidate()
        }
        for (const key in formData) {
            if (Object.prototype.hasOwnProperty.call(formData, key)) {
                formData[key] = undefined
            }
        }
        reloadData()
        loadData()
    }
    // 查询
    const loadData = async () => {
        const {data} = await reqGetRaabLocationId({
            ...formData,
            // fabricCode:undefined,
            // fabricId:fabricList.value.find(item => item.fabricCode === formData.fabricCode).fabricId
        })
        locationList.value = data
    }
    const getRaabFabricList = async (e) => {
        const {data} = await reqGetRaabFabricList({fabricCode: e})
        fabricList.value = data
    }
    const getRaabFabricColorList = async (e) => {
        const {data} = await reqGetRaabFabricColorList({fabricId: formData.fabricId,colorCode:e})
        fabricColorList.value = data
    }
    const getRaabFabricLotList = async (e) => {
        const {data} = await reqGetRaabFabricLot({
            ...formData,
            lot: e || formData.lot
        })
        fabricLotList.value = data.map(item => {
            return {
                label: item,
                value: item
            }

        })
    }
    return {
        formData,
        loadData,
        searchFormRef,
        resetData,
        locationList,
        reloadData,
        getRaabFabricList,
        fabricList,
        getRaabFabricColorList,
        fabricColorList,
        getRaabFabricLotList,
        fabricLotList,
        searchFormRules
    };
}
