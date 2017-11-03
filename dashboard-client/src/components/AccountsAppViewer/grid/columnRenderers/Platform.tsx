import * as React from 'react'
import { CellRendererParams } from 'react-virtualized';
import LabledIcon from '../../Common/LabeledIcon/index'
import { AppSymbol } from '../../../../types/AppSymbols'
import { ThemeProps } from '../../Theme'

const getAppIcon = (platform: AppSymbol, theme: ThemeProps) => {
  return (
    platform
      ? (
        <LabledIcon
          caption={platform.caption}
          fontSize={14}
          iconSize={20}
          labelColor={theme.genericTextColors.textColorPale}
          iconName={platform.key}
        />
      )
      : <span/>
  )
};

const PlatformRenderer: React.SFC<CellRendererParams> = (props) => {

  const renderer = ({
    columnData,
    cellData,
  }: CellRendererParams): any => {
    return getAppIcon(cellData, columnData.theme);
  };

  return (
    renderer(props)
  )
};

export default PlatformRenderer;
