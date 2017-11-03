export interface ThemeProps {
  bgColor: string,
  listPanel: {
    bgColor: string,
    bgColorSelected: string,
    textColor: string,
    textColorLight: string,
    accentColor: string,
  },
  dashboard: {
    cardHeadBgImage: string,
    cardHeadTextColor: string,
    textColorLight: string,
    textColorCounter: string,
    cardHoverBgColor: string,
    cardHoverBorderColor: string,
    textColorAlert: string,
    textColorDisabled: string,
    tooltip: {
      textColor: string,
      highlightColor: string,
      backgroundColor: string,
    },
  },
}

export const defaultTheme = {
  bgColor: 'yellow',
  listPanel: {
    bgColor: '#fff',
    bgColorSelected: 'silver',
    textColor: '#000',
    textColorLight: 'rgb(160, 160, 160)',
    accentColor: 'rgb(65,160,190)'
  },
  dashboard: {
    cardHeadBgImage: 'linear-gradient( 90deg, rgb(53, 158, 193), rgb(45, 145, 180) )',
    cardHeadTextColor: '#fff',
    textColorLight: 'rgb(160, 160, 160)',
    textColorCounter: 'rgb(100, 120, 172)',
    cardHoverBgColor: '#ff0',
    cardHoverBorderColor: '#0f0',
    textColorAlert: 'pink',
    textColorDisabled: 'silver',
    tooltip: {
      textColor: '#fff',
      highlightColor: 'rgb(141,153,187)',
      backgroundColor: 'rgba(86, 92, 111, 0.95)',
    }
  },
}
