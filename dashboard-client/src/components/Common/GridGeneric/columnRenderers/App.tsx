import * as React from 'react'
import { ColumnDataProps } from '../definitions'
import AppIcon from '../../AppIcon'
import * as AppSymbols from '../../../../types/AppSymbols'
import * as Theme from '../Theme'

const getAppIcon = (appSymbol: AppSymbols.AppSymbol, theme: Theme.ThemeProps) => {
  return <AppIcon appSymbol={appSymbol} theme={theme.appSymbols}/>;
};

const AppRenderer: React.SFC<ColumnDataProps> = (props) => {
  const appName = props.rowData[props.field]
    ? (props.rowData[props.field].key
      ? props.rowData[props.field].key
      : props.rowData[props.field])
    : 'phone';
  return getAppIcon(AppSymbols.APP_SYMBOLS[appName], props.theme);
}

export default AppRenderer
