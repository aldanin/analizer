import { TEXT_COLORS, BACKGROUND_COLORS, ICON_STAR_COLOR } from './constants'
import * as CheckBoxTheme from '../components/Common/Checkbox/Theme'

export interface GenericTextColorsTheme {
  textColor: string,
  textColorLink: string,
  textColorPale: string,
  borderColor: string,
}

export const GENERIC_TEXT_COLORS_THEME_DEFAULT: GenericTextColorsTheme = {
  textColor: TEXT_COLORS.T02,
  textColorLink: TEXT_COLORS.T17,
  textColorPale: TEXT_COLORS.T03,
  borderColor: '#e1e0e0',
}

////////////

export interface ListItemTheme {
  checkedColor: string,
  readMarkColor: string,
  unreadMarkColor: string,
  starColor: string,
  starBorderColor: string,
  translateOnColor: string,
  translateOffColor: string,
  notebookOnColor: string,
  checkBgColor: string,
  iconColor: string,
  checkbox: CheckBoxTheme.CheckboxThemeProps,
  borderColor: string,
  hoverBgColor: string,
  notebookIconColor: string,
}

export const LIST_ITEM_DEFAULT_THEME: ListItemTheme = {
  checkedColor: BACKGROUND_COLORS.B21,
  readMarkColor: 'transparent',
  unreadMarkColor: BACKGROUND_COLORS.B28,
  starColor: ICON_STAR_COLOR,
  starBorderColor: BACKGROUND_COLORS.B08,
  translateOnColor: TEXT_COLORS.T02,
  translateOffColor: TEXT_COLORS.T03,
  notebookOnColor: TEXT_COLORS.T02,
  checkBgColor: BACKGROUND_COLORS.B03,
  iconColor: BACKGROUND_COLORS.B09,
  checkbox: CheckBoxTheme.DEFAULT_THEME,
  borderColor: BACKGROUND_COLORS.B02,
  hoverBgColor: BACKGROUND_COLORS.B02,
  notebookIconColor: TEXT_COLORS.T03,
}
