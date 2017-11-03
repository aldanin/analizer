import * as React from 'react'
import { CellRendererParams } from 'react-virtualized';
import ClickableIcon from '../../Common/ClickableIcon/index'
import { APP_SYMBOLS } from '../../../../types/AppSymbols'
import { ThemeProps } from '../../Theme'

export interface DefaultProps {
}

const getAppIcon = (remarks: string, theme: ThemeProps) => {
  const colors = Object.assign({}, theme.appSymbolColors , theme.genericTextColors);

  return (
    remarks
      ? (
        <ClickableIcon
          appSymbol={APP_SYMBOLS.notebook}

          theme={{colors: colors }}
          onClick={() => {alert('clicked')}}  // TODO
        />
      )
      : <span/>
  )
};

const RemarksRenderer: React.SFC<CellRendererParams> = (props) => {

  const {columnData} = props;
  const theme = columnData.theme;

  const renderer = ({
    cellData,
    dataKey,
    rowData,
    rowIndex
  }: CellRendererParams): any => {
    return getAppIcon(cellData, theme);
  };

  return (
    renderer(props)
  )
};

export default RemarksRenderer;
