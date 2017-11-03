import * as React from 'react';
import * as ReactDOM from 'react-dom';
import OperationsListPanel from './OperationsListPanel';
import { OperationsListPanelProps } from './OperationsListPanel';

import Themed from '../../containers/Themed'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: OperationsListPanelProps = {
    isFetching: false,
    items: [],
    targets: [],
    selectedId: '',
    onItemSelected: () => null
  }

  ReactDOM.render(<Themed><OperationsListPanel {...props}/></Themed>, div);
});
