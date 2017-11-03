import * as React from 'react';
import * as ReactDOM from 'react-dom';

import StoryAppViewer from './';
import { StoryAppViewerProps } from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: StoryAppViewerProps = {
    stories: [],
  }

  ReactDOM.render(<StoryAppViewer {...props}/>, div);
});
