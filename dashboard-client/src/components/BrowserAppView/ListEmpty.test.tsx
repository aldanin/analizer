import * as React from 'react';
import * as ReactDOM from 'react-dom';

import ListEmpty from './ListEmpty';
import { ListEmptyProps } from './ListEmpty';
import { ThemeProvider } from 'styled-components';
import { DEFAULT_THEME } from './Theme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: ListEmptyProps = {
    level: 5,
  }

  ReactDOM.render(
    <ThemeProvider theme={DEFAULT_THEME}>
      <ListEmpty {...props}/>
    </ThemeProvider>,
    div);
});
