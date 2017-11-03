import * as React from 'react'
import styled, { withTheme } from 'styled-components';
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';
import { ConnectionsData, TwitterId } from '../../types/SocialNetworks';
import { defaultTheme, ThemeProps } from './Theme';
import { TagData, TagId } from '../../types/Tag';
import ActionToolbar from '../Common/ActionToolbar/index';
import { ActionMenuFunctions } from './index';
import SearchMarker from '../Common/SearchMarker/index';

const ConnectionContainer = styled.div`
  border-left: 2px solid ${prop => prop.color};
  padding: 5px;
  width: 100%;
`;

const ComponentView = styled.div`
  display: flex;
  width: 100%;
`;

const ImageContainer = styled.div`
  margin-left: 5px;
  width: 10%;
`;

const DetailsContainer = styled.div`
  height: 65px;
  width: 90%;
  border-bottom: 1px solid ${prop => prop.theme.borderColor};
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-right: 60px;
`;

const NameContainer = styled.div`
  font-size: 80%;
  margin-bottom: 2px;
`;

const HeadlineContainer = styled.div`
  font-size: 70%;
  color: ${prop => prop.theme.profileTextColor};
`;

const MessageToolsContainer = styled.div`
  display: flex;
  position: relative;
  top: -35px;
  left: 280px;
  justify-content: flex-end;
  width: 58%;
  height: 100%
`;

export interface LinkedinConnectionProps extends React.Props<LinkedinConnection> {
  data: ConnectionsData;
  setStar: (path: string[], id: TwitterId, isFavorite: boolean) => void;
  removeTag: (path: string[], id: TwitterId, tagId: TagId) => void;
  linkedinConnectionActionMenu: ActionMenuFunctions;
  theme?: ThemeProps;
}
export interface LinkedinConnectionState {
  isMouseOn: boolean;
  menuIsHidden: boolean;
  withFavorite: boolean;
  withNotebook: boolean;
  withTranslate: boolean;
}

class LinkedinConnection extends React.Component<LinkedinConnectionProps, LinkedinConnectionState> {
  static defaultProps: Partial<LinkedinConnectionProps> = {
    theme: defaultTheme,
  }
  constructor (props: LinkedinConnectionProps) {
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
      <ConnectionContainer
        color={!this.props.data.isRead ? this.props.theme.newItemColor : 'transparent'}
        onMouseOver={() => {this.setMouseState(true)}}
        onMouseLeave={() => {this.setMouseState(false)}}
      >
        <ComponentView>
          <ImageContainer>
            <ListItem
              disabled={true}
              leftAvatar={(
                <Avatar
                  src={this.props.data.user.avatar}
                  size={40}
                />
              )}
            />
          </ImageContainer>
          <DetailsContainer>
            <InfoContainer>
              <NameContainer><SearchMarker>{this.props.data.user.name}</SearchMarker></NameContainer>
              <HeadlineContainer>
                <SearchMarker>{this.props.data.headline} at {this.props.data.position}</SearchMarker>
              </HeadlineContainer>
            </InfoContainer>
            <MessageToolsContainer>
              <ActionToolbar
                lineHeight={'20px'}
                fontSize={15}
                withMenu={true}
                menuOnItemSelect={{
                  addTagCallback: (tags: TagData[]) => {
                    this.props.linkedinConnectionActionMenu.addTagCallback(
                      [(this.props.data.id) as number], tags)
                  },
                  addToNotebookCallback: () => {/*TODO: implementation */},
                  markAsReadCallback: () => {
                    this.props.linkedinConnectionActionMenu.markAsReadCallback([(this.props.data.id) as number])
                  },
                  markAsUnreadCallback: () => {
                    this.props.linkedinConnectionActionMenu.markAsUnreadCallback([(this.props.data.id) as number])
                  },
                  translateCallback: () => {/*TODO: implementation */},
                  transcriptCallback: () => {/*TODO: implementation */},
                  exportCallback: () => {/*TODO: implementation */},
                }}
                menuIsHidden={this.state.menuIsHidden}
                withFavorite={this.props.data.isFavorite || this.state.withFavorite}
                isFavorite={this.props.data.isFavorite}
                favoriteOnClick={() => {this.props.setStar(
                  ['connection'], (this.props.data.id) as number, !this.props.data.isFavorite)}}
                withNotebook={this.props.data.hasNotes || this.state.withNotebook}
                notebookHasNotes={this.props.data.hasNotes}
                withTranslate={this.state.withTranslate}
                withTags={true}
                tags={this.props.data.tags}
                tagOnRemove={(tagId: TagId) => {
                  this.props.removeTag(['connection'], (this.props.data.id) as number, tagId)}}
              />
            </MessageToolsContainer>
          </DetailsContainer>
        </ComponentView>
      </ConnectionContainer>
    )
  }
}

export default withTheme(LinkedinConnection)
