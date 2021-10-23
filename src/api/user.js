import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/f/back/user/userLogin',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/f/back/user/selectUser',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

export function modifyPassword(data) {
  return request({
    url: '/f/user/apiUser/updatePwd',
    method: 'post',
    data
  })
}

export function getMenus(token) {
  return request({
    url: '/vue-element-admin/menus',
    method: 'get',
    params: { token }
  })
}
