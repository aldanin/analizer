import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { DEFAULT_THEME } from './Theme';

import DialogZoom from './DialogZoom';
import { DialogZoomProps } from './DialogZoom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: DialogZoomProps = {
    imageSrc: '123.png',
    rotationAngle: 0,
    height: 250,
    width: 370,
    isVertical: true,
    getFullSizeImage: () => null,
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={DEFAULT_THEME}>
        <DialogZoom {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
