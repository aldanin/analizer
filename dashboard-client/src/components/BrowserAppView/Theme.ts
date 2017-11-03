import * as TagTheme from '../Common/TagsList/Theme'
import * as TabTheme from '../Common/TabGeneric/Theme'
import * as FilterTheme from '../Common/AppViewFilterTool/Theme'
import * as CheckboxTheme from '../Common/Checkbox/Theme'

export interface ThemeProps {
  defaultTextColor: string;
  linkColor: string;
  pipeColor: string;
  groupByColor: string;
  tags: TagTheme.TagThemeProps,
  tabs: TabTheme.TabsThemeProps,
  checkbox: CheckboxTheme.CheckboxThemeProps,
  browserIcon: string;
  expandIcon: string;
  collapseIcon: string;
  translateOnColor: string;
  translateOffColor: string;
  notebookOnColor: string;
  appViewHeaderTool: {
    backgroundColor: string;
    iconViewColor: string;
    titleColor: string;
    textColor: string;
    watchColor: string;
    linkColor: string;
  },
  appViewFilterTool: FilterTheme.ThemeProps

  bookmarks: {
    lineBgColor: string;
    iconColor: string;
    borderColor: string;
    arrowIconColor: string;
    folderIconColor: string;
    emptyFilesTextColor: string;
    starColor: string;
    starBorderColor: string;
    markerColor: string;
    newItemColor: string;
    hoverBgColor: string;
    checkBgColor: string;
    urlColor: string;
    extractedColor: string;
  }
  history: {
    lineBgColor: string;
    borderColor: string;
    titleColor: string;
    arrowColor: string;
    translateIconColor: string;
    timeColor: string;
    hoverBgColor: string;
    checkBgColor: string;
    filterColor: string;
    marker1Color: string;
    marker2Color: string;
    browserColor: string;
    actionIconColor: string;
    starBorderColor: string;
  }
}

export const DEFAULT_THEME: ThemeProps = {
  defaultTextColor: 'purple',
  browserIcon: 'purple',
  expandIcon: 'violet',
  collapseIcon: 'violet',
  translateOnColor: 'black',
  translateOffColor: 'grey',
  notebookOnColor: 'black',
  linkColor: 'violet',
  pipeColor: 'red',
  groupByColor: 'grey',
  tags: TagTheme.DEFAULT_THEME,
  tabs: TabTheme.DEFAULT_THEME,
  checkbox: CheckboxTheme.DEFAULT_THEME,
  appViewHeaderTool: {
    backgroundColor: 'white',
    iconViewColor: 'black',
    titleColor: 'black',
    textColor: 'rgb(174, 175, 176)',
    watchColor: 'rgb(174, 175, 176)',
    linkColor: 'rgb(115, 129, 179)',
  },

  appViewFilterTool: FilterTheme.DEFAULT_THEME,

  bookmarks: {
    lineBgColor: 'white',
    iconColor: 'grey',
    borderColor: 'black',
    arrowIconColor: 'red',
    folderIconColor: 'blue',
    emptyFilesTextColor: 'lightskyblue',
    starColor: 'orange',
    starBorderColor: 'brown',
    markerColor: 'red',
    newItemColor: 'red',
    hoverBgColor: 'green',
    checkBgColor: 'royalblue',
    urlColor: 'snow',
    extractedColor: 'teal',
  },
  history: {
    lineBgColor: 'white',
    borderColor: 'black',
    titleColor: 'blue',
    arrowColor: 'blue',
    translateIconColor: 'blue',
    timeColor: 'purple',
    hoverBgColor: 'green',
    checkBgColor: 'royalblue',
    filterColor: 'grey',
    marker1Color: 'blue',
    marker2Color: 'red',
    browserColor: 'grey',
    actionIconColor: 'grey',
    starBorderColor: 'brown',
  }
}
