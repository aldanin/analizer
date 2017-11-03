import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import Card from './Card';
import { CardProps } from './Card';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { DEFAULT_THEME } from './Theme';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: CardProps = {
    id: 1,
    frontPhoto: 'http://cdn.wallpapersafari.com/90/90/rKuN6F.jpg',
    backPhoto: 'http://www.technocrazed.com/wp-content/uploads/2015/11/HD-Phone-Wallpapers-1080p-119-640x1138.jpg',
    time: 1493888434,
    latitude: 40.677451,
    longitude: -73.913452,
    lastExtracted: 1483888434,
    isVertical: true,
    isFavorite: false,
    tags: [],
    setStar: () => null,
    addTag: () => null,
    addToNotebook: () => null,
    markAsRead: () => null,
    markAsUnRead: () => null,
    askForTranslate: () => null,
    askForTranscript: () => null,
    exportItem: () => null,
    removeTag: () => null,
    getFullSizeImage: () => null,
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={DEFAULT_THEME}>
        <Card {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
