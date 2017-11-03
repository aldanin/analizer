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
    selected: false,
    onRowClick: (ev: Event) => null,
    onRowDoubleClick: (ev: Event) => null,
    onRowMouseOver: (ev: Event) => null,
    onRowMouseOut: (ev: Event) => null,
    rowData: {},
    style: {},
    theme: Theme.defaultTheme
  }

  ReactDOM.render(<VGridRowRenderer {...props}/>, div);
});
