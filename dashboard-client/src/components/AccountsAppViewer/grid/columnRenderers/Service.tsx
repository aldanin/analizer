import * as React from 'react'
import { CellRendererParams } from 'react-virtualized'
import LabledIcon from '../../Common/LabeledIcon/index'
import { AppSymbol } from '../../../../types/AppSymbols'
import { ThemeProps } from '../../Theme'

const getAppIcon = (service: AppSymbol, theme: ThemeProps) => {
  return (
    service
      ? (
        <LabledIcon
          caption={service.caption}
          fontSize={14}
          iconSize={20}
          labelColor={theme.genericTextColors.textColorPale}
          iconName={service.key}
        />
      )
      : <span/>
  )
};

const ServiceRenderer: React.SFC<CellRendererParams> = (props) => {
  const renderer = ({
    columnData,
    cellData,
    dataKey,
    rowData,
    rowIndex
  }: CellRendererParams): any => {
    return getAppIcon(cellData, columnData.theme);
  };

  return (
    renderer(props)
  )
};

export default ServiceRenderer;
