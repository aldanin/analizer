import * as React from 'react'
import { ColumnDataProps } from '../../../Common/GridGeneric/definitions'
import NumberCircle from '../../../Common/NumberCircle'
import * as CircleTheme from '../../../Common/NumberCircle/Theme'
import * as Helpers from '../../../../helpers/General'

const getCircle = (unreadMessageCount: number, theme: CircleTheme.ThemeProps) => {
  return (
    !Helpers.isNullOrUndefined(unreadMessageCount)
      ? (
        <NumberCircle
          theme={theme}
        >
          {unreadMessageCount}
        </NumberCircle>
      )
      : <span/>
  )
};

const UnreadMessagesCountRenderer: React.SFC<ColumnDataProps> = (props) => {
  const theme = props.additionalTheme.numberCircle;
  return getCircle(props.rowData.unreadMessageCount, theme);
}

export default UnreadMessagesCountRenderer
