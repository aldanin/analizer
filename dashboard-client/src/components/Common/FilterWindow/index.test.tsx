import * as React from 'react';
import * as ReactDOM from 'react-dom';
import FilterWindow from './';
import { FilterWindowProps } from './';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: FilterWindowProps = {
    filterHeader: <div>Header</div>,
    filterBody: <div>Body</div>,
    pointerPosition: 10,
    iconStyle: {
      fontSize: '17px',
    },
  }

  ReactDOM.render(<MuiThemeProvider><FilterWindow {...props}/></MuiThemeProvider>, div);
});
