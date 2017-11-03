import { call, put, takeEvery, select, PutEffect } from 'redux-saga/effects'
import {
  fetchScreenshots,
  fetchLatestScreenshots,
  watchScreenshots,
  apiFetchScreenshots,
  apiFetchLatestScreenshots,
  filterSelector,
  idsSelector,
} from './Screenshots'
import {
  LOAD_SCREENSHOTS,
  LOAD_INITIAL_SCREENSHOTS,
  SET_SCREENSHOTS_FILTERS,
  screenshotsLoad,
  screenshotsLoadRequest,
  screenshotsLoadSuccess,
  ScreenshotsLoadSuccessAction,
  screenshotsLoadFail,
  screenshotsLoadInitial,
} from '../actions/Screenshots'
import { DEFAULT_FILTERS } from '../../types/GenericFilters'

describe('should watch all actions', () => {
  const generator = watchScreenshots();
  test('load more screenshots', () => {
    expect(
      generator.next().value
    ).toEqual(
      takeEvery(LOAD_SCREENSHOTS, fetchScreenshots)
    );
  })
  test('load screenshots', () => {
    expect(
      generator.next().value
    ).toEqual(
      takeEvery([LOAD_INITIAL_SCREENSHOTS, SET_SCREENSHOTS_FILTERS], fetchLatestScreenshots)
    );
  })
})

describe('data load flow success', () => {
  const action = screenshotsLoad(5, true)
  const generator = fetchScreenshots(action);

  it('should select ids', () => {
    // select filters
    expect(
      generator.next().value
    ).toEqual(
      select(idsSelector)
    );
  })

  it('should select flters', () => {
    // select filters
    expect(
      generator.next({oldestId: 9, newestId: 100}).value
    ).toEqual(
      select(filterSelector)
    );
  })

  it('should dispatch request started', () => {
    // dispatch request start
    expect(
      generator.next(DEFAULT_FILTERS).value
    ).toEqual(
      put(screenshotsLoadRequest(9, 5, true))
    );
  })

  it('should call the API', () => {
    // call API
    expect(
      generator.next().value
    ).toEqual(
      call(apiFetchScreenshots, 9, 5, true, DEFAULT_FILTERS)
    );
  })

  it('should dispatch the results', () => {
    // check dispatching of result
    const demoResponse = {
      data: [],
      totalOldestId: 9,
      totalNewestId: 123,
    }

    const res = generator.next(demoResponse).value as PutEffect<ScreenshotsLoadSuccessAction>
    expect(
      res
    ).toEqual(
      put(screenshotsLoadSuccess(
        demoResponse.data,
        demoResponse.totalOldestId,
        demoResponse.totalNewestId,
        true,
        res.PUT.action.timestamp))
    );
  })
})

describe('data load flow fail', () => {
  it('should dispatch fail action on fetch fail', () => {
    const action = screenshotsLoad(5, true)
    const generator = fetchScreenshots(action);
    const error = new Error('blah')

    generator.next();

    expect(
      generator.throw(error).value
    ).toEqual(
      put(screenshotsLoadFail(error))
    )
  })
})

// fetchLatestScreenshots
describe('latest data load flow success', () => {
  const action = screenshotsLoadInitial(5)
  const generator = fetchLatestScreenshots(action);

  it('should select flters', () => {
    // select filters
    expect(
      generator.next({oldestId: 9, newestId: 100}).value
    ).toEqual(
      select(filterSelector)
    );
  })

  it('should dispatch request started', () => {
    // dispatch request start
    expect(
      generator.next(DEFAULT_FILTERS).value
    ).toEqual(
      put(screenshotsLoadRequest(-1, 5, true))
    );
  })

  it('should call the API', () => {
    // call API
    expect(
      generator.next().value
    ).toEqual(
      call(apiFetchLatestScreenshots, 5, DEFAULT_FILTERS)
    );
  })

  it('should dispatch the results', () => {
    // check dispatching of result
    const demoResponse = {
      data: [],
      totalOldestId: 9,
      totalNewestId: 123,
    }

    const res = generator.next(demoResponse).value as PutEffect<ScreenshotsLoadSuccessAction>
    expect(
      res
    ).toEqual(
      put(screenshotsLoadSuccess(
        demoResponse.data,
        demoResponse.totalOldestId,
        demoResponse.totalNewestId,
        true,
        res.PUT.action.timestamp))
    );
  })
})

describe('latest data load flow fail', () => {
  it('should dispatch fail action on fetch fail', () => {
    const action = screenshotsLoadInitial(5)
    const generator = fetchLatestScreenshots(action);
    const error = new Error('blah')

    generator.next();

    expect(
      generator.throw(error).value
    ).toEqual(
      put(screenshotsLoadFail(error))
    )
  })
})
