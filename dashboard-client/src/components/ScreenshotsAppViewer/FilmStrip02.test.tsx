import * as React from 'react';
import * as ReactDOM from 'react-dom';

import FilmStrip from './FilmStrip02';
import { FilmStripProps } from './FilmStrip02';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: FilmStripProps = {
    selectedId: -1,
    slides: [],
    onSlideClick: (id) => null,
    loadOlder: (count) => null,
    loadNewer: (count) => null,
  }

  ReactDOM.render(<FilmStrip {...props}/>, div);
});
