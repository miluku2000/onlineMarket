import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/f/smart/smartGrid/gridInfo',
    method: 'post',
    data
  })
}
