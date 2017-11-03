import * as React from 'react'
import * as Dir from '../../../../types/Directory'
import { ColumnDataProps } from '../../../Common/GridGeneric/definitions'
import FileExtensionIcon from '../../../Common/FileExtensionIcon'
import * as Theme from '../../../Common/GridGeneric/Theme'

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

const DocTypeRenderer: React.SFC<ColumnDataProps> = (props) => {

  return getIcon(props.rowData, props.theme);
}

export default DocTypeRenderer
