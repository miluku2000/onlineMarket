import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/f/smart/smartGrid/getGridAllAssets',
    method: 'post',
    data
  })
}
export function fetchDetails(data) {
  return request({
    url: '/f/smart/smartGrid/getGridAssets',
    method: 'post',
    data
  })
}
export function getLabel(query) {
  return request({
    url: '/f/smart/smartGrid/getAssetsSource',
    method: 'get',
    params: query
  })
}
export function insertLabel(data) {
  return request({
    url: '/f/smart/smartGrid/setGridAssets',
    method: 'post',
    data
  })
}
