import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Tag from '../../types/Tag'
import * as Prod from '../../types/Product'
import * as Theme from './Theme'
import * as IM from '../../types/InstantMessaging'
import InstantMessagingAppViewer from './';
import { InstantMessagingAppViewerProps } from './';
import { FiltersData } from '../../types/Filters'
import { ThemeProvider } from 'styled-components';
import * as Mock from '../../mockData/InstantMessaging'
import * as Notmalizers from '../../common/DataNormalizers/InstantMessaging'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const conversations = Mock.getConversationsData(null, 1, 25, undefined).conversations;
  const topics = Notmalizers.convertConversationsToTopics(conversations);

  const props: InstantMessagingAppViewerProps = {
    topicsData: topics,
    chatMessagesData: {
      messages: topics[0].chat.slice(0, 2),
      totalCount: topics[0].chat.length
    },
    hasNextTopicsPage: true,
    isFetching: false,
    isFirstRequest: false,
    isRefreshing: false,
    specificTopicsPageWasLoaded: false,
    fetchedChatMessagesFirstPage: true,
    contentHandlers: {
      addTags: (chatMessageIds: Prod.ProductID[], tags: Tag.TagData[]) => null,
      removeTag: (id: IM.TopicId, tagId: Tag.TagId) => null,
      setFavorite: (topicId, boolean) => null,
      markAsRead: (ids: Prod.ProductID[], boolean) => {
      },
      addToNotebook: (itemId: Prod.ProductID[]) => null,
      askForTranslate: (itemId: Prod.ProductID[]) => null,
      askForTranscript: (itemId: Prod.ProductID[]) => null,
      getTranslate: (itemId: Prod.ProductID) => null,
      getTranscript: (itemId: Prod.ProductID) => null,
      openNotebook: () => null,
      exportItem: (itemId: Prod.ProductID[]) => null,
      refreshTopics: (filters?: FiltersData, lastId?: IM.TopicId) => null,
      loadChatMessagesPage: (topicId: Prod.ProductID,
                             isPreveiousPage: boolean,
                             isRefreshing: boolean,
                             filters?: FiltersData) => null,
      loadContainingTopicsPage: (topicId: Prod.ProductID, filters?: FiltersData) => null,
      onSliceRendered: (startIndex, stopIndex) => null,
      onCommentsClick: (messageId: IM.ChatMessageId) => null,
      onSenderClick: (id: Prod.ProductID) => null,
      onFiltersChange: (filters: FiltersData) => null,
    },
    loadNextTopicsPage: () => null,
    keyword: '',
    filters: IM.DEFAULT_FILTERS,
    //timerIndicator: 33,
    //updateTimeIndicator: 20,
    theme: Theme.DEFAULT_THEME
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme = {Theme.DEFAULT_THEME}>
        <InstantMessagingAppViewer {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>, div);
});
