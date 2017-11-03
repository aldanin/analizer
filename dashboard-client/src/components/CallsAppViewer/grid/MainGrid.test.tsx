import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MainGrid from './MainGrid';
import { MainGridProps } from './MainGrid';
import * as Theme from '../Theme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ThemeProvider } from 'styled-components';
import * as Calls from '../../../types/Calls'
import * as Prod from '../../../types/Product'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: MainGridProps = {
    rowData: [],
    selectedRow: null,
    groupBy: null,
    onHeaderClick: (field: string, state: boolean) => null,
    onRowClick: (item: Calls.CallData) => null,
    onRowCheck: (id: Prod.ProductID, state: boolean) => null,
    setStar: () => null,
    removeTag: () => null,
    openNotebook: () => null,
    addTag: () => null,
    addToNotebook: () => null,
    markAsRead: () => null,
    markAsUnRead: () => null,
    askForTranslate: () => null,
    askForTranscript: () => null,
    exportItem: () => null,
    getTranslate: () => null,
    loadMoreData: () => null,
    theme: Theme.DEFAULT_THEME
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={Theme.DEFAULT_THEME}>
        <MainGrid {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
