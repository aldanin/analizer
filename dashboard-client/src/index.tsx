import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';

import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './state/configureStore'

const versionInfo = require('./version.json')

import * as injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap which is needed for material-ui
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// tslint:disable-next-line:no-console
console.log(`Dashboard client version: ${versionInfo.version} build ${versionInfo.build}`)

const store = configureStore({})
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)
