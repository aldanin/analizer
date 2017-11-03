import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GalleryApp from '.';
import { GalleryProps } from '.';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: GalleryProps = {
    photos: [
      {
        id: 1,
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
      {
        id: 2,
        name: '2',
        url: '2.png',
        date: 11111,
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
    timerIndicator: 65,
    setStar: () => null,
    addTag: () => null,
    removeTag: () => null,
    sort: (filter: 'string') => null,
    imageOption: () => null,
    show: () => null,
    tags: () => null,
    requestGalleryUpdate: () => null,
    extractNow: () => null,
    updateTimeIndicator: 432000,
    filter: 'DateAsc',
    isFetching: false,
    isFirstRequest: false,
    getFullSizeImage: () => null,
    setUnRead: () => null,
    setRead: () => null,
    addToNotebook: () => null,
    askForTranslate: () => null,
    askForTranscript: () => null,
    exportItem: () => null,
    selectItem: () => null,
  }
  ReactDOM.render(<MuiThemeProvider><GalleryApp{...props}/></MuiThemeProvider>, div);
});
