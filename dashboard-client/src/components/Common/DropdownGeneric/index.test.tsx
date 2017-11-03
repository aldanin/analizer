import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Themed from '../../../containers/Themed'
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import DropDownGeneric,  { DropDownGenericProps } from './';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: DropDownGenericProps = {
    caption: 'caption',
    values: ['value1', 'value2'],
    selectCallback: () => null,
  }
  ReactDOM.render(
    <Themed>
      <DropDownGeneric
        values={props.values}
        caption={props.caption}
        selectCallback={props.selectCallback}
      />
    </Themed>,
    div);
});
