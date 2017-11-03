import * as React from 'react'
import { ColumnDataProps } from '../../../Common/GridGeneric/definitions'
import styled from 'styled-components'
import * as Calls from '../../../../types/Calls'
import * as Theme from '../../../Common/GridGeneric/Theme'
import * as FormatHelpers from '../../../../helpers/Formatters'

const CaptionSpan = styled.span`
  color: ${props => props.theme.genericTextColors.textColorPale}
  font-size: 1.2rem;
`;

const getDuration = (item: Calls.CallData, withMarker: boolean, theme: Theme.ThemeProps) => {
  const duration = item.duration ? FormatHelpers.msSpanToString(item.duration) : '';

  return (
    <span>
      <CaptionSpan>{FormatHelpers.addSearchMarker(withMarker, duration)}</CaptionSpan>
    </span>
  )
};

const DurationRenderer: React.SFC<ColumnDataProps> = (props) => {

  return getDuration(props.rowData, props.withMarker, props.theme);
}

export default DurationRenderer
