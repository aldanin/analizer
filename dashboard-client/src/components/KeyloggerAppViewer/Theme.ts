import * as TagTheme from '../Common/TagsList/Theme'
import * as TabTheme from '../Common/TabGeneric/Theme'
import * as CheckboxTheme from '../Common/Checkbox/Theme'

export interface ThemeProps {
  darkTextColor: string,
  lightTextColor: string,
  linkColor: string,
  bordersColor: string,
  detailsPaneHeaderBg: string,
  detailsPaneBg: string,
  detailsPaneContentBg: string,
  tags: TagTheme.TagThemeProps,
  tabs: TabTheme.TabsThemeProps,
  checkbox: CheckboxTheme.CheckboxThemeProps,
}

export const defaultTheme: ThemeProps = {
  darkTextColor: 'black',
  lightTextColor: '#bbb',
  linkColor: 'violet',
  bordersColor: '#ddd',
  detailsPaneHeaderBg: '#dadada',
  detailsPaneBg: '#f8f8f8',
  detailsPaneContentBg: '#fff',
  tags: TagTheme.DEFAULT_THEME,
  tabs: {
    activeBgColor: '#FFFFFF',
    activeTextColor: '#27B8E2',
    activeBorderColor: '#27B8E2',
    disActiveBgColor: '#FFF',
    disActiveTextColor: '#aaa',
    disActiveBorderColor: '#FFF',
    shadow: 'none',
  },
  checkbox: CheckboxTheme.DEFAULT_THEME,
}
