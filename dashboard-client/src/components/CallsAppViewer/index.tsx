import * as React from 'react'
import AppViewHeaderToolbar from '../Common/AppViewHeaderTool/index'
import AppViewFiltersTool from '../Common/AppViewFilterTool/index'
import CallsContent from './Content'
import * as Calls from '../../types/Calls'
import * as Prod from '../../types/Product'
import * as Tag from '../../types/Tag'
import * as Theme from './Theme'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'
import ViewFilters from './ViewFilters'
import * as Helpers from '../../helpers/Filters'
import * as IMM from 'immutable'
import KeywordProvider from '../../containers/KeywordPRovider'

export interface CallsAppViewerProps extends React.Props<CallsApp> {
  data: Calls.CallData[];
  hasNextPage: boolean;
  isFetching: boolean;

  timerIndicator: number;
  updateTimeIndicator: number;
  contentHandlers: {
    addTags: (itemIds: Prod.ProductID[], tag: Tag.TagData[]) => void;
    removeTag: (id: number, tagId: Tag.TagId) => void;
    setFavorite: (id: number, isFavorite: boolean) => void;
    openNotebook: (itemIds: Prod.ProductID[]) => void
    askForTranslate: (itemId: Prod.ProductID[]) => void
    getTranscription: (itemId: Prod.ProductID[]) => void,
    addToNotebook: (itemId: Prod.ProductID[]) => void,
    markAsRead: (itemId: Prod.ProductID[], isRead: boolean) => void,
    loadNextPage: () => void;
    onSliceRendered: (startIndex: number, stopIndex: number) => void,
    onFiltersChange: (filters: Calls.Filters) => void,
  };
  filters: Calls.Filters;
  filterHandlers: {
    show: () => void;
    tag: () => void;
    action: () => void;
    selectType: (value: number) => void
    selectSource: (value: number) => void
  }
  keyword: string;
  theme?: Theme.ThemeProps;
}

export interface CallsAppViewState {
  checkedItems: any;
}

const AccountsViewer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const ViewFiltersWrap = styled.div`

`;

class CallsApp extends React.Component<CallsAppViewerProps, CallsAppViewState> {
  static defaultProps: Partial<CallsAppViewerProps> = {
    theme: Theme.DEFAULT_THEME
  };

  private lastId: number;
  private pageSize: number;

  constructor(props: CallsAppViewerProps) {
    super(props);

    this.state = {
      checkedItems: {}
    }

    this.lastId = undefined;
    this.pageSize = undefined;
  }

  addMultiTags(tag: Tag.TagData[]) {
    this.props.contentHandlers.addTags(this.getCheckedItemsArray(), tag);
  }

  onHeaderClick = (sortBy: string, sortDirection: boolean) => {

    const filters = Helpers.updateSortFilter(this.props.filters, sortBy, sortDirection);

    this.props.contentHandlers.onFiltersChange(filters);
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
        arr.push(parseInt(key, 10));
      }
    })

    return arr;
  }

  onBooleanFilterChange = (key: string, enabled: boolean) => {
    const booleanFilters = Helpers.updateBooleanFilters_(this.props.filters.boolean, key, enabled);
    const newFilters = Object.assign({}, this.props.filters, {boolean: booleanFilters})
    this.props.contentHandlers.onFiltersChange(newFilters);
  }

  loadNextPage = () => {
    this.props.contentHandlers.loadNextPage();
  }

  requestUpdate = () => {
    // TODO
  }

  extractNow = () => {
    // TODO
  }

  doShow = () => {
// TODO
  }

  doTags = () => {
// TODO
  }

  doActions = () => {
// TODO
  }

  doSearch = () => {
// TODO
  }

  getViewFilters = () => {
    return (
      <ViewFiltersWrap>
        <ViewFilters
          onBooleanFilterChange={this.onBooleanFilterChange}
          selectType={this.props.filterHandlers.selectType}
          selectSource={this.props.filterHandlers.selectSource}
          theme={this.props.theme}
        />
      </ViewFiltersWrap>

    )
  }

  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <AccountsViewer>
          <div className="calls-widget-toolbar" style={{fontSize: '1.9rem'}}>
            <AppViewHeaderToolbar
              icon={'icon_calls'}
              title={'Calls'}
              titleStyle={{marginLeft: '25px'}}
              lastExtractionTime={this.props.isFetching ? 0 : this.props.timerIndicator}
              requestUpdate={this.requestUpdate}
              extractNow={this.extractNow}
              updateTimeIndicator={this.props.isFetching ? 0 : this.props.updateTimeIndicator}
              theme={this.props.theme.appViewHeaderTool}
            />
          </div>
          <AppViewFiltersTool
            show={this.doShow}
            tags={this.doTags}
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
            search={this.doSearch}
            component={this.getViewFilters()}
          />
          <KeywordProvider keyword={this.props.keyword}>
            <CallsContent
              hasNextPage={this.props.hasNextPage}
              isFetching={this.props.isFetching}
              data={this.props.data}
              checkedItems={this.state.checkedItems}
              handlers={{
              onItemCheck: this.itemCheckHandler,
              addTags: this.props.contentHandlers.addTags,
              removeTag: this.props.contentHandlers.removeTag,
              openNotebook : this.props.contentHandlers.openNotebook,
              askForTranslate : this.props.contentHandlers.askForTranslate,
              getTranscription: this.props.contentHandlers.getTranscription,
              addToNotebook: this.props.contentHandlers.addToNotebook,
              markAsRead: this.props.contentHandlers.markAsRead,
              setFavorite: this.props.contentHandlers.setFavorite,
              onSliceRendered: this.props.contentHandlers.onSliceRendered,
              loadNextPage: this.loadNextPage,
              onHeaderClick: this.onHeaderClick,
            }}
              theme={this.props.theme}
            />
          </KeywordProvider>
        </AccountsViewer>
      </ThemeProvider>
    )
  }
}

export default CallsApp;
