import { call, put, takeEvery } from 'redux-saga/effects'
import * as DirSaga from './Directory'
import * as Action from '../actions/Directory'
import * as Mock from '../../components/DirectoryAppView/mockData/Data'

const demoDirTree = Mock.getItemsByPath('c:');
const demoFileList = Mock.getFiles(1, 25, null);
const demoMetadata = {
  extractionDate: 1234567890,
  timerIndicator: 1234567890,
  updateTimeIndicator: 1234567890,
}

demoDirTree.metadata = demoMetadata;
demoFileList.metadata = demoMetadata;
const fileDemo = demoFileList.fileList[0];
fileDemo.tags = fileDemo.tags.length ? fileDemo.tags : [{text: 'tag', id: '1'}];

it('should do fake directoryTree fetching', () => {
  const action = Action.directoryLoadRequest(1234, 'c:')
  const generator = DirSaga.fetchDirectoryContent(action);

  // Check that Saga asks to call the API
  expect(
    generator.next().value
  ).toEqual(
    call(DirSaga.apiFetchDirectoryTree, 'c:')
  );

  // check dispatching of result
  const demoData = demoDirTree;

  expect(
    generator.next(demoData).value
  ).toEqual(
    put(Action.directoryContentLoadSuccess(demoData.directoryTree, 'c:', demoData.metadata))
  );
})

it('should put directoryLoadFail on fetch fail', () => {
  const action = Action.directoryLoadRequest(1234, '1')
  const generator = DirSaga.fetchDirectoryContent(action);
  const error = new Error('blah')

  generator.next();

  expect(
    generator.throw(error).value
  ).toEqual(
    put(Action.loadDirectoryFail(error))
  )
})

it('should do fake fileList fetching', () => {
  const action = Action.loadFilesRequest(1234, 1, 25, null)
  const generator = DirSaga.fetchFileList(action);

  const testResults = generator.next().value;

  // Check that Saga asks to call the API
  expect(
    testResults
  ).toEqual(
    call(DirSaga.apiFetchFileList, 1234, 1, 25, null)
  );

  // check dispatching of result
  const demoData = demoDirTree;

  expect(
    generator.next(demoFileList).value
  ).toEqual(
    put(Action.fileListLoadSuccess(demoFileList.fileList, demoData.metadata, 2, demoFileList.totalCount, null))
  );
})

it('should watch load action', () => {
  const generator = DirSaga.watchDirectory();

  expect(
    generator.next().value
  ).toEqual(
    takeEvery(Action.LOAD_DIRECTORY_CONTENT_REQUEST, DirSaga.fetchDirectoryContent)
  );

  expect(
    generator.next().value
  ).toEqual(
    takeEvery(Action.LOAD_FILE_LIST_REQUEST, DirSaga.fetchFileList)
  );

  expect(
    generator.next().value
  ).toEqual(
    takeEvery(Action.DIRECTORY_GROUP_BY_DOMAIN, DirSaga.groupByBrowser)
  );
})
