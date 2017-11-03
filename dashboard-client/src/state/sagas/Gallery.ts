import { call, put, takeEvery } from 'redux-saga/effects'
import {
  // galleryLoaded,
  // LOAD_GALLERY,
  // GALLERY_SORT_DATA, galleryLoadingError, LoadGalleryAction,
} from '../actions/Gallery'
import * as ProdActions from '../actions/ProductActions'
import { PRODUCT_TYPES } from '../../types/Product'
import { Filters } from '../../types/GenericFilters'

import { GalleryData } from 'common-interfaces/types/Gallery';
// import { PhotoData } from '../../types/Photo';
import moment = require('moment');

import ApiGetInstance from '../../api'
import * as Agent from '../../types/Agent'

export function apiGetData(agentId: Agent.AgentId, skip: number, limit: number, filters: Filters) {
  const api = ApiGetInstance();

  return api.fetchGalleryProducts(
    {agentId: agentId},
    {skip, limit})
}

export function* fetchData(action: ProdActions.ProductLoadRequestAction) {

  if (action.productType === PRODUCT_TYPES.GALLERY) {
    try {
      const {agentid, skip, limit} = action.payload;
      // const filters = action.payload.filters as Contacts.Filters;
      const result = yield call(apiGetData, agentid, skip, limit, null);

      const photos = galleryNormalizeData(result);

      yield put(ProdActions.productsLoadSuccess(
        {productData: photos, skip, limit},
        PRODUCT_TYPES.GALLERY));
    } catch (error) {
      yield put(ProdActions.productsLoadError(error, PRODUCT_TYPES.GALLERY))
    }
    ;
  }
}

// export function* fetchGallery(action: LoadGalleryAction) {
//   try {
//     const product = yield call(apiFetchGallery, action.filters.agentId);
//     const data: PhotoData[] = galleryNormalizeData(product.photos);
//     yield put(ProdActions.productsLoadSuccess(
//       {productData: result, skip, limit},
//       PRODUCT_TYPES.CONTACTS));
//   } catch (error) {
//     yield put(galleryLoadingError(error));
//   }
// }

export function* watchGallery() {
  yield takeEvery(ProdActions.PRODUCT_LOAD_REQUEST, fetchData)
  // yield takeEvery(GALLERY_SORT_DATA, fetchGallery)
}

function galleryNormalizeData(products: GalleryData[]) {
  return products.map(item => {
    if (!('id' in item)) {
      throw new Error('Product missing ID');
    }
    return {
      id: item.id,
      isFavorite: ('isFavorite' in item) ? item.isFavorite : false,
      isRead: ('isRead' in item) ? item.isRead : true,
      tags: ('tags' in item) ? item.tags : [],
      path: ('path' in item) ? item.path : 'N/A',
      name: ('name' in item) ? (item as any).name : ('path' in item) ? getProductName(item.path) : 'N/A',
      url: ('url' in item) ? item.url : 'N/A',
      type: ('type' in item) ? (item as any).type : ('path' in item) ? getProductType(item.path) : 'N/A',
      width: ('width' in item) ? parseInt((item as any).width, 10) : 0,
      height: ('height' in item) ? parseInt((item as any).height, 10) : 0,
      orientation: ('orientation' in item) ? parseInt((item as any).orientation, 10) : 0,
      date: ('date' in item) ? moment(item.date).unix() * 1000 : 0,
      extracted: ('extracted' in item) ? moment(item.extracted).unix() * 1000 : 0,
    };
  })
}

function getProductName(path: string) {
  if (!path) {
    return 'N/A';
  }

  let tempArray = path.split('/');
  let name = tempArray[tempArray.length - 1];

  tempArray = name.split('.');
  return tempArray[0];

}

function getProductType(path: string) {
  if (!path) {
    return 'N/A';
  }

  let tempArray = path.split('/');
  let name = tempArray[tempArray.length - 1];

  tempArray = name.split('.');
  return tempArray[tempArray.length - 1];
}
