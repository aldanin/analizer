import * as React from 'react'
import { connect } from 'react-redux'
import InstantMessagingAppViewer from '../components/InstantMessagingAppViewer'
import scTheme from '../theme/ScTheme'
import * as Tag from '../types/Tag'
import * as Prod from '../types/Product'
import * as IM from '../types/InstantMessaging'
import * as IMCommon from 'common-interfaces/types/InstantMessaging'
import * as Actions from '../state/actions/InstantMessaging'
import * as ProdActions from '../state/actions/ProductActions'
import * as Reducer from '../state/reducers/InstantMessaging'
import * as Immutable from 'immutable'
import { PRODUCT_TYPES } from '../types/Product';
import PageStatusNoData from '../components/Common/PageStatus/index';

export interface InstantMessagingPageProps extends React.Props<InstantMessagingPage> {
  agentid: number;
  topicsData: IM.Topic[];
  chatMessagesData: { // as per the currently selected topic
    messages: IMCommon.ChatMessage[],
    totalCount: number
  },
  nextPageNumber: number; // The page which will be reqeusted when grid scroller reached the bottom
  prevChatMessagesPageNumber: number;
  nextChatMessagesPageNumber: number;
  filters: IM.Filters;
  unreadIds: IM.TopicId[];
  isFetching: boolean;
  isFirstRequest: boolean;
  isRefreshing: boolean;
  fetchedChatMessagesFirstPage: boolean; // A flag stating we have fetched chat messages page 1
  isPreviousPage: boolean; // A flag stating if chat messages page is a
  specificTopicsPageWasLoaded: boolean, // A flag stating a specific topics page was loaded
  isError: boolean;
  hasNextTopicsPage: boolean;
  hasNextChatMessagesPage: boolean;
  totalCount: number;
  loadChatMessagesPage: (agentid: number,
                         topicId: IM.TopicId,
                         prevPageNumber: number,
                         nextPageNumber: number,
                         pageSize: number,
                         isPreviousPage: boolean,
                         isRefreshing: boolean,
                         filters?: IM.Filters) => void,
  loadContainingTopicsPage: (topicId: IM.TopicId, pageSize: number, filters?: IM.Filters) => void,
  setFavorite: (id: Prod.ProductID, isFavorite: boolean) => void;
  addTags: (itemIds: Prod.ProductID[], tags: Tag.TagData[]) => void;
  removeTag: (id: Prod.ProductID, tagId: Tag.TagId) => void;
  markAsRead: (itemIds: Prod.ProductID[], isRead: boolean) => void,
  addToNotebook: (itemIds: Prod.ProductID[]) => void,
  askForTranslate: (itemId: Prod.ProductID[]) => void,
  askForTranscript: (itemId: Prod.ProductID[]) => void,
  getTranslate: (itemId: Prod.ProductID) => void,
  getTranscript: (itemId: Prod.ProductID) => void,
  openNotebook: () => void,
  exportItem: (itemId: Prod.ProductID[]) => void,
  markTopicsViewed: (ids: IM.TopicId[]) => void;
  onSliceRendered: (startIndex: number, stopIndex: number) => void;
  onFiltersChange: (filters: IM.Filters) => void;
  reset: () => void;
  keyword: string;
  params: any;
}

export const IM_PAGE_SIZE = 25;
export const CHAT_MESSAGES_PAGE_SIZE = 15;
export const FIRST_IMS_PAGE = 1;
export const FIRST_CHAT_MESSAGES_PAGE = 1;

class InstantMessagingPage extends React.Component<InstantMessagingPageProps, {}> {

  constructor(props: InstantMessagingPageProps) {
    super(props)

  }

  addTags = (chatMessageIds: Prod.ProductID[], tags: Tag.TagData[]) => {
    this.props.addTags(chatMessageIds, tags);
  }

  refreshTopics = (filters: IM.Filters, lastId?: IM.TopicId) => {
    // this.props.loadTopics(
    //   this.props.params.agent_id,
    //   FIRST_IMS_PAGE, // We typically refreshTopics when filtering has changed, so we fetch the first page
    //   IM_PAGE_SIZE,
    //   true,
    //   filters,
    //   this.props.lastId,
    // );
  }

  loadChatMessagesPage = (topicId: IM.TopicId,
                          isPreviousPage: boolean,
                          isRefreshing: boolean) => {
    if (isPreviousPage && this.props.prevChatMessagesPageNumber === 1 && !isRefreshing) {
      //
      // We need a previous page but we're at the top and are not refreshing. Should not go further:
      //
      return;
    }

    const topic = this.props.topicsData.find(tpc => tpc.id === topicId);

    //
    // No topic selected => No chat messages to load:
    //
    if (!topic) {
      return;
    }

    const pageInfo = calculateTopicPagingInfo(topic.chat, CHAT_MESSAGES_PAGE_SIZE);

    //
    // The current page limits from which we request the messages.
    // We assign 0's when refreshing the current chat by selecting a new topic from the list:
    //
    let prevPageNumber = isRefreshing ? 0 : this.props.prevChatMessagesPageNumber;
    let nextPageNumber = isRefreshing ? 0 : this.props.nextChatMessagesPageNumber;

    //
    // We've loaded the full chat. No need to go further:
    //
    if (prevPageNumber === 1 && nextPageNumber === pageInfo.totalPageCount) {
      return;
    }

    //
    // Update the page limits to be updated in the store:
    //
    if (isPreviousPage) {
      //
      // The request is to fetch a the page before:
      //
      prevPageNumber = prevPageNumber
        ? prevPageNumber - 1
        : pageInfo.totalPageCount; // FIRST_CHAT_MESSAGES_PAGE;
      nextPageNumber = nextPageNumber
        ? nextPageNumber
        : pageInfo.totalPageCount;
    } else {
      //
      // The request is to fetch the next page
      //
      if (nextPageNumber === 0) {
        nextPageNumber = FIRST_CHAT_MESSAGES_PAGE
      } else if (nextPageNumber < pageInfo.totalPageCount) {
        //
        // We havn't reached the last page yet. Increment to the next page:
        //
        nextPageNumber = nextPageNumber + 1;
      }
      prevPageNumber = prevPageNumber && !isRefreshing
        ? prevPageNumber
        : FIRST_CHAT_MESSAGES_PAGE;
    }
    //
    // Update the store:
    //
    this.props.loadChatMessagesPage(
      this.props.params.agent_id,
      topicId,
      prevPageNumber,
      nextPageNumber,
      CHAT_MESSAGES_PAGE_SIZE,
      isPreviousPage,
      isRefreshing,
      this.props.filters
    );
  }

  // loadNextTopicsPage = () => {
  //   const {nextPageNumber, loadTopics} = this.props;
  //   loadTopics(this.props.params.agent_id, nextPageNumber, IM_PAGE_SIZE, false, this.props.filters);
  // };

  loadContainingTopicsPage = (topicId: IM.TopicId) => {
    this.props.loadContainingTopicsPage(topicId, IM_PAGE_SIZE, this.props.filters);
  };

  onTopicsRangeViewed = (startIndex: number, stopIndex: number) => {
    const {topicsData} = this.props
    // convert indexes to ids
    const ids = topicsData.slice(startIndex, stopIndex).map((item) => item.id);
    // filter ids which are not already read
    // const idsToUpdate = ids.filter(id => this.props.unreadIds.indexOf(id) !== -1)
    if (ids.length > 0) {
      this.props.markTopicsViewed(ids)
    }
  };

  onCommentsClick = (messageId: IM.ChatMessageId) => {
    alert(messageId);
  }

  onSenderClick = (id: Prod.ProductID) => {
    // TODO: Implement an action
  }

  componentWillReceiveProps(nextProps: InstantMessagingPageProps) {
    if (JSON.stringify(nextProps.filters) !== JSON.stringify(this.props.filters)) {
      this.refreshTopics(nextProps.filters, null);
    }
  }

  componentWillUnmount() {
    this.props.reset();
  }

  componentDidMount() {
    // this.props.loadTopics(this.props.params.agent_id, FIRST_IMS_PAGE, IM_PAGE_SIZE, null, null);
  }

  render() {
    if ((!this.props.topicsData || !this.props.topicsData.length) && !this.props.isFirstRequest) {
      return (<PageStatusNoData/>);
    }

    const theme = scTheme.instantMessaging;

    return (
      <InstantMessagingAppViewer
        topicsData={this.props.topicsData}
        chatMessagesData={this.props.chatMessagesData}
        hasNextTopicsPage={true}
        isFetching={this.props.isFetching}
        isFirstRequest={this.props.isFirstRequest}
        isRefreshing={this.props.isRefreshing}
        specificTopicsPageWasLoaded={this.props.specificTopicsPageWasLoaded}
        fetchedChatMessagesFirstPage={this.props.fetchedChatMessagesFirstPage}
        theme={theme}
        contentHandlers={{
          setFavorite: this.props.setFavorite,
          addTags: this.props.addTags,
          removeTag: this.props.removeTag,
          markAsRead: this.props.markAsRead,
          addToNotebook: this.props.addToNotebook,
          askForTranslate: this.props.askForTranslate,
          askForTranscript: this.props.askForTranscript,
          getTranslate: this.props.getTranslate,
          getTranscript: this.props.getTranscript,
          openNotebook: this.props.openNotebook,
          exportItem: this.props.exportItem,
          refreshTopics: this.refreshTopics,
          loadChatMessagesPage: this.loadChatMessagesPage,
          loadContainingTopicsPage: this.loadContainingTopicsPage,
          onSliceRendered: this.onTopicsRangeViewed,
          onCommentsClick: this.onCommentsClick,
          onSenderClick: this.onSenderClick,
          onFiltersChange: this.props.onFiltersChange,
        }}
        filters={this.props.filters}
        keyword={this.props.keyword}
      >
        <h1>instant messaging page</h1>
      </InstantMessagingAppViewer>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const topicsData = state[PRODUCT_TYPES.IM].get('productData').toJS();
  const chatMessagesState = state[PRODUCT_TYPES.IM].get('chatMessagesState').toJS();
  const isFetching = state[PRODUCT_TYPES.IM].get('isFetching');
  const isFirstRequest = state[PRODUCT_TYPES.IM].get('isFirstRequest');
  const isRefreshing = state[PRODUCT_TYPES.IM].get('isRefreshing');
  const isError = state[PRODUCT_TYPES.IM].get('isError');
  const totalCount = state[PRODUCT_TYPES.IM].get('totalCount');
  const nextPageNumber = state[PRODUCT_TYPES.IM].get('nextPageNumber');
  const specificTopicsPageWasLoaded = state[PRODUCT_TYPES.IM].get('specificTopicsPageWasLoaded');
  const prevChatMessagesPageNumber = state[PRODUCT_TYPES.IM].getIn(['chatMessagesState', 'prevPageNumber']);
  const nextChatMessagesPageNumber = state[PRODUCT_TYPES.IM].getIn(['chatMessagesState', 'nextPageNumber']);
  const fetchedChatMessagesFirstPage = prevChatMessagesPageNumber === 1;
  const filtersImut = state[PRODUCT_TYPES.IM].get('filters');

  const filters = filtersImut ? filtersImut.toJS() : null;
  const keyword = state[PRODUCT_TYPES.SEARCH].get('keyWord');

  const chatMessagesData = getChatMessagesByAction(topicsData, chatMessagesState);

  return {
    topicsData,
    chatMessagesData,
    isFetching,
    isFirstRequest,
    isRefreshing,
    fetchedChatMessagesFirstPage,
    specificTopicsPageWasLoaded,
    isError,
    nextPageNumber,
    filters,
    hasNextTopicsPage: totalCount > topicsData.length,
    hasNextChatMessagesPage: chatMessagesData.totalCount > chatMessagesData.messages.length,
    prevChatMessagesPageNumber,
    nextChatMessagesPageNumber,
    keyword,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFavorite: (id: IM.ChatMessageId, isFavorite: boolean) => {
      dispatch(ProdActions.productSetFavorite({id, isFavorite}, Prod.PRODUCT_TYPES.CHATMESSAGE))
    },
    loadChatMessagesPage: (agentid: number,
                           topicId: IM.TopicId,
                           prevPageNumber: number,
                           nextPageNumber: number,
                           pageSize: number,
                           isPreviousPage: boolean,
                           isRefreshing: boolean,
                           chatMessagesFilters?: IM.Filters) => {
      dispatch(Actions.chatMessagesStateChange(
        agentid,
        topicId,
        prevPageNumber,
        nextPageNumber,
        pageSize,
        isPreviousPage,
        isRefreshing,
        chatMessagesFilters))
    },
    markAsRead: (ids: Prod.ProductID[], isRead: boolean) => {
      if (isRead) {
        dispatch(ProdActions.productMarkAsRead({ids: ids}, Prod.PRODUCT_TYPES.CHATMESSAGE));
      } else {
        dispatch(ProdActions.productMarkAsUnread({ids: ids}, Prod.PRODUCT_TYPES.CHATMESSAGE));
      }
    },
    addTags: (itemIds: Prod.ProductID[], tags: Tag.TagData[]) => {
      dispatch(ProdActions.productAddTag(
        {
          ids: itemIds,
          tags: tags
        },
        Prod.PRODUCT_TYPES.CHATMESSAGE))
    },
    removeTag: (id: IM.TopicId, tagId: Tag.TagId) => {
      dispatch(ProdActions.productRemoveTag({id, tagId}, Prod.PRODUCT_TYPES.CHATMESSAGE))
    },
    addToNotebook: (ids: Prod.ProductID[]) => {
      dispatch(ProdActions.productAddToNotebook({ids}, Prod.PRODUCT_TYPES.CHATMESSAGE))
    },
    askForTranslate: (ids: Prod.ProductID[]) => {
      dispatch(ProdActions.productAskForTranslate({ids}, Prod.PRODUCT_TYPES.CHATMESSAGE))
    },
    askForTranscript: (ids: Prod.ProductID[]) => {
      dispatch(ProdActions.productAskForTranscript({ids}, Prod.PRODUCT_TYPES.CHATMESSAGE))
    },
    openNotebook: () => {/* TODO: implement the function */
    },
    getTranslate: () => {/* TODO: implement the function */
    },
    getTranscript: () => {/* TODO: implement the function */
    },
    exportItem: (ids: Prod.ProductID[]) => {
      dispatch(ProdActions.productExportItem({ids}, Prod.PRODUCT_TYPES.CHATMESSAGE))
    },

    onFiltersChange: (filters: IM.Filters) => {
      dispatch(Actions.filtersChange({filters: filters}))
    },

    loadContainingTopicsPage: (id: IM.TopicId, pageSize: number, filters: IM.Filters) => {
      dispatch(Actions.loadContainingTopicsPage(id, pageSize, filters));
    },

    reset: () => {
      dispatch(ProdActions.reset(PRODUCT_TYPES.IM))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstantMessagingPage)

export const getChatMessagesByAction = (topicsData: IM.Topic[],
                                        nextChatMessagesState: Reducer.ChatMessagesState) => {
  if (!topicsData || !topicsData.length || nextChatMessagesState.topicId === '-1') {
    return {
      messages: [],
      totalCount: 0
    };
  }

  const pageSize = nextChatMessagesState.pageSize;

  const topic = topicsData.find(t => t.id === nextChatMessagesState.topicId);

  if (!topic) {
    return {
      messages: [],
      totalCount: 0
    };
  }

  const pageInfo = calculateTopicPagingInfo(topic.chat, CHAT_MESSAGES_PAGE_SIZE);
  const currentPageSize = nextChatMessagesState.nextPageNumber === pageInfo.totalPageCount
    ? pageInfo.lastPageSize
    : pageSize

  const chatMessages = topic
    ? topic.chat.slice(
      (nextChatMessagesState.prevPageNumber - 1) * pageSize,
      (nextChatMessagesState.nextPageNumber - 1) * pageSize + currentPageSize)
    : [];

  return {
    messages: Immutable.fromJS(chatMessages).toJS(),
    totalCount: topic ? topic.chat.length : 0
  };
}

//
// Calculate necessary info to handle paging requests from the chat component.
// This includes the total chat messages pages and a specific last page size.
// Notice the last page may have more than the normal page size, if there is a modulu
// when dividing total messages and the normal page size:
//
const calculateTopicPagingInfo = (chat: IMCommon.ChatMessage[], pageSize: number) => {
  const tempPageCount = Math.floor(chat.length / pageSize);
  const lastPaseSize = tempPageCount
    ? pageSize + chat.length % pageSize
    : chat.length % pageSize;

  const info = {
    totalPageCount: tempPageCount || 1,
    lastPageSize: lastPaseSize,
  };

  return info;
}

// TODO - In Reducer set values in store correctly ( current page number )
// TODO - Use nested current chat messages page instead of ouitside
// TODO - Send response down props
