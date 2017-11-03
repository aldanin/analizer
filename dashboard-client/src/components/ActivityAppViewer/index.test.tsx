import * as React from 'react';

import ActivityAppViewer from './';
import { ActivityAppViewerProps } from './';

import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const props: ActivityAppViewerProps = {
    lastExtractTs: Date.now(),
    extractInterval: 24 * 60 * 60,
    requestUpdate: () => null,
    requestExtract: () => null,

    storiesLoadInitialData: () => null,

    keyloggerOnFiltersChanged: (filters) => null,
    keyloggerLoadInitialData: () => null,

    screenshotsOnFiltersChanged: (filters) => null,
    screenshotLoadInitialData: () => null,
  }

  shallow(<ActivityAppViewer {...props}/>);
});
