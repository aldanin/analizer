import * as Redux from 'redux'
import { TagData } from '../../types/Tag';

export const TAGS_DATA_REQUEST = 'Tags/DATA_REQUEST';
export const TAGS_DATA_SUCCESS = 'Tags/DATA_SUCCESS';
export const TAGS_DATA_FAIL = 'Tags/DATA_FAIL';

export interface TagsDataRequestAction extends Redux.Action {
}

export function tagsDataRequest(): TagsDataRequestAction {
  return {
    type: TAGS_DATA_REQUEST,
  };
}

export interface TagsDataSuccessAction extends Redux.Action {
  data: TagData[];
}
export function tagsDataSuccess(data: TagData[]): TagsDataSuccessAction {
  return {
    type: TAGS_DATA_SUCCESS,
    data: data,
  };
}

export interface TagsDataFailAction extends Redux.Action {
  error: Error
}
export function tagsDataFail(error: Error): TagsDataFailAction {
  return {
    type: TAGS_DATA_FAIL,
    error,
  }
}
