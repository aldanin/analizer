import * as Redux from 'redux'
import { ScreenshotData, ScreenshotId } from '../../types/Screenshot'
import { Filters } from '../../types/GenericFilters'

// -------------
// User initiated
// -------------
/**
 * Load the screenshots, this action starts the request saga
 */
export const LOAD_INITIAL_SCREENSHOTS = 'Screenshots/LOAD_INITIAL'
export interface ScreenshotsLoadInitialAction extends Redux.Action {
  count: number,
}
export function screenshotsLoadInitial(count: number): ScreenshotsLoadInitialAction {
  return {
    type: LOAD_INITIAL_SCREENSHOTS,
    count,
  };
}

/**
 * Load the screenshots, this action starts the request saga
 */
export const LOAD_SCREENSHOTS = 'Screenshots/LOAD'
export interface ScreenshotsLoadAction extends Redux.Action {
  count: number,
  isOlder: boolean,
}
export function screenshotsLoad(
  count: number = 5,
  isOlder: boolean = false): ScreenshotsLoadAction {
  return {
    type: LOAD_SCREENSHOTS,
    count,
    isOlder,
  };
}

/**
 * set filters for screenshots
 */
export const SET_SCREENSHOTS_FILTERS = 'Screenshots/SET_FILTERS'
export interface ScreenshotsSetFiltersAction extends Redux.Action {
  filters: Filters,
  count: number,
}
export function screenshotsSetFilters(filters: Filters, count: number): ScreenshotsSetFiltersAction {
  return {
    type: SET_SCREENSHOTS_FILTERS,
    filters,
    count,
  };
}

/**
 * set favorite for screenshots
 */
export const SET_FAV_SCREENSHOTS = 'Screenshots/SET_FAVORITE'
export interface ScreenshotsSetFavAction extends Redux.Action {
  id: ScreenshotId,
  isFavorite: boolean,
}
export function screenshotsSetFav(id: ScreenshotId, isFavorite: boolean): ScreenshotsSetFavAction {
  return {
    type: SET_FAV_SCREENSHOTS,
    id,
    isFavorite
  };
}

// ------------
// API related
// ------------

/**
 * Load the screenshots, this action starts the request saga
 */
export const LOAD_SCREENSHOTS_REQUEST = 'Screenshots/LOAD_REQUEST'
export interface ScreenshotsLoadRequestAction extends Redux.Action {
  anchorId: ScreenshotId,
  count: number,
  isOlder: boolean,
}
export function screenshotsLoadRequest(
  anchorId: ScreenshotId,
  count: number = 5,
  isOlder: boolean = false): ScreenshotsLoadRequestAction {
  return {
    type: LOAD_SCREENSHOTS_REQUEST,
    anchorId,
    count,
    isOlder,
  };
}

/**
 * Dispatched when the screenshots are loaded by the request saga
 */
export const LOAD_SCREENSHOTS_SUCCESS = 'Screenshots/LOAD_SUCCESS'
export interface ScreenshotsLoadSuccessAction extends Redux.Action {
  data: ScreenshotData[],
  totalOldestId: ScreenshotId,
  totalNewestId: ScreenshotId,
  isOlder: boolean,
  timestamp: number,
}
export function screenshotsLoadSuccess(
  data: ScreenshotData[],
  totalOldestId: ScreenshotId,
  totalNewestId: ScreenshotId,
  isOlder: boolean,
  timestamp: number = Date.now()): ScreenshotsLoadSuccessAction {
  return {
    type: LOAD_SCREENSHOTS_SUCCESS,
    data,
    totalOldestId,
    totalNewestId,
    isOlder,
    timestamp,
  };
}

/**
 * Dispatched when loading the screenshots fails
 */
export const LOAD_SCREENSHOTS_FAIL = 'Screenshots/LOAD_FAIL'
export interface ScreenshotsLoadFailAction extends Redux.Action {
  error: Error
}
export function screenshotsLoadFail(error: Error): ScreenshotsLoadFailAction {
  return {
    type: LOAD_SCREENSHOTS_FAIL,
    error,
  };
}

/**
 * Load the screenshots, this action starts the request saga
 */
export const SET_FAV_SCREENSHOTS_REQUEST = 'Screenshots/SET_FAV_REQUEST'
export interface ScreenshotsSetFavRequestAction extends Redux.Action {
  id: ScreenshotId,
  isFavorite: boolean,
}
export function screenshotsSetFavRequest(
  id: ScreenshotId,
  isFavorite: boolean): ScreenshotsSetFavRequestAction {
  return {
    type: SET_FAV_SCREENSHOTS_REQUEST,
    id,
    isFavorite,
  };
}

/**
 * Dispatched when the screenshots are loaded by the request saga
 */
export const SET_FAV_SCREENSHOTS_SUCCESS = 'Screenshots/SET_FAV_SUCCESS'
export interface ScreenshotsSetFavSuccessAction extends Redux.Action {
  id: ScreenshotId,
  isFavorite: boolean,
}
export function screenshotsSetFavSuccess(
  id: ScreenshotId,
  isFavorite: boolean): ScreenshotsSetFavSuccessAction {
  return {
    type: SET_FAV_SCREENSHOTS_SUCCESS,
    id,
    isFavorite,
  };
}

/**
 * Dispatched when loading the screenshots fails
 */
export const SET_FAV_SCREENSHOTS_FAIL = 'Screenshots/SET_FAV_FAIL'
export interface ScreenshotsSetFavFailAction extends Redux.Action {
  error: Error
}
export function screenshotsSetFavFail(error: Error): ScreenshotsSetFavFailAction {
  return {
    type: SET_FAV_SCREENSHOTS_FAIL,
    error,
  };
}
