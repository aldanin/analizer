import * as React from 'react';
import { Toolbar , ToolbarGroup } from 'material-ui/Toolbar';
import ShowDropDown from './ShowDropDown';
import TagDropDown from './TagsDropDown';
import ToolbarSearch from '../../../containers/SearchFilter'
import ActionDropDown from './ActionsDropDown';
import { ThemeProvider } from 'styled-components';
import { DEFAULT_THEME, ThemeProps } from './Theme';
import { ClearAllContainer, FilterTool, LeftSide, RightSide, SelectedContainer, SelectedFilter } from './Style';
import { CSSProperties } from 'react';
import { TagData } from '../../../types/Tag';

export interface ActionsCallbacks {
  addTagCallback: (tags: TagData[]) => void;
  addToNotebookCallback: () => void;
  markAsReadCallback: () => void;
  markAsUnreadCallback: () => void;
  translateCallback: () => void;
  transcriptCallback: () => void;
  exportCallback: () => void;
}

export interface AppViewFiltersToolProps {
  component: JSX.Element; // This component will be present on the left side
  show: () => void; // Callback function called when the user filter the show drop down menu
  tags: () => void; // Callback function called when the user filter the tags drop down menu
  actions: ActionsCallbacks // Callback functions called when the user press on the action in the menu
  search?: () => void; // // Callback function called when the user filter with the search input
  amountOfSelectedItems?: number;
  onClearSelectedItems?: () => void;
  toolbarGroupStyle?: CSSProperties;
  theme?: ThemeProps;
}

const styles = {
  tool: {
  }
}

class AppViewFiltersTool extends React.Component<AppViewFiltersToolProps, {}> {
  static defaultProps: Partial<AppViewFiltersToolProps> = {
    theme: DEFAULT_THEME,
    toolbarGroupStyle: {},
    amountOfSelectedItems: 0,
    onClearSelectedItems: () => null,
  }

  renderNoSelecting = () => {
    return (
      <FilterTool>
        <LeftSide>
          <ToolbarGroup firstChild={true} style={this.props.toolbarGroupStyle}>
            {this.props.component}
          </ToolbarGroup>
        </LeftSide>
        <RightSide>
          <ToolbarGroup>
            {process.env.REACT_APP_IS_FILTERED_ENABLED ? (<ShowDropDown show={this.props.show}/>) : null}
            {process.env.REACT_APP_IS_FILTERED_ENABLED ? (<TagDropDown tags={this.props.tags}/>) : null}
            <ActionDropDown actions={this.props.actions}/>
            <ToolbarSearch/>
          </ToolbarGroup>
        </RightSide>
      </FilterTool>
    )
  }

  renderSelected() {
    return (
      <SelectedFilter color={this.props.theme.selectedBackground}>
        <LeftSide>
          <SelectedContainer>
          {this.props.amountOfSelectedItems} selected
          </SelectedContainer>
          <ClearAllContainer
            onClick={() => {this.props.onClearSelectedItems()}}
            color={this.props.theme.clearAllTextColor}
          >
            Clear all
          </ClearAllContainer>
        </LeftSide>
        <RightSide>
          <ToolbarGroup>
            <ActionDropDown actions={this.props.actions}/>
            <ToolbarSearch/>
          </ToolbarGroup>
        </RightSide>
      </SelectedFilter>
    )
  }

  render() {
    styles.tool = {
      backgroundColor: this.props.theme.backgroundColor,
      width: '100%',
      borderBottom: '1px solid ' + this.props.theme.borderBottom,
      padding: 0,
      boxSizing: 'none',
      height: '40px',
    }

    return (
      <ThemeProvider theme={this.props.theme}>
        <Toolbar style={styles.tool}>
          {this.props.amountOfSelectedItems > 1 ? this.renderSelected() : this.renderNoSelecting()}
        </Toolbar>
      </ThemeProvider>
    );
  }
}

export default AppViewFiltersTool;
