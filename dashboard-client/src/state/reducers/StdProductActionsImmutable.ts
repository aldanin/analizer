import * as Immutable from 'immutable';
import * as StdActions from '../actions/ProductActions';
import { fromJS } from 'immutable';
import { ProductStateProps, DEFAULT_PRODUCT_DATA_STATE } from '../interfaces'
import { isUndefined } from 'util';

export const initialJSState: ProductStateProps = {
  productData: [],
  isFetching: false,
  isFirstRequest: true,
  error: null,
  productDataState: DEFAULT_PRODUCT_DATA_STATE,
  isRefreshing: null,
  filters: null
}

export function stdImmutableUpdateData(path: string[],
                                       action: StdActions.ProductAction,
                                       state: Immutable.Map<string, any>) {

  switch (action.type) {
    case StdActions.PRODUCT_SET_FAVORITE: {
      const starId = (action as StdActions.ProductSetFavoriteAction).payload.id;
      const starIndex = state.getIn(path).findIndex(item => {
        return item.get('id') === starId
      });
      const tempPathShadowed = path.slice(0);
      tempPathShadowed.push(starIndex);
      tempPathShadowed.push('isFavorite');
      return state
        .setIn(tempPathShadowed, (action as StdActions.ProductSetFavoriteAction).payload.isFavorite);
    }

    case StdActions.PRODUCT_REMOVE_TAG:
      const productID = (action as StdActions.ProductRemoveTagAction).payload.id;
      const tagID = (action as StdActions.ProductRemoveTagAction).payload.tagId;
      const tagIndex = state.getIn(path).findIndex(item => {
        return item.get('id') === productID
      });
      const tempPath = path.slice(0);
      tempPath.push(tagIndex);
      tempPath.push('tags');
      return state
        .updateIn(tempPath, (tags) => tags.filter(
          (tag) => tag !== tagID)
        );

    case StdActions.PRODUCT_ADD_TAG:
      const allIDs = (action as StdActions.ProductAddTagAction).payload.ids;
      const allTags = (action as StdActions.ProductAddTagAction).payload.tags;
      return state.withMutations(tempState => {
        allIDs.forEach(id => {
          const index = tempState.getIn(path).findIndex(item => {
            return item.get('id') === id
          });
          const tempPathShadowed = path.slice(0);
          tempPathShadowed.push(index);
          tempPathShadowed.push('tags');
          allTags.map((tag) => {
            tempState.updateIn(tempPathShadowed, (tags) => tags.push(fromJS(tag)));
          })
        })
      });

    case StdActions.PRODUCT_MARK_AS_READ:
      return state.withMutations(tempState => {
        (action as StdActions.ProductAddTagAction).payload.ids.forEach(id => {
          const index = tempState.getIn(path).findIndex(item => {
            return item.get('id') === id
          });
          const tempPathShadowed = path.slice(0);
          tempPathShadowed.push(index);
          tempPathShadowed.push('isRead');
          tempState.setIn(tempPathShadowed, true);
        })
      })

    case StdActions.PRODUCT_MARK_AS_UNREAD:
      return state.withMutations(tempState => {
        (action as StdActions.ProductAddTagAction).payload.ids.forEach(id => {
          const index = tempState.getIn(path).findIndex(item => {
            return item.get('id') === id
          });
          const tempPathShadowed = path.slice(0);
          tempPathShadowed.push(index);
          tempPathShadowed.push('isRead');
          tempState.setIn(tempPathShadowed, false);
        })
      })

    case StdActions.PRODUCT_LOAD_REQUEST: {
      let {isRefreshing} = (<StdActions.ProductLoadRequestAction> action).payload;
      isRefreshing =  isUndefined(isRefreshing) ? null : isRefreshing;

      return state
        .set('error', false)
        .set('isFetching', true)
        .set('isRefreshing', isRefreshing)
    }

    case StdActions.PRODUCT_LOAD_SUCCESS: {
      const {productData, skip, limit} = (<StdActions.ProductsLoadSuccessAction> action).payload;
      let stateData = state.get('productData');

      let productDataState = state.get('productDataState');

      const newData = Immutable.fromJS(productData);
      stateData = skip > 0 ? stateData.concat(newData) : Immutable.fromJS(productData);

      productDataState = productDataState
        .set('skip', skip)
        .set('limit', limit)
      ;

      return state
        .set('productData', stateData)
        .set('isFetching', false)
        .set('isFirstRequest', false)
        .set('error', false)
        .set('productDataState', productDataState)
    }

    case StdActions.PRODUCT_LOAD_FAIL:
      return state
        .set('error', (<StdActions.ProductsLoadFailAction> action).error)
        .set('isFetching', false);

    case StdActions.RESET: {
      return state;
    }

    default:
      return state;
  }
}
