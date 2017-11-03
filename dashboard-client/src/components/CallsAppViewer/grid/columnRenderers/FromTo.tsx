import * as React from 'react'
import { ColumnDataProps } from '../../../Common/GridGeneric/definitions'
import styled from 'styled-components'
import * as Calls from '../../../../types/Calls'
import * as Theme from '../../../Common/GridGeneric/Theme'
import * as FormatHelpers from '../../../../helpers/Formatters'

const CaptionSpan = styled.span`
  color: ${props => props.theme.genericTextColors.textColorPale}
`;
const ValueSpan = styled.span`
  color: ${props => props.theme.genericTextColors.textColor}
`;

const FromTo = (item: Calls.CallData, withMarker: boolean, theme: Theme.ThemeProps) => {
  let isFromCaption = !item.fromTo
    ? ''
    : (item.fromTo.callDirection
      ? 'from:\u00a0'
      : `to:\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0`);
  const phoneNumer = item.fromTo
    ? item.fromTo.phoneNumber
    : '';

  return (
    <span>
      <CaptionSpan>{isFromCaption}</CaptionSpan>
      <ValueSpan>{FormatHelpers.addSearchMarker(withMarker, phoneNumer)}</ValueSpan>
    </span>
  )
};

const FromToRenderer: React.SFC<ColumnDataProps> = (props) => {

  return FromTo(props.rowData, props.withMarker, props.theme);
}

export default FromToRenderer
