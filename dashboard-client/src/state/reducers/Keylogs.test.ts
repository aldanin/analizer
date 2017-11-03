import * as Redux from 'redux'
import keylogsReducer from './Keylogs'
import { initialState as reducerInitialState } from './Keylogs'
import {
  keylogsSetFilters,
  keylogsLoadRequest,
  keylogsLoadSuccess,
  keylogsLoadFail,
} from '../actions/Keylogs'

import { KeylogData } from '../../types/Keylog'
import { DEFAULT_FILTERS } from '../../types/GenericFilters'

import * as StdActions from '../actions/ProductActions'
import { PRODUCT_TYPES } from '../../types/Product'

import { getKeystrokes } from '../../mockData/Keylogger'

describe('basic tests', () => {
  it('should provide the initial state', () => {
    expect(keylogsReducer(undefined, {} as Redux.Action)).toEqual(reducerInitialState)
  })

  it('should ignore unknown actions', () => {
    const state = {
      isFetching: false,
      lastFetchTs: 123,
      error: null,
      data: [],
      filters: DEFAULT_FILTERS,
    }
    expect(keylogsReducer(state, { type: 'unknown' })).toEqual(state)
  })
})

describe('data actions', () => {
  it('should handle LOAD_KEYLOGS_REQUEST actions', () => {
    const state = {
      isFetching: true,
      lastFetchTs: 0,
      error: null,
      data: [] as KeylogData[],
      filters: DEFAULT_FILTERS,
    }
    expect(keylogsReducer(reducerInitialState, keylogsLoadRequest())).toEqual(state)
  })

  it('should handle LOAD_KEYLOGS_SUCCESS actions', () => {
    const payload = []
    const resultState = {
      isFetching: false,
      lastFetchTs: 123456,
      error: null,
      data: payload,
      filters: DEFAULT_FILTERS,
    }

    expect(keylogsReducer(reducerInitialState, keylogsLoadSuccess(payload, 123456))).toEqual(resultState)
  })

  it('should handle LOAD_KEYLOGS_FAIL actions', () => {
    const payload = new Error('Foo bar')
    const resultState = {
      isFetching: false,
      lastFetchTs: 0,
      error: new Error('Foo bar'),
      data: [],
      filters: DEFAULT_FILTERS,
    }
    expect(keylogsReducer(reducerInitialState, keylogsLoadFail(payload))).toEqual(resultState)
  })
})

describe('filter actions', () => {
  it('should handle SET_SCREENSHOTS_FILTERS actions', () => {
    const initialState = {
      isFetching: true,
      lastFetchTs: 0,
      error: new Error('afsdfsda'),
      data: [] as KeylogData[],
      filters: DEFAULT_FILTERS,
    }
    const filters = Object.assign({}, DEFAULT_FILTERS, {search: 'asd', tags: ['3']})
    const finalState = Object.assign({}, initialState, {
      error: null,
      data: [] as KeylogData[],
      filters,
    })

    expect(keylogsReducer(initialState, keylogsSetFilters(filters, 10))).toEqual(finalState)
  })
})

describe('std product actions', () => {
  it('should handle StdActions.PRODUCT_SET_FAVORITE actions', () => {
    const item = getKeystrokes(30000, 2000)
    item.isFavorite = false

    const initialState = {
      isFetching: true,
      lastFetchTs: 0,
      error: null,
      data: [item],
      filters: DEFAULT_FILTERS,
    }
    const state = {
      isFetching: true,
      lastFetchTs: 0,
      error: null,
      data: [Object.assign({}, item, {isFavorite: true})],
      filters: DEFAULT_FILTERS,
    }

    const action =  StdActions.productSetFavorite({
      id: item.id,
      isFavorite: true
    },                                            PRODUCT_TYPES.KEYLOG)
    expect(keylogsReducer(initialState, action)).toEqual(state)
  })

  it('should handle StdActions.PRODUCT_ADD_TAG actions', () => {
    const item = getKeystrokes(30000, 2000)
    const tag = 'Foo Bar';

    const initialState = {
      isFetching: true,
      lastFetchTs: 0,
      error: null,
      data: [item],
      filters: DEFAULT_FILTERS,
    }
    const state = {
      isFetching: true,
      lastFetchTs: 0,
      error: null,
      data: [Object.assign({}, item, {tags: [tag]})],
      filters: DEFAULT_FILTERS,
    }

    const action =  StdActions.productAddTag({
      ids: [item.id],
      tags: [tag]
    },                                       PRODUCT_TYPES.KEYLOG)
    expect(keylogsReducer(initialState, action)).toEqual(state)
  })

  it('should handle StdActions.PRODUCT_REMOVE_TAG actions', () => {
    const item = getKeystrokes(30000, 2000)
    const tag = 'Foo Bar';
    item.tags = [tag]

    const initialState = {
      isFetching: true,
      lastFetchTs: 0,
      error: null,
      data: [item],
      filters: DEFAULT_FILTERS,
    }
    const state = {
      isFetching: true,
      lastFetchTs: 0,
      error: null,
      data: [Object.assign({}, item, {tags: []})],
      filters: DEFAULT_FILTERS,
    }

    const action =  StdActions.productRemoveTag({
      id: item.id,
      tagId: tag
    },                                          PRODUCT_TYPES.KEYLOG)
    expect(keylogsReducer(initialState, action)).toEqual(state)
  })

  it('should handle StdActions.PRODUCT_MARK_AS_READ actions', () => {
    const item = getKeystrokes(30000, 2000)
    item.isRead = false

    const initialState = {
      isFetching: true,
      lastFetchTs: 0,
      error: null,
      data: [item],
      filters: DEFAULT_FILTERS,
    }
    const state = {
      isFetching: true,
      lastFetchTs: 0,
      error: null,
      data: [Object.assign({}, item, {isRead: true})],
      filters: DEFAULT_FILTERS,
    }

    const action =  StdActions.productMarkAsRead({
      ids: [item.id],
    },                                           PRODUCT_TYPES.KEYLOG)
    expect(keylogsReducer(initialState, action)).toEqual(state)
  })

  it('should handle StdActions.PRODUCT_MARK_AS_UNREAD actions', () => {
    const item = getKeystrokes(30000, 2000)
    item.isRead = true

    const initialState = {
      isFetching: true,
      lastFetchTs: 0,
      error: null,
      data: [item],
      filters: DEFAULT_FILTERS,
    }
    const state = {
      isFetching: true,
      lastFetchTs: 0,
      error: null,
      data: [Object.assign({}, item, {isRead: false})],
      filters: DEFAULT_FILTERS,
    }

    const action =  StdActions.productMarkAsUnread({
      ids: [item.id],
    },                                             PRODUCT_TYPES.KEYLOG)
    expect(keylogsReducer(initialState, action)).toEqual(state)
  })
})
