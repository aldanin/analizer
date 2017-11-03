import * as React from 'react';
import * as ReactDOM from 'react-dom';

import ViewerToolbar from '.';
import { ViewerToolbarProps } from '.';
import * as Theme from '../../Theme'
// import {DEFAULT_FILTERS} from '../../../../types/Screenshot'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { ThemeProvider } from 'styled-components'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: ViewerToolbarProps = {
    onTabSelected: (idx) => null,
    onFiltersChanged: (filters) => null,
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={Theme.defaultTheme}>
        <ViewerToolbar {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
