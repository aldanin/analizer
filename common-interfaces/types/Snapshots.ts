import { Product } from './Product';

export interface SnapshotsData extends Product {
  width: string;
  height: string;
  path: string;
  url: string;
  thumbnail: string;
}