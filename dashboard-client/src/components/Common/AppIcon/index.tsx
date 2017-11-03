import * as React from 'react'
import FontIcon from 'material-ui/FontIcon';
import * as Theme from './Theme'
import { AppSymbol } from '../../../types/AppSymbols'

export interface AppIconProps {
  appSymbol: AppSymbol;
  theme?: Theme.ThemeProps;
  style?: {};
}

let style: any = {
  fontSize: '1.8rem',
  marginRight: 12,
  verticalAlign: 'middle'
};

const AppIcon: React.SFC<AppIconProps> = (props) => {
  let finalStyle = Object.assign({}, style, props.style);

  const iconClass = props.appSymbol ? (props.appSymbol.icon || props.appSymbol.key) : '';
  finalStyle.color = props.appSymbol ? props.theme.colors[props.appSymbol.key] : 'black';
  const title = props.appSymbol ? props.appSymbol.caption : null;

  const icon = iconClass
    ? <FontIcon className={'base_icons icon_' + iconClass} style={finalStyle} title={title}/>
    : <span/>;

  return icon;
}

export default AppIcon

AppIcon.defaultProps = {style: {}}
