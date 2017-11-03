import { PRODUCT_TYPES } from '../../types/Product'
import * as Immutable from 'immutable'

import { stdImmutableUpdateData, initialJSState } from './StdProductActionsImmutable'
import * as StdActions from '../actions/ProductActions'
import { fromJS } from 'immutable';
import * as ContactsMock from '../../mockData/Contacts'

type State = Immutable.Map<string, any>
const state: State = fromJS({
  loading: true,
  error: null,
  galleryData: Immutable.Map(),
  agent_id: '1234',
  filter: 'DateAsc',
})

describe('basic tests', () => {
  it('should provide the initial state', () => {
    expect(stdImmutableUpdateData(['galleryData', 'photos'], {} as StdActions.ProductAction, state))
      .toEqual(state)
  })

  it('should ignore unknown actions', () => {
    expect(stdImmutableUpdateData(['galleryData', 'photos'], { type: 'unknown' } as StdActions.ProductAction, state))
      .toEqual(state)
  })
})

describe('std product actions', () => {
  it('should handle StdActions.PRODUCT_SET_FAVORITE actions', () => {
    const starState: State = fromJS({
      loading: true,
      error: null,
      galleryData: {
        photos: [{
          id: '1',
          isFavorite: true,
        }],
      },
      agent_id: '1234',
      filter: 'DateAsc',
    })
    const result: State = fromJS({
      loading: true,
      error: null,
      galleryData: {
        photos: [{
          id: '1',
          isFavorite: false,
        }],
      },
      agent_id: '1234',
      filter: 'DateAsc',
    })

    const action = StdActions.productSetFavorite({id: '1', isFavorite: false}, PRODUCT_TYPES.GALLERY);
    expect(stdImmutableUpdateData(['galleryData', 'photos'], action, starState)).toEqual(result)
  })

  it('should handle StdActions.PRODUCT_ADD_TAG actions', () => {
    const tagState: State = fromJS({
      loading: true,
      error: null,
      galleryData: {
        photos: [{
          id: '1',
          tags: [],
        }],
      },
      agent_id: '1234',
      filter: 'DateAsc',
    })
    const result: State = fromJS({
      loading: true,
      error: null,
      galleryData: {
        photos: [{
          id: '1',
          tags: ['TEST'],
        }],
      },
      agent_id: '1234',
      filter: 'DateAsc',
    })

    const action =  StdActions.productAddTag({ids: ['1'], tags: ['TEST']}, PRODUCT_TYPES.GALLERY);
    expect(stdImmutableUpdateData(['galleryData', 'photos'], action, tagState)).toEqual(result)
  })

  it('should handle StdActions.PRODUCT_REMOVE_TAG actions', () => {
    const tagRemoveState: State = fromJS({
      loading: true,
      error: null,
      galleryData: {
        photos: [{
          id: '1',
          tags: ['TEST'],
        }],
      },
      agent_id: '1234',
      filter: 'DateAsc',
    })

    const result: State = fromJS({
      loading: true,
      error: null,
      galleryData: {
        photos: [{
          id: '1',
          tags: [],
        }],
      },
      agent_id: '1234',
      filter: 'DateAsc',
    })

    const action =  StdActions.productRemoveTag({id: '1', tagId: 'TEST'}, PRODUCT_TYPES.GALLERY);
    expect(stdImmutableUpdateData(['galleryData', 'photos'], action, tagRemoveState)).toEqual(result)
  })

  it('should handle StdActions.PRODUCT_MARK_AS_READ actions', () => {
    const preState: State = fromJS({
      loading: true,
      error: null,
      galleryData: {
        photos: [{
          id: '1',
          isRead: false,
        }],
      },
      agent_id: '1234',
      filter: 'DateAsc',
    })
    const result: State = fromJS({
      loading: true,
      error: null,
      galleryData: {
        photos: [{
          id: '1',
          isRead: true,
        }],
      },
      agent_id: '1234',
      filter: 'DateAsc',
    })

    const action =  StdActions.productMarkAsRead({ids: ['1']}, PRODUCT_TYPES.GALLERY);
    expect(stdImmutableUpdateData(['galleryData', 'photos'], action, preState)).toEqual(result)
  })

  it('should handle StdActions.PRODUCT_MARK_AS_UNREAD actions', () => {
    const preState: State = fromJS({
      loading: true,
      error: null,
      galleryData: {
        photos: [{
          id: '1',
          isRead: true,
        }],
      },
      agent_id: '1234',
      filter: 'DateAsc',
    })
    const result: State = fromJS({
      loading: true,
      error: null,
      galleryData: {
        photos: [{
          id: '1',
          isRead: false,
        }],
      },
      agent_id: '1234',
      filter: 'DateAsc',
    })

    const action =  StdActions.productMarkAsUnread({ids: ['1']}, PRODUCT_TYPES.KEYLOG);
    expect(stdImmutableUpdateData(['galleryData', 'photos'], action, preState)).toEqual(result)
  })

  it('should handle StdActions.PRODUCT_LOAD_REQUEST actions', () => {

    const preState: State = fromJS(initialJSState);

    const payload: StdActions.LoadRequestPayload = {
      agentid: '1234',
      skip: 0,
      limit: 10,
      filters: null,
    }

    const result: State = fromJS({
      productData: [],
      isFetching: true,
      isFirstRequest: false,
      error: false,
      productDataState: {
        limit: 10,
        skip: 0,
        filters: null,
      },
      isRefreshing: null,
      filters: null
    })

    const action =  StdActions.productLoadRequest(payload, PRODUCT_TYPES.CONTACTS);
    expect(stdImmutableUpdateData(null, action, preState)).toEqual(result)
  })

  it('should handle StdActions.PRODUCT_LOAD_SUCCESS actions', () => {

    const productData = ContactsMock.serverContactsDataMethodForTesting({
      skip: 0,
      limit: 1,
    });

    const payload = {
      productData: productData,
      skip: 0,
      limit: 1,
    };

    const initialState = fromJS(initialJSState);

    const newTestState = initialState
      .set('productData', fromJS(productData))
      .set('isFetching', false)
      .set('isFirstRequest', false)
      .set('error', false)
      .set('productDataState', {
        skip: 1,
        limit: 1,
      })

    expect(
      stdImmutableUpdateData(
        null,
        StdActions.productsLoadSuccess(payload, PRODUCT_TYPES.CONTACTS),
        initialState)
    ).toEqual(newTestState)
  })
})
