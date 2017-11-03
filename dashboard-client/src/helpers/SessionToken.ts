const DEFAULT_TOKEN_NAME = 'sessionToken';

export function getSessionData(name: string = DEFAULT_TOKEN_NAME) {
  return sessionStorage.getItem(name);
}

export function setSessionData(data: any, name: string = DEFAULT_TOKEN_NAME) {
  return sessionStorage.setItem(name, data);
}

export function clearSessionData(name: string = DEFAULT_TOKEN_NAME) {
  return sessionStorage.removeItem(name);
}

export function isLoggedin(name: string = DEFAULT_TOKEN_NAME) {
  return !!sessionStorage.getItem(name);
}