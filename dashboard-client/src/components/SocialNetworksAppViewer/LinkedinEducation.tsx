import * as React from 'react'
import { LinkedinEducationData, TwitterId } from '../../types/SocialNetworks';
import { defaultTheme, ThemeProps } from './Theme';
import styled from 'styled-components';
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
  margin-bottom: 5px;
`;

const MessageToolsContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-end;
  width: 50%;
  height: 100%;
`;

export interface LinkedinEducationProps extends React.Props<LinkedinEducation> {
  data: LinkedinEducationData;
  setStar: (path: string[], id: TwitterId, isFavorite: boolean) => void;
  removeTag: (path: string[], id: TwitterId, tagId: TagId) => void;
  linkedinEducationActionMenu: ActionMenuFunctions;
  theme?: ThemeProps;
}
export interface LinkedinEducationState {
  isMouseOn: boolean;
  menuIsHidden: boolean;
  withFavorite: boolean;
  withNotebook: boolean;
  withTranslate: boolean;
}

class LinkedinEducation extends React.Component<LinkedinEducationProps, LinkedinEducationState> {
  static defaultProps: Partial<LinkedinEducationProps> = {
    theme: defaultTheme,
  }
  constructor (props: LinkedinEducationProps) {
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
      <InfoBoard
        onMouseOver={() => {this.setMouseState(true)}}
        onMouseLeave={() => {this.setMouseState(false)}}
        color={!this.props.data.isRead ? this.props.theme.newItemColor : 'transparent'}
      >
        <LeftSideOfBoard>
          <TitleContainer><SearchMarker>{this.props.data.headline}</SearchMarker></TitleContainer>
          <PositionContainer><SearchMarker>{this.props.data.degree}</SearchMarker></PositionContainer>
          <DateContainer>
            <SearchMarker>
              {moment(this.props.data.fromTime).format('MMM YYYY - ')}
              {moment(this.props.data.toTime).format('MMM YYYY')}
              </SearchMarker>
          </DateContainer>
        </LeftSideOfBoard>
        <MessageToolsContainer>
          <ActionToolbar
            lineHeight={'30px'}
            fontSize={15}
            withMenu={true}
            menuOnItemSelect={{
              addTagCallback: (tags: TagData[]) => {
                this.props.linkedinEducationActionMenu.addTagCallback(
                  [(this.props.data.id) as number], tags)
              },
              addToNotebookCallback: () => {/*TODO: implementation */},
              markAsReadCallback: () => {
                this.props.linkedinEducationActionMenu.markAsReadCallback([(this.props.data.id) as number])
              },
              markAsUnreadCallback: () => {
                this.props.linkedinEducationActionMenu.markAsUnreadCallback([(this.props.data.id) as number])
              },
              translateCallback: () => {/*TODO: implementation */},
              transcriptCallback: () => {/*TODO: implementation */},
              exportCallback: () => {/*TODO: implementation */},
            }}
            menuIsHidden={this.state.menuIsHidden}
            withFavorite={this.props.data.isFavorite || this.state.withFavorite}
            isFavorite={this.props.data.isFavorite}
            favoriteOnClick={() => {this.props.setStar(
              ['profile', 'education'], (this.props.data.id) as number, !this.props.data.isFavorite)}}
            withNotebook={this.props.data.hasNotes || this.state.withNotebook}
            notebookHasNotes={this.props.data.hasNotes}
            withTranslate={this.state.withTranslate}
            withTags={true}
            tags={this.props.data.tags}
            tagOnRemove={(tagId: TagId) => {
              this.props.removeTag(['profile', 'education'], (this.props.data.id) as number, tagId)}}
          />
        </MessageToolsContainer>
      </InfoBoard>
    )
  }
}

export default LinkedinEducation
