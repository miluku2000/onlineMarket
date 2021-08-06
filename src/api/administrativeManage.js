import request from '@/utils/request'

export function fetchxzList(data) {
  return request({
    url: '/f/smart/smartAdministrative/selectAdministrativeListInfo',
    method: 'post',
    data
  })
}
export function fetchxzListOne(query) {
  return request({
    url: '/f/smart/smartPartyOrganization',
    method: 'get',
    params: query
  })
}
export function fetchxzListTwo(data) {
  return request({
    url: '/f/smart/smartAdministrative/selectVillageListInfo',
    method: 'post',
    data
  })
}
export function fetchxzListTwo2(data) {
  return request({
    url: '/f/smart/smartGrid/getGridList',
    method: 'post',
    data
  })
}
export function fetchChidList(data) {
  return request({
    url: '/f/smart/smartAdministrative/selectAdministrativeListInfoByPid',
    method: 'post',
    data
  })
}
export function selectAdministrativeList(data) {
  return request({
    url: '/f/smart/smartAdministrative/selectAdministrativeList',
    method: 'post',
    data
  })
}
export function insertAdministrative(data) {
  return request({
    url: '/f/smart/smartAdministrative/insertAdministrative',
    method: 'post',
    data
  })
}
export function updateAdministrative(data) {
  return request({
    url: '/f/smart/smartAdministrative/updateAdministrative',
    method: 'post',
    data
  })
}
export function selectAdministrativeDetail(data) {
  return request({
    url: '/f/smart/smartAdministrative/selectAdministrativeDetail',
    method: 'post',
    data
  })
}
export function deleteAdministrative(data) {
  return request({
    url: '/f/smart/smartAdministrative/deleteAdministrative',
    method: 'post',
    data
  })
}
export function selectAdministrativeListByPid(data) {
  return request({
    url: '/f/smart/smartAdministrative/selectAdministrativeListByPid',
    method: 'post',
    data
  })
}
export function addFile(data) {
  return request({
    url: '/f/back/import/importHousehold',
    method: 'post',
    data
  })
}
