import * as React from 'react';
import { shallow } from 'enzyme';

import InformationPanelView from './';
import { InformationPanelViewProps } from './';

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const props: InformationPanelViewProps = {
  }

  shallow(<InformationPanelView {...props}/>);
});
