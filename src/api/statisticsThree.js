import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/f/smart/smartGrid/integralCount',
    method: 'post',
    data
  })
}
