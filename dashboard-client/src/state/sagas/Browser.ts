import { call, put, takeEvery } from 'redux-saga/effects'
import * as ProdActions from '../actions/ProductActions'
import {
  LOAD_BROWSER_REQUEST,
  BrowserLoadRequestAction,
  browserLoadSuccess,
  browserLoadFail, BROWSER_GROUP_BY_DOMAIN
} from '../actions/Browser'
import ApiGetInstance from '../../api'
import * as Promise from 'bluebird';
import { AgentId } from '../../types/Agent';
import { PRODUCT_TYPES } from '../../types/Product';
import { Filters } from '../../types/GenericFilters';

export function apiFetchBrowser(agentId: AgentId) {
  const data = {
    browserData: {
      bookmarks: {
        extracted: 0,
        browsers: [],
      },
      history: [],
      timerIndicator: 0,
      updateTimeIndicator: 0,
    }
  };

  const api = ApiGetInstance();

  let meta = {agentId: agentId};

  return Promise.resolve([api.fetchBrowserBookmarkProducts(meta), []])
    .spread((bookmarks, history) => {
      data.browserData.bookmarks.browsers = normalizeBookmarks(bookmarks);
      data.browserData.history = normalizeHistory(history);
    }).return(data);
}

export function* fetchBrowser(action: BrowserLoadRequestAction) {
  try {
    const data = yield call(apiFetchBrowser, action.agent.id);
    // todo: normalize (can throw)
    yield put(browserLoadSuccess(data))
  } catch (error) {
    yield put(browserLoadFail(error))
  }
}

export function apiGetData(agentId: AgentId, skip: number, limit: number, filters: Filters) {
  const api = ApiGetInstance();

  return api.fetchBrowserHistoryProducts(
    {agentId: agentId},
    {skip, limit})
}

export function* fetchData(action: ProdActions.ProductLoadRequestAction) {

  if (action.productType === PRODUCT_TYPES.BROWSER) {
    try {
      const {agentid, skip, limit} = action.payload;
      // const filters = action.payload.filters as Contacts.Filters;
      const result = yield call(apiGetData, agentid, skip, limit, null);

      const history = normalizeHistory(result);

      yield put(ProdActions.productsLoadSuccess(
        {productData: history, skip, limit},
        PRODUCT_TYPES.BROWSER));
    } catch (error) {
      yield put(ProdActions.productsLoadError(error, PRODUCT_TYPES.BROWSER))
    }
    ;
  }
}

export function* groupByBrowser(action: BrowserLoadRequestAction) {
  try {
    const data = yield call(apiFetchBrowser)
    yield put(browserLoadSuccess(data))
  } catch (error) {
    yield put(browserLoadFail(error))
  }
}

export function* watchBrowser() {
  yield takeEvery(LOAD_BROWSER_REQUEST, fetchBrowser)
  yield takeEvery(BROWSER_GROUP_BY_DOMAIN, groupByBrowser)
  yield takeEvery(ProdActions.PRODUCT_LOAD_REQUEST, fetchData)
}

function normalizeHistory(historyData: any) {
  return historyData.map((history) => ({
    id: history.id,
    time: new Date(history.timestamp).getTime(),
    title: {
      name: history.name,
      icon: history.icon,
    },
    url: history.url,
    extraUrl: '',
    browser: {
      name: history.browser,
      icon: history.browser,
      url: ''
    },
    isFavorite: history.isFavorite,
    tags: []
  }));
}

function normalizeBookmarks(bookmarksData: any) {
  let bookmarks = bookmarksData.map((bookmarkData: any) => {
    let parentId = null;

    if (bookmarkData.browser === 'chrome') {
      parentId = 'chrome-directory';
    } else if (bookmarkData.browser === 'firefox') {
      parentId = 'firefox-directory';
    } else if (bookmarkData.browser === 'ie' || bookmarkData.browser === 'edge') {
      parentId = 'ie-directory';
    } else if (bookmarkData.browser === 'opera') {
      parentId = 'opera-directory';
    } else if (bookmarkData.browser === 'default') {
      parentId = 'default-directory';
    }

    return (<any> Object).assign(bookmarkData, {
      parentId: parentId
    });
  });

  return getDefaultBrowserTreeObjects().concat(bookmarks);
}

function getDefaultBrowserTreeObjects() {
  return [{
    id: 'chrome-browser',
    parentId: null,
    name: 'Chrome',
    type: 'browser',
    icon: 'chrome',
    url: '',
    isFavorite: false,
    isRead: true,
    tags: [],
  }, {
    id: 'firefox-browser',
    parentId: null,
    name: 'Firefox',
    type: 'browser',
    icon: 'firefox',
    url: '',
    isFavorite: false,
    isRead: true,
    tags: [],
  }, {
    id: 'opera-browser',
    parentId: null,
    name: 'Opera',
    type: 'browser',
    icon: 'opera',
    url: '',
    isFavorite: false,
    isRead: true,
    tags: [],
  }, {
    id: 'ie-browser',
    parentId: null,
    name: 'Explorer',
    type: 'browser',
    icon: 'explorer',
    url: '',
    isFavorite: false,
    isRead: true,
    tags: [],
  }, {
    id: 'safari-browser',
    parentId: null,
    name: 'Safari',
    type: 'browser',
    icon: 'safari',
    url: '',
    isFavorite: false,
    isRead: true,
    tags: [],
  }, {
    id: 'samsung-browser',
    parentId: null,
    name: 'Samsung',
    type: 'browser',
    icon: 'samsung',
    url: '',
    isFavorite: false,
    isRead: true,
    tags: [],
  }, {
    id: 'edge-browser',
    parentId: null,
    name: 'Edge',
    type: 'browser',
    icon: 'edge',
    url: '',
    isFavorite: false,
    isRead: true,
    tags: [],
  },  {
    id: 'native-browser',
    parentId: null,
    name: 'Native',
    type: 'browser',
    icon: 'native',
    url: '',
    isFavorite: false,
    isRead: true,
    tags: [],
  }, {
    id: 'default-browser',
    parentId: null,
    name: 'Default',
    type: 'browser',
    icon: 'native',
    url: '',
    isFavorite: false,
    isRead: true,
    tags: [],
  }, {
    id: 'chrome-directory',
    parentId: 'chrome-browser',
    name: 'Bookmarks',
    type: 'directory',
    icon: null,
    url: '',
    isFavorite: false,
    isNoteBook: false,
    isTranslate: false,
    isRead: true,
    tags: []
  }, {
    id: 'firefox-directory',
    parentId: 'firefox-browser',
    name: 'Bookmarks',
    type: 'directory',
    icon: null,
    url: '',
    isFavorite: false,
    isNoteBook: false,
    isTranslate: false,
    isRead: true,
    tags: []
  }, {
    id: 'ie-directory',
    parentId: 'ie-browser',
    name: 'Bookmarks',
    type: 'directory',
    icon: null,
    url: '',
    isFavorite: false,
    isNoteBook: false,
    isTranslate: false,
    isRead: true,
    tags: []
  }, {
    id: 'opera-directory',
    parentId: 'opera-browser',
    name: 'Bookmarks',
    type: 'directory',
    icon: null,
    url: '',
    isFavorite: false,
    isNoteBook: false,
    isTranslate: false,
    isRead: true,
    tags: []
  }, {
    id: 'safari-directory',
    parentId: 'safari-browser',
    name: 'Bookmarks',
    type: 'directory',
    icon: null,
    url: '',
    isFavorite: false,
    isNoteBook: false,
    isTranslate: false,
    isRead: true,
    tags: []
  },  {
    id: 'samsung-directory',
    parentId: 'samsung-browser',
    name: 'Bookmarks',
    type: 'directory',
    icon: null,
    url: '',
    isFavorite: false,
    isNoteBook: false,
    isTranslate: false,
    isRead: true,
    tags: []
  },  {
    id: 'edge-directory',
    parentId: 'edge-browser',
    name: 'Bookmarks',
    type: 'directory',
    icon: null,
    url: '',
    isFavorite: false,
    isNoteBook: false,
    isTranslate: false,
    isRead: true,
    tags: []
  },  {
    id: 'native-directory',
    parentId: 'native-browser',
    name: 'Bookmarks',
    type: 'directory',
    icon: null,
    url: '',
    isFavorite: false,
    isNoteBook: false,
    isTranslate: false,
    isRead: true,
    tags: []
  },  {
    id: 'default-directory',
    parentId: 'default-browser',
    name: 'Bookmarks',
    type: 'directory',
    icon: null,
    url: '',
    isFavorite: false,
    isNoteBook: false,
    isTranslate: false,
    isRead: true,
    tags: []
  }]
}
