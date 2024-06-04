import request from '@/utils/request'

// 查询款号订单列表
export function listStyleOrder(query) {
  return request({
    url: '/bok/styleOrder/list',
    method: 'get',
    params: query
  })
}

// 查询款号订单详细
export function getStyleOrder(styleOrderId) {
  return request({
    url: '/bok/styleOrder/' + styleOrderId,
    method: 'get'
  })
}

// 新增款号订单
export function addStyleOrder(data) {
  return request({
    url: '/bok/styleOrder',
    method: 'post',
    data: data
  })
}

// 修改款号订单
export function updateStyleOrder(data) {
  return request({
    url: '/bok/styleOrder',
    method: 'put',
    data: data
  })
}

// 删除款号订单
export function delStyleOrder(styleOrderId) {
  return request({
    url: '/bok/styleOrder/' + styleOrderId,
    method: 'delete'
  })
}
