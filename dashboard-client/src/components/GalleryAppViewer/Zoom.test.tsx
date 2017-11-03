import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DialogZoomImage from './Zoom';
import { ZoomProps } from './Zoom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { DEFAULT_THEME } from './Theme';
import { ThemeProvider } from 'styled-components';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: ZoomProps = {
    imageSrc: 'abc.png',
    onRotate: () => null,
    degree: 0,
    isOpen: true,
    closeDialog: () => null,
    getFullSizeImage: () => null,
  }
  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={DEFAULT_THEME}>
        <DialogZoomImage
          imageSrc={props.imageSrc}
          onRotate={props.onRotate}
          degree={props.degree}
          isOpen={props.isOpen}
          closeDialog={props.closeDialog}
          getFullSizeImage={props.getFullSizeImage}
        />
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
