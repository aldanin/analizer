import * as React from 'react';
import * as ReactDOM from 'react-dom';

import AgentTooltip from './AgentTooltip';
import { AgentTooltipProps } from './AgentTooltip';

import { ThemeProvider } from 'styled-components'
import * as Theme from './Theme'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: AgentTooltipProps = {
    show: true,
    content: <div>Foo</div>,
    anchorEl: document.createElement('div'),
  }

  ReactDOM.render(<ThemeProvider theme={Theme.defaultTheme}><AgentTooltip {...props}/></ThemeProvider>, div);
});
