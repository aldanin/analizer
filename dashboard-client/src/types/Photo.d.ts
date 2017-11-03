import { Product } from 'common-interfaces/types/Product';

export interface PhotoData extends Product {
  name: string;
  url: string;
  date: number;
  type: string;
  width: number;
  height: number;
  orientation: number;
  path: string;
  extracted: number;
}
