import * as React from 'react'
import { accountId, agendaId, CalendarEvent, calendarEventId } from '../../types/Calendar';
import styled, { withTheme } from 'styled-components';
import * as Theme from './Theme';
import { TagData, TagId } from '../../types/Tag';
import * as Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';
import EventInfo from './EventInfo';
import { CalendarActionMenuCallbacks } from '../../containers/CalendarPage';
import ListItem from '../Common/ListItem/index';
import ActionToolbar from '../Common/ActionToolbar/index';
import moment = require('moment');
import SearchMarker from '../Common/SearchMarker/index';

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  line-height: 40px;
`;

const TimeContainer = styled.span`
  color: ${prop => prop.theme.textColor};
  position: relative;
  top: 1px;
  font-size: 90%;
  margin-left: 0.5%;
  white-space: nowrap;
  margin-right: 8.5%;
  width: 7%;
`;

const AccountColorContainer = styled.span`
  display: block;
  position: relative;
  top: 14px;
  width: 13px;
  height: 13px;
  border-radius: 25px;
  backgroundColor: ${prop => prop.color};
  margin-right: 0.5%;
`;

const TitleContainer = styled.span`
  position: relative;
  top: 1px;
  color: ${prop => prop.theme.textColor};
  font-size: 90%;
  margin-right: 1%;
  width: 20%;
  white-space: nowrap;
  overflow:hidden !important;
  text-overflow: ellipsis;
`;

const LocationContainer = styled.span`
  position: relative;
  top: 2px;
  color: ${prop => prop.theme.agendaLocationColor};
  font-size: 85%;
  width: 15%;
  white-space: nowrap;
  overflow:hidden !important;
  text-overflow: ellipsis;
  margin-right: 1%;
`;

const ParticipantsContainer = styled.span`
  position: relative;
  top: 1px;
  color: ${prop => prop.theme.agendaParticipantsColor};
  font-size: 85%;
  width: 22%;
  white-space: nowrap;
  overflow:hidden !important;
  text-overflow: ellipsis;
  margin-right: 1%;
`;

const styles = {
  actionMenuIcon: {

  }
}

export interface AgendaItemProps extends React.Props<AgendaItem> {
  agenda: CalendarEvent;
  accountId: accountId;
  themeColorIndex: number;
  account: string;
  agendaSetStar: (accountId: accountId, agendaItemId: agendaId, isFavorite: boolean) => void;
  agendaRemoveTag: (accountId: accountId, agendaItemId: agendaId, tagId: TagId) => void;
  actionMenuCallbacks: CalendarActionMenuCallbacks;
  agendaItemSelected: (agendaId: calendarEventId) => void;
  agendaItemUnSelected: (agendaId: calendarEventId) => void;
  isSelectedItem: (agendaId: calendarEventId) => boolean;
  theme?: Theme.ThemeProps;
}
export interface AgendaItemState {
  isCheck: boolean;
  isMouseOn: boolean;
  isMenuHide: boolean;
  withFavorite: boolean;
  withNotebook: boolean;
  withTranslate: boolean;
}

class AgendaItem extends React.Component<AgendaItemProps, AgendaItemState> {
  static defaultProps: Partial<AgendaItemProps> = {
    theme: Theme.defaultTheme,
  }
  constructor (props: AgendaItemProps) {
    super(props)
    this.state = {
      isCheck: false,
      isMouseOn: false,
      isMenuHide: true,
      withFavorite: false,
      withNotebook: false,
      withTranslate: false,
    }
  }

  showTools = () => {
    this.setState({
      isMenuHide: false,
      withFavorite: true,
      withNotebook: true,
      withTranslate: true,
    })
  }

  hideTools = () => {
    if (this.state.isCheck) {return}
    this.setState({
      isMenuHide: true,
      withFavorite: false,
      withNotebook: false,
      withTranslate: false,
    })
  }

  onCheck = () => {
    if (this.state.isCheck) {
      this.props.agendaItemUnSelected(this.props.agenda.id)
      this.hideTools();
    } else {
      this.props.agendaItemSelected(this.props.agenda.id)
      this.showTools();
    }
    this.setState({isCheck: !this.state.isCheck})
  }

  componentDidMount() {
    this.setState({isCheck: this.props.isSelectedItem(this.props.agenda.id)})
  }

  componentWillReceiveProps(nextProps: AgendaItemProps) {
    this.setState({isCheck: nextProps.isSelectedItem(this.props.agenda.id)})
  }

  renderContent() {
    return (
      <ContentContainer onClick={() => {this.onCheck()}}>
        <TimeContainer>
          <SearchMarker>
            {moment(this.props.agenda.fromTime).format('HH:mm - ')}
            {moment(this.props.agenda.toTime).format('HH:mm')}
          </SearchMarker>
        </TimeContainer>
        <AccountColorContainer color={this.props.theme.activeAccountsColor[this.props.themeColorIndex].bgColor}/>
        <TitleContainer>
          <SearchMarker>{this.props.agenda.title}</SearchMarker>
        </TitleContainer>
        <LocationContainer>
          <SearchMarker>
            {this.props.agenda.location.place === '' ? '\u2014' : this.props.agenda.location.place}>
          </SearchMarker>
        </LocationContainer>
        <ParticipantsContainer>
          <SearchMarker>
          {this.props.agenda.participants.length > 0 ?
            this.props.agenda.participants.map((item, idx) => {
              if (idx + 1 < this.props.agenda.participants.length) {
                return item + ', '
              }
              return item;
            }) : '\u2014' }
          </SearchMarker>
        </ParticipantsContainer>
      </ContentContainer>
    )
  }

  render() {
    styles.actionMenuIcon = {
      color: this.props.theme.agendaActionIconColor,
      position: 'absolute',
      top: '0',
      left: '30px',
      fontSize: '16px',
    }
    if (this.props.agenda === null) {return null}
    return (
      <Tooltip
        placement={'bottom'}
        overlay={(
          <EventInfo
            data={{
              event: this.props.agenda,
              themeIndexColor: this.props.themeColorIndex,
              accountId: this.props.accountId,
              account: this.props.account,
            }}
            gridSetStar={this.props.agendaSetStar}
            gridRemoveTag={this.props.agendaRemoveTag}
            actionMenuCallbacks={this.props.actionMenuCallbacks}
            closeCallback={() => {return null}}
          />)}
        trigger="hover"
        mouseEnterDelay={1}
        arrowContent={<div className="rc-tooltip-arrow-inner"/>}
      >
        <ListItem
          lineHeight={'40px'}
          checkboxSize={'16px'}
          isNewItem={this.props.agenda.isNew}
          onCheck={this.onCheck}
          onMouseEnter={this.showTools}
          onMouseLeave={this.hideTools}
          isChecked={this.state.isCheck}
          isSelected={this.state.isCheck}
          isMouseOn={this.state.isMouseOn}
          content={this.renderContent()}
          actionToolbar={
            <ActionToolbar
              lineHeight={'40px'}
              withMenu={true}
              menuOnItemSelect={{
                addTagCallback: (tags: TagData[]) => {
                  this.props.actionMenuCallbacks.addTag([this.props.agenda.id], tags)},
                addToNotebookCallback: () => {this.props.actionMenuCallbacks.addToNotebook([this.props.agenda.id])},
                markAsReadCallback: () => {this.props.actionMenuCallbacks.markAsRead([this.props.agenda.id])},
                markAsUnreadCallback: () => {this.props.actionMenuCallbacks.markAsUnread([this.props.agenda.id])},
                translateCallback: () => {this.props.actionMenuCallbacks.askForTranslate([this.props.agenda.id])},
                transcriptCallback: () => {this.props.actionMenuCallbacks.askForTranscript([this.props.agenda.id])},
                exportCallback: () => {this.props.actionMenuCallbacks.exportItem([this.props.agenda.id])},
              }}
              menuIsHidden={this.state.isMenuHide}
              withFavorite={this.props.agenda.isFavorite || this.state.withFavorite}
              isFavorite={this.props.agenda.isFavorite}
              favoriteOnClick={() => {
                this.props.agendaSetStar(this.props.accountId, this.props.agenda.id, !this.props.agenda.isFavorite)}
              }
              withNotebook={this.props.agenda.isNotebook || this.state.withNotebook}
              notebookHasNotes={this.props.agenda.isNotebook}
              withTranslate={this.state.withTranslate}
              withTags={true}
              tags={this.props.agenda.tags}
              tagOnRemove={(tagId: TagId) => {
                this.props.agendaRemoveTag(this.props.accountId, this.props.agenda.id, tagId)
              }}
            />
          }
        />
      </Tooltip>
    )
  }
}

export default withTheme(AgendaItem)
