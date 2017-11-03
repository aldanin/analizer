import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Theme from './Theme'
import DateChooser from './index';
import { DateChooserProps } from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: DateChooserProps = {
    startDate: 123456789,
    changeDate: (date: number) => null,
    theme: Theme.DEFAULT_THEME
  }

  ReactDOM.render(<DateChooser {...props}/>, div);
});
