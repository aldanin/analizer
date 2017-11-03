import * as React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import RequireAuthWrapper from './containers/RequireAuthWrapper'
import LoginPage from './containers/LoginPage'
import HomePage from './containers/HomePage'
import AppViewerLayout from './containers/AppViewerLayout'
import AppViewerGridLayout from './containers/AppViewerGridLayout'
import AgentDashboardPage from './containers/AgentDashboardPage'
import ActivityAppViewer from './containers/ActivityAppViewer'
import NotFoundPage from './components/NotFoundPage/'
import SnapshotsPage from './containers/SnapshotsPage'
import BrowserPage from './containers/BrowserPage'
import DirectoryAppPage from './containers/DirectoryAppViewer';
import AgentGalleryPage from './containers/GalleryAppViewer';
import CalendarPage from './containers/CalendarPage';
import InstantMessagingPage from './containers/InstantMessagingPage';
import AccountsAppPage from './containers/AccountsAppViewer';
import ContactsAppPage from './containers/ContactsAppViewer';
import CallsPage from './containers/CallsAppViewer';
import Summary from './containers/Summary'
import SocialNetworksPage from './containers/SocialNetworksPage';
import { ViewPage } from './urlHelper';
import LocationPage from './containers/LocationPage';
import MailPage from './containers/MailPage';

export default (
  <Route path="/" component={App}>
    <Route path="/login" component={LoginPage} />
    <Route component={RequireAuthWrapper}>
      <IndexRoute component={HomePage}/>
      <Route component={AppViewerGridLayout}>
        <Route path={`/agent/:agent_id/${ViewPage.ACTIVITY}`} component={ActivityAppViewer} />
      </Route>
      <Route component={AppViewerLayout}>
        <Route path="/agent/:agent_id" component={AgentDashboardPage} />
        <Route path={`/agent/:agent_id/${ViewPage.SNAPSHOTS}`} component={SnapshotsPage} />
        <Route path={`/agent/:agent_id/${ViewPage.BROWSER}`} component={BrowserPage} />
        <Route path={`/agent/:agent_id/${ViewPage.CALENDAR}`} component={CalendarPage} />
        <Route path={`/agent/:agent_id/${ViewPage.GALLERY}`} component={AgentGalleryPage} />
        <Route path={`/agent/:agent_id/${ViewPage.INSTANT_MESSAGING}`} component={InstantMessagingPage} />
        <Route path={`/agent/:agent_id/${ViewPage.ACCOUNTS}`} component={AccountsAppPage} />
        <Route path={`/agent/:agent_id/${ViewPage.CONTACTS}`} component={ContactsAppPage} />
        <Route path={`/agent/:agent_id/${ViewPage.SOCIAL_NETWORKS}`} component={SocialNetworksPage} />
        <Route path={`/agent/:agent_id/${ViewPage.SUMMARY}`} component={Summary} />
        <Route path={`/agent/:agent_id/${ViewPage.MAIL}`} component={MailPage} />
        <Route path={`/agent/:agent_id/${ViewPage.DIRECTORY}`} component={DirectoryAppPage} />
        <Route path={`/agent/:agent_id/${ViewPage.CALLS}`} component={CallsPage} />
        <Route path={`/agent/:agent_id/${ViewPage.LOCATIONS}`} component={LocationPage} />
      </Route>
    </Route>
    <Route path="*" component={NotFoundPage} />
  </Route >
)
