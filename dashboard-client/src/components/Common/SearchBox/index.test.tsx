import * as React from 'react';
import * as ReactDOM from 'react-dom';

import SearchBox from './';
import { SearchBoxProps } from './';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const props: SearchBoxProps = {
    placeholder: 'search',
    onChange: (text: string) => null
  }

  ReactDOM.render(<SearchBox {...props}/>, div);
});
