export interface ThemeProps {
  textColor: string,
  highlightColor: string,
  backgroundImage: string,
  notificationBadge: {
    textColor: string,
    bgColor: string,
  }
}

export const defaultTheme = {
  textColor: '#fff',
  highlightColor: 'orange',
  backgroundImage: 'linear-gradient( 5deg, rgb(72, 168, 198), rgb(30, 120, 160) )',
  notificationBadge: {
    textColor: '#fff',
    bgColor: '#f00',
  }
}
