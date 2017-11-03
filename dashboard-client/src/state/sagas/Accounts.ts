import { call, put, takeLatest } from 'redux-saga/effects'
import { FiltersData } from '../../types/Filters'
import * as Actions from '../actions/Accounts'
import { ConflictingPassword } from '../../types/Accounts'

import { getData, getItemById } from '../../components/AccountsAppViewer/mockData/Data'

export function promisedGetData(nextPageNumber: number, pageSize: number, filters: FiltersData) {
  const data = getData(nextPageNumber, pageSize, filters);
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        resolve(data)
      },
      100)
  })
}

export function promisedSelectConflictingPassword(agentId: number,
                                                  accountItemId: number,
                                                  conflictingPassword: ConflictingPassword) {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        const accountItem = getItemById(accountItemId);
        const password = {
          value: conflictingPassword.value,
          lastUsed: conflictingPassword.actionDate
      }
        accountItem.password = password;
        accountItem.conflictedPasswords = null;
        resolve({accountItem: accountItem});
      },
      100)
  })
}

export function* fetchAccountItems(action: Actions.AccountsLoadRequestAction) {

  const {nextPageNumber, pageSize, filters} = action;

  const result = yield call(promisedGetData, nextPageNumber, pageSize, filters);
  yield put(Actions.accountsLoadSuccess(result.accountItems, result.nextPageNumber, result.totalCount, filters));

  // try {
  //   const result =  yield call(defferedGetData,nextPageNumber, pageSize, filters);
  //   yield put(AccountsLoadSuccess(result.accountItems, result.nextPageNumber, result.totalCount, filters));
  // } catch (error) {
  //   yield put(agentsLoadFail(error))
  // }
}

export function* fetchPasswordSelection(action: Actions.PasswordSelectionRequestAction) {
  const {agentId, accountItemId, password} = action.payload;
  const result = yield call(promisedSelectConflictingPassword, agentId, accountItemId, password);
  yield put(Actions.passwordSelectionSuccess(result.accountItem))
}

export function* watchAccounts() {
  yield takeLatest(Actions.ACCOUNTS_LOAD_REQUEST, fetchAccountItems)
  yield takeLatest(Actions.ACCOUNTS_PASSWORD_SELECTION_REQUEST, fetchPasswordSelection)
}
