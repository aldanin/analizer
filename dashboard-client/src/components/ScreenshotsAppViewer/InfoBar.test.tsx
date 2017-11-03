import * as React from 'react';
import * as ReactDOM from 'react-dom';

import InfoBar from './InfoBar';
import { InfoBarProps } from './InfoBar';

import stdActions from '../../helpers/StdProductActionsFunctory'
import { PRODUCT_TYPES } from '../../types/Product'

import { ThemeProvider } from 'styled-components'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div')
  const props: InfoBarProps = {
    item: null,
    setFavorite: (id, isFavorite) => null,
    removeTag: (id, tagId) => null,
    stdActions: stdActions(() => null, PRODUCT_TYPES.KEYLOG),
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={{}}>
        <InfoBar {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div)
});
