import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/f/smart/smartGrid/householdCount',
    method: 'post',
    data
  })
}

export function exportList(data) {
  return request({
    url: '/f/smart/smartGrid/exportHouseholdCount',
    method: 'post',
    data
  })
}
