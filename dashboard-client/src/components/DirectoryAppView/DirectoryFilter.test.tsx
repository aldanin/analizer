import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Dir from '../../types/Directory'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
import DirectoryFilterBar from './DirectoryFilter';
import { DirectoryFilterProps } from './DirectoryFilter';
import { ThemeProvider } from 'styled-components';
import { DEFAULT_THEME } from './Theme';

injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: DirectoryFilterProps = {
    directoryTreeClickAction: () => null,
    fileListClickAction: () => null,
    expandAll: () => null,
    collapseAll: () => null,
    initialSelectedIndex: 1,
    initialFileListModeIndex: 0,
    isGroupByDomainMode: false,
    groupByClickAction: () => null,
   // isGroupMode: false,
//    changeGroupByMode: () => null,
    selectType: () => null,
    fileListModeClick: (mode: Dir.FileListMode) => null
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={DEFAULT_THEME}>
        <DirectoryFilterBar
          directoryTreeClickAction={props.directoryTreeClickAction}
          fileListClickAction={props.fileListClickAction}
          expandAll={props.expandAll}
          collapseAll={props.collapseAll}
          initialSelectedIndex={props.initialSelectedIndex}
          isGroupByDomainMode={props.isGroupByDomainMode}
          groupByClickAction={props.groupByClickAction}
         // isGroupMode = {props.isGroupMode}
         // changeGroupByMode = {props.changeGroupByMode}
          selectType={props.selectType}
          initialFileListModeIndex={props.initialFileListModeIndex}
          fileListModeClick={props.fileListModeClick}
        />
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
