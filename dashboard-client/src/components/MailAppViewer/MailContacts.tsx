import * as React from 'react'
import styled from 'styled-components';
import Contact from './Contact';
import Content from './Content';
import Details from './Details';
import { AccountMailData } from '../../types/Mail';
import { TagData, TagId } from '../../types/Tag';

const MailContactsView = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const ContactsView = styled.div`
  overflow-y: auto;
  width: 22%;
  height: 100%;
  border-right: 1px solid ${prop => prop.theme.borderColor};
`;

const InboxView = styled.div`
  overflow-y: auto;
  width: 43%;
  height: 100%;
`;

const DetailsView = styled.div`
  border-left: 1px solid ${prop => prop.theme.borderColor};
  height: 100%;
  width: 45%;
`;

export interface MailContactsProps {
  data: AccountMailData[];
  accountIndex: number;
  mailIndex: number;
  onLabelClick: (id: string) => void;
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

const MailContacts: React.SFC<MailContactsProps> = ({ data, accountIndex, mailAddTag, setStar, removeTag,
                                                      onLabelClick, mailIndex , onMailClick, isItemSelected,
                                                      markAsUnread, markAsRead, itemSelected, itemUnSelected }) => {

  return (
    <MailContactsView>
      <ContactsView>
        {data.map((item, idx) => {
          return (
            <Contact
              key={idx}
              id={item.id}
              avatar={item.avatar}
              account={item.email}
              folders={item.labels}
              inbox={item.inbox}
              onLabelClick={onLabelClick}
              isShowing={item.id === data[accountIndex].id}
            />
          )
        })}
      </ContactsView>
      <InboxView>
        <Content
          mails={data[accountIndex].inbox}
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
      </InboxView>
      <DetailsView>
        <Details
          data={data[accountIndex].inbox[mailIndex]}
          mailAddTag={mailAddTag}
          markAsUnread={markAsUnread}
          markAsRead={markAsRead}
          setStar={setStar}
          removeTag={removeTag}
        />
      </DetailsView>
    </MailContactsView>
  )
}

export default MailContacts
