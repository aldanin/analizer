import * as React from 'react';
import * as ReactDOM from 'react-dom';

import LinkedinProfileView from './LinkedinProfileView';
import { LinkedinProfileViewProps } from './LinkedinProfileView';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
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

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: LinkedinProfileViewProps = {
    linkedinExperienceActionMenu: ActionMenuTest,
    linkedinEducationActionMenu: ActionMenuTest,
    data: {
        experience: [],
        education: [],
        skills: [],
    },
    setStar: () => null,
    removeTag: () => null,
  }

  ReactDOM.render(<MuiThemeProvider><LinkedinProfileView {...props}/></MuiThemeProvider>, div);
});
