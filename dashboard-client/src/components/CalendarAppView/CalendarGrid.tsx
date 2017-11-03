import * as React from 'react'
import styled, { withTheme } from 'styled-components';
import WeekHeaderGrid from './WeekHeaderGrid';
import WeekBodyGrid from './WeekBodyGrid';
import { accountId, CalendarAccounts, CalendarEvent, calendarEventId } from '../../types/Calendar';
import { defaultTheme, ThemeProps } from './Theme';
import moment = require('moment');
import FullDayEventContainer from './FullDayEventContainer';
import PartDayEventContainer from './PartDayEventContainer';
import { getAllEventsFromActivateAccounts, getMaxNumberOfEvents } from './Logic';
import { TagId } from '../../types/Tag';
import { CalendarActionMenuCallbacks } from '../../containers/CalendarPage';

const GridContainer = styled.div`
  margin-top: 1%;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 520px;
`;

const GridHeaderContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1%;
`;

const GridBodyContainer = styled.div`
  overflow-y: overlay;
  position: relative;
  width: 100%;
  height: 290%%;
`;

export interface EventContainerProps {
  bgColor: string;
  top: string;
  left: string;
  width: string;
  height: string;
}
const EventContainer = styled.div`
  position: absolute;
  background-color: ${(prop: EventContainerProps) => prop.bgColor};
  top: ${(prop: EventContainerProps) => prop.top};
  left: calc(${(prop: EventContainerProps) => prop.left});
  width: calc(${(prop: EventContainerProps) => prop.width});
  height: ${(prop: EventContainerProps) => prop.height};
  z-index: 10;
`;

const PartEventContainer = styled.div`
  position: absolute;
  background-color: ${(prop: EventContainerProps) => prop.bgColor};
  top: ${(prop: EventContainerProps) => prop.top};
  left: calc(${(prop: EventContainerProps) => prop.left});
  width: calc(${(prop: EventContainerProps) => prop.width});
  height: ${(prop: EventContainerProps) => prop.height};
  z-index: 10;
`;

const FullEventFitToTable = styled.div`
  position: absolute;
  top: 21px;
  left: 41px;
  width: 100%;
  height: 100%;
`;

const PartEventFitToTable = styled.div`
  position: absolute;
  top: 1px;
  left: 42px;
  width: 92%;
  height: 100%;
  z-index: 10;
`;

export interface CalendarGridProps extends React.Props<CalendarGrid> {
  data: CalendarAccounts[];
  timestamp: number;
  gridSetStar: (accountId: accountId, calendarItemId: calendarEventId, isFavorite: boolean) => void;
  gridRemoveTag: (accountId: accountId, calendarItemId: calendarEventId, tagId: TagId) => void;
  showAllEventsOnAgendaTab: (fromTime: number, toTime: number) => void;
  actionMenuCallbacks: CalendarActionMenuCallbacks;
  itemSelected: (agendaId: calendarEventId) => void;
  itemUnSelected: (agendaId: calendarEventId) => void;
  isSelectedItem: (agendaId: calendarEventId) => boolean;
  theme?: ThemeProps
}
export interface CalendarGridState {
}

export interface CalendarGridEvent {
  event: CalendarEvent;
  themeIndexColor: number;
  account: string;
  accountId: accountId;
}

export interface CalendarDivideEvents {
  group: CalendarGridEvent[];
  fromTime: number;
  toTime: number;
}

class CalendarGrid extends React.Component<CalendarGridProps, CalendarGridState> {
  static defaultProps: Partial<CalendarGridProps> = {
    theme: defaultTheme
  }

  allPartActiveEvents: CalendarGridEvent[];
  allFullActiveEvents: CalendarGridEvent[];
  allPartGroupOfEvents: CalendarDivideEvents[];
  allFullGroupOfEvents: CalendarDivideEvents[];
  bodyGrid: Element;

  constructor (props: CalendarGridProps) {
    super(props)

    this.state = {
    }
    this.initVariables();
  }

  componentDidMount() {
    this.bodyGrid.scrollTop = 495;
  }

  componentWillReceiveProps() {
    this.initVariables();
  }

  initVariables() {
    this.allPartActiveEvents = [];
    this.allFullActiveEvents = [];
    this.allPartGroupOfEvents = [];
    this.allFullGroupOfEvents = [];
  }

  render() {
    getAllEventsFromActivateAccounts(
      this.props.data, this.allPartActiveEvents, this.allFullActiveEvents, this.allPartGroupOfEvents,
      this.allFullGroupOfEvents);

    return (
      <GridContainer>
        <GridHeaderContainer>
          <WeekHeaderGrid
            timestamp={this.props.timestamp}
            maxNumberOfEvents={getMaxNumberOfEvents(this.allFullGroupOfEvents, this.props.timestamp)}
          />
          {this.drawFullDayEvents()}
        </GridHeaderContainer>
        <GridBodyContainer innerRef={(comp) => {this.bodyGrid = comp}}>
          <WeekBodyGrid/>
          <PartEventFitToTable>
            {this.drawPartDayEvents()}
          </PartEventFitToTable>
        </GridBodyContainer>
      </GridContainer>
    )
  }

  drawAllEventsWithoutBreak(item: CalendarDivideEvents, idx: number, fromTime: number, toTime: number) {
    let distanceFromStartingDay =
      parseInt(moment(fromTime).format('D'), 10) - parseInt(moment(this.props.timestamp).format('D'), 10);
    let numberOfDays =
      parseInt(moment(toTime).format('D'), 10) - parseInt(moment(fromTime).format('D'), 10) + 1;
    numberOfDays = numberOfDays > (7 - distanceFromStartingDay) ? (7 - distanceFromStartingDay) : numberOfDays;
    let numberOfHours = (toTime - fromTime) / 3600000;

    let startingHour = parseInt(moment(fromTime).format('H'), 10);
    let startingMinutes = parseInt(moment(fromTime).format('m'), 10);
    startingMinutes = startingMinutes / 60 ;

    if (distanceFromStartingDay > 6) {return null}
    if (distanceFromStartingDay < 0) {return null}
    return (
      <PartEventContainer
        key={idx}
        bgColor={'none'}
        top={(startingHour * 62) + (startingMinutes * 62) + 'px'}
        left={distanceFromStartingDay * 14.5 + '%'}
        width={numberOfDays * 14.5 + '%'}
        height={numberOfHours * 62 + 'px'}
      >
        <PartDayEventContainer
          data={item.group}
          hours={numberOfHours}
          tooltipPosition={distanceFromStartingDay < 3 ? 'right' : 'left'}
          gridSetStar={this.props.gridSetStar}
          gridRemoveTag={this.props.gridRemoveTag}
          showAllEventsOnAgendaTab={this.props.showAllEventsOnAgendaTab}
          actionMenuCallbacks={this.props.actionMenuCallbacks}
          fromTime={fromTime}
          toTime={toTime}
          itemSelected={this.props.itemSelected}
          itemUnSelected={this.props.itemUnSelected}
          isSelectedItem={this.props.isSelectedItem}
        />
      </PartEventContainer>
    )
  }

  drawAllEventsWithBreak(item: CalendarDivideEvents, idx: number, fromTime: number, toTime: number) {
    let day1fromTime = fromTime;
    let day1toTime = moment(fromTime).endOf('day').unix() * 1000;
    let day2fromTime = moment(fromTime).startOf('day').add(1, 'days').unix() * 1000;
    let day2toTime = toTime;
    return (
      <div key={idx}>
        {this.drawAllEventsWithoutBreak(item, idx + 6000, day1fromTime, day1toTime)}
        {this.drawAllEventsWithoutBreak(item, idx + 6001, day2fromTime, day2toTime)}
      </div>
    )

  }

  drawPartDayEvents() {
    return this.allPartGroupOfEvents.map((item, idx) => {
      let presentTime = moment(this.props.timestamp);
      let fromTime = item.fromTime;
      let toTime = item.toTime;
      if ((presentTime.format('M') !== moment(fromTime).format('M') &&
           presentTime.format('M') !== moment(toTime).format('M')) ||
          (presentTime.format('YYYY') !== moment(fromTime).format('YYYY') &&
           presentTime.format('YYYY') !== moment(toTime).format('YYYY'))) {return null}

      if (toTime > moment(fromTime).endOf('day').unix() * 1000) {
        return this.drawAllEventsWithBreak(item, idx, fromTime, toTime);
      } else {
        return this.drawAllEventsWithoutBreak(item, idx, fromTime, toTime)
      }
    })
  }

  drawFullDayEvents() {
    return this.allFullGroupOfEvents.map((event, idx) => {
      let presentTime = moment(this.props.timestamp);
      let fromTime = event.fromTime;
      let toTime = event.toTime;
      if ((presentTime.format('M') !== moment(fromTime).format('M') &&
           presentTime.format('M') !== moment(toTime).format('M')) ||
          (presentTime.format('YYYY') !== moment(fromTime).format('YYYY') &&
           presentTime.format('YYYY') !== moment(toTime).format('YYYY'))) {return null}

      let distanceFromStartingDay =
        parseInt(moment(fromTime).format('D'), 10) - parseInt(moment(this.props.timestamp).format('D'), 10);
      let numberOfDays =
        parseInt(moment(toTime).format('D'), 10) - parseInt(moment(fromTime).format('D'), 10) + 1;
      numberOfDays = numberOfDays > (7 - distanceFromStartingDay) ? (7 - distanceFromStartingDay) : numberOfDays;

      if (distanceFromStartingDay < 0) {
        numberOfDays += distanceFromStartingDay;
        distanceFromStartingDay = 0;
      }

      if (numberOfDays < 1) {return null}
      return (
        <FullEventFitToTable key={idx}>
          <EventContainer
            bgColor={'none'}
            top={'0px'}
            left={distanceFromStartingDay * 13.2 + '% + ' + distanceFromStartingDay * 2 + 'px'}
            width={numberOfDays * 13.2 + '% + ' + (numberOfDays - 1) + 'px'}
            height={'50px'}
          >
            <FullDayEventContainer
              data={event.group}
              days={numberOfDays}
              timestamp={this.props.timestamp}
              gridSetStar={this.props.gridSetStar}
              gridRemoveTag={this.props.gridRemoveTag}
              actionMenuCallbacks={this.props.actionMenuCallbacks}
              itemSelected={this.props.itemSelected}
              itemUnSelected={this.props.itemUnSelected}
              isSelectedItem={this.props.isSelectedItem}
            />
          </EventContainer>
        </FullEventFitToTable>
      )
    })
  }
}

export default withTheme(CalendarGrid)
