export interface TabsThemeProps {
  activeBgColor: string;
  activeTextColor: string;
  activeBorderColor: string;
  disActiveBgColor: string;
  disActiveTextColor: string;
  disActiveBorderColor: string;
  shadow?: string;
}

export const DEFAULT_THEME = {
  activeBgColor: '#FFFFFF',
  activeTextColor: '#27B8E2',
  activeBorderColor: '#27B8E2',
  disActiveBgColor: '#4DABC9',
  disActiveTextColor: '#FFFFFF',
  disActiveBorderColor: '#4DABC9',
  shadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
}
