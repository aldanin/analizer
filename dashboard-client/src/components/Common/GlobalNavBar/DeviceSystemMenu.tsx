import * as React from 'react'
import * as Theme from './Theme'
import { withRouter } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon'
import Badge from 'material-ui/Badge'
// import Popover from 'material-ui/Popover';
// import Menu from 'material-ui/Menu';
// import MenuItem from 'material-ui/MenuItem';
// import {btnLabelStyle, MenuIcon, MenuNumber} from './index';
import { btnLabelStyle } from './index';
// import {buildURL, ViewPage} from '../../../urlHelper';
import LoadingThreeDots from '../LoadingThreeDots/index';
import { AgentUnreadProducts } from '../../../types/Agent';
import { browserHistory } from 'react-router';

// const DeviceSystemMenuEntries = ['directory', 'system-info', 'accounts'];
const DeviceSystemMenuEntries = [];

export interface DeviceSystemProps {
  viewPageOpen: string;
  isFetching: boolean;
  total: number;
  pageNavigate: (page: string) => void;
  agent_id: string;
  data: AgentUnreadProducts;
  theme?: Theme.ThemeProps;
}

interface DeviceSystemState {
  isOpen: boolean;
  anchorEl: HTMLElement | null;
}

class DeviceSystemMenu extends React.Component<DeviceSystemProps, DeviceSystemState> {
  static defaultProps: Partial<DeviceSystemProps> = {
    theme: Theme.defaultTheme
  }

  constructor(props: DeviceSystemProps) {
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
    return (DeviceSystemMenuEntries.indexOf(this.props.viewPageOpen.toLowerCase()) > -1)
  }

  renderProductIndicator(amount: number) {
    if (amount !== null) {return amount}
    return <LoadingThreeDots/>
  }

  getMenuNumberColor(amountOfUnreadProducts: number) {
    if (amountOfUnreadProducts === 0) {return this.props.theme.menuTextColor}
    return this.props.theme.menuHighlightColor;
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
        label="Device System"
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
        {/*{this.renderTrigger()}*/}
        {/*<Popover*/}
          {/*open={this.state.isOpen}*/}
          {/*anchorEl={this.state.anchorEl}*/}
          {/*anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}*/}
          {/*targetOrigin={{horizontal: 'left', vertical: 'top'}}*/}
          {/*onRequestClose={() => {this.handleRequestClose()}}*/}
        {/*>*/}
          {/*<Menu*/}
            {/*menuItemStyle={{color: this.props.theme.menuTextColor}}*/}
            {/*listStyle={{background: this.props.theme.menuBg}}*/}
          {/*>*/}
            {/*<MenuItem*/}
              {/*leftIcon={<MenuIcon className="base_icons icon_directory"/>}*/}
              {/*rightIcon={(*/}
                {/*<MenuNumber color={this.getMenuNumberColor(this.props.data.deviceSystem.directory)}>*/}
                  {/*{this.renderProductIndicator((this.props.data.deviceSystem.directory))}*/}
                {/*</MenuNumber>)}*/}
              {/*primaryText="Directory"*/}
              {/*onTouchTap = {() => this.onMenuItemSelect(*/}
                {/*buildURL({agent_id: this.props.agent_id, viewPage: ViewPage.DIRECTORY}),*/}
                {/*ViewPage.DIRECTORY)*/}
              {/*}*/}
            {/*/>*/}
            {/*<MenuItem*/}
              {/*leftIcon={<MenuIcon className="base_icons icon_Cogwheel"/>}*/}
              {/*rightIcon={(*/}
                {/*<MenuNumber color={this.getMenuNumberColor(this.props.data.deviceSystem.systemInfo)}>*/}
                  {/*{this.renderProductIndicator((this.props.data.deviceSystem.systemInfo))}*/}
                {/*</MenuNumber>)}*/}
              {/*primaryText="System info"*/}
              {/*onTouchTap = {() => this.onMenuItemSelect(*/}
                {/*buildURL({agent_id: this.props.agent_id, viewPage: ViewPage.SYSTEM_INFO}),*/}
                {/*ViewPage.SYSTEM_INFO)*/}
              {/*}*/}
            {/*/>*/}
            {/*<MenuItem*/}
              {/*leftIcon={<MenuIcon className="base_icons icon_accounts"/>}*/}
              {/*rightIcon={(*/}
                {/*<MenuNumber color={this.getMenuNumberColor(this.props.data.deviceSystem.accounts)}>*/}
                  {/*{this.renderProductIndicator((this.props.data.deviceSystem.accounts))}*/}
                {/*</MenuNumber>)}*/}
              {/*primaryText="Accounts"*/}
              {/*onTouchTap = {() => this.onMenuItemSelect(*/}
                {/*buildURL({agent_id: this.props.agent_id, viewPage: ViewPage.ACCOUNTS}),*/}
                {/*ViewPage.ACCOUNTS)*/}
              {/*}*/}
            {/*/>*/}
          {/*</Menu>*/}
        {/*</Popover>*/}
      </div>
    )
  }
}

export default withRouter(DeviceSystemMenu)

DeviceSystemMenu.defaultProps = {
  theme: Theme.defaultTheme,
}
