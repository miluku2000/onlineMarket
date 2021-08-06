import Cookies from 'js-cookie'

const TokenKey = 'tokenData'

export function getToken() {
  return Cookies.get(TokenKey) ? JSON.parse(Cookies.get(TokenKey)) : Cookies.get(TokenKey)
}

export function setToken(token) {
  console.log(token)
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
