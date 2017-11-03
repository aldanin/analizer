import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GalleryContentPhotoOptions from './OptionsMenu';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <MuiThemeProvider>
      <GalleryContentPhotoOptions
        imageOption={() => null}
        photoId={0}
      />
    </MuiThemeProvider>,
    div);
});
