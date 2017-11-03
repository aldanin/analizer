import { connect } from 'react-redux'
import { ScreenshotId } from '../types/Screenshot'

import { activityViewer as activityViewerTheme } from '../theme/ScTheme'

import stdActions from '../helpers/StdProductActionsFunctory'

import {
  productSetFavorite,
  productRemoveTag,
} from '../state/actions/ProductActions'
import { PRODUCT_TYPES } from '../types/Product'
import { TagId } from '../types/Tag'

import {
  screenshotsLoadInitial,
  screenshotsLoad,
  screenshotsSetFilters,
} from '../state/actions/Screenshots'

import ScreenshotsAppViewer from '../components/ScreenshotsAppViewer'

const BATCH_SIZE = 10;

const mapStateToProps = (state, ownProps) => {
  const screenshots = state[PRODUCT_TYPES.SCREENSHOT]
  return {
    slides: screenshots.data,
    isFetching: screenshots.isFetching,
    hasOlder: screenshots.data.length === 0 || screenshots.oldestId > screenshots.totalOldestId,
    hasNewer: screenshots.data.length === 0 || screenshots.newestId < screenshots.totalNewestId,
    theme: activityViewerTheme,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadInitialData: () => dispatch(screenshotsLoadInitial(BATCH_SIZE)),
    loadMoreData: (isOlder) => dispatch(screenshotsLoad(BATCH_SIZE, isOlder)),
    setFilters: (filters) => dispatch(screenshotsSetFilters(filters, BATCH_SIZE)),
    setFavorite: (id: ScreenshotId, isFavorite: boolean) => {
      dispatch(productSetFavorite({id, isFavorite}, PRODUCT_TYPES.SCREENSHOT))
    },
    removeTag: (id: ScreenshotId, tagId: TagId) => {
      dispatch(productRemoveTag({id: id, tagId: tagId}, PRODUCT_TYPES.SCREENSHOT))
    },
    stdActions: stdActions(dispatch, PRODUCT_TYPES.SCREENSHOT),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenshotsAppViewer)
