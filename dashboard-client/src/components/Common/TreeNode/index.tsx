import * as React from 'react'
import Checkbox from '../Checkbox/index';
import { GetMUIStyles } from './TreeNodeStyle';
import * as Theme from './Theme';
import { withTheme } from 'styled-components';
import { TagId, TagData } from '../../../types/Tag';
import FontIcon from 'material-ui/FontIcon'
import * as Prod from '../../../types/Product'
import * as Tag from '../../../types/Tag'
import SearchMarker from '../SearchMarker/index';

import {
  Item, LeftSpan, HighLight, CheckBoxSpan, Arrow, Name, RightSpan,
  ActionMenuSpan, IconSpan,
} from './TreeNodeStyle';
import ActionToolbar from '../ActionToolbar/index';

export interface TreeNodeProps extends React.Props<TreeNode> {
  level: number;
  id: Prod.ProductID;
  name: string;
  icon: JSX.Element;
  isExpandable: boolean;
  showControls?: boolean;
  tags: TagData[];
  handlers: {
    nodeClick: () => void;
    onItemCheck: (isChecked: boolean) => void;
    toggleExpandState?: () => void;
    setFavourite: (itemId: Prod.ProductID, isFavorite: boolean) => void;
    removeTag: (itemId: Prod.ProductID, tag: TagId) => void;
    addTags: (itemId: Prod.ProductID, tags: Tag.TagData[]) => void;
    addToNotebook: (itemId: Prod.ProductID) => void
    openNotebook: (itemId: Prod.ProductID) => void
    askForTranslate: (itemId: Prod.ProductID) => void
    askForTranscript: (itemId: Prod.ProductID) => void
    getTranscription: (itemId: Prod.ProductID) => void
    markAsRead: (itemId: Prod.ProductID, isRead: boolean) => void
    exportItem: (itemId: Prod.ProductID) => void
  }
  status: {
    isFavorite: boolean;
    hasTranslation: boolean,
    isRead: boolean;
    hasTranscript: boolean;
  };
  isExpanded: boolean;
  isSelected: boolean;
  theme: Theme.ThemeProps;
}

export interface TreeNodeState {
  isChecked: boolean;
  isMouseOn: boolean;
}

class TreeNode extends React.Component<TreeNodeProps, TreeNodeState> {
  static defaultProps: Partial<TreeNodeProps> = {
    showControls: true,
  }

  private MUIStyles;

  constructor(props: TreeNodeProps) {
    super(props);

    this.state = {
      isChecked: false,
      isMouseOn: false,
    }

    this.MUIStyles = GetMUIStyles(this.props.theme);
  }

  changeIsMouseOnState(isOn: boolean) {
    this.setState({isMouseOn: isOn});
  }

  render() {
    const {isExpandable} = this.props;
    return (
      <div>
        <Item
          color={this.state.isChecked || this.props.isSelected ? this.props.theme.checkBgColor : 'none'}
          onMouseOver={() => {this.changeIsMouseOnState(true)}}
          onMouseLeave={() => {this.changeIsMouseOnState(false)}}
        >
          <LeftSpan
            onClick={this.props.handlers.nodeClick}
          >
            <HighLight
              color={this.getRowMarkColor()}
              onClick={this.props.handlers.toggleExpandState}
              showControls={this.props.showControls}
            />
            <CheckBoxSpan
              level={this.props.level}
              isExpandable={isExpandable}
              showControls={this.props.showControls}
            >
              {this.getCheckBox()}
            </CheckBoxSpan>
            {this.getArrow(isExpandable)}
            <IconSpan isExpandable={isExpandable}>{this.props.icon}</IconSpan>
            <Name onClick={this.props.handlers.toggleExpandState}>
              <SearchMarker>{this.props.name}</SearchMarker>
            </Name>
          </LeftSpan>
          <RightSpan>
            <ActionMenuSpan showControls={this.props.showControls}>{this.getActionMenu()}</ActionMenuSpan>
          </RightSpan>
        </Item>
      </div>
    )
  }

  getRowMarkColor() {
    return this.state.isChecked ? this.props.theme.checkedColor : (
        this.props.status.isRead ? this.props.theme.readMarkColor : this.props.theme.unreadMarkColor
      );
  }

  getCheckBox() {
    if (!this.state.isMouseOn && !this.state.isChecked) {
      return null
    }
    return (
      <Checkbox
        theme={this.props.theme.checkbox}
        onCheck={(isChecked: boolean) => {
          this.setState({isChecked: isChecked});
          this.props.handlers.onItemCheck(isChecked);
        }}
        setChecked={this.state.isChecked}
      />
    )
  }

  getArrow(isExpandable: boolean) {
    if (!isExpandable) {
      return (<span/>)
    }

    let menuArrow = this.props.isExpanded ? 'icon_tree_tri_opened' : 'icon_tree_tri_closed';
    return (
      <Arrow>
        <FontIcon
          className={`base_icons ${menuArrow}`}
          style={{
          fontSize: '80%',
          color: this.props.theme.arrowIconColor,
          position: 'relative',
          top: '2px',
        }}
          onClick={this.props.handlers.toggleExpandState}
        />
      </Arrow>
    )
  }

  getActionMenu() {
    const styles = {
      actionMenuIcon: {}
    }
    const handlers = this.props.handlers;

    styles.actionMenuIcon = {
      color: this.props.theme.translateOffColor,
      position: 'absolute',
      top: '0',
      left: '30px',
      fontSize: '16px',
    }

    const status = this.props.status;

    return (
      <ActionToolbar
        fontSize={16}
        lineHeight={'30px'}
        withMenu={true}
        menuIsHidden={!this.state.isChecked && !this.state.isMouseOn}
        menuOnItemSelect={{
          addTagCallback: (tags: Tag.TagData[]) => {handlers.addTags(this.props.id, tags)},
          addToNotebookCallback: () => {handlers.addToNotebook(this.props.id)},
          markAsReadCallback: () => {handlers.markAsRead(this.props.id, true)},
          markAsUnreadCallback: () => {handlers.markAsRead(this.props.id, false)},
          translateCallback: () => {handlers.askForTranslate(this.props.id)},
          transcriptCallback: () => {handlers.askForTranscript(this.props.id)},
          exportCallback: () => {handlers.exportItem(this.props.id)},
        }}
        withFavorite={status.isFavorite || !(!this.state.isChecked && !this.state.isMouseOn)}
        isFavorite={status.isFavorite}
        favoriteOnClick={() => {handlers.setFavourite(this.props.id, !status.isFavorite)}}
        withTranslate={status.hasTranslation || !(!this.state.isChecked && !this.state.isMouseOn)}
        hasTranslate={status.hasTranslation}
        translateOnClick={() => {handlers.askForTranslate(this.props.id)}}
        withNotebook={status.hasTranscript || !(!this.state.isChecked && !this.state.isMouseOn)}
        notebookHasNotes={this.props.status.hasTranscript}
        notebookOnClick={() => {handlers.openNotebook(this.props.id)}}
        withTags={true}
        tags={this.props.tags}
        tagOnRemove={(tagId: TagId) => {this.props.handlers.removeTag(this.props.id, tagId)}}
        tagsToShow={1}
      />
    )
  }
}

export default withTheme(TreeNode)
