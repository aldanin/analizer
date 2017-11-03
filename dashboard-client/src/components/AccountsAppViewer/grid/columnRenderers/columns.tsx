import * as React from 'react'
import { AccountsVGridProps } from '../AccountsVGrid'
import { Column } from 'react-virtualized';
import DefaultRenderer from './Default'
import PlatformRenderer from './Platform'
import DateRenderer from './Date'
import ServiceRenderer from './Service'
import FavoriteRenderer from './Favorite'
import TagsRenderer from './Tags'
import RowMenuRenderer from './RowMenu'
import RowCBRenderer from './RowCB'
import PasswordRenderer from './Password'
import RemarksRenderer from './Remarks'
import defaultHeaderRenderer from '../GeneralHeaderRenderer'
import * as Theme from '../../Theme'

const stylesFunc = (theme: Theme.ThemeProps) => {
  return {
    padding: {
      padding: 2,
      color: theme.genericTextColors.textColorPale,
      cursor: 'pointer'
    },
    accountName: {
      width: 185,
      padding: 2,
      color: theme.genericTextColors.textColor,
      cursor: 'pointer',
      fontSize: '116%'
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
      cursor: 'pointer'
    },
    isFavorite: {
      width: 30,
      padding: 2,
      color: theme.genericTextColors.textColorPale,
      cursor: 'pointer',
      overflow: 'visible'
    },
    service: {
      width: 30,
      padding: 2,
      color: theme.genericTextColors.textColorPale,
      cursor: 'pointer',
    },
    status: {
      width: 30,
      padding: 2,
      color: theme.genericTextColors.textColorPale,
      cursor: 'pointer',
      textAlign: 'center'
    },
    paddingWidth120: {
      width: 120,
      padding: 2,
      color: theme.genericTextColors.textColorPale,
      cursor: 'pointer'
    },
    paddingWidth200: {
      width: 200,
      padding: 2,
      color: theme.genericTextColors.textColorPale,
      cursor: 'pointer'
    },
  }
}

export const getColumns = ((props: AccountsVGridProps) => {

  const theme = props.theme;
  const styles = stylesFunc(theme);
  return [
    (
      <Column
        dataKey={'cb'}
        key={'cb'}
        width={30}
        flexGrow={0}
        flexShrink={0}
        style={styles.paddingWidth30}
        cellRenderer={RowCBRenderer}
        headerRenderer={defaultHeaderRenderer}
        columnData={{
            selectedGridItem: props.selectedItem,
            theme: props.theme
          }}
      />
    ),
    (
      <Column
        dataKey={'service'}
        key={'service'}
        width={120}
        flexGrow={0}
        flexShrink={0}
        style={styles.service}
        label="Service"
        cellRenderer={ServiceRenderer}
        headerRenderer={defaultHeaderRenderer}
        columnData={{
            theme: props.theme
          }}
      >
        App
      </Column>
    ),
    (
      <Column
        dataKey={'accountName'}
        key={'accountName'}
        width={185}
        flexGrow={0}
        flexShrink={0}
        style={styles.accountName}
        label="Account Name"
        cellRenderer={DefaultRenderer}
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
        dataKey={'password'}
        key={'password'}
        width={160}
        flexGrow={0}
        flexShrink={0}
        style={styles.paddingWidth200}
        label="Password"
        cellRenderer={PasswordRenderer}
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
        dataKey={'platform'}
        key={'platform'}
        width={160}
        flexGrow={0}
        flexShrink={0}
        style={styles.paddingWidth30}
        label="Platform"
        cellRenderer={PlatformRenderer}
        headerRenderer={defaultHeaderRenderer}
        columnData={{
            theme: props.theme
          }}
      />
    ),
    (
      <Column
        dataKey={'lastUsed'}
        key={'lastUsed'}
        width={120}
        flexGrow={0}
        flexShrink={0}
        style={styles.paddingWidth120}
        label="Last Used"
        cellRenderer={DateRenderer}
        headerRenderer={defaultHeaderRenderer}
        columnData={{
            theme: props.theme
          }}
      />
    ),
    (
      <Column
        dataKey={'tags'}
        key={'tags'}
        width={90}
        flexGrow={0}
        flexShrink={0}
        style={styles.paddingWidth184}
        cellRenderer={TagsRenderer}
        headerRenderer={defaultHeaderRenderer}
        columnData={{
            removeTag: props.handlers.removeTag,
            theme: props.theme
          }}
      />
    ),
    (
      <Column
        dataKey={'remarks'}
        key={'remarks'}
        width={20}
        flexGrow={0}
        flexShrink={0}
        style={styles.paddingWidth30}
        cellRenderer={RemarksRenderer}
        headerRenderer={defaultHeaderRenderer}
        columnData={{
             theme: props.theme
          }}
      />
    ),
    (
      <Column
        dataKey={'isFavorite'}
        key={'isFavorite'}
        width={45}
        flexGrow={0}
        flexShrink={0}
        style={styles.isFavorite}
        cellRenderer={FavoriteRenderer}
        headerRenderer={defaultHeaderRenderer}
        columnData={{
            setFavorite: props.handlers.setFavorite,
            theme: props.theme
          }}
      />
    ),
    (
      <Column
        dataKey={'menu'}
        key={'menu'}
        width={30}
        style={styles.paddingWidth30}
        cellRenderer={RowMenuRenderer}
        headerRenderer={defaultHeaderRenderer}
        columnData={{
            addTag: props.handlers.addTag,
            theme: props.theme
          }}
      />
    ),
  ]
});
