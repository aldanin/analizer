import * as React from 'react';
import * as ReactDOM from 'react-dom';

import LinkedinSkill from './LinkedinSkill';
import { LinkedinSkillProps } from './LinkedinSkill';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: LinkedinSkillProps = {
    data: {
      title: 'cooking',
      level: 10,
    }
  }

  ReactDOM.render(<LinkedinSkill {...props}/>, div);
});
