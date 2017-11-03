import * as React from 'react';
import * as ReactDOM from 'react-dom';

import SinglePhoto from './SinglePhoto';
import { SinglePhotoProps } from './SinglePhoto';
import { DEFAULT_THEME } from './Theme';
import { ThemeProvider } from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { PhotoGridID } from './index';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: SinglePhotoProps = {
    id: 1,
    name: 'name',
    url: 'url',
    url2: '',
    date: 123,
    isFavorite: true,
    isVertical: false,
    tags: [],
    actions: <div/>,
    height: '125px',
    width: '20%',
    highlight: false,
    starSpan: <div/>,
    headerTool: (id: 1, title: '123', isFavorite: true, isChecked: false) => {return <div/>},
    selectedItem: (id: PhotoGridID) => null,
    onItemSelected: () => null,
    onItemUnSelected: () => null,
    isCheckboxVisible: false,
  }

  ReactDOM.render(
    <MuiThemeProvider>
    <ThemeProvider theme={DEFAULT_THEME}>
      <SinglePhoto {...props}/>
    </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
