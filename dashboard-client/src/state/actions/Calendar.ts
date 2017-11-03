import * as Redux from 'redux'
import { accountId, agendaId, CalendarData, calendarEventId } from '../../types/Calendar';
import { AgentId } from '../../types/Agent';
import { TagId } from '../../types/Tag';

export const LOAD_CALENDAR_REQUEST = 'Calendar/LOAD_REQUEST'
export const LOAD_CALENDAR_SUCCESS = 'Calendar/LOAD_SUCCESS'
export const LOAD_CALENDAR_FAIL = 'Calendar/LOAD_FAIL'
export const CALENDAR_FILTER_ACCOUNT = 'Calendar/FILTER_ACCOUNT'
export const CALENDAR_AGENDA_SET_STAR = 'Calendar/AGENDA_SET_STAR'
export const CALENDAR_AGENDA_REMOVE_TAG = 'Calendar/AGENDA_REMOVE_TAG'
export const CALENDAR_GRID_SET_STAR = 'Calendar/GRID_SET_STAR'
export const CALENDAR_GRID_REMOVE_TAG = 'Calendar/GRID_REMOVE_TAG'
export const CALENDAR_CHANGE_DATE = 'Calendar/CHANGE_DATE'
export const CALENDAR_SWITCH_ACCOUNTS = 'Calendar/SWITCH_ACCOUNTS'

export interface CalendarLoadRequestAction extends Redux.Action {
  startingDate: number;
}

export interface CalendarFilterAccountAction extends Redux.Action {
  payload: CalendarFilterAccount;
}

export interface  CalendarAgendaSetStarAction extends Redux.Action {
  payload: CalendarAgendaSetStar;
}

export interface  CalendarGridSetStarAction extends Redux.Action {
  payload: CalendarGridSetStar;
}

export interface CalendarAgendaRemoveTagAction extends Redux.Action {
  payload: CalendarAgendaRemoveTag;
}

export interface CalendarGridRemoveTagAction extends Redux.Action {
  payload: CalendarGridRemoveTag;
}

export interface CalendarChangeDateAction extends Redux.Action {
  payload: CalendarChangeDate;
}

export interface CalendarSwitchAccountsAction extends Redux.Action {
  payload: CalendarSwitchAccounts;
}

export interface CalendarAgent {
  id: AgentId;
}

export interface CalendarSwitchAccounts {
  nextIndex: number;
}

export interface CalendarAgendaSetStar {
  accountId: accountId;
  agendaItemId: agendaId;
  isFavorite: boolean;
}

export interface CalendarGridSetStar {
  accountId: accountId;
  calendarItemId: calendarEventId;
  isFavorite: boolean;
}

export interface CalendarAgendaRemoveTag {
  accountId: accountId;
  agendaItemId: agendaId;
  tagId: TagId;
}

export interface CalendarGridRemoveTag {
  accountId: accountId;
  calendarItemId: calendarEventId;
  tagId: TagId;
}

export interface CalendarFilterAccount {
  id: accountId;
  isActive: boolean;
}

export interface CalendarChangeDate {
  newDate: number;
}

/**
 * Load the calendar, this action starts the request saga
 */
export function calendarLoadRequest(payload: CalendarAgent, startingDate: number): CalendarLoadRequestAction {
  return {
    type: LOAD_CALENDAR_REQUEST,
    startingDate,
  };
}

export interface CalendarLoadSuccessAction extends Redux.Action {
  payload: CalendarData,
  timestamp: number,
}
/**
 * Dispatched when the calendar are loaded by the request saga
 */
export function calendarLoadSuccess(payload: CalendarData, timestamp: number = Date.now()): CalendarLoadSuccessAction {
  return {
    type: LOAD_CALENDAR_SUCCESS,
    payload,
    timestamp,
  };
}

export interface CalendarLoadFailAction extends Redux.Action {
  error: Error
}
/**
 * Dispatched when loading the calendar fails
 */
export function calendarLoadFail(error: Error): CalendarLoadFailAction {
  return {
    type: LOAD_CALENDAR_FAIL,
    error,
  };
}
/**
 * Dispatched when click on checkbox to filter accounts
 */
export function calendarFilterAccount(payload: CalendarFilterAccount): CalendarFilterAccountAction {
  return {
    type: CALENDAR_FILTER_ACCOUNT,
    payload,
  };
}
/**
 * Dispatched when click on star icon
 */
export function calendarAgendaSetStar(payload: CalendarAgendaSetStar): CalendarAgendaSetStarAction {
  return {
    type: CALENDAR_AGENDA_SET_STAR,
    payload,
  };
}
/**
 * Dispatched when click on star icon
 */
export function calendarGridSetStar(payload: CalendarGridSetStar): CalendarGridSetStarAction {
  return {
    type: CALENDAR_GRID_SET_STAR,
    payload,
  };
}
/**
 * Dispatched when user click on x inside the tag span
 */
export function calendarAgendaRemoveTag(payload: CalendarAgendaRemoveTag): CalendarAgendaRemoveTagAction {
  return {
    type: CALENDAR_AGENDA_REMOVE_TAG,
    payload,
  };
}
/**
 * Dispatched when user click on x inside the tag span
 */
export function calendarGridRemoveTag(payload: CalendarGridRemoveTag): CalendarGridRemoveTagAction {
  return {
    type: CALENDAR_GRID_REMOVE_TAG,
    payload,
  };
}
/**
 * Dispatched when user change the dates of the calendar
 */
export function calendarChangeDate(payload: CalendarChangeDate): CalendarChangeDateAction {
  return {
    type: CALENDAR_CHANGE_DATE,
    payload,
  };
}
/**
 * Dispatched when user change the dates of the calendar
 */
export function calendarSwitchAccounts(payload: CalendarSwitchAccounts): CalendarSwitchAccountsAction {
  return {
    type: CALENDAR_SWITCH_ACCOUNTS,
    payload,
  };
}
