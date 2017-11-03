import styled from 'styled-components';
import * as Theme from './Theme'

export const Title = styled.span`
  font-size: 13px;
  color: ${prop => prop.theme.subTitleColor};
  margin-bottom: 20px;
`;

export const UnreadContainer = styled.span`
  display: block;
  text-align: right;
  position: absolute;
  right: 53px;
  font-size: 13px;
  color: ${prop => prop.color};
`;

export const AppTitle = styled.span`
  display: inline-block;
  width: 100%;
  font-size: 13px;
  padding-right: 10px;
  white-space: nowrap;
  overflow:hidden !important;
  text-overflow: ellipsis;
  color: ${prop => prop.theme.textColor}
`;

export const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  padding: 25px 0 0 0;
  text-indent: 30px;
`;

export const AppContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  margin-bottom: 15px;
  text-indent: 0;
`;

export const AppIcon = styled.span`
  position: relative;
  top: -2px;
  text-indent: 35px;
  padding-right: 10px;
`;

export const SensorAndDeviceUnreadContainer = styled.span`
  display: block;
  text-align: right;
  position: absolute;
  right: 20px;
  font-size: 13px;
  color: ${prop => prop.color};
`;

export function getTextColor(unread: number, myTheme: Theme.ThemeProps) {
  if (unread === 0) { return myTheme.readProductsColor; }
  return myTheme.unreadProductsColor;
}
