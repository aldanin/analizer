import * as React from 'react'
import { ColumnDataProps } from '../../../Common/GridGeneric/definitions'
import { addSearchMarker } from '../../../../helpers/Formatters'
import styled from 'styled-components'

const Span = styled.span`
  display: inline-block;
  width: 200px;
`;
const TopicNameRenderer: React.SFC<ColumnDataProps> = (props) => {
  const {rowData} = props;
  const name = rowData.name ? rowData.name : 'NA';

  return <Span>{addSearchMarker(props.withMarker, name)}</Span>;
}

export default TopicNameRenderer
