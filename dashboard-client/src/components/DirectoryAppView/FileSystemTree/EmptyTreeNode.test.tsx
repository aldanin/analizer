import * as React from 'react';
import * as ReactDOM from 'react-dom';

import EmptyTreeNode from './EmptyTreeNode';
import { EmptyTreeNodeProps } from './EmptyTreeNode';
import { ThemeProvider } from 'styled-components';
import { DEFAULT_THEME } from '../Theme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: EmptyTreeNodeProps = {
    level: 5,
  }

  ReactDOM.render(
    <ThemeProvider theme={DEFAULT_THEME}>
      <EmptyTreeNode {...props}/>
    </ThemeProvider>,
    div);
});
