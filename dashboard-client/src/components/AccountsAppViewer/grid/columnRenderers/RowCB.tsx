import * as React from 'react'
import { CellRendererParams } from 'react-virtualized';
import Checkbox from '../../../Common/Checkbox'
import { AccountItem } from '../../../../types/Accounts'
import { ThemeProps } from '../../Theme'

const RowCBRenderer: React.SFC<CellRendererParams> = (props) => {
  const renderCheckbox = function (gridItem: AccountItem,
                                   selectedGridItem: AccountItem,
                                   theme: ThemeProps) {

    const checked = gridItem.id === selectedGridItem.id;
    return (
      <Checkbox
        setChecked={checked}
        onCheck={(e) => e}
        theme={theme.checkbox}
      />
    );
  };

  const
    renderer = ({
      columnData,
      cellData,
      dataKey,
      rowIndex,
      rowData
    }: CellRendererParams): any => {
      return renderCheckbox(rowData, columnData.selectedGridItem, columnData.theme);
    };

  return (
    renderer(props)
  )
};

export default RowCBRenderer;
