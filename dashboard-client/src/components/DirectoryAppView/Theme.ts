import * as TagTheme from '../Common/TagsList/Theme'
import * as TabTheme from '../Common/TabGeneric/Theme'
import * as RadiosTheme from '../Common/RadiosGeneric/Theme'
import * as CheckboxTheme from '../Common/Checkbox/Theme'
import * as FilterTheme from '../Common/AppViewFilterTool/Theme'
import * as TreeNodeTheme from '../Common/TreeNode/Theme'
import * as AppIconTheme from '../Common/AppIcon/Theme'
import * as VGridTheme from '../Common/VGrid/Theme'
import * as DateChooser from '../Common/DateChooser/Theme'

export interface ThemeProps {
  defaultTextColor: string;
  linkColor: string;
  pipeColor: string;
  groupByColor: string;
  tags: TagTheme.TagThemeProps,
  tabs: TabTheme.TabsThemeProps,
  radios: RadiosTheme.RadiosThemeProps,
  checkbox: CheckboxTheme.CheckboxThemeProps,
  starColor: string,
  starBorderColor: string,
  expandIcon: string;
  collapseIcon: string;
  extractedColor: string;
  translateOnColor: string;
  translateOffColor: string;
  notebookOnColor: string;
  borderColor: string;
  appViewHeaderTool: {
    backgroundColor: string;
    iconViewColor: string;
    titleColor: string;
    textColor: string;
    watchColor: string;
    linkColor: string;
  },
  appViewFilterTool: FilterTheme.ThemeProps,
  folderIconColor: string,
  grid: VGridTheme.ThemeProps,
  detailsPane: {
    headerBgColor: string,
    bodyBgColor: string,
    previewBgColor: string
  },
  appSymbols: AppIconTheme.ThemeProps,
  genericTextColors: {
    textColor: string,
    textColorLink: string,
    textColorPale: string,
    borderColor: string,
  },
  treeNode: TreeNodeTheme.ThemeProps,
  dateChooser: DateChooser.ThemeProps
}

const defaultTextColor = '#263238';
const defaultTextColorPale = '#9fa1a2';

export const DEFAULT_THEME: ThemeProps = {
  defaultTextColor: 'purple',
  expandIcon: 'violet',
  collapseIcon: 'violet',
  translateOnColor: defaultTextColor,
  translateOffColor: defaultTextColorPale,
  notebookOnColor: defaultTextColor,
  linkColor: 'violet',
  extractedColor: 'teal',
  pipeColor: 'red',
  groupByColor: 'grey',
  tags: TagTheme.DEFAULT_THEME,
  tabs: TabTheme.DEFAULT_THEME,
  radios: RadiosTheme.DEFAULT_THEME,
  checkbox: CheckboxTheme.DEFAULT_THEME,
  starColor: 'yellow',
  starBorderColor: 'black',
  borderColor: 'silver',
  appViewHeaderTool: {
    backgroundColor: 'white',
    iconViewColor: defaultTextColor,
    titleColor: defaultTextColor,
    textColor: 'rgb(174, 175, 176)',
    watchColor: 'rgb(174, 175, 176)',
    linkColor: 'rgb(115, 129, 179)',
  },
  appViewFilterTool: FilterTheme.DEFAULT_THEME,
  folderIconColor: '#627892',
  grid: VGridTheme.DEFAULT_THEME,
  detailsPane: {
    headerBgColor: '#E4E6F0',
    bodyBgColor: '#F1F4F4',
    previewBgColor: 'ffffff',
  },
  appSymbols: AppIconTheme.DEFAULT_THEME,
  genericTextColors: {
    textColorLink: defaultTextColor,
    textColorPale: defaultTextColorPale,
    textColor: defaultTextColor,
    borderColor: '#E9EDF6',
  },
  treeNode: TreeNodeTheme.DEFAULT_THEME,
  dateChooser: DateChooser.DEFAULT_THEME

}
