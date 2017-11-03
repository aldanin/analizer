import * as React from 'react'
import styled, { withTheme } from 'styled-components';
import { CalendarGridEvent } from './CalendarGrid';
import { defaultTheme, ThemeProps } from './Theme';
import moment = require('moment');
import { accountId, calendarEventId } from '../../types/Calendar';
import { TagData, TagId } from '../../types/Tag';
import { CalendarActionMenuCallbacks } from '../../containers/CalendarPage';
import ActionToolbar from '../Common/ActionToolbar/index';

const EventInfoView = styled.div`
  display: flex;
  flex-direction: column;
  width: 420px;
  height: 340px;
`;

const HeaderContainer = styled.div`
  position: relative;
  left: -10px;
  top: -8px;
  width: 105%;
  height: 42px;
  background-color: ${prop => prop.theme.eventHeaderColor};
`;

const CloseContainer = styled.span`
  position: relative;
  top: -10px;
  left: 420px;
  cursor: pointer;
  color: ${prop => prop.theme.eventCloseColor};
`;

const TitleContainer = styled.div`
  position: relative;
  top: 10px;
  left: 20px;
  color: ${prop => prop.theme.eventTitleColor};
  font-size: 130%;
`;

const ToolbarContainer = styled.div`
  position: relative;
  left: -10px;
  top: -5px;
  height: 30px;
  width: 105%;
  display: flex;
  justify-content: flex-end;
`;

const EventBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 240px;
  border-bottom: 1px solid ${prop => prop.theme.eventBorderColor};
`;

const EventInfoRow = styled.div`
  display: flex;
  width: 100%;
  height: 12.5%;
`;

const EventLabel = styled.div`
  color: ${prop => prop.theme.eventLabelsColor};
  width: 25%;
  height: 100%;
  font-size: 100%;
  text-indent: 10px;
`;

const TopInfo = styled.div`
  color: ${prop => prop.theme.eventTextFirstColor};
  width: 75%;
  height: 100%;
  font-size: 100%;
`;

const BottomInfo = styled.div`
  display: flex;
  color: ${prop => prop.theme.eventTextSecondColor};
  width: 75%;
  height: 100%;
  font-size: 100%;
`;

const FileIcon = styled.div`
  position: relative;
  top: 2px;
  margin-right: 2px;
  color: ${prop => prop.theme.eventTextSecondColor};
  font-size: 100%;
`;

const AccountColor = styled.div`
  position: relative;
  top: 2px;
  margin-right: 4px;
  width: 13px;
  height: 13px;
  border-radius: 25px;
  background-color: ${prop => prop.color};
`;

const LastExtractionContainer = styled.div`
  position: relative;
  top: 8px;
  color: ${prop => prop.theme.eventLabelsColor};
  width: 100%;
  font-size: 100%;
  text-indent: 10px;
`;

const FileContainer = styled.div`
  display: flex;
`;

const styles = {
  actionMenuIcon: {

  }
}

export interface EventInfoProps {
  data: CalendarGridEvent;
  gridSetStar: (accountId: accountId, calendarItemId: calendarEventId, isFavorite: boolean) => void;
  gridRemoveTag: (accountId: accountId, calendarItemId: calendarEventId, tagId: TagId) => void;
  actionMenuCallbacks: CalendarActionMenuCallbacks;
  closeCallback: () => void;
  theme?: ThemeProps;
}

const EventInfo: React.SFC<EventInfoProps> = ({ data, theme, gridSetStar, gridRemoveTag, closeCallback,
  actionMenuCallbacks}) => {
  let dateString = '';
  const location = data.event.location;
  const locationString = `${location.place}, ${location.number} ${location.street}, ${location.city}`;
  const participantsString = data.event.participants.map((person, idx) => {
    return idx === data.event.participants.length - 1 ? person : person + ', ';
  })
  const startingDate = moment(data.event.fromTime);
  const endingDate = moment(data.event.toTime);

  if (startingDate.format('D') === endingDate.format(('D'))) {
    dateString = startingDate.format('ddd DD/M, HH:mm - ') + endingDate.format('HH:mm');
  } else {
    dateString = startingDate.format('ddd DD/M, HH:mm - ') + endingDate.format('ddd DD/M, HH:mm');
  }

  styles.actionMenuIcon = {
    color: theme.agendaActionIconColor,
    position: 'absolute',
    top: '0',
    left: '30px',
    fontSize: '14.5px',
  }

  return (
    <EventInfoView>
      <HeaderContainer>
        <TitleContainer>{data.event.title}</TitleContainer>
        <CloseContainer onClick={() => {closeCallback()}}> X </CloseContainer>
      </HeaderContainer>
      <ToolbarContainer>
        <ActionToolbar
          lineHeight={'30px'}
          withMenu={true}
          withFavorite={true}
          isFavorite={data.event.isFavorite}
          favoriteOnClick={() => {
            gridSetStar(data.accountId, data.event.id, !data.event.isFavorite);
          }}
          withNotebook={true}
          notebookHasNotes={data.event.isNotebook}
          withTags={true}
          tags={data.event.tags}
          tagOnRemove={(tagId: TagId) => {
            gridRemoveTag(data.accountId, data.event.id, tagId);
          }}
          menuOnItemSelect={{
            addTagCallback: (tags: TagData[]) => {actionMenuCallbacks.addTag([data.event.id], tags)},
            addToNotebookCallback: () => {actionMenuCallbacks.addToNotebook([data.event.id])},
            markAsReadCallback: () => {actionMenuCallbacks.markAsRead([data.event.id])},
            markAsUnreadCallback: () => {actionMenuCallbacks.markAsUnread([data.event.id])},
            translateCallback: () => {actionMenuCallbacks.askForTranslate([data.event.id])},
            transcriptCallback: () => {actionMenuCallbacks.askForTranscript([data.event.id])},
            exportCallback: () => {actionMenuCallbacks.exportItem([data.event.id])},
          }}
        />
      </ToolbarContainer>
      <EventBody>
        <EventInfoRow>
          <EventLabel>Time</EventLabel>
          <TopInfo>{dateString}</TopInfo>
        </EventInfoRow>
        <EventInfoRow>
          <EventLabel>Location</EventLabel>
          <TopInfo>{location.number !== 0 ? locationString : 'Unknown'}</TopInfo>
        </EventInfoRow>
        <EventInfoRow>
          <EventLabel>Description</EventLabel>
          <TopInfo>{data.event.description}</TopInfo>
        </EventInfoRow>
        <EventInfoRow>
          <EventLabel>Organizer</EventLabel>
          <BottomInfo>{data.event.organizer}</BottomInfo>
        </EventInfoRow>
        <EventInfoRow>
          <EventLabel>Creation Date</EventLabel>
          <BottomInfo>{moment(data.event.creationDate).format('DD/MM/YYYY, HH:mm')}</BottomInfo>
        </EventInfoRow>
        <EventInfoRow>
          <EventLabel>Participants</EventLabel>
          <BottomInfo>{data.event.participants.length < 1  ? 'no participants' : participantsString}</BottomInfo>
        </EventInfoRow>
        <EventInfoRow>
          <EventLabel>Attachments</EventLabel>
          <BottomInfo>{data.event.attachments.length < 1 ? 'no files' : (
              data.event.attachments.map((file, idx) => {
                return(
                  <FileContainer key={idx}>
                    <FileIcon className="base_icons icon_doc_pdf"/>
                    {file.name}.{file.type}
                  </FileContainer>
                )})
            )}</BottomInfo>
        </EventInfoRow>
        <EventInfoRow>
          <EventLabel>Calendar</EventLabel>
          <BottomInfo>
            <AccountColor color={theme.activeAccountsColor[data.themeIndexColor].bgColor}/>
            {data.account}
          </BottomInfo>
        </EventInfoRow>
      </EventBody>
      <LastExtractionContainer>
        Last appeared in extraction from {moment(data.event.lastAppear).format('DD/MM/YYYY HH:mm')}
      </LastExtractionContainer>
    </EventInfoView>
  )
}

export default withTheme(EventInfo)

EventInfo.defaultProps = {
  theme: defaultTheme,
}
