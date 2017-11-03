import * as Redux from 'redux'
import { fromJS } from 'immutable'
import * as Immutable from 'immutable'
import { PRODUCT_TYPES } from '../../types/Product';
import * as ProdActions from '../actions/ProductActions';
import * as Actions from '../actions/InstantMessaging'
import * as IM from '../../types/InstantMessaging'
import * as Prod from '../../types/Product'
import { ProductStateProps } from '../interfaces'
import * as stdProductReducer from './StdProductActionsImmutable'
import { stdImmutableUpdateData } from './StdProductActionsImmutable'
import { APP_SELECT_AGENT } from '../actions/App';

type State = Immutable.Map<string, any>

export type Action = Redux.Action

export interface ChatMessagesState {
  topicId: Prod.ProductID,
  prevPageNumber: number,
  nextPageNumber: number,
  pageSize: number,
  isPreviousPage: boolean,
  isRefreshing: boolean,
  filters: IM.Filters
}

/* tslint:disable:interface-name */
export interface IMStateProps extends ProductStateProps {
  chatMessagesState: ChatMessagesState,
  specificTopicsPageWasLoaded: boolean,
  filters: IM.Filters,
}
/* tslint:enable:interface-name */

const initialJSState: IMStateProps = Object.assign(stdProductReducer.initialJSState, {
  chatMessagesState: {
    topicId: '-1',
    prevPageNumber: 0,
    nextPageNumber: 0,
    pageSize: 0,
    isPreviousPage: false,
    isRefreshing: false,
    filters: null
  },
  specificTopicsPageWasLoaded: false,
  // isRefreshing: false,
  filters: IM.DEFAULT_FILTERS,
})

export const initialState: State = fromJS(initialJSState);

function instantMessagingsReducer(state: State = initialState, action: Action) {
  let payload: any = null;

  let tagId = undefined;
  let isFavorite = undefined;
  let chatMessageId = undefined;
  let index = undefined;
  let itemIds = null;
  let innerIndex = null;
  ;

  switch (action.type) {
    case APP_SELECT_AGENT:
      return initialState;

    case Actions.CHAT_MESSAGES_FILTERS_CHANGE:
      const filters = (<Actions.FiltersChangeActionProps> action).payload.filters;

      return state
        .set('action', action.type)
        .set('filters', Immutable.fromJS(filters));

    case Actions.CHAT_MESSAGES_STATE_CHANGE:
      payload = (<Actions.ChatMessagesStateChangeAction> action).payload;

      const chatMessagesState: ChatMessagesState = {
        topicId: payload.topicId,
        prevPageNumber: payload.prevPageNumber,
        nextPageNumber: payload.nextPageNumber,
        pageSize: payload.pageSize,
        isPreviousPage: payload.isPreviousPage,
        isRefreshing: payload.isRefreshing,
        filters: payload.filters
      }

      return state
        .set('error', false)
        .set('isFetching', false)
        .set('isRefreshing', payload.isRefreshing)
        .set('chatMessagesState', Immutable.fromJS(chatMessagesState))
        .set('prevChatMessagesPageNumber', payload.prevPageNumber)
        .set('nextChatMessagesPageNumber', payload.nextPageNumber)

    case Actions.TOPICS_SET_READ_STATUS_SUCCESS:
      // fixme: is this used?
      const {ids, isRead} = (<Actions.TopicsReadStatusSuccessAction> action);
      let changed = 0;
      const newItems = state.getIn(['productData']).map((x) => {
        if (ids.indexOf(x.topicId) >= 0 && x.isRead !== isRead) {
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

    default:
      break;
  }

  // LISTENER TO PRODUCT (GLOBAL) ACTIONS:
  //
  // Important: These generic actions will accept PATHS as IDS in order to find items,
  // as the file system is kept in the store as a tree of directory nodes:
  //
  if (
    'productType' in action && (action as ProdActions.ProductAction).productType === PRODUCT_TYPES.CHATMESSAGE
  ) {
    switch (action.type) {
      case ProdActions.PRODUCT_SET_FAVORITE:
        isFavorite = (<ProdActions.ProductSetFavoriteAction> action).payload.isFavorite;
        chatMessageId = (<ProdActions.ProductSetFavoriteAction> action).payload.id;

        index = state.getIn(['productData']).findIndex(topic => {
          innerIndex = topic.get('chat').findIndex(message => message.get('id') === chatMessageId);
          return innerIndex !== -1;
        });

        return state
          .setIn(['productData', index, 'chat', innerIndex, 'isFavorite'], isFavorite)
          .set('isRefreshing', false);

      case ProdActions.PRODUCT_REMOVE_TAG:
        tagId = (<ProdActions.ProductRemoveTagAction> action).payload.tagId;
        chatMessageId = (<ProdActions.ProductRemoveTagAction> action).payload.id;

        index = state.getIn(['productData']).findIndex(topic => {
          innerIndex = topic.get('chat').findIndex(message => message.get('id') === chatMessageId);
          return innerIndex !== -1;
        });

        return state
          .updateIn(
            ['productData', index, 'chat', innerIndex, 'tags'],
            (tags) => tags.filter(
              x => x !== tagId
            )
          )
          .set('isRefreshing', false);

      case ProdActions.PRODUCT_ADD_TAG:
        itemIds = (action as ProdActions.ProductAddTagAction).payload.ids;
        const allTags = (action as ProdActions.ProductAddTagAction).payload.tags;

        return state
          .withMutations(tempState => {
            itemIds.forEach(id => {
              index = state.getIn(['productData']).findIndex(topic => {
                innerIndex = topic.get('chat').findIndex(message => message.get('id') === id);
                return innerIndex !== -1;
              });

              allTags.map((tag) => {
                tempState.updateIn(
                  ['productData', index, 'chat', innerIndex, 'tags'],
                  (tags) => tags ? tags.push(fromJS(tag)) : [tag]);
              });
            })
          })
          .set('isRefreshing', false);

      case ProdActions.PRODUCT_MARK_AS_READ:
        itemIds = (action as ProdActions.ProductAddTagAction).payload.ids;

        return state
          .withMutations(tempState => {
            itemIds.forEach(id => {
              index = state.getIn(['productData']).findIndex(topic => {
                innerIndex = topic.get('chat').findIndex(message => message.get('id') === id);

                return innerIndex !== -1;
              });

              const unreadMessageCount = tempState.getIn(['productData', index, 'unreadMessageCount'])
              tempState
                .setIn(['productData', index, 'unreadMessageCount'], unreadMessageCount - 1)
                .setIn(['productData', index, 'chat', innerIndex, 'isRead'], true);
            })
          })
          .set('isRefreshing', false);

      case ProdActions.PRODUCT_MARK_AS_UNREAD:
        itemIds = (action as ProdActions.ProductAddTagAction).payload.ids;

        return state
          .withMutations(tempState => {
            itemIds.forEach(id => {
              index = state.getIn(['productData']).findIndex(topic => {
                innerIndex = topic.get('chat').findIndex(message => message.get('id') === id);

                return innerIndex !== -1;
              });

              const unreadMessageCount = tempState.getIn(['productData', index, 'unreadMessageCount'])
              tempState
                .setIn(['productData', index, 'unreadMessageCount'], unreadMessageCount - 1)
                .setIn(['productData', index, 'chat', innerIndex, 'isRead'], true);
            })
          })
          .set('isRefreshing', false);
      default:
        return state;
    }
  }

  if ('productType' in action && (action as ProdActions.ProductAction).productType === PRODUCT_TYPES.IM) {
    switch (action.type) {
      case ProdActions.PRODUCT_LOAD_SUCCESS:
        payload = (<ProdActions.ProductsLoadSuccessAction> action).payload;

        state = state
          .set('specificTopicsPageWasLoaded', payload.specificTopicsPageWasLoaded)
        break;
      case ProdActions.RESET:
        state = initialState;
        break;
      default:
        break;
    }

    return stdImmutableUpdateData(null, (action as ProdActions.ProductAction), state);
  }
  return state;
}

export default instantMessagingsReducer;
