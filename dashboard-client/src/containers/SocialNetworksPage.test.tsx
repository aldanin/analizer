import * as React from 'react'
import { shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { SocialNetworksPage, SocialNetworksProps } from './SocialNetworksPage';
injectTapEventPlugin();

it('renders without crashing', () => {
  const props: SocialNetworksProps = {
    isFetching: true,
    params: '',
    loadSocialNetworks: () => null,
    lastExtraction: 0,
    updateTimeIndicator: 1,
    requestUpdate: () => null,
    extractNow: () => null,
    showFilter: () => null,
    tagsFilter: () => null,
    actionsFilter: () => null,
    keyword: '',
  };

  shallow(<MuiThemeProvider><SocialNetworksPage {...props}/></MuiThemeProvider>);
});
