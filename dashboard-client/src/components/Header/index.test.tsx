import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Header from './';
import { HeaderProps } from './';
import Themed from '../../containers/Themed'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { fromJS } from 'immutable';
injectTapEventPlugin();

const middlewares = []
const storeMocker = configureStore(middlewares)

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: HeaderProps = {
    agentId: '1',
  }
  const initialState = {
    session: {
      isAuthenticated: false
    },
    user: {
      data: null
    },
    agents: {
      data: []
    },
    globalLoaders: {
      count: 0,
    },
    notifications: {
      countUnread: 0
    },
    app: fromJS({
      agentId: 0,
      isMenuFetching: false,
      currentPage: '',
      menuData: {
        productSum: {
          userApps: null,
          sensors: null,
          deviceSystem: null,
        },
        userApps: {
          calls: null,
          im: null,
          mail: null,
          contacts: null,
          socialNetwork: null,
          browser: null,
          gallery: null,
          calendar: null,
        },
        sensors: {
          activity: null,
          snapshots: null,
          envAudio: null,
          locations: null,
        },
        deviceSystem: {
          directory: null,
          systemInfo: null,
          accounts: null,
        }
      },
    })
  }
  const store = storeMocker(initialState)

  ReactDOM.render(
    <Provider store={store}>
      <Themed>
        <Header {...props}/>
      </Themed>
    </Provider>,
    div);
});
