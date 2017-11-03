import * as React from 'react';
import * as ReactDOM from 'react-dom';

import TagsList from './';
import { TagsListProps } from './';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: TagsListProps = {
    tags: [],
    numberOfTagsToShow: 2,
    removeTagCallback: () => null,
  }

  ReactDOM.render(<MuiThemeProvider><TagsList {...props}/></MuiThemeProvider>, div);
});
