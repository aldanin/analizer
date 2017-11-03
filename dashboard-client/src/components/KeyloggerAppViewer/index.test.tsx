import * as React from 'react'
import * as ReactDOM from 'react-dom'

import KeyloggerAppViewer from './'
import { KeyloggerAppViewerProps } from './'

import { PRODUCT_TYPES } from '../../types/Product'
import stdActions from '../../helpers/StdProductActionsFunctory'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: KeyloggerAppViewerProps = {
    items: [],

    setFavorite: (id, isFavorite) => null,
    removeTag: (itemID, tagId) => null,

    stdActions: stdActions(() => null, PRODUCT_TYPES.KEYLOG),

    // addTag: (ids, tags) => null,
    // addToNotebook: (ids) => null,
    // markAsRead: (ids) => null,
    // markAsUnRead: (ids) => null,
    // askForTranslate: (ids) => null,
    // askForTranscript: (ids) => null,
    // exportItem: (ids) => null,
  }

  ReactDOM.render(<KeyloggerAppViewer {...props}/>, div);
});
