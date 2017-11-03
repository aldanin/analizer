import * as React from 'react'
import styled from 'styled-components'

import * as Theme from './Theme'

import { OperationData, OperationId, EMPTY_OP_ID } from '../../types/Operation'
import { TargetData } from '../../types/Target'
import { AgentData } from '../../types/Agent'

import OperationsListPanel from './OperationsListPanel'
import OperationDashboard from './OperationDashboard'

interface WrapperProps {
  bgColor: string,
}
const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  background-color: ${(props: WrapperProps) => props.bgColor};
`

export interface HomePageProps extends React.Props<HomePage> {
  operations: OperationData[],
  operationsIsFetching: boolean,
  targets: TargetData[],
  targetsIsFetching: boolean,
  agents: AgentData[],
  agentsIsFetching: boolean,
  initialFetchData: () => void,
  theme?: Theme.ThemeProps
}

export interface HomePageState {
  selectedOperationId: OperationId
}

class HomePage extends React.Component<HomePageProps, HomePageState> {
  static defaultProps: Partial<HomePageProps> = {
    theme: Theme.defaultTheme
  }

  constructor (props: HomePageProps) {
    super(props)

    this.state = {
      selectedOperationId: ''
    }
  }

  componentDidMount() {
    this.props.initialFetchData()
  }

  componentWillReceiveProps(nextProps: HomePageProps) {
    if (nextProps.operations !== this.props.operations) {
      if (nextProps.operations.length > 0) {
        // we have operations
        if (this.state.selectedOperationId === EMPTY_OP_ID) {
          // none is selected, so select first one
          this.setState({
            selectedOperationId: nextProps.operations[0].id,
          })
        }
      } else if (this.state.selectedOperationId !== EMPTY_OP_ID) {
        // no operations, but one is selected, need to deselect
        this.setState({
          selectedOperationId: EMPTY_OP_ID,
        })
      }
    }
  }

  handleOperationSelected = (id: OperationId) => {
    this.setState({
      selectedOperationId: id,
    })
  }

  render() {
    const { operations, operationsIsFetching, agents, targets, targetsIsFetching, theme } = this.props
    const selectedTargets = this.props.targets.filter(item => item.operationId === this.state.selectedOperationId)

    return (
      <Wrapper bgColor={theme.bgColor}>
        <OperationsListPanel
          isFetching={operationsIsFetching}
          items={operations}
          selectedId={this.state.selectedOperationId}
          onItemSelected={this.handleOperationSelected}
          theme={theme}
          targets={targets}
        />
        <OperationDashboard
          targetsIsFetching={targetsIsFetching}
          targets={selectedTargets}
          agents={agents}
          theme={theme}
        />
      </Wrapper>
    )
  }
}

export default HomePage
