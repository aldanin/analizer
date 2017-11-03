import * as IMCommon from 'common-interfaces/types/InstantMessaging'

export const DEFAULT_ATTACHMENT = {
  id: '1',
  path: '',
  type: 1,
  size: 5000
}

export const DEFAULT_PARTICIPANTS = [{
  id: '1',
  name: 'Part name',
  identifier: 'not available',
  status: 'default status',
  phoneNumber: '',
  about: '',
  homepage: '',
  avatar: '',
  address: null,
  lastChat: 0,
  lastModified: 0,
  birthday: null,
  partial: false,
}, {
  id: '2',
  name: 'Part name2',
  identifier: 'not available',
  status: 'divorced',
  phoneNumber: '012-6783221',
  about: '',
  homepage: '',
  avatar: '',
  address: null,
  lastChat: 0,
  lastModified: 0,
  birthday: null,
  partial: false,
}];

export const DEFAULT_CHAT = [{
  id: 'meg1',
  isFavorite: false,
  hasNotes: false,
  hasTranslation: false,
  hasTranscript: false,
  isRead: false,
  tags: [],
  from: DEFAULT_PARTICIPANTS[0],
  to: [DEFAULT_PARTICIPANTS[1]],
  body: '',
  direction: 'outgoing' as IMCommon.Direction,
  timestamp: null,
  translatedBody: '',
  attachments: null,
  isFirstOnDate: false,
}];

export const EMPTY_CHAT = [];

export const DEFAULT_CONVERSTION = {
  id: '1',
  appName: 'empty',
  isGroup: false,
  participants: [],
  unreadMessageCount: 0,
  chat: EMPTY_CHAT
}

export const DEFAULT_CONVERSATIONS = {
  conversations: [DEFAULT_CONVERSTION]
}
