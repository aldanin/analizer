import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Theme from './Theme'

import AddTagBody from './TagWindowBody';
import { AddTagBodyProps } from './TagWindowBody';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { ThemeProvider } from 'styled-components';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: AddTagBodyProps = {
    onClose: () => null,
    allTags: [],
    requestTags: () => null,
    isFetching: true,
  }

  ReactDOM.render(
    <ThemeProvider theme={Theme}>
      <MuiThemeProvider>
        <AddTagBody {...props}/>
      </MuiThemeProvider>
    </ThemeProvider>,
    div);
});
