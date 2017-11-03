export interface ThemeProps {
  backgroundColor: string;
  iconViewColor: string;
  titleColor: string;
  textColor: string;
  watchColor: string;
  linkColor: string;
}

export const DEFAULT_THEME: ThemeProps = {
  backgroundColor: 'white',
  iconViewColor: 'black',
  titleColor: 'black',
  textColor: 'rgb(174, 175, 176)',
  watchColor: 'rgb(174, 175, 176)',
  linkColor: 'rgb(115, 129, 179)',
}
