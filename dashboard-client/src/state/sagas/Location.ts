import { call, put, select, takeEvery } from 'redux-saga/effects'
import {
  LocationLoadRequestAction,
  locationLoadSuccess,
  locationLoadFail,
  // LOAD_LOCATION_REQUEST
} from '../actions/Location'
import ApiGetInstance from '../../api'
import { AgentId } from '../../types/Agent';
import { PRODUCT_TYPES } from '../../types/Product'
import * as ProdActions from '../actions/ProductActions'
import { Filters } from '../../types/GenericFilters'

export const agentIdSelector = state => state[PRODUCT_TYPES.APP].get('agentId');

export function apiFetchLocation(agentId: AgentId, skip: number, limit: number, filters: Filters) {
  const api = ApiGetInstance();

  return api.fetchLocationProducts(
    {agentId},
    {skip, limit});
}

export function* fetchData(action: ProdActions.ProductLoadRequestAction) {

  if (action.productType === PRODUCT_TYPES.LOCATION) {
    try {
      const {agentid, skip, limit} = action.payload;
      // const filters = action.payload.filters as Contacts.Filters;
      const data = yield call(apiFetchLocation, agentid, skip, limit, null);

      yield put(ProdActions.productsLoadSuccess(
        {productData: data, skip, limit},
        PRODUCT_TYPES.LOCATION));
    } catch (error) {
      yield put(ProdActions.productsLoadError(error, PRODUCT_TYPES.LOCATION))
    }
    ;
  }
}

export function* fetchLocation(action: LocationLoadRequestAction) {
  try {
    let agentId = yield select(agentIdSelector);

    const data = yield call(apiFetchLocation, agentId);
    yield put(locationLoadSuccess(data))
  } catch (error) {
    yield put(locationLoadFail(error))
  }
}

export function* watchLocation() {
  yield takeEvery(ProdActions.PRODUCT_LOAD_REQUEST, fetchData)
  // yield takeEvery(LOAD_LOCATION_REQUEST, fetchLocation)
  // yield takeEvery(LOAD_LOCATION_REQUEST, fetchLocation)
}
