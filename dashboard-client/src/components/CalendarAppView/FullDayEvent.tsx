import * as React from 'react'
import * as moment from 'moment';
import styled, { withTheme } from 'styled-components';
import { CalendarGridEvent } from './CalendarGrid';
import { defaultTheme, ThemeProps } from './Theme';
import Checkbox from '../Common/Checkbox/index';
import * as Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';
import EventInfo from './EventInfo';
import { accountId, calendarEventId } from '../../types/Calendar';
import { TagData, TagId } from '../../types/Tag';
import { CalendarActionMenuCallbacks } from '../../containers/CalendarPage';
import Timer = NodeJS.Timer;
import ActionToolbar from '../Common/ActionToolbar/index';

export interface EventContainerOutline {
  bgColor: string;
  top: string;
  left: string;
  width: string;
  height: string;
}

const EventContainer = styled.div`
  position: relative;
  display: flex;
  background-color: ${(prop: EventContainerOutline) => prop.bgColor};
  top: ${(prop: EventContainerOutline) => prop.top};
  left: ${(prop: EventContainerOutline) => prop.left};
  width: calc(${(prop: EventContainerOutline) => prop.width});
  height: ${(prop: EventContainerOutline) => prop.height};
  border-left: 3px solid ${prop => prop.color};
`;

const EventLeftContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  width: 50%;
  height: 100%;
`;

const EventRightContainer = styled.div`
  position: relative;
  top: -1px;
  display: flex;
  justify-content: flex-end;
  width: 50%;
  height: 100%;
`;

const EventBody = styled.div`
  display: table;
  width: 100%;
  height: 100%;
`;

const CheckboxContainer = styled.div`
  position: relative;
  margin-left: 5px;
  top: 3px;
`;

const EventTitle = styled.div`
  color: ${prop => prop.theme.textColor};
  width: 100%;
  font-size: 70%;
  font-weight: bold;
  display: table-cell;
  vertical-align: middle;
  text-indent: 7px;
`;

const styles = {
  actionMenuIcon: {}
}

export interface FullDayEventProps extends React.Props<FullDayEvent> {
  data: CalendarGridEvent;
  days: number;
  timestamp: number;
  gridSetStar: (accountId: accountId, calendarItemId: calendarEventId, isFavorite: boolean) => void;
  gridRemoveTag: (accountId: accountId, calendarItemId: calendarEventId, tagId: TagId) => void;
  actionMenuCallbacks: CalendarActionMenuCallbacks;
  itemSelected: (agendaId: calendarEventId) => void;
  itemUnSelected: (agendaId: calendarEventId) => void;
  isSelectedItem: (agendaId: calendarEventId) => boolean;
  theme?: ThemeProps;
}
export interface FullDayEventState {
  isMouseOn: boolean;
  isCheck: boolean;
  isToolTipVisible: boolean;
}

class FullDayEvent extends React.Component<FullDayEventProps, FullDayEventState> {
  static defaultProps: Partial<FullDayEventProps> = {
    theme: defaultTheme
  }

  timer: Timer | number;

  constructor(props: FullDayEventProps) {
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

  componentWillReceiveProps(nextProps: FullDayEventProps) {
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
    if (this.timer !== null) {
      return
    }
    this.timer = setTimeout(() => {this.setState({isToolTipVisible: true})}, 1000)}

  clearTimer() {
    clearTimeout((this.timer as Timer));
    this.timer = null;
  }

  closeToolTip = () => {
    this.setState({isToolTipVisible: false})
  }

  render() {
    styles.actionMenuIcon = {
      color: (this.state.isMouseOn || this.state.isCheck) ?
        this.props.theme.gridActionIconColor : 'transparent',
      fontSize: '14px',
      position: 'absolute',
      top: '1px',
    };

    let fromTime = this.props.data.event.fromTime;
    let toTime = this.props.data.event.toTime;
    let numberOfDay = parseInt(moment(toTime).format('D'), 10) - parseInt(moment(fromTime).format('D'), 10) + 1;
    let distanceFromStartingDay =
      parseInt(moment(fromTime).format('D'), 10) - parseInt(moment(this.props.timestamp).format('D'), 10);
    numberOfDay = numberOfDay > (7 - distanceFromStartingDay) ? (7 - distanceFromStartingDay) : numberOfDay;

    if (distanceFromStartingDay < 0) {
      numberOfDay += distanceFromStartingDay;
    }

    let width = (numberOfDay / this.props.days) * 100;

    if (numberOfDay < 1) {
      return null
    }
    return (
      <Tooltip
        visible={this.state.isToolTipVisible}
        placement="bottom"
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
          onMouseOver={() => {
            this.changeMouseState(true)
          }}
          onMouseLeave={() => {
            this.changeMouseState(false)
          }}
          color={this.state.isCheck ? this.props.theme.selectedItemColor :
            this.props.data.event.isNew ? this.props.theme.newItemColor : 'transparent'}
          bgColor={this.props.theme.activeAccountsColor[this.props.data.themeIndexColor].bgColor}
          top={'0px'}
          left={'0'}
          width={width + '% + ' + (numberOfDay - 2) + 'px'}
          height={'25px'}
        >
          <EventLeftContainer>
            <EventBody>
              {this.state.isMouseOn || this.state.isCheck ? (
                <CheckboxContainer>
                  <Checkbox
                    setChecked={this.state.isCheck}
                    onCheck={() => {
                      this.onCheck()
                    }}
                    theme={this.props.theme.checkboxTheme}
                  />
                </CheckboxContainer>
              ) : null }
              <EventTitle>{this.props.data.event.title}</EventTitle>
            </EventBody>
          </EventLeftContainer>
          <EventRightContainer>
            <ActionToolbar
              lineHeight={'30px'}
              fontSize={15}
              withMenu={true}
              menuIsHidden={(!this.state.isCheck && !this.state.isMouseOn)}
              withFavorite={this.props.data.event.isFavorite || this.state.isMouseOn || this.state.isCheck}
              isFavorite={this.props.data.event.isFavorite}
              favoriteOnClick={() => {
                this.props.gridSetStar(
                  this.props.data.accountId, this.props.data.event.id, !this.props.data.event.isFavorite)
              }}
              withNotebook={this.props.data.event.isNotebook || this.state.isMouseOn || this.state.isCheck}
              notebookHasNotes={this.props.data.event.isNotebook}
              withTags={true}
              tags={this.props.data.event.tags}
              tagOnRemove={(tagId: TagId) => {
                this.props.gridRemoveTag(this.props.data.accountId, this.props.data.event.id, tagId);
              }}
              tagsTheme={{
                textColor: this.props.theme.eventTag.textColor,
                borderColor: this.props.theme.eventTag.borderColor,
                backgroundColor: this.props.theme.eventTag.backgroundColor,
              }}
              menuOnItemSelect={{
                addTagCallback: (tags: TagData[]) => {
                  this.props.actionMenuCallbacks.addTag([this.props.data.event.id], tags)
                },
                addToNotebookCallback: () => {
                  this.props.actionMenuCallbacks.addToNotebook([this.props.data.event.id])
                },
                markAsReadCallback: () => {
                  this.props.actionMenuCallbacks.markAsRead([this.props.data.event.id])
                },
                markAsUnreadCallback: () => {
                  this.props.actionMenuCallbacks.markAsUnread([this.props.data.event.id])
                },
                translateCallback: () => {
                  this.props.actionMenuCallbacks.askForTranslate([this.props.data.event.id])
                },
                transcriptCallback: () => {
                  this.props.actionMenuCallbacks.askForTranscript([this.props.data.event.id])
                },
                exportCallback: () => {
                  this.props.actionMenuCallbacks.exportItem([this.props.data.event.id])
                },
              }}
            />
          </EventRightContainer>
        </EventContainer>
      </Tooltip>
    )
  }
}

export default withTheme(FullDayEvent)
