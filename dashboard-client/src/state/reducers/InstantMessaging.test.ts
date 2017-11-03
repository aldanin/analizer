import * as Redux from 'redux'
import * as Immutable from 'immutable'
import { fromJS }  from 'immutable'
import instantMessagingReducer from './InstantMessaging'
import { initialState } from './InstantMessaging'
import * as Mock from '../../mockData/InstantMessaging'
import * as Prod from '../../types/Product'
import * as ProdActions from '../actions/ProductActions'
import * as Actions from '../actions/InstantMessaging'
import * as IM from '../../types/InstantMessaging'
import * as Notmalizers from '../../common/DataNormalizers/InstantMessaging'

const conversations = Mock.getConversationsData(null, 1, 25, undefined).conversations;
const topics = Notmalizers.convertConversationsToTopics(conversations);

it('should provide the initial state', () => {
  expect(instantMessagingReducer(undefined, {} as Redux.Action)).toEqual(initialState)
})

it('should handle CHAT_MESSAGES_FILTERS_CHANGE actions', () => {
  type State = Immutable.Map<string, any>

  const action = {
    payload: {
      filters: IM.DEFAULT_FILTERS
    }
  };

  const state: State = fromJS(IM.DEFAULT_FILTERS);

  const stateResult = instantMessagingReducer(state, Actions.filtersChange(action.payload));

  expect(
    stateResult.get('filters')).toEqual(state)
})

it('should ignore unknown actions', () => {
  const state = fromJS({
    isFetching: true,
    isError: false,
    productData: [],
    isFirstRequest: true,
    filters: [],
  })
  expect(instantMessagingReducer(state, {type: 'unknown'})).toEqual(state)
})

it('should handle CHAT_MESSAGES_STATE_CHANGE actions', () => {
  type State = Immutable.Map<string, any>
  const state: State = fromJS({
    isRefreshing: true,
    isFetching: false,
    error: false,
    productData: [],
    prevChatMessagesPageNumber: 1,
    nextChatMessagesPageNumber: 1,
    specificTopicsPageWasLoaded: false,
    isFirstRequest: true,
    filters: IM.DEFAULT_FILTERS,
    chatMessagesState: {
      topicId: '1',
      prevPageNumber: 1,
      nextPageNumber: 1,
      pageSize: 2,
      isPreviousPage: false,
      isRefreshing: true,
      filters: null
    },

  })

  const payload = {
    agentId: 1,
    topicId: '1',
    prevPageNumber: 1,
    nextPageNumber: 1,
    pageSize: 2,
    isPreviousPage: false,
    isRefreshing: true,
    filters: null,
  }
  const {agentId, topicId, prevPageNumber, nextPageNumber, isRefreshing, isPreviousPage, pageSize, filters} = payload;

  expect(instantMessagingReducer(
    initialState,
    Actions.chatMessagesStateChange(
      agentId,
      topicId,
      prevPageNumber,
      nextPageNumber,
      pageSize,
      isPreviousPage,
      isRefreshing,
      filters))).toEqual(state)
})

it('should change ChatMessage isFavorite value', () => {
  const index = 0;
  const innerIndex = 0;

  const topic = topics[index];
  const chatMessage = topic.chat[index];

  chatMessage.isFavorite = false;

  const action = {
    payload: {
      id: chatMessage.id,
      isFavorite: true,
      agentId: 1
    },
    productType: Prod.PRODUCT_TYPES.CHATMESSAGE
  };

  type State = Immutable.Map<string, any>

  const state: State = fromJS({
    productData: topics,
  });


  const stateResult = instantMessagingReducer(
    state,
    ProdActions.productSetFavorite(action.payload, action.productType)
  );

  expect(
    stateResult.getIn(['productData', index, 'chat', innerIndex]).toJS().isFavorite).toEqual(true)
})

it('should remove a tag from CharMessage', () => {
  const index = 0;
  const innerIndex = 0;

  const topic = topics[index];
  const chatMessage = topic.chat[index];

  const tagsLength = chatMessage.tags.length;
  const action = {
    payload: {
      agentId: 1,
      id: chatMessage.id,
      tagId: chatMessage.tags[0],
    },
    productType: Prod.PRODUCT_TYPES.CHATMESSAGE
  };

  type State = Immutable.Map<string, any>

  const state: State = fromJS({
    productData: topics,
  });

  const stateResult = instantMessagingReducer(state, ProdActions.productRemoveTag(
    action.payload, action.productType
  ));

  const newTagsLength = stateResult.getIn(['productData', index, 'chat', innerIndex, 'tags']).toJS().length;

  expect(newTagsLength).toBeLessThan(tagsLength)
})

it('should handle adding tags to chat messages', () => {
  const index = 0;
  const innerIndex = 0;

  const topic = topics[index];
  const chatMessage = topic.chat[index];

  const tagsLength = chatMessage.tags.length;
  const action = {
    payload: {
      ids: [chatMessage.id],
      tags: ['bored-text'],
    },
    productType: Prod.PRODUCT_TYPES.CHATMESSAGE
  };

  type State = Immutable.Map<string, any>

  const state: State = fromJS({
    productData: topics,
  });

  const stateResult = instantMessagingReducer(state, ProdActions.productAddTag(action.payload, action.productType));

  const newTagsLength = stateResult.getIn(['productData', index, 'chat', innerIndex, 'tags']).toJS().length;

  expect(newTagsLength).toBeGreaterThan(tagsLength)
})

it('should change isRead value on ChatMessages', () => {
  const index = 0;
  const innerIndex = 0;

  const action = {
    payload: {
      ids: [topics[0].chat[index].id],
      isRead: true,
    },
    productType: Prod.PRODUCT_TYPES.CHATMESSAGE
  };

  type State = Immutable.Map<string, any>

  const state: State = fromJS({
    productData: topics,
  });

  const newState = instantMessagingReducer(state, ProdActions.productMarkAsRead(action.payload, action.productType));

  expect(newState.getIn(['productData', index, 'chat', innerIndex, 'isRead'])).toEqual(true);
})
