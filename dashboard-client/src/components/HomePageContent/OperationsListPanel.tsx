import * as React from 'react'

import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'

import * as Theme from './Theme'

import MenuItem from 'material-ui/MenuItem'

import { TargetData } from '../../types/Target'

import { OperationData, OperationId } from '../../types/Operation'

const ListContainer = styled.div`
  background-color: ${props => props.theme.listPanel.bgColor};
  margin: 20px 15px 20px;
  box-shadow: 0 0 17px rgba(0,0,0,0.2);
  min-width: 224px;
  overflow-x: hidden;
  overflow-y: auto;
`
const Divider = styled.hr`
  margin: 0;
  height: 1px;
  border: none;
  background-color: ${props => props.theme.listPanel.textColorLight};
`
const RightNum = styled.span`
  display: inline-block;
  padding: 0 30px 0 10px;
  color: ${props => props.theme.listPanel.textColorLight};
`

function getStyles(theme: Theme.ThemeProps) {
  return {
    itemStyle: {
      color: theme.listPanel.textColor,
      backgroundColor: theme.listPanel.bgColor,
      borderLeft: '5px solid transparent',
    },
    selectedItemStyle: {
      color: theme.listPanel.textColor,
      backgroundColor: theme.listPanel.bgColorSelected,
      borderLeft: '5px solid ' + theme.listPanel.accentColor,
    },
    headStyle: {
      color: theme.listPanel.textColor,
      cursor: 'inherit',
    }
  }
}

export interface OperationsListPanelProps extends React.Props<OperationsListPanel> {
  items: OperationData[],
  targets: TargetData[],
  isFetching: boolean,
  selectedId: OperationId,
  onItemSelected: (id: OperationId) => void,
  theme?: Theme.ThemeProps
}
export interface OperationsListPanelState {
}

class OperationsListPanel extends React.Component<OperationsListPanelProps, OperationsListPanelState> {
  static defaultProps: Partial<OperationsListPanelProps> = {
    theme: Theme.defaultTheme
  }

  styles = {
    itemStyle: {},
    selectedItemStyle: {},
    headStyle: {}
  }

  constructor (props: OperationsListPanelProps) {
    super(props)
    this.styles = getStyles(props.theme);

    this.state = {
    }
  }

  componentWillReceiveProps(nextProps: OperationsListPanelProps) {
    if (nextProps.theme !== this.props.theme) {
      this.styles = getStyles(nextProps.theme);
    }
  }

  handleSelect = (id: OperationId) => {
    this.props.onItemSelected(id)
  }

  countTargets = (targets) => (
    targets.reduce(
      function( acc: object , target: TargetData ) {
        acc[target.operationId] = acc[target.operationId] ? ++acc[target.operationId] : 1
        return acc ;
      },
      {}
    )
  )

  render() {
    const { theme, targets } = this.props

    const targetCounts = this.countTargets(targets)

    const { items, isFetching } = this.props
    let children
    if (isFetching) {
      children = (
        <MenuItem
          primaryText="Loading..."
          disabled={true}
        />
      )
    } else {
      if (items.length > 0) {
        children = items.map(item => (
          <MenuItem
            primaryText={item.name}
            onTouchTap={(ev) => {ev.preventDefault(); this.handleSelect(item.id)}}
            key={item.id}
            style={item.id === this.props.selectedId ? this.styles.selectedItemStyle : this.styles.itemStyle}
            rightIconButton={<RightNum>{targetCounts[item.id] ? targetCounts[item.id] : '0'}</RightNum>}
          />
        ))
      } else {
        children = (
          <MenuItem
            primaryText="No Operations Found"
            disabled={true}
          />
        )
      }
    }

    return (
      <ThemeProvider theme={theme}>
        <ListContainer>
          <MenuItem
            primaryText="All Operations"
            onTouchTap={() => null}
            key={'subheader'}
            style={this.styles.headStyle}
            rightIconButton={<RightNum style={{color: theme.listPanel.textColor}}>{targets.length}</RightNum>}
            disabled={true}
          />
          <Divider />
          {children}
        </ListContainer>
      </ThemeProvider>
    )
  }
}

export default OperationsListPanel
