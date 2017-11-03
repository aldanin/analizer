import * as React from 'react'
import { ColumnDataProps } from '../../../Common/GridGeneric/definitions'
import * as AppSymbols  from '../../../../types/AppSymbols'
import * as Theme from '../../../Common/GridGeneric/Theme'
import * as Calls from '../../../../types/Calls'
import KnownIcon from '../../../Common/KnownIcons'

const getStatusIcon = (callType: Calls.CallTypes, theme: Theme.ThemeProps) => {
  let iconName;

  switch (callType) {
    case Calls.CallTypes.incomming:
      iconName = AppSymbols.APP_SYMBOLS.incomming;
      break;
    case Calls.CallTypes.outgoing:
      iconName = AppSymbols.APP_SYMBOLS.outgoing;
      break;
    case Calls.CallTypes.unanswered:
      iconName = AppSymbols.APP_SYMBOLS.unanswered;
      break;
    default:
      iconName = AppSymbols.APP_SYMBOLS.incomming;
      break;
  }

  const icon = <KnownIcon appSymbol={iconName}/>;
  return icon;
};

const CallTypemRenderer: React.SFC<ColumnDataProps> = (props) => {

  return getStatusIcon(props.rowData.type, props.theme);
}

export default CallTypemRenderer
