import * as React from 'react'
import * as Tag from '../../../types/Tag';
import { ThemeProps } from '../Theme'
import * as Dir  from '../../../types/Directory'
import * as Prod from '../../../types/Product'
import TreeNode from '../../Common/TreeNode'
import FileExtensionIcon from '../../Common/FileExtensionIcon'
import { ThemeProvider } from 'styled-components'

export interface FileTreeNodeProps {
  level: number;
  node: Dir.FileSystemNode,
  tags: Tag.TagData[];
  theme: ThemeProps;
  status: {
    isFavorite: boolean;
    hasTranslation: boolean,
    isRead: boolean;
    hasTranscript: boolean;
  };
  handlers: {
    nodeClick: (item: Dir.FileSystemItem) => void;
    onItemCheck: (itemId: Prod.ProductID, isChecked: boolean) => void;
    setFavourite: (itemId: Prod.ProductID, isFavorite: boolean) => void;
    removeTag: (itemId: Prod.ProductID, tag: Tag.TagId) => void;
    addTags: (itemId: Prod.ProductID, tags: Tag.TagData[]) => void;
    openNotebook: (itemId: Prod.ProductID) => void;
    askForTranslate: (itemId: Prod.ProductID) => void;
    getTranscription: (itemId: Prod.ProductID) => void;
    addToNotebook: (itemId: Prod.ProductID) => void;
    markAsRead: (itemId: Prod.ProductID, isRead: boolean) => void;
  };
  selectedNodePath: string;
}

const getIcon = (props: FileTreeNodeProps) => {
  const extension = (props.node.data as Dir.FileItem).info.extension;

  return (
    <FileExtensionIcon
      extension={extension}
      theme={{appSymbols: props.theme.appSymbols}}
    />
  )
}

class FileTreeNode extends React.Component<FileTreeNodeProps, {}> {

  componentDidUpdate(prevProps: FileTreeNodeProps) {
    const json1 = JSON.stringify(prevProps.node.data);
    const json2 = JSON.stringify(this.props.node.data);

    //
    // If this node's data was changed, e.g. its isFavorite state was changed, we want to
    // trigger a chain reaction that would lead to a state change in the parent Content component:
    //
    if (json1 !== json2) {
      this.props.handlers.nodeClick(this.props.node.data);
    }
  }

  render() {
    const {level, node, handlers, status, theme} = this.props;
    const data = node.data;

    return (
      <ThemeProvider theme={theme.treeNode}>
        <TreeNode
          level={level}
          icon={getIcon(this.props)}
          name={data.name}
          isExpandable={false}
          handlers={{
            nodeClick : () => {
              this.props.handlers.nodeClick(this.props.node.data)
            },
            onItemCheck : (isChecked: boolean) => {
              this.props.handlers.onItemCheck(node.path, isChecked)
            },
            setFavourite : (itemId: Prod.ProductID, isFavorite) => {
              return handlers.setFavourite(node.path, isFavorite)
            },
            removeTag : (itemId: Prod.ProductID, tagId: Tag.TagId) => {
              return handlers.removeTag(node.path, tagId)
            },
            addTags : (itemId: Prod.ProductID, tags: Tag.TagData[]) => {
              return handlers.addTags(node.path, tags)
            },
            askForTranslate : (itemId: Prod.ProductID) => {
              return handlers.askForTranslate(node.path)
            },
             askForTranscript : (itemId: Prod.ProductID) => {
              return handlers.askForTranslate(node.path)
            },
             exportItem : (itemId: Prod.ProductID) => {
              return handlers.askForTranslate(node.path)
            },
            openNotebook : (itemId: Prod.ProductID) => {
              return handlers.openNotebook(data.info.path)
            },
            addToNotebook : (itemId: Prod.ProductID) => {
              return handlers.addToNotebook(node.path)
            },
            getTranscription : (itemId: Prod.ProductID) => {
              return handlers.getTranscription(node.path)
            },
            markAsRead : (itemId: Prod.ProductID, isRead: boolean) => {
              return handlers.markAsRead(node.path, isRead)
            },
          }}
          tags={this.props.tags}
          id={data.id}
          status={{
            isFavorite : status.isFavorite,
            hasTranslation : status.hasTranslation,
            isRead : status.isRead,
            hasTranscript : status.hasTranscript,
          }}
          isExpanded={false}
          isSelected={node.path === this.props.selectedNodePath}
          theme={this.props.theme.treeNode}
        />
      </ThemeProvider>
    )
  }
}

export default FileTreeNode
