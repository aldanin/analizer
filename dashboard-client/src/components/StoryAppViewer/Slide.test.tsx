import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Slide from './Slide';
import { SlideProps } from './Slide';
import { StoryData } from '../../types/Story'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: SlideProps = {
    story: {} as StoryData,
    time: 0,
  }

  ReactDOM.render(<Slide {...props}/>, div);
});
