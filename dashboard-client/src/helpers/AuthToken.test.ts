import * as AuthToken from './AuthToken'

const TOKEN_NAME = 'moken'

// make sure the store is clean
beforeEach(() => {
  AuthToken.clearToken(TOKEN_NAME)
})

it('should get set token', () => {
  const token = 'foo foo 123';
  AuthToken.setToken(token, TOKEN_NAME)
  expect(
    AuthToken.getToken(TOKEN_NAME)
  ).toEqual(
    token
  );
})

it('should clear token', () => {
  const token = 'foo foo 123';
  AuthToken.setToken(token, TOKEN_NAME)
  AuthToken.clearToken(TOKEN_NAME)
  expect(
    AuthToken.getToken(TOKEN_NAME)
  ).toEqual(
    undefined
  );
})

it('should return false on isLoggedIn if no token', () => {
  expect(
    AuthToken.isLoggedin(TOKEN_NAME)
  ).toEqual(
    false
  );
})

it('should return true on isLoggedIn if token was set', () => {
  const token = 'foo foo 123';
  AuthToken.setToken(token, TOKEN_NAME)

  expect(
    AuthToken.isLoggedin(TOKEN_NAME)
  ).toEqual(
    true
  );
})
