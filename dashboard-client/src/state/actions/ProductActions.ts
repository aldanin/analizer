import * as Redux from 'redux'
import { TagData, TagId } from '../../types/Tag';
import * as Agent from '../../types/Agent'
import { ProductID } from '../../types/Product';
// import * as Filters from '../../types/GenericFilters'
import { Filters } from '../../types/GenericFilters'

export interface ProductAction extends Redux.Action {
  productType: string;
}

export const PRODUCT_ACTION_FAIL = 'Product/ACTION_FAIL';

export interface ProductActionFailAction extends Redux.Action {
  productType ?: string
  error: Error;
}

export function productActionFail(error: Error): ProductActionFailAction {
  return {
    type: PRODUCT_ACTION_FAIL,
    error,
  };
}

export const PRODUCT_SET_FAVORITE = 'Product/SET_FAVORITE';

export interface ProductSetFavoriteAction extends ProductAction {
  payload: ProductSetFavoriteProps;
}

export interface ProductSetFavoriteProps {
  id: ProductID;
  isFavorite: boolean;
}

/**
 * Dispatched when user click on 'Add tag' in the action menu
 */
export function productSetFavorite(payload: ProductSetFavoriteProps,
                                   productType: string): ProductSetFavoriteAction {
  return {
    type: PRODUCT_SET_FAVORITE,
    productType,
    payload,
  };
}

export const PRODUCT_ADD_TAG = 'Product/ADD_TAG';

export interface ProductAddTagAction extends ProductAction {
  payload: ProductAddTagProps;
}

export interface ProductAddTagProps {
  ids: ProductID[];
  tags: TagData[];
}

/**
 * Dispatched when user click on 'Add tag' in the action menu
 */
export function productAddTag(payload: ProductAddTagProps,
                              productType: string): ProductAddTagAction {
  return {
    type: PRODUCT_ADD_TAG,
    productType,
    payload,
  };
}

export const PRODUCT_REMOVE_TAG = 'Product/REMOVE_TAG';

export interface ProductRemoveTagAction extends ProductAction {
  payload: ProductRemoveTagProps;
}

export interface ProductRemoveTagProps {
  id: ProductID;
  tagId: TagId;
}

/**
 * Dispatched when user click on 'Remove tag' in the action menu
 */
export function productRemoveTag(payload: ProductRemoveTagProps,
                                 productType: string): ProductRemoveTagAction {
  return {
    type: PRODUCT_REMOVE_TAG,
    productType,
    payload,
  };
}

export const PRODUCT_REMOVE_TAG_SUCCESS = 'Product/REMOVE_TAG_SUCCESS';

export function productRemoveTagSuccess(payload: ProductRemoveTagProps,
                                        productType: string): ProductRemoveTagAction {
  return {
    type: PRODUCT_REMOVE_TAG_SUCCESS,
    productType,
    payload,
  };
}

export const PRODUCT_REMOVE_TAG_FAIL = 'Product/REMOVE_TAG_FAIL';

export function productRemoveTagFail(error: Error,
                                     productType: string): ProductActionFailAction {
  return {
    type: PRODUCT_REMOVE_TAG_FAIL,
    productType,
    error,
  };
}

export const PRODUCT_ADD_TO_NOTEBOOK = 'Product/ADD_TO_NOTEBOOK';

export interface ProductAddToNotebookAction extends ProductAction {
  payload: ProductAddToNotebookProps;
}

export interface ProductAddToNotebookProps {
  ids: ProductID[];
}

/**
 * Dispatched when user click on 'Add to notebook' in the action menu
 */
export function productAddToNotebook(payload: ProductAddToNotebookProps,
                                     productType: string): ProductAddToNotebookAction {
  return {
    type: PRODUCT_ADD_TO_NOTEBOOK,
    productType,
    payload,
  };
}

export const PRODUCT_MARK_AS_READ = 'Product/MARK_AS_READ';

export interface ProductMarkAsReadAction extends ProductAction {
  payload: ProductMarkAsReadProps;
}

export interface ProductMarkAsReadProps {
  ids: ProductID[];
}

/**
 * Dispatched when user click on 'Mark as read' in the action menu
 */
export function productMarkAsRead(payload: ProductMarkAsReadProps,
                                  productType: string): ProductMarkAsReadAction {
  return {
    type: PRODUCT_MARK_AS_READ,
    productType,
    payload,
  };
}

export const PRODUCT_MARK_AS_UNREAD = 'Product/MARK_AS_UNREAD';

export interface ProductMarkAsUnreadAction extends ProductAction {
  payload: ProductMarkAsUnreadProps;
}

export interface ProductMarkAsUnreadProps {
  ids: ProductID[];
}

/**
 * Dispatched when user click on 'Mark as unread' in the action menu
 */
export function productMarkAsUnread(payload: ProductMarkAsUnreadProps,
                                    productType: string): ProductMarkAsUnreadAction {
  return {
    type: PRODUCT_MARK_AS_UNREAD,
    productType,
    payload,
  };
}

export const PRODUCT_ASK_FOR_TRANSLATE = 'Product/ASK_FOR_TRANSLATE';

export interface ProductAskForTranslateAction extends ProductAction {
  payload: ProductAskForTranslateProps;
}

export interface ProductAskForTranslateProps {
  ids: ProductID[];
}

/**
 * Dispatched when user click on 'Ask for translate' in the action menu
 */
export function productAskForTranslate(payload: ProductAskForTranslateProps,
                                       productType: string): ProductAskForTranslateAction {
  return {
    type: PRODUCT_ASK_FOR_TRANSLATE,
    productType,
    payload,
  };
}

export const PRODUCT_ASK_FOR_TRANSCRIPT = 'Product/ASK_FOR_TRANSCRIPT';

export interface ProductAskForTranscriptAction extends ProductAction {
  payload: ProductAskForTranscriptProps;
}

export interface ProductAskForTranscriptProps {
  ids: ProductID[];
}

/**
 * Dispatched when user click on 'Ask for transcript' in the action menu
 */
export function productAskForTranscript(payload: ProductAskForTranscriptProps,
                                        productType: string): ProductAskForTranscriptAction {
  return {
    type: PRODUCT_ASK_FOR_TRANSCRIPT,
    productType,
    payload,
  };
}

export const PRODUCT_SELECT_ITEM = 'Product/SELECT_ITEM';

export interface ProductSelectItemAction extends ProductAction {
  payload: ProductSelectItemProps;
}

export interface ProductSelectItemProps {
  id: ProductID;
}

/**
 * Dispatched when user click on 'Ask for transcript' in the action menu
 */
export function productSelectItem(payload: ProductSelectItemProps,
                                  productType: string): ProductSelectItemAction {
  return {
    type: PRODUCT_SELECT_ITEM,
    productType,
    payload,
  };
}

export const PRODUCT_EXPORT_ITEM = 'Product/EXPORT_ITEM';

export interface ProductExportItemAction extends ProductAction {
  payload: ProductExportItemProps;
}

export interface ProductExportItemProps {
  ids: ProductID[];
}

/**
 * Dispatched when user click on 'Export item' in the action menu
 */
export function productExportItem(payload: ProductExportItemProps,
                                  productType: string): ProductExportItemAction {
  return {
    type: PRODUCT_EXPORT_ITEM,
    productType,
    payload,
  };
}

export const PRODUCT_DOWNLOAD_FILE_REQUEST = 'Product/DOWNLOAD_FILE_REQUEST';
export const PRODUCT_DOWNLOAD_FILE_SUCCESS = 'Product/DOWNLOAD_FILE_SUCCESS';
export const PRODUCT_DOWNLOAD_FILE_FAIL = 'Product/DOWNLOAD_FILE_FAIL';
export const PRODUCT_LOAD_REQUEST = 'Product/LOAD_REQUEST';
export const PRODUCT_LOAD_SUCCESS = 'Product/LOAD_SUCCESS';
export const PRODUCT_LOAD_FAIL = 'Product/LOAD_FAIL';

export interface DownloadFileProps {
  url: string
}

export interface ProductDownloadFileAction extends ProductAction {
  payload: {
    url: string
  }
}

export function downloadFile(payload: DownloadFileProps,
                             productType: string): ProductDownloadFileAction {
  return {
    type: PRODUCT_DOWNLOAD_FILE_REQUEST,
    productType,
    payload,
  };
}

// export const PRODUCT_BOOLEAN_FILTERS_CHANGE = 'Product/BOOLEAN_FILTERS_CHANGE';
//
// export interface BooleanFiltersProps {
//   filters: Filters
// }
//
// export interface BooleanFiltersChangeActionProps extends ProductAction {
//   payload: {
//     filters: Filters
//   }
// }
//
// export function filtersChange(payload: BooleanFiltersProps,
//                               productType: string): BooleanFiltersChangeActionProps {
//   return {
//     type: PRODUCT_BOOLEAN_FILTERS_CHANGE,
//     productType,
//     payload,
//   };
// }

export const RESET = 'Product/RESET';

export function reset(productType: string): ProductAction {
  return {
    type: RESET,
    productType
  };
}

export interface LoadRequestPayload {
  agentid: Agent.AgentId;
  skip: number;
  limit: number;
  //
  // Inform the store/user components that completely new data is requested,
  // usually by filter changes or sorting.
  // Notice: This prop may be substituted by a different mechanism later on:
  //
  isRefreshing?: boolean;
  filters: Filters;
}

export interface ProductLoadRequestAction extends Redux.Action {
  type: string,
  productType: string,
  payload: LoadRequestPayload,
}

export function productLoadRequest(payload: LoadRequestPayload,
                                   productType: string): ProductLoadRequestAction {

  return {
    type: PRODUCT_LOAD_REQUEST,
    productType,
    payload,
  };
}

export interface LoadSuccessPayload {
  skip: number;
  limit: number;
  productData: any;
  timestamp?: number;
}

export interface ProductsLoadSuccessAction extends ProductAction {
  type: string;
  productType: string;
  payload: LoadSuccessPayload;
}

export function productsLoadSuccess(payload: LoadSuccessPayload,
                                    productType: string): ProductsLoadSuccessAction {

  return {
    type: PRODUCT_LOAD_SUCCESS,
    productType,
    payload,
  };
}

export interface ProductsLoadFailAction extends ProductAction {
  error: Error,
}

export function productsLoadError(error: Error,
                                  productType: string): ProductsLoadFailAction {
  return {
    type: PRODUCT_LOAD_FAIL,
    productType,
    error,
  };
}
