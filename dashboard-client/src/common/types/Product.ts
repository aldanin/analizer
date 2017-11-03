import { TagData } from '../../types/Tag';

export type ProductID = number | string;

export interface Product {
  id: ProductID,
  isFavorite: boolean,
  hasNotes?: boolean,
  hasTranslation?: boolean,
  hasTranscript?: boolean,
  isRead: boolean,
  tags: TagData[];
}
