import * as Redux from 'redux'
import { fromJS }  from 'immutable'
import * as Immutable from 'immutable'
import * as Actions from '../actions/Calls'
import { PRODUCT_TYPES } from '../../types/Product';
import * as ProdActions from '../actions/ProductActions'
import * as Calls from '../../types/Calls'

type State = Immutable.Map<string, any>

export type Action =
  Actions.CallsLoadRequestAction |
    Actions.CallsLoadSuccessAction |
    Actions.CallsLoadFailAction |
    Redux.Action

export const initialState: State = fromJS({
  isFetching: false,
  error: false,
  callsData: [],
  nextPageNumber: 1,
  totalCount: 0,
  filters: Calls.DEFAULT_FILTERS,
});

function callsReducer(state: State = initialState, action: Action) {
  /* tslint:disable:no-shadowed-variable*/
  let tagId = null;
  let id = null;
  let isFavorite = null;
  let index = null;
  let itemIds = null;
  let itemId = null;

  switch (action.type) {
    case Actions.CALLS_FILTERS_CHANGE:
      const filters =  (<Actions.FiltersChangeActionProps> action).payload.filters;

      return state
        .set('action', action.type)
        .set('filters', Immutable.fromJS(filters));

    case Actions.CALLS_LOAD_REQUEST:
      return state
        .set('error', false)
        .set('isFetching', true);

    case Actions.CALLS_LOAD_SUCCESS:
      const {callsData, nextPageNumber, totalCount} =
        (<Actions.CallsLoadSuccessAction> action).payload;
      let data = state.get('callsData');

      const imm = Immutable.fromJS(callsData);

      data = nextPageNumber > 2 ? data.concat(imm) : Immutable.fromJS(callsData);

      return state
        .set('callsData', data)
        .set('nextPageNumber', nextPageNumber)
        .set('totalCount', totalCount)
        .set('isFetching', false)

    case Actions.CALLS_LOAD_FAIL:
      return state
        .set('error', (<Actions.CallsLoadFailAction> action).error)
    default:
      break;
  }

  // LISTENER TO PRODUCT (GLOBAL) ACTIONS:
  //
  // Important: These generic actions will accept PATHS as IDS in order to find items,
  // as the file system is kept in the store as a tree of directory nodes:
  //
  if (
    'productType' in action && (action as ProdActions.ProductAction).productType === PRODUCT_TYPES.CALLS
  ) {
    switch (action.type) {
      case ProdActions.PRODUCT_SET_FAVORITE:
        isFavorite = (<ProdActions.ProductSetFavoriteAction> action).payload.isFavorite;
        id = (<ProdActions.ProductSetFavoriteAction> action).payload.id;

        index = state.getIn(['callsData']).findIndex(x => x.get('id') === id);

        return state
          .setIn(['callsData', index, 'isFavorite'], isFavorite);

      // case ProdActions.PRODUCT_SET_FAVORITE_SUCCESS:
      //   isFavorite = (<Actions.SetFavoriteStateAction> action).payload.isFavorite;
      //   id = (<Actions.SetFavoriteStateAction> action).payload.id;
      //
      //   index = state.getIn(['contactsData']).findIndex(x => {
      //     return x.get('id') === id
      //   });
      //
      //   return state
      //     .setIn(['contactsData', index, 'isFavorite'], isFavorite);
      case ProdActions.PRODUCT_REMOVE_TAG:
        tagId = (<ProdActions.ProductRemoveTagAction> action).payload.tagId;
        itemId = (<ProdActions.ProductRemoveTagAction> action).payload.id;
        index = state.getIn(['callsData']).findIndex(x => {
          id = x.get('id');
          return id === itemId;
        });
        return state.updateIn(
          ['callsData', index, 'tags'],
          (tags) => tags.filter(
            x => x.get('id') !== tagId
          )
        );

      case ProdActions.PRODUCT_REMOVE_TAG_SUCCESS:
        return state;

      case ProdActions.PRODUCT_ADD_TAG:
        itemIds = (action as ProdActions.ProductAddTagAction).payload.ids;
        const allTags = (action as ProdActions.ProductAddTagAction).payload.tags;
        return state.withMutations(tempState => {
          itemIds.forEach(id => {
            index = tempState.getIn(['callsData']).findIndex(x => {
              return x.get('id') === id;
            });

            allTags.map((tag) => {
              tempState.updateIn(['callsData', index, 'tags'], (tags) => tags ? tags.push(fromJS(tag)) : [tag]);
            });
          })
        })

      case ProdActions.PRODUCT_MARK_AS_READ:
        itemIds = (action as ProdActions.ProductAddTagAction).payload.ids;

        return state.withMutations(tempState => {
          itemIds.forEach(id => {
            index = tempState.getIn(['callsData']).findIndex(x => x.get('id') === id);

            tempState.setIn(['callsData', index, 'isRead'], true);
          })
        })

      case ProdActions.PRODUCT_MARK_AS_UNREAD:
        itemIds = (action as ProdActions.ProductAddTagAction).payload.ids;

        return state.withMutations(tempState => {
          itemIds.forEach(id => {
            index = tempState.getIn(['callsData']).findIndex(x => x.get('id') === id);

            tempState.setIn(['callsData', index, 'isRead'], false);
          })
        })
      default:
        return state;

    }
  }
  return state;
  /* tslint:enable:no-shadowed-variable*/
}

export default callsReducer;
