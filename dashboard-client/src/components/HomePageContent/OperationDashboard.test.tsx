import * as React from 'react';
import * as ReactDOM from 'react-dom';
import OperationDashboard from './OperationDashboard';
import { OperationDashboardProps } from './OperationDashboard';

import Themed from '../../containers/Themed'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: OperationDashboardProps = {
    targetsIsFetching: false,
    targets: [],
    agents: [],
  }

  ReactDOM.render(<Themed><OperationDashboard {...props}/></Themed>, div);
});
