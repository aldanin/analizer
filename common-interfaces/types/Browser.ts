import { Product } from './Product';

export interface BookmarkData extends Product {
  timestamp: string;
  name: string;
  icon: string;
  type: string;
  browser: string;
  parentId: string;
  hitRate: string;
  url: string;
}

export interface HistoryData extends Product {
  timestamp: string;
  name: string;
  icon: string;
  type: string;
  browser: string;
  parentId: string;
  hitRate: string;
  url: string;
}