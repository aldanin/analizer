import * as React from 'react'
import { CalendarGridEvent } from './CalendarGrid';
import styled, { withTheme } from 'styled-components';
import PartDayEvent from './PartDayEvent';
import { accountId, calendarEventId } from '../../types/Calendar';
import { TagId } from '../../types/Tag';
import { defaultTheme, ThemeProps } from './Theme';
import { CalendarActionMenuCallbacks } from '../../containers/CalendarPage';

const PartDayEventContainerDiv = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
`;

interface IndicatorProps {
  height: number;
}
const IndicatorContainer = styled.div`
  position: relative;
  display: table;
  background-color: ${prop => prop.theme.eventIndicatorBgColor};
  width: 14%;
  height: ${(prop: IndicatorProps) => prop.height}px;
  text-align: center;
  cursor: pointer;
`;

const Indicator = styled.div`
  color: ${prop => prop.theme.eventIndicatorTextColor};
  display: table-cell;
  vertical-align: middle;
`;

export interface PartDayEventContainerProps {
  data: CalendarGridEvent[];
  tooltipPosition: string;
  gridSetStar: (accountId: accountId, calendarItemId: calendarEventId, isFavorite: boolean) => void;
  gridRemoveTag: (accountId: accountId, calendarItemId: calendarEventId, tagId: TagId) => void;
  showAllEventsOnAgendaTab: (fromTime: number, toTime: number) => void;
  actionMenuCallbacks: CalendarActionMenuCallbacks;
  itemSelected: (agendaId: calendarEventId) => void;
  itemUnSelected: (agendaId: calendarEventId) => void;
  isSelectedItem: (agendaId: calendarEventId) => boolean;
  hours: number;
  fromTime: number;
  toTime: number;
  theme?: ThemeProps;
}

export interface PartDayEventContainerState {
}

class PartDayEventContainer extends React.Component<PartDayEventContainerProps, PartDayEventContainerState> {

  static defaultProps: Partial<PartDayEventContainerProps> = {
    theme: defaultTheme,
  }

  constructor(props: PartDayEventContainerProps) {
    super(props)

    this.state = {
    }
  }

  renderAllEvents(data: CalendarGridEvent[]) {
    return data.map((item, idx) => {
      let distanceFromTopByHours = (item.event.fromTime - this.props.fromTime) / 3600000;
      distanceFromTopByHours = distanceFromTopByHours > 0 ? distanceFromTopByHours : 0;
      return (
        <PartDayEvent
          key={item.event.id}
          idx={idx}
          hours={this.props.hours}
          width={this.props.data.length < 3 ? 100 / data.length : 42}
          top={distanceFromTopByHours * 62}
          data={item}
          tooltipPosition={this.props.tooltipPosition}
          gridSetStar={this.props.gridSetStar}
          gridRemoveTag={this.props.gridRemoveTag}
          fromTime={this.props.fromTime}
          toTime={this.props.toTime}
          actionMenuCallbacks={this.props.actionMenuCallbacks}
          itemSelected={this.props.itemSelected}
          itemUnSelected={this.props.itemUnSelected}
          isSelectedItem={this.props.isSelectedItem}

        />
      )
    })
  }

  render() {
    return (
      <PartDayEventContainerDiv>
        {this.props.data.length > 2 ?
          this.renderAllEvents(this.props.data.slice(0, 2)) : this.renderAllEvents(this.props.data)}
        {this.props.data.length > 2 ? (
          <IndicatorContainer
            height={this.props.hours * 62}
            onClick={() => {this.props.showAllEventsOnAgendaTab(this.props.fromTime, this.props.toTime)}}
          >
            <Indicator>+{this.props.data.length - 2}</Indicator>
          </IndicatorContainer>) : null}
      </PartDayEventContainerDiv>
    )

  }
}
export default withTheme(PartDayEventContainer)
