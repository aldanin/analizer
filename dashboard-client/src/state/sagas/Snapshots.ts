import { call, put, takeEvery, } from 'redux-saga/effects'
import {
  // LOAD_SNAPSHOTS_REQUEST,
  SnapshotsLoadRequestAction,
  snapshotsLoadSuccess,
  snapshotsLoadFail
} from '../actions/Snapshots'
import * as ProdActions from '../actions/ProductActions'
import ApiGetInstance from '../../api'
import { SnapshotsData } from '../../types/Snapshots';
import { Filters } from '../../types/GenericFilters'
import { SnapshotsData as SnapshotServerData } from 'common-interfaces/types/Snapshots';
import moment = require('moment');
import { AgentId } from '../../types/Agent';
import { PRODUCT_TYPES } from '../../types/Product'

export function apiFetchData(agentId: AgentId, skip: number, limit: number, filters: Filters) {
  const api = ApiGetInstance();

  return api.fetchSnapshotsProducts(
    {agentId},
    {skip, limit})
}

export function* fetchSnapshots(action: SnapshotsLoadRequestAction) {
  try {
    const products = yield call(apiFetchData, action.agent);
    const data: SnapshotsData[] = snapshotsNormalizeData(products);
    yield put(snapshotsLoadSuccess(data))
  } catch (error) {
    yield put(snapshotsLoadFail(error))
  }
}

export function* fetchData(action: ProdActions.ProductLoadRequestAction) {

  if (action.productType === PRODUCT_TYPES.SNAPSHOTS) {
    try {
      const {agentid, skip, limit} = action.payload;
      // const filters = action.payload.filters as Contacts.Filters;
      const result = yield call(apiFetchData, agentid, skip, limit, null);

      const data: SnapshotsData[] = snapshotsNormalizeData(result);

      yield put(ProdActions.productsLoadSuccess(
        {productData: data, skip, limit},
        PRODUCT_TYPES.SNAPSHOTS));
    } catch (error) {
      yield put(ProdActions.productsLoadError(error, PRODUCT_TYPES.SNAPSHOTS))
    }
    ;
  }
}

export function* watchSnapshots() {
  yield takeEvery(ProdActions.PRODUCT_LOAD_REQUEST, fetchData)
}

function snapshotsNormalizeData(products: SnapshotServerData[]) {
  return products.map(item => {
    if (!('id' in item)) {
      throw new Error('Product missing ID');
    }
    return {
      id: item.id,
      isFavorite: ('isFavorite' in item) ? item.isFavorite : false,
      isRead: ('isRead' in item) ? item.isRead : true,
      tags: ('tags' in item) ? item.tags : [],
      frontPhoto: ('frontPhoto' in item) ? (item as any).frontPhoto : ('url' in item) ? item.url : 'N/A',
      backPhoto: ('backPhoto' in item) ? (item as any).backPhoto : ('url' in item) ? item.url : 'N/A',
      time: ('date' in item) ? moment((item as any).date).unix() * 1000 : 0,
      lastExtracted: ('extracted' in item) ? moment((item as any).extracted).unix() * 1000 : 0,
      isVertical: ('isVertical' in item) ? (item as any).isVertical : true,
      latitude: ('latitude' in item) ? (item as any).latitude : 0,
      longitude: ('longitude' in item) ? (item as any).longitude : 0,
    };
  })
}
