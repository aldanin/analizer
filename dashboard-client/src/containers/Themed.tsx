import * as React from 'react'
import * as PropTypes from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import { ThemeProvider as ScThemeProvider } from 'styled-components'
import scTheme from '../theme/ScTheme'

// Normalize some styles
// see https://github.com/callemall/material-ui/blob/master/src/styles/getMuiTheme.js
const muiTheme = getMuiTheme({
  palette: {
  },
  flatButton: {
    textTransform: 'none',
  },
  appBar: {
  },
});

export interface RequireAuthWrapperProps extends React.Props<Themed> {
};

export interface ProviderContext {
  theme: Object;
}

class Themed extends React.Component<RequireAuthWrapperProps, {}> {
  static childContextTypes = {
    theme: PropTypes.object
  }

  getChildContext() {
    return {
      theme: scTheme
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <ScThemeProvider theme={scTheme}>
          {this.props.children}
        </ScThemeProvider>
      </MuiThemeProvider>
    )
  }
}

export default Themed
