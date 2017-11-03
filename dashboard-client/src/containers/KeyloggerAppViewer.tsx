import { connect } from 'react-redux'
import KeyloggerAppViewer from '../components/KeyloggerAppViewer'
import { KeyloggerView } from '../theme/ScTheme'
import stdActions from '../helpers/StdProductActionsFunctory'

import {
  productSetFavorite,
  productRemoveTag,
} from '../state/actions/ProductActions'
import { PRODUCT_TYPES } from '../types/Product'

import { KeylogId } from '../types/Keylog'
import { TagId } from '../types/Tag'

const mapStateToProps = (state, ownProps) => {
  return {
    items: state[PRODUCT_TYPES.KEYLOG].data,
    theme: KeyloggerView,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFavorite: (id: KeylogId, isFavorite: boolean) => {
      dispatch(productSetFavorite({id: id, isFavorite: isFavorite}, PRODUCT_TYPES.KEYLOG))
    },
    removeTag: (id: KeylogId, tagId: TagId) => {
      dispatch(productRemoveTag({id: id, tagId: tagId}, PRODUCT_TYPES.KEYLOG))
    },
    stdActions: stdActions(dispatch, PRODUCT_TYPES.KEYLOG),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyloggerAppViewer)
