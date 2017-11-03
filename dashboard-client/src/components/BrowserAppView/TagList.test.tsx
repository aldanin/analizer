import * as React from 'react';
import * as ReactDOM from 'react-dom';

import TagList from './TagList';
import { TagListProps } from './TagList';
import { DEFAULT_THEME } from './Theme';
import { ThemeProvider } from 'styled-components';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: TagListProps = {
    itemId: 1,
    removeTag: () => null,
    tags: [],
  }

  ReactDOM.render(
    <ThemeProvider theme={DEFAULT_THEME}>
      <TagList {...props}/>
    </ThemeProvider>,
    div);
});
