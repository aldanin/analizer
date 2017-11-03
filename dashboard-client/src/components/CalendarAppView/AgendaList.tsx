import * as React from 'react'
import { accountId, agendaId, CalendarAccounts, CalendarEvent, calendarEventId } from '../../types/Calendar';
import moment = require('moment');
import AgendaDay from './AgendaDay';
import styled from 'styled-components';
import { ThemeProps } from './Theme';
import { TagId } from '../../types/Tag';
import { CalendarActionMenuCallbacks } from '../../containers/CalendarPage';
import SearchMarker from '../Common/SearchMarker/index';

const HeaderTitles = styled.div`
  display: flex;
  width: 88%;
  border-bottom: 1px solid ${prop => prop.theme.agendaBorderColor};
  margin-left: 8%;
`;

const TimeTitle = styled.span`
  font-size: 75%;
  margin-bottom: 0.4%;
  margin-left: 3.5%;
`;

const Title = styled.span`
  font-size: 75%;
  margin-bottom: 0.4%;
  margin-left: 13%;
`;

const LocationTitle = styled.span`
  font-size: 75%;
  margin-bottom: 0.4%;
  margin-left: 21%;
`;

const ParticipantsTitle = styled.span`
  font-size: 75%;
  margin-bottom: 0.4%;
  margin-left: 15%;
`;

export interface AgendaListProps extends React.Props<AgendaList> {
  agendaSetStar: (accountId: accountId, agendaItemId: agendaId, isFavorite: boolean) => void;
  agendaRemoveTag: (accountId: accountId, agendaItemId: agendaId, tagId: TagId) => void;
  fromTime: number;
  toTime: number;
  data: CalendarAccounts[];
  actionMenuCallbacks: CalendarActionMenuCallbacks;
  agendaItemSelected: (agendaId: calendarEventId) => void;
  agendaItemUnSelected: (agendaId: calendarEventId) => void;
  isSelectedItem: (agendaId: calendarEventId) => boolean;
  theme?: ThemeProps;
}
export interface AgendaListState {
}

export interface AgendaArray {
  array: CalendarEvent[];
  themeColorIndex: number;
  accountId: accountId;
  account: string;
  counter: number;
}

export interface AllAgendaArrays {
  arrays: AgendaArray[];
  isProcess: boolean;
}

export interface AgendaUnion {
  agenda: CalendarEvent;
  themeColorIndex: number;
  accountId: accountId,
  account: string;
  index: number;
}

class AgendaList extends React.Component<AgendaListProps, AgendaListState> {

  unionAgendaArray: AgendaUnion[];
  allAgendas: AllAgendaArrays;
  startIndex: number;
  timestamp: number;
  firstIndexTimeStamp: number;

  constructor(props: AgendaListProps) {
    super(props)
    this.initVariables();
  }

  initVariables() {
    this.allAgendas = {
      arrays: [],
      isProcess: true,
    }
    this.unionAgendaArray = [];
    this.startIndex = 0;
    this.timestamp = 0;
    this.firstIndexTimeStamp = 0;
    this.state = {}
  }

  componentWillReceiveProps() {
    this.initVariables();
  }

  isExistAnActiveAccount() {
    let counter = 0;
    while (counter < this.props.data.length) {
      if (this.props.data[counter].isActive) {
        return true;
      }
      counter++;
    }
    return false;
  }

  getListSortByDays() {
    this.unionMultiAgendaToOneArray();
    if (this.unionAgendaArray.length > 1) {
      this.timestamp = this.unionAgendaArray[0].agenda.fromTime;
      return (
        <div>
          <HeaderTitles>
            <TimeTitle>Time</TimeTitle>
            <Title>Title</Title>
            <LocationTitle>Location</LocationTitle>
            <ParticipantsTitle>ParticipantsTitle</ParticipantsTitle>
          </HeaderTitles>
          {this.unionAgendaArray.map((item, idx) => {
            if (idx === 0) {this.firstIndexTimeStamp = item.agenda.fromTime}
            let tempTime =  item.agenda.fromTime;
            if (moment(tempTime).format('DD') !== moment(this.timestamp).format('DD') ||
              (idx + 1) === this.unionAgendaArray.length) {
              let tempStart = this.startIndex;
              this.timestamp = tempTime;
              this.startIndex = idx;
              if ((idx + 1) < this.unionAgendaArray.length) {
                return (
                  <div key={idx}>
                    {idx === 1 && moment(this.firstIndexTimeStamp).format('DD')
                    !== moment(this.timestamp).format('DD') ? (
                      <AgendaDay
                        data={this.unionAgendaArray.slice(0, 1)}
                        agendaSetStar={this.props.agendaSetStar}
                        agendaRemoveTag={this.props.agendaRemoveTag}
                        actionMenuCallbacks={this.props.actionMenuCallbacks}
                        agendaItemSelected={this.props.agendaItemSelected}
                        agendaItemUnSelected={this.props.agendaItemUnSelected}
                        isSelectedItem={this.props.isSelectedItem}
                      />
                    ) : (
                      <AgendaDay
                        data={this.unionAgendaArray.slice(tempStart, idx)}
                        agendaSetStar={this.props.agendaSetStar}
                        agendaRemoveTag={this.props.agendaRemoveTag}
                        actionMenuCallbacks={this.props.actionMenuCallbacks}
                        agendaItemSelected={this.props.agendaItemSelected}
                        agendaItemUnSelected={this.props.agendaItemUnSelected}
                        isSelectedItem={this.props.isSelectedItem}
                      />
                    )}
                  </div>
                )
              } else {
                tempStart = idx === 1 && moment(this.firstIndexTimeStamp).format('DD') !==
                moment(this.timestamp).format('DD') ? (tempStart + 1) : tempStart;
                return (
                  <div key={idx}>
                    {idx === 1 && moment(this.firstIndexTimeStamp).format('DD')
                    !== moment(this.timestamp).format('DD') ? (
                      <AgendaDay
                        data={this.unionAgendaArray.slice(0, 1)}
                        agendaSetStar={this.props.agendaSetStar}
                        agendaRemoveTag={this.props.agendaRemoveTag}
                        actionMenuCallbacks={this.props.actionMenuCallbacks}
                        agendaItemSelected={this.props.agendaItemSelected}
                        agendaItemUnSelected={this.props.agendaItemUnSelected}
                        isSelectedItem={this.props.isSelectedItem}
                      />
                    ) : null}
                    <AgendaDay
                      data={this.unionAgendaArray.slice(tempStart, idx + 1)}
                      agendaSetStar={this.props.agendaSetStar}
                      agendaRemoveTag={this.props.agendaRemoveTag}
                      actionMenuCallbacks={this.props.actionMenuCallbacks}
                      agendaItemSelected={this.props.agendaItemSelected}
                      agendaItemUnSelected={this.props.agendaItemUnSelected}
                      isSelectedItem={this.props.isSelectedItem}
                    />
                  </div>
                )
              }
            }
            return null;
          })}
        </div>
      )
    }
    if (this.unionAgendaArray.length > 0) {
      return (
        <AgendaDay
          data={this.unionAgendaArray}
          agendaSetStar={this.props.agendaSetStar}
          agendaRemoveTag={this.props.agendaRemoveTag}
          actionMenuCallbacks={this.props.actionMenuCallbacks}
          agendaItemSelected={this.props.agendaItemSelected}
          agendaItemUnSelected={this.props.agendaItemUnSelected}
          isSelectedItem={this.props.isSelectedItem}
        />)
    } else {
      return <div>No Events</div>
    }
  }

  render() {
    if (this.isExistAnActiveAccount()) {
      return this.getListSortByDays();
    }

    return <div><SearchMarker>No account selected</SearchMarker></div>
  }

  unionMultiAgendaToOneArray() {
    this.pushAllAgendas();
    while (this.allAgendas.isProcess) {
      let tempArray = this.findNextArrayInProcess();
      let result = this.findTheNextMinimumStartDate(tempArray.current, tempArray.index);
      this.unionAgendaArray.push({
        agenda: result.agenda,
        index: result.index,
        themeColorIndex: this.allAgendas.arrays[result.index].themeColorIndex,
        accountId: this.allAgendas.arrays[result.index].accountId,
        account: this.allAgendas.arrays[result.index].account,
      })
      result.current.counter++;
      if (result.current.counter === result.current.array.length) {
        this.checkIfProcessIsDone();
      }
    }
    let resArray = [];
    for (let i = 0; i < this.unionAgendaArray.length; i++) {
      if (((this.unionAgendaArray[i].agenda.toTime >= this.props.fromTime &&
        this.unionAgendaArray[i].agenda.fromTime <= this.props.toTime) &&
        !this.unionAgendaArray[i].agenda.isFullDay)) {
        resArray.push(this.unionAgendaArray[i]);
      }
    }
    this.unionAgendaArray = resArray;
  }

  pushAllAgendas() {
    for (let i = 0; i < this.props.data.length; i++) {
      if (this.props.data[i].isActive) {
        this.allAgendas.arrays.push({
          array: this.props.data[i].calendar,
          counter: 0,
          themeColorIndex: i,
          accountId: this.props.data[i].id,
          account: this.props.data[i].account,
        });
      }
    }
  }

  findNextArrayInProcess() {
    let current = null;
    let counter = 0;
    while (current === null) {
      let tempArray = this.allAgendas.arrays[counter];
      if (tempArray.counter < tempArray.array.length) {
        current = tempArray;
      } else {
        counter++;
      }
    }
    return ({current: current, index: counter})
  }

  findTheNextMinimumStartDate(tempArray: AgendaArray, arrayIndex: number) {
    let minimum = tempArray.array[tempArray.counter];
    for (let i = (arrayIndex + 1); i < this.allAgendas.arrays.length; i++) {
      let loopArray = this.allAgendas.arrays[i];
      if (loopArray.counter < loopArray.array.length) {
        if (loopArray.array[loopArray.counter].fromTime < minimum.fromTime) {
          minimum = loopArray.array[loopArray.counter];
          tempArray = loopArray;
          arrayIndex = i;
        }
      }
    }
    return {current: tempArray, agenda: minimum, index: arrayIndex};
  }

  checkIfProcessIsDone() {
    let counter = 0;
    while (counter < this.allAgendas.arrays.length) {
      let temp = this.allAgendas.arrays[counter]
      if (temp.counter < temp.array.length) {
        break;
      } else {
        counter++;
      }
    }
    if (counter === this.allAgendas.arrays.length) {
      this.allAgendas.isProcess = false;
    }
  }
}

export default AgendaList
