import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GridRow from './GridRow';
import { GridRowProps } from './GridRow';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { DEFAULT_THEME } from './Theme';
import { ThemeProvider } from 'styled-components';
import * as Defs from './definitions'
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: GridRowProps = {
    index: 0,
    id: 1,
    columns: [Defs.DEAFULT_COLUMN_PROPS],
    rowData: {
      id: 1,
      isNew: true,
      timestamp: 123456789,
      tags: [],
      isFavorite: true,
      isNoteBook: false,
      isTranslate: false,
    },
    isCurrent: false,
    isChecked: false,
    onRowClick: (rowData: any, index: number) => null,
    actionsFieldNameMapping: Defs.DEFAULT_FIELDNAME_MAPPING,
    actions: Defs.DEFAULT_ACTIONS,
    additionalTheme: {},
    theme: DEFAULT_THEME,
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={DEFAULT_THEME}>
          <GridRow {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
