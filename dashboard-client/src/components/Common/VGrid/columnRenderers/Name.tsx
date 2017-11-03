import * as React from 'react'
import { CellRendererParams } from 'react-virtualized';

const renderer = (props: CellRendererParams): any => {
  const {rowData, columnData} = props;
  const name = columnData && columnData.addDataKey && rowData[columnData.addDataKey]
    ? rowData[columnData.addDataKey].name
    : rowData.name;

  return (
    <span style={{color: columnData.theme.genericTextColors.textColor}}>
      {name}
    </span>
  )
};

const NameRenderer: React.SFC<CellRendererParams> = (props) => {
  return (
    renderer(props)
  )
};

export default NameRenderer;
