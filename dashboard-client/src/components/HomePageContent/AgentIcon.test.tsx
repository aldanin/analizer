import * as React from 'react';
import * as ReactDOM from 'react-dom';

import AgentIcon from './AgentIcon';
import { AgentIconProps } from './AgentIcon';
import * as Agent from '../../types/Agent'

import Themed from '../../containers/Themed'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: AgentIconProps = {
    device: Agent.AGENT_DEVICE_PHONE,
    os: Agent.AGENT_OS_IOS,
    height: '50px',
  }

  ReactDOM.render(<Themed><AgentIcon {...props}/></Themed>, div);
});
