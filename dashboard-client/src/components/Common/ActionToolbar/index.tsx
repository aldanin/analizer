import * as React from 'react'
import * as Theme from './Theme'
import styled from 'styled-components';
import ActionMenu from '../ActionMenu/index';
import { TagData, TagId } from '../../../types/Tag';
import TagsList from '../TagList/index';
import { CSSProperties } from 'react';
import StarFontIcon from '../StarFontIcon/index';
import * as TagTheme from '../TagsList/Theme';

const FONT_SIZE = 18;

interface ToolbarContainerProps {
  fontSize: number;
  lineHeight: string;
}

interface LineHeightProp {
  lineHeight: string;
}

const ToolbarContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
  width: auto;
  float: right;
  line-height: ${(prop: ToolbarContainerProps) => prop.lineHeight};
  font-size: ${(prop: ToolbarContainerProps) => prop.fontSize}px;
`;

const ActionsContainer = styled.div`
  display: inline-block;
  line-height: ${(prop: LineHeightProp) => prop.lineHeight};
  padding: 0 0.3em 0 0;
`;

const Icon = styled.div`
  cursor: pointer;
  display: inline-block;
  line-height: ${(prop: LineHeightProp) => prop.lineHeight};
  padding: 0 0.3em 0 0;
  color: ${prop => prop.color};
`;

const style = {
  menuIcon: {
  }
}

interface ActionCallbacksProps {
  addTagCallback: (tags: TagData[]) => void;
  addToNotebookCallback: () => void;
  markAsReadCallback: () => void;
  markAsUnreadCallback: () => void;
  translateCallback: () => void;
  transcriptCallback: () => void;
  exportCallback: () => void;
}

const ActionCallbacksDefault = {
  addTagCallback: ([]) => {return []},
  addToNotebookCallback: () => {return null},
  markAsReadCallback: () => {return null},
  markAsUnreadCallback: () => {return null},
  translateCallback: () => {return null},
  transcriptCallback: () => {return null},
  exportCallback: () => {return null},
}

export interface ActionToolbarProps extends React.Props<ActionToolbar> {
  // General
  fontSize?: number; // All elements fit by this size {default: 18}
  lineHeight?: string; // Line size of all elements {default 1.5}

  // ActionMenu
  withMenu?: boolean; // True if you want to show the action menu
  menuIconStyle?: CSSProperties; // Style for menu icon
  menuIsHidden?: boolean; // True if you want access to menu items but transparent color
  menuSideToBeOpen?: string; // Which side the menu will open - Left or Right
  menuOnItemSelect?: ActionCallbacksProps; // Callback for each menu option

  // Favorite icon
  withFavorite?: boolean; // True if you want to show the favorite icon
  isFavorite?: boolean; // True to fill the favorite icon with color
  favoriteOnClick?: () => void; // Callback function called after event onClick caught from favorite icon

  // Notebook icon
  withNotebook?: boolean; // True if you want to show the notebook icon
  notebookHasNotes?: boolean; // True if you want the icon with active theme color
  notebookOnClick?: () => void; // Callback function called after event onClick caught from notebook icon

  // Translate icon
  withTranslate?: boolean; // True if you want to show the translate icon
  hasTranslate?: boolean; // True if you want the icon with active theme color
  translateOnClick?: () => void; // Callback function called after event onClick caught from notebook icon

  // Tags
  withTags?: boolean; // True if you want to show tags
  tags?: TagData[]; // Tags data
  tagOnRemove?: (id: TagId) => void; // Callback function called on remove tag
  tagsToShow?: number; // How many tags to show before the tooltip with +{others tags}
  tagsTheme?: TagTheme.TagThemeProps;

  theme?: Theme.ThemeProps
}
export interface ActionToolbarState {
}

class ActionToolbar extends React.Component<ActionToolbarProps, ActionToolbarState> {

  static defaultProps: Partial<ActionToolbarProps> = {
    fontSize: FONT_SIZE,
    lineHeight: '1.5',

    withMenu: false,
    menuIconStyle: null,
    menuIsHidden: false,
    menuSideToBeOpen: 'right',
    menuOnItemSelect: ActionCallbacksDefault,

    withFavorite: false,
    isFavorite: false,
    favoriteOnClick: () => {return null},

    withNotebook: false,
    notebookHasNotes: false,
    notebookOnClick: () => {return null},

    withTranslate: false,
    hasTranslate: false,
    translateOnClick: () => {return null},

    withTags: false,
    tags: [],
    tagOnRemove: () => {return null},
    tagsToShow: 2,
    tagsTheme: TagTheme.DEFAULT_THEME,

    theme: Theme.defaultTheme,
  }

  constructor (props: ActionToolbarProps) {
    super(props)

    this.state = {
    }
  }

  render() {

    style.menuIcon = {
      color: !this.props.menuIsHidden ? '#9FA1A2' : 'transparent',
      cursor: 'pointer',
      lineHeight: this.props.lineHeight,
    }

    return (
      <ToolbarContainer
        fontSize={this.props.fontSize}
        lineHeight={this.props.lineHeight}
      >
        {this.props.withMenu ? this.getMenu() : null}
        {this.props.withFavorite ? this.getStar() : null}
        {this.props.withNotebook ? this.getNotebook() : null}
        {this.props.withTranslate ? this.getTranslate() : null}
        {this.props.withTags ? this.getTags() : null}
      </ToolbarContainer>
    )
  }

  getMenu() {
    return (
      <ActionMenu
        addTagCallback={(tags: TagData[]) => {this.props.menuOnItemSelect.addTagCallback(tags)}}
        addToNotebookCallback={() => {this.props.menuOnItemSelect.addToNotebookCallback()}}
        markAsReadCallback={() => {this.props.menuOnItemSelect.markAsReadCallback()}}
        markAsUnreadCallback={() => {this.props.menuOnItemSelect.markAsUnreadCallback()}}
        translateCallback={() => {this.props.menuOnItemSelect.translateCallback()}}
        transcriptCallback={() => {this.props.menuOnItemSelect.transcriptCallback()}}
        exportCallback={() => {this.props.menuOnItemSelect.exportCallback()}}
        iconStyle={this.props.menuIconStyle ? this.props.menuIconStyle : style.menuIcon}
        sideToBeOpenHorizontal={this.props.menuSideToBeOpen}
      />
    )
  }

  getStar() {
    return (
      <StarFontIcon
        isFull={this.props.isFavorite}
        callback={() => {this.props.favoriteOnClick()}}
        lineHeight={this.props.lineHeight}
      />
    )
  }

  getNotebook() {
    return (
      <Icon
        className="base_icons icon_notebook"
        color={this.props.notebookHasNotes ?
          this.props.theme.iconColorActive : this.props.theme.iconColorDisActive}
        onClick={() => {this.props.notebookOnClick()}}
        lineHeight={this.props.lineHeight}
      />
    )
  }

  getTranslate() {
    return (
      <Icon
        className="base_icons icon_translate"
        color={this.props.hasTranslate ?
          this.props.theme.iconColorActive : this.props.theme.iconColorDisActive}
        onClick={() => {this.props.translateOnClick()}}
        lineHeight={this.props.lineHeight}
      />
    )
  }

  getTags() {
    return(
      <ActionsContainer
        lineHeight={this.props.lineHeight}
      >
        <TagsList
          tags={this.props.tags}
          removeTagCallback={this.props.tagOnRemove}
          numberOfTagsToShow={this.props.tagsToShow}
          lineHeight={this.props.lineHeight}
          theme={this.props.tagsTheme}
        />
      </ActionsContainer>
    )
  }
}

export default ActionToolbar
