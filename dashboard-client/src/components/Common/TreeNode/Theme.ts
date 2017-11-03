import * as CheckboxTheme from '../Checkbox/Theme'

export interface ThemeProps {
  checkedColor: string;
  readMarkColor: string;
  unreadMarkColor: string;
  starBorderColor: string;
  starColor: string;
  translateOnColor: string;
  translateOffColor: string;
  notebookOnColor: string;
  checkBgColor: string;
  arrowIconColor: string;
  iconColor: string;
  checkbox: CheckboxTheme.CheckboxThemeProps,
  borderColor: string,
  hoverBgColor: string,
  notebookIconColor: string,
}

const defaultTextColor = '#263238';
const defaultTextColorPale = '#9fa1a2';

export const DEFAULT_THEME = {
  checkedColor: 'royalblue',
  readMarkColor: 'transparent',
  unreadMarkColor: 'red',
  starColor: 'yellow',
  starBorderColor: 'black',
  translateOnColor: defaultTextColor,
  translateOffColor: defaultTextColorPale,
  notebookOnColor: defaultTextColor,
  checkBgColor: 'royalblue',
  arrowIconColor: 'red',
  iconColor: 'grey',
  checkbox: CheckboxTheme.DEFAULT_THEME,
  borderColor: 'silver',
  hoverBgColor: 'silver',
  notebookIconColor: defaultTextColorPale,
}
