import *  as React from 'react'
import { connect } from 'react-redux'
import { operationsLoad } from '../state/actions/Operations'
import { targetsLoadRequest } from '../state/actions/Targets'
import styled from 'styled-components'

import { OperationData } from '../types/Operation'
import { TargetData } from '../types/Target'
import { AgentData } from '../types/Agent'
import { PRODUCT_TYPES } from '../types/Product'

import HomePageContent from '../components/HomePageContent'
import GlobalStatusBar from './GlobalStatusBar'
import theme from '../theme/ScTheme'

const Wrapper = styled.div`
  margin: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

interface HomePageProps extends React.Props<HomePage> {
  operations: OperationData[],
  operationsIsFetching: boolean,
  targets: TargetData[],
  targetsIsFetching: boolean,
  agents: AgentData[],
  agentsIsFetching: boolean,
  initialFetchData: () => void,
};

class HomePage extends React.Component<HomePageProps, {}> {
  render() {
    const {
      operations,
      operationsIsFetching,
      targets,
      targetsIsFetching,
      agents,
      agentsIsFetching,
      initialFetchData
    } = this.props
    return (
      <Wrapper>
        <div className="header">
          <GlobalStatusBar theme={theme.header}/>
        </div>
        <HomePageContent
          operations={operations}
          operationsIsFetching={operationsIsFetching}
          targets={targets}
          targetsIsFetching={targetsIsFetching}
          agents={agents}
          agentsIsFetching={agentsIsFetching}
          initialFetchData={initialFetchData}
          theme={theme.homepage}
        />
      </Wrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {

  return {
    operations: state[PRODUCT_TYPES.OPERATIONS].data,
    operationsIsFetching: state[PRODUCT_TYPES.OPERATIONS].isFetching,
    targets: state[PRODUCT_TYPES.TARGETS].data,
    targetsIsFetching: state[PRODUCT_TYPES.TARGETS].isFetching,
    agents: state[PRODUCT_TYPES.AGENTS].data,
    agentsIsFetching: state[PRODUCT_TYPES.AGENTS].isFetching,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initialFetchData: () => {
      dispatch(operationsLoad())
      dispatch(targetsLoadRequest())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)
