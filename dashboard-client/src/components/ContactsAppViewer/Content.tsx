import * as React from 'react'
import ContactDetailsPane from './ContactDetailsPane'
import * as ContactsCommon from 'common-interfaces/types/Contacts'
import * as Contacts from '../../types/Contacts'
import * as Theme from './Theme'
import styled from 'styled-components'
import { withTheme } from 'styled-components'
import MainGrid from './grid/MainGrid'
import * as Prod from '../../types/Product'
import * as Tags from '../../types/Tag'
import ReactResizeDetector from 'react-resize-detector'
import DataFetcher from '../../containers/DataFetcherGeneric'
import { PRODUCT_TYPES } from '../../types/Product'

const MainGridWithDataFetcher = DataFetcher(
  MainGrid, PRODUCT_TYPES.CONTACTS, 25)

export interface ContentProps extends React.Props<ContactsContent> {
  data: ContactsCommon.Contact[],
  selectedItems: Prod.ProductID[],
  hasNextPage: boolean,
  isFetching: boolean,
  handlers: {
    onItemCheck: (itemId: Prod.ProductID, isChecked: boolean) => void,
    addTags: (itemIds: Prod.ProductID[], tags: Tags.TagData[]) => void,
    removeTag: (itemId: Prod.ProductID, tagId: Tags.TagId) => void,
    setFavorite: (id: Prod.ProductID, isFavorite: boolean) => void,
    markAsRead: (itemIds: Prod.ProductID[], isRead: boolean) => void,
    addToNotebook: (itemIds: Prod.ProductID[]) => void,
    askForTranslate: (itemIds: Prod.ProductID[]) => void,
    askForTranscript: (itemIds: Prod.ProductID[]) => void,
    getTranslate: (itemId: Prod.ProductID) => void,
    getTranscript: (itemId: Prod.ProductID) => void,
    openNotebook: () => void,
    exportItem: (itemIds: Prod.ProductID[]) => void,
    loadNextPage: (isPrevious: boolean) => void,
    onSliceRendered: (startIndex: number, stopIndex: number) => void
    onHeaderClick: (sortBy: string, desc: boolean) => void,
  },
  theme: Theme.ThemeProps
}

export interface ContentState {
  currentItem: ContactsCommon.Contact,
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
  DetailsWidth?: number
}

const Root = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

// FIXME: border color should come from Theme
const Grid = styled.div`
  display: flex;
  width: calc(100% - ${(props: StyledProps) => props.DetailsWidth + 1}px);
  height: 100%;
  float: left;
  align-content: flex-start;
  border-right: solid 1px silver;
`;
const Details = styled.div`
  float: right;
   width: ${(props: StyledProps) => props.DetailsWidth}px;380px;
  // width: 470px;
  height: 100%;
`;

class ContactsContent extends React.Component<ContentProps, ContentState> {
  private contentsDiv;

  constructor(props: ContentProps) {
    super(props);

    this.state = {
      currentItem: Contacts.DEFAULT_CONTACT,
      gridAreaSize: {
        height: null,
        width: null
      },
      contentAreaSize: {
        width: 1440,
        height: null
      }
    };
  }

  onGridRowClick = (row: any) => {
    this.setState({
      currentItem: row
    })
  }

  onStatisticsTimespanChange = (value: number) => {
    alert('changed to ' + value);
  }

  addTags = (itemIds: Prod.ProductID[], tags: Tags.TagData[]) => {
    this.props.handlers.addTags(itemIds, tags);
  }

  onContentResize: (width: number, height: number) => any = (width, height) => {
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
      if (this.state.currentItem && nextProps.data) {
        found = nextProps.data.find(x => x.id === this.state.currentItem.id);
      }
      this.onGridRowClick(found || nextProps.data[0]);
    }
  }

  componentDidMount() {
    this.setState({contentAreaSize: {height: this.contentsDiv.clientHeight, width: this.contentsDiv.clientWidth}});
  }

  render() {
    let contact = this.props.data
      ? this.props.data.find((item, index) => {
        return item.id === this.state.currentItem.id
      })
      : null;
    const handlers = this.props.handlers;
    const detailsWidth = this.state.contentAreaSize.width && this.state.contentAreaSize.width > 1440 ? 470 : 400

    return (
      <Root
        innerRef={(div) => this.contentsDiv = div}
      >
        <ReactResizeDetector handleWidth={true} handleHeight={true} onResize={this.onContentResize}/>
        <Grid
          DetailsWidth={detailsWidth}
        >
          <MainGridWithDataFetcher
            rowData={this.props.data}
            selectedItems={this.props.selectedItems}
            currentItem={this.state.currentItem}
            onHeaderClick={this.props.handlers.onHeaderClick}
            onRowClick={this.onGridRowClick}
            onRowCheck={this.props.handlers.onItemCheck}
            setStar={(id: Prod.ProductID, isFavorite: boolean) => this.props.handlers.setFavorite(id, isFavorite)}
            removeTag={this.props.handlers.removeTag}
            openNotebook={() => {/* NOT implemented*/
            }}
            addTag={(id: Prod.ProductID, tags: Tags.TagData[]) => this.props.handlers.addTags([id], tags)}
            addToNotebook={(id: Prod.ProductID) => this.props.handlers.addToNotebook([id])}
            markAsRead={(id: Prod.ProductID) => this.props.handlers.markAsRead([id], true)}
            markAsUnRead={(id: Prod.ProductID) => this.props.handlers.markAsRead([id], false)}
            askForTranslate={(id: Prod.ProductID) => this.props.handlers.askForTranslate([id])}
            askForTranscript={(id: Prod.ProductID) => this.props.handlers.askForTranscript([id])}
            getTranslate={this.props.handlers.getTranslate}
            getTranscript={this.props.handlers.getTranscript}
            exportItem={(id: Prod.ProductID) => this.props.handlers.exportItem([id])}
            loadMoreData={this.props.handlers.loadNextPage}
          />
        </Grid>
        <Details
          DetailsWidth={detailsWidth}
        >
          <ContactDetailsPane
            contact={contact}
            handlers={{
              setFavorite: this.props.handlers.setFavorite,
              addTags: (itemId: Prod.ProductID, tags: Tags.TagData[]) => this.props.handlers.addTags([itemId], tags),
              markAsRead: (itemId: Prod.ProductID, isRead: boolean) => {
                handlers.markAsRead([itemId], isRead)
              },
              addToNotebook: (itemId: Prod.ProductID) => {
                handlers.addToNotebook([itemId])
              },
              askForTranslate: (itemId: Prod.ProductID) => {
                handlers.askForTranslate([itemId])
              },
              askForTranscript: (itemId: Prod.ProductID) => {
                handlers.askForTranscript([itemId])
              },
              openNotebook: handlers.openNotebook,
              getTranscript: (itemId: Prod.ProductID) => {
                handlers.getTranscript(itemId)
              },
              getTranslate: (itemId: Prod.ProductID) => {
                handlers.getTranslate(itemId)
              },
              exportItem: (itemId: Prod.ProductID) => {
                handlers.exportItem([itemId])
              },
              onStatisticsTimespanChange: (value: any) => {/* NOT implemented */
              },
            }}
            width={detailsWidth}
            theme={this.props.theme}
          />
        </Details>
      </Root>
    )
  }
}

export default withTheme(ContactsContent)
