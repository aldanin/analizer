import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Theme from './Theme'
import { ThemeProvider } from 'styled-components';

import MostActiveSort from './MostActiveSort';
import { MostActiveSortProps } from './MostActiveSort';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: MostActiveSortProps = {
    contactFilter: 1,
    onSortOptionSelect: () => null,
  }

  ReactDOM.render(
    <ThemeProvider theme={Theme}>
      <MuiThemeProvider>
        <MostActiveSort {...props}/>
      </MuiThemeProvider>
    </ThemeProvider>,
    div);
});
