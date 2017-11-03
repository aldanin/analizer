import * as React from 'react'
import styled, { withTheme } from 'styled-components';
import { SearchData, TwitterId } from '../../types/SocialNetworks';
import { defaultTheme, ThemeProps } from './Theme';
import { TagData, TagId } from '../../types/Tag';
import ActionToolbar from '../Common/ActionToolbar/index';
import { ActionMenuFunctions } from './index';
import SearchMarker from '../Common/SearchMarker/index';

const SearchView = styled.div`
  padding: 10px;
  width: 100%;
  border-bottom: 1px solid ${prop => prop.theme.borderColor};
  border-left: 2px solid ${prop => prop.color};
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`;

const SearchStringContainer = styled.div`
  text-indent: 10px;
  font-size: 70%;
  width: 40%;
`;

const MessageToolsContainer = styled.div`
  display: flex;
  position: relative;
  top: 1px;
  justify-content: flex-end;
  width: 58%;
  height: 100%;
`;

export interface LinkedinSearchItemProps extends React.Props<LinkedinSearchItem> {
  data: SearchData;
  setStar: (path: string[], id: TwitterId, isFavorite: boolean) => void;
  removeTag: (path: string[], id: TwitterId, tagId: TagId) => void;
  linkedinSearchActionMenu: ActionMenuFunctions;
  theme?: ThemeProps;
}
export interface LinkedinSearchItemState {
  isMouseOn: boolean;
  menuIsHidden: boolean;
  withFavorite: boolean;
  withNotebook: boolean;
  withTranslate: boolean;
}

class LinkedinSearchItem extends React.Component<LinkedinSearchItemProps, LinkedinSearchItemState> {
  static defaultProps: Partial<LinkedinSearchItemProps> = {
    theme: defaultTheme,
  }
  constructor (props: LinkedinSearchItemProps) {
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
      <SearchView
        color={!this.props.data.isRead ? this.props.theme.newItemColor : 'transparent'}
        onMouseOver={() => {this.setMouseState(true)}}
        onMouseLeave={() => {this.setMouseState(false)}}
      >
        <SearchContainer>
          <SearchStringContainer><SearchMarker>{this.props.data.lookingFor}</SearchMarker></SearchStringContainer>
          <MessageToolsContainer>
            <ActionToolbar
              lineHeight={'20px'}
              fontSize={15}
              withMenu={true}
              menuOnItemSelect={{
                addTagCallback: (tags: TagData[]) => {
                  this.props.linkedinSearchActionMenu.addTagCallback(
                    [(this.props.data.id) as number], tags)
                },
                addToNotebookCallback: () => {/*TODO: implementation */},
                markAsReadCallback: () => {
                  this.props.linkedinSearchActionMenu.markAsReadCallback([(this.props.data.id) as number])
                },
                markAsUnreadCallback: () => {
                  this.props.linkedinSearchActionMenu.markAsUnreadCallback([(this.props.data.id) as number])
                },
                translateCallback: () => {/*TODO: implementation */},
                transcriptCallback: () => {/*TODO: implementation */},
                exportCallback: () => {/*TODO: implementation */},
              }}
              menuIsHidden={this.state.menuIsHidden}
              withFavorite={this.props.data.isFavorite || this.state.withFavorite}
              isFavorite={this.props.data.isFavorite}
              favoriteOnClick={() => {this.props.setStar(
                ['search'], (this.props.data.id) as number, !this.props.data.isFavorite)}}
              withNotebook={this.props.data.hasNotes || this.state.withNotebook}
              notebookHasNotes={this.props.data.hasNotes}
              withTranslate={this.state.withTranslate}
              withTags={true}
              tags={this.props.data.tags}
              tagOnRemove={(tagId: TagId) => {
                this.props.removeTag(['search'], (this.props.data.id) as number, tagId)}}
            />
          </MessageToolsContainer>
        </SearchContainer>
      </SearchView>
    )
  }
}

export default withTheme(LinkedinSearchItem)
