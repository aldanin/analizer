import { Product, ProductID } from 'common-interfaces/types/Product';

export interface BrowserData {
  bookmarks: {
    extracted: number;
    browsers: Browser[];
  }
  history: BrowserHistoryItem[];
  timerIndicator: number;
  updateTimeIndicator: number;
}

export interface Browser extends Product {
  type: 'browser';
  info: BrowserInfo;
  content: (BrowserDirectory | BrowserDirectoryContent)[];
}

export interface BrowserDirectory extends Product {
  type: 'directory';
  name: string;
  content: (BrowserDirectory | BrowserDirectoryContent)[];
}

export interface BrowserDirectoryContent extends Product {
  type: 'site';
  site: SiteInfo;
  url: string;
}

export interface BrowserHistoryItem extends Product {
  time: number;
  title: SiteInfo;
  url: string;
  extraUrl: string;
  browser: BrowserInfo;
}

export interface BrowserInfo {
  name: string;
  icon: string;
  url: string;
}

export interface SiteInfo {
  name: string;
  icon: string;
}

export interface BrowserTreeObject extends Product {
  parentId: browserTreeObjectId | null;
  name: string;
  type: 'browser' | 'directory' | 'site' ;
  icon: string;
  url: string;
}

export interface BrowserData {
  id: BrowserId,
}

export type browserTreeObjectId = ProductID;
export type BrowserId = ProductID
