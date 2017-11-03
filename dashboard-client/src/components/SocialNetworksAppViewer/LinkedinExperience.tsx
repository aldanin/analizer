import * as React from 'react'
import styled from 'styled-components';
import { defaultTheme, ThemeProps } from './Theme';
import { LinkedinExperienceData, TwitterId } from '../../types/SocialNetworks';
import moment = require('moment');
import { TagData, TagId } from '../../types/Tag';
import ActionToolbar from '../Common/ActionToolbar/index';
import { ActionMenuFunctions } from './index';
import SearchMarker from '../Common/SearchMarker/index';

const InfoBoard = styled.div`
  display: flex;
  padding: 20px;
  border-bottom: 1px solid ${prop => prop.theme.borderColor};
  border-left: 1px solid ${prop => prop.color};
`;

const LeftSideOfBoard = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  color: ${prop => prop.theme.textColor};
  font-size: 80%;
  margin-bottom: 10px;
`;

const PositionContainer = styled.div`
  color: ${prop => prop.theme.profileTextColor};
  font-size: 70%;
  margin-bottom: 5px;
`;

const DateContainer = styled.div`
  color: ${prop => prop.theme.profileTextColor};
  font-size: 70%;
  margin-bottom: 15px;
`;

const Description = styled.div`
  color: ${prop => prop.theme.textColor};
  font-size: 60%;
  margin-bottom: 5px;
`;

const DescriptionContainer = styled.div`
  display: flex;
`;

const ShowDescription = styled.div`
  color: ${prop => prop.theme.linkColor};
  font-size: 60%;
  cursor: pointer;
  margin-right: 5px;
  margin-bottom: 10px;
`;

const Arrow = styled.div`
  position: relative;
  top: 4px;
  color: ${prop => prop.theme.linkColor};
  font-size: 50%;
  cursor: pointer;
`;

const MessageToolsContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-end;
  width: 50%;
  height: 100%;
`;

export interface LinkedinExperienceProps extends React.Props<LinkedinExperience> {
  data: LinkedinExperienceData;
  setStar: (path: string[], id: TwitterId, isFavorite: boolean) => void;
  removeTag: (path: string[], id: TwitterId, tagId: TagId) => void;
  linkedinExperienceActionMenu: ActionMenuFunctions;
  theme?: ThemeProps;
}
export interface LinkedinExperienceState {
  isShowDescription: boolean;
  isMouseOn: boolean;
  menuIsHidden: boolean;
  withFavorite: boolean;
  withNotebook: boolean;
  withTranslate: boolean;
}

class LinkedinExperience extends React.Component<LinkedinExperienceProps, LinkedinExperienceState> {
  static defaultProps: Partial<LinkedinExperienceProps> = {
    theme: defaultTheme,
  }

  constructor (props: LinkedinExperienceProps) {
    super(props)

    this.state = {
      isShowDescription: false,
      isMouseOn: false,
      menuIsHidden: true,
      withFavorite: false,
      withNotebook: false,
      withTranslate: false,
    }
  }

  getHide() {
    return (
      <DescriptionContainer>
        <ShowDescription
          onClick={() => {this.setState({isShowDescription: false})}}
        ><SearchMarker>Hide description</SearchMarker>
        </ShowDescription>
        <Arrow className="base_icons icon_tri_up"/>
      </DescriptionContainer>
    )
  }

  getShow() {
    return (
      <DescriptionContainer>
        <ShowDescription
          onClick={() => {this.setState({isShowDescription: true})}}
        ><SearchMarker>See description</SearchMarker>
        </ShowDescription>
        <Arrow className="base_icons icon_tri_down"/>
      </DescriptionContainer>
    )
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
      <InfoBoard
        onMouseOver={() => {this.setMouseState(true)}}
        onMouseLeave={() => {this.setMouseState(false)}}
        color={!this.props.data.isRead ? this.props.theme.newItemColor : 'transparent'}
      >
        <LeftSideOfBoard>
          <TitleContainer><SearchMarker>{this.props.data.headline}</SearchMarker></TitleContainer>
          <PositionContainer><SearchMarker>{this.props.data.position}</SearchMarker></PositionContainer>
          <DateContainer>
            <SearchMarker>
              {moment(this.props.data.fromTime).format('MMM YYYY - ')}
              {this.props.data.toTime === -1 ? 'Present' : moment(this.props.data.toTime).format('MMM YYYY')}
            </SearchMarker>
          </DateContainer>
            {this.state.isShowDescription ? (
              <div>
                {this.getHide()}
                <Description><SearchMarker>{this.props.data.description}</SearchMarker></Description>
              </div>
            ) : this.getShow()}
        </LeftSideOfBoard>
        <MessageToolsContainer>
          <ActionToolbar
            lineHeight={'30px'}
            fontSize={15}
            withMenu={true}
            menuOnItemSelect={{
              addTagCallback: (tags: TagData[]) => {
                this.props.linkedinExperienceActionMenu.addTagCallback(
                  [(this.props.data.id) as number], tags)
              },
              addToNotebookCallback: () => {/*TODO: implementation */},
              markAsReadCallback: () => {
                this.props.linkedinExperienceActionMenu.markAsReadCallback([(this.props.data.id) as number])
              },
              markAsUnreadCallback: () => {
                this.props.linkedinExperienceActionMenu.markAsUnreadCallback([(this.props.data.id) as number])
              },
              translateCallback: () => {/*TODO: implementation */},
              transcriptCallback: () => {/*TODO: implementation */},
              exportCallback: () => {/*TODO: implementation */},
            }}
            menuIsHidden={this.state.menuIsHidden}
            withFavorite={this.props.data.isFavorite || this.state.withFavorite}
            isFavorite={this.props.data.isFavorite}
            favoriteOnClick={() => {this.props.setStar(
              ['profile', 'experience'], (this.props.data.id) as number, !this.props.data.isFavorite)}}
            withNotebook={this.props.data.hasNotes || this.state.withNotebook}
            notebookHasNotes={this.props.data.hasNotes}
            withTranslate={this.state.withTranslate}
            withTags={true}
            tags={this.props.data.tags}
            tagOnRemove={(tagId: TagId) => {
              this.props.removeTag(['profile', 'experience'], (this.props.data.id) as number, tagId)}}
          />
        </MessageToolsContainer>
      </InfoBoard>
    )
  }
}

export default LinkedinExperience
