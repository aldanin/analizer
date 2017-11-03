import * as React from 'react'
import { CellRendererParams } from 'react-virtualized';

export interface DefaultProps {
}

const DefaultRenderer: React.SFC<CellRendererParams> = (props) => {
  const {
    cellData,
  } = props;

  return (
    <span>{cellData || <span/>}</span>
  )
};

export default DefaultRenderer
