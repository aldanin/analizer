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

// const UserAppsMenuEntries = [
//   'calls', 'im', 'mail', 'contacts', 'social-networks', 'browser', 'gallery', 'calendar'
// ];

const UserAppsMenuEntries = [
  'im', 'mail', 'contacts', 'browser', 'gallery'
];

export interface UserAppsProps {
  viewPageOpen: string;
  isFetching: boolean;
  total: number;
  pageNavigate: (page: string) => void;
  agent_id: string;
  data: AgentUnreadProducts;
  theme?: Theme.ThemeProps;
}

interface UserAppsState {
  isOpen: boolean;
  anchorEl: HTMLElement | null;
}

class UserAppsMenu extends React.Component<UserAppsProps, UserAppsState> {
  static defaultProps: Partial<UserAppsProps> = {
    theme: Theme.defaultTheme
  }

  constructor(props: UserAppsProps) {
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
    return (UserAppsMenuEntries.indexOf(this.props.viewPageOpen.toLowerCase()) > -1)
  }

  renderArrowIcon = () => (
    <FontIcon
      className="material-icons"
      style={{marginRight: 0}}
    >
      arrow_drop_down
    </FontIcon>
  )

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

  renderProductIndicator(amount: number) {
    if (amount !== null) {return amount}
    return <LoadingThreeDots/>
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
        style={this.getBtnStyle(this.isPageOpen())}
        labelStyle={btnLabelStyle}
        onTouchTap={(ev) => {this.handleMenuOpen(ev.currentTarget)}}
        label="User Apps"
        labelPosition="before"
        icon={this.renderArrowIcon()}
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
          right: 30,
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
              {/*leftIcon={<MenuIcon className="base_icons icon_calls"/>}*/}
              {/*rightIcon={(*/}
                {/*<MenuNumber color={this.getMenuNumberColor(this.props.data.userApps.calls)}>*/}
                  {/*{this.renderProductIndicator(this.props.data.userApps.calls)}*/}
                {/*</MenuNumber>)}*/}
              {/*primaryText="Calls"*/}
              {/*onTouchTap = {*/}
                {/*() => this.onMenuItemSelect(*/}
                  {/*buildURL({agent_id: this.props.agent_id, viewPage: ViewPage.CALLS}),*/}
                  {/*ViewPage.CALLS)*/}
              {/*}*/}
            {/*/>*/}
            <MenuItem
              leftIcon={<MenuIcon className="base_icons icon_im"/>}
              rightIcon={(
                <MenuNumber color={this.getMenuNumberColor(this.props.data.userApps.im)}>
                  {this.renderProductIndicator(this.props.data.userApps.im)}
                </MenuNumber>)}
              primaryText="Instant Messaging"
              onTouchTap={
                () => this.onMenuItemSelect(
                  buildURL({agent_id: this.props.agent_id, viewPage: ViewPage.INSTANT_MESSAGING}),
                  ViewPage.INSTANT_MESSAGING)
              }
            />
            <MenuItem
              leftIcon={<MenuIcon className="base_icons icon_mail"/>}
              rightIcon={(
                <MenuNumber color={this.getMenuNumberColor(this.props.data.userApps.mail)}>
                  {this.renderProductIndicator(this.props.data.userApps.mail)}
                </MenuNumber>)}
              primaryText="Mail"
              onTouchTap={
                () => this.onMenuItemSelect(
                  buildURL({agent_id: this.props.agent_id, viewPage: ViewPage.MAIL}),
                  ViewPage.MAIL)
              }
            />
            <MenuItem
              leftIcon={<MenuIcon className="base_icons icon_contacts"/>}
              rightIcon={(
                <MenuNumber color={this.getMenuNumberColor(this.props.data.userApps.contacts)}>
                  {this.renderProductIndicator(this.props.data.userApps.contacts)}
                </MenuNumber>
              )}
              primaryText="Contacts"
              onTouchTap={
                () => this.onMenuItemSelect(
                  buildURL({agent_id: this.props.agent_id, viewPage: ViewPage.CONTACTS}),
                  ViewPage.CONTACTS)
              }
            />
            {/*<MenuItem*/}
              {/*leftIcon={<MenuIcon className="base_icons icon_social"/>}*/}
              {/*rightIcon={(*/}
                {/*<MenuNumber color={this.getMenuNumberColor(this.props.data.userApps.socialNetwork)}>*/}
                  {/*{this.renderProductIndicator(this.props.data.userApps.socialNetwork)}*/}
                {/*</MenuNumber>)}*/}
              {/*primaryText="Social Networks"*/}
              {/*onTouchTap = {*/}
                {/*() => this.onMenuItemSelect(*/}
                  {/*buildURL({agent_id: this.props.agent_id, viewPage: ViewPage.SOCIAL_NETWORKS}),*/}
                  {/*ViewPage.SOCIAL_NETWORKS)*/}
              {/*}*/}
            {/*/>*/}
            <MenuItem
              leftIcon={<MenuIcon className="base_icons icon_browser"/>}
              rightIcon={(
                <MenuNumber color={this.getMenuNumberColor(this.props.data.userApps.browser)}>
                  {this.renderProductIndicator(this.props.data.userApps.browser)}
                </MenuNumber>)}
              primaryText="Browser"
              onTouchTap={() => this.onMenuItemSelect(
                buildURL({agent_id: this.props.agent_id, viewPage: ViewPage.BROWSER}),
                ViewPage.BROWSER)
              }
            />
            <MenuItem
              leftIcon={<MenuIcon className="base_icons icon_gallery"/>}
              rightIcon={(
                <MenuNumber color={this.getMenuNumberColor(this.props.data.userApps.gallery)}>
                  {this.renderProductIndicator(this.props.data.userApps.gallery)}
                </MenuNumber>)}
              primaryText="Gallery"
              onTouchTap={() => this.onMenuItemSelect(
                buildURL({agent_id: this.props.agent_id, viewPage: ViewPage.GALLERY}),
                ViewPage.GALLERY)
              }
            />
            {/*<MenuItem*/}
              {/*leftIcon={<MenuIcon className="base_icons icon_calendar"/>}*/}
              {/*rightIcon={(*/}
                {/*<MenuNumber color={this.getMenuNumberColor(this.props.data.userApps.calendar)}>*/}
                  {/*{this.renderProductIndicator(this.props.data.userApps.calendar)}*/}
                {/*</MenuNumber>)}*/}
              {/*primaryText="Calendar"*/}
              {/*onTouchTap = {() => this.onMenuItemSelect(*/}
                {/*buildURL({agent_id: this.props.agent_id, viewPage: ViewPage.CALENDAR}),*/}
                {/*ViewPage.CALENDAR)*/}
              {/*}*/}
            {/*/>*/}
          </Menu>
        </Popover>
      </div>
    )
  }
}

export default withRouter(UserAppsMenu)
