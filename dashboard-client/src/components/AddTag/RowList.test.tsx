import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Theme from './Theme'

import RowTagList from './RowList';
import { RowTagListProps } from './RowList';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { ThemeProvider } from 'styled-components';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: RowTagListProps = {
    tag: 'Home',
    onTagSelect: () => null,
  }

  ReactDOM.render(
    <ThemeProvider theme={Theme}>
      <MuiThemeProvider>
        <RowTagList {...props}/>
      </MuiThemeProvider>
    </ThemeProvider>,
    div);
});
