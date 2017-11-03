import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Theme from './Theme';
import { ThemeProvider } from 'styled-components';
import { LcheckboxProps } from './LabeledCheckbox'
import LabeledCheckbox from './LabeledCheckbox'
import { MuiThemeProvider } from 'material-ui'
import * as Prod from '../../../types/Product'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: LcheckboxProps = {
    filter: 'phone',
    onChange: (key: string, state: boolean, id?: Prod.ProductID) => null,
    setChecked: null,
    caption: 'Phone',
    id: '-1',
    labelColor: 'blue',
    style: {},
    iconName: 'icon_phone',
    theme: Theme.defaultTheme
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={Theme.defaultTheme}>
        <LabeledCheckbox {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
