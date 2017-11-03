import * as Redux from 'redux'
import * as Immutable from 'immutable'
import { fromJS, is }  from 'immutable'
import galleryReducer from './Gallery'
import { initialState } from './Gallery'
import {
  loadGallery,
  galleryLoaded,
  // galleryLoadingError
} from '../actions/Gallery'
import { demoGalleryData } from '../../mockData/Gallery';

it('should provide the initial state', () => {
  expect(galleryReducer(undefined, {} as Redux.Action)).toEqual(initialState)
})

it('should handle LOAD_GALLERY actions', () => {
  type State = Immutable.Map<string, any>
  const state: State = fromJS({
    loading: true,
    error: null,
    galleryData: Immutable.Map(),
    agent_id: '1234',
    filter: 'DateAsc',
  })

  const filters = {
    agentId: '1234',
  }
  expect(is(galleryReducer(initialState, loadGallery(filters)), state)).toEqual(true);
})

it('should handle LOAD_GALLERY_SUCCESS actions', () => {
  const payload = demoGalleryData;

  const indexed = demoGalleryData;

  const resultState = initialState.set('galleryData', fromJS(indexed))
                                  .set('loading', false);
  expect(galleryReducer(initialState, galleryLoaded(payload.photos))).toEqual(resultState)
})

// it('should handle LOAD_GALLERY_FAIL actions', () => {
//   const payload = new Error('Foo bar')
//   const resultState = initialState.set('error', payload)
//                                   .set('loading', false);
//   expect(galleryReducer(initialState, galleryLoadingError(payload))).toEqual(resultState)
// })

it('should ignore unknown actions', () => {
  const state = fromJS({
    photos: [
      {
        id: 1,
        name: 1,
        url: '../../../images/1.jpg',
        date: 1489496646795,
        type: undefined,
        width: '400px',
        height: '400px',
        orientation: '0 degree',
        path: 'images/1.jpg',
        extracted: 1489496646795,
        tags: ['images', '1'],
        isFavorite: false,
        highlight: false,
      }
    ],
    timerIndicator: 1489496646795,
  })
  expect(galleryReducer(state, { type: 'unknown' })).toEqual(state)
})
