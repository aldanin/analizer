export interface ThemeProps {
  genericTextColors: {
    textColor: string,
    textColorLink: string,
    textColorPale: string,
    borderColor: string,
  },
}

const defaultTextColor = '#263238';
const defaultTextColorPale = '#9fa1a2';

export const DEFAULT_THEME = {
  genericTextColors: {
    textColorLink: defaultTextColor,
    textColorPale: defaultTextColorPale,
    textColor: defaultTextColor,
    borderColor: '#E9EDF6',
  },
}
