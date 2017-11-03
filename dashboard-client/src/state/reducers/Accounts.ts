import * as Redux from 'redux'
import { fromJS }  from 'immutable'
import * as Immutable from 'immutable'
import * as Actions from '../actions/Accounts'

type State = Immutable.Map<string, any>

export type Action =
  Actions.AccountsLoadRequestAction |
  Actions.AccountsLoadSuccessAction |
  Actions.AccountsLoadFailAction |
  Actions.SetFavoriteStateAction |
  Actions.TagAction |
  Redux.Action

export const initialState: State = fromJS({
  isFetching: false,
  error: false,
  accountItemsData: [],
  nextPageNumber: 1,
  totalCount: 0,
  filters: null,
});

function accountsReducer(state: State = initialState, action: Action) {

  let tagId = null;
  let isFavorite = null;
  let accountItemId = null;
  let index = null;

  switch (action.type) {
    case Actions.ACCOUNTS_LOAD_REQUEST:
      return state
        .set('error', false)
        .set('isFetching', true);

    case Actions.ACCOUNTS_LOAD_SUCCESS:
      const {accountItemsData, nextPageNumber, totalCount, filters} =
        (<Actions.AccountsLoadSuccessAction> action).payload;
      let data = state.get('accountItemsData');

      const imm = Immutable.fromJS(accountItemsData);

      data = nextPageNumber > 2 ? data.concat(imm) : Immutable.fromJS(accountItemsData);

      return state
        .set('accountItemsData', data)
        .set('nextPageNumber', nextPageNumber)
        .set('totalCount', totalCount)
        .set('filters', filters)
        // .set('lastId', lastId)
        .set('isFetching', false)

    case Actions.ACCOUNTS_LOAD_FAIL:
      return state
        .set('error', (<Actions.AccountsLoadFailAction> action).error)

    case Actions.ACCOUNTS_SET_FAVORITE_STATE:
      isFavorite = (<Actions.SetFavoriteStateAction> action).payload.isFavorite;
      accountItemId = (<Actions.SetFavoriteStateAction> action).payload.id;

      index = state.getIn(['accountItemsData']).findIndex(x => {
        return x.get('id') === accountItemId
      });

      return state
        .setIn(['accountItemsData', index, 'isFavorite'], isFavorite);

    case Actions.ACCOUNTS_FAVORITE_STATE_SET_SUCCESS:
      isFavorite = (<Actions.SetFavoriteStateAction> action).payload.isFavorite;
      accountItemId = (<Actions.SetFavoriteStateAction> action).payload.id;

      index = state.getIn(['accountItemsData']).findIndex(x => {
        return x.get('id') === accountItemId
      });

      return state
        .setIn(['accountItemsData', index, 'isFavorite'], isFavorite);

    case Actions.ACCOUNTS_REMOVE_TAG:
      tagId = (<Actions.TagAction> action).payload.tagId;
      accountItemId = (<Actions.TagAction> action).payload.accountItemId;
      index = state.getIn(['accountItemsData']).findIndex(x => {
        const id = x.get('id');
        return id === accountItemId;
      });

      return state.updateIn(
        ['accountItemsData', index, 'tags'],
        (tags) => tags.filter(
          x => x.get('id') !== tagId
        )
      );

    case Actions.ACCOUNTS_REMOVE_TAG_SUCCESS:
      tagId = (<Actions.TagAction> action).payload.tagId;
      accountItemId = (<Actions.TagAction> action).payload.accountItemId;
      index = state.getIn(['accountItemsData']).findIndex(x => {
        const id = x.get('id');
        return id === accountItemId;
      });

      return state.updateIn(
        ['accountItemsData', index, 'tags'],
        (tags) => tags.filter(
          x => x.get('id') !== tagId
        )
      );

    case Actions.ACCOUNTS_SET_READ_STATUS_SUCCESS:
      // fixme: is this used?
      const {ids, isRead} = (<Actions.AccountsReadStatusSuccessAction> action);
      let changed = 0;
      const newItems = state.getIn(['accountItemsData']).map((x) => {
        if (ids.indexOf(x.id) >= 0 && x.isRead !== isRead) {
          changed++;
          return Object.assign({}, x, {isRead})
        } else {
          return x
        }
      });
      return Object.assign({}, state, {
        // countUnread: state.countUnread + (isRead ? -changed : changed),
        data: newItems
      });
    case Actions.ACCOUNTS_PASSWORD_SELECTION_SUCCESS:

      const accountItem = (<Actions.PasswordSelectionSuccessAction> action).payload.accountItem;
      index = state.getIn(['accountItemsData']).findIndex(x => {
        const id = x.get('id');
        return id === accountItem.id;
      });
      return state.setIn(['accountItemsData', index], Immutable.fromJS(accountItem));

    default:
      return state;
  }
}

export default accountsReducer;
