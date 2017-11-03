import * as React from 'react'
import GridGeneric from '../../Common/GridGeneric'
import { ColumnProps, GroupByProps } from '../../Common/GridGeneric/definitions'
import DateRenderer from '../../Common/GridGeneric/columnRenderers/Date'
import AppRenderer from '../../Common/GridGeneric/columnRenderers/App'
import DefaultRenderer from '../../Common/GridGeneric/columnRenderers/DefaultRenderer'
import NameRenderer1 from '../../Common/GridGeneric/columnRenderers/Name'
import AvatarRenderer from './columnRenderers/Avatar'
import StatusRenderer from './columnRenderers/Status'
import * as Prod from '../../../types/Product'
import * as Tags from '../../../types/Tag'
import * as Theme from '../Theme'
import * as ContactsCommon from 'common-interfaces/types/Contacts'
import { withTheme } from 'styled-components';
import { DEFAULT_INNER_PROPS_EXTENSION, DataFetcherPropsExtension } from '../../../containers/DataFetcherGeneric'

type ExtendedProps = MainGridProps & DataFetcherPropsExtension;

export interface MainGridProps extends DataFetcherPropsExtension {
  rowData: ContactsCommon.Contact[];
  selectedItems: Prod.ProductID[];
  currentItem?: ContactsCommon.Contact;
  groupBy?: GroupByProps;
  onHeaderClick: (field: string, state: boolean) => void;
  onRowClick: (item: ContactsCommon.Contact, index: number) => void;
  onRowCheck: (id: Prod.ProductID, state: boolean) => void;
  setStar: (id: Prod.ProductID, isFavorite: boolean) => void;
  removeTag: (id: Prod.ProductID, tag: Tags.TagId) => void;
  addTag: (ids: Prod.ProductID, tags: Tags.TagData[]) => void;
  addToNotebook: (ids: Prod.ProductID) => void;
  markAsRead: (ids: Prod.ProductID) => void;
  markAsUnRead: (ids: Prod.ProductID) => void;
  askForTranslate: (ids: Prod.ProductID) => void;
  askForTranscript: (ids: Prod.ProductID) => void;
  getTranslate: (itemIds: Prod.ProductID) => void;
  getTranscript: (itemIds: Prod.ProductID) => void
  openNotebook: () => void
  exportItem: (ids: Prod.ProductID) => void;
  theme?: Theme.ThemeProps;
}

const getColumns = (props: ExtendedProps) => {
  const theme = props.theme.grid;

  const columns: ColumnProps[] = [{
    title: '',
    field: 'photoUrl',
    renderer: AvatarRenderer,
    width: 30,
    cellColor: theme.genericTextColors.textColorPale,
    cellFontSize: '1.2rem',
    flexShrink: 0,
    headerClickable: false,
    additionalStyle: {
      overFlow: 'initial',
      textOverflow: 'initial',
      whiteSpace: 'normal'
    },
  }, {
    title: 'Name',
    field: 'name',
    renderer: NameRenderer1,
    width: 140,
    minWidth: 120,
    cellColor: theme.genericTextColors.textColor,
    cellFontSize: '1.2rem',
    flexShrink: 2,
  }, {
    title: 'App',
    field: 'app',
    renderer: AppRenderer,
    width: 30,
    cellColor: theme.genericTextColors.textColorPale,
    cellFontSize: '1.2rem',
    flexShrink: 0,
  }, {
    title: 'Identifier',
    field: 'identifier',
    renderer: DefaultRenderer,
    width: 200,
    minWidth: 40,
    cellColor: theme.genericTextColors.textColorPale,
    cellFontSize: '1.2rem',
    flexShrink: 2,
  }, {
    title: 'Extraction Time',
    field: 'lastChat',
    renderer: DateRenderer,
    width: 120,
    // minWidth: 120,
    cellColor: theme.genericTextColors.textColorPale,
    cellFontSize: '1.2rem',
    flexShrink: 1,
  }, {
    title: 'State',   // Temp. Name should be decided:
    field: 'status', // Temp. Name should be changed, as 'status' should equal server-side 'status'
    renderer: StatusRenderer,
    width: 50,
    // minWidth: 30,
    cellColor: theme.genericTextColors.textColorPale,
    cellFontSize: '1.2rem',
    flexShrink: 0,
  }, {
    title: 'Date',
    field: 'date',
    renderer: DateRenderer,
    width: 120,
    // minWidth: 120,
    cellColor: theme.genericTextColors.textColorPale,
    cellFontSize: '1.2rem',
    flexShrink: 1,
  },
  ];

  return columns;
}

const MainGrid: React.SFC<ExtendedProps> = (props: ExtendedProps) => {
  return (
    <GridGeneric
      gridData={props.rowData}
      columns={getColumns(props)}
      groupBy={props.groupBy}
      currentRow={props.currentItem}
      onHeaderClick={props.onHeaderClick}
      onRowClick={(rowData: any, index: number) => props.onRowClick(rowData as ContactsCommon.Contact, index)}
      onRowCheck={props.onRowCheck}
      withCheckbox={true}
      checkedRows={props.selectedItems}
      actions={{
        setStar: props.setStar,
        removeTag: props.removeTag,
        addTag: props.addTag,
        addToNotebook: props.addToNotebook,
        markAsRead: props.markAsRead,
        markAsUnRead: props.markAsUnRead,
        askForTranslate: props.askForTranslate,
        askForTranscript: props.askForTranscript,
        exportItem: props.exportItem,
        getTranslate: props.getTranslate,
        getTranscript: props.getTranscript,
        openNotebook: props.openNotebook,
      }}
      infiniteScrolling={{
        loadMoreData: props.loadMoreData,
        onAutoRequestStateChange: props.onAutoRequestStateChange,
      }}
      theme={props.theme.grid}
      additionalTheme={{
        defaultAvatar: props.theme.defaultAvatar
      }}
    />
  )
}

export default withTheme(MainGrid)

MainGrid.defaultProps = Object.assign(
  {
    groupBy: null,
    theme: Theme.DEFAULT_THEME,
  },
  DEFAULT_INNER_PROPS_EXTENSION)
