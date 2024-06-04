import request from '@/utils/request'

// 查询公司信息列表
export function listCompany(query) {
  return request({
    url: '/bok/company/getList',
    method: 'get',
    params: query
  })
}

// 查询公司信息详细
export function getCompany(params) {
  return request({
    url: '/bok/company/getCompanyById',
    method: 'get',
    params:params
  })
}

// 新增公司信息
export function addCompany(data) {
  return request({
    url: '/bok/company/add',
    method: 'post',
    data: data
  })
}

// 修改公司信息
export function updateCompany(data) {
  return request({
    url: '/bok/company/updateCompany',
    method: 'post',
    data: data
  })
}

// 删除公司信息
export function delCompany(data) {
  return request({
    url: '/bok/company/delCompany',
    method: 'post',
    data:data
  })
}

// 获取公司信息下拉列表
export function reqGetAllCompany() {
  return request({
    url: '/bok/company/getAllCompany',
    method: 'get',
  })
}
