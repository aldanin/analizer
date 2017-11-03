import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import * as IM from '../../types/InstantMessaging'
import * as Action from '../actions/InstantMessaging'
import * as Converters from '../../common/DataNormalizers/InstantMessaging'
import * as Mock from '../../mockData/InstantMessaging'
import ApiGetInstance from '../../api'
import { AgentId } from '../../types/Agent';
import * as API from '../../api/types'
import * as ProdActions from '../actions/ProductActions'
import { PRODUCT_TYPES } from '../../types/Product'

export function apiGetData(agentId: AgentId, nextPageNumber: number, pageSize: number, filters: IM.Filters) {
  const api = ApiGetInstance();

  const queryParams: API.ApiQueryParams = {
    skip: (nextPageNumber - 1) * pageSize,
    limit: pageSize,
  }

  return api.fetchIMProducts({agentId: agentId}, queryParams);
}

export function apiTopicsPageByTopicId(topicId: IM.TopicId,
                                       pageSize: number,
                                       filters: IM.Filters) {
  const data = Mock.getConversationsPageByConversationId(topicId, pageSize, filters);
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        resolve(data)
      },
      100)
  })
}

export function* fetchData(action: ProdActions.ProductLoadRequestAction) {
  if (action.productType === PRODUCT_TYPES.IM) {
    const {agentid, skip, limit} = action.payload;
    const filters = action.payload.filters as IM.Filters;

    try {
      const result = yield call(apiGetData, agentid, skip / limit + 1, limit, filters);

      const topics = Converters.convertConversationsToTopics(result.conversations);

      yield put(ProdActions.productsLoadSuccess(
        {productData: topics, skip, limit},
        PRODUCT_TYPES.IM));
    } catch (error) {
      yield put(ProdActions.productsLoadError(error, PRODUCT_TYPES.IM))
    }
  }
}

export function* fetchTopicsPageByTopicId(action: Action.LoadContainingTopicsPageAction) {
  const {id, pageSize, filters} = action;

  try {
    const result = yield call(apiTopicsPageByTopicId, id, pageSize, filters);
    yield put(Action.topicsLoadSuccess(
      result.topics,
      result.nextPageNumber,
      result.totalCount,
      false,
      true,
      filters));
  } catch (error) {
    yield put(ProdActions.productsLoadError(error, PRODUCT_TYPES.IM))
  }
}

export function* watchInstantMessaging() {
  yield takeLatest(ProdActions.PRODUCT_LOAD_REQUEST, fetchData)
  yield takeEvery(Action.TOPICS_LOAD_CONTAINING_PAGE, fetchTopicsPageByTopicId)
}
