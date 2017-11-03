import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Themed from '../../../containers/Themed'
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import TagDropDown from './TagsDropDown';
import { TagDropDownProps } from './TagsDropDown';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: TagDropDownProps = {
    tags: () => null,
  }
  ReactDOM.render(<Themed><TagDropDown tags={props.tags}/></Themed>, div);
});
