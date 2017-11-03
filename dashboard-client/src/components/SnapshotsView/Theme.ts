import * as TagTheme from '../Common/TagsList/Theme'
import * as PhotoGrid from '../Common/PhotoGrid/Theme'
import * as FilterTheme from '../Common/AppViewFilterTool/Theme'

export interface ThemeProps {
  appViewHeaderTool: {
    backgroundColor: string;
    iconViewColor: string;
    titleColor: string;
    textColor: string;
    watchColor: string;
    linkColor: string;
  },
  appViewFilterTool: FilterTheme.ThemeProps,
  photoGrid: PhotoGrid.PhotoGridThemeProps,
  gridActionIconColor: string;
  gridTagsTheme: TagTheme.TagThemeProps,

  photoDetails: {
    headerBgColor: string;
    bodyBgColor: string;
    labelTitleColor: string;
    labelTextColor: string;
    linkTextColor: string;
    zoomIconBgColor: string;
    iconColor: string;
    imageBorderColor: string;
    starColor: string;
    starBorderColor: string;
    actionIconColor: string;
    tagTheme: TagTheme.TagThemeProps
  }
}

export const DEFAULT_THEME: ThemeProps = {
  appViewHeaderTool: {
    backgroundColor: 'white',
    iconViewColor: 'black',
    titleColor: 'black',
    textColor: 'rgb(174, 175, 176)',
    watchColor: 'rgb(174, 175, 176)',
    linkColor: 'rgb(115, 129, 179)',
  },
  photoGrid: PhotoGrid.DEFAULT_THEME,
  appViewFilterTool: FilterTheme.DEFAULT_THEME,
  gridActionIconColor: 'red',
  gridTagsTheme: TagTheme.DEFAULT_THEME,

  photoDetails: {
    headerBgColor: 'red',
    bodyBgColor: 'red',
    labelTitleColor: 'red',
    labelTextColor: 'red',
    linkTextColor: 'red',
    zoomIconBgColor: 'red',
    iconColor: 'red',
    imageBorderColor: 'red',
    starColor: 'red',
    starBorderColor: 'red',
    actionIconColor: 'red',
    tagTheme: TagTheme.DEFAULT_THEME,
  }
}
