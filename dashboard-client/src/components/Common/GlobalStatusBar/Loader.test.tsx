import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Loader from './Loader';
import { LoaderProps } from './Loader';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: LoaderProps = {
    seconds: 5
  }
  ReactDOM.render(<Loader seconds={props.seconds}/>, div);
});