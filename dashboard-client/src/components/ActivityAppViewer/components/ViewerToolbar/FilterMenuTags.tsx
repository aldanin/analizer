import * as React from 'react'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem'
// import Divider from 'material-ui/Divider'

import { TagData, TagId } from '../../../../types/Tag'

const ALL_VAL = 'all'

// render a tag item
const renderItem = (name, value, selectedValues) => (
  <MenuItem
    key={value}
    insetChildren={true}
    checked={selectedValues && selectedValues.indexOf(value) > -1}
    value={value}
    primaryText={name}
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

export interface FilterMenuTagsProps {
  tags: TagData[],
  values: TagId[],
  onChangeCb: (values: TagId[]) => void,
  [name: string]: any, // allow to pass props to underlying MUI component
}

export interface FilterMenuTagsState {
  searchText: string,
}

// TODO: support for inner searching is hard to do with MUI
// optinally, need to use something like https://github.com/alsoscotland/react-super-select
class FilterMenuTags extends React.Component<FilterMenuTagsProps, FilterMenuTagsState> {

  constructor (props: FilterMenuTagsProps) {
    super(props)

    this.state = {
      searchText: ''
    }
  }

  // abstract the DOM event and add some logic
  onChange = (event, index, newValues) => {
    if (newValues.indexOf(ALL_VAL) > -1) {
      // user selected 'all', so we reset the filter
      this.props.onChangeCb([])
    } else {
      this.props.onChangeCb(newValues)
    }
  }

  selectionRenderer = (selectedValues) => {
    switch (selectedValues.length) {
      case 0:
        return 'All'
      case 1:
        const theTag = this.props.tags.find((tag) => tag === selectedValues[0])
        return theTag ? theTag : 'One selected'
      default:
        return `${selectedValues.length} selected`
    }
  }

  render() {
    const { tags, values, onChangeCb, children, ...rest } = this.props
    return (
      <SelectField
        multiple={true}
        value={values}
        onChange={this.onChange}
        selectionRenderer={this.selectionRenderer}
        {...rest}
      >
        {renderItemAll(values)}
        {tags.map((tag) => renderItem(tag, tag, values))}
      </SelectField>
    )
  }
}

export default FilterMenuTags
