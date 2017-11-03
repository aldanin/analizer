import * as React from 'react'
import AccountsVGrid from './grid/AccountsVGrid'
import AccountsDetailsPane from './detailsPane/AccountsDetailsPane'
import { AccountItem, defaultAccountItem, ConflictingPassword } from '../../types/Accounts'
import { TagId } from '../../types/Tag'
import * as Theme from './Theme'
import styled from 'styled-components'
import { FiltersData } from '../../types/Filters'

export interface ContentProps extends React.Props<AccountsContent> {
  handlers: {
    addTag: (id: number) => void,
    removeTag: (id: number, tagId: TagId) => void,
    setFavorite: (id: number, isFavorite: boolean) => void,
    loadNextPage: (filters?: FiltersData) => void,
    onSliceRendered: (startIndex: number, stopIndex: number) => void
    onColumnHeaderClick: (colKey: any) => void,
    onHeaderClick: (sortBy: string, desc: boolean) => void,
    onConflictingPasswordClick: (accountId: number, password: ConflictingPassword) => void
  },
  data: AccountItem[],
  hasNextPage: boolean,
  isFetching: boolean,
  theme: Theme.ThemeProps
}
export interface AccountsState {
  selectedAccountItem: AccountItem
}

const Content = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

// FIXME: border-right color should come from Theme
const Grid = styled.div`
  display: flex;
  width: calc(100% - 381px);
  float: left;
  align-content: flex-start;
  border-right: solid 1px silver; 
`;
const Details = styled.div`
  float: right;
  width: 380px;
  height: 100%;
`;

class AccountsContent extends React.Component<ContentProps, AccountsState> {
  constructor(props: ContentProps) {
    super(props);

    this.state = {
      selectedAccountItem: defaultAccountItem
    };
  }

  onGridRowClick = (row: any) => {
    this.setState({
      selectedAccountItem: row
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

  render() {
    let accountItem = this.props.data
      ? this.props.data.find((item) => item.id === this.state.selectedAccountItem.id)
      : null;

    return (
      <Content>
        <Grid>
          <AccountsVGrid
            data={this.props.data}
            hasNextPage={this.props.hasNextPage}
            isFetching={this.props.isFetching}
            selectedItem={this.state.selectedAccountItem}
            handlers={{
              addTag: this.props.handlers.addTag,
              removeTag: this.props.handlers.removeTag,
              setFavorite: this.props.handlers.setFavorite,
              rowClick: this.onGridRowClick,
              loadNextPage: this.props.handlers.loadNextPage,
              onSliceRendered: this.props.handlers.onSliceRendered,
              onHeaderClick: this.props.handlers.onHeaderClick,
            }}
            theme={this.props.theme}
          />
        </Grid>
        <Details>
          <AccountsDetailsPane
            accountItem={accountItem}
            handlers={{
              setFavorite: this.props.handlers.setFavorite,
              addTag: this.props.handlers.addTag,
                            onConflictingPasswordClick: this.props.handlers.onConflictingPasswordClick
            }}
            theme={this.props.theme}
          />
        </Details>
      </Content>
    )
  }
}

export default AccountsContent
