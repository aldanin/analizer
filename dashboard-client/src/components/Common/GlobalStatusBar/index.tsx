import * as React from 'react'
import { Link } from 'react-router'
import Loader from './Loader'
// import * as moment from 'moment'
import { AgentData } from '../../../types/Agent'

import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'

import FontIcon from 'material-ui/FontIcon'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import FlatButton from 'material-ui/FlatButton';

import * as Theme from './Theme'
// import NotificationsDrawer from './NotificationsDrawer'
import UserLinks from './UserLinks'

const Wrapper = styled.div`
  color: ${props => props.theme.textColor};
  background-image: ${props => props.theme.backgroundImage};
  background-size: cover;
  background-position: 0 0;
  font-size: 1.4rem;
`
export interface GlobalStatusBarProps {
  agentData: AgentData,
  isLoggedIn: boolean,
  isHomePage: boolean;
  userName: string,
  isGlobalFetching: boolean,
  doLogout: (ev: MouseEvent | TouchEvent) => void,
  loadInitialNotifications: () => void,
  notificationsUnreadCount: number,
  theme?: Theme.ThemeProps,
}

export interface GlobalStatusBarState {
  isUserMenuOpen: boolean,
  anchorEl: HTMLElement | null,
}

class GlobalStatusBar extends React.Component<GlobalStatusBarProps, GlobalStatusBarState> {

  static defaultProps: Partial<GlobalStatusBarProps> = {
    theme: Theme.defaultTheme
  }

  constructor(props: GlobalStatusBarProps) {
    super(props);

    this.state = {
      isUserMenuOpen: false,
      anchorEl: null,
    };
  }

  componentDidMount() {
    this.props.loadInitialNotifications()
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      isUserMenuOpen: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      isUserMenuOpen: false,
    });
  };

  renderUserLinks = () => {
    const { isLoggedIn, userName, doLogout} = this.props
    return (
      <UserLinks
        isLoggedIn={isLoggedIn}
        userName={userName}
        doLogout={doLogout}
      />
    )
  }

  renderAgentDetails = (agentData) => {
    const Highlight = styled.span`
      color: ${props => props.theme.highlightColor};
      margin-right: 4rem;
    `
    return (
      <span>
        <Highlight>{agentData.name}</Highlight>
        <span className="status">
          {/*Last extraction {moment(agentData.status.lastExtract).fromNow()} */}
        </span>
      </span>
    )
  }

  renderLeftGroup = (agentData) => {
    return (
      <ToolbarGroup firstChild={true}>
        {this.renderHomeButton(agentData)}
        {this.renderAgentName(agentData)}
      </ToolbarGroup>
    )
  }

  renderHomeButton = (agentData) => {
    const { theme } = this.props
    return (
      <FlatButton
        label="Home"
        icon={<FontIcon className="material-icons">home</FontIcon>}
        containerElement={<Link to="/" />}
        style={{
          color: theme.textColor,
          border: `1px solid ${theme.textColor}`,
          margin: '0 2rem',
        }}
      />
    )
  }

  renderAgentName = (agentData) => {
    return (
      <div>{agentData ? this.renderAgentDetails(agentData) : null}</div>
    )
  }

  render() {
    const { agentData, isGlobalFetching/*, notificationsUnreadCount*/} = this.props
    const { theme } = this.props

    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Toolbar
            style={{
              backgroundColor: 'transparent',
              height: '6rem',
            }}
          >
            {!this.props.isHomePage ? this.renderLeftGroup(agentData) : null}
            <ToolbarGroup>
              {isGlobalFetching ? <Loader seconds={10}/> : null}
            </ToolbarGroup>
            {/*
            <ToolbarGroup lastChild={true}>
              <NotificationsDrawer
                unreadCount={notificationsUnreadCount}
              />
              {this.renderUserLinks()}
            </ToolbarGroup>
            */}
          </Toolbar>
        </Wrapper>
      </ThemeProvider>
    )
  }
}

export default GlobalStatusBar
