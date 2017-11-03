import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Screenshot from './Screenshot';
import { ScreenshotProps } from './Screenshot';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: ScreenshotProps = {
    screenshot: null,
    click: null,
  }

  ReactDOM.render(<Screenshot {...props}/>, div);
});
