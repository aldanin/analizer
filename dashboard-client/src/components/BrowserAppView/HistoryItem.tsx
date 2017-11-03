import * as React from 'react'
import styled from 'styled-components';
import { SiteInfo, BrowserInfo, browserTreeObjectId } from '../../types/Browser';
import { withTheme } from 'styled-components';
import { ThemeProps } from './Theme';
import moment = require('moment');
import { TagData, TagId } from '../../types/Tag';
import ListItem from '../Common/ListItem/index';
import ActionToolbar from '../Common/ActionToolbar/index';
import SearchMarker from '../Common/SearchMarker/index';

const Time = styled.span`
  width: 12%;
  display: block;
  position: relative;
  top: 2px;
  font-size: 80%;
  font-weight: bold;
  color: ${(props) => props.theme.history.timeColor};
`;

const Icon = styled.span`
  width: 2.5%;
  position: relative;
  top: 9px;
`;

const Title = styled.span`
  width: 27%;
  position: relative;
  top: 2px;
  font-size: 90%;
  color: ${(props) => props.theme.defaultTextColor};
  margin-right: 10px;
  overflow: hidden !important;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const URL = styled.span`
  display: flex;
  justify-content: flex-start;
  width: 28%;
  position: relative;
  top: 2px;
  font-size: 80%;
  margin-right: 30px;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const CleanURL = styled.span`
  color: ${(props) => props.theme.defaultTextColor};
  width: 100%;
  white-space: nowrap;
  overflow:hidden !important;
  text-overflow: ellipsis;
  max-width: 70ch;
`;

const FilterURL = styled.span`
  color: ${(props) => props.theme.history.filterColor};
`;

const BrowserIcon = styled.span`
  width: 2.5%;
  position: relative;
  top: 6px;
  margin-right: 5px;
`;

const Browser = styled.span`
  position: relative;
  top: 2px;
  font-size: 80%;
  color: ${(props) => props.theme.history.browserColor};
  margin-right: 10px;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export interface HistoryItemProps extends React.Props<HistoryItem> {
  id: browserTreeObjectId;
  isRead: boolean;
  timestamp: number;
  title: SiteInfo;
  cleanUrl: string;
  extraUrl: string;
  browser: BrowserInfo;
  tags: TagData[];
  isFavorite: boolean;
  isNoteBook: boolean;
  isTranslate: boolean;
  setStar: (id: browserTreeObjectId, isFavorite: boolean) => void;
  removeTag: (id: browserTreeObjectId, tag: TagId) => void;
  addTag: (id: browserTreeObjectId[], tag: TagData[]) => void;
  addToNotebook: (id: browserTreeObjectId[]) => void;
  markAsRead: (id: browserTreeObjectId[]) => void;
  markAsUnRead: (id: browserTreeObjectId[]) => void;
  askForTranslate: (id: browserTreeObjectId[]) => void;
  askForTranscript: (id: browserTreeObjectId[]) => void;
  exportItem: (id: browserTreeObjectId[]) => void;
  openNotebook: () => void
  getTranslate: () => void
  historyItemSelected: (id: browserTreeObjectId) => void;
  historyItemUnSelected: (id: browserTreeObjectId) => void;
  isItemSelected: (id: browserTreeObjectId) => boolean;
  theme?: ThemeProps;
}

export interface HistoryItemState {
  isMouseOn: boolean;
  menuIsHide: boolean;
  withFavorite: boolean;
  withNotebook: boolean;
  withTranslate: boolean;
}

class HistoryItem extends React.Component<HistoryItemProps, HistoryItemState> {

  constructor (props: HistoryItemProps) {
    super(props);

    this.state = {
      isMouseOn: false,
      menuIsHide: true,
      withFavorite: false,
      withNotebook: false,
      withTranslate: false,
    }
  }

  onMouseEnter = () => {
    this.changeIsMouseOnState(true);
    this.setState({
      menuIsHide: false,
      withFavorite: true,
      withNotebook: true,
      withTranslate: true,
    })
  }

  onMouseLeave = () => {
    this.changeIsMouseOnState(false);
    if (this.props.isItemSelected(this.props.id)) {return}
    this.setState({
      menuIsHide: true,
      withFavorite: false,
      withNotebook: false,
      withTranslate: false,
    })
  }

  changeIsMouseOnState(isOn: boolean) {
    this.setState({isMouseOn: isOn});
  }

  onCheck = () => {
    if (!this.props.isRead) {
      this.props.markAsRead([this.props.id])
    }
    if (this.props.isItemSelected(this.props.id)) {
      this.props.historyItemUnSelected(this.props.id)
    } else {
      this.props.historyItemSelected(this.props.id)
    }
  }

  getContent() {
    return(
      <Content>
        <Time onClick={() => {this.onCheck()}}>
          <SearchMarker>{moment(this.props.timestamp).format('HH:mm DD/MM/YYYY')}</SearchMarker>
        </Time>
        <Icon onClick={() => {this.onCheck()}}>
          <i className="material-icons">{this.props.title.icon}</i>
        </Icon>
        <Title onClick={() => {this.onCheck()}} title={this.props.title.name}>
          <SearchMarker>{this.props.title.name}</SearchMarker>
        </Title>
        <URL title={this.props.cleanUrl + this.props.extraUrl}>
          <CleanURL onClick={() => {this.onCheck()}}><SearchMarker>{this.props.cleanUrl}</SearchMarker></CleanURL>
          <FilterURL onClick={() => {this.onCheck()}}><SearchMarker>{this.props.extraUrl}</SearchMarker></FilterURL>
        </URL>
        <BrowserIcon onClick={() => {this.onCheck()}}>
          <img
            src={'../../icons/' + this.props.browser.icon + '.ico'}
            width="24"
          />
        </BrowserIcon>
        <Browser onClick={() => {this.onCheck()}}><SearchMarker>{this.props.browser.name}</SearchMarker></Browser>
      </Content>
    )
  }

  render() {
    return (
      <ListItem
        lineHeight={'40px'}
        isNewItem={!this.props.isRead}
        onCheck={this.onCheck}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        isChecked={this.props.isItemSelected(this.props.id)}
        isSelected={this.props.isItemSelected(this.props.id)}
        isMouseOn={this.state.isMouseOn}
        content={this.getContent()}
        actionToolbar={
          <ActionToolbar
            lineHeight={'40px'}
            withMenu={true}
            menuIsHidden={this.state.menuIsHide}
            menuOnItemSelect={{
              addTagCallback: (tags: TagData[]) => {this.props.addTag([this.props.id], tags)},
              addToNotebookCallback: () => {this.props.addToNotebook([this.props.id])},
              markAsReadCallback: () => {this.props.markAsRead([this.props.id])},
              markAsUnreadCallback: () => {this.props.markAsUnRead([this.props.id])},
              translateCallback: () => {this.props.askForTranslate([this.props.id])},
              transcriptCallback: () => {this.props.askForTranscript([this.props.id])},
              exportCallback: () => {this.props.exportItem([this.props.id])},
            }}
            withFavorite={this.props.isFavorite || this.state.withFavorite}
            isFavorite={this.props.isFavorite}
            favoriteOnClick={() => {this.props.setStar(this.props.id , !this.props.isFavorite)}}
            withNotebook={this.props.isNoteBook || this.state.withNotebook}
            notebookHasNotes={this.props.isNoteBook}
            withTranslate={this.props.isTranslate || this.state.withTranslate}
            hasTranslate={this.props.isTranslate}
            withTags={true}
            tags={this.props.tags}
            tagOnRemove={(tagId: TagId) => {this.props.removeTag(this.props.id, tagId)}}
          />
        }
      />)
  }
}

export default withTheme(HistoryItem)
