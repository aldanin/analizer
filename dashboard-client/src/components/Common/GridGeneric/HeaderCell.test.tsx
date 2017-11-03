import * as React from 'react';
import * as ReactDOM from 'react-dom';
import HeaderCell from './HeaderCell';
import { HeaderCellProps } from './HeaderCell';
import * as Theme from './Theme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: HeaderCellProps = {
    field: 'field1',
    title: 'title1',
    isSelected: false,
    width: 100,
    flexShrink: 1,
    isClickable: true,
    onClick: () => null,
    color: 'black',
    fontSize: '1.2rem',
    theme: Theme.DEFAULT_THEME,
  }

  ReactDOM.render(<MuiThemeProvider><HeaderCell {...props}/></MuiThemeProvider>, div);
});
