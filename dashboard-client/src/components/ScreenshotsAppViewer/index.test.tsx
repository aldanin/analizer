import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Screenshots from './'
import { ScreenshotsProps } from './'
import { ScreenshotData, ScreenshotId } from '../../types/Screenshot'
import { Filters } from '../../types/GenericFilters'

import { PRODUCT_TYPES } from '../../types/Product'
import stdActions from '../../helpers/StdProductActionsFunctory'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: ScreenshotsProps = {
    slides: [] as ScreenshotData[],
    isFetching: false,
    hasOlder: true,
    hasNewer: true,
    loadInitialData: () => null,
    loadMoreData: (isPrepend) => null,
    setFilters: (filters: Filters) => null,

    setFavorite: (id: ScreenshotId, isFavorite: boolean) => null,
    removeTag: (itemID, tagId) => null,

    stdActions: stdActions(() => null, PRODUCT_TYPES.KEYLOG)
  }

  ReactDOM.render(<Screenshots {...props}/>, div);
});
