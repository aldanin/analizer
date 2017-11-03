import * as React from 'react'
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'

import TooltipTrigger from './TooltipTrigger'
import AgentTooltip from './AgentTooltip'
import AgentTooltipContent from './AgentTooltipContent'
import { AgentCard } from './AgentCard'
import SortMenu, { SortOrders } from './SortMenu'
import LoadingIndicator from '../Common/LoadingIndicator'

import { TargetData } from '../../types/Target'
import { AgentData, AgentId } from '../../types/Agent'

import styled, { ThemeProvider } from 'styled-components'
import * as Theme from './Theme'

const Wrapper = styled.div`
  padding: 6rem 0;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  flex: 5;
  overflow: auto;
  position: relative;
`

const MenuBar = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  text-align: right;
  height: 6rem;
`

const MenuLabel = styled.span`
  vertical-align: middle;
  color: ${props => props.theme.dashboard.textColorLight};
`

export interface OperationDashboardProps extends React.Props<OperationDashboard> {
  targets: TargetData[],
  targetsIsFetching: boolean,
  agents: AgentData[],
  theme?: Theme.ThemeProps,
}

export interface OperationDashboardState {
  showTooltip: boolean,
  hoverAgentId: AgentId,
  hoverAnchorEl: Element,
  sortOrder: SortOrders,
}

class OperationDashboard extends React.Component<OperationDashboardProps, OperationDashboardState> {
  static defaultProps: Partial<OperationDashboardProps> = {
    theme: Theme.defaultTheme
  }

  agentElRefs = {}

  constructor (props: OperationDashboardProps) {
    super(props)

    this.state = {
      showTooltip: false,
      hoverAgentId: '',
      hoverAnchorEl: null,
      sortOrder: SortOrders.DateAdded,
    }
  }

  // mapAgentsToTargets = (targets, agents) => {
  //   let iTargets = new Map(targets.map((target) => [target.id, Object.assign({}, target, {agents: []})]));
  //   console.log(iTargets.get('1'))
  //   agents.forEach((agent) => {
  //     if (iTargets.get(agent.targetId) !== undefined) {
  //       iTargets.get(agent.targetId)['agents'].push(agent)
  //     }
  //   })
  //   return iTargets
  // }

  addAgentsToTargets = (targets, agents) => {
    let groupedAgents = new Map(targets.map((target) => [target.id, []]));
    agents.forEach((agent) => {
      if (groupedAgents.get(agent.targetId) !== undefined) {
        (groupedAgents.get(agent.targetId) as Array<any>).push(agent)
      }
    })
    return targets.map(target => Object.assign({}, target, {agents: groupedAgents.get(target.id)}))
  }

  onShow = (ev, id) => {
    const el = this.agentElRefs[id]
    this.setState({
      showTooltip: true,
      hoverAgentId: id,
      hoverAnchorEl: el,
    })
  }

  onHide = () => {
    this.setState({
      showTooltip: false
    })
  }

  onSortChange = (sortOrder) => {
    this.setState({
      sortOrder
    })
  }

  renderAgent = (agent, idx) => {
    return (
      <TooltipTrigger onShow={(ev) => this.onShow(ev, agent.id)} onHide={() => this.onHide()} key={idx}>
        <div ref={(el) => {this.agentElRefs[agent.id] = el}}>
          <AgentCard agent={agent} idx={idx} theme={this.props.theme}/>
        </div>
      </TooltipTrigger>
    )
  }

  renderNoAgents = () => {
    return (
      <div>
        <CardTitle
          title="No Agents"
        />
        <CardText>
          <p>
            No agents were found for this target
          </p>
        </CardText>
      </div>
    )
  }

  renderTarget = (target) => {
    const {theme} = this.props
    return (
      <Card
        key={target.id}
        style={{
          display: 'inline-block',
          margin: '0 20px 40px 5px',
          verticalAlign: 'top',
        }}
      >
        <CardHeader
          title={target.name}
          titleColor={theme.dashboard.cardHeadTextColor}
          textStyle={{verticalAlign: 'middle', padding: 0}}
          avatar={<AccountCircle style={{verticalAlign: 'middle'}}/>}
          style={{
            backgroundColor: 'transparent',
            backgroundImage: theme.dashboard.cardHeadBgImage,
            padding: '13px',
            borderRadius: '5px 5px 0 0',
          }}
        />
        {target.agents.length > 0 ?
          target.agents.map(this.renderAgent) :
          this.renderNoAgents()
        }
      </Card>
    )
  }

  render() {
    const { targetsIsFetching, targets, agents } = this.props
    let children

    if (targetsIsFetching) {
      children = <LoadingIndicator/>
    } else if (targets.length === 0) {
      children = <div>No targets found</div>
    } else {
      const iTargets = this.addAgentsToTargets(targets, agents)
      children = iTargets.map(item => this.renderTarget(item))
    }

    return (
      <ThemeProvider theme={this.props.theme}>
        <Wrapper>
          <MenuBar>
            {process.env.REACT_APP_IS_FILTERED_ENABLED ? (<MenuLabel>Sort by:</MenuLabel>) : null}
            {process.env.REACT_APP_IS_FILTERED_ENABLED ? (<SortMenu
              sortOrder={this.state.sortOrder}
              onChange={this.onSortChange}
              textColor={this.props.theme.dashboard.textColorCounter}
            />) : null}
          </MenuBar>
          {children}
          <AgentTooltip
            show={this.state.showTooltip}
            content={(
              <AgentTooltipContent
                agent={agents.find((agent) => agent.id === this.state.hoverAgentId)}
              />
            )}
            anchorEl={this.state.hoverAnchorEl}
          />
        </Wrapper>
      </ThemeProvider>
    )
  }
}

export default OperationDashboard
