import * as React from 'react';
import * as ReactDOM from 'react-dom';

import TagItem from './TagItem';
import { TagItemProps } from './TagItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: TagItemProps = {
    tag: 'myTag',
    removeTagCallback: () => null,
  }

  ReactDOM.render(<TagItem {...props}/>, div);
});
