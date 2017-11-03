import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AgentsList from '.';
import { AgentsListProps } from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: AgentsListProps = {
    agents: [
    {
      name: 'x',
      id: '1234',
      resourceId: '1234'
    },
    {
      name: 'y',
      id: '456',
      resourceId: '1234'
    }
  ]}
  ReactDOM.render(<AgentsList agents={props.agents}/>, div);
});
