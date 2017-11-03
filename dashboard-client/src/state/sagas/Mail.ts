import { call, put, takeEvery } from 'redux-saga/effects'
import { LOAD_MAIL_REQUEST, mailLoadFail, MailLoadRequestAction, mailLoadSuccess } from '../actions/Mail';
import ApiGetInstance from '../../api'
import { MailAppData } from '../../types/Mail';
import moment = require('moment');
import { MailData } from 'common-interfaces/types/Mail';
import { AgentId } from '../../types/Agent';

export function apiFetchMail(agentId: AgentId) {
  const api = ApiGetInstance();
  return api.fetchEmailProducts({agentId: agentId})
    .then((products) => products);
}

export function* fetchMail(action: MailLoadRequestAction) {
  try {
    const products = yield call(apiFetchMail, action.agentId);
    const data: MailAppData = normalizeMailProducts(products);
    yield put(mailLoadSuccess(data, 0))
  } catch (error) {
    yield put(mailLoadFail(error))
  }
}

export function* watchMail() {
  yield takeEvery(LOAD_MAIL_REQUEST, fetchMail);
}

function normalizeMailProducts(emailProducts: MailData[][]) {
  let accounts = {};

  emailProducts.forEach((thread) => {
    let account = {
      id: thread[0].app,
      email: thread[0].app,
      avatar: '',
      labels: [{id: '0', label: 'inbox'}],
      inbox: []
    };

    thread.forEach((email) => {
      if (!accounts[email.app]) {
        accounts[email.app] = account;
      }
      if (! ('id' in email)) {
        throw new Error('Product missing ID');
      }
      const message = {
        id: email.id,
        isFavorite: ('isFavorite' in email) ? email.isFavorite : false,
        isRead: ('isRead' in email) ? email.isRead : true,
        tags: ('tags' in email) ? email.tags : [],
        from: ('from' in email) ? email.from : 'N/A',
        to: ('to' in email) ? email.to : [],
        cc: ('cc' in email) ? email.cc : [],
        subject: ('subject' in email) ? email.subject : 'N/A',
        shortContent: ('shortContent' in email) ? (email as any).shortContent : 'N/A',
        body: ('body' in email) ? email.body : 'N/A',
        attachments: ('attachments' in email) ? email.attachments : [],
        timestamp: ('timestamp' in email) ? moment((email as any).timestamp).unix() * 1000 : 'N/A',
      }

      accounts[email.app].inbox.push(message);
    });
  });

  let result = [];

  for (let account in accounts) {
    if (account in accounts) {
      result.push(accounts[account]);
    }
  }
  return {
    accounts: result
  };
}
