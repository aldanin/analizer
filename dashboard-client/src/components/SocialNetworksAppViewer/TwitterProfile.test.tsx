import * as React from 'react';
import * as ReactDOM from 'react-dom';

import TwitterProfile from './TwitterProfile';
import { ProfileProps } from './TwitterProfile';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './Theme';
import { demoTwitterData } from '../../mockData/Twitter';
injectTapEventPlugin();

const demoData = demoTwitterData;

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: ProfileProps = {
    data: demoData,
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={defaultTheme}>
        <TwitterProfile {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
