import { call, put, takeEvery } from 'redux-saga/effects'
import * as Action from '../actions/Directory'
import { getFiles, getItemsByPath } from '../../components/DirectoryAppView/mockData/Data'
import { FiltersData } from '../../types/Filters'
import * as ProdAction from '../actions/ProductActions'

export function apiFetchDirectoryTree(path: string) {
  const data = getItemsByPath(path);
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        resolve(data)
      },
      100)
  })
}

export function apiFetchFileList(agentId: number, nextPageNumber: number, pageSize: number, filters: FiltersData) {
  const data = getFiles(nextPageNumber, pageSize, filters);

  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        resolve(data)
      },
      100)
  })
}

export function apiFetchDownloadFile(url: string) {
 // const data = getItemsByPath(url);
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        resolve({ result: true})
      },
      100)
  })
}

export function* fetchDirectoryContent(action: Action.DirectoryContentLoadRequestAction) {
  try {
    const data = yield call(apiFetchDirectoryTree, action.path);
    yield put(Action.directoryContentLoadSuccess(data.directoryTree, data.path, data.metadata))
  } catch (error) {
    yield put(Action.loadDirectoryFail(error))
  }
}

export function* fetchFileList(action: Action.FileListLoadRequestAction) {
  try {
    const {agentId, nextPageNumber, pageSize, filters} = action;
    const data = yield call(apiFetchFileList, agentId, nextPageNumber, pageSize, filters);

    yield put(Action.fileListLoadSuccess(
      data.fileList, data.metadata, data.nextPageNumber, data.totalCount, data.filters))
  } catch (error) {
    yield put(Action.loadDirectoryFail(error))
  }
}

export function* groupByBrowser(action: Action.DirectoryContentLoadRequestAction) {
  try {
    const data = yield call(apiFetchDirectoryTree)
    yield put(Action.directoryContentLoadSuccess(data.directoryTree, data.path, data.metadata))
  } catch (error) {
    yield put(Action.loadDirectoryFail(error))
  }
}

export function* fetchDownloadFile(action: ProdAction.ProductDownloadFileAction) {
  try {
    let {productType, payload} = action;
    const result = yield call(apiFetchDownloadFile, productType, null, payload.url);
    payload = result.payload;

    // yield put(ProdAction.productDownloadFileSuccess({
    //     itemId: payload.itemId,
    //     tagId: payload.tagId
    //   },
    //   result.productType))
  } catch (error) {
    yield put(ProdAction.productRemoveTagFail(error, action.productType))
  }
}

export function* watchDirectory() {
  yield takeEvery(Action.LOAD_DIRECTORY_CONTENT_REQUEST, fetchDirectoryContent)
  yield takeEvery(Action.LOAD_FILE_LIST_REQUEST, fetchFileList)
  yield takeEvery(Action.DIRECTORY_GROUP_BY_DOMAIN, groupByBrowser)
  yield takeEvery(ProdAction.PRODUCT_DOWNLOAD_FILE_REQUEST, fetchDownloadFile)
}
