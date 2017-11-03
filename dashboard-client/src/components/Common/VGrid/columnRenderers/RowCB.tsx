import * as React from 'react'
import { CellRendererParams } from 'react-virtualized';
import Checkbox from '../../../Common/Checkbox'
import * as VGridTheme from '../Theme'
import * as Prod from '../../../../types/Product'
import * as VGrid from '../../VGrid'

const renderCheckbox = function (product: Prod.ProductData,
                                 rowIndex: number,
                                 gridStatus: VGrid.VGridStatusProps,
                                 getProductId: (product: Prod.ProductData) => Prod.ProductID,
                                 checkedStatus: (productId: Prod.ProductID, isChecked?: boolean) => boolean,
                                 theme: VGridTheme.ThemeProps) {

  const productId = getProductId(product);
  const isHovered = gridStatus.hoveredRowIndex === rowIndex;
  const isChecked  = gridStatus.checkedRows[productId]

  return isHovered || isChecked ? (
      <Checkbox
        setChecked={checkedStatus(productId)}
        onCheck={(checked: boolean) => checkedStatus(productId, checked)}
        theme={theme.checkbox}
      />
    ) : null;
};

const RowCBRenderer: React.SFC<CellRendererParams> = (props) => {
  const {
    columnData,
    rowIndex,
    rowData,
  } = props;

  return renderCheckbox(
    rowData,
    rowIndex,
    columnData.gridStatus,
    columnData.getProductId,
    columnData.checkedRowHandler,
    columnData.theme);
};

export default RowCBRenderer;
