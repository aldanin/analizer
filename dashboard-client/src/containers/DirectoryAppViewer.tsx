import * as React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as Dir from '../types/Directory';
import * as Tag from '../types/Tag';
import * as Prod from '../types/Product';
import { PRODUCT_TYPES } from '../types/Product'
import DirectoryAppView from '../components/DirectoryAppView/index';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components'
import { directory } from '../theme/ScTheme';
import * as Filters from '../types/Filters'
import * as actions from '../state/actions/Directory'
import * as ProdAction from '../state/actions/ProductActions';

const Div = styled.div`
  height: 100%;
`;

export interface DirectoryPageProps extends React.Props<DirectoryPageProps> {
  directoryTree: Dir.FileSystemNode,
  fileList: Dir.FileItem[],
  metadata: Dir.Metadata,
  hasNextFileListPage: boolean;
  nextFileListPageNumber: number; // The page which will be reqeusted when grid scroller reached the bottom
  isFetching: boolean;
  isError: boolean;
  filters: Filters.FiltersData;
  loadDirectoryContent: (agent: number, path: string, filters?: Filters.FiltersData) => void;
  requestUpdate: () => void;
  extractNow: () => void;
  loadFiles: (agentid: number,
              nextPageNumber: number,
              pageSize?: number,
              filters?: Filters.FiltersData) => void;
  markFilesViewed: (ids: Dir.FileId[]) => void;
  toggleDirectoryState: (path: string) => void;
  onSliceRendered: (startIndex: number, stopIndex: number) => void;
  setFavourite: (itemId: Prod.ProductID,
                 isFavorite: boolean) => void;
  removeTag: (itemId: Prod.ProductID, tagId: Tag.TagId) => void;
  addTags: (itemIds: Prod.ProductID[], tags: Tag.TagData[]) => void;
  openNotebook: (itemId: Prod.ProductID[]) => void
  askForTranslate: (itemIds: Prod.ProductID[]) => void
  getTranscription: (itemIds: Prod.ProductID[]) => void,
  addToNotebook: (itemIds: Prod.ProductID[]) => void,
  markAsRead: (itemIds: Prod.ProductID[], isRead: boolean) => void,
  downloadFile: (url: string) => void,
  show: () => void;
  tags: () => void;
  selectType: () => void;
  actions: () => void;
  search: () => void;
  // isGroupMode: boolean;
  // changeGroupByMode: (isGroupMode: Dir.FileListMode) => void;
  expandAll: () => void;
  collapseAll: () => void;
  params: any;
}

export const PAGE_SIZE = 25;
export const FIRST_PAGE = 1;

export class DirectoryPage extends Component<DirectoryPageProps, {}> {
  constructor() {
    super();
  }

  loadDirectoryContent = (path: string, filters: Filters.FiltersData) => {
    this.props.loadDirectoryContent(this.props.params.agent_id, path, filters);
  }

  refreshFileList = (filters: Filters.FiltersData) => {
    this.props.loadFiles(
      this.props.params.agentid,
      FIRST_PAGE, // We typically refresh when filtering has changed, so we fetch the first page
      PAGE_SIZE,
      filters,
    );
  }

  refreshDirectoryTree = (filters: Filters.FiltersData) => {
    this.loadDirectoryContent(null, filters);
  }

  loadNextFileListPage = (filters?: Filters.FiltersData) => {
    const {nextFileListPageNumber, loadFiles} = this.props;
    loadFiles(this.props.params.agentid, nextFileListPageNumber, PAGE_SIZE, filters);
  };

  onFilesRangeViewed = (startIndex: number, stopIndex: number) => {
    const {fileList} = this.props;
    // convert indexes to ids
    const ids = fileList.slice(startIndex, stopIndex).map((item) => item.id);
    //
    // filter ids which are not already read
    // const idsToUpdate = ids.filter(id => this.props.unreadIds.indexOf(id) !== -1)
    if (ids.length > 0) {
      this.props.markFilesViewed(ids)
    }
  };

  public componentDidMount() {
    this.loadDirectoryContent(null, null);
  }

  render() {
    if (this.props.isError) {
      return <div>Fail to load</div>
    }

    let handlers = {
      loadNextFileListPage: this.loadNextFileListPage,
      refreshFileList: this.refreshFileList,
      onSliceRendered: this.onFilesRangeViewed,
      requestUpdate: this.props.requestUpdate,
      loadDirectoryContent: this.loadDirectoryContent,
      extractNow: this.props.extractNow,
      setFavourite: this.props.setFavourite,
      addTags: this.props.addTags,
      removeTag: this.props.removeTag,
      openNotebook: this.props.openNotebook,
      getTranscription: this.props.getTranscription,
      askForTranslate: this.props.askForTranslate,
      addToNotebook: this.props.addToNotebook,
      markAsRead: this.props.markAsRead,
      toggleExpandState: (path) => this.props.toggleDirectoryState(path),
      refreshDirectoryTree: this.refreshDirectoryTree,
      downloadFile: this.props.downloadFile
    }

    return (
      <ThemeProvider theme={directory}>
        <Div>
          <DirectoryAppView
            directoryTreeRoot={this.props.directoryTree}
            fileList={this.props.fileList}
            metadata={this.props.metadata}
            contentHandlers={handlers}
            hasNextFileListPage={this.props.hasNextFileListPage}
            filters={{
              show: () => {
                this.props.show()
              },
              tag: () => {
                this.props.tags()
              },
              action: () => {
                this.props.actions()
              },
              search: () => {
                this.props.search()
              },
              selectType: () => {
                this.props.selectType()
              },
            }}
            // isGroupMode = {this.props.isGroupMode}
            // changeGroupByMode = {this.props.changeGroupByMode}
            isFetching={this.props.isFetching}
            expandAll={this.props.expandAll}
            collapseAll={this.props.collapseAll}
          />
        </Div>
      </ThemeProvider>
    )
  }
}

const mapStoreDirToAppDir = (node) => {
  let appTree = {
    key: node.key,
    data: node.item,
    path: node.path,
    children: null,
    isLoaded: node.isLoaded,
    expanded: node.expanded,
  }

  appTree.children = [];

  Object.keys(node.childNodes).forEach(key => {
    const childNode = node.key ? mapStoreDirToAppDir(node.childNodes[key]) : null;

    if (childNode) {
      appTree.children.push(childNode);
    }
  });

  appTree.children.sort((xItem, yItem) => {
    let result = 0;
    let x = xItem.data, y = yItem.data;

    if (x.type === 'file' && y.type === 'directory') {
      result = 1;
    } else if (y.type === 'file' && x.type === 'directory') {
      result = -1;
    } else {
      result = x.name.toLowerCase() < y.name.toLowerCase() ? -1 : 1;
    }

    return result;
  })

  return appTree;
}

const mapStateToProps = (state) => {
  const isFetching = state[PRODUCT_TYPES.DIRECTORY].get('isFetching');

  const fileList = state[PRODUCT_TYPES.DIRECTORY].get('fileList').toJS();
  const totalFileListCount = state[PRODUCT_TYPES.DIRECTORY].get('totalFileListCount');

  const nextFileListPageNumber = state[PRODUCT_TYPES.DIRECTORY].get('nextFileListPageNumber')
  const metadata = state[PRODUCT_TYPES.DIRECTORY].get('metadata').toJS();

  const storeDirectoryTree = state[PRODUCT_TYPES.DIRECTORY].get('directoryTree').toJS();
  const directoryTree = mapStoreDirToAppDir(storeDirectoryTree);

  const isError = false;
  return {
    directoryTree,
    nextFileListPageNumber,
    fileList,
    metadata,
    isFetching,
    isError,
    // isGroupMode,
    hasNextFileListPage: !totalFileListCount || totalFileListCount > fileList.length,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadFiles: (agentId: number,
                nextFilesPageNumber: number,
                pageSize: number,
                filters?: Filters.FiltersData) => {
      dispatch(actions.loadFilesRequest(agentId, nextFilesPageNumber, pageSize, filters))
    },
    loadDirectoryContent: (agentid: number,
                           path: string,
                           filters?: Filters.FiltersData) => {
      dispatch(actions.directoryLoadRequest(agentid, path, filters))
    },

    toggleDirectoryState: (path: string) => {
      dispatch(actions.toggleDirectoryState(path))
    },

    collapseAll: () => {
      dispatch(actions.collapseDirectoryTree())
    },

    expandAll: () => {
      dispatch(actions.expandDirectoryTree())
    },

    setFavourite: (itemId: Prod.ProductID,
                   isFavorite: boolean) => {
      dispatch(ProdAction.productSetFavorite(
        {
          id: itemId,
          isFavorite: isFavorite
        },
        Prod.PRODUCT_TYPES.DIRECTORY_TREE))
    },

    removeTag: (id: Prod.ProductID, tagId: Tag.TagId) => {
      dispatch(ProdAction.productRemoveTag(
        {
          id: id,
          tagId: tagId
        },
        Prod.PRODUCT_TYPES.DIRECTORY_TREE))
    },

    addTags: (itemIds: Prod.ProductID[], tags: Tag.TagData[]) => {
      dispatch(ProdAction.productAddTag(
        {
          ids: itemIds,
          tags: tags
        },
        Prod.PRODUCT_TYPES.DIRECTORY_TREE))
    },

    // changeGroupByMode: (mode: Dir.FileListMode) => {
    //   dispatch(Action.groupByDomain({mode: mode}))
    // },

    markAsRead: (ids: Prod.ProductID[], isRead: boolean) => {
      if (isRead) {
        dispatch(ProdAction.productMarkAsRead({ids: ids}, Prod.PRODUCT_TYPES.DIRECTORY_TREE));
      } else {
        dispatch(ProdAction.productMarkAsUnread({ids: ids}, Prod.PRODUCT_TYPES.DIRECTORY_TREE));
      }
    },
    downloadFile: (url: string) => {
      dispatch(ProdAction.downloadFile({url: url}, Prod.PRODUCT_TYPES.DIRECTORY_FILES))
    },
    openNotebook: (id: Prod.ProductID[]) => {/* TODO: implement the function */
    },

    getTranscription: (ids: Prod.ProductID[]) => {/* TODO: implement the function */
    },

    askForTranslate: (ids: Prod.ProductID[]) => {/* TODO: implement the function */
    },

    requestUpdate: () => {/* TODO: implement the function */
    },

    extractNow: () => {/* TODO: implement the function */
    },
    // Filters functions:
    search: () => {/* TODO: implement the function */
    },
    show: () => {/* TODO: implement the function */
    },
    tags: () => {/* TODO: implement the function */
    },
    actions: () => {/* TODO: implement the function */
    },
    selectType: () => {/* TODO: implement the function */
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DirectoryPage)
