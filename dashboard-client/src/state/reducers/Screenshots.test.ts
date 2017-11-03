import * as Redux from 'redux'
import screenshotsReducer from './Screenshots'
import { initialState as reducerInitialState } from './Screenshots'
import {
  screenshotsLoadInitial,
  screenshotsLoad,
  screenshotsSetFilters,
  screenshotsSetFav,
  screenshotsSetFavRequest,
  screenshotsSetFavSuccess,
  screenshotsSetFavFail,
  screenshotsLoadRequest,
  screenshotsLoadSuccess,
  screenshotsLoadFail,
} from '../actions/Screenshots'

import { ScreenshotData, INITIAL_ID } from '../../types/Screenshot'
import { DEFAULT_FILTERS } from '../../types/GenericFilters'

describe('basic tests', () => {
  it('should provide the initial state', () => {
    expect(screenshotsReducer(undefined, {} as Redux.Action)).toEqual(reducerInitialState)
  })

  it('should ignore unknown actions', () => {
    const state = {
      isFetching: false,
      lastFetchTs: 0,
      error: null,
      data: [],
      oldestId: 4,
      newestId: 1234,
      totalOldestId: INITIAL_ID,
      totalNewestId: INITIAL_ID,
      filters: DEFAULT_FILTERS,
    }
    expect(screenshotsReducer(state, { type: 'unknown' })).toEqual(state)
  })
})

describe('initial data load actions', () => {

  it('should handle LOAD_INITIAL_SCREENSHOTS actions', () => {
    const initialState = {
      isFetching: false,
      lastFetchTs: 0,
      error: new Error('foo barr'),
      data: [] as ScreenshotData[],
      oldestId: INITIAL_ID, // id of oldest item
      newestId: INITIAL_ID, // id of newest item
      totalOldestId: INITIAL_ID,
      totalNewestId: INITIAL_ID,
      filters: DEFAULT_FILTERS,
    }
    const finalState = {
      isFetching: false,
      lastFetchTs: 0,
      error: null,
      data: [] as ScreenshotData[],
      oldestId: INITIAL_ID, // id of oldest item
      newestId: INITIAL_ID, // id of newest item
      totalOldestId: INITIAL_ID,
      totalNewestId: INITIAL_ID,
      filters: DEFAULT_FILTERS,
    }
    expect(screenshotsReducer(initialState, screenshotsLoadInitial(3))).toEqual(finalState)
  })
})

describe('more data load actions', () => {
  it('should handle LOAD_SCREENSHOTS actions', () => {
    const initialState = {
      isFetching: true,
      lastFetchTs: 1234,
      error: null,
      data: [] as ScreenshotData[],
      oldestId: 1,
      newestId: 2,
      totalOldestId: 1,
      totalNewestId: 6,
      filters: DEFAULT_FILTERS,
    }
    expect(screenshotsReducer(initialState, screenshotsLoad(3))).toEqual(initialState)
  })

  it('should handle LOAD_SCREENSHOTS_REQUEST actions', () => {
    const state = {
      isFetching: true,
      lastFetchTs: 0,
      error: null,
      data: [] as ScreenshotData[],
      oldestId: INITIAL_ID, // id of oldest item
      newestId: INITIAL_ID, // id of newest item
      totalOldestId: INITIAL_ID,
      totalNewestId: INITIAL_ID,
      filters: DEFAULT_FILTERS,
    }
    expect(screenshotsReducer(reducerInitialState, screenshotsLoadRequest(3))).toEqual(state)
  })

  it('should handle LOAD_SCREENSHOTS_SUCCESS actions', () => {
    const payload = []
    const resultState = {
      isFetching: false,
      lastFetchTs: 123456,
      error: null,
      data: payload,
      oldestId: INITIAL_ID,
      newestId: INITIAL_ID,
      totalOldestId: 0,
      totalNewestId: 1000,
      filters: DEFAULT_FILTERS,
    }

    expect(
      screenshotsReducer(
        reducerInitialState,
        screenshotsLoadSuccess(payload, 0, 1000, false, 123456))).toEqual(resultState)
  })

  it('should handle LOAD_SCREENSHOTS_FAIL actions', () => {
    const payload = new Error('Foo bar')
    const resultState = {
      isFetching: false,
      lastFetchTs: 0,
      error: new Error('Foo bar'),
      data: [],
      oldestId: INITIAL_ID,
      newestId: INITIAL_ID,
      totalOldestId: INITIAL_ID,
      totalNewestId: INITIAL_ID,
      filters: DEFAULT_FILTERS,
    }
    expect(screenshotsReducer(reducerInitialState, screenshotsLoadFail(payload))).toEqual(resultState)
  })
})

describe('filter actions', () => {

  it('should handle SET_SCREENSHOTS_FILTERS actions', () => {
    const initialState = {
      isFetching: true,
      lastFetchTs: 1234,
      error: new Error('afsdfsda'),
      data: [{}] as ScreenshotData[],
      oldestId: 1,
      newestId: 2,
      totalOldestId: 1,
      totalNewestId: 6,
      filters: DEFAULT_FILTERS,
    }
    const filters = Object.assign({}, DEFAULT_FILTERS, {search: 'asd', tags: ['3']})
    const finalState = Object.assign({}, initialState, {
      error: null,
      data: [] as ScreenshotData[],
      filters,
    })

    expect(screenshotsReducer(initialState, screenshotsSetFilters(filters, 10))).toEqual(finalState)
  })
})

// favorite is now part of std product actions
describe.skip('favorite actions', () => {
  it('should handle SET_FAV_SCREENSHOTS actions', () => {
    const initialState = {
      isFetching: true,
      lastFetchTs: 1234,
      error: new Error('afsdfsda'),
      data: [] as ScreenshotData[],
      oldestId: 1,
      newestId: 2,
      totalOldestId: 1,
      totalNewestId: 6,
      filters: DEFAULT_FILTERS,
    }
    expect(screenshotsReducer(initialState, screenshotsSetFav(3, false))).toEqual(initialState)
  })

  it('should handle SET_FAV_SCREENSHOTS_REQUEST actions', () => {
    const finalState = {
      isFetching: true,
      lastFetchTs: 0,
      error: null,
      data: [] as ScreenshotData[],
      oldestId: INITIAL_ID, // id of oldest item
      newestId: INITIAL_ID, // id of newest item
      totalOldestId: INITIAL_ID,
      totalNewestId: INITIAL_ID,
      filters: DEFAULT_FILTERS,
    }
    expect(screenshotsReducer(reducerInitialState, screenshotsSetFavRequest(3, true))).toEqual(finalState)
  })

  it('should handle SET_FAV_SCREENSHOTS_SUCCESS actions', () => {
    const initialState = {
      isFetching: true,
      lastFetchTs: 123456,
      error: null,
      data: [{
        id: 2,
        imageUrl: '',
        timeTaken: 0,
        timeExtracted: 2,
        clicks: [],
        width: 100,
        height: 100,
        isFavorite: false,
      }] as ScreenshotData[],
      oldestId: 2,
      newestId: 2,
      totalOldestId: 1,
      totalNewestId: 6,
      filters: DEFAULT_FILTERS,
    }
    const finalState = {
      isFetching: false,
      lastFetchTs: 123456,
      error: null,
      data: [{
        id: 2,
        imageUrl: '',
        timeTaken: 0,
        timeExtracted: 2,
        clicks: [],
        width: 100,
        height: 100,
        isFavorite: true,
      }] as ScreenshotData[],
      oldestId: 2,
      newestId: 2,
      totalOldestId: 1,
      totalNewestId: 6,
      filters: DEFAULT_FILTERS,
    }

    expect(
      screenshotsReducer(
        initialState,
        screenshotsSetFavSuccess(2, true))).toEqual(finalState)
  })

  it('should handle SET_FAV_SCREENSHOTS_FAIL actions', () => {
    const payload = new Error('Foo bar')
    const resultState = {
      isFetching: false,
      lastFetchTs: 0,
      error: new Error('Foo bar'),
      data: [],
      oldestId: INITIAL_ID,
      newestId: INITIAL_ID,
      totalOldestId: INITIAL_ID,
      totalNewestId: INITIAL_ID,
      filters: DEFAULT_FILTERS,
    }
    expect(screenshotsReducer(reducerInitialState, screenshotsSetFavFail(payload))).toEqual(resultState)
  })
})
