import { fork } from 'redux-saga/effects'
import { watchProductActions } from './StdProduct'
import { watchAgents } from './Agents'
import { watchOperations } from './Operations'
import { watchTargets } from './Targets'
import { loginFlow, logoutFlow } from './Session'
import { watchUser } from './User'

import { watchNotifications, watchNotificationReads } from './Notifications'

import { watchContacts } from './Contacts'

import { watchNavMenu } from './App';
import { watchSummary } from './Summary';

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

    fork(watchNotifications),
    fork(watchNotificationReads),


    fork(watchContacts),

    fork(watchNavMenu),
    fork(watchSummary),

  ]
}
