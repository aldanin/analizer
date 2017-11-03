import * as React from 'react'
import { connect } from 'react-redux'

import Header from '../components/Header'
import Timeline from '../components/Timeline'
import Notebook from '../components/InformationPanel'
import { AgentId } from '../types/Agent'

import styled from 'styled-components'
import theme from '../theme/ScTheme'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`
const WrapperMain = styled.div`
  flex: 2;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`
const WrapperViewer = styled.div`
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
`

interface AppViewerLayoutProps extends React.Props<any> {
  agentId: AgentId
};

class AppViewerLayout extends React.Component<AppViewerLayoutProps, {}> {

  render() {
    const { children, agentId } = this.props

    return (
      <Wrapper>
        <Header agentId={agentId}/>
        <WrapperMain>
          <Timeline theme={theme.timeline}/>
          <WrapperViewer>
            {children}
          </WrapperViewer>
          <Notebook theme={theme.notebook}/>
        </WrapperMain>
      </Wrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    agentId: ownProps.params.agent_id,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppViewerLayout)
