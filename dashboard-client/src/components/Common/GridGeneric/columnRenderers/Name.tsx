import * as React from 'react'
import { ColumnDataProps } from '../definitions'
import * as FormatHelpers from '../../../../helpers/Formatters'
import styled from 'styled-components'

interface StyleProps {
  fontSize: string,
}

const Wrap = styled.span`
  color: ${props => props.theme.genericTextColors.textColor};
  font-size: ${(props: StyleProps) => props.fontSize};
`;

const NameRenderer: React.SFC<ColumnDataProps> = (props) => {
  const name = props.field ? props.rowData[props.field] : props.rowData.name;

  const jsx = FormatHelpers.addSearchMarker(props.withMarker, name)
  const fontSize = props.style && props.style.fontSize ? props.style.fontSize : '1.4rem';

  return (
    <Wrap theme={props.theme} fontSize={fontSize} title={name}>
      {jsx}
    </Wrap>
  )
}

export default NameRenderer
