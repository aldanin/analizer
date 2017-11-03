import * as React from 'react'
import * as Theme from './Theme'
import styled, { ThemeProvider } from 'styled-components';
import AppViewHeaderToolbar from '../Common/AppViewHeaderTool/index';
import AppViewFiltersTool from '../Common/AppViewFilterTool/index';
import TabGeneric from '../Common/TabGeneric/index';
import { accountId, agendaId as agendaIdType, CalendarAccounts, calendarEventId } from '../../types/Calendar';
import AccountFilter from './AccountFilter';
import * as moment from 'moment';
import AgendaList from './AgendaList';
import { TagId, TagData } from '../../types/Tag';
import CalendarGrid from './CalendarGrid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Moment } from 'moment';
import { CalendarActionMenuCallbacks } from '../../containers/CalendarPage';
import KeywordProvider from '../../containers/KeywordPRovider';
import LoadingIndicator from '../Common/LoadingIndicator';

const CalendarView = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.9rem;
  overflow: hidden;
`;

const LeftFilterTools = styled.span`
  display: flex;
  flex-direction: row;
  width: 100%;
  font-size: 90%;
`;

const Fetch = styled.span`
  margin-left: 20%;
  font-size: 80%;
`;

const Accounts = styled.span`
  position: relative;
  display: flex;
  flex: 0;
  min-width: 78%;
  padding: 0 5px;
  margin-left: 20px;
`;

const AccountsBar = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-around;
  min-width: 100%;
  padding: 0 5px;
`;

const WeeklyDateNavigation = styled.div`
  display: flex;
`;

const DatePickerContainer = styled.div`
  cursor: pointer;
`;

const PreviousWeek = styled.div`
  position: relative;
  top: 4px;
  margin-right: 20px;
  font-size: 80%;
  cursor: pointer;
`;

const NextWeek = styled.div`
  position: relative;
  top: 4px;
  margin-left: 20px;
  font-size: 80%;
  cursor: pointer;
`;

const WeeklyDateContainer = styled.span`
  margin-left: 2.5%;
  margin-top: 1%;
  font-size: 80%;
  color: ${prop => prop.theme.weeklyDateColor};
`;

const AgendaView = styled.div`
  margin-top: 2%;
`;

const PreviousAccountsEnabled = styled.div`
  position: absolute;
  left: 0;
  top: 2px;
  font-size: 100%
  color: ${prop => prop.theme.switchAccountEnable};
  cursor: pointer;
`;

const PreviousAccountsDisabled = styled.div`
  position: absolute;
  left: 0;
  top: 2px;
  font-size: 100%;
  color: ${prop => prop.theme.switchAccountDisable};
`;

const NextAccountsEnabled = styled.div`
  position: absolute;
  right: 0;
  top: 2px;
  font-size: 100%;
  margin-left: 1%;
  color: ${prop => prop.theme.switchAccountEnable};
  cursor: pointer;
`;

const NextAccountsDisabled = styled.div`
  position: absolute;
  right: 0;
  top: 2px;
  font-size: 100%;
  margin-left: 1%;
  color: ${prop => prop.theme.switchAccountDisable};
`;

const TodayContainer = styled.div`
  position: relative;
  top: 2px;
  margin-right: 0.5%;
  font-size: 80%;
  color: ${prop => prop.theme.weeklyDateColor};
  cursor: pointer;
`;

const styles = {
  appViewFilter: {
    marginLeft: '0',
    width: '100%',
  }
}

export interface CalendarAppViewProps extends React.Props<CalendarAppView> {
  data: CalendarAccounts[];
  isFetching: boolean;
  startingDate: number;
  startingAccountIndex: number;
  isNavigateBetweenAccounts: boolean;
  isNextAccountsEnable: boolean;
  isPreviousAccountsEnable: boolean;
  requestUpdate: () => void;
  extractNow: () => void;
  lastExtractionTime: number;
  updateTimeIndicator: number;
  showFilter: () => void;
  tagsFilter: () => void;
  actionsFilter: () => void;
  accountFilter: (id: accountId, isActive: boolean) => void;
  agendaSetStar: (accountId: accountId, agendaItemId: agendaIdType, isFavorite: boolean) => void;
  agendaRemoveTag: (accountId: accountId, agendaItemId: agendaIdType, tagId: TagId) => void;
  gridSetStar: (accountId: accountId, calendarItemId: calendarEventId, isFavorite: boolean) => void;
  gridRemoveTag: (accountId: accountId, calendarItemId: calendarEventId, tagId: TagId) => void;
  changeDate: (newDate: number) => void;
  switchAccounts: (nextIndex: number) => void;
  actionMenuCallbacks: CalendarActionMenuCallbacks;
  keyword: string;
  theme?: Theme.ThemeProps
}

export interface CalendarAppViewState {
  currentTab: number;
  isDatePickerOpen: boolean;
  isAgendaByTab: boolean;
  agendaFromTime: number;
  agendaToTime: number;
  selectedItems: calendarEventId[]
}

class CalendarAppView extends React.Component<CalendarAppViewProps, CalendarAppViewState> {

  static defaultProps: Partial<CalendarAppViewProps> = {
    theme: Theme.defaultTheme
  }

  constructor (props: CalendarAppViewProps) {
    super(props)

    this.state = {
      currentTab: 0,
      isDatePickerOpen: false,
      isAgendaByTab: true,
      agendaFromTime: 0,
      agendaToTime: 1,
      selectedItems: [],
    }
  }

  itemSelected = (agendaId: calendarEventId) => {
    if (this.state.selectedItems.indexOf(agendaId) > -1) {return}
    this.state.selectedItems.push(agendaId);
  }

  itemUnSelected = (agendaId: calendarEventId) => {
    const index = this.state.selectedItems.indexOf(agendaId);
    if (index === -1) {return}
    this.state.selectedItems.splice(index, 1);
  }

  accountFilterClearSelectedItems = (id: accountId, isActive: boolean) => {
    let i = 0;
    while (i < this.props.data.length) {
      if (this.props.data[i].id !== id) {
        i++;
      } else {
        this.props.data[i].calendar.map(event => {
          this.itemUnSelected(event.id);
        });
        break;
      }
    }
    this.props.accountFilter(id, isActive);
  }

  isSelectedItem = (agendaId: calendarEventId) => {
    return this.state.selectedItems.indexOf(agendaId) > -1;
  };

  addMultiTags(tag: TagData[]) {
    this.props.actionMenuCallbacks.addTag(this.state.selectedItems, tag);
  }

  addMultiNotebooks() {
    this.props.actionMenuCallbacks.addToNotebook(this.state.selectedItems);
  }

  markMultiAsRead() {
    this.props.actionMenuCallbacks.markAsRead(this.state.selectedItems);
  }

  markMultiAsUnRead() {
    this.props.actionMenuCallbacks.markAsUnread(this.state.selectedItems);
  }

  askMultiTranslate() {
    this.props.actionMenuCallbacks.askForTranslate(this.state.selectedItems);
  }

  askMultiTranscript() {
    this.props.actionMenuCallbacks.askForTranscript(this.state.selectedItems);
  }

  exportMultiItems() {
    this.props.actionMenuCallbacks.exportItem(this.state.selectedItems);
  }

  changeDate(daysToMove: number) {
    let momentTime;
    if (daysToMove !== 0) {
      let time = this.props.startingDate;
      momentTime = moment(time).add(daysToMove, 'days');
    } else {
      momentTime = moment();
    }

    this.props.changeDate(momentTime.unix());
  }

  toggleDatePicker() {
    this.setState({isDatePickerOpen: !this.state.isDatePickerOpen})
  }

  handleChange = (date: Moment) => {
    this.props.changeDate(date.unix());
    this.toggleDatePicker();
  }

  getWeeklyDate() {
    let result = '';
    const startDateOfWeek = moment(this.props.startingDate);
    const endDateOfWeek = moment(this.props.startingDate).add(6, 'days');

    if (startDateOfWeek.format('MMMM') === endDateOfWeek.format('MMMM')) {
      result += startDateOfWeek.format('MMMM DD-') + endDateOfWeek.format('DD, YYYY');
    } else if (startDateOfWeek.format('YYYY') === endDateOfWeek.format('YYYY')) {
      result += startDateOfWeek.format('MMMM DD - ') + endDateOfWeek.format('MMMM DD, YYYY');
    } else {
      result += startDateOfWeek.format('MMMM DD, YYYY - ') + endDateOfWeek.format('MMMM DD, YYYY');
    }

    return result;
  }

  renderContent() {
    switch (this.state.currentTab) {
      case 0:
        return this.renderWeek();
      case 1:
        return this.renderAgenda();
      default:
        return null;
    }
  }

  renderAgenda() {
    return (
      <AgendaView>
        {this.state.isAgendaByTab ? (
          <AgendaList
            data={this.props.data}
            agendaSetStar={this.props.agendaSetStar}
            agendaRemoveTag={this.props.agendaRemoveTag}
            fromTime={this.props.startingDate}
            toTime={moment(this.props.startingDate).add(6, 'days').endOf('day').unix() * 1000}
            actionMenuCallbacks={this.props.actionMenuCallbacks}
            agendaItemSelected={this.itemSelected}
            agendaItemUnSelected={this.itemUnSelected}
            isSelectedItem={this.isSelectedItem}
          />
        ) : (
          <AgendaList
            data={this.props.data}
            agendaSetStar={this.props.agendaSetStar}
            agendaRemoveTag={this.props.agendaRemoveTag}
            fromTime={this.state.agendaFromTime}
            toTime={this.state.agendaToTime}
            actionMenuCallbacks={this.props.actionMenuCallbacks}
            agendaItemSelected={this.itemSelected}
            agendaItemUnSelected={this.itemUnSelected}
            isSelectedItem={this.isSelectedItem}
          />
        )}

      </AgendaView>
    )
  }

  drawBackArrow() {
    return this.props.isPreviousAccountsEnable ? (
      <PreviousAccountsEnabled
        className="base_icons icon_arrow_left"
        onClick={() => this.props.switchAccounts(this.props.startingAccountIndex - 4)}
      />
    ) : <PreviousAccountsDisabled className="base_icons icon_arrow_left"/>
  }

  drawForwardArrow() {
    return this.props.isNextAccountsEnable ? (
      <NextAccountsEnabled
        className="base_icons icon_arrow_right"
        onClick={() => this.props.switchAccounts(this.props.startingAccountIndex + 4)}
      />
    ) : <NextAccountsDisabled className="base_icons icon_arrow_right"/>
  }

  getAccountList() {
    return (
      <AccountsBar>
        {this.props.data.map((item, idx) => (
            <AccountFilter
              key={idx}
              id={item.id}
              index={idx}
              account={item.account}
              isActive={item.isActive}
              accountFilter={this.accountFilterClearSelectedItems}
              numberOfAccounts={this.props.data.length}
              theme={this.props.theme}
            />))}
      </AccountsBar>
    )
  }

  renderWeek() {
    let time = this.props.startingDate;
    let momentTime = moment(time).add(0, 'days');
    let timestamp = Date.parse(momentTime.format('MMMM DD, YYYY'));
    return (
      <CalendarGrid
        timestamp={timestamp}
        data={this.props.data}
        gridSetStar={this.props.gridSetStar}
        gridRemoveTag={this.props.gridRemoveTag}
        showAllEventsOnAgendaTab={this.showAllEventsOnAgendaTab}
        actionMenuCallbacks={this.props.actionMenuCallbacks}
        itemSelected={this.itemSelected}
        itemUnSelected={this.itemUnSelected}
        isSelectedItem={this.isSelectedItem}
      />)
  }

  showAllEventsOnAgendaTab = (fromTime: number, toTime: number) => {
    this.setState({currentTab: 1, isAgendaByTab: false, agendaFromTime: fromTime, agendaToTime: toTime})
  }

  render() {
    const tabs = [{
      title: 'Week',
      callback: () => {this.setState({currentTab: 0, isAgendaByTab: true})},
    }, {
      title: 'Agenda',
      callback: () => {this.setState({currentTab: 1, isAgendaByTab: true})},
    }]
    const component = (
      <LeftFilterTools>
        <TabGeneric
          tabs={tabs}
          initialSelectedIndex={this.state.currentTab}
          selectedIndex={this.state.currentTab}
          theme={this.props.theme.tabsTheme}
        />
        <Accounts>
          {this.props.isNavigateBetweenAccounts ? this.drawBackArrow() : null}
        {this.props.isFetching ? (
          <Fetch>Fetching..</Fetch>
        ) : (
          this.getAccountList()
        )}
          {this.props.isNavigateBetweenAccounts ? this.drawForwardArrow() : null}
        </Accounts>
      </LeftFilterTools>
    )
    return (
      <ThemeProvider theme={this.props.theme}>
        <KeywordProvider keyword={this.props.keyword}>
          <CalendarView>
            <AppViewHeaderToolbar
              icon={'icon_calendar'}
              title={'Calendar'}
              titleStyle={{marginLeft: '25px'}}
              lastExtractionTime={this.props.isFetching ? 0 : this.props.lastExtractionTime}
              updateTimeIndicator={this.props.isFetching ? 0 : this.props.updateTimeIndicator}
              requestUpdate={this.props.requestUpdate}
              extractNow={this.props.extractNow}
            />
            <AppViewFiltersTool
              component={component}
              show={this.props.showFilter}
              tags={this.props.tagsFilter}
              actions={{
                addTagCallback: (tags: TagData[]) => {this.addMultiTags(tags)},
                addToNotebookCallback: () => {this.addMultiNotebooks()},
                markAsReadCallback: () => {this.markMultiAsRead()},
                markAsUnreadCallback: () => {this.markMultiAsUnRead()},
                translateCallback: () => {this.askMultiTranslate()},
                transcriptCallback: () => {this.askMultiTranscript()},
                exportCallback: () => {this.exportMultiItems()},
              }}
              toolbarGroupStyle={styles.appViewFilter}
            />
            {this.props.isFetching ? (
              <LoadingIndicator/>
            ) : (
            <WeeklyDateContainer>
              <WeeklyDateNavigation>
                <TodayContainer onClick={() => {this.changeDate(0)}}>Today</TodayContainer>
                <PreviousWeek onClick={() => {this.changeDate(-1)}} className="base_icons icon_arrow_left"/>
                <DatePickerContainer onClick={() => {this.toggleDatePicker()}}>
                  {this.getWeeklyDate()}
                </DatePickerContainer>
                <NextWeek onClick={() => {this.changeDate(1)}} className="base_icons icon_arrow_right"/>
              </WeeklyDateNavigation>
              {this.renderContent()}
              {this.state.isDatePickerOpen ? (
                <DatePicker
                  selected={moment(this.props.startingDate)}
                  onSelect={this.handleChange}
                  withPortal={true}
                  inline={true}
                />
              ) : null}
            </WeeklyDateContainer>
            )}
          </CalendarView>
        </KeywordProvider>
      </ThemeProvider>
    )
  }
}

export default CalendarAppView
