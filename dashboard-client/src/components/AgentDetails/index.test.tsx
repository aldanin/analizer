import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Agent from '.';
import { AgentProps } from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: AgentProps = {
    agent : {
      name: 'test',
      id: '1234',
    }
  }
  ReactDOM.render(<Agent agent={props.agent}/>, div);
});
