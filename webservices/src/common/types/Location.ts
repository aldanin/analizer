import {Product} from './Product';

export interface Location extends Product {
  latitude: number
  longitude: number
  timestamp: number
}