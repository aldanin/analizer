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
  grid: {
    bgColor: string,
    bgColorRowActive: string,
    bgColorRowHover: string,
    rowBorder: string,
    tags: any,
    status: string
  },
  detailsPane: {
    headerBgColor: string,
    bodyBgColor: string,
    pieOtherPart: string,
    pieFilledPart: string
  },
  appSymbolColors: {
    phone: string,
    whatsapp: string,
    skype: string,
    mail: string,
    facebook: string,
  },
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

export const defaultTheme = {
  fontWeight: 'normal',
  isFavorite: 'yellow',
  starColor: 'yellow',
  starBorderColor: 'black',
  checkbox: {
    bgColor: 'white',
    textColor: 'black',
    borderColor: 'gray',
  },
  grid: {
    bgColor: 'white',
    bgColorRowActive: 'gray',
    bgColorRowHover: 'silver',
    rowBorder: 'silver',
    tags: {
      textColor: 'gray',
      borderColor: 'silver',
    },
    status: '#9fa1a2'
  },
  detailsPane: {
    headerBgColor: '#E4E6F0',
    bodyBgColor: '#F1F4F4',
    pieOtherPart: '#B0B8D1',
    pieFilledPart: '#4E5467'
  },
  appSymbolColors: {
    phone: '#3b4993',
    whatsapp: '#8ED370',
    skype: '#48bae7',
    mail: '#f35757',
    facebook: '#366bff',
  },
  genericTextColors: {
    textColorLink: 'black',
    textColorPale: '#9fa1a2',
    textColor: '#263238',
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
}
