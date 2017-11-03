import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Themed from '../../../containers/Themed'
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import ActionDropDown from './ActionsDropDown';
import { ActionDropDownProps } from './ActionsDropDown';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: ActionDropDownProps = {
    actions: {
      addTagCallback: () => null,
      addToNotebookCallback: () => null,
      markAsReadCallback: () => null,
      markAsUnreadCallback: () => null,
      translateCallback: () => null,
      transcriptCallback: () => null,
      exportCallback: () => null,
    }
  }
  ReactDOM.render(<Themed><ActionDropDown actions={props.actions}/></Themed>, div);
});
