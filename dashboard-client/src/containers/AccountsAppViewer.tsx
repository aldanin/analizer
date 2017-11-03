import * as React from 'react'
import { connect } from 'react-redux'
import AccountsApp from '../components/AccountsAppViewer/index'
import { AccountItem, ConflictingPassword } from '../types/Accounts'
import { TagId } from '../types/Tag'
import * as actions from '../state/actions/Accounts'
import scTheme from '../theme/ScTheme'
import { FiltersData } from '../types/Filters'
import { PRODUCT_TYPES } from '../types/Product'

export interface AccountsAppViewerProps extends React.Props<AccountsAppViewer> {
  agentid: number;
  accountItemsData: AccountItem[];
  nextPageNumber: number; // The page which will be reqeusted when grid scroller reached the bottom
  filters: FiltersData;
  lastId: number;
  unreadIds: number[];
  isFetching: boolean;
  isError: boolean;
  hasNextPage: boolean;
  totalCount: number;
  loadAccountItems: (
    agentid: number, nextPageNumber: number, pageSize?: number, filters?: FiltersData, lastId?: number) => void;
  setFavoriteState: (agentid: number, id: number, isFavorite: boolean) => void;
  addTag: (id: number) => void;
  removeTag: (agentid: number, accountItemId: number, tagId: TagId) => void;
  markAccountItemsViewed: (ids: number[]) => void;
  onSliceRendered: (startIndex: number, stopIndex: number) => void;
  selectPassword: (agentid: number, accountItemId: number, password: ConflictingPassword) => void;
  params: any;
}
export interface AccountsAppViewerState {
  agentid: number,
  accountItemsData: any,
}

export const PAGE_SIZE = 25;
export const FIRST_PAGE = 1;

class AccountsAppViewer extends React.Component<AccountsAppViewerProps, {}> {

  constructor(props: AccountsAppViewerProps) {
    super(props);

    this.addTag = this.addTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.setFavorite = this.setFavorite.bind(this);
    this.refresh = this.refresh.bind(this);
    this.loadNextPage = this.loadNextPage.bind(this);
    this.onAccountItemsRangeViewed = this.onAccountItemsRangeViewed.bind(this);
  }

  addTag(id: number) {
    // TODO
  }

  removeTag(accountItemId: number, tagId: TagId) {
    this.props.removeTag(this.props.params.agentid, accountItemId, tagId);

  }

  setFavorite(id: number, isFavorite: boolean) {
    this.props.setFavoriteState(this.props.params.agentid, id, isFavorite);
  }

  refresh(pageSize: number, filters: FiltersData, lastId: number) {
    this.props.loadAccountItems(
      this.props.params.agentid,
      1, // FIRST_PAGE,  // We typically refresh when filtering has changed, so we fetch the first page
      25, // PAGE_SIZE,
      filters,
      this.props.lastId,
    );
  }

  loadNextPage = (filters?: FiltersData) => {
    const {nextPageNumber, loadAccountItems} = this.props;
    loadAccountItems(this.props.params.agentid, nextPageNumber, PAGE_SIZE, filters);
  };

  onAccountItemsRangeViewed = (startIndex: number, stopIndex: number) => {
    const {accountItemsData} = this.props
    // convert indexes to ids
    const ids = accountItemsData.slice(startIndex, stopIndex).map((item) => item.id);
    // filter ids which are not already read
    // const idsToUpdate = ids.filter(id => this.props.unreadIds.indexOf(id) !== -1)
    if (ids.length > 0) {
      this.props.markAccountItemsViewed(ids)
    }
  };

  selectPassword = (accountItemId: number, password: ConflictingPassword) => {

    this.props.selectPassword(this.props.params.agentid, accountItemId, password );
  }

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

  public componentDidMount() {
    this.props.loadAccountItems(this.props.params.agentid, FIRST_PAGE, PAGE_SIZE, null, null);
  }

  shouldComponentUpdate(nextProps: AccountsAppViewerProps, nextState: Object) {
    return !nextProps.isFetching;
  }

  render() {
    const theme = scTheme.accounts;
    return (
      <div>
        <AccountsApp
          data={this.props.accountItemsData}
          hasNextPage={this.props.hasNextPage}
          isFetching={this.props.isFetching}
          timerIndicator={3}
          updateTimeIndicator={20}
          contentHandlers={{
             addTag: this.addTag,
             removeTag: this.removeTag,
             setFavorite: this.setFavorite,
             refresh: this.refresh,
             loadNextPage: this.loadNextPage,
             onSliceRendered: this.onAccountItemsRangeViewed,
             onConflictingPasswordClick: this.selectPassword
          }}
          theme={theme}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const accountItemsList = state[PRODUCT_TYPES.ACCOUNTS].get('accountItemsData');

  const isFetching = state[PRODUCT_TYPES.ACCOUNTS].get('isFetching');
  const isError = state[PRODUCT_TYPES.ACCOUNTS].get('isError');
  const totalCount = state[PRODUCT_TYPES.ACCOUNTS].get('totalCount');
  const lastId = state[PRODUCT_TYPES.ACCOUNTS].get('lastId');
  const nextPageNumber = state[PRODUCT_TYPES.ACCOUNTS].get('nextPageNumber');
  const filters = state[PRODUCT_TYPES.ACCOUNTS].get('filters');

  const accountItemsData = accountItemsList.toJS();

  return {
    accountItemsData,
    isFetching,
    isError,
    nextPageNumber,
    filters,
    lastId,
    hasNextPage: totalCount > accountItemsData.length,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFavoriteState: (agentid: number, id: number, isFavorite: boolean) => {
      dispatch(actions.accountsSetFavoriteState(agentid, id, isFavorite))
    },
    loadAccountItems:
      (agentid: number, nextPageNumber: number, pageSize: number, filters?: FiltersData, lastId?: number) => {
      dispatch(actions.accountsLoadRequest(agentid, nextPageNumber, pageSize, filters, lastId))
    },
    markAccountItemsViewed: (ids: number[]) => dispatch(actions.accountsSetReadStatus(ids, true)),
    // addTag: (photoId: number, tag: string) => {dispatch(addTag({photoId: photoId, tag: tag}))},
    removeTag: (agentid: number, id: number, tagId: TagId) => {
      dispatch(actions.removeTag(agentid, id, tagId))
    },
    selectPassword: ( agentid: number, accountId: number, password: ConflictingPassword) => {
      dispatch(actions.passwordSelectionRequest(agentid, accountId, password))
    }
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
)(AccountsAppViewer)
