import * as SearchBox from '../SearchBox/Theme'
import * as TextColors from './TextColors'

export interface ThemeProps {
  genericTextColors: TextColors.ThemeProps,
  searchBox: SearchBox.ThemeProps,
}

export const DEFAULT_THEME = {
  genericTextColors: TextColors.DEFAULT_THEME,
  searchBox: SearchBox.DEFAULT_THEME
}
