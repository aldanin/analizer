import * as React from 'react'
import * as Dir from '../../../types/Directory';
import * as Prod from '../../../types/Product'
import TreeNode from '../../Common/TreeNode/index';
import EmptyTreeNode from './EmptyTreeNode';
import * as Tag from '../../../types/Tag';
import { ThemeProps } from '../Theme';
import FontIcon from 'material-ui/FontIcon'
import FileTreeNode from './FileTreeNode'
import { ThemeProvider } from 'styled-components'

export interface DirectoryTreeNodeProps {
  level: number;
  node: Dir.FileSystemNode,
  tags: Tag.TagData[];
  handlers: {
    nodeClick: (item: Dir.FileSystemItem, path: string, mayToggle: boolean) => void;
    onItemCheck: (itemId: Prod.ProductID, isChecked: boolean) => void,
    loadDirectoryContent: (path: string) => void,
    setFavourite: (itemId: Prod.ProductID, isFavorite: boolean) => void,
    removeTag: (itemId: Prod.ProductID, tagId: Tag.TagId) => void,
    addTags: (itemId: Prod.ProductID, tags: Tag.TagData[]) => void,
    openNotebook: (itemId: Prod.ProductID) => void,
    askForTranslate: (itemId: Prod.ProductID) => void,
    getTranscription: (itemId: Prod.ProductID) => void,
    addToNotebook: (itemId: Prod.ProductID) => void,
    markAsRead: (itemId: Prod.ProductID, isRead: boolean) => void,
  };
  status: {
    isFavorite: boolean;
    hasTranslation: boolean,
    isRead: boolean;
    hasTranscript: boolean;
  };
  selectedNodePath: string;
  isFetching: boolean;
  theme: ThemeProps;
}

export interface DirectoryTreeNodeState {
  isChecked: boolean;
  selectedNodePath: string;
}

class DirectoryTreeNode extends React.Component<DirectoryTreeNodeProps, DirectoryTreeNodeState> {

  constructor(props: DirectoryTreeNodeProps) {
    super(props);

    this.state = {
      isChecked: false,
      selectedNodePath: null
    }
  }

  componentWillReceiveProps(nextProps: DirectoryTreeNodeProps) {
    if (nextProps.selectedNodePath !== this.props.node.data.info.path) {
      this.setState({selectedNodePath: nextProps.selectedNodePath})
    }
  }

  shouldComponentUpdate(nextProps: DirectoryTreeNodeProps, nextState: DirectoryTreeNodeState) {
    const json1 = JSON.stringify(nextProps.node);
    const json2 = JSON.stringify(this.props.node);
    //
    // Render if the tree structure changed or if a new node was selected:
    //
    const doit = json1 !== json2 || this.props.selectedNodePath !== nextProps.selectedNodePath;
    return doit
  };

  getChildComponent = (node: Dir.FileSystemNode,
                       key: number,
                       level: number) => {
    const data = node.data;
    const directory = data as Dir.DirectoryItem;
    const myKey = node.data.id;
    let component;
    switch (data.type) {
      case 'directory':
        component = (
          <DirectoryTreeNode
            key={myKey}
            level={level}
            node={node}
            tags={data.tags}
            status={{
              isFavorite: directory.isFavorite,
              hasTranslation: directory.hasTranslation,
              isRead: directory.isRead,
              hasTranscript: directory.hasTranscript,
            }}
            isFetching={false}
            theme={this.props.theme}
            selectedNodePath={this.props.selectedNodePath}
            handlers={this.props.handlers}
          />
        )
        break;
      case 'file':
        component = (
          <FileTreeNode
            key={myKey}
            level={level}
            tags={data.tags}
            node={node}
            theme={this.props.theme}
            status={{
                isFavorite: directory.isFavorite,
                hasTranslation: directory.hasTranslation,
                isRead: directory.isRead,
                hasTranscript: directory.hasTranscript,
              }}
            handlers={{
                nodeClick : (item) => {this.props.handlers.nodeClick(item, null, false)},
                onItemCheck : this.props.handlers.onItemCheck,
                setFavourite: this.props.handlers.setFavourite,
                removeTag : this.props.handlers.removeTag,
                addTags : this.props.handlers.addTags,
                openNotebook: this.props.handlers.openNotebook,
                askForTranslate: this.props.handlers.askForTranslate,
                getTranscription: this.props.handlers.getTranscription,
                addToNotebook:  this.props.handlers.addToNotebook,
                markAsRead:  this.props.handlers.markAsRead,
              }}
            selectedNodePath={this.props.selectedNodePath}
          />
        )
        break;
      default:
        break;
    }

    return component;
  }

  getIcon = () => {
    if (this.props.node.expanded) {
      return (
        <FontIcon
          className="base_icons icon_folder_opened"
          style={{fontSize: '120%', color: this.props.theme.folderIconColor}}
          //  onClick = {this.nodeClick}
        />);
    }
    return (
      <FontIcon
        className="base_icons icon_folder_closed"
        style={{fontSize: '120%', color: this.props.theme.folderIconColor}}
        // onClick = {this.nodeClick}
      />);
  }

  tryLoadContent = () => {
    if (!this.props.isFetching) {
      this.props.handlers.loadDirectoryContent(this.props.node.data.info.path)
    }
  }

  nodeClick = () => {
    const path = this.props.node.data.info.path;
    if (this.props.node.isLoaded) {
      this.props.handlers.nodeClick(this.props.node.data, path, true)
    } else {
      this.props.handlers.nodeClick(this.props.node.data, path, false)
      this.tryLoadContent()
    }
  }

  render() {
    const {node, tags, status, level, theme, handlers} = this.props;

    return (
      <ThemeProvider theme={theme.treeNode}>
        <div>
          <TreeNode
            level={level}
            icon={this.getIcon()}
            name={node.data.name}
            isExpandable={true}
            showControls={true}
            handlers={{
              nodeClick : this.nodeClick,
              onItemCheck : (isChecked: boolean) => {
                return handlers.onItemCheck(node.data.info.path, isChecked)
              },
              setFavourite : (itemId: Prod.ProductID, isFavorite) => {
                return handlers.setFavourite(node.data.info.path, isFavorite)
              },
              removeTag: handlers.removeTag,
              addTags: handlers.addTags,
              openNotebook: handlers.openNotebook,
              askForTranslate: handlers.askForTranslate,
               askForTranscript: handlers.askForTranslate,
               exportItem: handlers.askForTranslate,
              getTranscription: handlers.getTranscription,
              addToNotebook: this.props.handlers.addToNotebook,
              markAsRead: this.props.handlers.markAsRead,
            }}
            tags={tags}
            id={node.data.id}
            status={{
              isFavorite: status.isFavorite,
              hasTranslation: status.hasTranslation,
              isRead: status.isRead,
              hasTranscript: status.hasTranscript,
            }}
            isExpanded={this.props.node.expanded}
            isSelected={node.data.info.path === this.props.selectedNodePath}
            theme={theme.treeNode}
          />
          {node.expanded
            ? (node.children.length !== 0)
              ? node.children.map((item, idx) => this.getChildComponent(item, idx, level + 1))
              : <EmptyTreeNode level={level + 1}/>
            : null }
        </div>
      </ThemeProvider>
    )
  }
}

export default DirectoryTreeNode
