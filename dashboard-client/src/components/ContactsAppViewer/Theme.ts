import * as GridGeneric from '../Common/GridGeneric/Theme'
import * as AppIcon from '../Common/AppIcon/Theme'

export interface ThemeProps {
  fontWeight: string,
  isFavorite: string,
  starColor: string,
  starBorderColor: string,
  checkbox: {
    bgColor: string,
    textColor: string,
    borderColor: string,
  },
  grid: GridGeneric.ThemeProps,
  detailsPane: {
    headerBgColor: string,
    bodyBgColor: string,
    pieOtherPart: string,
    pieFilledPart: string
  },
  appSymbols: AppIcon.ThemeProps,
  genericTextColors: {
    textColor: string,
    textColorLink: string,
    textColorPale: string,
    borderColor: string,
  },
  appViewHeaderTool: {
    backgroundColor: string;
    iconViewColor: string;
    titleColor: string;
    textColor: string;
    watchColor: string;
    linkColor: string;
  },
  appViewFilterTool: {
    backgroundColor: string;
    borderBottom: string;
    arrowColor: string;
    titleColor: string;
    titleInsideDropDownMenuColor: string;
    searchBorder: string;
    searchFocusColor: string;
    searchIconColor: string;
  },
  defaultAvatar: {
    backgroundColor: string;
    color: string;
  }
}

export const DEFAULT_THEME = {
  fontWeight: 'normal',
  isFavorite: 'yellow',
  starColor: 'yellow',
  starBorderColor: 'black',
  checkbox: {
    bgColor: 'white',
    textColor: 'black',
    borderColor: 'gray',
  },
  grid: GridGeneric.DEFAULT_THEME,
  detailsPane: {
    headerBgColor: '#E4E6F0',
    bodyBgColor: '#F1F4F4',
    pieOtherPart: '#B0B8D1',
    pieFilledPart: '#4E5467'
  },
  appSymbols: AppIcon.DEFAULT_THEME,
  genericTextColors: {
    textColorLink: 'black',
    textColorPale: '#9fa1a2',
    textColor: '#263238',
    borderColor: '#E9EDF6',
  },
  appViewHeaderTool: {
    backgroundColor: 'white',
    iconViewColor: 'black',
    titleColor: 'black',
    textColor: 'rgb(174, 175, 176)',
    watchColor: 'rgb(174, 175, 176)',
    linkColor: 'rgb(115, 129, 179)',
  },
  appViewFilterTool: {
    backgroundColor: 'white',
    borderBottom: 'rgb(225, 224, 224)',
    arrowColor: 'rgb(116, 131, 182)',
    titleColor: 'rgb(181, 182, 183)',
    titleInsideDropDownMenuColor: 'rgb(128, 141, 186)',
    searchBorder: 'rgb(197, 201, 216)',
    searchFocusColor: 'yellow',
    searchIconColor: 'rgb(108, 124, 178)',
  },
  defaultAvatar: {
    color: 'rgb(206, 208, 214)',
    backgroundColor: 'rgb(255, 255, 255)',
  }
};
