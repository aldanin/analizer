import * as React from 'react'
import { Browser, BrowserHistoryItem, browserTreeObjectId } from '../../types/Browser';
import AppViewHeaderToolbar from '../Common/AppViewHeaderTool/index';
import AppViewFiltersTool from '../Common/AppViewFilterTool/index';
import BrowserFilter from './BrowserFilter';
import Component = React.Component;
import styled from 'styled-components';
import BookmarkList from './BookmarkList';
import HistoryView from './HistoryView';
import { ThemeProps, DEFAULT_THEME } from './Theme';
import { withTheme } from 'styled-components';
import moment = require('moment');
import { ThemeProvider } from 'styled-components';
import { TagData, TagId } from '../../types/Tag';
import KeywordProvider from '../../containers/KeywordPRovider'
import LoadingIndicator from '../Common/LoadingIndicator'

import DataFetcher from '../../containers/DataFetcherGeneric'
import { PRODUCT_TYPES } from '../../types/Product'

const HistoryViewWithDataFetcher = DataFetcher(
  HistoryView, PRODUCT_TYPES.BROWSER, 25, true);

import PageStatusNoData from '../Common/PageStatus/index';

const BOOKMARK = 'bookmark';
const HISTORY = 'history';

export interface BrowserAppViewProps {
  browser: {
    browserData: {
      bookmarks: {
        extracted: number;
        browsers: Browser[];
      }
      history: BrowserHistoryItem[];
      timerIndicator: number;
      updateTimeIndicator: number;
    }
  }
  handlers: {
    requestUpdate: () => void;
    extractNow: () => void;
    bookmarkSetStar: (id: browserTreeObjectId, isFavorite: boolean) => void;
    historySetStar: (id: browserTreeObjectId, isFavorite: boolean) => void;
    bookmarkRemoveTag: (id: browserTreeObjectId, tag: TagId) => void;
    historyRemoveTag: (id: browserTreeObjectId, tag: TagId) => void;
    bookmarkOpenNotebook: () => void
    bookmarkAskForTranslate: () => void
    bookmarkGetTranslate: () => void
    historyOpenNotebook: () => void
    historyGetTranslate: () => void
    historyAddTag: (ids: browserTreeObjectId[], tags: TagData[]) => void;
    historyAddToNotebook: (ids: browserTreeObjectId[]) => void;
    historyMarkAsRead: (ids: browserTreeObjectId[]) => void;
    historyMarkAsUnRead: (ids: browserTreeObjectId[]) => void;
    historyAskForTranslate: (ids: browserTreeObjectId[]) => void;
    historyAskForTranscript: (ids: browserTreeObjectId[]) => void;
    historyExportItem: (ids: browserTreeObjectId[]) => void;
    bookmarksAddTag: (ids: browserTreeObjectId[], tags: TagData[]) => void;
    bookmarksAddToNotebook: (ids: browserTreeObjectId[]) => void;
    bookmarksMarkAsRead: (ids: browserTreeObjectId[]) => void;
    bookmarksMarkAsUnRead: (ids: browserTreeObjectId[]) => void;
    bookmarksAskForTranslate: (ids: browserTreeObjectId[]) => void;
    bookmarksAskForTranscript: (ids: browserTreeObjectId[]) => void;
    bookmarksExportItem: (ids: browserTreeObjectId[]) => void;
  },
  filters: {
    show: () => void;
    tag: () => void;
    action: () => void;
  },
  keyword: string;
  theme?: ThemeProps;
  isGroupMode: boolean;
  changeGroupByMode:  (isGroupMode: boolean) => void;
  isFetching: boolean;
  isFirstHistoryRequest: boolean;
}

export interface ItemStatus {
  id: browserTreeObjectId;
  isOpen: boolean;
}

export interface BrowserAppViewState {
  actionButton: number;
  isExpandMode: boolean;
  isGroupByDomainMode: boolean;
  historyItemsSelected: browserTreeObjectId[];
  bookmarksItemsSelected: browserTreeObjectId[];
  bookmarksOpenItems: ItemStatus[];
  activeTab: string;
}

const BrowserView = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  font-size: 3rem;
  overflow: hidden;
  height: 100%;
`;

const Header = styled.span`
  font-size: 70%;
  height: 95px;
`;

const HistoryViewList = styled.span`
  padding: 1em 0 0 0;
  box-sizing: border-box;
  font-size: 50%;
  height: 100%;
  width: 100%;
`;

const BookmarkViewList = styled.span`
  padding: 2em 0 0 0;
  box-sizing: border-box;
  font-size: 50%;
  height: 100%;
  width: 100%;
`;

const Title = styled.span`
  font-size: 80%;
  margin-left: 2%;
  margin-right: 3%;
  line-height: 40px;
  color: ${prop => prop.theme.bookmarks.extractedColor};
`;

const LastTimeExtracted = styled.span`
  font-weight: bold;
  color: ${prop => prop.theme.linkColor};
`;

const List = styled.div`
  font-size: 80%;
  height: 100%;
  border-top: 1px solid ${prop => prop.theme.bookmarks.borderColor};
`;

const FrameView = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  overflow: hidden;
  height: 100%;
  width: 100%;
`;

class BrowserAppView extends Component<BrowserAppViewProps, BrowserAppViewState> {
  static defaultProps: Partial<BrowserAppViewProps> = {
    theme: DEFAULT_THEME,
  }

  constructor(props: BrowserAppViewProps) {
    super(props);
    this.state = {
      actionButton: 1,
      isExpandMode: false,
      isGroupByDomainMode: false,
      historyItemsSelected: [],
      bookmarksItemsSelected: [],
      bookmarksOpenItems: [],
      activeTab: BOOKMARK,
    }
  }

  getContent() {
    if (this.props.isFetching && this.state.actionButton === 1) {
      return <LoadingIndicator/>
    }
    if (this.state.actionButton === 1) {
      return this.renderBookmarks();
    }
    return this.renderHistory();
  }

  historyItemSelected = (historyId: browserTreeObjectId) => {
    if (this.state.historyItemsSelected.indexOf(historyId) > -1) {return}
    let newArray = this.state.historyItemsSelected.slice(0);
    newArray.push(historyId);
    this.setState({
      historyItemsSelected: newArray,
    })
  }

  historyItemUnSelected = (historyId: browserTreeObjectId) => {
    const index = this.state.historyItemsSelected.indexOf(historyId);
    if (index === -1) {return}
    let newArray = this.state.historyItemsSelected.slice(0);
    newArray.splice(index, 1);
    this.setState({
      historyItemsSelected: newArray,
    })
  }

  bookmarkItemSelected = (bookmarkId: browserTreeObjectId) => {
    if (this.state.bookmarksItemsSelected.indexOf(bookmarkId) > -1) {return}
    let newArray = this.state.bookmarksItemsSelected.slice(0);
    newArray.push(bookmarkId);
    this.setState({
      bookmarksItemsSelected: newArray,
    })
  }

  bookmarkItemUnSelected = (bookmarkId: browserTreeObjectId) => {
    const index = this.state.bookmarksItemsSelected.indexOf(bookmarkId);
    if (index === -1) {return}
    let newArray = this.state.bookmarksItemsSelected.slice(0);
    newArray.splice(index, 1);
    this.setState({
      bookmarksItemsSelected: newArray,
    })
  }

  isItemSelected = (id: browserTreeObjectId) => {
    if (this.state.activeTab === BOOKMARK) {
      return (this.state.bookmarksItemsSelected.indexOf(id) > -1);
    } else {
      return (this.state.historyItemsSelected.indexOf(id) > -1);
    }
  }

  updateOpenItems = (id: browserTreeObjectId, isOpen: boolean) => {
    let newState = this.state.bookmarksOpenItems;
    newState[id] = {
      id,
      isOpen,
    };
    this.setState({bookmarksOpenItems: newState});
  }

  isOpen = (id: browserTreeObjectId) => {
    if (this.state.bookmarksOpenItems[id] === undefined) { return this.state.isExpandMode; }
    return this.state.bookmarksOpenItems[id].isOpen;
  }

  addMultiTags(tags: TagData[]) {
    if (this.state.activeTab === BOOKMARK) {
        this.props.handlers.bookmarksAddTag(this.state.bookmarksItemsSelected, tags);
    } else {
        this.props.handlers.historyAddTag(this.state.historyItemsSelected, tags);
    }
  }

  addMultiNotebooks() {
    if (this.state.activeTab === BOOKMARK) {
        this.props.handlers.bookmarksAddToNotebook(this.state.bookmarksItemsSelected);
    } else {
        this.props.handlers.historyAddToNotebook(this.state.historyItemsSelected);
    }
  }

  markMultiAsRead() {
    if (this.state.activeTab === BOOKMARK) {
        this.props.handlers.bookmarksMarkAsRead(this.state.bookmarksItemsSelected);
    } else {
        this.props.handlers.historyMarkAsRead(this.state.historyItemsSelected);
    }
  }

  markMultiAsUnRead() {
    if (this.state.activeTab === BOOKMARK) {
        this.props.handlers.bookmarksMarkAsUnRead(this.state.bookmarksItemsSelected);
    } else {
        this.props.handlers.historyMarkAsUnRead(this.state.historyItemsSelected);
    }
  }

  askForMultiTranslate() {
    if (this.state.activeTab === BOOKMARK) {
        this.props.handlers.bookmarksAskForTranslate(this.state.bookmarksItemsSelected);
    } else {
        this.props.handlers.historyAskForTranslate(this.state.historyItemsSelected);
    }
  }

  askForMultiTranscript() {
    if (this.state.activeTab === BOOKMARK) {
        this.props.handlers.bookmarksAskForTranscript(this.state.bookmarksItemsSelected);
    } else {
        this.props.handlers.historyAskForTranscript(this.state.historyItemsSelected);
    }
  }

  exportMultiItems() {
    if (this.state.activeTab === BOOKMARK) {
        this.props.handlers.bookmarksExportItem(this.state.bookmarksItemsSelected);
    } else {
        this.props.handlers.historyExportItem(this.state.historyItemsSelected);
    }
  }

  collapseAll() {
    this.setState({isExpandMode: false, bookmarksOpenItems: []})
  }

  getAmountOfSelectedItems() {
    if (this.state.activeTab === BOOKMARK) {
      return this.state.bookmarksItemsSelected.length;
    } else {
      return this.state.historyItemsSelected.length;
    }
  }

  clearSelectedItems() {
    if (this.state.activeTab === BOOKMARK) {
      this.setState({
        bookmarksItemsSelected: [],
      })
    } else {
      this.setState({
        historyItemsSelected: [],
      })
    }
  }

  render() {
    let component = (
      <BrowserFilter
        bookmarksClickAction={() => {this.setState({actionButton: 1, activeTab: BOOKMARK})}}
        historyClickAction={() => {this.setState({actionButton: 2, activeTab: HISTORY})}}
        expandCallback={() => {this.setState({isExpandMode: true})}}
        collapseCallback={() => {this.collapseAll()}}
        initialSelectedIndex={this.state.actionButton - 1}
        isGroupByDomainMode={this.state.isGroupByDomainMode}
        groupByClickAction={() => {this.setState({isGroupByDomainMode: !this.state.isGroupByDomainMode})}}
        theme={this.props.theme}
        isGroupMode={this.props.isGroupMode}
        changeGroupByMode={this.props.changeGroupByMode}
      />
    )

    return (
        <ThemeProvider theme={this.props.theme}>
          <BrowserView>
            <Header>
              <AppViewHeaderToolbar
                icon={'icon_browser'}
                title={'Browser'}
                titleStyle={{marginLeft: '25px'}}
                lastExtractionTime={this.props.isFetching ? 0 :
                  this.props.browser.browserData.timerIndicator}
                updateTimeIndicator={this.props.isFetching ? 0 :
                  this.props.browser.browserData.updateTimeIndicator}
                requestUpdate={this.props.handlers.requestUpdate}
                extractNow={this.props.handlers.extractNow}
                theme={this.props.theme.appViewHeaderTool}
              />
              <AppViewFiltersTool
                component={component}
                show={this.props.filters.show}
                tags={this.props.filters.tag}
                actions={{
                  addTagCallback: (tags: TagData[]) => {this.addMultiTags(tags)},
                  addToNotebookCallback: () => {this.addMultiNotebooks()},
                  markAsReadCallback: () => {this.markMultiAsRead()},
                  markAsUnreadCallback: () => {this.markMultiAsUnRead()},
                  translateCallback: () => {this.askForMultiTranslate()},
                  transcriptCallback: () => {this.askForMultiTranscript()},
                  exportCallback: () => {this.exportMultiItems()},
                }}
                theme={this.props.theme.appViewFilterTool}
                amountOfSelectedItems={this.getAmountOfSelectedItems()}
                onClearSelectedItems={() => this.clearSelectedItems()}
              />
            </Header>
              <FrameView>
                <KeywordProvider keyword={this.props.keyword}>
                  {this.getContent()}
                </KeywordProvider>
              </FrameView>
          </BrowserView>
        </ThemeProvider>
    )
  }

  getExtractedTime() {
    return ` < ${moment(this.props.browser.browserData.bookmarks.extracted * 1000)
      .format('HH:mm / DD/MM/YYYY')} >`
  }

  renderBookmarks() {
    if (!this.props.browser.browserData.bookmarks || !this.props.browser.browserData.bookmarks.browsers.length) {
      return (<PageStatusNoData/>);
    }

    return (
        <BookmarkViewList>
          <Title>Extracted on:</Title>
          {/*<LastTimeExtracted>{this.getExtractedTime()}</LastTimeExtracted>*/}
          <LastTimeExtracted>{'N/A'}</LastTimeExtracted>
          <List>
            <BookmarkList
              data={this.props.browser.browserData.bookmarks}
              isExpandMode={this.state.isExpandMode}
              bookmarkSetStar={this.props.handlers.bookmarkSetStar}
              bookmarkRemoveTag={this.props.handlers.bookmarkRemoveTag}
              bookmarkOpenNotebook={this.props.handlers.bookmarkOpenNotebook}
              bookmarkAskForTranslate={this.props.handlers.bookmarkAskForTranslate}
              bookmarkGetTranslate={this.props.handlers.bookmarkGetTranslate}
              bookmarksAddTag={this.props.handlers.bookmarksAddTag}
              bookmarksAddToNotebook={this.props.handlers.bookmarksAddToNotebook}
              bookmarksMarkAsRead={this.props.handlers.bookmarksMarkAsRead}
              bookmarksMarkAsUnRead={this.props.handlers.bookmarksMarkAsUnRead}
              bookmarksAskForTranslate={this.props.handlers.bookmarksAskForTranslate}
              bookmarksAskForTranscript={this.props.handlers.bookmarksAskForTranscript}
              bookmarksExportItem={this.props.handlers.bookmarksExportItem}
              onItemSelected={this.bookmarkItemSelected}
              onItemUnSelected={this.bookmarkItemUnSelected}
              updateOpenItems={this.updateOpenItems}
              isOpen={this.isOpen}
              isItemSelected={this.isItemSelected}
            />
          </List>
        </BookmarkViewList>
    )
  }

  renderHistory() {
    // if (!this.props.browser.browserData.history || !this.props.browser.browserData.history.length) {
    //   return (<PageStatusNoData/>);
    // }
    return (
      <HistoryViewList>
        <HistoryViewWithDataFetcher
          historyData={this.props.browser.browserData.history}
          setStar={this.props.handlers.historySetStar}
          historyRemoveTag={this.props.handlers.historyRemoveTag}
          historyOpenNotebook={this.props.handlers.historyOpenNotebook}
          historyAddTag={this.props.handlers.historyAddTag}
          historyAddToNotebook={this.props.handlers.historyAddToNotebook}
          historyMarkAsRead={this.props.handlers.historyMarkAsRead}
          historyMarkAsUnRead={this.props.handlers.historyMarkAsUnRead}
          historyAskForTranslate={this.props.handlers.historyAskForTranslate}
          historyAskForTranscript={this.props.handlers.historyAskForTranscript}
          historyExportItem={this.props.handlers.historyExportItem}
          historyGetTranslate={this.props.handlers.historyGetTranslate}
          historyItemSelected={this.historyItemSelected}
          historyItemUnSelected={this.historyItemUnSelected}
          HistorySelectedItems={this.state.historyItemsSelected}
          isItemSelected={this.isItemSelected}
        />
      </HistoryViewList>
    ) ;
  }
}

export default withTheme(BrowserAppView)
