import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { AgentCard } from './AgentCard';
import { AgentCardProps } from './AgentCard';

import { ThemeProvider } from 'styled-components'
import * as Theme from './Theme'
import Themed from '../../containers/Themed'

import { getAgent } from '../../mockData/Agent'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: AgentCardProps = {
    agent: getAgent('1'),
    idx: 2,
  }

  ReactDOM.render(
    <Themed>
      <ThemeProvider theme={Theme.defaultTheme}>
        <AgentCard {...props}/>
      </ThemeProvider>
    </Themed>,
    div);
});
