import { EntityStatus } from './Enums'
import * as Prod from './Product'
import * as GenericFilters from './GenericFilters'

export interface Metadata {
  timerIndicator: number,
  updateTimeIndicator: number,
  extractionDate: number
}

export interface DirectoryItem extends Prod.ProductData {
  id: DirectoryId;
  parentDirectoryId: DirectoryId;
  type: string;
  latestUpdate: number;
  name: string;
  info: DirectoryInfo;
  content: FileSystemItem[];
}

export interface FileSystemNode {
  key: string;
  data: FileSystemItem,
  path: string,
  children: FileSystemNode[];
  isLoaded: boolean;
  expanded: boolean;
}

export interface FileItem extends Prod.ProductData {
  id: FileId;
  name: string;
  parentDirectoryId: DirectoryId;
  latestUpdate: number;
  info: FileInfo;
  type: string;
  downloadUrl: string;
}

export interface DirectoryInfo {
  path: string;
  size: number,
  dates: {
    created: number,
    modified: number,
    accessed: number
  },
  status: EntityStatus
}

export interface FileInfo {
  path: string;
  extension: string;
  size: number,
  preview: string,
  dates: {
    created: number,
    modified: number,
    accessed: number
  },
  status: EntityStatus
}

export const defaultFileinfo = {
  path: 'undecided',
  extension: 'txt',
  size: 0,
  dates: {
    created: 0,
    modified: 0,
    accessed: 0
  },
  preview: 'Preview',
  status: EntityStatus.accessed
}
export const defaultFileItem = {
  id: '-1',
  name: 'default file',
  parentDirectoryId: '0',
  latestUpdate: 0,
  info: defaultFileinfo,
  type: 'file',
  isFavorite: false,
  hasNotes: false,
  hasTranslation: false,
  hasTranscript: false,
  isRead: false,
  tags: [],
  downloadUrl: ''
}

export const defaultDirectoryinfo = {
  path: 'undecided',
  size: 0,
  dates: {
    created: 0,
    modified: 0,
    accessed: 0
  },
  status: EntityStatus.accessed
}

export const defaultDirectoryItem = {
  id: '-1',
  name: 'default dir',
  parentDirectoryId: null,
  latestUpdate: 178291111,
  info: defaultDirectoryinfo,
  type: 'directory',
  content: [],
  isFavorite: false,
  hasNotes: false,
  hasTranslation: false,
  hasTranscript: false,
  isRead: false,
  tags: [],
}

export const defaultFileSystemNode = {
  key: defaultDirectoryItem.name,
  data: defaultDirectoryItem,
  path: defaultDirectoryItem.info.path,
  children: [],
  isLoaded: false,
  expanded: false
}

export type directoryTreeObjectId = string;
export type FileId = string
export type DirectoryId = string
export type FileSystemItem = DirectoryItem | FileItem

export enum ItemType {
  directory = 1,
  file = 2
}

export enum DirectoryActionMode {
  directoryTree = 1,
  fileList = 2
}
export enum FileListMode {
  flatList = 1,
  groupedList = 2
}

export interface Filters extends GenericFilters.Filters {

}

export const DEFAULT_FILTERS = Object.assign(
  {},
  GenericFilters.DEFAULT_FILTERS)
