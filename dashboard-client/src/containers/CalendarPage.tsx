import * as React from 'react'
import { connect } from 'react-redux'
import CalendarAppView from '../components/CalendarAppView/index';
import {
  calendarAgendaRemoveTag, calendarAgendaSetStar, calendarChangeDate, calendarFilterAccount, calendarGridRemoveTag,
  calendarGridSetStar,
  calendarLoadRequest, calendarSwitchAccounts
} from '../state/actions/Calendar';
import { AgentId } from '../types/Agent';
import { CalendarViewTheme } from '../theme/ScTheme';
import { accountId as AccountId, agendaId, CalendarData, calendarEventId } from '../types/Calendar';
import { TagData, TagId } from '../types/Tag';
import moment = require('moment');
import {
  productAddTag, productAddToNotebook, productAskForTranscript, productAskForTranslate, productExportItem,
  productMarkAsRead,
  productMarkAsUnread
} from '../state/actions/ProductActions';
import { PRODUCT_TYPES } from '../types/Product';

export interface CalendarActionMenuCallbacks {
  addTag: (ids: AccountId[], tags: TagData[]) => void;
  addToNotebook: (ids: AccountId[]) => void;
  markAsRead: (ids: AccountId[]) => void;
  markAsUnread: (ids: AccountId[]) => void;
  askForTranslate: (ids: AccountId[]) => void;
  askForTranscript: (ids: AccountId[]) => void;
  exportItem: (ids: AccountId[]) => void;
}

export interface CalendarPageProps extends React.Props<CalendarPage> {
  loadCalendar: (agent: AgentId) => void;
  data: CalendarData;
  startingDate: number;
  startingAccountIndex: number;
  isNavigateBetweenAccounts: boolean;
  isPreviousAccountsEnable: boolean;
  isNextAccountsEnable: boolean;
  isFetching: boolean;
  isError: boolean;
  lastExtractionTime: number;
  updateTimeIndicator: number;
  requestUpdate: () => void;
  extractNow: () => void;
  showFilter: () => void;
  tagsFilter: () => void;
  actionsFilter: () => void;
  accountFilter: (id: AccountId, isActive: boolean) => void;
  agendaSetStar: (accountId: AccountId, agendaItemId: agendaId, isFavorite: boolean) => void;
  agendaRemoveTag: (accountId: AccountId, agendaItemId: agendaId, tagId: TagId) => void;
  gridSetStar: (accountId: AccountId, calendarItemId: calendarEventId, isFavorite: boolean) => void;
  gridRemoveTag: (accountId: AccountId, calendarItemId: calendarEventId, tagId: TagId) => void;
  changeDate: (newDate: number) => void;
  switchAccounts: (nextIndex: number) => void;
  addTag: (ids: AccountId[], tags: TagData[]) => void;
  addToNotebook: (ids: AccountId[]) => void;
  markAsRead: (ids: AccountId[]) => void;
  markAsUnread: (ids: AccountId[]) => void;
  askForTranslate: (ids: AccountId[]) => void;
  askForTranscript: (ids: AccountId[]) => void;
  exportItem: (ids: AccountId[]) => void;
  keyword: string;
  params: any;
}
export interface CalendarPageState {
}

export class CalendarPage extends React.Component<CalendarPageProps, CalendarPageState> {
  constructor (props: CalendarPageProps) {
    super(props)

    this.state = {
    }
  }

  loadCalendarProps = () => {
    this.props.loadCalendar(this.props.params.agent_id);
  }

  public componentDidMount() {
    this.loadCalendarProps();
  }

  getData() {
    if (this.props.data.accounts !== undefined) {
      const fromIndex = this.props.startingAccountIndex;
      const lastIndex = this.props.data.accounts.length - 1;
      const toIndex = (fromIndex + 4) > lastIndex ? lastIndex : (fromIndex + 4) ;
      return this.props.data.accounts.splice(fromIndex, toIndex);
    } else {
      return [];
    }
  }

  render() {
    if (this.props.isError) {
      return <div>Fail to load</div>
    }

    return (
      <CalendarAppView
        data={this.getData()}
        isFetching={this.props.isFetching}
        requestUpdate={this.props.requestUpdate}
        extractNow={this.props.extractNow}
        lastExtractionTime={this.props.lastExtractionTime}
        updateTimeIndicator={this.props.updateTimeIndicator}
        showFilter={this.props.showFilter}
        tagsFilter={this.props.tagsFilter}
        actionsFilter={this.props.actionsFilter}
        accountFilter={this.props.accountFilter}
        agendaSetStar={this.props.agendaSetStar}
        agendaRemoveTag={this.props.agendaRemoveTag}
        gridSetStar={this.props.gridSetStar}
        gridRemoveTag={this.props.gridRemoveTag}
        startingDate={this.props.startingDate}
        startingAccountIndex={this.props.startingAccountIndex}
        changeDate={this.props.changeDate}
        switchAccounts={this.props.switchAccounts}
        isNavigateBetweenAccounts={this.props.isNavigateBetweenAccounts}
        isNextAccountsEnable={this.props.isNextAccountsEnable}
        isPreviousAccountsEnable={this.props.isPreviousAccountsEnable}
        actionMenuCallbacks={{
          addTag: this.props.addTag,
          addToNotebook: this.props.addToNotebook,
          markAsRead: this.props.markAsRead,
          markAsUnread: this.props.markAsUnread,
          askForTranslate: this.props.askForTranslate,
          askForTranscript: this.props.askForTranscript,
          exportItem: this.props.exportItem,
        }}
        keyword={this.props.keyword}
        theme={CalendarViewTheme}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const lastExtractionTime = state[PRODUCT_TYPES.CALENDAR].get('lastFetchTs');
  const updateTimeIndicator = 400;
  const isFetching = state[PRODUCT_TYPES.CALENDAR].get('isFetching');
  const data = state[PRODUCT_TYPES.CALENDAR].get('data').toJS();
  const startingDate =
    moment(state[PRODUCT_TYPES.CALENDAR].get('startingDate') * 1000).startOf('day').unix() * 1000;
  const startingAccountIndex = state[PRODUCT_TYPES.CALENDAR].get('startingAccountIndex');
  let isNavigateBetweenAccounts, isNextAccountsEnable, isPreviousAccountsEnable;
  if (data.accounts !== undefined) {
    isNavigateBetweenAccounts = data.accounts.length > 4;
    isNextAccountsEnable = (startingAccountIndex + 4) < data.accounts.length;
    isPreviousAccountsEnable = startingAccountIndex > 0;
  } else {
    isNavigateBetweenAccounts = false;
    isNextAccountsEnable = false;
    isPreviousAccountsEnable = false;
  }
  const keyword = state[PRODUCT_TYPES.SEARCH].get('keyWord');

  return {
    lastExtractionTime,
    updateTimeIndicator,
    isFetching,
    data,
    startingDate,
    startingAccountIndex,
    isNavigateBetweenAccounts,
    isPreviousAccountsEnable,
    isNextAccountsEnable,
    keyword,
  }
}

const mapDispatchToProps = (dispatch) => {
  const startingDate = Math.trunc (+ new Date() / 1000);

  return {
    loadCalendar: (agentId: AgentId) => {dispatch(calendarLoadRequest({id: agentId}, startingDate))},

    // Header functions
    requestUpdate: () => {/* TODO: implement the function */ },
    extractNow:  () => {/* TODO: implement the function */ },
    accountFilter: (id: AccountId, isActive: boolean) => {dispatch(
      calendarFilterAccount({id: id, isActive: isActive}))},

    // Filters functions:
    showFilter: () => {/* TODO: implement the function */ },
    tagsFilter: () => {/* TODO: implement the function */ },
    actionsFilter: () => {/* TODO: implement the function */ },

    agendaSetStar: (accountId: AccountId, agendaItemId: agendaId, isFavorite: boolean) => {
      dispatch(calendarAgendaSetStar(
        {accountId, agendaItemId: agendaItemId, isFavorite: isFavorite}))
    },
    agendaRemoveTag: (accountId: AccountId, agendaItemId: agendaId, tagId: TagId) => {
      dispatch(calendarAgendaRemoveTag(
        {accountId, agendaItemId: agendaItemId, tagId: tagId}))
    },
    gridSetStar: (accountId: AccountId, calendarItemId: calendarEventId, isFavorite: boolean) => {
      dispatch(calendarGridSetStar (
        {accountId, calendarItemId: calendarItemId, isFavorite: isFavorite}))
    },
    gridRemoveTag: (accountId: AccountId, calendarItemId: calendarEventId, tagId: TagId) => {
      dispatch(calendarGridRemoveTag(
        {accountId, calendarItemId: calendarItemId, tagId: tagId}))
    },
    changeDate: (newDate: number) => {dispatch(calendarChangeDate({newDate: newDate}))},
    switchAccounts: (nextIndex: number) => {dispatch(calendarSwitchAccounts({nextIndex: nextIndex}))},

    addTag: (ids: AccountId[], tags: TagData[]) => {dispatch(productAddTag({ids, tags}, PRODUCT_TYPES.CALENDAR))},
    addToNotebook: (ids: AccountId[]) => {dispatch(productAddToNotebook({ids}, PRODUCT_TYPES.CALENDAR))},
    markAsRead: (ids: AccountId[]) => {dispatch(productMarkAsRead({ids}, PRODUCT_TYPES.CALENDAR))},
    markAsUnread: (ids: AccountId[]) => {dispatch(productMarkAsUnread({ids}, PRODUCT_TYPES.CALENDAR))},
    askForTranslate: (ids: AccountId[]) => {dispatch(productAskForTranslate({ids}, PRODUCT_TYPES.CALENDAR))},
    askForTranscript: (ids: AccountId[]) => {dispatch(productAskForTranscript({ids}, PRODUCT_TYPES.CALENDAR))},
    exportItem: (ids: AccountId[]) => {dispatch(productExportItem({ids}, PRODUCT_TYPES.CALENDAR))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage)
