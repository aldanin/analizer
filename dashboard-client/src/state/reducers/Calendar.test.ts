import * as Redux from 'redux'
import calendarReducer, {default as Calendar } from './Calendar'
import { initialState as reducerInitialState } from './Calendar'
import * as Immutable from 'immutable'
import {
  calendarLoadRequest,
  calendarLoadSuccess,
  calendarLoadFail, calendarAgendaSetStar, calendarGridSetStar, calendarAgendaRemoveTag, calendarGridRemoveTag,
  calendarChangeDate, calendarSwitchAccounts,
} from '../actions/Calendar'
import { fromJS }  from 'immutable'

import { CalendarData } from '../../types/Calendar'

it('should provide the initial state', () => {
  expect(calendarReducer(undefined, {} as Redux.Action)).toEqual(reducerInitialState)
})

it('should handle LOAD_CALENDAR_REQUEST actions', () => {
  const state = {
    isFetching: true,
    lastFetchTs: 0,
    error: null,
    startingDate: 123,
    startingAccountIndex: 0,
    data: [] as CalendarData[],
  }
  expect(calendarReducer(reducerInitialState, calendarLoadRequest({id: '1234'}, 123))).toEqual(fromJS(state))
})

it('should handle LOAD_CALENDAR_SUCCESS actions', () => {
  const payload = {
    accounts: [],
  }
  const resultState = {
    isFetching: false,
    lastFetchTs: 123456,
    error: null,
    startingDate: 0,
    startingAccountIndex: 0,
    data: payload,
  }

  expect(calendarReducer(reducerInitialState, calendarLoadSuccess(payload, 123456))).toEqual(fromJS(resultState))
})

it('should handle LOAD_CALENDAR_FAIL actions', () => {
  const payload = new Error('Foo bar')
  const resultState = {
    isFetching: false,
    lastFetchTs: 0,
    error: new Error('Foo bar'),
    startingDate: 0,
    startingAccountIndex: 0,
    data: [],
  }
  expect(calendarReducer(reducerInitialState, calendarLoadFail(payload))).toEqual(fromJS(resultState))
})

it('should ignore unknown actions', () => {
  const state = fromJS({
    isFetching: false,
    lastFetchTs: 123,
    error: null,
    data: {
      accounts: [],
    },
  })
  expect(calendarReducer(state, { type: 'unknown' })).toEqual(state)
})

it('should change agenda isFavorite value', () => {
  const payload = {
    accountId: 0,
    agendaItemId: 0,
    isFavorite: true,
  };

  const demoData = fromJS({
    accounts: [{
      id: 0,
      calendar: [{
        id: 0,
        isFavorite: false,
      }]
    }]
  })

  interface State extends Immutable.Map<string, any> {
    isFetching: boolean,
    lastFetchTs: number,
    error: Error | null,
    startingDate: number,
    startingAccountIndex: number;
    data: CalendarData,
  }

  const initialState: State = fromJS({
    isFetching: true,
    lastFetchTs: 0,
    error: null,
    startingDate: Math.trunc (+ new Date() / 1000),
    startingAccountIndex: 0,
    data: demoData,
  })

  const agendaSetStar = Calendar(initialState, calendarAgendaSetStar(payload));
  expect(agendaSetStar.getIn(['data', 'accounts', 0, 'calendar', 0, 'isFavorite'])).toEqual(true);
})

it('should change calendar isFavorite value', () => {
  const payload = {
    accountId: 0,
    calendarItemId: 0,
    isFavorite: true,
  };

  const demoData = fromJS({
    accounts: [{
      id: 0,
      calendar: [{
        id: 0,
        isFavorite: false,
      }]
    }]
  })

  interface State extends Immutable.Map<string, any> {
    isFetching: boolean,
    lastFetchTs: number,
    error: Error | null,
    startingDate: number,
    startingAccountIndex: number;
    data: CalendarData,
  }

  const initialState: State = fromJS({
    isFetching: true,
    lastFetchTs: 0,
    error: null,
    startingDate: Math.trunc (+ new Date() / 1000),
    startingAccountIndex: 0,
    data: demoData,
  })

  const agendaSetStar = Calendar(initialState, calendarGridSetStar(payload));
  expect(agendaSetStar.getIn(['data', 'accounts', 0, 'calendar', 0, 'isFavorite'])).toEqual(true);
})

it('should remove tag from agenda tab', () => {
  const payload = {
    accountId: 0,
    agendaItemId: 0,
    tagId: '0',
  };

  const demoData = fromJS({
    accounts: [{
      id: 0,
      calendar: [{
        id: 0,
        tags: [{
          id: '0',
          text: 'test',
        }],
      }]
    }]
  })

  interface State extends Immutable.Map<string, any> {
    isFetching: boolean,
    lastFetchTs: number,
    error: Error | null,
    startingDate: number,
    startingAccountIndex: number;
    data: CalendarData,
  }

  const initialState: State = fromJS({
    isFetching: true,
    lastFetchTs: 0,
    error: null,
    startingDate: Math.trunc (+ new Date() / 1000),
    startingAccountIndex: 0,
    data: demoData,
  })

  const agendaSetStar = Calendar(initialState, calendarAgendaRemoveTag(payload));
  expect(agendaSetStar.getIn(['data', 'accounts', 0, 'calendar', 0, 'tags']).toJS()).toEqual([]);
})

it('should remove tag from calendar tab', () => {
  const payload = {
    accountId: 0,
    calendarItemId: 0,
    tagId: '0',
  };

  const demoData = fromJS({
    accounts: [{
      id: 0,
      calendar: [{
        id: 0,
        tags: [{
          id: '0',
          text: 'test',
        }],
      }]
    }]
  })

  interface State extends Immutable.Map<string, any> {
    isFetching: boolean,
    lastFetchTs: number,
    error: Error | null,
    startingDate: number,
    startingAccountIndex: number;
    data: CalendarData,
  }

  const initialState: State = fromJS({
    isFetching: true,
    lastFetchTs: 0,
    error: null,
    startingDate: Math.trunc (+ new Date() / 1000),
    startingAccountIndex: 0,
    data: demoData,
  })

  const agendaSetStar = Calendar(initialState, calendarGridRemoveTag(payload));
  expect(agendaSetStar.getIn(['data', 'accounts', 0, 'calendar', 0, 'tags']).toJS()).toEqual([]);
})

it ('should change date', () => {
  const payload = {
    newDate: + new Date(),
  };
  const changeDateState = Calendar(reducerInitialState, calendarChangeDate(payload));
  expect(changeDateState.get('startingDate')).toEqual(payload.newDate);
})

it ('should change accounts', () => {
  const payload = {
    nextIndex: 4,
  };

  const changeAccount = Calendar(reducerInitialState, calendarSwitchAccounts(payload));
  expect(changeAccount.get('startingAccountIndex')).toEqual(payload.nextIndex);
})
