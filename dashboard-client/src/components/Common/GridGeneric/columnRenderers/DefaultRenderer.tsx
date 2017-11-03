import * as React from 'react'
import { ColumnDataProps } from '../definitions'
import * as FormatHelpers from '../../../../helpers/Formatters'

const DefaultRenderer: React.SFC<ColumnDataProps> = (props) => {
  const field = props.field || 'name';
  const jsx = FormatHelpers.addSearchMarker(props.withMarker, props.rowData[field])

  return (
    <span title={props.rowData[field]}>{jsx}</span>
  )
}

export default DefaultRenderer
