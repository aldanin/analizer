export interface ThemeProps {
  background: string,
  textColor: string,
  hintTextColor: string,
  errorTextColor: string,
  buttonBg: string,
  buttonTextColor: string,
  buttonDisabledBg: string,
  buttonDisabledTextColor: string,
  underlineFocusColor: string,
}

export const defaultTheme = {
  background: 'blue',
  textColor: 'white',
  hintTextColor: 'silver',
  errorTextColor: 'red',
  buttonBg: 'blue',
  buttonTextColor: 'black',
  buttonDisabledBg: 'gray',
  buttonDisabledTextColor: '#ddd',
  underlineFocusColor: 'orange'
}
