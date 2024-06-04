import request from '@/utils/request'

export function listFabricInspection(query, body) {
  return request({
    url: '/bok/fabricInspection/fabricArriveList',
    method: 'post',
    params: query,
    data: body
  })
}

export function getFabricInspection(id) {
  return request({
    url: '/bok/fabricInspection/' + id,
    method: 'get'
  })
}

export function addFabricInspection(data) {
  return request({
    url: '/bok/fabricInspection/upsert',
    method: 'post',
    data: data
  })
}

export function exportExcel(id) {
  return request({
    url: '/bok/fabricInspection/export?id=' + id,
    method: 'post',
    type: 'blob'
  })
}

export function scanQrCode(barcode) {
  return request({
    url: '/bok/fabricInspection/scan/' + barcode,
    method: 'get'
  })
}
export function getMachineNo() {
  return request({
    url: '/bok/eamEquipment/list?category=F&typeCode=FQI',
    method: 'get'
  })
}
export function getDict() {
  return request({
    url: '/system/dict/data/type/fabric_quality_inspection_results',
    method: 'get'
  })
}


