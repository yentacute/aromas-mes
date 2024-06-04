import request from '@/utils/request'

// 查询面料色号库列表
export function listFabricColor(query) {
  return request({
    url: '/bok/fabricColor/list',
    method: 'get',
    params: query
  })
}

// 查询面料色号库详细
export function getFabricColor(id) {
  return request({
    url: '/bok/fabricColor/' + id,
    method: 'get'
  })
}

// 新增面料色号库
export function addFabricColor(data) {
  return request({
    url: '/bok/fabricColor',
    method: 'post',
    data: data
  })
}

// 修改面料色号库
export function updateFabricColor(data) {
  return request({
    url: '/bok/fabricColor',
    method: 'put',
    data: data
  })
}

// 删除面料色号库
export function delFabricColor(id) {
  return request({
    url: '/bok/fabricColor/' + id,
    method: 'delete'
  })
}
