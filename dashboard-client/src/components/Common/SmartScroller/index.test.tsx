import * as React from 'react'
import * as ReactDOM from 'react-dom'
import SmartScroller from './'
import { SmartScrollerProps } from './'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: SmartScrollerProps = {
    withTop: false,
    onBottomReach: () => null,
    onTopReach: () => null,
    fetchedFirstPage: false,
    scrollToSelectedRow: false,
    onScrollerStateChange: (isHidden: boolean) => null,
  }

  ReactDOM.render(<SmartScroller {...props}/>, div);
});
