import { fork } from 'redux-saga/effects'
import { watchProductActions } from './StdProduct'
import { watchAgents } from './Agents'
import { watchOperations } from './Operations'
import { watchTargets } from './Targets'
import { loginFlow, logoutFlow } from './Session'
import { watchUser } from './User'
import { watchBrowser } from './Browser';
import { watchGallery } from './Gallery'
import { watchNotifications, watchNotificationReads } from './Notifications'
import { watchSocialNetworks } from './SocialNetworks'
import { watchTwitter } from './Twitter';
import { watchLinkedin } from './Linkedin';
import { watchAccounts } from './Accounts'
import { watchContacts } from './Contacts'
import { watchSnapshots } from './Snapshots'
import { watchStories } from './Stories'
import { watchKeylogs } from './Keylogs'
import { watchScreenshots } from './Screenshots'
import { watchCalendar } from './Calendar';
import { watchInstantMessaging } from './InstantMessaging'
import { watchNavMenu } from './App';
import { watchTags } from './Tags';
import { watchSummary } from './Summary';
import { watchDirectory } from './Directory'
import { watchCalls } from './Calls'
import { watchLocation } from './Location';
import { watchMail } from './Mail';
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield [
    fork(watchProductActions),
    fork(watchOperations),
    fork(watchTargets),
    fork(watchAgents),
    fork(loginFlow),
    fork(logoutFlow),
    fork(watchUser),
    fork(watchBrowser),
    fork(watchCalendar),
    fork(watchGallery),
    fork(watchSnapshots),
    fork(watchNotifications),
    fork(watchNotificationReads),
    fork(watchInstantMessaging),
    fork(watchAccounts),
    fork(watchContacts),
    fork(watchSocialNetworks),
    fork(watchTwitter),
    fork(watchLinkedin),
    fork(watchDirectory),
    fork(watchNavMenu),
    fork(watchTags),
    fork(watchStories),
    fork(watchKeylogs),
    fork(watchScreenshots),
    fork(watchSummary),
    fork(watchCalls),
    fork(watchLocation),
    fork(watchMail),
  ]
}
