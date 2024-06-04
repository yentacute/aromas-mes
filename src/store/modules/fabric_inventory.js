import { listInventoryReports } from "@/api/lining/fabric_inventory.js";
import { ElMessage } from 'element-plus'

const useFabricInventory = defineStore(
  'fabric-inventory-report',
  {
    state: () => ({
      totalItems: 0,
      dataArr: [],
      loading: false,
      paginationData: {
        pageNum: 1,
        pageSize: 10
      },
    }),
    actions: {
      async getInventoryListReports(params) {
        try {
          this.loading = true; 
          const response = await listInventoryReports(params);
          const { total, rows } = response;
          this.totalItems = total;
          this.dataArr = rows;
        } catch (error) {
          console.error(error);
        } finally {
          this.loading = false; 
        }
      }
    }
  })

export default useFabricInventory
