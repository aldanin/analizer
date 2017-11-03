import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PersonDetailsBar from './PersonDetailsBar';
import { PersonDetailsBarProps } from './PersonDetailsBar';
import * as Theme from '../Theme'
import { defaultTopic, GroupInCommon } from '../../../types/InstantMessaging'
import { ThemeProvider } from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: PersonDetailsBarProps = {
    onGroupInCommonSelected: (group: GroupInCommon) => null,
    topic: defaultTopic,
    theme: Theme.DEFAULT_THEME
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={Theme.DEFAULT_THEME}>
        <PersonDetailsBar {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
