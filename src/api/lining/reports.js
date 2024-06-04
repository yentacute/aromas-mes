import request from '@/utils/request'

export function listReports(query) {
  return request({
    url: '/bok/fabricWarehouseInOutboundReport/list',
    method: 'get',
    params: query
  })
}

