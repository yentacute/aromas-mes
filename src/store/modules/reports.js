import { listReports} from "@/api/lining/reports.js";
import { ElMessage } from 'element-plus'

const useReportInOut = defineStore(
  'report-in-out',
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
    getters: {
      
    },
    actions: {
      async getListReports(params) {
        try {
          this.loading = true; 
          const response = await listReports(params);
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

export default useReportInOut
