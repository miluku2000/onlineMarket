import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/f/smart/smartGrid/gridIntegralCount',
    method: 'post',
    data
  })
}

export function exportList(data) {
  return request({
    url: '/f/smart/smartGrid/exportGridIntegralCount',
    method: 'post',
    data
  })
}
