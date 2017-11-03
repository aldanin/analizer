import * as React from 'react'
import { CellRendererParams } from 'react-virtualized';

const PathRenderer: React.SFC<CellRendererParams> = (props) => {
  const {rowData, columnData} = props;

  const path = rowData.info ? rowData.info.path : '';

  return (
    <span style={{color: columnData.theme.genericTextColors.textColorPale}}>
      {path}
    </span>
  )
};

export default PathRenderer;
