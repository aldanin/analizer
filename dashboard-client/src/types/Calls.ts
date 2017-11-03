import { TagData } from './Tag'
import * as AppSymbols from './AppSymbols'
import * as Prod from './Product'
import * as GenericFilters from './GenericFilters'

export interface FromTo {
  callDirection: CallDirection;
  phoneNumber: string;
}

export enum CallDirection {
  incomming = 1,
  outgoing = 2,
}

export enum SourceTypes {
  audio = 1,
  video = 2,
}

export enum CallTypes {
  incomming = 1,
  outgoing = 2,
  unanswered = 3,
}

export interface CueData {
  id: Prod.ProductID,
  time: number,
  note: string
}

export interface CallData extends Prod.ProductData {
  id: Prod.ProductID;
  appSymbol: AppSymbols.AppSymbol,
  fromTo: FromTo,
  type: CallTypes,
  source: SourceTypes,
  duration: number,
  cueData: CueData[],
  date: number,
  remarks?: string;
  transcription?: string;
  isRead: boolean,
  isFavorite: boolean;
  tags: TagData[];
}

export const defaultCallData: CallData = {
  id: -1,
  appSymbol: AppSymbols.APP_SYMBOLS.whatsapp,
  fromTo: {
    callDirection: CallDirection.incomming,
    phoneNumber: '000-00000'
  },
  type: CallTypes.incomming,
  source: SourceTypes.audio,
  duration: 0,
  cueData: [{
    id: null,
    time: 0,
    note: 'Cue 1'
  }],
  date: 7872993923,
  isFavorite: false,
  isRead: false,
  hasNotes: false,
  hasTranslation: false,
  tags: [],
};

export const INITIAL_ID = 0;

export type DatesSpan = {
  startDate: number,
  endDate: number,
}

export type DataKey = string;
export type Sort =  {
  sortBy: DataKey,
  desc: boolean
}

export interface Filters extends GenericFilters.FiltersExt {
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
    dates: DEFAULT_DATESPAN,
    sort: DEFAULT_SORT,
  },
  GenericFilters.DEFAULT_FILTERS_EXT)
