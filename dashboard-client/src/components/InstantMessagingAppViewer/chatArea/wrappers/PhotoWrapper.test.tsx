import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PhotoWrapper from './PhotoWrapper';
import {PhotoWrapperProps} from './PhotoWrapper';
import * as Theme from '../../Theme'


it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: PhotoWrapperProps = {
    theme: Theme.DEFAULT_THEME,
    date: '12:45',
    attachment: {
      id: '1',
      path: '',
      type: 'image',
      size: 1
    },
  }

  ReactDOM.render(<PhotoWrapper {...props}/>, div);
});
