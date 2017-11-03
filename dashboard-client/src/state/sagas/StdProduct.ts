import { call, put, takeEvery, select } from 'redux-saga/effects'

import { ProductID, ProductType, PRODUCT_TYPES } from '../../types/Product';
import { TagData } from '../../types/Tag';
import { AgentId } from '../../types/Agent';

import ApiGetInstance from '../../api';

import {
  PRODUCT_ADD_TAG,
  PRODUCT_REMOVE_TAG,
  PRODUCT_SET_FAVORITE,
  PRODUCT_MARK_AS_READ,
  PRODUCT_MARK_AS_UNREAD,
  PRODUCT_ADD_TO_NOTEBOOK,
  PRODUCT_ASK_FOR_TRANSLATE,
  PRODUCT_ASK_FOR_TRANSCRIPT,
} from '../actions/ProductActions'

import {
  productActionFail,
  ProductAddTagAction,
  ProductRemoveTagAction,
  ProductSetFavoriteAction,
  ProductMarkAsReadAction,
  ProductMarkAsUnreadAction,
  ProductAddToNotebookAction,
  ProductAskForTranslateAction,
  ProductAskForTranscriptAction,
} from '../actions/ProductActions'

const FAVORITE = 'starred',
  READ = 'read',
  NOTEBOOK = 'notebook',
  TRANSLATE = 'translate',
  TRANSCRIPT = 'transcript';

// select agent ID
export const agentSelector = state => state[PRODUCT_TYPES.APP].get('agentId')

export function apiMark(
  pType: ProductType,
  ids: ProductID[],
  agentId: AgentId,
  markName: string,
  isSet: boolean
) {
  const promises = [];
  const api = ApiGetInstance();
  ids.forEach(id => {
    const meta = {
      agentId,
      productId: id as string,
      productType: pType.toLowerCase(),
    };
    if (isSet) {
      promises.push(api.addProductMark(meta, markName))
    } else {
      promises.push(api.deleteProductMark(meta, markName))
    }
  });
  return Promise.all(promises);
}

export function apiAddTag(
  pType: ProductType,
  ids: ProductID[],
  agentId: AgentId,
  tags: TagData[]
) {

  const promises = [];
  const api = ApiGetInstance();
  ids.forEach(id => {
    tags.forEach(tag => {
      const meta = {
        agentId,
        productId: id as string,
        productType: pType.toLowerCase(),
      };
      promises.push(api.addProductTag(meta, tag))
    });
  });

  return Promise.all(promises);
}

export function apiRemoveTag(
  pType: ProductType,
  id: ProductID,
  agentId: AgentId,
  tag: TagData
) {
  const meta = {
    agentId,
    productId: id as string,
    productType: pType.toLowerCase(),
  };
  return ApiGetInstance().deleteProductTag(meta, tag)
  // return new Promise((resolve, reject) => {
  //   setTimeout(
  //     () => { resolve({success: true}) },
  //     500)
  // })
}

export function* setFavorite(action: ProductSetFavoriteAction) {
  try {
    const {id, isFavorite} = action.payload
    const pType = action.productType
    const agentId = yield select(agentSelector)
    yield call(apiMark, pType, [id], agentId, FAVORITE, isFavorite)
  } catch (error) {
    yield put(productActionFail(error))
  }
}

export function* addTag(action: ProductAddTagAction) {
  try {
    const {ids, tags} = action.payload
    const pType = action.productType
    const agentId = yield select(agentSelector)
    yield call(apiAddTag, pType, ids, agentId, tags)
  } catch (error) {
    yield put(productActionFail(error))
  }
}

export function* removeTag(action: ProductRemoveTagAction) {
  try {
    const {id, tagId} = action.payload
    const pType = action.productType
    const agentId = yield select(agentSelector)
    yield call(apiRemoveTag, pType, id, agentId, tagId)
  } catch (error) {
    yield put(productActionFail(error))
  }
}

type MarkActions =
  ProductAddToNotebookAction |
  ProductAskForTranscriptAction |
  ProductAskForTranslateAction |
  ProductMarkAsReadAction |
  ProductMarkAsUnreadAction;

// mark / unmark
export function* mark(
  markName: string,
  isSet: boolean,
  action: MarkActions
) {
  try {
    const {ids} = action.payload
    const pType = action.productType
    const agentId = yield select(agentSelector)
    yield call(apiMark, pType, ids, agentId, markName, isSet)
  } catch (error) {
    yield put(productActionFail(error))
  }
}

export function* watchProductActions() {
  yield takeEvery(PRODUCT_ADD_TAG, addTag)
  yield takeEvery(PRODUCT_REMOVE_TAG, removeTag)
  yield takeEvery(PRODUCT_SET_FAVORITE, setFavorite)
  yield takeEvery(PRODUCT_MARK_AS_READ, mark, READ, true)
  yield takeEvery(PRODUCT_MARK_AS_UNREAD, mark, READ, false)
  yield takeEvery(PRODUCT_ADD_TO_NOTEBOOK, mark, NOTEBOOK, true)
  yield takeEvery(PRODUCT_ASK_FOR_TRANSCRIPT, mark, TRANSCRIPT, true)
  yield takeEvery(PRODUCT_ASK_FOR_TRANSLATE, mark, TRANSLATE, true)
}
