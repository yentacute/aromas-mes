import request from '@/utils/request'

// 查询库位列表
export function listWarehouseLocation(query) {
  return request({
    url: '/bok/warehouseLocation/getList',
    method: 'get',
    params: query
  })
}

// 查询库位详细
export function getWarehouseLocation(params) {
  return request({
    url: '/bok/warehouseLocation/getById',
    method: 'get',
    params
  })
}

// 新增库位
export function addWarehouseLocation(data) {
  return request({
    url: '/bok/warehouseLocation/add',
    method: 'post',
    data: data
  })
}

// 修改库位
export function updateWarehouseLocation(data) {
  return request({
    url: '/bok/warehouseLocation/update',
    method: 'post',
    data: data
  })
}

// 删除库位
export function delWarehouseLocation(data) {
  return request({
    url: '/bok/warehouseLocation/del',
    method: 'post',
    data
  })
}

// 查询全部库位下拉列表
export function reqGetAllWarehouseALocation(params) {
  return request({
    url: '/bok/warehouseLocation/getAllByWarehouseId',
    method: 'get',
    params
  })
}
