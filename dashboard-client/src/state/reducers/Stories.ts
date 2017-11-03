import * as Redux from 'redux'
import { StoryData } from '../../types/Story'

import {
  LOAD_STORIES_REQUEST,
  LOAD_STORIES_SUCCESS,
  LOAD_STORIES_FAIL,
} from '../actions/Stories'

import {
  StoriesLoadRequestAction,
  StoriesLoadSuccessAction,
  StoriesLoadFailAction,
} from '../actions/Stories'

// combine action types
export type Action = StoriesLoadRequestAction
  | StoriesLoadSuccessAction
  | StoriesLoadFailAction
  | Redux.Action

interface State {
  isFetching: boolean,
  lastFetchTs: number,
  error: Error | null,
  data: StoryData[],
}

export const initialState: State = {
  isFetching: false,
  lastFetchTs: 0,
  error: null,
  data: [],
}

function Stories(state: State = initialState, action: Action) {
  switch (action.type) {
    case LOAD_STORIES_REQUEST: {
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
        data: [],
      })
    }
    case LOAD_STORIES_SUCCESS: {
      const { payload, timestamp } = (<StoriesLoadSuccessAction> action)
      return Object.assign({}, state, {
        isFetching: false,
        lastFetchTs: timestamp,
        error: null,
        data: payload,
      })
    }
    case LOAD_STORIES_FAIL: {
      return Object.assign({}, state, {
        isFetching: false,
        data: [],
        error: (<StoriesLoadFailAction> action).error
      })
    }
    default:
      return state
  }
}

export default Stories
