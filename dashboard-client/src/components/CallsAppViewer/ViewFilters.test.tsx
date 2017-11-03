import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ViewFilters from './ViewFilters';
import { CallsFiltersProps } from './ViewFilters';
import * as Theme from './Theme'
import { ThemeProvider } from 'styled-components'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: CallsFiltersProps = {
    onBooleanFilterChange: (key, state) => null,
    selectType: (value: number) => null,
    selectSource: (value: number) => null,
    // theme?: Theme.defaultTheme
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={Theme.DEFAULT_THEME}>
        <ViewFilters {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
