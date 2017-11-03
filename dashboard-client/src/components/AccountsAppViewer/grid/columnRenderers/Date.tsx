import * as React from 'react'
import { CellRendererParams } from 'react-virtualized';
import * as Helpers from '../../Helpers_Formatters'

const getDate = (dateDetails) => {
  return Helpers.msToDateString(dateDetails)
};

const DateRenderer: React.SFC<CellRendererParams> = (props) => {
  const renderer = ({
    cellData,
    columnData,
    dataKey,
    rowData,
    rowIndex,
  }: CellRendererParams): any => {
    return <span >{getDate(cellData)}</span>;
  };

  return (
    renderer(props)
  )
};

export default DateRenderer;
