import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Themed from '../../../containers/Themed'
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import ShowDropDown from './ShowDropDown';
import { ShowDropDownProps } from './ShowDropDown';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: ShowDropDownProps = {
    show: () => null,
  }
  ReactDOM.render(<Themed><ShowDropDown show={props.show}/></Themed>, div);
});
