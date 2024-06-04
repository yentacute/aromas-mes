import {reactive, ref} from 'vue'
import {reqGetAllStoreGroup} from "@/api/basic/storeGroup.js";
import {listWarehouse,reqGetAllMaterialCategory} from "@/api/basic/warehouse.js";

export default function useSearch() {
    // 查询的数据
    const formData = reactive({
        pageSize: 10,
        pageNum: 1,
        // time: shortcuts[3].value(),
        warehouseName: null,
        disable: 0
    })
    // 表格数据
    const tableData = reactive({
        list: [],
        total: 0
    })
    const searchFormRef = ref()
    // const storeGroupOptions = ref([])
    const materialCategoryOptions = ref([])
    //数据重载
    const reloadData = () => {
        formData.pageNum = 1
        formData.pageSize = 10
        formData.disable = 0
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
        const {rows,total} = await listWarehouse(formData)
        tableData.list = rows
        tableData.total = total
    }
    const getOption = async() => {
        // const [storeGroupRes,materialCategoryRes] = await Promise.all([
        //     // reqGetAllStoreGroup(),
        //     reqGetAllMaterialCategory()
        // ])
        // storeGroupOptions.value = storeGroupRes.data
        const {data} = await reqGetAllMaterialCategory()
        materialCategoryOptions.value = data
    }
    return {
        formData,
        loadData,
        searchFormRef,
        resetData,
        tableData,
        reloadData,
        // storeGroupOptions,
        materialCategoryOptions,
        getOption
    };
}
