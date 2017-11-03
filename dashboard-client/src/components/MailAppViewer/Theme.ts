import * as TabTheme from '../../components/Common/TabGeneric/Theme';
import * as checkboxTheme from '../Common/Checkbox/Theme'

export interface ThemeProps {
  textColor: string;
  tabs: TabTheme.TabsThemeProps;
  borderColor: string;
  newItemBgColor: string;
  newItemColor: string;
  expandColor: string;
  infoBgColor: string;
  menuItemBgColor: string;
  menuItemHoverColor: string;
  selectedItemColor: string;
  lineBorder: string;
  checkbox: checkboxTheme.CheckboxThemeProps;
  itemBgColor: string;
  itemBgHover: string;
  itemBgChecked: string;
  markAsChecked: string;
  markAsNewItem: string;
  contentColor: string;
  headerBgColor: string;
  bodyBgColor: string;
  gridShadow: string;
}

export const defaultTheme = {
  textColor: 'black',
  tabs: TabTheme.DEFAULT_THEME,
  borderColor: '#E9EDF6',
  newItemBgColor: '#E05C54',
  newItemColor: '#FFFFFF',
  expandColor: '#627892',
  infoBgColor: '#E9EDF6',
  menuItemBgColor: '#FFFFFF',
  menuItemHoverColor: '#F3F4F6',
  selectedItemColor: '#49AAC8',
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
  contentColor: '#9FA1A2',
  headerBgColor: '#E4E6F0',
  bodyBgColor: '#F1F4F4',
  gridShadow: 'rgba(23, 23, 23, 0.13)',
}
