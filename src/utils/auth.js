import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const xToken = 'x-token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getXToken() {
  return Cookies.get(xToken)
}

export function setXToken(token) {
  return Cookies.set(xToken, token)
}
