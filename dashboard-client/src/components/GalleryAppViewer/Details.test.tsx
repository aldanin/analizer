import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GalleryContentPhotoDetails from './Details';
import { ThemeProvider } from 'styled-components'
import { GalleryContentPhotoDetailsProps } from './Details';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { DEFAULT_THEME } from './Theme';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: GalleryContentPhotoDetailsProps = {
    photo: {
      id: '1',
      name: '1',
      url: '1.png',
      date: 1111,
      type: 'PNG',
      width: 400,
      height: 400,
      orientation: 0,
      path: 'images/1.png',
      extracted: 0,
      tags: [],
      isFavorite: false,
      isRead: false,
    },

    photoId: 0,
    degree: 0,
    onRotate: () => null,

    handlers: {
      setStar: () => null,
      addTag: () => null,
      setUnRead: () => null,
      setRead: () => null,
      addToNotebook: () => null,
      askForTranslate: () => null,
      askForTranscript: () => null,
      exportItem: () => null,
      removeTag: () => null,
      imageOption: () => null,
      getFullSizeImage: () => null,
    }
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={DEFAULT_THEME}>
      <GalleryContentPhotoDetails {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
