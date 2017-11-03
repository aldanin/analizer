import * as Redux from 'redux'
import { StoryData } from '../../types/Story'

// -------------
// User initiated
// -------------
export const LOAD_STORIES = 'Stories/LOAD'
export interface StoriesLoadAction extends Redux.Action {
  count: number,
}
export function storiesLoad(count: number): StoriesLoadAction {
  return {
    type: LOAD_STORIES,
    count,
  };
}

// ------------
// API related
// ------------
/**
 * Load the stories, this action starts the request saga
 */
export const LOAD_STORIES_REQUEST = 'Stories/LOAD_REQUEST'
export interface StoriesLoadRequestAction extends Redux.Action {
}
export function storiesLoadRequest(): StoriesLoadRequestAction {
  return {
    type: LOAD_STORIES_REQUEST,
  };
}

/**
 * Dispatched when the stories are loaded by the request saga
 */
export const LOAD_STORIES_SUCCESS = 'Stories/LOAD_SUCCESS'
export interface StoriesLoadSuccessAction extends Redux.Action {
  payload: StoryData[],
  timestamp: number,
}
export function storiesLoadSuccess(payload: StoryData[], timestamp: number = Date.now()): StoriesLoadSuccessAction {
  return {
    type: LOAD_STORIES_SUCCESS,
    payload,
    timestamp,
  };
}

/**
 * Dispatched when loading the stories fails
 */
export const LOAD_STORIES_FAIL = 'Stories/LOAD_FAIL'
export interface StoriesLoadFailAction extends Redux.Action {
  error: Error
}
export function storiesLoadFail(error: Error): StoriesLoadFailAction {
  return {
    type: LOAD_STORIES_FAIL,
    error,
  };
}
