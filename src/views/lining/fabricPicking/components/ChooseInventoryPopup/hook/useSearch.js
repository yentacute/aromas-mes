import {reactive, ref} from 'vue'

import {listBrand} from "@/api/basic/brand.js";
import {reqGetSelectStockFabric} from "@/api/lining/fabricPicking.js";

export default function useSearch() {
    // 查询的数据
    const formData = reactive({
        pageSize: 10,
        pageNum: 1,
        // time: shortcuts[3].value(),
        fabricCode: null,
        colorName: null,
        width: null,
        lot: null,
        styleNo: null,
        startTime: '',
        endTime: '',
        eliminateIds: '',
    })
    // 表格数据
    const tableData = reactive({
        list: [],
        total: 0
    })
    const time = ref([])
    const searchFormRef = ref()
    //数据重载
    const reloadData = () => {
        formData.pageNum = 1
        formData.pageSize = 10
        time.value = []
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
        formData.startTime = time.value[0]
        formData.endTime = time.value[1]
        const {rows, total} = await reqGetSelectStockFabric(formData)
        tableData.list = rows
        tableData.total = total
    }
    return {
        formData,
        loadData,
        searchFormRef,
        resetData,
        tableData,
        reloadData,
        time
    };
}
