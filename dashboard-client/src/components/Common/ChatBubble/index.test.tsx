import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ChatBubble from './'
import { ChatBubbleProps, PointDirection } from './'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: ChatBubbleProps = {
    pointDirection: PointDirection.right,
    backgroundColor: 'white',
    borderColor: 'silver',
    style: {float: 'left'}
  }

  ReactDOM.render(<ChatBubble {...props}/>, div);
});
