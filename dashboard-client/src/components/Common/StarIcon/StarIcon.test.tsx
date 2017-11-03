import * as React from 'react';
import * as ReactDOM from 'react-dom';

import StarIcon from './StarIcon';
import { StarSvgProps } from './StarIcon';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: StarSvgProps = {
    isFull: false,
    callback: () => null,
  }

  ReactDOM.render(<MuiThemeProvider><StarIcon {...props}/></MuiThemeProvider>, div);
});
