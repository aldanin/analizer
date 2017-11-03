import * as React from 'react';
import * as ReactDOM from 'react-dom';

import MenuItem from './MenuItem';
import { MenuItemProps } from './MenuItem';
import { defaultTheme } from './Theme';
import { ThemeProvider } from 'styled-components';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: MenuItemProps = {
    title: '1',
    items: 1,
    newItems: 0,
    isActive: true,
    clickCallback: () => null,
  }

  ReactDOM.render(
    <ThemeProvider theme={defaultTheme}>
      <MenuItem {...props}/>
    </ThemeProvider>,
    div);
});
