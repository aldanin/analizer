import * as React from 'react'
import { connect } from 'react-redux'
import { setRedirectUrl } from '../state/actions/Session'
import { PRODUCT_TYPES } from '../types/Product'

export interface RequireAuthWrapperProps extends React.Props<RequireAuthWrapper> {
  currentURL: string,
  isLoggedIn: boolean,
  setRedirectUrl: (url: string) => void,
  router: any
};

export class RequireAuthWrapper extends React.Component<RequireAuthWrapperProps, {}> {
  componentDidMount() {
    this.checkLogin()
  }

  componentDidUpdate(prevProps: RequireAuthWrapperProps) {
    this.checkLogin()
  }

  checkLogin = () => {
    const { currentURL, isLoggedIn } = this.props

    if (!isLoggedIn) {
      // set the current url/path for future redirection (we use a Redux action)
      this.props.setRedirectUrl(currentURL)
      // then redirect (we use a React Router method)
      this.props.router.replace('/login')
    }
  }

  renderChildrenOrNull() {
    if (this.props.isLoggedIn) {
      return this.props.children
    } else {
      return null
    }
  }

  render() {
    return (
      <div style={{height: '100%', width: '100%'}}>
        {this.renderChildrenOrNull()}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state[PRODUCT_TYPES.SESSION].isAuthenticated,
    currentURL: ownProps.location.pathname,
    router: ownProps.router,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setRedirectUrl: (url) => {dispatch(setRedirectUrl(url))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequireAuthWrapper)
