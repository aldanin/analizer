import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {TagId} from '../../../../types/Tag'
import TagsWrapper from './TagsWrapper';
import {TagsWrapperProps} from './TagsWrapper';
import * as Theme from '../../Theme'
import * as Defaults from '../../../../typeDefaults/InstantMessaging'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: TagsWrapperProps = {
    tags: Defaults.DEFAULT_CHAT[0].tags,
    removeTag: (tagId: TagId) => {
    },
    borderColor: 'silver',
    theme: Theme.DEFAULT_THEME,
  }

  ReactDOM.render(<TagsWrapper {...props}/>, div);
});
