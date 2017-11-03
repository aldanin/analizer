const DEFAULT_TOKEN_NAME = 'id_token'
import cookie from 'react-cookie';

export function getToken(name: string = DEFAULT_TOKEN_NAME) {
  return cookie.load(name)
  // return localStorage.getItem(name)
}

export function setToken(token: string, name: string = DEFAULT_TOKEN_NAME) {
  cookie.save(name, token, { path: '/' });
  // localStorage.setItem(name, token)
}

export function clearToken(name: string = DEFAULT_TOKEN_NAME) {
  cookie.remove(name, { path: '/' });
  // localStorage.removeItem(name)
}

export function isLoggedin(name: string = DEFAULT_TOKEN_NAME) {
  return !! getToken(name);
}
