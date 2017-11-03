import * as React from 'react'
import { TweeterMessage, TwitterId } from '../../types/SocialNetworks';
import { defaultTheme, ThemeProps } from './Theme';
import styled, { withTheme } from 'styled-components';
import moment = require('moment');
import { TagData, TagId } from '../../types/Tag';
import ActionToolbar from '../Common/ActionToolbar/index';
import { ActionMenuFunctions } from './index';
import SearchMarker from '../Common/SearchMarker/index';

const ComponentView = styled.div`
  width: 100%;
  height: 100%;
`;

interface MessageBoardProps {
  isNew: string;
}
const MessageBoard = styled.div`
  background-color: ${prop => prop.color};
  height: 100%;
  border: 1px solid ${prop => prop.theme.messageBorderColor};
  margin-bottom: 1px;
  display: flex;
  padding: 15px;
  border-left: ${(prop: MessageBoardProps) => prop.isNew};
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

const ShowCommentsContainer = styled.div`
  position: absolute;
  display: flex;
  top: 80px;
  right: 10%;
  height: 100%;
  color: ${prop => prop.theme.linkColor};
  font-size: 60%;
  cursor: pointer;
`;

const HideCommentsContainer = styled.div`
  position: absolute;
  display: flex;
  top: 110px;
  right: 10%;
  height: 100%;
  color: ${prop => prop.theme.linkColor};
  font-size: 60%;
  cursor: pointer;
`;

const ArrowContainer = styled.div`
  position: relative;
  top: 4px;
  margin-left: 5px;
  color: ${prop => prop.theme.linkColor};
  font-size: 70%;
  font-weight: bold;
`;

export interface TwitterMessageProps extends React.Props<TwitterMessage> {
  message: TweeterMessage;
  isComment: boolean;
  setStar: (path: string[], id: TwitterId, isFavorite: boolean) => void;
  removeTag: (path: string[], id: TwitterId, tagId: TagId) => void;
  tweeterMessageActionMenu: ActionMenuFunctions;
  theme?: ThemeProps;
}
export interface TwitterMessageState {
  isShowCommentsMode: boolean;
  isMouseOn: boolean;
  menuIsHidden: boolean;
  withFavorite: boolean;
  withNotebook: boolean;
  withTranslate: boolean;
}

class TwitterMessage extends React.Component<TwitterMessageProps, TwitterMessageState> {
  static defaultProps: Partial<TwitterMessageProps> = {
    theme: defaultTheme,
  }

  constructor (props: TwitterMessageProps) {
    super(props)

    this.state = {
      isShowCommentsMode: false,
      isMouseOn: false,
      menuIsHidden: true,
      withFavorite: false,
      withNotebook: false,
      withTranslate: false,
    }
  }

  setMouseState(isMouseOn: boolean) {
    if (isMouseOn && !this.props.isComment) {
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

  showComment() {
    this.setState({isShowCommentsMode: true});
  }

  hideComment() {
    this.setState({isShowCommentsMode: false});
  }

  render() {
    return (
      <ComponentView>
        <MessageBoard
          color={this.props.isComment ? this.props.theme.commentBgColor : this.props.theme.messageBgColor}
          onMouseOver={() => {this.setMouseState(true)}}
          onMouseLeave={() => {this.setMouseState(false)}}
          isNew={!this.props.message.isRead ?
            '1px solid' + this.props.theme.newItemColor : '1px solid' + this.props.theme.messageBorderColor}
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
                <SearchMarker>{this.props.message.content}</SearchMarker>
              </MessageContentContainer>
            </MessageDetailsRow>
            <MessageDetailsRow>
              <CommentsIconContainer className="material-icons">reply</CommentsIconContainer>
              <CommentsNumber>{this.props.message.comments.length}</CommentsNumber>
              <CommentsIconContainer className="material-icons">repeat</CommentsIconContainer>
              <CommentsNumber>{this.props.message.shares}</CommentsNumber>
              <CommentsIconContainer className="material-icons">favorite</CommentsIconContainer>
              <CommentsNumber>{this.props.message.likes}</CommentsNumber>
            </MessageDetailsRow>
          </MessageDetailsContainer>
          <MessageToolsContainer>
            <ActionToolbar
              lineHeight={'30px'}
              menuOnItemSelect={{
                addTagCallback: (tags: TagData[]) => {
                  this.props.tweeterMessageActionMenu.addTagCallback(
                    [(this.props.message.id) as number], tags)
                },
                addToNotebookCallback: () => {/*TODO: implementation */},
                markAsReadCallback: () => {
                  this.props.tweeterMessageActionMenu.markAsReadCallback([(this.props.message.id) as number])
                },
                markAsUnreadCallback: () => {
                  this.props.tweeterMessageActionMenu.markAsUnreadCallback([(this.props.message.id) as number])
                },
                translateCallback: () => {/*TODO: implementation */},
                transcriptCallback: () => {/*TODO: implementation */},
                exportCallback: () => {/*TODO: implementation */},
              }}
              fontSize={15}
              withMenu={true}
              menuIsHidden={this.state.menuIsHidden}
              withFavorite={this.props.message.isFavorite || this.state.withFavorite}
              isFavorite={this.props.message.isFavorite}
              favoriteOnClick={() => {this.props.setStar(
                  ['tweets'], (this.props.message.id) as number, !this.props.message.isFavorite)}}
              withNotebook={this.props.message.hasNotes || this.state.withNotebook}
              notebookHasNotes={this.props.message.hasNotes}
              withTranslate={this.state.withTranslate}
              withTags={true}
              tags={this.props.message.tags}
              tagOnRemove={(tagId: TagId) => {
                this.props.removeTag(['tweets'], (this.props.message.id) as number, tagId)}}
            />
            {!this.props.isComment && this.props.message.comments.length > 0 ?
              !this.state.isShowCommentsMode ? (
              <ShowCommentsContainer onClick={() => {this.showComment()}}>
                <SearchMarker>Show comments</SearchMarker>
                <ArrowContainer className="base_icons icon_arrow_down"/>
              </ShowCommentsContainer>
            ) : (
              <HideCommentsContainer onClick={() => {this.hideComment()}}>
                <SearchMarker>Hide comments</SearchMarker>
                <ArrowContainer className="base_icons icon_arrow_up"/>
              </HideCommentsContainer>
            ) : null}
          </MessageToolsContainer>
        </MessageBoard>
    {this.state.isShowCommentsMode ? (
      this.props.message.comments.map((comment, idx) => {
        return (
        <TwitterMessage
          key={idx}
          message={comment}
          isComment={true}
          theme={this.props.theme}
          setStar={this.props.setStar}
          removeTag={this.props.removeTag}
          tweeterMessageActionMenu={this.props.tweeterMessageActionMenu}
        />
        )})
    ) : null}
      </ComponentView> )
  }
}

export default withTheme(TwitterMessage)
