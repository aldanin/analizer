import * as React from 'react'
import GridGeneric from '../../Common/GridGeneric'
import { ColumnProps } from '../../Common/GridGeneric/definitions'
import DateRenderer from '../../Common/GridGeneric/columnRenderers/Date'
import NameRenderer from './columnRenderers/Name'
import AppRenderer from '../../Common/GridGeneric/columnRenderers/App'
import UnreadMessagesCountRenderer from './columnRenderers/UnreadMessagesCount'
import * as Theme from '../Theme'
import * as IM from '../../../types/InstantMessaging'
import { withTheme } from 'styled-components';
import { DateFormats } from '../../../helpers/enums'
import { DEFAULT_INNER_PROPS_EXTENSION, DataFetcherPropsExtension } from '../../../containers/DataFetcherGeneric'

type ExtendedProps = TopicsGridProps & DataFetcherPropsExtension;

export interface TopicsGridProps extends DataFetcherPropsExtension {
  rowData: IM.Topic[];
  selectedRow?: IM.Topic;
  scrollToSelectedRow: boolean,
  onRowClick: (item: IM.Topic, index: number) => void;
  theme?: Theme.ThemeProps;
}

const getColumns = (props: ExtendedProps) => {
  const theme = props.theme.grid;

  const columns: ColumnProps[] = [
    {
      title: 'Name',
      field: 'name',
      renderer: NameRenderer,
      width: 135,
      cellColor: theme.genericTextColors.textColor,
      cellFontSize: '1.2rem',
    },
    {
      title: '',
      field: 'unreadMessageCount',
      renderer: UnreadMessagesCountRenderer,
      width: 30,
      cellColor: theme.genericTextColors.textColorPale,
      cellFontSize: '1.2rem',
      flexShrink: 0,
    },
    {
      title: 'App',
      field: 'appSymbol',
      renderer: AppRenderer,
      width: 30,
      minWidth: 30,
      cellColor: theme.genericTextColors.textColorPale,
      cellFontSize: '1.2rem',
      flexShrink: 0,
    },
    {
      title: '',
      field: 'lastMessage',
      renderer: DateRenderer,
      width: 100,
      cellColor: theme.genericTextColors.textColorPale,
      cellFontSize: '1.2rem',
      flexShrink: 0,
      options: {
        dateFormat: DateFormats.timeWhenToday
      }
    },
  ];

  return columns;
}

const TopicsGrid: React.SFC<ExtendedProps> = (props: ExtendedProps) => {
  return (
    <GridGeneric
      gridData={props.rowData}
      columns={getColumns(props)}
      currentRow={props.selectedRow}
      scrollToSelectedRow={props.scrollToSelectedRow}

      onRowClick={(rowData: any, index: number) => props.onRowClick(rowData as IM.Topic, index)}
      withHeader={false}
      withCheckbox={false}
      infiniteScrolling={{
        loadMoreData: props.loadMoreData,
        onAutoRequestStateChange: props.onAutoRequestStateChange,
      }}
      theme={props.theme.grid}
      additionalTheme={props.theme.additionalTheme}
    />
  )
}

export default withTheme(TopicsGrid)

TopicsGrid.defaultProps = Object.assign(
  {
    groupBy: null,
    theme: Theme.DEFAULT_THEME,
  },
  DEFAULT_INNER_PROPS_EXTENSION
)
