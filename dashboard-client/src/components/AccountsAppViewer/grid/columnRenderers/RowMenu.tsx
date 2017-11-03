import * as React from 'react'
import { CellRendererParams } from 'react-virtualized';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// import {MenuIconTheme} from '../../../../theme/ScTheme'
import { AccountItem } from '../../../../types/Accounts'
import { ThemeProps } from '../../Theme'

const createRowMenu = (accountItem: AccountItem,
                       addTagCallback: Function,
                       theme: ThemeProps) => {
  const menu =
    (
      <IconMenu
        iconButtonElement={
        (
          <IconButton
            style={{
                width: 'auto',
                height: 'auto',
                padding: 0, }}
            iconStyle={{color: theme.genericTextColors.textColorPale}}
          >
            <MoreVertIcon style={{ color: theme.genericTextColors.textColorPale}} />
          </IconButton>)}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
      >
        <MenuItem primaryText="Add tag" onTouchTap={() => {addTagCallback(accountItem.id)}}/>
      </IconMenu>
    );
  return menu;
};

const RowMenuRenderer: React.SFC<CellRendererParams> = (props) => {
  const renderer = ({
    columnData,
    cellData,
    dataKey,
    rowData,
    rowIndex
  }: CellRendererParams): any => {
    return createRowMenu(rowIndex, columnData.addTag, columnData.theme);
  };

  return (
    renderer(props)
  )
};

export default RowMenuRenderer;
