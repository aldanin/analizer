import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Theme from '../Theme'
import * as Tags from '../../../types/Tag'
import * as Prod from '../../../types/Product'
import ChatArea from './ChatArea';
import {ChatAreaProps} from './ChatArea';
import * as IM from '../../../types/InstantMessaging'
import {ThemeProvider} from 'styled-components';
import {MuiThemeProvider} from 'material-ui'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: ChatAreaProps = {
    chatMessagesData: {
      messages: [],
      totalCount: 1
    },
    topic: IM.defaultTopic,
    fetchedChatMessagesFirstPage: true,
    isRefreshing: true,
    suppressRendering: false,
    // hasNextChatMessagesPage: true,
    // unreadIds: [],
    markNotificationsViewed: (ids: IM.ChatMessageId[]) => null,
    setFavorite: () => null,
    removeTag: (messageId: Prod.ProductID, tagId: Tags.TagId) => null,
    addTags: (messageIds: Prod.ProductID, tagIds: Tags.TagData[]) => null,
    markAsRead: (itemIds: Prod.ProductID[], isRead: boolean) => null,
    addToNotebook: (itemId: Prod.ProductID) => null,
    askForTranslate: (itemId: Prod.ProductID) => null,
    askForTranscript: (itemId: Prod.ProductID) => null,
    getTranslate: (itemId: Prod.ProductID) => null,
    getTranscript: (itemId: Prod.ProductID) => null,
    openNotebook: () => null,
    exportItem: (itemId: Prod.ProductID) => null,
    onSenderClick: (id: Prod.ProductID) => null,
    loadChatMessagesPage: (isPreviousPage: boolean) => null,
    onCommonGroupSelected: (topicId: Prod.ProductID) => null,
    theme: Theme.DEFAULT_THEME
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme = {Theme.DEFAULT_THEME}>
        <ChatArea {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>, div);

});
