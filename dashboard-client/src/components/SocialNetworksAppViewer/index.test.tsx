import * as React from 'react';
import { shallow } from 'enzyme';

import SocialNetworksAppViewer from './';
import { SocialNetworksAppViewerProps } from './';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const props: SocialNetworksAppViewerProps = {
    isFetching: false,
    requestUpdate: () => null,
    lastExtraction: 0,
    updateTimeIndicator: 0,
    extractNow: () => null,
    showFilter: () => null,
    tagsFilter: () => null,
    actionsFilter: () => null,
    keyword: '',
  }

  shallow(<MuiThemeProvider><SocialNetworksAppViewer {...props}/></MuiThemeProvider>);
});
