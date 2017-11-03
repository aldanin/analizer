import * as React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import LoadingIndicator from '../components/Common/LoadingIndicator'
import { PRODUCT_TYPES } from '../types/Product'

interface AgentDashboardPageProps extends React.Props<AgentDashboardPage> {
  agentData: {
    name: string;
    id: string;
  };
  isFetching: boolean;
};

class AgentDashboardPage extends Component<AgentDashboardPageProps, {}> {
  render() {
    if (this.props.isFetching) {
      return <LoadingIndicator/>
    } else {
      if (this.props.agentData && this.props.agentData.name) {
        return <div>{`Agent ${this.props.agentData.name}`}</div>
      } else {
        return <div>Agent not found</div>
      }
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  // const agent = state[PRODUCT_TYPES.AGENTS].get('data')
  // const agent = {
  //   name: 'foo',
  //   id: '12345',
  // }
  const agentData = state[PRODUCT_TYPES.AGENTS].data.find(item => item.id === ownProps.params.agent_id)
  const isFetching = state[PRODUCT_TYPES.AGENTS].isFetching

  return {
    agentData,
    isFetching,
  }
}

export default connect(
  mapStateToProps,
  {}
)(AgentDashboardPage)
