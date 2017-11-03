// import { APP_SYMBOLS } from './AppSymbols'
import * as GenericFilters from './GenericFilters'
import * as ContactsCommon from 'common-interfaces/types/Contacts'

export const DEFAULT_CONTACT: ContactsCommon.Contact = {
  id: '1',
  name: 'New name',
  tags: [],
  isFavorite: false,
  isRead: false,
  app: 'line',
  details: null,
  identifier: null,
  lastChat: Date.now(),
  lastOnline: Date.now(),
  dateAdded: null,
  date: Date.now(),
  status: null,
  phoneHome: '',
  // phoneWork: '',
  // phoneMobile: '',
  email: null,
  address: null,
  avatar: null,
  // contactDetails: {
  //   'phone number': '',
  //   status: 'Hey there! I am using WhatsApp.'
  // }
}

export const INITIAL_ID = 0;

export type BooleanFilters = string[]
export const DEFAULT_BOOLEAN_FILTERS = [];

export type DatesSpan = {
  startDate: number,
  endDate: number,
}

export type DataKey = string;
export type Sort =  {
  sortBy: DataKey,
  desc: boolean
}

export interface Filters extends GenericFilters.Filters {
  boolean: BooleanFilters,
  dates: DatesSpan,
  sort: Sort,
}

export const DEFAULT_DATESPAN = {
  startDate: null,
  endDate: null,
}

export const DEFAULT_SORT = {
  sortBy: null,
  desc: false
}

export const DEFAULT_FILTERS = Object.assign(
  {
    boolean: DEFAULT_BOOLEAN_FILTERS,
    dates: DEFAULT_DATESPAN,
    sort: DEFAULT_SORT,
  },
  GenericFilters.DEFAULT_FILTERS)
