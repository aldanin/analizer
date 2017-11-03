import * as React from 'react'
import { AgentId } from '../../types/Agent'
import GlobalStatusBar from '../../containers/GlobalStatusBar'
import theme from '../../theme/ScTheme'
import GlobalNavBarContainer from '../../containers/GlobalNavBar';

export interface HeaderProps {
  agentId: AgentId,
}

class Header extends React.Component<HeaderProps, {}> {
  constructor (props: HeaderProps) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
      <div className="header">
        <GlobalStatusBar agentId={this.props.agentId} theme={theme.header}/>
        <GlobalNavBarContainer theme={theme.globalNavBar}/>
      </div>
    )
  }
}

export default Header
