import * as React from 'react'
import styled from 'styled-components';
import ActionToolbar from '../Common/ActionToolbar/index';
import { TagData, TagId } from '../../types/Tag';
import { MailData } from '../../types/Mail';
import moment = require('moment');
import SearchMarker from '../Common/SearchMarker/index';

const DetailsView = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${prop => prop.theme.bodyBgColor};
`;

const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: auto;
  background-color: ${prop => prop.theme.headerBgColor};
  padding: 1rem 0 1rem 2rem;
  box-sizing: border-box;
`;

const TitleContainer = styled.div`
  font-size: 1.7rem;
`;

const ActionToolbarContainer = styled.div`
  position: absolute;
  right: 1rem;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const LineContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
`;

const DetailContainer = styled.div`
  display: flex;
  width: 80%;
`;

const LabelContainer = styled.div`
  font-size: 1.3rem;
  color: ${prop => prop.theme.contentColor};
  width: 20%;
`;

const LabelValueContainer = styled.div`
  font-size: 1.3rem;
  color: ${prop => prop.theme.textColor};
  width: 80%;
`;

const DateContainer = styled.div`
  font-size: 1.3rem;
  color: ${prop => prop.theme.textColor};
`;

const MailBody = styled.div`
  display: block;
  margin-top: 1rem;
  background-color: white;
  width: 100%;
  height: 100%;
  border: 2px solid ${prop => prop.theme.headerBgColor};
  box-shadow: 0px 3px 18px 0px ${prop => prop.theme.gridShadow};
  overflow-y: auto;
  overflow-x: hidden;
`;

const MailContent = styled.div`
  padding: 2rem;
  box-sizing: border-box;
  white-space: wrap;
`;

export interface DetailsProps {
  data: MailData;
  setStar: (id: string, isFavorite: boolean) => void;
  removeTag: (id: string, tagId: TagId) => void;
  mailAddTag: (ids: string[], tags: TagData[]) => void;
  markAsRead: (ids: string[]) => void;
  markAsUnread: (ids: string[]) => void;
}

const Details: React.SFC<DetailsProps> = ({ data, mailAddTag, markAsRead,
                                            markAsUnread, setStar, removeTag }) => {

  return (
    <DetailsView>
      <HeaderContainer>
        <TitleContainer><SearchMarker>{data.subject}</SearchMarker></TitleContainer>
        <ActionToolbarContainer>
          <ActionToolbar
            lineHeight={'20px'}
            fontSize={16}
            withMenu={true}
            menuOnItemSelect={{
              addTagCallback: (tags: TagData[]) => {mailAddTag([data.id], tags)},
              addToNotebookCallback: () => {/*TODO: implementation */},
              markAsReadCallback: () => {markAsRead([data.id])},
              markAsUnreadCallback: () => {markAsUnread([data.id])},
              translateCallback: () => {/*TODO: implementation */},
              transcriptCallback: () => {/*TODO: implementation */},
              exportCallback: () => {/*TODO: implementation */},
            }}
            withFavorite={data.isFavorite}
            isFavorite={data.isFavorite}
            favoriteOnClick={() => setStar(data.id, !data.isFavorite)}
            withNotebook={data.hasNotes}
            notebookHasNotes={data.hasNotes}
            withTags={true}
            tags={data.tags}
            tagOnRemove={(tagId: TagId) => {removeTag(data.id, tagId)}}
          />
        </ActionToolbarContainer>
      </HeaderContainer>
      <BodyContainer>
        <LineContainer>
          <DetailContainer>
            <LabelContainer>From:</LabelContainer>
            <LabelValueContainer><SearchMarker>{data.from}</SearchMarker></LabelValueContainer>
          </DetailContainer>
          <DateContainer>
            <SearchMarker>{moment(data.timestamp).format('DD/MM/YYYY HH:mm')}</SearchMarker>
          </DateContainer>
        </LineContainer>
        <LineContainer>
          <DetailContainer>
            <LabelContainer>To:</LabelContainer>
            <LabelValueContainer>
              {data.to.map((item, idx) => {
                if (idx + 1 < data.to.length) {
                  return <SearchMarker key={idx}>{item + ', '}</SearchMarker>;
                } else {
                  return <SearchMarker key={idx}>{item}</SearchMarker>;
                }
              })}
            </LabelValueContainer>
          </DetailContainer>
        </LineContainer>
        <MailBody>
          <MailContent>
            {data.body}
          </MailContent>
        </MailBody>
      </BodyContainer>
    </DetailsView>
  )
}

export default Details
