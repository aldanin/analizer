import * as React from 'react'
import { connect } from 'react-redux'
import CallsApp from '../components/CallsAppViewer/index'
import * as Calls from '../types/Calls'
import * as Tag from '../types/Tag'
import * as Prod from '../types/Product'
import { PRODUCT_TYPES } from '../types/Product';
import * as Agent from '../types/Agent'
import * as Actions from '../state/actions/Calls'
import * as ProdActions from '../state/actions/ProductActions'
import scTheme from '../theme/ScTheme'
import styled from 'styled-components'
import * as Helpers from '../helpers/Filters'

export interface CallsAppViewerProps extends React.Props<CallsAppViewer> {
  agentid: number;
  callsData: Calls.CallData[];
  nextPageNumber: number; // The page which will be reqeusted when grid scroller reached the bottom
  filters: Calls.Filters;
  lastId: number;
  unreadIds: number[];
  isFetching: boolean;
  isError: boolean;
  hasNextPage: boolean;
  totalCount: number;
  loadCallsData: (agentid: number,
                  nextPageNumber: number,
                  pageSize?: number,
                  filters?: Calls.Filters,
                  lastId?: number) => void;
  setFavorite: (id: Prod.ProductID, isFavorite: boolean) => void;
  addToNotebook: (itemIds: Prod.ProductID[]) => void,
  markAsRead: (itemIds: Prod.ProductID[], isRead: boolean) => void,
  addTags: (itemIds: Prod.ProductID[], tags: Tag.TagData[]) => void;
  removeTag: (id: Prod.ProductID, tagId: Tag.TagId) => void;
  openNotebook: (itemIds: Prod.ProductID[]) => void
  askForTranslate: (itemId: Prod.ProductID[]) => void
  getTranscription: (itemId: Prod.ProductID[]) => void,
  markAccountItemsViewed: (ids: number[]) => void;
  onSliceRendered: (startIndex: number, stopIndex: number) => void;
  onFiltersChange: (filters: Calls.Filters) => void;
  params: any;
  show: () => void;
  tags: () => void;
  source: () => void;
  actions: () => void;
  search: () => void,
  selectType: () => void;
  selectSource: () => void;
  keyword: string;
}
export interface AccountsAppViewerState {
  agentid: number,
  accountItemsData: any,
}

export const PAGE_SIZE = 25;
export const FIRST_PAGE = 1;

const Root = styled.div`
  height: 100%;
`;

class CallsAppViewer extends React.Component<CallsAppViewerProps, {}> {

  constructor(props: CallsAppViewerProps) {
    super(props);

  }

  refresh = (filters: Calls.Filters, lastId: number) => {
    this.props.loadCallsData(
      this.props.params.agentid,
      1, // FIRST_PAGE,  // We typically refresh when filtering has changed, so we fetch the first page
      25, // PAGE_SIZE,
      filters,
      this.props.lastId,
    );
  }

  loadNextPage = () => {
    const {nextPageNumber, loadCallsData} = this.props;
    loadCallsData(this.props.params.agentid, nextPageNumber, PAGE_SIZE, this.props.filters);
  };

  doTags() {
// TODO
  }

  doActions() {
// TODO
  }

  doSearch() {
// TODO
  }

  onRowMenuChange(ev: Object) {
// TODO
  }

  componentWillReceiveProps(nextProps: CallsAppViewerProps) {
    if (!Helpers.compareFilters(nextProps.filters, this.props.filters)) {
      this.refresh(nextProps.filters, null);
    }
    // if (JSON.stringify(nextProps.filters) !== JSON.stringify(this.props.filters)) {
    //   this.refresh(nextProps.filters, null);
    // }
  }

  public componentDidMount() {
    this.props.loadCallsData(this.props.params.agentid, FIRST_PAGE, PAGE_SIZE, null, null);
  }

  shouldComponentUpdate(nextProps: CallsAppViewerProps, nextState: Object) {
    return !nextProps.isFetching;
  }

  render() {
    const theme = scTheme.calls;
    return (
      <Root>
        <CallsApp
          data={this.props.callsData}
          hasNextPage={this.props.hasNextPage}
          isFetching={this.props.isFetching}
          timerIndicator={3}
          updateTimeIndicator={20}
          contentHandlers={{
             markAsRead: this.props.markAsRead,
             addTags: this.props.addTags,
             removeTag: this.props.removeTag,
             setFavorite: this.props.setFavorite,
             openNotebook: this.props.openNotebook,
             addToNotebook: this.props.addToNotebook,
             askForTranslate: this.props.askForTranslate,
             getTranscription: this.props.getTranscription,
             loadNextPage: this.loadNextPage,
             onSliceRendered: () => {/* Not Implemented */},
             onFiltersChange: this.props.onFiltersChange,
          }}
          filters={this.props.filters}
          filterHandlers={{
            show: () => {
              this.props.show()
            },
            tag: () => {
              this.props.tags()
            },
            action: () => {
              this.props.actions()
            },
            selectType: () => {
              // TODO
            },
            selectSource: () => {
              // TODO
            }
          }}
          keyword={this.props.keyword}
          theme={theme}
        />
      </Root>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const callsList = state[PRODUCT_TYPES.CALLS].get('callsData');
  const isFetching = state[PRODUCT_TYPES.CALLS].get('isFetching');
  const isError = state[PRODUCT_TYPES.CALLS].get('isError');
  const totalCount = state[PRODUCT_TYPES.CALLS].get('totalCount');
  const lastId = state[PRODUCT_TYPES.CALLS].get('lastId');
  const nextPageNumber = state[PRODUCT_TYPES.CALLS].get('nextPageNumber');
  const filtersImut = state[PRODUCT_TYPES.CALLS].get('filters');
  const keyword = state[PRODUCT_TYPES.SEARCH].get('keyWord');

  const filters = filtersImut ? filtersImut.toJS() : null;
  const callsData = callsList.toJS();

  return {
    callsData,
    isFetching,
    isError,
    nextPageNumber,
    filters,
    lastId,
    hasNextPage: totalCount > callsData.length,
    keyword,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFavorite: (id: Prod.ProductID,
                  isFavorite: boolean) => {
      dispatch(ProdActions.productSetFavorite(
        {
          id: id,
          isFavorite: isFavorite
        },
        Prod.PRODUCT_TYPES.CALLS))
    },
    loadCallsData: (agentId: Agent.AgentId,
                    nextPageNumber: number,
                    pageSize: number,
                    filters?: Calls.Filters,
                    lastId?: number) => {
      dispatch(Actions.callsLoadRequest(agentId, nextPageNumber, pageSize, filters, lastId))
    },
    removeTag: (id: Prod.ProductID, tagId: Tag.TagId) => {
      dispatch(ProdActions.productRemoveTag(
        {
          id: id,
          tagId: tagId
        },
        Prod.PRODUCT_TYPES.CALLS))
    },

    addTags: (itemIds: Prod.ProductID[], tags: Tag.TagData[]) => {
      dispatch(ProdActions.productAddTag(
        {
          ids: itemIds,
          tags: tags
        },
        Prod.PRODUCT_TYPES.CALLS))
    },

    openNotebook: (id: Prod.ProductID) => {/* TODO: implement the function */
    },

    markAsRead: (ids: Prod.ProductID[], isRead: boolean) => {
      if (isRead) {
        dispatch(ProdActions.productMarkAsRead({ids: ids}, Prod.PRODUCT_TYPES.CALLS));
      } else {
        dispatch(ProdActions.productMarkAsUnread({ids: ids}, Prod.PRODUCT_TYPES.CALLS));
      }
    },

    onFiltersChange: (filters: Calls.Filters) => {
      dispatch(Actions.filtersChange({filters: filters}))
    },

    addToNotebook: (ids: Prod.ProductID[]) => {
      {/* TODO: implement the function */
      }
    },

    // requestUpdate: () => {/* TODO: implement the function */ },
    //
    // // sort: () => {/* TODO: implement the function */ },
    // // search: () => {/* TODO: implement the function */ },
    // // show: () => {/* TODO: implement the function */ },
    // // tags: () => {/* TODO: implement the function */ },
    // // actions: () => {/* TODO: implement the function */ },
    // // extractNow:  () => {/* TODO: implement the function */ },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CallsAppViewer)
