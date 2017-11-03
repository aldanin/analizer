import * as TabTheme from '../Common/TabGeneric/Theme'
import * as CheckboxTheme from '../Common/Checkbox/Theme'
import * as TagTheme from '../Common/TagsList/Theme'
import * as StarTheme from '../Common/StarIcon/Theme'

export interface ThemeProps {
  textColor: string;
  tabsTheme: TabTheme.TabsThemeProps;
  tags: TagTheme.TagThemeProps,
  checkboxTheme: CheckboxTheme.CheckboxThemeProps,
  activeAccountsColor: CheckboxTheme.CheckboxThemeProps[];
  weeklyDateColor: string;
  agendaBorderColor: string;
  agendaLocationColor: string;
  agendaParticipantsColor: string;
  selectedItemColor: string;
  newItemColor: string;
  agendaHoverBgColor: string;
  agendaActionIconColor: string;
  agendaEmptyStarColor: string;
  agendaNotebookIconColor: string;
  weekGridTextColor: string;
  weekGridBorderColor: string;
  eventTag: TagTheme.TagThemeProps;
  gridActionIconColor: string;
  starColor: StarTheme.ThemeProps;
  eventHeaderColor: string;
  eventTitleColor: string;
  eventIconsColor: string;
  eventTextFirstColor: string;
  eventTextSecondColor: string;
  eventLabelsColor: string;
  eventBorderColor: string;
  eventCloseColor: string;
  switchAccountEnable: string;
  switchAccountDisable: string;
  eventIndicatorBgColor: string;
  eventIndicatorTextColor: string;
}

export const defaultTheme = {
  textColor: 'black',
  tabsTheme: TabTheme.DEFAULT_THEME,
  tags: TagTheme.DEFAULT_THEME,
  checkboxTheme: CheckboxTheme.DEFAULT_THEME,
  activeAccountsColor: [CheckboxTheme.DEFAULT_THEME],
  switchAccountEnable: 'blue',
  switchAccountDisable: 'grey',
  weeklyDateColor: 'blue',
  agendaBorderColor: 'red',
  agendaLocationColor: 'grey',
  agendaParticipantsColor: 'grey',
  selectedItemColor: 'royalblue',
  newItemColor: 'red',
  agendaHoverBgColor: 'grey',
  agendaActionIconColor: 'grey',
  agendaEmptyStarColor: 'grey',
  agendaNotebookIconColor: 'grey',
  weekGridTextColor: 'grey',
  weekGridBorderColor: 'grey',
  eventTag: TagTheme.DEFAULT_THEME,
  gridActionIconColor: 'grey',
  starColor: StarTheme.DEFAULT_THEME,
  eventHeaderColor: 'blue',
  eventTitleColor: 'blue',
  eventIconsColor: 'blue',
  eventTextFirstColor: 'blue',
  eventTextSecondColor: 'blue',
  eventLabelsColor: 'blue',
  eventBorderColor: 'blue',
  eventCloseColor: 'blue',
  eventIndicatorBgColor: 'yellow',
  eventIndicatorTextColor: 'white',
}
