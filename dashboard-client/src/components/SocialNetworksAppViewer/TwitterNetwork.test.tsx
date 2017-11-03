import * as React from 'react';
import * as ReactDOM from 'react-dom';

import TwitterNetwork from './TwitterNetwork';
import { TwitterNetworkProps } from './TwitterNetwork';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './Theme';
import { demoTwitterData } from '../../mockData/Twitter';
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

const demoData = demoTwitterData;

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: TwitterNetworkProps = {
    tweeterMessageActionMenu: ActionMenuTest,
    tweeterMentionActionMenu: ActionMenuTest,
    tweeterFollowingActionMenu: ActionMenuTest,
    tweeterFollowerActionMenu: ActionMenuTest,
    data: demoData,
    setStar: () => null,
    removeTag: () => null,
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={defaultTheme}>
        <TwitterNetwork {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
