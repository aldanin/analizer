import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GridGeneric from './';
import { GridGenericProps } from './index';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as Defs from './definitions'
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import * as Theme from './Theme';
import { ThemeProvider } from 'styled-components';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: GridGenericProps = {
    columns: [Defs.DEAFULT_COLUMN_PROPS],
    gridData: [],
    groupBy: null,
    currentRow: null,
    onHeaderClick: (field: string, isUp: boolean) => null,
    onRowClick: (rowData: any, index: number) => null,
    withCheckbox: true,
    onRowCheck: () => null,
    checkedRows: [],
    actionsFieldNameMapping: Defs.DEFAULT_FIELDNAME_MAPPING,
    actions: Defs.DEFAULT_ACTIONS,
    infiniteScrolling: {
      loadMoreData: (isPreviousPage: boolean) => null,
      onAutoRequestStateChange: (isDisabled: boolean) => null,
      withTop: false,
      fetchedFirstPage: false,
    },
    theme: Theme.DEFAULT_THEME
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={Theme.DEFAULT_THEME}>
        <GridGeneric {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
