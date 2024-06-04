import request from '@/utils/request'

// 查询装柜明细列表
export function listLoad(query) {
  return request({
    url: '/bok/load/loadList',
    method: 'get',
    params: query
  })
}

// 查询装柜明细详细
export function reqGetLoadDetails(query) {
  return request({
    url: '/bok/loadDetails/getList',
    params: query,
    method: 'get'
  })
}
/*
 * 上传文件
 * */
export const reqUploadLoadingDetail = (data) => {
  return request({
    url: '/bok/load/importData',
    method: 'post',
    data,

  })
};

// 打印获取全部明细详情
export function reqGetAllLoadDetails(query) {
  return request({
    url: '/bok/loadDetails/getListAll',
    params: query,
    method: 'get'
  })
}

// 获取明细详情下拉
export function reqGetLoadDetailsOptions(query) {
  return request({
    url: '/bok/loadDetails/getGroupByType',
    params: query,
    method: 'get'
  })
}
export function editLoadDetail(data) {
  return request({
    url: '/bok/loadDetails/update',
    method: 'post',
    data: data
  })
}
export function addLoadDetail(data) {
  return request({
    url: '/bok/loadDetails/add',
    method: 'post',
    data: data
  })
}
export function deleteLoadDetail(data) {
  return request({
    url: '/bok/loadDetails/del',
    method: 'post',
    data: data
  })
}
