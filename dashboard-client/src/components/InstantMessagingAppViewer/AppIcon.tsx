import * as React from 'react'
import FontIcon from 'material-ui/FontIcon';
import * as Theme from './Theme'

export interface AppIconProps {
  iconKey: string,
  color?: string,
  size?: number,
  theme: Theme.ThemeProps;
}

const AppIcon: React.SFC<AppIconProps> = (props) => {
  let color = props.color ? props.color : (props.theme.appSymbols.colors[props.iconKey] || 'inherit');
  let iconClass = props.iconKey || '';
  const fontSize = props.size || 18;
  const top = fontSize === 18 ? 3 : '0';

  const style: any = {
    top: top,
    fontSize: fontSize,
    marginRight: 12
  };

  style.color = color;

  const icon = iconClass
    ? <FontIcon className={'base_icons icon_' + iconClass} style={style}/>
    : <span/>;

  return (
    icon
  )
}

AppIcon.defaultProps = {
  iconKey: '',
  color: null,
  size: 18,
  theme: Theme.DEFAULT_THEME
}

export default AppIcon
