import * as React from 'react'
import { InfiniteLoader } from 'react-virtualized/dist/commonjs/InfiniteLoader'
import * as Tag from '../../../types/Tag'
import { Table, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css';
import VGridRowRenderer from './VGridRowRenderer/VGridRowRenderer'
import { SortDirection } from 'react-virtualized'
import * as Theme from './Theme'
import * as Prod from '../../../types/Product'
import * as Generics from '../../../types/GenericInterfaces'

export interface VGridProps {
  data: Prod.ProductData[];

  checkedRows?: {};
  selectedItem: Prod.ProductData,
  hasNextPage: boolean;
  isFetching: boolean;
  forcedSelection?: boolean,
  handlers: {
    getProductId: (product: Prod.ProductData) => Prod.ProductID;
    checkedRowHandler: (prodId: Prod.ProductID, isChecked: boolean) => void;
    addTags: (prodId: Prod.ProductID, tag: Tag.TagData[]) => void;
    removeTag: (prodId: Prod.ProductID, tagId: Tag.TagId) => void;
    setFavourite: (prodId: Prod.ProductID, isFavorite: boolean) => void;
    rowClick: Function;
    onHeaderClick: (sortBy: string, sortDirection: boolean) => void;
    loadNextPage: () => void;
    onSliceRendered: (startIndex: number, stopIndex: number) => void;
    markAsRead: (prodId: Prod.ProductID, isRead: boolean) => void;
    askForTranslate: (prodId: Prod.ProductID) => void,
    getTranscription: (prodId: Prod.ProductID) => void,
    addToNotebook: (prodId: Prod.ProductID) => void,
    openNotebook: (prodId: Prod.ProductID) => void,
  },
  actionToolbarSwitches?: Generics.ActionToolbarSwitches,
  getColumns: (props: VGridProps, vgridStatus: VGridStatusProps) => any[];
  width: number,
  height?: number,
  theme?: Theme.ThemeProps
}

export interface VGridStatusProps {
  hoveredRowIndex: number;
  checkedRows: {},
  gridWidth: number;
}

export interface VGridState {
  hoveredRowIndex: number;
  sortBy: string;
  sortDirection: SortDirection;
}

class VGrid extends React.Component<VGridProps, VGridState> {
  static defaultProps: Partial<VGridProps> = {
    checkedRows: {},
    actionToolbarSwitches: Generics.DEFAULT_ACTION_SWITCHES,
    forcedSelection: false,
  }

  private table;

  constructor(props: VGridProps) {
    super(props);

    this.state = {
      hoveredRowIndex: null,
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

  loadMoreRows = () => {
    if (!this.props.isFetching) {
      this.props.handlers.loadNextPage();
    }
  }

  isRowLoaded = ({index}) => {
    return !this.props.hasNextPage || index < this.props.data.length
  };

  rowGetter = ({index}) => (
    this.isRowLoaded({index}) ? this.props.data[index] : {title: 'Loading...'}
  );

  isChecked = (product: Prod.ProductData) => {
    const id = this.props.handlers.getProductId(product);
    const temp = this.props.checkedRows[id];
    return temp;
  };

  onRowMouseOver = (ev: any) => {
    this.setState({
      hoveredRowIndex: ev.index
    })
  }

  getIndexById = (topicId: Prod.ProductID) => {
    const index = this.props.data.findIndex((topic => topic.id === topicId));

    return index;
  }
  componentDidUpdate(props: VGridProps) {
    if (props.selectedItem && props.forcedSelection) {
      const index = this.getIndexById(props.selectedItem.id);
      this.table.scrollToRow(index);
    }
  }

  renderItem = (item) => {
    const {
      className,
      columns,
      index,
      isScrolling,
      isRead,
      key,
      onRowClick,
      onRowDoubleClick,
      onRowMouseOver,
      onRowMouseOut,
      rowData,
      style
    } = item;

    const selected = rowData &&
      this.props.selectedItem &&
      rowData.id === this.props.selectedItem.id || false;

    let row =
      (
        <VGridRowRenderer
          className={className}
          columns={columns}
          index={index}
          isScrolling={isScrolling}
          isRead={isRead}
          isChecked={this.isChecked(rowData)}
          key={key}
          onRowClick={onRowClick}
          onRowDoubleClick={onRowDoubleClick}
          onRowMouseOver={onRowMouseOver}
          onRowMouseOut={onRowMouseOut}
          rowData={rowData}
          selected={selected}
          style={style}
          theme={this.props.theme.rowTheme}
        />
      );
    return row;
  };

  render() {
    let {data} = this.props;
    data = !data.length ? [] : data;

    const rowStyle = {
      height: 50,
      borderBottom: '1px solid' + this.props.theme.rowTheme.rowBorder
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
                    outline: 'none',
                    overflowX: 'scroll'
                  }}
                  headerStyle={{
                    textTransform: 'none',
                    fontWeight: 'normal',
                    color: this.props.theme.genericTextColors.textColorLink,
                    flex: 'inherit',
                    padding: 2,
                    outline: 'none',

                  }}
                  width={width - 10}
                  height={700}
                  disableHeader={tableParams.disableHeader}
                  headerHeight={tableParams.headerHeight}
                  onRowClick={this.onRowClick}
                  overscanRowCount={tableParams.overscanRowCount}
                  ref={table => this.table = table}
                  rowHeight={45}
                  scrollToIndex={tableParams.scrollToIndex}
                  sort={this.sort}
                  sortBy={sortBy}
                  sortDirection={sortDirection}
                  rowCount={rowCount}
                  rowGetter={this.rowGetter}
                  onRowsRendered={myOnRowsRendered}
                  onRowMouseOver={this.onRowMouseOver}
                  onRowMouseOut={() => {/*TODO: implement selected items*/}}
                  rowRenderer={this.renderItem}
                  rowStyle={rowStyle}
                  style={{
                    fontWeight: 'normal',
                    textTransform: 'capitalize',
                    minWidth: 800
                  }}
                >
                  {this.props.getColumns(this.props, {
                    hoveredRowIndex: this.state.hoveredRowIndex,
                    checkedRows: this.props.checkedRows,
                    gridWidth: width
                  })}
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

export default VGrid;
