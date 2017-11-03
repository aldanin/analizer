import * as React from 'react';
import * as ReactDOM from 'react-dom';

import WeekHeaderGrid from './WeekHeaderGrid';
import { WeekHeaderGridProps } from './WeekHeaderGrid';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './Theme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: WeekHeaderGridProps = {
    timestamp: 12345,
    maxNumberOfEvents: 4,
  }

  ReactDOM.render(<ThemeProvider theme={defaultTheme}><WeekHeaderGrid {...props}/></ThemeProvider>, div);
});
