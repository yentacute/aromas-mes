import request from '@/utils/request'

// 查询领料单头表列表
export function listFabricPicking(query) {
  return request({
    url: '/bok/fabricPicking/getList',
    method: 'get',
    params: query
  })
}

// 查询领料单头表详细
export function getFabricPicking(params) {
  return request({
    url: '/bok/fabricPicking/getDetails',
    method: 'get',
    params
  })
}

// 新增领料单头表
export function addFabricPicking(data) {
  return request({
    url: '/bok/fabricPicking/save',
    method: 'post',
    data: data
  })
}

// 修改领料单头表
export function updateFabricPicking(data) {
  return request({
    url: '/bok/fabricPicking',
    method: 'post',
    data: data
  })
}

// 删除领料单头表
export function delFabricPicking(data) {
  return request({
    url: '/bok/fabricPicking/del',
    method: 'post',
    data: data
  })
}

// 查看库存
export function reqGetSelectStockFabric(params) {
  return request({
    url: '/bok/warehouseEntity/getUspWmsPickingSelectStockFabric',
    method: 'get',
    params
  })
}
// 获取全部领料类型
export function reqGetBusinessTypeAll() {
  return request({
    url: '/bok/fabricPicking/businessType',
    method: 'get'
  })
}

// 获取全部领料单位
export function reqGetBusinessUnits(params) {
  return request({
    url: '/bok/fabricPicking/businessUnitsId',
    method: 'get',
    params
  })
}

// 获取全部领料单位
export function reqGetFabricPickingOrder() {
  return request({
    url: '/bok/fabricPicking/getOrder',
    method: 'get',
  })
}


// 提交撤销单据
export function reqUpdateFabricPickingStatus(data) {
  return request({
    url: '/bok/fabricPicking/upWmsPicking',
    method: 'post',
    data
  })
}

// 获取单据状态
export function reqGetBillStatus() {
  return request({
    url: '/bok/fabricPicking/billStatus',
    method: 'get'
  })
}
