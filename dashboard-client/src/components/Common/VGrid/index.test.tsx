import * as React from 'react';
import * as ReactDOM from 'react-dom';
import FilesVGrid from './index';
import * as Tag from '../../../types/Tag';
import { VGridProps } from './index';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import * as Theme from './Theme'
import * as Prod from '../../../types/Product'

injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: VGridProps = {
    data: [],
    checkedRows: {},
    selectedItem: undefined,
    hasNextPage: false,
    isFetching: false,
    handlers: {
      getProductId: (product: Prod.ProductData) => 1,
      checkedRowHandler: (id: Prod.ProductID, isChecked: boolean) => null,
      addTags: (fileId: Prod.ProductID, tags: Tag.TagData[]) => null,
      removeTag: (fileId: Prod.ProductID, tagId) => null,
      setFavourite: (fileId: Prod.ProductID, isFavoritState) => null,
      markAsRead: (fileId: Prod.ProductID, isRead: boolean) => null,
      rowClick: (x, y) => null,
      loadNextPage: () => null,
      onSliceRendered: (startIndex, stopIndex) => null,
      onHeaderClick: (sortBy, sortDirection) => null,
      askForTranslate: (itemId: Prod.ProductID) => null,
      getTranscription: (itemId: Prod.ProductID) => null,
      addToNotebook: (itemId: Prod.ProductID) => null,
      openNotebook: (itemId: Prod.ProductID) => null
    },
    actionToolbarSwitches: {
      withFavorite: true,
      withTranslate: true,
      withNotebook: true,
      withTags: true,
    },
    getColumns: (props: VGridProps) => [],
    width: 1000,
    height: 600,
    theme: Theme.DEFAULT_THEME
  };
  ReactDOM.render(<MuiThemeProvider><FilesVGrid {...props}/></MuiThemeProvider>, div);
});
