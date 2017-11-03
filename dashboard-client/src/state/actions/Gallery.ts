import * as Redux from 'redux'
import { TagId } from '../../types/Tag';
import { ProductID } from 'common-interfaces/types/Product';

import { PhotoData } from '../../types/Photo';

export interface GalleryFiltersProps {
  agentId: string;
}

export const LOAD_GALLERY = 'Gallery/LOAD_REQUEST';
export const LOAD_GALLERY_SUCCESS = 'Gallery/LOAD_SUCCESS';
export const LOAD_GALLERY_FAIL = 'Gallery/LOAD_FAIL';
export const GALLERY_SET_STAR = 'Gallery/SET_STAR';
export const GALLERY_REMOVE_TAG = 'Gallery/REMOVE_TAG';
export const GALLERY_IMAGE_OPTION_SELECTED = 'Gallery/IMAGE_OPTION_SELECTED';
export const GALLERY_SORT_DATA = 'Gallery/SORT_DATA';

export interface LoadGalleryAction extends Redux.Action {
  error?: any;
  filters?: any;
}

export interface GalleryLoadedAction extends Redux.Action {
  gallery: PhotoData[];
}

export interface SetStarAction extends Redux.Action {
  star?: any;
}

export interface RemoveTagAction extends Redux.Action {
  tag?: any;
}

export interface ImageOptionAction extends Redux.Action {
  option?: any;
}

export interface SortOptionAction extends Redux.Action {
  sortFilter?: string;
  agentId?: string;
}

export interface StarProps {
  id: ProductID;
  isFavorite: boolean;
}

export interface RemoveTagsProps {
  photoId: ProductID;
  tagId: TagId;
}

export interface ImageOptionProps {
  photoId: ProductID;
  optionId: number;
}

/**
 * Load the gallery, this action starts the request saga
 */
export function loadGallery(filters: GalleryFiltersProps): LoadGalleryAction {
  return {
    type: LOAD_GALLERY,
    filters,
  };
}

/**
 * Dispatched when the gallery are loaded by the request saga
 */
export function galleryLoaded(gallery: PhotoData[]): GalleryLoadedAction {
  return {
    type: LOAD_GALLERY_SUCCESS,
    gallery,
  };
}

/**
 * Dispatched when loading the gallery fails
 */
export function galleryLoadingError(error: Error): LoadGalleryAction {
  return {
    type: LOAD_GALLERY_FAIL,
    error,
  };
}

/**
 * Dispatched when click on star
 */
export function setStar(star: StarProps): SetStarAction {
  return {
    type: GALLERY_SET_STAR,
    star,
  };
}

/**
 * Dispatched when click on 'x' remove tag
 */
export function removeTag(tag: RemoveTagsProps): RemoveTagAction {
  return {
    type: GALLERY_REMOVE_TAG,
    tag,
  };
}

/**
 * Dispatched when image option selected (from  component)
 */
export function imageOptionSelected(option: ImageOptionProps): ImageOptionAction {
  return {
    type: GALLERY_IMAGE_OPTION_SELECTED,
    option,
  };
}

/**
 * Dispatched when sort option selected
 */
export function sortOptionSelected(sortFilter: string, agentId: string): SortOptionAction {
  return {
    type: GALLERY_SORT_DATA,
    sortFilter,
    agentId,
  };
}
