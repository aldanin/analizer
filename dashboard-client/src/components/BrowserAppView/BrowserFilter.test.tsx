import * as React from 'react';
import * as ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
import BrowserFilterBar from './BrowserFilter';
import { BrowserFilterProps } from './BrowserFilter';
import { ThemeProvider } from 'styled-components';
import { DEFAULT_THEME } from './Theme';

injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: BrowserFilterProps = {
    bookmarksClickAction: () => null,
    historyClickAction: () => null,
    expandCallback: () => null,
    collapseCallback: () => null,
    initialSelectedIndex: 1,
    isGroupByDomainMode: false,
    groupByClickAction: () => null,
    isGroupMode: false,
    changeGroupByMode: () => null,
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={DEFAULT_THEME}>
        <BrowserFilterBar
          bookmarksClickAction={props.bookmarksClickAction}
          historyClickAction={props.historyClickAction}
          expandCallback={props.expandCallback}
          collapseCallback={props.collapseCallback}
          initialSelectedIndex={props.initialSelectedIndex}
          isGroupByDomainMode={props.isGroupByDomainMode}
          groupByClickAction={props.groupByClickAction}
          isGroupMode={props.isGroupMode}
          changeGroupByMode={props.changeGroupByMode}
        />
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
