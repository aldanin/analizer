import * as React from 'react'
import { connect } from 'react-redux'

import Header from '../components/Header'
import Timeline from '../components/Timeline'
import Information from '../components/InformationPanel'
import { AgentId } from '../types/Agent'

import styled from 'styled-components'
import theme from '../theme/ScTheme'

// const Wrapper = styled.div`
//   width: 100%;
//   height: 100%;
// `
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr auto;
  grid-template-areas: "header header header"
                       "timeline main notebook";
`
const HeaderArea = styled.div`
  grid-area: header;
`
const TimelineArea = styled.div`
  grid-area: timeline;
`
const MainArea = styled.div`
  grid-area: main;
  overflow: auto;
`
const NotebookArea = styled.div`
  grid-area: notebook;
`
// ----
// const WrapperMain = styled.div`
//   flex: 2;
//   display: flex;
//   flex-direction: row;
//   overflow: hidden;
// `
// const WrapperViewer = styled.div`
//   flex: 1;
//   overflow: auto;
//   display: flex;
//   flex-direction: column;
// `

interface AppViewerLayoutProps extends React.Props<any> {
  agentId: AgentId
};

class AppViewerLayout extends React.Component<AppViewerLayoutProps, {}> {

  render() {
    const { children, agentId } = this.props

    return (
      <Wrapper>
        <HeaderArea>
          <Header agentId={agentId}/>
        </HeaderArea>
        <TimelineArea>
          <Timeline theme={theme.timeline}/>
        </TimelineArea>
        <MainArea>
            {children}
        </MainArea>
        <NotebookArea>
          <Information theme={theme.notebook}/>
        </NotebookArea>
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
