import * as TagTheme from '../Common/TagsList/Theme'
import * as PhotoGridTheme from '../Common/PhotoGrid/Theme'
import * as FilterTheme from '../Common/AppViewFilterTool/Theme'

export interface ThemeProps {
  defaultColors: {
    textColor: string;
    bgColor: string;
    tags: TagTheme.TagThemeProps;
    photoGrid: PhotoGridTheme.PhotoGridThemeProps;
    appViewHeaderTool: {
      backgroundColor: string;
      iconViewColor: string;
      titleColor: string;
      textColor: string;
      watchColor: string;
      linkColor: string;
    },
    appViewFilterTool: FilterTheme.ThemeProps;
  },
  filter: {
    sortText: string;
    bgColor: string;
    dropDownArrowColor: string;
    sortBorderBottomColor: string;
  },
  photoDetails: {
    headerBgColor: string;
    bodyBgColor: string;
    labelTitleColor: string;
    labelTextColor: string;
    linkTextColor: string;
    zoomIconBgColor: string;
    iconColor: string;
    actionIconColor: string;
    imageBorderColor: string;
  },
  dialogBgColor: string;
}

export const DEFAULT_THEME: ThemeProps = {
  defaultColors: {
    textColor: 'purple',
    bgColor: 'lightskyblue',
    tags: TagTheme.DEFAULT_THEME,
    photoGrid: PhotoGridTheme.DEFAULT_THEME,
    appViewHeaderTool: {
      backgroundColor: 'white',
      iconViewColor: 'black',
      titleColor: 'black',
      textColor: 'rgb(174, 175, 176)',
      watchColor: 'rgb(174, 175, 176)',
      linkColor: 'rgb(115, 129, 179)',
    },
    appViewFilterTool: FilterTheme.DEFAULT_THEME,
  },
  filter: {
    sortText: 'violet',
    bgColor: 'white',
    dropDownArrowColor: 'purple',
    sortBorderBottomColor: 'violet',
  },
  photoDetails: {
    headerBgColor: 'lightgreen',
    bodyBgColor: 'snow',
    labelTitleColor: 'orange',
    labelTextColor: 'brown',
    linkTextColor: 'blue',
    zoomIconBgColor: '#9F9F9F',
    iconColor: 'red',
    actionIconColor: 'red',
    imageBorderColor: 'gold',
  },
    dialogBgColor: 'lightskyblue',
}
