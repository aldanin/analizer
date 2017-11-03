import * as React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { withTheme } from 'styled-components'
import * as Theme from './Theme'

// import ErrorMessage from './ErrorMessage'
// import LoadingButton from './LoadingButton'

export interface LoginFormProps extends React.Props<any> {
  onSubmit: (username: string, password: string) => void,
  btnText: string,
  error: string,
  currentlySending: boolean,
  theme?: Theme.ThemeProps,
};

export interface LoginFormState {
  username: string,
  password: string,
}

class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
  // styels
  floatingLabelStyle = {
    color: this.props.theme.hintTextColor,
  }
  inputTextStyle = {
    color: this.props.theme.textColor,
  }
  errorTextStyle = {
    color: this.props.theme.errorTextColor,
  }
  underlineFocusStyle = {
    borderColor: this.props.theme.underlineFocusColor,
  }

  constructor (props: LoginFormProps) {
    super(props)

    this.state = {
      username: '',
      password: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render () {
    const {theme, error} = this.props
    const btnIsDisabled = this.props.currentlySending
      || this.state.username.length === 0
      || this.state.password.length === 0

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <TextField
          name="username"
          floatingLabelText="Username"
          value={this.state.username}
          onChange={this.handleInputChange}
          floatingLabelStyle={this.floatingLabelStyle}
          inputStyle={this.inputTextStyle}
          errorStyle={this.errorTextStyle}
          underlineFocusStyle={this.underlineFocusStyle}
        /><br/>
        <TextField
          name="password"
          floatingLabelText="Password"
          errorText={error}
          type="password"
          value={this.state.password}
          onChange={this.handleInputChange}
          floatingLabelStyle={this.floatingLabelStyle}
          inputStyle={this.inputTextStyle}
          errorStyle={this.errorTextStyle}
          underlineFocusStyle={this.underlineFocusStyle}
        /><br/>
        <RaisedButton
          type="submit"
          label={this.props.btnText}
          style={{
            borderRadius: '18px',
            marginTop: '50px',
            backgroundColor: theme.buttonBg,
          }}
          buttonStyle={{
            borderRadius: '18px',
          }}
          labelStyle={{
          }}
          disabled={btnIsDisabled}
          labelColor={theme.buttonTextColor}
          disabledLabelColor={theme.buttonDisabledTextColor}
          backgroundColor={theme.buttonBg}
          disabledBackgroundColor={theme.buttonDisabledBg}
          fullWidth={true}
        />
      </form>
    )
  }

  handleInputChange(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    // typescript made me do it :(
    if (name === 'username') {
      this.setState({
        username: value as string
      });
    } else if (name === 'password') {
      this.setState({
        password: value as string
      });
    }
  }

  handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    this.props.onSubmit(this.state.username, this.state.password)
  }
}

export default withTheme(LoginForm)
