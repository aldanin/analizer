import * as NumberCircleTheme from '../Common/NumberCircle/Theme'
import * as GridGeneric from '../Common/GridGeneric/Theme'
import * as AppIcon from '../Common/AppIcon/Theme'

export interface ThemeProps {
  fontWeight: string,
  isFavorite: string,
  starColor: string,
  starBorderColor: string,
  seperationBorder: string,
  seperationBorderPale: string,
  checkbox: {
    bgColor: string,
    textColor: string,
    borderColor: string,
  },
  grid: GridGeneric.ThemeProps,
  additionalTheme: {
    numberCircle: NumberCircleTheme.ThemeProps,
  }
  chatArea: {
    bgColor: string,
    bgDetailsBar: string,
    borderColorDetailsBar: string
    // contactMessageBG: string,
  },
  bubbles: {
    targetMessageBGColor: string,
    targetMessageBorderColor: string;
    contactMessageBGColor: string,
    contactMessageBorderColor: string,
    dateBGColor: string,
    dateBorderColor: string,
    borderBottomColor: string,
    placeholderBGColor: string,
    placeholderBorderColor: string,
  },
  appSymbols: AppIcon.ThemeProps,
  genericTextColors: {
    textColor: string,
    textColorLink: string,
    textColorPale: string,
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
  }
}

export const DEFAULT_THEME = {
  fontWeight: 'normal',
  isFavorite: 'yellow',
  starColor: 'yellow',
  starBorderColor: 'black',
  seperationBorder: 'black',
  seperationBorderPale: 'silver',
  checkbox: {
    bgColor: 'white',
    textColor: 'black',
    borderColor: 'gray',
  },
  grid: GridGeneric.DEFAULT_THEME,
  additionalTheme: {
    numberCircle: NumberCircleTheme.defaultTheme,
  },
  chatArea: {
    bgColor: 'white',
    bgDetailsBar: 'white',
    borderColorDetailsBar: 'silver'
    // contactMessageBG: 'white',
  },
  bubbles: {
    targetMessageBGColor: '#beffa8',
    targetMessageBorderColor: 'green',
    contactMessageBGColor: 'white',
    contactMessageBorderColor: 'silver',
    dateBGColor: '#c9e1ff',
    dateBorderColor: '#eaeaea',
    borderBottomColor: '#a0a7bf',
    placeholderBGColor: 'rgba(255, 255, 255, 0.52)',
    placeholderBorderColor: '#ececec',
  },
  appSymbols: AppIcon.DEFAULT_THEME,
  genericTextColors: {
    textColor: '#263238',
    textColorPale: '#9fa1a2',
    textColorLink: 'blue'
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
  }
};
