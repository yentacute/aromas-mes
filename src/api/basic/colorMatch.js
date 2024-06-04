import request from '@/utils/request'

// 查询配色列表
export function listColorMatch(query) {
  return request({
    url: '/bok/colorMatch/list',
    method: 'get',
    params: query
  })
}

// 查询配色详细
export function getColorMatch(colorMatchId) {
  return request({
    url: '/bok/colorMatch/' + colorMatchId,
    method: 'get'
  })
}

// 新增配色
export function addColorMatch(data) {
  return request({
    url: '/bok/colorMatch',
    method: 'post',
    data: data
  })
}

// 修改配色
export function updateColorMatch(data) {
  return request({
    url: '/bok/colorMatch',
    method: 'put',
    data: data
  })
}

// 删除配色
export function delColorMatch(colorMatchId) {
  return request({
    url: '/bok/colorMatch/' + colorMatchId,
    method: 'delete'
  })
}
