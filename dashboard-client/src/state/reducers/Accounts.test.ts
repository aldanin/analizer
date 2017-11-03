import * as Redux from 'redux'
import * as Immutable from 'immutable'
import { fromJS, is }  from 'immutable'
import accountsReducer from './Accounts'
import { initialState } from './Accounts'
import { getData } from '../../components/AccountsAppViewer/mockData/Data'
import {
  accountsLoadRequest,
  accountsLoadSuccess,
  accountsLoadError, accountsSetFavoriteState, removeTag,
} from '../actions/Accounts'

const accountItems = getData(1, 25, null).accountItems;

it('should provide the initial state', () => {
  expect(accountsReducer(undefined, {} as Redux.Action)).toEqual(initialState)
})

it('should handle ACCOUNTS_LOAD_REQUEST actions', () => {
  type State = Immutable.Map<string, any>
  const state: State = fromJS({
    isFetching: true,
    error: false,
    accountItemsData: [],
    nextPageNumber: 1,
    totalCount: 0,
    filters: null,
  })

  const params = {
    agentId: 1,
    nextPageNumber: 1,
    pageSize: 25,
    filters: null,
    lastId: null,
  }
  const {agentId, nextPageNumber, pageSize, filters, lastId} = params

  expect(
    is(
      accountsReducer(
        initialState,
        accountsLoadRequest(agentId, nextPageNumber, pageSize, filters, lastId)
      ),
      state)
    ).toEqual(true);
})

it('should handle LOAD_ACCOUNTS_SUCCESS actions', () => {
  const payload = {
    accountItemsData: accountItems,
    nextPageNumber: 2,
    totalCount: 25,
    filters: null,
  };

  const newdata = Immutable.fromJS(payload.accountItemsData);

  const newTestState = initialState
    .set('accountItemsData', newdata)
    .set('nextPageNumber', payload.nextPageNumber)
    .set('totalCount', payload.totalCount)
    .set('filters', payload.filters)
    // .set('lastId', lastId)
    .set('isFetching', false)

  expect(accountsReducer(initialState, accountsLoadSuccess(accountItems, 2, 25, null))).toEqual(newTestState)
})

it('should handle LOAD_ACCOUNTS_FAIL actions', () => {
  const payload = new Error('Foo bar')
  const resultState = initialState.set('error', payload)

  expect(accountsReducer(initialState, accountsLoadError(payload))).toEqual(resultState)
})

it('should ignore unknown actions', () => {
  const state = fromJS({
    isFetching: true,
    isError: false,
    accountItem: [],
    nextPageNumber: 1,
    totalCount: 0,
    filters: [],
  })
  expect(accountsReducer(state, {type: 'unknown'})).toEqual(state)
})

it('should change isFavorite value', () => {
  const index = 0;
  accountItems[index].isFavorite = false;

  const payload = {
    id: accountItems[index].id,
    isFavorite: true,
    agentId: 1
  };

  type State = Immutable.Map<string, any>

  const state: State = fromJS({
    accountItemsData: accountItems,
  });

  const stateResult = accountsReducer(state, accountsSetFavoriteState(
    payload.agentId, payload.id, payload.isFavorite
  ));

  expect(
    stateResult.getIn(['accountItemsData', index]).toJS().isFavorite).toEqual(true)
})

it('should remove a tag from accountItem', () => {
  const index = 0;
  const tagsLength = accountItems[index].tags.length;
  const payload = {
    agentId: 1,
    id: accountItems[index].id,
    tagId: accountItems[index].tags[0].id,
  };

  type State = Immutable.Map<string, any>

  const state: State = fromJS({
    accountItemsData: accountItems,
  });

  const stateResult = accountsReducer(state, removeTag(
    payload.agentId, payload.id, payload.tagId
  ));

  const newTagsLength = stateResult.getIn(['accountItemsData', index, 'tags']).toJS().length;

  expect(newTagsLength).toBeLessThan(tagsLength)
})
