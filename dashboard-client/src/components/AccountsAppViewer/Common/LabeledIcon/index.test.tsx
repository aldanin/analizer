import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { LabledIconProps } from './index'
import LabledIcon from './index'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: LabledIconProps = {
    caption: 'Phone',
    labelColor: 'blue',
    style: {},
    iconName: 'icon_phone',
  }

  ReactDOM.render(<LabledIcon {...props}/>, div);
});
