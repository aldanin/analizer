import { Product } from './Product';

export interface GalleryData extends Product {
  date: string;
  width: string;
  height: string;
  path: string;
  extracted: string;
  url: string;
  thumbnail: string;
}