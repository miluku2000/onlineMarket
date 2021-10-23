import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/f/back/household/message/query',
    method: 'get',
    params: query
  })
}
export function fetchDetails(messageId) {
  return request({
    url: '/f/back/household/message/detail',
    method: 'get',
    params: { messageId }
  })
}

export function exportList(data) {
  return request({
    url: '/f/back/household/message/exportMessageList',
    method: 'post',
    data
  })
}

export function rejectEvent(query) {
  return request({
    url: '/f/back/household/message/return',
    method: 'get',
    params: query
  })
}
