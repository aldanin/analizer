import * as Redux from 'redux'
import { CalendarData } from '../../types/Calendar'
import * as Immutable from 'immutable'
import { fromJS }  from 'immutable'

import {
  LOAD_CALENDAR_REQUEST,
  LOAD_CALENDAR_SUCCESS,
  LOAD_CALENDAR_FAIL, CALENDAR_FILTER_ACCOUNT, CalendarFilterAccountAction, CALENDAR_AGENDA_SET_STAR,
  CalendarAgendaSetStarAction, CALENDAR_AGENDA_REMOVE_TAG, CalendarAgendaRemoveTagAction, CALENDAR_GRID_SET_STAR,
  CalendarGridSetStarAction, CALENDAR_GRID_REMOVE_TAG, CalendarGridRemoveTagAction, CALENDAR_CHANGE_DATE,
  CalendarChangeDateAction, CALENDAR_SWITCH_ACCOUNTS, CalendarSwitchAccountsAction,
} from '../actions/Calendar'

import {
  CalendarLoadRequestAction,
  CalendarLoadSuccessAction,
  CalendarLoadFailAction,
} from '../actions/Calendar'
import {
  PRODUCT_ADD_TAG, PRODUCT_MARK_AS_READ, PRODUCT_MARK_AS_UNREAD, ProductAction,
  ProductAddTagAction
} from '../actions/ProductActions';
import { PRODUCT_TYPES } from '../../types/Product';

// combine action types
export type Action = CalendarLoadRequestAction
  | CalendarLoadSuccessAction
  | CalendarLoadFailAction
  | Redux.Action

interface State extends Immutable.Map<string, any>  {
  isFetching: boolean,
  lastFetchTs: number,
  error: Error | null,
  startingDate: number;
  startingAccountIndex: number;
  data: CalendarData,
}

export const initialState: State = fromJS({
  isFetching: true,
  lastFetchTs: 0,
  error: null,
  // startingDate: Math.trunc (+ new Date() / 1000),
  startingDate: 0,
  startingAccountIndex: 0,
  data: [],
})

function Calendar(state: State = initialState, action: Action) {
  switch (action.type) {
    case LOAD_CALENDAR_REQUEST: {
      return state
        .set('isFetching', true)
        .set('startingDate', (action as CalendarLoadRequestAction).startingDate)
    }
    case LOAD_CALENDAR_SUCCESS: {
      const {payload, timestamp} = (<CalendarLoadSuccessAction> action)
      return state
        .set('isFetching', false)
        .set('lastFetchTs', timestamp)
        .set('error', null)
        .set('data', fromJS(payload))
    }
    case LOAD_CALENDAR_FAIL: {
      return state
        .set('isFetching', false)
        .set('error', (<CalendarLoadFailAction> action).error)
        .set('data', fromJS([]))
    }

    case CALENDAR_FILTER_ACCOUNT: {
      const calendarAccounts = state.getIn(['data', 'accounts']).toJS();
      const accountIndex = calendarAccounts.findIndex(
        item => item.id === (action as CalendarFilterAccountAction).payload.id);
      return state
        .setIn(
          ['data', 'accounts', accountIndex, 'isActive'],
          (action as CalendarFilterAccountAction).payload.isActive
        );
    }
    case CALENDAR_AGENDA_SET_STAR: {
      const calendarStarAccounts = state.getIn(['data', 'accounts']).toJS();
      const accountStarIndex = calendarStarAccounts.findIndex(
        item => item.id === (action as CalendarAgendaSetStarAction).payload.accountId);
      const calendarStarAgenda = state.getIn(['data', 'accounts', accountStarIndex, 'calendar']).toJS();
      const agendaStarIndex = calendarStarAgenda.findIndex(
        item => item.id === (action as CalendarAgendaSetStarAction).payload.agendaItemId);
      return state
        .setIn(
          ['data', 'accounts', accountStarIndex, 'calendar', agendaStarIndex, 'isFavorite'],
          (action as CalendarAgendaSetStarAction).payload.isFavorite
        );
    }
    case CALENDAR_AGENDA_REMOVE_TAG:
      const calendarTagAccounts = state.getIn(['data', 'accounts']).toJS();
      const accountTagIndex = calendarTagAccounts.findIndex(
        item => item.id === (action as CalendarAgendaRemoveTagAction).payload.accountId);
      const calendarTagAgenda = state.getIn(['data', 'accounts', accountTagIndex, 'calendar']).toJS();
      const agendaTagIndex = calendarTagAgenda.findIndex(
        item => item.id === (action as CalendarAgendaRemoveTagAction).payload.agendaItemId);
      return state
        .updateIn(['data', 'accounts', accountTagIndex, 'calendar', agendaTagIndex, 'tags'], (tags) => tags.filter(
          (tag) => tag.get('id') !== (action as CalendarAgendaRemoveTagAction).payload.tagId
        ));

    case CALENDAR_GRID_SET_STAR:
      const calendarGridStarAccounts = state.getIn(['data', 'accounts']).toJS();
      const accountGridStarIndex = calendarGridStarAccounts.findIndex(
        item => item.id === (action as CalendarGridSetStarAction).payload.accountId);
      const calendarStarGrid = state.getIn(['data', 'accounts', accountGridStarIndex, 'calendar']).toJS();
      const gridStarIndex = calendarStarGrid.findIndex(
        item => item.id === (action as CalendarGridSetStarAction).payload.calendarItemId);
      return state
        .setIn(
          ['data', 'accounts', accountGridStarIndex, 'calendar', gridStarIndex, 'isFavorite'],
          (action as CalendarGridSetStarAction).payload.isFavorite
        );

    case CALENDAR_GRID_REMOVE_TAG:
      const calendarGridTagAccounts = state.getIn(['data', 'accounts']).toJS();
      const accountGridTagIndex = calendarGridTagAccounts.findIndex(
        item => item.id === (action as CalendarGridRemoveTagAction).payload.accountId);
      const calendarTagGrid = state.getIn(['data', 'accounts', accountGridTagIndex, 'calendar']).toJS();
      const gridTagIndex = calendarTagGrid.findIndex(
        item => item.id === (action as CalendarGridRemoveTagAction).payload.calendarItemId);
      return state
        .updateIn(
          ['data', 'accounts', accountGridTagIndex, 'calendar', gridTagIndex, 'tags'], (tags) => tags.filter(
            (tag) => tag.get('id') !== (action as CalendarAgendaRemoveTagAction).payload.tagId
          ));

    case CALENDAR_CHANGE_DATE:
      return state
        .set('startingDate', (action as CalendarChangeDateAction).payload.newDate);

    case CALENDAR_SWITCH_ACCOUNTS:
      return state
        .set('startingAccountIndex', (action as CalendarSwitchAccountsAction).payload.nextIndex);
    default:
  }
  // LISTENER TO PRODUCT (GLOBAL) ACTIONS:
  if ('productType' in action && (action as ProductAction).productType === PRODUCT_TYPES.CALENDAR) {
    switch (action.type) {
      case PRODUCT_ADD_TAG:
        const allIDs = (action as ProductAddTagAction).payload.ids;
        const allTags = (action as ProductAddTagAction).payload.tags;

        return state.withMutations(tempState => {
          allIDs.forEach(id => {
            const keyIndex = {
              account: null,
              event: null,
            }

            tempState.getIn(['data', 'accounts']).findIndex((calendar, accountIndex) => {
              if (keyIndex.event === null) {
                keyIndex.account = accountIndex;
              }
              const account = calendar.get('calendar');

              account.findIndex((event, eventIndex) => {
                if (event.get('id') === id) {
                  keyIndex.event = eventIndex;
                  return;
                }
              });
              if (keyIndex.event !== null) {
                return
              }
            })

            allTags.map((tag) => {
              tempState.updateIn(
                ['data', 'accounts', keyIndex.account, 'calendar', keyIndex.event, 'tags'],
                (tags) => tags.push(fromJS(tag)));
            })
          })
        })

      case PRODUCT_MARK_AS_READ:
        return state.withMutations(tempState => {
          (action as ProductAddTagAction).payload.ids.forEach(id => {
            const keyIndex = {
              account: null,
              event: null,
            }

            tempState.getIn(['data', 'accounts']).findIndex((calendar, accountIndex) => {
              if (keyIndex.event === null) {
                keyIndex.account = accountIndex;
              }
              const account = calendar.get('calendar');

              account.findIndex((event, eventIndex) => {
                if (event.get('id') === id) {
                  keyIndex.event = eventIndex;
                  return;
                }
              });
              if (keyIndex.event !== null) {
                return
              }
            })
            tempState.setIn(['data', 'accounts', keyIndex.account, 'calendar', keyIndex.event, 'isNew'], false)
          })
        })

      case PRODUCT_MARK_AS_UNREAD:
        return state.withMutations(tempState => {
          (action as ProductAddTagAction).payload.ids.forEach(id => {
            const keyIndex = {
              account: null,
              event: null,
            }

            tempState.getIn(['data', 'accounts']).findIndex((calendar, accountIndex) => {
              if (keyIndex.event === null) {
                keyIndex.account = accountIndex;
              }
              const account = calendar.get('calendar');

              account.findIndex((event, eventIndex) => {
                if (event.get('id') === id) {
                  keyIndex.event = eventIndex;
                  return;
                }
              });
              if (keyIndex.event !== null) {
                return
              }
            })
            tempState.setIn(['data', 'accounts', keyIndex.account, 'calendar', keyIndex.event, 'isNew'], true)
          })
        })

      default:
    }
  }
  return state;
}

export default Calendar
