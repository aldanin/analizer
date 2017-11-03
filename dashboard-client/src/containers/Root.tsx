import * as React from 'react';
import { Provider } from 'react-redux'

import { Router } from 'react-router'
import * as Redux from 'redux'

import Themed from './Themed'

import routes from '../routes'

interface RootProps {
  store: Redux.Store<any>;
  history: any;
}
const Root: React.SFC<RootProps> = ({ store, history }) => (
  <Themed>
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  </Themed>
)

export default Root
