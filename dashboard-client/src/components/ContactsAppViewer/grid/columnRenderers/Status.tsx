import * as React from 'react'
import { ColumnDataProps } from '../../../Common/GridGeneric/definitions'
import { APP_SYMBOLS } from '../../../../types/AppSymbols'
import { EntityStatus } from '../../../../types/Enums'
import FontIcon from 'material-ui/FontIcon';
import * as Theme from '../../../Common/GridGeneric/Theme'

const getStatusIcon = (status: EntityStatus, theme: Theme.ThemeProps) => {
  let iconClass;

  const style: any = {
    paddingRight: 10,
    fontSize: '1.8rem',
    textOverflow: 'inherit'
  };

  switch (status) {
    case EntityStatus.created:
      iconClass = APP_SYMBOLS.created.icon;
      break;
    case EntityStatus.modified:
      iconClass = APP_SYMBOLS.modified.icon;
      break;
    case EntityStatus.accessed:
      iconClass = APP_SYMBOLS.accessed.icon;
      break;
    case EntityStatus.deleted:
      iconClass = APP_SYMBOLS.deleted.icon;
      break;
    default:
      break;
  }
  style.color = theme.genericTextColors.textColorPale;
  style.verticalAlign = 'middle';

  const icon = iconClass
    ? <FontIcon className={`base_icons icon_${iconClass}`} style={style}/>
    : null;
  return icon;
};

const StatusRenderer: React.SFC<ColumnDataProps> = (props) => {

  return getStatusIcon(props.rowData.status, props.theme);
}

export default StatusRenderer
