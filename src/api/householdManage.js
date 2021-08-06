import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/f/back/household/list',
    method: 'get',
    params: query
  })
}
export function addHousehold(data) {
  return request({
    url: '/f/back/household/add',
    method: 'post',
    data
  })
}
export function fetchDetails(householdId) {
  return request({
    url: '/f/back/household/detail',
    method: 'get',
    params: { householdId }
  })
}
export function updateHousehold(data) {
  return request({
    url: '/f/back/household/update',
    method: 'post',
    data
  })
}
export function fetchDetailsList(householdId) {
  return request({
    url: '/f/back/household/user/list',
    method: 'get',
    params: { householdId }
  })
}
export function deleteUserHousehold(data) {
  return request({
    url: '/f/back/household/user/delete',
    method: 'post',
    data
  })
}
export function evacuateUserHousehold(data) {
  return request({
    url: '/f/back/household/user/evacuate',
    method: 'post',
    data
  })
}
export function checkHouseUser(idCard) {
  return request({
    url: '/f/back/household/user/checkHouseUser',
    method: 'get',
    params: { idCard }
  })
}
export function addUserHousehold(data) {
  return request({
    url: '/f/back/household/user/add',
    method: 'post',
    data
  })
}
export function updateUserHousehold(data) {
  return request({
    url: '/f/back/household/user/update',
    method: 'post',
    data
  })
}
export function setHouseholder(data) {
  return request({
    url: '/f/back/household/user/setHouseholder',
    method: 'post',
    data
  })
}
export function saveHouseholdToGrid(data) {
  return request({
    url: '/f/back/household/saveHouseholdToGrid',
    method: 'post',
    data
  })
}
export function setShares(data) {
  return request({
    url: '/f/back/household/user/setShares',
    method: 'post',
    data
  })
}
export function fetchDetails2(data) {
  return request({
    url: '/f/back/household/user/getUserShareTime',
    method: 'get',
    params: data
  })
}
export function addFile(data) {
  return request({
    url: '/f/back/import/importHouseholdUser',
    method: 'post',
    data
  })
}
