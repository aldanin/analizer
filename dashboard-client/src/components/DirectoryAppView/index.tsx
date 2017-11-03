import * as React from 'react'
import * as Dir from '../../types/Directory';
import * as Tag from '../../types/Tag';
import * as Prod from '../../types/Product';
import AppViewHeaderToolbar from '../Common/AppViewHeaderTool/index';
import AppViewFiltersTool from '../Common/AppViewFilterTool/index';
import DirectoryFilter from './DirectoryFilter';
import Component = React.Component;
import styled from 'styled-components';
import { ThemeProps, DEFAULT_THEME } from './Theme';
import { withTheme } from 'styled-components';
import moment = require('moment');
import { ThemeProvider } from 'styled-components';
import * as Filters from '../../types/Filters'
import Content from './Content'
import * as IMM from 'immutable'

export interface DirectoryAppViewProps {
  directoryTreeRoot: Dir.FileSystemNode,
  fileList: Dir.FileItem[];
  metadata: Dir.Metadata;
  hasNextFileListPage: boolean;
  contentHandlers: {
    toggleExpandState: (path: string) => void;
    requestUpdate: () => void;
    extractNow: () => void;
    refreshFileList: (filters: Filters.FiltersData) => void;
    loadNextFileListPage: (filters?: Filters.FiltersData) => void;
    loadDirectoryContent: (path: string, filters?: Filters.FiltersData) => void;
    refreshDirectoryTree: (filters: Filters.FiltersData) => void;
    onSliceRendered: (startIndex: number, stopIndex: number) => void;
    setFavourite: (itemId: Dir.directoryTreeObjectId, isFavorite: boolean) => void;
    addTags: (itemIds: Prod.ProductID[], tag: Tag.TagData[]) => void;
    removeTag: (itemId: Dir.FileId, tagId: Tag.TagId) => void;
    openNotebook: (itemIds: Prod.ProductID[]) => void
    askForTranslate: (itemId: Prod.ProductID[]) => void
    getTranscription: (itemId: Prod.ProductID[]) => void,
    addToNotebook: (itemId: Prod.ProductID[]) => void,
    markAsRead: (itemId: Prod.ProductID[], isRead: boolean) => void,
    downloadFile: (url: string) => void,
  },
  filters: {
    show: () => void;
    tag: () => void;
    action: () => void;
    search: () => void;
    selectType: () => void;
  }
  theme?: ThemeProps;
  expandAll: () => void;
  collapseAll: () => void;
  // isGroupMode: boolean;
  // changeGroupByMode: (isGroupMode: boolean) => void;
  isFetching: boolean;
}

export interface DirectoryAppViewState {
  actionMode: Dir.DirectoryActionMode;
  fileListMode: Dir.FileListMode;
  fileListFetched: boolean;
  isGroupByDomainMode: boolean;
  checkedItems: any;
}

const ViewWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  // font-size: 3rem;
  overflow: hidden;
`;

const Header = styled.span`
  font-size: 1.9rem;
`;

class DirectoryAppView extends Component<DirectoryAppViewProps, DirectoryAppViewState> {
  static defaultProps: Partial<DirectoryAppViewProps> = {
    theme: DEFAULT_THEME,
  }

  private filters: Filters.FiltersData;

  constructor(props: DirectoryAppViewProps) {
    super(props);
    this.state = {
      actionMode: Dir.DirectoryActionMode.directoryTree,
      fileListMode: Dir.FileListMode.flatList,
      fileListFetched: false,
      isGroupByDomainMode: false,
      checkedItems: {}
    }

    this.filters = Filters.DEFAULT_FILTERS;
  }

  addMultiTags(tag: Tag.TagData[]) {
    this.props.contentHandlers.addTags(this.getCheckedItemsArray(), tag);
  }

  loadNextFileListPage = () => {
    this.props.contentHandlers.loadNextFileListPage(this.filters);
  }

  onColumnHeaderClick = (colKey: string) => {
    this.filters.sort.sortBy = colKey;
    this.filters.sort.desc = this.filters.sort.desc !== undefined
      ? !this.filters.sort.desc
      : false;
    this.props.contentHandlers.refreshFileList(this.filters);
  }

  onHeaderClick = (sortBy: string, sortDirection: boolean) => {
    this.filters.sort.sortBy = sortBy;
    this.filters.sort.desc = sortDirection !== undefined
      ? sortDirection
      : false;
    this.props.contentHandlers.refreshFileList(this.filters);
  }

  onFileGridSelected = () => {
    if (!this.state.fileListFetched) {
      this.props.contentHandlers.refreshFileList(null);
    } else {
      this.setState({actionMode: Dir.DirectoryActionMode.fileList})
    }
  }

  onDirectoryTreeSelected = () => {
    this.setState({actionMode: Dir.DirectoryActionMode.directoryTree})
  }

  itemCheckHandler = (itemId: Prod.ProductID, checkedStatus: boolean) => {
    if (checkedStatus !== undefined && checkedStatus !== null) {

      const checkedItems = IMM.Map(this.state.checkedItems).set(itemId, checkedStatus).toJS();
      this.setState({checkedItems: checkedItems})
    }
  }

  getCheckedItemsArray = () => {
    const arr = [];
    Object.keys(this.state.checkedItems).forEach(key => {
      if (this.state.checkedItems[key]) {
        arr.push(key);
      }
    })

    return arr;
  }

  extractionDateChange = (date: number) => {
    this.filters.dates = {
      startDate: date,
      endDate: null
    }
    this.props.contentHandlers.refreshDirectoryTree(this.filters)
  }

  componentWillReceiveProps(nextProps: DirectoryAppViewProps) {
    if (nextProps.fileList && nextProps.fileList.length) {
      if (this.state.actionMode === Dir.DirectoryActionMode.directoryTree && !this.state.fileListFetched) {
        //
        // We're here because we actually have a pending change in the state's action mode.
        // The change was requested, but not performed as we needed to fetch file data.
        // Now that we have it, we can perform the state changes:
        //
        this.setState({
          fileListFetched: true,
          actionMode: Dir.DirectoryActionMode.fileList
        });
        this.onFileGridSelected();
      }
    }
  }

  render() {
    const handlers = this.props.contentHandlers;

    // const appViewFiltersToolStyle = {
    //   display: 'block',
    //   width: '100%'
    // }

    let component = (
      <DirectoryFilter
        directoryTreeClickAction={this.onDirectoryTreeSelected}
        fileListClickAction={this.onFileGridSelected}
        expandAll={this.props.expandAll}
        collapseAll={this.props.collapseAll}
        initialSelectedIndex={this.state.actionMode - 1}
        initialFileListModeIndex={this.state.fileListMode - 1}
        isGroupByDomainMode={this.state.isGroupByDomainMode}
        groupByClickAction={() => {this.setState({isGroupByDomainMode: !this.state.isGroupByDomainMode})}}
        theme={this.props.theme}
       // isGroupMode = {this.props.isGroupMode}
       // changeGroupByMode = {this.props.changeGroupByMode}
        selectType={this.props.filters.selectType}
        fileListModeClick={() => { /* TODO */ }}
      />
    )

    return (
      <ThemeProvider theme={this.props.theme}>
        <ViewWrap>
          <Header>
            <AppViewHeaderToolbar
              icon={'icon_directory'}
              title={'Directory'}
              titleStyle={{marginLeft: '25px'}}
              lastExtractionTime={this.props.isFetching ? 0 :
                this.props.metadata.timerIndicator}
              updateTimeIndicator={this.props.isFetching ? 0 :
                this.props.metadata.updateTimeIndicator}
              requestUpdate={this.props.contentHandlers.requestUpdate}
              extractNow={this.props.contentHandlers.extractNow}
              theme={this.props.theme.appViewHeaderTool}
            />
            <AppViewFiltersTool
              component={component}
              show={this.props.filters.show}
              tags={this.props.filters.tag}
              actions={{
                addTagCallback: (tags: Tag.TagData[]) => {this.addMultiTags(tags)},
                addToNotebookCallback: () => {/*TODO: implement for multi selected items*/},
                markAsReadCallback: () =>
                  this.props.contentHandlers.markAsRead(this.getCheckedItemsArray(), true),
                markAsUnreadCallback: () =>
                  this.props.contentHandlers.markAsRead(this.getCheckedItemsArray(), false),
                translateCallback: () => {/*TODO: implement for multi selected items*/},
                transcriptCallback: () => {/*TODO: implement for multi selected items*/},
                exportCallback: () => {/*TODO: implement for multi selected items*/},
              }}
              toolbarGroupStyle={{
                marginLeft: '0',
                width: '100%',
              }}
              search={this.props.filters.search}
              theme={this.props.theme.appViewFilterTool}
            />
          </Header>
          <div style={{height: 'calc(100% - 112px)'}}>
            <Content
              fileList={this.props.fileList}
              directoryTreeRoot={this.props.directoryTreeRoot}
              metadata={this.props.metadata}
              actionMode={this.state.actionMode}
              hasNextFileListPage={this.props.hasNextFileListPage}
              isFetching={this.props.isFetching}
              checkedItems={this.state.checkedItems}
              handlers={{
                toggleExpandState: this.props.contentHandlers.toggleExpandState,
                onItemCheck: this.itemCheckHandler,
                addTags: this.props.contentHandlers.addTags,
                removeTag: this.props.contentHandlers.removeTag,
                setFavourite: this.props.contentHandlers.setFavourite,
                onSliceRendered: this.props.contentHandlers.onSliceRendered,
                loadNextFileListPage: this.loadNextFileListPage,
                loadDirectoryContent: this.props.contentHandlers.loadDirectoryContent,
                onColumnHeaderClick: this.onColumnHeaderClick,
                onHeaderClick: this.onHeaderClick,
                openNotebook : handlers.openNotebook,
                askForTranslate : handlers.askForTranslate,
                getTranscription: handlers.getTranscription,
                addToNotebook: handlers.addToNotebook,
                markAsRead: handlers.markAsRead,
                extractionDateChange: this.extractionDateChange,
                download: handlers.downloadFile,
              }}
              theme={this.props.theme}
            />
          </div>

        </ViewWrap>
      </ThemeProvider>
    )
  }

  getExtractedTime() {
    return ` < ${moment(this.props.metadata.extractionDate * 1000)
      .format('HH:mm / DD/MM/YYYY')} >`
  }
}

export default withTheme(DirectoryAppView)
