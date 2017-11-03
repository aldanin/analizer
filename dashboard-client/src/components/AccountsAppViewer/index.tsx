import * as React from 'react'
import AppViewHeaderToolbar from '../Common/AppViewHeaderTool/index'
import AccountsContent from './Content'
import { AccountItem, ConflictingPassword } from '../../types/Accounts'
import { TagId } from '../../types/Tag'
import * as Theme from './Theme'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'
import { FiltersData } from '../../types/Filters'

export interface AccountsAppViewerProps extends React.Props<AccountsApp> {
  data: AccountItem[];
  hasNextPage: boolean;
  isFetching: boolean;

  timerIndicator: number;
  updateTimeIndicator: number;
  contentHandlers: {
    addTag: (id: number) => void;
    removeTag: (id: number, tagId: TagId) => void;
    setFavorite: (id: number, isFavorite: boolean) => void;
    refresh: (pageSize: number, filters: FiltersData, lastId: number) => void;
    loadNextPage: (filters?: FiltersData) => void;
    onSliceRendered: (startIndex: number, stopIndex: number) => void;
    onConflictingPasswordClick: (accountId: number, password: ConflictingPassword) => void
  }
  theme?: Theme.ThemeProps;
}

const TOOLBAR_HEIGHT = '9.5rem';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding-top: ${TOOLBAR_HEIGHT};
  box-sizing: border-box;
  position: relative;
`;

const ToolbarArea = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  height: ${TOOLBAR_HEIGHT};
  overflow: hidden;
  font-size: 1.9rem;
`;
// const AccountsViewer = styled.div`
//   overflow: hidden;
//   display: flex;
//   flex-direction: column;
//   height: 100%;
//   width: 100%;
// `;

class AccountsApp extends React.Component<AccountsAppViewerProps, {}> {
  static defaultProps: Partial<AccountsAppViewerProps> = {
    theme: Theme.defaultTheme
  };

  private filters: FiltersData;
  private lastId: number;
  private pageSize: number;

  constructor(props: AccountsAppViewerProps) {
    super(props);

    this.filters = {
      boolean: [],
      sort: {
        sortBy: null,
        desc: null
      }
    };

    this.lastId = undefined;
    this.pageSize = undefined;
  }

  onColumnHeaderClick = (colKey: string) => {
    this.filters.sort.sortBy = colKey;
    this.filters.sort.desc = this.filters.sort.desc !== null && this.filters.sort.desc !== undefined
      ? !this.filters.sort.desc
      : false;
    this.props.contentHandlers.refresh(this.pageSize, this.filters, this.lastId);
  }

  onHeaderClick = (sortBy: string, sortDirection: boolean) => {
    this.filters.sort.sortBy = sortBy;
    this.filters.sort.desc = sortDirection !== null && this.filters.sort.desc !== undefined
      ? sortDirection
      : false;
    this.props.contentHandlers.refresh(this.pageSize, this.filters, this.lastId);
  }

  onBooleanFilterChange = (key: string, enabled: boolean) => {

    const found = this.filters.boolean.find(x => x === key);
    if (enabled) {
      if (!found) {
        this.filters.boolean.push(key);
      }
    } else {
      if (found) {
        const index = this.filters.boolean.indexOf(found);
        this.filters.boolean.splice(index, 1);
      }
    }
    this.props.contentHandlers.refresh(this.pageSize, this.filters, this.lastId);
  }

  loadNextPage = () => {
    this.props.contentHandlers.loadNextPage(this.filters);
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

  render() {

    return (
      <ThemeProvider theme={this.props.theme}>
        <Wrapper>
          <ToolbarArea className="gallery-widget-toolbar">
            <AppViewHeaderToolbar
              icon={'icon_accounts'}
              title={'Accounts'}
              titleStyle={{marginLeft: '25px'}}
              lastExtractionTime={this.props.isFetching ? 0 : this.props.timerIndicator}
              requestUpdate={this.requestUpdate}
              extractNow={this.extractNow}
              updateTimeIndicator={this.props.isFetching ? 0 : this.props.updateTimeIndicator}
              theme={this.props.theme.appViewHeaderTool}
            />
          </ToolbarArea>
          <AccountsContent
            handlers={{
              addTag: this.props.contentHandlers.addTag,
              removeTag: this.props.contentHandlers.removeTag,
              setFavorite: this.props.contentHandlers.setFavorite,
              onSliceRendered: this.props.contentHandlers.onSliceRendered,
              loadNextPage: this.loadNextPage,
              onColumnHeaderClick: this.onColumnHeaderClick,
              onHeaderClick: this.onHeaderClick,
              onConflictingPasswordClick: this.props.contentHandlers.onConflictingPasswordClick
            }
          }
            hasNextPage={this.props.hasNextPage}
            isFetching={this.props.isFetching}
            data={this.props.data}
            theme={this.props.theme}
          />
        </Wrapper>
      </ThemeProvider>
    )
  }
}

export default AccountsApp;
