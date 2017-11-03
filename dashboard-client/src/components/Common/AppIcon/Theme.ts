export interface ColorTheme {
  default: string,
  phone: string,
  whatsapp: string,
  skype: string,
  mail: string,
  line: string,
  facebook: string,
  facebook_messenger: string,
  hangouts: string,
  telegram: string,
  viber: string,
  linkedin: string,
  sms: string,
  excel: string,
  word: string,
  pdf: string,
}

export interface ThemeProps {
  colors: ColorTheme
}

export const DEFAULT_COLOR_THEME = {
  default: 'black',
  phone: '#3b4993',
  whatsapp: '#8ED370',
  skype: '#48bae7',
  mail: '#f35757',
  line: '#40bf00',
  facebook: '#366bff',
  facebook_messenger: '#366bff',
  hangouts: '#34974d',
  telegram: 'black',
  viber: 'black',
  linkedin: 'black',
  sms: 'black',
  excel: 'black',
  word: 'black',
  pdf: 'black',
}

export const DEFAULT_THEME = {
  colors: DEFAULT_COLOR_THEME
}
