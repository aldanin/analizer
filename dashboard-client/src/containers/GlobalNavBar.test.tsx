import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import GlobalNavBar, { GlobalNavBarContainerProps } from './GlobalNavBar';
import { fromJS } from 'immutable';
injectTapEventPlugin();

const middlewares = []
const storeMocker = configureStore(middlewares)

it('renders without crashing', () => {
  const div = document.createElement('div');
  const initialState = {
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

  const props: GlobalNavBarContainerProps = {
    agentId: 0,
    isFetching: true,
    navMenuLoadRequest: () => null,
    navMenuPollRequest: () => null,
    agentSelected: () => null,
    pageOpen: '',
    pageNavigate: () => null,
    data: {
      productSum: {
        userApps: 254,
        sensors: 440,
        deviceSystem: 21,
      },
      userApps: {
        calls: 9,
        im: 97,
        mail: 14,
        contacts: 0,
        socialNetwork: 7,
        browser: 8,
        gallery: 119,
        calendar: 0,
      },
      sensors: {
        activity: 107,
        snapshots: 233,
        envAudio: 52,
        locations: 48,
      },
      deviceSystem: {
        directory: 8,
        systemInfo: 12,
        accounts: 1,
      }
    },
    params: {
      agent_id: '1',
    }
  };
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider>
        <GlobalNavBar {...props}/>
      </MuiThemeProvider>
    </Provider>,
    div);
});
