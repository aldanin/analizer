import * as React from 'react';
import * as ReactDOM from 'react-dom';

{{#if parentName}}
import {{ properCase name }} from './{{ properCase name }}';
import { {{ properCase name }}Props } from './{{ properCase name }}';
{{else}}
import {{ properCase name }} from './';
import { {{ properCase name }}Props } from './';
{{/if}}

{{#if mui}}
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
{{/if}}

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: {{ properCase name }}Props = {
  }

  {{#if mui}}
  ReactDOM.render(<MuiThemeProvider><{{ properCase name }} {...props}/></MuiThemeProvider>, div);
  {{else}}
  ReactDOM.render(<{{ properCase name }} {...props}/>, div);
  {{/if}}
});
