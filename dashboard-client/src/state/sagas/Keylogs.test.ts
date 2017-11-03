import { call, put, takeEvery, select, PutEffect } from 'redux-saga/effects'
import {
  fetchKeylogs,
  watchKeylogs,
  apiFetchKeylogs,
  filterSelector,
} from './Keylogs'
import {
  LOAD_KEYLOGS,
  SET_KEYLOGS_FILTERS,
  keylogsLoad,
  keylogsLoadRequest,
  keylogsLoadSuccess,
  keylogsLoadFail,
  KeylogsLoadSuccessAction,
} from '../actions/Keylogs'
import { DEFAULT_FILTERS } from '../../types/GenericFilters'

describe('should watch all actions', () => {
  const generator = watchKeylogs();

  it('should watch load action', () => {
    expect(
      generator.next().value
    ).toEqual(
      takeEvery([LOAD_KEYLOGS, SET_KEYLOGS_FILTERS], fetchKeylogs)
    );
  })
})

describe('data load flow success', () => {
  const action = keylogsLoad(5)
  const generator = fetchKeylogs(action);

  it('should select flters', () => {
    // select filters
    expect(
      generator.next({oldestId: 9, newestId: 100}).value
    ).toEqual(
      select(filterSelector)
    );
  })

  it('should dispatch request started', () => {
    expect(
      generator.next(DEFAULT_FILTERS).value
    ).toEqual(
      put(keylogsLoadRequest())
    );
  })

  it('should call the API', () => {
    expect(
      generator.next().value
    ).toEqual(
      call(apiFetchKeylogs, 5, DEFAULT_FILTERS)
    );
  })

  it('should dispatch the results', () => {
    const demoResponse = []

    const res = generator.next(demoResponse).value as PutEffect<KeylogsLoadSuccessAction>
    expect(
      res
    ).toEqual(
      put(keylogsLoadSuccess(demoResponse, res.PUT.action.timestamp))
    )
  })
})

describe('data load flow fail', () => {
  it('should dispatch fail action on fetch fail', () => {
    const action = keylogsLoad(7)
    const generator = fetchKeylogs(action);
    const error = new Error('blah')

    generator.next();

    expect(
      generator.throw(error).value
    ).toEqual(
      put(keylogsLoadFail(error))
    )
  })
})
