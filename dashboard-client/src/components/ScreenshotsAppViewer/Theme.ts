import { TabsThemeProps, DEFAULT_THEME as tabsDefaultTheme } from '../Common/TabGeneric/Theme'

export interface ThemeProps {
  textColor: string,
  slideBg: string,
  filmStripBg: string,
  controlsBg: string,
  controlsTextColor: string,
  arrowsColor: string,
  toolbarBackground: string,
  toolbarTextColor: string,
  toolbarSelectColor: string,
  infoTextColor: string,
  infoTextHighlight: string,
  infoBackground: string,
  dialogCloseBtnBg: string,
  clickDot: {
    bgColor: string,
    textColor: string,
  }
  tabs?: TabsThemeProps,
}

export const defaultTheme = {
  textColor: 'black',
  slideBg: 'silver',
  filmStripBg: '#7af',
  controlsBg: '#eef',
  controlsTextColor: '#449',
  arrowsColor: '#449',
  toolbarBackground: 'white',
  toolbarTextColor: 'silver',
  toolbarSelectColor: 'purple',
  infoTextColor: 'silver',
  infoTextHighlight: 'black',
  infoBackground: '#777',
  dialogCloseBtnBg: 'rgba(0, 128, 255, 0.5)',
  clickDot: {
    bgColor: 'rgba(0,128,255,0.5)',
    textColor: 'yellow',
  },
  tabs: tabsDefaultTheme,
}
