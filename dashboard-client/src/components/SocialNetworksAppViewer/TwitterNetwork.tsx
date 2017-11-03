import * as React from 'react'
import styled, { withTheme } from 'styled-components';
import { defaultTheme, ThemeProps } from './Theme';
import TwitterProfile from './TwitterProfile';
import MenuItem from './MenuItem';
import { TwitterData, TwitterId } from '../../types/SocialNetworks';
import TwitterMessage from './TwitterMessage';
import TwitterMention from './TwitterMention';
import TwitterFollow from './TwitterFollow';
import { TagId } from '../../types/Tag';
import { ActionMenuFunctions } from './index';

const TwitterView = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const TwitterMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 100%;
  background-color: ${prop => prop.theme.profileBgColor};
`;

const TwitterInfo = styled.div`
  display: flex;
  flex: 2;
  overflow-y: scroll;
  width: 80%;
  height: 94%;
  background-color: ${prop => prop.theme.infoBgColor};
  padding: 20px;
`;

const MyTweetsView = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
`;

const MessageContainer = styled.div`
  margin-bottom: 20px;
`;

interface MentionContainerProps {
  top: string;
  bottom: string;
}
const MentionContainer = styled.div`
  border-top: 1px solid ${(prop: MentionContainerProps) => prop.top};
  border-bottom: 1px solid ${(prop: MentionContainerProps) => prop.bottom};
  border-left: 1px solid ${prop => prop.theme.messageBorderColor};
  border-right: 1px solid ${prop => prop.theme.messageBorderColor};
`;

export interface TwitterNetworkProps extends React.Props<TwitterNetwork> {
  data: TwitterData,
  setStar: (path: string[], id: TwitterId, isFavorite: boolean) => void;
  removeTag: (path: string[], id: TwitterId, tagId: TagId) => void;
  tweeterMessageActionMenu: ActionMenuFunctions;
  tweeterMentionActionMenu: ActionMenuFunctions;
  tweeterFollowingActionMenu: ActionMenuFunctions;
  tweeterFollowerActionMenu: ActionMenuFunctions;
  theme?: ThemeProps,
}
export interface TwitterNetworkState {
  activeMenu: number;
}

class TwitterNetwork extends React.Component<TwitterNetworkProps, TwitterNetworkState> {
  static defaultProps: Partial<TwitterNetworkProps> = {
    theme: defaultTheme,
  }

  constructor (props: TwitterNetworkProps) {
    super(props)

    this.state = {
      activeMenu: 0,
    }
  }

  menuItemSelected(index: number) {
    this.setState({activeMenu: index})
  }

  getTweeterNewItems() {
    let counter = 0;
    for (let i = 0; i < this.props.data.tweets.length; i++) {
      if (!this.props.data.tweets[i].isRead) {
        counter++;
      }
    }
    return counter;
  }

  getMentionsNewItems() {
    let counter = 0;
    for (let i = 0; i < this.props.data.mentions.length; i++) {
      if (!this.props.data.mentions[i].isRead) {
        counter++;
      }
    }
    return counter;
  }

  getFollowingNewItems() {
    let counter = 0;
    for (let i = 0; i < this.props.data.following.length; i++) {
      if (!this.props.data.following[i].isRead) {
        counter++;
      }
    }
    return counter;
  }

  getFollowersNewItems() {
    let counter = 0;
    for (let i = 0; i < this.props.data.followers.length; i++) {
      if (!this.props.data.followers[i].isRead) {
        counter++;
      }
    }
    return counter;
  }

  getInfo() {
    switch (this.state.activeMenu) {
      case 0:
        return (
          <MyTweetsView>
            {this.props.data.tweets.map((item, idx) => {
              return (
                <MessageContainer key={idx}>
                  <TwitterMessage
                    message={item}
                    isComment={false}
                    setStar={this.props.setStar}
                    removeTag={this.props.removeTag}
                    tweeterMessageActionMenu={this.props.tweeterMessageActionMenu}
                  />
                </MessageContainer>
              )})}
          </MyTweetsView>);

      case 1:
        return (
          <MyTweetsView>
            {this.props.data.mentions.map((item, idx) => {
              return (
                <MentionContainer
                  key={idx}
                  top={idx === 0 ? this.props.theme.messageBorderColor : 'transparent'}
                  bottom={idx === this.props.data.mentions.length ?
                    this.props.theme.messageBorderColor : 'transparent'}
                >
                  <TwitterMention
                    message={item}
                    nickname={this.props.data.user.nickname}
                    setStar={this.props.setStar}
                    removeTag={this.props.removeTag}
                    tweeterMentionActionMenu={this.props.tweeterMentionActionMenu}
                  />
                </MentionContainer>
              )})}
          </MyTweetsView>);

      case 2:
        return (
          <MyTweetsView>
            {this.props.data.following.map((item, idx) => {
              return (
                <MentionContainer
                  key={idx}
                  top={idx === 0 ? this.props.theme.messageBorderColor : 'transparent'}
                  bottom={idx === this.props.data.mentions.length ?
                    this.props.theme.messageBorderColor : 'transparent'}
                >
                  <TwitterFollow
                    follow={item}
                    tweeterFollowActionMenu={this.props.tweeterFollowingActionMenu}
                    setStar={(id: TwitterId, isFavorite: boolean) => {this.props.setStar(
                      ['following'],
                      id,
                      isFavorite,
                    )}}
                    removeTag={(id: TwitterId, tagId: TagId) => {this.props.removeTag(
                      ['following'],
                      id,
                      tagId,
                    )}}
                  />
                </MentionContainer>
              )})}
          </MyTweetsView>);

      case 3:
        return (
          <MyTweetsView>
            {this.props.data.followers.map((item, idx) => {
              return (
                <MentionContainer
                  key={idx}
                  top={idx === 0 ? this.props.theme.messageBorderColor : 'transparent'}
                  bottom={idx === this.props.data.mentions.length ?
                    this.props.theme.messageBorderColor : 'transparent'}
                >
                  <TwitterFollow
                    follow={item}
                    tweeterFollowActionMenu={this.props.tweeterFollowerActionMenu}
                    setStar={(id: TwitterId, isFavorite: boolean) => {this.props.setStar(
                      ['followers'],
                      id,
                      isFavorite,
                    )}}
                    removeTag={(id: TwitterId, tagId: TagId) => {this.props.removeTag(
                      ['followers'],
                      id,
                      tagId,
                    )}}
                  />
                </MentionContainer>
              )})}
          </MyTweetsView>);

      default:
        return null;
    }
  }

  render() {
    return (
      <TwitterView>
        <TwitterMenu>
          <TwitterProfile data={this.props.data}/>
          <MenuItem
            title={'My Tweets'}
            items={this.props.data.tweets.length}
            newItems={this.getTweeterNewItems()}
            isActive={this.state.activeMenu === 0}
            clickCallback={() => {this.menuItemSelected(0)}}
          />
          <MenuItem
            title={'Mentions'}
            items={this.props.data.mentions.length}
            newItems={this.getMentionsNewItems()}
            isActive={this.state.activeMenu === 1}
            clickCallback={() => {this.menuItemSelected(1)}}
          />
          <MenuItem
            title={'Following'}
            items={this.props.data.following.length}
            newItems={this.getFollowingNewItems()}
            isActive={this.state.activeMenu === 2}
            clickCallback={() => {this.menuItemSelected(2)}}
          />
          <MenuItem
            title={'Followers'}
            items={this.props.data.followers.length}
            newItems={this.getFollowersNewItems()}
            isActive={this.state.activeMenu === 3}
            clickCallback={() => {this.menuItemSelected(3)}}
          />
        </TwitterMenu>
        <TwitterInfo>
          {this.getInfo()}
        </TwitterInfo>
      </TwitterView>
    )
  }
}

export default withTheme(TwitterNetwork)
