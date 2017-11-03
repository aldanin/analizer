import * as Themes from '../../../theme/ThemesGeneric'
import * as AppIconTheme from '../AppIcon/Theme'
export interface ThemeProps {
  genericTextColors: Themes.GenericTextColorsTheme,
  arrowIconColor: string,
  appSymbols: AppIconTheme.ThemeProps,
  listItem: Themes.ListItemTheme,
}

export const DEFAULT_THEME = {
  genericTextColors: Themes.GENERIC_TEXT_COLORS_THEME_DEFAULT,
  arrowIconColor: Themes.GENERIC_TEXT_COLORS_THEME_DEFAULT.textColor,
  appSymbols: AppIconTheme.DEFAULT_THEME,
  listItem: Themes.LIST_ITEM_DEFAULT_THEME,
}
