import * as StdActions from '../actions/ProductActions'
import { ProductData } from '../../types/Product'
import { ProductStateProps, DEFAULT_PRODUCT_DATA_STATE } from '../interfaces'

export const initialJSState: ProductStateProps = {
  productData: [],
  isFetching: false,
  isFirstRequest: true,
  error: null,
  productDataState: DEFAULT_PRODUCT_DATA_STATE,
  filters: null
}

export default function stdUpdateData(data: ProductData[], action: StdActions.ProductAction) {
  switch (action.type) {
    case StdActions.PRODUCT_SET_FAVORITE: {
      const {id, isFavorite} = (action as StdActions.ProductSetFavoriteAction).payload
      return data.map(item => {
        return item.id === id ?
          Object.assign({}, item, {isFavorite: isFavorite}) :
          item
      })
    }
    case StdActions.PRODUCT_ADD_TAG: {
      const {ids, tags} = (action as StdActions.ProductAddTagAction).payload
      return data.map(item => {
        return ids.indexOf(item.id) !== -1 ?
          Object.assign({}, item, {tags: item.tags.concat(tags)}) :
          item
      })
    }
    case StdActions.PRODUCT_REMOVE_TAG: {
      const {id, tagId} = (action as StdActions.ProductRemoveTagAction).payload
      return data.map(item => {
        return item.id === id ?
          Object.assign({}, item, {
            tags: item.tags.filter(tag => tag !== tagId)
          }) :
          item
      })
    }
    case StdActions.PRODUCT_MARK_AS_READ: {
      const {ids} = (action as StdActions.ProductMarkAsReadAction).payload
      return data.map(item => {
        return ids.indexOf(item.id) !== -1 ?
          Object.assign({}, item, {isRead: true}) :
          item
      })
    }
    case StdActions.PRODUCT_MARK_AS_UNREAD: {
      const {ids} = (action as StdActions.ProductMarkAsUnreadAction).payload
      return data.map(item => {
        return ids.indexOf(item.id) !== -1 ?
          Object.assign({}, item, {isRead: false}) :
          item
      })
    }

    case StdActions.PRODUCT_LOAD_REQUEST: {
      return Object.assign({}, {
        isFetching: true,
        error: null,
      })
    }

    default: {
      return data
    }
  }
}
