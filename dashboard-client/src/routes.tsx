import * as React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import RequireAuthWrapper from './containers/RequireAuthWrapper'
import LoginPage from './containers/LoginPage'
import HomePage from './containers/HomePage'
import AppViewerLayout from './containers/AppViewerLayout'
import AppViewerGridLayout from './containers/AppViewerGridLayout'
import NotFoundPage from './components/NotFoundPage/'
import ContactsAppPage from './containers/ContactsAppViewer';
// import Summary from './containers/Summary'
import { ViewPage } from './urlHelper';


export default (
  <Route path="/" component={App}>
    <Route path="/login" component={LoginPage} />
    <Route component={RequireAuthWrapper}>
      <IndexRoute component={HomePage}/>
      <Route component={AppViewerGridLayout}>
        <Route path={`/agent/:agent_id/${ViewPage.CONTACTS}`} component={ContactsAppPage} />
      </Route>
      <Route component={AppViewerLayout}>
        <Route path="/agent/:agent_id" component={ContactsAppPage} />
        <Route path={`/agent/:agent_id/${ViewPage.CONTACTS}`} component={ContactsAppPage} />
        {/*<Route path={`/agent/:agent_id/${ViewPage.SUMMARY}`} component={Summary} />*/}
      </Route>
    </Route>
    <Route path="*" component={NotFoundPage} />
  </Route >
)
