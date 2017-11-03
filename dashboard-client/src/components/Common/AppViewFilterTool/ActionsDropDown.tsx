import * as React from 'react';
import { ThemeProps } from './Theme';
import { ActionsFilter } from './Style';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import { ActionsCallbacks } from './index';
import { actionMenu, ActionsArray } from '../ActionMenu/Type';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon'
import ActionMenu from '../ActionMenu/index';

export const MenuIcon = styled.span`
  color: ${prop => prop.theme.actionMenuIconColor};
  margin-right: 10px;
`;

export const TextContainer = styled.span`
  color: ${prop => prop.theme.actionMenuTextColor};
`;

const styles = {
  iconButtonStyle: {
    textAlign: 'left',
  },
  iconStyle: {
  }
}

const ActionContainer = styled.div`
  display: flex;
`;

// FIXME: color should be come from Theme
const ActionSpan = styled.span`
  font-size: 12px;
  color: #627892;
`;

export interface ActionDropDownProps {
  actions: ActionsCallbacks;
  theme?: ThemeProps;
}

export interface ActionDropDownState {
}

class ActionDropDown extends React.Component<ActionDropDownProps, ActionDropDownState> {

  menu: ActionsArray;

  constructor(props: ActionDropDownProps) {
    super(props);

    this.menu = actionMenu;
    this.state = {
    }
  }

  getTrigger() {
    return (
      <IconButton
        style={styles.iconButtonStyle}
      >
        <ActionContainer>
          <ActionSpan>Actions</ActionSpan>
          <FontIcon
            className="base_icons icon_tri_down"
            style={styles.iconStyle}
          />
        </ActionContainer>
      </IconButton>)
  }

  render() {
    styles.iconStyle = {
      position: 'relative',
      top: '3px',
      left: '4px',
      color: this.props.theme.actionMenuTextColor,
      fontSize: '10px',
    }

    return (
      <ActionsFilter>
        <ThemeProvider theme={this.props.theme}>
          <ActionMenu
            addTagCallback={this.props.actions.addTagCallback}
            addToNotebookCallback={this.props.actions.addToNotebookCallback}
            markAsReadCallback={this.props.actions.markAsReadCallback}
            markAsUnreadCallback={this.props.actions.markAsUnreadCallback}
            translateCallback={this.props.actions.translateCallback}
            transcriptCallback={this.props.actions.transcriptCallback}
            exportCallback={this.props.actions.exportCallback}
            menuTrigger={this.getTrigger()}
          />
        </ThemeProvider>
      </ActionsFilter>
    );
  }
}

export default withTheme(ActionDropDown)
