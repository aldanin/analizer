import * as React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import {
  Browser,
  BrowserData,
  BrowserDirectory,
  BrowserTreeObject,
  browserTreeObjectId,
} from '../types/Browser';
import {
  browserLoadRequest,
  groupByDomain,
} from '../state/actions/Browser';
import BrowserAppView from '../components/BrowserAppView/index';
import { ThemeProvider } from 'styled-components'
import { BrowserViewTheme } from '../theme/ScTheme';
import { TagData, TagId } from '../types/Tag';
import {
  productAddTag, productAddToNotebook, productAskForTranscript, productAskForTranslate, productExportItem,
  productMarkAsRead,
  productMarkAsUnread, productRemoveTag, productSetFavorite
} from '../state/actions/ProductActions';
import { PRODUCT_TYPES } from '../types/Product';
import LoadingThreeDots from '../components/Common/LoadingThreeDots/index';

export interface BrowserPageProps extends React.Props<BrowserPageProps> {
  browser: {
    browserData: BrowserData;
  }

  isFetching: boolean;
  isFirstHistoryRequest: boolean,
  isError: boolean;
  loadBrowser: (agent: number) => void;
  requestUpdate: () => void;
  extractNow: () => void;
  bookmarkSetStar: (id: browserTreeObjectId, isFavorite: boolean) => void;
  historySetStar: (id: browserTreeObjectId, isFavorite: boolean) => void;
  bookmarkRemoveTag: (id: browserTreeObjectId, tag: TagId) => void;
  historyRemoveTag: (id: browserTreeObjectId, tag: TagId) => void;
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
  bookmarkOpenNotebook: () => void
  bookmarkAskForTranslate: () => void
  bookmarkGetTranslate: () => void
  historyOpenNotebook: () => void
  historyGetTranslate: () => void
  show: () => void;
  tags: () => void;
  actions: () => void;
  keyword: string;
  isGroupMode: boolean;
  changeGroupByMode: (isGroupMode: boolean) => void;
  params: any;
}

export class BrowserPage extends Component<BrowserPageProps, {}> {
  constructor() {
    super();
  }

  loadBrowserProps = () => {
    this.props.loadBrowser(this.props.params.agent_id);
  }

  public componentDidMount() {
    this.loadBrowserProps();
  }

  render() {

    if (this.props.isError) {
      return <div>Fail to load</div>
    }

    let handlers = {
      requestUpdate: this.props.requestUpdate,
      extractNow: this.props.extractNow,
      bookmarkSetStar: this.props.bookmarkSetStar,
      historySetStar: this.props.historySetStar,
      bookmarkRemoveTag: this.props.bookmarkRemoveTag,
      historyRemoveTag: this.props.historyRemoveTag,
      bookmarkOpenNotebook: this.props.bookmarkOpenNotebook,
      bookmarkAskForTranslate: this.props.bookmarkAskForTranslate,
      bookmarkGetTranslate: this.props.bookmarkGetTranslate,
      historyOpenNotebook: this.props.historyOpenNotebook,
      historyGetTranslate: this.props.historyGetTranslate,
      historyAddTag: this.props.historyAddTag,
      historyAddToNotebook: this.props.historyAddToNotebook,
      historyMarkAsRead: this.props.historyMarkAsRead,
      historyMarkAsUnRead: this.props.historyMarkAsUnRead,
      historyAskForTranslate: this.props.historyAskForTranslate,
      historyAskForTranscript: this.props.historyAskForTranscript,
      historyExportItem: this.props.historyExportItem,
      bookmarksAddTag: this.props.bookmarksAddTag,
      bookmarksAddToNotebook: this.props.bookmarksAddToNotebook,
      bookmarksMarkAsRead: this.props.bookmarksMarkAsRead,
      bookmarksMarkAsUnRead: this.props.bookmarksMarkAsUnRead,
      bookmarksAskForTranslate: this.props.bookmarksAskForTranslate,
      bookmarksAskForTranscript: this.props.bookmarksAskForTranscript,
      bookmarksExportItem: this.props.bookmarksExportItem,
    }

    let filters = {
      show: () => {this.props.show()},
      tag: () => {this.props.tags()},
      action: () => {this.props.actions()},
    }
    return (
      <ThemeProvider theme={BrowserViewTheme}>
        {!!this.props.browser ? (
          <BrowserAppView
            browser={this.props.browser}
            handlers={handlers}
            filters={filters}
            isGroupMode={this.props.isGroupMode}
            changeGroupByMode={this.props.changeGroupByMode}
            isFetching={this.props.isFetching}
            isFirstHistoryRequest={this.props.isFirstHistoryRequest}
            keyword={this.props.keyword}
          />
        ) : <LoadingThreeDots/>}

      </ThemeProvider>
    )
  }
}

const mapStateToProps = (state) => {
  let browser = null;
  const isFetching = state[PRODUCT_TYPES.BROWSER].get('isFetching');
  const isFirstHistoryRequest = state[PRODUCT_TYPES.CONTACTS].get('isFirstRequest');
  const isError = (!!state[PRODUCT_TYPES.BROWSER].get('error'));

  if ((!!state[PRODUCT_TYPES.BROWSER].getIn(['browserData', 'browserData'])) && !isError) {
    browser = {
      browserData: state[PRODUCT_TYPES.BROWSER].getIn(['browserData', 'browserData']).toJS(),
    }
    browser.browserData.history = state[PRODUCT_TYPES.BROWSER].get('productData').toJS();
    if (!!browser && browser.browserData !== undefined) {
      browser.browserData.bookmarks.browsers = convertBookmarksArrayToTree(browser.browserData.bookmarks.browsers);
    }
  }

  const isGroupMode = state[PRODUCT_TYPES.BROWSER].get('isGroupMode');
  const keyword = state[PRODUCT_TYPES.SEARCH].get('keyWord');

  return {
    browser,
    isFetching,
    isFirstHistoryRequest,
    isError,
    isGroupMode,
    keyword,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    historyAddTag: (ids: browserTreeObjectId[], tags: TagData[]) => {
      dispatch(productAddTag({ids, tags}, PRODUCT_TYPES.BROWSER))
    },
    historyAddToNotebook: (ids: browserTreeObjectId[]) => {
      dispatch(productAddToNotebook({ids}, PRODUCT_TYPES.BROWSER))
    },
    historyMarkAsRead: (ids: browserTreeObjectId[]) => {
      dispatch(productMarkAsRead({ids}, PRODUCT_TYPES.BROWSER))
    },
    historyMarkAsUnRead: (ids: browserTreeObjectId[]) => {
      dispatch(productMarkAsUnread({ids}, PRODUCT_TYPES.BROWSER))
    },
    historyAskForTranslate: (ids: browserTreeObjectId[]) => {
      dispatch(productAskForTranslate({ids}, PRODUCT_TYPES.BROWSER))
    },
    historyAskForTranscript: (ids: browserTreeObjectId[]) => {
      dispatch(productAskForTranscript({ids}, PRODUCT_TYPES.BROWSER))
    },
    historyExportItem: (ids: browserTreeObjectId[]) => {
      dispatch(productExportItem({ids}, PRODUCT_TYPES.BROWSER))
    },
    bookmarksAddTag: (ids: browserTreeObjectId[], tags: TagData[]) => {
      dispatch(productAddTag({ids, tags}, PRODUCT_TYPES.BROWSER_BOOKMARK))
    },
    bookmarksAddToNotebook: (ids: browserTreeObjectId[]) => {
      dispatch(productAddToNotebook({ids}, PRODUCT_TYPES.BROWSER_BOOKMARK))
    },
    bookmarksMarkAsRead: (ids: browserTreeObjectId[]) => {
      dispatch(productMarkAsRead({ids}, PRODUCT_TYPES.BROWSER_BOOKMARK))
    },
    bookmarksMarkAsUnRead: (ids: browserTreeObjectId[]) => {
      dispatch(productMarkAsUnread({ids}, PRODUCT_TYPES.BROWSER_BOOKMARK))
    },
    bookmarksAskForTranslate: (ids: browserTreeObjectId[]) => {
      dispatch(productAskForTranslate({ids}, PRODUCT_TYPES.BROWSER_BOOKMARK))
    },
    bookmarksAskForTranscript: (ids: browserTreeObjectId[]) => {
      dispatch(productAskForTranscript({ids}, PRODUCT_TYPES.BROWSER_BOOKMARK))
    },
    bookmarksExportItem: (ids: browserTreeObjectId[]) => {
      dispatch(productExportItem({ids}, PRODUCT_TYPES.BROWSER_BOOKMARK))
    },
    bookmarkSetStar: (id: browserTreeObjectId, isFavorite: boolean) => {
      dispatch(productSetFavorite({id: id, isFavorite: isFavorite}, PRODUCT_TYPES.BROWSER_BOOKMARK))
    },
    historySetStar: (id: browserTreeObjectId, isFavorite: boolean) => {
      dispatch(productSetFavorite({id: id, isFavorite: isFavorite}, PRODUCT_TYPES.BROWSER))
    },
    loadBrowser: (agentId: number) => {dispatch(browserLoadRequest({id: agentId}))},
    bookmarkRemoveTag: (id: browserTreeObjectId, tagId: TagId) => {
      dispatch(productRemoveTag({id: id, tagId: tagId}, PRODUCT_TYPES.BROWSER_BOOKMARK))
    },
    historyRemoveTag: (id: browserTreeObjectId, tagId: TagId) => {
      dispatch(productRemoveTag({id: id, tagId: tagId}, PRODUCT_TYPES.BROWSER))
    },
    changeGroupByMode: (isGroupByMode: boolean) => {dispatch(groupByDomain(isGroupByMode))},

    bookmarkOpenNotebook: (id: browserTreeObjectId) => {/* TODO: implement the function */ },
    bookmarkAskForTranslate: (id: browserTreeObjectId) => {/* TODO: implement the function */ },
    bookmarkGetTranslate: (id: browserTreeObjectId) => {/* TODO: implement the function */ },
    historyOpenNotebook: (id: browserTreeObjectId) => {/* TODO: implement the function */ },
    historyGetTranslate: (id: browserTreeObjectId) => {/* TODO: implement the function */ },

    requestUpdate: () => {/* TODO: implement the function */ },
    extractNow:  () => {/* TODO: implement the function */ },

    // Filters functions:
    show: () => {/* TODO: implement the function */ },
    tags: () => {/* TODO: implement the function */ },
    actions: () => {/* TODO: implement the function */ },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowserPage)

function convertBookmarksArrayToTree(browserTreeObjects: BrowserTreeObject[]) {
  let browsers: Browser[] = [];

  for (let i = 0; i < browserTreeObjects.length; i++) {
    switch (browserTreeObjects[i].type) {
      case 'browser':
        addBrowser(browserTreeObjects[i], browsers);
        break;

      case 'directory':
        addDirectory(browserTreeObjects[i], browsers);
        break;

      case 'site':
        addSite(browserTreeObjects[i], browsers);
        break;

      default:
        break;
    }
  }

  return browsers;
}

function addBrowser(object: BrowserTreeObject, browser: Browser[]) {
  browser.push({
    id: object.id,
    type: 'browser',
    info: {
      name: object.name,
      icon: object.icon,
      url: object.url,
    },
    content: [],
    tags: object.tags,
    isFavorite: object.isFavorite,
    hasNotes: object.hasNotes,
    hasTranslation: object.hasTranslation,
    isRead: object.isRead,
  })
}

function addDirectory(object: BrowserTreeObject, browsers: Browser[]) {
  let parent: Browser | BrowserDirectory = getItemById(object.parentId, browsers);

  let isDirectoryWasAdded = false;

  const newDirectory: BrowserDirectory = {
    id: object.id,
    type: 'directory',
    name: object.name,
    content: [],
    isFavorite: object.isFavorite,
    hasNotes: object.hasNotes,
    hasTranslation: object.hasTranslation,
    isRead: object.isRead,
    tags: object.tags,
  };

  if (parent.content.length === 0) {
    parent.content.push(newDirectory);
    isDirectoryWasAdded = true;
  } else {
    let index = 0;

    while (index < parent.content.length) {
      if (parent.content[index].type === 'site') {
        parent.content.splice(index, 0, newDirectory);
        isDirectoryWasAdded = true;
        break;
      }
      index++;
    }
  }

  if (!isDirectoryWasAdded) {
    parent.content.push(newDirectory);
  }
}

function addSite(object: BrowserTreeObject, browsers: Browser[]) {
  let parent: Browser | BrowserDirectory = getItemById(object.parentId, browsers);

  parent.content.push({
    id: object.id,
    type: 'site',
    site: {
      name: object.name,
      icon: object.icon,
    },
    url: object.url,
    isFavorite: object.isFavorite,
    hasNotes: object.hasNotes,
    hasTranslation: object.hasTranslation,
    isRead: object.isRead,
    tags: object.tags,
  })
}

function getItemById(id: browserTreeObjectId, browser: Browser[]) {
  let resultFromBrowser = null;

  for (let i = 0; i < browser.length; i++) {
    if (browser[i].id === id) { return browser[i] }
    if (browser[i].content.length > 0) {
      for (let j = 0; j < browser[i].content.length; j++) {
        if (browser[i].content[j].type === 'directory') {
          resultFromBrowser = getItemFromDirectory(id, browser[i].content[j] as BrowserDirectory);
          if (resultFromBrowser !== null) { return resultFromBrowser }
        }
      }
    }
  }

  return null;

  function getItemFromDirectory(idx: browserTreeObjectId, directory: BrowserDirectory) {
    if (directory.id === idx) { return directory }

    let resultFromDirectory = null;

    for (let i = 0; i < directory.content.length; i++) {
      if (directory.content[i].id === idx) { return directory.content[i] }
      if (directory.content[i].type === 'directory') {
        resultFromDirectory = getItemFromDirectory(idx, directory.content[i] as BrowserDirectory);
        if (resultFromDirectory !== null) { return resultFromDirectory }
      }
    }

    return null;
  }
}
