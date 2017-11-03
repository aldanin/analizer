export interface PhotoGridThemeProps {
  starColor: string;
  starStroke: string;
  starBorder: string;
  markerColor: string;
  textColor: string;
  titleBgColor: string;
  hoverBgColor: string;
  checkBgColor: string;
  titleColor: string;
  checkBox: {
    bgColor: string;
    textColor: string;
    borderColor: string;
  }
}

export const DEFAULT_THEME = {
  starColor: 'red',
  starStroke: 'red',
  starBorder: 'red',
  markerColor: 'red',
  textColor: 'red',
  titleBgColor: 'red',
  hoverBgColor: 'red',
  checkBgColor: 'red',
  titleColor: 'red',
  checkBox: {
    bgColor: 'red',
    textColor: 'red',
    borderColor: 'red',
}
}
