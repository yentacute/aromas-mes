import request from '@/utils/request'

// 查询制单列表
export function listCreateDocument(query) {
  return request({
    url: '/bok/createDocument/list',
    method: 'get',
    params: query
  })
}

// 查询制单详细
export function getCreateDocument(createDocumentId) {
  return request({
    url: '/bok/createDocument/' + createDocumentId,
    method: 'get'
  })
}

// 新增制单
export function addCreateDocument(data) {
  return request({
    url: '/bok/createDocument',
    method: 'post',
    data: data
  })
}

// 修改制单
export function updateCreateDocument(data) {
  return request({
    url: '/bok/createDocument',
    method: 'put',
    data: data
  })
}

// 删除制单
export function delCreateDocument(createDocumentId) {
  return request({
    url: '/bok/createDocument/' + createDocumentId,
    method: 'delete'
  })
}
