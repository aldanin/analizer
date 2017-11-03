import * as React from 'react'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

export enum SortOrders {
  DateAdded,
  TargetBirthday,
  RandomOrder,
  CoolnessLevel,
}

export interface SortMenuProps {
  sortOrder: SortOrders,
  onChange: (order: number) => void,
  textColor?: string,
}

const rootStyle = {
  verticalAlign: 'middle',
  fontSize: 'inherit',
  height: 'auto',
}
const lineStyle = {
  display: 'none',
}

const SortMenu: React.SFC<SortMenuProps> = ({ sortOrder, onChange, textColor }) => {
  const handleChange = (event, index, value: number) => onChange(value);

  return (
    <DropDownMenu
      value={sortOrder}
      onChange={handleChange}
      style={rootStyle}
      underlineStyle={lineStyle}
      labelStyle={{color: textColor}}
      iconStyle={{fill: textColor}}
    >
      <MenuItem value={SortOrders.DateAdded} primaryText="Date Added" />
      <MenuItem value={SortOrders.TargetBirthday} primaryText="Target Birthday" />
      <MenuItem value={SortOrders.RandomOrder} primaryText="Random Order" />
      <MenuItem value={SortOrders.CoolnessLevel} primaryText="Coolness Level" />
    </DropDownMenu>
  )
}

SortMenu.defaultProps = {
  textColor: 'pink'
}

export default SortMenu
