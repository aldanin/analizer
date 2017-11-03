import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { RequireAuthWrapper, RequireAuthWrapperProps } from './RequireAuthWrapper'

const mockRouter = {
  replace: (url) => null
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: RequireAuthWrapperProps = {
    currentURL: '/lkjkjhkjh',
    isLoggedIn: false,
    setRedirectUrl: (url) => null,
    router: mockRouter
  }
  ReactDOM.render(<RequireAuthWrapper {...props} />, div);
});

it('renders children when logged in', () => {
  const div = document.createElement('div');
  const props: RequireAuthWrapperProps = {
    currentURL: '/lkjkjhkjh',
    isLoggedIn: true,
    setRedirectUrl: (url) => null,
    router: mockRouter
  }
  ReactDOM.render(
    <RequireAuthWrapper {...props as any}>
      <div id="child01">
        Foo
      </div>
    </RequireAuthWrapper>,
    div
  );
  expect(typeof div.querySelector('#child01')).toEqual('object')
});

it('renders nothing when not logged in', () => {
  const div = document.createElement('div');
  const props: RequireAuthWrapperProps = {
    currentURL: '/lkjkjhkjh',
    isLoggedIn: false,
    setRedirectUrl: (url) => null,
    router: mockRouter
  }
  ReactDOM.render(
    <RequireAuthWrapper {...props as any}>
      <div id="child01">
        Foo
      </div>
    </RequireAuthWrapper>,
    div
  );
  expect(div.querySelector('#child01')).toBeNull()
});

it('navigates to login page when not logged in', () => {
  const mockSaveUrl = jest.fn()
  const mockRouter = {
    replace: jest.fn(),
  }
  const div = document.createElement('div');
  const props: RequireAuthWrapperProps = {
    currentURL: '/foo/bar',
    isLoggedIn: false,
    setRedirectUrl: mockSaveUrl,
    router: mockRouter
  }
  ReactDOM.render(<RequireAuthWrapper {...props} />, div);
  expect(mockRouter.replace.mock.calls).toEqual([['/login']])
  expect(mockSaveUrl.mock.calls).toEqual([['/foo/bar']])
});
