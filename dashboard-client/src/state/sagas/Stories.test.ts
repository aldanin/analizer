import { call, put, takeEvery, PutEffect } from 'redux-saga/effects'
import { fetchStories, watchStories, apiFetchStories } from './Stories'
import {
  LOAD_STORIES,
  storiesLoad,
  storiesLoadRequest,
  storiesLoadSuccess,
  storiesLoadFail,
  StoriesLoadSuccessAction
} from '../actions/Stories'

describe('should watch all actions', () => {
  const generator = watchStories();

  it('should watch load action', () => {
    expect(
      generator.next().value
    ).toEqual(
      takeEvery(LOAD_STORIES, fetchStories)
    );
  })
})

describe('data load flow success', () => {
  const action = storiesLoad(5)
  const generator = fetchStories(action);

  it('should dispatch request started', () => {
    expect(
      generator.next().value
    ).toEqual(
      put(storiesLoadRequest())
    );
  })

  it('should call the API', () => {
    expect(
      generator.next().value
    ).toEqual(
      call(apiFetchStories, 5)
    );
  })

  it('should dispatch the results', () => {
    const demoResponse = []

    const res = generator.next(demoResponse).value as PutEffect<StoriesLoadSuccessAction>
    expect(
      res
    ).toEqual(
      put(storiesLoadSuccess(demoResponse, res.PUT.action.timestamp))
    )
  })
})

describe('data load flow fail', () => {
  it('should dispatch fail action on fetch fail', () => {
    const action = storiesLoad(7)
    const generator = fetchStories(action);
    const error = new Error('blah')

    generator.next();

    expect(
      generator.throw(error).value
    ).toEqual(
      put(storiesLoadFail(error))
    )
  })
})
