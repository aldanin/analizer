import * as React from 'react'
import TopicsGrid from './grid/TopicsGrid'
import ChatArea from './chatArea/ChatArea'
import * as IMCommon from 'common-interfaces/types/InstantMessaging'
import * as IM from '../../types/InstantMessaging'
import * as Prod from '../../types/Product'
import * as Tags from '../../types/Tag'
import * as Theme from './Theme'
import styled, { ThemeProvider } from 'styled-components';
import { withTheme } from 'styled-components'
import { FiltersData } from '../../types/Filters'

import DataFetcher from '../../containers/DataFetcherGeneric'
import { PRODUCT_TYPES } from '../../types/Product'

const TopicsGridWithDataFetcher = DataFetcher(
  TopicsGrid, PRODUCT_TYPES.IM, 25)

export interface ContentProps extends React.Props<InstantMessagingContent> {
  topicsData: IM.Topic[],
  chatMessagesData: {
    messages: IMCommon.ChatMessage[],
    totalCount: number
  },
  isFetching: boolean,
  hasNextTopicsPage: boolean,
  isRefreshing?: boolean,
  specificTopicsPageWasLoaded: boolean,
  fetchedChatMessagesFirstPage: boolean,
  theme: Theme.ThemeProps,
  handlers: {
    addTags: (itemIds: Prod.ProductID, tags: Tags.TagData[]) => void,
    removeTag: (id: Prod.ProductID, tagId: Tags.TagId) => void,
    setFavorite: (id: Prod.ProductID, isFavorite: boolean) => void,
    markAsRead: (itemIds: Prod.ProductID[], isRead: boolean) => void,
    addToNotebook: (itemIds: Prod.ProductID) => void,
    askForTranslate: (itemIds: Prod.ProductID) => void,
    askForTranscript: (itemIds: Prod.ProductID) => void,
    getTranslate: (itemIds: Prod.ProductID) => void,
    getTranscript: (itemId: Prod.ProductID) => void,
    openNotebook: () => void,
    exportItem: (itemIds: Prod.ProductID) => void,
    loadChatMessagesPage: (topicId: Prod.ProductID,
                           isPreveiousPage: boolean,
                           isRefreshing: boolean) => void,
    loadNextTopicsPage: (isPrevious: boolean) => void,
    loadContainingTopicsPage: (topicId: Prod.ProductID, filters?: FiltersData) => void,
    onSliceRendered: (startIndex: number, stopIndex: number) => void
    onHeaderClick: (sortBy: string, desc: boolean) => void,
    onCommentsClick: (messageId: IM.ChatMessageId) => void;
    onSenderClick: (id: Prod.ProductID) => void,
  },
}

export interface ContentState {
  selectedTopic: IM.Topic,
  forcedSelection: boolean,
}

const Root = styled.div`
      height: calc(100% - 112px);
      width: 100%;
      overflow: hidden;
      position: relative;
`;

// FIXME: border color should come from Theme
const Grid = styled.div`
      display: flex;
      height: 100%;
      width: 410px;
      float: left;
      align-content: flex-start;
      border-right: solid 1px silver;
      padding: 0 5px 5px 5px;
`;
const ChatAreaWrap = styled.div`
      display: flex;
      float: right;
      width: calc(100% - 412px);
      background-color: ${(props) => props.theme.chatArea.bgColor};
      height: 100%;
      position: absolute;
      right: 0;
`;

class InstantMessagingContent extends React.Component<ContentProps, ContentState> {
  private nextChatMessagesPage: number;
  //
  // In case a group was selected for a chat message and the group topic had to be fetched from api'
  // here we save the group's topic id so we return to it when fetched:
  //
  private specificTopicId: IM.TopicId;

  constructor(props: ContentProps) {
    super(props);

    this.state = {
      selectedTopic: IM.defaultTopic,
      forcedSelection: false,
    };
    this.nextChatMessagesPage = 1;
    this.specificTopicId = null;
  }

  onTopicsGridRowClick = (topic: IM.Topic, forcedSelection?: boolean) => {
    if (!this.state.selectedTopic || topic.id !== this.state.selectedTopic.id) {
      this.setState({
        selectedTopic: topic,
        forcedSelection: forcedSelection || false
      });
      //
      // Please notice: the 2nd parameter, isPervPage should be tru as we always want the LAST page
      // to be fetched first when the topic is selected:
      //
      this.props.handlers.loadChatMessagesPage(topic.id, true, true);
    }
  }

  onStatisticsTimespanChange = (value: number) => {
    alert('changed to ' + value);
  }

  onCommonGroupSelected = (topicId: Prod.ProductID) => {
    const topic = this.props.topicsData.find(gr => gr.id === topicId);
    if (topic) {
      this.onTopicsGridRowClick(topic, true);
    } else {
      //
      // Group was not found i.e. it wasn't loaded yet. We need to load it with its page:
      //
      this.specificTopicId = topicId;
      this.props.handlers.loadContainingTopicsPage(topicId)
    }

  }

  loadChatMessagesPage = (isPreviousPage: boolean,
                          isRefreshing?: boolean) => {
    if (this.state.selectedTopic) {
      const topic = this.state.selectedTopic;

      this.props.handlers.loadChatMessagesPage(
        topic.id,
        isPreviousPage,
        isRefreshing || false);
    }
  }

  componentWillReceiveProps(nextProps: ContentProps) {
    let found;

    //
    // Here we determine when we want to simulate a topic selection to actually select a topic,
    // and then fetch the first chat messages for it.
    // The terms for a simulation are:
    // 1. If topics were loaded (e.g. by endless scrolling) no row activation should occur. However,
    //    if there are no chat messages yet, it's a special case for it's the first topic loading.
    //    The latter is also true, if we refreshed the topic list, usually by filtering
    // 2. If chat messages were loaded or are in loading process, when topics are concerned, nothing happened
    // 3. We need topics in memory to simulate a click on one
    // If all terms are met, we simulate a click (select a topic) as follows:
    // If a topic was selected (thus in the state) we
    //
    if (nextProps.isRefreshing || nextProps.chatMessagesData.messages.length === 0) {
      if (
        nextProps.topicsData &&
        nextProps.topicsData.length) {
        if (this.state.selectedTopic) {
          found = nextProps.topicsData.find(x => x.id === this.state.selectedTopic.id);
        }
        this.onTopicsGridRowClick(found || nextProps.topicsData[0], false);
      }
    }
//
    // Check if a topics page was loaded containing a specific item, as a result of a group selection.
    // Another requirement to trigger a row selection for this, is that an actual topic id exists:
    //
    if (nextProps.specificTopicsPageWasLoaded && this.specificTopicId) {
      found = this.specificTopicId ? nextProps.topicsData.find(x => x.id === this.specificTopicId) : null;
      this.specificTopicId = null;
      this.onTopicsGridRowClick(found, true);
    }
  }

  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <Root>
          <Grid>
            <TopicsGridWithDataFetcher
              rowData={this.props.topicsData}
              selectedRow={this.state.selectedTopic}
              scrollToSelectedRow={this.state.forcedSelection}
              onRowClick={(item: IM.Topic, index: number) => this.onTopicsGridRowClick(item, false)}
              loadMoreData={this.props.handlers.loadNextTopicsPage}
              theme={this.props.theme}
            />
          </Grid>
          <ChatAreaWrap>
            <ChatArea
              topic={this.state.selectedTopic}
              chatMessagesData={this.props.chatMessagesData}
              loadChatMessagesPage={this.loadChatMessagesPage}
              isRefreshing={this.props.isRefreshing}
              fetchedChatMessagesFirstPage={this.props.fetchedChatMessagesFirstPage}
              suppressRendering={this.props.isFetching}
              setFavorite={(id: Prod.ProductID, isFavorite: boolean) =>
                this.props.handlers.setFavorite(id, isFavorite)}
              removeTag={this.props.handlers.removeTag}
              addTags={this.props.handlers.addTags}
              addToNotebook={this.props.handlers.addToNotebook}
              markAsRead={this.props.handlers.markAsRead}
              askForTranslate={this.props.handlers.askForTranslate}
              askForTranscript={this.props.handlers.askForTranscript}
              openNotebook={this.props.handlers.openNotebook}
              getTranslate={this.props.handlers.getTranslate}
              getTranscript={this.props.handlers.getTranscript}
              exportItem={this.props.handlers.exportItem}
              onSenderClick={this.props.handlers.onSenderClick}
              onCommonGroupSelected={this.onCommonGroupSelected}
              theme={this.props.theme}
            />
          </ChatAreaWrap>
        </Root>
      </ThemeProvider>
    )
  }
}

export default withTheme(InstantMessagingContent)
