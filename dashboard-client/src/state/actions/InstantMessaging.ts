import * as Redux from 'redux'
import * as IM from '../../types/InstantMessaging';
import { FiltersData } from '../../types/Filters'

export const TOPICS_LOAD_SUCCESS = 'Topics/LOAD_SUCCESS';
export const TOPICS_LOAD_CONTAINING_PAGE = 'TOPICS/LOAD_CONTAINING_PAGE';
export const CHAT_MESSAGES_STATE_CHANGE = 'ChatMessages/STATE_CHANGE';
export const TOPICS_SET_READ_STATUS_SUCCESS = 'Topics/READ_STATUS_SUCCESS';
export const CHAT_MESSAGES_FILTERS_CHANGE = 'ChatMessages/FILTERS_CHANGE';
export const RESET = 'Topics/RESET';

export interface TopicsLoadSuccessAction extends Redux.Action {
  payload: {
    topicsData: IM.Topic[];
    nextPageNumber: number;
    totalCount: number;
    isRefreshing: boolean;
    specificTopicsPageWasLoaded: boolean; // A topics page containing a specific topic ( by its id ) was loaded
    filters?: FiltersData; // Return the filters object as sent in the TopicsLoadRequestAction for the next round
  }
}

export interface ResetActionProps extends Redux.Action {

}

export interface ChatMessagesStateChangeAction extends Redux.Action {
  payload: {
    agentId?: number;
    topicId: IM.TopicId;
    prevPageNumber: number;
    nextPageNumber: number;
    pageSize: number;
    isPreviousPage: boolean;
    isRefreshing: boolean;
    filters: FiltersData;
  }
}

export interface TopicsReadStatusSuccessAction extends Redux.Action {
  ids: IM.TopicId[],
  isRead: boolean,
}

export interface FiltersChangeActionProps extends Redux.Action {
  payload: {
    filters: IM.Filters
  }
}

export interface LoadContainingTopicsPageAction extends Redux.Action {
  id: IM.TopicId,
  pageSize: number,
  filters: IM.Filters
}

export interface FiltersProps {
  filters: IM.Filters
}

export function topicsLoadSuccess(topicsData: IM.Topic[],
                                  nextPageNumber: number,
                                  totalCount: number,
                                  isRefreshing: boolean,
                                  specificTopicsPageWasLoaded: boolean,
                                  filters?: FiltersData): TopicsLoadSuccessAction {
  return {
    type: TOPICS_LOAD_SUCCESS,
    payload: {
      topicsData,
      nextPageNumber,
      totalCount,
      isRefreshing,
      specificTopicsPageWasLoaded,
      filters
    }
  };
}

export function chatMessagesStateChange(agentId: number,
                                        topicId: IM.TopicId,
                                        prevPageNumber: number,
                                        nextPageNumber: number,
                                        pageSize: number,
                                        isPreviousPage: boolean,
                                        isRefreshing: boolean,
                                        filters: FiltersData): ChatMessagesStateChangeAction {

  return {
    type: CHAT_MESSAGES_STATE_CHANGE,
    payload: {
      topicId,
      agentId,
      prevPageNumber,
      nextPageNumber,
      pageSize,
      isPreviousPage,
      isRefreshing,
      filters,
    }
  };
}

export function filtersChange(payload: FiltersProps): FiltersChangeActionProps {
  return {
    type: CHAT_MESSAGES_FILTERS_CHANGE,
    payload,
  };
}

export function loadContainingTopicsPage(id: IM.TopicId,
                                         pageSize: number,
                                         filters: IM.Filters): LoadContainingTopicsPageAction {
  return {
    type: TOPICS_LOAD_CONTAINING_PAGE,
    id,
    pageSize,
    filters,
  };
}

export function reset(): ResetActionProps {
  return {
    type: RESET,
  };
}
