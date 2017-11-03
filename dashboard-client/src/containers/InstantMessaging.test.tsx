import {getChatMessagesByAction} from './InstantMessagingPage'
import * as Mock from '../mockData/InstantMessaging'
import * as Notmalizers from '../common/DataNormalizers/InstantMessaging'

const conversations = Mock.getConversationsData(null, 1, 25, undefined).conversations;
const topics = Notmalizers.convertConversationsToTopics(conversations);

it('should get chat messages from owner topic by the supplied chatMessasgeState', () => {

  const expectedResult = {
    messages: topics[0].chat.slice(0, 2),
    totalCount: topics[0].chat.length
  };

  expect(getChatMessagesByAction(topics, {
    topicId: topics[0].id,
    prevPageNumber: 1,
    nextPageNumber: 1,
    pageSize: 2,
    isPreviousPage: false,
    isRefreshing: false,
    filters: null
  })).toEqual(expectedResult);
})
