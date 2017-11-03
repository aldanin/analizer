import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Details from './Details';
import { DetailsProps } from './Details';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: DetailsProps = {
    onItemSelected: () => null,
    onItemUnSelected: () => null,
    isItemSelected: () => true,
    isExpandMode: false,
    updateOpenItems: () => null,
    isOpen: () => null,
    data: [],
    removeTag: () => null,
    setStar: () => null,
    addTag: () => null,
    markAsRead: () => null,
    markAsUnread: () => null,
    loadMoreData: (isPrevious: boolean) => null,
    onAutoRequestStateChange: (isDisabled: boolean) => null,
  }

  ReactDOM.render(<MuiThemeProvider><Details {...props}/></MuiThemeProvider>, div);
});
