import * as React from 'react'
import { CellRendererParams } from 'react-virtualized';
import * as Helpers from '../../../../helpers/Formatters'
import SearchMarker from '../../SearchMarker/index';

const getDate = (dateDetails) => {
  return Helpers.msToDateString(dateDetails)
};

const DateRenderer: React.SFC<CellRendererParams> = (props) => {

  return (<span ><SearchMarker>{getDate(props.cellData) || ''}</SearchMarker></span>)
};

export default DateRenderer;
