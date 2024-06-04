import request from '@/utils/request'

// 查询品牌库列表
export function listBrand(query) {
  return request({
    url: '/bok/brand/list',
    method: 'get',
    params: query
  })
}

// 查询品牌库详细
export function getBrand(brandId) {
  return request({
    url: '/bok/brand/' + brandId,
    method: 'get'
  })
}

// 新增品牌库
export function addBrand(data) {
  return request({
    url: '/bok/brand/add',
    method: 'post',
    data: data
  })
}

// 修改品牌库
export function updateBrand(data) {
  return request({
    url: '/bok/brand/update',
    method: 'post',
    data: data
  })
}

// 删除品牌库
export function delBrand(data) {
  return request({
    url: '/bok/brand/delBrandIds',
    method: 'post',
    data:data
  })
}
