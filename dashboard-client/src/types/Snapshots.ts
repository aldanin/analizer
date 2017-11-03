import { Product, ProductID } from 'common-interfaces/types/Product';

export interface SnapshotsData extends Product {
  frontPhoto: string;
  backPhoto: string;
  time: number;
  latitude: number;
  longitude: number;
  lastExtracted: number;
  isVertical: boolean;
}

export type SnapshotID = ProductID;
