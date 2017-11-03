import * as React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { agentsLoad } from '../state/actions/Agents'
import { userDataRequest } from '../state/actions/User'
import { PRODUCT_TYPES } from '../types/Product'

interface AppProps extends React.Props<any> {
  isLoggedIn: boolean;
  redirectUrl: string;
  isFetching: boolean;
  loadAgents: () => void;
  loadUserData: (id: string) => void;
  doLogout: () => void;
};

class App extends React.Component<AppProps, {}> {
  handleChange = nextValue => {
    browserHistory.push(`/${nextValue}`)
  }

  loadDataOnLogin = () => {
    this.props.loadUserData('123') // TODO
    this.props.loadAgents()
  }

  public componentDidMount() {
    if (this.props.isLoggedIn) {
      // We have a session -> fetch initial app data
      this.loadDataOnLogin();
    }
  }

  componentDidUpdate(prevProps: AppProps) {
    const {redirectUrl} = this.props
    const isLoggingOut = prevProps.isLoggedIn && !this.props.isLoggedIn
    const isLoggingIn = !prevProps.isLoggedIn && this.props.isLoggedIn

    if (isLoggingIn) {
      browserHistory.replace(redirectUrl)
      this.loadDataOnLogin();
    } else if (isLoggingOut) {
      // do any kind of cleanup or post-logout redirection here
      window.location.reload()
    }
  }

  render() {
    const {children} = this.props

    return (
      <div className="full-page" style={{width: '100vw', height: '100vh'}}>
        {children}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {isAuthenticated, redirectUrl} = state[PRODUCT_TYPES.SESSION]
  return {
    isLoggedIn: isAuthenticated,
    redirectUrl,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadAgents: () => dispatch(agentsLoad()),
    loadUserData: (id) => dispatch(userDataRequest(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
