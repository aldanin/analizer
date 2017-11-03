import * as React from 'react';
import * as ReactDOM from 'react-dom';
import NumberCircle from './'
import { NumberCircleProps } from './'
import { defaultTheme } from './Theme'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: NumberCircleProps = {
    theme: defaultTheme
  }

  ReactDOM.render(<NumberCircle {...props}/>, div);
});
