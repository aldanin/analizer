import * as React from 'react'
import LoginForm from './LoginForm'
import styled, { ThemeProvider } from 'styled-components'
import * as Theme from './Theme'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background: ${props => props.theme.background};
  align-items: center;
  justify-content: center;
`;

export interface LoginPageContentProps extends React.Props<LoginPageContent> {
  handleLogin: (username: string, password: string) => void,
  currentlySending: boolean,
  errorMsg: string,
  theme?: Theme.ThemeProps
}
export interface LoginPageContentState {
}

class LoginPageContent extends React.Component<LoginPageContentProps, LoginPageContentState> {
  static defaultProps: Partial<LoginPageContentProps> = {
    theme: Theme.defaultTheme
  }

  constructor (props: LoginPageContentProps) {
    super(props)

    this.state = {
    }
  }

  render() {
    const {handleLogin, currentlySending, errorMsg, theme} = this.props
    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          <LoginForm onSubmit={handleLogin} btnText={'Login'} error={errorMsg} currentlySending={currentlySending} />
        </Wrapper>
      </ThemeProvider>
    )
  }
}

export default LoginPageContent
