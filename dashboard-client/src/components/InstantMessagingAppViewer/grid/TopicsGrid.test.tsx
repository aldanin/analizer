import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TopcisGrid from './TopicsGrid';
import {TopicsGridProps} from './TopicsGrid';
import * as Theme from '../Theme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {ThemeProvider} from 'styled-components';
import {DEFAULT_THEME} from '../Theme';
import * as IM from '../../../types/InstantMessaging'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: TopicsGridProps = {
    rowData: [],
    selectedRow: null,
    scrollToSelectedRow: true,
    onRowClick: (item: IM.Topic) => null,
    loadMoreData: (isPrevious: boolean) => null,
    theme: Theme.DEFAULT_THEME
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme = {DEFAULT_THEME}>
        <TopcisGrid {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>, div);
});
