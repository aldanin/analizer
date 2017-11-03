import * as React from 'react'
import styled from 'styled-components'
import GridRow from './GridRow';
import GroupingRow from './GroupingRow'
import { TagData, TagId } from '../../../types/Tag'
import HeaderCell from './HeaderCell'
import * as Theme from './Theme'
import * as Prod from '../../../types/Product'
import * as Defs from './definitions'
import * as _ from 'lodash'
import SmartScroller from '../SmartScroller'
import { ReactInstance } from 'react';

interface StyleProps {
  withHeader: boolean;
}

const ListContent = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: ${(props: StyleProps) => props.withHeader ? 'calc(100% - 32px);' : '100%'};
  flex-direction: column;
//  overflow-y: auto;
`;

const HeaderRowWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  position: relative;
  height: 30px;
  line-height: 30px;
  font-size: 1.2rem;
  border-bottom: 1px solid ${(props) => props.theme.genericTextColors.borderColor};
  margin: 0;
  padding: 0;
`;

const GridWrap = styled.div`
  height: 100%;
  width: 100%;
  // padding: 1em 0 0 0;
  box-sizing: border-box;
  font-size: 1.2rem;
`;

export interface GridGenericProps extends React.Props<GridGeneric> {
  idField?: string;
  gridData: any[];
  columns: Defs.ColumnProps[];
  groupBy?: Defs.GroupByProps;
  scrollToSelectedRow?: boolean;
  currentRow?: any;
  withHeader?: boolean;
  onHeaderClick?: (field: string, isUp: boolean) => void;
  onRowClick: (rowData: any, index: number) => void;
  withCheckbox?: boolean;
  onRowCheck?: (id: Prod.ProductID, state: boolean) => void;
  checkedRows?: Prod.ProductID[];
  actionsFieldNameMapping?: Defs.FieldNamesMapping,
  actions?: {
    setStar: (id: Prod.ProductID, isFavorite: boolean) => void;
    removeTag: (id: Prod.ProductID, tag: TagId) => void;
    addTag: (id: Prod.ProductID, tags: TagData[]) => void;
    addToNotebook: (ids: Prod.ProductID) => void;
    markAsRead: (ids: Prod.ProductID) => void;
    markAsUnRead: (ids: Prod.ProductID) => void;
    askForTranslate: (ids: Prod.ProductID) => void;
    askForTranscript: (ids: Prod.ProductID) => void;
    openNotebook: () => void
    getTranslate: (id: Prod.ProductID) => void;
    getTranscript: (id: Prod.ProductID) => void
    exportItem: (ids: Prod.ProductID) => void;
  }
  infiniteScrolling?: {
    loadMoreData: (isPreviousPage: boolean) => void,
    onAutoRequestStateChange?: (isDisabled: boolean) => void;
    withTop?: boolean, // Infinite scrolling also upwards
    fetchedFirstPage?: boolean, // used only when withTop is true
  }
  theme?: Theme.ThemeProps;
  additionalTheme?: any;
}

export interface GridGenericState {
  currentRow: {
    rowData: any,
    index: number,
  }
  selectedHeaderField: string,
  scrollToRow: ReactInstance,
  dataGroups: GroupingObj[]
}

interface GroupingObj {
  name: string,
  data: any[],
  isExpanded: boolean,
}

class GridGeneric extends React.Component<GridGenericProps, GridGenericState> {
  static defaultProps: Partial<GridGenericProps> = {
    idField: 'id',
    currentRow: null,
    infiniteScrolling: null,
    groupBy: null,
    actionsFieldNameMapping: Defs.DEFAULT_FIELDNAME_MAPPING,
    actions: null,
    withCheckbox: true,
    withHeader: true,
    theme: Theme.DEFAULT_THEME,
    additionalTheme: {},
    onRowCheck: () => null,
    onHeaderClick: () => null,
    checkedRows: [],
  }

  constructor(props: GridGenericProps) {
    super(props);

    this.state = {
      currentRow: null,
      selectedHeaderField: null,
      dataGroups: null,
      scrollToRow: null,
    }
  }

  onRowClick = (rowData: any, index: number) => {
    if (!this.isCurrentRow(rowData)) {
      this.props.onRowClick(rowData, index);
      this.setState({
        currentRow: {
          rowData: rowData,
          index: index
        }
      })
    }
  }

  onHeaderClick = (field: string, isUp: boolean) => {
    this.props.onHeaderClick(field, isUp);
    this.setState({
      selectedHeaderField: field
    })
  }

  getHeader = () => {
    const header = this.props.withHeader
      ? (
        <HeaderRowWrap
          theme={this.props.theme}
        >
          {this.getHeaderCells()}
        </HeaderRowWrap>
      )
      : null;

    return header;
  }

  getHeaderCells = () => {
    const headerDefs: Defs.ColumnHeaderProps[] = this.getColumnHeadersData();
    const headerCells = headerDefs.map((column: Defs.ColumnHeaderProps, index: number) => {

      const clickable = column.isClickable !== undefined ? column.isClickable : true;

      return (
        <HeaderCell
          key={index}
          field={column.field}
          title={column.title}
          isClickable={clickable}
          isSelected={this.state.selectedHeaderField === column.field}
          onClick={this.onHeaderClick}
          fontSize={'1.2rem'}
          width={column.width}
          minWidth={column.minWidth}
          maxWidth={column.maxWidth}
          color={column.fontColor || this.props.theme.genericTextColors.textColorLink}
          flexShrink={column.flexShrink}
          flexGrow={column.flexGrow}
        />
      )
    });

    headerCells.unshift(
      <HeaderCell
        key={headerDefs.length}
        field={'checkbox'}
        title={''}
        isSelected={false}
        isClickable={false}
        width={45}
        style={{marginRight: '0px'}}
        color={''}
      />)
    return headerCells;
  }

  getColumnHeadersData = () => {
    const headers = this.props.columns.map((column: Defs.ColumnProps) => {
      const header: Defs.ColumnHeaderProps = {
        title: column.title,
        field: column.field,
        isClickable: column.headerClickable,
        fontColor: column.headerCellColor,
        width: column.width,
        minWidth: column.minWidth,
        maxWidth: column.maxWidth,
        flexShrink: column.flexShrink,
        flexGrow: column.flexGrow,
      }
      return header;
    })

    return headers;
  }

  getGridRows = () => {
    let rows = [];
    if (this.props.groupBy) {
      //
      // adjust grouped rows' index and key by this parameter:
      //
      let indexRefParam = 0;
      if (!this.state.dataGroups) {
        return null;
      }

      this.state.dataGroups.map((group, idx) => {
        let groupedRows = [];
        if (group.isExpanded) {
          groupedRows = group.data.map(item => this.createDataRow(item, indexRefParam + idx + 1))
        }

        groupedRows.unshift((
          <GroupingRow
            key={'group' + idx}
            name={group.name}
            groupBy={this.props.groupBy}
            isExpanded={group.isExpanded}
            onClick={(name: string, isExpanded: boolean) => {
              const clone = _.cloneDeep(this.state.dataGroups);
              const foundGroup = clone.find(gr => gr.name === name)
              foundGroup.isExpanded = !foundGroup.isExpanded;
              this.setState({
                dataGroups: clone
              })
            }}
          />
        ))

        indexRefParam += groupedRows.length;

        rows = rows.concat(groupedRows);
      })
    } else {
      rows = this.props.gridData.map((item, idx) => (
        this.createDataRow(item, idx))
      )
    }
    return rows;
  }

  createDataRow = (item, idx) => {
    const actions = this.props.actions;
    const isCurrent = this.isCurrentRow(item);
    const scrollToSelectedRowRef = isCurrent ? 'scrollToRow' : '';

    return (
      <GridRow
        ref={scrollToSelectedRowRef}
        key={item[this.props.idField].toString() + idx.toString()}
        index={idx}
        id={item[this.props.idField]}
        rowData={item}
        isCurrent={isCurrent}
        isChecked={this.isCheckedRow(item)}
        columns={this.props.columns}
        onRowClick={this.onRowClick}
        onRowCheck={this.props.onRowCheck}
        withCheckbox={this.props.withCheckbox}
        actionsFieldNameMapping={this.props.actionsFieldNameMapping}
        actions={actions}
        theme={this.props.theme}
        additionalTheme={this.props.additionalTheme}
      />
    )
  }

  ensureSelectedItemVisible = () => {
    if (this.refs.scrollToRow) {
      // var domNode = ReactDom.findDOMNode(itemComponent);
      this.setState({
        scrollToRow: this.refs.scrollToRow
      })
    }
  }

  isCurrentRow = (rowData: any) => {
    return this.props.currentRow && this.props.currentRow[this.props.idField] === rowData[this.props.idField];
  }

  isCheckedRow = (rowData: any) => {
    const isChecked =
      !this.props.checkedRows || !!this.props.checkedRows.find(id => id === rowData[this.props.idField])
    return isChecked;
  }

  componentWillReceiveProps(nextProps: GridGenericProps, nextState: GridGenericState) {
    if (!this.props.currentRow && nextProps.currentRow ||
      nextProps.currentRow &&
      nextProps.currentRow[this.props.idField] !== this.props.currentRow[this.props.idField]) {
      this.setState({
        currentRow: {
          rowData: nextProps.currentRow,
          index: null
        }
      })
    }

    if (nextProps.groupBy) {
      const dataChanged = JSON.stringify(this.props.gridData) !== JSON.stringify(nextProps.gridData)
      const isFromFlatToGrouped = nextProps.groupBy && !this.props.groupBy;

      if (!this.state.dataGroups || dataChanged || isFromFlatToGrouped) {
        this.setState({
          dataGroups: this.prepareGroups(nextProps, this.state.dataGroups)
        })
      }
    }
  }

  prepareGroups = (props: GridGenericProps, prevGroups?: GroupingObj[]) => {
    const data = props.gridData;

    const groups: GroupingObj[] = [];
    //
    // Walk through the data and try to send it to its corresponding group:
    //
    data.forEach(rowData => {
      const groupName = rowData[props.groupBy.field];
      const isSelectedRow =
        this.props.currentRow && rowData[this.props.idField] === this.props.currentRow[this.props.idField];

      let group = groups.find(gr => gr.name === groupName)
      if (!group) {
        //
        // The requested group was not created yet. Let's look for it in the previous groups, if supplied:
        //
        if (prevGroups) {
          group = prevGroups.find(gr => gr.name === groupName);
        }
        if (group) {
          group = {
            name: groupName,
            data: [rowData],
            isExpanded: group.isExpanded,
          }
        } else {
          //
          // The group is finally not present. Let's create it:
          //
          group = {
            name: groupName,
            data: [rowData],
            isExpanded: false,
          }
        }
        //
        // Finally add the group to the list:
        //
        groups.push(group);
      } else {
        group.data.push(rowData);
      }
      if (isSelectedRow) {
        group.isExpanded = true;
      }
    })
    return groups;
  }

  componentDidUpdate(prevProps: GridGenericProps, prevState: GridGenericState) {
    //
    // If the grid's mode was changed we still need it to show the current row in the new mode:
    //
    if (this.props.scrollToSelectedRow ||
      JSON.stringify(prevProps.groupBy) !== JSON.stringify(this.props.groupBy)) {
      this.ensureSelectedItemVisible();
    }
  }

  componentDidMount() {
    if (this.props.groupBy) {
      if (!this.state.dataGroups) {
        this.setState({
          dataGroups: this.prepareGroups(this.props)
        })
      }
    }

    this.ensureSelectedItemVisible();
  }

  render() {
    return (
      <GridWrap>
        {this.getHeader()}
        <ListContent
          withHeader={this.props.withHeader}
        >
          <SmartScroller
            onTopReach={() => this.props.infiniteScrolling.loadMoreData(true)}
            onBottomReach={() => this.props.infiniteScrolling.loadMoreData(false)}
            scrollToComponent={this.state.scrollToRow}
            onScrollerStateChange={this.props.infiniteScrolling.onAutoRequestStateChange}
          >
            {this.getGridRows()}
          </SmartScroller>
        </ListContent>
      </GridWrap>)
  }
}

export default GridGeneric
