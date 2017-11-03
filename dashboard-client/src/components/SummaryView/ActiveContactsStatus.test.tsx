import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Theme from './Theme'
import { ThemeProvider } from 'styled-components';

import ActiveContactsStatus from './ActiveContactsStatus';
import { ActiveContactsStatusProps } from './ActiveContactsStatus';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: ActiveContactsStatusProps = {
    maxWidthIndicator: 200,
    data: {
      lastCommunication: 1498978434,
      calls: 2,
      lastCall: 1498978434,
      im: 20,
      lastIM: 1498978414,
      mails: 10,
      lastMail: 1498978394,
    }
  }

  ReactDOM.render(<ThemeProvider theme={Theme}><ActiveContactsStatus {...props}/></ThemeProvider>, div);
});
