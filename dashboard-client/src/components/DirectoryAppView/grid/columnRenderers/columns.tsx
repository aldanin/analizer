import * as React from 'react'
import * as VGrid from '../../../Common/VGrid'
import defaultHeaderRenderer from '../../../Common/VGrid/GeneralHeaderRenderer'
import RowCBRenderer from '../../../Common/VGrid/columnRenderers/RowCB'
import { ThemeProps } from '../../../Common/VGrid/Theme'
import * as ColumnStyles from '../../../Common/VGrid/ColumnStyles'
import { Column } from 'react-virtualized';
import PathRenderer from './Path'
import NameRenderer from '../../../Common/VGrid/columnRenderers/Name'
import DateRenderer from '../../../Common/VGrid/columnRenderers/Date'
import RowToolbarRenderer from '../../../Common/VGrid/columnRenderers/RowToolbar'
import StatusRenderer from './Status'
import TypeRenderer from './DocType'
import SizeRenderer from './Size'

const stylesFunc = (theme: ThemeProps) => {
  return {
    checkbox: {
      width: 20,
      padding: 2,
      color: theme.genericTextColors.textColorPale,
      cursor: 'pointer',
      textOverflow: 'inherit',
      marginRight: 0
    },
    padding: {
      padding: 2,
      color: theme.genericTextColors.textColorPale,
      cursor: 'pointer'
    },
    paddingWidth184: {
      width: 184,
      padding: 2,
      color: theme.genericTextColors.textColorPale,
      cursor: 'pointer'
    },
    paddingWidth30: {
      width: 30,
      padding: 2,
      color: theme.genericTextColors.textColorPale,
      cursor: 'pointer',
      textAlign: 'center',
      textOverflow: 'inherit',
      position: 'relative',
    },
    extensionColumn: {
      width: 30,
      padding: 2,
      color: theme.genericTextColors.textColorPale,
      cursor: 'pointer',
      textAlign: 'center',
      textOverflow: 'inherit',
      position: 'relative',
      bottom: '0.3rem'
    },
    isFavorite: {
      width: 30,
      padding: 2,
      color: theme.genericTextColors.textColorPale,
      cursor: 'pointer',
      overflow: 'visible'
    },
    app: {
      width: 30,
      padding: 2,
      color: theme.genericTextColors.textColorPale,
      cursor: 'pointer',
      textAlign: 'center'
    },
    status: {
      width: 30,
      padding: 2,
      color: theme.genericTextColors.textColorPale,
      cursor: 'pointer',
      textAlign: 'center',
      textOverflow: 'inherit',
      margin: 'auto',
    },
    paddingWidth120: {
      width: 120,
      padding: 2,
      color: theme.genericTextColors.textColorPale,
      cursor: 'pointer'
    },
    paddingWidth150: {
      width: 150,
      padding: 2,
      color: theme.genericTextColors.textColorPale,
      cursor: 'pointer'
    },
    pathColumn: {
      width: 200,
      padding: 2,
      color: theme.genericTextColors.textColorPale,
      cursor: 'pointer',
      direction: 'rtl',
      textAlign: 'left',
    },
  }
}

export const getColumns = ((props: VGrid.VGridProps, gridStatus: VGrid.VGridStatusProps) => {
  const theme = props.theme;
  const styles = stylesFunc(theme);
  const commonColumnStyles = ColumnStyles.stylesFunc(theme);

  return [
    (
      <Column
        dataKey={'cb'}
        key={'cb'}
        width={20}
        flexGrow={0}
        flexShrink={0}
        style={styles.checkbox}
        cellRenderer={RowCBRenderer}
        headerRenderer={defaultHeaderRenderer}
        columnData={{
            checkedRowHandler: props.handlers.checkedRowHandler,
            getProductId: props.handlers.getProductId,
            gridStatus: gridStatus,
            theme: props.theme,
          }}
      />
    ),
    (
      <Column
        dataKey={'extension'}
        key={'extension'}
        width={30}
        flexGrow={0}
        flexShrink={0}
        style={styles.extensionColumn}
        label="Type"
        cellRenderer={TypeRenderer}
        headerRenderer={defaultHeaderRenderer}
        columnData={{
            theme: props.theme
          }}
      />
    ),
    (
      <Column
        dataKey={'name'}
        key={'name'}
        width={185}
        flexGrow={0}
        flexShrink={1}
        style={commonColumnStyles.name}
        label="Name"
        cellRenderer={NameRenderer}
        headerRenderer={defaultHeaderRenderer}
        columnData={{
            theme: props.theme
          }}
      >
        Name
      </Column>
    ),
    (
      <Column
        dataKey={'path'}
        key={'path'}
        width={220}
        flexGrow={0}
        flexShrink={1}
        style={styles.pathColumn}
        label="Path"
        cellRenderer={PathRenderer}
        headerRenderer={defaultHeaderRenderer}
        columnData={{
            theme: props.theme
          }}
      >
        Details
      </Column>
    ),
    (
      <Column
        dataKey={'status'}
        key={'status'}
        width={50}
        minWidth={25}
        flexGrow={0}
        flexShrink={3}
        style={styles.paddingWidth30}
        label="Status"
        cellRenderer={StatusRenderer}
        headerRenderer={defaultHeaderRenderer}
        columnData={{
            theme: props.theme
          }}
      >
        Status
      </Column>
    ),
    (
      <Column
        dataKey={'latestUpdate'}
        key={'latestUpdate'}
        width={120}
        flexGrow={0}
        flexShrink={1}
        style={commonColumnStyles.date}
        label="Date"
        cellRenderer={DateRenderer}
        headerRenderer={defaultHeaderRenderer}
        columnData={{
            theme: props.theme
          }}
      />
    ),
    (
      <Column
        dataKey={'size'}
        key={'size'}
        width={60}
        flexGrow={0}
        flexShrink={3}
        style={styles.app}
        label="Size"
        cellRenderer={SizeRenderer}
        headerRenderer={defaultHeaderRenderer}
        columnData={{
            theme: props.theme
          }}
      >
        Size
      </Column>
    ),
    (
      <Column
        dataKey={'toolbar'}
        key={'toolbar'}
        width={150}
        style={commonColumnStyles.toolbar}
        cellRenderer={RowToolbarRenderer}
        headerRenderer={defaultHeaderRenderer}
        disableSort={true}
        columnData={{
            handlers: props.handlers,
            actionToolbarSwitches: props.actionToolbarSwitches,
            gridStatus: gridStatus,
            theme: props.theme
          }}
      />
    ),
  ]
});
