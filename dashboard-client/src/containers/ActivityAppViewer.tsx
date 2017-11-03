import { connect } from 'react-redux'
import ActivityAppViewer from '../components/ActivityAppViewer'
import * as Theme from '../theme/ScTheme'

import { storiesLoad } from '../state/actions/Stories'
import { keylogsLoad, keylogsSetFilters } from '../state/actions/Keylogs'
import {
  screenshotsLoadInitial,
  screenshotsSetFilters,
} from '../state/actions/Screenshots'
import { PRODUCT_TYPES } from '../types/Product'

const BATCH_SIZE = 20;

const mapStateToProps = (state, ownProps) => {
  return {
    theme: Theme.activityViewer as any,
    lastExtractTs: Date.now() - 2 * 60 * 60 * 1000,
    extractInterval: 24 * 60 * 60,

    screenShotsList: state[PRODUCT_TYPES.SCREENSHOT],
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestUpdate: () => null,
    requestExtract: () => null,

    // stories
    storiesLoadInitialData: () => dispatch(storiesLoad(BATCH_SIZE)),

    // keylogger
    keyloggerOnFiltersChanged: (filters) => dispatch(keylogsSetFilters(filters, BATCH_SIZE)),
    keyloggerLoadInitialData: () => dispatch(keylogsLoad(BATCH_SIZE)),

    // screenshots
    screenshotsOnFiltersChanged: (filters) => dispatch(screenshotsSetFilters(filters, BATCH_SIZE)),
    screenshotLoadInitialData: () => dispatch(screenshotsLoadInitial(BATCH_SIZE)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityAppViewer)
