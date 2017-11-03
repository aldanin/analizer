import * as React from 'react';
import * as ReactDOM from 'react-dom';

import AgentTooltipContent from './AgentTooltipContent';
import { AgentTooltipContentProps } from './AgentTooltipContent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { getAgent } from '../../mockData/Agent'

import { ThemeProvider } from 'styled-components'
import * as Theme from './Theme'

// import Themed from '../../containers/Themed'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: AgentTooltipContentProps = {
    agent: getAgent('1')
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={Theme.defaultTheme}>
        <AgentTooltipContent {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
