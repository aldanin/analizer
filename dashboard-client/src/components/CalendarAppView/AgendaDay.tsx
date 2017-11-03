import * as React from 'react'
import { AgendaUnion } from './AgendaList';
import moment = require('moment');
import styled from 'styled-components';
import AgendaItem from './AgendaItem';
import { accountId, agendaId, calendarEventId } from '../../types/Calendar';
import { TagId } from '../../types/Tag';
import { CalendarActionMenuCallbacks } from '../../containers/CalendarPage';
import SearchMarker from '../Common/SearchMarker/index';

const AgendaDayView = styled.div`
  display: flex;
  width: 100%;
`;

const AgendaDate = styled.span`
  margin-top: 10px;
  width: 8%;
  color: ${prop => prop.theme.textColor};
`;

const AgendaContent = styled.span`
  display: flex;
  flex-direction: column;
  width: 88%;
`;

export interface AgendaDayProps {
  data: AgendaUnion[];
  agendaSetStar: (accountId: accountId, agendaItemId: agendaId, isFavorite: boolean) => void;
  agendaRemoveTag: (accountId: accountId, agendaItemId: agendaId, tagId: TagId) => void;
  actionMenuCallbacks: CalendarActionMenuCallbacks;
  agendaItemSelected: (agendaId: calendarEventId) => void;
  agendaItemUnSelected: (agendaId: calendarEventId) => void;
  isSelectedItem: (agendaId: calendarEventId) => boolean;
}

const AgendaDay: React.SFC<AgendaDayProps> = ({ data, agendaSetStar, agendaRemoveTag, actionMenuCallbacks,
                                              agendaItemSelected, agendaItemUnSelected, isSelectedItem}) => {
  return (
  <AgendaDayView>
    <AgendaDate>
      <SearchMarker>{moment(data[0].agenda.fromTime).format('ddd, MMM, DD')}</SearchMarker>
    </AgendaDate>
    <AgendaContent>
      {data.map((item, idx) => {
        return (
          <AgendaItem
            key={idx}
            agenda={item.agenda}
            themeColorIndex={item.themeColorIndex}
            accountId={item.accountId}
            agendaSetStar={agendaSetStar}
            agendaRemoveTag={agendaRemoveTag}
            account={item.account}
            actionMenuCallbacks={actionMenuCallbacks}
            agendaItemSelected={agendaItemSelected}
            agendaItemUnSelected={agendaItemUnSelected}
            isSelectedItem={isSelectedItem}
          />)
      })}
    </AgendaContent>
  </AgendaDayView>
  )
}

export default AgendaDay
