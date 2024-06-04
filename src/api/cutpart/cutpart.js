import request from '@/utils/request'

export function listCutPartInOut(query) {
  return request({
    url: '/bok/cutPartWarehouseInboundOutboundReport/list',
    method: 'get',
    params: query
  })
}
export function listCutPartInventory(query) {
  return request({
    url: '/bok/cutPartWarehouseInventoryReport/list',
    method: 'get',
    params: query
  })
}


