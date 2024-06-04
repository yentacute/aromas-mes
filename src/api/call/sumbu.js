import request from '@/utils/request'

// 执行
export function execute(data) {
  return request({
    baseURL: import.meta.env.VITE_APP_BASE_API2,
    url: '/agv/hai/task/execute',
    method: 'post',
    data: data
  })
}

// 一键呼叫（四个场景共用）
export function onekeycall(data) {
  return request({
    baseURL: import.meta.env.VITE_APP_BASE_API2,
    url: '/agv/hai/task/onekeycall',
    method: 'post',
    data: data
  })
}




// 任务状态轮询_进度条
export function progressbar(data) {
  return request({
    baseURL: import.meta.env.VITE_APP_BASE_API2,
    url: '/agv/hai/task/progressbar',
    method: 'post',
    data: data
  })
}
// 获取缸号
export function reqGetRaabFabricLot(data) {
  return request({
    url: '/bok/raab/getRaabFabricLot',
    method: 'post',
    data
  })
}
// 获取颜色
export function reqGetRaabFabricColorList(data) {
  return request({
    url: '/bok/raab/getRaabFabricColorList',
    method: 'post',
    data
  })
}
// 获取面料信息
export function reqGetRaabFabricList(params) {
  return request({
    url: '/bok/raab/getRaabFabricList',
    method: 'get',
    params
  })
}
// 获取库位
export function reqGetRaabLocationId(data) {
  return request({
    url: '/bok/raab/getRaabLocationId',
    method: 'post',
    data
  })
}
