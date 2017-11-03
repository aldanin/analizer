import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { APP_SYMBOLS } from '../../../types/AppSymbols'

import KnownIcons from './';
import { KnownIconsProps } from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: KnownIconsProps = {
    appSymbol: APP_SYMBOLS.amazon,
    style: {}
  }

  ReactDOM.render(<KnownIcons {...props}/>, div);
});
