import request from '@/utils/request'

// 查询辅料色号库列表
export function listAccessoriesColor(query) {
  return request({
    url: '/bok/accessoriesColor/getList',
    method: 'get',
    params: query
  })
}

// 查询辅料色号库详细
export function getAccessoriesColor(params) {
  return request({
    url: '/bok/accessoriesColor/getColorById',
    method: 'get',
    params: params
  })
}

// 新增辅料色号库
export function addAccessoriesColor(data) {
  return request({
    url: '/bok/accessoriesColor/add',
    method: 'post',
    data: data
  })
}

// 修改辅料色号库
export function updateAccessoriesColor(data) {
  return request({
    url: '/bok/accessoriesColor/updateColor',
    method: 'post',
    data: data
  })
}

// 删除辅料色号库
export function delAccessoriesColor(data) {
  return request({
    url: '/bok/accessoriesColor/delColor',
    method: 'post',
    data
  })
}
/*
 * 上传文件
 * */
export const reqUploadAccessoriesColor = (data) => {
  return request({
    url: '/bok/accessoriesColor/importData',
    method: 'post',
    data,

  })
};
