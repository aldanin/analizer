import {call, put, takeLatest} from 'redux-saga/effects'
import * as  Sagas from './InstantMessaging'
import * as Actions from '../actions/InstantMessaging'
import * as ProdActions from '../actions/ProductActions'
import { PRODUCT_TYPES } from '../../types/Product'

it('should do fake topics topicsData fetching', () => {

  const action = ProdActions.productLoadRequest({
    agentid: '1',
    skip: 0,
    limit: 10,
    isRefreshing: null,
    filters: null
  }, PRODUCT_TYPES.IM)

  const generator = Sagas.fetchData(action);
  // Check that Saga asks to call the API
  expect(
    generator.next().value
  ).toEqual(
    call(Sagas.apiGetData, '1', 0, 10, null)
  );

  // check dispatching of result
  const demoData = {productData: undefined}

  expect(
    generator.next(demoData).value
  ).toEqual(
    put(ProdActions.productsLoadSuccess({
      productData: null, skip: 0, limit: 10
    }, PRODUCT_TYPES.IM))
  );
})

it('should watch IM actions', () => {
  const generator = Sagas.watchInstantMessaging();

  expect(
    generator.next().value
  ).toEqual(
    takeLatest(Actions.TOPICS_LOAD_CONTAINING_PAGE, Sagas.fetchTopicsPageByTopicId)
  );
})
