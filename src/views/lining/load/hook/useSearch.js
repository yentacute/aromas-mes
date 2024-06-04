import {reactive, ref} from 'vue'
import {shortcuts} from '@/utils'
import {listBrand} from "@/api/basic/brand.js";
import {listLoad, reqGetLoadDetails, reqGetLoadDetailsOptions} from "@/api/lining/load.js";

export default function useSearch() {
    // 查询的数据
    const formData = reactive({
        pageNum: 1,
        pageSize: 10,
        fileName: null,
        nickName: null,
        startTime: '',
        endTime: ''
    })
    const detailFormData = reactive({
        pageNum: 1,
        pageSize: 10,
        billId: '',
        supplierContrinerLoadNum: null,
        itemCode: null,
        season: null,
        businessEntityName: '',
        itemColor: '',
        lot: ''
    })
    // 表格数据
    const tableData = reactive({
        list: [],
        loadDetailsList: [],
        total: 0,
        detailsTotal: 0,
    })
    const time= ref([])
    const searchFormRef = ref()
    const detailFormRef = ref()
    const billId = ref('')
    const optionsList = ref([])
    //数据重载
    const reloadData = (type) => {
        if(type){
            formData.pageNum = 1
            formData.pageSize = 10
            time.value = []
        } else {
            detailFormData.pageNum = 1
            detailFormData.pageSize = 10
        }

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
        reloadData(1)
        loadData()
    }
    // 重置详情查询
    const resetDetailFormData = () => {
        if (detailFormRef.value) {
            detailFormRef.value.resetFields()
            detailFormRef.value.clearValidate()
        }
        for (const key in detailFormData) {
            if (Object.prototype.hasOwnProperty.call(detailFormData, key)) {
                detailFormData[key] = undefined
            }
        }
        reloadData(0)
        getLoadDetailsList()
    }
    // 查询
    const loadData = async () => {
        formData.startTime = time.value[0]
        formData.endTime = time.value[1]
        const {rows, total} = await listLoad(formData)
        tableData.list = rows
        tableData.total = total
    }
    // 获取装柜详情
    const getLoadDetailsList = async () => {
        detailFormData.billId = billId.value
        const {rows, total} = await reqGetLoadDetails({...detailFormData})
        tableData.loadDetailsList = rows
        tableData.detailsTotal = total
    }

    // 获取详情下拉列表
    const getOptions = async(type) => {
       const {data} =  await reqGetLoadDetailsOptions({type: type})
        optionsList.value = data
        console.log(data)
    }
    return {
        formData,
        loadData,
        searchFormRef,
        resetData,
        tableData,
        reloadData,
        time,
        getLoadDetailsList,
        billId,
        detailFormData,
        resetDetailFormData,
        detailFormRef,
        getOptions,
        optionsList
    };
}
