import * as React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'

const ALL_VAL = 'all'

// render an item
const renderItem = (value, text, selectedValues) => (
  <MenuItem
    key={value}
    insetChildren={true}
    checked={selectedValues && selectedValues.indexOf(value) > -1}
    value={value}
    primaryText={text}
  />
)

// Special handling of 'all' item
const renderItemAll = (selectedValues) => (
  <MenuItem
    key={ALL_VAL}
    insetChildren={true}
    checked={selectedValues && selectedValues.length === 0}
    value={ALL_VAL}
    primaryText={'All'}
  />
)

export interface FilterMenuShowProps {
  values: string[],
  options: {
      value: string,
      text: string,
  }[]
  onChangeCb: (values: string[]) => void,
  [name: string]: any, // allow to pass props to underlying MUI component
}

const FilterMenuShow: React.SFC<FilterMenuShowProps> = ({ options, values, onChangeCb, children, ...rest }) => {
  // abstract the DOM event and add some logic
  const onChange = (event, index, newValues) => {
    if (newValues.indexOf(ALL_VAL) > -1) {
      // user selected 'all', so we reset the filter
      onChangeCb([])
    } else {
      onChangeCb(newValues)
    }
  }

  const selectionRenderer = (selectedValues) => {
    switch (selectedValues.length) {
      case 0:
        return 'All'
      case 1:
        const theOption = options.find((option) => option.value === selectedValues[0])
        return theOption ? theOption.text : 'One selected'
      default:
        return `${selectedValues.length} selected`
    }
  }

  return (
    <SelectField
      multiple={true}
      value={values}
      onChange={onChange}
      selectionRenderer={selectionRenderer}
      {...rest}
    >
      {renderItemAll(values)}
      <Divider/>
      <Subheader>Marked as:</Subheader>
      {options.map(option => renderItem(option.value, option.text, values))}
    </SelectField>
  )
}

export default FilterMenuShow
