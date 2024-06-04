import request from '@/utils/request'

// 查询面料档案列表
export function listFabric(query) {
  return request({
    url: '/bok/fabric/list',
    method: 'get',
    params: query
  })
}

// 查询面料档案详细
export function getFabric(id) {
  return request({
    url: '/bok/fabric/' + id,
    method: 'get'
  })
}

// 新增面料档案
export function addFabric(data) {
  return request({
    url: '/bok/fabric',
    method: 'post',
    data: data
  })
}

// 修改面料档案
export function updateFabric(data) {
  return request({
    url: '/bok/fabric',
    method: 'put',
    data: data
  })
}

// 删除面料档案
export function delFabric(id) {
  return request({
    url: '/bok/fabric/' + id,
    method: 'delete'
  })
}
