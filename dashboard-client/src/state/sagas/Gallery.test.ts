import { delay } from 'redux-saga'
import { call, put, takeLatest } from 'redux-saga/effects'
import { watchGallery, fetchData } from './Gallery'
import { LOAD_GALLERY, galleryLoaded } from '../actions/Gallery'
import { demoGalleryData } from '../../mockData/Gallery';
import { PRODUCT_TYPES } from '../../types/Product'
import * as ProdActions from '../actions/ProductActions'

it('should do fake data fetching', () => {
  //const action = loadGallery({agentId: '1234'})
  const generator = fetchData({
    type: ProdActions.PRODUCT_LOAD_REQUEST,
    productType: PRODUCT_TYPES.GALLERY,
    payload: null
  });

  // Check that Saga asks to call the API
  expect(
    generator.next().value
  ).toEqual(
    call(delay, 1000)
  );

  const demoData = demoGalleryData;

  expect(
    generator.next().value
  ).toEqual(
    put(galleryLoaded(demoData.photos))
  );
})

it('should watch load action', () => {
  const generator = watchGallery();

  expect(
    generator.next().value
  ).toEqual(
    takeLatest(LOAD_GALLERY, fetchData)
  );
})
