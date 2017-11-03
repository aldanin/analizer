export interface ThemeProps {
  colors: {
    phone: string,
    whatsapp: string,
    skype: string,
    mail: string,
    facebook: string,
    textColorPale: string,
    textColor: string,
    textColorLink: string
  },
}

export const defaultTheme = {
  colors: {
    phone: '#3b4993',
    whatsapp: '#8ED370',
    skype: '#48bae7',
    mail: '#f35757',
    facebook: '#366bff',
    textColorPale: '#9fa1a2',
    textColor: '#263238',
    textColorLink: 'black'
  }
}
