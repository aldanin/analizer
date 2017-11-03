import * as React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import LoginPageContent from '../components/LoginPageContent/'
import { loginRequest } from '../state/actions/Session'
import { PRODUCT_TYPES } from '../types/Product'

import styled from 'styled-components'
import theme from '../theme/ScTheme'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`

interface LoginPageProps extends React.Props<LoginPage> {
  handleLogin: (username: string, password: string) => void,
  currentlySending: boolean,
  errorMsg: string,
};

class LoginPage extends Component<LoginPageProps, {}> {
  static propTypes = {
  }

  render() {
    return (
      <Wrapper>
        <LoginPageContent {...this.props} theme={theme.loginPage}/>
      </Wrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentlySending: state[PRODUCT_TYPES.SESSION].isFetching,
    errorMsg: state[PRODUCT_TYPES.SESSION].error ? state[PRODUCT_TYPES.SESSION].error.message : '',
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: (username, password) => {dispatch(loginRequest(username, password))},
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage)
