export type ProductID = number | string;

export interface Product {
  id: ProductID,
  isFavorite: boolean,
  hasNotes?: boolean,
  hasTranslation?: boolean,
  hasTranscript?: boolean,
  isRead: boolean,
  tags: string[];
}

export type ProductData = Product;

