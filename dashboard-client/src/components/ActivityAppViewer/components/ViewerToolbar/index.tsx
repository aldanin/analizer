import * as React from 'react'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import TabGeneric, { TabDetail } from '../../../Common/TabGeneric/'
import * as Theme from '../../Theme'
import styled, { withTheme } from 'styled-components'
import FilterMenuShow from './FilterMenuShow'
import FilterMenuTags from './FilterMenuTags'
import { Filters } from '../../../../types/GenericFilters'

const mockTags = ['anthrax', 'bio terror', 'bomb', 'boss', 'drug', 'family',
  'house', 'blouse', 'pants', 'dress'];

const SHOW_OPTIONS = [
  {value: 'important', text: 'Important'},
  {value: 'notImportant', text: 'Not Important'},
  {value: 'unmarked', text: '(unmarked)'},
  {value: 'unread', text: 'Unread'},
  {value: 'translated', text: 'Translated'},
  {value: 'inNotebook', text: 'Added to Notebook'},
]

const Label = styled.span`
  color: ${props => props.theme.toolbarTextColor};
  display: inline-block;
`
const SearchIcon = styled.i`
  font-size: 1.8rem;
  color: ${props => props.theme.toolbarSelectColor};
  margin-left: -1.8rem;
`

export interface ViewerToolbarProps extends React.Props<ViewerToolbar> {
  onTabSelected: (idx: number) => void,
  onFiltersChanged: (filters: Filters) => void,
  theme?: Theme.ThemeProps,
}
export interface ViewerToolbarState {
  menuShowValue: string[],
  menuTagsValue: string[],
  menuActionsValue: string,
  searchValue: string,
}

class ViewerToolbar extends React.Component<ViewerToolbarProps, ViewerToolbarState> {

  smStyleMain = {
    fontSize: 'inherit',
    width: 'auto', // might need something fixed
    textOverflow: 'ellipsis',
  }
  ddmStyleMain = {
    fontSize: 'inherit',
    width: 'auto',
    height: 'auto',
  }
  ddmStyleIcon = {
    color: 'blue',
    fill: 'blue',
  }
  ddmStyleLabel = {
    color: 'green',
    paddingLeft: '8px',
    paddingRight: '50px',
  }
  ddmStyleUnderline = {
    border: 'none'
  }

  tabsDetails: TabDetail[] = [
    {
      title: 'Story',
      callback: () => this.props.onTabSelected(0),
    }, {
      title: 'Key Logger',
      callback: () => this.props.onTabSelected(1),
    }, {
      title: 'Screenshots',
      callback: () => this.props.onTabSelected(2),
    }
  ]

  constructor (props: ViewerToolbarProps) {
    super(props)

    this.state = {
      menuShowValue: [],
      menuTagsValue: [],
      menuActionsValue: 'actions',
      searchValue: 'choo choo',
    }

    this.calcStyles(this.props.theme)
  }

  calcStyles = (theme) => {
    this.ddmStyleIcon.fill = theme.toolbarSelectColor;
    this.ddmStyleIcon.color = theme.toolbarSelectColor;
    this.ddmStyleLabel.color = theme.toolbarSelectColor;
  }

  indexArray(arr: Array<any>) {
    return arr.reduce(
      (acc, item) => {
        acc[item] = true;
        return acc;
      },
      {}
    )
  }

  getFiltersObject = (state: ViewerToolbarState) => {
    const selIndicators = this.indexArray(state.menuShowValue)
    const falseIndicators = {
      important: false,
      notImportant: false,
      unmarked: false,
      unread: false,
      translated: false,
      inNotebook: false,
    }

    return {
      search: state.searchValue,
      tags: state.menuTagsValue,
      indicators: Object.assign(falseIndicators, selIndicators)
    }
  }

  componentWillUpdate(nextProps: ViewerToolbarProps, nextState: ViewerToolbarState) {
    if (nextProps.theme !== this.props.theme) {
      this.calcStyles(nextProps.theme)
    }
    if (nextState !== this.state) {
      this.props.onFiltersChanged(this.getFiltersObject(nextState));
    }
  }

  handleChange = (key, value) => this.setState({[key]: value});

  render() {
    return (
      <Toolbar
        style={{
          background: this.props.theme.toolbarBackground,
          height: '4rem',
          minHeight: '4rem',
        }}
      >
        <ToolbarGroup firstChild={true} style={{padding: '1.4rem 1rem 1rem 2.7rem'}}>
          <TabGeneric
            tabs={this.tabsDetails}
            initialSelectedIndex={1}
            theme={this.props.theme.tabs}
          />
        </ToolbarGroup>
        <ToolbarGroup lastChild={true} style={{marginRight: '-12px'}}>
          <Label>Show:</Label>
          <FilterMenuShow
            values={this.state.menuShowValue}
            options={SHOW_OPTIONS}
            onChangeCb={(values) => {this.handleChange('menuShowValue', values)}}
            style={this.smStyleMain}
            iconStyle={this.ddmStyleIcon}
            labelStyle={this.ddmStyleLabel}
            underlineStyle={this.ddmStyleUnderline}
            autoWidth={true}
          />
          <Label>Tags:</Label>
          <FilterMenuTags
            tags={mockTags}
            values={this.state.menuTagsValue}
            onChangeCb={(values) => {this.handleChange('menuTagsValue', values)}}
            style={this.smStyleMain}
            iconStyle={this.ddmStyleIcon}
            labelStyle={this.ddmStyleLabel}
            underlineStyle={this.ddmStyleUnderline}
            autoWidth={true}
          />
          <DropDownMenu
            value={this.state.menuActionsValue}
            onChange={(event, index, value) => {this.handleChange('menuActionsValue', value)}}
            style={this.ddmStyleMain}
            iconStyle={this.ddmStyleIcon}
            labelStyle={this.ddmStyleLabel}
            underlineStyle={this.ddmStyleUnderline}
          >
            <MenuItem value="actions" primaryText="Actions" />
            <MenuItem value="nightly" primaryText="Every Night" />
            <MenuItem value={3} primaryText="Weeknights" />
            <MenuItem value={4} primaryText="Weekends" />
            <MenuItem value={5} primaryText="Weekly" />
          </DropDownMenu>
          <TextField
            id="search-input"
            value={this.state.searchValue}
            onChange={(event, index, value) => {this.handleChange('searchValue', value)}}
            style={this.ddmStyleMain}
            underlineStyle={{bottom: 0}}
          />
          <SearchIcon
            className="base_icons icon_search"
          />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default withTheme(ViewerToolbar)
