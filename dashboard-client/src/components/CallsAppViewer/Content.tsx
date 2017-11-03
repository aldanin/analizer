import * as React from 'react'
import CallsDetailsPane from './CallsDetailsPane'
import * as Calls from '../../types/Calls'
import * as Theme from './Theme'
import styled from 'styled-components'
import MainGrid from './grid/MainGrid'
import * as Prod from '../../types/Product'
import * as Tag from '../../types/Tag'
import ReactResizeDetector from 'react-resize-detector'
import { withTheme } from 'styled-components'

export interface ContentProps extends React.Props<CallsContent> {
  data: Calls.CallData[],
  checkedItems: {},
  hasNextPage: boolean,
  isFetching: boolean,
  handlers: {
    onItemCheck: (itemId: Prod.ProductID, isChecked: boolean) => void,
    addTags: (ids: Prod.ProductID[], tags: Tag.TagData[]) => void,
    removeTag: (id: Prod.ProductID, tagId: Tag.TagId) => void,
    setFavorite: (id: Prod.ProductID, isFavorite: boolean) => void,
    loadNextPage: () => void,
    onSliceRendered: (startIndex: number, stopIndex: number) => void
    onHeaderClick: (sortBy: string, desc: boolean) => void,
    markAsRead: (itemIds: Prod.ProductID[], isRead: boolean) => void,
    addToNotebook: (itemIds: Prod.ProductID[]) => void,
    openNotebook: (itemIds: Prod.ProductID[]) => void,
    getTranscription: (itemIds: Prod.ProductID[]) => void,
    askForTranslate: (itemIds: Prod.ProductID[]) => void,
  },
  theme: Theme.ThemeProps
}
export interface CallsState {
  selectedAccountItem: Calls.CallData,
  gridAreaSize: {
    width: number,
    height: number
  },
  contentAreaSize: {
    width: number,
    height: number
  }
}

interface StyledProps {
  DetailsWidth?: number,
  theme: Theme.ThemeProps
}

const Content = styled.div`
  height: calc(100% - 112px);
  width: 100%;
  overflow: hidden;
`;
const Grid = styled.div`
  display: flex;
  width: calc(100% - ${(props: StyledProps) => props.DetailsWidth + 1}px);
  height: 100%;
  float: left;
  align-content: flex-start;
`;
const Details = styled.div`
  float: right;
  width: ${(props: StyledProps) => props.DetailsWidth}px;
  height: 100%;
  min-width: 300px;
  border-left: solid 1px ${(props: StyledProps) => props.theme.genericTextColors.borderColor};
`;

class CallsContent extends React.Component<ContentProps, CallsState> {
  constructor(props: ContentProps) {
    super(props);

    this.state = {
      selectedAccountItem: Calls.defaultCallData,
      gridAreaSize: {
        height: null,
        width: null
      },
      contentAreaSize: {
        width: null,
        height: null
      }
    };
  }

  onGridRowClick = (row: any) => {
    this.setState({
      selectedAccountItem: row
    })
  }

  addTags = (itemIds: Prod.ProductID[], tags: Tag.TagData[]) => {
    this.props.handlers.addTags(itemIds, tags);
  }

  onContentResize = (width: number, height: number) => {
    this.setState({
      gridAreaSize: {
        width: width,
        height: height
      },
      contentAreaSize: {
        width: width,
        height: height
      }
    })
  }

  componentWillReceiveProps(nextProps: ContentProps) {
    //
    // Trigger row selection on the currently selected item/row, or the first one in the current list:
    //
    let found;
    if (nextProps.data && nextProps.data.length) {
      if (this.state.selectedAccountItem && nextProps.data) {
        found = nextProps.data.find(x => x.id === this.state.selectedAccountItem.id);
      }
      this.onGridRowClick(found || nextProps.data[0]);
    }
  }

  getDetailsWidth = () => {
    if (this.state.contentAreaSize.width > 1400) {
      return 740;
    } else if (this.state.contentAreaSize.width > 1100) {
      return 600;
    } else {
      return 500;
    }
    // return 550;
  }

  render() {
    let CallData = this.props.data
      ? this.props.data.find((item) => item.id === this.state.selectedAccountItem.id)
      : null;

    const handlers = this.props.handlers;

    return (
      <Content>
        <ReactResizeDetector handleWidth={true} handleHeight={true} onResize={this.onContentResize}/>
        <Grid
          DetailsWidth={this.getDetailsWidth()}
          theme={this.props.theme}
        >
          <MainGrid
            rowData={this.props.data}
            selectedRow={this.state.selectedAccountItem}
            onHeaderClick={this.props.handlers.onHeaderClick}
            onRowClick={this.onGridRowClick}
            onRowCheck={this.props.handlers.onItemCheck}
            setStar={this.props.handlers.setFavorite}
            removeTag={this.props.handlers.removeTag}
            openNotebook={() => {/* NOT implemented*/}}
            addTag={this.props.handlers.addTags}
            addToNotebook={() => {/* NOT implemented*/}}
            markAsRead={(itemIds: Prod.ProductID[]) => this.props.handlers.markAsRead(itemIds, true)}
            markAsUnRead={(itemIds: Prod.ProductID[]) => this.props.handlers.markAsRead(itemIds, false)}
            askForTranslate={() => {/* NOT implemented*/}}
            askForTranscript={() => {/* NOT implemented*/}}
            exportItem={() => {/* Not implemented */}}
            getTranslate={() => {/* NOT implemented*/}}
            loadMoreData={this.props.handlers.loadNextPage}
          />
        </Grid>
        <Details
          DetailsWidth={this.getDetailsWidth()}
          theme={this.props.theme}
        >
          <CallsDetailsPane
            callData={CallData}
            handlers={{
              setFavorite: this.props.handlers.setFavorite,
              openNotebook: (itemId: Prod.ProductID) => this.props.handlers.openNotebook([itemId]),
              addTags: (itemId: Prod.ProductID, tags: Tag.TagData[]) => this.props.handlers.addTags([itemId], tags),
              markAsRead : (itemId: Prod.ProductID, isRead: boolean) => {
                handlers.markAsRead([itemId], isRead)
              },
              addToNotebook : (itemId: Prod.ProductID) => {
                handlers.addToNotebook([itemId])
              },
              askForTranslate : (itemId: Prod.ProductID) => {
                handlers.askForTranslate([itemId])
              },
             getTranscription : (itemId: Prod.ProductID) => {
                handlers.getTranscription([itemId])
              },
            }}
            parentSize={{width: this.state.contentAreaSize.width}}
            theme={this.props.theme}
          />
        </Details>
      </Content>
    )
  }
}

export default withTheme(CallsContent)
