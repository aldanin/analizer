import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { getActivityTable } from './mock';
import ActivityPattern from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    activityTable: getActivityTable(),
  } ;

  ReactDOM.render(<ActivityPattern {...props}/>, div);
});
