import * as React from 'react'
import ActionToolbar from '../Common/ActionToolbar/index';
import { TagData, TagId } from '../../types/Tag';
import ListItem from './MailItem';
import styled from 'styled-components';
import { MailData } from '../../types/Mail';
import SearchMarker from '../Common/SearchMarker/index';

const MailInformation = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  width: calc(100% - 4rem);
`;

const AccountContainer = styled.div`
  font-size: 1.4rem;
  width: 100%;
`;

const MessageContainer = styled.div`
  display: flex;
  width: 100%;
`;

const SubjectContainer = styled.span`
  font-size: 1.2rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 60%;
  white-space: nowrap;
  overflow:hidden !important;
`;

const ContentContainer = styled.span`
  font-size: 1.2rem;
  color: ${prop => prop.theme.contentColor};
  width: 40%;
  margin-left: 1rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden !important;
`;

export interface MailProps extends React.Props<Mail> {
  data: MailData;
  onMailClick: (id: string) => void;
  setStar: (id: string, isFavorite: boolean) => void;
  removeTag: (id: string, tagId: TagId) => void;
  mailAddTag: (ids: string[], tags: TagData[]) => void;
  markAsRead: (ids: string[]) => void;
  markAsUnread: (ids: string[]) => void;
  itemSelected: (id: string) => void;
  itemUnSelected: (id: string) => void;
  isItemSelected: (id: string) => boolean;
}
export interface MailState {
  isMouseOn: boolean;
  menuIsHidden: boolean;
  withFavorite: boolean;
  withNotebook: boolean;
  withTranslate: boolean;
}

class Mail extends React.Component<MailProps, MailState> {
  constructor (props: MailProps) {
    super(props)

    this.state = {
      isMouseOn: false,
      menuIsHidden: true,
      withFavorite: false,
      withNotebook: false,
      withTranslate: false,
    }
  }

  componentWillReceiveProps() {
    this.setState({
      isMouseOn: false,
    })
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
    if (this.props.isItemSelected(this.props.data.id)) {return}
    this.setState({
      isMouseOn: false,
      menuIsHidden: true,
      withFavorite: false,
      withNotebook: false,
      withTranslate: false,
    })
  }

  onCheck = () => {
    if (this.props.isItemSelected(this.props.data.id)) {
      this.props.itemUnSelected(this.props.data.id)
    } else {
      this.props.itemSelected(this.props.data.id)
    }
  }

  getActionToolbar() {
    return (
      <ActionToolbar
        lineHeight={'30px'}
        fontSize={16}
        withMenu={true}
        menuIsHidden={this.state.menuIsHidden}
        menuOnItemSelect={{
          addTagCallback: (tags: TagData[]) => {this.props.mailAddTag([this.props.data.id], tags)},
          addToNotebookCallback: () => null,
          markAsReadCallback: () => {this.props.markAsRead([this.props.data.id])},
          markAsUnreadCallback: () => {this.props.markAsUnread([this.props.data.id])},
          translateCallback: () => null,
          transcriptCallback: () => null,
          exportCallback: () => null,
        }}
        withFavorite={this.props.data.isFavorite || this.state.withFavorite}
        isFavorite={this.props.data.isFavorite}
        favoriteOnClick={() => {this.props.setStar(this.props.data.id, !this.props.data.isFavorite)}}
        withNotebook={this.props.data.hasNotes || this.state.withNotebook}
        notebookHasNotes={this.props.data.hasNotes}
        withTranslate={this.props.data.hasTranslation || this.state.withTranslate}
        hasTranslate={this.props.data.hasTranslation}
        withTags={true}
        tags={this.props.data.tags}
        tagOnRemove={(tagId: TagId) => {this.props.removeTag(this.props.data.id, tagId)}}
      />
    )
  }

  render() {
    return (
      <ListItem
        content={(
          <MailInformation
            onClick={() => {
              this.props.onMailClick(this.props.data.id);
              if (!this.props.data.isRead) {
                this.props.markAsRead([this.props.data.id]);
              }
          }}
          >
            <AccountContainer><SearchMarker>{this.props.data.from}</SearchMarker></AccountContainer>
            <MessageContainer>
              <SubjectContainer><SearchMarker>{this.props.data.subject}</SearchMarker></SubjectContainer>
              <ContentContainer><SearchMarker>{this.props.data.shortContent}</SearchMarker></ContentContainer>
            </MessageContainer>
          </MailInformation>
        )}
        isNewItem={!this.props.data.isRead}
        isAttachment={this.props.data.attachments.length > 0}
        actionToolbar={this.getActionToolbar()}
        timestamp={this.props.data.timestamp}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onCheck={this.onCheck}
        isChecked={this.props.isItemSelected(this.props.data.id)}
        isSelected={this.props.isItemSelected(this.props.data.id)}
        isMouseOn={this.state.isMouseOn}
      />
    )
  }
}

export default Mail
