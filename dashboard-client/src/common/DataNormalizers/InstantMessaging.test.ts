import * as Normalizers from './InstantMessaging'

const chat = [{
  id: "1002",
  from: {
    id: "997",
    name: "Yuri gagarin",
    avatar: "https://unsplash.it/500/400?image=479",
    contactDetails: {},
    phoneNumber: "07-9892153",
    identifier: "im Tirzu",
    status: "to be announced...",
    tags: [],
  },
  to: [{
    id: "998",
    name: "Abdul Nazer",
    avatar: "https://unsplash.it/500/400?image=479",
    contactDetails: {},
    phoneNumber: "07-9892153",
    identifier: "im Tirzu",
    status: "to be announced...",
    tags: [],
  }],
  body: "1001.0 - Your mumma!!! But your right I AM retarted",
  direction: 'incoming', // TODO: when compilation problem is resolved - as IMCommon.Direction,
  hasNotes: false,
  hasTranscript: false,
  hasTranslation: true,
  isFavorite: true,
  isFirstOnDate: false,
  isRead: false,
  timestamp: 1498481839566,
  attachments: null,
  tags: ['tag0']
}
]

const conversation = {
  id: "1001",
  appName: "telegram",
  isGroup: true,
  participants: [{
    id: "998",
    name: "Yuri gagarin",
    avatar: "https://unsplash.it/500/400?image=479",
    contactDetails: {},
    phoneNumber: "07-9892153",
    identifier: "im Tirzu",
    status: "to be announced...",
    tags: [],
  }, {
    id: "999",
    name: "Yuri gagarin",
    avatar: "https://unsplash.it/500/400?image=479",
    contactDetails: {},
    phoneNumber: "07-9892153",
    identifier: "im Tirzu",
    status: "to be announced...",
    tags: [],
  }],
  chat: chat
}

const topic = {
  id: "1001",
  isFavorite: null,
  hasNotes: null,
  hasTranslation: null,
  hasTranscript: null,
  isRead: true,
  lastMessage: 1498481839566,
  tags: null,
  unreadMessageCount: 1,
  chatEntity: {
    id: "998",
    topicId: "998",
    name: "Yuri gagarin",
    photoUrl: "https://unsplash.it/500/400?image=479",
    members: []
  },
  appSymbol: {key: "telegram", caption: "Telegram"},
  info: {
    groupsInCommon: [],
    identifier: "Yuri gagarin",
    status: "to be announced...",
  },
  chat: [{
    id: "1002",
    isFavorite: true,
    isFirstOnDate: false,
    sender: {id: null, name: "Abdul Nazer"},
    isRead: false,
    media: null,
    notes: null,
    origIndex: null,
    tags: ['tag0'],
    text: "1001.0 - Your mumma!!! But your right I AM retarted",
    timestamp: 1498481839566,
    topicId: "1001"
  }],
}

it('should convert between IM new conversation to old topic flawlessly', () => {
  const conversations = [conversation];
  const topics = [topic];

  expect(Normalizers.convertConversationsToTopics(conversations)).toEqual(topics);
})
