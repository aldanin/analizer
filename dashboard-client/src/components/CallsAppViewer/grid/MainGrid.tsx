import * as React from 'react'
import GridGeneric from '../../Common/GridGeneric'
import { ColumnProps, GroupByProps } from '../../Common/GridGeneric/definitions'
import DateRenderer from '../../Common/GridGeneric/columnRenderers/Date'
import AppRenderer from '../../Common/GridGeneric/columnRenderers/App'
import FromToRenderer from './columnRenderers/FromTo'
import SourceRenderer from './columnRenderers/Source'
import CallTypeRenderer from './columnRenderers/CallType'
import DurationRenderer from './columnRenderers/Duration'
import * as Prod from '../../../types/Product'
import * as Tags from '../../../types/Tag'
import * as Theme from '../Theme'
import * as Calls from '../../../types/Calls'
import { withTheme } from 'styled-components';

export interface MainGridProps {
  rowData: Calls.CallData[];
  selectedRow?: Calls.CallData;
  groupBy?: GroupByProps;
  onHeaderClick: (field: string, state: boolean) => void;
  onRowClick: (item: Calls.CallData, index: number) => void;
  onRowCheck: (id: Prod.ProductID, state: boolean) => void;
  setStar: (id: Prod.ProductID, isFavorite: boolean) => void;
  removeTag: (id: Prod.ProductID, tag: Tags.TagId) => void;
  openNotebook: () => void
  getTranslate: (itemIds: Prod.ProductID[]) => void
  addTag: (ids: Prod.ProductID[], tags: Tags.TagData[]) => void;
  addToNotebook: (ids: Prod.ProductID[]) => void;
  markAsRead: (ids: Prod.ProductID[]) => void;
  markAsUnRead: (ids: Prod.ProductID[]) => void;
  askForTranslate: (ids: Prod.ProductID[]) => void;
  askForTranscript: (ids: Prod.ProductID[]) => void;
  exportItem: (ids: Prod.ProductID[]) => void;
  loadMoreData: () => void
  theme?: Theme.ThemeProps;
}

const getColumns = (props: MainGridProps) => {
  const theme = props.theme.grid;

  const columns: ColumnProps[] = [{
    title: 'App',
    field: 'appSymbol',
    renderer: AppRenderer,
    width: 35,
    cellColor: theme.genericTextColors.textColorPale,
    cellFontSize: '1.2rem',
    flexShrink: 0,
    withMarker: false
  }, {
    title: 'From/To',
    field: 'fromTo',
    renderer: FromToRenderer,
    width: 160,
    minWidth: 35,
    cellColor: theme.genericTextColors.textColor,
    cellFontSize: '1.2rem',
    flexShrink: 1,
    flexGrow: 1,
  }, {
    title: 'Type',
    field: 'type',
    renderer: CallTypeRenderer,
    width: 40,
    minWidth: 25,
    cellColor: theme.genericTextColors.textColorPale,
    cellFontSize: '1.2rem',
    flexShrink: 5,
  }, {
    title: 'Source',
    field: 'source',
    renderer: SourceRenderer,
    width: 60,
    minWidth: 35,
    cellColor: theme.genericTextColors.textColorPale,
    cellFontSize: '1.2rem',
    flexShrink: 5,
    flexGrow: 1,
  }, {
    title: 'Duration',
    field: 'duration',
    renderer: DurationRenderer,
    width: 70,
    cellColor: theme.genericTextColors.textColorPale,
    cellFontSize: '1.2rem',
    flexShrink: 1,
  }, {
    title: 'Date',
    field: 'date',
    renderer: DateRenderer,
    width: 120,
    minWidth: 60,
    cellColor: theme.genericTextColors.textColorPale,
    cellFontSize: '1.2rem',
    flexShrink: 1,
    flexGrow: 1,
  }
  ];

  return columns;
}

const FilesGrid: React.SFC<MainGridProps> = (props: MainGridProps) => {
// const groupBy =props.groupBy?props.groupBy.field:null;

  return (
    <GridGeneric
      gridData={props.rowData}
      columns={getColumns(props)}
      groupBy={props.groupBy}
      currentRow={props.selectedRow}
      onHeaderClick={props.onHeaderClick}
      onRowClick={(rowData: any, index: number) => props.onRowClick(rowData as Calls.CallData, index)}
      onRowCheck={props.onRowCheck}
      withCheckbox={true}
      actions={{
        setStar: props.setStar,
        removeTag : props.removeTag,
        addTag: (id, tags) => props.addTag([id], tags),
        addToNotebook : (id) => props.addToNotebook([id]),
        markAsRead: (id) => props.markAsRead([id]),
        markAsUnRead: (id) => props.markAsUnRead([id]),
        askForTranslate: (id) => props.askForTranslate([id]),
        askForTranscript: (id) => props.askForTranscript([id]),
        exportItem: (id) => props.exportItem([id]),
        openNotebook: props.openNotebook,
        getTranslate: (id: Prod.ProductID) => props.getTranslate([id]),
        getTranscript: (id: Prod.ProductID) => props.getTranslate([id]),
      }}
      infiniteScrolling={{
        loadMoreData: (isPreviousPage: boolean) => {props.loadMoreData()}
      }}
      theme={props.theme.grid}
    />
  )
}

export default withTheme(FilesGrid)

FilesGrid.defaultProps = {
  groupBy: null,
  theme: Theme.DEFAULT_THEME
}
