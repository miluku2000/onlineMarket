import request from '@/utils/request'

export function fetchxzList(query) {
  return request({
    url: '/f/smart/smartPartyOrganization',
    method: 'get',
    params: query
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
export function fetchChidList(data) {
  return request({
    url: '/f/smart/smartAdministrative/selectAdministrativeListInfoByPid',
    method: 'post',
    data
  })
}
export function selectAdministrativeList(data) {
  return request({
    url: '/f/smart/selectOrgList',
    method: 'post',
    data
  })
}
export function insertOrg(data) {
  return request({
    url: '/f/smart/insertOrg',
    method: 'post',
    data
  })
}
export function updateOrg(data) {
  return request({
    url: '/f/smart/updateOrg',
    method: 'post',
    data
  })
}
export function selectAdministrativeDetail(data) {
  return request({
    url: '/f/smart/selectOrgDetail',
    method: 'post',
    data
  })
}
export function deleteOrg(data) {
  return request({
    url: '/f/smart/deleteOrg',
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
