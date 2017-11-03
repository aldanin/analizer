import * as React from 'react'
import styled from 'styled-components';
import Mail from './Mail';
import { MailData } from '../../types/Mail';
import { TagData, TagId } from '../../types/Tag';

const ContentView = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
`;

export interface ContentProps {
  mails: MailData[];
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

const Content: React.SFC<ContentProps> = ({ mails, onMailClick, mailAddTag, setStar, removeTag, isItemSelected,
                                            markAsRead, markAsUnread, itemSelected, itemUnSelected }) => {

  return (
    <ContentView>
      {mails.map((item, idx) => {
        return (
         <Mail
           key={idx}
           data={item}
           onMailClick={onMailClick}
           mailAddTag={mailAddTag}
           markAsUnread={markAsUnread}
           markAsRead={markAsRead}
           setStar={setStar}
           removeTag={removeTag}
           itemSelected={itemSelected}
           itemUnSelected={itemUnSelected}
           isItemSelected={isItemSelected}
         />
        )
      })}
    </ContentView>
  )
}

export default Content
