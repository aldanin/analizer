import * as GenericFilters from '../types/GenericFilters'

export interface ProductDataState {
  limit: number,
  skip: number,
  filters: GenericFilters.Filters,
}

export interface ProductStateProps {
  productData: any,
  isFetching: boolean,
  isFirstRequest: boolean,
  isRefreshing?: boolean,
  error: string,
  productDataState: ProductDataState,
  filters: GenericFilters.Filters, // Filters.Filters
}

export const DEFAULT_PRODUCT_DATA_STATE: ProductDataState = {
  limit: 10,
  skip: 0,
  filters: null,
}
