import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/f/back/label/selectLabelList',
    method: 'post',
    data
  })
}
export function fetchDetails(data) {
  return request({
    url: '/f/back/label/selectLabel',
    method: 'post',
    data
  })
}
export function deleteLabel(data) {
  return request({
    url: '/f/back/label/deleteLabel',
    method: 'post',
    data
  })
}
export function updateLabel(data) {
  return request({
    url: '/f/back/label/updateLabel',
    method: 'post',
    data
  })
}
export function insertLabel(data) {
  return request({
    url: '/f/back/label/insertLabel',
    method: 'post',
    data
  })
}
