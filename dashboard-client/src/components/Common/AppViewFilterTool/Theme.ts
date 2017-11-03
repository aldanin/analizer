export interface ThemeProps {
  backgroundColor: string;
  borderBottom: string;
  arrowColor: string;
  titleColor: string;
  titleInsideDropDownMenuColor: string;
  searchBorder: string;
  searchFocusColor: string;
  searchIconColor: string;
  actionMenuIconColor: string;
  actionMenuTextColor: string;
  selectedBackground: string;
  clearAllTextColor: string;
}

export const DEFAULT_THEME: ThemeProps = {
  backgroundColor: 'white',
  borderBottom: 'rgb(225, 224, 224)',
  arrowColor: 'rgb(116, 131, 182)',
  titleColor: 'rgb(181, 182, 183)',
  titleInsideDropDownMenuColor: 'rgb(128, 141, 186)',
  searchBorder: 'rgb(197, 201, 216)',
  searchFocusColor: 'yellow',
  searchIconColor: 'rgb(108, 124, 178)',
  actionMenuIconColor: '#A0A7BF',
  actionMenuTextColor: '#627892',
  selectedBackground: '#e3f8fc',
  clearAllTextColor: '#627892',

}
