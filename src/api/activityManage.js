import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/f/smart/activity/selectApiActivityList',
    method: 'post',
    data
  })
}
export function fetchDetails(data) {
  return request({
    url: '/f/smart/activity/selectApiActivityInfo',
    method: 'post',
    data
  })
}
export function setPartnerDelFlag(data) {
  return request({
    url: '/f/back/partner/setPartnerDelFlag',
    method: 'post',
    data
  })
}
export function updateMerchant(data) {
  return request({
    url: '/f/back/partner/updatePartnerInfo',
    method: 'post',
    data
  })
}
export function insertActivity(data) {
  return request({
    url: '/f/smart/activity/addActivity',
    method: 'post',
    data
  })
}
export function selectPartnerMessageList(data) {
  return request({
    url: '/f/smart/reservation/selectReservationList',
    method: 'post',
    data
  })
}
export function selectPartnerMessageList2(data) {
  return request({
    url: '/f/smart/sign/selectSignList',
    method: 'post',
    data
  })
}
export function settlement(data) {
  return request({
    url: '/f/back/partnerMessage/settlement',
    method: 'post',
    data
  })
}
export function confirm(data) {
  return request({
    url: '/f/smart/reservation/updateReservation',
    method: 'post',
    data
  })
}
export function confirm2(data) {
  return request({
    url: '/f/smart/sign/returnSign',
    method: 'post',
    data
  })
}
export function exportMessage(data) {
  return request({
    url: '/f/back/partnerMessage/exportMessage',
    method: 'post',
    data
  })
}
export function deleteAdministrative(data) {
  return request({
    url: '/f/smart/activity/delActivity',
    method: 'post',
    data
  })
}
export function fetchxzList(query) {
  return request({
    url: '/f/smart/smartPartyOrganization',
    method: 'get',
    params: query
  })
}
export function getFetchList(data) {
  return request({
    url: '/f/smart/selectPartyUserList',
    method: 'post',
    data
  })
}
export function addApiReservation(data) {
  return request({
    url: '/f/smart/reservation/addApiReservation',
    method: 'post',
    data
  })
}
export function selectPartnerMessageList3(data) {
  return request({
    url: '/f/smart/reservation/selectPartyUserList',
    method: 'post',
    data
  })
}
