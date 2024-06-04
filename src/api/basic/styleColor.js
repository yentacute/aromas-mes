import request from '@/utils/request'

// 查询成品色号库列表
export function listStyleColor(query) {
  return request({
    url: '/bok/styleColor/list',
    method: 'get',
    params: query
  })
}

// 查询成品色号库详细
export function getStyleColor(id) {
  return request({
    url: '/bok/styleColor/' + id,
    method: 'get'
  })
}

// 新增成品色号库
export function addStyleColor(data) {
  return request({
    url: '/bok/styleColor',
    method: 'post',
    data: data
  })
}

// 修改成品色号库
export function updateStyleColor(data) {
  return request({
    url: '/bok/styleColor',
    method: 'put',
    data: data
  })
}

// 删除成品色号库
export function delStyleColor(id) {
  return request({
    url: '/bok/styleColor/' + id,
    method: 'delete'
  })
}
