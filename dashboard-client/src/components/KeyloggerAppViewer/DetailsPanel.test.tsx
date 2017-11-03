import * as React from 'react';
import * as ReactDOM from 'react-dom';

import DetailsPanel from './DetailsPanel';
import { DetailsPanelProps } from './DetailsPanel';

import { ThemeProvider } from 'styled-components';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: DetailsPanelProps = {
    item: null,
    addTag: (itemIds, tagIds) => null,
    removeTag: (itemId, tagId) => null,
    addToNotebook: (itemIds) => null,
    markAsRead: (itemIds) => null,
    markAsUnread: (itemIds) => null,
    askForTranslate: (itemIds) => null,
    askForTranscript: (itemIds) => null,
    exportItem: (itemIds) => null,
    setFavorite: (itemId, isFav) => null,
  }

  ReactDOM.render((
    <ThemeProvider theme={{}}>
      <DetailsPanel {...props}/>
    </ThemeProvider>
  ),
                  div);
});
