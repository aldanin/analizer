import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Notebook } from './';
import { NotebookProps } from './';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { demoNotebookData } from '../../mockData/Notebook';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');

  const props: NotebookProps = {
    data: demoNotebookData,
  }

  ReactDOM.render(<MuiThemeProvider><Notebook {...props}/></MuiThemeProvider>, div);
});
