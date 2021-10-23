import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/f/back/partner/selectPartnerList',
    method: 'post',
    data
  })
}
export function fetchDetails(data) {
  return request({
    url: '/f/back/partner/selectUser',
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
export function insertMerchant(data) {
  return request({
    url: '/f/back/partner/insertPartner',
    method: 'post',
    data
  })
}
export function selectPartnerMessageList(data) {
  return request({
    url: '/f/back/partnerMessage/selectPartnerMessageList',
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
    url: '/f/back/partnerMessage/confirm',
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
