import * as VGridRow from './VGridRowRenderer/Theme'
import * as Tags from '../TagList/Theme'
import * as AppIcon from '../AppIcon/Theme'
import * as Checkbox from '../Checkbox/Theme'

export interface ThemeProps {
  genericTextColors: {
    textColor: string,
    textColorLink: string,
    textColorPale: string,
    borderColor: string,
  },
  header: {
    sortIconSize: number,
    sortIconMargin: number,
  },
  tags: Tags.TagThemeProps,
  status: string
  rowTheme: VGridRow.ThemeProps,
  rowBorder: string,
  checkbox: Checkbox.CheckboxThemeProps,
  appSymbols: AppIcon.ThemeProps
}

const defaultTextColor = '#263238';
const defaultTextColorPale = '#9fa1a2';

export const DEFAULT_THEME = {
  genericTextColors: {
    textColorLink: defaultTextColor,
    textColorPale: defaultTextColorPale,
    textColor: defaultTextColor,
    borderColor: '#E9EDF6',
  },
  header: {
    sortIconSize: 8,
    sortIconMargin: 2,
  },
  tags: Tags.DEFAULT_THEME,
  status: '#9fa1a2',
  rowTheme: VGridRow.defaultTheme,
  rowBorder: '#E9EDF6',
  checkbox: Checkbox.DEFAULT_THEME,
  appSymbols: AppIcon.DEFAULT_THEME,
};
