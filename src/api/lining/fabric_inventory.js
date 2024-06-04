import request from '@/utils/request'

export function listInventoryReports(query) {
  return request({
    url: '/bok/fabricWarehouseInventoryReport/list',
    method: 'get',
    params: query
  })
}


