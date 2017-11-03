import * as React from 'react'
import * as Helpers from '../../../../helpers/Formatters'
import { ColumnDataProps } from '../definitions'
import { DateFormats } from '../../../../helpers/enums'

const DateRenderer: React.SFC<ColumnDataProps> = (props) => {
  let dateFormat = props.options && props.options.dateFormat
    ? props.options.dateFormat
    : DateFormats.dateAndTime;

  const jsx = Helpers.addSearchMarker(props.withMarker, Helpers.msToDateString(props.rowData[props.field], dateFormat))

  return (
    <div>
      {jsx}
    </div>
  )
}

export default DateRenderer

DateRenderer.defaultProps = {field: 'date', withMarker: true};
