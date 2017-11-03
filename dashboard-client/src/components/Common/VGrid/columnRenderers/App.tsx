import * as React from 'react'
import { CellRendererParams } from 'react-virtualized';
import AppIcon from '../../AppIcon'
import { AppSymbol } from '../../../../types/AppSymbols'
import * as Theme from '../Theme'

export interface DefaultProps {
}

const getAppIcon = (symbolName: AppSymbol, theme: Theme.ThemeProps) => {
  return <AppIcon appSymbol={symbolName} theme={theme.appSymbols}/>;
};

const AppRenderer: React.SFC<CellRendererParams> = (props) => {
  const {
    columnData,
    cellData,
    rowData,
  } = props;
  const symbolName = columnData.fieldName ? rowData[columnData.fieldName] : cellData;

  return getAppIcon(symbolName, columnData.theme);
};

export default AppRenderer;
