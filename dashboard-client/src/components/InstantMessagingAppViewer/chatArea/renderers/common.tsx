import * as React from 'react'
import styled from 'styled-components';
import * as IMCommon from 'common-interfaces/types/InstantMessaging'
import * as Defaults from '../../../../typeDefaults/InstantMessaging'
import { ContactPersonId } from '../../../../types/ContactPerson'
import * as Tags from '../../../../types/Tag'
import * as Prod from '../../../../types/Product'
import * as Theme from './../../Theme'
import SearchMarker from '../../../Common/SearchMarker/index';
import ActionToolbar from '../../../Common/ActionToolbar';

export interface MessageRendererProps {
  chatMessage: IMCommon.ChatMessage;
  setFavorite: (id: Prod.ProductID, isFavorite: boolean) => void;
  removeTag: (id: Prod.ProductID, tag: Tags.TagId) => void;
  addTags: (ids: Prod.ProductID, tags: Tags.TagData[]) => void;
  addToNotebook: (ids: Prod.ProductID) => void;
  markAsRead: (ids: Prod.ProductID, isRead: boolean) => void;
  askForTranslate: (ids: Prod.ProductID) => void;
  askForTranscript: (ids: Prod.ProductID) => void;
  getTranslate: (itemIds: Prod.ProductID) => void;
  getTranscript: (itemIds: Prod.ProductID) => void
  openNotebook: () => void
  exportItem: (ids: Prod.ProductID) => void;
  onSenderClick: (id: ContactPersonId) => void,
  theme: Theme.ThemeProps;
}

export const Container = styled.div`
// height: 220px;
  max-width: 500px;
  font-size: 100%;
  color: ${(props) => props.theme.genericTextColors.textColor};
`;
export const Header = styled.div`
  width: 100%;
  height: 30px;
  color: ${(props) => props.theme.genericTextColors.textColor};
`;
export const HeaderLeft = styled.div`
  float: left;
  margin-right: 20px;
`;
export const HeaderRight = styled.div`
  float: right;
`;
export const MessageWrap = styled.div`
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  margin-bottom: 10px;
`;
export const MessageText = styled.span`
  font-size: 1.4rem;
  color: ${(props) => props.theme.genericTextColors.textColor};
  padding-right: 2em;
  overflow: hidden;
  max-width: 95%;
  word-wrap: break-word
`;
export const DateText = styled.span`
  font-size: 1.2rem;
  color: ${(props) => props.theme.genericTextColors.textColorPale};
  margin-left: auto;
`;
export const HeaderLeftCaption = styled.span`
  color: ${(props) => props.theme.genericTextColors.textColorPale};
  color: ${(props) => props.theme.genericTextColors.textColorLink};
`;
export const HeaderLeftSenderName = styled.span`
  color: ${(props) => props.theme.genericTextColors.textColorLink};
  cursor: pointer;
  margin-left: 1em;
`;

export const MediaContainerDiv = styled.div`
  margin-top: 5px;
  margin-bottom: 10px;
`;

export const getHeader = (props: MessageRendererProps) => {
  const chatMessage = props.chatMessage;

  return (
    <Header>
      <HeaderLeft>
        <HeaderLeftCaption>From</HeaderLeftCaption>
        <HeaderLeftSenderName
          theme={props.theme}
          onClick={() => props.onSenderClick(chatMessage.from.id)}
        >
          <SearchMarker>{props.chatMessage.from.name}</SearchMarker>
        </HeaderLeftSenderName>
      </HeaderLeft>
      <HeaderRight>
        <ActionToolbar
          lineHeight={'20px'}
          withMenu={true}
          menuIsHidden={false}
          menuOnItemSelect={{
            addTagCallback: (tags: Tags.TagData[]) => {
              props.addTags(props.chatMessage.id, tags)
            },
            addToNotebookCallback: () => props.addToNotebook(props.chatMessage.id),
            markAsReadCallback: () => props.markAsRead(props.chatMessage.id, true),
            markAsUnreadCallback: () => props.markAsRead(props.chatMessage.id, false),
            translateCallback: () => props.askForTranslate(props.chatMessage.id),
            transcriptCallback: () => props.askForTranscript(props.chatMessage.id),
            exportCallback: () => props.exportItem(props.chatMessage.id)
          }}
          withFavorite={true}
          isFavorite={chatMessage.isFavorite}
          favoriteOnClick={() => {
            props.setFavorite(chatMessage.id, !chatMessage.isFavorite)
          }}
          withNotebook={true}
          notebookHasNotes={chatMessage.hasNotes}
          notebookOnClick={props.openNotebook}
          withTranslate={false}
          hasTranslate={false}
          withTags={false}
        />
      </HeaderRight>
    </Header>
  )
}

//
// As this component serves as a common source for the 2 renderer components,
// this will be used in their .test siblings:
//
export const DEFAULT_MESSAGERENDERER_PROPS = {
  chatMessage: Defaults.DEFAULT_CHAT[0],
  setFavorite: (id: Prod.ProductID, isFavorite: boolean) => null,
  removeTag: (id: Prod.ProductID, tag: Tags.TagId) => null,
  addTags: (ids: Prod.ProductID, tags: Tags.TagData[]) => null,
  addToNotebook: (ids: Prod.ProductID) => null,
  markAsRead: (ids: Prod.ProductID, isRead: boolean) => null,
  askForTranslate: (ids: Prod.ProductID) => null,
  askForTranscript: (ids: Prod.ProductID) => null,
  getTranslate: (itemIds: Prod.ProductID) => null,
  getTranscript: (itemIds: Prod.ProductID) => null,
  openNotebook: () => null,
  exportItem: (ids: Prod.ProductID) => null,
  onSenderClick: (id: ContactPersonId) => null,
  theme: Theme.DEFAULT_THEME,
}
