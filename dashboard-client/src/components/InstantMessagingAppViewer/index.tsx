import * as React from 'react'
import * as Theme from './Theme'
import Content from './Content'
import * as IM from '../../types/InstantMessaging'
import * as IMCommon from 'common-interfaces/types/InstantMessaging'
import * as Prod from '../../types/Product'
import AppViewFiltersTool from '../Common/AppViewFilterTool/index'
import AppViewHeaderToolbar from '../Common/AppViewHeaderTool/index';
import ViewFilters from './ViewFilters'
import * as Tags from '../../types/Tag'
import * as Helpers from '../../helpers/Filters'
import KeywordProvider from '../../containers/KeywordPRovider';
import LoadingIndicator from '../Common/LoadingIndicator';
import styled from 'styled-components'

export interface InstantMessagingAppViewerProps extends React.Props<InstantMessagingAppViewer> {
  topicsData: IM.Topic[];
  chatMessagesData: {
    messages: IMCommon.ChatMessage[],
    totalCount: number
  }
  hasNextTopicsPage: boolean;
  isFetching: boolean;
  isFirstRequest: boolean;
  isRefreshing?: boolean;
  specificTopicsPageWasLoaded: boolean,
  fetchedChatMessagesFirstPage: boolean;
  contentHandlers: {
    addTags: (itemIds: Prod.ProductID[], tag: Tags.TagData[]) => void,
    removeTag: (id: number, tagId: Tags.TagId) => void,
    setFavorite: (id: number, isFavorite: boolean) => void,
    markAsRead: (itemId: Prod.ProductID[], isRead: boolean) => void,
    addToNotebook: (itemId: Prod.ProductID[]) => void,
    askForTranslate: (itemId: Prod.ProductID[]) => void,
    askForTranscript: (itemId: Prod.ProductID[]) => void,
    getTranslate: (itemId: Prod.ProductID) => void,
    getTranscript: (itemId: Prod.ProductID) => void,
    openNotebook: () => void,
    exportItem: (itemId: Prod.ProductID[]) => void,
    refreshTopics: (filters?: IM.Filters, lastId?: IM.TopicId) => void;
    loadChatMessagesPage: (topicId: Prod.ProductID,
                           isPreveiousPage: boolean,
                           isRefreshing: boolean,
                           filters?: IM.Filters) => void,
    loadContainingTopicsPage: (topicId: Prod.ProductID, filters?: IM.Filters) => void,
    onSliceRendered: (startIndex: number, stopIndex: number) => void;
    onCommentsClick: (messageId: IM.ChatMessageId) => void;
    onSenderClick: (id: Prod.ProductID) => void,
    onFiltersChange: (filters: IM.Filters) => void,
  },
  loadNextTopicsPage?: () => void,
  filters: IM.Filters;
  keyword?: string;
  theme?: Theme.ThemeProps;
}

export interface InstantMessagingAppViewerState {
  checkedChatMessages: any;
}

const Root = styled.div`
  height: 100%;
  position: relative;
`;

class InstantMessagingAppViewer extends React.Component<InstantMessagingAppViewerProps,
  InstantMessagingAppViewerState> {

  static defaultProps: Partial<InstantMessagingAppViewerProps> = {
    keyword: '',
    theme: Theme.DEFAULT_THEME,
    loadNextTopicsPage: () => null,
  }

  private pageSize: number;

  constructor(props: InstantMessagingAppViewerProps) {
    super(props)

    this.state = {
      checkedChatMessages: {}
    }

    this.pageSize = undefined;
  }

  addMultiTags(tag: Tags.TagData[]) {
    this.props.contentHandlers.addTags(this.getCheckedItemsArray(), tag);
  }

  onBooleanFilterChange = (key: any, enabled: any) => {
    const filters = Helpers.updateBooleanFilters(this.props.filters, key, enabled);

    this.props.contentHandlers.onFiltersChange(filters);
  }

  componentWillReceiveProps(nextProps: InstantMessagingAppViewerProps) {
    //
    // For testing purposes. Will be removed after add tag mechanism will be clear:
    //
    if (nextProps.chatMessagesData.messages && nextProps.chatMessagesData.messages.length > 5) {
      this.setState({
        checkedChatMessages: {}
      });

    }
  }

  itemCheckHandler = (itemId: Prod.ProductID, checkedStatus: boolean) => {
    if (checkedStatus === undefined || checkedStatus === null) {
      //
      // getter
      //
      return this.state.checkedChatMessages[itemId];
    }
    //
    // setter
    //
    this.state.checkedChatMessages[itemId] = checkedStatus;

    this.setState({checkedChatMessages: Object.assign(this.state.checkedChatMessages)})
  }

  getCheckedItemsArray = () => {
    const arr = [];
    Object.keys(this.state.checkedChatMessages).forEach(key => {
      if (this.state.checkedChatMessages[key]) {
        arr.push(key);
      }
    })

    return arr;
  }

  onHeaderClick = (sortBy: string, sortDirection: boolean) => {
    const filters = Helpers.updateSortFilter(this.props.filters, sortBy, sortDirection);

    this.props.contentHandlers.onFiltersChange(filters);
  }

  loadContainingTopicsPage = (topicId: Prod.ProductID) => {
    this.props.contentHandlers.loadContainingTopicsPage(topicId);
  }

  renderContent = () => {
    if (this.props.isFirstRequest && this.props.isFetching) {
      return <LoadingIndicator/>
    }

    return (
      <KeywordProvider keyword={this.props.keyword}>
        <Content
          topicsData={this.props.topicsData}
          chatMessagesData={this.props.chatMessagesData}
          handlers={{
            setFavorite: this.props.contentHandlers.setFavorite,
            addTags: (id: Prod.ProductID, tags: Tags.TagData[]) => this.props.contentHandlers.addTags([id], tags),
            removeTag: this.props.contentHandlers.removeTag,
            markAsRead: this.props.contentHandlers.markAsRead,
            addToNotebook: (id: Prod.ProductID) => this.props.contentHandlers.addToNotebook([id]),
            askForTranslate: (id: Prod.ProductID) => this.props.contentHandlers.askForTranslate([id]),
            askForTranscript: (id: Prod.ProductID) => this.props.contentHandlers.askForTranscript([id]),
            getTranslate: this.props.contentHandlers.getTranslate,
            getTranscript: this.props.contentHandlers.getTranscript,
            openNotebook: this.props.contentHandlers.openNotebook,
            exportItem: (id: Prod.ProductID) => this.props.contentHandlers.exportItem([id]),
            onSliceRendered: this.props.contentHandlers.onSliceRendered,
            loadChatMessagesPage: this.props.contentHandlers.loadChatMessagesPage,
            loadNextTopicsPage: this.props.loadNextTopicsPage,
            loadContainingTopicsPage: this.loadContainingTopicsPage,
            onHeaderClick: this.onHeaderClick,
            onCommentsClick: this.props.contentHandlers.onCommentsClick,
            onSenderClick: this.props.contentHandlers.onSenderClick,
          }}
          hasNextTopicsPage={this.props.hasNextTopicsPage}
          isFetching={this.props.isFetching}
          isRefreshing={this.props.isRefreshing}
          specificTopicsPageWasLoaded={this.props.specificTopicsPageWasLoaded}
          fetchedChatMessagesFirstPage={this.props.fetchedChatMessagesFirstPage}
          theme={this.props.theme}
        />
      </KeywordProvider>
    )
  }

  doShow = () => {
// TODO
  }

  doTags = () => {
// TODO
  }

  doActions = () => {
// TODO
  }

  doSearch = () => {
// TODO
  }
  requestUpdate = () => {
    // TODO
  }
  extractNow = () => {
    // TODO
  }

  render() {
    return (
      <Root>
        <div className="instantMessaging-widget-toolbar" style={{fontSize: '1.9rem'}}>
          <AppViewHeaderToolbar
            icon={'icon_im'}
            title={'Instant Messaging'}
            titleStyle={{marginLeft: '25px'}}
            lastExtractionTime={0}
            requestUpdate={this.requestUpdate}
            extractNow={this.extractNow}
            updateTimeIndicator={0}
            theme={this.props.theme.appViewHeaderTool}
          />
        </div>
        <AppViewFiltersTool
          show={this.doShow}
          tags={this.doTags}
          actions={{
            addTagCallback: (tags: Tags.TagData[]) => {
              this.addMultiTags(tags)
            },
            addToNotebookCallback: () => this.props.contentHandlers.addToNotebook(this.getCheckedItemsArray()),
            markAsReadCallback: () => this.props.contentHandlers.markAsRead(this.getCheckedItemsArray(), true),
            markAsUnreadCallback: () => this.props.contentHandlers.markAsRead(this.getCheckedItemsArray(), false),
            translateCallback: () => this.props.contentHandlers.askForTranslate(this.getCheckedItemsArray()),
            transcriptCallback: () => this.props.contentHandlers.askForTranscript(this.getCheckedItemsArray()),
            exportCallback: () => this.props.contentHandlers.exportItem(this.getCheckedItemsArray()),
          }}
          search={this.doSearch}
          component={
            process.env.REACT_APP_IS_FILTERED_ENABLED
              ? (
                <ViewFilters
                  handlers={{onBooleanFilterChange: this.onBooleanFilterChange}}
                  theme={this.props.theme}
                />
              )
              : <div/>}
        />
        {this.renderContent()}
      </Root>
    )
  }
}

export default InstantMessagingAppViewer
