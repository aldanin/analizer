import * as React from 'react';
import * as ReactDOM from 'react-dom';

import CommentsContainer from './CommentsContainer';
import { CommentsContainerProps } from './CommentsContainer';
import { ThemeProvider } from 'styled-components';
import * as Theme from './Theme'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: CommentsContainerProps = {
    comments: [],
  }

  ReactDOM.render(
    <ThemeProvider theme={Theme.defaultTheme}>
      <CommentsContainer {...props}/>
    </ThemeProvider>,
    div);
});
