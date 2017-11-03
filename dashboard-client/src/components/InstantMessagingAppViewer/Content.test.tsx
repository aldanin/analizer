import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Theme from './Theme'
import * as IM from '../../types/InstantMessaging'
import * as Tag from '../../types/Tag'
import * as Prod from '../../types/Product'
import Content from './Content';
import {ContentProps} from './Content';
import {MuiThemeProvider} from 'material-ui'
import {ThemeProvider} from 'styled-components';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: ContentProps = {
    topicsData: [],
    chatMessagesData: {
      messages: [],
      totalCount: 0
    },
    isFetching: false,
    hasNextTopicsPage: true,
    isRefreshing: false,
    specificTopicsPageWasLoaded: false,
    fetchedChatMessagesFirstPage: true,
    handlers: {
      addTags: (chatMessageIds: Prod.ProductID, tags: Tag.TagData[]) => null,
      removeTag: (id, tagId) => null,
      setFavorite: (id, setFavorite) => null,
      markAsRead: (itemIds: Prod.ProductID[], isRead: boolean) => null,
      addToNotebook: (itemId: Prod.ProductID) => null,
      askForTranslate: (itemId: Prod.ProductID) => null,
      askForTranscript: (itemId: Prod.ProductID) => null,
      getTranslate: (itemId: Prod.ProductID) => null,
      getTranscript: (itemId: Prod.ProductID) => null,
      openNotebook: () => null,
      exportItem: (itemId: Prod.ProductID) => null,
      loadChatMessagesPage: (topicId: Prod.ProductID,
                             isPreveiousPage: boolean,
                             isRefreshing: boolean) => null,
      loadNextTopicsPage: () => null,
      loadContainingTopicsPage: (topicId: Prod.ProductID) => null,
      onSliceRendered: (startIndex, stopIndex) => null,
      onHeaderClick: (colKey: any) => null,
      onCommentsClick: (messageId: IM.ChatMessageId) => null,
      onSenderClick: (id: Prod.ProductID) => null,
    },
    theme: Theme.DEFAULT_THEME
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme = {Theme.DEFAULT_THEME}>
        <Content {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>, div);
});
