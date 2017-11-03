import * as React from 'react'
import { CellRendererParams } from 'react-virtualized';

export interface DefaultProps {
}

const DefaultRenderer: React.SFC<CellRendererParams> = (props) => {
  const renderer = ({
    cellData,
    columnData,
    dataKey,
    rowData,
    rowIndex
  }: CellRendererParams): any => {
    return <span >{cellData || <span/>}</span>
  };

  return (
    renderer(props)
  )
};

export default DefaultRenderer
