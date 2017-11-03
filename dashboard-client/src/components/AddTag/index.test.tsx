import * as React from 'react';
import { shallow } from 'enzyme';

import AddTag from './';
import { AddTagProps } from './';

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const props: AddTagProps = {
    isOpen: true,
    onClose: () => null,
    requestTags: () => null,
    allTags: [],
    isFetching: false,
  }

  shallow(<AddTag {...props}/>);
});
