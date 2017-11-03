import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MainGrid from './MainGrid';
import { MainGridProps } from './MainGrid';
import * as Theme from '../Theme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ThemeProvider } from 'styled-components';
import { DEFAULT_THEME } from '../Theme';
import * as ContactsCommon from 'common-interfaces/types/Contacts'
import * as Prod from '../../../types/Product'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: MainGridProps = {
    rowData: [],
    selectedItems: [],
    currentItem: null,
    groupBy: null,
    onHeaderClick: (field: string, state: boolean) => null,
    onRowClick: (item: ContactsCommon.Contact) => null,
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
    getTranscript: () => null,
    loadMoreData: (isPreviousPage: boolean) => null,
    theme: Theme.DEFAULT_THEME
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={DEFAULT_THEME}>
        <MainGrid {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
