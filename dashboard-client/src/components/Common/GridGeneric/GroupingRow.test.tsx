import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GroupingRow from './GroupingRow'
import { GroupingRowProps } from './GroupingRow';
import * as Theme from './Theme';
import { ThemeProvider } from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: GroupingRowProps = {
    // groupBy: {
    //   field: 'field1',
    //   caption: 'caption1'
    // },
    groupBy: {field: 'test', caption: 'Test'},
    name: 'title1',
    onClick: (name: string, isExpanded: boolean) => null,
    color: 'black',
    fontSize: '1.2rem',
    theme: Theme.DEFAULT_THEME,
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={Theme.DEFAULT_THEME}>
        <GroupingRow {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
