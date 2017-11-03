import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Url from './Url';
import { UrlProps } from './Url';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: UrlProps = {
    url: 'http://google.co.il',
  }

  ReactDOM.render(<Url {...props}/>, div);
});
