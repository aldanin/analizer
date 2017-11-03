import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Slide from './Slide';
import { SlideProps } from './Slide';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: SlideProps = {
    imageUrl: '',
    width: 0,
    height: 0,
    clicks: [],
  }

  ReactDOM.render(<Slide {...props}/>, div);
});
