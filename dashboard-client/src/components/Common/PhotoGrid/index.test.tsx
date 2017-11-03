import * as React from 'react';
import * as ReactDOM from 'react-dom';

import PhotoGrid from './';
import { PhotoGridProps } from './';
import { SnapshotID } from '../../../types/Snapshots';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: PhotoGridProps = {
    photos: [],
    isSinglePhoto: true,
    isCheckboxVisible: false,
    width: '40px',
    height: '125px',
    headerTool: (id: 1, title: '123', isFavorite: true, isChecked: false) => {return <div/>},
    starSpan: <div/>,
    onItemSelected: () => null,
    onItemUnSelected: () => null,
    selectedItem: (id: SnapshotID) => null,
  }

  ReactDOM.render(<PhotoGrid {...props}/>, div);
});
