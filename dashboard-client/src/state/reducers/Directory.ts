import * as Redux from 'redux'
import * as Immutable from 'immutable'
import { fromJS }  from 'immutable'
import * as Dir from '../../types/Directory';
import * as Action from '../actions/Directory'
import * as _ from 'lodash'
import { PRODUCT_TYPES } from '../../types/Product';
import * as ProdAction from '../actions/ProductActions';

// combine action types
export type Action = Action.DirectoryContentLoadRequestAction
  | Action.DirectoryLoadSuccessAction
  | Action.DirectoryLoadFailAction
  | Redux.Action

interface State extends Immutable.Map<string, any> {
  directoryTree: {
    item: Dir.FileSystemItem,
    key: string, // Should normally be the item's name
    childNodes: {},
    expanded: boolean
  },

  filelist: Dir.FileItem[],
  metadata: Dir.Metadata
  isFetching: boolean,
  error: Error,
  isGroupMode: boolean,
}

export const initialState: State = fromJS({
  directoryTree: {
    item: null,
    key: '~',
    childNodes: {},
    expanded: true,
  },
  fileList: [],
  nextFileListPageNumber: 1,
  totalFileListCount: null,
  metadata: {
    timerIndicator: 0,
    updateTimeIndicator: 0,
    extractionDate: 0
  },
  action: '',
  isFetching: true,
  isGroupMode: false,
  error: null,
});

export function generateNode(item: Dir.FileSystemItem) {
  const node = {
    item: item,
    key: item.name,
    path: item.info.path,
    childNodes: {},
    isLoaded: false,
    expanded: false,
  };
  return node;
}

export function pathForUpdate(stringPath: string) {
  const path = stringPath ? stringPath.split('\\') : [];
  const keys = _.range(path.length).map(() => 'childNodes');
  let adpath = _.flatten(_.zip(keys, path));
  adpath.unshift('directoryTree');

  return adpath;
}

function DirectoryReducer(state: State = initialState, action: Action) {
  let index = null;

  let isFavorite, itemId, itemIds, updatePath, payload, treeNode, newState, tagId;

  switch (action.type) {
    case Action.LOAD_DIRECTORY_CONTENT_REQUEST:
      return state
        .set('action', action.type)
        .set('isFetching', true)
        .set('error', null);

    case Action.LOAD_DIRECTORY_CONTENT_SUCCESS:
      payload = (<Action.DirectoryLoadSuccessAction> action).payload;
      updatePath = pathForUpdate(payload.path);

      const newstate = state.withMutations(tempState => {
        tempState = tempState
          .set('action', action.type)
          .updateIn(
            updatePath,
            (node) => node
              .set('expanded', true)
              .set('isLoaded', true)
              .updateIn(
                ['childNodes'],
                (obj) => {
                  const temp = {};
                  payload.directoryContent.forEach(item => {
                    const key = item.name;
                    var newnode = generateNode(item)
                    temp[key] = newnode;
                  });
                  return Immutable.fromJS(temp);
                })
          )
          .set('metadata', fromJS(payload.metadata))
          .set('isFetching', false)
          .set('error', null);
      });

      return newstate;

    case Action.LOAD_DIRECTORY_TREE_FAIL:
      return state
        .set('action', action.type)
        .set('isFetching', false)
        .set('error', (<Action.DirectoryLoadFailAction> action).error);

    case Action.LOAD_FILE_LIST_SUCCESS: {
      payload = (<Action.FileListLoadSuccessAction> action).payload;

      let stateData = state.get('fileList');

      const newData = Immutable.fromJS(payload.fileList);

      stateData = payload.nextFileListPageNumber > 2
        ? stateData.concat(newData)
        : newData;

      return state
        .set('action', action.type)
        .set('fileList', stateData)
        .set('totalFileListCount', fromJS(payload.totalFileListCount))
        .set('nextFileListPageNumber', payload.nextFileListPageNumber)
        .set('metadata', fromJS(payload.metadata))
        .set('isFetching', false)
        .set('error', null);
    }

    case Action.TOGGLE_DIRECTORY_STATE:
      updatePath = pathForUpdate((<Action.ToggleDirectoryStateAction> action).payload.path);

      return state.updateIn(updatePath, (node) => {

        return node.update('expanded', (val) => !val)
      })

    case Action.TOGGLE_DIRECTORY_TREE:
      const isExpanded = (<Action.ToggleTreeAction> action).payload.isExpanded;
      updatePath = ['directoryTree', 'childNodes'];

      newState = state.updateIn(
        updatePath,
        (childNodes) =>
          childNodes.map(
            (value, key) => {
              return childNodes.get(key).set('expanded', isExpanded);
            }))
      return newState;

    case Action.DIRECTORY_GROUP_BY_DOMAIN:
      return state
        .set('isFetching', true)
        .set('isGroupMode', (<Action.DirectoryGroupByDomainAction> action).payload);

    default:
      break;

    case Action.DIRECTORY_EXTRACTION_DATE_CHANGE:
      const extractionDate = (<Action.DirectoryChangeDateAction> action).payload.newDate;
      return state
        .set('action', action.type)
        .setIn(['metadata', 'extractionDate'], extractionDate);
  }

  // LISTENER TO PRODUCT (GLOBAL) ACTIONS:
  //
  // Important: These generic actions will accept PATHS as IDS in order to find items,
  // as the file system is kept in the store as a tree of directory nodes:
  //
  if (
    'productType' in action && (action as ProdAction.ProductAction).productType === PRODUCT_TYPES.DIRECTORY_TREE
  ) {
    switch (action.type) {
      case ProdAction.PRODUCT_SET_FAVORITE:
        isFavorite = (<ProdAction.ProductSetFavoriteAction> action).payload.isFavorite;
        itemId = (<ProdAction.ProductSetFavoriteAction> action).payload.id;
        updatePath = pathForUpdate(itemId);

        index = state.getIn(['fileList']).findIndex(x => {
          return x.getIn(['info', 'path']) === itemId
        });

        treeNode = state.getIn(updatePath);

        newState = state.withMutations(
          tempState => {

            if (treeNode) {

              tempState = tempState.set('action', action.type)
                .set('action', action.type)
                .updateIn(
                  updatePath,
                  (node) => node
                    .setIn(['item', 'isFavorite'], isFavorite))
            }

            if (index !== -1) {
              tempState.setIn(['fileList', index, 'isFavorite'], isFavorite);
            }
            tempState.set('isFetching', true);
          });
        return newState

      // case ProdAction.PRODUCT_SET_FAVORITE_SUCCESS:
      //   isFavorite = (<ProdAction.ProductSetFavoriteAction> action).payload.isFavorite;
      //   itemId = (<ProdAction.ProductSetFavoriteAction> action).payload.itemId;
      //   updatePath = pathForUpdate(itemId);
      //
      //   index = state.getIn(['fileList']).findIndex(x => {
      //     return x.getIn(['info', 'path']) === itemId
      //   });
      //
      //   treeNode = state.getIn(updatePath);
      //
      //   newState = state.withMutations(tempState => {
      //     if (treeNode) {
      //       tempState = tempState.set('action', action.type)
      //         .set('action', action.type)
      //         .updateIn(
      //           updatePath,
      //           (node) => node
      //             .setIn(['item', 'isFavorite'], isFavorite))
      //     }
      //
      //     if (index !== -1) {
      //       tempState.setIn(['fileList', index, 'isFavorite'], isFavorite);
      //     }
      //
      //     tempState.set('isFetching', false);
      //   });
      //
      //   return newState

      case ProdAction.PRODUCT_REMOVE_TAG:
        payload = (<ProdAction.ProductRemoveTagAction> action).payload;
        itemId = (<ProdAction.ProductRemoveTagAction> action).payload.id;
        tagId = (<ProdAction.ProductRemoveTagAction> action).payload.tagId;
        updatePath = pathForUpdate(itemId);

        index = state.getIn(['fileList']).findIndex(x => {
          return x.getIn(['info', 'path']) === itemId
        });

        treeNode = state.getIn(updatePath);
        newState = state.withMutations(tempState => {
          if (treeNode) {
            updatePath = updatePath.concat(['item', 'tags']);

            tempState =
              tempState
                .set('action', action.type)
                .updateIn(updatePath, (tags) =>
                  tags instanceof Immutable.List
                    ? tags.filter(x => x.get('id') !== tagId)
                    : null
                )
          }

          if (index !== -1) {
            tempState
              .set('action', action.type)
              .updateIn(['fileList', index, 'tags'], (tags) => {
                return tags.filter(
                  x => x.get('id') !== tagId
                )
              });
          }
          tempState.set('isFetching', false);
        });

        return newState;

      case ProdAction.PRODUCT_REMOVE_TAG_SUCCESS:
        return state;

      case ProdAction.PRODUCT_REMOVE_TAG_FAIL:
        return state;

      case ProdAction.PRODUCT_ADD_TAG:
        itemIds = (action as ProdAction.ProductAddTagAction).payload.ids;
        const allTags = (action as ProdAction.ProductAddTagAction).payload.tags;

        return state.withMutations(tempState => {
          itemIds.forEach(pathId => {
            updatePath = pathForUpdate(pathId as string);

            index = tempState.getIn(['fileList']).findIndex(x => {

              return x.getIn(['info', 'path']) === pathId;
            });

            updatePath = updatePath.concat(['item', 'tags']);

            allTags.map((tag) => {
              tempState.updateIn(updatePath, (tags) => tags ? tags.push(fromJS(tag)) : [tag]);

              if (index !== -1) {
                tempState.updateIn(['fileList', index, 'tags'], (tags) => tags ? tags.push(fromJS(tag)) : [tag])
              }
            });
          })
        })

      case ProdAction.PRODUCT_MARK_AS_READ:
        itemIds = (action as ProdAction.ProductAddTagAction).payload.ids;

        return state.withMutations(tempState => {
          itemIds.forEach(pathId => {
            updatePath = pathForUpdate(pathId as string);

            index = tempState.getIn(['fileList']).findIndex(x => {

              return x.getIn(['info', 'path']) === pathId;
            });

            updatePath = updatePath.concat(['item', 'isRead']);

            if (tempState.hasIn(updatePath)) {
              tempState.setIn(updatePath, true);
            }

            if (index !== -1) {
              tempState.setIn(['fileList', index, 'isRead'], true);
            }
          })
        })

      case ProdAction.PRODUCT_MARK_AS_UNREAD:
        itemIds = (action as ProdAction.ProductAddTagAction).payload.ids;

        return state.withMutations(tempState => {
          itemIds.forEach(pathId => {
            updatePath = pathForUpdate(pathId as string);

            index = tempState.getIn(['fileList']).findIndex(x => {

              return x.getIn(['info', 'path']) === pathId;
            });

            updatePath = updatePath.concat(['item', 'isRead']);

            if (tempState.hasIn(updatePath)) {
              tempState.setIn(updatePath, false);
            }

            if (index !== -1) {
              tempState.setIn(['fileList', index, 'isRead'], false);
            }
          })
        })

      default:
    }
  }

  if (
    'productType' in action && (action as ProdAction.ProductAction).productType === PRODUCT_TYPES.DIRECTORY_FILES
  ) {
    switch (action.type) {
      case ProdAction.PRODUCT_DOWNLOAD_FILE_REQUEST:
        const url = (<ProdAction.ProductDownloadFileAction> action).payload.url;
        alert('Reducer recieved this url:' + url)
        return state
          .set('action', action.type)
          .set('error', null);
      default:
    }
  }

  return state;
}

export default DirectoryReducer
