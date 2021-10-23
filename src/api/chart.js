import request from '@/utils/request'

export function getData(token) {
  return request({
    url: '/f/back/integral/selectLevel',
    method: 'get'
  })
}
