import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import StatusDropDown from './statusDropDown';
import { StatusDropDownProps } from './statusDropDown';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: StatusDropDownProps = {
    status: () => null,
  }
  ReactDOM.render(<MuiThemeProvider><StatusDropDown status={props.status}/></MuiThemeProvider>, div);
});
