import * as React from 'react';
import * as ReactDOM from 'react-dom';

import LinkedinEducation from './LinkedinEducation';
import { LinkedinEducationProps } from './LinkedinEducation';

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
  const props: LinkedinEducationProps = {
    linkedinEducationActionMenu: ActionMenuTest,
    data: {
      id: 0,
      headline: 'University of cyber security',
      degree: 'Cyber security diploma',
      fromTime: 1377993600000,
      toTime: 1435708800000,
      isFavorite: true,
      hasNotes: true,
      isRead: false,
      hasTranslation: false,
      tags: [],
    },
    setStar: () => null,
    removeTag: () => null,
  }

  ReactDOM.render(<MuiThemeProvider><LinkedinEducation {...props}/></MuiThemeProvider>, div);
});
