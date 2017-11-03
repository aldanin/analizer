import * as React from 'react';
import * as Theme from './Theme'
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { CSSProperties } from 'react';
import { actionMenu, ActionsArray, ADD_TAG_ACTION } from './Type';
import styled, { ThemeProvider } from 'styled-components';
import { TagData } from '../../../types/Tag';
import AddTagWindow from '../../../containers/AddTagWindow';

export const MenuIcon = styled.span`
  color: ${prop => prop.theme.iconColor};
  padding-right: 10px;
`;

export const TextContainer = styled.span`
  color: ${prop => prop.theme.textColor};
`;

export interface ActionMenuProps extends React.Props<ActionMenu> {
  iconStyle?: CSSProperties;
  sideToBeOpenHorizontal?: string;
  addTagCallback: (tags: TagData[]) => void;
  addToNotebookCallback: () => void;
  markAsReadCallback: () => void;
  markAsUnreadCallback: () => void;
  translateCallback: () => void;
  transcriptCallback: () => void;
  exportCallback: () => void;
  menuTrigger?: JSX.Element;
  theme?: Theme.ThemeProps;
}
export interface ActionMenuState {
  isMenuOpen: boolean;
  anchorEl: Element;
  isAddTagMenu: boolean;
}

const style = {
  iconMenu: {
  }
}

export default class ActionMenu extends React.Component<ActionMenuProps, ActionMenuState> {
  static defaultProps: Partial<ActionMenuProps> = {
    theme: Theme.defaultTheme,
    sideToBeOpenHorizontal: 'left',
    iconStyle: null,
  }

  menu: ActionsArray;
  callbacks;

  constructor(props: ActionMenuProps) {
    super(props);

    this.menu = actionMenu;
    this.initCallbacks();

    this.state = {
      isMenuOpen: false,
      anchorEl: null,
      isAddTagMenu: false,
    };
  }

  componentWillReceiveProps() {
    this.initCallbacks();
  }

  initCallbacks() {
    this.callbacks = {
      addTagCallback: (tags: TagData[]) => {
        this.props.addTagCallback(tags);
        this.closeMenu()
      },
      addToNotebookCallback: () => {
        this.props.addToNotebookCallback();
        this.closeMenu()
      },
      markAsReadCallback: () => {
        this.props.markAsReadCallback();
        this.closeMenu()
      },
      markAsUnreadCallback: () => {
        this.props.markAsUnreadCallback();
        this.closeMenu()
      },
      translateCallback: () => {
        this.props.translateCallback();
        this.closeMenu()
      },
      transcriptCallback: () => {
        this.props.transcriptCallback();
        this.closeMenu()
      },
      exportCallback: () => {
        this.props.exportCallback();
        this.closeMenu()
      },
    }
  }

  closeMenu() {
    this.setState({isMenuOpen: false})
  }

  getCallbackFunction(callbackKey: string) {
    if (callbackKey === ADD_TAG_ACTION) {
      return () => this.openAddTagWindow();
    }
    return callbackKey in this.callbacks ? this.callbacks[callbackKey] : () => null;
  }

  openAddTagWindow() {
    this.setState({
      isAddTagMenu: true,
    })
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      isMenuOpen: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = (tags: TagData[]) => {
    //
    // Solves a bug where closing window by clicking outside
    // returns non-array values:
    //
    const returnTags = tags instanceof Array ? tags : [];

    this.props.addTagCallback(returnTags);
    this.setState({
      isMenuOpen: false,
      isAddTagMenu: false,
    });
  }

  render() {
    style.iconMenu = {
      color: this.props.theme.iconMenuColor,
      cursor: 'pointer',
    }
    return this.state.isAddTagMenu ? this.renderAddTagWindow() : this.renderActionMenu();
  }

  renderAddTagWindow() {
    return (
      <AddTagWindow
        isOpen={this.state.isAddTagMenu}
        onClose={(tags: TagData[]) => this.handleRequestClose(tags)}
      />
    )
  }

  renderActionMenu() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <div onClick={this.handleTouchTap}>
          {this.props.menuTrigger ? this.props.menuTrigger : (
            <span
              className="base_icons icon_menu"
              style={this.props.iconStyle !== null ? this.props.iconStyle : style.iconMenu}
            />)}
          <Popover
            open={this.state.isMenuOpen}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
          >
            <Menu>
              {this.menu.actions.map((action, idx) => {
                return (
                  <MenuItem
                    primaryText={<TextContainer>{action.primaryText}</TextContainer>}
                    key={idx}
                    leftIcon={<MenuIcon className={action.icon}/>}
                    onTouchTap={this.getCallbackFunction(action.callbackKey)}
                  />
                )
              })}
            </Menu>
          </Popover>
        </div>
      </ThemeProvider>
    );
  }
}
