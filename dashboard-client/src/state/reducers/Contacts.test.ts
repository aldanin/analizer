import * as Redux from 'redux'
import * as Immutable from 'immutable'
import { fromJS }  from 'immutable'
import contactsReducer from './Contacts'
import { initialState } from './Contacts'
import * as Actions from '../actions/Contacts'
import * as Contacts from '../../types/Contacts'

it('should provide the initial state', () => {
  expect(contactsReducer(undefined, {} as Redux.Action)).toEqual(initialState)
})

it('should handle CONTACTS_FILTERS_CHANGE actions', () => {
  type State = Immutable.Map<string, any>

  const action = {
    payload: {
      filters: Contacts.DEFAULT_FILTERS
    }
  };

  const state: State = fromJS(Contacts.DEFAULT_FILTERS);

  const stateResult = contactsReducer(state, Actions.filtersChange(action.payload));

  expect(
    stateResult.get('filters')).toEqual(state)
})

it('should ignore unknown actions', () => {
  const state = fromJS({
    isFetching: true,
    isError: false,
    contactsData: [],
    nextPageNumber: 1,
    totalCount: 0,
    filters: [],
  })
  expect(contactsReducer(state, {type: 'unknown'})).toEqual(state)
})
