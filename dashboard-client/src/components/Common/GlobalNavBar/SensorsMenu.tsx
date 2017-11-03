import * as React from 'react'
import * as Theme from './Theme'
import { withRouter } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon'
import Badge from 'material-ui/Badge'
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { btnLabelStyle, MenuIcon, MenuNumber } from './index';
import { buildURL, ViewPage } from '../../../urlHelper';
import LoadingThreeDots from '../LoadingThreeDots/index';
import { AgentUnreadProducts } from '../../../types/Agent';
import { browserHistory } from 'react-router';

// const SensorsMenuEntries = ['activity', 'snapshots', 'environmental', 'locations'];
const SensorsMenuEntries = ['snapshots', 'locations'];

export interface SensorsMenuProps {
  viewPageOpen: string;
  isFetching: boolean;
  total: number;
  pageNavigate: (page: string) => void;
  agent_id: string;
  data: AgentUnreadProducts;
  theme?: Theme.ThemeProps;
}

interface SensorsState {
  isOpen: boolean;
  anchorEl: HTMLElement | null;
}

class SensorsMenu extends React.Component<SensorsMenuProps, SensorsState> {
  static defaultProps: Partial<SensorsMenuProps> = {
    theme: Theme.defaultTheme
  }

  constructor(props: SensorsMenuProps) {
    super(props);

    this.state = {
      isOpen: false,
      anchorEl: null,
    }
  }

  handleMenuOpen = (anchorEl) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      isOpen: true,
      anchorEl: anchorEl,
    } as any);
  };

  handleRequestClose = () => {
    this.setState({
      isOpen: false,
    })
  };

  isPageOpen() {
    return (SensorsMenuEntries.indexOf(this.props.viewPageOpen.toLowerCase()) > -1)
  }

  renderProductIndicator(amount: number) {
    if (amount !== null) {return amount}
    return <LoadingThreeDots/>
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

  getMenuNumberColor(amountOfUnreadProducts: number) {
    if (amountOfUnreadProducts === 0) {return this.props.theme.menuTextColor}
    return this.props.theme.menuHighlightColor;
  }

  onMenuItemSelect(path: string, page: string) {
    this.setState({isOpen: false})
    this.props.pageNavigate(page);
    browserHistory.push(path);
  }

  renderFlatButton() {
    return (
      <FlatButton
        onTouchTap={(ev) => {this.handleMenuOpen(ev.currentTarget)}}
        style={this.getBtnStyle(this.isPageOpen())}
        labelStyle={btnLabelStyle}
        label="Sensors"
        labelPosition="before"
        icon={<FontIcon className="material-icons">arrow_drop_down</FontIcon>}
      />
    );
  }

  renderTrigger() {
    if (this.props.isFetching || (!this.props.total || this.props.total === 0) ) {
      return (
        <Badge
          style={{ padding: 0 }}
          badgeStyle={{
            top: 2,
            right: 30,
            width: 18,
            height: 18,
            fontSize: 9,
            backgroundColor: 'transparent',
            color: 'transparent',
          }}
          badgeContent={''}
        >
          {this.renderFlatButton()}
        </Badge>
      )
    }
    return (
      <Badge
        style={{ padding: 0 }}
        badgeStyle={{
          top: 2,
          right: 41,
          width: 18,
          height: 18,
          fontSize: 9,
          backgroundColor: this.props.theme.notificationBadge.bgColor,
          color: this.props.theme.notificationBadge.textColor,
        }}
        badgeContent={this.props.total}
      >
        {this.renderFlatButton()}
      </Badge>
    )
  }

  render() {
    return (
      <div>
        {this.renderTrigger()}
        <Popover
          open={this.state.isOpen}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={() => {this.handleRequestClose()}}
        >
          <Menu
            menuItemStyle={{color: this.props.theme.menuTextColor}}
            listStyle={{background: this.props.theme.menuBg}}
          >
            {/*<MenuItem*/}
              {/*leftIcon={<MenuIcon className="base_icons icon_pointer"/>}*/}
              {/*rightIcon={(*/}
                {/*<MenuNumber color={this.getMenuNumberColor(this.props.data.sensors.activity)}>*/}
                  {/*{this.renderProductIndicator((this.props.data.sensors.activity))}*/}
                {/*</MenuNumber>)}*/}
              {/*primaryText="Activity"*/}
              {/*onTouchTap = {() => this.onMenuItemSelect(*/}
                {/*buildURL({agent_id: this.props.agent_id, viewPage: ViewPage.ACTIVITY}),*/}
                {/*ViewPage.ACTIVITY)*/}
              {/*}*/}
            {/*/>*/}
            <MenuItem
              leftIcon={<MenuIcon className="base_icons icon_snapshots"/>}
              rightIcon={(
                <MenuNumber color={this.getMenuNumberColor(this.props.data.sensors.snapshots)}>
                  {this.renderProductIndicator((this.props.data.sensors.snapshots))}
                </MenuNumber>)}
              primaryText="Snapshots"
              onTouchTap={() => this.onMenuItemSelect(
                buildURL({agent_id: this.props.agent_id, viewPage: ViewPage.SNAPSHOTS}),
                ViewPage.SNAPSHOTS)
              }
            />
            {/*<MenuItem*/}
              {/*leftIcon={<MenuIcon className="base_icons icon_environmental_audio"/>}*/}
              {/*rightIcon={(*/}
                {/*<MenuNumber color={this.getMenuNumberColor(this.props.data.sensors.envAudio)}>*/}
                  {/*{this.renderProductIndicator((this.props.data.sensors.envAudio))}*/}
                {/*</MenuNumber>)}*/}
              {/*primaryText="Environmental Audio"*/}
              {/*onTouchTap = {() => this.onMenuItemSelect(*/}
                {/*buildURL({agent_id: this.props.agent_id, viewPage: ViewPage.ENVIRONMENTAL_AUDIO}),*/}
                {/*ViewPage.ENVIRONMENTAL_AUDIO)*/}
              {/*}*/}
            {/*/>*/}
            <MenuItem
              leftIcon={<MenuIcon className="base_icons icon_location"/>}
              rightIcon={(
                <MenuNumber color={this.getMenuNumberColor(this.props.data.sensors.locations)}>
                  {this.renderProductIndicator((this.props.data.sensors.locations))}
                </MenuNumber>)}
              primaryText="Locations"
              onTouchTap={() => this.onMenuItemSelect(
                buildURL({agent_id: this.props.agent_id, viewPage: ViewPage.LOCATIONS}),
                ViewPage.LOCATIONS)
              }
            />
          </Menu>
        </Popover>
      </div>
    )
  }
}

export default withRouter(SensorsMenu)

SensorsMenu.defaultProps = {
  theme: Theme.defaultTheme,
}
