import * as React from 'react';
import * as ReactDOM from 'react-dom';

import WeekBodyGrid from './WeekBodyGrid';
import { WeekBodyGridProps } from './WeekBodyGrid';
import { defaultTheme } from './Theme';
import { ThemeProvider } from 'styled-components';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: WeekBodyGridProps = {
  }

  ReactDOM.render(<ThemeProvider theme={defaultTheme}><WeekBodyGrid {...props}/></ThemeProvider>, div);
});
