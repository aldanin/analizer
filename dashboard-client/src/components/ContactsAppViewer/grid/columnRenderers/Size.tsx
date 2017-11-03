import * as React from 'react'
import {ColumnDataProps} from '../../../Common/GridGeneric/definitions'
import * as FormatHelpers from '../../../../helpers/Formatters'
import styled from 'styled-components'

const Wrap = styled.span`
  color: ${props => props.theme.genericTextColors.textColorPale};
`;

const SizeRenderer: React.SFC<ColumnDataProps> = (props) => {

  const size = props.rowData.info && props.rowData.info.size ? props.rowData.info.size : '';

  const jsx = FormatHelpers.addSearchMarker(props.withMarker, size);

  return (
    <Wrap theme = {props.theme}>
      {jsx}
    </Wrap>
  )
}

export default SizeRenderer
