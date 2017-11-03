import * as React from 'react';
import * as ReactDOM from 'react-dom';
import VideoWrapper from './VideoWrapper';
import {VideoWrapperProps} from './VideoWrapper';
import * as Theme from '../../Theme'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: VideoWrapperProps = {
    theme: Theme.DEFAULT_THEME,
    date: '12:45',
    attachment: {
      id: '1',
      path: '',
      type: 'video',
      size: 1
    },
  }

  ReactDOM.render(<VideoWrapper {...props}/>, div);
});
