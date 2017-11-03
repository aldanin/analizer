export interface ThemeProps {
  bgColorRowActive: string,
  bgColorRowHover: string,
  checkedColor?: string;
  readMarkColor?: string;
  unreadMarkColor?: string;
  rowBorder?: string;
}

export const defaultTheme = {
  bgColor: 'white',
  bgColorRowActive: 'gray',
  bgColorRowHover: 'silver',
  rowBorder: 'silver',
  tags: {
    textColor: 'gray',
    borderColor: 'silver',
  },
  status: '#9fa1a2'
};
