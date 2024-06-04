import request from '@/utils/request'

// 查询库区列表
export function listWarehouseArea(query) {
  return request({
    url: '/bok/warehouseArea/getList',
    method: 'get',
    params: query
  })
}

// 查询库区详细
export function getWarehouseArea(params) {
  return request({
    url: '/bok/warehouseArea/getById',
    method: 'get',
    params: params
  })
}

// 新增库区
export function addWarehouseArea(data) {
  return request({
    url: '/bok/warehouseArea/add',
    method: 'post',
    data: data
  })
}

// 修改库区
export function updateWarehouseArea(data) {
  return request({
    url: '/bok/warehouseArea/update',
    method: 'post',
    data: data
  })
}

// 删除库区
export function delWarehouseArea(data) {
  return request({
    url: '/bok/warehouseArea/del',
    method: 'post',
    data
  })
}

// 查询全部库区下拉列表
export function reqGetAllWarehouseArea(params) {
  return request({
    url: '/bok/warehouseArea/getAll',
    method: 'get',
    params
  })
}
