import * as checkboxTheme from '../Checkbox/Theme'

export interface ThemeProps {
  textColor: string,
  lineBorder: string;
  checkbox: checkboxTheme.CheckboxThemeProps;
  itemBgColor: string;
  itemBgHover: string;
  itemBgChecked: string;
  markAsChecked: string;
  markAsNewItem: string;
}

export const defaultTheme = {
  textColor: '#263238',
  lineBorder: '#E9EDF6',
  checkbox: {
    bgColor: '#FFFFFF',
    textColor: '#6576AE',
    borderColor: '#CED4E8',
  },
  itemBgColor: '#FFFFFF',
  itemBgHover: '#dff4f7',
  itemBgChecked: '#E4E6F0',
  markAsChecked: '#49AAC8',
  markAsNewItem: '#E05C54',
}
