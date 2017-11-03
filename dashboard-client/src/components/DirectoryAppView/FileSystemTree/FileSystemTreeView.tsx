import * as React from 'react'
import * as Dir from '../../../types/Directory';
import * as Theme from '../Theme'
import * as Tag from '../../../types/Tag';
import moment = require('moment');
import DirectoryTreeNode from './DirectoryTreeNode'
import * as Prod from '../../../types/Product'

export interface DataProps {
  directoryTreeRoot: Dir.FileSystemNode,
  extracted: number;
}

interface FileSystemTreeViewState {
  selectedNodePath: string;
}

export interface FileSystemTreeViewProps extends React.Props<FileSystemTreeView> {
  data: DataProps;
  nodeClick: (item: Dir.FileSystemItem, path: string, mayToggle: boolean) => void;
  onItemCheck: (itemId: Prod.ProductID, isChecked: boolean) => void,
  isFetching: boolean;
  loadDirectoryContent: (path: string) => void;
  setFavourite: (itemId: Prod.ProductID, isFavorite: boolean) => void;
  removeTag: (itemId: Prod.ProductID, tag: Tag.TagId) => void;
  addTags: (itemId: Prod.ProductID, tags: Tag.TagData[]) => void;
  openNotebook: (itemId: Prod.ProductID) => void
  askForTranslate: (itemId: Prod.ProductID) => void
  getTranscription: (itemId: Prod.ProductID) => void,
  addToNotebook: (itemId: Prod.ProductID) => void,
  markAsRead: (itemId: Prod.ProductID, isRead: boolean) => void,
  selectedFileSystemItemPath: string;
  theme: Theme.ThemeProps
}

class FileSystemTreeView extends React.Component<FileSystemTreeViewProps, FileSystemTreeViewState> {
  constructor(props: FileSystemTreeViewProps) {
    super(props);

    this.state = {
      selectedNodePath: null
    }
  }

  componentWillReceiveProps(nexpProps: FileSystemTreeViewProps) {
    if (nexpProps.selectedFileSystemItemPath !== this.props.selectedFileSystemItemPath) {
      this.setState({selectedNodePath: nexpProps.selectedFileSystemItemPath})
    }
  }

  drawItems() {
    const nodes = this.props.data.directoryTreeRoot.children;

    return nodes.map((node, idx) => {
        const data = node.data;
        return (
          <DirectoryTreeNode
            key={idx}
            node={node}
            level={1}
            tags={data.tags}
            handlers={{
              nodeClick: (item: Dir.FileSystemItem, path: string, mayToggle: boolean) => {
                this.setState({selectedNodePath: item.info.path})
                this.props.nodeClick(item, path, mayToggle)
              },
              onItemCheck: this.props.onItemCheck,
              loadDirectoryContent: this.props.loadDirectoryContent,
              setFavourite : this.props.setFavourite,
              removeTag : this.props.removeTag,
              addTags : this.props.addTags,
              openNotebook : this.props.openNotebook,
              askForTranslate : this.props.askForTranslate,
              getTranscription: this.props.getTranscription,
              addToNotebook:  this.props.addToNotebook,
              markAsRead:  this.props.markAsRead,
            }}
            status={{
              isFavorite: data.isFavorite,
              hasTranslation: data.hasTranslation,
              isRead: data.isRead,
              hasTranscript: data.hasTranscript,
            }}
            selectedNodePath={this.state.selectedNodePath}
            isFetching={this.props.isFetching}
            theme={this.props.theme}
          />
        )
      }
    )
  }

  getExtractedTime() {
    return ` < ${moment(this.props.data.extracted * 1000)
      .format('HH:mm / DD/MM/YYYY')} >`
  }

  render() {
    return (
      <div>
        {this.drawItems()}
      </div>
    )
  }
}

export default FileSystemTreeView
