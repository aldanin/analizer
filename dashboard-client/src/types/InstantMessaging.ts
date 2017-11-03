import { ContactPerson, ContactPersonId } from './ContactPerson'
import { AppSymbol, APP_SYMBOLS } from './AppSymbols'
import * as Defaults from '../typeDefaults/InstantMessaging'
import * as Prod from './Product'
import * as GenericFilters from './GenericFilters'
import * as IMCommon from 'common-interfaces/types/InstantMessaging'

export interface ChatPerson {
  personId: ContactPersonId,
}

export type TopicId = Prod.ProductID;
export type ChatMessageId = Prod.ProductID;
export type AttachmentType = 'image' | 'video' | 'audio';

export type ChatEntity = ChatGroup | IMCommon.Participant;

export interface GroupInCommon {
  id: Prod.ProductID,
  name: string,
  topicId: Prod.ProductID
}

/// Chat Entities /////////
export interface ChatGroup {
  id: Prod.ProductID,
  topicId: Prod.ProductID,
  name: string,
  photoUrl: string,
  members: ContactPerson[]
}

export const defaultChatGroup = {
  id: -1,
  topicId: '-1',
  name: 'chatgroup',
  photoUrl: '',
  members: []
}

/// Topic Entities /////////
export interface Topic extends Prod.ProductData {
  id: Prod.ProductID,
  name: string,
  chatEntity: ChatEntity,
  appSymbol: AppSymbol,
  unreadMessageCount: number,
  lastMessage: number,
  info: {
    identifier: string,
    status: string,
    groupsInCommon: ChatGroup[]
  }
  chat: IMCommon.ChatMessage[] // A change from old interface,
  totalChatPageCount: number,
}

export const defaultId = '-1';

export const defaultTopic: Topic = Object.assign(
  {
    name: 'NA',
    chatEntity: Defaults.DEFAULT_PARTICIPANTS[0],
    appSymbol: APP_SYMBOLS.skype,
    unreadMessageCount: 0,
    lastMessage: 0,
    info: {
      identifier: 'profile',
      status: 'status',
      groupsInCommon: [defaultChatGroup]
    },
    chat: [],
    totalChatPageCount: 0,
  },
  Prod.DEFAULT_PRODUCT)
defaultTopic.id = defaultId;

/// Chat messages /////////
export interface Attachment {
  id: string
  path: string, // 'url'
  type: AttachmentType,
  size: number // 'sizeKb'
}

export type BooleanFilters = string[]
export const DEFAULT_BOOLEAN_FILTERS = [];

export type DatesSpan = {
  startDate: number,
  endDate: number,
}

export type DataKey = string;
export type Sort = {
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
