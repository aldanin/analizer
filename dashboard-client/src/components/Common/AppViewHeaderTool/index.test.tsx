import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppViewHeaderToolbar from './index';
import { AppViewHeaderToolbarProps } from './index';
import Themed from '../../../containers/Themed'
import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: AppViewHeaderToolbarProps = {
    icon: 'photo',
    title: 'Gallery',
    titleStyle: {
      marginLeft: '3px',
    },
    lastExtractionTime: 65,
    updateTimeIndicator: 4320000,
    requestUpdate: () => null,
    extractNow: () => null,
  }
  ReactDOM.render(<Themed><AppViewHeaderToolbar {...props}/></Themed>, div);
});
