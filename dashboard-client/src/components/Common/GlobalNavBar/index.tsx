import * as React from 'react'
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar'
import FlatButton from 'material-ui/FlatButton';
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'

import * as Theme from './Theme'
import { Link } from 'react-router/';
import { withRouter } from 'react-router/';
import { AgentUnreadProducts } from '../../../types/Agent';
import { getViewPageFromURL, ParamsData, ViewPage, buildURL } from '../../../urlHelper';
import UserAppsMenuComponent from './UserAppsMenu'
import SensorsMenuComponent from './SensorsMenu'
import DeviceSystemMenuComponent from './DeviceSystemMenu'
// import { browserHistory } from 'react-router';

const Wrapper = styled.div`
  background-image: ${props => props.theme.backgroundImage};
  background-size: cover;
  background-position: 0 0;
  font-size: 1.4rem;
`

export const MenuNumber = styled.div`
  color: ${prop => prop.color};
  line-height: 24px;
  width: 100px;
  text-align: right;
  float: left;
`

export const MenuIcon = styled.i`
  line-height: 24px;
  text-align: center;
  font-size: 18px;
`

// const MenuParent = styled.div`
//   position: relative;
// `;

export interface GlobalNavBarProps {
  agentId: number;
  isFetching: boolean;
  pageOpen: string;
  pageNavigate: (page: string) => void;
  data: AgentUnreadProducts;
  theme?: Theme.ThemeProps;
  params?: ParamsData;
}

export interface GlobalNavBarState {
  viewPageOpen: string;
}

export const btnLabelStyle = {padding: '0 9px'};

class GlobalNavBar extends React.Component<GlobalNavBarProps, GlobalNavBarState> {

  static defaultProps: Partial<GlobalNavBarProps> = {
    theme: Theme.defaultTheme,
    params: {
      agent_id: 'Game Of Thrones',
    }
  }

  constructor(props: GlobalNavBarProps) {
    super(props);

    this.state = {
      viewPageOpen: this.props.pageOpen,
    };
  }

  componentWillReceiveProps() {
    this.setState({
      viewPageOpen: getViewPageFromURL(location),
    })
  }

  getBtnStyle = (isSelected: boolean = false) => {
    const {theme} = this.props
    return {
      margin: '0 14px',
      color: isSelected ? theme.highlightColor : theme.textColor,
      borderBottom: '4px solid ' + (isSelected ? theme.highlightColor : 'transparent'),
      borderRadius: '0',
      height: '4rem',
    }
  }

  isSummaryPageOpen() {
    return (this.state.viewPageOpen === 'summary')
  }

  render() {
    const { theme } = this.props
    const separatorStyle = {
      backgroundColor: theme.textColor,
      height: '1.8rem',
      margin: '0 1.4rem',
    }

    return (
      <ThemeProvider theme={this.props.theme}>
        <Wrapper>
          <Toolbar
            style={{
              justifyContent: 'center',
              backgroundColor: 'transparent',
              height: '4rem',
            }}
          >
            <ToolbarGroup>
              <FlatButton
                style={this.getBtnStyle(this.isSummaryPageOpen())}
                labelStyle={btnLabelStyle}
                containerElement={
                  <Link to={buildURL({agent_id: this.props.params.agent_id, viewPage: ViewPage.SUMMARY})}/>}
                label="Summary"
              />
              <UserAppsMenuComponent
                agent_id={this.props.params.agent_id}
                isFetching={this.props.isFetching}
                viewPageOpen={this.state.viewPageOpen}
                total={this.props.data.productSum.userApps}
                pageNavigate={this.props.pageNavigate}
                data={this.props.data}
                theme={this.props.theme}
              />
              <ToolbarSeparator style={separatorStyle}/>
              <SensorsMenuComponent
                agent_id={this.props.params.agent_id}
                isFetching={this.props.isFetching}
                viewPageOpen={this.state.viewPageOpen}
                total={this.props.data.productSum.sensors}
                pageNavigate={this.props.pageNavigate}
                data={this.props.data}
                theme={this.props.theme}
              />

              <DeviceSystemMenuComponent
                agent_id={this.props.params.agent_id}
                isFetching={this.props.isFetching}
                viewPageOpen={this.state.viewPageOpen}
                total={this.props.data.productSum.deviceSystem}
                pageNavigate={this.props.pageNavigate}
                data={this.props.data}
                theme={this.props.theme}
              />

              {/*<ToolbarSeparator style={separatorStyle}/>*/}
              {/*<FlatButton*/}
              {/*style={this.getBtnStyle(this.props.pageOpen === ViewPage.CONTROL)}*/}
              {/*labelStyle={btnLabelStyle}*/}
              {/*label="Control"*/}
              {/*/>*/}
            </ToolbarGroup>
          </Toolbar>
        </Wrapper>
      </ThemeProvider>
    )
  }
}

export default withRouter(GlobalNavBar);
