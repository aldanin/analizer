import * as React from 'react'
import { Browser, browserTreeObjectId } from '../../types/Browser';
import ListItem from './NodeItem';
import { TagData, TagId } from '../../types/Tag';
import styled from 'styled-components';
import { ProductID } from '../../types/Product';
import PageStatusNoData from '../Common/PageStatus/index';

const BookmarkView = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 40px);
  overflow-y: scroll;
`;

export interface DataProps {
  browsers: Browser[];
  extracted: number;
}

export interface BookmarkListProps extends React.Props<BookmarkList> {
  data: DataProps;
  isExpandMode: boolean;
  bookmarkSetStar: (id: browserTreeObjectId, isFavorite: boolean) => void;
  bookmarkRemoveTag: (id: browserTreeObjectId, tag: TagId) => void;
  bookmarkOpenNotebook: () => void
  bookmarkAskForTranslate: () => void
  bookmarkGetTranslate: () => void
  bookmarksAddTag: (ids: browserTreeObjectId[], tags: TagData[]) => void;
  bookmarksAddToNotebook: (ids: browserTreeObjectId[]) => void;
  bookmarksMarkAsRead: (ids: browserTreeObjectId[]) => void;
  bookmarksMarkAsUnRead: (ids: browserTreeObjectId[]) => void;
  bookmarksAskForTranslate: (ids: browserTreeObjectId[]) => void;
  bookmarksAskForTranscript: (ids: browserTreeObjectId[]) => void;
  bookmarksExportItem: (ids: browserTreeObjectId[]) => void;
  onItemSelected: (id: browserTreeObjectId) => void;
  onItemUnSelected: (id: browserTreeObjectId) => void;
  updateOpenItems: (id: browserTreeObjectId, state: boolean) => void;
  isOpen: (id: browserTreeObjectId) => boolean;
  isItemSelected: (id: browserTreeObjectId) => boolean;
}

export interface BookmarkListState {
  dataExist: boolean;
  checkedBookmarks: string[];
  openItems: ProductID[];
}

class BookmarkList extends React.Component<BookmarkListProps, BookmarkListState> {
  constructor(props: BookmarkListProps) {
    super(props);

    this.state = {
      openItems: [],
      checkedBookmarks: [],
      dataExist: false,
    }
  }

  updateDataIsExist = (isDataExist: boolean) => {
    if (this.state.checkedBookmarks.length < this.props.data.browsers.length) {
      if (!this.state.dataExist && isDataExist) {
        this.setState({
          dataExist: true,
        });
      }

      let tempArray = this.state.checkedBookmarks;
      tempArray.push('Checked');
      this.setState({
        checkedBookmarks: tempArray,
      })
    }
  }

  drawItems() {
    return this.props.data.browsers.map((item, idx) => (
      <ListItem
        key={idx}
        level={1}
        node={item}
        autoExpand={this.props.isExpandMode}
        changeOpenState={(id, state) => {
          this.props.updateOpenItems(id, state)
        }}
        isOpen={(id) => {
          return this.props.isOpen(id)
        }}
        setStar={this.props.bookmarkSetStar}
        removeTag={this.props.bookmarkRemoveTag}
        openNotebook={this.props.bookmarkOpenNotebook}
        askForTranslate={this.props.bookmarkAskForTranslate}
        getTranslate={this.props.bookmarkGetTranslate}
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
        updateDataIsExist={this.updateDataIsExist}
      />
    ))
  }

  render() {
    if ((!this.state.dataExist) && (this.state.checkedBookmarks.length === this.props.data.browsers.length)) {
      return <PageStatusNoData/>
    }
    return <BookmarkView>{this.drawItems()}</BookmarkView>
  }
}

export default BookmarkList
