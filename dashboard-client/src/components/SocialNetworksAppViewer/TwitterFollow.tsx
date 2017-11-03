import * as React from 'react'
import { TweeterFollow, TwitterId } from '../../types/SocialNetworks';
import styled, { withTheme } from 'styled-components';
import { defaultTheme, ThemeProps } from './Theme';
import { TagData, TagId } from '../../types/Tag';
import ActionToolbar from '../Common/ActionToolbar/index';
import { ActionMenuFunctions } from './index';
import SearchMarker from '../Common/SearchMarker/index';

const FollowBoard = styled.div`
  background-color: ${prop => prop.theme.mentionBgColor};
  height: 100%;
  display: flex;
  padding: 15px;
  border-left: 2px solid ${prop => prop.color};
`;

const LeftSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
`;

const ImagePlusNamesContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const ImageContainer = styled.img`
  width: 48px;
  height: 48px;
  border: 2px solid ${prop => prop.theme.messageImageBorder};
  border-radius: 5px;
  margin-bottom: 20px;
  margin-right: 25px;
`;

const MessageDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
  position: relative;
  top: 14%;
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

const StatusContainer = styled.div`
  color: ${prop => prop.theme.textColor};
  font-size: 70%;
  height: 20px;
`;

const MessageToolsContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-end;
  width: 25%;
  height: 100%;
  margin-left: 30%;
`;

export interface TwitterFollowProps extends React.Props<TwitterFollow> {
  follow: TweeterFollow;
  setStar: (id: TwitterId, isFavorite: boolean) => void;
  removeTag: (id: TwitterId, tagId: TagId) => void;
  tweeterFollowActionMenu: ActionMenuFunctions;
  theme?: ThemeProps;
}
export interface TwitterFollowState {
  isMouseOn: boolean;
  menuIsHidden: boolean;
  withFavorite: boolean;
  withNotebook: boolean;
  withTranslate: boolean;
}

class TwitterFollow extends React.Component<TwitterFollowProps, TwitterFollowState> {
  static defaultProps: Partial<TwitterFollowProps> = {
    theme: defaultTheme,
  }
  constructor (props: TwitterFollowProps) {
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
      <FollowBoard
        color={!this.props.follow.isRead ? this.props.theme.newItemColor : 'transparent'}
        onMouseOver={() => {this.setMouseState(true)}}
        onMouseLeave={() => {this.setMouseState(false)}}
      >
        <LeftSideContainer>
          <ImagePlusNamesContainer>
            <ImageContainer src={this.props.follow.user.avatar}/>
            <MessageDetailsContainer>
              <NameContainer><SearchMarker>{this.props.follow.user.name}</SearchMarker></NameContainer>
              <NicknameContainer>@<SearchMarker>{this.props.follow.user.nickname}</SearchMarker></NicknameContainer>
            </MessageDetailsContainer>
          </ImagePlusNamesContainer>
          <StatusContainer><SearchMarker>{this.props.follow.status}</SearchMarker></StatusContainer>
        </LeftSideContainer>
        <MessageToolsContainer>
          <ActionToolbar
            lineHeight={'20px'}
            fontSize={15}
            withMenu={true}
            menuOnItemSelect={{
              addTagCallback: (tags: TagData[]) => {
                this.props.tweeterFollowActionMenu.addTagCallback(
                  [(this.props.follow.id) as number], tags)
              },
              addToNotebookCallback: () => {/*TODO: implementation */},
              markAsReadCallback: () => {
                this.props.tweeterFollowActionMenu.markAsReadCallback([(this.props.follow.id) as number])
              },
              markAsUnreadCallback: () => {
                this.props.tweeterFollowActionMenu.markAsUnreadCallback([(this.props.follow.id) as number])
              },
              translateCallback: () => {/*TODO: implementation */},
              transcriptCallback: () => {/*TODO: implementation */},
              exportCallback: () => {/*TODO: implementation */},
            }}
            menuIsHidden={this.state.menuIsHidden}
            withFavorite={this.props.follow.isFavorite || this.state.withFavorite}
            isFavorite={this.props.follow.isFavorite}
            favoriteOnClick={() => {
              this.props.setStar((this.props.follow.id) as number, !this.props.follow.isFavorite)}
            }
            withNotebook={this.props.follow.hasNotes || this.state.withNotebook}
            notebookHasNotes={this.props.follow.hasNotes}
            withTranslate={this.state.withTranslate}
            withTags={true}
            tags={this.props.follow.tags}
            tagOnRemove={(tagId: TagId) => {this.props.removeTag((this.props.follow.id) as number, tagId)}}
          />
        </MessageToolsContainer>
      </FollowBoard>
    )
  }
}

export default withTheme(TwitterFollow)
