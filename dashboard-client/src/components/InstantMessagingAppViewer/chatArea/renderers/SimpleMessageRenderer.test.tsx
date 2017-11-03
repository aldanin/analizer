import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Theme from '../../Theme'
import SimpleMessageRenderer from './SimpleMessageRenderer';
import * as Common from './common';
import {MuiThemeProvider} from 'material-ui'
import {ThemeProvider} from 'styled-components';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const props: Common.MessageRendererProps = Common.DEFAULT_MESSAGERENDERER_PROPS

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={Theme.DEFAULT_THEME}>
        <SimpleMessageRenderer {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>, div);
});
