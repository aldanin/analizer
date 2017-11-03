export interface ThemeProps {
  textColor: string,
  highlightColor: string,
  backgroundImage: string,
  menuBg: string,
  menuTextColor: string,
  menuHighlightColor: string,
  notificationBadge: {
    textColor: string,
    bgColor: string,
  }
}

export const defaultTheme = {
  textColor: '#fff',
  highlightColor: 'orange',
  // backgroundImage: 'linear-gradient( 5deg, rgb(72, 168, 198), rgb(30, 120, 160) )',
  backgroundImage: 'linear-gradient( 5deg, rgb(128, 0, 0), rgb(30, 120, 160) )',
  menuBg: 'gray',
  menuTextColor: 'silver',
  menuHighlightColor: 'cyan',
  notificationBadge: {
    textColor: '#fff',
    bgColor: '#f00',
  }
}
