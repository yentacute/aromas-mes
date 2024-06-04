import request from '@/utils/request'

// 查询仓库组别列表
export function listStoreGroup(query) {
  return request({
    url: '/bok/storeGroup/getList',
    method: 'get',
    params: query
  })
}

// 查询仓库组别详细
export function getStoreGroup(params) {
  return request({
    url: '/bok/storeGroup/getStoreGroupById',
    method: 'get',
    params:params
  })
}

// 新增仓库组别
export function addStoreGroup(data) {
  return request({
    url: '/bok/storeGroup/add',
    method: 'post',
    data: data
  })
}

// 修改仓库组别
export function updateStoreGroup(data) {
  return request({
    url: '/bok/storeGroup/updateStoreGroup',
    method: 'post',
    data: data
  })
}

// 删除仓库组别
export function delStoreGroup(data) {
  return request({
    url: '/bok/storeGroup/delStoreGroup',
    method: 'post',
    data
  })
}

// 查询仓库组别下拉列表
export function reqGetAllStoreGroup() {
  return request({
    url: '/bok/storeGroup/getStoreGroupAll',
    method: 'get',
  })
}
