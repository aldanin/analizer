import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GallerySortDropDown from './SortDropDown';
import { GallerySortDropDownProps } from './SortDropDown';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: GallerySortDropDownProps = {
    sort: () => null,
    filter: 'DateAsc',
  }
  ReactDOM.render(
    <MuiThemeProvider>
              <GallerySortDropDown
                sort={props.sort}
                filter={props.filter}
              />
            </MuiThemeProvider>,
    div);
});
