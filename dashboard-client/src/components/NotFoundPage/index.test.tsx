import * as React from 'react';
import * as ReactDOM from 'react-dom';
import NotFoundPage from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<NotFoundPage />, div);
});
