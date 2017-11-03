import * as React from 'react';
import * as ReactDOM from 'react-dom';

import FilmStrip from './FilmStrip';
import { FilmStripProps } from './FilmStrip';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: FilmStripProps = {
    stories: [],
    selectedStoryId: 0,
    time: 0,
    isPlaying: false,
  }

  ReactDOM.render(<FilmStrip {...props}/>, div);
});
