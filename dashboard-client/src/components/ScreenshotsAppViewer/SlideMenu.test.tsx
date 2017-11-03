import * as React from 'react';
import * as ReactDOM from 'react-dom';

import SlideMenu from './SlideMenu';
import { SlideMenuProps } from './SlideMenu';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: SlideMenuProps = {
    onZoomClick: () => null,
    onRotateClick: () => null,
    onZoomInClick: () => null,
    onZoomOutClick: () => null,
  }

  ReactDOM.render(<SlideMenu {...props}/>, div);
});
