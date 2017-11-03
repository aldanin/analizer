import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ContactsFilters from './ContactsFilters';
import { ContactsFiltersProps } from './ContactsFilters';
import * as Theme from './Theme'
import { ThemeProvider } from 'styled-components'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: ContactsFiltersProps = {
    handlers: {
      onBooleanFilterChange: (key, state) => null,
    },
    // theme?: Theme.defaultTheme
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={Theme.DEFAULT_THEME}>
        <ContactsFilters {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
