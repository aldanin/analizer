import * as React from 'react'
import { CellRendererParams } from 'react-virtualized';
import FileExtensionIcon from '../../../Common/FileExtensionIcon'
import * as Dir from '../../../../types/Directory'
import * as Theme from '../../Theme'

const getIcon = (rowData: Dir.FileItem, theme: Theme.ThemeProps) => {
  return rowData.info
    ? (
      <FileExtensionIcon
        extension={rowData.info.extension}
        theme={{appSymbols: theme.appSymbols}}
      />
    )
    : <span/>;
}

const AppRenderer: React.SFC<CellRendererParams> = (props) => {
  const {rowData, columnData} = props;
  const icon = getIcon(rowData, columnData.theme);

  return (
    icon
  )
};

export default AppRenderer;
