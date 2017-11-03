import * as React from 'react'
import { TweeterMention, TwitterId } from '../../types/SocialNetworks';
import styled, { withTheme } from 'styled-components';
import moment = require('moment');
import { defaultTheme, ThemeProps } from './Theme';
import { TagData, TagId } from '../../types/Tag';
import ActionToolbar from '../Common/ActionToolbar/index';
import { ActionMenuFunctions } from './index';
import SearchMarker from '../Common/SearchMarker/index';

const MessageBoard = styled.div`
  background-color: ${prop => prop.theme.mentionBgColor};
  height: 100%;
  display: flex;
  padding: 15px;
  border-left: 2px solid ${prop => prop.color};
`;

const ImageContainer = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 3%;
  border: 2px solid ${prop => prop.theme.messageImageBorder};
  border-radius: 5px;
`;

const MessageDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
  position: relative;
  top: 14%;
`;

const MessageDetailsRow = styled.div`
  display: flex;
  width: 100%;
`;

const NameContainer = styled.div`
  color: ${prop => prop.theme.textColor};
  font-size: 85%;
  font-weight: bold;
  margin-right: 3%;
`;

const NicknameContainer = styled.div`
  position: relative;
  top: 1px;
  color: ${prop => prop.theme.messageIconsColor};
  font-size: 70%;
  margin-right: 3%;
`;

const DateContainer = styled.div`
  position: relative;
  top: 1px;
  color: ${prop => prop.theme.messageIconsColor};
  font-size: 70%;
  margin-right: 3%;
`;

const MessageContentContainer = styled.div`
  display: flex;
  font-size: 70%;
  margin-top: 18px;
  margin-bottom: 18px;
`;

const CommentsIconContainer = styled.div`
  color: ${prop => prop.theme.messageIconsColor};
  font-size: 70%;
  margin-right: 0.5%;
`;

const CommentsNumber = styled.div`
  position: relative;
  top: -1px;
  color: ${prop => prop.theme.messageIconsColor};
  font-size: 70%;
  margin-right: 6%;
`;

const MessageToolsContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-end;
  width: 25%;
  height: 100%;
`;

const MentionContainer = styled.div`
  margin-right: 5px;
  margin-left: 5px;
  color: ${prop => prop.theme.linkColor};
`;

export interface TwitterMentionProps extends React.Props<TwitterMention> {
  message: TweeterMention;
  nickname: string;
  setStar: (path: string[], id: TwitterId, isFavorite: boolean) => void;
  removeTag: (path: string[], id: TwitterId, tagId: TagId) => void;
  tweeterMentionActionMenu: ActionMenuFunctions;
  theme?: ThemeProps;
}
export interface TwitterMentionState {
  isMouseOn: boolean;
  menuIsHidden: boolean;
  withFavorite: boolean;
  withNotebook: boolean;
  withTranslate: boolean;
}

class TwitterMention extends React.Component<TwitterMentionProps, TwitterMentionState> {
  static defaultProps: Partial<TwitterMentionProps> = {
    theme: defaultTheme,
  }
  constructor (props: TwitterMentionProps) {
    super(props)

    this.state = {
      isMouseOn: false,
      menuIsHidden: true,
      withFavorite: false,
      withNotebook: false,
      withTranslate: false,
    }
  }

  setMouseState(isMouseOn: boolean) {
    if (isMouseOn) {
      this.setState({
        isMouseOn: isMouseOn,
        menuIsHidden: false,
        withFavorite: true,
        withNotebook: true,
        withTranslate: true,
      })
    } else {
      this.setState({
        isMouseOn: isMouseOn,
        menuIsHidden: true,
        withFavorite: false,
        withNotebook: false,
        withTranslate: false,
      })
    }
  }

  render() {
    return (
      <MessageBoard
        onMouseOver={() => {this.setMouseState(true)}}
        onMouseLeave={() => {this.setMouseState(false)}}
        color={!this.props.message.isRead ? this.props.theme.newItemColor : 'transparent'}
      >
        <ImageContainer src={this.props.message.user.avatar}/>
        <MessageDetailsContainer>
          <MessageDetailsRow>
            <NameContainer><SearchMarker>{this.props.message.user.name}</SearchMarker></NameContainer>
            <NicknameContainer>@<SearchMarker>{this.props.message.user.nickname}</SearchMarker></NicknameContainer>
            <DateContainer>
              <SearchMarker>{moment(this.props.message.postDate).format('DD/MM/YYYY HH:mm')}</SearchMarker>
            </DateContainer>
          </MessageDetailsRow>
          <MessageDetailsRow>
            <MessageContentContainer>
              <SearchMarker>{this.props.message.contentBefore}</SearchMarker>
              <MentionContainer>@<SearchMarker>{this.props.nickname}</SearchMarker></MentionContainer>
              <SearchMarker>{this.props.message.contentAfter}</SearchMarker>
            </MessageContentContainer>
          </MessageDetailsRow>
          <MessageDetailsRow>
            <CommentsIconContainer className="material-icons">reply</CommentsIconContainer>
            <CommentsNumber>{this.props.message.comments}</CommentsNumber>
            <CommentsIconContainer className="material-icons">repeat</CommentsIconContainer>
            <CommentsNumber>{this.props.message.shares}</CommentsNumber>
            <CommentsIconContainer className="material-icons">favorite</CommentsIconContainer>
            <CommentsNumber>{this.props.message.likes}</CommentsNumber>
          </MessageDetailsRow>
        </MessageDetailsContainer>
        <MessageToolsContainer>
          <ActionToolbar
            lineHeight={'20px'}
            fontSize={15}
            withMenu={true}
            menuOnItemSelect={{
              addTagCallback: (tags: TagData[]) => {
                this.props.tweeterMentionActionMenu.addTagCallback(
                  [(this.props.message.id) as number], tags)
              },
              addToNotebookCallback: () => {/*TODO: implementation */},
              markAsReadCallback: () => {
                this.props.tweeterMentionActionMenu.markAsReadCallback([(this.props.message.id) as number])
              },
              markAsUnreadCallback: () => {
                this.props.tweeterMentionActionMenu.markAsUnreadCallback([(this.props.message.id) as number])
              },
              translateCallback: () => {/*TODO: implementation */},
              transcriptCallback: () => {/*TODO: implementation */},
              exportCallback: () => {/*TODO: implementation */},
            }}
            menuIsHidden={this.state.menuIsHidden}
            withFavorite={this.props.message.isFavorite || this.state.withFavorite}
            isFavorite={this.props.message.isFavorite}
            favoriteOnClick={() => {this.props.setStar(
              ['mentions'], (this.props.message.id) as number, !this.props.message.isFavorite)}}
            withNotebook={this.props.message.hasNotes || this.state.withNotebook}
            notebookHasNotes={this.props.message.hasNotes}
            withTranslate={this.state.withTranslate}
            withTags={true}
            tags={this.props.message.tags}
            tagOnRemove={(tagId: TagId) => {
              this.props.removeTag(['mentions'], (this.props.message.id) as number, tagId)}}
          />
        </MessageToolsContainer>
      </MessageBoard>
    )
  }
}

export default withTheme(TwitterMention)
