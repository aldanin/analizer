import * as React from 'react';
import * as ReactDOM from 'react-dom';

import KeywordProvider from './KeywordProvider';
import { KeywordProviderProps } from './KeywordProvider';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: KeywordProviderProps = {
    keyword: 'search',
    onSearchResult: () => null,
  }

  ReactDOM.render(<KeywordProvider {...props}/>, div);
});
