import * as React from 'react';
import * as ReactDOM from 'react-dom';

import ListPanel from './ListPanel';
import { ListPanelProps } from './ListPanel';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: ListPanelProps = {
    items: [],
    selectedItemId: null,
    onLineClicked: () => null,
    addTag: (ids, tags) => null,
    removeTag: (id, tagId) => null,
    addToNotebook: (ids) => null,
    openNotebook: () => null,
    getTranslate: () => null,
    markAsRead: (ids) => null,
    markAsUnread: (ids) => null,
    askForTranslate: (ids) => null,
    askForTranscript: (ids) => null,
    exportItem: (ids) => null,
    onChecked: (id) => null,
    onUnchecked: (id) => null,
    setFavorite: (id, isFavorite: boolean) => null,
  }

  ReactDOM.render(<ListPanel {...props}/>, div);
});
