import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Theme from './Theme'
import { ThemeProvider } from 'styled-components';

import MostActiveContactInfo from './MostActiveContactInfo';
import { MostActiveContactInfoProps } from './MostActiveContactInfo';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: MostActiveContactInfoProps = {
    contactName: '',
    avatar: <div/>,
    data: {
      lastCommunication: 1498978434,
      calls: 2,
      lastCall: 1498978434,
      im: 20,
      lastIM: 1498978414,
      mails: 10,
      lastMail: 1498978394,
    },
    params: {
      agent_id: '1',
    }
  }

  ReactDOM.render(
    <ThemeProvider theme={Theme}>
      <MuiThemeProvider>
        <MostActiveContactInfo {...props}/>
      </MuiThemeProvider>
    </ThemeProvider>,
    div);
});
