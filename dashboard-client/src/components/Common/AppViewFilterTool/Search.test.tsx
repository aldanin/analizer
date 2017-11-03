import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ToolbarSearch from './Search';
import Themed from '../../../containers/Themed'
import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<Themed><ToolbarSearch/></Themed>, div);
});
