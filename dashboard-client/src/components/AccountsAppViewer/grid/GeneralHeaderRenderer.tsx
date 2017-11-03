import * as React from 'react'
import { SortDirection } from 'react-virtualized'
import FontIcon from 'material-ui/FontIcon';
import { HeaderRendererParams } from 'react-virtualized';
import * as Theme from '../Theme'
import { GridTheme } from '../../../theme/ScTheme'

export interface DefaultProps {
  theme: Theme.ThemeProps
}

export default function defaultHeaderRenderer({
  columnData,
  dataKey,
  disableSort,
  label,
  sortBy,
  sortDirection
}: HeaderRendererParams) {
  const theme = columnData.theme || Theme.defaultTheme;
  const showSortIndicator = sortBy === dataKey;
  const color =  theme.grid.headerColor;
  const children = [
    (
      <span
        className="ReactVirtualized__Table__headerTruncatedText"
        key="label"
        title={label}
        style={{float: 'left'}}
      >
        {label}
      </span>
    )
  ];

  const icon = sortDirection === SortDirection.ASC ? 'icon_tri_up ' : 'icon_tri_down';
  if (showSortIndicator) {
    children.push(
      (
        <span>
          <FontIcon
            className={`base_icons ${icon}`}
            style={{color: color, fontSize: GridTheme.sortIconSize, marginLeft: GridTheme.sortIconMargin}}
          />
        </span>
      )
    )
  }
  return children
}
