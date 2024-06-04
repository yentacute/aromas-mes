import request from '@/utils/request'

// 查询容器列表
export function listWarehouseContainer(query) {
  return request({
    url: '/bok/container/getList',
    method: 'get',
    params: query
  })
}

// 查询容器详细
export function getWarehouseContainer(params) {
  return request({
    url: '/bok/container/getById',
    method: 'get',
    params
  })
}

// 新增容器
export function addWarehouseContainer(data) {
  return request({
    url: '/bok/container/add',
    method: 'post',
    data: data
  })
}

// 修改容器
export function updateWarehouseContainer(data) {
  return request({
    url: '/bok/container/update',
    method: 'post',
    data: data
  })
}

// 删除容器
export function delWarehouseContainer(id) {
  return request({
    url: '/bok/container/del',
    method: 'post',
    data: data
  })
}
