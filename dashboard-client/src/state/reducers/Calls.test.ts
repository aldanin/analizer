import * as Redux from 'redux'
import * as Immutable from 'immutable'
import { fromJS, is }  from 'immutable'
import callsReducer from './Calls'
import { initialState } from './Calls'
import { getData } from '../../components/CallsAppViewer/mockData/Data'
import * as Actions from '../actions/Calls'
import * as Prod from '../../types/Product'
import * as ProdActions from '../actions/ProductActions'
import * as Calls from '../../types/Calls'

const callsData = getData(1, 25, null).callsData;

describe('basic tests', () => {
  it('should provide the initial state', () => {
    expect(callsReducer(undefined, {} as Redux.Action)).toEqual(initialState)
  })

  it('should ignore unknown actions', () => {
    const state = fromJS({
      isFetching: true,
      isError: false,
      callsData: [],
      nextPageNumber: 1,
      totalCount: 0,
      filters: new Set<string>(),
    })
    expect(callsReducer(state, {type: 'unknown'})).toEqual(state)
  })
});

describe('filters tests', () => {
  it('should handle CALLS_FILTERS_CHANGE actions', () => {
    type State = Immutable.Map<string, any>

    const action = {
      payload: {
        filters: Calls.DEFAULT_FILTERS
      }
    };

    const state: State = fromJS(Calls.DEFAULT_FILTERS);

    const stateResult = callsReducer(state, Actions.filtersChange(action.payload));

    expect(
      stateResult.get('filters')).toEqual(state)
  })
});

describe('calls loading tests', () => {
  it('should handle CALLS_LOAD_REQUEST actions', () => {
    type State = Immutable.Map<string, any>
    const state: State = fromJS({
      isFetching: true,
      error: false,
      callsData: [],
      nextPageNumber: 1,
      totalCount: 0,
      filters: Calls.DEFAULT_FILTERS,
    })

    const params = {
      agentId: '1',
      nextPageNumber: 1,
      pageSize: 25,
      filters: Calls.DEFAULT_FILTERS,
      lastId: null,
    }
    const {agentId, nextPageNumber, pageSize, filters, lastId} = params;

    expect(
      is(
        callsReducer(
          initialState,
          Actions.callsLoadRequest(agentId, nextPageNumber, pageSize, filters, lastId)
        ),
        state)
      ).toEqual(true);
  })

  it('should handle LOAD_CALLS_SUCCESS actions', () => {
    const payload = {
      callsData: callsData,
      nextPageNumber: 2,
      totalCount: 25,
    };

    const newdata = Immutable.fromJS(payload.callsData);

    const newTestState = initialState
      .set('callsData', newdata)
      .set('nextPageNumber', payload.nextPageNumber)
      .set('totalCount', payload.totalCount)
      .set('isFetching', false)

    expect(callsReducer(initialState, Actions.callsLoadSuccess(callsData, 2, 25)))
      .toEqual(newTestState)
  })

  it('should handle LOAD_CALLS_FAIL actions', () => {
    const payload = new Error('Foo bar')
    const resultState = initialState.set('error', payload)

    expect(callsReducer(initialState, Actions.callsLoadError(payload))).toEqual(resultState)
  })
});

describe('calls is favorite tests', () => {
  it('should change isFavorite value', () => {
    const index = 0;
    callsData[index].isFavorite = false;

    const action = {
      payload: {
        id: callsData[index].id,
        isFavorite: true,
        // agentId: 1
      },
      productType: Prod.PRODUCT_TYPES.CALLS
    };

    type State = Immutable.Map<string, any>

    const state: State = fromJS({
      callsData: callsData,
    });

    const stateResult = callsReducer(state, ProdActions.productSetFavorite(action.payload, action.productType));

    expect(
      stateResult.getIn(['callsData', index]).toJS().isFavorite).toEqual(true)
  })

});

describe('calls is favorite tests', () => {
  it('should remove a tag from call data', () => {
    const index = 0;
    const tagsLength = callsData[index].tags.length;

    const action = {
      payload: {
        id: callsData[index].id,
        tagId: callsData[index].tags[0].id,
      },
      productType: Prod.PRODUCT_TYPES.CALLS
    };

    type State = Immutable.Map<string, any>

    const state: State = fromJS({
      callsData: callsData,
    });

    const stateResult = callsReducer(state, ProdActions.productRemoveTag(action.payload, action.productType));

    const newTagsLength = stateResult.getIn(['callsData', index, 'tags']).toJS().length;

    expect(newTagsLength).toBeLessThan(tagsLength)
  })

  it('should handle adding tags to call data', () => {
    const index = 0;
    const tagsLength = callsData[index].tags.length;
    const action = {
      payload: {
        ids: [callsData[index].id],
        tags: ['bored-text'],
      },
      productType: Prod.PRODUCT_TYPES.CALLS
    };

    type State = Immutable.Map<string, any>

    const state: State = fromJS({
      callsData: callsData,
    });

    const stateResult = callsReducer(state, ProdActions.productAddTag(action.payload, action.productType));

    const newTagsLength = stateResult.getIn(['callsData', index, 'tags']).toJS().length;

    expect(newTagsLength).toBeGreaterThan(tagsLength)
  })
});

describe('calls isRead tests', () => {
  it('should change isRead value on call data', () => {
    const index = 0;
    const action = {
      payload: {
        ids: [callsData[index].id],
        isRead: true,
      },
      productType: Prod.PRODUCT_TYPES.CALLS
    };

    type State = Immutable.Map<string, any>

    const state: State = fromJS({
      callsData: callsData,
    });

    const newState = callsReducer(state, ProdActions.productMarkAsRead(action.payload, action.productType));

    expect(newState.getIn(['callsData', index, 'isRead'])).toEqual(true);
  })
});
