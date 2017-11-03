import * as React from 'react'
import FontIcon from 'material-ui/FontIcon';
import { ThemeProps } from './Theme'
import { AppSymbol } from '../../../../types/AppSymbols'

export interface ClickableIconProps {
  onClick: (ev: any) => void;
  appSymbol: AppSymbol;
  theme?: ThemeProps;
}

const ClickableIcon: React.SFC<ClickableIconProps> = (props) => {
  const color = props.appSymbol ? props.theme.colors[props.appSymbol.key] : 'black';
  const iconClass = props.appSymbol ? (props.appSymbol.icon || props.appSymbol.key) : '';

  const style: any = {
    fontSize: '1.8rem',
  };

  style.color = color;
  const icon = iconClass
    ? (
      <span onClick={props.onClick}>
        <FontIcon className={'base_icons icon_' + iconClass} style={style}/>
      </span>
    )
    : <span/>;
  return icon;
}

export default ClickableIcon
