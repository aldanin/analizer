import * as React from 'react'
import {ColumnDataProps} from '../../../Common/GridGeneric/definitions'
import * as FormatHelpers from '../../../../helpers/Formatters'
import styled from 'styled-components'

const Wrap = styled.span`
  color: ${props => props.theme.genericTextColors.textColorPale};
`;

const DocTypeRenderer: React.SFC<ColumnDataProps> = (props) => {

  const path = props.rowData.info ? props.rowData.info.path : '';

  const jsx = FormatHelpers.addSearchMarker(props.withMarker, path);

  return (
    <Wrap theme = {props.theme}>
      {jsx}
    </Wrap>
  )
}

export default DocTypeRenderer
