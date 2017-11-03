import * as React from 'react'
import { Browser, BrowserDirectory, BrowserDirectoryContent, browserTreeObjectId } from '../../types/Browser';
import { Arrow, Icon, Title, Url, BrowserIcon, FixShakes } from './bookmarkStyle';
import { ThemeProps } from './Theme';
import styled, { withTheme } from 'styled-components';
import { TagData, TagId } from '../../types/Tag';
import ListItem from '../Common/ListItem/index';
import FontIcon from 'material-ui/FontIcon'
import ListEmpty from './ListEmpty';
import ActionToolbar from '../Common/ActionToolbar/index';
import SearchMarker from '../Common/SearchMarker/index';

interface LevelProp {
  level: number
}

const Content = styled.div`
  display: flex;
  width: 100%;
  text-indent: ${(props: LevelProp) => props.level * 2}%;
`;

export interface NodeItemProps extends React.Props<NodeItem> {
  level: number;
  autoExpand: boolean;
  node: Browser | BrowserDirectory | BrowserDirectoryContent;
  changeOpenState: (id: browserTreeObjectId, state: boolean) => void;
  isOpen: (id: browserTreeObjectId) => boolean;
  theme?: ThemeProps;
  setStar: (id: browserTreeObjectId, isFavorite: boolean) => void;
  removeTag: (id: browserTreeObjectId, tag: TagId) => void;
  openNotebook: () => void
  askForTranslate: () => void
  getTranslate: () => void
  bookmarksAddTag: (ids: browserTreeObjectId[], tags: TagData[]) => void;
  bookmarksAddToNotebook: (ids: browserTreeObjectId[]) => void;
  bookmarksMarkAsRead: (ids: browserTreeObjectId[]) => void;
  bookmarksMarkAsUnRead: (ids: browserTreeObjectId[]) => void;
  bookmarksAskForTranslate: (ids: browserTreeObjectId[]) => void;
  bookmarksAskForTranscript: (ids: browserTreeObjectId[]) => void;
  bookmarksExportItem: (ids: browserTreeObjectId[]) => void;
  onItemSelected: (id: browserTreeObjectId) => void;
  onItemUnSelected: (id: browserTreeObjectId) => void;
  isItemSelected: (id: browserTreeObjectId) => boolean;
  updateDataIsExist?: (isDataExist: boolean) => void;
}

export interface NodeItemState {
  isExpand: boolean;
  isMouseOn: boolean;
  menuIsHidden: boolean;
  withFavorite: boolean;
  withNotebook: boolean;
  withTranslate: boolean;
}

class NodeItem extends React.Component<NodeItemProps, NodeItemState> {
  static defaultProps: Partial<NodeItemProps> = {
    updateDataIsExist: () => null,
  }

  constructor (props: NodeItemProps) {
    super(props);

    this.state = {
      isExpand: this.props.autoExpand ? true : this.props.isOpen(this.props.node.id),
      isMouseOn: false,
      menuIsHidden: true,
      withFavorite: false,
      withNotebook: false,
      withTranslate: false,
    }
  }

  componentWillReceiveProps(nextProps: NodeItemProps) {
    if (this.props.autoExpand !== nextProps.autoExpand) {
      this.setState({isExpand: nextProps.autoExpand});
    }
    if (!this.props.isItemSelected(this.props.node.id)) {
      this.setState({
        isMouseOn: false,
      })
    }
  }

  toggleLine() {
    this.props.changeOpenState(this.props.node.id, !this.state.isExpand);
    this.setState({isExpand: !this.state.isExpand})
  }

  onMouseEnter = () => {
    this.setState({
      isMouseOn: true,
      menuIsHidden: false,
      withFavorite: true,
      withNotebook: true,
      withTranslate: true,
    })
  }

  onMouseLeave = () => {
    if (this.props.isItemSelected(this.props.node.id)) {return}
    this.setState({
      isMouseOn: false,
      menuIsHidden: true,
      withFavorite: false,
      withNotebook: false,
      withTranslate: false,
    })
  }

  onCheck = () => {
    if (this.props.isItemSelected(this.props.node.id)) {
      this.props.onItemUnSelected(this.props.node.id)
    } else {
      this.props.onItemSelected(this.props.node.id)
    }
  }

  getBrowserContent() {
    return (
      <Content level={this.props.level} onClick={() => {this.toggleLine()}}>
        {this.props.isItemSelected(this.props.node.id) || this.state.isMouseOn ? null : <FixShakes/>}
        <Arrow>{this.getArrow()}</Arrow>
        <BrowserIcon>
          <img src={'../../icons/' + (this.props.node as Browser).info.icon + '.ico'} width="24"/>
        </BrowserIcon>
        <Title><SearchMarker>{(this.props.node as Browser).info.name}</SearchMarker></Title>
        <Url>{this.getUrl()}</Url>
      </Content>
    )
  }

  getDirectoryContent() {
    return (
      <Content level={this.props.level} onClick={() => {this.toggleLine()}}>
        {this.props.isItemSelected(this.props.node.id) || this.state.isMouseOn ? null : <FixShakes/>}
        <Arrow>{this.getArrow()}</Arrow>
        <Icon>{this.getIcon('directory')}</Icon>
        <Title><SearchMarker>{(this.props.node as BrowserDirectory).name}</SearchMarker></Title>
        <Url>{this.getUrl()}</Url>
      </Content>
    )
  }

  getSiteContent() {
    return (
      <Content
        level={this.props.level}
        onClick={
        () => {
          this.toggleLine()
          if (!this.props.node.isRead) {
            this.props.bookmarksMarkAsRead([this.props.node.id])
        }}}
      >
        {this.props.isItemSelected(this.props.node.id) || this.state.isMouseOn ? null : <FixShakes/>}
        <Icon>{this.getIcon('site')}</Icon>
        <Title><SearchMarker>{(this.props.node as BrowserDirectoryContent).site.name}</SearchMarker></Title>
        <Url title={this.getUrl()}>{this.getUrl()}</Url>
      </Content>
    )
  }

  getActionToolbar() {
    return (
      <ActionToolbar
        lineHeight={'30px'}
        fontSize={16}
        withMenu={true}
        menuIsHidden={this.state.menuIsHidden}
        menuOnItemSelect={{
          addTagCallback: (tags: TagData[]) => {this.props.bookmarksAddTag([this.props.node.id], tags)},
          addToNotebookCallback: () => {this.props.bookmarksAddToNotebook([this.props.node.id])},
          markAsReadCallback: () => {this.props.bookmarksMarkAsRead([this.props.node.id])},
          markAsUnreadCallback: () => {this.props.bookmarksMarkAsUnRead([this.props.node.id])},
          translateCallback: () => {this.props.bookmarksAskForTranslate([this.props.node.id])},
          transcriptCallback: () => {this.props.bookmarksAskForTranscript([this.props.node.id])},
          exportCallback: () => {this.props.bookmarksExportItem([this.props.node.id])},
        }}
        withFavorite={this.props.node.isFavorite || this.state.withFavorite}
        isFavorite={this.props.node.isFavorite}
        favoriteOnClick={() => {this.props.setStar(this.props.node.id, !this.props.node.isFavorite)}}
        withNotebook={this.props.node.hasNotes || this.state.withNotebook}
        notebookHasNotes={this.props.node.hasNotes}
        withTranslate={this.props.node.hasTranslation || this.state.withTranslate}
        hasTranslate={this.props.node.hasTranslation}
        withTags={true}
        tags={this.props.node.tags}
        tagOnRemove={(tagId: TagId) => {this.props.removeTag(this.props.node.id, tagId)}}
      />
    )
  }

  drawItemView() {
    switch (this.props.node.type) {
      case 'browser':
        if ((this.props.node.content.length === 1) && (
            (this.props.node.content[0] as BrowserDirectory).content.length === 0)) {
          this.props.updateDataIsExist(false);
          return null
        }
        this.props.updateDataIsExist(true);
        return (
          <div>
            <ListItem
              isNewItem={this.isBrowserHasNewContent(this.props.node)}
              content={this.getBrowserContent()}
              isCheckboxAvailable={this.props.isItemSelected(this.props.node.id) || this.state.isMouseOn}
              checkboxSize={'16px'}
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
              onCheck={this.onCheck}
              isChecked={this.props.isItemSelected(this.props.node.id)}
              isSelected={this.props.isItemSelected(this.props.node.id)}
              isMouseOn={this.state.isMouseOn}
              actionToolbar={this.getActionToolbar()}
            />
            {this.state.isExpand ? (
              (this.props.node as Browser).content.length > 0 ?
                (this.props.node as Browser).content.map((item) => {
                  return (
                    <NodeItem
                      key={item.id}
                      level={this.props.level + 1}
                      node={item}
                      autoExpand={this.props.autoExpand}
                      changeOpenState={this.props.changeOpenState}
                      isOpen={this.props.isOpen}
                      theme={this.props.theme}
                      setStar={this.props.setStar}
                      removeTag={this.props.removeTag}
                      openNotebook={this.props.openNotebook}
                      askForTranslate={this.props.askForTranslate}
                      getTranslate={this.props.getTranslate}
                      bookmarksAddTag={this.props.bookmarksAddTag}
                      bookmarksAddToNotebook={this.props.bookmarksAddToNotebook}
                      bookmarksMarkAsRead={this.props.bookmarksMarkAsRead}
                      bookmarksMarkAsUnRead={this.props.bookmarksMarkAsUnRead}
                      bookmarksAskForTranslate={this.props.bookmarksAskForTranslate}
                      bookmarksAskForTranscript={this.props.bookmarksAskForTranscript}
                      bookmarksExportItem={this.props.bookmarksExportItem}
                      onItemSelected={this.props.onItemSelected}
                      onItemUnSelected={this.props.onItemUnSelected}
                      isItemSelected={this.props.isItemSelected}
                    />
                  )
                }) : <ListEmpty level={this.props.level + 1}/> ) : null}
          </div>
        )
      case 'directory':
        return (
          <div>
            <ListItem
              isNewItem={this.isDirectoryHasNewContent(this.props.node)}
              content={this.getDirectoryContent()}
              isCheckboxAvailable={this.props.isItemSelected(this.props.node.id) || this.state.isMouseOn}
              checkboxSize={'16px'}
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
              onCheck={this.onCheck}
              isChecked={this.props.isItemSelected(this.props.node.id)}
              isMouseOn={this.state.isMouseOn}
              actionToolbar={this.getActionToolbar()}
            />
            {this.state.isExpand ? (
              (this.props.node as BrowserDirectory).content.length > 0 ?
                (this.props.node as BrowserDirectory).content.map((item) => {
                  return (
                    <NodeItem
                      key={item.id}
                      level={this.props.level + 1}
                      node={item}
                      autoExpand={this.props.autoExpand}
                      changeOpenState={this.props.changeOpenState}
                      isOpen={this.props.isOpen}
                      theme={this.props.theme}
                      setStar={this.props.setStar}
                      removeTag={this.props.removeTag}
                      openNotebook={this.props.openNotebook}
                      askForTranslate={this.props.askForTranslate}
                      getTranslate={this.props.getTranslate}
                      bookmarksAddTag={this.props.bookmarksAddTag}
                      bookmarksAddToNotebook={this.props.bookmarksAddToNotebook}
                      bookmarksMarkAsRead={this.props.bookmarksMarkAsRead}
                      bookmarksMarkAsUnRead={this.props.bookmarksMarkAsUnRead}
                      bookmarksAskForTranslate={this.props.bookmarksAskForTranslate}
                      bookmarksAskForTranscript={this.props.bookmarksAskForTranscript}
                      bookmarksExportItem={this.props.bookmarksExportItem}
                      onItemSelected={this.props.onItemSelected}
                      onItemUnSelected={this.props.onItemUnSelected}
                      isItemSelected={this.props.isItemSelected}
                    />
                  )
                }) : <ListEmpty level={this.props.level + 1}/> ) : null}
          </div>
        )
      case 'site':
        return(
          <ListItem
            isNewItem={!this.props.node.isRead}
            content={this.getSiteContent()}
            isCheckboxAvailable={this.props.isItemSelected(this.props.node.id) || this.state.isMouseOn}
            checkboxSize={'16px'}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            onCheck={this.onCheck}
            isChecked={this.props.isItemSelected(this.props.node.id)}
            isMouseOn={this.state.isMouseOn}
            actionToolbar={this.getActionToolbar()}
          />
        )

      default:
        return null;
    }
  }

  render() {
    return (
      <div>
        {this.drawItemView()}
      </div>
    )
  }

  getArrow() {
    let menuArrow = this.props.isOpen(this.props.node.id) ? 'icon_tree_tri_opened' : 'icon_tree_tri_closed';
    return(
      <FontIcon
        className={`base_icons ${menuArrow}`}
        style={{
          fontSize: '80%',
          color: this.props.theme.bookmarks.arrowIconColor,
          position: 'relative',
          top: '2px',
        }}
      />
    )
  }

  getIcon(type: string) {
    switch (type) {
      case 'directory':
        if (this.props.isOpen(this.props.node.id)) {
          return (
            <FontIcon
              className="base_icons icon_folder_opened"
              style={{fontSize: '120%', color: this.props.theme.bookmarks.folderIconColor}}
              onClick={() => { this.toggleLine() }}
            />);
        }
        return (
          <FontIcon
            className="base_icons icon_folder_closed"
            style={{fontSize: '120%', color: this.props.theme.bookmarks.folderIconColor}}
            onClick={() => { this.toggleLine() }}
          />);
      case 'site':
        return (
          <i
            className="material-icons"
            style={{
              position: 'relative',
              top: '3px',
              left: '2px',
              color: this.props.theme.bookmarks.iconColor,
              fontSize: '125%',
              width: '1.5%',
            }}
          >
            {(this.props.node as BrowserDirectoryContent).site.icon}
          </i>);
      default:
        return null;
    }
  }

  getUrl() {
    return (this.props.node as BrowserDirectoryContent).url;
  }

  isBrowserHasNewContent(node: Browser | BrowserDirectory | BrowserDirectoryContent) {
    let hasNewItem = false;
    let i = 0;
    while (!hasNewItem && i < (node as Browser).content.length) {
      let j = 0;
      while (!hasNewItem && j < ((node as Browser).content[i] as BrowserDirectory).content.length) {
        if (!((node as Browser).content[i] as BrowserDirectory).content[j].isRead) {
          hasNewItem = true;
        }
        j++;
      }
      i++;
    }
    return hasNewItem;
  }

  isDirectoryHasNewContent(node: Browser | BrowserDirectory | BrowserDirectoryContent) {
    let hasNewItem = false;
    let i = 0;
    while (!hasNewItem && i < (node as BrowserDirectory).content.length) {
      if (!(node as BrowserDirectory).content[i].isRead) {
        hasNewItem = true;
      }
      i++;
    }
    return hasNewItem;
  }
}

export default withTheme(NodeItem)
