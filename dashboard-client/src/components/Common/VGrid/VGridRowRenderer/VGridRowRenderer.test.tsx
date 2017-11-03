import * as React from 'react';
import * as ReactDOM from 'react-dom';

import VGridRowRenderer from './VGridRowRenderer';
import { VGridRowRendererProps } from './VGridRowRenderer';
import * as Theme from './Theme'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: VGridRowRendererProps = {
    className: '',
    columns: [],
    index: 1,
    isScrolling: false,
    key: '',
    isChecked: false,
    isRead: false,
    selected: false,
    onRowClick: (ev: any) => null,
    onRowDoubleClick: (ev: any) => null,
    onRowMouseOver: (ev: any) => null,
    onRowMouseOut: (ev: any) => null,
    rowData: {},
    style: {},
    theme: Theme.defaultTheme
  }

  ReactDOM.render(<VGridRowRenderer {...props}/>, div);
});
