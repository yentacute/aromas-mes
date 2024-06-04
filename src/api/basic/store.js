import request from '@/utils/request'

// 查询仓库档案列表
export function listStore(query) {
  return request({
    url: '/bok/store/getList',
    method: 'get',
    params: query
  })
}

// 查询仓库档案详细
export function getStore(params) {
  return request({
    url: '/bok/store/getStoreById',
    method: 'get',
    params
  })
}

// 新增仓库档案
export function addStore(data) {
  return request({
    url: '/bok/store/add',
    method: 'post',
    data: data
  })
}

// 修改仓库档案
export function updateStore(data) {
  return request({
    url: '/bok/store/updateStore',
    method: 'post',
    data: data
  })
}

// 删除仓库档案
export function delStore(data) {
  return request({
    url: '/bok/store/delStore',
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
