export interface ThemeProps {
  textColor: string,
  bgColor: string;
  gridBgColor: string;
  gridTopBorderColor: string;
  gridBorderColor: string;
  subTitleColor: string;
  unreadProductsColor: string;
  readProductsColor: string;
  sortItemColor: string;
  statusBarHigh: string;
  statusBarMedium: string;
  statusBarLow: string;
  infoTitleBgColor: string;
  infoTitleTextColor: string;
  contactInfoIconColor: string;
  contactInfoViewColor: string;
  contactInfoTimeColor: string;
  contactInfoTitleColor: string;
  contactStatusBarHoverColor: string;
  gridShadow: string;
}

export const defaultTheme = {
  textColor: 'black',
  bgColor: '#f4f6fb',
  gridBgColor: 'white',
  gridTopBorderColor: '#44a8c7',
  gridBorderColor: '#e1e0e0',
  subTitleColor: '#a9a9a9',
  unreadProductsColor: '#44a8c7',
  readProductsColor: '#a9a9a9',
  sortItemColor: '#6576ae',
  statusBarHigh: '#167fa8',
  statusBarMedium: '#44a8c7',
  statusBarLow: '#9cd7e9',
  infoTitleBgColor: '#44a8c7',
  infoTitleTextColor: 'white',
  contactInfoIconColor: 'white',
  contactInfoViewColor: '#6576ae',
  contactInfoTimeColor: '#a9a9a9',
  contactInfoTitleColor: 'black',
  contactStatusBarHoverColor: 'a8abb2',
  gridShadow: 'rgba(23, 23, 23, 0.13)'
}
