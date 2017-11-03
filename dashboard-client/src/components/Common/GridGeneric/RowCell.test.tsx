import * as React from 'react';
import * as ReactDOM from 'react-dom';

import RowCell from './RowCell';
import { RowCellProps } from './RowCell';
import * as Defs from './definitions'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: RowCellProps = {
    cellProps: Defs.DEAFULT_CELL_PROPS
  }

  ReactDOM.render(<RowCell {...props}/>, div);
});
