import * as React from 'react'
import { connect } from 'react-redux'
import AgentsList from '../components/AgentsList/'
import Agent from '../components/AgentDetails/'
import LoadingIndicator from '../components/Common/LoadingIndicator'
import { PRODUCT_TYPES } from '../types/Product'

interface GlobalDashboardPageProps extends React.Props<GlobalDashboardPage> {
  agents: Array< {
      name: string;
      id: string;
      resourceId: string;
  }>;
  isFetching: boolean;
};

class GlobalDashboardPage extends React.Component<GlobalDashboardPageProps, {}> {
  renderAgent(agent: any) {
    return (
      <Agent
        agent={agent}
        key={agent.id}
      />
    )
  }

  render() {
    return (
      <div>
        <h1>Agents</h1>
        {this.props.isFetching ?
          <LoadingIndicator/> :
          <AgentsList agents={this.props.agents} />
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const agents = state[PRODUCT_TYPES.AGENTS].get('agentsData').toArray()
  const isFetching = state[PRODUCT_TYPES.AGENTS].get('loading')

  return {
    agents,
    isFetching,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalDashboardPage)
