import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GalleryContent from './Content';
import { GalleryContentProps } from './Content';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { ThemeProvider } from 'styled-components';
import { DEFAULT_THEME } from './Theme';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: GalleryContentProps = {
    photos: [
      {
        id: '1',
        name: '1',
        url: '1.png',
        date: 3,
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
      {
        id: '2',
        name: '2',
        url: '2.png',
        date: 2,
        type: 'PNG',
        width: 400,
        height: 400,
        orientation: 0,
        path: 'images/2.png',
        extracted: 1,
        tags: [],
        isFavorite: false,
        isRead: false,
      },

    ],

    isItemSelected: () => true,
    onChangeImage: () => null,
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
    },

    onItemSelected: () => null,
    onItemUnSelected: () => null,
    selectItem: () => null,
  }
  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={DEFAULT_THEME}>
        <GalleryContent {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
