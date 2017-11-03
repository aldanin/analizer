import * as React from 'react'
import { CellRendererParams } from 'react-virtualized';
import { isDefaultPassword, AccountItem } from '../../../../types/Accounts'
import { ThemeProps } from '../../Theme'

const getPassword = (item: AccountItem, theme: ThemeProps) => {
  let pw;

  if (item.password) {
    if (isDefaultPassword(item.password)) {
      pw = (
        <span
          style={{
            fontStyle: 'italic',
            color: theme.genericTextColors.textColorPale
          }}
        >
          {'Conflicted Password'}
        </span>
      )
    } else {
      pw = <span style={{ color: theme.genericTextColors.textColor}}>{item.password.value}</span>
    }
  } else {
    pw = <span/>;
  }
  return pw;
};

const PasswordRenderer: React.SFC<CellRendererParams> = (props) => {

  const renderer = ({
    columnData,
    rowData,
  }: CellRendererParams): any => {
    return getPassword(rowData, columnData.theme);
  };

  return (
    renderer(props)
  )
};

export default PasswordRenderer;
