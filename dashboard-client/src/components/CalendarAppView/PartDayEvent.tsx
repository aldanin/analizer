import * as React from 'react'
import { CalendarGridEvent } from './CalendarGrid';
import styled, { withTheme } from 'styled-components';
import { EventContainerOutline } from './FullDayEvent';
import { defaultTheme, ThemeProps } from './Theme';
import moment = require('moment');
import Checkbox from '../Common/Checkbox/index';
import * as Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';
import EventInfo from './EventInfo';
import { accountId, calendarEventId } from '../../types/Calendar';
import { TagId } from '../../types/Tag';
import { CalendarActionMenuCallbacks } from '../../containers/CalendarPage';
import Timer = NodeJS.Timer;
import SearchMarker from '../Common/SearchMarker/index';

const EventContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${(prop: EventContainerOutline) => prop.bgColor};
  top: ${(prop: EventContainerOutline) => prop.top};
  left: ${(prop: EventContainerOutline) => prop.left};
  width: ${(prop: EventContainerOutline) => prop.width};
  height: ${(prop: EventContainerOutline) => prop.height};
  border-left: 3px solid ${prop => prop.color};
  text-align: center;
`;

const HourContainer = styled.div`
  position: relative;
  top: 5px;
  font-size: 70%;
  height: 20px;
  font-weight: bold;
  color: ${prop => prop.theme.textColor};
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden !important;
`;

const TitleContainer = styled.div`
  position: relative;
  top: 3px;
  font-size: 70%;
  font-weight: bold;
  color: ${prop => prop.theme.textColor};
`;

const LocationContainer = styled.div`
  position: relative;
  top: 4px;
  font-size: 70%;
  font-weight: italic;
  overflow: hidden important!;
  color: ${prop => prop.theme.textColor};
`;

const AttachmentsContainer = styled.div`
  position: relative;
  top: 10px;
  font-size: 110%;
`;

const ToolbarContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  line-height: 2rem;
`;

const RightTools = styled.span`
  display: flex;
  justify-content: flex-start;
  width: 20%;
`;

export interface PartDayEventProps extends React.Props<PartDayEvent> {
  data: CalendarGridEvent;
  idx: number;
  hours: number;
  width: number;
  top: number;
  tooltipPosition: string;
  fromTime: number;
  toTime: number;
  gridSetStar: (accountId: accountId, calendarItemId: calendarEventId, isFavorite: boolean) => void;
  gridRemoveTag: (accountId: accountId, calendarItemId: calendarEventId, tagId: TagId) => void;
  actionMenuCallbacks: CalendarActionMenuCallbacks;
  itemSelected: (agendaId: calendarEventId) => void;
  itemUnSelected: (agendaId: calendarEventId) => void;
  isSelectedItem: (agendaId: calendarEventId) => boolean;
  theme?: ThemeProps;
}
export interface PartDayEventState {
  isMouseOn: boolean;
  isCheck: boolean;
  isToolTipVisible: boolean;
}

class PartDayEvent extends React.Component<PartDayEventProps, PartDayEventState> {
  static defaultProps: Partial<PartDayEventProps> = {
    theme: defaultTheme
  }

  timer: Timer | number;

  constructor (props: PartDayEventProps) {
    super(props)

    this.timer = null;

    this.state = {
      isMouseOn: false,
      isCheck: false,
      isToolTipVisible: false,
    }
  }

  onCheck() {
    if (this.state.isCheck) {
      this.props.itemUnSelected(this.props.data.event.id)
    } else {
      this.props.itemSelected(this.props.data.event.id)
    }
    this.setState({isCheck: !this.state.isCheck})
  }

  componentDidMount() {
    this.setState({isCheck: this.props.isSelectedItem(this.props.data.event.id)})
  }

  componentWillReceiveProps(nextProps: PartDayEventProps) {
    this.setState({isCheck: nextProps.isSelectedItem(this.props.data.event.id)})
  }

  changeMouseState(state: boolean) {
    this.setState({isMouseOn: state});
    if (state) {
      this.startTimer();
    } else {
      this.clearTimer();
    }
  }

  startTimer() {
    if (this.timer !== null) {return}
    this.timer = setTimeout(() => {this.setState({isToolTipVisible: true})}, 1000)
  }

  clearTimer() {
    clearTimeout((this.timer as Timer));
    this.timer = null;
  }

  closeToolTip = () => {
    this.setState({isToolTipVisible: false})
  }

  render() {
    let fromTime = this.props.fromTime;
    let toTime = this.props.toTime;
    let numberOfHours = (toTime - fromTime) / 3600000;

    if (this.props.data.event.toTime < toTime) {
      if (this.props.data.event.fromTime > fromTime) {
        numberOfHours = (this.props.data.event.toTime - this.props.data.event.fromTime) / 3600000;
      } else {
        numberOfHours = (this.props.data.event.toTime - fromTime) / 3600000;
      }
    } else {
      if (this.props.data.event.fromTime > fromTime) {
        numberOfHours = (toTime - this.props.data.event.fromTime) / 3600000;
      } else {
        numberOfHours = (toTime - fromTime) / 3600000;
      }
    }

    return (
      <Tooltip
        visible={this.state.isToolTipVisible}
        placement={this.props.tooltipPosition}
        overlay={(
          <EventInfo
            data={this.props.data}
            gridSetStar={this.props.gridSetStar}
            gridRemoveTag={this.props.gridRemoveTag}
            actionMenuCallbacks={this.props.actionMenuCallbacks}
            closeCallback={this.closeToolTip}
          />)}
        trigger="hover"
        mouseEnterDelay={1}
        arrowContent={<div className="rc-tooltip-arrow-inner"/>}
      >
        <EventContainer
          onMouseOver={() => {this.changeMouseState(true)}}
          onMouseLeave={() => {this.changeMouseState(false)}}
          color={this.state.isCheck ? this.props.theme.selectedItemColor :
            this.props.data.event.isNew ? this.props.theme.newItemColor : 'transparent'}
          bgColor={this.props.theme.activeAccountsColor[this.props.data.themeIndexColor].bgColor}
          top={this.props.top + 'px'}
          left={'0'}
          width={this.props.width + '%'}
          height={numberOfHours * 62 + 'px'}
        >
          {this.state.isMouseOn || this.state.isCheck ? (
            this.getToolBar()
          ) : (
            <HourContainer>
              <SearchMarker>
                {moment(this.props.data.event.fromTime).format('HH:mm - ')
                + moment(this.props.data.event.toTime).format('HH:mm')}
              </SearchMarker>
            </HourContainer>
          )}
          <TitleContainer><SearchMarker>{this.props.data.event.title}</SearchMarker></TitleContainer>
          <LocationContainer><SearchMarker>{this.props.data.event.location.place}</SearchMarker></LocationContainer>
          {this.props.data.event.attachments.length > 0 ? (
            <AttachmentsContainer className="base_icons icon_attachment"/>
          ) : null}
        </EventContainer>
      </Tooltip>
    )
  }

  getToolBar() {
     return (
      <ToolbarContainer>
        <RightTools>
          <Checkbox
            setChecked={this.props.isSelectedItem(this.props.data.event.id)}
            initialState={this.props.isSelectedItem(this.props.data.event.id)}
            onCheck={() => {this.onCheck()}}
            theme={this.props.theme.checkboxTheme}
          />
        </RightTools>
      </ToolbarContainer>
    )
  }
}

export default withTheme(PartDayEvent);
