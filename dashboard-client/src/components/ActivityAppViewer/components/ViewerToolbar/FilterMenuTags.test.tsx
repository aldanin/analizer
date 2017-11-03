import * as React from 'react';
import * as ReactDOM from 'react-dom';

import FilterMenuTags from './FilterMenuTags';
import { FilterMenuTagsProps } from './FilterMenuTags';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: FilterMenuTagsProps = {
    tags: [],
    values: [],
    onChangeCb: (values) => null,
  }

  ReactDOM.render(<MuiThemeProvider><FilterMenuTags {...props}/></MuiThemeProvider>, div);
});
