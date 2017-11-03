import * as Redux from 'redux'
import directoryReducer from './Directory'
import * as Immutable from 'immutable'
import { fromJS }  from 'immutable'
import * as Reducer from './Directory'
import * as Action from '../actions/Directory'
import * as Prod from '../../types/Product'
import * as ProdAction from '../actions/ProductActions'
import * as Mock from '../../components/DirectoryAppView/mockData/Data'

const demoMetadata = {
  extractionDate: 1234567890,
  timerIndicator: 1234567890,
  updateTimeIndicator: 1234567890,
}

const testFileSystem = Mock.getTestDirectoryTree('c:');

const demoFileList = {
  fileList: testFileSystem.content,
  metadata: demoMetadata
}

const fileDemo = demoFileList.fileList[0];
const pathToTestFile = fileDemo.info.path;

testFileSystem.content = [];

const tempState = {
  action: '',
  directoryTree: {
    item: null,
    key: '~',
    childNodes: {},
    expanded: true,
    isLoaded: true
  },
  fileList: [],
  metadata: {
    timerIndicator: 234234,
    updateTimeIndicator: 234234234,
    extractionDate: 234234234
  },
  isFetching: false,
  error: null,
  isGroupMode: false,
  nextFileListPageNumber: 1,
  totalFileListCount: null
}

const getTestState = () => {
  const jsState = Immutable.fromJS(tempState).toJS();
  jsState.directoryTree.childNodes = {
    'c:': Reducer.generateNode(testFileSystem)
  }
  delete jsState.directoryTree.childNodes['c:'].item.content;
  jsState.directoryTree.childNodes['c:'].childNodes[fileDemo.name] = Reducer.generateNode(fileDemo)
  const state = Immutable.fromJS(jsState);

  return state;
}

it('should provide the initial state', () => {
  expect(directoryReducer(undefined, {} as Redux.Action)).toEqual(Reducer.initialState)
})

it('should handle LOAD_DIRECTORY_CONTENT_REQUEST actions', () => {
  const expectedState = {
    action: 'DirectoryTree/LOAD_REQUEST',
    directoryTree: {
      item: null,
      key: '~',
      childNodes: {},
      expanded: true,
    },
    fileList: [],
    metadata: {
      timerIndicator: 0,
      updateTimeIndicator: 0,
      extractionDate: 0
    },
    isFetching: true,
    error: null,
    isGroupMode: false,
    nextFileListPageNumber: 1,
    totalFileListCount: null
  }
  let receivedData = directoryReducer(Reducer.initialState, Action.directoryLoadRequest(1234, 'c:'));
  expect(receivedData.toJS()).toEqual(expectedState)
})

it('should handle LOAD_DIRECTORY_CONTENT_SUCCESS actions', () => {

  const payload = {
    directoryContent: [testFileSystem],
    path: null,
    metadata: {
      timerIndicator: 234234,
      updateTimeIndicator: 234234234,
      extractionDate: 234234234
    }
  };

  const testState = Immutable.fromJS(tempState).toJS();
  testState.action = 'DirectoryTree/LOAD_SUCCESS'
  testState.directoryTree.childNodes = {
    'c:': Reducer.generateNode(testFileSystem)
  }

  let receivedData = directoryReducer(
    Reducer.initialState,
    Action.directoryContentLoadSuccess(
      payload.directoryContent,
      payload.path,
      payload.metadata));

  expect(receivedData).toEqual(Immutable.fromJS(testState))
})

it('should handle LOAD_DIRECTORY_TREE_FAIL actions', () => {
  const payload = new Error('Foo bar')

  type State = Immutable.Map<string, any>;

  const resultState: State = fromJS({
    action: 'DirectoryTree/LOAD_FAIL',
    directoryTree: {
      item: null,
      key: '~',
      childNodes: {},
      expanded: true,
    },
    fileList: [],
    metadata: {
      timerIndicator: 0,
      updateTimeIndicator: 0,
      extractionDate: 0
    },
    isFetching: false,
    error: new Error('Foo bar'),
    isGroupMode: false,
    nextFileListPageNumber: 1,
    totalFileListCount: null
  });

  let receivedData = directoryReducer(Reducer.initialState, Action.loadDirectoryFail(payload));
  expect(receivedData).toEqual(resultState);
})

it('should handle TOGGLE_DIRECTORY_STATE actions', () => {
  let testState = getTestState();

  const expandState = testState.getIn(['directoryTree', 'childNodes', 'c:', 'expanded']);

  const resultTestState = testState.setIn(['directoryTree', 'childNodes', 'c:', 'expanded'], !expandState);

  let receivedData = directoryReducer(testState, Action.toggleDirectoryState('c:'));

  expect(resultTestState).toEqual(receivedData);
})

it('should handle TOGGLE_DIRECTORY_TREE, expand tree actions', () => {
  let testState = getTestState();

  const resultTestState = testState.setIn(['directoryTree', 'childNodes', 'c:', 'expanded'], true);

  let receivedData = directoryReducer(testState, Action.expandDirectoryTree());

  expect(resultTestState).toEqual(receivedData);
})

it('should handle TOGGLE_DIRECTORY_TREE, collapse tree actions', () => {
  let testState = getTestState();

  const resultTestState = testState.setIn(['directoryTree', 'childNodes', 'c:', 'expanded'], false);

  let receivedData = directoryReducer(testState, Action.collapseDirectoryTree());

  expect(resultTestState).toEqual(receivedData);
})

it('should ignore unknown actions', () => {
  let state = Reducer.initialState;

  expect(directoryReducer(state, {type: 'unknown'})).toEqual(state)
})

it('should change isFavorite value on Directory item', () => {
  const action = {
    payload: {
      id: pathToTestFile,
      isFavorite: true,
    },
    productType: Prod.PRODUCT_TYPES.DIRECTORY_TREE
  };

  const testState = getTestState();

  testState.set('action', 'Product/SET_FAVORITE');

  const newState = directoryReducer(testState, ProdAction.productSetFavorite(action.payload, action.productType));

  const path = Reducer.pathForUpdate(pathToTestFile);

  path.push('item')
  path.push('isFavorite');

  expect(newState.getIn(path)).toEqual(true);
})

it('should handle removal of a tag from Directory item', () => {
  const action = {
    payload: {
      id: pathToTestFile,
      tagId: fileDemo.tags[0].id,
    },
    productType: Prod.PRODUCT_TYPES.DIRECTORY_TREE
  };

  const testState = getTestState();
  const path = Reducer.pathForUpdate(pathToTestFile);
  path.push('item')
  path.push('tags');

  testState.set('action', 'Product/REMOVE_TAG');

  const newState = directoryReducer(testState, ProdAction.productRemoveTag(action.payload, action.productType));

  const tags = newState.getIn(path).toJS();
  expect(tags.length).toBeLessThan(fileDemo.tags.length);
})

it('should handle adding tags to Directory items', () => {
  const action = {
    payload: {
      ids: [pathToTestFile],
      tags: ['bored-text'],
    },
    productType: Prod.PRODUCT_TYPES.DIRECTORY_TREE
  };

  const testState = getTestState();
  const path = Reducer.pathForUpdate(pathToTestFile);
  path.push('item')
  path.push('tags');

  testState.set('action', 'Product/SET_FAVORITE');

  const newState = directoryReducer(testState, ProdAction.productAddTag(action.payload, action.productType));

  const tags = newState.getIn(path).toJS();
  expect(tags.length).toBeGreaterThan(fileDemo.tags.length);
})

it('should change isRead value on Directory items', () => {
  const action = {
    payload: {
      ids: [pathToTestFile],
      isRead: true,
    },
    productType: Prod.PRODUCT_TYPES.DIRECTORY_TREE
  };

  const testState = getTestState();

  testState.set('action', 'Product/MARK_AS_READ');

  const newState = directoryReducer(testState, ProdAction.productMarkAsRead(action.payload, action.productType));

  const path = Reducer.pathForUpdate(pathToTestFile);

  path.push('item')
  path.push('isRead');

  expect(newState.getIn(path)).toEqual(true);
})

it('should PRODUCT_DOWNLOAD_FILE_REQUEST actions', () => {
  const action =  {
    payload: {
      url: 'url'
    },
    productType: Prod.PRODUCT_TYPES.DIRECTORY_FILES
  }
  const testState = getTestState();

  const newState = testState.set('action', 'Product/DOWNLOAD_FILE_REQUEST')

  let receivedData =
    directoryReducer(testState, ProdAction.downloadFile(action.payload, action.productType));
  expect(receivedData).toEqual(newState)
})
