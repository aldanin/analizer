import { call, put, takeLatest } from 'redux-saga/effects'
import * as Contacts from '../../types/Contacts'
import * as ProdActions from '../actions/ProductActions'
import { PRODUCT_TYPES } from '../../types/Product'
import ApiGetInstance from '../../api'
import * as Agent from '../../types/Agent'

export function apiGetData(agentId: Agent.AgentId, skip: number, limit: number, filters: Contacts.Filters) {
  const api = ApiGetInstance();

  return api.fetchContactProducts(
    {agentId: agentId},
    {skip, limit})
}

export function* fetchData(action: ProdActions.ProductLoadRequestAction) {

  if (action.productType === PRODUCT_TYPES.CONTACTS) {
    try {
      const {agentid, skip, limit} = action.payload;
      const filters = action.payload.filters as Contacts.Filters;
      const result = yield call(apiGetData, agentid, skip, limit, filters);
      yield put(ProdActions.productsLoadSuccess(
        {productData: result, skip, limit},
        PRODUCT_TYPES.CONTACTS));
    } catch (error) {
      yield put(ProdActions.productsLoadError(error, PRODUCT_TYPES.CONTACTS))
    }
  }
}

export function* watchContacts() {
  yield takeLatest(ProdActions.PRODUCT_LOAD_REQUEST, fetchData)
}
