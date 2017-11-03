import * as React from 'react'
import { ColumnDataProps } from '../../../Common/GridGeneric/definitions'
import styled from 'styled-components'
import * as Calls from '../../../../types/Calls'
import * as FormatHelpers from '../../../../helpers/Formatters'

const CaptionSpan = styled.span`
  color: ${props => props.theme.genericTextColors.textColorPale};
  font-size: 1.2rem;
`;

const getSource = ((code: Calls.SourceTypes) => {
  let source;
  switch (code) {
    case Calls.SourceTypes.video:
      source = 'Video';
      break;
    case Calls.SourceTypes.audio:
      source = 'Audio';
      break;
    default:
      source = '';
  }
  return source;
})

const SourceRenderer: React.SFC<ColumnDataProps> = (props) => {
  const source = getSource(props.rowData.source);

  return <CaptionSpan theme={props.theme}>{FormatHelpers.addSearchMarker(props.withMarker, source)}</CaptionSpan>
}

export default SourceRenderer
