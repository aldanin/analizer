import * as Redux from 'redux'
import * as Dir from '../../types/Directory'
import { FiltersData } from '../../types/Filters'

export const LOAD_DIRECTORY_CONTENT_REQUEST = 'DirectoryTree/LOAD_REQUEST'
export const LOAD_DIRECTORY_CONTENT_SUCCESS = 'DirectoryTree/LOAD_SUCCESS'
export const LOAD_DIRECTORY_TREE_FAIL = 'DirectoryTree/LOAD_FAIL'
export const TOGGLE_DIRECTORY_STATE = 'DirectoryTree/TOGGLE_DIRECTORY_STATE'
export const TOGGLE_DIRECTORY_TREE = 'DirectoryTree/TOGGLE_DIRECTORY_TREE'
export const LOAD_FILE_LIST_REQUEST = 'FileList/LOAD_REQUEST'
export const LOAD_FILE_LIST_SUCCESS = 'FileList/LOAD_SUCCESS'
export const DIRECTORY_GROUP_BY_DOMAIN = 'Directory/GROUP_BY_DOMAIN'
export const DIRECTORY_EXTRACTION_DATE_CHANGE = 'Directory/CHANGE_DATE'

export interface DirectoryAgent {
  id: number;
}

export interface DirectoryContentLoadRequestAction extends Redux.Action {
  agentId: number;
  path: string,
  filters?: FiltersData
}

export interface DirectoryLoadSuccessAction extends Redux.Action {
  payload: {
    directoryContent: Dir.DirectoryItem[],
    path: string,
    metadata: Dir.Metadata
  }
}

export interface ToggleDirectoryStateAction extends Redux.Action {
  payload: {
    path: string
  }
}

export interface DirectoryGroupByDomainAction extends Redux.Action {
  payload: {
    mode: Dir.FileListMode
  }
}

export interface DirectoryLoadFailAction extends Redux.Action {
  error: Error,
}

export interface FileListLoadRequestAction extends Redux.Action {
  agentId?: number;
  nextPageNumber: number;
  pageSize: number;
  filters: FiltersData;
}

export interface FileListLoadSuccessAction extends Redux.Action {
  payload: {
    fileList: Dir.FileItem[];
    metadata: Dir.Metadata;
    nextFileListPageNumber: number;
    totalFileListCount: number;
    filters?: FiltersData; // Return the filters object as sent in the ContactsLoadRequestAction for the next round
  }
}

export interface FileListLoadFailAction extends Redux.Action {
  error: Error,
}

/**
 * Load the directory, this action starts the request saga
 */
export function loadFilesRequest(agentId: number,
                                 nextPageNumber: number,
                                 pageSize: number,
                                 filters: FiltersData,
                                 ): FileListLoadRequestAction {

  return {
    type: LOAD_FILE_LIST_REQUEST,
    agentId,
    nextPageNumber,
    pageSize,
    filters,
  };
}

export function fileListLoadSuccess(fileList: Dir.FileItem[],
                                    metadata: Dir.Metadata,
                                    nextFileListPageNumber: number,
                                    totalFileListCount: number,
                                    filters?: FiltersData): FileListLoadSuccessAction {
  return {
    type: LOAD_FILE_LIST_SUCCESS,
    payload: {
      fileList,
      metadata,
      nextFileListPageNumber,
      totalFileListCount,
      filters
    }
  };
}

export function toggleDirectoryState(path: string): ToggleDirectoryStateAction {
  return {
    type: TOGGLE_DIRECTORY_STATE,
    payload: {
      path
    }
  };
}
export interface ToggleTreeAction extends Redux.Action {
  payload: {
    isExpanded: boolean;
  }
}
//
// Path here is always NULL. This action exists to seperate a full-tree expansion/collapsing from single-directory's
//
export function expandDirectoryTree(): ToggleTreeAction {
  return {
    type: TOGGLE_DIRECTORY_TREE,
    payload: {
      isExpanded: true
    }
  };
}

export function collapseDirectoryTree(): ToggleTreeAction {
  return {
    type: TOGGLE_DIRECTORY_TREE,
    payload: {
      isExpanded: false
    }
  };
}

export function directoryLoadRequest(agentId: number,
                                     path: string,
                                     filters?: FiltersData): DirectoryContentLoadRequestAction {
  return {
    type: LOAD_DIRECTORY_CONTENT_REQUEST,
    agentId,
    path,
    filters
  };
}

/**
 * Dispatched when the directory are loaded by the request saga
 */
export function directoryContentLoadSuccess(directoryContent: Dir.DirectoryItem[],
                                            path: string,
                                            metadata: Dir.Metadata): DirectoryLoadSuccessAction {
  return {
    type: LOAD_DIRECTORY_CONTENT_SUCCESS,
    payload: {
      directoryContent,
      path,
      metadata
    },
  };
}

/**
 * Dispatched when loading the directory fails
 */
export function loadDirectoryFail(error: Error): DirectoryLoadFailAction {
  return {
    type: LOAD_DIRECTORY_TREE_FAIL,
    error,
  };
}

/**
 * Dispatched when user press on filter group by domain
 */
export function groupByDomain(payload: {mode: Dir.FileListMode}): DirectoryGroupByDomainAction {
  return {
    type: DIRECTORY_GROUP_BY_DOMAIN,
    payload,
  };
}

export interface DirectoryChangeDateAction extends Redux.Action {
  payload: ChangeDateParams;
}

export interface ChangeDateParams {
  newDate: number;
}

export function directoryExtractionDateChange(payload: ChangeDateParams): DirectoryChangeDateAction {
  return {
    type: DIRECTORY_EXTRACTION_DATE_CHANGE,
    payload,
  };
}
