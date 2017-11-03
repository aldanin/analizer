import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Themed from '../../../containers/Themed'
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { AppViewFiltersToolProps, default as AppViewFiltersTool } from './index';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: AppViewFiltersToolProps = {
    component: <img/>,
    show: () => null,
    tags: () => null,
    actions: {
      addTagCallback: () => null,
      addToNotebookCallback: () => null,
      markAsReadCallback: () => null,
      markAsUnreadCallback: () => null,
      translateCallback: () => null,
      transcriptCallback: () => null,
      exportCallback: () => null,
    },
    search: () => null,
  }
  ReactDOM.render(<Themed><AppViewFiltersTool {...props}/></Themed>, div);
});
