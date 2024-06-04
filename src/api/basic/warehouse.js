import request from '@/utils/request'

// 查询仓库档案列表
export function listWarehouse(query) {
  return request({
    url: '/bok/warehouse/getList',
    method: 'get',
    params: query
  })
}

// 查询仓库档案详细
export function getWarehouse(params) {
  return request({
    url: '/bok/warehouse/getById',
    method: 'get',
    params
  })
}

// 新增仓库档案
export function addWarehouse(data) {
  return request({
    url: '/bok/warehouse/add',
    method: 'post',
    data: data
  })
}

// 修改仓库档案
export function updateWarehouse(data) {
  return request({
    url: '/bok/warehouse/update',
    method: 'post',
    data: data
  })
}

// 删除仓库档案
export function delWarehouse(data) {
  return request({
    url: '/bok/warehouse/del',
    method: 'post',
    data
  })
}

// 查询物料大类下拉列表
export function reqGetAllMaterialCategory() {
  return request({
    url: '/bok/materialCategory/getMaterialCategoryAll',
    method: 'get',
  })
}

// 查询全部仓库下拉列表
export function reqGetAllWarehouse() {
  return request({
    url: '/bok/warehouse/getAllWarehouse',
    method: 'get',
  })
}
