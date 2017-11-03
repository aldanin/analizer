import * as CheckboxTheme from '../../components/Common/Checkbox/Theme'

export interface ThemeProps {
  textColor: string,
  filterBgColor: string;
  filterAuthorTextColor: string;
  clearSelectedTextColor: string;
  mentionTextColor: string;
  indicatorColor: string;
  placeHolderColor: string;
  borderColor: string;
  postBorderColor: string;
  dateTextColor: string;
  checkBoxTheme: CheckboxTheme.CheckboxThemeProps;
  commentBgColor: string;
}

export const defaultTheme = {
  textColor: 'black',
  filterBgColor: '#f3f5fa',
  filterAuthorTextColor: '#a5a7a9',
  clearSelectedTextColor: '#6576ae',
  mentionTextColor: '#a2a9c1',
  indicatorColor: '#000000',
  placeHolderColor: '#9fa1a2',
  borderColor: '#eaeae8',
  postBorderColor: '#ced4d9',
  dateTextColor: '#9fa1a2',
  checkBoxTheme: CheckboxTheme.DEFAULT_THEME,
  commentBgColor: '#f8f8f8',
}
