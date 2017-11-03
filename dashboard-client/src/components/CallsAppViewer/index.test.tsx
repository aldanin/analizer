import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CallsAppViewer from './';
import { CallsAppViewerProps } from './';
import { getData } from './mockData/Data'
import * as Tag from '../../types/Tag'
import * as Prod from '../../types/Product'
import * as Theme from './Theme'
import * as Calls from '../../types/Calls'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const temp = getData(1, 10, null);
  const props: CallsAppViewerProps = {
    data: temp.callsData,
    hasNextPage: true,
    isFetching: false,
    contentHandlers: {
      addTags: (itemIds: Prod.ProductID[], tags: Tag.TagData[]) => null,
      removeTag: (itemId: Prod.ProductID, tagId: Tag.TagId) => null,
      setFavorite: (number, boolean) => null,
      markAsRead: (itemId: Prod.ProductID[], isRead: boolean) => null,
      loadNextPage: (filters?: Calls.Filters) => null,
      onSliceRendered: (startIndex, stopIndex) => null,
      openNotebook: (itemIds: Prod.ProductID[]) => null,
      askForTranslate: (itemId: Prod.ProductID[]) => null,
      getTranscription: (itemId: Prod.ProductID[]) => null,
      addToNotebook: (itemId: Prod.ProductID[]) => null,
      onFiltersChange: (filters: Calls.Filters) => null,
    },
    filters: Calls.DEFAULT_FILTERS,
    filterHandlers: {
      show: () => null,
      tag: () => null,
      action: () => null,
      selectType: (value: number) => null,
      selectSource: (value: number) => null,
    },
    timerIndicator: 33,
    updateTimeIndicator: 20,
    keyword: '',
    theme: Theme.DEFAULT_THEME
  }

  ReactDOM.render(<MuiThemeProvider><CallsAppViewer {...props}/></MuiThemeProvider>, div);
});
