import { PRODUCT_TYPES } from '../../types/Product'

import stdUpdateData from './StdProductActionPlainJs'
import * as StdActions from '../actions/ProductActions'

function getProduct() {
  return {
    id: 123,
    isFavorite: false,
    hasNotes: false,
    hasTranslation: false,
    isRead: false,
    tags: [],
  }
}

describe('basic tests', () => {
  it('should provide the initial state', () => {
    expect(stdUpdateData([], {} as StdActions.ProductAction)).toEqual([])
  })

  it('should ignore unknown actions', () => {
    const state = []
    expect(stdUpdateData([], {type: 'unknown'} as StdActions.ProductAction)).toEqual(state)
  })
})

describe('std product actions', () => {
  it('should handle StdActions.PRODUCT_SET_FAVORITE actions', () => {
    const item = getProduct()
    item.isFavorite = false

    const initialState = [item]
    const state = [Object.assign({}, item, {isFavorite: true})]

    const action = StdActions.productSetFavorite({
      id: item.id,
      isFavorite: true
    }, PRODUCT_TYPES.KEYLOG)
    expect(stdUpdateData(initialState, action)).toEqual(state)
  })

  it('should handle StdActions.PRODUCT_ADD_TAG actions', () => {
    const item = getProduct()
    const tag = 'Foo Bar'

    const initialState = [item]
    const state = [Object.assign({}, item, {tags: [tag]})]

    const action = StdActions.productAddTag({
      ids: [item.id],
      tags: [tag]
    }, PRODUCT_TYPES.KEYLOG)
    expect(stdUpdateData(initialState, action)).toEqual(state)
  })

  it('should handle StdActions.PRODUCT_REMOVE_TAG actions', () => {
    const item = getProduct()
    const tag = 'Foo Bar'
    item.tags = [tag]

    const initialState = [item]
    const state = [Object.assign({}, item, {tags: []})]

    const action = StdActions.productRemoveTag({
      id: item.id,
      tagId: tag
    }, PRODUCT_TYPES.KEYLOG)
    expect(stdUpdateData(initialState, action)).toEqual(state)
  })

  it('should handle StdActions.PRODUCT_MARK_AS_READ actions', () => {
    const item = getProduct()
    item.isRead = false

    const initialState = [item]
    const state = [Object.assign({}, item, {isRead: true})]

    const action = StdActions.productMarkAsRead({
      ids: [item.id],
    }, PRODUCT_TYPES.KEYLOG)
    expect(stdUpdateData(initialState, action)).toEqual(state)
  })

  it('should handle StdActions.PRODUCT_MARK_AS_UNREAD actions', () => {
    const item = getProduct()
    item.isRead = true

    const initialState = [item]
    const state = [Object.assign({}, item, {isRead: false})]

    const action = StdActions.productMarkAsUnread({
      ids: [item.id],
    }, PRODUCT_TYPES.KEYLOG)
    expect(stdUpdateData(initialState, action)).toEqual(state)
  })

  it('should handle StdActions.PRODUCT_LOAD_REQUEST actions', () => {
    const payload: StdActions.LoadRequestPayload = {
      agentid: '1234',
      skip: 0,
      limit: 10,
      filters: null,
    }

    const result = {
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
    }

    const action = StdActions.productLoadRequest(payload, PRODUCT_TYPES.CONTACTS);
    expect(stdUpdateData([], action)).toEqual(result)
  })
})
