import * as React from 'react';
import * as ReactDOM from 'react-dom';

import LinkedinExperience from './LinkedinExperience';
import { LinkedinExperienceProps } from './LinkedinExperience';

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
  const props: LinkedinExperienceProps = {
    linkedinExperienceActionMenu: ActionMenuTest,
    data: {
      id: 1,
      headline: 'Staff Accountant',
      position: 'PwC',
      fromTime: 1356998400000,
      toTime: 1470009600000,
      description: 'My Description',
      isFavorite: true,
      hasNotes: true,
      isRead: true,
      hasTranslation: false,
      tags: [],
    },
    setStar: () => null,
    removeTag: () => null,
  }

  ReactDOM.render(<MuiThemeProvider><LinkedinExperience {...props}/></MuiThemeProvider>, div);
});
