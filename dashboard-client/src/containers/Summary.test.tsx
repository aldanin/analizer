import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import Summary, { SummaryProps } from './Summary';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { fromJS } from 'immutable';

injectTapEventPlugin();

const middlewares = []
const storeMocker = configureStore(middlewares)

it('renders without crashing', () => {
  const div = document.createElement('div');
  const initialState = {
    summary: fromJS({
      isFetching: true,
      error: null,
      filters: 1,
      data: [],
    })
  }
  const store = storeMocker(initialState)

  const props: SummaryProps = {
    loadingSummaryRequest: () => null,
    isFetching: false,
    data: {
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
    contactFilter: 1,
    onSortOptionSelect: () => null,
    params: {
      agent_id: 2,
    }
  };

  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider>
        <Summary{...props}/>
      </MuiThemeProvider>
    </Provider>,
    div);
});
