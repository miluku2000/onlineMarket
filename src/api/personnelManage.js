import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/f/back/user/selectAllBackUserList',
    method: 'post',
    data
  })
}
export function fetchList2(data) {
  return request({
    url: '/f/back/user/selectBackIntegralList',
    method: 'post',
    data
  })
}
export function fetchDetails(data) {
  return request({
    url: '/f/back/user/selectUser',
    method: 'post',
    data
  })
}
export function insertUser(data) {
  return request({
    url: '/f/back/user/insertUser',
    method: 'post',
    data
  })
}
export function updateUserInfo(data) {
  return request({
    url: '/f/back/user/updateUserInfo',
    method: 'post',
    data
  })
}
export function setUserDelFlag(data) {
  return request({
    url: '/f/back/user/setUserDelFlag',
    method: 'post',
    data
  })
}
export function resetPassword(data) {
  return request({
    url: '/f/back/user/resetPassword',
    method: 'post',
    data
  })
}
export function exportList(data) {
  return request({
    url: '/f/back/user/exportBackUserList',
    method: 'post',
    data
  })
}
export function fetchxzListThree(data) {
  return request({
    url: '/f/smart/selectOrgListByPid',
    method: 'post',
    data
  })
}
export function refresh(data) {
  return request({
    url: '/f/back/user/getDingUser',
    method: 'post',
    data
  })
}
