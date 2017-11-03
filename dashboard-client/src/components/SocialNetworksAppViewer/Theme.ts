import * as TabTheme from '../Common/TabGeneric/Theme'
import * as TagTheme from '../Common/TagsList/Theme'

export interface ThemeProps {
  textColor: string,
  tags: TagTheme.TagThemeProps,
  tabs: TabTheme.TabsThemeProps,
  profileBgColor: string;
  infoBgColor: string;
  borderColor: string;
  profileTextColor: string;
  menuItemBgColor: string;
  menuItemHoverColor: string;
  selectedItemColor: string;
  newItemColor: string;
  newItemTextColor: string;
  messageBorderColor: string;
  commentBgColor: string;
  messageBgColor: string;
  messageIconsColor: string;
  messageImageBorder: string;
  linkColor: string;
  mentionBgColor: string;
  followBgColor: string;
  sortByColor: string;
  arrowColor: string;
  titleInsideDropDownMenuColor: string;
}

export const defaultTheme = {
  textColor: 'black',
  tags: TagTheme.DEFAULT_THEME,
  tabs: TabTheme.DEFAULT_THEME,
  profileBgColor: 'white',
  infoBgColor: 'grey',
  borderColor: 'grey',
  profileTextColor: 'grey',
  menuItemBgColor: 'white',
  menuItemHoverColor: 'yellow',
  selectedItemColor: 'lightskyblue',
  newItemColor: 'coral',
  newItemTextColor: 'white',
  messageBorderColor: 'black',
  commentBgColor: 'lightskyblue',
  messageBgColor: 'white',
  messageIconsColor: 'grey',
  messageImageBorder: 'grey',
  linkColor: 'blue',
  mentionBgColor: 'white',
  followBgColor: 'white',
  sortByColor: 'grey',
  arrowColor: 'blue',
  titleInsideDropDownMenuColor: 'blue',
}
