import * as Redux from 'redux'
import * as Immutable from 'immutable'
import { fromJS }  from 'immutable'
import { TagData } from '../../types/Tag';
import {
  TAGS_DATA_FAIL, TAGS_DATA_REQUEST, TAGS_DATA_SUCCESS, TagsDataFailAction,
  TagsDataRequestAction, TagsDataSuccessAction
} from '../actions/Tags';

export type Action = TagsDataRequestAction
  | TagsDataSuccessAction
  | TagsDataFailAction
  | Redux.Action

interface State extends Immutable.Map<string, any>  {
  isFetching: boolean,
  error: Error | null,
  data: TagData[],
}

export const initialState: State = fromJS({
  isFetching: true,
  error: null,
  data: [],
})

function Tags(state: State = initialState, action: Action) {
  switch (action.type) {
    case TAGS_DATA_REQUEST: {
      return state
        .set('isFetching', true)
    }
    case TAGS_DATA_SUCCESS: {
      const data = (action as TagsDataSuccessAction).data;
      return state
        .set('isFetching', false)
        .set('error', null)
        .set('data', fromJS(data))
    }
    case TAGS_DATA_FAIL: {
      return state
        .set('isFetching', false)
        .set('error', (<TagsDataFailAction> action).error)
        .set('data', fromJS([]))
    }

    default:
  }
  return state;
}

export default Tags
