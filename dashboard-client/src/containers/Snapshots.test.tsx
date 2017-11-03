import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { SnapshotsPageProps, SnapshotsPage } from './SnapshotsPage'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: SnapshotsPageProps = {
    data: [],
    isFetching: true,
    isFirstRequest: false,
    loadSnapshots: () => null,
    requestUpdate: () => null,
    extractNow: () => null,
    showFilter: () => null,
    tagsFilter: () => null,
    lastExtraction: 1234,
    updateTimeIndicator: 1234,
    actionsFilter: () => null,
    addTag: () => null,
    addToNotebook: () => null,
    markAsRead: () => null,
    markAsUnRead: () => null,
    askForTranslate: () => null,
    askForTranscript: () => null,
    exportItem: () => null,
    getFullSizeImage: () => null,
    removeTag: () => null,
    setStar: () => null,
    params: '',
    keyword: '',
    isFirstLoading: false,
  };
  ReactDOM.render(
    <MuiThemeProvider>
      <SnapshotsPage {...props}/>
    </MuiThemeProvider>,
    div);
});
