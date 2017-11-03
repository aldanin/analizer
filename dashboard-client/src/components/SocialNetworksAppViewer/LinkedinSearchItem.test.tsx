import * as React from 'react';
import * as ReactDOM from 'react-dom';

import LinkedinSearchItem from './LinkedinSearchItem';
import { LinkedinSearchItemProps } from './LinkedinSearchItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './Theme';

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
  const props: LinkedinSearchItemProps = {
    linkedinSearchActionMenu: ActionMenuTest,
    data: {
      id: 8,
      lookingFor: 'Ruth Hudson',
      isFavorite: false,
      hasNotes: false,
      isRead: true,
      hasTranslation: false,
      tags: [],
    },
    setStar: () => null,
    removeTag: () => null,
  }

  ReactDOM.render(
    <ThemeProvider theme={defaultTheme}>
      <MuiThemeProvider>
        <LinkedinSearchItem {...props}/>
      </MuiThemeProvider>
    </ThemeProvider>,
    div);
});
