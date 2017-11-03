import * as IMCommon from 'common-interfaces/types/InstantMessaging'
import * as IM from '../../types/InstantMessaging'
import * as AppSymbols from '../../types/AppSymbols'
import * as Person from '../../types/ContactPerson'

export const convertConversationsToTopics = (conversations) => {
  if (!conversations) {
    return null;
  }
  const topics = conversations.map(conv => {
    let topicTarget: IMCommon.Participant;
    try {
      topicTarget = conv.chat[0].from;

      const topic: IM.Topic = {
        id: conv.id,
        name: conv.name,
        isFavorite: null,
        hasNotes: null,
        hasTranslation: null,
        hasTranscript: null,
        isRead: true,
        tags: null,
        chatEntity: conv.groupId
          ? createChatGroup(conv)
          : topicTarget,
        appSymbol: conv.appName ? AppSymbols.APP_SYMBOLS[conv.appName] : AppSymbols.APP_SYMBOLS.phone,
        unreadMessageCount: getUnreadMessagesCount(conv),
        lastMessage: conv.chat && conv.chat.length ? conv.chat[conv.chat.length - 1].timestamp : null,
        info: {
          identifier: topicTarget.identifier,
          status: topicTarget.status,
          groupsInCommon: []
        },
        chat: conv.chat,
        totalChatPageCount: getTotalPageCount(conv.chat, 15),
      }

      populateIsFirstOnDate(topic.chat);

      return topic;
    } catch (err) {
      return null;
    }

  })
  return topics;
}

const populateIsFirstOnDate = (chat: IMCommon.ChatMessage[]) => {
  if (!chat || !chat.length) {
    return;
  }
  //
  // First message in the chat always shows the new date (blue) message:
  //
  chat[0].isFirstOnDate = true;
  let currentDate = new Date(chat[0].timestamp);

  chat.forEach((message: IMCommon.ChatMessage, index: number) => {
    const date = new Date(message.timestamp);

    if (currentDate.getDate() !== date.getDate()) {
      //
      // Messages are presumed to be sorted by date.
      // A change in the current message's day means this is the first one:
      //
      currentDate = date;
      message.isFirstOnDate = true;
    }
  })
}

const getTotalPageCount = (chat: IMCommon.ChatMessage[], pageSize: number) => {
  const totalPageCount = Math.ceil(chat.length / pageSize);
  return totalPageCount;

}

export const convertParticipantToPerson = (parti: IMCommon.Participant): Person.ContactPerson => {
  const person = {
    id: parti.id,
    name: parti.name,
    phoneHome: parti.phoneNumber,
    phoneWork: parti.phoneNumber,
    phoneMobile: parti.phoneNumber,
    email: '',
    address: {
      street: '',
      city: ''
    },
    avatar: parti.avatar,
  }
  return person;
}

export const createChatGroup = (conv: IMCommon.ChatConversation): IM.ChatGroup => {
  const owner = conv.participants[0];
  const chatGroup = {
    id: owner.id,
    topicId: owner.id,
    name: conv.name,
    photoUrl: owner.avatar,
    members: conv.participants.map((parti: IMCommon.Participant) => convertParticipantToPerson(parti)),
  }
  return chatGroup;
}

export const getUnreadMessagesCount = (conv: IMCommon.ChatConversation): number => {

  const total = conv.chat
    ? conv.chat.reduce(
        function (sum: number, message: IMCommon.ChatMessage) {
          const value = message.isRead ? 0 : 1;
          return sum + value;
        },
        0
      )
    : 0;

  return total;
}
