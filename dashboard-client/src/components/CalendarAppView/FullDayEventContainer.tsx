import * as React from 'react'
import styled from 'styled-components';
import { CalendarGridEvent } from './CalendarGrid';
import FullDayEvent from './FullDayEvent';
import { accountId, calendarEventId } from '../../types/Calendar';
import { TagId } from '../../types/Tag';
import { CalendarActionMenuCallbacks } from '../../containers/CalendarPage';

const FullDayEventContainerDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export interface FullDayEventContainerProps extends React.Props<FullDayEventContainer> {
  data: CalendarGridEvent[];
  timestamp: number;
  gridSetStar: (accountId: accountId, calendarItemId: calendarEventId, isFavorite: boolean) => void;
  gridRemoveTag: (accountId: accountId, calendarItemId: calendarEventId, tagId: TagId) => void;
  actionMenuCallbacks: CalendarActionMenuCallbacks;
  itemSelected: (agendaId: calendarEventId) => void;
  itemUnSelected: (agendaId: calendarEventId) => void;
  isSelectedItem: (agendaId: calendarEventId) => boolean;
  days: number;
}

export interface FullDayEventContainerState {
}

class FullDayEventContainer extends React.Component<FullDayEventContainerProps, FullDayEventContainerState> {
  constructor (props: FullDayEventContainerProps) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
      <FullDayEventContainerDiv>
        {this.props.data.map((item, idx) => {
          return (
            <FullDayEvent
              key={item.event.id}
              days={this.props.days}
              data={item}
              timestamp={this.props.timestamp}
              gridSetStar={this.props.gridSetStar}
              gridRemoveTag={this.props.gridRemoveTag}
              actionMenuCallbacks={this.props.actionMenuCallbacks}
              itemSelected={this.props.itemSelected}
              itemUnSelected={this.props.itemUnSelected}
              isSelectedItem={this.props.isSelectedItem}

            />
          )
        })}
      </FullDayEventContainerDiv>
    )
  }
}

export default FullDayEventContainer
