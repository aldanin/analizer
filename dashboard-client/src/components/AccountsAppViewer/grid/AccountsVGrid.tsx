import * as React from 'react'
import { InfiniteLoader } from 'react-virtualized/dist/commonjs/InfiniteLoader'
import { AccountItem } from '../../../types/Accounts'
import { TagId, TagData } from '../../../types/Tag'
import { Table, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css';
import VGridRowRenderer from '../../Common/VGridRowRenderer/VGridRowRenderer'
import { SortDirection } from 'react-virtualized'
import { getColumns } from './columnRenderers/columns'
import * as Theme from '../Theme'

export interface AccountsVGridProps {
  data: AccountItem[];
  selectedItem: AccountItem,
  hasNextPage: boolean;
  isFetching: boolean;
  handlers: {
    addTag: (id: number, tag: TagData) => void;
    removeTag: (id: number, tagId: TagId) => void;
    setFavorite: (id: number, isFavorite: boolean) => void;
    rowClick: Function;
    onHeaderClick: (sortBy: string, sortDirection: boolean) => void;
    loadNextPage: () => void;
    onSliceRendered: (startIndex: number, stopIndex: number) => void;
  },
  theme?: Theme.ThemeProps
}

export interface AccountsVGridState {
  selectedRowIndex: number;
  sortBy: string;
  sortDirection: SortDirection;
}

class AccountsVGrid extends React.Component<AccountsVGridProps, AccountsVGridState> {

  constructor(props: AccountsVGridProps) {
    super(props);

    this.state = {
      selectedRowIndex: 0,
      sortBy: 'index',
      sortDirection: SortDirection.ASC,
    }
  }

  onRowClick = (ev: any) => {
    this.props.handlers.rowClick(ev.rowData);
  }

  handleRowSelect = (rowData: any) => {
    this.props.handlers.rowClick(rowData);
  }

  sort = ({sortBy, sortDirection}: any) => {
    this.setState({sortBy, sortDirection});
    this.props.handlers.onHeaderClick(sortBy, sortDirection === SortDirection.DESC);
  }

  loadNextPage = () => {
    this.props.handlers.loadNextPage();
  };

  /* tslint:disable:member-ordering */
  loadMoreRows = this.props.isFetching
    ? () => {
      // Do nothing
    }
    : this.loadNextPage;
  /* tslint:enable */

  isRowLoaded = ({index}) => {
    return !this.props.hasNextPage || index < this.props.data.length
  };

  rowGetter = ({index}) => (
    this.isRowLoaded({index}) ? this.props.data[index] : {title: 'Loading...'}
  );

  renderItem = (item) => {
    const {
      className,
      columns,
      index,
      isScrolling,
      key,
      onRowClick,
      onRowDoubleClick,
      onRowMouseOver,
      onRowMouseOut,
      rowData,
      style
    } = item;

    const selected = rowData && this.props.selectedItem && rowData.id === this.props.selectedItem.id || false;

    let row =
      (
        <VGridRowRenderer
          className={className}
          columns={columns}
          index={index}
          isScrolling={isScrolling}
          key={key}
          onRowClick={onRowClick}
          onRowDoubleClick={onRowDoubleClick}
          onRowMouseOver={onRowMouseOver}
          onRowMouseOut={onRowMouseOut}
          rowData={rowData}
          selected={selected}
          style={style}
          theme={{
            bgColorRowActive: this.props.theme.grid.bgColorRowActive,
            bgColorRowHover: this.props.theme.grid.bgColorRowHover,
          }}
        />
      );
    return row;
  };

  render() {
    let {data} = this.props;
    data = !data.length ? [] : data;

    const rowStyle = {
      height: 50,
      borderBottom: '1px solid' + this.props.theme.grid.rowBorder
    };

    const tableParams = {
      disableHeader: false,
      headerHeight: 30,
      height: 270,
      hideIndexRow: false,
      overscanRowCount: 10,
      rowHeight: 40,
      rowCount: 1000,
      scrollToIndex: 0,
      sortBy: 'index',
      useDynamicRowHeight: false,
    };

    const {
      sortBy,
      sortDirection,
    } = this.state;

    const rowCount = this.props.hasNextPage
      ? data.length + 1
      : data.length;

    const getListComponent = ({onRowsRendered, registerChild}) => {
      const myOnRowsRendered = (args) => {
        onRowsRendered(args)
      };

      const tableComponent =
        (
          <AutoSizer disableHeight={true}>
            {({width}) => {
              return (
                <Table
                  gridStyle={{
                    textTransform: 'none',
                    outline: 'none'
                  }}
                  headerStyle={{
                    textTransform: 'none',
                   // fontSize: 13,
                    fontWeight: 'normal',
                    color: this.props.theme.genericTextColors.textColorLink,
                    flex: 'inherit',
                    padding: 2,
                    outline: 'none'
                  }}
                  width={width}
                  height={600}
                  disableHeader={tableParams.disableHeader}
                  headerHeight={tableParams.headerHeight}
                  onRowClick={this.onRowClick}
                  overscanRowCount={tableParams.overscanRowCount}

                  rowHeight={45}
                  scrollToIndex={tableParams.scrollToIndex}
                  sort={this.sort}
                  sortBy={sortBy}
                  sortDirection={sortDirection}
                  rowCount={rowCount}
                  rowGetter={this.rowGetter}
                  onRowsRendered={myOnRowsRendered}
                  rowRenderer={this.renderItem}
                  rowStyle={rowStyle}
                  style={{
                    fontWeight: 'normal',
                    textTransform: 'capitalize'
                  }}
                >
                  {getColumns(this.props)}
                </Table>
              )
            }}
          </AutoSizer>
        )
      return tableComponent;
    };

    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={rowCount}
        threshold={1}
      >
        {getListComponent}
      </InfiniteLoader>
    );
  }
}

export default AccountsVGrid;
