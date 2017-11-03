import * as React from 'react'
import * as Theme from './Theme'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { withTheme } from 'styled-components';

const style = {
  underLine: {
    border: 'none',
  },

  label: {
  },

  icon: {
  },
}

export interface MostActiveSortProps {
  contactFilter: number;
  onSortOptionSelect: (sortFilter: number) => void;
  theme?: Theme.ThemeProps;
}

const MostActiveSort: React.SFC<MostActiveSortProps> = ({ contactFilter, onSortOptionSelect, theme }) => { {
  style.label = {
    color: theme.sortItemColor,
    fontSize: '12px',
    lineHeight: '21px',
    paddingRight: '19px'
  };
  style.icon = {
    fill: theme.sortItemColor,
    top: '-14px',
    right: '-17px'
  }

  return (
    <DropDownMenu
      value={contactFilter}
      onChange={(event, index, value) => {onSortOptionSelect(value)}}
      underlineStyle={style.underLine}
      labelStyle={style.label}
      iconStyle={style.icon}
    >
      <MenuItem value={0} primaryText="Last 12 hrs"/>
      <MenuItem value={1} primaryText="Last 24 hrs"/>
      <MenuItem value={2} primaryText="Last 2 days"/>
      <MenuItem value={3} primaryText="Last 4 days"/>
      <MenuItem value={4} primaryText="Last week"/>
    </DropDownMenu>
);
  }
}

export default withTheme(MostActiveSort);
