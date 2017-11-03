import { call, put, takeLatest } from 'redux-saga/effects'
import {
  fetchAccountItems, watchAccounts, promisedGetData,
} from './Accounts'
import {
  ACCOUNTS_LOAD_REQUEST,
  accountsLoadRequest, accountsLoadSuccess,
} from '../actions/Accounts'

it('should do fake data fetching', () => {
  const action = accountsLoadRequest(1, 1, 25, null, null)
  const generator = fetchAccountItems(action);

  // Check that Saga asks to call the API
  expect(
    generator.next().value
  ).toEqual(
    call(promisedGetData, 1, 25, null)
  );

  // check dispatching of result
  const demoData = {accountItemsData: undefined, nextPageNumber: 2, totalCount: 0, filters: null}

  expect(
    generator.next(demoData).value
  ).toEqual(
    put(accountsLoadSuccess(demoData.accountItemsData, 2, demoData.totalCount, demoData.filters))
  );
})

it('should watch contacts actions', () => {
  const generator = watchAccounts();

  expect(
    generator.next().value
  ).toEqual(
    takeLatest(ACCOUNTS_LOAD_REQUEST, fetchAccountItems)
  );
})
