import * as React from 'react';
import * as ReactDOM from 'react-dom';

import ProductItem from './ProductItem';
import { ProductItemProps } from './ProductItem';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { demoLocationData } from '../../mockData/Location';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: ProductItemProps = {
    data: demoLocationData,
    onItemSelected: () => null,
    onItemUnSelected: () => null,
    isItemSelected: () => true,
    isExpandMode: false,
    updateOpenItems: () => null,
    isOpen: () => null,
    removeTag: () => null,
    setStar: () => null,
    addTag: () => null,
    markAsRead: () => null,
    markAsUnread: () => null,
  }

  ReactDOM.render(<MuiThemeProvider><ProductItem {...props}/></MuiThemeProvider>, div);
});
