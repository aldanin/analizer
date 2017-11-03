import { call, put, select, takeEvery } from 'redux-saga/effects'
import {
  APP_NAV_MENU_REQUEST, navMenuLoadError, NavMenuLoadRequestAction,
  navMenuLoadSuccess
} from '../actions/App';
import { PRODUCT_TYPES } from '../../types/Product'

import Api from '../../api';

export function apiFetchNavMenu(agentId: string) {
  let api = Api();

  return api.fetchProductsSummery({agentId});
}

export const agentIdSelector = state => state[PRODUCT_TYPES.APP].get('agentId');

export function* fetchNavMenu(action: NavMenuLoadRequestAction) {
  try {
    let agentId = yield select(agentIdSelector);

    if (!agentId) {
      yield put(navMenuLoadSuccess(null));
    } else {
      const data = yield call(apiFetchNavMenu, agentId);

      yield put(navMenuLoadSuccess({data: data}));
    }
  } catch (error) {
    yield put(navMenuLoadError({error: error}))
  }
}

export function* watchNavMenu() {
  yield takeEvery(APP_NAV_MENU_REQUEST, fetchNavMenu)
}
