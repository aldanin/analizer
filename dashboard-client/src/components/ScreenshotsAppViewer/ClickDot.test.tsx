import * as React from 'react';
import * as ReactDOM from 'react-dom';

import ClickDot from './ClickDot';
import { ClickDotProps } from './ClickDot';

import * as Theme from './Theme'
import { ThemeProvider } from 'styled-components'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: ClickDotProps = {
    top: '0',
    left: '0',
    text: 'f',
    clickTime: 0,
    intervalTime: 1000,
  }

  ReactDOM.render(
    <ThemeProvider theme={Theme.defaultTheme}>
      <ClickDot {...props}/>
    </ThemeProvider>,
    div);
});
