import { listFabricInspection, getMachineNo, getDict } from "@/api/lining/fabric_inspection.js";
import { ElMessage } from 'element-plus'

const useFabricInspection = defineStore(
  'fabric-inspection',
  {
    state: () => ({
      errorsData: [],
      showPopupPoints: false,
      positionNumber: 1,
      showPopupRollData: false,
      rollDetailsData: {},
      rollLists: [],
      filterErrorsData: [],
      paginationData: {
        pageNum: 1,
        pageSize: 10
      },
      totalItems: null,
      loading: true,
      machineLists: [],
      scanValue: '',
      dict_list: [],
      selectedValue: '',
      listFabricBody: {
        "qrcode": "",
        "lot": "",
        "roll": "",
        "itemColor": "",
        "itemCode": ""
      }
    }),
    getters: {
      isRollDetailsDataEmpty: (state) => {
        return Object.keys(state.rollDetailsData).length === 0;
      }
    },
    actions: {
      async getListFabricInspection() {
        try {
          this.loading = true; 
          const response = await listFabricInspection(this.paginationData, this.listFabricBody);
          const { total, rows } = response;
          this.totalItems = total;
          this.rollLists = rows;
        } catch (error) {
          console.error(error);
        } finally {
          this.loading = false; 
        }
      },
      async getMachineData() {
        try {
          const response = await getMachineNo();
          const { data } = response;
          this.machineLists = data;
        } catch (error) {
          ElMessage({
            type: "error",
            message: t('fabricInpsection.error_machine_data')
          });
        }        
      },
      async getDictList() {
        try {
          const response = await getDict();
          const { data } = response;
          this.selectedValue = data[0].dictValue;
          this.dict_list = data;
        } catch (error) {
          ElMessage({
            type: "error",
            message: t('error')
          });
        }        
      }
    }
  })

export default useFabricInspection
