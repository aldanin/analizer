import * as React from 'react';
import * as ReactDOM from 'react-dom';

import LinkedinNetwork from './LinkedinNetwork';
import { LinkedinNetworkProps } from './LinkedinNetwork';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './Theme';
import { demoLinkedinData } from '../../mockData/Linkedin';
injectTapEventPlugin();

const ActionMenuTest = {
  addTagCallback: () => null,
  addToNotebookCallback: () => null,
  markAsReadCallback: () => null,
  markAsUnreadCallback: () => null,
  translateCallback: () => null,
  transcriptCallback: () => null,
  exportCallback: () => null,
}

const demoData = demoLinkedinData;

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: LinkedinNetworkProps = {
    linkedinExperienceActionMenu: ActionMenuTest,
    linkedinEducationActionMenu: ActionMenuTest,
    linkedinConnectionActionMenu: ActionMenuTest,
    linkedinSearchActionMenu: ActionMenuTest,
    data: demoData,
    setStar: () => null,
    removeTag: () => null,
    connectionSortByIndex: 0,
    connectionSortBy: () => null,
    isSorting: false,
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={defaultTheme}>
        <LinkedinNetwork {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
