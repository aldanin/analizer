import * as React from 'react'
import { CellRendererParams } from 'react-virtualized';
import * as Helpers from '../../../../helpers/Formatters'

const SizeRenderer: React.SFC<CellRendererParams> = (props) => {
  const {rowData} = props;

  const size = rowData.info ? rowData.info.size : null;

  return (
    rowData.info
      ? (
          <span>
            {Helpers.fileSizeFormatter(size)}
          </span>
      )
      : <span/>
  )
};

export default SizeRenderer;
