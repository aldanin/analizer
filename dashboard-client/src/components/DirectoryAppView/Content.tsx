import * as React from 'react'
import VGrid from '../Common/VGrid/index'
import FileDetailsPane from './FileSystemItemDetailsPane'
import DirectoryDetailsPane from './DirectoryDetailsPane'
import * as Dir from '../../types/Directory'
import * as Prod from '../../types/Product'
import * as Tag from '../../types/Tag'
import * as Theme from './Theme'
import styled from 'styled-components'
import { withTheme, ThemeProvider } from 'styled-components'
import FileSystemTreeView from './FileSystemTree/FileSystemTreeView';
import DateChooser from '../Common/DateChooser'
import { getColumns } from './grid/columnRenderers/columns'
import ReactResizeDetector from 'react-resize-detector'

export interface ContentProps extends React.Props<DirectoryContent> {
  actionMode: Dir.DirectoryActionMode;
  directoryTreeRoot: Dir.FileSystemNode,
  metadata: Dir.Metadata,
  fileList: Dir.FileItem[],
  hasNextFileListPage: boolean,
  checkedItems: {},
  handlers: {
    toggleExpandState: (path: string) => void;
    loadNextFileListPage: (filters?: any) => void,
    loadDirectoryContent: (path: string) => void,
    onItemCheck: (itemId: Prod.ProductID, isChecked: boolean) => void,
    onSliceRendered: (startIndex: number, stopIndex: number) => void;
    onColumnHeaderClick: (colKey: any) => void;
    onHeaderClick: (sortBy: string, desc: boolean) => void;
    setFavourite: (itemId: Prod.ProductID, isFavorite: boolean) => void,
    removeTag: (itemId: Prod.ProductID, tagId: Tag.TagId) => void,
    addTags: (itemIds: Prod.ProductID[], tags: Tag.TagData[]) => void,
    openNotebook: (itemIds: Prod.ProductID[]) => void,
    askForTranslate: (itemIds: Prod.ProductID[]) => void,
    getTranscription: (itemIds: Prod.ProductID[]) => void,
    addToNotebook: (itemIds: Prod.ProductID[]) => void,
    markAsRead: (itemIds: Prod.ProductID[], isRead: boolean) => void,
    extractionDateChange: (date: number) => void,
    download: (url: string) => void,
  },
  isFetching: boolean,
  theme: Theme.ThemeProps
}
export interface ContentState {
  selectedItemType: Dir.ItemType,
  selectedItem: Dir.FileSystemItem,
  isExpandMode: boolean;
  // isGroupByDomainMode: boolean;

  isDatePickerOpen: boolean;
  contentAreaSize: {
    width: number,
    height: number
  }
}

interface PaneWrapProps {
  isShown: boolean,
  DetailsWidth?: number
}

const Root = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;
const ContentWrap = styled.div`
  display: block;
  height: 100%;
  width: calc(100% - ${(props: PaneWrapProps) => props.DetailsWidth + 3}px);
  float: left;
  position: relative;
`;
const Details = styled.div`
  float: right;
  width: ${(props: PaneWrapProps) => props.DetailsWidth}px;
  height: 100%;
  border-left: solid 1px ${prop => prop.theme.borderColor};
`;

const FileGridViewWrap = styled.div`
  width: 100%;
  visibility: ${(props: PaneWrapProps) => props.isShown ? 'visible' : 'hidden'};
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${(props: PaneWrapProps) => props.isShown ? '2' : '1'};
`;

const TreeViewWrap = styled.div`
  margin-top: 12px;
  height: calc(100% - 60px);
  width: 100%;
  visibility: ${(prop: PaneWrapProps) => prop.isShown ? 'visible' : 'hidden'};
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${(props: PaneWrapProps) => props.isShown ? '2' : '1'};
`;

const PaneWrap = styled.div`
  height: 100%;
  display: ${(prop: PaneWrapProps) => prop.isShown ? 'block' : 'none'};
`;

const TreeWrap = styled.div`
  margin-top: 12px;
  height: 100%;
  border-top: 1px solid ${prop => prop.theme.borderColor};
  overflow: auto;
`;

const Title = styled.span`
  margin-left: 2%;
  margin-right: 3%;
  color: ${prop => prop.theme.extractedColor};
`;

const DateChooserWrap = styled.div`
  display: inline-block;
`;

class DirectoryContent extends React.Component<ContentProps, ContentState> {

  constructor(props: ContentProps) {
    super(props);

    this.state = {
      selectedItem: null,
      isExpandMode: false,
      // isGroupByDomainMode: false,
      selectedItemType: Dir.ItemType.directory,

      isDatePickerOpen: false,
      contentAreaSize: {
        width: 1551,
        height: null
      }
    };
  }

  onFileGridRowClick = (item: Dir.FileItem) => {
    this.setState({
      selectedItem: item,
      selectedItemType: Dir.ItemType.file
    })
  }

  onTreeNodeClick = (item: Dir.FileSystemItem, path: string, mayToggle: boolean = true) => {
    if (mayToggle && path) {
      this.props.handlers.toggleExpandState(path);
    }

    this.setState({
      selectedItem: item,
      selectedItemType: path ? Dir.ItemType.directory : Dir.ItemType.file
    })
  }

  onStatisticsTimespanChange = (value: number) => {
    alert('changed to ' + value);
  }

  componentWillReceiveProps(nextProps: ContentProps) {
    //
    // Trigger file grin row selection on the currently selected item/row, or the first one in the current list:
    //
    let found;
    if (this.props.actionMode === Dir.DirectoryActionMode.fileList && nextProps.fileList && nextProps.fileList.length) {
      if (this.state.selectedItem && nextProps.fileList) {
        found = nextProps.fileList.find(x => x.id === this.state.selectedItem.id);
      }
      this.onFileGridRowClick(found || nextProps.fileList[0]);
    }
  }

  getSelectedItem = () => {

    if (this.state.selectedItemType === Dir.ItemType.file) {
      if (this.props.actionMode === Dir.DirectoryActionMode.fileList) {
        const file = this.props.fileList
          ? this.props.fileList.find((item) => item.id === this.state.selectedItem.id)
          : null;
        return file;
      } else {
        return this.state.selectedItem;
      }
    } else {
      return this.state.selectedItem;
    }
  }

  addTags = (itemIds: Prod.ProductID[], tags: Tag.TagData[]) => {
    this.props.handlers.addTags(itemIds, tags);
  }

  onContentResize = (width: number, height: number) => {
    this.setState({
      contentAreaSize: {
        width: width,
        height: height
      }
    })
  }

  getDetailsWidth = () => {
    if (this.state.contentAreaSize.width > 1500) {
      return 550;
    } else if (this.state.contentAreaSize.width > 1250) {
      return 450;
    } else {
      return 350;
    }
    // return 550;
  }

  render() {
    const selectedItem = this.getSelectedItem();
    const handlers = this.props.handlers;

    return (
      <Root>
        <ReactResizeDetector handleWidth={true} handleHeight={true} onResize={this.onContentResize}/>
        <ContentWrap
          isShown={true}
          DetailsWidth={this.getDetailsWidth()}
        >
          {this.getContent()}
        </ContentWrap>
        <Details
          isShown={true}
          DetailsWidth={this.getDetailsWidth()}
        >
          <PaneWrap
            isShown={this.state.selectedItemType === Dir.ItemType.file}
          >
            <FileDetailsPane
              file={selectedItem as Dir.FileItem}
              handlers={{
                setFavourite : (itemId: Dir.directoryTreeObjectId, isFavorite) => {
                   return handlers.setFavourite(itemId, isFavorite)
                },
                addTags: (itemId: Prod.ProductID, tags: Tag.TagData[]) => {this.addTags([itemId], tags)},
                getTranscription : (itemId: Prod.ProductID) => {
                  handlers.getTranscription([itemId])
                },
                addToNotebook : (itemId: Prod.ProductID) => {
                  handlers.addToNotebook([itemId])
                },
                openNotebook: (itemId: Prod.ProductID) => {handlers.openNotebook([itemId])},
                askForTranslate : (itemId: Prod.ProductID) => {
                  handlers.askForTranslate([itemId])
                },
                markAsRead : (itemId: Prod.ProductID, isRead: boolean) => {
                  handlers.markAsRead([itemId], isRead)
                },
                download :  handlers.download
              }}
              parentSize={{width: this.state.contentAreaSize.width}}
              theme={this.props.theme}
            />
          </PaneWrap>
          <PaneWrap
            isShown={this.state.selectedItemType === Dir.ItemType.directory}
            DetailsWidth={this.getDetailsWidth()}
          >
            <DirectoryDetailsPane
              directory={selectedItem as Dir.FileItem}
              handlers={{
                setFavourite : (itemId: Dir.directoryTreeObjectId, isFavorite) => {
                   return handlers.setFavourite(itemId, isFavorite)
                },
                addTags: (itemIds: Prod.ProductID[], tags: Tag.TagData[]) => {this.addTags(itemIds, tags)},
              }}
              parentSize={{width: this.state.contentAreaSize.width}}
              theme={this.props.theme}
            />
          </PaneWrap>

        </Details>
      </Root>
    )
  }

  getContent() {
    if (this.props.actionMode === Dir.DirectoryActionMode.directoryTree) {
      return this.renderTreeView();
    }
    return this.renderGridView();
  }

  renderTreeView() {
    const handlers = this.props.handlers;

    return (
      <TreeViewWrap
        isShown={this.props.actionMode === Dir.DirectoryActionMode.directoryTree}
      >
        <div>
          <Title>Extracted on:</Title>
          <ThemeProvider theme={this.props.theme.dateChooser}>
            <DateChooserWrap>
              <DateChooser
                startDate={this.props.metadata.extractionDate}
                daySpan={1}
                theme={this.props.theme.dateChooser}
                changeDate={(date: number) => this.props.handlers.extractionDateChange(date)}
              />
            </DateChooserWrap>
          </ThemeProvider>
        </div>
        <TreeWrap>
          <FileSystemTreeView
            data={{
              directoryTreeRoot: this.props.directoryTreeRoot,
              extracted: this.props.metadata.extractionDate
            }}
            selectedFileSystemItemPath={
              this.state.selectedItem
              ? this.state.selectedItem.info.path
            : ''}
            nodeClick={this.onTreeNodeClick}
            onItemCheck={handlers.onItemCheck}
            loadDirectoryContent={handlers.loadDirectoryContent}
            setFavourite={handlers.setFavourite}
            removeTag={handlers.removeTag}
            addTags={(itemId: Prod.ProductID, tags: Tag.TagData[]) => {this.addTags([itemId], tags)}}
            isFetching={this.props.isFetching}
            theme={this.props.theme}
            openNotebook={(itemId: Prod.ProductID) => {handlers.openNotebook([itemId])}}
            getTranscription={(itemId: Prod.ProductID) => {handlers.getTranscription([itemId])}}
            addToNotebook={(itemId: Prod.ProductID) => {handlers.addToNotebook([itemId])}}
            askForTranslate={(itemId: Prod.ProductID) => {handlers.askForTranslate([itemId])}}
            markAsRead={(itemId: Prod.ProductID, isRead: boolean) => {handlers.markAsRead([itemId], isRead)}}
          />
        </TreeWrap>
      </TreeViewWrap>
    )
  }

  renderGridView() {
    const handlers = this.props.handlers;

    return (
      <ThemeProvider theme={this.props.theme.grid}>
        <FileGridViewWrap
          isShown={this.props.actionMode === Dir.DirectoryActionMode.fileList}
        >
          <VGrid
            data={this.props.fileList}
            getColumns={getColumns}
            checkedRows={this.props.checkedItems}
            hasNextPage={this.props.hasNextFileListPage}
            isFetching={this.props.isFetching}
            selectedItem={this.state.selectedItem as Dir.FileItem}
            handlers={{
              checkedRowHandler: handlers.onItemCheck,
              removeTag: this.props.handlers.removeTag,
              addTags: (itemId: Prod.ProductID, tags: Tag.TagData[]) => {this.addTags([itemId], tags)},
              setFavourite : (itemId: Dir.FileId, isFavorite) => handlers.setFavourite(itemId, isFavorite),
              markAsRead : (itemId: Prod.ProductID, isRead: boolean) => handlers.markAsRead([itemId], isRead),
              askForTranslate: (itemId: Prod.ProductID) => handlers.askForTranslate([itemId]),
              getTranscription: (itemId: Prod.ProductID) => handlers.getTranscription([itemId]),
              addToNotebook: (itemId: Prod.ProductID)  => {/* Not Implemented */},
              openNotebook: (itemId: Prod.ProductID) => handlers.openNotebook([itemId]),
              rowClick: this.onFileGridRowClick,
              loadNextPage: this.props.handlers.loadNextFileListPage,
              onSliceRendered: this.props.handlers.onSliceRendered,
              onHeaderClick: this.props.handlers.onHeaderClick,
              getProductId: (product: Prod.ProductData) => {
                const fileItem = (product as Dir.FileItem);
                return fileItem.info ? fileItem.info.path : '';
              }
            }}
            actionToolbarSwitches={{
              withFavorite: true,
              withTranslate: true,
              withNotebook: true,
              withTags: true,
            }}
            width={900}
            theme={this.props.theme.grid}
          />
        </FileGridViewWrap>
      </ThemeProvider>
    )
  }
}

export default withTheme(DirectoryContent)
