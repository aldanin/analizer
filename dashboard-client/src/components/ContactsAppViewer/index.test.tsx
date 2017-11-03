import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ContactsAppViewer from './';
import { ContactsAppViewerProps } from './';
import * as Tag from '../../types/Tag'
import * as Prod from '../../types/Product'
import { getData } from '../../mockData/Contacts'
import * as Theme from './Theme'
import * as Contacts from '../../types/Contacts'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const temp = getData(null, 1, 10, undefined);
  const props: ContactsAppViewerProps = {
    data: temp.contacts,
    hasNextPage: true,
    isFetching: false,
    isFirstRequest: false,
    contentHandlers: {
      addTags: (itemIds: Prod.ProductID[], tags: Tag.TagData[]) => null,
      removeTag: (itemId: Prod.ProductID, tagId: Tag.TagId) => null,
      setFavorite: (number, boolean) => null,
      markAsRead: (itemIds: Prod.ProductID[], isRead: boolean) => null,
      addToNotebook: (itemIds: Prod.ProductID[]) => null,
      askForTranslate: (itemIds: Prod.ProductID[]) => null,
      askForTranscript: (itemIds: Prod.ProductID[]) => null,
      openNotebook: () => null,
      getTranslate: (itemIds: Prod.ProductID) => null,
      getTranscript: (itemIds: Prod.ProductID) => null,
      exportItem: (itemIds: Prod.ProductID[]) => null,
      onSliceRendered: (startIndex, stopIndex) => null,
      onFiltersChange: (filters: Contacts.Filters) => null,
    },
    loadNextPage: () => null,
    filters: Contacts.DEFAULT_FILTERS,
    timerIndicator: 33,
    updateTimeIndicator: 20,
    theme: Theme.DEFAULT_THEME
  }

  ReactDOM.render(
    <MuiThemeProvider>
        <ContactsAppViewer {...props}/>
    </MuiThemeProvider>,
    div);
});
