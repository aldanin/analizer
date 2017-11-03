import { call, put, takeEvery } from 'redux-saga/effects'
import { TAGS_DATA_REQUEST, tagsDataFail, tagsDataRequest, tagsDataSuccess } from '../actions/Tags';
import { apiFetchTags, fetchTags, watchTags } from './Tags';
import { TagData } from '../../types/Tag';

it('should do fake data fetching', () => {
  const action = tagsDataRequest()
  const generator = fetchTags(action);

  // Check that Saga asks to call the API
  expect(
    generator.next().value
  ).toEqual(
    call(apiFetchTags)
  );

  // check dispatching of result
  const demoData: TagData[] = ['Home', 'Work', 'Job', 'Family', 'Cool', 'Terror', 'Person',
    'Special', 'Unique', 'Attention', 'Weird', 'Chuck', 'New', 'Boss', 'Tag', 'Test'];

  expect(
    generator.next(demoData).value
  ).toEqual(
    put(tagsDataSuccess(demoData))
  );
})

it('should put USER_DATA_FAIL on fetch fail', () => {
  const action = tagsDataRequest()
  const generator = fetchTags(action);
  const error = new Error('blah')

  generator.next();

  expect(
    generator.throw(error).value
  ).toEqual(
    put(tagsDataFail(error))
  )
})

it('should watch load action', () => {
  const generator = watchTags();

  expect(
    generator.next().value
  ).toEqual(
    takeEvery(TAGS_DATA_REQUEST, fetchTags)
  );
})
